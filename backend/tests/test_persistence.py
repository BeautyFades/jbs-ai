"""Phase 0: conversation persistence + rehydration.

Runs against Postgres (same engine as prod — no second DB dialect to reason
about). The fixture creates and drops a throwaway `*_test` database so it is
isolated from dev data. Point TEST_DATABASE_URL at any reachable Postgres;
default targets the docker-compose instance.

    docker compose -f docker-compose.yml up -d db
    uv run pytest
"""

from __future__ import annotations

import os

import pytest
from sqlalchemy import text
from sqlalchemy.engine import make_url
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)

from app.db import Base
from app.db import models  # noqa: F401
from app.modules.chat import repository as repo
from app.providers.openai_compatible import OpenAICompatibleProvider

TEST_DATABASE_URL = os.getenv(
    "TEST_DATABASE_URL",
    "postgresql+asyncpg://jbs:jbs@localhost:5432/jbs_ai_test",
)


@pytest.fixture
async def session_factory():
    url = make_url(TEST_DATABASE_URL)
    admin_url = url.set(database="postgres")
    db_name = url.database

    # Create a fresh test database via an autocommit admin connection.
    admin = create_async_engine(admin_url, isolation_level="AUTOCOMMIT")
    async with admin.connect() as conn:
        await conn.execute(text(f'DROP DATABASE IF EXISTS "{db_name}" WITH (FORCE)'))
        await conn.execute(text(f'CREATE DATABASE "{db_name}"'))
    await admin.dispose()

    engine = create_async_engine(url)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    factory = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)
    try:
        yield factory
    finally:
        await engine.dispose()
        admin = create_async_engine(admin_url, isolation_level="AUTOCOMMIT")
        async with admin.connect() as conn:
            await conn.execute(text(f'DROP DATABASE IF EXISTS "{db_name}" WITH (FORCE)'))
        await admin.dispose()


def _fake_exchange(provider) -> None:
    """Simulate what the agent loop appends across one turn, using plain-dict
    messages (OpenAI-shaped) so no SDK objects or network are needed."""
    provider.add_user_message("What data is available?")
    provider._messages.append({"role": "assistant", "content": "Sales, plants, prices."})


def test_provider_history_roundtrip():
    p = OpenAICompatibleProvider(model="test")
    _fake_exchange(p)
    exported = p.export_history()

    restored = OpenAICompatibleProvider(model="test")
    restored.import_history(exported)
    assert restored.export_history() == exported
    assert restored._messages[0]["content"] == "What data is available?"


async def test_persist_and_rehydrate(session_factory):
    # --- exchange 1: create conversation, persist the new messages ---
    async with session_factory() as s:
        conv = await repo.get_or_create_conversation(s, "sess-1", "openai", "gpt-4o")
        conv_id = conv.id
        await s.commit()

    p1 = OpenAICompatibleProvider(model="gpt-4o")
    start = len(p1.export_history())
    _fake_exchange(p1)
    async with session_factory() as s:
        await repo.append_messages(s, conv_id, start, p1.export_history()[start:])
        await s.commit()

    # --- cold start: new process, rehydrate from DB ---
    async with session_factory() as s:
        history = await repo.load_history(s, conv_id)
        count = await repo.count_messages(s, conv_id)

    assert count == 2
    p2 = OpenAICompatibleProvider(model="gpt-4o")
    p2.import_history(history)
    assert p2.export_history() == p1.export_history()

    # --- exchange 2 appends without duplicating exchange 1 ---
    start2 = len(p2.export_history())
    p2._messages.append({"role": "user", "content": "and prices?"})
    p2._messages.append({"role": "assistant", "content": "Weekly protein prices."})
    async with session_factory() as s:
        await repo.append_messages(s, conv_id, start2, p2.export_history()[start2:])
        await s.commit()

    async with session_factory() as s:
        assert await repo.count_messages(s, conv_id) == 4
        rows = await repo.load_history(s, conv_id)
        assert rows[-1]["content"] == "Weekly protein prices."
