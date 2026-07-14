from __future__ import annotations

from typing import Annotated

from fastapi import Depends, HTTPException

from ..auth import CurrentUser, require_user
from .registry import TOWERS, Tower


def tower_access(tower_id: str):
    """Dependency factory: authenticated user with access to this tower."""
    tower = TOWERS.get(tower_id)
    if tower is None:
        raise ValueError(f"Unknown tower id: {tower_id}")

    async def check(
        user: Annotated[CurrentUser, Depends(require_user)],
    ) -> CurrentUser:
        if tower_id not in user.towers:
            raise HTTPException(status_code=403, detail="No access to this tower")
        return user

    return check


def tower_router_kwargs(tower: Tower) -> dict:
    return {
        "prefix": f"/api/towers/{tower.id}",
        "tags": [f"tower:{tower.id}"],
    }
