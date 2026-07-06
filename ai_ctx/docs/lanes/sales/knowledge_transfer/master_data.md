# Master Data Documentation

OBS: o texto abaixo foi desenvolvido por Khrystyna, antes de iniciarmos nossa atuação. Portanto, o que a BIX faz pode sobrescrever o que está aqui.

--- 

## Introduction 

The Sales Master Data Management application in Qlik Sense establishes a centralized place for managing the key sales reference data used across the organization. Qlik Sense write-back tables are connected directly to Snowflake, allowing users to update and maintain sales master data in a controlled way.  

The master data management framework includes 6 mapping and 17 configuration tables. 

Configuration tables define core master data entities such as territories, accounts, channels, sales roles, and other structural elements. In these tables, users can create or edit the list of values that later would be used in the mapping tables. 

Mapping tables use these configuration values to establish relationships between entities (for example, assigning RSMs to territories or linking different product categories to products). These tables drive the business logic behind how data aggregates and how ownership or responsibility is defined. 

Together, these tables form the single source of truth for all downstream sales analytics. 

This documentation explains the purpose and structure of each table and outlines how users can create, update, and maintain their master data. 

## Mapping tables

### 1. Direct Sales Mapping

<img width="1456" height="176" alt="image" src="https://github.com/user-attachments/assets/f5328947-0587-4e1e-bb27-2cb59cc17a78" />

<img width="951" height="191" alt="image" src="https://github.com/user-attachments/assets/4e042ed5-bacf-447c-8f8f-502d99566375" />

#### 1.1 Table Structure

This table holds distinct combinations of Material #s, Payer #s, Ship To #s, Profit Centers with their associated descriptions. Users cannot edit these fields; all these fields are read-only. 

5 active columns (with blue headers) are the ones users need to map. Those include: 

1. Channel
2. Sub-Channel
3. Corporate Entity Descrition
4. Redistributor Account Description
5. Distributor Description

All 5 fields are drop-downs that hold values from respective configuration tables. So, if any drop-down values list needs to be edited (e.g. new channels added), users need to go to the respective configuration table (see "General Rules for Working with Configuration Tables").

Each channel is linked to one or many subchannels, so once a user selects any channel from the drop-down, the list of sub-channels is automatically filtered. If you cannot find the needed subchannel in the list, you need to check out Channel configuration table (see "Channel Configuration").  

To see the most recent data, i.e. the combinations that have most recent sales, users can sort or filter the data in the Last Sales Date field. 

#### 1.2 Data Refresh Process

Data in this table is refreshed daily against SAP sales data filtered to specifically Pilgrim's data.  

SAP Data Source: COPA Table 

