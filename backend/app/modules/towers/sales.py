"""Sales tower routes. This is the active lane: KPIs come from the warehouse
through the shared data service (mock Snowflake MCP in dev, real marts later)."""

from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends, Request

from ..auth import CurrentUser
from ..data import run_query
from .deps import tower_access, tower_router_kwargs
from .registry import TOWERS
from .schemas import Kpi, TowerSummary

TOWER = TOWERS["sales"]

router = APIRouter(**tower_router_kwargs(TOWER))

SUMMARY_SQL = """
SELECT
    COUNT(*) AS orders,
    SUM(volume_lbs) AS volume_lbs,
    SUM(revenue_usd) AS revenue_usd,
    SUM(revenue_usd) / NULLIF(SUM(volume_lbs), 0) AS usd_per_lb
FROM ANALYTICS.MARTS.FCT_SALES_ORDERS
"""


@router.get("/summary")
async def summary(
    request: Request,
    user: Annotated[CurrentUser, Depends(tower_access(TOWER.id))],
) -> TowerSummary:
    result = await run_query(request.app.state.mcp_host, SUMMARY_SQL, user)
    orders, volume, revenue, per_lb = result.rows[0]
    return TowerSummary(
        tower=TOWER.id,
        source="snowflake",
        kpis=[
            Kpi(label="Revenue", value=f"${float(revenue) / 1e6:,.1f}M"),
            Kpi(label="Volume", value=f"{float(volume) / 1e6:,.1f}M", unit="lbs"),
            Kpi(label="Orders", value=f"{int(float(orders)):,}"),
            Kpi(label="Avg Price", value=f"${float(per_lb):,.2f}", unit="/lb"),
        ],
    )
