# syntax=docker/dockerfile:1

FROM python:3.12-slim-bookworm

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app

ENV UV_COMPILE_BYTECODE=1 \
    UV_LINK_MODE=copy \
  PYTHONUNBUFFERED=1

# Install dependencies first (layer cache).
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev --no-install-project

COPY app ./app
COPY mocks ./mocks
COPY scripts ./scripts
COPY migrations ./migrations
COPY alembic.ini ./

RUN uv sync --frozen --no-dev

EXPOSE 8000

# Production: single async worker per replica. Conversation state lives in the
# operational DB, so replicas scale horizontally without sticky sessions — a
# request landing on a cold replica rehydrates the conversation from the DB
# (see modules/chat/service.py). Run `uv run alembic upgrade head` on deploy
# when DB_CREATE_ALL is off and Alembic owns the schema.
CMD ["uv", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
