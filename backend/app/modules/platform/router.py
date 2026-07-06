from __future__ import annotations

from fastapi import APIRouter, Request

from ...config import settings
from ...host_tools import HOST_TOOLS
from ...providers import PROVIDER_NAMES

router = APIRouter(prefix="/api", tags=["platform"])


@router.get("/health")
async def health(request: Request):
    host = request.app.state.mcp_host
    return {
        "status": "ok",
        "mcp_mode": settings.mcp_mode,
        "mcp_servers": list(host.sessions),
        "tools": [t["name"] for t in host.tools] + [t["name"] for t in HOST_TOOLS],
        "default_provider": settings.llm_provider,
        "available_providers": PROVIDER_NAMES,
    }
