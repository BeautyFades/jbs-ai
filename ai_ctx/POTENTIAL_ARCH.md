# JBS Foods — Data Platform Architecture

*Synthesized from the master data platform Architecture Decision Record, the Data Engineering diagram work, and the platform-selection discussion. This is the consolidated view: what's decided, why, and how it holds up under load.*

---

## 1. The Stack, End to End

```
Source Systems (SAP S/4, Redistributor, Operator, Circana/NPD, SharePoint)
        ↓
Fivetran (ingestion)
        ↓
Snowflake — Bronze → Silver → Gold (Standard Tables)
Snowflake — Hybrid Tables (master data, transactional writes)
        ↓
dbt (transformation)
        ↓
Dagster (orchestration)
        ↓
┌─────────────────────────────────────────────┐
│  Application Layer                           │
│  React (frontend) ←→ FastAPI (backend)       │
│  — dashboards, alerts, master data editor,   │
│    Machine Learning, Claude-powered agents   │
└─────────────────────────────────────────────┘
```

Two consumption paths exist on purpose, not by accident. More on that in Section 5.

---

## 2. Layer-by-Layer Decisions

### 2.1 Ingestion — Fivetran (decided, already running)
Replaced Qlik Replicate and DataBrew/Dataiku in late 2025. No change proposed here. It already handles Structured Access to Programs and Products (SAP), redistributor, and operator sources, and is the natural place to add a SharePoint connector for master data.

### 2.2 Storage — Snowflake, two table types doing two different jobs
- **Standard (columnar) tables** for Bronze/Silver/Gold analytics — this is what Snowflake is built for: large scans, aggregations, dbt transformations.
- **Hybrid Tables** for master data (SKU mappings, geography, category mappings). This is the one deliberate exception. Standard Snowflake tables are Online Analytical Processing–oriented: optimized for big reads, not for a person clicking "save" on a row and expecting an instant, constraint-checked write. Hybrid Tables are Snowflake's row-store engine — they enforce Primary Key/Foreign Key constraints at the storage layer and behave more like a normal application database, while still living inside Snowflake so dbt can read them as an ordinary source.

**Why not push master data into a separate Postgres/Redis operational layer instead?** Because the write volume here is genuinely small — dozens of edits a day by two or three people, not thousands of concurrent transactions. That volume doesn't justify a second database to operate, back up, and secure. Hybrid Tables give "good enough" transactional behavior without adding a system. If usage ever grows into real application traffic (hundreds of concurrent users, sub-100ms requirements), that's the trigger to introduce Redis as a cache in front of it — not before.

**Known limitation carried forward:** Hybrid Tables don't support Streams or Time Travel. That means no native Change Data Capture and no built-in history. The workaround is a companion append-only audit table written by the application on every edit, and dbt incremental models on this source use a timestamp column (`updated_at`) instead of a Stream.

### 2.3 Transformation — dbt (decided, already running)
No change. dbt reads both Standard Tables and Hybrid Tables identically as sources — this is precisely why Hybrid Tables were chosen over an external system for master data: one transformation layer, one place downstream models look, regardless of which storage engine holds the source.

### 2.4 Orchestration — Dagster over Airflow

This was the open debate; the recommendation is Dagster, for one structural reason: **Dagster models data as assets, Airflow models it as tasks.**

That distinction matters concretely for this stack:
- `dagster-dbt` loads every dbt model as an asset automatically, with lineage already wired from `manifest.json`.
- `dagster-fivetran` treats each Fivetran connector as an asset.
- When a SharePoint edit lands and Fivetran syncs it, Dagster already knows which downstream dbt models depend on that source and can materialize only those — no custom webhook code, no manually maintained trigger logic.
- Freshness policies let you declare "Gold should never be more than 2 hours stale" and Dagster manages *when* to run to satisfy that, rather than you hand-scheduling cron-style runs.

Airflow is not wrong here — it's a mature, battle-tested tool, and if the team already has Airflow depth (JBS does, via prior Astronomer evaluation), that's a legitimate reason to pick it anyway. Tooling fit and team expertise are both real inputs; this recommendation weighs the asset-graph fit slightly higher than the familiarity advantage, but it's a close call worth raising explicitly with stakeholders rather than deciding unilaterally.

### 2.5 Application Layer — React frontend, FastAPI backend

Two backend framework options were compared: FastAPI and Django. The deciding factor was Claude and Snowflake both being non-trivial-latency, streaming-capable dependencies:
- Claude's Application Programming Interface streams tokens progressively; a chat-style "talk with your data" agent needs true asynchronous handling from top to bottom to feel responsive. FastAPI is asynchronous by design; Django is asynchronous by retrofit.
- Snowflake queries can take seconds. Asynchronous request handling means one slow query doesn't block every other user's request.

