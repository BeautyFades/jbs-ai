# Projeto JBS USA — Contexto e Notas das Reuniões Iniciais


Documento consolidado a partir das anotações das duas primeiras reuniões com o cliente, realizadas em 28 de abril de 2026. 
Serve como contexto inicial para o time e para automações com Claude Code. É apenas para contexto inicial, e não para servir como documentação imutável.

---

## 1. Visão Geral

- **Cliente:** JBS USA
- **Frente inicial de atuação:** time **comercial**, dentro do projeto **SMD (Store Market Data)**.
- **Negócio:** a JBS atende diferentes business units e a ideia é atuar sobre as demandas de cada uma. O time comercial atua com base nos dados de vendas das lojas (clientes da JBS para o consumidor final).
- **Objetivo final do SMD:** consolidar os dados de vendas dos diferentes varejistas em um **dashboard único e unificado**, em uma camada acima dos dashboards individuais já existentes por cliente.

---

## 2. Pontos de Contato

| Pessoa | Papel | Observações |
|---|---|---|
| **Dustin Dickson** | Gestor da Lili | **Ponto de contato principal** enquanto a Lili Yu não retorna. |
| **Lili Yu** | Diretora de Data Science | Atualmente fora; voltará posteriormente. |
| **Lesia Lozytska** | PM | Responsável pelo KT da **Reunião 1** (visão de projeto e SMD). |
| **Denys Korniukhin** | Data Engineer | Responsável pelo KT da **Reunião 2** (stack técnico e DB). |
| **Khrystyna** | (referência interna do cliente) | Recebeu acessos da "Marcia". |
| **Marcia** | Responsável por liberar acessos | Nome a manter em mente para solicitações de acesso futuras. |

---

## 3. Gestão do Projeto

- A Lili criou um projeto no **Jira**, mas **não vamos conseguir utilizá-lo** (motivo não ficou claro).
- **Plano:** criar nosso próprio board e **exportar as tasks** do Jira da Lili para alimentar o nosso.

---

## 4. Reunião 1 — Visão e Escopo do SMD

**Agenda:** Intro to the Store Market Data (SMD), Project, Project Vision, Project Scope, SMD Dashboards, Requirements, Documentation, Current State and Challenges.
**KT:** Lesia Lozytska (PM)

### 4.1 Como a JBS acessa os dados dos varejistas

A JBS acessa dados de vendas de cada um dos seus clientes varejistas: **ABSCO, Costco, Kroger, Walmart, Sam's e Publix**. Cada um tem seu próprio DW e, por isso, as informações disponíveis variam entre eles.

- **Cenário ideal:** integração via API com cada varejista.
- **Bloqueio:** APIs exigem conta específica no ambiente do varejista, o que gera custo. Por isso, **os varejistas se recusam a fornecer essas contas**.
- **Workaround atual:** automações via **scripts Python** e ferramentas como **Automation Anywhere**, operadas por um time de **RPA**, que cria os "bots" responsáveis por extrair os dados.
- **Dependência relevante:** a criação e manutenção desses bots depende do **time de RPA**.

### 4.2 Desafio de autenticação (2FA)

Cada varejista tem um esquema de 2FA diferente, o que dificulta a automação e é um risco real que pode impactar o projeto.

- **2FA por e-mail**
- **2FA por US Cell Number** (mais complicado de contornar)
- **2FA via Microsoft Authenticator**

### 4.3 Status por varejista

| Varejista | Sistema | 2FA | Status do Bot | Data Warehouse Status |
|---|---|---|---|---|
| **Kroger** | 84.51 | Sem 2FA | ✅ Done | OK |
| **Costco** | Unify+ | Por e-mail (redirecionado para DT integration) | ✅ Done | OK |
| **ABSCO** | Unify+ | Por e-mail (redirecionado para DT integration) | ✅ Done | OK |
| **Sam's** | Unify+ | US Cell Number — *complicado, ainda sem solução conclusiva* | ❌ Não configurado | OK - Migração **manual** (sem bot) |
| **Walmart** | Scintilla | US Cell Number — *complicado, ainda sem solução conclusiva* | ❌ Não configurado | OK - Migração **manual** (sem bot) |
| **Publix** | Publix | Microsoft Auth | ❌ Não desenvolvido | Sem migração; **sem acesso ao Sales Report**. Base menor, acesso complicado. |

> Para Sam's e Walmart, há ideias de bypass do 2FA, mas nada conclusivo. Conferir o arquivo **`2FA bypass solution.docx`**.

### 4.4 Arquitetura atual de dados

```
[Varejistas] → [Bots Automation Anywhere / Scripts Python] → [Snowflake (bronze / silver / gold)] → [QlikSense — Dashboards "MVP" por cliente]
```

- O **Dataiku** é a ferramenta de dados **legada** e está sendo substituída pelas automações via **Automation Anywhere Bots**.
- No Snowflake, os dados são organizados em camadas (**bronze, silver, gold**).
- Os **dashboards "MVP"** no QlikSense existem por cliente (um para cada DW, já que cada um tem informações diferentes).
- **Hoje só há MVPs para Kroger e Costco.**

