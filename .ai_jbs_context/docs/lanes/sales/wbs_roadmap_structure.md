# Roadmap Structure — WBS → Issues → GitHub Projects

> How the WBS (`docs/lanes/sales/wbs.md`) reflects into day-to-day operation through **issues**, **milestones**, and **GitHub Project views**. Planning document — defines the conventions; the actual GitHub configuration is set per team agreement.

---

## 1. Overview

Three layers, one source of truth for each:

| Layer | Where it lives | Maintainer |
|---|---|---|
| **Planning** | `docs/lanes/sales/wbs.md` (hierarchical WBS) | Delivery Manager |
| **Execution** | Issues in the `bixtecnologia/jbssa` repo | Whole team |
| **Visualization / tracking** | [Project #90](https://github.com/orgs/bixtecnologia/projects/90) (views, fields, milestones) | Delivery Manager + team |

The WBS is the **plan**; issues are the **work**; the Project is the **dashboard**. Macro change? Update the WBS first, then propagate to issues. Micro change (a specific issue)? No need to push up to the WBS — unless it becomes a standard.

---

## 2. WBS → GitHub Mapping

```
WBS                                  GitHub
─────────────────────────────────────────────────────────────────
Level 1: Deliverables (D1–D5)   →   Repository milestones
Level 2: Sub-deliverables       →   Parent issues (umbrella)
         (1.1 Foundation,           title: [X.Y] Description
          1.2 Kroger, …)            (e.g., [1.1] SMD Foundation)
Level 3: Work Packages          →   Sub-issues of the sub-deliverable parent
         (WP-01 … WP-79)            title: [WP-XX] Short description
Level 4: Sub-tasks of an        →   Nested sub-issues
         umbrella WP                title: [WP-XX.N] Description
         (e.g., fixes under
          WP-11)
```

### Why milestones for Level 1

- Milestone is native to GitHub: appears in the issue header, generates an automatic progress bar (% closed), supports optional due date.
- Five milestones, five major delivery tracks — easy to see who is behind.
- Also works on PRs (link a PR to a milestone).

### Why a parent issue for Level 2

- Native sub-issue progress bar in the parent shows % of WPs closed per sub-deliverable.
- Parent issue is an anchor for navigation and cross-WP discussion within the sub-deliverable.
- Single source of grouping — avoids divergence between a separate custom field and the parent-child relationship.
- Closure semantics: the parent closes automatically once all sub-issues are closed.

### Why the WP lives in the issue title (and not in a separate field)

- Each WP is a unit of work — **1:1** mapping to an issue. A separate field would be redundant.
- Convention: `[WP-XX] Short imperative title` (e.g., `[WP-11] Apply Kroger prioritized fixes`).
- Search/filter: `is:issue WP-11 in:title` in the repo; alphabetical title sorting in the Project produces WBS order.
- WBS renumbering → update affected issue titles as part of "propagate to issues" (see §1).
- **Extra granularity:** when a WP is an umbrella for N individual tasks (e.g., WP-11 "Apply Kroger prioritized fixes"), use **native GitHub sub-issues** with titles in the format `[WP-XX.N] Description` (N = 1, 2, 3, …). Example: `[WP-11.1] Fix retailer filter`, `[WP-11.2] Adjust velocity chart`, etc. Each sub-issue inherits the Size estimated in the backlog WP (WP-10 for Kroger, WP-16 for Costco). **Do not merge WPs into the same issue** — if two WPs always live together, the WBS itself should merge them.
- Labels are not used for WP — the WBS currently has 79 WPs; labels would be unmanageable.

---

## 3. Repository milestones (Level 1)

Create the five milestones below in the `bixtecnologia/jbssa` repo. Due date is optional — fill it in when there is a firm commitment with the client.

| Milestone | Short description | Due date |
|---|---|---|
| **D1 — SMD / Customer Sales** | Pipelines + per-retailer Qlik Apps (technical validation) | TBD |
| **D2 — US Market Sales** | Circana (IRI) + NPD | TBD |
| **D3 — Internal Sales (SAP)** | Assessment + conditional migration | TBD |
| **D4 — GTM Consolidated App** | Unified app published to end users | TBD |
| **D5 — Technical foundation and governance** | Security, observability, docs, process | ongoing |

> Note: D5 is ongoing (governance); it has no target date, but works as a milestone for grouping and visibility.

---

## 4. Custom fields in GitHub Project #90

The fields below must exist in the Project. ✅ already exist (per memory); ⚠️ still to be created.

| Field | Type | Values | Status |
|---|---|---|---|
| **Status** | Single-select | `Backlog`, `Ready`, `In progress`, `In review`, `Done`, `Blocked` | ✅ (review values) |
| **Priority** | Single-select | `P0`, `P1`, `P2`, `P3` | ✅ |
| **Deliverable** | Single-select | `D1 — SMD`, `D2 — US Market`, `D3 — Internal Sales`, `D4 — GTM`, `D5 — Foundation` | ⚠️ |
| **Retailer** | Single-select | `Kroger`, `Costco`, `ABSCO`, `Sam's`, `Walmart`, `Publix`, `N/A` | ⚠️ |
| **Size** | Single-select | `XS` (up to 4h), `S` (4–8h), `M` (1–2 days), `L` (more than 2 days) | ✅ |
| **Sprint** | Iteration | weekly, Monday → Sunday | ⚠️ |
| **WBS** | Single-select | `Yes`, `No` | ✅ |
| **Assignee** | Native | Rodrigo / Vitor / Leonardo | ✅ |

### Notes on each field

- **Status `Blocked`** — use for issues stalled on external dependency (Security Team, RPA Team, client decision owner). Different from `In progress` in that no action is currently possible.
- **Sub-deliverable** — no custom field; lives as a **parent issue** (umbrella) per §2. The Deliverable custom field remains useful as a flat filter at deliverable level.
- **WP** — lives in the **issue title** in the format `[WP-XX] …` (see §2). No dedicated field.
- **Retailer** — use for any issue scoped to a specific retailer (SMD, but also potential Circana issues specific to Pilgrim's, for example). `N/A` for cross-cutting issues.
- **Sprint (iteration)** — start with a weekly cadence aligned to the Friday weekly with the client. Revisit if it shifts to biweekly.
- **WBS** — `Yes` for every issue tied to a WP from `docs/lanes/sales/wbs.md` (titles in the `[WP-XX] …` format or `[WP-XX.N] …` sub-issues). `No` for administrative/legacy issues outside the structured WBS plan. This is the only Project custom field that should be set on issue creation; the others (`Priority`, `Status`, etc.) follow the rules in §7.

---

## 5. Labels

Not used in this project. Filtering and categorization live in the Project custom fields (`Retailer`, `Sub-deliverable`, `Priority`, `Status`, etc.). Lean board > full board.

---

## 6. Recommended views in Project #90

Each view answers one specific question.

### 6.1 Roadmap (executive view)

- **Type:** Roadmap (native GitHub Projects)
- **Grouped by:** Milestone (`Deliverable` D1–D5)
- **Filter:** none
- **Purpose:** show the client the macro picture on a single screen

### 6.2 Current sprint (daily view)

- **Type:** Board (Kanban)
- **Grouped by:** Status
- **Filter:** `Sprint = @current`
- **Purpose:** daily standup; what each person is working on now

### 6.3 Prioritized backlog (planning view)

- **Type:** Table
- **Sorted by:** Priority asc, then Size asc
- **Filter:** `Status = Backlog` AND `Status ≠ Done`
- **Columns:** Title (`[WP-XX] …`), Sub-deliverable, Priority, Size, Retailer, Assignee
- **Purpose:** weekly planning — pick what enters the next sprint

### 6.4 Blocked (risk view)

- **Type:** Table
- **Filter:** `Status = Blocked`
- **Purpose:** track external dependencies. Source material for the Weekly Status (*Alignments* section)

### 6.5 By retailer (SMD view)

- **Type:** Board (Kanban)
- **Grouped by:** Retailer
- **Filter:** `Deliverable = D1 — SMD`
- **Purpose:** when the focus is "how is each retailer doing"

### 6.6 By deliverable (tactical view)

- **Type:** Board (Kanban)
- **Grouped by:** Milestone (Deliverable D1–D5)
- **Filter:** none
- **Purpose:** macro tracking between planning and weekly. For zoom into a specific sub-deliverable, open the corresponding parent issue (e.g., `[1.2] Kroger`) and read its sub-issue list.

---

## 7. Operational workflow

### 7.1 Open a new issue

Minimum checklist on creation:

- [ ] Title in the format `[WP-XX] Short description` (e.g., `[WP-37] Sam's SKU mapping`)
- [ ] Body: context + plan (see memory `feedback_corpo_issue` — straight to the point, no preamble)
- [ ] **Linked as sub-issue** of the corresponding sub-deliverable parent (e.g., `[1.2] Kroger`)
- [ ] **WBS** custom field set to `Yes` — mandatory for every issue tied to a WP. Set on the assistant's side at creation time; the other Project fields below stay untouched.
- [ ] **Deliverable** custom field populated
- [ ] **Priority** custom field populated (P0–P3)
- [ ] **Size** custom field populated (XS/S/M/L; initial guess, refined in planning)
- [ ] **Retailer** custom field populated if applicable
- [ ] Milestone linked
- [ ] Assignee (if already decided) or left open until planning
- [ ] Auto-add to the Project — already configured, do not use `gh project item-add` (see memory `feedback_github_project`)
- [ ] **If Size = L:** Breakdown plan filled in the WBS (see §7.5)

### 7.2 Change status

- **Backlog → Ready** — clear enough to start; fits in the next sprint
- **Ready → In progress** — someone has started working (move on pull, not on planning)
- **In progress → In review** — PR open and awaiting review
- **In review → Done** — merged + validated in dev (or stakeholder acceptance, per the WP completion criteria)
- **Any → Blocked** — real external dependency. Always add a short comment with what is blocking and who needs to unblock.

### 7.3 Comments on issues

Convention (see memories `feedback_comentarios_issues` and `feedback_formato_comentarios`):

- Only comment if there is **new info**. Do not comment just to confirm work is ongoing.
- Format: short bullets with a date prefix, not prose.
- Post via `gh api -f body=$body` on Windows (UTF-8) — `gh issue comment` via stdin corrupts accents (see memory `feedback_gh_comments_encoding`).

Good example:
```
- May 12: VSA — Zarper team already in progress, will be the benchmark
- May 12: awaiting response from the security contact on Teams
```

### 7.4 Close an issue

- Criterion: meet the **Completion criteria** defined in the WBS for that WP.
- Read carefully (memory `feedback_issue_closing` — do not close if the main recipient has not been reached).
- A PR can close the issue via `Closes #N` in the PR body.

### 7.5 Breakdown plan (mandatory for Size L)

Firm rule: **every WP with Size L (more than 2 days) must have a `Breakdown plan` defined in the WBS before entering a sprint.** A Size-L WP without a plan is too vague to be pulled — it becomes an execution black box, burns the estimate, and hides risk.

The `Breakdown plan` is a preliminary list of sub-issues `[WP-XX.N]` (see §2) that decomposes the WP into individually executable tasks. It does not need to be definitive — it is the starting point that will be refined in planning when the WP is pulled. The criterion is: someone reading the plan can understand the execution path without needing to ask.

**Exception — L due to external lead time:** WPs whose Size L comes from external lead time (Security Team, access provisioning, client decision), not from technical effort, are exempt from the Breakdown plan. Mark explicitly as `Breakdown plan: N/A (L due to external lead time)`. Current examples: WP-08 (Twilio + Zapier VSAs), WP-48 (Publix access unblock).

**Accepted states in the field:**

- **Inline outline** — list of 3–5 bullets with probable sub-issues. Use when the WP is mature (description already clear, dependencies resolved).
- **`TBD in planning`** — acceptable when the WP is conditional on another not yet closed (e.g., SAP conditional on the migration ADR; Publix conditional on the access unblock). Note in the field which event unblocks planning.
- **`N/A (L due to external lead time)`** — only for the case described above.

When the WP is pulled into a sprint, the outlined Breakdown plan becomes actual `[WP-XX.N]` sub-issues on GitHub.

### 7.6 Minimum standard for a WP in the WBS

Every WP defined in `docs/lanes/sales/wbs.md` must have at least:

- **Description** — what it is, why it exists, what context/origin motivated it. Without a Description, the scope cannot be understood or prioritized.
- **Completion criteria** — what "closed" looks like. Without criteria, the WP can drag on indefinitely.
- **Owner** — role or combination. Roles: **DE** Data Engineer, **BI** BI Developer, **DA** Data Architect, **DM** Delivery Manager.
- **Size** — XS/S/M/L (initial guess; refined in planning).

Additional fields as applicable: **Depends on:**, **Blocks:**, **Breakdown plan:** (mandatory for L — see §7.5).

Firm rule: **a WP without Description + Completion criteria cannot enter planning** — first elevate it to "ready WP" status in the WBS before turning it into an issue. If the Description/Completion criteria are derivative of another WP (e.g., "Same approach as WP-X applied to retailer Y"), the reference must be explicit in the Description field — the title alone is not enough.

---

## 8. Rituals and cadence

| Ritual | Frequency | Owner | Output |
|---|---|---|---|
| **BIX internal daily** | Daily, 13:30 BRT (Monday–Thursday) | BIX team | Status update on the Project (Backlog → Ready, etc.) |
| **Planning** | Monday | Delivery Manager | Sprint filled in for issues in the prioritized backlog |
| **Demo + Weekly status with the client** | Friday 15:00 BRT / 13:00 CST | Delivery Manager | Weekly Status issue (Done/In Progress/Planned/Alignments format — see memory `feedback_weekly_status_format`) |
| **WBS update** | On demand | Delivery Manager | New version of `docs/lanes/sales/wbs.md` + changelog |
| **Briefing review** | Biweekly or on demand | Delivery Manager | `docs/briefing.md` reflects the current macro situation |

> Cadence and templates are operational process — not part of the WBS (which is only hands-on work). This document and `docs/briefing.md` cover the process side.

---

## 9. Metrics and indicators

At least these should be visible to the team:

- **% completed per milestone** — native GitHub bar in the milestone header (`closed / total`)
- **Issues in `Blocked`** — how many, for how long, why (filter view 6.4)
- **Issues with unfilled custom fields** — sanitization view; ideally zero
- **WBS WPs without a corresponding issue** — periodically check which WPs have not yet turned into issues (reminder: create an issue only when the need arises — memory `feedback_issues_proativos`)
- **Velocity per sprint** — issues closed / sprint, once there are 3+ completed sprints

---

## 10. Suggested implementation sequence

To avoid doing everything at once:

1. **Create the 5 milestones** in the repo — 10 min, unlocks macro view ✅
2. **Create the "Deliverable" custom field** in the Project + populate existing issues — 30 min
3. **Create the sub-deliverable parent issues** (`[1.1] SMD Foundation` through `[5.2] Docs`) and link them to the corresponding milestones — 30 min
4. **Create the "Retailer" custom field** + populate existing issues — 20 min (Size already exists)
5. **Configure the "Sprint" iteration** — 10 min, start weekly
6. **Save the 6 views** described in §6 — 30 min
7. **Rename existing issues** to the `[WP-XX] …` format — gradual, as each issue passes through planning
8. **Document in `briefing.md`** the link to this document (visibility) — 2 min
9. **Train the team** on the convention in a daily — 10 min

Estimated total: ~2h of setup, spread over 2–3 days (plus the gradual work of renaming issues).

---

## 11. Maintenance

- When the WBS changes (new WP, renumbering, new sub-deliverable), update **this document** if the structure changes, and review the **affected issues** on the Project.
- When a convention is proposed and validated in practice, add it here.
- Version this file alongside `wbs.md` — same commit when there are related changes.

---

## 12. Identification

- **Owner:** Delivery Manager
- **Depends on:** `docs/lanes/sales/wbs.md`