Django's advantage — batteries-included authentication, permissions, and an admin panel — is real but replaceable: at a few hundred enterprise users, Single Sign-On through Azure Active Directory (JBS is Microsoft-ecosystem) plus a role-based access pattern in FastAPI covers the same ground, and the React frontend itself functions as the "admin panel" since it's being built anyway.

Frontend: React was chosen over Streamlit for anything user-facing or production-grade, because Streamlit re-runs its entire script on every interaction (a real performance ceiling as usage grows) and gives limited control over interaction design. Streamlit still has a place for internal, throwaway tooling — a Dagster run monitor, a quick internal script UI — built by data engineers without needing frontend developers. The two aren't mutually exclusive; they share the same FastAPI backend.

---

## 3. Master Data Editing — the Concrete Case

This is the sharpest example of how the layers click together, because it was worked through end to end:

```
Jacob's team edits a mapping row (SharePoint list, or the React/FastAPI editor)
        ↓
SharePoint path: Fivetran syncs (1–5 min) → Snowflake Hybrid Table
Direct path: FastAPI writes straight to the Hybrid Table (Primary Key/Foreign Key enforced)
        ↓
Fivetran sync completion (or the direct write) triggers Dagster
        ↓
Dagster materializes only the downstream dbt assets that depend on that source
        ↓
Gold layer updates
        ↓
Audit table receives an append-only record: who, when, old value, new value
```

Two on-ramps (SharePoint for the lowest-friction rollout, a custom editor for a more governed long-term state) writing to the same Hybrid Table is intentional — it lets the org start with the option requiring the least new infrastructure and graduate to the fuller platform without a second migration.

---

## 4. The Qlik Replacement — Where "Build Our Own" Needs a Caveat

Worth stating plainly: **replacing Qlik with AI alone would fail**, and that's a real risk in framing this as "kill Qlik, build our own AI-native platform." Claude and a talk-with-your-data agent are excellent for ad-hoc exploration — "why did this number move" — but they don't replace:
- A branded executive dashboard 100 people open every Monday morning
- Qlik's 700+ scheduled PDF report distributions (NPrinting)

Those are recurring, structured, signed-off artifacts, not conversations. The realistic split:

| Need | Tool |
|---|---|
| Recurring dashboards, executive views, scheduled report distribution | Custom reporting. Potential spill to PowerBI, but would like to consolidate |
| Ad-hoc exploration, "why" questions, natural-language queries | Claude + dbt/Snowflake MCP |
| Self-serve builds by business-unit stakeholders | Claude Code + Model Context Protocol against Snowflake |
| Master data editing, alerts, custom internal apps | The React/FastAPI/Snowflake stack described above |

This means "building our own solution" is accurate for the application layer (master data, alerts, agents, Machine Learning) but Power BI — not a from-scratch dashboarding tool — is the more defensible answer for the reporting layer Qlik currently covers. Building a dashboard engine from scratch to replace 700 existing dashboards is a large, low-differentiation effort; Power BI gets that for close to zero incremental license cost and a much larger hiring/training pool than a bespoke tool would have. However, we want to still try to power standard reporting by connecting to Snowflake.

---

## 5. Is It Scalable and Performant?

Assessed layer by layer, against the actual load this platform will see (hundreds of internal users, not internet-scale traffic):

**Ingestion (Fivetran):** Yes. Already proven at JBS's current source volume; adding a SharePoint connector is incremental, not a redesign.

**Storage (Snowflake Standard Tables):** Yes, by design — this is Snowflake's core competency for the Bronze/Silver/Gold analytical workload. No concerns.

**Storage (Hybrid Tables for master data):** Yes, *for this workload specifically*. Hybrid Tables support roughly 16,000 operations per second per database — many orders of magnitude beyond a few dozen daily master-data edits. The risk isn't throughput; it's the missing Streams/Time Travel functionality, which is why the audit table workaround is load-bearing, not optional. If master data write volume or user count grows by 10–100x, revisit — but that's not the current or near-term profile.

**Transformation (dbt):** Yes. Scoped runs via Dagster (only rematerializing affected assets) keep this efficient regardless of overall model count growth.

**Orchestration (Dagster):** Yes, and this is where scalability is actively engineered in, not just inherited — asset-based partial materialization and freshness policies mean the system doesn't get slower as more dbt models and Fivetran connectors are added, which a purely schedule-based Airflow setup would.

**Application layer (React + FastAPI):** Yes, for a few-hundred-user internal tool, provided one thing is respected: asynchronous handling of Claude and Snowflake calls so one slow request doesn't degrade the experience for everyone else. No caching layer (Redis) is needed yet — add it if read-heavy reference data (dropdowns, lookups) starts showing latency under real usage, not preemptively.

