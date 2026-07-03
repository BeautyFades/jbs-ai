"""Provider-agnostic interfaces for the agent loop.

Each provider owns its own native conversation history internally (Claude's
content blocks, Gemini's Content/Part objects, OpenAI's message dicts all
differ) and exposes only this shared surface, so `agent.py` never touches a
provider-specific message shape directly. `MCPHost.tools` — plain
{"name", "description", "input_schema"} dicts, i.e. JSON Schema — is the one
tool format every provider converts from internally.

To add a new backend, implement a class with the same methods as
ClaudeProvider / GeminiProvider / OpenAICompatibleProvider and wire it into
`create_provider` in `providers/__init__.py`.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Literal

ToolSpec = dict[str, Any]

StopReason = Literal["tool_use", "end_turn", "refusal", "error"]


@dataclass
class AgentEvent:
    type: Literal["text_delta", "tool_call"]
    text: str | None = None
    id: str | None = None
    name: str | None = None
    input: dict | None = None


@dataclass
class ToolResult:
    id: str
    name: str
    content: str
    is_error: bool
