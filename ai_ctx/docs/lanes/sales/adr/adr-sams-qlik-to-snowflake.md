# ADR — Sam's Club: Migrate Transformations from Qlik to Snowflake/dbt


| Field        | Value                                                        |
| ------------ | ------------------------------------------------------------ |
| **Status**   | Proposed                                                     |
| **Deciders** | Lili, Dustin Dickson                                         |
| **Domain**   | `models/legacy_ppc/storeleveldata/`                          |
| **Replaces** | n/a — Sam's Club velocity runs entirely in Qlik; this is a new materialization |


---

## Context

The Store Level Data pipeline for Sam's Club has a partial dbt migration covering staging, intermediate, product/location dimensions, and a weekly sales fact. Velocity calculation and all year-over-year metrics remain inside Qlik Sense.


| Stage / Component     | What it does                                                                              | Where it runs |
| --------------------- | ----------------------------------------------------------------------------------------- | ------------- |
| Extract (2.7)         | Pull `FCT_SAMS__SALES_WEEKLY` from `LEGACY_PPC.STORELEVELDATA` → QVD file                | Qlik          |
| Transform (3.10)      | Apply 189-day window, compute dollar velocity and six YoY metrics, 26-week average        | Qlik engine   |
| Data Model (4.x)      | Load QVDs into Qlik in-memory model for visualization                                     | Qlik          |
| dbt (partial)         | `dim_sams__date_week`, `dim_sams__location`, `dim_sams_category`, `dim_sams_item`, `dim_sams_item_group`, `fct_sams__sales_weekly` from intermediate | Snowflake     |
| dbt (missing)         | `fct_sams__velocity` — does not exist yet | n/a           |


The Sam's Club objects and their current state:


| Object                      | Scale                        | Problem |
| --------------------------- | ---------------------------- | ------- |
| `fct_sams__sales_weekly`            | weekly item × DC × location  | Existing dbt model; `materialized='table'`; Snowflake stores this as `FCT_SAMS__SALES_WEEKLY` (Qlik extracts it by that name); thin wrapper passing through all columns from `int_sams__sales_weekly` |
| velocity (Qlik only)                | 26-week rolling, DC grain    | Dollar velocity and six YoY metrics computed in Qlik; disappear on reload; no version control |


Three categories of transformation exist only in Qlik and have no Snowflake equivalent:

1. **Dollar velocity** — `Sum(Dollar_TY) / Sum(Stores_TY)` aggregated per `(WEEK, ITEM_NUMBER, DC)` over a 189-day rolling window anchored on `WeekStart(MAX(WEEK)) - 189`. Grain collapses location into DC level.
2. **Year-over-year metrics** — Qlik computes six derived metrics per row: `sales_change`, `unit_change`, `markdown_point_change`, `avg_sell_price_ty`, `avg_sell_price_ly`, and `stores_change`. None are materialized in Snowflake.
3. **26-week average** — `Avg(dollar_velocity_ty)`, `Avg(unit_velocity_ty)` and their LY counterparts computed as a second pass per item over the velocity window. No Snowflake equivalent.

The root cause is that Sam's Club velocity — including YoY performance metrics used directly in dashboard visualizations — is computed inside the Qlik engine from denormalized inputs, making it untestable, unreproducible, and invisible outside Qlik.

---

## Decision Drivers

- Velocity and YoY metrics are ephemeral — they disappear on Qlik reload and cannot be tested or audited

---

## Decision

**Materialize Sam's Club velocity and YoY metrics in Snowflake and correct the known translation mismatches.**

### Boundary


| Responsibility                                    | Owner after migration                                         |
| ------------------------------------------------- | ------------------------------------------------------------- |
| Dollar and unit velocity (189-day rolling window) | dbt — `fct_sams__velocity` (full-rebuild table)               |
| Six YoY metrics (sales/unit/markdown/price/stores)| dbt — CTEs inside `fct_sams__velocity`                        |
| 26-week velocity averages (item level)            | dbt — CTE inside `fct_sams__velocity`                         |
| Sales fact                                        | dbt — `fct_sams__sales_weekly` (already table); Qlik extracts it as `FCT_SAMS__SALES_WEEKLY` |
| Row-level security (Section Access)               | Qlik — unchanged                                              |
| In-memory visualization model                    | Qlik (reads from `LEGACY_PPC.STORELEVELDATA`)                 |


