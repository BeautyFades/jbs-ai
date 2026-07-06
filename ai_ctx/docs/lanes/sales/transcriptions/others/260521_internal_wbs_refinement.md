21 de mai. de 2026
JBS | Daily + Estimativas E1 WBS - Transcrição
00:00:00
 
Leonardo Contezini: Uhum. Boa. Bom, então vamos lá. Vocês conseguiram dar uma olhada no documento? Eh, levantaram as anotações?
Vitor Hugo da Costa: Sim.
Leonardo Contezini: Como é que estão aí?
Vitor Hugo da Costa: Uhum. Levantei sim. Eh, você vai compartilhar a tela, ó.
Leonardo Contezini: Acho que a gente podia começar pelas anotações.
 
 
00:08:37
 
Leonardo Contezini: Então, eh,
Vitor Hugo da Costa: Tá beleza.
Leonardo Contezini: vamos ver se vai ter muita alteração estrutural.
Vitor Hugo da Costa: Tá.
Leonardo Contezini: Vamos ver.
Vitor Hugo da Costa: Eh, bom, do meu lado, eh, acho que a WP04, que é uma atividade de section ax, se eu não me engano, que você colocou ali. Eh, hoje é muito simples,
Leonardo Contezini: Ага.
Vitor Hugo da Costa: são poucos usuários, basicamente são usuários que eh são ligados aos clientes, então não é muita coisa ali. Eu acho que talvez dá para mesclar isso com a parte de governança e também com WP07 que eu esqueci para qual que é, tá?
Leonardo Contezini: Eh,
Vitor Hugo da Costa: Tô com a anotação aqui.
Leonardo Contezini: matriz de stakeholder.
Vitor Hugo da Costa: É, então dá para fazer uma mescla disso aí, entendeu? Eh, porque me parece que é realmente o section access ele é só voltado pros stakeholders para que eles possam ver só aquilo que é do do seu próprio negócio, né? Então, talvez dá para dar uma mso,
Leonardo Contezini: Aham.
Vitor Hugo da Costa: não sei se valeria gastar muito tempo nisso. Então, foi a primeira notação que eu fiz.
 
 
00:09:45
 
Leonardo Contezini: Essa planilha de section access hoje ela tá tipo naquele diretório que tu comentou e ela é válida para todos os apps,
Vitor Hugo da Costa: Ela é válida pros apps que que
Leonardo Contezini: né? Ou é uma para cada app.
Vitor Hugo da Costa: leem aquela aquele section axis. No caso, o que eu achei aqui foi o porque no a o script hoje ele não lê um QVD que no caso, né, você vai aí daria para entender, pô, talvez isso daí alimente mais dashboards, né? ele lê diretamente aquele aquele arquivo e ele tá vinculado ao store level data, então tá dentro da pasta de store level data. Então eu acho que é só desse app mesmo. Me dá a impressão como tá organizado que seja isso.
Leonardo Contezini: Entendi. É porque, tipo assim, esse aqui é de acesso, né?
Vitor Hugo da Costa: É,
Leonardo Contezini: Contorno de acesso mesmo. Esse aqui seria mais essa parte de quem decide, quem valida, entendeu? Eh,
Vitor Hugo da Costa: entendi.
Leonardo Contezini: não é muito de acesso, por isso que eu pensei que faz sentido deixar separado, mesmo que seja algo rápido,
Vitor Hugo da Costa: Uhum.
Leonardo Contezini: tipo, beleza, essa essa lista de governança aqui, tudo bem, tá aqui dentro, mas o section Sim,
 
 
00:10:59
 
Vitor Hugo da Costa: Não, tranquilo. Beleza.
Leonardo Contezini: sim.
Vitor Hugo da Costa: Mas eh, tipo, é algo muito simples aqui, não é algo que seja muito au assim, né, robusto. Eh, outro ponto é o WP11 ali, o Kroger Performance Diagnoses. Eh, esse problema ele não é vinculado somente a Kroger, ele porque assim, a ETL dura 48 minutos, mas é tudo, né? Engloba tudo. E as partes que demandam mais tempo, elas são as partes de dos scripts que fazem a transformação para gerar os indicadores, que é velocity, eh, todas as agregações, né? Então, são esses scripts aí. O que mais demora de fato é Kroger, né? Kroger ele tem mais, consome mais tempo, mas os outros também consomem tempo ali. Então não sei se vincular esse só o Kroger faz sentido. Eu acho que isso também vai entrar um pouco dentro da questão de da estratégia da ETL que a gente vai tá fazendo, se a gente vai deixar tudo no clique ou se a gente vai deixar tudo no snowflake. Eh, e aí eu já faço um link com outro ponto que é no clique.
 
 
00:12:13
 
Vitor Hugo da Costa: Hoje a gente tá fazendo mais de fato os cálculos,
Leonardo Contezini: Угу.
Vitor Hugo da Costa: algumas agregações eh de produto, mapeamento de produto e tudo mais, de vincular, né, a tabela fato com algumas coisas. Mas é igual o Rodrigo falou, a gente comentou semana passado, as tabelas dimensões que existem ali, elas não servem para absolutamente nada, assim, eh, você consegue dar fato. Então, eh, em relação à estratégia de fazer A ou B, acho que a gente não seria muito complicado levar pro pro Z Lake, no caso, levar pro DBT, fazer lá as informações, ou podemos deixar no clique também, não tem nenhum problema, porque é muito simples o que é feito do lado do clique, entendeu? Pô, é só cálculo.
Rodrigo Imamura: É,
Leonardo Contezini: Sì.
Vitor Hugo da Costa: Pode falar,
Rodrigo Imamura: eu acho que para ganho de diminuir esse tempo de ETL faz total sentido a gente remodelar a nossa tabela
Vitor Hugo da Costa: Rodrigo.
Rodrigo Imamura: fato para adicionar né, esses cálculos. Daí na parte do clique, no máximo ele faz algumasizações, coisas que não demandariam muito tempo,
Vitor Hugo da Costa: Sim.
Rodrigo Imamura: porque no Snowflake a gente pode redimensionar a o poder computacional, essas coisas.
 
 
00:13:21
 
Rodrigo Imamura: Tem todas as otimizações de Snowflake que eu acredito que no conhecimento do clique, mas talvez não tenha. Então, acho
Leonardo Contezini: Cara, eh,
Vitor Hugo da Costa: Sim.
Leonardo Contezini: que tal a gente excluir essa WP11 aqui, porque é só um diagnóstico de performance e na verdade atuar realmente nessa nessas partes aqui, né, de estratégia de GTL e aí já nem deixar versus clique aqui, cara. Vamos colocar para snow plate, que que vocês acham?
Rodrigo Imamura: Uhum.
Leonardo Contezini: Deixa pensar aqui. Esse aqui é um temporário,
Vitor Hugo da Costa: Faz sentido.
Leonardo Contezini: tá?
Rodrigo Imamura: Eu acho que faz sentido sim.
Vitor Hugo da Costa: Uhum.
Rodrigo Imamura: A gente revisita cada um do das stories,
Vitor Hugo da Costa: Sim.
Rodrigo Imamura: né? É estratégio.
Vitor Hugo da Costa: Sim.
Leonardo Contezini: Ага. SN. Beleza. A gente já nem perde técnica.
Rodrigo Imamura: Beleza.
Vitor Hugo da Costa: Boa.
Rodrigo Imamura: Что?
Leonardo Contezini: Boa. Beleza. Eh, isso que eu ainda queria fazer uma limpeza assim dessas coisas que realmente não fazem muito sentido,
Vitor Hugo da Costa: Eh,
 
 
00:14:34
 
