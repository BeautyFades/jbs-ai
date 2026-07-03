"""Anthropic Claude provider."""

from __future__ import annotations

from typing import AsyncIterator

from anthropic import AsyncAnthropic

from .base import AgentEvent, StopReason, ToolResult, ToolSpec

_client = AsyncAnthropic()


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

        self._messages.append({"role": "assistant", "content": response.content})

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
