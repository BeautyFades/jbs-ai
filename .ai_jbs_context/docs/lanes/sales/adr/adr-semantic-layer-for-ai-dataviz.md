# ADR — Semantic Layer Architecture for AI/DataViz Consumption

## Status

In Progress

## Deciders

Lili, Dustin Dickson

## Context and Problem Statement

The sales lane gold layer will be consumed by multiple DataViz/AI tools — Qlik Sense (current state), Claude (target per Dustin's June 2nd direction), and potentially Snowflake Cortex / Copilot. To answer queries correctly, these consumers need a semantic layer covering (a) what each model/column represents, (b) how each KPI is calculated, (c) domain-specific business rules that affect interpretation (e.g., Walmart fiscal calendar, UPC vs SKU semantics).

dbt offers several native paths to this layer; the project must commit to one approach before populating models across six retailers (SMD) + Circana + NPD + SAP, otherwise each modeling effort invents its own convention and the AI consumer inherits the inconsistency.

## Decision Drivers

* Operational simplicity — minimize infrastructure overhead
* Reuse of artifacts already in scope (WP-05 KPI Dictionary)
* Incremental adoption — populate over time, no big-bang rollout
* No new paid dependencies beyond what the dbt project already requires
* Sufficiency for Claude as the immediate consumer; a formal metric API is not required yet

## Considered Options

### Option 1: Pure dbt docs (schema.yml + manifest/catalog)

Populate `schema.yml` files with rich descriptions for every gold-layer model and column. Rely on the auto-generated `manifest.json` and `catalog.json` from `dbt docs generate` as the semantic source. Claude consumes the JSON via RAG.

* Native to dbt, zero extra infrastructure
* Metric definitions live as markdown text inside column descriptions
* No formal metric API
* No central place for cross-cutting business rules

### Option 2: dbt Semantic Layer (MetricFlow)

Define metrics formally in dbt's MetricFlow YAML; expose via dbt Semantic Layer API for programmatic consumption.

* Formal metric definitions with explicit grain and dimensions
* Queryable via Semantic Layer API
* Requires dbt Cloud (paid) or self-hosted MetricFlow
* Adds operational dependency and learning curve

### Option 3: Hybrid — schema.yml + KPI Dictionary + Domain Concepts

Use `schema.yml` for structural and column semantics; keep WP-05 KPI Dictionary as the canonical metric definition (markdown); absorb domain business rules (fiscal calendars, UPC vs SKU, etc.) as a "Domain Concepts" section inside the same KPI Dictionary file. Link them via plain-text references in column descriptions. Claude consumes all three artifacts as RAG context.

* Low infrastructure — only artifacts already planned
* Leverages WP-05 already in scope
* Incremental adoption per retailer
* Less formal than Option 2 — discipline required to keep artifacts consistent

### Option 4: Custom semantic catalog (proprietary markdown/JSON)

Build a parallel catalog outside dbt to feed Claude.

* Full control over format
* Duplicates what dbt natively provides
* Drift risk between catalog and actual models

## Decision Outcome

**Chosen Option:** Option 3 — Hybrid (schema.yml + KPI Dictionary + Domain Concepts)

Option 3 reaches the immediate goal (Claude correctly interprets the gold layer) without introducing new infrastructure, paid dependencies, or duplicate artifacts. It builds on WP-05, which is already in scope, and the descriptions live next to the dbt models they describe.

A migration path to Option 2 (MetricFlow) remains open if a second AI consumer or formal metric governance becomes a hard requirement.

### Positive Consequences

* WP-05 becomes the canonical source for both metrics and cross-cutting domain rules
* `schema.yml` is populated alongside each modeling WP — no separate documentation effort with tail risk
* No paid infrastructure (dbt Cloud) introduced
* Auto-generated `dbt docs` site comes as a free byproduct

### Negative Consequences

* Metric formulas remain in markdown, not formal YAML — links to columns are by convention, not enforced
* Three artifacts (schema.yml, KPI Dictionary, dbt docs site) must stay aligned through discipline, not tooling
* If a second AI tool requires programmatic metric access, the design needs revisiting (path to Option 2)

## Pros and Cons of the Options

### Option 1 — Pure dbt docs

#### Pros:
* Lowest setup cost
* Single artifact (schema.yml)

#### Cons:
* No central place for metric formulas — they scatter across column descriptions
* No central place for cross-cutting business rules

### Option 2 — dbt Semantic Layer (MetricFlow)

#### Pros:
* Formal metric API
* Queryable from any tool with a connector

#### Cons:
* Requires dbt Cloud or self-hosted MetricFlow
* Adds operational dependency and cost
* Overkill for a single primary AI consumer

### Option 3 — Hybrid

#### Pros:
* Leverages WP-05 already planned
* Low infrastructure, no paid dependencies
* Incremental, co-located with the modeling work
* Open migration path to Option 2 if needed

#### Cons:
* Sync between three artifacts is by discipline
* Less formal than Option 2

### Option 4 — Custom catalog

#### Pros:
* Total control over format

#### Cons:
* Duplicates dbt's native capabilities
* Drift risk

## Additional Considerations

Implementation notes:

* The convention for `schema.yml` (required fields per model and column, how to reference the KPI Dictionary from a column description) is documented in the dbt project README as part of WP-03 (dbt refactor).
* The KPI Dictionary (WP-05) expands its scope to include a "Domain Concepts" section covering business rules that do not fit a metric formula (Walmart fiscal calendar, UPC vs SKU, "stores selling" vs "not yet sold" semantics, etc.).
* Each per-source modeling WP (WP-15, WP-21, WP-25, WP-35, WP-45, WP-52, WP-63, WP-70, WP-73) gains a completion-criteria item: `schema.yml` populated for its models and columns.
* `dbt docs generate` should run in CI so the site reflects current state without manual effort.

Re-evaluation trigger: if a second programmatic AI consumer (beyond Claude) appears, or if metric governance/audit requirements emerge, revisit Option 2.

## Conclusion

The hybrid approach satisfies the immediate goal — Claude can interpret the gold layer correctly — with the smallest possible scope expansion: one ADR, one extra section in WP-05, one extra line in WP-03, and one completion-criteria item per modeling WP. No new artifact types, no new WPs, no new infrastructure. The path to a more formal semantic layer (Option 2) remains open if and when it becomes necessary.