Leonardo Contezini: né, cara? Menos é mais.
Vitor Hugo da Costa: sim. Eh, aí também a gente tá elencando coisas que a gente já tá fazendo, né? Não necessariamente aquilo que vai fazer. Ah, tá beleza.
Leonardo Contezini: Sì.
Vitor Hugo da Costa: Último ponto que eu vi alguma coisa sobre eh tem alguns aí de right back tables e tudo mais, né, que tem sido bem falado nossas reuniões com o pessoal do do outro time de events. Eh, e até eles mencionaram hoje que eles estão, uma delas eles estão usando o SharePoint,
Leonardo Contezini: Угуm.
Vitor Hugo da Costa: né? Eh, tipo, white back table é boa. Por quê? Ela é boa no sentido de que ela é boa para rastrear quem fez mudança. Então, a hora que alguém faz algum tipo de mudança, aparece lá que horário que foi feito e quem que fez, né? quem fez aquele mapeamento, mas eu não sei aí que ouvir talvez mais do Rodrigo eh se a gente teria alguma algum outro tipo de solução, porque até a Cristina falou hoje sobre problemas de limitação que tem aquela right back table, né?
Rodrigo Imamura: É, eu fiquei interessado nessa solução do Sharepoint com Fav Trump,
 
 
00:15:38
 
Vitor Hugo da Costa: Então,
Rodrigo Imamura: porque planilha é bem, acho que acredito que seja é bem mais fácil de mexer do que clicar em cada uma das linhas,
Vitor Hugo da Costa: sim.
Rodrigo Imamura: selecionar entre as opções, confirmar. Acredito que na planilha você consegue fazer de uma forma mais rápida, mas acho que talvez perca essa rastreabilidade que o Víor falou aí. Acho que é trade do, né, da solução.
Vitor Hugo da Costa: Sim, acho que poderia ser talvez alguma coisa pra gente colocar aí, tipo, OK.
Leonardo Contezini: é novo ou adicionar em alguma alguma resistente aqui?
Vitor Hugo da Costa: Então não sei. É porque essas right back tables aparece assim, vai aparecer agora em Walmart e aparece muito em Kroger, né? Mas a gente vê isso também para outros casos, né?
Rodrigo Imamura: M.
Vitor Hugo da Costa: Tipo de circun lá tem um monte de right back table ali dentro. Então talvez a gente pensar numa solução diferente para que isso seja feito, esses mapeamentos sejam feitos.
Rodrigo Imamura: padronizar como é feita essa essas tabelas manuais, né?
Leonardo Contezini: talvez nas foundations aqui,
Vitor Hugo da Costa: Isso.
Leonardo Contezini: porque pô, é de tudo, né, cara? Basicamente para mapear produto.
 
 
00:16:58
 
Rodrigo Imamura: É do o código do Store pro código SA, né?
Leonardo Contezini: Uhum. Eh, aqui algo assim, né?
Vitor Hugo da Costa: Угуm.
Leonardo Contezini: Mas aí a gente precisa também, é, primeiro precisa entender como funciona essa parte do SharePoint, né? Ver se a gente consegue ter rbilidade ainda. A gente vai ter pela edição dos arquivos.
Rodrigo Imamura: É,
Leonardo Contezini: Tem versões, provavelmente
Rodrigo Imamura: na Acredito que sim,
Vitor Hugo da Costa: Да.
Rodrigo Imamura: mas vocês concordam que é mais fácil no SharePoint a edição,
Vitor Hugo da Costa: É, eu eu tava pensando em algo mais amigável pro usuário mesmo.
Rodrigo Imamura: preenchimento?
Vitor Hugo da Costa: É, até até anotei aqui alguma solução mais amigável, entendeu?
Rodrigo Imamura: Acho que ele devem tá bem familiarizado com Excel assim.
Vitor Hugo da Costa: Eh,
Rodrigo Imamura: Ok.
Vitor Hugo da Costa: é, é a primeira vez que eu vi o right back, assim, eu nunca vi todos os clientes que eu trabalhei, clique, essa questão de mapeamento até section access, tudo feito em Excel. Então, é a primeira vez que eu tô vendo isso daí.
Leonardo Contezini: Não. Beleza, vamos pensar nisso aqui então.
 
 
00:18:30
 
Leonardo Contezini: Eh, focado mais na parte de Sharepo então porque tem que ter uma aba lá pro pros right back tables, né? lento, né,
Vitor Hugo da Costa: É,
Leonardo Contezini: cara?
Vitor Hugo da Costa: então a gente tá adicionando mais uma que lá realmente ficar focado em ser só exibição de dados, análise de dados, não input,
Leonardo Contezini: Uhum. Ah,
Vitor Hugo da Costa: né?
Leonardo Contezini: e inclusive tem um ponto importante que é se eles não quiserem usar click, o RB tables cai com terra aqui,
Vitor Hugo da Costa: Exatamente.
Leonardo Contezini: né?
Vitor Hugo da Costa: Se em algum momento mudar isso da estratégia,
Rodrigo Imamura: É
Vitor Hugo da Costa: já era.
Rodrigo Imamura: verdade.
Leonardo Contezini: Ponto. Legal. Mais alguma coisa aqui?
Vitor Hugo da Costa: Do meu lado, não foi o que eu anotei aí, foram esses pontos aí.
Leonardo Contezini: Tá. Diga,
Rodrigo Imamura: Minha parte é do SMD Foundation,
Leonardo Contezini: Rodrigo.
Rodrigo Imamura: que eu acredito que a gente tem que até que o Felipe falou hoje na reunião que vê aqueles padrões de boas práticas do DBT, acredito que vale botar um ponto aí também pra gente revisitar como tá o projeto
 
 
00:19:29
 