### 4.5 Visão do dashboard final

- Já há uma referência desenhada no Excel **`ABSCO Dashboard`**, baseada na visão que o stakeholder já usa para ABSCO.
- **Estrutura da visão (tabela):**
  `brand → commodity → product → UPC → Medidas/KPIs por semana` *(com regras de cores / semáforo)*.
- **Próximo passo de produto:** validar se temos dados para sustentar essa visão **em todos os varejistas**.
- **Evolução:** depois disso, evoluir o design com gráficos, KPIs, paginações, drill-downs etc.

### 4.6 Documentação de referência (compartilhada pela Lesia)

| Arquivo | Conteúdo |
|---|---|
| **`ABSCO Project.docx`** *(e similares por cliente)* | **Provavelmente os mais importantes.** Contêm: acessos, e-mails, fields in DB, "how to get from the reports", DBT model, ETL schedules, regras de cálculo de cada medida. |
| **`Knowledge Transfer Main.xlsx`** | Resumo dos reports. |
| **`SMD Reports Comparison.xlsx`** | Medidas de cada cliente e quais existem em comum entre eles. |
| **`2FA bypass solution.docx`** | Possíveis soluções para o 2FA do Walmart e Sam's. |
| **`ABSCO Dashboard` (Excel)** | Referência da visão de tabela usada pelo stakeholder. |

### 4.7 Observações técnicas importantes

- **Nomes de produtos mudam** — entre varejistas e até dentro do mesmo varejista. O cliente mantém um histórico dos nomes, mas o **`SAP_SKU` se mantém estável**.
- **Atenção:** alguns varejistas **não têm o campo SKU disponível**.
- **QlikSense está muito lento** — mencionado várias vezes pela Lesia. Ponto de atenção para performance dos dashboards.

### 4.8 Blockers mapeados

| # | Blocker | Impacto |
|---|---|---|
| 1 | **Acesso ao "Item Sales Reports" do Publix** | Impede o levantamento de requisitos e o desenvolvimento do DW para Publix. |
| 2 | **Bypass de 2FA no Walmart e Sam's** | Sem solução, não é possível desenvolver os bots. Há **duas opções identificadas** que dependem de aprovação do **time de Security**. A solução escolhida **afeta o escopo**. |
| 3 | **Bots não configurados para Walmart e Sam's** | Reports semanais precisam ser **carregados manualmente**. |
| 4 | **Migração DBT** | Bots foram migrados pelo time de RPA do Dataiku para o Automation Anywhere. **Bot do Costco previsto em produção até o fim da semana** (referência da reunião). |

---

## 5. Reunião 2 — Stack Técnico e Arquitetura

**Agenda:** Existing Technical Stack, DB Architecture, Bots, Open Questions and Concerns.
**KT:** Denys Korniukhin (Data Engineer)

### 5.1 Stack e fluxo de dados

- **Dataiku (legado):** scripts Python que jogam dados no Snowflake, que depois seguem para o Qlik.
- **Padrão de schemas no Snowflake (exemplo Kroger):**
  - **`KROGER_RAW`** — carregado pelos bots.
  - **`KROGER`** — datamart consumido pelo Qlik.
- **Repositório:** **Azure DevOps**.

### 5.2 Pontos de atenção / gaps

- **Zero visibilidade em falhas do RPA** — se um processo do Automation Anywhere falha, não há observabilidade hoje.
- **Orquestração:** o ideal seria que os **jobs do dbt fossem triggados pelo Automation Anywhere**, mas **hoje não são**.
- **Exportação de CSVs:** parece haver alguma limitação (não ficou clara). **Recomendação do Denys:** se precisar exportar, **fazer no fim do mês**.

### 5.3 Acessos

- A liberação de acessos para a Khrystyna aos possíveis links que Denys apresentou foi feita pela **Marcia**. Manter esse nome como referência para solicitações futuras.

---

## 6. Resumo de Próximos Passos / Pontos de Atenção

1. **Mergulhar nos arquivos de KT**, principalmente os `*.docx` por cliente (estilo `ABSCO Project.docx`) e o `Knowledge Transfer Main.xlsx`.
2. **Validar a visão de tabela** (`brand → commodity → product → UPC → KPIs semanais`) contra os dados disponíveis em **cada varejista**.
3. **Acompanhar com o cliente:**
   - Aprovação do time de Security para o **bypass de 2FA** (Walmart / Sam's).
   - Liberação de acesso ao **Item Sales Reports do Publix**.
   - Entrada em produção do **bot do Costco**.
4. **Performance do QlikSense** — tratar como ponto de atenção desde o início do design dos dashboards unificados.
5. **Mapear `SAP_SKU` × ausência de SKU** em alguns varejistas — definir estratégia de chave de produto unificada.
6. **Discutir com o cliente** a evolução da orquestração (dbt triggado pelo Automation Anywhere) e a observabilidade dos bots de RPA.
