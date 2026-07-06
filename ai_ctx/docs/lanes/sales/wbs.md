# Work Breakdown Structure (WBS) — JBS USA / Sales Lane

## 1. Deliverables (Level 1)

1. **D1 — Store Level Data** — End-to-end pipeline (extraction → Snowflake/dbt → validation Qlik App) for each of the 6 retailers: Kroger, Costco, ABSCO, Sam's, Walmart, Publix.

2. **D2 — US Market Data** — End-to-end pipeline (data share/bot → Snowflake/dbt → validation Qlik App) for external US market sources: Circana SKU, Circana Brand, and NPD.

3. **D3 — Historical Sales Data** — End-to-end pipeline for internal sales sources: SAP Internal Sales, Redistributor Report, Operator Purchasing File, and Blacksmith Agreements.

4. **D4 — Sales Pipeline** — End-to-end pipeline for CRM-side sales sources (MS Dynamics, Axcion) and handover of the MS Dynamics iFrames Qlik App.

5. **D5 — P&L** — End-to-end pipeline for the P&L domain.

6. **D6 — Master Data** — Handover of the inherited Master Data framework (Qlik WriteBack app + Snowflake tables backing it) and discovery of the in-flight Customer Hierarchy Operator Integration.

7. **D7 — Technical foundation and governance** — Cross-cutting work that sustains the other deliverables: cross-source consolidated gold layer, bot observability, as-built architecture documentation, and target architecture blueprint.

---

## 2. Hierarchical Decomposition

### D1 — Store Level Data

