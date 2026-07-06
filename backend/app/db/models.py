"""ORM models for the operational store.

Phase 0 covers conversation persistence and a platform event log. Later
phases add auth (users/app_roles/role_assignments), dashboards (saved_views),
alerts, and tasks (boards/tasks/comments) — see docs/ARCHITECTURE.md and the
release plan.
"""

from __future__ import annotations

from datetime import datetime

from sqlalchemy import (
    DateTime,
    ForeignKey,
    Index,
    Integer,
    String,
    func,
)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base


class Conversation(Base):
    """One chat session. `session_id` is the client-generated id the SSE
    endpoint uses; the provider/model are fixed for the conversation's life
    (switching providers starts a new session_id, see the frontend)."""

    __tablename__ = "conversations"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    session_id: Mapped[str] = mapped_column(String(64), unique=True, index=True)
    provider: Mapped[str] = mapped_column(String(32))
    model: Mapped[str | None] = mapped_column(String(128), nullable=True)
    # Plain column for now; Phase 1 (auth) adds the FK to users.id via migration.
    user_id: Mapped[int | None] = mapped_column(Integer, nullable=True, index=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    messages: Mapped[list["Message"]] = relationship(
        back_populates="conversation",
        order_by="Message.seq",
        cascade="all, delete-orphan",
    )


class Message(Base):
    """A single provider-native message, stored verbatim as JSON so the
    provider can be rehydrated on a cold start (survives restart) and the
    exchange is auditable. `role` is denormalized out of the payload for
    cheap filtering/rendering."""

    __tablename__ = "messages"
    __table_args__ = (
        Index("ix_messages_conversation_seq", "conversation_id", "seq", unique=True),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    conversation_id: Mapped[int] = mapped_column(
        ForeignKey("conversations.id", ondelete="CASCADE"), index=True
    )
    seq: Mapped[int] = mapped_column(Integer)
    role: Mapped[str] = mapped_column(String(32))
    # Provider-native message dict (Claude content blocks, OpenAI message,
    # or Gemini Content) — JSON-serializable form.
    content: Mapped[dict] = mapped_column(JSONB)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    conversation: Mapped[Conversation] = relationship(back_populates="messages")


class PlatformEvent(Base):
    """Append-only usage/audit log. Every agent exchange, mutation, and (from
    Phase 1) auth event lands here; later synced to Snowflake via Fivetran so
    platform usage reports alongside business data."""

    __tablename__ = "platform_events"
    __table_args__ = (
        Index("ix_platform_events_type_created", "event_type", "created_at"),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    event_type: Mapped[str] = mapped_column(String(64), index=True)
    user_id: Mapped[int | None] = mapped_column(Integer, nullable=True, index=True)
    session_id: Mapped[str | None] = mapped_column(String(64), nullable=True, index=True)
    metadata_json: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
