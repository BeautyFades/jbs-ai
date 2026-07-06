# Lane Briefing — Sales

Lane-specific context for **Sales**. Complements `docs/briefing.md` (org-wide) — everything particular to the lane lives here: scope, lane-specific client stakeholders, allocated team, current scenario, challenges, and opportunities.

> **Principle:** if the information applies to all lanes (client, contract, security, corporate stack), it belongs in the org-wide briefing. If it is specific to Sales, it lives here.

---

## Purpose & Scope

The Sales lane builds the data foundation — ingestion → Snowflake (bronze/staging → silver/intermediate → gold/mart) on dbt — for the JBS USA commercial domain, covering six data fronts aligned with the WBS deliverables:

1. **Customer Sales / SMD (Store Market Data)** — sell-out from retail partners: ABSCO, Costco, Kroger, Walmart, Sam's, Publix (D1)
2. **US Market Sales** — Circana + NPD (D2)
3. **Historical Sales** — SAP Internal Sales + Redistributor Report + Operator Purchasing File + Blacksmith Agreements (D3)
4. **Sales Pipeline (CRM)** — MS Dynamics + Axcion (D4)
5. **P&L Prepared Foods** — Budget + Costs (D5)
6. **Master Data** — inherited framework + Customer Hierarchy Operator Integration (D6)

