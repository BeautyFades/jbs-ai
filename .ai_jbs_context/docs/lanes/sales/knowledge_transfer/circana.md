# Circana Knowledge Transfer

OBS: o texto abaixo foi desenvolvido por Khrystyna, antes de iniciarmos nossa atuação. Portanto, o que a BIX faz pode sobrescrever o que está aqui.

## Current Dashboards

In Qlik Sense Dev environment there are a few applications developed for Circana project: 

- [Main Circana Qlik app (based on UPC level data only)](https://qlikdev.jbssa.com/sense/app/569d94cf-bb8d-4ea1-adfc-d328a8567a99/overview)

- [Circana write-back tables app](https://qlikdev.jbssa.com/sense/app/11d0e914-58e7-4ffe-bcf3-00500751c303/overview)

  For better user experience the main Circana app has links to write-back tables in the navigation panel, but on the back-end those are two different applications. 

- [New Circana app (based on UPC and Brand-level data)](https://qlikdev.jbssa.com/sense/app/d6922a62-4f0c-4457-8900-1cbc01948644/overview)  

  This app was developed for data validating purposes after new Brand-level model has been received a few months ago. 

- [Chicken Category Development app](https://qlikdev.jbssa.com/sense/app/4186ca7e-3832-4dd9-9ecc-5a47e137a3bc/overview)

  This application is a copy of the Chicken CatDev sheet in the main Circana app. It was copied to later integrate this sheet to the GTM Consolidated App for demonstration purposes. Later when new mockups for Circana          project will be implemented, this application can be removed, and the new app should be mirrored to the consolidated app.

## New Dashboard Mockups

After new datasets for brand-level data were received and some changes happened in the business stakeholders’ team, the decision was made to redesign the main Circana app to meet the following goals: 

1. Unify Category Development dashboards into one. Previously each business – Chicken, Beef, Pork, Prepared Foods – had their own page in the application with slight differences in charts, but with the new approach all businesses should look at the data in the same way.
2. Incorporate brand and upc level datasets and fix the issue with data inconsistency (previously Qlik dashboard was built on UPC data, but stakeholders used aggregated data on category level).

See the tabs “Mockup Executive Dashboard” and “Mockup CatDev” in the file: [Circana Reports Analysis & Mockups.xlsx](https://jbsusafoodcompany.sharepoint.com/:x:/s/MarketDataIntegration/IQC5B8OtcSvwS4ucwRc72AJbAWDB26Wd7Fz4yBB8PJIsz_I?e=4Tn1mI)

Most of the charts in the mockups are already build in the old app which can be reused when building the new app according to new mockups. 

Current mockups are not extensive and do not cover the whole Circana project needs. Namely, a page covering specifically the UPC-level analysis could be added. 

The mockups have been approved by Dustin. 

## Data Integration into Snowflake

Raw Circana data is coming to a shared database in Snowflake called “EXT_SH_CIRCANAIRI_PROD”.   

Data is updated every 4 weeks incrementally: 

1. Brand-level DB. Each Monthly delivery includes the latest 185 single weeks. This means you will be receiving 4 new weeks with every delivery, as well as any refreshed data from the previous 181 single weeks.
2. UPC-level DB. This monthly update includes the latest 18 single weeks. This means you will be receiving 4 new weeks every delivery, as well as any refreshed data from the previous 14 single weeks.  

Additionally, UPC level data will receive historical updates 4 times a year. The schedule of updates can be clarified with our Circana representative Bill.Blake@circana.com. 

Upon data update in the “EXT_SH_CIRCANAIRI_PROD”, we’ve built an ETL process that further brings the data to “LEGACY_PPC.PPC_CIRCANA” schema. 

## CRMA/RMA Data Update 

Another process is happening for CRMA/RMA data. Upon every update in the “EXT_SH_CIRCANAIRI_PROD” db, we also manually load CRMA/RMA data into Snowflake. The process is as follows: 

1. CRMA/RMA reports are downloaded from the Circana platform manually and loaded into SharePoint, [nesta pasta](https://jbsusafoodcompany.sharepoint.com/sites/MarketDataIntegration/Shared%20Documents/Forms/AllItems.aspx?id=%2Fsites%2FMarketDataIntegration%2FShared%20Documents%2FCIRCANA%5FIRI%2FCategory%20Management%2FCircana%20Manual%20Data%20Export&viewid=e892ac08%2Ddec5%2D4c30%2D89c5%2Dfd3d398b8bcd).
   - For Beef/Pork/Prepared Foods BUs the data is loaded on subcategory level.
   - For Chicken BU the data is loaded on the upc level, because of the special category mapping applied to chicken where segment/subcategory/category are redefined for each product. Due to lower level of granularity chicken data must be loaded in parts, because of the platform’s limitation on cells count in one extracted report. [Here](https://jbsusafoodcompany.sharepoint.com/:w:/r/sites/MarketDataIntegration/_layouts/15/Doc.aspx?sourcedoc=%7BACE38142-7C96-435A-B39E-AD2D0F5C6C2C%7D&file=List%20of%20exports%20to%20download%20from%20Circana.docx&action=default&mobileredirect=true) you can see the list of how I divided the reports. In some cases, we did a full history reload of data, in others - incremental load following the process of automatic data update in “EXT_SH_CIRCANAIRI_PROD”. 

2. Files are loaded into Snowflake. After RMA/CRMA data is uploaded make sure that merged fact table includes the same number of weeks for Circana and SAP data.

3. Data is being manually validated after the upload.

## UPC vs Brand-level Data 

Сurrent Circana data warehouse and most Qlik Sense dashboards are built on the UPC-level data. However, due to data masking, as Circana explains it themselves, we are not receiving all sales data on the upc-level.  

See one of the examples we used when comparing the data in the Circana platform: 

<img width="1375" height="94" alt="image" src="https://github.com/user-attachments/assets/18aaf201-e76d-4717-902a-e6afa91f9072" />

Data downloaded on the Category level differed from the data downloaded on the UPC level and aggregated to Category.

Thus, Circana is now sharing with us two datasets – one on the upc-level and the other on the brand-level.  

Dustin suggested an idea to merge SKU and Brand level data sources to be able to show a comprehensive view of the market at the lowest levels possible.  For example, the merged table could look like this: 

<img width="751" height="365" alt="image" src="https://github.com/user-attachments/assets/62bc9bc0-c52f-489f-8183-19d476a647f4" />

## Useful Links

- Internal SharePoint folder for all Circana documents: [CIRCANA_IRI](https://jbsusafoodcompany.sharepoint.com/:f:/s/MarketDataIntegration/IgDiuX-q81sFQ5oqsb-Yt0kZAY-QiaIlZN18Wu5yE6E2SVs?e=58Vlwf)
- Mappings used in Circana project: [Circana Mappings Description.xlsx](https://jbsusafoodcompany.sharepoint.com/:x:/s/MarketDataIntegration/IQDsn16NrO_kT4Vy4H1rFZYWARQCCcsQ78EuIaBf2XtyZAg?e=PSDb9a)
- Most important business reports:
  - Chicken Category level report: [Frozen Fully Cooked_1-6 With Rev DECOMP.xlsx](https://jbsusafoodcompany.sharepoint.com/:x:/s/MarketDataIntegration/IQCNzxpRkFunSLDIyVTwoiPUASdp2OJB0vOeBosKfDs85uM?e=iHdw3o)
  - Chicken UPC level report: [COMP ITEM LEVEL TOOL.xlsx](https://jbsusafoodcompany.sharepoint.com/:x:/s/MarketDataIntegration/IQDxL9_W8BfaSZknKp3w1LsfAXQwc8yAXktdNDskSpddzSs?e=bY58EJ)
- Documentation on Circana data lake: [Data Lake](https://jbsusafoodcompany.sharepoint.com/:f:/s/MarketDataIntegration/IgDOhA2xnHzySqpTQh8pqeGAATJEJvx8k9AuXprcL9BQxJE?e=Be2OaX) 

## Next Steps

Circana project has been put on hold for a couple of months due to limited capacity of the development team. When the project is renewed the following scope needs to be implemented: 

1. Compare Pilgrim’s internal sales data (SAP) vs Pilgrim’s numbers in Circana. To understand how much they differ, as currently business users use data from Circana only, but one of the goals of this project is to merge internal and external data.
2. Merge UPC and BRAND level sales into one data set.
3. Develop new dashboard that will substitute an old one, build it on the new data models. Once dashboard is developed integrate it into the consolidated app.
4. Switch write-back tables to new dbt sources.  
