# ADR — Costco: Migrate Transformations from Qlik to Snowflake/dbt


| Field        | Value                                                        |
| ------------ | ------------------------------------------------------------ |
| **Status**   | Proposed                                                     |
| **Deciders** | Lili, Dustin Dickson                                         |
| **Domain**   | `models/legacy_ppc/storeleveldata/`                          |
| **Replaces** | n/a — Costco has a partial dbt migration; this formalizes the remaining scope |


---

## Context

The Store Level Data pipeline for Costco runs across two systems. The ETL layer (staging + intermediate + basic facts) was partially migrated to dbt, but velocity calculation and dimension normalization remain inside Qlik Sense.


| Stage / Component     | What it does                                                             | Where it runs |
| --------------------- | ------------------------------------------------------------------------ | ------------- |
| Extract (2.x)         | Pull `F_COSTIT_COSTCO_ITEMS`, `F_COSTSE_COSTCO_SEGMENT`, `D_COSTCO_PRODUCTS` from `LEGACY_PPC` → QVD files | Qlik |
| Mappings (5.x / 3.6)  | Build `Item_To_Segment_Mapping` and `Costco_Product_Mapping` via `ApplyMap` | Qlik engine |
| Transform (3.8)       | Apply window filter, `is_selling` derivation, velocity calculation, 26-week average and opportunity loss | Qlik engine |
| Data Model (4.x)      | Load QVDs into Qlik in-memory model for visualization                    | Qlik |
| dbt (partial)         | Staging + intermediate + `F_COSTIT_COSTCO_ITEMS` / `F_COSTSE_COSTCO_SEGMENT` / `D_COSTCO_PRODUCTS` as backward-compatible table replacements | Snowflake |


The three core Costco tables and their current state:


| Object                    | Scale | Problem |
| ------------------------- | ----- | ------- |
| `F_COSTIT_COSTCO_ITEMS`   | weekly item rows per warehouse | Warehouse attributes (`region_name`, `warehouse_name`, `warehouse_status`) repeated per fact row; velocity not materialized |
| `F_COSTSE_COSTCO_SEGMENT` | weekly segment rows per warehouse | Same warehouse denormalization; no FK to items |
| `D_COSTCO_PRODUCTS`       | 1 row per item | Exists in dbt but has no surrogate key and is not joined to `STG_COSTCO__PRODUCT_MAPPING` (SAP SKU mapping missing) |


Three categories of transformation logic exist only in Qlik and have no Snowflake equivalent:

1. **Velocity calculation** — `Sum(dollar_sales) / Count(Distinct warehouse) WHERE is_selling = 1` computed per `(week_ending_date, segment, item)`. Never materialized; runs at Qlik query time.
2. **`ApplyMap` lookups** — `Item_To_Segment_Mapping` (item → segment name from `D_COSTCO_PRODUCTS`) and `Costco_Product_Mapping` (item → SAP SKU from `STG_COSTCO__PRODUCT_MAPPING`) are built in-memory at reload time. Without them, velocity rows have no segment or product label.
3. **26-week average and opportunity loss** — computed as a second Resident Load pass over the velocity table: `Avg(dollar_velocity)` and `Avg(warehouses_not_selling × dollar_velocity)` per `(segment, item)`. Stored as a separate QVD; no Snowflake equivalent.

The root cause is that velocity — the primary analytical metric in the Costco pipeline — is computed inside the Qlik engine from denormalized inputs, making it untestable, unreproducible, and invisible outside Qlik.

---

## Decision Drivers

- Velocity is the primary Costco metric and is ephemeral — it disappears on reload and cannot be tested or audited
- The existing backward-compatible fact models (`F_COSTIT_COSTCO_ITEMS`, `F_COSTSE_COSTCO_SEGMENT`) are ETL replacements, not a dimensional model — warehouse attributes are still repeated per fact row
- `ApplyMap` lookups are built implicitly from in-memory tables — no version control, no testability
- `D_COSTCO_PRODUCTS` already exists in dbt but is incomplete — no surrogate key and no SAP SKU join, so downstream models cannot use it as a proper dimension

---

## Decision

**Complete the Costco dbt migration by materializing velocity in Snowflake, extracting the warehouse dimension, and correcting the known translation mismatches.**

### Boundary


| Responsibility                                         | Owner after migration                                        |
| ------------------------------------------------------ | ------------------------------------------------------------ |
| `ApplyMap` lookups (item → segment, item → SAP SKU)    | dbt — `dim_costco__product` (LEFT JOIN replaces ApplyMap)    |
| Warehouse dimension extraction                         | dbt — `dim_costco__warehouse` (written to `LEGACY_PPC.STORELEVELDATA`) |
| Velocity calculation (189-day rolling window)          | dbt — `fct_costco__velocity` (full-rebuild table)            |
| 26-week average and opportunity loss                   | dbt — CTEs inside `fct_costco__velocity`                     |
| Row-level security (Section Access)                    | Qlik — unchanged                                             |
| In-memory visualization model                          | Qlik (reads from `LEGACY_PPC.STORELEVELDATA`)                |


