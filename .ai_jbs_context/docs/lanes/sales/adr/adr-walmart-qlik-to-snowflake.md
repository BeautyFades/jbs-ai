# ADR — Walmart: Migrate Transformations from Qlik to Snowflake/dbt


| Field        | Value                                                        |
| ------------ | ------------------------------------------------------------ |
| **Status**   | Proposed                                                     |
| **Deciders** | Lili, Dustin Dickson                                         |
| **Domain**   | `models/legacy_ppc/storeleveldata/`                          |
| **Replaces** | n/a — Walmart velocity is partially pre-computed at source; this is a new materialization |


---

## Context

The Store Level Data pipeline for Walmart differs structurally from Absco, Sam's Club, and Costco: velocity figures are **pre-computed upstream** (`WALMSA_DOLLAR_PER_STR_SLS_WKDY_TY/LY`, `WALMSA_UNITS_PER_STR_SLS_WKDY_TY/LY`) and are already present in `fct_walmart__sales` (materialized in Snowflake as `F_WALMSA_WALMART_SALES`, the alias used by Qlik to extract the QVD). Qlik only adds two derived metrics (`sales_change_yoy`, `pct_markdowns`) and the 26-week rolling average.


| Stage / Component     | What it does                                                                              | Where it runs |
| --------------------- | ----------------------------------------------------------------------------------------- | ------------- |
| Extract (2.8)         | Pull `F_WALMSA_WALMART_SALES` from `LEGACY_PPC.STORELEVELDATA` (dbt model alias) → QVD file | Qlik          |
| Transform (3.11)      | Apply 189-day window, compute `sales_change_yoy` and `pct_markdowns`, 26-week average     | Qlik engine   |
| Data Model (4.x)      | Load QVDs into Qlik in-memory model for visualization                                     | Qlik          |
| dbt (partial)         | `fct_walmart__sales` from `int_walmart__sales`                                           | Snowflake    |
| dbt (missing)         | `dim_walmart__product`, `dim_walmart__dc`, `fct_walmart__velocity` — none exist yet      | n/a           |


The Walmart objects and their current state:


| Object                      | Scale                           | Problem |
| --------------------------- | ------------------------------- | ------- |
| `fct_walmart__sales`        | weekly item × DC               | Existing dbt model; `materialized='table'`; alias `F_WALMSA_WALMART_SALES` (Qlik extracts it by that name); uses `WALMSA_*` backward-compatible column names; velocity pass-through columns (`WALMSA_DOLLAR_PER_STR_SLS_WKDY_TY/LY`, `WALMSA_UNITS_PER_STR_SLS_WKDY_TY/LY`) originate from the `PILGRIMS` source database via dbt staging |
| velocity (Qlik only)        | 26-week rolling                | `sales_change_yoy` and `pct_markdowns` computed in Qlik; 26-week avg computed by second pass; no Snowflake equivalent |


Two categories of transformation exist only in Qlik and have no Snowflake equivalent:

1. **Derived velocity metrics** — `sales_change_yoy = (TY / LY) - 1` and `pct_markdowns = markdowns / sales`. Both are simple arithmetic on pre-computed source columns; Qlik is the only place they are computed and stored.
2. **26-week average** — `Avg(dollar_velocity_ty)`, `Avg(unit_velocity_ty)` and their LY counterparts computed as a second pass per item over the 189-day window. No Snowflake equivalent.
The root cause is that Walmart's analytical completeness (change metrics, 26-week averages) depends on Qlik for the final computation pass, even though most of the heavy work (velocity) is already done at the source.

---

## Decision Drivers

- `fct_walmart__velocity` is missing — the 26-week averages and YoY metrics used in dashboards are ephemeral

---

## Decision

**Materialize Walmart velocity metrics in Snowflake and pass through pre-computed velocity columns.**

### Boundary


| Responsibility                                    | Owner after migration                                         |
| ------------------------------------------------- | ------------------------------------------------------------- |
| `sales_change_yoy` and `pct_markdowns` computation| dbt — CTEs inside `fct_walmart__velocity`                     |
| 26-week velocity averages (item level)            | dbt — CTE inside `fct_walmart__velocity`                      |
| Sales fact                                        | dbt — `fct_walmart__sales` (already table, alias `F_WALMSA_WALMART_SALES`); Qlik extracts it by that alias |
| Row-level security (Section Access)               | Qlik — unchanged                                              |
| In-memory visualization model                    | Qlik (reads from `LEGACY_PPC.STORELEVELDATA`)                 |


