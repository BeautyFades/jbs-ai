# ADR — Manual Mapping Tables: Master Data Platform

| Field        | Value                                              |
| ------------ | -------------------------------------------------- |
| **Status**   | Proposed                                           |
| **Deciders** | Dustin Dickson, Jacob Weatherly, BIX DE/DA         |
| **Domain**   | Data Platform / Master Data Management             |
| **Replaces** | n/a (supersedes informal WBT decision of 260601)   |

---

## Context

Several sales lane gold-layer models depend on **manual mapping tables** that cannot be derived from source systems alone:

- **SKU de-paras** — retailer UPC ↔ JBS SAP material code (WP-34 Sam's, WP-44 Walmart)
- **Store / geography mappings** — Circana retailer and geography hierarchies (WP-60)
- **Product category flags** — Chicken MAPPED/UNMAPPED, category/sub-category/segment (WP-61)

These tables are curated by Jacob Weatherly's team and are classified as master data: they are not transaction-derived, they change on a quarterly+ cadence (with ad-hoc additions), and they must be versioned with an audit trail.

**Decision history:**

| Date | Event |
|------|-------|
| 260529 | Three Qlik WBT scenarios mapped. Scenario #3 — *overwrites Snowflake DB; inputs persist to enrich the DW for downstream pipelines* — selected as the applicable one. |
| 260601 | WBT retained as the chosen platform, justified by user familiarity with the Qlik interface. |
| 260610 | Master Data KT Pt 1 revealed current architecture: ~23 tables (6 mapping + 17 configuration), write-back via Davis Lib extension → stored procedure → Silver (full history) → Gold (latest) → hourly copy to Legacy PPC DB. Direct Sales Mapping has ~56,000–60,000 rows. |
| 260619 | **Dustin Dickson reversed the 260601 decision.** WBT is explicitly ruled out. See rationale below. |

**Dustin's rationale (260619 KT Pt 2, verbatim):**
> *"We did it because we liked it, the governance of it, that it was all visible, and we were envisioning using Qlik Sense as the analytic tool, but now we call it and everything else, and the complexity we're seeing with the write back on larger tables… we think we got to find a different solution. Still, at the same time, we just don't like the solution. Even if it was to slow down, we still think it's very cumbersome and clunky for what we're trying to accomplish."*

**Key architectural finding:** WBT Scenario #3 has no requirement for the user to see an immediate result in Qlik. The principal technical advantage of WBT — automatic Qlik reload right after edit — does not apply here. The auto-reload benefit is neutralized.

**Org-level context (260609 Corp IT):** Márcio Cardoso (Corp IT Director) confirmed Qlik is being unwound org-wide. JBS is moving to a Snowflake-native stack. Coupling master data to Qlik at this stage contradicts the corporate platform trajectory.

---

## Decision Drivers

- **Qlik decoupling** — master data must not depend on Qlik for editing, storage, or lifecycle; Qlik is being phased out as consumption layer
- **Scale** — Direct Sales Mapping is ~60K rows; UI must handle bulk editing (the Qlik WBT UI broke down at this volume)
- **Audit trail** — non-negotiable; must record who changed what and when
- **dbt compatibility** — mapping tables must be readable by dbt as standard Snowflake source tables
- **Operational simplicity** — Jacob's team (2–3 people) are the only editors; no complex approval workflow tooling required upfront
- **JBS security posture** — data must remain inside JBS infrastructure; no external SaaS copies of mapping data
- **No real-time reload requirement** — downstream consumers (dbt pipelines, Qlik apps) do not need sub-minute propagation; eventual consistency (minutes to hours) is acceptable

---

## Decision

> **[PENDING CLIENT CONFIRMATION — see Open Questions]**
>
> **Recommended: Option A — SharePoint + Fivetran**, with Option B (Streamlit in Snowflake + Hybrid Tables) as the preferred long-term target if Snowflake account feasibility is confirmed.

---

## Options Evaluated

### Option A — SharePoint + Fivetran *(Recommended)*

Jacob's team maintains mapping tables as SharePoint Lists or Excel files in SharePoint. Fivetran syncs them to Snowflake standard tables on a 1–5 minute cadence. dbt reads the Snowflake tables as any other source.

**Operational flow:**
```
Jacob's team (SharePoint List / Excel in SharePoint)
    → Fivetran (incremental sync, 1–5 min)
    → Snowflake standard table (MASTER_DATA schema, SILVER layer)
    → dbt model (source ref → transformations → GOLD)
    → Downstream: Qlik, Claude, Cortex Analyst
```

**Audit trail:** SharePoint version history captures user identity + timestamp per edit. Fivetran adds a `_fivetran_synced` timestamp column in Snowflake. dbt snapshot on the Snowflake source table provides row-level change history.

**Data quality:** dbt tests enforce NOT NULL, UNIQUE (composite key), ACCEPTED VALUES (channel/sub-channel LOVs). No PK/FK at storage layer — enforced at transformation layer.

| Criterion | Assessment |
|---|---|
| Qlik decoupling | ✅ Fully decoupled |
| Scale (60K rows) | ✅ SharePoint Lists support up to 30M items |
| Audit trail | ✅ SharePoint version history + dbt snapshot |
| dbt compatibility | ✅ Standard Snowflake table |
| UX for Jacob's team | ✅ Excel-like, matches current workflow |
| JBS security | ✅ SharePoint is within Microsoft 365 tenant |
| Time to implement | ✅ Fastest — pattern already in use at JBS |
| Cost | ⚠️ Fivetran SharePoint connector adds incremental cost; confirm with Corp IT |

**Risk:** Fivetran connector availability/cost must be confirmed with Corp IT (Márcio's team manages the Fivetran instance).

---

### Option B — Streamlit in Snowflake (SiS) + Hybrid Tables *(Long-term preferred)*

A custom web UI built in Streamlit runs natively inside Snowflake (no external server). Mapping data is stored in **Hybrid Tables** — Snowflake's OLTP row-store engine with PK/FK enforcement, fast row-level reads/writes, and native Snowflake identity federation.

**Operational flow:**
```
Jacob's team (SiS web app — authenticated via JBS SSO)
    → Hybrid Table (MASTER_DATA schema — row-store, PK/FK enforced)
    → History Table (append-only, manual trigger from SiS app — replaces Time Travel)
    → dbt source ref → transformations → GOLD
    → Downstream: Qlik, Claude, Cortex Analyst
```

**Audit trail:** SiS app writes an audit record to a companion append-only standard table on every INSERT/UPDATE (columns: `edited_by`, `edited_at`, `operation`, `row_pk`, `old_value`, `new_value`). Hybrid Tables do not support Time Travel or Streams — the audit table is the only history mechanism.

**Data quality:** PK/FK enforced at the storage layer by Hybrid Table constraints. dbt tests provide additional coverage.

| Criterion | Assessment |
|---|---|
| Qlik decoupling | ✅ Fully decoupled |
| Scale (60K rows) | ✅ Row-store, ~16K ops/sec per database |
| Audit trail | ✅ Explicit audit table (workaround for no Time Travel) |
| dbt compatibility | ✅ Hybrid Tables behave as standard sources for SELECT |
| UX for Jacob's team | ⚠️ Custom app — requires onboarding; better long-term than Excel forms |
| JBS security | ✅ Entirely inside Snowflake; identity via SSO federation |
| Time to implement | ⚠️ Higher effort — SiS app + DDL + audit table design |
| Cost | ⚠️ Hybrid Tables use row-store pricing ($/GB premium vs columnar) — negligible at MB-scale mapping tables |

**Feasibility gates (must confirm before committing to B):**

1. `SHOW PARAMETERS LIKE 'ENABLE_HYBRID_TABLES';` on JBS Snowflake account — must be TRUE
2. `SHOW STREAMLITS;` on JBS Snowflake account — must not error
3. Confirm JBS Snowflake account is on AWS commercial (Hybrid Tables GA since Oct 2024) or Azure (GA since Oct 2025); verify edition is Enterprise or higher

**Known limitation:** Hybrid Tables do not support Streams (Change Data Capture). dbt incremental models that depend on CDC must use a timestamp-based incremental strategy (`updated_at`) instead of Streams. This is a workaround, not a blocker.

---

### Option C — Qlik Write-Back Tables *(Rejected)*

Ruled out by Dustin Dickson on 260619. Cumbersome at ~60K rows; couples master data lifecycle to Qlik, which is being strategically retired as the primary consumption layer. The one technical advantage of WBT — automatic Qlik reload — does not apply to Scenario #3 (DB overwrite with no immediate user-facing result).

---

### Option D — Dedicated MDM tools (Profisee, Semarchy, Ataccama) *(Not recommended)*

Purpose-built MDM platforms offer workflow automation, stewardship dashboards, and data quality rules. Ruled out at this stage: licensing cost and implementation complexity are disproportionate to the use case (2–3 editors, quarterly update cadence, ~6 mapping tables). Revisit if Jacob's team grows or if cross-BU master data consolidation materialises at scale.

---

### Option E — Manual CSV upload + dbt snapshot *(Not recommended)*

Formalises the current workaround (Jacob → Excel → Fellipe uploads CSV → stored procedure). Lowest implementation cost. Rejected: does not solve the UX problem (manual handoff to a data engineer), creates a human single point of failure, and contradicts Dustin's stated goal of having Jacob's team self-service.

---

## Consequences

### Positive (Option A — if selected)

- **Immediate unblock for WP-34 and WP-44** — SharePoint connector is the fastest path; work can start without waiting for Snowflake feasibility checks.
- **No Qlik dependency** — master data lifecycle is independent of Qlik contract renewals and Qlik UI limitations.
- **Familiar UX for Jacob's team** — Excel-in-SharePoint matches how they currently work; no retraining required.
- **Reusable pattern** — same SharePoint → Fivetran → Snowflake → dbt pattern applies across WP-34, WP-44, WP-60, WP-61.

### Positive (Option B — if selected)

- **Single-system ownership** — editing, storage, and governance all inside Snowflake; no middleware or external connectors.
- **Storage-level data quality** — PK/FK constraints catch bad data before dbt sees it.
- **Aligns with Corp IT direction** — Snowflake-native strategy; no additional vendor dependency.

### Negative / Risks

- **Option A — Fivetran cost:** SharePoint connector adds to Fivetran MAR/row count; needs Corp IT approval. Mitigation: confirm before standing up the connector.
- **Option A — No storage-level PK/FK:** Bad rows can land in Snowflake if SharePoint lists are misconfigured. Mitigation: dbt tests + `unique_combination_of_columns` generic test on composite key.
- **Option B — Feasibility gates:** SiS and Hybrid Tables may not be enabled on JBS account. Mitigation: run SQL checks before committing; fall back to Option A if gates fail.
- **Option B — No Streams on Hybrid Tables:** CDC-based dbt incremental strategies unavailable. Mitigation: use timestamp-based `updated_at` incremental strategy on all models sourced from Hybrid Tables.
- **Both options — Approval workflow undefined:** Dustin said "no end-user access" but the approval gate (who validates Jacob's changes before they reach Gold?) is not yet specified. Mitigation: resolve in client alignment meeting (Step 3).

---

## Open Questions (Client Alignment Required)

| # | Question | Owner | Blocking? |
|---|---|---|---|
| 1 | Does JBS's Fivetran instance already include a SharePoint connector? | Corp IT (Márcio) | Yes, for Option A |
| 2 | Are Hybrid Tables and SiS enabled on the JBS Snowflake account? | Corp IT / BIX DE (SQL check) | Yes, for Option B |
| 3 | Who approves Jacob's mapping changes before they propagate to Gold? Is approval in-band (Dustin reviews before publish) or out-of-band (Jacob publishes, Dustin reviews reports)? | Dustin | Both options |
| 4 | Is SharePoint version history sufficient as audit trail, or is a row-level Snowflake change log required? | Dustin / Jacob | Both options |
| 5 | Do WP-60 (Circana) and WP-61 (Chicken) use the same platform as WP-34/WP-44, or do they have different editing requirements? | Jacob / BIX DA | Both options |
| 6 | What is the timeline pressure on WP-34 and WP-44? Are they on the critical path for any client-facing delivery? | Dustin / Lili | Both options |

---

## Reusable Implementation Template

*To be completed after client alignment confirms the chosen option.*

### Template A — SharePoint + Fivetran

- [ ] SharePoint List schema per mapping table type (columns, data types, required fields, validation rules)
- [ ] Fivetran connector configuration (incremental key, sync cadence, destination schema)
- [ ] dbt `sources.yml` stub for the Snowflake landing table
- [ ] dbt generic tests: `not_null`, `unique` (composite key), `accepted_values` (channel, sub-channel, product category LOVs)
- [ ] dbt snapshot config for row-level change history

### Template B — Streamlit in Snowflake + Hybrid Tables

- [ ] Hybrid Table DDL:
  ```sql
  CREATE OR REPLACE HYBRID TABLE MASTER_DATA.<TABLE_NAME> (
      <pk_col> VARCHAR NOT NULL,
      -- mapping columns
      updated_at TIMESTAMP_NTZ DEFAULT CURRENT_TIMESTAMP(),
      updated_by VARCHAR,
      PRIMARY KEY (<pk_col>)
  );
  ```
- [ ] Audit history table DDL (append-only standard table: `<TABLE_NAME>_HISTORY`)
- [ ] SiS app skeleton (Python): SSO login check, table selector, editable `st.data_editor`, submit → `MERGE INTO` Hybrid Table + INSERT into history table
- [ ] dbt `sources.yml` stub (Hybrid Table treated as standard source)
- [ ] dbt generic tests (same as Template A, plus FK referential integrity tests)

---

## Affected Work Packages

| WP | Description | Dependency on this ADR |
|----|-------------|------------------------|
| WP-34 | Sam's Club SKU de-para | Direct — blocked until platform is chosen |
| WP-44 | Walmart SKU de-para | Direct — blocked until platform is chosen |
| WP-60 | Circana Retailer/Geography DE-PARA | Indirect — same platform likely applies |
| WP-61 | Chicken MAPPED/UNMAPPED | Indirect — same platform likely applies |
