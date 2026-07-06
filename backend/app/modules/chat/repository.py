"""Data access for conversations and messages."""

from __future__ import annotations

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from ...db.models import Conversation, Message


async def get_or_create_conversation(
    session: AsyncSession, session_id: str, provider: str, model: str | None
) -> Conversation:
    conv = (
        await session.execute(
            select(Conversation).where(Conversation.session_id == session_id)
        )
    ).scalar_one_or_none()
    if conv is not None:
        return conv
    conv = Conversation(session_id=session_id, provider=provider, model=model)
    session.add(conv)
    await session.flush()  # assign conv.id without ending the transaction
    return conv


async def load_history(session: AsyncSession, conversation_id: int) -> list[dict]:
    """Ordered provider-native message dicts for rehydration."""
    rows = (
        await session.execute(
            select(Message.content)
            .where(Message.conversation_id == conversation_id)
            .order_by(Message.seq)
        )
    ).scalars().all()
    return list(rows)


async def count_messages(session: AsyncSession, conversation_id: int) -> int:
    return (
        await session.execute(
            select(func.count())
            .select_from(Message)
            .where(Message.conversation_id == conversation_id)
        )
    ).scalar_one()


async def append_messages(
    session: AsyncSession,
    conversation_id: int,
    start_seq: int,
    messages: list[dict],
) -> None:
    """Persist new provider-native messages at seq >= start_seq."""
    for offset, msg in enumerate(messages):
        session.add(
            Message(
                conversation_id=conversation_id,
                seq=start_seq + offset,
                role=str(msg.get("role") or "unknown"),
                content=msg,
            )
        )
