# Sam's Project Knowledge Transfer

OBS: o texto abaixo foi desenvolvido por Khrystyna, antes de iniciarmos nossa atuação. Portanto, o que a BIX faz pode sobrescrever o que está aqui.

--- 

## Business stakeholders: 

Tiffany Myrick (Category Director, Pilgrim's) — Tiffany.Myrick@pilgrims.com 

## Dashboard design: 

<img width="737" height="595" alt="image" src="https://github.com/user-attachments/assets/835b61c9-d23e-4c29-94b3-7dcdfa86c633" />

## Reports:

1. Link to Tiffany’s Reports [Tiffany's reports](https://jbsusafoodcompany.sharepoint.com/:f:/s/MarketDataIntegration/IgAx1GEm-9B5T4bVucyH9Ze4AWVVbwczlACJOMwKzLFcbng?e=HGPgPg)
2. All the reports shared by Tiffany in Unify+ should be downloaded into Snowflake.
3. There are 3 Sales reports by categories, collected by business stakeholder:
  -  [Fresh](https://jbsusafoodcompany.sharepoint.com/:x:/s/MarketDataIntegration/IQBY7MYP_MCnRZEawyi4nJoVATwcml1__tLph154L8IYa8Q?e=tyybPg)
  -  [Frozen](https://jbsusafoodcompany.sharepoint.com/:x:/s/MarketDataIntegration/IQBY7MYP_MCnRZEawyi4nJoVATwcml1__tLph154L8IYa8Q?e=tyybPg)
  -  [Rotisserie](https://jbsusafoodcompany.sharepoint.com/:x:/r/sites/MarketDataIntegration/_layouts/15/doc2.aspx?sourcedoc=%7Bd045b3eb-7b98-4dc9-bbf5-84acf9eacf8f%7D&action=edit&activeCell=%27RECAP%20BY%20DC%27!H6&wdinitialsession=f34f0cfb-fff4-a278-fb23-8f9358d740fb&wdrldsc=5&wdrldc=1&wdrldr=AccessTokenExpiredWarningUnauthenticated%2CRefreshin)
4. RAW data reports, downloaded from Unify+ (Folder [Raw Data from Sam's](https://jbsusafoodcompany.sharepoint.com/:f:/s/MarketDataIntegration/IgBqk2ba49HHT6nwz9QIXpsQAXdvS4E08JA5hwYi-7aFLXY?e=neUamn)):
  - [Fresh](https://jbsusafoodcompany.sharepoint.com/:x:/s/MarketDataIntegration/IQCqZbi86UDFT7U9WlQBz76CAaG2XMY5FVHNeiz4HpvcGSg?e=uTIYCc)
  - [Frozen](https://jbsusafoodcompany.sharepoint.com/:x:/s/MarketDataIntegration/IQAZCQnmU7O5Q7SU-uyBX85aATqLQ4GtRQJpMk5RJxzsy4Y?e=B8kpRS)
  - [Rotisserie](https://jbsusafoodcompany.sharepoint.com/:x:/s/MarketDataIntegration/IQBpbWKLrUVbSKOOce93Cjy3AbRLxJKon_kl-cEVs35kKRs?e=mPdhKG)

## DB Design:

1. Next fields need to be added to the golden layer table:

| Field in DB | How to get from the report | DBT Model |
|---|---|---|
| SAMS_ITEM_NAME | Parse from Item_Description | fct_sams__sales_weekly |
| SAMS_ITEM_NUMBER | Parse from Item_Number | fct_sams__sales_weekly |
| SAMS_LOCATION | Geography | fct_sams__sales_weekly |
| SAMS_DC | Club | fct_sams__sales_weekly |
| SAMS_CATEGORY | *Calculated — Depends on the file from which the data comes: 79 - Deli Wog Report - TM - "Rotisserie"; Frozen Weekly Updated - "Frozen"; 93 - FRESH MEAT REPORT - TM "Fresh" | fct_sams__sales_weekly |
| SAMS_ITEM_GROUP | *Calculated — Get from SAP_MASTER_MATERIAL table, by Item Number in column PRODUCTHIERARCHYDESC_6 | fct_sams__sales_weekly |
| SAMS_DOLLAR_SALES_THIS_YEAR | Sales $ | fct_sams__sales_weekly |
| SAMS_DOLLAR_SALES_LAST_YEAR | Sales $ YA | fct_sams__sales_weekly |
| SAMS_UNIT_SALES_THIS_YEAR | Sales Unit Qty | fct_sams__sales_weekly |
| SAMS_UNIT_SALES_LAST_YEAR | Sales Unit Qty YA | fct_sams__sales_weekly |
| SAMS_STORE_SALE_THIS_YEAR | Clubs Selling | fct_sams__sales_weekly |
| SAMS_STORE_SALE_LAST_YEAR | Clubs Selling YA | fct_sams__sales_weekly |
| SAMS_MARKDOWNS_THIS_YEAR | Club Throwaway Retail $ | fct_sams__sales_weekly |
| SAMS_MARKDOWNS_LAST_YEAR | Club Throwaway Retail $ YA | fct_sams__sales_weekly |
| SAMS_PRICE | *Calculated — Sales$ / Sales Unit Qty | fct_sams__sales_weekly |

2. To group and filter out the Analytics Dashboard we will use next fields:

| Field in DB | How to get from the reports | DBT model |
|---|---|---|
| SAMS_LOCATION | Geography | dim_sams__location |
| SAMS_ITEM_GROUP | Filled from SAP_MATERIAL | dim_sams_item_group |
| SAMS_CATEGORY | Get from the file name | dim_sams_category |
| SAMS_ITEM_NAME | Parse from Product | dim_sams_item |
| SAMS_ITEM_NUMBER | Parse from Product | dim_sams_item |

- Short description: This model set builds Sam's Club weekly sales reporting outputs including fact, dimension, and forecast tables, sourced entirely from PILGRIMS (DATAIKU) storeleveldata feeds. 

- Flow (high level): stg_sams__frozen_weekly_updated
- stg_sams__fresh_meat_report_tm +-> int_sams__sales_weekly -> fct_sams__sales_weekly stg_sams__79_del_wog_report_tm / -> dim_sams__location -> dim_sams__date_week -> dim_sams_item -> dim_sams_item_group -> dim_sams_category

## Data Integration into Snowflake 

Data for Zach's reports is being loaded into Snowflake manually. 

## Qlik Sense Dashboard requirements: 

🟩 - Directly from DB 🟦 - Calculated

| Measures | Description | Calculations | DB field |
|---|---|---|---|
| $ Velocity | Dollar Sales per week | Values Sales$/Store Count | 🟦 |
| $ Last Year Velocity | Dollar Sales per week Last year | Values Sales$/Store Count for last year data | 🟦 |
| Unit Velocity | Unit velocity per week this year | Qty Sold/Store Count | |
| Last Year Unit Velocity | Unit velocity per week year ago | Qty Sold/Store Count for last year data | 🟦 |
| $ Sales | Dollar Sales per week | SUM(Sales $) | 🟩 SUM(SAMS_DOLLAR_SALES_THIS_YEAR) |
| $ Last Year Sales | Dollar Sales per week Last year | SUM(Sales YA $) | 🟩 SUM(SAMS_DOLLAR_SALES_LAST_YEAR) |
| $ Sales Change | Difference between this year and last year | SUM(Sales $) - SUM(Sales YA $)/ SUM(Sales $) - SUM(Sales YA $)/ | 🟦 |
| Unit Sales | Unit Sales per week | SUM(Sales Unit Qty) | 🟩 SUM(SAMS_UNIT_SALES_THIS_YEAR) |
| Last Year Unit Sales | Last Year's unit sales per week | SUM(Sales Unit Qty YA) | 🟩 SUM(SAMS_UNIT_SALES_LAST_YEAR) |
| % Unit Sales Change | Changes in Unit sales in comparison with previous year | (SUM(Sales Unit Qty) - SUM(Sales Unit Qty YA))/SUM(Sales Unit Qty YA) | 🟦 |
| % Markdowns | This year Markdown in dollars | SUM(Club Throwaway Retailer)/ SUM(Sales $) | 🟩 SAMS_MARKDOWNS_THIS_YEAR |
| % Last Year Markdown | Markdown in % | SUM(Club Throwaway Retailer)/ SUM(Sales $) | 🟩 SAMS_MARKDOWNS_LAST_YEAR |
| Point change | Change in Markdowns | % Markdowns - % Last Year Markdowns | 🟦 |
| TY Avg Sell | This Year Average Sell | SUM(Dollar Sales Per Club Selling)/SUM(Unit Sales Per Club Selling) | 🟦 |
| LY Avg Sell | Last Year Average Sell | SUM(Dollar Sales Per Club Selling YA)/SUM(Unit Sales Per Club Selling YA) | 🟦 |
| Stores Selling | Amount of stores selling this week this year | Sum of Clubs Selling | 🟩 SUM(SAMS_STORE_SALE_THIS_YEAR) |
| LY Stores Selling | Amount of stores selling this week this year | Sum of Clubs Selling for Last year report data | 🟩 SUM(SAMS_STORE_SALE_LAST_YEAR) |
| Stores Change | Difference between this and last years | Calculate with the previous year | 🟦 |
| Prices | Price calculations | Calculate $Sales/UnitSales | 🟦 |

### Dashboard filters:

Next filters will be applied to the dashboard:  

- DC
- Product
- Category
- Group

## Current State

1. ETL configured.
2. Historical data started from 2022 uploaded into Snowflake.
3. Bot development is blocked by solution to bypass the 2FA.
4. As bot is not configured – need to download and upload the reports for each week.
5. Qlik Sense development wasn’t started.
6. Every week on Tuesday data for the last week should be downloaded and updated in Snowflake accordingly.
7. Product mappings for Sam’s wasn’t finished.
8. SAMS_ITEM_GROUP wasn’t added within this version. Users need to manually map the Store UPC to Internal SKU in the Product Mappings Table, which we can use to get the Group data from the SAP_ MASTER_MATERIAL table, by Item Number in column PRODUCTHIERARCHYDESC_6. On this moment Business user have not this mapping.
9. Jacob’s account has not access rights to create a new report, - we are using shared from the Tiffany’s account.   