Leonardo Contezini: Uhum.
Rodrigo Imamura: DBT do Star Level Deira.
Leonardo Contezini: Esse eu acho que eu esse eu acho que tem aqui, né? Talvez não assim, mas esses 03, ó.
Rodrigo Imamura: É,
Leonardo Contezini: Eh,
Rodrigo Imamura: acho
Leonardo Contezini: colocar um padrão, né, reusável e com convenções de de nome.
Rodrigo Imamura: se
Leonardo Contezini: Eh, mais alguma coisa aqui que será que não tá incluso?
Rodrigo Imamura: ã é que não necessariamente é sobre modelagem
Leonardo Contezini: três aqui
Rodrigo Imamura: dimensional,
Leonardo Contezini: embaixo.
Rodrigo Imamura: mas não sei se dá para generalizar o projeto como um todo do DBT. Deixa eu ver. WP03.
Leonardo Contezini: É essa
Rodrigo Imamura: Deixa eu ver. Name convention.
Leonardo Contezini: aqui,
Rodrigo Imamura: É, acho que pode. Acho que entrei sim, só o título que me confundiu um pouco.
Leonardo Contezini: tá? Depois com a transcrição também dá para refinar isso
Rodrigo Imamura: Beleza. Daí, deixa eu ver. No tem noco 1.4.8,
Leonardo Contezini: aqui.
Rodrigo Imamura: tem aquela parte de incremental e tal.
 
 
00:20:33
 
Rodrigo Imamura: Daí o o Paco vai ter que fazer tanto para Costco quanto para Kroger também. Então teria que
Leonardo Contezini: Poscou. Угу.
Rodrigo Imamura: daí no acho que tem tanto no Walmart quanto no SAMS que é 1.5.2 ou 1.6.2 dois que é aprovação do bypass, segurança. Daí tem um passo que vem depois que é a criação das contas de Zapier e Twilo.
Leonardo Contezini: Ah, sim.
Rodrigo Imamura: Aí acho que isso entra como foundation, não sei se isso é foundation porque é tanto porque a criação do Twil e do Zarper vai resolver tanto S quanto Walmart. Aí não sei se ficaria
Leonardo Contezini: Ah, entendi.
Rodrigo Imamura: duplicado.
Leonardo Contezini: Eh, a gente pode criar em um. A gente já tá atuando com senso. Pode ser em um só,
Rodrigo Imamura: É, pode
Leonardo Contezini: né?
Rodrigo Imamura: ser.
Leonardo Contezini: Contação de conta. Pronto.
Rodrigo Imamura: Acho que do que eu tinha notado era isso. Acho que dos dos pontos que você colocou já abrange praticamente o que a gente vai ter que fazer. E de ver,
Leonardo Contezini: Tá
Rodrigo Imamura: acho que é é isso.
 
 
00:22:10
 
Rodrigo Imamura: O
Leonardo Contezini: boa. É, vocês chegaram a pensar em algum,
Rodrigo Imamura: mesmo.
Leonardo Contezini: alguma estimativa já pr as tarefas ou a gente monta tudo junto aqui? Sugestão era montar junto, né?
Vitor Hugo da Costa: É,
Leonardo Contezini: Se vocês já tiverem algo.
Vitor Hugo da Costa: acho que a gente pode montar junto.
Rodrigo Imamura: É, acho que a gente pode montar junto
Leonardo Contezini: Beleza? Então, vamos lá.
Rodrigo Imamura: mesmo.
Leonardo Contezini: Ã, na parte de fundação aqui, coloc fazer um mapa único. Isso aqui é o mapa esis, né? Como é hoje a gente já tem basicamente tudo pronto aqui.
Rodrigo Imamura: Uhum.
Leonardo Contezini: É só juntar mesmo e e montar num acho que numa visualização apresentável assim, né? Eh, tem alguns detalhes a mais que eu tinha colocado. Acho que a gente pode ver por aqui, ó,
Rodrigo Imamura: Sì.
Leonardo Contezini: que é cadê o diagrama versionado dentro de arquitetura aqui dentro. Eh, daí tem que ter essas informações, né? A conta de extração, o link de acesso, se tem fe ou não, quem que é um stakeholders, o autor do script e tudo mais.
 
 
00:23:17
 
Rodrigo Imamura: Uhum.
Leonardo Contezini: Eh, quanto tempo vocês acham que a gente levaria
Rodrigo Imamura: Ah,
Leonardo Contezini: nisso?
Rodrigo Imamura: acho que como a gente já tem mais meio que pronto, acho que um um dia, um dois dias, como você botou aí, acho que é factível.
Leonardo Contezini: B, então isso aqui fechou. Vou dar um OK. Depois eu pago aqui. Eh, a parte é o Tub. Essa parte acho que demora um pouco mais porque vai depender daqueles outros, né? Vai depender dos ADRs.
Vitor Hugo da Costa: Certo.
Leonardo Contezini: Eh, então acho que vai faz sentido talvez a gente pensar pôr ADR
Rodrigo Imamura: M.
Leonardo Contezini: primeiro.
Vitor Hugo da Costa: Pode ser. Pode
Leonardo Contezini: Ali que é isso
Vitor Hugo da Costa: ser.
Leonardo Contezini: aqui, certo? WP08 em diante. Aí tem que, que que vocês acham? Eu tenho que investigar como é hoje, pensar em como remodelar essas tabelas, talvez separar dimensões de fato, passar pro Snowflake, tal, tal,
Rodrigo Imamura: É,
Leonardo Contezini: tal.
Rodrigo Imamura: passar prison flake ver o DBT.
 
 
00:24:17
 
Rodrigo Imamura: É,
Leonardo Contezini: Mas isso é desenhar,
Rodrigo Imamura: acredito que é.
Leonardo Contezini: né? Isso é só
Rodrigo Imamura: Ah, só desenhar.
Leonardo Contezini: desenhar,
Vitor Hugo da Costa: Ja.
Rodrigo Imamura: Acho que hum aí entra toda a parte de diagnóstico, as coisas. M lá.
Leonardo Contezini: é aqui é mais um estudo de como vai ser, vai ser o mundo ideal,
Rodrigo Imamura: Uhum.
Leonardo Contezini: né?
Rodrigo Imamura: Ã, é, essa é uma tarefa maior que a outra que te botou um dois dias. Acredito que três dias assim é um tempo factível para Cada isso.
Leonardo Contezini: Para cada para cada boa. Nossa, ele botou S, cara. E isso aqui fica com com vocês dois, né? Ainda
Vitor Hugo da Costa: Sim,
Rodrigo Imamura: Sim, tem que conversar com o Wor para entender o que tem no clique.
Vitor Hugo da Costa: eu preciso passar pro Rodrigo agora.
Rodrigo Imamura: M.
Vitor Hugo da Costa: Isso.
Leonardo Contezini: tá tr dias. Ah. WP02. Eh, que seria unificar tudo, né? Vai, vai depender daqueles outros.
 
 
00:26:02
 
Leonardo Contezini: Pô, é bastante tempo, cara, pros outros. Seis, vai 18 dias, quase um mês pra gente mapear.
Rodrigo Imamura: Ne.
Leonardo Contezini: Mas é, beleza. Se é isso, é isso. Ã, é que o unificar é tranquilo, né? O que que vocês acham?
Rodrigo Imamura: É, depois de
Leonardo Contezini: Se bem que eu tenho seis, só que daí vai ter é unificado até o o app
Rodrigo Imamura: modelado.
Leonardo Contezini: unificado lá. Então tem ainda circana, tem NPD,
Rodrigo Imamura: Hum. Não é só star level, né?
Leonardo Contezini: não.
Rodrigo Imamura: Так.
Leonardo Contezini: Ah, deixa eu ver se tem ali. Tá vendo como tem várias coisinhas que a gente só vê assim, né? Só quebrando quebrando a cabeça aqui. A são as divergências. Não tem nada aqui. M.
Rodrigo Imamura: M.
Leonardo Contezini: B depende da seis.
Rodrigo Imamura: Depende também do publics, né, que tá tá block.
Leonardo Contezini: ficar bloqueado também. Eu eu vou ter três dias também para publics, né? Depois que bloquear,
 
 
00:27:47
 
