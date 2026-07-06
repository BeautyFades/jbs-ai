# Reunião de Alinhamento — 42 Data Labs

**Data:** 27/05/2026
**Participantes BIX:** Leonardo Contezini (DM), Rodrigo Imamura (DE), Vitor Costa (DA)
**Participantes 42 Data Labs:** Hian Batista, Paula Querzia, Fabio Barros

---

## Sobre a 42 Data Labs na JBS

- Atuam na JBS desde **2021**, atendendo demandas de múltiplas áreas.
- **Montaram a estrutura atual de Data Warehouse** e conduziram a migração do **Dataiku** para a stack atual.
- Foco atual: **Pilgrim's**, principalmente **live operations** (processamento das aves, custos, etc.).

## Time

| Nome | Papel |
|---|---|
| Hian Batista | Ponto focal |
| Paula Querzia | DA (a confirmar) |
| Fabio Barros | DE |

## Postura na reunião

- Time se mostrou **colaborativo**, com **Hian** atuando como ponto focal.
- Pela experiência acumulada de anos na JBS, **Hian é uma boa referência** para:
  - Dúvidas que ninguém do lado JBS souber responder — provavelmente já enfrentou.
  - Questões de **acesso a plataformas/fontes de dados** — sabe os caminhos internos.

## Fontes de dados que consomem

- **Agri Stats** — equivalente ao Circana para o mercado de **live operations**. Usado para benchmarking de performance da Pilgrim's no mercado americano.
- **Atenção:** Agri Stats está sofrendo processo judicial e pode ser encerrada. Caso isso aconteça, podem precisar acessar dados do **Circana** — possível ponto de overlap futuro com a BIX.

## Como o SAP é organizado na JBS

- A JBS migrou para **SAP S/4HANA em agosto de 2024**.
- O **time de TI** (provavelmente o time do Márcio) é responsável por entregar tabelas do SAP às **BUs (Business Units)**:
  1. Faz curadoria inicial das tabelas originais do SAP.
  2. Renomeia para nomes mais amigáveis (ex.: `VBRK`/`VBRP` → `billing_documents`).
  3. Disponibiliza como **views** para consumo das BUs.
- Cada BU pode criar **views/tabelas derivadas** sobre essa base para atender particularidades próprias.
- Views compartilhadas entre múltiplas BUs ficam na pasta **"core common"**.

## Write-back tables (WBT)

- Hian usa bastante WBT com usuários finais — eles **já estão acostumados** com o padrão.
- Apesar das desvantagens conhecidas, há uma **demanda recorrente dos usuários**: disparo automático de **reload dos apps Qlik** logo após modificações nas WBT.
- A demanda pelas WBT surgiu pois ao utilizar planilhas precisavam esperar o próximo ciclo de carga para ver os dados nos dashboards.
- **Ponto de avaliação para a BIX:** verificar se a stack atual (**Fivetran + SharePoint**) consegue atender essa demanda de atualização near real-time.

## Aplicação Sales Performance

- Hian mencionou a aplicação **Sales Performance** — ainda não fomos apresentados, mas devemos ser em breve.
- Cobertura aparente: **vendas por tipo de corte, até nível de SKU, com comparações YoY, custom reports, etc**.