Filters applied to the data set: 

  a. Pilgrim’s company - **COMPANYCODE** IN ('1', '11', '12', '14', '15', '70', '71', '72') 

  b. Sales from 2024 and onwards - **POSTINGDATE** year => 2024 

  c. Fresh and Prepared profit centers - **PROFIRCENTER** IN       ('MPPF011','WAPF051','MRPF231','WEFR011','EAFR021','DQFR041','LUFR051','NAFR061','GUFR361','RVFR371','GFFR391','DGFR401','GHFR411','LOFR421','GKFR431','SFFR441','SFFR461','BWFR511','MFFR521','MSFR531','CSFR601','AWFR611','AKFR711','ABFR751','ABFR761','ADFR771','GAFR791','AQFR801','ASFR831','AFFR841','AFFR851','TRFR861','EBPF201', ‘CPCP131','CPCP201','CPCP221','CPCP551', 'GRGCKN8','SCPF991') 

  d. Finished products only - PRODUCTTYPE = ‘FERT’ (column from SAP.MASTER_MATERIAL table). 

  e. **PAYER** IS NOT NULL 

  f. **SHIPTOPARTY** IS NOT NULL 

  g. Revenue (**PAMGROSSREVENUEINGBLCUR**) > 0 

Any new combination of Material, Payer, Ship-to, and Profit Center is added as a new line in the table with the values for Channel, Sub-Channel, Corporate Entity, Redistributor Account, and Distributor marked as ‘Unmapped’. 

Channel, Sub-Channel, Corporate Entity, Redistributor Account, and Distributor drop-down lists are refreshed immediately on changes in the respective configuration tables. 

Historical values for Channel, Sub-Channel, Corporate Entity, Redistributor Account, and Distributor that have already been mapped in table will not be automatically updated if some these descriptions are edited/deleted in the configuration tables (e.g. if you edit existing channel description “Export” to “Exporting” in the configuration table, then all historical records in the mapping table will still preserve “Export” value until you re-map it).  

### 2. Product Mapping

<img width="1252" height="185" alt="image" src="https://github.com/user-attachments/assets/a1c2298f-cdf7-476d-aa02-9f95db1c4a04" />

<img width="1165" height="171" alt="image" src="https://github.com/user-attachments/assets/133e61fe-1431-439b-bc95-7cda311798af" />

#### 2.1 Table Structure

This table holds distinct Materials with their associated descriptions from the SAP COPA table. Users cannot edit these fields; they are read-only. 

The other columns – active ones (with blue headers) are the ones users need to map. Those include Budget Category, Process Type, Raw Material Category, Product Type, Brand Type, Breading Type, Meat Type, and FSE Product Category.  

All active fields are drop-downs that hold values from the respective configuration tables: 

1. Budget Category
2. Process Type
3. Raw Material Category
4. Product Type
5. Brand Type
6. Breading Type
7. Meat Type
8. FSE Product Category

So, if any drop-down values list needs to be edited (e.g. new meat types added), users need to go to the respective configuration table. 

All active fields are optional; thus, a user can map 1 or many fields at once and save the changes. 

To see the most recent data, i.e. the combinations that have most recent sales, users can sort or filter the data in the Last Sales Date field. 

#### 2.2 Data Refresh Process

Data in this table is refreshed daily against SAP COPA data. 

Filters applied to the data set: 

  a. Pilgrim’s company - **COMPANYCODE** IN ('1', '11', '12', '14', '15', '70', '71', '72') 
  b. Finished products only - **PRODUCTTYPE** = ‘FERT’ (column from SAP.MASTER_MATERIAL table). 

Any new Material number that is not accounted for in the Product Category table will be added with a new line and having the classification columns marked as ‘Unmapped’. 

Drop-down lists in the active fields are refreshed immediately on changes in the respective configuration tables. 

Historical mappings will not be automatically updated if some FSE Product Category, Budget Category, Process Type, Raw Material Category, Product Type, Brand Type, Breading Type, and Meat Type  descriptions are edited/deleted in the configuration tables (e.g. if you edit existing Meat Type description “Breast” to “Chicken Breast” in the configuration table, then all historical records in the mapping table will still preserve “Breast” value until you re-map it).  

### 3. Rede Sales - Rede Name Mapping 

<img width="1254" height="118" alt="image" src="https://github.com/user-attachments/assets/3893ee88-153c-44e9-96d0-3bfe1b09de3b" />

#### 3.1 Table Structure

Redistributor Sales – Redistributor Name Mapping table holds distinct Payer #s from the REDISTRIBUTOR SALES table. Users cannot edit Payer #s or description fields; they are read-only. 

Active columns (with blue headers) are the ones users need to map. Those include Redistributor Account Description and Corporate Entity Description. Active fields are drop-downs that hold values from respective configuration tables. So, if any drop-down values list needs to be edited (e.g. new redistributors added), users need to go to the respective configuration table. 

#### 3.2 Data Refresh Process

Data in this table is refreshed against the REDISTRIBUTOR_SALES data daily. 

Any new Payer number is added as a new line in the table. Respective Payer Descriptions are filled from the SAP Master Customer table, and the values for Corporate Entity and Redistributor Account are marked as ‘Unmapped’. 

Corporate Entity Description and Redistributor Account Description drop-down lists are refreshed immediately on changes in the respective configuration tables. 

Historical values for Corporate Entity Description and Redistributor Account Description that have already been mapped in table will not be automatically updated if some Corporate Entity or Redistributor Account descriptions are edited/deleted in the configuration tables (e.g. if you edit existing corporate entity description “Sysco” to “Sysco Inc.” in the configuration table, then all historical records in the mapping table will still preserve “Sysco” value until you re-map it). 

### 4. Rede Sales - Dist Mapping 

<img width="1481" height="122" alt="image" src="https://github.com/user-attachments/assets/0bd59ebd-6849-4bf2-93a1-053cbfa71bed" />

#### 4.1 Table Structure

Redistributor Sales – Distributor Mapping table holds distinct Ship To #s from the REDISTRIBUTOR SALES table. Users cannot edit Ship To #s or description fields; they are read-only. 

Active columns (with blue headers) are the ones users need to map. Those include: 

1. Corporate Entity Description
2. Distributor Description
3. Distributor Type
4. Buying Group
5. Corporate Account Responsible
6. Field Sales Responsible 

Active fields are drop-downs that hold values from respective configuration tables. So, if any drop-down values list needs to be edited (e.g. new distributors added), users need to go to the respective configuration table. 

#### 4.2 Data Refresh Process

Data in this table is refreshed against the REDISTRIBUTOR_SALES data daily. 

Any new Ship To Number is added as a new line in the table. Respective Ship To Descriptions are filled from the SAP Master Customer table, and the values for the other fields are marked as ‘Unmapped’. 

Drop-down lists in the active fields are refreshed immediately on changes in the respective configuration tables. 

Historical mappings will not be automatically updated if some Corporate Entity, Distributor, Distributor Type, Buying Group, Corporate Account Responsible, or Field Sales Responsible descriptions are edited/deleted in the configuration tables (e.g. if you edit existing Corporate Entity description “Sysco” to “Sysco Inc.” in the configuration table, then all historical records in the mapping table will still preserve “Sysco” value until you re-map it). 

### 5. Oper Sales - Dist Mapping 

<img width="1393" height="172" alt="image" src="https://github.com/user-attachments/assets/b52839b8-fc1a-4700-8a66-72383bbd4e4c" />

#### 5.1 Table Structure

Operator Sales – Distributor Mapping table holds distinct Ship To #s from the INDIRECT SALES table. Users cannot edit Ship To #s or description fields; they are read-only. 

Active columns (with blue headers) are the ones users need to map. Those include Corporate Entity. Redistributor Account, and Distributor descriptions. 

Active fields are drop-downs that hold values from respective configuration tables. So, if any drop-down values list needs to be edited (e.g. new distributors added), users need to go to the respective configuration table. 

#### 5.2 Data Refresh Process

Data in this table is refreshed against the INDIRECT_SALES data daily. 

Any new Ship To Number (DIST_ID from the INDIRECT_SALES table) is added as a new line in the table. Respective Ship To Descriptions (DIST_NAME values from the INDIRECT_SALES table) are loaded for each Ship To Number, and the values for the other fields are marked as ‘Unmapped’. 

Drop-down lists in the active fields are refreshed immediately on changes in the respective configuration tables. 

Historical mappings will not be automatically updated if some Corporate Entity, Redistributor Account, or Distributor descriptions are edited/deleted in the configuration tables (e.g. if you edit existing Corporate Entity description “Sysco” to “Sysco Inc.” in the configuration table, then all historical records in the mapping table will still preserve “Sysco” value until you re-map it). 

### 6. Territory Matrix Mapping 

<img width="1372" height="189" alt="image" src="https://github.com/user-attachments/assets/55304420-deda-4108-a654-d4e07b68e2f7" />

#### 6.1 Table Structure

This table holds distinct combinations of Sales Person, Operator State, and Territory Name. A Territory Matrix ID is automatically assigned when a new record is created. Currently, the system does not prevent duplicate records with the same combination; however, this validation will be implemented in the future. 

The Channel, Subchannel, and Manager fields must be mapped by users for each Sales Person–State–Territory combination. 

The Is Active column allows users to deactivate records that are no longer relevant. By default, all records are set to active. 

All editable fields, except Is Active, are drop-downs populated from the following sources: 

1. Sales Person: Regional Sales Manager configuration table
2. Operator State: Static list in Qlik Sense (new states must be added by a developer; changes are not expected frequently)
3. Territory Name: Territory configuration table
4. Channel and Subchannel: Channel configuration table
5. Manager: Manager configuration table 

#### 6.2 Data Refresh Process

Data in the Territory Matrix table can be updated by the system or users. 

Every week on Tuesday the system checks the INDIRECT SALES table to bring in new Sales Persons. Any new Sales Person that is not accounted for in the Territory Matrix table will be added with a new line and having the mapping columns marked as ‘Unmapped’. 

But most of the changes in the table are done by users. This is the only mapping table that allows adding new rows, so users can create new combinations of Sales Person-State-Territory on their own. 

Drop-down lists in the active fields are refreshed immediately on changes in the respective configuration tables. 

Historical mappings will not be automatically updated if some Sales Person,  Territory, Channel, Subchannel, Manger descriptions are edited/deleted in the configuration tables (e.g. if you edit existing Territory description “K-12 North Central” to “K-12 North” in the configuration table, then all historical records in the mapping table will still preserve “-12 North Central” value until you re-map it).

## General Rules for Working with Configuration Tables 

### Creating New Records in Configuration Tables 

1. All records must be unique. The system allows you to create new records with the same description as existing ones. However, the system detects the duplicate and assigns the same code to both records. To avoid confusion, it is better not to create records with duplicate descriptions. 

2. Code generation timing: ID codes for new records are generated automatically when data is saved in Snowflake with no time delay.

### Editing Existing Records in Configuration Tables 

When you edit a description in a configuration table: 

1. Existing historical mappings in the mapping tables will continue displaying the old description.
2. The change will apply only to new mappings going forward.
3. The updated description becomes available immediately in drop-down lists in mapping tables.

## Configuration Tables

### 1. Product Attributes Configuration (Budget Category, Process Type, Raw Material Category, Product Type, Brand Type, Breading Type, Meat Type, FSE Product Category) 

The product attributes configuration tables define standardized product characteristics like brand, category, product type, and other classification fields ensuring consistent product mapping across all the reporting and analytics.  

See the list of table fields and their descriptions below. 

| Field | Description |
|---|---|
| Budget Category Code | System-generated unique identifier for a budget category. |
| Budget Category Description | Name of the budget category (e.g., Fresh-Jumbo) |
| Process Type Code | System-generated unique identifier for a product processing type. |
| Process Type Description | Name of the processing type (e.g., Fully-Cooked, Par-Fried). |
| Raw Material Category Code | System-generated unique identifier for a raw material group. |
| Raw Material Category Description | Name of the raw material category (e.g., Whole Muscle). |
| Product Type Code | System-generated unique identifier for a product type. |
| Product Type Description | Name of the product type (e.g., Fillet, Nugget). |
| Brand Type Code | System-generated unique identifier for brand classification. |
| Brand Type Description | Name of the brand type (e.g., Branded, Private Label). |
| Breading Type Code | System-generated unique identifier for a breading type. |
| Breading Type Description | Name of the breading type (e.g., Tempura). |
| Meat Type Code | System-generated unique identifier for a meat type. |
| Meat Type Description | Name of the meat type (e.g., White, Dark). |
| FSE Product Category Code | System-generated unique identifier for a product category. |
| FSE Product Category Description | Name of the FSE product category (e.g., F-Small – Tenders). |
| Delete Flag | Indicates that the record should no longer be used in mapping. |

See more on creating/editing/deleting values in the configuration tables on the "General Rules for Working with Configuration Tables" section. 

### 2. Corporate Entity Confguration

<img width="1326" height="196" alt="image" src="https://github.com/user-attachments/assets/2e2ac543-d32d-4cef-8402-e5e2abe47b27" />

The Corporate Entity configuration table defines corporate entity accounts used in the CRM application and analytics.

| Field | Description |
|---|---|
| Corporate Entity Code | System-generated unique identifier for a corporate entity. |
| Corporate Entity Description | Name of the corporate customer. |
| Account Type | Type of customer account (e.g. School, CMC/GPO, Corp Entity). |
| Delete Flag | Indicates that the record should no longer be used in mapping. |

See more on creating/editing/deleting values in the configuration tables on the "General Rules for Working with Configuration Tables" section. 

### 3. Redistributor Configuration 

<img width="1276" height="218" alt="image" src="https://github.com/user-attachments/assets/559795c4-21d9-4aa8-bf98-926aec605cc5" />

The Redistributor configuration table defines redistributor accounts used in the CRM application and analytics.

| Field | Description |
|---|---|
| Redistributor Account Code | System-generated unique identifier for a redistributor. |
| Redistributor Account Description | Name of the redistributor. |
| Account Type | Type of customer account (e.g. Redistributor). |
| Delete Flag | Indicates that the record should no longer be used in mapping. |

See more on creating/editing/deleting values in the configuration tables on the "General Rules for Working with Configuration Tables" section. 

### 4. Distributor Configuration

<img width="1263" height="216" alt="image" src="https://github.com/user-attachments/assets/1d244072-0f65-4e40-87ae-24b1043503c3" />

The Distributor configuration table defines distributor accounts used in the CRM application and analytics.

| Field | Description |
|---|---|
| Distributor Code | System-generated unique identifier for a distributor. |
| Distributor Description | Name of the distributor. |
| Account Type | Type of customer account (e.g. Distributor- Independent). |
| Delete Flag | Indicates that the record should no longer be used in mapping. |

See more on creating/editing/deleting values in the configuration tables on the "General Rules for Working with Configuration Tables" section. 

### 5. Operator Configuration

<img width="1252" height="206" alt="image" src="https://github.com/user-attachments/assets/30dcbad1-9344-44fd-8a01-1d6835af8a8a" />

The Operator configuration table defines distributor accounts used in the CRM application and analytics.

| Field | Description |
|---|---|
| Operator Code | Unique operator identifier sourced from the BSA Oper ID field from Blacksmith. |
| Operator Description | Name of the operator sourced from Operator Name field from Blacksmith but can be edited by users. |
| Account Type | Type of customer account (e.g. Operator – Mop and Pop). |

The Operator configuration table is refreshed daily to incorporate any new operators from the Operator Details file, which contains data sourced from Blacksmith.  

It is also the only configuration table that doesn’t allow users to create or delete accounts. However, users can edit the operator names or account types. See more on editing values in the configuration tables on the "Editing Existing Records in Configuration Tables" section. 

### 6. Channel Configuration

<img width="1235" height="296" alt="image" src="https://github.com/user-attachments/assets/fe7aacfb-d53f-4951-b12c-4627ff9c458c" />

The Channel configuration table defines hierarchical sales channels used across reporting and mapping tables.  

| Field | Description |
|---|---|
| Channel Code | System-generated unique identifier for a channel. |
| Channel Description | Name of the channel (e.g. Food Service, Retail). |
| Sub-Channel Code | System-generated unique identifier for a sub-channel. |
| Sub-Channel Description | Name of the sub-channel (e.g. K-12, Distributor). |
| Delete Flag | Indicates that the record should no longer be used in mapping. |

Note! When creating a new channel that doesn’t have subchannels, it’s better to just duplicate channel description in the subchannel field – e.g. Channel > Deli, Subchannel > Deli. 

See more on creating/editing/deleting values in the configuration tables on the "General Rules for Working with Configuration Tables" section.  

### 7. Territory  Configuration

<img width="1324" height="211" alt="image" src="https://github.com/user-attachments/assets/b15d0ab7-7f75-40d6-a633-c57d1fdb8e62" />

The Territory configuration table defines the sales territories used across reporting and sales master data.

| Field | Description |
|---|---|
| Territory Code | System-generated unique identifier for a territory. |
| Territory Description | Name of the sales territory (e.g., Indiana, Illinois, Metro NY). |
| Delete Flag | Indicates that the record should no longer be used in mapping. |

See more on creating/editing/deleting values in the configuration tables on the "General Rules for Working with Configuration Tables" section. 

### 8. Regional Sales Manager (RSM) Configuration 

<img width="1289" height="211" alt="image" src="https://github.com/user-attachments/assets/000a3d12-63a7-40a9-bec1-3e24bf877556" />

The Regional Sales Manager configuration table stores the list of RSMs responsible for managing sales across defined territories and areas. 

| Field | Description |
|---|---|
| Regional Sales Manager Code | System-generated unique identifier for an RSM. |
| Regional Sales Manager Description | Full name of the Regional Sales Manager. |
| RSM EEID | Employee ID associated with the RSM (unique identifier of an employee in Pilgrim's used across multiple systems.) |
| Delete Flag | Indicates that the record should no longer be used in mapping. |

See more on creating/editing/deleting values in the configuration tables on the "General Rules for Working with Configuration Tables" section.  

### 9. Manager Configuration 

<img width="1282" height="216" alt="image" src="https://github.com/user-attachments/assets/4ad55a60-2cd7-431b-a26c-4242bda6893e" />

The Manager configuration table maintains the list of managers who oversee Regional Sales Managers (RSMs).

| Field | Description |
|---|---|
| Manager Code | System-generated unique identifier for a Manager. |
| Manager Description | Full name of the Manager. |
| Manager EEID | Employee ID associated with the Manager (unique identifier of an employee in Pilgrim's used across multiple systems.) |
| Delete Flag | Indicates that the record should no longer be used in mapping. |

See more on creating/editing/deleting values in the configuration tables on the "General Rules for Working with Configuration Tables" section.  

### 10. Buying Group Configuration 

<img width="1385" height="122" alt="image" src="https://github.com/user-attachments/assets/497b22b6-bfdf-4f93-9a63-693ade83cabb" />

The Buying Group configuration table maintains a list of independent distributor groups that negotiate collectively as a single entity. 

| Field | Description |
|---|---|
| Buying Group Code | System-generated unique identifier for a buying group. |
| Buying Group Description | Name of the buying group. |
| Delete Flag | Indicates that the record should no longer be used in mapping. |

See more on creating/editing/deleting values in the configuration tables on the "General Rules for Working with Configuration Tables" section.  