Rodrigo Imamura: Uhum.
Leonardo Contezini: depois que desbloquear,
Rodrigo Imamura: Sim.
Leonardo Contezini: quer dizer,
Rodrigo Imamura: Acho que depois que tem tudo pronto, acho que esse expectativa tá OK, né?
Leonardo Contezini: né? É, eu acho que até um dia aqui, cara.
Rodrigo Imamura: É.
Leonardo Contezini: pessoal ver depois para organizar isso aqui se o cloud vai se virar, tá?
Rodrigo Imamura: Okay.
Leonardo Contezini: Acho que aqui a gente quer eh vale a pena talvez quebrar para esses para esses pontos aqui também. Eu vou adicionar isso lá em
Vitor Hugo da Costa: He. Pelo que eu entendi ainda,
Leonardo Contezini: cima
Vitor Hugo da Costa: isso aí vai ter que ver com quem que vai ficar, né? Talvez não fique nem com a gente,
Leonardo Contezini: também. Uhum.
Vitor Hugo da Costa: né?
Rodrigo Imamura: É, Cristina tinha sugerido do Felipe continuar com Circana.
Leonardo Contezini: É, tem falou de fase dois ali também, mas eu não sei, tá bem certo isso. Não sei se tem coisas que o que ela não sabe.
Rodrigo Imamura: Sor
Leonardo Contezini: Tá. É, daí aí acho que fica melhor porque daí, ó, a gente não vai ter de circana.
 
 
00:29:30
 
Leonardo Contezini: A gente até, eu acho que vem pra gente, por isso que tá tendo todas as sessões, mas a gente não vai ter NPD,
Vitor Hugo da Costa: Угу.
Leonardo Contezini: não vai ter SP,
Rodrigo Imamura: M.
Leonardo Contezini: fica em aberto e a gente consolida o restante, talvez é, acho que é isso. Beleza. WP03 SMD dimensional modeling standard. Isso acho que é uma DR, né? Ah, não. Esse é aquilo que a gente acabou de conversar,
Rodrigo Imamura: Isso.
Leonardo Contezini: tá?
Rodrigo Imamura: Ã, deixa eu pensar. Você acha que esse esse WP03 entra também com aquela parte do snowflake com snowflake versus click assim das transformações? Porque eu tô pensando,
Vitor Hugo da Costa: não complementar, né?
Rodrigo Imamura: acho que esse WP03 é mais como uma refaturação do projeto que já existe, mas pelo que eu entendi do projeto, hum, Hum. H. O que vocês entendem de de critério de completar essa essa tesque que ainda também certo? para
Leonardo Contezini: Cara, para mim seria um documento,
Rodrigo Imamura: mim
Leonardo Contezini: por exemplo, com os nomes assim, sabe? Padrões de nomes, como as tabelas devem ser nomeadas, como os campos devem ser nomeados.
 
 
00:31:23
 
Rodrigo Imamura: isso e esse padrão e tal tem um tem um documento geral da JBS que são que são essas bests que você tem que seguir,
Leonardo Contezini: Já tem. Entendi.
Rodrigo Imamura: que é o que o projeto não tá seguindo.
Leonardo Contezini: Entendi. Que é o que o Felipe comentou hoje.
Rodrigo Imamura: Isso. No nosso caso,
Leonardo Contezini: Boa.
Rodrigo Imamura: também existe esse débito que a gente tem que apropriar o nosso projeto a essas boas práticas.
Leonardo Contezini: Tá.
Vitor Hugo da Costa: อ
Rodrigo Imamura: É aquele documento DPT Doc que a gente falou bem no começo do projeto. Lá tem tudo que a gente precisa, mas adequar o projeto a essas boas práticas.
Leonardo Contezini: Tá? Então esse basicamente se fosse só o entregável nesse sentido, não seria
Rodrigo Imamura: É sobre documentação não,
Leonardo Contezini: necessário,
Rodrigo Imamura: porque já existe, seria mais adequar nosso projeto.
Leonardo Contezini: tá? Essa será que tem essa essas partes aqui? Tipo de do que vai para Silver, que vai para gold,
Rodrigo Imamura: Tem tem tudo tudo.
Leonardo Contezini: tem tudo lá. Ah, então não,
Rodrigo Imamura: Posso até mostrar para vocês aqui?
 
 
00:32:21
 
Leonardo Contezini: então esse aqui não precisa três
Rodrigo Imamura: Uhum. Tem tudo.
Leonardo Contezini: precisar. De acordo podemos
Vitor Hugo da Costa: Sì.
Leonardo Contezini: tirar.
Rodrigo Imamura: Acho que sim. Eu não sei se vale trocar para uma refaturação do projeto. Refaturar. por boas práticas.
Leonardo Contezini: Isso aqui vai vir fora. Eh, WP04 é a parte do section access ali. Então eu acho que tipo aqui tá até um checklist de antes e depois
Vitor Hugo da Costa: né? Assim, ela é o size dela, acho que tá correto. É, é rápido. Acho que até tá alto até.
Leonardo Contezini: é mais umas boas práticas mesmo, né, cara?
Vitor Hugo da Costa: Eh, aqui tá se for pegar como baseado no que tá hoje, ele tá pronto, né? A gente já tem esse section access
Leonardo Contezini: C V atrás,
Vitor Hugo da Costa: pronto.
Leonardo Contezini: velho. Vamos tirar isso aqui. A gente tá, né? Se tá difícil de pensar é porque não faz muito sentido, cara.
Vitor Hugo da Costa: É.
 
 
00:34:12
 
Leonardo Contezini: Remover deixar uso na governança W07. Beleza, fechou. Porque daí, tipo, tá lá, cara, vai atualizar, tem que atualizar o section access.
Vitor Hugo da Costa: Sim.
Leonardo Contezini: Fechou? Daí essa parte aqui, a cinco seria mais a de governança no sentido de não acontecer o que aconteceu com a nata,
Vitor Hugo da Costa: Tá.
Leonardo Contezini: né, de apagar lá o o arquivo.
Vitor Hugo da Costa: Sim. Eh, eu acho que isso daí desse, falando desse caso em específico, eu não sei se isso vai ser de fato um problema pensando que é só a gente que vai passar a atuar eh mais paraa frente, talvez com mais desenvolvedores. Sim, aqui no nosso time clique, isso daí seja um problema. A gente tem que pensar nisso, talvez.
Leonardo Contezini: Como
Vitor Hugo da Costa: Eh, tipo,
Leonardo Contezini: assim?
Vitor Hugo da Costa: a gente ter mais gente aqui dentro e um não afetar o trabalho do outro, entendeu? Que é o que aconteceu com a Nata e comigo.
Leonardo Contezini: Aham.
Vitor Hugo da Costa: Eh,
Leonardo Contezini: Sim.
Vitor Hugo da Costa: daí talvez criar algum tipo de padrão, pô.
 
 
00:35:32
 