The **gold/mart layer is the lane deliverable**, designed tool-agnostic so any consumer can sit on top: Qlik Sense (incumbent), Claude / Cortex Analyst (Dustin's "Total Sales Analytics" direction), or a future custom front-end. Consumer-facing apps are out of WBS scope, with the exception of dedicated **per-retailer validation Qlik Apps** used as intermediate acceptance checkpoints.

Per-source detail (Categories × Sources × Owners): see `scope_matrix.md`.

---

## Allocated Team

- **BIX consultants:** see *BIX Account Team* in `docs/briefing.md` (Leonardo, Rodrigo, Vitor — all on SOW 01 / Sales today).
- **Partner consultancies:** see *Account Partners* in `docs/briefing.md` (Edvantis: Khrystyna, Jacob, Nata; 42 Data Labs: Hian, Paula, Fabio; Argentina firm: Fellipe Tafner).
- **To hire:** **AI engineer** with strong Claude / AI expertise to work alongside Dustin on Total Sales Analytics (tracking in issue #111). Decision: Vitor stays in Qlik (Master Data + Dynamics iframes); new hire covers AI.
- **Backend Python engineer** needed to take over Eugen's CRM ↔ Qlik iframe authorization app (~10h/month). Stack details pending from Khrystyna; Leo checking with BIX software team.

---

## Client Stakeholders

Operational JBS stakeholders relevant to the Sales lane. Cross-lane leadership (Dustin, Lili, Márcio, Capparelli) lives in `docs/briefing.md`.

### Category Development & Revenue Management (under Capparelli Rangel)
- **Briton Kreutzer** — Director of Category Development. Main stakeholder on the **Retail** side, primarily Chicken. Involved in Circana and Store Market Data. Owns the manual MAPPED/UNMAPPED product mapping for Chicken (~3-month manual cycle today).
- **Lexi Mayo** — Category Development. Stakeholder for Circana. Responsible for Pork (and potentially Beef after Suzanne left).
- **Phillip Kary** — Category Development. Stakeholder for Circana. Responsible for Prepared Foods.
- **Katherine Davis** — Category Development. Main stakeholder on the **Foodservice** side. Involved in NPD, mostly Chicken.
- **Nutting Taylor** — Category Development. Supports Katherine in preparing Foodservice reports. Involved in NPD.
- **Seth Timpe** — Revenue Management. Main stakeholder for Revenue Management. Involved in Circana and NPD, mainly Chicken.

### P&L Prepared Foods project (Source: weekly 260601)
- **Bryon Trauscht** — Category Director (Pilgrim's). **Leadership sponsor** — pushing to move out of spreadsheets.
- **Xiaohan Cui** — Division Controller (JBS). ADM Prepared Sales & Marketing Accounting.
- **Jacob Weatherly** (JBS, Dustin's team) — future technical owner on the JBS side. Focused on CRM today; Dustin wants him closer to BIX to reduce the "everything goes through Dustin" bottleneck. Already in contact with BIX about credential cost.
- **Jacob Marso** (Pilgrim's) — stakeholder.
- **Luiz Leite Da Silva** (JBS) — stakeholder.
- **Tonia Elvirnazar** (Pilgrim's) — stakeholder.

### Operational support
- **Tiffany Myrick** — Category Director (Pilgrim's). Main reference for Sam's Club and Walmart data. One of the primary QlikSense dashboard users (along with Zach and Marcia).
- **Paco (Francisco Fernandes)** — Data Engineer (JBS). Responsible for the Kroger and ABSCO bots (Automation Anywhere). Reference for technical context on bot implementation and retailer specifics.

---

## Synchronous Meetings

- **Weekly status with Dustin:** Mondays **12h30 BRT / 10h30 Dustin's time (UTC-5)**, starting 01/06/2026 (changed from Fridays 15h BRT — Dustin found Fridays poor).
- Big Picture / KT sessions with Khrystyna scheduled as needed (notably the 02/06 big picture call covered the Edvantis transition plan end-to-end).

---

## Current Scenario

The engagement is led by **Lili Yu (Director of Data Science)** — see `docs/briefing.md` for her cross-lane role and current status. Her team operates as an internal data service provider, attending to multiple business areas within JBS USA. Initial scope covered the **Commercial area** and the **SMD (Store Market Data)** project; scope has since expanded to include US Market (Circana, NPD), Internal Sales (SAP), CRM (MS Dynamics) and Blacksmith.

### Current references and access
- **Nata** — BI/QlikSense reference (until ~03/07/2026 per offboarding plan below).
- **Khrystyna** — primary operational contact and source of truth on data sources, pipelines, and priorities until offboarding completes.
- **Accesses provisioned (BIX side):** Qlik Sense, Snowflake (Rodrigo and Vitor), dbt and Azure DevOps (Rodrigo).

### Long-term posture
The client seeks a **long-term strategic talent partner**, not a short-term delivery engagement. The BIX team is expected to operate as a true extension of their internal team — deeply embedded in their processes, data, and business context over time. There is no fixed task backlog: work is prioritized dynamically across improvements, bug fixes, and new feature delivery. The client strongly values **communication, ownership, and assertiveness** — ask questions, say no when needed, proactively propose better approaches.

### Direcional updates (recent)
- **260526 weekly:** Pipeline (ingestion → Snowflake → gold) firm across the three fronts. Consumption layer of the GTM no longer locked to Qlik — Dustin asked to design it *"potentially not using Qlik"* (working name: **"Total Sales Analytics"**). Márcio (IT) reinforced that **Qlik will not be turned off easily** — both tracks coexist.
- **260601 weekly:** Dustin asked for a single view of **inputs vs outputs** to review every week. Confirmed **MS Dynamics CRM** and **Blacksmith** as new BIX data sources (still conducted by Edvantis today); full transition to BIX is a priority for him. Consolidated map target: weekly 08/06.
- **260602 big picture call:** Full alignment on Edvantis offboarding plan, team structure for the Sales lane, BIX strategy around Claude / Total Sales Analytics. Big picture documentation tracking in issue #118.
- **260619 KT Master Data pt2:** Dustin explicitou direção — writeback tables no Qlik não são mais a abordagem desejada (cumbersome em volume; "fade" do Qlik no consumption layer torna o acoplamento problemático). Direção de master data: consolidar em entidades únicas (um master product mapping com coluna por cliente, um master customer, um master sales hierarchy); Jacob's team owns; sem acesso end-user. Estratégia geral retorna para discussão em WP-06.

### Edvantis offboarding (Sales scope)
- **Nata** — Sales side (Master Data app, MS Dynamics CRM iframes, agreements report). Offboarding planned for ~03/07/2026 (decision in progress, see issue #116).
- **Khrystyna** — PM/PO. Dustin proposed retaining her as a Business Analyst post-offboarding; decision pending with Lili. Access (IP/network) is the blocker.
- **Vitor (BIX)** — covers Nata's scope (Master Data + Dynamics iframes) starting 08/06 (issue #116).
- **Fellipe Tafner** (Argentina firm, listed under *Account Partners* in `briefing.md`) — stays focused on market data (Circana brand level) + CRM (sales pipeline, historical sales).

---

## Challenges & Risks

- **2FA authentication for Walmart and Sam's:** Both retailers use US Cell Number-based 2FA, which blocks bot automation. Two bypass options have been identified but require approval from the JBS Security team. The chosen solution affects the project scope. Reference: `2FA bypass solution.docx`.
- **Publix access blocked:** The team has no access to Publix's "Item Sales Reports," which blocks any DW or BI development for that retailer.
- **RPA observability gap:** There is currently zero visibility into Automation Anywhere bot failures. If a bot fails, the team has no alert or monitoring in place.
- **Dependency on the RPA team:** The BIX DE (Rodrigo) writes the Python scripts; the internal RPA team then adapts, deploys, and maintains them in Automation Anywhere. Any deployment or automation work requires coordination with the RPA team.
- **QlikSense performance:** The tool is reported to be very slow. Performance must be a first-class concern in dashboard design from day one. Known specific issue: Qlik front-end for Kroger is slow — ETL ~48 minutes, driven mainly by the Inventory table (~160M rows).
- **Section Access risk:** Qlik Sense apps use Section Access for row-level security. Any change to the app must preserve this configuration — accidentally removing or loosening Section Access would expose data to unauthorized users.
- **Circana × SAP data mismatch:** Khrystyna flagged that Circana + SAP (and NPD) data does not match user expectations. The DE-PARA between Circana and SAP via UPC/SKU shows inconsistencies that require investigation before the GTM Consolidated App can be considered complete.
- **GTM consumption layer open:** Dustin signaled that the consumption layer of the GTM may not be Qlik long-term. Any modeling in the gold layer must be **tool-agnostic** to avoid locking the future decision.
- **Semantic layer absent:** Conversational queries via Claude/Cortex today require the user to describe tables and joins manually. Dustin already experiments with this ad-hoc and wants to evolve.
- **Bot secrecy with retailers:** Never mention to any external vendor that JBS uses bots to extract data. Always state that data is extracted manually. Bots can overload vendor systems, and any disclosure could lead to access being blocked. This applies to all team members.

---

## Tech Stack — Lane-specific

| Layer | Tool / Pattern | Notes |
|---|---|---|
| Ingestion / RPA | Automation Anywhere bots + Python scripts | Bots maintained by the internal RPA team. BIX DE writes the Python; handoff to RPA team for deployment. |
| Ingestion | Fivetran | Used for SAP and MS Dynamics CRM ingestion (confirmed by Khrystyna, 05/05). |
| Legacy (being replaced) | Dataiku | Being replaced by Automation Anywhere (`SRC_EXTERNAL` schema — data overwritten every run). |

> Corporate stack (Snowflake, dbt, Qlik Sense, Azure DevOps, Microsoft env) lives in `docs/briefing.md`.

---

## Opportunities

- **QlikSense performance optimization** — The tool is significantly slow (mentioned multiple times during KT sessions). As BIX gains deep access to the environment, there may be an opportunity to propose and deliver performance improvements as an additional initiative. Source: KT sessions 260428.
- **Alternative data consumption layer** — Contrary to prior signals from Helio (client "locked into Qlik forever"), Dustin showed openness during the 08/05 weekly to other options if Qlik does not deliver. BIX has internal cases of custom front-end (Cube + React over Snowflake) and Snowflake's own AI/conversational features could be explored. Source: pós-weekly 260508.
- **Total Sales Analytics (camada de consumo alternativa ao Qlik)** — Dustin demonstrated pricing chicken analysis (Just Bear vs Pilgrim's) via Claude directly on Snowflake. Vision: site + chatbot + dashboards with semantic layer on Snowflake. Márcio confirmed feasibility of publishing a site since security stays on Snowflake/SAP. Source: weekly 260526.
- **Cortex Analyst (Snowflake native semantic layer)** — Viable technical path; YAML with table/metric context, integrates with Streamlit (security stays on Snowflake). Worth a POC. Source: daily 260526.
- **Internal BIX workshop on Claude/AI** — Schedule conversation with Pedro Vieira + Eduardo to align BIX team with Dustin's vision. Source: daily 260526.
- **Prepared Foods P&L (Phillip Kary / Bryon Trauscht)** — Users manually consolidate reports from SAP + spreadsheets to run P&L per SKU. Dustin wants to start mapping in 2-3 weeks. Possible overlap with 42 Data Labs (SAP/cost) and Ian's team (benchmarking). Source: weekly 260526. Tracking in issue #109.
- **Chatbot POC** — Dustin wants a chatbot connected to data under team control (with prompt and data-access guardrails) instead of opening the data lake to end users. Khrystyna presented a one-off POC in late-2025/early-2026 that can serve as a reference, but the opportunity is to build the chatbot, not to reuse the previous work. Source: weekly 260601.
- **Dynamic reporting platform (productize Claude-built dashboards)** — Dustin demonstrated his own VS Code + Claude dashboard (live operations control tower + sales overview) running locally on his machine. Productizing it raises hosting, row-level security, and dashboard governance questions (who can publish, approval workflow) — BIX can support these fronts once pipelines are stable. Source: weekly 260609.
- **Master Data Management platform** — Dustin declarou que writeback tables no Qlik são insuficientes (cumbersome, clunky em escala). Alternativas conversadas: Excel→SharePoint+Fivetran, app dedicado de MDM. Espaço aberto pra BIX propor solução. Source: KT Master Data pt2 260619.

---

## Architecture Overview

```
[Retailers (sell-out data)]
       ↓
[Automation Anywhere Bots / Python Scripts]   ← lane-specific tooling
       ↓
[Snowflake (bronze/staging → silver/intermediate → gold/mart) — dbt on dbt Cloud]    ← corporate (see briefing.md)
       ↓
[Qlik Sense  /  Cortex Analyst  /  Claude  /  custom front-end]    ← consumption layer (open decision)
```

Notes on key sources (full ownership table in `scope_matrix.md`):
- Retailer data is **sell-out data** — sales from JBS's retail clients to end consumers. Each retailer has its own DW with different available fields.
- Bots are developed as **Python scripts by the Data Engineer** (Rodrigo), then handed off to the internal **RPA team (Automation Anywhere)** for deployment and maintenance.
- **Dataiku** was the legacy ingestion tool (data under the `PILGRIMS` schema); being replaced by Automation Anywhere (`SRC_EXTERNAL` schema — overwritten every run, not stored historically).
- **SAP (Internal Sales):** ingested via **Fivetran**, stored as QVDs, and crossed with Circana via UPC/SKU (DE-PARA). Migration to Snowflake as a full-fledged layer is planned if it makes sense.
- **SAP S/4HANA (live since August 2024):** the JBS IT team (under Márcio) performs initial curation of SAP source tables, renames them to business-friendly names (e.g., `VBRK`/`VBRP` → `billing_documents`) and exposes them as views for the Business Units. Views shared across BUs sit under a `core common` folder; each BU may build derived views/tables on top.
- **Sales Performance app:** existing application surfaced by 42 Data Labs, covering sales by cut type down to SKU level with year-over-year comparisons. Scope appears centered on Pilgrim's. Production access not yet validated by BIX — potential overlap with the Internal Sales / cross-source gold workstream to be assessed.
- **MS Dynamics CRM:** corporate CRM system, responsible for the **sales pipeline** (opportunities not yet in SAP). JBS internal BI team is building Snowflake integration. Entered scope 260601 as a new BIX data source (transitioning from Edvantis).
- **Blacksmith:** platform where JBS manages sales programs (rebate programs etc.). Data already flows to the data lake and to Dynamics, but no analytics layer exists yet. Entered scope 260601.
- **Circana (US Market Sales):** updated **monthly** (incremental). Occasional **full historical reloads** (Circana notifies JBS in advance). Exports **8 tables**: 4 brand-level and 4 UPC-level. Brand level covers all SKUs; UPC level is limited. DE-PARA with SAP has known inconsistencies.
- **NPD (US Market Sales):** extraction via **Automation Anywhere**. **Fellipe Tafner** is finalizing the NPD pipeline. No dedicated Qlik App yet — owner TBD.
- **Mapping/de-para tables** ingested via an ETL pipeline in Dataiku — they are not dbt seeds.
- **Qlik ETL architecture:** All ETL steps for Kroger and Costco are contained in a **single Qlik app**. For ABSCO, Sam's, Walmart, and Publix, there is no standard — some transformations are in Qlik, others in Snowflake. Future consideration: moving ETL to Snowflake/dbt (EL in Snowflake, L only in Qlik).
- **Layer 1** (per-retailer validation Qlik Apps): currently exists only for Kroger and Costco.
- **Layer 2** (cross-source consolidated gold/mart): the pipeline deliverable. Sits in dbt regardless of consumer; modeling stays tool-agnostic since the consumption layer is open (Qlik, custom site + Cortex/Claude, or hybrid).

Diagrams and ADRs (lineage, KPI dictionary, validators map, etc.): see `architecture/`.

---

## Project Management

- **GitHub Project:** [#90 — BIX & JBS Project Board](https://github.com/orgs/bixtecnologia/projects/90)
- **Priority convention:** see `docs/briefing.md` (P0 → P3).
- **WBS:** `wbs.md` (lane-scoped). Conventions in `wbs_roadmap_structure.md`.
