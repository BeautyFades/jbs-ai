"""LIVE Operations tower routes. Data source will be the LIVE_OPERATIONS
Snowflake database (see pilgrims-control-tower for the reference queries);
until that connection exists this serves placeholder KPIs."""

from __future__ import annotations

from fastapi import APIRouter, Depends

from .deps import tower_access, tower_router_kwargs
from .registry import TOWERS
from .schemas import Kpi, TowerSummary

TOWER = TOWERS["live"]

router = APIRouter(
    **tower_router_kwargs(TOWER), dependencies=[Depends(tower_access(TOWER.id))]
)


@router.get("/summary")
async def summary() -> TowerSummary:
    return TowerSummary(
        tower=TOWER.id,
        source="placeholder",
        kpis=[
            Kpi(label="Livability", value="95.4", unit="%", delta=0.3),
            Kpi(label="Avg Daily Gain", value="0.142", unit="lb/day", delta=-0.8),
            Kpi(label="Feed Conversion", value="1.78", unit="FCR", delta=0.5),
            Kpi(label="Hatch Rate", value="82.1", unit="%", delta=1.2),
        ],
    )