Leonardo Contezini: Essa raça aqui, né? Aquela matriz que eu que eu mostrei para vocês, responsável.
Vitor Hugo da Costa: Sim, né? Eu acho que isso daí vai fazer mais sentido pra gente se a gente tiver mais desenvolvedor clique aqui dentro. Acho que isso faz sentido.
Leonardo Contezini: Mas isso é rápido também para fazer,
Vitor Hugo da Costa: Eh,
Leonardo Contezini: né? Isso aqui vai ser cada um dia.
Vitor Hugo da Costa: é, eu acho que é uma coisa, é, acho que é rápido, porque ali você citou até o QMC. QMC a gente não vai ter muito o que fazer, né? Agora, tipo, incluir aí,
Leonardo Contezini: Yes.
Vitor Hugo da Costa: como eu falei, se for um problema a questão de a usuária não tem acesso à stream, que é o que eu acho que deve estar acontecendo, estou falando do lado da dos clientes, né? Daí é, eu não sei como que a gente vai ter isso daí aí dentro, né? Porque o QMC a gente não tem autonomia para mexer, né? Então,
Leonardo Contezini: Uhum.
Vitor Hugo da Costa: seria legal se a gente tivesse, mas a gente não tem.
 
 
00:36:28
 
Leonardo Contezini: É isso. Acho que só quando a Lili voltar assim pra gente comear começar a agilizar,
Vitor Hugo da Costa: Sim,
Leonardo Contezini: tá? Eh, podemos manter aqui tipo de 4 a 8 horas,
Vitor Hugo da Costa: pode, pode manter
Leonardo Contezini: só para botar o PC os responsáveis,
Vitor Hugo da Costa: sim.
Leonardo Contezini: tá? Eh, esse aqui seria um dicionário de CPS. Esse esse eu acho importante para levar paraa frente as medidas, sabe? Até o aplicativo final. Porque assim, que nem a gente já viu hoje que o Briton tem as categorias próprias, nada impede de as pessoas terem indicadores próprios também. Cada um calcular a velocity de um jeito, então acho que vale padronizar isso em algum lugar. Eh,
Rodrigo Imamura: Угу.
Leonardo Contezini: hoje eu particularmente acho bem ruim a o jeito que reparo que foi feito, uma pasta para cada cliente com os detalhes jogados no acho que o ideal seria ter um doc unificado, né, com todos os KPIs, como eles são calculados e deu. Aí de onde vem o dado é outros 500, mas ali vai ser preto do branco, ó. Velocity.
 
 
00:37:26
 
Leonardo Contezini: É isso, isso,
Vitor Hugo da Costa: Sim,
Leonardo Contezini: isso.
Rodrigo Imamura: M.
Vitor Hugo da Costa: né? Eu acho que, ó, um a dois dias, cara, é, é que não são tantas medidas assim, né? Então, não é algo, é mais questão de documentar isso daí, né?
Leonardo Contezini: É, comenta no começo,
Rodrigo Imamura: Угуm.
Vitor Hugo da Costa: É,
Leonardo Contezini: depois só mantém.
Vitor Hugo da Costa: é isso.
Leonardo Contezini: É,
Vitor Hugo da Costa: Tá, é bem eh bem focadinho.
Leonardo Contezini: eu diria também.
Vitor Hugo da Costa: Acho que um, um ou dois dias dá, mas é uma coisa que vai ser difícil de parar,
Leonardo Contezini: Beleza.
Vitor Hugo da Costa: né, para para fazer.
Leonardo Contezini: Vai fazer.
Vitor Hugo da Costa: A gente vai ter queizar mesmo.
Leonardo Contezini: Eu posso fazer isso aqui.
Vitor Hugo da Costa: A gente tem que discutir com o Dustin e a gente falar,
Leonardo Contezini: Eu posso fazer essa parte.
Vitor Hugo da Costa: a gente vai parar para fazer
Leonardo Contezini: Hum. Eh, não, acho que a gente consegue, tipo,
Vitor Hugo da Costa: isso.
Leonardo Contezini: paralelizar aqui.
 
 
00:38:10
 
Leonardo Contezini: Eu puxo, só consulto se eu tiver alguma dúvida em relação a onde buscar a medida, mas eu consigo fazer. Inclusive a matriz aqui também. É, já tava, né?
Vitor Hugo da Costa: Não, mas a gente fora junto.
Leonardo Contezini: Tá, mas acho que é mais ou menos isso mesmo.
Vitor Hugo da Costa: F.
Leonardo Contezini: Eh, e agora esse essa matriz aqui, isso para mim tá repetido agora com aquela matriz raça, tá? ser bem sincero.
Vitor Hugo da Costa: Sì.
Leonardo Contezini: Eu acho que a gente pode manter tudo na cinco que que vai ter isso. Que vocês acham?
Rodrigo Imamura: Não, acho que faz sentido.
Vitor Hugo da Costa: Acho que sim.
Rodrigo Imamura: M.
Leonardo Contezini: Agora a gente começa a entrar nos de customers. Seria legal se a gente falasse de um e valesse para todos os outros, né? Então essa parte de ETL aqui a gente já bateu três dias.
Vitor Hugo da Costa: Tá.
Leonardo Contezini: Eh, aí tem app fixes que são os já mapeados, mas eu manteria mais num geral assim porque os que a gente vai fazer também vai ter o justiça com dois
Vitor Hugo da Costa: Tá, acho que tá aí, tá correto.
Leonardo Contezini: dias.
 
 
00:39:49
 
Vitor Hugo da Costa: Um, dois dias. Eu acho que do que tá mapeado hoje, eu acho que sim. Acho que tá correto.
Leonardo Contezini: Tá beleza. Hol
Vitor Hugo da Costa: É isso que eu queria entender com você. Eh, tipo, o WP10, o que que diferencia do WP9?
Leonardo Contezini: pergunta. Vamos ver. Ah, é porque acho que eu tá vendo agora.
Vitor Hugo da Costa: O nove é mapear e o 10 é implementar.
Leonardo Contezini: Ah, eu acho que era isso mesmo, tá? Aqui é só revisar o que eles já tinham levantado. Eh, e aqui seria já criar em richos, tá vendo? Daí vai ter subichos de cada fix,
Vitor Hugo da Costa: Entendi.
Leonardo Contezini: porque realmente pode ser tipo é um aqui é revisar o que precisa ser feito,
Vitor Hugo da Costa: Tá,
Leonardo Contezini: né? E aí acho que cabe em um, dois dias, certo?
Vitor Hugo da Costa: cabe, cabe.
Leonardo Contezini: Bastante coisa. É. E aí aqui a gente não sabe,
Vitor Hugo da Costa: Uhum.
 
 
00:40:45
 
