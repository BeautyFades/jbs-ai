"""Google Gemini provider (google-genai SDK).

Gemini doesn't speak MCP directly — nothing does, MCP is a client<->server
tool protocol, not a model API. What Gemini supports is function calling, so
this provider converts MCPHost's JSON-Schema tool defs into Gemini
FunctionDeclarations, and converts Gemini's function_call parts back into the
same (id, name, input) shape the agent loop already uses for every other
provider. The actual MCP call still goes through MCPHost, unchanged.

Also covers Vertex AI-hosted Gemini: set GOOGLE_GENAI_USE_VERTEXAI=true (plus
GOOGLE_CLOUD_PROJECT / GOOGLE_CLOUD_LOCATION) in the environment and
genai.Client() picks it up automatically.
"""

from __future__ import annotations

from typing import Any, AsyncIterator

from google import genai
from google.genai import types

from .base import AgentEvent, StopReason, ToolResult, ToolSpec

_JSON_TYPE_MAP = {
    "string": types.Type.STRING,
    "number": types.Type.NUMBER,
    "integer": types.Type.INTEGER,
    "boolean": types.Type.BOOLEAN,
    "array": types.Type.ARRAY,
    "object": types.Type.OBJECT,
}


def _to_gemini_schema(schema: dict[str, Any] | None) -> types.Schema | None:
    """Best-effort JSON Schema -> Gemini Schema conversion.

    MCP tool schemas are plain JSON Schema; Gemini's Schema type only
    understands a subset (no $ref, anyOf, additionalProperties, etc.), so
    unsupported keywords are silently dropped rather than erroring. Covers
    the shapes typical MCP tools actually use: object/array/scalar params,
    enum, required, nested objects.
    """
    if not schema:
        return None
    json_type = schema.get("type", "object")
    if isinstance(json_type, list):  # e.g. ["string", "null"]
        json_type = next((t for t in json_type if t != "null"), "string")

    kwargs: dict[str, Any] = {"type": _JSON_TYPE_MAP.get(json_type, types.Type.STRING)}
    if schema.get("description"):
        kwargs["description"] = schema["description"]
    if schema.get("enum"):
        kwargs["enum"] = [str(v) for v in schema["enum"]]
    if json_type == "object" and schema.get("properties"):
        kwargs["properties"] = {
            k: _to_gemini_schema(v) for k, v in schema["properties"].items()
        }
        if schema.get("required"):
            kwargs["required"] = schema["required"]
    if json_type == "array" and schema.get("items"):
        kwargs["items"] = _to_gemini_schema(schema["items"])
    return types.Schema(**kwargs)


def _to_gemini_tools(tools: list[ToolSpec]) -> list[types.Tool]:
    declarations = [
        types.FunctionDeclaration(
            name=t["name"],
            description=t.get("description") or t["name"],
            parameters=_to_gemini_schema(t.get("input_schema")),
        )
        for t in tools
    ]
    return [types.Tool(function_declarations=declarations)]


class GeminiProvider:
    def __init__(self, model: str, api_key: str | None = None):
        self._model = model
        self._client = genai.Client(api_key=api_key) if api_key else genai.Client()
        self._contents: list[types.Content] = []
        self._pending_calls: list[dict] = []
        self.stop_reason: StopReason = "end_turn"
        self.error_message: str | None = None

    def add_user_message(self, text: str) -> None:
        self._contents.append(types.Content(role="user", parts=[types.Part(text=text)]))

    async def run_turn(self, system: str, tools: list[ToolSpec]) -> AsyncIterator[AgentEvent]:
        self._pending_calls = []
        self.error_message = None
        config = types.GenerateContentConfig(
            system_instruction=system,
            tools=_to_gemini_tools(tools) if tools else None,
        )

        response_parts: list[types.Part] = []
        function_calls: list[types.FunctionCall] = []
        try:
            stream = await self._client.aio.models.generate_content_stream(
                model=self._model, contents=self._contents, config=config
            )
            async for chunk in stream:
                if not chunk.candidates or not chunk.candidates[0].content:
                    continue
                for part in chunk.candidates[0].content.parts or []:
                    if part.text:
                        yield AgentEvent(type="text_delta", text=part.text)
                        response_parts.append(part)
                    elif part.function_call:
                        response_parts.append(part)
                        function_calls.append(part.function_call)
        except Exception as exc:
            self.stop_reason = "error"
            self.error_message = f"{type(exc).__name__}: {exc}"
            return

        if response_parts:
            self._contents.append(types.Content(role="model", parts=response_parts))

        if not function_calls:
            self.stop_reason = "end_turn"
            return

        self.stop_reason = "tool_use"
        for i, call in enumerate(function_calls):
            call_id = getattr(call, "id", None) or f"{call.name}_{i}"
            args = dict(call.args or {})
            self._pending_calls.append({"id": call_id, "name": call.name, "input": args})
            yield AgentEvent(type="tool_call", id=call_id, name=call.name, input=args)

    @property
    def pending_tool_calls(self) -> list[dict]:
        return self._pending_calls

    async def add_tool_results(self, results: list[ToolResult]) -> None:
        # Gemini matches function_response to function_call by name (and, on
        # newer API versions, id) rather than an opaque call id — fine as
        # long as a turn doesn't call the same tool twice with different args.
        parts = [
            types.Part.from_function_response(
                name=r.name,
                response={"error": r.content} if r.is_error else {"result": r.content},
            )
            for r in results
        ]
        self._contents.append(types.Content(role="user", parts=parts))

    def drop_last_assistant_turn(self) -> None:
        if self._contents and self._contents[-1].role == "model":
            self._contents.pop()
