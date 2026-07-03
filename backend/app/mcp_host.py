"""MCP host: owns long-lived stdio sessions to the dbt and Snowflake MCP servers
and exposes their tools to the agent as a single namespaced tool list."""

import json
import logging
import os
from contextlib import AsyncExitStack
from dataclasses import dataclass, field

from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

logger = logging.getLogger(__name__)

SEP = "__"  # snowflake__run_query -> server "snowflake", tool "run_query"


@dataclass
class MCPHost:
    sessions: dict[str, ClientSession] = field(default_factory=dict)
    tools: list[dict] = field(default_factory=list)  # Anthropic-format tool defs
    _stack: AsyncExitStack = field(default_factory=AsyncExitStack)

    async def start(self, servers: dict[str, dict]) -> None:
        for name, spec in servers.items():
            env = dict(os.environ)
            if spec.get("env"):
                env.update({k: v for k, v in spec["env"].items() if v})
            params = StdioServerParameters(
                command=spec["command"], args=spec["args"], env=env
            )
            read, write = await self._stack.enter_async_context(stdio_client(params))
            session = await self._stack.enter_async_context(ClientSession(read, write))
            await session.initialize()
            self.sessions[name] = session

            result = await session.list_tools()
            for tool in result.tools:
                self.tools.append(
                    {
                        "name": f"{name}{SEP}{tool.name}",
                        "description": f"[{name} MCP] {tool.description or tool.name}",
                        "input_schema": tool.inputSchema,
                    }
                )
            logger.info(
                "MCP server '%s' connected with %d tools", name, len(result.tools)
            )

    async def stop(self) -> None:
        await self._stack.aclose()
        self.sessions.clear()
        self.tools.clear()

    async def call_tool(self, namespaced_name: str, arguments: dict) -> tuple[str, bool]:
        """Returns (content_text, is_error)."""
        server, _, tool_name = namespaced_name.partition(SEP)
        session = self.sessions.get(server)
        if session is None:
            return f"Unknown MCP server '{server}'", True
        try:
            result = await session.call_tool(tool_name, arguments or {})
        except Exception as exc:  # tool transport failure
            return f"MCP tool call failed: {exc}", True

        parts: list[str] = []
        for block in result.content:
            if block.type == "text":
                parts.append(block.text)
            else:
                parts.append(json.dumps(block.model_dump(), default=str))
        return "\n".join(parts) or "(empty result)", bool(result.isError)
