# ADR — Kroger: Migrate Transformations from Qlik to Snowflake/dbt


| Field        | Value                                                   |
| ------------ | ------------------------------------------------------- |
| **Status**   | Proposed                                                |
| **Deciders** | Lili, Dustin Dickson                                    |
| **Domain**   | `models/legacy_ppc/storeleveldata/`                     |
| **Replaces** | Performance-diagnosis working paper (informal, undated) |


---

## Context

The Store Level Data pipeline for Kroger currently runs end-to-end inside Qlik Sense. The Qlik pipeline has three stages:


| Stage            | What it does                                             | Where it runs |
| ---------------- | -------------------------------------------------------- | ------------- |
| Extract (2.x)    | Pull from `LEGACY_PPC` → QVD files                       | Qlik          |
| Transform (3.x)  | Enrichment, velocity calculation, join key normalization | Qlik engine   |
| Data Model (4.x) | Load QVDs into Qlik in-memory model for visualization    | Qlik          |


After migration, dbt reads from `PILGRIMS` source tables directly and writes transformed marts to `LEGACY_PPC.STORELEVELDATA`. Qlik then reads from `LEGACY_PPC.STORELEVELDATA` instead of its own QVDs.

The full reload takes **~48 minutes**. The bottleneck is the transform stage running inside the Qlik engine — not the load from Snowflake.

The three core Kroger tables that drive the pipeline are:


| Table                   | Rows  | Problem                                                                             |
| ----------------------- | ----- | ----------------------------------------------------------------------------------- |
| `INVENTORY`             | 144 M | Denormalized — store attributes repeated per row; no retailer prefix                |
| `SALES_DAILY`           | 67 M  | Same denormalization; 18 store-attribute columns per row                            |
| `SALES_WEEKLY_DETAILED` | 17 M  | `TIME_PERIOD` is a raw label string — not filterable by date without Qlik's parsing |


Five categories of transformation logic exist only inside Qlik and have no Snowflake equivalent:

1. **Velocity calculation** — 26-week rolling window join of `INVENTORY × SALES_DAILY`, producing dollar velocity, unit velocity, and opportunity loss. Runs at query time in Qlik; never materialized.
2. **Join key normalization** — `KeepChar(field, '0123456789')` strips non-numeric characters so `INVENTORY.DIVISION = 'Cincinnati'` matches `SALES_DAILY.DIVISION = '504'`. Without this, the velocity join breaks.
3. **Mapping dedup** — Brand and SKU mappings contain both manual entries and system-import rows (`UPDATED_BY = 'MAPPING FILE'`). Qlik keeps the latest manual entry per manufacturer/UPC; system rows are fallback only. The raw Snowflake tables are not deduped.
4. **TIME_PERIOD parsing** — Labels like `'Last Week Ending 2025 PD 06 WK 4'` are decoded using `SubField` into sort order, fiscal period, fiscal week, and grain type (`LAST_WEEK` / `PERIOD` / `YEAR_TO_DATE`). Without this, `SALES_WEEKLY_DETAILED` is unfilterable by date.
5. **Dimension extraction** — `DIM_KROGER__STORE` (≈ 922 rows) is never materialized; store attributes are denormalized into 67 M fact rows.

The root cause of the performance problem is architectural: heavy transformation work runs inside the Qlik engine instead of Snowflake, which is the appropriate compute layer for joins at this row count.

---

## Decision Drivers

- ETL runtime of ~48 minutes is bounded by Qlik engine throughput on the velocity join — not by data volume or network transfer
- Velocity calculations are ephemeral — they run in Qlik's in-memory engine, disappear on reload, and cannot be tested or versioned
- Store attributes denormalized into 67 M fact rows drive scan cost on every velocity query
- `TIME_PERIOD` as a raw string makes `SALES_WEEKLY_DETAILED` unfilterable without Qlik's runtime parsing
- Brand and SKU mapping dedup logic is implicit in Qlik load scripts — not auditable or testable in isolation

---

## Decision

**Push all transformation logic into Snowflake/dbt. Leave Qlik responsible only for load and final in-memory presentation.**

### Transformation boundary


| Responsibility                                                    | Owner after migration                                   |
| ----------------------------------------------------------------- | ------------------------------------------------------- |
| Join key normalization (`REGEXP_REPLACE`)                         | dbt staging models (read from `PILGRIMS` source tables) |
| Mapping dedup (manual-over-system priority)                       | dbt intermediate models                                 |
| Dimension extraction (`DIM_KROGER__STORE`, `DIM_KROGER__PRODUCT`) | dbt mart models (write to `LEGACY_PPC.STORELEVELDATA`)  |
| Velocity calculation (26-week rolling window)                     | dbt mart model (`FCT_KROGER__VELOCITY`)                 |
| `TIME_PERIOD` parsing and fiscal period lookup                    | dbt intermediate + optional `DIM_KROGER__DATE`          |
| Row-level security (Section Access)                               | Qlik — unchanged                                        |
| In-memory visualization model                                     | Qlik (reads from `LEGACY_PPC.STORELEVELDATA`)           |


