"""Anthropic Claude provider."""

from __future__ import annotations

from typing import AsyncIterator

from anthropic import AsyncAnthropic

from ..config import settings
from .base import AgentEvent, StopReason, ToolResult, ToolSpec

# Inject the key from settings (loaded from .env) rather than relying solely
# on the OS environment. Passing None lets the SDK fall back to its own env
# lookup when the setting is unset.
_client = AsyncAnthropic(api_key=settings.anthropic_api_key or None)


class ClaudeProvider:
    def __init__(self, model: str):
        self._model = model
        self._messages: list[dict] = []
        self._pending_calls: list[dict] = []
        self.stop_reason: StopReason = "end_turn"
        self.error_message: str | None = None

    def add_user_message(self, text: str) -> None:
        self._messages.append({"role": "user", "content": text})

    async def run_turn(self, system: str, tools: list[ToolSpec]) -> AsyncIterator[AgentEvent]:
        self._pending_calls = []
        self.error_message = None
        try:
            async with _client.messages.stream(
                model=self._model,
                max_tokens=16000,
                thinking={"type": "adaptive"},
                system=[
                    {"type": "text", "text": system, "cache_control": {"type": "ephemeral"}}
                ],
                tools=tools,
                messages=self._messages,
            ) as stream:
                async for event in stream:
                    if (
                        event.type == "content_block_delta"
                        and event.delta.type == "text_delta"
                    ):
                        yield AgentEvent(type="text_delta", text=event.delta.text)
                response = await stream.get_final_message()
        except Exception as exc:
            self.stop_reason = "error"
            self.error_message = f"{type(exc).__name__}: {exc}"
            return

        # Store the assistant turn as plain dicts (not pydantic blocks) so the
        # history is JSON-serializable for persistence and still valid as API
        # input on the next request. exclude_none keeps optional block fields
        # (e.g. thinking signatures round-trip; empty fields are dropped).
        self._messages.append(
            {
                "role": "assistant",
                "content": [
                    block.model_dump(mode="json", exclude_none=True)
                    for block in response.content
                ],
            }
        )

        if response.stop_reason == "refusal":
            self.stop_reason = "refusal"
            self.error_message = "The model declined this request."
            return

        if response.stop_reason != "tool_use":
            self.stop_reason = "end_turn"
            return

        self.stop_reason = "tool_use"
        for block in response.content:
            if block.type != "tool_use":
                continue
            self._pending_calls.append({"id": block.id, "name": block.name, "input": block.input})
            yield AgentEvent(type="tool_call", id=block.id, name=block.name, input=block.input)

    @property
    def pending_tool_calls(self) -> list[dict]:
        return self._pending_calls

    async def add_tool_results(self, results: list[ToolResult]) -> None:
        self._messages.append(
            {
                "role": "user",
                "content": [
                    {
                        "type": "tool_result",
                        "tool_use_id": r.id,
                        "content": r.content,
                        "is_error": r.is_error,
                    }
                    for r in results
                ],
            }
        )

    def drop_last_assistant_turn(self) -> None:
        """Anthropic requires every tool_use block to have a matching
        tool_result on the next turn — on error, drop the dangling assistant
        turn so the stored history stays API-valid for the next request."""
        if self._messages and self._messages[-1]["role"] == "assistant":
            self._messages.pop()

    def export_history(self) -> list[dict]:
        """JSON-serializable snapshot of native messages, for persistence."""
        return self._messages

    def import_history(self, history: list[dict]) -> None:
        """Rehydrate native messages from a persisted snapshot (cold start)."""
        self._messages = list(history)
