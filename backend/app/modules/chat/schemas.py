from __future__ import annotations

from pydantic import BaseModel


class ChatRequest(BaseModel):
    session_id: str
    message: str
    # Optional per-request override; only takes effect the first time a given
    # session_id is used — the provider is fixed for the conversation's life
    # (see the chat service).
    provider: str | None = None
    model: str | None = None
