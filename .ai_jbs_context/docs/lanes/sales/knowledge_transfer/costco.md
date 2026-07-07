# Costco Project Knowledge Transfer

OBS: o texto abaixo foi desenvolvido por Khrystyna, antes de iniciarmos nossa atuação. Portanto, o que a BIX faz pode sobrescrever o que está aqui.

--- 

## Business stakeholders:  

Zachary Zachary.Fendley@jbssa.com

## Reports:  

1. [Link to Zach’s report](https://jbsusafoodcompany.sharepoint.com/:x:/r/sites/MarketDataIntegration/_layouts/15/Doc.aspx?sourcedoc=%7B2A971EC5-C116-48F1-A702-34252DBD4CB9%7D&file=Costco%20Trends%20Tracker%201.xlsx&action=default&mobileredirect=true) 
2. List of Reports to download:  
    - SEGMENT_SF_DATAPULL
    - ITEMS_SF_DATAPULL
    - SUBCATEGORY_SF_DATAPULL
  
      <img width="1252" height="656" alt="image" src="https://github.com/user-attachments/assets/c1b40763-10bf-4131-a786-c46fe1c0e445" />

3. RAW data folder [Data Exports](https://jbsusafoodcompany.sharepoint.com/:f:/s/MarketDataIntegration/IgA2weB2wCisSpmj-6oAAfV_AcB8RneFuX5zsQ3v6-IfMfY?e=afznB7)

## Data Integration into Snowflake

 1. Data for Zach's reports is being loaded into Snowflake via a bot. The bot downloads data from the Unify+ platform and uploads it to the SRC_EXTERNAL.COSTCO schema in Snowflake.
 2. ETL Schedule: Sales report updated every Tuesday by 15:45 AM Central Time (CT). If COSTCO platform is down at that moment, the system will re-try to download the report on the next day, max amount of retries – 3.

## Qlik Sense Dashboard requirements:

1. Dashboard design: *no mockup provided by Khrystyna*
2. User must be able to filter the data:
  - By region.
  - By product (instead of long item names use product short name from Costco Product Mapping table).  
3. User must be able to see only latest 26 weeks of data and only the products from the product mapping table. 
4. The report must include the following dimensions:
  - Segment (instead of Commodity for Kroger)
  - Product (short product name) 
5. The report must include the following measures:
  - $ Velocity = Sum of Dollar Sales/ Sum of Warehouses Selling
  - % Dollar Share of Segment = (Item Dollar Sales/ Total Segment Dollar Sales) * 100. Calculate only for items that belong to Segment A - Breaded Chicken, since for other segments we do not have the data.
  - Unit Velocity = Sum of Unit Sales/ Sum of Warehouses Selling
  - % Unit Share of Segment = (Item Unit Sales/ Total Unit Dollar Sales) * 100. Calculate only for items that belong to Segment A - Breaded Chicken, since for other segments we do not have the data.
  - Price = $ Velocity/Unit Velocity
  - % Warehouses Selling = 1 - (Warehouses Selling /Warehouses Sold)
  - Warehouses Sold = sum of all warehouses selling and not selling.
  - Warehouses Selling = sum of Warehouses with dollar sales = 0
  - Warehouses Not Selling = sum of Warehouses with 0 dollar sales.
  - Opportunity Loss (Current Stores) = Warehouses Not Selling count * $ velocity

## Current State

1. Costco Data Warehouse, Qlik Sense dashboard and bot was implemented.
2. Historical data started from 2022 uploaded into Snowflake.
3. Fixes to be implemented:
   3.1. Currently we have an issues with % Dollar Share of Segment calculations. We are limited by subscription and have data only for the part of segments, so that for the products inside the segment without the data - calculations are inaccurate. The decision was made to add the calculations and use subcategory dollar sales instead of segments. Therefore:
         3.1.1. Need to change the calculations for Dollar Share of Segment. We will calculate this field and show the results only in case if the information about the Segment is available.
         3.1.2. Need to add another field Dollar Share of Subcategory. Values will be calculated by formula. % Dollar Share of Subcategory = (Item Dollar Sales/ Total Subcategory Dollar Sales) * 100. It should be calculated only when the Subcategory information is present for the product.
   3.2. Need to provide research to merge the data from Subcategories and Segment reports.   