### Target structure

```
DIM_SAMS__PRODUCT    — table; 1 row per SAMS_ITEM_NUMBER;
                       item_number, item_name, item_group, category;
                       deduped on latest WEEK; surrogate key via generate_surrogate_key(['SAMS_ITEM_NUMBER'])

DIM_SAMS__LOCATION   — table; 1 row per (SAMS_DC, SAMS_LOCATION);
                       dc_number, location_name; surrogate key via generate_surrogate_key(['SAMS_DC', 'SAMS_LOCATION'])

FCT_SAMS__SALES_WEEKLY — already materialized as table; no structural change needed;
                         grain: (WEEK, SAMS_ITEM_NUMBER, SAMS_DC, SAMS_LOCATION);
                         metrics: dollar/unit sales TY/LY, store counts TY/LY, markdowns TY/LY, price

FCT_SAMS__VELOCITY   — table (full rebuild weekly);
                       189-day window anchored on DATE_TRUNC('week', MAX(WEEK)) - 189 days;
                       grain: (WEEK, SAMS_ITEM_NUMBER, SAMS_DC) — aggregates across LOCATION;
                       velocity: dollar_velocity_ty = SUM(dollar_ty) / SUM(stores_ty);
                       YoY metrics: sales_change_yoy, unit_change_yoy, markdown_point_change,
                                   avg_sell_price_ty, avg_sell_price_ly, stores_change;
                       26-week avg per item: dollar/unit velocity TY and LY
```

All models resolve to schema `STORELEVELDATA` in database `LEGACY_PPC`.

### Key implementation constraints

- **Window anchor must round to week start**: the 189-day cutoff is `DATE_TRUNC('week', MAX(WEEK)) - INTERVAL '189 days'`, not `MAX(WEEK) - 189`. Qlik uses `WeekStart(MAX(WEEK)) - 189`; skipping the rounding includes up to 6 extra days.
- **Velocity grain is (WEEK, ITEM_NUMBER, DC), not (WEEK, ITEM_NUMBER, DC, LOCATION)**: the Qlik key is `WEEK || '||' || ITEM_NUMBER || '||' || DC`. The velocity model must aggregate `SUM(dollar_ty)` and `SUM(stores_ty)` across all locations within a DC before dividing. Computing velocity before aggregation produces incorrect per-location figures.

---

## Consequences

### Positive

- **Velocity is reproducible**: `FCT_SAMS__VELOCITY` is a versioned, tested dbt model instead of an in-memory Qlik calculation that disappears on reload.
- **YoY metrics are materialized**: all six derived metrics (`sales_change_yoy`, `unit_change_yoy`, `markdown_point_change`, `avg_sell_price_ty/ly`, `stores_change`) are computed once per rebuild and stored.

### Negative / risks

- **Grain collapse requires testing**: aggregating from (WEEK, ITEM_NUMBER, DC, LOCATION) to (WEEK, ITEM_NUMBER, DC) must be validated to confirm `SUM(stores_ty)` matches Qlik's `Sum(Stores_TY)` at the DC level.
- **Velocity rebuild cost**: `fct_sams__velocity` scans `fct_sams__sales_weekly` over 189 days. Monitor warehouse credit consumption on first production run.

---

## Alternatives Considered

### 1. Keep velocity in Qlik

*Rejected.* The primary analytical metrics (velocity, YoY changes) remain untestable and disappear on every reload.

### 2. Compute velocity at location grain to match the fact table grain

*Rejected.* Qlik's key is `WEEK || ITEM_NUMBER || DC` — velocity is at DC level. Computing at location grain produces figures that cannot be validated against Qlik output and breaks the grain contract expected by downstream Qlik scripts.

