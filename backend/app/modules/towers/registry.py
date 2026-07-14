"""Control tower registry. One entry per business lane; the frontend mirrors
this in src/towers/registry.tsx. Access is role-based so Entra ID group claims
can map onto it later without touching the routes."""

from __future__ import annotations

from dataclasses import dataclass, field


@dataclass(frozen=True)
class Tower:
    id: str
    name: str
    description: str
    # Any of these roles grants access. "admin" always grants access.
    roles: frozenset[str] = field(default_factory=frozenset)
    enabled: bool = True


TOWERS: dict[str, Tower] = {
    "live": Tower(
        id="live",
        name="LIVE Operations",
        description=(
            "Pilgrim's live operations: breeders, hatcheries, broilers and "
            "feed mills, from placement to the plant gate."
        ),
        roles=frozenset({"live.user"}),
    ),
    "plant": Tower(
        id="plant",
        name="Plant Operations",
        description=("Production side: slaughter, processing, yields and plant costs."),
        roles=frozenset({"plant.user"}),
    ),
    "sales": Tower(
        id="sales",
        name="Sales",
        description=(
            "Commercial domain: customer sales, market data, historical sales, "
            "pipeline and P&L."
        ),
        roles=frozenset({"sales.user"}),
    ),
}


def towers_for_roles(roles: list[str]) -> list[Tower]:
    role_set = set(roles)
    if "admin" in role_set:
        return [t for t in TOWERS.values() if t.enabled]
    return [t for t in TOWERS.values() if t.enabled and role_set & t.roles]
