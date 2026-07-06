"""Provider-agnostic agentic loop: manual tool-use loop over the MCP host's
tools, streamed as typed events for the SSE endpoint. Works with any backend
implementing the LLMProvider surface in `providers/base.py` — Claude,
Gemini, OpenAI, or any OpenAI-compatible local model server (Ollama, LM
Studio, vLLM, ...). MCP itself is unaffected by the choice of model: MCPHost
always talks the same protocol to the same servers regardless of which LLM
is deciding when to call which tool."""

import json
from typing import Any, AsyncIterator

from .host_tools import HOST_TOOLS, handle_host_tool, is_host_tool
from .mcp_host import MCPHost
from .providers.base import ToolResult

MAX_AGENT_TURNS = 12

SYSTEM_PROMPT = """\
You are the JBS Foods Analytics Copilot, a data analyst assistant for a meat-industry \
control tower. You answer business questions by querying Snowflake, using dbt as the \
source of truth for what data exists and what it means.

Workflow for data questions:
1. Discover: use the dbt tools (dbt__list_models, dbt__get_model_details) to find the \
right models and their columns and fully-qualified Snowflake relations. Never guess \
table or column names.
2. Query: write standard, read-only SQL against the fully-qualified relations from dbt \
and run it with snowflake__run_query. Aggregate in SQL rather than pulling raw rows; \
cap exploratory queries with LIMIT.
3. Answer: give the business answer first in one or two sentences, then a compact \
markdown table of the key figures, then any caveats. Format currency and volumes \
readably (e.g. $1.2M, 45k lbs). Do not dump raw JSON at the user.
4. Visualize: when the user asks for a chart/graph/plot, or a trend is easier to \
see visually, call render_chart with labels and dataset values from your query. \
Never paste Chart.js JSON in the text — use render_chart instead. Still include \
the key figures in prose or a table.

If a query fails, read the error, fix the SQL, and retry. If the question is not \
answerable from the available models, say so and list what is available.
"""

async def run_agent(
    llm: Any,
    user_message: str,
    host: MCPHost,
) -> AsyncIterator[dict[str, Any]]:
    """Drive one user turn to completion against an already-constructed
    provider instance, yielding events: text_delta, tool_call, tool_result,
    chart, done, error.

    Session lifecycle and persistence (creating/rehydrating the provider,
    saving the exchange) are owned by the chat module's service — this
    function is pure agent orchestration over whatever provider it's given."""
    llm.add_user_message(user_message)

    tools = host.tools + HOST_TOOLS

    try:
        for _ in range(MAX_AGENT_TURNS):
            async for event in llm.run_turn(SYSTEM_PROMPT, tools):
                if event.type == "text_delta":
                    yield {"type": "text_delta", "text": event.text}
                elif event.type == "tool_call":
                    yield {
                        "type": "tool_call",
                        "id": event.id,
                        "name": event.name,
                        "input": event.input,
                    }

            if llm.stop_reason in ("error", "refusal"):
                llm.drop_last_assistant_turn()
                yield {
                    "type": "error",
                    "message": llm.error_message or "The model declined this request.",
                }
                break

            if llm.stop_reason != "tool_use":
                break

            tool_results: list[ToolResult] = []
            for call in llm.pending_tool_calls:
                if is_host_tool(call["name"]):
                    content, is_error, chart_payload = handle_host_tool(
                        call["name"], call["input"]
                    )
                    if chart_payload is not None:
                        yield {
                            "type": "chart",
                            "id": call["id"],
                            **chart_payload,
                        }
                else:
                    content, is_error = await host.call_tool(call["name"], call["input"])
                yield {
                    "type": "tool_result",
                    "id": call["id"],
                    "name": call["name"],
                    "content": content[:20_000],
                    "is_error": is_error,
                }
                tool_results.append(
                    ToolResult(id=call["id"], name=call["name"], content=content, is_error=is_error)
                )
            await llm.add_tool_results(tool_results)
        else:
            yield {
                "type": "error",
                "message": f"Stopped after {MAX_AGENT_TURNS} agent turns.",
            }
    except Exception as exc:
        # Drop the partial exchange so the stored history stays API-valid
        # (a trailing user message with no assistant reply is fine; a
        # trailing tool call with no tool result is not, for providers that
        # enforce pairing).
        llm.drop_last_assistant_turn()
        yield {"type": "error", "message": f"{type(exc).__name__}: {exc}"}

    yield {"type": "done"}


def sse_format(event: dict) -> str:
    return f"data: {json.dumps(event, default=str)}\n\n"
