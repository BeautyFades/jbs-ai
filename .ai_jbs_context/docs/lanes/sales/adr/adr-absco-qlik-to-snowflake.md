# ADR — Absco: Migrate Transformations from Qlik to Snowflake/dbt


| Field        | Value                                                        |
| ------------ | ------------------------------------------------------------ |
| **Status**   | Proposed                                                     |
| **Deciders** | Lili, Dustin Dickson                                         |
| **Domain**   | `models/legacy_ppc/storeleveldata/`                          |
| **Replaces** | n/a — Absco velocity runs entirely in Qlik; this is a new materialization |


---

## Context

The Store Level Data pipeline for Absco has a partial dbt migration covering the sales fact and a combined product+location dimension. Velocity calculation remains inside Qlik Sense. Qlik extracts the dbt-managed `fct_absco_sales` table (materialized in Snowflake as `FCT_ABSCO_SALES`) to a QVD file, then computes unit velocity from it in the transform layer.


| Stage / Component     | What it does                                                                          | Where it runs |
| --------------------- | ------------------------------------------------------------------------------------- | ------------- |
| Extract (2.5)         | Pull `FCT_ABSCO_SALES` from `LEGACY_PPC.STORELEVELDATA` → QVD file                   | Qlik          |
| Transform (3.9)       | Apply 189-day window, compute unit velocity = `TY_Unit_Sales / TY_Store_Sales`, 26-week average | Qlik engine   |
| Data Model (4.x)      | Load QVDs into Qlik in-memory model for visualization                                 | Qlik          |
| dbt (partial)         | `dim_absco__product_location` (combined product+location dim), `fct_absco_sales` from `int_absco_sales_unioned` | Snowflake |
| dbt (missing)         | `dim_absco__product`, `dim_absco__location` (split from existing combined dim), `fct_absco__sales` (renamed with double underscore), `fct_absco__velocity` — none exist yet | n/a |


The Absco objects and their current state:


| Object                        | Scale                      | Problem |
| ----------------------------- | -------------------------- | ------- |
| `fct_absco_sales`             | weekly item × location     | Existing dbt model; `materialized='table'`; Snowflake stores this as `FCT_ABSCO_SALES` (Qlik extracts it by that name); includes LY comparison join (364-day offset) and ghost rows for discontinued items |
| `dim_absco__product_location` | 1 row per (item, location) | Combined product+location dim; needs to be split into separate `dim_absco__product` and `dim_absco__location` for a proper star schema |
| velocity (Qlik only)          | 26-week rolling            | Unit velocity computed entirely in Qlik from the extracted QVD; disappears on reload; no version control or testability |


Two categories of transformation exist only in Qlik and have no Snowflake equivalent:

1. **Velocity calculation** — `SUM(ABSCO_SALES_THIS_YEAR) / SUM(ABSCO_STORE_SALE_THIS_YEAR)` aggregated per `(week_start, item_number, location)` over a 189-day rolling window anchored on `WeekStart(MAX(TIME)) - 189`. Computed from the `FCT_ABSCO_SALES` QVD (extracted from the dbt `fct_absco_sales` table) at Qlik reload time.
2. **26-week average** — `Avg(unit_velocity)` per item computed as a second pass (`Absco_Avg_Velocity.qvd`) over the velocity result. Averaged at item level only (not per location). No Snowflake equivalent.

The root cause is that Absco velocity computation is ephemeral inside Qlik — even though it reads from a dbt-managed table, the velocity calculation itself is never materialized in Snowflake, making it untestable and invisible outside Qlik.

---

## Decision Drivers

- Velocity is ephemeral — it disappears on Qlik reload and cannot be tested or audited
- 26-week averages are item-level in Qlik (`Absco_Avg_Velocity.qvd`); any implementation must match this grain

---

## Decision

**Materialize Absco velocity in Snowflake.**

### Boundary


| Responsibility                                   | Owner after migration                                        |
| ------------------------------------------------ | ------------------------------------------------------------ |
| Velocity calculation (189-day rolling window)    | dbt — `fct_absco__velocity` (full-rebuild table)             |
| 26-week unit velocity average (item-level)       | dbt — CTE inside `fct_absco__velocity`                       |
| Sales fact (renamed)                             | dbt — `fct_absco__sales` (new model with double-underscore naming, replaces `fct_absco_sales`) |
| Row-level security (Section Access)              | Qlik — unchanged                                             |
| In-memory visualization model                   | Qlik (reads from `LEGACY_PPC.STORELEVELDATA`)                |


### Target structure

```
DIM_ABSCO__PRODUCT   — table; 1 row per item_number (parsed from PRODUCT string);
                       item_number, item_description, sap_sku from int_absco__product_mapping;
                       surrogate key via generate_surrogate_key(['item_number'])

DIM_ABSCO__LOCATION  — table; 1 row per (store_number, store_division);
                       parsed from GEOGRAPHY string; deduped with QUALIFY ROW_NUMBER()

FCT_ABSCO__SALES     — table (full rebuild);
                       grain: (TIME, GEOGRAPHY, PRODUCT, STORE_DIVISION);
                       reads from int_absco_sales_unioned (PRODUCT/GEOGRAPHY format);
                       metrics: sales_retail_units, store_scan, on_hand_inventory_units, pog_auth_stores

FCT_ABSCO__VELOCITY  — table (full rebuild weekly);
                       reads from {{ ref('fct_absco_sales') }} (columns: absco_sales_this_year,
                         absco_store_sale_this_year, absco_item_number, absco_location, time);
                       189-day window anchored on DATE_TRUNC('week', MAX(time)) - 189 days;
                       grain: (week_start, absco_item_number, absco_location);
                       formula: unit_velocity = SUM(absco_sales_this_year) / SUM(absco_store_sale_this_year);
                       26-week avg at item level only (not per location)
```

All models resolve to schema `STORELEVELDATA` in database `LEGACY_PPC`.

---

## Consequences

### Positive

- **Velocity is reproducible**: `FCT_ABSCO__VELOCITY` is a versioned, tested dbt model instead of an in-memory Qlik calculation that disappears on reload.
- **26-week averages are materialized**: computed once per rebuild and stored, instead of being recalculated per Qlik user session.

### Negative / risks

- **Velocity rebuild cost**: `fct_absco__velocity` scans `fct_absco_sales` over 189 days. Monitor warehouse credit consumption on first production run.

---

## Alternatives Considered

### 1. Keep velocity in Qlik

*Rejected.* The primary analytical metric remains untestable and disappears on every reload. There is no end-to-end benefit to leaving it in Qlik given that the source data is already dbt-managed.
