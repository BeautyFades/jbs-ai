from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends

from ..auth import CurrentUser, require_user
from . import live, plant, sales
from .registry import towers_for_roles
from .schemas import TowerInfo

# Sub-routers already carry their full /api/towers/{id} prefix.
router = APIRouter(tags=["towers"])


@router.get("/api/towers")
async def list_towers(
    user: Annotated[CurrentUser, Depends(require_user)],
) -> list[TowerInfo]:
    return [
        TowerInfo(id=t.id, name=t.name, description=t.description, enabled=t.enabled)
        for t in towers_for_roles(user.roles)
    ]


router.include_router(live.router)
router.include_router(plant.router)
router.include_router(sales.router)
