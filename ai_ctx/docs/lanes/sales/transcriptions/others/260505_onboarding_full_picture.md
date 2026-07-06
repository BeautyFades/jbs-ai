# JBS — Anotações de Reunião (Repasse Khrystyna)

## 1. Visão Geral das Fontes de Dados

Trabalharemos com múltiplas fontes de dados, **externas e internas**, divididas em 3 frentes:

| # | Frente | Tipo | Fontes |
|---|---|---|---|
| 1 | **Customer Sales** (sell-out) | Externa | Kroger, Costco, ABSCO, Sam's, Walmart, Publix |
| 2 | **Internal Sales** (sell-in) | Interna | SAP |
| 3 | **US Market Sales** | Externa | Circana (aka IRI), NPD |

> **Observação:** O CRM também é uma fonte de dados, mas ficará **fora do GTM Consolidated App** por enquanto. Segundo Khrystyna, o CRM é confuso e poderia atrapalhar o onboarding.

**Objetivo final:** unificar todas as fontes em um único **GTM Consolidated App** (GTM = "Go To Market").

---

## 2. Detalhamento por Frente

### 2.1 Customer Sales / Store Market Data (SMD)

- **Store Level Data = Store Market Data** (pode ser chamado dos dois jeitos): dados de sell-out.
- Os clientes do SMD são **key clients da JBS**, com parceria firmada.
- Fontes: Kroger, Costco, ABSCO, Sam's, Walmart, Publix.

### 2.2 US Market Sales

- **Circana (IRI):** global provider de market data para retailers (cobre o mercado US). Inclui dados de concorrentes.
- **NPD:** mesma proposta da Circana, mas voltado para **food service** (cafeterias, restaurantes, aeroportos, etc.).

**Atualização Circana:**
- Atualização **mensal**, com **carga incremental**.
- De tempos em tempos, a Circana faz um **full historical reload** — eles avisam, e quando isso ocorre a JBS também precisa fazer.

**Cruzamento Circana × SAP:**
- Conseguem fazer **DE-PARA** entre Circana e SAP cruzando UPC/SKU para comparar Market Sales × Internal Sales.
- **Problema atual:** dados de Circana + SAP e NPD ainda não batem com a expectativa do usuário. Os dados de Circana não fecham com Internal Sales no match — **precisa ser investigado**.
- São extraídas **8 tabelas da Circana**: 4 brand-level e 4 UPC-level. Brand level abrange todos os SKUs; SKU level é limitado (não aparece tudo). Por isso o volume em brand level é maior.
- Eles querem "mascarar" a parte de SKUs não visível atualmente para tentar abranger o valor total.

### 2.3 Internal Sales (SAP)

- Fluxo dos dados do SAP está **incerto** — Khrystyna não passou tanta segurança neste ponto.
- A princípio, dados de SAP são salvos em **QVDs** e cruzados com Circana.
- Aparentemente **ainda não está no Snowflake**, mas é a intenção (se fizer sentido).

### 2.4 NPD

- Há automação via **Automation Anywhere** para extrair dados do NPD. **Bot já está pronto e funcionando**.
- **Fellipe Tafner** está trabalhando no final do pipeline do NPD (motivo de aparecer em vermelho nas imagens). Conclusão prevista para "a few days".
- Seria interessante ter um **Qlik App apenas para NPD** (hoje não existe; possivelmente irá direto para o GTM Consolidated App).
- **Definição pendente:** quem vai desenvolver o app de NPD. Fellipe vai finalizar as transformações, mas o **Qlik App ainda não tem dono**.
- Começaremos atuando em Customer Sales. O responsável pelo Qlik App de NPD será definido depois — **manter no radar**.

> **Importância de Circana + NPD:** ver onde a JBS está posicionada no mercado e identificar oportunidades. Crítico para o time comercial da JBS.

---

## 3. Pipeline e Fluxo dos Dados

<img width="1712" height="1342" alt="image" src="https://github.com/user-attachments/assets/dabc26d8-523d-4f9f-a1bf-1240fe7ce0d4" />


### 3.1 Frequência de Atualização por Fonte

| Fonte | Mecanismo | Frequência |
|---|---|---|
| **Circana (IRI)** | Data share | Monthly |
| **SAP** | Fivetran | Weekly |
| **NPD** | Automation Anywhere (bot) | Chicken: monthly · Italian meats e Bacon: quarterly |
| **Kroger** | Automation Anywhere (bot) | `sales_weekly`: weekly · Demais tabelas: diário |
| **Costco** | Automation Anywhere (bot) | Weekly |
| **ABSCO** | Automation Anywhere (bot) | Weekly |
| **Walmart** | Manual | Weekly |
| **Sam's** | Manual | Weekly |
| **Publix** | — | Sem dados ainda |