Leonardo Contezini: pode ser,
Vitor Hugo da Costa: É.
Leonardo Contezini: depende, depende de cada um. É mais uma aqui é uma revisão geral e aqui é levantar os fixos
Vitor Hugo da Costa: Sim.
Leonardo Contezini: individuais.
Vitor Hugo da Costa: Legal.
Leonardo Contezini: Eu vou até deixar 100,
Vitor Hugo da Costa: Sentido.
Leonardo Contezini: ó, refinadas depois do Esse aqui vai cair fora, né? Quero cair fora. 11.
Vitor Hugo da Costa: É, é que isso daí ele vai a questão do click snowflake.
Rodrigo Imamura: Acho ele entra no primeiro
Vitor Hugo da Costa: É.
Leonardo Contezini: Ah, é verdade. Tá 12. H de se ela tá aqui é do
Rodrigo Imamura: M.
Leonardo Contezini: programa.
Vitor Hugo da Costa: É isso daí.
Leonardo Contezini: são aqueles milhões de linhas de inventó de de estoque.
Vitor Hugo da Costa: É, é isso daí. Acho que até dividido a responsabilidade, não é só o Rodrigo, né? Tipo, eu tenho que mostrar para ele como é que tá hoje no clique para ele entender como é que estão as coisas ali e claro depois executar. Mas
Rodrigo Imamura: que tira uma foto de como tá o inventor do de ontem.
 
 
00:42:06
 
Vitor Hugo da Costa: isso que até ele falou que tem muita duplicidade
Rodrigo Imamura: É.
Vitor Hugo da Costa: de informação, né? porque fica tirando foto toda hora e não precisava fazer isso.
Rodrigo Imamura: Acho que
Leonardo Contezini: Aqui acho que a gente tem que ser, não dá para deixar num range assim, tá? Tem que botar um tempo para poder refletir no board
Rodrigo Imamura: Угу.
Leonardo Contezini: lá.
Rodrigo Imamura: Uhum.
Vitor Hugo da Costa: Sei.
Rodrigo Imamura: Será que vai lhe quebrar em duas? Talvez execução e entendimento, não sei.
Leonardo Contezini: Por mim pode sair quando vocês preferem. Eh, o entendimento seria quanto
Rodrigo Imamura: Entendimento.
Leonardo Contezini: tempo?
Rodrigo Imamura: Acho que é, acho que daria para ser um, dois dias e um, dois dias cada uma das tesques.
Leonardo Contezini: Ah, boa. Meu Deus. Empendimento agora
Rodrigo Imamura: É, aí entendimento.
Leonardo Contezini: sala.
Rodrigo Imamura: Acho que pode colocar eu e o Vittor e implementação deixa
Leonardo Contezini: Uhum.
Rodrigo Imamura: comigo. M.
Leonardo Contezini: C Tá, cara. Esse aqui eu acho que tá tá controlado, tá?
 
 
00:44:07
 
Leonardo Contezini: Não sei o que que vocês acham, mas a princípio eh falei com a Cristina o que tinha acontecido. Hoje o e-mail vai pro Jacob e só precisa definir quem que faria a redefinição de senha, se era ele ou se era o Paco. E daí eu já coloquei os dois no mesmo chat lá e falei que eu achava que deveria ser o Paco. Se o Jacob podia redirecionar o e-mail e eles e o o Paco concordou. O dia que tá tá off até semana que
Rodrigo Imamura: Então acho que faz sentido.
Leonardo Contezini: vem.
Rodrigo Imamura: Acho que tá com tá com paco agora esses ownership da do bote, né? Tá
Leonardo Contezini: É isso aqui. É beleza.
Rodrigo Imamura: sem
Leonardo Contezini: Eh, aí dentro de CCO aqui já foi fixes backlog. Eu acho que é aquilo que a gente falou. Dois tias vai demorar. Beleza. Do Ah, o que eu falei era do Posco. Esse aqui não foi não. Prover não foi não. Hum. Isso aqui deixa comigo e aí já eu faço que é a mesma coisa aqui, né, pessoal?
 
 
00:45:38
 
Rodrigo Imamura: mesma coisa. Esse problema do inventory é para todos store level deira.
Vitor Hugo da Costa: Sim,
Rodrigo Imamura: Eu não
Vitor Hugo da Costa: não,
Rodrigo Imamura: lembro
Vitor Hugo da Costa: eu não vi isso. Assim, para ser sincero, eu não vi isso daí em ABS. Eh,
Rodrigo Imamura: essa ideia. O
Vitor Hugo da Costa: lado de cá do clique,
Rodrigo Imamura: problema
Vitor Hugo da Costa: vem a tabela fato lá e a gente tá lendo ela e vem pro histórico pronto
Rodrigo Imamura: é não sei da onde tá,
Vitor Hugo da Costa: já.
Rodrigo Imamura: em qual store tem esse inventory, essa tabela, né?
Vitor Hugo da Costa: É, essa daí eu lembro que é do Kroger, mas do Kroger eu vi agora não apareceu.
Leonardo Contezini: tem
Rodrigo Imamura: Esse inventar é do
Vitor Hugo da Costa: Eu
Rodrigo Imamura: Kroger.
Leonardo Contezini: Tá. Será que tá não tem dados de estoque então em nos demais?
Vitor Hugo da Costa: não achei dos outros.
Rodrigo Imamura: Eu não sei dizer com certeza.
Vitor Hugo da Costa: Eu posso dar uma revisitada e depois eu falo para vocês amanhã.
Leonardo Contezini: Tá.
Rodrigo Imamura: Esse esse WP P20, ele entra no primeiro item dois ou não necessariamente.
 
 
00:47:12
 
Leonardo Contezini: Esse aqui é é como vai ser, né? É o mapa de como vai ser esse aqui.
Rodrigo Imamura: Hum.
Leonardo Contezini: O outro é
Rodrigo Imamura: Hum. Tá aí.
Leonardo Contezini: implementar.
Rodrigo Imamura: Esse WP ele existe para todos os customers.
Leonardo Contezini: Opa,
Rodrigo Imamura: Eu só não lembro de ter
Leonardo Contezini: era para ter, né?
Rodrigo Imamura: visto.
Leonardo Contezini: A cusco.
Vitor Hugo da Costa: Так.
Leonardo Contezini: Não tem. Ó,
Vitor Hugo da Costa: M.
Leonardo Contezini: tá aqui fix.
Rodrigo Imamura: É, acho que teria para colocar para todos.
Leonardo Contezini: E pode ser que aconteceu é que pode ser que ele entendeu que vai estar nos fixes.
Rodrigo Imamura: Hum.
Leonardo Contezini: Vamos ver aqui no School.
Rodrigo Imamura: É.
Leonardo Contezini: Tem que a gente acabou de ver. Não ó,
Rodrigo Imamura: Так.
Leonardo Contezini: aqui também.
Rodrigo Imamura: Угу.
Vitor Hugo da Costa: Os que não t construído, ele deve ter feito Всё.
Rodrigo Imamura: Hum. Então, a gente teria que adicionar ou só deixa lá no fix para pros outros?
Leonardo Contezini: Não, acho que vale adicionar, vale adicionar o esse dimensional modeling para todos eles.
Rodrigo Imamura: É,
 
 
00:48:35
 
