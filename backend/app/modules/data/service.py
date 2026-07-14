"""Shared Snowflake data access for every tower.

All warehouse reads go through run_query, which takes the caller's identity so
row-level security is applied at one choke point. Towers must not open their
own connections.

RLS model (see docs/auth.md for the full design):
- Each app role maps to a read-only Snowflake functional role
  (settings.snowflake_role_map). The query executes under that role.
- Snowflake row access policies attached to the shared tables key off
  CURRENT_ROLE() (short term) or the real user via External OAuth (long term),
  so the warehouse — not this app — decides which rows come back.
- Every query is tagged with the requesting user's identity (QUERY_TAG) so
  Snowflake's query history stays auditable per executive even while queries
  run through a service connection.
"""

from __future__ import annotations

import json
import logging
from dataclasses import dataclass

from ...config import settings
from ...mcp_host import MCPHost
from ..auth.schemas import CurrentUser

logger = logging.getLogger(__name__)


@dataclass
class QueryResult:
    columns: list[str]
    rows: list[list]
    row_count: int
    truncated: bool = False


class NoWarehouseAccessError(PermissionError):
    """The user's roles map to no Snowflake role — they may not query at all."""


def snowflake_role_for(user: CurrentUser) -> str:
    """Resolve the Snowflake role this user's queries run under.

    First app role with a mapping wins, with "admin" taking priority. A user
    whose roles map to nothing gets no warehouse access — deny by default.
    """
    ordered = ["admin", *[r for r in user.roles if r != "admin"]]
    for role in ordered:
        if role in user.roles and role in settings.snowflake_role_map:
            return settings.snowflake_role_map[role]
    raise NoWarehouseAccessError(f"No Snowflake role mapped for roles={user.roles}")


def _query_tag(user: CurrentUser) -> str:
    return json.dumps({"app": "jbs-ai", "user": user.email, "user_id": user.id})


async def run_query(host: MCPHost, sql: str, user: CurrentUser) -> QueryResult:
    sf_role = snowflake_role_for(user)
    logger.info(
        "run_query user=%s sf_role=%s sql=%.120s", user.email, sf_role, sql
    )

    # The mock MCP ignores role/query_tag; the real Snowflake MCP session must
    # apply them (USE ROLE + ALTER SESSION SET QUERY_TAG) before executing.
    # Until per-role sessions land on the MCP host, the role is resolved and
    # audited here so the wiring point is unambiguous.
    text, is_error = await host.call_tool(
        "snowflake__run_query",
        {"query": sql, "role": sf_role, "query_tag": _query_tag(user)},
    )
    if is_error:
        raise RuntimeError(f"Snowflake query failed: {text}")

    payload = json.loads(text)
    if isinstance(payload, dict) and payload.get("error"):
        raise RuntimeError(payload["error"])

    rows = payload.get("rows", [])
    truncated = bool(payload.get("truncated", False))
    if len(rows) > settings.query_max_rows:
        rows = rows[: settings.query_max_rows]
        truncated = True

    return QueryResult(
        columns=payload.get("columns", []),
        rows=rows,
        row_count=payload.get("row_count", len(rows)),
        truncated=truncated,
    )
