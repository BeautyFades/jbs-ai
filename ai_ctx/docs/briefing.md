# Briefing — JBS USA (BIX Account, Org-Wide)

This briefing is a living document covering org-wide engagement context between BIX and JBS USA — everything that applies across all lanes (client, contract, BIX team, partner consultancies, corporate stack, security, etc.). Lane-specific content (scenario, stakeholders, challenges, opportunities, lane-tooling) lives in `docs/lanes/<lane>/lane_briefing.md`. See *Lane Directory* at the bottom.

## Useful Links

- **Company:** *[JBS Website](https://jbsfoodsgroup.com/)*
- **Drive:** *[Google Drive](https://drive.google.com/drive/folders/1eKapAPHt1Ui4v0WHoeJn8bVPxhAJ7lhB)*

## Introduction

Founded in **1953** in Anápolis, Brazil, as a small beef slaughterhouse. Grew aggressively through acquisitions over the following decades and became the **world's largest animal protein processor**.

Today JBS operates **250+ production facilities across 17 countries**, selling to more than **320,000 retail and foodservice customers across 180+ countries**. In 2025, JBS reported record global net revenue of **$86.2 billion**, a 15% increase year-over-year, with the USA accounting for 52% of revenue by origin.

The global expansion accelerated in the 2000s:
- **2007** — Acquired **Swift & Company** (3rd largest U.S. beef and pork processor), entering the U.S. market and creating JBS USA
- **2008** — Acquired the beef operations of **Smithfield Foods** for $565M
- **2009** — Acquired a 63% stake in poultry producer **Pilgrim's Pride**
- **2015** — Acquired **Cargill's U.S. pork processing business** for $1.45B

JBS USA is a wholly owned subsidiary of JBS S.A., headquartered in **Greeley, Colorado** (Mountain Time — 3 hours behind Brazil). It is organized into three main business units:

| Unit | Protein | Key Brands |
|---|---|---|
| **JBS USA Beef** | Beef | Swift, Cedar River Farms |
| **JBS USA Pork** | Pork | Swift Premium |
| **Pilgrim's Pride** | Chicken | Pilgrim's, Gold'n Plump |

JBS USA sells to **retail chains, foodservice operators, and export markets** globally.

## Industry and Tech

Animal protein / industrial agribusiness. The value chain spans **slaughter, processing, packaging, and distribution** at massive scale. Competitors include Tyson Foods, Cargill, Smithfield Foods, Hormel Foods, and National Beef.

JBS USA created the **Center of Innovation & Technology for Excellence (CITE)**, focused on AI, IoT, Robotic Process Automation, Business Intelligence, and Blockchain — with the goal of embedding data-driven capabilities across all business units. Qlik is the corporate-wide BI tool used across the group.

## Contract Duration

- **Start:** 27/04/2026
- **End:** 27/04/2027
- **Format:** open scope
- **MSA + SOW status:** signed on 09/06/2026.

## BIX Account Team

BIX consultants allocated to the JBS account. Each name tagged with the SOW that governs the allocation. Lane briefings reference these people by role; they are not duplicated there.

| Name | Role | Contract |
|---|---|---|
| Leonardo Contezini ([@leocontezini](https://github.com/leocontezini)) | Delivery Manager | SOW 01 (Sales) |
| Rodrigo Imamura ([@rodrigoimamura01](https://github.com/rodrigoimamura01)) | Data Engineer | SOW 01 (Sales) |
| Vitor Costa ([@vitorhcosta93](https://github.com/vitorhcosta93)) | BI Developer | SOW 01 (Sales) |
| Fellipe Fernandes ([@BeautyFades](https://github.com/BeautyFades)) | Data Architect | SOW 01 amendment |

## Account Partners

Other consultancies serving the JBS account across lanes. Each entity has its allocated consultants tagged by lane, same pattern as the BIX team.

### Edvantis (offboarding by Oct/2026)

Consultancy that has been embedded at JBS. Whole team being offboarded by October 2026 at the latest. Allocated to the Sales lane today.

| Name | Role | Lane |
|---|---|---|
| Khrystyna Zhyrovetska | PM/PO. Ukraine (EEST, UTC+3). | Sales |
| Jacob | PO. Attends Khrystyna's team dailies alongside Lili. | Sales |
| Nataliia "Nata" | BI/Qlik developer | Sales |

> Offboarding plan, per-person scope, current handoff status, and the BA-retention discussion for Khrystyna live in `docs/lanes/sales/lane_briefing.md`.

### 42 Data Labs (consulting partner since 2021)

Embedded at JBS since 2021. Built the current Data Warehouse architecture and led the Dataiku migration. Current focus: Pilgrim's live operations (slaughter, processing, costs) and corporate-level analytics. Capacity-constrained per Dustin (260602) — cannot expand much further.

- **Hian Batista** — lead point of contact (useful reference for internal access paths and historical context)
- **Paula Querzia** — Data Architect
- **Fabio Barros** — Data Engineer

### Other firm (Argentina-based consultancy)

| Name | Role | Lane |
|---|---|---|
| Fellipe Tafner | Data Engineer | Sales |

> Current scope of work (NPD pipeline, market data, CRM transition) is detailed in `docs/lanes/sales/lane_briefing.md`.

## Client Leadership (Cross-lane)

JBS leaders whose scope spans the engagement and is not bound to a single lane. Operational lane-specific stakeholders live in each lane briefing.

- **Márcio Lavrador Cardoso — IT Director (JBS):** Brazilian. Senior leader in JBS's data/CITE organization (~4 levels below the global president per Leonardo). Already engaged with the BIX team — liberated dbt documentation access for Rodrigo via Teams.
- **Dustin Dickson — Head of Digital Transformation (JBS):** Lili's manager. Very hard to get on his calendar. Located in Mountain Time (UTC-5 — Leo's time + 2h = BRT).
- **Lili Yu — Director of Data Science (JBS):** Technically deep leader with a strong background in data science, machine learning, and AI. Previously AI Solutions Architect at JBS USA and Data Scientist at OtterBox. Located in **Denver, CO (Mountain Time — 3 hours behind Brazil)**. Has a clear long-term vision for data capabilities at JBS — building a team, not just solving a one-off problem. Values: **assertiveness**, **clear and direct communication**, **initiative**, and people who **say no when needed**.
- **Capparelli Rangel — Head of Category Development and Revenue Management (JBS):** Manager of all Category Development and Revenue Management stakeholders. Owns all projects across both teams.

## Communication & Working Hours

- **Communication channel:** Microsoft Teams
- **Project management (client side):** Jira (the client uses Jira internally, but there are impediments preventing the BIX team from using it directly — reason TBD; the BIX team maintains its own board in the meantime)
- **Working hours:** Lili requested maximum overlap with her schedule (Mountain Time). Minimum expectation: BIX team available until **18h BRT / 15h MT**. Shifting the workday later (starting later and working into the evening) is viewed positively. Coordinate with the Delivery Manager.
- **Synchronous meetings:** lane-specific. See each `lane_briefing.md` for cadence.

## Deploy & Corporate Infrastructure

- **Deploy process:** A JBS engineer named **Hari** is responsible for merging all team branches into dev and promoting to production across the organization. No ticket is needed — just submit the code via Azure DevOps. Deploys are planned every Thursday.
- The deploy process applies across all lanes that ship to JBS Azure DevOps.

## Org-Wide Challenges

- **Strict data security requirements:** JBS has a highly rigorous security posture (300-question internal assessment completed). Client data must never leave their environment — no local downloads, no copies in BIX infrastructure. Any exception must be escalated to the Delivery Manager before action.
- **LGPD/security policy documentation:** The internal policy document produced during the security assessment exists but is disorganized, with potential redundancies. It needs to be reviewed, consolidated, and signed off by all team members before or shortly after project start.

## Account-Level Opportunities

- **Team expansion:** Lili has already signaled demand for additional BI Developers, Data Engineers, and Data Architects. New resource requests are expected from June/July onward.
- **Multi-lane expansion:** Current engagement covers only the Sales lane. Multiple other internal business units at JBS USA also have data demands — representing significant account growth potential as trust is established. Dustin specifically flagged the **plant side (production)** as the next growth area on 260602 — 42 Data Labs is capacity-constrained and cannot expand into plant. Marketing and customer service are also untouched today (tracking in issue #117).

## Tech Stack (Corporate / Org-Level)

| Layer | Tool | Notes |
|---|---|---|
| Repository | Azure DevOps | Corporate DevOps platform |
| Collaboration | Microsoft Teams, SharePoint | Corporate Microsoft stack |
| Data Warehouse | Snowflake (bronze/staging → silver/intermediate → gold/mart) | Corporate DW. Layer names used interchangeably: medallion (bronze/silver/gold) ↔ dbt-native (staging/intermediate/mart, with `dim_` and `fct_` prefixes in mart). |
| Transformation | dbt (on dbt Cloud) | Corporate transformation layer. Production runs orchestrated by dbt Cloud's native scheduler. |
| Reporting / BI | Qlik Sense (Enterprise, On-Premises) | Corporate BI tool. Reported to be very slow — treat as design constraint. Long-term consumption layer for the GTM/Total Sales solution is open (see Sales lane briefing). |

> Lane-specific tooling (RPA framework, bot scripts, ingestion patterns specific to a lane's data sources) lives in each `lane_briefing.md`.

## Project Management

- **GitHub org:** [@bixtecnologia](https://github.com/bixtecnologia)
- **Issue priority convention:** P0 (critical) → P1 (high) → P2 (medium) → P3 (low)
- **1 lane = 1 WBS = 1 GitHub Project.** Each lane lists its Project ID in its own briefing (today: Sales → #90).

## Lane Directory

| Lane | Status | Lane Briefing | GitHub Project |
|---|---|---|---|
| **Sales** | Active | [`docs/lanes/sales/lane_briefing.md`](lanes/sales/lane_briefing.md) | [#90](https://github.com/orgs/bixtecnologia/projects/90) |
| **Corporate IT** | Proposal | [`docs/lanes/corp_it/lane_briefing.md`](lanes/corp_it/lane_briefing.md) | — |
| Plant | TBD (next growth area per Dustin, 260602) | — | — |
| Marketing | TBD | — | — |
| Customer Service | TBD | — | — |
