"""OpenAI Chat Completions-compatible provider.

Works with real OpenAI and with any locally-hosted server that exposes the
same API — Ollama (`http://localhost:11434/v1`), LM Studio
(`http://localhost:1234/v1`), vLLM, llama.cpp's `server`,
text-generation-webui, or a cloud OpenAI-compatible host (Groq, Together,
etc). Point `base_url` at the server and `model` at whatever it serves; no
other code changes needed. Tool schemas pass straight through unmodified,
since JSON Schema is exactly what this API already expects.

Requires a model that actually supports tool calling (e.g. for Ollama:
llama3.1, qwen2.5, mistral-nemo, and similar — check the model's card).
Models without tool-calling support will just never emit tool_calls, so the
agent loop will treat every turn as a plain answer.
"""

from __future__ import annotations

import json
from typing import AsyncIterator

from openai import AsyncOpenAI

from .base import AgentEvent, StopReason, ToolResult, ToolSpec


def _to_openai_tools(tools: list[ToolSpec]) -> list[dict]:
    return [
        {
            "type": "function",
            "function": {
                "name": t["name"],
                "description": t.get("description") or t["name"],
                "parameters": t.get("input_schema") or {"type": "object", "properties": {}},
            },
        }
        for t in tools
    ]


class OpenAICompatibleProvider:
    def __init__(self, model: str, base_url: str | None = None, api_key: str | None = None):
        self._model = model
        self._client = AsyncOpenAI(base_url=base_url or None, api_key=api_key or "not-needed")
        self._messages: list[dict] = []
        self._pending_calls: list[dict] = []
        self.stop_reason: StopReason = "end_turn"
        self.error_message: str | None = None

    def add_user_message(self, text: str) -> None:
        self._messages.append({"role": "user", "content": text})

    async def run_turn(self, system: str, tools: list[ToolSpec]) -> AsyncIterator[AgentEvent]:
        self._pending_calls = []
        self.error_message = None
        request_messages = [{"role": "system", "content": system}, *self._messages]

        content_parts: list[str] = []
        # tool_calls stream as index-keyed fragments; accumulate then parse.
        tool_call_acc: dict[int, dict[str, str]] = {}
        try:
            stream = await self._client.chat.completions.create(
                model=self._model,
                messages=request_messages,
                tools=_to_openai_tools(tools) if tools else None,
                stream=True,
            )
            async for chunk in stream:
                if not chunk.choices:
                    continue
                delta = chunk.choices[0].delta
                if delta.content:
                    content_parts.append(delta.content)
                    yield AgentEvent(type="text_delta", text=delta.content)
                for tc in delta.tool_calls or []:
                    acc = tool_call_acc.setdefault(tc.index, {"id": "", "name": "", "arguments": ""})
                    if tc.id:
                        acc["id"] = tc.id
                    if tc.function and tc.function.name:
                        acc["name"] += tc.function.name
                    if tc.function and tc.function.arguments:
                        acc["arguments"] += tc.function.arguments
        except Exception as exc:
            self.stop_reason = "error"
            self.error_message = f"{type(exc).__name__}: {exc}"
            return

        content = "".join(content_parts) or None

        if not tool_call_acc:
            self._messages.append({"role": "assistant", "content": content})
            self.stop_reason = "end_turn"
            return

        assistant_tool_calls = [
            {
                "id": acc["id"] or f"call_{i}",
                "type": "function",
                "function": {"name": acc["name"], "arguments": acc["arguments"] or "{}"},
            }
            for i, acc in enumerate(tool_call_acc.values())
        ]
        self._messages.append(
            {"role": "assistant", "content": content, "tool_calls": assistant_tool_calls}
        )

        self.stop_reason = "tool_use"
        for call in assistant_tool_calls:
            try:
                args = json.loads(call["function"]["arguments"])
            except json.JSONDecodeError:
                args = {}
            self._pending_calls.append({"id": call["id"], "name": call["function"]["name"], "input": args})
            yield AgentEvent(type="tool_call", id=call["id"], name=call["function"]["name"], input=args)

    @property
    def pending_tool_calls(self) -> list[dict]:
        return self._pending_calls

    async def add_tool_results(self, results: list[ToolResult]) -> None:
        for r in results:
            self._messages.append({"role": "tool", "tool_call_id": r.id, "content": r.content})

    def drop_last_assistant_turn(self) -> None:
        if self._messages and self._messages[-1]["role"] == "assistant":
            self._messages.pop()

    def export_history(self) -> list[dict]:
        """Native messages are already plain dicts — return as-is."""
        return self._messages

    def import_history(self, history: list[dict]) -> None:
        self._messages = list(history)