---

## 4. Documentação de Apoio

A planilha **"Store Market Data Project plan"** (apresentada por Khrystyna) contém várias tarefas com seus respectivos status.

**Localização no SharePoint:**
`Market Data Integration` → `STORE LEVEL DATA` → `Knowledge Transfer`

> A pasta **Knowledge Transfer** foi criada justamente para os repasses para o nosso time. É **chave** e precisa ser intensamente estudada e mantida como referência até superarmos as barreiras do onboarding.

---

## 5. Pontos Específicos — SMD

### 5.1 Histórico de Snapshots (Kroger)

- Dados de Kroger possuem **snapshots de estoque diários**.
- Precisamos verificar quanto tempo de histórico está no app — Khrystyna não sabe ao certo.
- Se o Qlik App de Kroger tem 1 ano de dados, é necessário 1 ano de histórico de snapshots, o que **gera volume absurdo** e é uma das causas da lentidão.

### 5.2 Nomes de Tabelas

- Estão na pasta **Knowledge Transfer** do SharePoint.
- Para Kroger e Costco, Vitor consegue ver direto nos apps.
- Para os clientes que ainda não têm app, evoluir a partir do que está nesta pasta.

### 5.3 Status das Transformações

- **Kroger e Costco:** todas as transformações são feitas dentro do **Qlik**.
- **ABSCO, Sam's, Walmart e demais:** ainda **não há padrão**. Alguns são feitos no Qlik, outros no Snowflake. **Precisamos checar caso a caso**.

### 5.4 Customers Pendentes de Qlik App

Precisamos trabalhar nos reports de:
- **ABSCO** (dados disponíveis)
- **Sam's** (dados inseridos manualmente)
- **Walmart** (dados inseridos manualmente)

> **Walmart:** ainda não temos as outras fatos — apenas a tabela `YTD_Sales`.
> **Tiffany** = main stakeholder de Walmart.

### 5.5 Implementações em Costco

- Há fixes mapeados em documento próprio.
- **Costco Project.docx** está dentro da pasta **Knowledge Transfer** — checar.

---

## 6. ⚠️ Comunicação Externa — Atenção

> **NÃO MENCIONAR para nenhum fornecedor externo que desenvolvemos bots.**
>
> Sempre falar que **extraímos os dados manualmente**. Não é proibido nem permitido formalmente, mas é melhor não comentar.
>
> Bots podem sobrecarregar (overload) o sistema do fornecedor, e qualquer comentário pode gerar bloqueios que impediriam o consumo dos dados.

**Credenciais utilizadas nos bots:** business users credentials (jacob, zach) para conexão e extração.

---

## 7. Fluxo de Trabalho — Bots Walmart e Sam's

Para atuar nos bots e automação das cargas de Walmart e Sam's (hoje manuais), o fluxo deve ser:

1. **Revisar documentos e opções de bypass** (2FA).
2. Se confiante na solução, **abrir ticket com o time de segurança** para aprovação.
   - Pode demorar algumas semanas.
   - Se demorar muito, **Dustin** talvez possa atuar para acelerar.
3. **Somente após aprovação**, desenvolver os códigos.
4. Contatar o **RPA Team** para deploy via Automation Anywhere.

> Esse fluxo evita retrabalho de desenvolver algo que o Security Team poderia reprovar.

---

## 8. Prioridades Acordadas

Conforme alinhado com **Dustin, Khrystyna e o time**, nosso foco é:

1. **SMD** — bots, automações, transformações e Qlik Apps.
2. **Qlik App para NPD** — se definido que é nossa responsabilidade.
3. **GTM Consolidated App** — objetivo final, mantido no horizonte.

---

## 9. Status Semanal

- **Reunião com Dustin:** todas as **sextas-feiras**.
- **Horário:** 15h BRT / 13h CST.

---

## 10. Pessoas-Chave Mencionadas

| Pessoa | Papel |
|---|---|
| Dustin | Stakeholder — alinhamento de prioridades e suporte para destravar tickets |
| Khrystyna | Responsável pelos repasses (Knowledge Transfer) |
| Fellipe Tafner | Finalizando o pipeline de NPD |
| Tiffany | Main stakeholder de Walmart |
