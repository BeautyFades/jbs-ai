# JBS AI Control Tower — PoC

Proof of concept for a centralized analytics platform for JBS Foods: a **FastAPI** backend that hosts **MCP servers** (dbt + Snowflake) and runs a **Claude agent** that discovers dbt metadata, writes SQL, executes it on Snowflake, and streams a formatted answer to a **React (Vite)** chat UI.

Architecture evaluation and target design: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## How it works

```
React chat (SSE) → FastAPI /api/chat → Claude (claude-opus-4-8, agentic tool loop)
                                          │ tools (namespaced)
                        ┌─────────────────┴─────────────────┐
                   dbt MCP server                    Snowflake MCP server
              (models, columns, relations)            (run_query → data)
```

The agent's loop: `dbt__list_models` / `dbt__get_model_details` → write SQL against the fully-qualified relations → `snowflake__run_query` → narrative answer + markdown table. The UI renders streamed text, collapsible tool-call cards (SQL shown), and result data tables.

By default the backend runs in **mock mode**: two local MCP servers (same protocol as the real ones) serve a hardcoded dbt catalog and a DuckDB seeded with meat-industry sample data (plants, sales orders, protein spot prices). Switching to the official [`dbt-mcp`](https://github.com/dbt-labs/dbt-mcp) and [Snowflake MCP](https://github.com/Snowflake-Labs/mcp) servers is configuration only — no application code changes.

## Run it

Prereqs: Python 3.11+ with [uv](https://docs.astral.sh/uv/), Node 20+ with [pnpm](https://pnpm.io/), an `ANTHROPIC_API_KEY`.

```powershell
# Backend (terminal 1)
cd backend
copy .env.example .env       # set ANTHROPIC_API_KEY
uv sync
uv run uvicorn app.main:app --port 8000

# Frontend (terminal 2)
cd frontend
pnpm install
pnpm dev                     # http://localhost:5173 (proxies /api to :8000)
```

Sanity checks without the UI:

```powershell
curl http://127.0.0.1:8000/api/health          # MCP servers + aggregated tools
cd backend; uv run python scripts/smoke_mcp.py # dbt metadata -> SQL -> data, no Claude needed
```

## Real dbt Cloud + Snowflake

In `backend/.env` set `MCP_MODE=real` and fill in the `DBT_*` and `SNOWFLAKE_*` variables (see `.env.example`). The backend then launches `uvx dbt-mcp` and `uvx snowflake-labs-mcp` instead of the mocks.

## Layout

```
backend/
  app/config.py      # settings + MCP server launch specs (mock vs real)
  app/mcp_host.py    # stdio MCP sessions, tool aggregation/namespacing, tool dispatch
  app/agent.py       # Claude streaming agentic loop + in-memory conversations
  app/main.py        # FastAPI app, /api/chat (SSE), /api/health
  mocks/             # mock dbt + Snowflake MCP servers (DuckDB, seeded data)
  scripts/smoke_mcp.py
frontend/            # Vite + React + TS chat UI (SSE client, tool cards, tables)
docs/ARCHITECTURE.md # stack evaluation and target architecture
```

## PoC limitations (by design)

No auth/SSO, conversations stored in process memory, no persistence, single-user assumptions, no writeback/dashboards/alerts yet. See the architecture doc for how each lands in the module layout.
