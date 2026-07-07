# Reunião de KT realizada em 21 de maio de 2026.

Agenda:
- Review Circana DW and ETL.
- Review Circana mappings and write-back tables.
- Q&A

--- 
Rascunho / anotações durante a reunião:

All the Circana Data is being manually ingested. They thought about creating bots for it, but - according to Fellipe Tafner - the frequency (monthly - double check) doesn't justify any automation yet. Khrystyna saves the data in Sharepoint, and Fellipe Tafner updates the aggregations/data model. Há uma automação simples apenas para notificar o time quando Circana está disponibilizando dados atualizados. Essa automação é feita com Power Automate via webhook. 

There is RMA and CRMA data, and there's a difference between them. In IRI (Circana) data, an **RMA (Retailer Marketing Area)** contains only the specific retailer's own stores, while a **CRMA (Competitive Retailer Marketing Area)** includes that retailer's stores plus all competing stores operating within that same geographic boundary.

The goal is to compare data between JBS and the whole Market by creating the FACT_SALES_COMPARISON_ALL table (name might be slightly different).

In SAP we have 4 tables: prepared foods, chicken, pork and beef. As vendas são analisadas em dólar e pounds. Existem alguns filtros aplicados:

<img width="1005" height="254" alt="image" src="https://github.com/user-attachments/assets/f44f8bba-8fe1-42b5-981c-69e2d6b1de59" />

Todas as BUs - Business Units - (Beef, Pork e Prepared Foods) usam categorias/sub-categorias vindas de Circana para análise. No entanto, pra chicken, o dado é disponibilizado a nível de UPC. Motivo: Briton, o principal stakeholder responsável pelo setor de chicken, não usa as categorias/sub-categorias oriudas de Circana - ele usa as próprias categorias/sub-categorias.

Product mapping entre Circana e SAP é feito via CSV. Para este mapping, a ideia era utilizar writeback tables - mas o projeto está on-hold por ~1 ano, e as tabelas não estão sendo atualizadas. Este processo precisa ser revisado. 

Há uma distinção dentro das Business Units (Branded vs Private Label products). Os "branded" podem ser mapeados entre SAP e Circana. Os que são "private label" não podem ser mapeados. Neste caso, eles são mapeados apenas para categorias e subcategorias de Circana.

Estes mapeamentos parecem acontecer no Qlik App "[Dev] Circana WBT", que foram desenvolvidos há ~1,5 anos. Atualmente, segundo Khrystyna, há uma pergunta acima disso: ainda precisamos mapear produtos entre SAP e Circana, ou podemos usar os dados de Circana apenas?

<img width="495" height="32" alt="image" src="https://github.com/user-attachments/assets/befd1b88-b41d-42f1-b0e9-34ac4d9fd5d9" />

Há uma Fase 2 mapeada para dbt, ainda sem data de início prevista. A ideia é ajustar para melhores práticas (staging tables, naming conventions...).

Há também Geography Mappings via sharepoint (e não writeback tables): 

<img width="817" height="719" alt="image" src="https://github.com/user-attachments/assets/c2f2d475-4d99-4725-84f6-3ff62a68f564" />

Qlik não funciona muito bem quando múltiplos usuários atualizam tabelas simultaneamente, por isso decidiram por seguir pelo sharepoint. Fivetran atualiza o snowflake sempre que há um novo mapeamento no sharepoint.

Resumo geral do Tafner, em uma frase: o objetivo é comparar Sales Data from Circana, with Sales Data from SAP - by week, category and subcategory.