### Target model structure

The denormalized source tables are refactored into a star schema:

```
DIM_KROGER__STORE          — ~922 rows; extracted from SALES_DAILY
DIM_KROGER__PRODUCT        — PRODUCTS + SKU_MAPPING + BRAND_MAPPING + category classification from SALES_WEEKLY_DETAILED (commodity, department hierarchy, vendor, manufacturer); deduplicated to 1 row per UPC
DIM_KROGER__DATE           — date spine + TIME_PERIOD fiscal label decode

FCT_KROGER__INVENTORY      — refactored INVENTORY, FK to dim_store + dim_product
FCT_KROGER__SALES_DAILY    — refactored SALES_DAILY, store attrs moved to dim_store
FCT_KROGER__SALES_WEEKLY   — refactored SALES_WEEKLY_DETAILED
FCT_KROGER__VELOCITY       — new; 26-week rolling window, table materialization
```

All models resolve to schema `STORELEVELDATA` in database `LEGACY_PPC`.

### Key implementation constraints

- **Join key normalization must be applied in staging**, not at query time. Both `INVENTORY` and `SALES_DAILY` must emit a `division_key` column via `REGEXP_REPLACE(division, '[^0-9]', '')`. The velocity join will silently produce zero matches without this.
- **Velocity materialization is a full-rebuild table**, not incremental. The 26-week window requires recomputing from scratch weekly; incremental append would accumulate stale rows. The weekly rebuild is scheduled via dbt Cloud orchestration.
- **Mapping dedup logic is explicit in intermediates**. `INT_KROGER__BRAND_MAPPING` and `INT_KROGER__SKU_MAPPING` implement the manual-over-system priority rule using `MAX(last_update)` per key, excluding `UPDATED_BY = 'MAPPING FILE'` rows except as fallback. The raw tables are not used downstream.
---

## Consequences

### Positive

- **ETL wall time drops**: transformations run inside Snowflake's compute layer, not the Qlik engine. Qlik's reload becomes load-only.
- **Velocity is reproducible**: `FCT_KROGER__VELOCITY` is a versioned, tested dbt model instead of an in-memory Qlik calculation that disappears on reload.
- **Store denormalization eliminated**: extracting `DIM_KROGER__STORE` removes 18 repeated columns from 67 M fact rows, reducing storage and improving scan performance.
- **Fact tables lean**: descriptive columns available via dimension joins (`item_description`, `manufacturer_description`, commodity/department hierarchy) are removed from facts. Only natural keys and columns with no dimension home remain as degenerate dimensions.
- **Mapping logic is auditable**: the dedup intermediate is version-controlled and testable, replacing implicit Qlik logic.

### Negative / risks

- **Division/store join key is a latent bug risk**: if any future staging model omits `REGEXP_REPLACE`, the velocity join silently returns zero rows. The normalization must be enforced in staging and covered by a dbt test.
- **Velocity rebuild cost**: `FCT_KROGER__VELOCITY` joins 144 M inventory rows to 67 M sales rows over 182 days. The full-table weekly rebuild is the largest single compute job in the domain. Monitor warehouse credit consumption on first production run.
- **Qlik dependency on mart table names**: Qlik load scripts reference table names directly. Any rename (e.g. `INVENTORY` → `FCT_KROGER__INVENTORY`) requires a coordinated Qlik script update; a stale reference will break the Qlik reload silently.

---

## Alternatives Considered

### 1. Keep all logic in Qlik, optimize reload

Rejected. The 48-minute ETL is bounded by Qlik engine throughput on the velocity join across 200 M+ rows. Snowflake is the right compute layer for this join size. Optimizing Qlik reloads addresses symptoms, not the cause.

### 2. Maintain denormalized facts, no dimensional remodel

Rejected. The store attributes repeated in 67 M rows are the primary driver of scan cost in velocity queries. Without extracting `DIM_KROGER__STORE`, the performance improvement from moving to Snowflake is partially offset by continued full-table scans on wide rows. The remodel is required to achieve the target performance.

### 3. Dynamic Tables instead of dbt Cloud orchestration

Considered for velocity. Dynamic Tables with `TARGET_LAG = '1 day'` would automate refresh without a Snowflake Task. Rejected because the rolling-window filter (`CURRENT_DATE - 182`) and the weekly-aggregation grain make the change-tracking semantics ambiguous — Snowflake cannot determine which output rows changed from a windowed join. A scheduled full rebuild is simpler and more predictable.