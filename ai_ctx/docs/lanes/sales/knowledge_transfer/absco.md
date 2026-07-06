# ABSCO Project Knowledge Transfer

OBS: o texto abaixo foi desenvolvido por Khrystyna, antes de iniciarmos nossa atuação. Portanto, o que a BIX faz pode sobrescrever o que está aqui.

--- 

## Dashboard Design

<img width="1073" height="496" alt="image" src="https://github.com/user-attachments/assets/c7144a9e-1ce4-4094-b824-0bd6fc27198a" />

## Reports

1. Link to Zach’s Report [ABSCO Velocity 7.xlsx](https://jbsusafoodcompany.sharepoint.com/:x:/s/MarketDataIntegration/IQAWVkUWbGqkSIIw1m3HWfPfAdiBzmagxsQDHPBAzHYn7sc?e=gsrhOs)

2. Report ABSCO_PERF_TRACKER_SF_DATAPULL Dec 2025 should be downloaded every week. I’s available from the Jacob’s account:

  <img width="1129" height="369" alt="image" src="https://github.com/user-attachments/assets/4ecef4cf-084f-42ac-9ae7-e1e297dc7943" />

  <img width="1136" height="349" alt="image" src="https://github.com/user-attachments/assets/76e13c3a-3d7b-4b76-a5ab-c31e151e03b9" />

3. Folder with historical data: [Data extracts](https://jbsusafoodcompany.sharepoint.com/:f:/s/MarketDataIntegration/IgDbrXp_IX38RqWh57U8BGv_ARSlKd0HRAAtDTRriPFVRLU?e=DRGBMC)

## DB Design:

1. Next fields need to be added to the golden layer table:

| Field in DB | How to get from the report | DBT Model |
|---|---|---|
| ABSCO_ITEM_NAME | Parse from Product | fct_absco_sales |
| ABSCO_ITEM_NUMBER | Parse from Product | fct_absco_sales |
| ABSCO_LOCATION | Geography | fct_absco_sales |
| ABSCO_DIVISION | Store_Division | fct_absco_sales |
| ABSCO_BRAND | Get from the Product Name | fct_absco_sales |
| ABSCO_SALES_THIS_YEAR | Sales: Retail Units | fct_absco_sales |
| ABSCO_UNIT_SALES_LAST_YEAR | Get Sales: Retail Units from the last year report | fct_absco_sales |
| ABSCO_STORE_SALE_THIS_YEAR | Store Scan | fct_absco_sales |
| ABSCO_STORE_SALE_LAST_YEAR | Get Store Scan from the Last Year | fct_absco_sales |
| ABSCO_TOTAL_STORES | POG Auth: # Stores | fct_absco_sales |
| ABSCO_STORES_NOT_YET_SOLD | Calculate (POG Auth: # Stores - Stores Scan) | fct_absco_sales |

2. To group and filter out the Analytics Dashboard we will use next fields:

| Field in DB | How to get from the reports | DBT Model |
|---|---|---|
| ABSCO_LOCATION | Geography | dim_absco__product_location |
| ABSCO_DIVISION | Store_Division | dim_absco__product_location |
| ABSCO_BRAND | Get from the Product Name | dim_absco__product_location |
| ABSCO_ITEM_NAME | Parse from Product | dim_absco__product_location |
| ABSCO_ITEM_NUMBER | Parse from Product | dim_absco__product_location |

## Data Integration into Snowflake

1. Data for Zach's reports is being loaded into Snowflake via a bot. The bot downloads data from the Unify+ platform and uploads it to the SRC_EXTERNAL.ABSCO schema in Snowflake.
2. ETL Schedule: Sales report updated every Tuesday by 15:45 AM Central Time (CT).  
*If ABSCO platform is down at that moment, the system will re-try to download the report on the next day, max amount of retries – 3.

## Qlik Sense Dashboard requirements: 

1. Dashboard design:

  🟩 - Directly from DB 
  🟦 - Calculated 

  | Measures | Description | Calculations | DB field |
  |---|---|---|---|
  | Product | Product Name | 🟦 Parse from Product | 🟦 ABSCO_ITEM_NAME |
  | UPC | Product UPC | 🟦 Parse from Product | 🟦 ABSCO_ITEM_NUMBER |
  | Unit Sales | Unit Sales per week | 🟩 Sum (Sales: Retail Units) | 🟩 SUM (ABSCO_SALES_THIS_YEAR) |
  | Last Year Unit Sales | Last Year's unit sales per week | 🟦 Get from the report 1-year ago | 🟦 SUM (ABSCO_SALES_LAST_YEAR) |
  | Unit Velocity | Unit Sales per store per week | 🟦 SUM Unit Sales / SUM Stores Selling |🟦 SUM (ABSCO_SALES_THIS_YEAR) / SUM (ABSCO_STORE_SALE_THIS_YEAR) |
  | Last Year Unit Velocity | Last Year Unit Sales per store per week | 🟦 Get from the report 1-year ago | 🟦 SUM (ABSCO_SALES_LAST_YEAR) / SUM (ABSCO_STORE_SALE_LAST_YEAR) |
  | Total Stores | Total Amount of ABSCO stores | 🟩 SUM (POG Auth: # Stores) | 🟩 SUM (ABSCO_TOTAL_STORES) |
  | LY Total Stores | Last Year Total Amount of ABSCO stores | 🟦 Get from the last year's report | 🟦 SUM (ABSCO_TOTAL_STORES_LAST_YEAR) |
  | Stores Selling | Number of stores that have sales specific product during the week | 🟩 SUM (Stores Scan) | 🟩 SUM (ABSCO_STORE_SALE_THIS_YEAR) |
  | LY Stores Selling | Last Year Number of stores that have sales specific product during the week | 🟦 Get from the last year's report | 🟦 SUM (ABSCO_STORE_SALE_LAST_YEAR) |
  | Stores Not Yet Sold | Stores that have no sales this week | 🟦 Calculate (POG Auth: # Stores - Stores Scan) | 🟦 SUM (ABSCO_TOTAL_STORES) - SUM (ABSCO_STORE_SALE_THIS_YEAR) |
  | Opportunity Loss Units | Amount of dollars lost, because there were no sales in specific stores | 🟦 Calculate (SUM Stores Not Yet Sold * Unit Velocity) | — |

2. Dashboard filters:
   Next filters will be applied to the dashboard:
   - Brand
   - Product
   - Location (geography)
   - Division

# Current State

1. ABSCO reports data is loaded into Snowflake every week via Bot, that runs in Automation Anywhere. ETL configured.
2. Historical data started from 2022 uploaded into Snowflake.
3. Qlik Sense development wasn’t started.
