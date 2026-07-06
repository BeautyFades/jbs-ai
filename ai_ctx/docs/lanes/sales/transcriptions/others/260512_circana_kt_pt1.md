# Reunião de Knowledge Transfer (KT) - Circana
Data: 12 de maio de 2026

Dustin está com acesso ao Claude, já conectado aos dados de Circana.

Dados extraídos de Circana:
<img width="1342" height="759" alt="image" src="https://github.com/user-attachments/assets/55e5b9ca-abff-448b-afd1-85d52a1b5caf" />

Na tabela GEOG_META ou BRAND_GEOG_META tem "Retailer" e "Geografy", que são separados manualmente. Se não separar, pode ter dado duplicado. Tem um planilha de DE-PARA:

<img width="1342" height="759" alt="image" src="https://github.com/user-attachments/assets/fac676ff-8a07-4a02-9c10-4788052f77ad" />

O campo UPC_13_DIGIT é usado para a maior parte dos joins:

<img width="1342" height="759" alt="image" src="https://github.com/user-attachments/assets/bff7bce4-e2d7-45ed-a11b-d053abed04fe" />

Se os produtos foram mapeados (category, sub-category and segment) o status = "MAPPED":

<img width="1342" height="759" alt="image" src="https://github.com/user-attachments/assets/ef1ee65d-e61b-474a-989b-6b1a2d45f4e6" />

Caso contrário, o status = "UNMAPPED":

<img width="1342" height="759" alt="image" src="https://github.com/user-attachments/assets/217a6441-dd9d-41e3-9234-ea5ca8a26cc2" />

Khrystyna menciona "Briton" como o contato que faz os mappings de produto (confirmar contato). A frequência de atualização deve ser pensada (hoje não tem uma frequência muito bem definida, acontece a cada ~3 meses). É uma tarefa que toma muito tempo do usuário. Esse mapping é somente para produtos "Chicken", os demais (beef, pork) usam categorias oriundas do Circana.

Categorias mais importantes (para chicken):

<img width="1342" height="759" alt="image" src="https://github.com/user-attachments/assets/6a7d5aee-8320-4c26-b412-c5eb4cc431b6" />

Para beef and pork parece haver apenas 2 categorias: beef + frozen beef, pork + frozen pork.

As tabelas BRAND_SALES_DATA e SALES_DATA tratam das vendas em:

- Dollar Sales - receita em dólar
- Volume Sales - em 'pounds'
- Unit Sales - em quantidade

<img width="1342" height="759" alt="image" src="https://github.com/user-attachments/assets/7f38d00a-cf8a-438b-a7dd-19792793a41f" />

Estas tabelas também tem as quantidades vendidas por loja e por semana, que são essenciais para o cálculo do indicador de Velocity.

Há um gráfico  "4P Analysis" solicitado pelo usuário para analisar Beef and Pork:

<img width="1342" height="759" alt="image" src="https://github.com/user-attachments/assets/b3bd29dc-0055-4290-b643-1e80e8bac437" />

O stakeholder responsável por Pilgrims (parece ser Briton) não solicitou este gráfico e a análise é diferente:

<img width="1342" height="759" alt="image" src="https://github.com/user-attachments/assets/3493bbfd-120b-47ed-bfbc-8d0204642d2e" />

A ideia da imagem abaixo é esclarecer que eles desejam criar uma única aba "Category Development", e dentro desta aba o usuário filtra se quer ver chicken, beef, pork ou prepared foods:

<img width="1342" height="759" alt="image" src="https://github.com/user-attachments/assets/646b6fe3-d663-4811-92bf-9ea0ddb67317" />

## App. Qlik - JBS Market Sales Insight

<img width="1342" height="759" alt="image" src="https://github.com/user-attachments/assets/cace366e-b0f2-49d0-bf2a-4008350a2d00" />

OBS: não há usuários utilizando o app por enquanto pois os dados não são confiáveis (divergência entre UPC-level e Brand-level). Isto precisa ser investigado de maneira criteriosa.

Na próxima chamada ela (Khrystyna) deve nos mostrar os mock-ups para explicar como funciona cada visualização dentro do app. Também vai nos enviar assícnrono:

- Contatos de cada stakeholder (ex: "Briton");
- Link para o Qlik App apresentado.

