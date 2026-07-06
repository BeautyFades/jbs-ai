# Kroger Project Knowledge Transfer

OBS: o texto abaixo foi desenvolvido por Khrystyna, antes de iniciarmos nossa atuação. Portanto, o que a BIX faz pode sobrescrever o que está aqui.

---

## Business Stakeholder:  

Zachary Zachary.Fendley@jbssa.com 

## Dashboard design: 

Reports in Qlik Sense are mostly pivot tables following the Kroger UI. 

Zach doesn’t need visualizations for raw data, as he uses some formulas on top of the downloaded data for his reports. 

## Reports:

1.Link to Zach’s reports  

Link to Zach's excel reports: [Kroger Vel tracker 1.xlsx ](https://jbsusafoodcompany-my.sharepoint.com/:x:/g/personal/zfendley_jbssa_com/EQGqBZFcIfNLgkeSgTVxWzsB5CQr7zS4B6Q_RfVi42HSUw?e=w9LQQm)

2. Reports list to download:  

  Trends = sales_weekly_detailed DB table 
  Store Item = inventory DB table 
  Daily Store Matix = sales_daily DB table 

 All the reports are being created for 2 categories - 059 and 701. 

 <img width="520" height="385" alt="image" src="https://github.com/user-attachments/assets/59c18a97-3223-483b-8e7f-0d712fe5142b" />

3. Trends report:

- Selling Current – used in Kroger Performance Tracker report, formula for Units per Store Selling.
- Selling YAGO – same as above. Sometimes Zach looks at the YoY trends.
- Time Period – used for filtering in Kroger Performance Tracker. It would be beneficial to add quick filters like 4 weeks, 13 weeks, etc.
- Brand – user-friendly brand name. Manual mapping to Manufacturer Description. Used for filtering in Kroger Performance Tracker.
- Internal Description – user-friendly categorisation of chicken. This is how Zach team calls these products in their conversations. Manual mapping based on Item Description. Used for filtering in Kroger Performance Tracker.
- UPC – no need for manual mapping anymore as we can download this filed from the platform. At the time Zach created his excel file he didn't use UPCs, now he does so he decided to do a manual mapping instead of getting this data from Kroger.
- Lightly Breaded – current focus of his team, but in the future, it is likely that they will need to track some other product types. We can call this column Breading or Coating Type. Used as filter in Kroger Performance Tracker report.

4. Store Item Status report:

- Customer – manual mapping based on Item Description.  Used for Item Status table in Velocity tab.
- Concat – concatenation of Division, Store and Item Description. It seems like this one is not being used.
- Organisation – SKU ID and Internal Description. Used for Item Status table in Velocity tab.
- Planogram – marks if there is a planogram or no.
- Status – displays store item status based on a few fields. Used in Velocity report to display a number of stores with different issues to explain changes in velocity.

5. Daily Store Matrix report:

- SKU – same as organisation column in Store Item report. Used in a pivot table for Velocity report (tab 'breakout').
- Week number – number of the week when the sale occurred (Zach receives data on daily level and then aggregates it to week).
- Week beginning – start date of the week, based on week number. Used in a pivot table for Velocity report (tab 'breakout').
- Concat – division + SKU column. Used in a pivot table for Velocity report (tab 'breakout').
- Customer - same as in Store Item report. Used as a filter for pivot table for Velocity report (tab 'breakout').
- Concats and facing – need to check, probably not used any more.

## Data Integration into Snowflake:

1. Data for Zach's reports is being loaded into Snowflake via a bot. The bot downloads data from the On Demand platform and uploads it to the SRC_EXTERNAL.KROGER schema in Snowflake.

2. Bots Schedule:
 - Trends - Runs every Monday at 10 am
 - Store Item - Daily at 8:30 am
 - Store Matrix - Daily at 9:00 am

3. ETL Details:
   - Trends: available time periods: YTD aggregate data (updated weekly), weekly data (previous week data is appended every week).
   - Store Item: in Kroger this report is a snapshot of the previous day store data, but Zach wants to keep historical data as well (e.g. he wants to analyze if there are any patterns – like there are more out of stock items on some day, etc.). So we download the data daily and mark each snapshot of data with a previous day timestamp.
   - Daily Store Matrix: Report has daily granularity. Historical data has been loaded since 01.01.2025. We do incremental load of last 3 days.
  
## DB Design:

