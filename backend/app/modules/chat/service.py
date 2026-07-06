"""Chat session lifecycle and persistence.

Owns the mapping from a client `session_id` to a live provider instance,
rehydrating it from the operational DB on a cold start (so a conversation
survives a server restart) and persisting each exchange after it streams.

The provider is fixed for a conversation's lifetime — switching providers
mid-conversation would require translating history between providers' native
formats, which isn't attempted; the frontend starts a new session_id to
change providers.
"""

from __future__ import annotations

import logging
from typing import Any, AsyncIterator

from ...agent import run_agent
from ...db.session import SessionLocal
from ...mcp_host import MCPHost
from ...providers import create_provider
from ..platform import repository as platform_repo
from . import repository as repo

logger = logging.getLogger(__name__)

# Warm cache of live provider instances: session_id -> (provider, conversation_id).
# The DB is the source of truth; this only avoids re-loading history on every
# request within a running process. Lost on restart — rehydration rebuilds it.
_live: dict[str, tuple[Any, int]] = {}


async def _ensure_session(
    session_id: str, provider: str | None, model: str | None
) -> tuple[Any, int]:
    cached = _live.get(session_id)
    if cached is not None:
        return cached

    async with SessionLocal() as session:
        conv = await repo.get_or_create_conversation(
            session, session_id, provider or "claude", model
        )
        conv_id = conv.id
        # Rehydrate against the provider/model the conversation was created
        # with, not a (possibly different) per-request override.
        history = await repo.load_history(session, conv_id)
        conv_provider, conv_model = conv.provider, conv.model
        await session.commit()

    llm = create_provider(conv_provider, conv_model)
    if history:
        llm.import_history(history)
        logger.info(
            "Rehydrated session %s (%d messages) for provider %s",
            session_id,
            len(history),
            conv_provider,
        )
    _live[session_id] = (llm, conv_id)
    return llm, conv_id


async def _persist_exchange(
    session_id: str, conv_id: int, llm: Any, start_seq: int
) -> None:
    history = llm.export_history()
    new_messages = history[start_seq:]
    if not new_messages:
        return
    async with SessionLocal() as session:
        await repo.append_messages(session, conv_id, start_seq, new_messages)
        await platform_repo.log_event(
            session,
            "chat_exchange",
            session_id=session_id,
            metadata={"new_messages": len(new_messages)},
        )
        await session.commit()


async def stream_chat(
    session_id: str,
    message: str,
    host: MCPHost,
    provider: str | None = None,
    model: str | None = None,
) -> AsyncIterator[dict[str, Any]]:
    """Yield agent events for one user turn, then persist the exchange.

    Persistence runs in a finally block so a partial/errored turn is still
    saved consistently — the provider drops any dangling assistant turn on
    error, so the stored history stays valid API input for the next request."""
    llm, conv_id = await _ensure_session(session_id, provider, model)
    start_seq = len(llm.export_history())
    try:
        async for event in run_agent(llm, message, host):
            yield event
    finally:
        try:
            await _persist_exchange(session_id, conv_id, llm, start_seq)
        except Exception:  # persistence must never break the stream
            logger.exception("Failed to persist chat exchange for %s", session_id)
