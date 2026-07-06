# ABSCO Project Knowledge Transfer

OBS: o texto abaixo foi desenvolvido por Khrystyna, antes de iniciarmos nossa atuação. Portanto, o que a BIX faz pode sobrescrever o que está aqui.

--- 

## Input from Business Stakeholders 

Original PnL excel file: [2025 Weekly PL v2.xlsx ](https://jbsusafoodcompany.sharepoint.com/:x:/s/MarketDataIntegration/IQDCZM_-ZGPRS4xmHoya6D0TAYWS_iddxGiZ5FNXsR3AQPk?e=Rod38M)

## Qlik Sense Dashboard

PnL [dashboard](https://qlikdev.jbssa.com/sense/app/419cce92-8744-4189-9aa7-2212a26c0aac/overview ) has been developed in Qlik Sense Dev environment.

The application consists of 2 pages: 

1. **P&L Summary page** reproduces summary page in the [original excel file](https://jbsusafoodcompany.sharepoint.com/:x:/s/MarketDataIntegration/IQDCZM_-ZGPRS4xmHoya6D0TAYWS_iddxGiZ5FNXsR3AQPk?e=Rod38M). 
2. **P&L Chart Tests** – a test page where Qlik Developer was playing with the charts to reproduce the original chart from the P&L excel sheet:

    <img width="1314" height="641" alt="image" src="https://github.com/user-attachments/assets/79a7e7b0-d8ed-4e3d-b7a9-1bbb9301803d" />

Qlik app has never been fully finished or published to production because other high-priority projects. 

## Data Warehouse

PnL data is stored in Snowflake schema LEGACY_PPC.PPC_PNL. 

It consists of 8 tables: 

1. FCT_ACTUALS: the table has historical sales data sourced from SAP COPA tables (profitability analysis).
2. PPC_PNL_BUDGET: the table was loaded once from the excel file. The file has data for 2024 and 2025 years. It differs from the Budget 2024 table by formatting. At first we loaded the 2024 file into Snowflake, but then we received another file with changed format, so it had to be a different table.
3. PPC_PNL_BUDGET_2024
4. COST_FORECAST: the table was loaded once from the [excel file](https://jbsusafoodcompany.sharepoint.com/:x:/s/pilgrims-dxt/EWLQuvo7MiZLtTGG-pITuckBsyh_S2x-f1pHUMClGKTaCQ?e=03XgnA) provided by Lili. It has forecasted sales data per SKU and payer. This table is used for the PnL analytics in Qlik Sense.
5. PPC_PNL_PAYER_FORECAST: the table was loaded from the excel file once. The forecast is done on the SKU and payer level.
6. PPC_PNL_COST_PAYER_FORECAST_COMPARISON: the table created to compare the data in Cost Forecast and Payer Forecast tables.
7. PPC_PNL_PAYER
8. PPC_PNL_REFERENCE: the table has been loaded once from the excel file to bring in the additional dimensions to the PnL dashboard, e.g. channel, subchannel.

## Next Steps

1. Contact business owners of the PnL and get latest excel files from them.
2. Update Snowflake PnL schema with the latest data and set up ETL to automatically bring in the newest data.
3. Update filters in the PnL Summary page in Qlik Sense, as currently not all filters are working. 