**Overall bottleneck to watch:** not any single layer, but the *edit-to-visible-in-Gold* latency chain (SharePoint → Fivetran → Dagster → dbt → Gold), currently estimated at 5–10 minutes end to end. That's fine for master data, which has no real-time requirement. It would not be fine if this same pattern were reused for something users expect to see update instantly — a distinction worth keeping explicit as more use cases get proposed for this pipeline.

**Net assessment:** the architecture is right-sized rather than over-built. Nothing here is throwaway-scale, and nothing here is over-engineered for load that doesn't exist yet (no premature Redis, no premature dedicated Master Data Management vendor, no premature separate operational database). The main discipline required going forward is resisting the urge to add infrastructure ahead of the usage numbers that would justify it.

---

#### QUESTION: As with any application, we need logs, usage analytics. Access control in the platform. Also need permissioning/auth/log ins. Also need to add a task board that could be interacted with an AI assistant (e.g. user asks AI to analyze a report or query some data, dependign on the result it would create a task in a jira-like board). Meaning the Python app would be complex and would need a database, likely an MCP server of sorts too, so that users may connect with it from outside too.

Response:
Architected database strategy and application layering requirementsArchitected database strategy and application layering requirementsYes — and it's worth saying plainly: you've now crossed the threshold from "add Postgres when you feel the pain" to actually feeling it. Users, roles, sessions, a task board, and an audit trail are all relational, mutable, small-record, high-frequency-write data. That's not what Snowflake is built for, and pushing it there would fight the warehouse's grain. This is exactly the operational layer flagged earlier as a "later" addition — it's later now.
Add PostgreSQL as the application's operational database. Concretely, it owns:
DomainTables (rough shape)Auth/sessionusers (Azure Active Directory ID, not passwords — Azure Active Directory remains the identity provider), app_roles, sessions if you need server-side session state beyond stateless tokensAccess control (app-level)feature_permissions, role_assignments — this is separate from Snowflake's Role-Based Access Control. Snowflake roles govern data access (which rows/tables); app roles govern feature access (who sees the task board, who can trigger the agent, who's an admin). Don't conflate them — a sales analyst might have broad Snowflake read access but zero permission to create tasks.Task boardboards, tasks, columns, comments, activity_log — standard Kanban schemaLogs / usage analyticsevents (user_id, action, timestamp, metadata as Java Script Object Notation) — every agent query, task creation, report view
Where auth actually happens: unchanged from before — Azure Active Directory via OAuth is still the identity provider. PostgreSQL never stores a password; it stores a foreign key to the Azure Active Directory identity plus app-specific role/preference data. Login flow is: Azure Active Directory authenticates → FastAPI validates the token → PostgreSQL supplies the app-role and permission set for that session.
The AI-creates-a-task flow is just another tool, not a special case. Same pattern as the Snowflake query tool from before:
User asks Claude to analyze a report
    → Claude calls query tool → reads Snowflake (as that user, via their Azure AD-scoped role)
    → Claude reasons over the result
    → Claude decides a task is warranted → calls create_task tool
    → FastAPI writes to PostgreSQL tasks table
    → Task board (React, WebSocket-updated) reflects it live
Define create_task, update_task, list_tasks as tools available to Claude, backed by ordinary FastAPI endpoints against PostgreSQL. The model doesn't touch the database directly — same separation of concerns as the Snowflake tools.
One architectural decision worth making deliberately: feed app usage data back into Snowflake. Since Fivetran already has a PostgreSQL connector, sync the events and tasks tables into Snowflake on a schedule. This means:

Power BI and dbt can report on platform usage alongside business data ("which sales reps use the AI agent most," "task completion rate by team") without a second reporting stack.
You're not building a parallel analytics system — you're extending the medallion architecture you already have.

What this adds operationally, to be honest about the cost:

A real database to back up, migrate (Alembic if using SQLAlchemy), and monitor — this is a genuine new system to operate, not free complexity.
WebSocket connection management in FastAPI for live task board updates — already native to FastAPI, not a new framework, but real code.
A second permission model (app roles) to keep conceptually distinct from Snowflake roles, or the two will get tangled within a year.

Net scalability read: fine at hundreds of users — PostgreSQL handles this load trivially, this isn't a scale risk. The actual risk is conceptual sprawl: task board + auth + logs + agent orchestration is a real product now, not a data platform accessory. Worth deciding explicitly whether this lives inside the same FastAPI service or splits into a separate "platform services" backend from the "data/agent" backend — same team can own both, but one deployable growing to cover identity, task management, and Claude orchestration will get unwieldy well before your user count does.