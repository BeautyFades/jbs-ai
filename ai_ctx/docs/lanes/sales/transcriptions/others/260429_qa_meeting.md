# Anotações referentes à reunião de Q&A realizada com JBS em 29/04/2026.

## **Perguntas e respostas Rodrigo:**
Q: What is stored under PILGRIMS, SRC_EXTERNAL, SAP Tables — is it historical data?
A: PILGRIMS contains data from Dataiku. SRC_EXTERNAL contains data from Automation Anywhere, which overwrites data on every run (not historical). SAP tables are used to enrich descriptions, with no confirmed context for other usage.

Q: How are the mapping tables being ingested — are they derived from source tables, manually updated, or do they live as dbt seeds?
A: They are ingested via an ETL pipeline that lives in Dataiku. They are not dbt seeds.

Q: How does the Workflow Bots / Automation Anywhere process work?
A: Data Engineers develop the Python scripts. The RPA team then adapts, deploys, and maintains them.

Q: What tables are Sam's and Walmart manual data being ingested into?
A: TBD — Denys will provide this information via the project documentation link.

## **Perguntas e respostas Vitor:**

Q: Problema de performance no dashboard Kroger é no carregamento dos dados ou no front-end?
A: É no front, não sabem muito bem o motivo, tem que investigar

Q: O Write-back table é utilizado somente para exibir as informações ou também há o input de informações?
A: Inicialmente só para exibir, mas no futuro, os usuários vão imputar dados

Q: Esclarecer melhor os fixes a serem implementados no Projeto Costco?
A: Ajustar campo já existente (Dollar Share of Segment) para considerar somente quando os dados de segmento estiverem disponíveis. Criar novo campo (Dollar Share by Subcategory), análogo ao by Segment. Verificar como unir dois relatórios (Subcategory e Segment)

Q: Explicar melhor o conceito de Velocity?
A: Velocity é uma métrica de performance de varejo que mede a eficiência de venda de um produto por ponto de distribuição, eliminando o viés causado pela variação no número de lojas que vendem aquele item.

Q: Qual é a maior prioridade no momento?
A: Em Qlik, a prioridade é construir os dashboards, para atestar que os dados estão chegando. Posteriormente, atacar as melhorias de performance

## **Anotações Gerais:**

- QlikSense dashboards main users: Zach, Tiffany, Marcia
- Lesia (PM) e Denys (DE) são prestadores de serviço por outra consultoria, e o contrato deles se encerra em 30 de abril de 2026. Por isso estão fazendo o repasse para nós. 
- Em suas rotinas (scrum based), tinham sessões de demo com os usuários a cada 2 semanas. 
- Lesia sugeriu conversar com Tiffany - ela deve ser uma boa referência quando precisarmos falar dos dados de Sam's e Walmart.
- Khrystyna (PM) e Felipe (DE) também são de outra consultoria, mas eles continuarão atuando (em outros projetos, não neste nosso). Felipe pode nos ajudar com informações relacionadas ao pipeline de dados.
- Lili é a responsável pelo nosso projeto. Como ela está de licença maternidade, Dustin permanece temporariamente como responsável e nosso ponto focal.
- Precisamos agendar as rotinas com Dustin (Lesia compartilhou as rotinas e horários que eles costumavam ter: dailies, plannings, demos...). Lili costumava participar de todas as dailies, mas Dustin tem a agenda mais agitada e talvez não consiga participar.
- Nataliia (chamam de Nata) é a pessoa que vai nos repassar os detalhes no escopo de BI (QlikSense).
- Jacob é PO do projeto em que Khrystyna está envolvida, e também costuma estar presente nas dailies do time da Khrystyna, junto com Lili. Durante a licença de Lili, Dustin deve ser nosso "PO" temporário.
- A responsabilidade por desenvolver os bots de migração de dados é do Data Engineer (agora Rodrigo), que depois deve encaminhar os códigos para a equipe da Automation Anywhere para automatizar os scripts.
- Denys ainda está devendo a documentação dbt que prometeu. Deve enviar até 30 de abril, fim do dia (seu último dia de contrato com JBS).