Leonardo Contezini: É,
Rodrigo Imamura: tá.
Leonardo Contezini: e inclusive vale ter em mente lá no mapa to be as camadas também, né? as camadas de dados bem certinhas. E aí, nesse caso, não sei, Rodrigo, se tu acha que dá pra gente estimar essa tarefa já ou é muito cedo ou a gente trabalha com o
Rodrigo Imamura: Hum. Eu acho que coloca uma observação que esse
Leonardo Contezini: Enge.
Rodrigo Imamura: size vem depois do do que tá lá em cima. Ele depende.
Leonardo Contezini: aqui.
Vitor Hugo da Costa: É isso daí vai basicamente lá pro pro outro, né? Se a gente vai levar tudo pro pro
Leonardo Contezini: Aqui vai ser aqui vai ser só o load e alguns cálculos
Vitor Hugo da Costa: Snowflake.
Leonardo Contezini: de
Rodrigo Imamura: Vai simplificar bastante,
Vitor Hugo da Costa: É, acho que aí dá para deixar,
Rodrigo Imamura: né?
Leonardo Contezini: Да.
Vitor Hugo da Costa: não dá para deixar tipo o load e também eu quero levar as variáveis pro script, né? Essas algumas variáveis estão sendo cálculos estão sendo criadas lá no no
Rodrigo Imamura: M.
Vitor Hugo da Costa: front. Então, trazer isso pro script para por conta de boas práticas.
 
 
00:50:03
 
Vitor Hugo da Costa: Então, tá dentro disso aí.
Leonardo Contezini: será Olhá. Sim, pode ser.
Rodrigo Imamura: Sim,
Vitor Hugo da Costa: Pode.
Rodrigo Imamura: faz sentida.
Leonardo Contezini: A tem 10 minutos. Eh,
Vitor Hugo da Costa: Tá,
Leonardo Contezini: 22.
Vitor Hugo da Costa: tá OK. Eu acho que é difícil eh tipo mais que dois dias, porque é que assim, a gente tá falando da da do que que tem hoje,
Leonardo Contezini: Mas como
Vitor Hugo da Costa: né, da do tabelão,
Leonardo Contezini: assim?
Vitor Hugo da Costa: né,
Leonardo Contezini: Não tá vendo?
Vitor Hugo da Costa: que o pessoal vai validar tabelão.
Leonardo Contezini: Não
Vitor Hugo da Costa: Então, acho que aí é dois dias,
Leonardo Contezini: é
Vitor Hugo da Costa: mais que dois dias fica muita coisa.
Leonardo Contezini: dois dias. Isso aqui R PC. Ah, tá. Lembra que tu levantou esse
Rodrigo Imamura: Hum. Esse é o que eu resolvi,
Vitor Hugo da Costa: Hum.
Leonardo Contezini: ponto?
Vitor Hugo da Costa: É, é porque o Rodrigo já resolveu.
Rodrigo Imamura: né?
Vitor Hugo da Costa: Isso daí pode descartar, eu acho.
 
 
00:51:26
 
Leonardo Contezini: WP24 stakeholder validation. Ah, tá. É só etapa de validação mesmo, cara.
Vitor Hugo da Costa: É,
Leonardo Contezini: Isso aqui colocaria.
Vitor Hugo da Costa: se parece pessoas bem ocupadas,
Leonardo Contezini: Eh, mas eu então eu colocaria mais tempo,
Vitor Hugo da Costa: viu?
Leonardo Contezini: colocaria, sei lá, 5 dias por aí, mas não depende da gente, né? Dá para paralizar total,
Vitor Hugo da Costa: Sim.
Leonardo Contezini: cara. Então, que por que que a gente colocaria isso aqui? e vai impactar em alguma tarefa. Lá na frente a gente vai juntar e vai precisar disso,
Vitor Hugo da Costa: Sim.
Leonardo Contezini: tá? incremental
Rodrigo Imamura: Esse é o que ficou com paco
Leonardo Contezini: refractor.
Rodrigo Imamura: agora.
Leonardo Contezini: Será que vale algum follow-up aqui, acompanhamento,
Rodrigo Imamura: Acho que é,
Leonardo Contezini: Rodrigo?
Rodrigo Imamura: acho que nossa parte é mais acompanhamento.
Leonardo Contezini: Ah, e esse aqui também era aquele lá, né? Olha comigo. Tá beleza. 26 é comigo. Só fazer um mapeamento.
 
 
00:53:25
 
Leonardo Contezini: Eh, sen aqui já foi. Daí tem outro de apuro.
Rodrigo Imamura: É, é, é, é acompanhamento, né? Acho que já tá bem
Leonardo Contezini: Beleza.
Rodrigo Imamura: descrito.
Leonardo Contezini: Eh, carga manual. Acho que
Rodrigo Imamura: Só tem um que eu fico fazendo aí toda terça, quarta. Agora o desenvolvimento a gente já fez.
Leonardo Contezini: vai
Rodrigo Imamura: Aí agora é mais baixar,
Leonardo Contezini: dar
Rodrigo Imamura: inserir, executar. Isso aí eu é forçar man a ingestão manual é um um dia toda. Um dia, quer dizer,
Leonardo Contezini: é que eu acho que isso aqui, ó, tipo,
Rodrigo Imamura: é
Leonardo Contezini: é substituir a parte que eles não tinham feito. Lembra que era que tu já fez
Rodrigo Imamura: assim. É isso aqui eu já fiz.
Leonardo Contezini: também? Beleza. Eh, esse aqui eu não me
Rodrigo Imamura: Esse esse esse também eu já
Leonardo Contezini: lembro.
Rodrigo Imamura: fiz.
Leonardo Contezini: Isso aqui eu acho que é tudo
Rodrigo Imamura: É, esse do desenvolvimento do bote. É, acho que de todas trefas acho que é mais, vai ser a mais que demanda mais tempo.
 
 
00:54:52
 