- **1.1 SMD Foundation (cross-cutting across retailers)**
  - 1.1.1 WP-01 — AS-IS Map (unified current SMD flow)
  - 1.1.2 WP-02 — TO-BE Map (future SMD flow vision)
  - 1.1.4 WP-04 — Validators Map (per-source stakeholder validator)
  - 1.1.5 WP-05 — KPI/Measures Dictionary (single source of truth)
  - 1.1.6 WP-06 — Master Data Management platform strategy
  - 1.1.7 WP-07 — Snowflake/dbt inventory across retailers (discovery)
  - 1.1.8 WP-08 — Security Team approval: Twilio + Zapier VSAs (2FA bypass for Sam's + Walmart)
  - 1.1.9 WP-09 — Twilio/Zapier shared account setup (foundation for Sam's + Walmart bots)

- **1.2 Kroger** *(existing MVP; focus on fixes, performance, and governance)*
  - 1.2.1 WP-10 — Kroger ETL strategy ADR (Snowflake/dbt migration scope)
  - 1.2.2 WP-11 — Kroger Qlik App fixes backlog
  - 1.2.3 WP-12 — Kroger prioritized fixes implementation
  - 1.2.4 WP-15 — Kroger dimensional modeling (includes Inventory fact redesign + retention policy)
  - 1.2.5 WP-99 — Kroger Qlik App load layer (refactor)
  - 1.2.6 WP-16 — Kroger bot recovery and ownership setup
  - 1.2.7 WP-17 — Kroger bot incremental refactor (follow-up; Paco executes)

- **1.3 Costco** *(existing MVP; focus on fixes)*
  - 1.3.1 WP-18 — Costco ETL strategy ADR (Snowflake/dbt migration scope)
  - 1.3.2 WP-19 — Costco fixes backlog
  - 1.3.3 WP-20 — Costco prioritized fixes implementation
  - 1.3.4 WP-21 — Costco dimensional modeling
  - 1.3.5 WP-100 — Costco Qlik App load layer (refactor)
  - 1.3.6 WP-22 — Costco bot recovery and ownership setup
  - 1.3.7 WP-23 — Costco bot incremental refactor (follow-up; Paco executes)

- **1.4 ABSCO** *(no Qlik App yet; data available)*
  - 1.4.1 WP-24 — ABSCO ETL strategy ADR
  - 1.4.2 WP-25 — ABSCO dimensional modeling
  - 1.4.3 WP-26 — ABSCO Qlik App load layer
  - 1.4.4 WP-27 — ABSCO front-end (velocity table + drill-down to UPC)
  - 1.4.5 WP-28 — ABSCO stakeholder validation
  - 1.4.6 WP-29 — ABSCO bot recovery and ownership setup

- **1.5 Sam's Club** *(manual ingestion today; bot blocked by 2FA)*
  - 1.5.1 WP-30 — Sam's ETL strategy ADR
  - 1.5.2 WP-31 — Sam's Python bot development — **depends on WP-08, WP-09**
  - 1.5.3 WP-32 — Sam's Zapier/Twilio automation + remaining bot development
  - 1.5.4 WP-33 — Sam's bot final documentation
  - 1.5.5 WP-34 — Sam's SKU and category mapping (writeback table) — **depends on WP-06**
  - 1.5.6 WP-35 — Sam's dimensional modeling
  - 1.5.7 WP-36 — Sam's Qlik App load layer
  - 1.5.8 WP-37 — Sam's front-end
  - 1.5.9 WP-38 — Sam's stakeholder validation

- **1.6 Walmart** *(manual ingestion today; bot blocked by 2FA; only `YTD_Sales` available)*
  - 1.6.1 WP-39 — Walmart ETL strategy ADR
  - 1.6.2 WP-40 — Walmart missing facts investigation (beyond `YTD_Sales`)
  - 1.6.3 WP-41 — Walmart Python bot development — **depends on WP-08, WP-09**
  - 1.6.4 WP-42 — Walmart Zapier/Twilio automation + remaining bot development
  - 1.6.5 WP-43 — Walmart bot final documentation
  - 1.6.6 WP-44 — Walmart SKU and category mapping (writeback table) — **depends on WP-06**
  - 1.6.7 WP-45 — Walmart dimensional modeling
  - 1.6.8 WP-46 — Walmart Qlik App load layer
  - 1.6.9 WP-47 — Walmart front-end
  - 1.6.10 WP-48 — Walmart stakeholder validation

- **1.7 Publix** *(blocked — no access to Item Sales Reports)*
  - 1.7.1 WP-49 — Publix Item Sales Reports access unblock
  - 1.7.2 WP-50 — Publix available data inventory *(conditional on WP-49)*
  - 1.7.3 WP-51 — Publix ETL strategy ADR — conditional on WP-49
  - 1.7.4 WP-52 — Publix pipeline + modeling *(conditional on WP-49)*
  - 1.7.5 WP-53 — Publix Qlik App load layer *(conditional on WP-49)*
  - 1.7.6 WP-54 — Publix front-end *(conditional on WP-49)*
  - 1.7.7 WP-55 — Publix stakeholder validation *(conditional on WP-49)*

---

### D2 — US Market Data

- **2.1 Circana (IRI)**
  - 2.1.1 WP-56 — Circana mockups archive
  - 2.1.2 WP-97 — AS-IS Map (current Circana flow)
  - 2.1.3 WP-57 — Circana × SAP DE-PARA UPC/SKU investigation
  - 2.1.4 WP-58 — Circana brand × UPC divergence (intra-source)
  - 2.1.5 WP-60 — Retailer/Geography DE-PARA (`GEOG_META` / `BRAND_GEOG_META`)
  - 2.1.6 WP-61 — Chicken category mapping review
  - 2.1.7 WP-98 — TO-BE Map (target Circana flow)
  - 2.1.8 WP-84 — Circana Brand Level: ETL development

- **2.2 NPD**
  - 2.2.1 WP-63 — NPD ETL + gold layer (from raw)

---

### D3 — Historical Sales Data

- **3.1 SAP Internal Sales**
  - 3.1.1 WP-67 — Current SAP flow survey (Fivetran → QVDs)
  - 3.1.2 WP-68 — Snowflake migration feasibility analysis (cost × benefit × priority)
  - 3.1.3 WP-69 — Migration decision ADR
  - 3.1.4 WP-70 — Snowflake layered modeling *(conditional on WP-69)*
  - 3.1.5 WP-71 — dbt model implementation *(conditional on WP-69)*
  - 3.1.6 WP-72 — Circana × SAP cross-reference rewrite in the new environment *(conditional on WP-69)*

- **3.2 Redistributor Report**
  - 3.2.1 WP-85 — Redistributor Report handover and discovery

- **3.3 Operator Purchasing File**
  - 3.3.1 WP-86 — Operator Purchasing File handover and discovery

- **3.4 Blacksmith Agreements**
  - 3.4.1 WP-87 — Blacksmith Agreements handover and discovery

---

### D4 — Sales Pipeline

- **4.1 MS Dynamics**
  - 4.1.1 WP-88 — MS Dynamics handover and discovery

- **4.2 Axcion**
  - 4.2.1 WP-89 — Axcion handover and discovery

- **4.3 MS Dynamics iFrames Qlik App**
  - 4.3.1 WP-96 — MS Dynamics iFrames Qlik App handover and discovery

---

### D5 — P&L

- **5.1 P&L discovery**
  - 5.1.1 WP-90 — P&L discovery (AS-IS map + target requirements)

> Previously split into WP-90 (Budget handover), WP-91 (Costs handover), WP-92 (business discovery). Collapsed into a single discovery WP — there is no source-by-source granularity to commit to before the discovery closes. Source-specific WPs are scoped from this one's output.

---

### D6 — Master Data

- **6.1 Master Data framework handover**
  - 6.1.1 WP-93 — Master Data framework handover

- **6.2 Master Data Qlik App handover**
  - 6.2.1 WP-95 — Master Data Qlik App handover

- **6.3 Customer Hierarchy Operator Integration**
  - 6.3.1 WP-94 — Customer Hierarchy Operator Integration handover and discovery

> **Pending demand (not yet formalized as a WP):** P&L table-name updates need to be reflected in the Master Data framework (flagged by Khrystyna and Fellipe Tafner, daily 260611 — they sent the renamed tables in the P&L chat). Open a WP when the requirement becomes formal.

---

### D7 — Technical foundation and governance

- **7.1 Cross-source consolidated gold layer**
  - 7.1.1 WP-73 — Cross-source consolidated gold layer

- **7.2 Bot operations and governance (Automation Anywhere)**
  - 7.2.1 WP-80 — Monitoring and alerts proposal (jointly with RPA Team)
  - 7.2.2 WP-81 — Monitoring pilot on a single bot (e.g., Kroger)
  - 7.2.3 WP-82 — Bot operational governance consolidator document

- **7.3 Live technical documentation**
  - 7.3.1 WP-83 — As-built documentation of the delivered architecture — project closure deliverable

- **7.4 Target architecture blueprint**
  - 7.4.1 WP-101 — Target architecture blueprint

---

## 3. Work Package Descriptions

> Detail of the lowest WBS level. Each WP becomes **a single issue** on the board, titled `[WP-XX] Short description` (extra granularity via sub-issues — see `docs/lanes/sales/wbs_roadmap_structure.md`). Effort sizes are explicit per WP and refined during planning.
>
> **Layer nomenclature:** medallion and dbt-native naming are used interchangeably throughout — **bronze ↔ staging**, **silver ↔ intermediate**, **gold ↔ mart** (with `dim_` and `fct_` prefixes). See `briefing.md` Tech Stack.

### SMD Foundation

**WP-01 — AS-IS Map (unified current SMD flow)**
**Description:** End-to-end SMD data flow diagram (retailer source → bot/manual → Snowflake bronze/staging → silver/intermediate → gold/mart → dbt → Qlik), versioned and consolidated into a single deliverable.
**Completion criteria:** Diagram versioned in `docs/lanes/sales/architecture/` covering the 6 retailers, linked from the briefing. For each table the diagram must include:

*Source context (per retailer):*
- Extraction account
- Source portal access link
- 2FA: yes/no? If yes, format (SMS or email), recipient
- Retailer stakeholder (defined in WP-04 validators map)
- Python script author (if applicable)

*Per table:*
- **Raw DB table name**
- **Source** — where the table lives today: client base (not yet extracted) / Snowflake bronze/staging / silver/intermediate / gold/mart
- **Transformation** — where transformation happens today: dbt / Qlik / none
- **2FA status** (if the table depends on a 2FA-blocked bot) — link to WP-08 (shared 2FA bypass approval) and current state

*Visual conventions:*
- Distinct color for historical vs. incremental load tables (e.g., weekly)
- Distinct color for views, facts, and dimensions

**Owner:** DE + BI
**Size:** M (1–2 days)

---

**WP-02 — TO-BE Map (future SMD flow vision)**
**Description:** End-to-end diagram of the **target state** for the SMD data flow, reflecting decisions from the per-retailer ETL ADRs. Structural mirror of WP-01 (AS-IS), but showing where each table **should** live and where transformation **should** happen.
**Completion criteria:** Diagram versioned in `docs/lanes/sales/architecture/` covering the 6 retailers, linked from the briefing. Per table, the same fields as WP-01 (Source / Transformation / 2FA status / raw DB table name) and the same visual conventions — populated with the **target state**, not current.

Incremental delivery accepted: as each ETL ADR (WP-10 Kroger, WP-18 Costco, WP-24 ABSCO, WP-30 Sam's, WP-39 Walmart, WP-51 Publix) is approved, the TO-BE for that retailer can be closed.

**Pending dependency confirmation:** Whether Circana, NPD, and SAP flows also belong in the consolidated TO-BE map needs confirmation — not enough context today to commit.

**Depends on:** 6 ETL ADRs.
**Owner:** DE + BI
**Size:** S (8h) — assuming incremental delivery.

---

**WP-04 — Validators Map (per-source stakeholder validator)**
**Description:** Per-data-source map of the stakeholder responsible for validating delivered data. Rows mirror `scope_matrix.md` (one row per Data Source); columns are Data Source, Data Category, and Validator. Purpose is a quick reference for the team on who to talk to for sign-off on each source — Data Engineer / Data Analyst ownership stays in `scope_matrix.md`. Unconfirmed validators enter as `TBD`.

**Completion criteria:** Document versioned in `docs/lanes/sales/architecture/validators-map.md` covering all data sources from `scope_matrix.md`. Generic validation WPs (WP-28, WP-38, WP-48, WP-55) reference this map as the source for validator names.
**Owner:** DM
**Size:** XS (4–8h)

---

**WP-05 — KPI/Measures Dictionary and Domain Concepts (single source of truth)**
**Description:** Living document consolidating every KPI/measure used across the gold/mart layers and downstream consumers, so figures reconcile across sources. Each entry records: canonical name + synonyms; formula; supported granularity; unit; primary source and per-retailer variations; known context variations. A **Domain Concepts** section captures business rules outside a metric formula (e.g., Walmart fiscal calendar, UPC vs SKU semantics, Circana brand-level vs UPC-level coverage), referenced from `schema.yml` descriptions per the semantic-layer ADR. Updated by every front-end and modeling WP before implementation.
**When it must be ready:** initial version (SMD KPIs — Velocity, Dollar Sales, Dollar Share, Volume Sales, Unit Sales — + first Domain Concepts entries) before WP-27 (first new front-end).
**Completion criteria:** Document versioned in `docs/lanes/sales/architecture/kpi-dictionary.md`; initial version covers the SMD KPIs above and Domain Concepts entries for the Walmart fiscal calendar and UPC vs SKU. Referenced from the Completion criteria of every front-end and modeling WP.
**Owner:** BI (business-side validation interlocutor defined in WP-04 validators map)
**Size:** M (1–2 days) — initial version; incremental updates absorbed by front-end WPs.

---

**WP-06 — Master Data Management platform strategy**
**Description:** Define the platform where manual mapping tables live for this lane (SKU de-paras retailer↔JBS, store geography, product category). The previous default (Qlik writeback tables) was deemed unfit by the client on 260619 — cumbersome beyond ~60K rows and couples master data to Qlik, which the client wants to step away from on the consumption layer.

**Scope:** Research the candidate platforms, quantify trade-offs (editing UX, traceability, Qlik coupling, governance, scale, cost), select one, document the operational flow agreed with the client master data team.

**Candidate platforms to evaluate** *(non-exhaustive — team to expand during discovery)*

- **SharePoint + Fivetran** — pattern already used elsewhere in the org. Excel-like editing in SharePoint, periodic sync to Snowflake.
- **Qlik writeback tables** — current Sales-project pattern. Explicitly deprecated by the client on 260619; serves as the baseline the alternatives are compared against.
- **Streamlit in Snowflake (SiS) + Hybrid Tables** — custom UI inside Snowflake, mapping data stored as row-oriented Hybrid Tables with enforced PK/FK and secondary indexes. See *Technical notes* below.
- **Other** — to be surfaced by the team during discovery. Candidates worth scoping include dedicated MDM tools (Profisee, Semarchy, Ataccama), low-code internal-tool builders (Retool, Sigma input tables), and other Snowflake-native patterns.

**Technical notes on the SiS + Hybrid Tables option** *(captured so the idea is not lost; the team to validate and compare against the others)*

- *Why it surfaced:* keeps mapping data inside Snowflake (no movement, RBAC native); PK/FK enforced at the storage layer (no orphan or duplicate mappings); OLTP-fast row-level updates regardless of table size; decoupled from Qlik; dbt reads as a standard source.
- *Hybrid Tables status (per Snowflake docs):* GA in AWS commercial regions since 2024-10-30; Azure since 2025-10-06; GCP not yet GA. Caps: 2 TB per database, ~16K ops/sec per database. Not supported on hybrid tables: Streams, Materialized Views, Snowpipe, Replication, Data Sharing, Clustering Keys, Dynamic Tables, full Time Travel — workarounds exist (e.g. history table written from app code instead of via Streams).
- *SiS status:* GA; supports INSERT/UPDATE/DELETE against any table the app's role has privileges on; runs by default with owner's rights (restricted caller's rights in preview).
- *Cost shape:* row-store copy of a hybrid table is billed at a premium $/GB rate vs standard tables; column-store copy and compute are at standard rates. Expected to be negligible at the MB-scale of mapping tables but needs to be quoted from the Snowflake Service Consumption Table.
- *Open items to validate:* JBS Snowflake edition / cloud / region (assumed AWS commercial); whether SiS is enabled on the account; DR / replication strategy (hybrid tables don't replicate — fallback design needed if the account is replicated); `dbt-snowflake` adapter quirks when reading hybrid tables (expected none).

**References for the research phase**
- [Snowflake — Hybrid Tables overview](https://docs.snowflake.com/en/user-guide/tables-hybrid)
- [Snowflake — Hybrid Tables limitations](https://docs.snowflake.com/en/user-guide/tables-hybrid-limitations)
- [Snowflake — Hybrid Tables cost model](https://docs.snowflake.com/en/user-guide/tables-hybrid-cost)
- [Snowflake — Unistore GA announcement](https://www.snowflake.com/en/blog/unistore-general-availability/)
- [Snowflake — Streamlit owner's rights vs caller's rights](https://docs.snowflake.com/en/developer-guide/streamlit/object-management/owners-rights)
- [Actuvate — MDM using Snowflake + Streamlit reference architecture](https://actuvate.com.au/master-data-management-using-snowflake-streamlit-apps)
- [phData — Loading reference data into Snowflake](https://www.phdata.io/blog/considerations-and-approaches-to-loading-reference-data-into-snowflake/)

**Direct beneficiaries:** WP-34 (Sam's SKU mapping), WP-44 (Walmart SKU mapping). **Indirect beneficiaries to evaluate:** WP-60 (Circana Retailer/Geography DE-PARA) and WP-61 (Chicken MAPPED/UNMAPPED).

**Completion criteria:** Platform chosen, documented as an ADR in `docs/lanes/sales/adr/` with trade-off rationale and the operational flow agreed with the client master data team. Reusable template (hybrid table DDL + SiS app skeleton, or SharePoint structure, or equivalent) ready for the dependent WPs to consume.
**Owner:** DA + DE
**Size:** TBD — sized after the platform decision is taken.

---

**WP-07 — Snowflake/dbt inventory across retailers (discovery)**
**Description:** Inventory what exists in Snowflake (schemas, tables, volumes) and in dbt (models, sources, tests) for **each customer**, not just ABSCO. Today the only customer with a known Inventory fact table is Kroger (~160M rows); whether other customers (Costco, ABSCO, Sam's, Walmart, Publix) also have Inventory-style facts is **open** — Vitor flagged in the May 21 session that he had not seen any in ABSCO and would revisit.

Feeds the ETL ADRs (WP-10, WP-18, WP-24, WP-30, WP-39, WP-51) and the per-retailer dimensional modeling WPs (WP-15, WP-21, WP-25, WP-35, WP-45, WP-52). Without it, modeling and ETL operate blind on what already exists.

**Completion criteria:** Inventory per retailer documented in `docs/lanes/sales/architecture/`, with explicit confirmation of which retailers do/do not have Inventory facts available.
**Owner:** DE
**Size:** S (4–8h)

---

**WP-08 — Security Team approval: Twilio + Zapier VSAs**
**Description:** VSAs with JBS Security for the Twilio + Zapier services that enable the 2FA bypass on the Sam's and Walmart bots. Zapier VSA already approved — another JBS team in production (daily May 13); reuse as benchmark. Twilio VSA pending — Greg coordinating with the vendor for the security reports JBS requires (daily May 14). The same pair covers both retailers.
**Completion criteria:** Twilio VSA signed; Zapier VSA confirmed reusable for BIX.
**Owner:** DM
**Size:** L (more than 2 days) — external lead time.
**Breakdown plan:** N/A (L due to external lead time).
**Blocks:** WP-09, WP-31, WP-41.

---

**WP-09 — Twilio/Zapier shared account setup**
**Description:** Create and configure the Twilio and Zapier accounts that will support the 2FA bypass for **both Sam's (WP-31/WP-32) and Walmart (WP-41/WP-42) bots**. Single WP, single account chain — Rodrigo flagged in the May 21 session that duplicating account setup across the two retailers would be wasteful. Foundation for the per-bot automation work.

**Completion criteria:** Twilio and Zapier accounts provisioned under BIX control (recovery email, ownership, 2FA), with credentials documented in WP-82's inventory.
**Depends on:** WP-08 (VSA approval).
**Owner:** DE
**Size:** S (4–8h)

### Kroger

**WP-10 — Kroger ETL strategy ADR**
**Description:** Decide the migration of Kroger's transformations from Qlik into Snowflake/dbt. Today everything runs in Qlik and the ETL takes ~48 min — the May 21 session concluded the right move is to remodel the fact tables (separating dimensions from facts) and push transformations into Snowflake, leaving Qlik with only load + minor aggregations. The ADR formalizes this decision and the boundary, replacing what was previously a separate performance-diagnosis WP.

**Completion criteria:** ADR approved and versioned in `docs/adr/`, covering: (a) what stays in Qlik load vs. what moves to Snowflake/dbt; (b) fact/dimension separation; (c) Inventory handling boundary (detailed implementation within WP-15).
**Owner:** DE + BI
**Size:** L (3 days)

---

**WP-11 — Kroger Qlik App fixes backlog**
**Description:** Review existing fix documents + the app itself and produce a prioritized and sized list of fixes to feed subsequent sprint planning.
**Completion criteria:** Prioritized fix list, **each with a Size estimate (XS/S/M/L)** and a brief priority rationale. Each fix is added as a checklist item under WP-12.
**Owner:** BI
**Size:** M (1–2 days)

---

**WP-12 — Kroger prioritized fixes implementation**
**Description:** Single issue grouping the fixes identified in WP-11, plus the **Qlik-side refactor required by the Kroger ETL ADR (WP-10)** — once transformations migrate to Snowflake/dbt (per WP-15), the Kroger Qlik app must be refactored to read from the gold/mart layer instead of running its own ETL. Fixes and the refactor are tracked as a **checklist within this issue (not sub-issues)** to keep the board clean.
**Completion criteria:** All checklist items closed — fixes applied, Qlik refactored to read from the gold/mart layer, validated in dev, deployed via Hari.
**Owner:** BI
**Size:** Sum of checklist items; refined after WP-11.

---

**WP-15 — Kroger dimensional modeling**
**Description:** Build the Kroger gold/mart dimensional model in Snowflake/dbt per the Kroger ETL ADR (WP-10), aligned with **JBS dbt standards** (naming conventions, layering, shared vs specific dimensions, model/column descriptions per the semantic-layer ADR). Today Kroger's modeling is largely embedded in Qlik; as transformations migrate to Snowflake (per the ADR), Kroger needs an explicit gold/mart model on par with the other retailers. Target granularity: weekly sales per store × UPC; dimensions conformed to `dim_product`/UPC where possible.

**Scope includes the Inventory fact redesign** — `fct_kroger__inventory` (~160M rows in the current Qlik app) is the dominant performance driver and must be remodeled with extracted `dim_store` per the Kroger ADR. The **retention-policy decision with the user** is part of this WP: today the app may be loading 1 year of daily snapshots without justification — agree the retention window before implementation.

**Completion criteria:** Gold/mart model published (sales fact + dimensions + inventory fact); models comply with JBS dbt standards; retention policy agreed with the user and implemented in the pipeline; consumable by the refactored Kroger Qlik load. `schema.yml` populated for the model's tables and columns, with metric columns referencing the KPI Dictionary (WP-05) per the semantic-layer ADR. Post-implementation validation against the existing dashboards moved to WP-99 (daily 260623) — final Kroger validation happens at the load layer once gold is plugged in.
**Depends on:** WP-10 (ETL ADR), WP-07 (inventory discovery).
**Owner:** DE + BI
**Size:** TBD — sizing after discovery (WP-07, WP-10) closes.

---

**WP-16 — Kroger bot recovery and ownership setup**
**Description:** Ensure the Kroger bot recovery email is under BIX control, map the bot account owner, document where the credential lives, and validate the 2FA configuration. Motivated by the Costco incident (daily May 19: bot password rotated without notice, the JBS bot owner lost access) — the same risk applies to all bots inherited from Edvantis. Feeds WP-82 (consolidator document).

**Unification check (per Dustin's directive, weekly 260609):** evaluate whether the recovery email can be migrated to the single generic account created in WP-09 (intent is to unify all 2FA/portal/bot accounts under one address). Feasibility depends on JBS bot-account constraints — check before executing; if blocked, document the impediment.

**Completion criteria:** Recovery and ownership documented in the WP-82 inventory; configuration validated with the JBS bots team; unification feasibility documented (either migrated to the WP-09 account or impediment recorded).
**Owner:** DM
**Size:** S (4–8h)

---

**WP-17 — Kroger bot incremental refactor (follow-up)**
**Description:** The Kroger bot may suffer from the same non-incremental ingestion anti-pattern identified for ABSCO (daily May 19 — bot deletes and rewrites the source table weekly, with the trigger duplicating data). Verifying and refactoring is **Paco's responsibility (JBS)**, not BIX execution; this WP exists for BIX to follow up, validate the fix, and ensure delivery quality.
**Completion criteria:** Kroger bot ingesting incrementally in production; verified by BIX through monitoring.
**Owner:** DM (follow-up) — Paco executes.
**Size:** S (4–8h) — follow-up only.

---

**WP-99 — Kroger Qlik App load layer (refactor)**
**Description:** Refactor the existing Kroger Qlik app load layer to read from the new gold model (WP-15) in Snowflake/dbt, replacing the current in-Qlik ETL (~48 min load). Same thin-Qlik approach as WP-26 (ABSCO), WP-36 (Sam's), WP-46 (Walmart): **load + variables only**, no heavy transformation in Qlik. Absorbs the Qlik-side fixes previously planned in WP-11 / WP-12.
**Completion criteria:** Load script refactored to pull from gold; variables centralized in script; load time materially reduced vs. the current Qlik ETL; existing dashboards continue to render correctly after the cutover. **Post-implementation validation:** verify that the fixes mapped in WP-12 (Kroger fixes) are correctly resolved by the new gold/mart model — the fixes must carry through to the dbt layer, not just patched at the Qlik level (decision in daily 260612; consolidated here from WP-15 in daily 260623).
**Depends on:** WP-15.
**Owner:** BI
**Size:** M (1–2 days)

### Costco

**WP-18 — Costco ETL strategy ADR**
**Description:** Decide the migration of Costco's transformations from Qlik into Snowflake/dbt, mirroring the WP-10 reasoning for Kroger. The May 13 daily noted Costco appears close to ABSCO — they may converge; revisit consolidation if the ADRs align.
**Completion criteria:** ADR approved and versioned in `docs/adr/`.
**Owner:** DE + BI
**Size:** L (3 days)

---

**WP-19 — Costco fixes backlog**
**Description:** Based on `Costco Project.docx` + app review, produce a prioritized and sized fix list to feed subsequent sprint planning. Includes auditing the Costco bot logic against the anti-pattern identified in ABSCO (daily May 19 — weekly delete+rewrite with no history) and feeding WP-23 if applicable.
**Completion criteria:** Prioritized fix list, **each with a Size estimate (XS/S/M/L)** and brief priority rationale. Each fix is added as a checklist item under WP-20.
**Owner:** BI
**Size:** S (4–8h)

---

**WP-20 — Costco prioritized fixes implementation**
**Description:** Single issue grouping the fixes identified in WP-19, plus the **Qlik-side refactor required by the Costco ETL ADR (WP-18)** — once transformations migrate to Snowflake/dbt (per WP-21), the Costco Qlik app must be refactored to read from the gold/mart layer instead of running its own ETL. Fixes and the refactor are tracked as a **checklist within this issue (not sub-issues)** to keep the board clean.
**Completion criteria:** All checklist items closed — fixes applied, Qlik refactored to read from the gold/mart layer, validated, deployed.
**Owner:** BI
**Size:** M (1–2 days) — sum of checklist items; refined after WP-19.

---

**WP-21 — Costco dimensional modeling**
**Description:** Build the Costco gold/mart dimensional model in Snowflake/dbt per the Costco ETL ADR (WP-18), aligned with **JBS dbt standards** (naming, layering, descriptions per the semantic-layer ADR). Same rationale as WP-15 (Kroger): as Costco transformations migrate to Snowflake per WP-18, an explicit gold/mart model is required for symmetry with the other retailers.
**Completion criteria:** Gold/mart model published (sales fact + dimensions); models comply with JBS dbt standards; consumable by the refactored Costco Qlik load. `schema.yml` populated for the model's tables and columns, with metric columns referencing the KPI Dictionary (WP-05) per the semantic-layer ADR.
**Depends on:** WP-18 (ETL ADR), WP-07 (inventory discovery).
**Owner:** DE
**Size:** TBD — sizing after discovery (WP-07, WP-18) closes.

---

**WP-22 — Costco bot recovery and ownership setup**
**Description:** Recovery and ownership of the Costco bot was reconfigured under BIX control following the May 17 incident (daily May 19: password rotated automatically without notice, the JBS bot owner lost access). The immediate recovery is resolved (recovery email redirected to the JBS bot owner, agreement reached over Teams), but the **unification with the WP-09 generic account** is still pending. Feeds WP-82 (consolidator document).

**Unification check (per Dustin's directive, weekly 260609):** evaluate whether the recovery email can be migrated to the single generic account created in WP-09 (intent is to unify all 2FA/portal/bot accounts under one address). Feasibility depends on JBS bot-account constraints — check before executing; if blocked, document the impediment.

**Completion criteria:** Recovery routed and documented in the WP-82 inventory; unification feasibility documented (either migrated to the WP-09 account or impediment recorded).
**Owner:** DM
**Size:** S (4–8h)

---

**WP-23 — Costco bot incremental refactor (follow-up)**
**Description:** Same anti-pattern check as WP-17 (Kroger), applied to Costco. Execution sits with Paco; BIX follows up and validates.
**Completion criteria:** Costco bot ingesting incrementally in production; verified by BIX.
**Owner:** DM (follow-up) — Paco executes.
**Size:** S (4–8h) — follow-up only.

---

**WP-100 — Costco Qlik App load layer (refactor)**
**Description:** Refactor the existing Costco Qlik app load layer to read from the new gold model (WP-21) in Snowflake/dbt, replacing the current in-Qlik ETL. Same thin-Qlik approach as WP-26 (ABSCO), WP-36 (Sam's), WP-46 (Walmart), WP-99 (Kroger): **load + variables only**, no heavy transformation in Qlik. Absorbs the Qlik-side fixes previously planned in WP-19 / WP-20 — including the **% Dollar Share of Segment** formula adjustment for partially-covered segments.
**Completion criteria:** Load script refactored to pull from gold; variables centralized in script; existing dashboards continue to render correctly after the cutover; Dollar Share formula validated against the corrected gold output.
**Depends on:** WP-21.
**Owner:** BI
**Size:** M (1–2 days)

### ABSCO

**WP-24 — ABSCO ETL strategy ADR**
**Description:** Decision on the Snowflake/dbt vs. Qlik boundary for ABSCO. ABSCO has no Qlik App yet and no standard defined today.
**Completion criteria:** ADR approved and versioned in `docs/adr/`.
**Owner:** DE + BI
**Size:** L (3 days)

---

**WP-25 — ABSCO dimensional modeling**
**Description:** Build the ABSCO gold/mart dimensional model in Snowflake/dbt per the ABSCO ETL ADR (WP-24), aligned with **JBS dbt standards** (naming, layering, descriptions per the semantic-layer ADR). Input to WP-26 (Qlik load layer) and WP-27 (front-end). Target granularity: weekly sales per store × UPC; dimensions conformed to `dim_product`/UPC where possible.
**Completion criteria:** Gold/mart model published (sales fact + dimensions); models comply with JBS dbt standards; consumable by WP-26. `schema.yml` populated for the model's tables and columns, with metric columns referencing the KPI Dictionary (WP-05) per the semantic-layer ADR.
**Depends on:** WP-24 (ETL ADR), WP-07 (inventory discovery).
**Owner:** DE
**Size:** TBD — sizing after discovery (WP-07, WP-24) closes.

---

**WP-26 — ABSCO Qlik App load layer**
**Description:** Qlik load layer that pulls from the gold model (WP-25) into the ABSCO app. Per the May 21 decision, since transformations migrate to Snowflake, the Qlik side stays as **load + variables only** (variables previously calculated in the front-end move to script as a best-practice cleanup). No heavy ETL.
**Completion criteria:** Load script in place pulling from gold; variables centralized in script; load time acceptable.
**Owner:** BI
**Size:** M (1–2 days)

---

**WP-27 — ABSCO front-end (velocity table + drill-down)**
**Description:** Build the front-end of the ABSCO app (the project's first new Qlik App, since ABSCO had no dedicated app). Focus on a velocity table with drill-down to UPC, with formulas aligned to the legacy reference report. KPIs consumed from the dictionary (WP-05).
**Completion criteria:** Velocity table, drill-down to UPC, formulas aligned with the legacy reference report. KPIs consumed from WP-05; any new KPI identified is registered there before implementation.
**Breakdown plan:** [WP-27.1] page skeleton and filters; [WP-27.2] velocity table (consuming KPIs from WP-05); [WP-27.3] drill-down to UPC; [WP-27.4] alignment of formulas with the legacy reference report; [WP-27.5] performance / Section Access review.
**Depends on:** WP-05 (initial version), WP-26.
**Owner:** BI
**Size:** M (2 days) — scope is limited to the velocity table; reference baseline for sizing other front-ends.

---

**WP-28 — ABSCO stakeholder validation**
**Description:** Named validator defined in the WP-04 validators map (ABSCO row). The work itself is asynchronous — BIX prepares the deliverable, the stakeholder reviews. Total elapsed time tends toward ~5 working days, but **none of that time is BIX-blocking**: this WP exists to keep follow-ups visible and to gate dependent downstream WPs (e.g., GTM consolidated app).
**Completion criteria:** Formal dashboard acceptance by the validator named in WP-04.
**Owner:** BI + DM
**Size:** ~5 days elapsed (stakeholder-bound; not BIX effort).

---

**WP-29 — ABSCO bot recovery and ownership setup**
**Description:** Ensure the ABSCO bot recovery email is under BIX control, map the bot account owner, document where the credential lives, and validate the 2FA configuration. Same motivation as WP-16 (Kroger) and WP-22 (Costco) — close the governance debt inherited from Edvantis before it becomes an incident. Feeds WP-82.

**Unification check (per Dustin's directive, weekly 260609):** evaluate whether the recovery email can be migrated to the single generic account created in WP-09 (intent is to unify all 2FA/portal/bot accounts under one address). Feasibility depends on JBS bot-account constraints — check before executing; if blocked, document the impediment.

**Completion criteria:** Recovery and ownership documented in the WP-82 inventory; configuration validated with the JBS bots team; unification feasibility documented (either migrated to the WP-09 account or impediment recorded).
**Owner:** DM
**Size:** S (4–8h)

### Sam's Club

**WP-30 — Sam's ETL strategy ADR**
**Description:** Decision on the Snowflake/dbt vs. Qlik boundary for Sam's. No standard defined today.
**Completion criteria:** ADR approved and versioned in `docs/adr/`.
**Owner:** DE + BI
**Size:** L (3 days)

---

**WP-31 — Sam's Python bot development**
**Description:** Login + extraction script for the Sam's portal, with **incremental ingestion logic and BIX-controlled ownership/recovery** — avoiding the ABSCO bot anti-pattern (weekly delete+rewrite with no history) and the credential debt inherited from Edvantis. Recovery email, associated JBS account, 2FA, and BIX owner configurations are part of the deliverable.

The May 21 session split the original single bot WP into two: this WP covers the Python bot itself; WP-32 covers the Zapier/Twilio automation that wraps the 2FA bypass.

**Completion criteria:** Reviewed script ready for handoff to the RPA Team, with incremental ingestion logic and credential setup documented. Handoff and source cutover are the natural closure of this WP (no separate WP), with BIX following up to ensure deploy.
**Breakdown plan:** [WP-31.1] credential setup under BIX control (recovery email, JBS account, 2FA, owner); [WP-31.2] login + extraction script on the Sam's portal; [WP-31.3] incremental ingestion logic (key/window/idempotency); [WP-31.4] load into Snowflake on the target table; [WP-31.5] handoff to RPA Team + source cutover follow-up.
**Depends on:** WP-08, WP-09.
**Owner:** DE
**Size:** L (3–4 days)

---

**WP-32 — Sam's Zapier/Twilio automation + remaining bot development**
**Description:** Build the Zapier automation that, together with the shared Twilio account (WP-09), delivers the 2FA codes the bot needs. **Also absorbs the remaining bot scope from WP-31** (login/extraction + incremental ingestion base were delivered there; what is left — final wiring against the live Twilio/Zapier accounts, end-to-end test, RPA Team handoff, and source cutover follow-up — runs here).
**Completion criteria:** Zapier flow live, delivering 2FA codes to the bot on demand; bot end-to-end test green in dev; RPA Team handoff completed and source cutover validated in production.
**Depends on:** WP-09, WP-08.
**Owner:** DE
**Size:** M (1–2 days) — Zapier flow + final bot wiring + handoff.

---

**WP-33 — Sam's bot final documentation**
**Description:** Closing documentation for the Sam's bot in production — delivered after the RPA Team handoff inside WP-31. Covers: Python script architecture, dependencies (2FA bypass via WP-08, Zapier flow via WP-32), operational runbook for the RPA Team, and known failure points.
**Completion criteria:** Doc versioned in `docs/lanes/sales/architecture/bots/sams.md`; referenced in RPA Team handoff materials.
**Owner:** DE
**Size:** S (4–8h)

---

**WP-34 — Sam's SKU and category mapping (writeback table)**
**Description:** Per the 260612 daily, Sam's needs a single writeback table covering two complementary mappings:

- **Client UPC → JBS SKU/SAP** — needed to merge the `PILGRIMS` history with the manual/bot source (without it, history union is inconsistent).
- **Category mapping per product** — used downstream to classify products for the validation app.

Both pieces fit in the same writeback table per the team's preference; the user-facing mapper (per WP-04 validators map) fills it. Implementation depends on WP-06 (writeback table platform). Must be in place before Sam's dimensional modeling (WP-35) so that `dim_product`/UPC can be conformed.
**Completion criteria:** Writeback table populated with SKU and category mappings; consumed by downstream models. The Snowflake/dbt landing (DE) and the Qlik writeback front-end (BI) both in place.
**Depends on:** WP-06.
**Owner:** DE + BI (writeback front-end in Qlik = BI; Snowflake/dbt landing = DE)
**Size:** TBD — sized after WP-06 closes.

---

**WP-35 — Sam's dimensional modeling**
**Description:** Build the Sam's gold/mart dimensional model in Snowflake/dbt per the Sam's ETL ADR (WP-30), aligned with **JBS dbt standards** (naming, layering, descriptions per the semantic-layer ADR). Consumes the unified PILGRIMS history + manual/bot source (already resolved by Rodrigo prior to the May 21 session) and uses the WP-34 SKU DE-PARA to conform `dim_product`/UPC. Target granularity: weekly sales per store × UPC.
**Completion criteria:** Gold/mart model published (sales fact + dimensions); models comply with JBS dbt standards; consumable by WP-36. `schema.yml` populated for the model's tables and columns, with metric columns referencing the KPI Dictionary (WP-05) per the semantic-layer ADR.
**Depends on:** WP-07 (inventory discovery), WP-30 (ETL ADR), WP-34 (SKU mapping).
**Owner:** DE
**Size:** TBD — sizing after discovery (WP-07, WP-30) closes.

---

**WP-36 — Sam's Qlik App load layer**
**Description:** Qlik load layer that pulls from the gold model (WP-35) into the Sam's app. Following the May 21 standard, since transformations migrate to Snowflake, the Qlik side stays as **load + variables only** — heavy transformation lives in Snowflake. Same thin Qlik approach as WP-26 (ABSCO).
**Completion criteria:** Load script in place pulling from gold; variables centralized in script; load time acceptable.
**Depends on:** WP-35.
**Owner:** BI
**Size:** M (1–2 days)

---

**WP-37 — Sam's front-end**
**Description:** Build the Sam's app pages and visualizations consuming from the WP-36 load layer. KPIs consumed from the dictionary (WP-05). Reference for sizing: WP-27 (ABSCO velocity table) was estimated at 2 days; Sam's typically covers more pages.
**Completion criteria:** App in dev with pages implemented and navigable; KPIs from WP-05 (any new KPI identified is registered there before implementation); ready for formal acceptance in WP-38.
**Breakdown plan:** [WP-37.1] page/filter skeleton; [WP-37.2] main visualizations (KPIs from WP-05); [WP-37.3] performance / Section Access review. Refine in planning once WP-35 closes.
**Depends on:** WP-05, WP-36.
**Owner:** BI
**Size:** L (more than 2 days)

---

**WP-38 — Sam's stakeholder validation**
**Description:** Named validator defined in the WP-04 validators map (Sam's row). Same dynamic as WP-28: stakeholder-bound elapsed time, not BIX effort; exists to keep follow-ups visible and gate downstream work.
**Completion criteria:** Formal dashboard acceptance by the validator named in WP-04.
**Owner:** BI + DM
**Size:** ~5 days elapsed (stakeholder-bound; not BIX effort).

### Walmart

> Same chain as Sam's, with the addition of investigating the missing facts (today only `YTD_Sales`). Validator defined in the WP-04 validators map (Walmart row). The May 21 session focused on D1 with explicit detail on Sam's; decisions on Walmart are applied here by symmetry with Sam's.

---

**WP-39 — Walmart ETL strategy ADR**
**Description:** Decision on the Snowflake/dbt vs. Qlik boundary for Walmart. No standard defined today.
**Completion criteria:** ADR approved and versioned in `docs/adr/`.
**Owner:** DE + BI
**Size:** L (3 days)

---

**WP-40 — Walmart missing facts investigation**
**Description:** Today only `YTD_Sales` is available. Map which other facts exist at the source and the path to bring them in.
**Completion criteria:** Fact list + extraction plan documented.
**Owner:** DE
**Size:** M (1–2 days)

---

**WP-41 — Walmart Python bot development**
**Description:** Same standard as WP-31 (Sam's): login + extraction script with incremental ingestion and BIX-controlled ownership/recovery. Handoff to the RPA Team and source cutover are the natural closure of this WP (no separate handoff WP), with BIX following up to ensure deploy.
**Completion criteria:** Reviewed script ready for handoff, with incremental ingestion and credential setup documented.
**Breakdown plan:** [WP-41.1] credential setup under BIX control; [WP-41.2] login + extraction script on the Walmart portal; [WP-41.3] incremental ingestion logic; [WP-41.4] load into Snowflake on the target table; [WP-41.5] handoff to RPA Team + source cutover follow-up. Reuse patterns from WP-31 where applicable.
**Depends on:** WP-08, WP-09.
**Owner:** DE
**Size:** L (3–4 days)

---

**WP-42 — Walmart Zapier/Twilio automation + remaining bot development**
**Description:** Same approach as WP-32 (Sam's), applied to Walmart. Shares the Twilio account from WP-09; the Zapier flow itself is per-bot. **Also absorbs the remaining bot scope from WP-41** (login/extraction + incremental ingestion base were delivered there; what is left — final wiring against the live Twilio/Zapier accounts, end-to-end test, RPA Team handoff, and source cutover follow-up — runs here).
**Completion criteria:** Zapier flow live, delivering 2FA codes to the Walmart bot on demand; bot end-to-end test green in dev; RPA Team handoff completed and source cutover validated in production.
**Depends on:** WP-09, WP-08.
**Owner:** DE
**Size:** M (1–2 days) — Zapier flow + final bot wiring + handoff.

---

**WP-43 — Walmart bot final documentation**
**Description:** Same motivation as WP-33 (Sam's) applied to Walmart — closing documentation for the bot in production, with architecture, dependencies (2FA bypass via WP-08, Zapier flow via WP-42), and operational runbook for the RPA Team.
**Completion criteria:** Doc versioned in `docs/lanes/sales/architecture/bots/walmart.md`; referenced in RPA Team handoff materials.
**Owner:** DE
**Size:** S (4–8h)

---

**WP-44 — Walmart SKU and category mapping (writeback table)**
**Description:** Same shape as WP-34 (Sam's), applied to Walmart. A single writeback table covers two complementary mappings:

- **Client UPC → JBS SKU/SAP** — needed to merge history with the manual/bot source.
- **Category mapping per product** — used downstream to classify products for the validation app.

The user-facing mapper (per WP-04 validators map) fills the table. Implementation depends on WP-06. Must be in place before Walmart dimensional modeling (WP-45).
**Completion criteria:** Writeback table populated with SKU and category mappings; consumed by downstream models. The Snowflake/dbt landing (DE) and the Qlik writeback front-end (BI) both in place.
**Depends on:** WP-06.
**Owner:** DE + BI (writeback front-end in Qlik = BI; Snowflake/dbt landing = DE)
**Size:** TBD — sized after WP-06 closes.

---

**WP-45 — Walmart dimensional modeling**
**Description:** Build the Walmart gold/mart dimensional model in Snowflake/dbt per the Walmart ETL ADR (WP-39), aligned with **JBS dbt standards** (naming, layering, descriptions per the semantic-layer ADR). Uses the WP-44 SKU DE-PARA to conform `dim_product`/UPC. Depends on the additional facts mapped in WP-40 (today only `YTD_Sales`).
**Completion criteria:** Gold/mart model published (sales fact + dimensions); models comply with JBS dbt standards; consumable by WP-46. `schema.yml` populated for the model's tables and columns, with metric columns referencing the KPI Dictionary (WP-05) per the semantic-layer ADR.
**Depends on:** WP-07, WP-39, WP-40, WP-44.
**Owner:** DE
**Size:** TBD — sizing after discovery (WP-07, WP-39, WP-40) closes.

---

**WP-46 — Walmart Qlik App load layer**
**Description:** Qlik load layer that pulls from the gold model (WP-45) into the Walmart app. Same thin Qlik approach as WP-36 (Sam's) and WP-26 (ABSCO): load + variables only, heavy work in Snowflake.
**Completion criteria:** Load script in place pulling from gold; variables centralized in script; load time acceptable.
**Depends on:** WP-45.
**Owner:** BI
**Size:** M (1–2 days)

---

**WP-47 — Walmart front-end**
**Description:** Build the Walmart app pages and visualizations consuming from the WP-46 load layer. KPIs consumed from the dictionary (WP-05).
**Completion criteria:** App in dev with pages implemented and navigable; KPIs from WP-05 (any new KPI identified is registered there before implementation); ready for formal acceptance in WP-48.
**Breakdown plan:** [WP-47.1] page/filter skeleton; [WP-47.2] main visualizations (KPIs from WP-05); [WP-47.3] performance / Section Access review. Refine in planning once WP-40 (missing facts) and WP-45 (modeling) close.
**Depends on:** WP-05, WP-46.
**Owner:** BI
**Size:** L (more than 2 days)

---

**WP-48 — Walmart stakeholder validation**
**Description:** Named validator defined in the WP-04 validators map (Walmart row). Same dynamic as WP-28 / WP-38.
**Completion criteria:** Formal dashboard acceptance by the validator named in WP-04.
**Owner:** BI + DM
**Size:** ~5 days elapsed (stakeholder-bound; not BIX effort).

### Publix

**WP-49 — Publix Item Sales Reports access unblock**
**Description:** Escalate with the validator(s) defined in the WP-04 validators map (Publix row) to unblock provisioning. Without it, nothing on Publix can move.
**Completion criteria:** Access provisioned; data available for extraction.
**Breakdown plan:** N/A (L due to external lead time — validator(s) in WP-04 validators map, Publix row).
**Owner:** DM
**Size:** L (more than 2 days) — lead time.
**Blocks:** WP-50, WP-51, WP-52, WP-53, WP-54, WP-55.

---

**WP-50 — Publix available data inventory** *(conditional on WP-49)*
**Description:** After the access unblock (WP-49), inventory which tables and fields are available and at what granularity. Feeds the ETL ADR (WP-51) and modeling (WP-52).
**Completion criteria:** Inventory of available tables/fields documented; gap analysis vs. what the other SMD retailers offer.
**Owner:** DE
**Size:** S (4–8h)

---

**WP-51 — Publix ETL strategy ADR**
**Description:** Decision on the Snowflake/dbt vs. Qlik boundary for Publix. Conditional on WP-49 (access unblock) and informed by WP-50 (data inventory) — without data, the decision remains on standby.
**Completion criteria:** ADR approved and versioned in `docs/adr/` (after WP-49 and WP-50).
**Depends on:** WP-49, WP-50.
**Owner:** DE + BI
**Size:** L (3 days)

---

**WP-52 — Publix pipeline + modeling** *(conditional on WP-49)*
**Description:** Publix ingestion pipeline (manual or bot, per the decision after WP-49/WP-50) + gold/mart dimensional modeling in Snowflake/dbt per the Publix ETL ADR (WP-51), aligned with **JBS dbt standards** (naming, layering, descriptions per the semantic-layer ADR). The operational path is fully conditional on the access unblock (WP-49) and inventory (WP-50).
**Completion criteria:** Pipeline ingesting Publix data into Snowflake on the agreed cadence; gold/mart model published (sales fact + dimensions); models comply with JBS dbt standards; consumable by WP-53. `schema.yml` populated for the model's tables and columns, with metric columns referencing the KPI Dictionary (WP-05) per the semantic-layer ADR.
**Breakdown plan:** TBD in planning — unblocked by WP-49 + WP-50.
**Depends on:** WP-07, WP-50, WP-51.
**Owner:** DE
**Size:** TBD — sizing after discovery (WP-07, WP-50, WP-51) closes.

---

**WP-53 — Publix Qlik App load layer** *(conditional on WP-49)*
**Description:** Qlik load layer that pulls from the gold model (WP-52) into the Publix app. Same thin Qlik approach as WP-26 (ABSCO), WP-36 (Sam's), WP-46 (Walmart): load + variables only, heavy work in Snowflake.
**Completion criteria:** Load script in place pulling from gold; variables centralized in script; load time acceptable.
**Depends on:** WP-52.
**Owner:** BI
**Size:** M (1–2 days)

---

**WP-54 — Publix front-end** *(conditional on WP-49)*
**Description:** Build the Publix app pages and visualizations consuming from the WP-53 load layer. KPIs consumed from the dictionary (WP-05).
**Completion criteria:** App in dev with pages implemented and navigable; KPIs from WP-05 (any new KPI identified is registered there before implementation); ready for formal acceptance in WP-55.
**Breakdown plan:** TBD in planning — unblocked by WP-52 + WP-53. Likely outline: [WP-54.1] page/filter skeleton; [WP-54.2] main visualizations (KPIs from WP-05); [WP-54.3] performance / Section Access review.
**Depends on:** WP-05, WP-53.
**Owner:** BI
**Size:** L (more than 2 days)

---

**WP-55 — Publix stakeholder validation** *(conditional on WP-49)*
**Description:** Named validator defined in the WP-04 validators map (Publix row; likely `TBD` in the initial version given the access block, resolved together with WP-49). Same dynamic as WP-28 / WP-38 / WP-48: stakeholder-bound elapsed time, not BIX effort.
**Completion criteria:** Formal dashboard acceptance by the validator defined in the WP-04 validators map.
**Owner:** BI + DM
**Size:** ~5 days elapsed (stakeholder-bound; not BIX effort).

### Circana

**WP-56 — Circana mockups archive**
**Description:** Archive the new Circana mockups developed by Khrystyna + Sebastian (referenced 260602) once received. May feed future dashboard development depending on the consumption-layer decision (open since 260526).
**Completion criteria:** Mockups archived under `docs/mockups/circana/`.
**Owner:** DM
**Size:** S (4–8h)

---

**WP-97 — AS-IS Map (current Circana flow)**
**Description:** End-to-end Circana data flow diagram (Snowflake data share → raw consumption in Qlik), versioned and consolidated. Covers Brand Level + SKU Level + cross-cutting tables (`GEOG_META`, `BRAND_GEOG_META`) and the manual DE-PARA layer.

For each table: raw DB table name, source location, current transformation location (dbt / Qlik / none).

**Completion criteria:** Diagram versioned in `docs/lanes/sales/architecture/`, linked from the lane briefing.
**Owner:** DE + BI
**Size:** M (1–2 days)

---

**WP-57 — Circana × SAP DE-PARA investigation (UPC/SKU)**
**Description:** Investigate and resolve the divergence between Circana and SAP via the `UPC_13_DIGIT` join key (May 12 KT).
**Completion criteria:** Root causes documented + correction plan.
**Owner:** DE + BI
**Size:** L (more than 2 days)

---

**WP-58 — Circana brand × UPC divergence (intra-source)**
**Description:** The `JBS Market Sales Insight` app has no users due to divergence between Circana brand-level (`BRAND_SALES_DATA`) and UPC-level (`SALES_DATA`) aggregates (May 12 KT). Likely reconciliation involves masking SKUs not shared by Circana at UPC level.
**Completion criteria:** Root causes documented + correction plan; KPI variants registered in WP-05 if needed.
**Owner:** DE + BI
**Size:** L (more than 2 days)

---

**WP-60 — Retailer/Geography DE-PARA (Circana)**
**Description:** `GEOG_META` / `BRAND_GEOG_META` bundle Retailer and Geography in the same field; manual DE-PARA spreadsheet maintains the separation today, with duplication risk if it drifts. Move to the WP-06 platform. Source: [Circana KT pt1 (260512)](transcriptions/others/260512_circana_kt_pt1.md).
**Completion criteria:** DE-PARA versioned + ingestion automated; pipeline consuming the separation correctly.
**Owner:** DE
**Size:** M (1–2 days)

---

**WP-61 — Chicken category mapping review**
**Description:** Review the `MAPPED`/`UNMAPPED` flag and the chicken category/sub-category/segment mappings. Only Chicken needs manual mapping; Beef and Pork rely on Circana's own categories. Hygiene review, not deep investigation. Source: [Circana KT pt1 (260512)](transcriptions/others/260512_circana_kt_pt1.md).
**Completion criteria:** Mappings reviewed; stale entries cleaned up if found.
**Owner:** BI
**Size:** S (4–8h)

---

**WP-98 — TO-BE Map (target Circana flow)**
**Description:** End-to-end diagram of the target state for the Circana data flow, mirroring WP-97 structurally but showing where each table should live and where transformation should happen. Reflects the brand-level ETL (WP-84), SKU-level migration to dbt, Retailer/Geography normalization (WP-60), and the divergence resolutions (WP-57, WP-58).
**Completion criteria:** Diagram versioned in `docs/lanes/sales/architecture/`, linked from the lane briefing.
**Depends on:** WP-84, WP-57, WP-58, WP-60.
**Owner:** DE + BI
**Size:** S (8h)

---

**WP-84 — Circana Brand Level: ETL development**
**Description:** Per the scope matrix, Circana Brand Level (`BRAND_SALES_DATA`, `BRAND_GEOG_META`) is still in "Develop ETL" state — data arrives via Snowflake data share but is consumed raw by Qlik with no gold/mart layer. Design and implement the brand-level ETL aligned with **JBS dbt standards**.
**Completion criteria:** Brand-level gold/mart model published; `schema.yml` populated with metric columns referencing the KPI Dictionary (WP-05) per the semantic-layer ADR.
**Owner:** DE + BI
**Size:** TBD — sized after initial scoping.

### NPD

**WP-63 — NPD ETL + gold layer (from raw)**
**Description:** NPD raw data is already loaded into Snowflake via the RPA Team bot (per Khrystyna, 260602). There is no ETL process and no gold/mart layer today — consumption from raw is not viable. Build the full bronze/staging → silver/intermediate → gold/mart pipeline aligned with **JBS dbt standards**.

**Target design (scoped before implementation, recorded in `docs/lanes/sales/architecture/`):** fact + dimensions at the granularity required by downstream consumption. Acts as the lightweight "TO-BE" for NPD without a separate WP.

**Completion criteria:** NPD gold/mart model published; design doc + `schema.yml` committed; metric columns reference the KPI Dictionary (WP-05) per the semantic-layer ADR.
**Owner:** DE
**Size:** TBD — sizing after design scoping closes.

### Historical Sales Data

**WP-67 — Current SAP flow survey**
**Description:** Map the SAP flow currently in production: Fivetran ingests SAP, data is stored as QVDs and cross-referenced with Circana via UPC/SKU (DE-PARA). Document tables involved, frequency, owners, and known failure points. Feeds the feasibility analysis (WP-68) and the decision ADR (WP-69).
**Completion criteria:** Document mapping current flow (source → Fivetran → QVD → Qlik), with tables, frequency, owners, and failure points.
**Owner:** DE
**Size:** M (1–2 days)

---

**WP-68 — SAP → Snowflake migration feasibility analysis**
**Description:** Assess cost, benefit, and priority of migrating the SAP layer from QVDs to Snowflake/dbt, in light of the WP-67 survey. Consider: gains for the cross-source consolidated gold layer (WP-73), simplification of the Circana × SAP cross-reference (WP-72), migration effort, and operational impact. Input to the WP-69 ADR.
**Completion criteria:** Analysis document with pros/cons + recommendation + effort estimate; direct input to the WP-69 ADR.
**Owner:** DE + DM
**Size:** M (1–2 days)

---

**WP-69 — SAP migration decision ADR**
**Description:** Formal decision on whether to migrate the SAP layer to Snowflake/dbt, based on the WP-68 analysis. The decision unblocks (or cancels) WP-70, WP-71, and WP-72, and directly influences the consolidated model in WP-73.
**Completion criteria:** ADR approved and versioned in `docs/adr/`.
**Owner:** DE + DM
**Size:** S (4–8h)

---

**WP-70 — SAP Snowflake modeling** *(conditional)*
**Description:** Build the SAP gold/mart dimensional model in Snowflake/dbt aligned with **JBS dbt standards**. Conditional on WP-69 approval. Covers Internal Sales facts at a granularity suitable for joining with Circana via UPC/SKU.
**Completion criteria:** SAP gold model published (fact + dimensions); consumable by WP-71 and the WP-72 cross-reference. `schema.yml` populated for the model's tables and columns, with metric columns referencing the KPI Dictionary (WP-05) per the semantic-layer ADR.
**Breakdown plan:** TBD in planning — unblocked by WP-69.
**Owner:** DE
**Size:** L (more than 2 days)

---

**WP-71 — SAP dbt implementation** *(conditional)*
**Description:** Implementation of the dbt models materializing the WP-70 design, with bronze/staging → silver/intermediate → gold/mart layers and appropriate tests. Replaces (or complements, per the WP-69 decision) the current QVD layer.
**Completion criteria:** SAP dbt models running in production; tests green; gold model consumable by WP-72 and by the cross-source consolidated gold layer (WP-73).
**Breakdown plan:** TBD in planning — unblocked by WP-70.
**Owner:** DE
**Size:** L (more than 2 days)

---

**WP-72 — Circana × SAP cross-reference rewrite** *(conditional)*
**Description:** Rewrite the Circana × SAP cross-reference (today in Qlik via QVDs and UPC/SKU DE-PARA) in the new environment (Snowflake/dbt) after the WP-71 migration. Incorporates what is learned in the WP-57 investigation.
**Completion criteria:** Circana × SAP cross-reference implemented in Snowflake/dbt; results consistent with the previous Qlik version (or divergences documented + correction plan).
**Owner:** DE
**Size:** M (1–2 days)

---

**WP-85 — Redistributor Report handover and discovery**
**Description:** Knowledge transfer session from the current source owners (per `scope_matrix.md`) covering: report definition, ingestion path (TBD today), source format, volumes/cadence, current logic location and structure, downstream consumers. On top of the handover, inventory what already exists and assess the gap to a Snowflake-native pipeline. Output feeds subsequent ETL/modeling WPs sized only after discovery closes.
**Completion criteria:** Discovery doc versioned in `docs/lanes/sales/architecture/` covering current state inventory + gap analysis to a Snowflake-native pipeline.
**Owner:** DE + DM
**Size:** S (4–8h)

---

**WP-86 — Operator Purchasing File handover and discovery**
**Description:** Knowledge transfer session from the current source owners (per `scope_matrix.md`) covering: file structure, current Excel → Snowflake ingestion path, logic currently sitting outside Snowflake, volumes/cadence, downstream consumers. On top of the handover, assess the gap to a Snowflake-native pipeline.
**Completion criteria:** Discovery doc versioned in `docs/lanes/sales/architecture/` covering current state inventory + gap analysis to a Snowflake-native pipeline.
**Owner:** DE + DM
**Size:** S (4–8h)

---

**WP-87 — Blacksmith Agreements handover and discovery**
**Description:** Same shape as WP-86 applied to Blacksmith Agreements. Knowledge transfer of the current Excel → Snowflake flow and out-of-platform logic, followed by gap analysis to a Snowflake-native pipeline.
**Completion criteria:** Discovery doc versioned in `docs/lanes/sales/architecture/` covering current state inventory + gap analysis to a Snowflake-native pipeline.
**Owner:** DE + DM
**Size:** S (4–8h)

### Sales Pipeline

**WP-88 — MS Dynamics handover and discovery**
**Description:** Knowledge transfer session from the current source owners (per `scope_matrix.md`) covering the Dynamics Accounts and Opportunities raw layer already loaded into Snowflake via Fivetran: tables and columns available, granularity, volumes/cadence, current downstream consumers (e.g., monthly reports for field sales), and any integration logic sitting outside Snowflake (e.g., custom authorization wrappers between Dynamics and Qlik). On top of the handover, assess the gap to a Snowflake-native gold layer for the Sales Pipeline domain. Output feeds subsequent ETL/modeling WPs sized only after discovery closes.
**Completion criteria:** Discovery doc versioned in `docs/lanes/sales/architecture/` covering raw-layer inventory, current consumers, integration surfaces, and gap analysis to a Snowflake-native gold layer.
**Owner:** DE + DM
**Size:** M (1–2 days)

---

**WP-89 — Axcion handover and discovery**
**Description:** Knowledge transfer session from the current source owners (per `scope_matrix.md`) covering the Axcion Sales Activities and Sales Opportunities sources reaching Snowflake via Snowflake → Snowflake replication: tables and columns available, granularity, volumes/cadence, current ETL state (today flagged as "Develop ETL"), and downstream consumers. On top of the handover, assess the gap to a Snowflake-native gold layer aligned with the Dynamics layer (WP-88).
**Completion criteria:** Discovery doc versioned in `docs/lanes/sales/architecture/` covering raw-layer inventory, current consumers, and gap analysis to a Snowflake-native gold layer.
**Owner:** DE + DM
**Size:** M (1–2 days)

---

**WP-96 — MS Dynamics iFrames Qlik App handover and discovery**
**Description:** Knowledge transfer of the MS Dynamics iFrames Qlik App (today in active development under the current source owner per `scope_matrix.md` Reports table) ahead of the Edvantis offboarding. Covers current state of development, app architecture, integration with MS Dynamics, deployment process, Section Access, and pending scope. On top of the handover, inventory remaining work to scope BIX continuation. Output feeds subsequent active-development WPs sized only after discovery closes.
**Completion criteria:** Discovery doc versioned in `docs/lanes/sales/architecture/`, covering current state, architecture, and inventory of pending scope. Operational ownership accepted by BIX; subsequent active-development WPs scoped from this discovery.
**Owner:** BI
**Size:** M (1–2 days)

### P&L

**WP-90 — P&L discovery (AS-IS map + target requirements)**
**Description:** Single discovery WP for the P&L domain. Covers both how the P&L is built today (data sources, manual steps, ownership) and what the target state must deliver (KPIs, views, consumption format). Overlap with Internal Sales (D3) and with adjacent JBS work on cost benchmarking is mapped here to avoid duplicating scope.

**Completion criteria:**
- **AS-IS map** versioned in `docs/lanes/sales/architecture/` (same shape as WP-01): per source — name, type (Snowflake table / offline Excel / spreadsheet), location, refresh cadence, owner, current downstream consumers, and where transformation happens today (dbt / Qlik / Excel / none). The map also captures the manual assembly process end-to-end.
- **Target requirements doc** in the same folder: KPIs, views, drill granularity, consumption format expectations; references to the previous un-launched P&L app.
- Cross-references to D3 (SAP) and to the cost-benchmarking workstream flagged for overlap resolution.

Subsequent ETL/modeling WPs scoped from this output, not pre-listed.

**Owner:** BI + DM (business sessions); DE (source inventory).
**Size:** M (2–3 days BIX effort; total elapsed time stakeholder-bound).

### Master Data

**WP-93 — Master Data framework handover**
**Description:** Knowledge transfer of the existing Master Data framework from the previous source owners (per `scope_matrix.md`): single Qlik Sense application with writeback tables connected directly to Snowflake, ~6 mapping tables + 17 configuration tables backing it, dbt models, current backlog (e.g., small column additions), and known limitations. Reference doc: `docs/lanes/sales/knowledge_transfer/master_data.md`. Output is the documentation a BIX maintainer can use to operate and evolve the framework without re-onboarding.
**Completion criteria:** Handover doc versioned in `docs/lanes/sales/architecture/`, covering architecture, runbook, and known backlog. Operational ownership formally accepted by BIX.
**Owner:** DE + BI
**Size:** S (4–8h)

---

**WP-95 — Master Data Qlik App handover**
**Description:** Operational ownership transition of the Master Data Qlik App from the current source owner (per `scope_matrix.md` Reports table) to BIX ahead of the Edvantis offboarding. Covers app deployment process, Section Access, change-control flow, and operational runbook. Pairs with WP-93 (framework-side handover).
**Completion criteria:** Handover doc versioned in `docs/lanes/sales/architecture/`, covering deployment process, Section Access, change-control flow, and operational runbook. Operational ownership formally accepted by BIX.
**Owner:** BI
**Size:** S (4–8h)

---

**WP-94 — Customer Hierarchy Operator Integration handover and discovery**
**Description:** Knowledge transfer of the in-flight Customer Hierarchy Operator Integration work (today owned by another team per `scope_matrix.md`), followed by gap analysis to define the BIX scope to take it to completion.
**Completion criteria:** Discovery doc versioned in `docs/lanes/sales/architecture/`, covering current state of the integration + scoped plan for BIX completion.
**Owner:** DE + DM
**Size:** S (4–8h)

### Technical foundation and governance

**WP-73 — Cross-source consolidated gold layer**
**Description:** Unified gold layer in dbt joining the source-specific gold layers (Store Level Data from D1, US Market from D2, Historical Sales from D3, Sales Pipeline from D4, P&L from D5, Master Data from D6) into cross-source facts and dimensions reusable by any downstream consumer (Qlik validation apps, Claude apps, Cortex Analyst, future consumers). Defines conformed dimensions (`dim_product`/UPC, `dim_store`, `dim_time`, `dim_customer` aligned with Master Data hierarchies) and join keys across sources.

Pending decision: how to conform `dim_product`/UPC given that Circana only partially shares UPCs at UPC level (reference: handling of non-visible SKUs within WP-58).

**Completion criteria:** Consolidated gold/mart layer published in dbt; diagram versioned in `docs/lanes/sales/architecture/`; models comply with JBS dbt standards; reviewed by DE + BI. `schema.yml` populated for the consolidated model's tables and columns, with metric columns referencing the KPI Dictionary (WP-05) per the semantic-layer ADR.
**Breakdown plan:** [WP-73.1] inventory granularities and keys of the source gold layers in the closed state post WP-69 and WP-58; [WP-73.2] propose conformed `dim_product`/UPC (with handling of SKUs not visible to Circana); [WP-73.3] propose other shared dimensions (store, time, customer aligned with Master Data hierarchies); [WP-73.4] propose consolidated facts at the common granularity; [WP-73.5] dbt implementation + `schema.yml`; [WP-73.6] DE + BI review.
**Depends on:** WP-58, WP-69, source gold/mart layers from D1-D6.
**Owner:** DE + BI
**Size:** L (more than 2 days)

---

**WP-80 — Bot monitoring proposal**
**Description:** Address the observability gap for Automation Anywhere bots (see "Identified Challenges" in the briefing). Technical proposal to be built jointly with the RPA Team.
**Completion criteria:** Proposal documented + aligned with the RPA Team.
**Owner:** DE + DM
**Size:** M (1–2 days)

---

**WP-81 — Bot monitoring pilot (Kroger)**
**Description:** Implement the WP-80 proposal on a pilot bot (Kroger is the first candidate).
**Completion criteria:** Monitoring active on the pilot bot + alerts validated.
**Owner:** DE
**Size:** M (1–2 days)

---

**WP-82 — Accounts and credentials inventory (single source)**
**Description:** Single document listing every account and credential under BIX responsibility: bots (ABSCO, Kroger, Costco; later Sam's, Walmart) + the WP-09 generic account + any portal/recovery email migrated to it per the unification effort (WP-16, WP-22, WP-29). For each entry: owner, credential location, recovery path, 2FA configuration. Plus rotation process and incident runbook (trigger: Costco incident May 17).
**Completion criteria:** Document versioned in `docs/`; inventory current; rotation process and incident runbook agreed internally.
**Owner:** DM
**Size:** M (1–2 days)

---

**WP-83 — As-built architecture documentation**
**Description:** Consolidated project closing documentation — unified data map (started by DE on May 8) + per-retailer Qlik layer (started by BI in Excalidraw). Reflects the **as-built** state of the architecture actually delivered, distinct from WP-01 (current AS-IS) and WP-02 (planned TO-BE).
**Completion criteria:** Consolidated documentation versioned in `docs/lanes/sales/architecture/`, covering all retailers in the delivered state.
**Owner:** DE + BI
**Size:** M (1–2 days)

---

**WP-101 — Target architecture blueprint**
**Description:** End-to-end target architecture for the Sales lane consumption layer, designed as a **reference architecture extensible to other JBS business units**. Must align with the Corporate IT platform direction documented in `docs/lanes/corp_it/lane_briefing.md` (Hub-and-Spoke operating model, semantic-layer governance, deployment standards). Sales operates as the first POC of this reference; subsequent BUs plug in without re-architecting.

Scope:
- **Semantic layer** — where it lives (Cortex Analyst YAML, dbt model descriptions, dedicated layer) and how it integrates with Snowflake.
- **Consumption patterns** — dashboards, chatbots, custom front-ends; fit-for-purpose by user profile.
- **Hosting** — where the visualization sits (Qlik, custom site like Dustin's control-tower POC, Streamlit in Snowflake); trade-offs on security, refresh, governance.
- **Security model** — Section Access (Qlik) vs row-level security in Snowflake/Cortex; how it translates as Qlik fades from the consumption layer.
- **Scalability** — how additional BUs plug into the same reference without re-architecting.
- **Governance** — publish workflow, approval flow, surface ownership.

**Completion criteria:** Blueprint versioned in `docs/lanes/sales/architecture/target-architecture.md`; supporting diagrams in `docs/lanes/sales/architecture/`; one ADR per major decision in `docs/lanes/sales/adr/` (hosting, semantic layer, security model). Each major decision explicitly traces alignment with Corp IT direction.
**Owner:** DA (lead) + DM; DE consulted for Snowflake/dbt specifics; aligned with Corp IT lane.
**Size:** L (more than 2 days).
