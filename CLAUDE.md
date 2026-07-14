# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

JBS AI Control Tower: a FastAPI backend that hosts MCP servers (dbt + Snowflake) and runs a provider-agnostic LLM agent, streamed over SSE to a React (Vite) SPA with an AI assistant on every screen. Architecture rationale: [.ai_jbs_context/ARCHITECTURE.md](.ai_jbs_context/ARCHITECTURE.md). Auth/RLS design: [docs/auth.md](docs/auth.md). `.ai_jbs_context/` also holds business-domain context (lane briefings, knowledge transfer, meeting transcripts) — reference material, not code.

## Commands

### Backend (`backend/`, Python 3.11+, uv)

```powershell
uv sync                                        # install deps
copy .env.example .env                         # set ANTHROPIC_API_KEY
uv run uvicorn app.main:app --port 8000        # run API
uv run python scripts/smoke_mcp.py             # dbt metadata -> SQL -> data, no LLM needed
uv run ruff check . ; uv run ruff format .     # lint / format

# Tests need a reachable Postgres (they create/drop a throwaway *_test db):
docker compose -f docker-compose.yml up -d db
uv run pytest                                  # all tests
uv run pytest tests/test_persistence.py::test_name   # single test

uv run alembic upgrade head                    # migrations (dev default: db_create_all=on instead)
```

Docker: `docker compose up --build` (prod-style) or add `-f docker-compose.dev.yml` for hot-reload. Health check: `GET /api/health`.

### Frontend (`frontend/`, Node 20+, pnpm)

```powershell
pnpm dev          # http://localhost:5173, proxies /api -> 127.0.0.1:8000
pnpm build        # vite build + tsc -b
pnpm check        # lint + typecheck + format:check (CI gate)
pnpm lint / pnpm typecheck / pnpm format
pnpm dlx shadcn@latest add <component>   # add shadcn/ui components
```

Pre-commit hooks (husky + lint-staged) live at repo root `.husky/` and are installed by `pnpm install` run from `frontend/`.

## Backend architecture

Modular monolith. `app/main.py` wires everything; the MCP host starts in the FastAPI lifespan and lives on `app.state.mcp_host`.

- **`app/modules/<name>/`** — one folder per module (`auth`, `chat`, `data`, `platform`, `towers`), each a router + service + repository. Modules don't import each other's internals.
- **`app/providers/`** — provider abstraction (Claude, Gemini, OpenAI-compatible/local). Each provider owns its native conversation history and exposes the shared surface in `providers/base.py`; `app/agent.py` never touches provider-specific message shapes. Providers implement `export_history()`/`import_history()` so the chat module can persist conversations to Postgres and rehydrate after a restart. To add a provider: implement the base surface, wire into `create_provider` in `providers/__init__.py`.
- **`app/mcp_host.py`** — long-lived stdio MCP sessions; tools are namespaced by server name (`dbt__*`, `snowflake__*`) and dispatched back by prefix. `app/host_tools.py` adds backend-handled tools (e.g. `render_chart`) to the same agent tool list.
- **Mock vs real MCP** (`MCP_MODE` in `.env`, default `mock`): mocks in `backend/mocks/` speak the same protocol and serve a hardcoded dbt catalog + seeded DuckDB. Switching to real `dbt-mcp` / `snowflake-labs-mcp` is config only (`app/config.py::mcp_servers()`) — never branch application code on the mode.
- **Auth** (`AUTH_MODE`): `dev` (injected local user), `entra` (App Service EasyAuth headers), `entra_oidc` (self-hosted auth-code + PKCE, BFF pattern — signed httpOnly cookie, no tokens reach the SPA). All modes converge on the same `CurrentUser` (`id`, `email`, `name`, `roles[]`, `towers[]`); downstream code must not care which mode is active.
- **Data access**: `/api/data/query` runs under a Snowflake role derived from the user's app roles (`snowflake_role_map` in config); real row-level enforcement is Snowflake grants + row access policies. `app/modules/data/guard.py` is defense-in-depth only — rejects mutating/session-tampering SQL and multi-statement requests before it leaves the app.
- **Towers**: `app/modules/towers/registry.py` is the single registry of business lanes (live, plant, sales) with role-based access; the frontend mirrors it in `src/towers/registry.ts`. Adding a lane means updating both.
- **DB**: Postgres (SQLAlchemy async + asyncpg) is the *operational* store (conversations, platform state); Snowflake is the system of record for analytics data. Dev default creates tables from ORM metadata (`db_create_all=on`); real environments own schema via Alembic.

## Frontend architecture

See [frontend/README.md](frontend/README.md) for full conventions. The load-bearing rules:

- **React Compiler is on** — write plain components, no `useMemo`/`useCallback`/`memo` for performance (`useCallback` for stable context identities is still fine).
- **Feature folders** (`src/features/<name>/`): features own their screens; `src/routes/` files only wire features to URLs. Features may import from `ai/`, `components/`, `lib/`, `auth/` — never from other features; shared code moves down a layer.
- **AI-native seam** (`src/ai/`): `AssistantProvider` (above the router) holds one conversation shared by the `/assistant` page and the floating dock in `__root.tsx` (Ctrl+K anywhere). Features expose browser-side agent actions via `useAiTool` and live page context via `useAiPageContext` in the tool registry (`src/ai/tool-registry.tsx`); the assistant resolves `client_tool_call` SSE events against it. New modules register `<name>.*` tools to be AI-native by construction.
- `src/components/ui/` is vendored shadcn code — edit freely, keep generic. Charting goes through `src/components/ui/chart/` (Chart.js wrappers, theme-aware).
- `src/routeTree.gen.ts` is generated by the router plugin — never edit.
- A `frontend-design` skill is available under `frontend/.claude/skills/` for UI work.

## Cross-cutting notes

- SSE agent event protocol (`text_delta`, `tool_call`, `tool_result`, `client_tool_call`, `done`) is the contract between `app/agent.py`/chat module and `src/ai/api.ts`/`types.ts` — change both sides together.
- A conversation's provider is fixed for its lifetime; switching providers starts a new `session_id`.
- PoC scope: no writeback/dashboards/alerts yet; see the architecture doc for where each lands in the module layout.
