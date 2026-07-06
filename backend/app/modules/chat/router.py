from __future__ import annotations

from fastapi import APIRouter, Request
from fastapi.responses import StreamingResponse

from ...agent import sse_format
from .schemas import ChatRequest
from .service import stream_chat

router = APIRouter(prefix="/api", tags=["chat"])


@router.post("/chat")
async def chat(req: ChatRequest, request: Request):
    host = request.app.state.mcp_host

    async def stream():
        async for event in stream_chat(
            req.session_id, req.message, host, provider=req.provider, model=req.model
        ):
            yield sse_format(event)

    return StreamingResponse(
        stream(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )
