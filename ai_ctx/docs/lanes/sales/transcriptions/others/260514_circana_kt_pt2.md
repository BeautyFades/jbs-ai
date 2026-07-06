# Reunião de repasse dos desenvolvimentos para Circana - Pt. 2
Realizada em 14 de maio de 2026

Há um plano de redesign do Circana App, que vai substituir o [JBS Market Sales Insight App](https://qlikdev.jbssa.com/sense/app/9d033d10-af22-449e-9109-06dbf0ab40ad/sheet/DwZCAmn/state/analysis). O redesign foi proposto por Dustin, bem como o design deste novo report. É uma visualização super complexa, que por enquanto está disponível apenas através de [mockups no Excel](https://jbsusafoodcompany.sharepoint.com/:x:/s/MarketDataIntegration/IQC5B8OtcSvwS4ucwRc72AJbAWDB26Wd7Fz4yBB8PJIsz_I?e=lLvbPa). 

A ideia inicial é de que gráficos em laranja representem "Market Sales", e gráficos em azul representem "JBS/Pilgrim's Sales".

Em vez de "JBS", as visualizações principais carregam o nome de "Pilgrim's" mesmo que o dashboard trate de outras proteínas além de "chicken". De acordo com Khrystyna, isto foi outro pedido específico de Dustin: mesmo que Pilgrim's de fato trabalhe apenas com chicken, ele pediu para mostrar desta forma.

O mockup contém excesso de visualizações, tabelas e gráficos, com regras de cores também excessivas.

Antes de começar a desenvolver o novo app, é importante garantir a qualidade/confiabilidade dos dados (que de acordo com a última reunião de KT para Circana, ainda não estão de acordo com a expectativa do usuário), e dividir com Dustin estas opiniões pessoais sobre as visualizações. Pode fazer sentido reformular o novo design, simplificando as telas, ou dividindo em mais telas para análises específicas (hoje está tudo concentrado em poucas telas, onde é necessário rolar a tela para analisar o dashboard completo).

As visualizações abaixo forma sugeridas por Briton e parecem bem-vindas:

*OBS 01: Khrystyna mencionou ser "Market Sales", mas parece ser Internal Sales.*
*OBS 02: Dados de volume dentro do quadro "Static" são representados em dólar - que preço é utilizado?*

<img width="1353" height="354" alt="image" src="https://github.com/user-attachments/assets/7aa235d7-a4c5-4852-baaa-204d6cbadf21" />

Static portfolio: produtos vendidos no ano atual e no ano passado (ou período selecionado atual vs período selecionado no ano passado).
New portfolio: produtos vendidos apenas no ano atual (ou período selecionado atual vs período selecionado no ano passado).
