from __future__ import annotations

from pydantic import BaseModel


class TowerInfo(BaseModel):
    id: str
    name: str
    description: str
    enabled: bool


class Kpi(BaseModel):
    label: str
    value: str
    unit: str | None = None
    delta: float | None = None


class TowerSummary(BaseModel):
    tower: str
    kpis: list[Kpi]
    source: str  # "snowflake" or "placeholder"
