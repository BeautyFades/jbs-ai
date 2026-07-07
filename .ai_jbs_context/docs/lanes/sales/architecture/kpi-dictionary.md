# KPI Dictionary — Qlik Sense Dashboards

| Field      | Value                                              |
| ---------- | -------------------------------------------------- |
| **Scope**  | Market Data Integration — Qlik Sense Dashboards    |
| **Retailers** | Walmart · Sam's Club · Kroger · Costco · ABSCO  |

> Each KPI appears once with its definition and general formula. The **Retailers** column indicates in which projects the KPI is implemented or specified.

---

## Sales Velocity

| KPI / Measure         | Definition                                                                                                      | General Formula                                       | Retailers                              |
| --------------------- | --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | -------------------------------------- |
| `$ Velocity`          | Average dollar sales per store/club/warehouse per week. Measures a product's sales performance at each distribution point. | `SUM($ Sales) / COUNT(Stores Selling)`                | Walmart, Sam's Club, Kroger, Costco, ABSCO |
| `$ Last Year Velocity`| Same concept as `$ Velocity`, calculated using data from the same period in the prior year.                    | `SUM($ Sales LY) / COUNT(Stores Selling LY)`          | Walmart, Sam's Club, Kroger, Costco    |
| `Unit Velocity`       | Average units sold per store/club/warehouse per week. Complements `$ Velocity` by measuring physical sales volume. | `SUM(Unit Sales) / COUNT(Stores Selling)`             | Walmart, Sam's Club, Kroger, Costco, ABSCO |
| `Last Year Unit Velocity` | Same concept as `Unit Velocity`, calculated using data from the same period in the prior year.             | `SUM(Unit Sales LY) / COUNT(Stores Selling LY)`       | Walmart, Sam's Club, Kroger, Costco    |

---

## Dollar Sales

| KPI / Measure    | Definition                                                                 | General Formula                                    | Retailers               |
| ---------------- | -------------------------------------------------------------------------- | -------------------------------------------------- | ----------------------- |
| `$ Sales`        | Total dollar sales for the selected period (week, month, etc.).            | `SUM(Dollar Sales This Year)`                      | Walmart, Sam's Club, Kroger, Costco |
| `$ Last Year Sales` | Total dollar sales for the same period in the prior year.               | `SUM(Dollar Sales Last Year)`                      | Walmart, Sam's Club     |
| `$ Sales Change` | Percentage change in dollar sales between the current year and the prior year. Indicates growth or decline. | `($ Sales TY – $ Sales LY) / $ Sales LY`  | Walmart, Sam's Club     |

---

## Unit Sales

| KPI / Measure           | Definition                                                               | General Formula                                          | Retailers               |
| ----------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------- | ----------------------- |
| `Unit Sales`            | Total units sold for the selected period.                                | `SUM(Unit Sales This Year)`                              | Walmart, Sam's Club, ABSCO |
| `Last Year Unit Sales`  | Total units sold for the same period in the prior year.                  | `SUM(Unit Sales Last Year)`                              | Walmart, Sam's Club, ABSCO |
| `% Unit Sales Change`   | Percentage change in units sold between the current year and the prior year. | `(Unit Sales TY – Unit Sales LY) / Unit Sales LY`   | Sam's Club              |

---

## Price

| KPI / Measure           | Definition                                                                                              | General Formula                    | Retailers                           |
| ----------------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------- | ----------------------------------- |
| `Average Price / Avg Sell` | Average selling price for the product in the period. Derived from velocity metrics to avoid mix distortions. | `$ Velocity / Unit Velocity`  | Walmart, Sam's Club, Kroger, Costco |

---

## Markdowns

| KPI / Measure           | Definition                                                                                  | General Formula                        | Retailers           |
| ----------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------- | ------------------- |
| `$ Markdowns`           | Total markdown amount (discounts/promotions) applied to the product in the current period.  | `SUM(Markdown Amount This Year)`       | Walmart, Sam's Club |
| `% Markdown`            | Markdowns as a percentage of total sales in the current period.                             | `$ Markdowns / $ Sales`                | Walmart, Sam's Club |
| `% Last Year Markdown`  | Markdowns as a percentage of sales in the same period of the prior year.                    | `$ Markdowns LY / $ Sales LY`          | Sam's Club          |
| `Point Change (Markdown)` | Change in percentage points of `% Markdown` between the current and prior year.          | `% Markdown TY – % Markdown LY`        | Sam's Club          |

---

## Distribution — Stores & Warehouses
 
> "Stores" is the term used by Walmart, Sam's Club, Kroger, and ABSCO. Costco uses "Warehouses" for the equivalent concept. KPIs below apply to both unless a retailer is explicitly listed.
 
