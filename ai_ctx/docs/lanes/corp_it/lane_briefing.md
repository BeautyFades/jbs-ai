# Lane Briefing — Corporate IT

Lane-specific context for **Corporate IT**, the JBS USA central-platform organization owned by Márcio Cardoso. Complements `docs/briefing.md` (org-wide). Lane is currently in **proposal / discovery phase** — engagement not yet under contract.

> **Principle:** if the information applies to all lanes (client, contract, security, corporate stack), it belongs in the org-wide briefing. If it is specific to Corporate IT, it lives here.

---

## Purpose & Scope

The Corporate IT lane covers the **data platform foundation** that every business-unit data initiative sits on top of: ingestion stack, transformation framework, orchestration, infrastructure-as-code, deployment automation, governance, and the semantic / quality layers. Where the Sales lane builds BU-level pipelines and deliverables (Pilgrim's domain), this lane builds the platform those pipelines run on.

Márcio's operating-model target is **Hub-and-Spoke**: a central platform team that sets standards and governance, with business units building on top with autonomy. The lane is the BIX engagement that supports the central platform side.

Candidate engagement scope (proposal in preparation): allocate a **DataOps/DevOps** profile to help with orchestration, IaC, and deployment automation on the new platform.

Out of scope today: per-BU dashboards or solution delivery — handled by BU-side teams or other partners.

---

## Allocated Team

- **BIX consultants:** TBD — proposal in preparation. Initial direction: one DataOps/DevOps profile for orchestration and IaC.
- **Partner consultancies:** Márcio operates with a small group of trusted boutique vendors. BIX is being onboarded into this group.

---

## Client Stakeholders

- **Márcio Cardoso** — IT Director, Corporate IT. Lane sponsor and sole decision-maker today. See `docs/briefing.md` for cross-lane role.
- **BU-side peer group** — Márcio has nine BU-side peers across BU-equivalent organizations (Dustin Dickson / Pilgrim's plus eight others), covering all proteins (beef, pork, chicken) and geographies (US, Australia, Europe). Márcio's predecessor in Corporate IT now holds the equivalent role on the newly consolidated Beef BU. The Hub-and-Spoke vision requires their alignment; Márcio uses biweekly CIO-level showcases of transformative business cases to build it.

### Internal IT teams under Márcio
- **SAP BW team** — ~20 people across Mexico, US, and Brazil. ~10 work full-time on SAP maintenance and incremental evolution. Long tenure on the legacy stack (~15 years).
- **Qlik administration team** — 5 people, focused on housekeeping, environment hygiene, job monitoring, and user enablement.
- **Snowflake team** — small today (2 people pre-Márcio), growing as the platform investment scales.
- **Business-side Qlik builders** — ~120 people distributed across BUs (not direct reports). Build and maintain the 700+ Qlik dashboards on top of QVDs (3,000 monthly active users, 600+ QVD generators, 700+ NPrinting jobs).

---

## Current Scenario

Márcio assumed Corporate IT roughly one year ago. He inherited an environment where Snowflake existed but was used passively — effectively as an expensive cross-region data share for global consolidations, with Dataiku and Qlik Replicate handling ingestion and no orchestration, IaC, or deployment discipline. The platform direction is currently in active reshaping.

### Recent platform moves (already executed)
- **Ingestion stack swapped:** Qlik Replicate + Dataiku replaced by **Fivetran + dbt** (late 2025).
- **Legacy code migration with AI assistance:** 32 legacy projects (Dataiku flows, Python scripts, and other legacy code) converted to dbt using Claude Code. Cited internally as a strong success in both speed and quality.
- **CI/CD baseline in place:** automated build and deployment pipeline implemented as a non-negotiable prerequisite for the new platform.
- **Claude Code pilot live:** internal pilot of VS Code + Claude Code + Snowflake MCP. Originally scoped at 25 users; currently 60 power users. Biweekly CIO showcase running with six business demos per session.

### Where Márcio is explicitly asking for support
- **Orchestration** — Airflow is the chosen direction. Astronomer evaluated but unlikely to be picked; internal preference is a lightweight in-house front-end with Airflow as the backend. Implementation expertise needed.
- **Infrastructure as Code** — Terraform or Snowflake's IaC tooling under evaluation. No internal experience.
- **Deployment automation** — provisioning a new Snowflake database + dbt project + role set today requires cross-team manual coordination (infrastructure, security, BI, enablement). Does not scale to the 120+ business builders Márcio expects to enable.
- **Architecture and modeling discipline** — Kimball-style modeling and semantic-layer guardrails. Current anti-patterns reflect the legacy SAP BW team's reflexes; Márcio wants quality gates during the 18-month transition.

### Mandatory deadline
- **SAP cloud migration (target: 2027):** JBS migrates to SAP's private cloud during 2027. The current legacy on-premises SAP BW cannot run on the target. All non-SAP warehouse content (7 systems) must be migrated to Snowflake by **31/12/2027**.

### Pending strategic decisions
- **Qlik renewal** — under negotiation; decision due end of June 2026. Long-term posture: Márcio expects Qlik usage to decline. Dustin's Claude Code-built dashboard is the leading internal signal toward custom alternatives. Márcio supports piloting but is not ready to commit strategically.
- **MCP Hub** — Márcio considers a centralized MCP Hub mandatory at JBS's scale (multiple MCP-capable platforms in play: Claude, Copilot Studio, Copilot Pro) but is not yet committed to a vendor. Treats the agentic-tools landscape as highly volatile and favors flexibility.
- **dbt placement** — currently dbt Cloud; expected to move to dbt-inside-Snowflake post-merger / license consolidation.

---

## Challenges & Risks

- **On-prem cultural posture:** JBS is essentially an on-prem company; cloud and SaaS adoption have stakeholder resistance even inside the IT organization. Generic SaaS network egress is blocked by default.
- **Legacy team learning curve:** 15-year SAP BW veterans and 10-year Qlik specialists need substantial reskilling to operate on Snowflake, dbt, Airflow, and IaC. This is the practical bottleneck on transition speed.
- **Nine-peer alignment risk:** Márcio cannot drive the Hub-and-Spoke model unilaterally — each BU-equivalent has its own IT lead with their own opinion (some skeptical of AI-assisted development). The biweekly CIO showcase is the chosen lever, but alignment is not yet locked in.
- **Deployment bottleneck:** every new BU asset (database / dbt project / roles) still requires manual cross-team coordination. Will not survive the planned scale of decentralized building.
- **Vendor expectation alignment:** Márcio values transparency about consultant quality very explicitly — sending an average profile when a senior is expected breaks the relationship faster than admitting the gap.
- **Quality / modeling discipline gap:** without guardrails at the semantic layer, decentralization amplifies bad models. Direct ask for BIX to help govern this during the transition.
- **Commercial pressure from Qlik:** Qlik is pushing a consumption-based renewal model that would penalize JBS for moving QVD layers around. Tension between renewal terms and the long-term Snowflake-direct posture.

---

## Tech Stack — Lane-specific

| Layer | Tool / Status | Notes |
|---|---|---|
| Ingestion | Fivetran | Replaced Qlik Replicate + Dataiku in late 2025. |
| Transformation | dbt on dbt Cloud | Likely to move to dbt-inside-Snowflake post-merger / license consolidation. |
| Orchestration | Airflow (planned) | Active decision. Astronomer evaluated but unlikely. Internal direction: lightweight in-house front-end + Airflow backend. |
| Infrastructure as Code | Terraform or Snowflake IaC tooling (under evaluation) | Capability gap on the internal team. |
| AI-assisted development | Claude Code + VS Code + MCP → Snowflake | 60 power users in pilot. Used internally for code migration and dashboard prototyping. |
| Data Warehouse legacy | SAP BW (on-premises) | In transition. Sunsets by 31/12/2027 with the SAP cloud migration. |

> Corporate stack (Snowflake, Qlik Sense, Azure DevOps, Microsoft env) lives in `docs/briefing.md`.

---

## Opportunities

- **SAP BW legacy migration to Snowflake** — 7 non-SAP warehouse systems must move by 31/12/2027. Large body of work with a mandatory deadline. AI-assisted migration via Claude Code already proven internally on 32 smaller projects — natural extension. Source: meeting 260609.
- **IaC / Terraform implementation** — explicitly flagged capability gap. Source: meeting 260609.
- **Airflow / orchestration implementation** — explicit ask, on the active roadmap. Source: meeting 260609.
- **Long-term Qlik replacement** — Márcio expects Qlik to decline; Dustin's Claude Code dashboard is the leading internal signal. BIX has internal cases of custom front-end + Snowflake. Source: meeting 260609 (cross-reference with Sales lane briefing).
- **Semantic-layer governance / quality guardrails** — explicit ask for architecture and modeling oversight during the 18-month transition. Source: meeting 260609.
- **MCP Hub strategy** — Márcio considers a centralized MCP Hub mandatory but undecided. Opportunity to bring benchmarks and a recommendation. Source: meeting 260609.

---

## Architecture Overview

```
[Source systems (SAP, SaaS, files)]
       ↓
[Fivetran]    ← ingestion
       ↓
[Snowflake (bronze/staging → silver/intermediate → gold/mart) — dbt on dbt Cloud]   ← corporate (see briefing.md)
       ↓
[Qlik Sense  /  Claude Code-built apps]   ← consumption (open evolution)
```

Notes:
- The platform is the lane's concern. What runs on it (BU dashboards, AI tools, BU-specific apps) belongs to other lanes or other vendors.
- Orchestration, IaC, deployment automation, and quality / semantic-layer governance are the immature layers — primary focus of the proposed engagement.

---

## Project Management

- **GitHub Project:** TBD — to be created once engagement is formalized.
- **Priority convention:** see `docs/briefing.md` (P0 → P3).
