"""Plant Operations tower routes. Lane is TBD on the JBS side; placeholder
KPIs until a data source is scoped."""

from __future__ import annotations

from fastapi import APIRouter, Depends

from .deps import tower_access, tower_router_kwargs
from .registry import TOWERS
from .schemas import Kpi, TowerSummary

TOWER = TOWERS["plant"]

router = APIRouter(
    **tower_router_kwargs(TOWER), dependencies=[Depends(tower_access(TOWER.id))]
)


@router.get("/summary")
async def summary() -> TowerSummary:
    return TowerSummary(
        tower=TOWER.id,
        source="placeholder",
        kpis=[
            Kpi(label="Head Processed", value="1.24M", unit="wk", delta=2.1),
            Kpi(label="Yield", value="73.6", unit="%", delta=-0.2),
            Kpi(label="Line Efficiency", value="91.8", unit="%", delta=0.6),
            Kpi(label="Cost per Head", value="$38.20", delta=-1.4),
        ],
    )