| KPI / Measure         | Definition                                                                                                                                 | General Formula                                                       | Retailers                                  |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- | ------------------------------------------ |
| `Total Stores`        | Total stores (or warehouses, for Costco) authorized to carry the product via active planogram or listing, regardless of whether they sold. | `SUM(Authorized Store Count)`                                         | Walmart, Sam's Club, Costco, ABSCO         |
| `Stores Selling`      | Stores (or warehouses) that recorded at least one sale of the product in the period.                                                       | `COUNT(stores where Sales > 0)`                                       | Walmart, Sam's Club, Kroger, Costco, ABSCO |
| `Stores Not Selling`  | Authorized stores (or warehouses) that recorded no sales in the period. Basis for the Opportunity Loss calculation.                        | `Total Stores – Stores Selling`                                       | Walmart, Kroger, Costco, ABSCO             |
| `Stores Not Yet Sold` | Stores where the product has never been introduced. Implementation varies by retailer — see note below.                                    | `Total Stores – DISTINCT COUNT(stores that have ever sold the SKU)`   | Walmart, Kroger                            |
| `% Stores Selling`    | Percentage of authorized stores (or warehouses) that are actively selling the product.                                                     | `Stores Selling / Total Stores`                                       | Kroger, Costco                             |
| `Stores Change`       | Change in authorized store count between the current and prior year.                                                                       | `Total Stores TY – Total Stores LY`                                   | Walmart, Sam's Club                        |
| `LY Stores Selling`   | Number of stores that sold the product in the same period of the prior year.                                                               | `COUNT(stores where Sales > 0, LY)`                                   | Sam's Club, ABSCO                          |
 
> **Note — `Stores Not Yet Sold` implementation by retailer:**
> - **Walmart**: stores within authorized DCs where `POS Sales = 0` for the entire history of the SKU.
> - **Kroger**: `DISTINCT COUNT` of stores that have never appeared with a sale in the `INVENTORY` table for the given SKU. There is no explicit "authorized" flag — absence of any sales record is the proxy.
---

## Market Share

| KPI / Measure                          | Definition                                                                                                              | General Formula                                                          | Retailers      |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | -------------- |
| `% Dollar Share of Category / Segment` | Product's percentage share of total dollar sales in its category or segment. Measures the item's representativeness in the mix. | `($ Sales Item / $ Sales Total Category) × 100`                  | Kroger, Costco |
| `% Unit Share of Category / Segment`   | Product's percentage share of total units sold in its category or segment.                                              | `(Unit Sales Item / Unit Sales Total Category) × 100`                    | Kroger, Costco |
| `% Dollar Share of Subcategory`        | Product's percentage share of dollar sales within its subcategory. Calculated when subcategory data is available.       | `($ Sales Item / $ Sales Total Subcategory) × 100`                       | Costco         |

---

## Growth Opportunity

| KPI / Measure                       | Definition                                                                                                                                                                          | General Formula                                  | Retailers              |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ---------------------- |
| `Opportunity Loss (Current Stores)` | Estimated unrealized revenue in stores that carry the product but recorded no sales in the period. Calculates how much could have been sold had those stores performed at average velocity. | `$ Velocity × COUNT(Stores Not Selling)`     | Walmart, Kroger, Costco, ABSCO |
| `Opportunity Loss (Additional Stores)` | Estimated potential revenue if the product were expanded to stores where it is not yet listed. Represents the distribution expansion upside.                                    | `$ Velocity × COUNT(Stores Not Yet Sold)`        | Kroger                 |

---

## Glossary

| Term                              | Definition                                                                                                                              |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `TY` (This Year)                  | Data from the current period (current year or current week).                                                                            |
| `LY` (Last Year)                  | Data from the same period in the prior year. Also referenced as YA / YAGO.                          
| POS (Point of Sale)               | Sales recorded at the store checkout (item scan at register). Source for all sales metrics in this dictionary. |
| Velocity                          | Per-point-of-sale performance metric — normalizes sales by the number of active stores, enabling comparisons regardless of network size. |
| Stores Selling / Warehouses Selling | Stores or warehouses with at least one recorded sale in the period.                                                                   |
| Stores Not Selling                | Authorized stores with no sales in the period — basis for Opportunity Loss.                                                             |
| Stores Not Yet Sold               | Stores without an active product listing — represent distribution expansion potential.                                                  |
| Opportunity Loss                  | Estimated unrealized revenue, calculated by multiplying Velocity by the number of stores with no sales.                                 |
| Planogram / POG                   | Product shelf placement plan; determines the stores authorized to sell the SKU.                                                         |
| Markdown                          | Discount or price reduction applied by the retailer. Measured as an absolute value ($) and as a percentage of sales.                   |
| DC (Distribution Center)          | Regional distribution center — used as the aggregation unit in Walmart and Sam's Club.                                                  |
| Warehouse                         | Costco warehouse — functional equivalent of a "store" for velocity and distribution calculations.                                       |
| SKU (Stock Keeping Unit)          | Unique product identifier.                                                                                                              |
| % Share                           | Product's percentage share within a category, segment, or subcategory.                                                                  |
