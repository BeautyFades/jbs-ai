# Walmart Project Knowledge Transfer

OBS: o texto abaixo foi desenvolvido por Khrystyna, antes de iniciarmos nossa atuação. Portanto, o que a BIX faz pode sobrescrever o que está aqui.

--- 

## Business stakeholders: 

- Tiffany Myrick (Category Director, Pilgrim's) — Tiffany.Myrick@pilgrims.com
- Leah.Harpole@jbssa.com
- Tyler.Jarrett@pilgrims.com

## Dashboard Design:

<img width="837" height="679" alt="image" src="https://github.com/user-attachments/assets/d2fd4930-7ab3-4d85-b13e-76c361a345dc" />

## Reports:

1. [Link to Tiffany’s Reports Walmart](https://jbsusafoodcompany.sharepoint.com/:f:/s/MarketDataIntegration/IgAuWERrkgjQRK6BXEziDsozAXewOxrs0iwV1HtqhtTZo5k?e=Y2v9T1) 
2. Walmart operates on a specific fiscal calendar that differs from a standard Gregorian calendar. Here is the breakdown: The Walmart Week Cycle Start Day: Saturday (at 12:01 a.m.) End Day: Friday (at 11:59 p.m.) 
3. Schedule for all the reports is set up for Tuesday morning. All reports should be downloaded every week and data uploaded to Snowflake:   
  - YTD Sales n QTY All Dpts by Item
  - Forecast by Item all Items
  - All Depts Inventory Reports WTD_Lst4Wks
  - All Depts Instock by DC W 
4. Report “YTD Sales n Qty All Dpts by Item” is a sales report that is used for the Velocity Dashboard calculations. 
5. Folder with historical data [Data Export](https://jbsusafoodcompany.sharepoint.com/:f:/s/MarketDataIntegration/IgASD36NIwBST75o7HBTd4JtAYohy8hRJcv5j1DDMjP_z2M?e=EnxYUN)

## DB Design

1. Next fields need to be added to the golden layer table:

  | Field in DB | How to get from the report | DBT Model |
|---|---|---|
| WALMSA_DISTRIBUTION_CENTER_NUMBER | distribution_center_number | fct_walmart__sales |
| WALMSA_DOLLAR_PER_STR_SLS_WKDY_LY | dollar_per_str_with_sales_per_week_or_per_day_ty | fct_walmart__sales |
| WALMSA_DOLLAR_PER_STR_SLS_WKDY_TY | dollar_per_str_with_sales_per_week_or_per_day_ly | fct_walmart__sales |
| WALMSA_ITEM_NAME | item_name | fct_walmart__sales |
| WALMSA_ITEM_NUMBER | walmart_item_number | fct_walmart__sales |
| WALMSA_NAME_OF_THE_DC | name_of_the_dc | fct_walmart__sales |
| WALMSA_POS_QUANTITY_LAST_YEAR | pos_quantity_last_year | fct_walmart__sales |
| WALMSA_POS_QUANTITY_THIS_YEAR | pos_quantity_this_year | fct_walmart__sales |
| WALMSA_POS_SALES_LAST_YEAR | pos_sales_last_year | fct_walmart__sales |
| WALMSA_POS_SALES_THIS_YEAR | pos_sales_this_year | fct_walmart__sales |
| WALMSA_POS_STORE_COUNT_THIS_YEAR | pos_store_count_this_year | fct_walmart__sales |
| WALMSA_SI_TOTAL_MUMD_AMOUNT_THIS_YEAR | si_total_mumd_amount_this_year | fct_walmart__sales |
| WALMSA_UNITS_PER_STR_SLS_WKDY_TY | units_per_str_with_sales_per_week_or_per_day_ty | fct_walmart__sales |
| WALMSA_UNITS_PER_STR_SLS_WKDY_LY | units_per_str_with_sales_per_week_or_per_day_ly) | fct_walmart__sales |
| WALMSA_WEEK_ENDING_DATE | *Calculated: aligned with the Walmart fiscal calendar where weeks start on Saturday and end on Friday. The calculation consistently returns the Friday of the corresponding fiscal week from walmart_calendar_week | fct_walmart__sales |

2. To group and filter out the Analytics Dashboard we will use next fields:

| Field in DB | How to get from the reports | DBT model |
|---|---|---|
| WALMSA_DISTRIBUTION_CENTER_NUMBER | distribution_center_number | dim_walmart__distribution |
| WALMSA_NAME_OF_THE_DC | name_of_the_dc | dim_walmart__distribution |
| WALMSA_ITEM_NAME | item_name | dim_walmart__distribution |
| WALMSA_ITEM_NUMBER | walmart_item_number | dim_walmart__distribution |

## Data Integration into Snowflake 

Data for Tiffany's reports is being loaded into Snowflake Manually. 

## Qlik Sense Dashboard requirements: 

1. Dashboard design:

| Measures | Description | Calculations | DB field |
|---|---|---|---|
| $ Velocity | Dollar Sales per week | AVERAGE(dollar_per_str_with_sales_per_week_or_per_day_ty) | AVG(WALMSA_DOLLAR_PER_STR_SLS_WKDY_TY) |
| $ Last Year Velocity | Dollar Sales per week Last year | AVERAGE(dollar_per_str_with_sales_per_week_or_per_day_ly) | AVG(WALMSA_DOLLAR_PER_STR_SLS_WKDY_LY) |
| Unit Velocity | Unit velocity per week this year | AVERAGE(units_per_str_with_sales_per_week_or_per_day_ty) | AVG(WALMSA_UNITS_PER_STR_SLS_WKDY_TY) |
| Last Year Unit Velocity | Unit velocity per week year ago | AVERAGE(units_per_str_with_sales_per_week_or_per_day_ly) | AVG(WALMSA_UNITS_PER_STR_SLS_WKDY_LY) |
| $ Sales | Dollar Sales per week | SUM [pos_sales_this_year] | SUM (WALMSA_POS_SALES_THIS_YEAR) |
| $ Last Year Sales | Dollar Sales per week Last year | SUM (pos_sales_last_year) | SUM (WALMSA_POS_SALES_LAST_YEAR) |
| $ Sales Change | Difference between this year and last year | (SUM [pos_sales_this_year] – SUM (pos_sales_last_year) / SUM (pos_sales_last_year) | (SUM (WALMSA_POS_SALES_THIS_YEAR) – SUM (WALMSA_POS_SALES_LAST_YEAR) / SUM (WALMSA_POS_SALES_LAST_YEAR) |
| Unit Sales | Unit Sales per week | SUM(pos_quantity_this_year) | SUM(WALMSA_POS_QUANTITY_THIS_YEAR) |
| Last Year Unit Sales | Last Year's unit sales per week | SUM(pos_quantity_last_year) | SUM(WALMSA_POS_QUANTITY_LAST_YEAR) |
| $ Markdowns | This year Markdown in dollars | SUM(si_total_mumd_amount_this_year) | SUM (WALMSA_SI_TOTAL_MUMD_AMOUNT_THIS_YEAR) |
| % Markdown | Markdown in % | $Markdowns/$Sales | |
| Total Stores | Total Amount of stores | SUM(pos_store_count_this_year) | SUM(WALMSA_POS_STORE_COUNT_THIS_YEAR) |
| Stores Change | Difference between this and last years | Total Stores - Total Store Year Ago | |
| Stores Selling | Number of stores that have sales specific product during the week | SUM(Store Count in DCs with Sales > 0) | Check fields: WALMSA_POS_STORE_COUNT_THIS_YEAR, WALMSA_POS_SALES_THIS_YEAR |
| Stores Not Yet Sold | Number of stores that not selling the product | SUM(Store Count in DCs with Sales = 0) | Check fields: WALMSA_POS_STORE_COUNT_THIS_YEAR, WALMSA_POS_SALES_THIS_YEAR |
| Opportunity Loss | Amount of dollars lost, because there were no sales in specific stores | $Velocity * Stores_not_yet_sold | |

2. Dashboard filters: 
  Next filters will be applied to the dashboard:  
  - DC
  - Product
  - Category

## Current State

1. ETL configured.
2. Historical data started from 09/04/2025 uploaded into Snowflake.
3. Bot development is blocked by solution to bypass the 2FA.
4. Qlik Sense development wasn’t started.
5. Every week on Tuesday data for the last week should be downloaded and updated in Snowflake accordingly.
6. As Category field is specific for Walmart – it needs to be added to the Product mappings to be mapped manually.   
