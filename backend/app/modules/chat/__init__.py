"""Chat module: the server-side Claude agent loop, streamed to the client as
typed SSE events, with conversations persisted to the operational DB."""

from .router import router

__all__ = ["router"]
