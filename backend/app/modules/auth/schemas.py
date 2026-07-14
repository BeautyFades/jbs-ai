from __future__ import annotations

from pydantic import BaseModel


class CurrentUser(BaseModel):
    id: str
    email: str
    name: str
    roles: list[str] = []
    # Tower ids this user may enter (derived from roles, see towers.registry).
    towers: list[str] = []
