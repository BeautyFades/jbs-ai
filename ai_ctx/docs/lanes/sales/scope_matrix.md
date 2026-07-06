# Scope Matrix — Sales Lane

Living scope matrix for the Sales lane: all data sources that make up the lane, grouped by Data Category, with ingestion method, current state, and owner. Update as new sources enter scope, change owner, or advance in state.

---

## Sources

| Data Category | Data Source | Ingestion Method | Current State | Owner | Data Architect |
|---|---|---|---|---|---|
| US Market Data | Circana Brand Level | Data Share (Snowflake to Snowflake) | Develop ETL | BIX | Fellipe Fernandes |
| US Market Data | Circana SKU Level | Data Share (Snowflake to Snowflake) | Migrate to DBT | BIX | Fellipe Fernandes |
| US Market Data | NPD | Bot | Only Raw Data (no ETL process, no gold layer) | BIX | Fellipe Fernandes |
| Store Level Data | Kroger | Bot | Operational - Inherited Debt | BIX | Fellipe Fernandes |
| Store Level Data | Absco (Albertsons) | Bot | Validate | BIX | Fellipe Fernandes |
| Store Level Data | Costco | Bot | Operational - Inherited Debt | BIX | Fellipe Fernandes |
| Store Level Data | Walmart | Manual (Bot Pending 2FA Bypass) | Validate / 2FA Bypass | BIX | Fellipe Fernandes |
| Store Level Data | Sam's | Manual (Bot Pending 2FA Bypass) | Validate / 2FA Bypass | BIX | Fellipe Fernandes |
| Store Level Data | Publix | Not Configured Yet | Not Started | BIX | Fellipe Fernandes |
| Historical Sales Data | SAP Internal Sales | BW to Snowflake | Needs Some Polish | BIX (possible overlap with 42 Data Labs) | Fellipe Fernandes |
| Historical Sales Data | Redistributor Report | TBD | Move Logic to SF | Khrystyna & Tafner | Fellipe Fernandes |
| Historical Sales Data | Operator Purchasing File (BS) | Excel to Snowflake | Move Logic to SF | Khrystyna & Tafner | Fellipe Fernandes |
| Historical Sales Data | Blacksmith Agreements | Excel to Snowflake | Move Logic to SF | Khrystyna & Tafner | Fellipe Fernandes |
| Sales Pipeline | MS Dynamics Accounts | Fivetran to Snowflake | Only Raw Data | Khrystyna & JBS IT | Fellipe Fernandes |
| Sales Pipeline | MS Dynamics Opportunities | Fivetran to Snowflake | Only Raw Data | Khrystyna & JBS IT | Fellipe Fernandes |
| Sales Pipeline | Axcion Sales Activities | Snowflake to Snowflake | Develop ETL | Khrystyna & Tafner | Fellipe Fernandes |
| Sales Pipeline | Axcion Sales Opportunities | Snowflake to Snowflake | Develop ETL | Khrystyna & Tafner | Fellipe Fernandes |
| P&L | Budget | Manual Excel Load | Only Raw Data | BIX | Fellipe Fernandes |
| P&L | Costs | Manual Excel Load | Only Raw Data | BIX | Fellipe Fernandes |
| Master Data | Sales Hierarchy | Qlik WriteBack | Done | Khrystyna & Tafner | Fellipe Fernandes |
| Master Data | Material Hierarchy | Qlik WriteBack | Done | Khrystyna & Tafner | Fellipe Fernandes |
| Master Data | Customer Hierarchy | Qlik WriteBack | Operator Integration | Khrystyna & Tafner | Fellipe Fernandes |

---

| Report | Target DataViz Tool | Owner | Current State |
|---|---|---|---|
| Master Data | Qlik | Nata → Vitor (BIX) | Done |
| MS Dynamics Iframes | Qlik | Nata → Vitor (BIX) | Active Development |
| Sales Performance App | Claude | TBD* (BIX) | Move from QVD to SF |
| Market Insights (includes 4 Apps) | Claude | TBD* (BIX) | Req Gathering |
| P&L | Claude | TBD* (BIX) | Req Gathering |
| Store Level Data | Claude | TBD* (BIX) | Data Validation |

* TBD: possible AI Engineer from BIX.

Table content based on [Dustin's spreadsheet](https://jbsusafoodcompany-my.sharepoint.com/:x:/r/personal/lcontezi_jbssa_com/_layouts/15/doc2.aspx?sourcedoc=%7Bd064daad-e494-4b2d-9357-c53dd2828a84%7D&action=edit&activeCell=%27Sheet1%27!J9&wdinitialsession=58114eaf-0ed2-ee97-4de1-f0d0e39b23d0&wdrldsc=5&wdrldc=1&wdrldr=AccessTokenExpiredWarningUnauthenticated%2CRefreshin), designed on [June 2nd](https://github.com/bixtecnologia/jbssa/blob/main/docs/lanes/sales/transcriptions/others/260602_big_picture_edvantis_offboarding.md).
