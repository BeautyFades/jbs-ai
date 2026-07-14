"""Secure warehouse query endpoints.

POST /api/data/query is the only way the SPA reaches Snowflake. Layers, outer
to inner:
1. require_user       — no identity, no query (401).
2. assert_read_only   — mutating/multi-statement SQL rejected (400).
3. snowflake_role_for — user's app roles resolve to a read-only Snowflake
                        role; no mapping means no warehouse access (403).
4. Snowflake grants + row access policies — actual row-level enforcement.
"""

from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel, Field

from ..auth import CurrentUser, require_user
from .guard import UnsafeSqlError, assert_read_only
from .service import NoWarehouseAccessError, run_query

router = APIRouter(prefix="/api/data", tags=["data"])


class QueryRequest(BaseModel):
    sql: str = Field(min_length=1, max_length=20_000)


class QueryResponse(BaseModel):
    columns: list[str]
    rows: list[list]
    row_count: int
    truncated: bool


@router.post("/query")
async def query(
    body: QueryRequest,
    request: Request,
    user: Annotated[CurrentUser, Depends(require_user)],
) -> QueryResponse:
    try:
        assert_read_only(body.sql)
    except UnsafeSqlError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    try:
        result = await run_query(request.app.state.mcp_host, body.sql, user)
    except NoWarehouseAccessError as exc:
        raise HTTPException(status_code=403, detail="No warehouse access") from exc
    except RuntimeError as exc:
        # Snowflake errors can embed table/column names; keep the detail but
        # never a stack trace.
        raise HTTPException(status_code=502, detail=str(exc)) from exc

    return QueryResponse(
        columns=result.columns,
        rows=result.rows,
        row_count=result.row_count,
        truncated=result.truncated,
    )
