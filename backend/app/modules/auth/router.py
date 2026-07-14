from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends

from .deps import require_user
from .schemas import CurrentUser

router = APIRouter(prefix="/api", tags=["auth"])


@router.get("/me")
async def me(user: Annotated[CurrentUser, Depends(require_user)]) -> CurrentUser:
    return user
