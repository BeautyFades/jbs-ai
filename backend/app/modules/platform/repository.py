"""Append-only platform event log."""

from __future__ import annotations

from sqlalchemy.ext.asyncio import AsyncSession

from ...db.models import PlatformEvent


async def log_event(
    session: AsyncSession,
    event_type: str,
    *,
    session_id: str | None = None,
    user_id: int | None = None,
    metadata: dict | None = None,
) -> None:
    session.add(
        PlatformEvent(
            event_type=event_type,
            session_id=session_id,
            user_id=user_id,
            metadata_json=metadata,
        )
    )