### Target structure

```
DIM_COSTCO__PRODUCT    — alias D_COSTCO_PRODUCTS; 1 row per item_number;
                         segment, category, department, vendor attrs;
                         SAP SKU from stg_costco__product_mapping (LEFT JOIN);
                         surrogate key via generate_surrogate_key(['item_number'])

DIM_COSTCO__WAREHOUSE  — alias DIM_COSTCO_WAREHOUSE; 1 row per warehouse_code;
                         region_code, region_name, warehouse_name, warehouse_status;
                         UNION of items + segments, deduplicated by warehouse_code

FCT_COSTCO__ITEMS      — alias F_COSTIT_COSTCO_ITEMS; table (full rebuild);
                         grain: (week_ending_date, item_number, warehouse_code);
                         metrics only — dimensional columns removed, available via
                         dim_product and dim_warehouse FK joins;
                         column names use clean naming (not COSTIT_* prefix) —
                         requires coordinated Qlik extract script update

FCT_COSTCO__SEGMENTS   — alias F_COSTSE_COSTCO_SEGMENT; table (full rebuild);
                         grain: (week_ending_date, segment_name, warehouse_code);
                         segment_name kept as degenerate dim (grain key);
                         column names use clean naming (not COSTSE_* prefix) —
                         requires coordinated Qlik extract script update

FCT_COSTCO__SUBCATEGORY — incremental (merge); grain: (sales_date, subcategory_code,
                          warehouse_code); source: int_costco__subcategory;
                          kept as-is from existing implementation

FCT_COSTCO__VELOCITY   — new; table (full rebuild weekly);
                         189-day window anchored on DATE_TRUNC('week', MAX(week_ending_date));
                         grain: (week_ending_date, segment_item_key);
                         columns: dollar_velocity, unit_velocity,
                                  dollar_velocity_26wk_avg, unit_velocity_26wk_avg,
                                  dollar_loss_26wk_avg, opportunity_loss_26wk_avg
```

All models resolve to schema `STORELEVELDATA` in database `LEGACY_PPC`.

### Key implementation constraints

- **Fact table aliases must be preserved**: `fct_costco__items` must keep `alias = "F_COSTIT_COSTCO_ITEMS"` and `fct_costco__segments` must keep `alias = "F_COSTSE_COSTCO_SEGMENT"`. Removing the alias creates a new table under the dbt model name and leaves the old alias in place, breaking the Qlik reload silently.
- **Column naming migration requires a coordinated Qlik update**: the new fact models use clean column names (`dollar_sales`, `unit_sales`, `warehouse_code`) instead of the `COSTIT_*` / `COSTSE_*` prefix that Qlik's `2.4_facts_extract_costco.qvs` selects by name. Deploying the new models without updating the Qlik extract scripts will break the Qlik reload. Both changes must go live in the same release window.

---

## Consequences

### Positive

- **Velocity is reproducible**: `FCT_COSTCO__VELOCITY` is a versioned, tested dbt model instead of an in-memory Qlik calculation that disappears on reload.
- **`ApplyMap` logic is explicit**: item-to-segment and item-to-SAP-SKU lookups become LEFT JOINs in `dim_costco__product` — version-controlled and testable.
- **Warehouse denormalization eliminated**: extracting `dim_costco__warehouse` removes repeated region and warehouse columns from fact rows.
- **26-week averages are materialized**: `dollar_velocity_26wk_avg` and `dollar_loss_26wk_avg` are computed once per rebuild and stored, instead of being recalculated per Qlik user session.

### Negative / risks

- **Velocity rebuild cost**: `FCT_COSTCO__VELOCITY` joins items and segments over 189 days. Monitor warehouse credit consumption on first production run.
- **Column rename is a hard cutover, not a backward-compatible change**: the migration from `COSTIT_*`/`COSTSE_*` column names to clean names cannot be done incrementally — both the dbt model and the Qlik extract script must change in the same release. There is no intermediate state where both old and new column names coexist on the same table.

---

## Alternatives Considered

### 1. Keep velocity in Qlik, extend current backward-compatible models

*Rejected.* The primary analytical metric remains untestable and unreproducible. The existing ETL replacement models already prove the staging and intermediate layers work; leaving velocity in Qlik means the most critical calculation has no version control, no dbt tests, and cannot be validated independently.

### 2. Maintain denormalized facts without dimensional remodel

*Rejected.* Warehouse attributes repeated in fact rows are the primary driver of scan cost in velocity queries. Without `dim_costco__warehouse`, every velocity join scans the full fact tables including region and warehouse name columns that are constant per warehouse.

### 3. Dynamic Tables instead of dbt Cloud orchestration for velocity

*Rejected.* The 189-day rolling window and the `WeekStart`-anchored cutoff make change-tracking semantics ambiguous — Snowflake cannot determine which output rows changed from a windowed aggregation. A scheduled full rebuild via dbt Cloud is simpler and produces predictable results.
