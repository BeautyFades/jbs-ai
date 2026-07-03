import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from .agent import run_agent, sse_format
from .config import settings
from .mcp_host import MCPHost
from .providers import PROVIDER_NAMES

logging.basicConfig(level=logging.INFO)

host = MCPHost()


@asynccontextmanager
async def lifespan(app: FastAPI):
    await host.start(settings.mcp_servers())
    yield
    await host.stop()


app = FastAPI(title="JBS AI Control Tower PoC", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    session_id: str
    message: str
    # Optional per-request override; falls back to settings.llm_provider.
    # Only takes effect the first time a given session_id is used — the
    # provider is fixed for the lifetime of a session (see agent.py).
    provider: str | None = None
    model: str | None = None


@app.get("/api/health")
async def health():
    return {
        "status": "ok",
        "mcp_mode": settings.mcp_mode,
        "mcp_servers": list(host.sessions),
        "tools": [t["name"] for t in host.tools],
        "default_provider": settings.llm_provider,
        "available_providers": PROVIDER_NAMES,
    }


@app.post("/api/chat")
async def chat(req: ChatRequest):
    async def stream():
        async for event in run_agent(
            req.session_id, req.message, host, provider=req.provider, model=req.model
        ):
            yield sse_format(event)

    return StreamingResponse(
        stream(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )
