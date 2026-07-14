import logging
from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .db import Base, engine
from .db import models  # noqa: F401  (import for side effect: register tables)
from .mcp_host import MCPHost
from .modules.auth import require_user
from .modules.auth import router as auth_router
from .modules.chat import router as chat_router
from .modules.platform import router as platform_router
from .modules.towers.router import router as towers_router

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Dev/test convenience: create tables from the ORM metadata. Real
    # environments manage schema with Alembic migrations (see migrations/).
    if settings.db_create_all:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        logger.info("DB tables ensured (db_create_all=on)")

    host = MCPHost()
    await host.start(settings.mcp_servers())
    app.state.mcp_host = host
    try:
        yield
    finally:
        await host.stop()


def create_app() -> FastAPI:
    app = FastAPI(title="JBS AI Control Tower", lifespan=lifespan)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # /api/health stays open for probes; everything else requires a user.
    app.include_router(platform_router)
    app.include_router(auth_router)
    app.include_router(towers_router)
    app.include_router(chat_router, dependencies=[Depends(require_user)])
    return app


app = create_app()