### Target structure

```
DIM_WALMART__PRODUCT — table; 1 row per ITEM_NUMBER;
                       item_number, item_name, vendor_stock_id, sap_sku from int_walmart__product_mapping;
                       is_mapped_to_sap; surrogate key via generate_surrogate_key(['ITEM_NUMBER'])

DIM_WALMART__DC      — table; 1 row per DISTRIBUTION_CENTER_NUMBER;
                       dc_number, dc_name; deduped on latest WEEK_ENDING_DATE;
                       surrogate key via generate_surrogate_key(['DISTRIBUTION_CENTER_NUMBER'])

FCT_WALMART__SALES   — already materialized as table; alias F_WALMSA_WALMART_SALES; backward-compatible WALMSA_* column names;
                       grain: (WEEK_ENDING_DATE, ITEM_NUMBER, DISTRIBUTION_CENTER_NUMBER);
                       metrics: POS dollars/quantity TY/LY, store count, pre-computed velocity columns,
                                markdowns, stores_not_selling, dc_sells_percent, stores_sell_percent

FCT_WALMART__VELOCITY — table (full rebuild weekly);
                        189-day window anchored on DATE_TRUNC('week', MAX(WEEK_ENDING_DATE)) - 189 days;
                        grain: (WEEK_ENDING_DATE, ITEM_NUMBER, DISTRIBUTION_CENTER_NUMBER);
                        pass-through: dollar_velocity_ty/ly = DOLLARS_PER_STORE_TY/LY,
                                     unit_velocity_ty/ly = UNITS_PER_STORE_TY/LY;
                        derived: sales_change_yoy = (POS_TY / POS_LY) - 1,
                                 pct_markdowns = markdowns / pos_sales_ty;
                        26-week avg per item: dollar/unit velocity TY and LY
```

All models resolve to schema `STORELEVELDATA` in database `LEGACY_PPC`.

### Key implementation constraints

- **Window anchor must round to week start**: the 189-day cutoff is `DATE_TRUNC('week', MAX(WEEK_ENDING_DATE)) - INTERVAL '189 days'`, not `MAX(WEEK_ENDING_DATE) - 189`. Qlik uses `WeekStart(MAX(WALMSA_WEEK_ENDING_DATE)) - 189`; skipping the rounding includes up to 6 extra days.
- **Velocity columns are pre-computed — do not recompute them**: `dollar_velocity_ty = DOLLARS_PER_STORE_TY` and `unit_velocity_ty = UNITS_PER_STORE_TY` are passed through directly from the source. Attempting to recompute `SUM(pos_sales) / COUNT(stores)` would produce different figures than the source system's methodology and cannot be validated against Qlik output.

---

## Consequences

### Positive

- **Velocity metrics are reproducible**: `FCT_WALMART__VELOCITY` is a versioned, tested dbt model. `sales_change_yoy` and `pct_markdowns` are no longer ephemeral.
- **26-week averages are materialized**: computed once per rebuild and stored, instead of being recalculated per Qlik user session.

### Negative / risks

- **Pre-computed velocity may change upstream**: `DOLLARS_PER_STORE_TY` and `UNITS_PER_STORE_TY` are computed by the upstream `PILGRIMS` source. If the upstream methodology changes without a schema change, dbt will silently pass through incorrect figures. Add a freshness check on the source table.

---

## Alternatives Considered

### 1. Recompute velocity from raw POS data instead of using pre-computed source columns

*Rejected.* The upstream source system applies its own store-count and distribution logic to compute `DOLLARS_PER_STORE`. Recomputing from `POS_SALES_DOLLARS_TY / POS_STORE_COUNT_TY` produces different figures and cannot be validated against Qlik output, which also uses the pre-computed values.

### 2. Keep velocity in Qlik

*Rejected.* The derived metrics (`sales_change_yoy`, `pct_markdowns`, 26-week averages) remain untestable and disappear on every reload.