1. Data from Daily Store Matrix, Store Item Status, and Trends reports is loaded into Snowflake. 
2. Tables in the Kroger gold layer (Sales_Daily, Sales_Weekly_Detailed, Inventory, Brand_Mapping, Products) are updated with the loaded data for 504 and 578 commodities.
3. The following mapping is added in the Brand mapping table: PLMRS = Wendy’s, BFMSTR CTT = Adaptables
4. In the Products table some additional logic is added:
   - If Manufacturer Description = “BFMSTR CTT” and Item Description starts with “WENDYS”, then Brand = Wendy’s
   - If Manufacturer Description = “BFMSTR CTT” and Item Description doesn’t start with “WENDYS”, then Brand = Adaptables 

5. Data from Daily Store Matrix, Store Item Status, and Trends reports is loaded into Snowflake.
6. Tables in the Kroger gold layer (Sales_Daily, Sales_Weekly_Detailed and Inventory) are updated with the loaded data for 552 commodity.

## Qlik Sense Dashboard requirements:

1. Mockup:

<img width="1013" height="682" alt="image" src="https://github.com/user-attachments/assets/37de5b80-d7f2-431f-848d-9cf61772c105" />

2. User must be able to filter the data:
   - By brands - Total (all 3 JBS brands, Just Bare, Pilgrim’s, Country Pride).
   - By division (not shown on the mockup).
  
3. User must be able to review a weekly trend for the following measures: 
   - $ Velocity = Sum of Scanned Dollars/ Stores Selling
       - Scanned Dollars (from Daily store matrix report, in DW called Sales Daily).
       - Selling Stores = AVG # of Stores with a Planogram for that SKU (from Store Item Status = in DW Inventory table).
   - % Share of Category = (SKU Scanned Dollars/ Total Category Scanned Dollars) * 100. Calculate it on a daily level and then aggregate to a week. If data for some days is missing in the Inventory table then exclude this day from calculation, it shouldn't show as 0 not to mess up the average.
   - Unit Velocity = Sum of Scanned Units/Stores Selling
   - % Share of Category =(SKU Scanned Units/ Total Category Scanned Dollars) * 100. Calculate it on a daily level and then aggregate to a week.
   - Average Price = $ Velocity/Unit Velocity
   - % Stores Selling = 1 - (Stores Not Selling/Stores Selling)
   - Stores Sold = Weekly AVG of all stores (selling and not selling)
   - Stores Selling = weekly avg of stores with Selling status in Inventory table
   - Stores Not Selling = weekly avg of stores with the following statuses - Out of Stock, Plannogram Never Sold, In Stock/Not Selling, BOH Issue. Use Status column in the Inventory table.
   - Weekly avg of stores with Plannogram and the following statuses - Out of Stock, Plannogram Never Sold, In Stock/Not Selling, BOH Issue
   - Opportunity Loss (Current Stores) = Stores Not Selling count * $ velocity
   - Stores not yet sold = distinct count of stores where we do not sell this SKU.
   - Opportunity Loss (Additional Stores) = Stores Not Yet Sold count * $ velocity
  
4. Conditional formatting is applied to the following rows: unit velocity, % stores selling, opportunity loss (current stores), opportunity loss (additional stores).

## DBT Models

Short description: This model set builds Kroger store-level reporting outputs for inventory, store matrix, weekly sales detail, and supporting SKU/brand mappings, excluding all product-mapping logic.

Flow (high level):  
- stg_kroger__store_item_* -> stg_kroger__store_item_all -> stg_kroger__item_hist -> int_kroger__inventory_unioned -> fct_kroger__inventory
- stg_kroger__store_matrix_* + stg_kroger__store_matrix_hist -> int_kroger__store_matrix_unioned -> fct_kroger__store_matrix
- stg_kroger__trends_* + stg_kroger__trends_hist -> fct_kroger__sales_weekly_detailed
- stg_kroger__brand_mapping -> int_kroger__brand_mapping -> dim_kroger__brand_mapping
- stg_kroger__sku_mapping + stg_kroger__map + stg_kroger__sap_master_material -> int_kroger__sku_mappings_enriched -> dim_kroger__sku_mapping

