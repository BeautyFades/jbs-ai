"""Shared Snowflake data access for every tower.

All warehouse reads go through run_query, which takes the caller's identity so
row-level security can be applied at one choke point once real Snowflake auth
lands (per-user role / session context on the MCP connection). Towers must not
open their own connections.
"""

from __future__ import annotations

import json
import logging
from dataclasses import dataclass

from ...mcp_host import MCPHost
from ..auth.schemas import CurrentUser

logger = logging.getLogger(__name__)


@dataclass
class QueryResult:
    columns: list[str]
    rows: list[list]
    row_count: int
    truncated: bool = False


async def run_query(host: MCPHost, sql: str, user: CurrentUser) -> QueryResult:
    # RLS seam: when MCP_MODE=real, this is where the user's identity gets
    # translated into a Snowflake session context (SET ROLE / session tags)
    # before the query executes. Mock mode has no row-level restrictions.
    logger.info("run_query user=%s sql=%.120s", user.email, sql)

    text, is_error = await host.call_tool("snowflake__run_query", {"query": sql})
    if is_error:
        raise RuntimeError(f"Snowflake query failed: {text}")

    payload = json.loads(text)
    if isinstance(payload, dict) and payload.get("error"):
        raise RuntimeError(payload["error"])

    return QueryResult(
        columns=payload.get("columns", []),
        rows=payload.get("rows", []),
        row_count=payload.get("row_count", len(payload.get("rows", []))),
        truncated=bool(payload.get("truncated", False)),
    )
