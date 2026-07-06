# Project: PNL

PNL is still a **thin dbt wrapper** over two data origins: (a) SAP CO-PA profitability data
+ SAP material master (used only by `fct_actuals`), and (b) seven CSVs landed in
`DATAIKU.DATAIKUDEV`. There is no intermediate / mart layering — `fct_actuals` is the only
model with real transformation; the other seven are pure `select *` passthroughs.

## Footprint

```
models/legacy_ppc/ppc_pnl/
├── _sources_pnl.yml
├── fct_actuals.sql                                  ← the only real fact model
├── fct_budget.sql                                   # passthrough (2025 budget)
├── fct_budget_2024.sql                              # passthrough (2024 budget, EAV format)
├── fct_cost_forecast.sql                            # passthrough
├── fct_cost_payer_forecast_comparison.sql           # passthrough
├── fct_payer.sql                                    # passthrough
├── fct_payer_forecast.sql                           # passthrough
└── dim_reference.sql                                # passthrough (SKU master, ~659 rows)
```

## Sources

`_sources_pnl.yml` — self-contained. SAP sources are quoted (catalog-linked Iceberg,
lowercase identifiers); the `csv` source is plain DATAIKUDEV.

```yaml
sources:
  - name: pnl_sap_copa            # SAP CO-PA — feeds fct_actuals
    database: SRC_SAP_FVT
    schema: s3_copa
    quoting: {database: false, schema: true, identifier: true}
    tables:
      - name: profitability_analysis_v_2
      - name: profitability_analysis_history_v_2

  - name: pnl_sap_material        # SAP material master — feeds fct_actuals
    database: SRC_SAP_FVT
    schema: b4p_saphanadb
    quoting: {database: false, schema: true, identifier: true}
    tables:
      - name: zev_mat_report      # material code is "z0material"

  - name: csv                     
    database: DATAIKU
    schema: DATAIKUDEV
    tables:
      - name: ppc_pnl_budget
      - name: ppc_pnl_budget_2024
      - name: ppc_pnl_cost_forecast
      - name: ppc_pnl_cost_payer_forecast_comparison
      - name: ppc_pnl_payer
      - name: ppc_pnl_payer_forecast
      - name: ppc_pnl_reference
```

## `fct_actuals.sql` — the real model

Unions the current + historical CO-PA partitions, filters to recent activity in the 7 active
profit centers, computes derived measures, aggregates by document keys.

### The filter

```sql
WHERE left("postingdate", 10) >= '2024.01.01'        -- format is 'YYYY.MM.DD HH:MI:SS'
  AND "distributionchannel" IN ('01', '02', '13', '20')
  AND "profitcenter" IN (
      'MPPF011', 'MPPF018', 'SCPF991', 'WAPF051',
      'WAPF999', 'MRPF231', 'MRPF238'
  )
```

### Derived measures

```sql
gross_revenue - freight_inland + deducts_promotions + deducts_rebates
  + broker_agent_commission + mdf_accruals                          AS net_sales_calculated
```

In the `final` SELECT:

```sql
net_sales - cogs                                                    AS gross_margin,
-(total_broker_agent_commissioning + total_rebates
  + deducts_promotion + total_mdf)                                  AS trade_spend
```

The unary minus on `trade_spend` (and `total_freight`) is intentional — costs are stored
positive in the source but reported negative in P&L convention.

### Joins & grain

`profitability_analysis` left-joined to `master_material` on `product`. One row per
`(posting_date_raw, product, payer, ship_to_party)` after aggregation — daily / per
posting-date, not weekly.

## The seven passthroughs

Each is a single-line `select *` over a `DATAIKU.DATAIKUDEV` landing table, re-exposed in
`LEGACY_PPC.PPC_PNL` so the legacy Qlik / consumer paths keep working.

| Model                                | Source table (`DATAIKU.DATAIKUDEV`)      | Notes                                    |
| ------------------------------------ | ---------------------------------------- | ---------------------------------------- |
| `fct_budget`                         | `ppc_pnl_budget`                         | 2025 budget (current format)             |
| `fct_budget_2024`                    | `ppc_pnl_budget_2024`                    | 2024 budget (old EAV format, historical) |
| `fct_cost_forecast`                  | `ppc_pnl_cost_forecast`                  | weekly cost forecast per SKU-payer       |
| `fct_cost_payer_forecast_comparison` | `ppc_pnl_cost_payer_forecast_comparison` | cost-vs-payer reconciliation             |
| `fct_payer`                          | `ppc_pnl_payer`                          | weekly actual volume per payer           |
| `fct_payer_forecast`                 | `ppc_pnl_payer_forecast`                 | weekly forecast volume per payer         |
| `dim_reference`                      | `ppc_pnl_reference`                      | SKU master / attributes                  |

```sql
-- e.g. fct_budget.sql
select * from {{ source('csv', 'ppc_pnl_budget') }}
```

