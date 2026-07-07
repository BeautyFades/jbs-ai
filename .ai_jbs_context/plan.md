# JBS "Total Sales Analytics" — Application Platform: Architecture & Release Plan

## Context

Dustin (Head of Digital Transformation) got Márcio's (Corporate IT) buy-in to build a **Claude-powered sales control-tower web app** over the Snowflake data lake as an alternative consumption layer to Qlik ("*click is too slow… we'll never get there with just Qlik apps in a timely manner*"). This repo is the seed of that app: a working PoC with a FastAPI MCP host, a provider-agnostic streaming agent, and a React chat UI running against mock dbt/Snowflake MCP servers.

This plan turns that PoC into a **production, modular, incrementally-shippable application platform**. It is deliberately scoped to the **application layer only** — the dbt/Snowflake/Fivetran data platform (Sales-lane WBS + Corp IT's Hub-and-Spoke) is owned by other workstreams; this app *consumes* the tool-agnostic gold layer and never dictates modeling or orchestration.

**Confirmed decisions driving this plan** (from stakeholder Q&A):
- **Scope:** application platform only (this repo → production).
- **LLM access:** direct Anthropic API (same approved path as JBS's 60-user Claude Code pilot). Keep the provider abstraction, but Claude is the target.
- **Deploy target:** JBS **Azure (AKS / containers)** promoted via the existing **Azure DevOps** pipeline (Hari merges → dev → prod, Thursdays). GitHub `bixtecnologia` mirrors to Azure DevOps.
- **Master data:** build the **in-app writeback editor now** (not the SharePoint interim step) → Snowflake Hybrid Tables + audit table.

**Team:** 5 people — data engineers + fullstack engineers (Fellipe Fernandes = Data Architect; Rodrigo = DE; Vitor pivoting to AI/Qlik; plus a to-hire AI engineer and a backend Python engineer). Plan for a small team: favor a **modular monolith**, boring/proven tools, and thin vertical slices over broad scaffolding.

### Hard constraints (non-negotiable)
- **Data never leaves JBS.** No local downloads, no copies in BIX infra. The backend is the only thing that talks to Snowflake; the browser never holds Snowflake creds or raw bulk data.
- **Row-level security stays at the Snowflake federation layer.** The app must query Snowflake *as the user's role*, not a shared service account, so existing Snowflake RLS/Section-Access equivalents are honored.
- **Deploy discipline is corporate:** Azure DevOps, weekly Thursday promotion by Hari. CI must produce artifacts that drop into that flow.
- **Two consumption tracks coexist:** Qlik is not being turned off soon (Márcio). This app is additive, not a big-bang Qlik replacement.

---

## Guiding principles

1. **Modular monolith first, services never (until forced).** One FastAPI app, strict module boundaries so any module can be extracted later — but 5 people should not operate a microservice fleet.
2. **Backend is the MCP host and the only trust boundary.** All Snowflake/dbt access, credentials, and tool execution live server-side, audited and permission-filtered. This also positions us to plug into Márcio's future **centralized MCP Hub** without rework.
3. **Ship vertical slices behind auth from Phase 1.** Every phase is independently demoable in the Friday/Monday weekly. No phase leaves the app unusable.
4. **Snowflake is the analytical system of record; Postgres is the app's operational store.** Don't push sessions/tasks/auth/logs into Snowflake (wrong grain); don't push analytics into Postgres.
5. **Right-size, don't pre-build.** No Redis, no Airflow/Dagster in the app, no MetricFlow, no dedicated MDM tool until usage numbers justify them.

---

## Target architecture

```
┌──────────────────── React (Vite) SPA — Azure static hosting ─────────────────────┐
│  Chat + Artifacts │ Dashboards │ Master-data editor │ Alerts │ Task board │ Admin │
└───────────────┬──────────────────────────────────────────────────────────────────┘
                │  HTTPS · SSE (chat) · WebSocket (task board/alerts)   OIDC bearer
┌───────────────▼──────────── FastAPI modular monolith (AKS) ───────────────────────┐
│  auth      — OIDC (Azure AD), app-RBAC, Snowflake-role mapping                     │
│  chat      — server-side Claude agent loop, streamed as typed SSE events           │
│  dashboards— saved queries / semantic-layer reads + result cache                   │
│  writeback — master-data grid → Hybrid Table MERGE + append-only audit             │
│  alerts    — rule engine + scheduler → Teams/email                                 │
│  tasks     — Kanban board, AI-created tasks, WebSocket live updates                 │
│  platform  — usage events, audit, health/observability                             │
│                                                                                     │
│  MCP Host layer (long-lived sessions, per-user Snowflake role)                     │
│   ├── dbt MCP  (models, lineage, semantic layer)                                   │
│   └── Snowflake MCP (query exec, writeback)                                        │
└───────┬───────────────────────────────┬───────────────────────┬────────────────────┘
        │                               │                       │
   Anthropic API                 Snowflake (gold + Hybrid    PostgreSQL (operational:
   (claude-opus-4-8)             Tables master data)          auth, tasks, alerts,
                                                              usage/audit, saved views)
```

**dbt reads the master-data Hybrid Tables and the app's Postgres tables (via Fivetran → Snowflake) as ordinary sources** — so platform-usage analytics ("who uses the agent most") extend the existing medallion architecture rather than forming a second stack.

---

## Module boundaries (backend)

Each module = `router + service + repository`, independently testable and extractable. Convention: `backend/app/modules/<name>/{router.py, service.py, repository.py, schemas.py}`.

| Module | Owns | Talks to |
|---|---|---|
| `auth` | OIDC login, token validation, app-role resolution, Snowflake-role mapping per session | Azure AD, Postgres |
| `chat` | Agent loop, SSE streaming, conversation persistence | MCP host, Anthropic, Postgres |
| `mcp_host` | Long-lived dbt/Snowflake MCP sessions, per-user role scoping, tool namespacing | Snowflake, dbt |
| `dashboards` | Saved queries, semantic-layer-backed reads, result caching | MCP host, Postgres |
| `writeback` | Master-data grid mutations → Hybrid Table `MERGE` + audit; validation | Snowflake, Postgres |
| `alerts` | Rule definitions, scheduled evaluation, notification dispatch | Snowflake, Teams/email, Postgres |
| `tasks` | Kanban board, AI-created tasks (`create_task` tool), live updates | Postgres, WebSocket |
| `platform` | Usage events, audit trail, health, rate limiting | Postgres |

**App-roles ≠ Snowflake-roles** (keep strictly separate): Snowflake roles govern *which data*; app roles govern *which features* (can-edit-master-data, can-publish-dashboard, is-admin). Conflating them will tangle within a year.

---

## Tech stack & tooling

| Concern | Choice | Notes |
|---|---|---|
| Backend | **FastAPI** (async), Python 3.11+, **uv** | Already in place; async is essential for streaming agent + concurrent Snowflake calls. |
| Agent SDK | **anthropic** (`claude-opus-4-8`), manual tool loop | Already in place; provider abstraction retained as an escape hatch. |
| MCP | **`mcp`** Python SDK, stdio (dbt) + HTTP (Snowflake) | Real servers: `dbt-mcp`, `snowflake-labs-mcp`. |
| Operational DB | **PostgreSQL** + **SQLAlchemy 2.0 async** + **Alembic** | New. Auth, tasks, alerts, usage, saved views, conversation history. |
| Frontend | **React 18 + Vite + TS** | In place. Add **TanStack Query** (server state), **React Router**, **shadcn/ui** (component system), keep **Chart.js** (already used) — see `dataviz` skill before new charts. |
| Realtime | **SSE** (chat, in place) + **WebSocket** (task board, alerts inbox) | Native to FastAPI/Starlette. |
| Auth | **OIDC via Azure AD** (`authlib` / `fastapi-azure-auth`) | JBS is Microsoft-ecosystem; SSO expected. |
| Containers | **Docker** (backend Dockerfile in place; add frontend build stage) | |
| Orchestration | **AKS** manifests / Helm; secrets via Azure Key Vault | Deploy target confirmed. |
| CI | GitHub Actions (lint/test/build images) → mirror to **Azure DevOps** for Hari's promotion | Corporate deploy flow. |
| Observability | Structured logging → app `platform` events; OpenTelemetry-ready | Usage analytics fed back to Snowflake via Fivetran Postgres connector. |

**Explicitly NOT in the app:** Airflow/Dagster (Corp IT owns orchestration; dbt Cloud scheduler runs the pipeline today), Redis (add only if reference-data latency shows up), MetricFlow (semantic layer is the ADR's hybrid schema.yml + KPI dictionary, consumed as RAG), a dedicated MDM tool.

---

## Repository / folder structure (monorepo)

```
jbs-ai/
├── backend/
│   ├── app/
│   │   ├── main.py                 # app factory, router registration, lifespan
│   │   ├── config.py               # existing settings (extend: DB, OIDC, Anthropic)
│   │   ├── mcp_host.py             # existing; add per-user role scoping
│   │   ├── host_tools.py           # existing render_chart; add create_task etc.
│   │   ├── agent.py                # existing loop; source system prompt from semantic layer
│   │   ├── providers/              # existing claude/gemini/openai abstraction
│   │   ├── db/                     # NEW: SQLAlchemy engine, session, base
│   │   ├── modules/                # NEW: auth, chat, dashboards, writeback, alerts, tasks, platform
│   │   │   └── <name>/{router,service,repository,schemas}.py
│   │   └── core/                   # NEW: security deps, RBAC policy, errors, pagination
│   ├── migrations/                 # NEW: Alembic
│   ├── mocks/                      # existing DuckDB mock MCP servers (keep for local/CI)
│   └── tests/                      # NEW: pytest per module
├── frontend/
│   └── src/
│       ├── routes/                 # NEW: chat, dashboards, master-data, alerts, tasks, admin
│       ├── components/             # existing ChartCard, ToolCard + shadcn primitives
│       ├── lib/                    # NEW: api client, auth, query hooks
│       └── ...
├── deploy/                         # NEW: Dockerfiles, k8s/Helm, azure-pipelines.yml
├── docs/                           # ARCHITECTURE.md (update per phase)
└── ai_ctx/                         # business context (unchanged)
```

---

## Release plan (incremental, each phase demoable)

Sizing is relative for a 5-person team; sequence matters more than dates. Every phase ships behind auth and through the Azure DevOps pipeline.

### Phase 0 — Productionize the PoC (foundation)
**Goal:** the current mock demo becomes a deployable, real-data-capable skeleton.
- Refactor `main.py` into an app factory + module registration; move chat into `modules/chat`.
- Stand up **PostgreSQL** + SQLAlchemy async + Alembic; **persist conversations** (replace the in-memory `_sessions` dict in `agent.py`).
- Wire **real MCP mode** end-to-end against a dev Snowflake + dbt (flip `MCP_MODE=real`, provide `snowflake_mcp_config.yaml`).
- Add `deploy/` — frontend Docker build stage, AKS manifests/Helm, `azure-pipelines.yml`; GitHub Actions for lint/test/image build.
- **Exit:** deployed to JBS Azure dev, real Snowflake query answered end-to-end, conversation survives restart.

### Phase 1 — Auth & security (gate everything)
**Goal:** no unauthenticated access; queries run as the user's Snowflake role.
- `modules/auth`: **OIDC via Azure AD**, token validation, session issuance.
- App-RBAC tables in Postgres (`users`, `app_roles`, `role_assignments`, `feature_permissions`); FastAPI dependency guards per route.
- **Per-user Snowflake role scoping** in `mcp_host` (the load-bearing security requirement — RLS honored at the warehouse).
- `platform` audit/usage events on every agent query and mutation.
- **Exit:** SSO login works; two users with different Snowflake roles see different data through the same chat.

### Phase 2 — Chat/agent hardening + semantic layer
**Goal:** the "talk to your data" agent is trustworthy and grounded.
- Feed the **semantic layer** (ADR: `schema.yml` + WP-05 KPI Dictionary + Domain Concepts — Walmart fiscal calendar, UPC vs SKU, "stores selling" vs "not yet sold") into the system prompt / as retrievable context, replacing the hardcoded meat-industry prompt.
- Artifact rendering, tool-activity UI polish (build on existing `ToolCard`/`ChartCard`), streaming robustness, rate limiting, max-turn guardrails.
- Conversation history browsing.
- **Exit:** agent answers real SMD/velocity questions using KPI-dictionary definitions; validated against Qlik numbers for one retailer (e.g., Kroger).

### Phase 3 — Master-data editor (writeback) *(prioritized per decision)*
**Goal:** Jacob's team edits mappings in-app; Qlik writeback retired for this use case.
- **Feasibility gate first:** confirm `ENABLE_HYBRID_TABLES` + Streamlit-in-Snowflake availability on JBS account (from ADR open questions). If gates fail, fall back to standard-table + `MERGE`.
- `modules/writeback`: editable grid (handles ~60K rows — server-side pagination/virtualized grid), optimistic validation, `MERGE` into `MASTER_DATA` Hybrid Table, **append-only audit table** (`edited_by/at`, `operation`, `old/new value`) — the only history mechanism since Hybrid Tables lack Time Travel/Streams.
- dbt reads the Hybrid Table as a source; downstream incremental models key on `updated_at` (not Streams).
- Approval workflow: resolve the ADR's open question (in-band review vs publish-then-review) with Dustin before building the gate.
- **Exit:** Jacob's team edits one mapping table (e.g., Sam's/Walmart SKU de-para, WP-34/44) end-to-end with audit trail; dbt picks it up.

### Phase 4 — Dashboards & saved views
**Goal:** recurring, branded views (the thing pure chat can't replace).
- `modules/dashboards`: saved queries backed by the semantic layer, parameterized, result-cached; publish/governance (who can publish) as app-roles.
- Reuse charting; apply `dataviz` skill for a consistent visual system.
- **Exit:** one executive-style saved dashboard (e.g., Store Level velocity overview) shareable to a role.

### Phase 5 — Alerts + Task board + AI-created tasks
**Goal:** close the loop from insight → action.
- `modules/alerts`: rule engine + scheduler → Teams/email (Teams is JBS's channel).
- `modules/tasks`: Kanban (`boards/tasks/columns/comments/activity_log`), WebSocket live updates.
- Expose `create_task`/`update_task`/`list_tasks` as **host tools** (same pattern as existing `render_chart`) so the agent can file a task off an analysis — model calls the tool, FastAPI writes Postgres, board updates live.
- **Exit:** agent analyzes a report and files a task that appears live on the board; a threshold alert fires to Teams.

### Phase 6 — Feedback loop & scale hardening
**Goal:** platform observes itself; scale where numbers demand.
- **Fivetran Postgres → Snowflake** sync of `events`/`tasks` so Power BI/dbt report on platform usage alongside business data.
- Add Redis cache *only if* reference-data (dropdowns/lookups) latency shows under real load.
- Mobile-friendly React (shared OpenAPI contract; React Native/Expo optional later).
- **Exit:** usage dashboard live; documented scale runbook.

---

## Deployment & CI/CD

- **Build:** GitHub Actions (`bixtecnologia`) runs lint (`ruff`), tests (`pytest`), typecheck, and builds backend + frontend Docker images on PR.
- **Promote:** mirror `main` to **Azure DevOps**; Hari merges to dev and promotes to prod on the **Thursday** cadence. CI artifacts must be drop-in for that flow — coordinate the exact handoff format with Hari early.
- **Runtime:** AKS (or App Service if Corp IT prefers PaaS for this scale) — backend container + static frontend; secrets in **Azure Key Vault**; Postgres as Azure Database for PostgreSQL.
- **Config:** extend `backend/app/config.py` (pydantic-settings) with DB URL, OIDC client/tenant, Anthropic key, Snowflake connection — all injected, never committed.

---

## Scaling posture (few-hundred internal users)

| Layer | Assessment |
|---|---|
| FastAPI async | Handles hundreds of concurrent SSE streams cheaply, provided Anthropic + Snowflake calls stay async (they are). |
| Postgres | Trivial at this write volume (tasks/auth/logs); not a scale risk. |
| Hybrid Tables | ~16K ops/sec vs. dozens of daily edits — throughput is not the risk; the missing Streams/Time-Travel is (audit table is load-bearing, not optional). |
| MCP host | Long-lived sessions per server; per-user role scoping is the design point. Aligns with a future central MCP Hub. |
| Bottleneck to watch | Edit→visible-in-gold latency chain (writeback → dbt → gold), minutes not seconds — fine for master data, **do not reuse this pattern for anything users expect to update instantly.** |

---

## Kinks reconciled (decisions this plan makes explicit)

1. **Orchestration:** POTENTIAL_ARCH proposed Dagster; Corp IT has chosen **Airflow** for the platform. **The app owns neither** — pipeline scheduling stays with dbt Cloud/Airflow (Corp IT). Removes a whole subsystem from the app's scope.
2. **Master data on-ramp:** ADR recommends SharePoint+Fivetran first; stakeholder chose **build the custom editor now**. Plan honors that (Phase 3) but keeps the feasibility gate and standard-table fallback so we don't block on Hybrid-Table enablement.
3. **Semantic layer:** not MetricFlow — the ADR's **hybrid (schema.yml + KPI Dictionary + Domain Concepts)** consumed by Claude as context (Phase 2).
4. **Qlik coexistence:** app is additive; gold layer stays tool-agnostic; no phase assumes Qlik shutdown.
5. **LLM egress:** direct Anthropic API (approved path), but the provider abstraction stays as insurance if Security later mandates Bedrock/Cortex.

## Open items to confirm with client (non-blocking for Phase 0–1)
- Exact Azure DevOps ↔ GitHub handoff format with **Hari**.
- Snowflake account: Hybrid Tables + SiS enablement (gates Phase 3 storage choice).
- Master-data **approval workflow** (in-band vs publish-then-review) with Dustin.
- Whether the app should register with Márcio's future **central MCP Hub** (keep the host layer decoupled so either works).

---

## Verification

- **Phase 0:** `MCP_MODE=real` against dev Snowflake — ask a real question, confirm a correct answer end-to-end; restart the pod and confirm conversation history persists (Postgres). Run existing `backend/scripts/smoke_mcp.py` against real servers.
- **Phase 1:** log in via Azure AD; with two test users on different Snowflake roles, confirm the same query returns role-appropriate rows (RLS honored); confirm every query writes a `platform` audit event.
- **Phase 2:** run the KPI-dictionary velocity questions (e.g., "$ Velocity for X at Kroger, H1 2026") and reconcile against the existing Qlik app for one retailer.
- **Phase 3:** edit a mapping row as Jacob's-team persona → confirm Hybrid Table `MERGE`, audit row written, dbt source picks up the change.
- **Phase 5:** ask the agent to analyze a report and file a task → confirm it appears live on the board via WebSocket; configure a threshold alert and confirm Teams delivery.
- Throughout: `pytest` per module in CI; `ruff` lint; frontend typecheck + build in the Docker stage.