Rodrigo Imamura: Então, é o, eu não sei mencerito em dias. Hum. Porque ah, agora pensando, talvez porque a gente vai ter que desenvolver a automação lá no Zapier também, né? Além de criar conta,
Leonardo Contezini: M.
Rodrigo Imamura: vai ter o desenvolvimento do da automação e depois desenvolvimento do bote. Então acho que dá para quebrar em duas tarefas, desenvolvimento do bote e desenvolvimento desenvolvimento da automação. E acho que dá para colocar dois,
Leonardo Contezini: Ja.
Rodrigo Imamura: três, sim. Acho que deixa eu pensar, três, quatro dias pro bote e automação do Pelo que eu consegui mexer, é bem simples.
Leonardo Contezini: É, quer acrescentar algum detalhe aqui do que precisa ter no desenvolvimento do bote ou no desenvolvimento da automação?
Rodrigo Imamura: Hum. Na descrição eu Ah.
Leonardo Contezini: É, se quiser falar daí já
Rodrigo Imamura: O que eu posso botar depois assim? Acho que eu tenho que pensar
Leonardo Contezini: é creative off.
Rodrigo Imamura: direitinho.
Leonardo Contezini: Ah, tá. Isso aqui é é para para enviar, né, para eles. Cara, esse eu acho que não pode. A gente não pode contar esse tempo deles aqui, né?
 
 
00:56:46
 
Rodrigo Imamura: Do backlog dele também, né?
Leonardo Contezini: É, então eu acho que é mais isso aqui, porque tipo assim, a ideia de ter esses WPs é a gente mapear o nosso trabalho. Então, cara, desenvolveu,
Rodrigo Imamura: Uhum.
Leonardo Contezini: tipo, vai mandar pro time de RP, não vai ocupar o nosso tempo isso, né? É mandar e tá fazendo follows.
Rodrigo Imamura: Não. Sim.
Leonardo Contezini: Eh, e a documentação dos bots,
Rodrigo Imamura: Deixa eu ver documentação. Tá, tá OK.
Leonardo Contezini: diam normal. Isso é aquilo que a gente já falou e também, né, Vitor?
Vitor Hugo da Costa: Aí já tá tá certo.
Leonardo Contezini: Acho que é mais ou menos por aí, galera. Aqui não vai ter nada diferente.
Rodrigo Imamura: Acho que o 37 a gente tem que
Leonardo Contezini: 37. Ah,
Rodrigo Imamura: esse é o que não existe. Aí acho que é trabalhar junto com aquele WP que a gente fala se vai usar
Leonardo Contezini: boa.
Rodrigo Imamura: um o SharePoint ou vai usar uma back table que a gente tem que acho que combinar como a gente vai fazer e apresentar pra Tiffany. Acho que a Tiffanys, né, Víor?
 
 
00:58:35
 
Vitor Hugo da Costa: Isso.
Rodrigo Imamura: e apresentar para ela para que ela consiga preencher o
Leonardo Contezini: Tá
Rodrigo Imamura: mapeamento.
Leonardo Contezini: beleza. Cara, faz sentido a gente estimar isso aqui,
Rodrigo Imamura: Hum. Acho que não. No momento
Vitor Hugo da Costa: Não, depende da outra.
Rodrigo Imamura: não,
Leonardo Contezini: tá?
Vitor Hugo da Costa: Hora que a gente fechar a estratégia aí, ter aprovada, aí a gente consegue estimar.
Rodrigo Imamura: porque acho que o o fluxo vai tá pronto, né, Vittor?
Leonardo Contezini: Beleza.
Rodrigo Imamura: Acho que é mais a Tiffany preencher para começar a popular seu dashboard.
Vitor Hugo da Costa: Exato. Ja.
Leonardo Contezini: Boa. É verdade. Beleza. Eh, aí public não vamos nem gastar tempo e circana. Eu acho que, cara, já já é 4:30.
Rodrigo Imamura: M.
Leonardo Contezini: Eu acho que vamos não vamos fazer tudo de uma vez só. Vamos fechar assim com o que a gente fez até chegar num num modelo realista ali, ver se faz sentido e qual coisa a gente ajusta depois.
Rodrigo Imamura: É, acho que ainda vai ter mais reuniões circana, né, para
 
 
00:59:46
 
Leonardo Contezini: É, vai ter.
Rodrigo Imamura: entender.
Leonardo Contezini: Uhum. Eh, o que que vocês estão achando ali de circão, tá ficando claro?
Rodrigo Imamura: Acho que eu como um todo assim, acho que tá bem claro, consegui entender como eles estão ingerindo e tal. O objetivo que é no momento é comparar, né, as vendas. Acho que tá. Tá OK por enquanto.
Leonardo Contezini: A gente tem a gente tem acesso a todas as tabelas ali, né? Onde que a gente precisa acessar,
Rodrigo Imamura: Sim,
Leonardo Contezini: tá?
Rodrigo Imamura: sim.
Leonardo Contezini: Fechou? E e cara, no caso de um desligamento ali da Cristina,
Vitor Hugo da Costa: Ja.
Leonardo Contezini: do Tac, né? Eh, que riscos que vocês vem assim, que a gente poderia tá perdendo?
Rodrigo Imamura: M.
Leonardo Contezini: Угу.
Vitor Hugo da Costa: falando do meu lado, que seria a Cristina e a Natália, no caso, né? Acho que hoje nada. Acho que assim, lado de clique, acho que é muita coisa agora que tem que ser alinhada com o Dustin, na verdade, aqueles aquela carinha do painel, né, que tá que a gente concordou que tá demais, né?
 
 
01:00:57
 
Vitor Hugo da Costa: Até você levou para ele que vai precisar fazer um alinhamento, mas até chegar lá acho que vai mais um tempo ainda.
Leonardo Contezini: Вот.
Rodrigo Imamura: Acho que da minha A parte,
Vitor Hugo da Costa: Ne.
Rodrigo Imamura: acho que é o que vai ser o até o ponto da próxima reunião, que é documentação e tal, porque pelo que ele mostrou lá no dataico, tá tudo bem desenhado, mas é uma plataforma que vai ser desligada, né? Então acho que ter o reflexo do ataico numa documentação pra gente ter de registro e e o fluxo é bem grande até.
Leonardo Contezini: Sim, difícil, né? A gente não pode,
Rodrigo Imamura: Não
Leonardo Contezini: tipo, hoje eles são um contato de emergência assim, né? Pô, como é que é tal coisa? Mas se a gente tiver um mapeamento bem claro e daí aí tu acha que tendo acesso lá ao
Rodrigo Imamura: sei.
Leonardo Contezini: dataico, dá para substituir, no caso esse contato?
Rodrigo Imamura: Hum. Acredito que sim, mas acho que é algo que a gente vai conseguir ficar bem mais claro na próxima reunião, que é mais documentação, registro, mas acho que sim.
Leonardo Contezini: Sim. Beleza. Bom, fechou, galera. Obrigado aí. Vamos, vamos refirar e mando para vocês. Fechou?
Vitor Hugo da Costa: Combinado. Valeu,
Leonardo Contezini: Valeu.
Vitor Hugo da Costa: pessoal.
Rodrigo Imamura: Beleza.
Leonardo Contezini: Até mais.
Vitor Hugo da Costa: É
Rodrigo Imamura: Que mais?
Leonardo Contezini: Ah.
 
 
A transcrição foi encerrada após 01:02:27

Esta transcrição editável foi gerada por computador e pode conter erros. As pessoas também podem alterar o texto depois que ele for criado.