### Model files:
| Model File | Layer | Description | Source |
|---|---|---|---|
| dim_kroger__brand_mapping.sql | Mart | Final brand mapping dimension table for Kroger | Derived (PILGRIMS (DATAIKU) + SRC_EXTERNAL) |
| dim_kroger__sku_mapping.sql | Mart | Final SKU-to-product mapping dimension with product info | Derived (PILGRIMS (DATAIKU) + SRC_EXTERNAL + SRC_SAP_FVT) |
| fct_kroger__inventory.sql | Mart | Final inventory fact table for store-level analytics | Derived (PILGRIMS (DATAIKU) + SRC_EXTERNAL) |
| fct_kroger__sales_weekly_detailed.sql | Mart | Final weekly detailed sales fact for trends reporting | Derived (PILGRIMS (DATAIKU) + SRC_EXTERNAL) |
| fct_kroger__store_matrix.sql | Mart | Final daily store-matrix fact for sales and store coverage | Derived (PILGRIMS (DATAIKU) + SRC_EXTERNAL) |
| int_kroger__brand_mapping.sql | Intermediate | Merges existing brand mappings with unmapped manufacturers | Derived (PILGRIMS (DATAIKU) + SRC_EXTERNAL) |
| int_kroger__inventory_unioned.sql | Intermediate | Unions current and historical inventory and standardizes columns | Derived (PILGRIMS (DATAIKU) + SRC_EXTERNAL) |
| int_kroger__sku_mappings_enriched.sql | Intermediate | SKU mapping enriched with SAP material and mapping references | Derived (PILGRIMS (DATAIKU) + SRC_EXTERNAL + SRC_SAP_FVT) |
| int_kroger__store_matrix_unioned.sql | Intermediate | Unions store-matrix feeds across source partitions | Derived (PILGRIMS (DATAIKU) + SRC_EXTERNAL) |
| stg_kroger__brand_mapping.sql | Staging | Raw Kroger brand mapping source data | PILGRIMS (DATAIKU) |
| stg_kroger__item_hist.sql | Staging | Historical Kroger inventory item records | PILGRIMS (DATAIKU) |
| stg_kroger__map.sql | Staging | Kroger map and reference attributes used in SKU enrichment | PILGRIMS (DATAIKU) |
| stg_kroger__sap_master_material.sql | Staging | SAP master material attributes for Kroger mappings | SRC_SAP_FVT |
| stg_kroger__sku_mapping.sql | Staging | Raw Kroger SKU mapping records | PILGRIMS (DATAIKU) |
| stg_kroger__store_item_504.sql | Staging | Store-item feed partition 504 (beef grinds) | New SRC_EXTERNAL |
| stg_kroger__store_item_552.sql | Staging | Store-item feed partition 552 (frozen chicken) | New SRC_EXTERNAL |
| stg_kroger__store_item_578.sql | Staging | Store-item feed partition 578 (bacon) | New SRC_EXTERNAL |
| stg_kroger__store_item_59.sql | Staging | Store-item feed partition 59 (frozen prep chicken) | New SRC_EXTERNAL |
| stg_kroger__store_item_701.sql | Staging | Store-item feed partition 701 (non-frozen chicken) | New SRC_EXTERNAL |
| stg_kroger__store_item_all.sql | Staging | Unioned staging model across all store-item partitions | Derived (New SRC_EXTERNAL) |
| stg_kroger__store_matrix_504.sql | Staging | Store-matrix feed partition 504 | New SRC_EXTERNAL |
| stg_kroger__store_matrix_552.sql | Staging | Store-matrix feed partition 552 | New SRC_EXTERNAL |
| stg_kroger__store_matrix_578.sql | Staging | Store-matrix feed partition 578 | New SRC_EXTERNAL |
| stg_kroger__store_matrix_59.sql | Staging | Store-matrix feed partition 59 | New SRC_EXTERNAL |
| stg_kroger__store_matrix_701.sql | Staging | Store-matrix feed partition 701 | New SRC_EXTERNAL |
| stg_kroger__store_matrix_hist.sql | Staging | Historical Kroger store-matrix records | PILGRIMS (DATAIKU) |
| stg_kroger__trends_504.sql | Staging | Weekly sales trends feed partition 504 | New SRC_EXTERNAL |
| stg_kroger__trends_552.sql | Staging | Weekly sales trends feed partition 552 | New SRC_EXTERNAL |
| stg_kroger__trends_578.sql | Staging | Weekly sales trends feed partition 578 | New SRC_EXTERNAL |
| stg_kroger__trends_59.sql | Staging | Weekly sales trends feed partition 59 | New SRC_EXTERNAL |
| stg_kroger__trends_701.sql | Staging | Weekly sales trends feed partition 701 | New SRC_EXTERNAL |
| stg_kroger__trends_hist.sql | Staging | Historical Kroger weekly trends records | PILGRIMS (DATAIKU) |

## Current State:

1. Fully implemented ETL, bot and Qlik Sense Dashboard 
2. Historical data started from 2022 uploaded into Snowflake.   
3. Dashboards are loading for quite a long time, and the reason is the non-optimal data, that needs to be improved.   
