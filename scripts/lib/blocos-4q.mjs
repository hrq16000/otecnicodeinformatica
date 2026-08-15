// ─────────────────────────────────────────────────────────────
// RODADA 4Q — aprofundamento autoral das rotas que ainda apareciam como
// grau B no inventário de herança editorial (volume abaixo do alvo de 800
// palavras), sem elevar sobreposição entre páginas.
//
// Cada bloco é específico do contexto da rota: nada de texto genérico
// repetido entre páginas, nada de avaliação, depoimento, endereço físico,
// prazo fixo, parceiro ou estatística inventada. Preços e políticas
// espelham src/lib/precosConfig.ts, /precos-e-politicas e
// /termos-e-condicoes.
//
// Estes blocos são ANEXADOS aos blocos já existentes da rota
// (ver scripts/curated-routes-meta.mjs).
// ─────────────────────────────────────────────────────────────

export const BLOCOS_4Q = {
  "/": [
    {
      titulo: "O que muda quando o diagnóstico vem antes do orçamento",
      paragrafos: [
        "O padrão do mercado é inverter a ordem: primeiro se dá um preço, depois se descobre o defeito. É assim que aparece o notebook com fonte trocada que continua não ligando, ou o computador formatado três vezes que segue lento porque o disco mecânico está no fim da vida. Aqui a sequência é a oposta — mede-se alimentação, armazenamento, memória e temperatura, e só então se diz o que compensa fazer.",
        "Na prática isso significa que você recebe três informações antes de autorizar qualquer coisa: qual é a causa provável, qual procedimento a resolve e quanto custa cada etapa separadamente. Se o reparo não compensar diante do valor do equipamento, isso é dito com o mesmo cuidado com que se apresenta um orçamento aprovável.",
      ],
    },
    {
      titulo: "Como a triagem pelo WhatsApp economiza a sua visita",
      paragrafos: [
        "A triagem não existe para adiar atendimento: ela existe para não deslocar técnico à toa. Quatro perguntas — qual equipamento, o que aconteceu, quando começou e o que foi tentado — já separam o caso que se resolve por acesso remoto do caso que precisa de bancada. Boa parte dos atendimentos de sistema, e-mail, impressora em rede e lentidão por software termina sem ninguém sair de casa.",
        "Quando o caso é de hardware, a mesma triagem define se a visita técnica de até trinta minutos resolve no local ou se o equipamento precisa ser recolhido. Nesse segundo caso a coleta é oferecida sem custo de deslocamento, com mínimo pré-aprovado de R$ 299,99, e o que ultrapassar esse valor é informado antes da execução.",
      ],
    },
    {
      titulo: "Uso doméstico, home office e empresa pedem critérios diferentes",
      paragrafos: [
        "Em casa o critério é uso: a máquina precisa abrir o navegador, o banco, os arquivos e o streaming sem travar. Em home office entra a dependência de horário — uma reunião perdida por queda de Wi-Fi custa mais que o reparo. Em empresa o critério vira continuidade: parque padronizado, backup testado e rede estável valem mais que qualquer conserto isolado.",
        "Por isso as páginas do portal são separadas por contexto e não por catálogo de peça. Você entra pelo sintoma, encontra o procedimento correspondente e, se for o caso, o caminho empresarial com manutenção preventiva e suporte recorrente — sem misturar preço residencial com escopo corporativo.",
      ],
    },
  ],

  "/servicos": [
    {
      titulo: "Ordem recomendada quando há mais de um serviço na mesa",
      paragrafos: [
        "É comum o mesmo equipamento pedir três coisas: cópia dos arquivos, troca por SSD e reinstalação limpa do sistema. A ordem correta é sempre essa — primeiro preservar, depois substituir, por último reinstalar. Invertê-la é o erro que transforma manutenção em perda de dados, porque formatar antes de conferir a cópia elimina a única chance barata de recuperar arquivo.",
        "Quando entra reparo de hardware no meio, ele passa à frente da reinstalação: não faz sentido configurar sistema em uma máquina que ainda desliga sozinha por superaquecimento ou falha de alimentação. Cada página de serviço indica esse pré-requisito logo no início, para você saber o que precisa estar resolvido antes.",
      ],
    },
  ],

  "/contato": [
    {
      titulo: "O que enviar na primeira mensagem para acelerar o atendimento",
      paragrafos: [
        "Quatro informações resolvem quase toda a triagem inicial: o tipo de equipamento (notebook, desktop, impressora ou roteador), a marca e o modelo quando estiverem visíveis na etiqueta, o sintoma descrito com as próprias palavras e o momento em que ele começou. Se houve queda, contato com líquido, oscilação de energia ou instalação recente de algum programa, isso muda o caminho técnico e deve vir junto.",
        "Foto ajuda mais do que descrição em três situações: tela com imagem estranha, mensagem de erro na inicialização e conector ou carregador danificado. Vídeo curto ajuda quando o sintoma é sonoro — ventoinha em rotação alta, estalo no disco, bipe na ligação. Nada disso é obrigatório, mas encurta a conversa e evita deslocamento desnecessário.",
        "Se o equipamento é de empresa, acrescente quantas pessoas dependem dele e se há prazo crítico envolvido. Essa informação muda a prioridade na fila e, em vários casos, muda a recomendação técnica: quando parar custa caro, faz mais sentido colocar uma máquina reserva em operação enquanto o reparo acontece do que esperar a bancada liberar.",
      ],
    },
    {
      titulo: "Como funciona o retorno e por que não prometemos horário fixo",
      paragrafos: [
        "O atendimento acontece por WhatsApp, dentro do horário publicado no rodapé do site. Mensagens enviadas fora desse período ficam na fila e são respondidas na abertura seguinte, na ordem de chegada. Não usamos atendimento telefônico nem balcão aberto ao público: todo o histórico fica registrado na conversa, o que ajuda quando o mesmo equipamento volta a apresentar sintoma.",
        "Também não prometemos janela fixa de visita antes de conhecer o caso. Rota de deslocamento depende de região, do serviço em andamento e do tempo estimado de cada atendimento do dia. Preferimos informar a janela real quando ela existe a confirmar um horário que provavelmente não será cumprido.",
      ],
    },
    {
      titulo: "Assuntos que não passam pela triagem técnica",
      paragrafos: [
        "Algumas conversas seguem outro caminho: propostas comerciais e patrocínio são tratadas pela página de anúncios, pedidos de correção de conteúdo publicado passam pelo canal editorial e solicitações relacionadas a dados pessoais seguem o que está descrito na política de privacidade. Separar esses fluxos evita que um pedido comercial fique na fila técnica e vice-versa.",
        "Para orçamento empresarial com vários equipamentos, o melhor ponto de partida é a página voltada a empresas: lá o escopo é levantado por parque e por rotina, e não por chamado isolado, o que muda a forma de apresentar valores.",
      ],
    },
  ],

  "/faq": [
    {
      titulo: "Dúvidas sobre valores e aprovação",
      paragrafos: [
        "Os atendimentos partem de R$ 99,99 para diagnóstico e serviços simples. Esse valor cobre mão de obra de escopo definido; peças, componentes e licenças são cobrados à parte e sempre com aprovação expressa. Quando o caso vai para bancada, o mínimo pré-aprovado é de R$ 299,99, com coleta sem custo de deslocamento — se o reparo couber nesse valor, ele é executado; se ultrapassar, o valor é informado antes.",
        "Nenhum serviço é executado sem autorização. Isso vale inclusive para procedimentos que parecem óbvios durante o atendimento, como reinstalar sistema ou substituir uma peça de baixo custo. A regra completa, incluindo o que acontece quando o cliente desiste após o diagnóstico, está na página de preços e políticas.",
        "Também não trabalhamos com cobrança por tentativa. Se o procedimento aprovado não resolver o defeito descrito, a conversa volta ao diagnóstico sem novo custo de mão de obra para o mesmo caso — o que muda é o escopo, discutido de novo com você antes de qualquer continuidade.",
      ],
    },
    {
      titulo: "Dúvidas sobre garantia e peças",
      paragrafos: [
        "A mão de obra tem 90 dias de garantia para o mesmo defeito tratado. Ela cobre o serviço executado, não sintomas novos de origem diferente — um notebook que voltou a ligar depois do reparo de alimentação e meses depois apresenta falha de tela está diante de outro defeito, com outro diagnóstico. Peças seguem a garantia do fornecedor ou do fabricante, informada no momento da aprovação.",
        "Peças trazidas pelo cliente são aceitas em condições específicas, descritas na página de política de peças do cliente: a mão de obra é garantida, mas o componente não, e há casos em que a instalação é recusada por risco técnico evidente. Isso é dito antes, nunca depois da abertura do equipamento.",
      ],
    },
    {
      titulo: "Dúvidas sobre dados, privacidade e acesso ao equipamento",
      paragrafos: [
        "Durante formatação, troca de disco ou recuperação de arquivos, o técnico tem acesso ao conteúdo armazenado. O tratamento é o mesmo em todos os casos: nada é copiado para fora do necessário à execução, nada é aberto sem motivo técnico e cópias temporárias criadas durante o serviço são eliminadas na entrega, salvo pedido expresso de retenção do cliente.",
        "Em acesso remoto a sessão é iniciada por você e encerrada ao final do atendimento, sem instalação de acesso permanente. Se algum programa de suporte precisar continuar instalado para atendimentos recorrentes, isso é combinado e informado — nunca deixado silenciosamente na máquina.",
      ],
    },
  ],

  "/sobre": [
    {
      titulo: "Como o trabalho é organizado no dia a dia",
      paragrafos: [
        "A operação é enxuta e por isso previsível: triagem por mensagem, agenda por região, execução por modalidade e registro do que foi feito em cada equipamento. Não há intermediário entre quem descreve o problema e quem executa o reparo, o que elimina o telefone sem fio típico de operações com atendente comercial separado da bancada.",
        "Essa organização tem um limite honesto: a agenda é finita. Quando a demanda do dia está cheia, o cliente é informado da janela real em vez de receber uma confirmação que não se sustenta. Preferimos perder o atendimento a queimar a confiança com prazo inventado.",
      ],
    },
  ],

  "/blog": [
    {
      titulo: "Para que serve um blog técnico em um portal de assistência",
      paragrafos: [
        "A maior parte das buscas sobre computador não começa por serviço, começa por dúvida: por que o notebook desliga sozinho, se vale a pena trocar por SSD, o que fazer quando um arquivo some. Estes guias existem para responder isso de forma completa, inclusive quando a resposta correta é que não há necessidade de chamar técnico algum.",
        "É uma decisão editorial deliberada. Um portal que só publica conteúdo que termina em venda perde a chance de resolver o caso simples — e é justamente o caso simples resolvido que faz a pessoa voltar quando o problema for grave. Cada artigo indica com clareza o ponto em que a tentativa doméstica deve parar.",
      ],
    },
    {
      titulo: "Como escolher por onde começar a leitura",
      paragrafos: [
        "Se o equipamento apresenta sintoma agora, o caminho mais curto é a seção de problemas, organizada por manifestação: lentidão, travamento, ausência de imagem, queda de rede, arquivo apagado. Se a dúvida é de decisão — trocar ou consertar, formatar ou limpar, comprar peça nova ou usada —, os guias comparativos ajudam mais que a página de sintoma.",
        "Quem administra equipamentos de empresa tem um terceiro caminho: os textos sobre padronização de parque, rotina de backup e manutenção preventiva tratam de risco acumulado, não de conserto pontual. São leituras mais longas porque a decisão que apoiam também é mais cara.",
      ],
    },
    {
      titulo: "O que estes guias não fazem",
      paragrafos: [
        "Não publicamos tutorial que envolva abrir fonte, mexer em circuito energizado, forçar atualização de firmware em equipamento instável ou executar ferramenta de recuperação sobre disco com falha física. Não é reserva de mercado: são procedimentos em que a tentativa errada elimina a chance de recuperação posterior ou cria risco elétrico real.",
        "Também não usamos os artigos para prometer resultado. Recuperação de dados, por exemplo, é sempre apresentada como probabilidade condicionada ao estado do disco e ao que foi feito depois da perda. Qualquer texto que garanta resultado nesse tipo de caso está vendendo, não explicando.",
        "Por fim, nenhum guia substitui a avaliação do equipamento específico. Dois computadores com o mesmo sintoma podem ter causas diferentes, e o texto serve para você entender o cenário e decidir o próximo passo com informação — não para fechar diagnóstico à distância. Quando a leitura indicar que o caso passou do que dá para tentar em casa, o próprio artigo aponta o caminho técnico correspondente.",
      ],
    },
  ],

  "/anuncie": [
    {
      titulo: "Que tipo de anunciante faz sentido neste portal",
      paragrafos: [
        "O público chega buscando solução técnica local, em geral com um problema já em andamento. Isso favorece anunciantes complementares ao reparo: lojas de componentes e periféricos, provedores de internet regionais, empresas de infraestrutura e cabeamento, seguradoras de equipamento e prestadores de serviços administrativos para pequenas empresas.",
        "Não faz sentido — e não é aceito — anúncio que concorra diretamente com o serviço descrito na página em que apareceria, nem peça publicitária que se disfarce de conteúdo técnico. Espaço publicitário é identificado como tal, sempre separado do corpo editorial.",
        "A audiência é predominantemente local e de intenção alta: a pessoa está resolvendo um problema agora, em Curitiba e região metropolitana, e não navegando por curiosidade. Isso favorece anunciante com operação regional e capacidade de atender rápido, e desfavorece campanha nacional genérica, que costuma converter mal nesse tipo de contexto.",
      ],
    },
    {
      titulo: "Formatos disponíveis e onde eles aparecem",
      paragrafos: [
        "Há três posições estáveis: faixa no topo da página, bloco no meio do conteúdo entre seções editoriais e bloco de destaque no rodapé das páginas de serviço e de sintoma. As posições foram escolhidas para não empurrar o conteúdo principal para baixo nem competir com o botão de contato, que é o elemento de conversão da página.",
        "Patrocínio de seção é o formato com maior permanência: a marca acompanha um conjunto de páginas relacionadas por tema, com identificação visível e sem interferir no texto. Formatos que abrem sobreposição na tela, disparam som ou bloqueiam a leitura não são utilizados em nenhuma posição.",
      ],
    },
  ],

  "/areas-atendidas": [
    {
      titulo: "Como a área de cobertura é definida na prática",
      paragrafos: [
        "Cobertura não é um círculo desenhado no mapa: é tempo de deslocamento real dentro de um dia útil. Regiões próximas ao eixo central de Curitiba entram na rota com mais facilidade porque permitem encaixar mais de um atendimento no mesmo turno. Bairros mais distantes e cidades da região metropolitana entram com janela combinada, normalmente concentrando atendimentos no mesmo sentido de rota.",
        "Por isso a resposta honesta a “vocês atendem aqui?” quase sempre é sim, mas com condição de agenda. O que muda de uma região para outra não é a disposição de atender e sim quando existe janela disponível, e isso é informado na triagem antes de qualquer confirmação.",
      ],
    },
    {
      titulo: "Quando a coleta substitui a visita",
      paragrafos: [
        "Existe um ponto de virada objetivo: quando o serviço estimado passa de uma a duas horas de trabalho, executá-lo no endereço deixa de ser eficiente para os dois lados. Nesses casos a coleta é oferecida sem custo de deslocamento, com mínimo pré-aprovado de R$ 299,99, e o equipamento volta configurado e testado.",
        "Reparos de bancada — placa, conector de energia, troca de tela, recuperação de dados e limpeza interna com troca de pasta térmica — praticamente sempre caem nessa categoria, porque exigem ferramenta, bancada estável e tempo de teste que não cabem em uma visita. Já configuração, rede, sistema e instalação de programas costumam se resolver no local ou remotamente.",
      ],
    },
    {
      titulo: "Deslocamento fora da área concentrada",
      paragrafos: [
        "Atendimentos além do raio concentrado seguem a política de deslocamento publicada no portal, com valor por quilômetro informado antes do agendamento e nunca cobrado como surpresa na chegada. A calculadora disponível no site serve exatamente para isso: estimar o custo antes de decidir entre visita, coleta ou atendimento remoto.",
        "Em muitos casos distantes o remoto é a melhor escolha técnica e econômica, porque resolve o mesmo problema sem deslocamento algum. Quando o remoto não dá conta, a coleta costuma custar menos que a visita, já que concentra o trabalho na bancada em vez de pagar tempo de estrada.",
      ],
    },
  ],

  "/atendimento-domicilio": [
    {
      titulo: "O que cabe e o que não cabe em uma visita de trinta minutos",
      paragrafos: [
        "A visita técnica é um bloco de até trinta minutos de inspeção, diagnóstico, avaliação e tentativa de reparo rápido compatível — sem compromisso de conserto e sem peças inclusas. Cabem nesse tempo: verificação de alimentação, teste de inicialização, ajuste de sistema, configuração de rede e impressora, avaliação de disco e leitura de temperatura em uso.",
        "Não cabem desmontagem completa, troca de tela, reparo de placa, clonagem de disco e recuperação de dados. Esses serviços exigem bancada e tempo de teste, e quando o diagnóstico aponta para eles a conversa muda de rumo ainda durante a visita: o equipamento é recolhido, com coleta sem custo de deslocamento e mínimo pré-aprovado informado antes.",
      ],
    },
  ],

  "/diagnostico-tecnico": [
    {
      titulo: "O que é medido, na ordem em que é medido",
      paragrafos: [
        "A sequência começa pela alimentação porque quase todo sintoma dramático — não liga, desliga sozinho, reinicia em uso — pode ter origem elétrica. Testa-se fonte ou carregador, comportamento sob carga e o circuito de carga em notebooks. Só depois disso faz sentido olhar para armazenamento, com leitura de saúde do disco, contagem de setores realocados e tempo real de resposta.",
        "Na sequência entram memória e temperatura, ambas medidas em uso e não em repouso, porque falha intermitente raramente aparece com a máquina parada. Por último vem o sistema: inicialização, serviços, drivers, integridade de arquivos e programas indesejados. Essa ordem existe para não atribuir a software um defeito que é de hardware, erro que gera formatação inútil.",
        "Cada etapa é registrada com o que foi medido e o resultado obtido, e não apenas com a conclusão. Isso importa porque defeito intermitente às vezes só se confirma na segunda rodada de testes, e ter o histórico do que já foi descartado evita repetir trabalho e cobrar de novo pela mesma verificação.",
      ],
    },
    {
      titulo: "O que o laudo entrega e o que ele deliberadamente não afirma",
      paragrafos: [
        "O laudo informa a causa provável, o que é reparável, o que não compensa reparar diante do valor do equipamento e quanto custa cada etapa antes de qualquer execução. Quando há mais de uma hipótese compatível com os testes, as duas são apresentadas, com o custo de eliminar cada uma — é mais honesto que escolher a mais cara e chamar de conclusão.",
        "O que o laudo não faz é garantir resultado onde não há como garantir. Disco com falha mecânica, placa com corrosão por líquido e equipamento já aberto por terceiros entram com ressalva explícita de probabilidade. Prometer recuperação nesses cenários é prática comercial, não avaliação técnica.",
      ],
    },
    {
      titulo: "Quando o diagnóstico dispensa deslocamento",
      paragrafos: [
        "Boa parte dos casos de lentidão, travamento de programa, erro de atualização, e-mail, impressora em rede e conta bloqueada é diagnosticada por acesso remoto, com a sessão iniciada por você e encerrada ao final. Não há instalação de acesso permanente, e o relatório do que foi encontrado é enviado na mesma conversa.",
        "Quando o remoto identifica origem de hardware, ele já entrega valor: você chega à etapa presencial sabendo o que precisa ser testado fisicamente, o que encurta a visita ou define direto a coleta. Diagnóstico feito na ordem certa raramente é retrabalho, mesmo quando muda de modalidade no meio do caminho.",
      ],
    },
  ],

  "/quando-nao-compensa": [
    {
      titulo: "A conta que define se o reparo faz sentido",
      paragrafos: [
        "A regra prática é comparar três números: o custo total do reparo somando mão de obra e peças, o valor de mercado do equipamento no estado atual e a vida útil esperada depois do conserto. Quando o reparo passa de metade do valor de um substituto equivalente e a vida útil esperada é curta, a substituição costuma ser a decisão financeiramente correta.",
        "Há exceções legítimas. Equipamento com licença de software cara vinculada, máquina com periférico específico de trabalho, notebook com peça rara mas estrutura íntegra e computador de escritório que só precisa durar mais um ciclo orçamentário podem justificar reparo acima do limite teórico. O critério nunca é apenas o preço da peça.",
      ],
    },
    {
      titulo: "Sinais de que o equipamento chegou ao fim do ciclo",
      paragrafos: [
        "Alguns sinais somados indicam fim de ciclo com mais precisão do que a idade: placa com múltiplos pontos de reparo anterior, corrosão visível por líquido, dobradiça que arrancou o encaixe da carcaça, disco com setores realocados crescendo mês a mês e sistema que já não recebe atualização de segurança do fabricante.",
        "Quando três ou mais desses sinais aparecem juntos, cada reparo tende a ser seguido por outro em poucos meses, com custo somado maior que o de uma substituição planejada. Dizer isso é parte do trabalho — a alternativa é vender um conserto que o cliente vai lamentar antes do fim do ano.",
      ],
    },
    {
      titulo: "O que fazer com o equipamento que não será mais consertado",
      paragrafos: [
        "Antes de descartar, três etapas evitam prejuízo: retirar e conferir os dados, aproveitar componentes ainda válidos e apagar com segurança o que ficou gravado. Disco, memória e fonte muitas vezes migram para outra máquina; o gabinete e a placa costumam ser o que realmente encerra o ciclo.",
        "O descarte de eletrônico não deve ir para o lixo comum. Pontos de coleta municipais e programas de logística reversa de fabricantes recebem esse material, e a retirada prévia do armazenamento é o que garante que nenhum arquivo pessoal saia junto. Quando o equipamento está aqui em bancada, essa preparação pode ser feita antes da devolução.",
      ],
    },
  ],

  "/politica-de-pecas-do-cliente": [
    {
      titulo: "Por que a peça do cliente muda a divisão de responsabilidade",
      paragrafos: [
        "Quando a peça é fornecida por nós, a responsabilidade é integral: se o componente falhar dentro da garantia do fornecedor, a troca é conduzida sem custo adicional de mão de obra para o mesmo defeito. Quando a peça vem do cliente, a mão de obra continua garantida por 90 dias, mas o componente responde pela garantia de quem o vendeu.",
        "Essa separação não é burocracia. Memória incompatível, SSD sem controlador confiável, fonte com potência declarada acima da real e bateria de origem duvidosa são causas frequentes de retorno — e sem essa divisão clara o serviço acabaria respondendo por um defeito que nasceu na compra.",
      ],
    },
    {
      titulo: "Situações em que a instalação é recusada",
      paragrafos: [
        "A instalação é recusada quando há risco técnico evidente: componente visivelmente danificado, fonte sem certificação compatível com o equipamento, bateria estufada, peça incompatível com a placa ou item que exige adaptação improvisada para encaixar. A recusa é informada antes de qualquer cobrança e não gera custo de mão de obra.",
        "Também não é aceita instalação de peça sem procedência quando o equipamento ainda está em garantia de fábrica, porque o procedimento pode encerrar a cobertura do fabricante. Nesses casos a alternativa apresentada é o caminho oficial, mesmo que ele demore mais.",
      ],
    },
  ],

  "/empresa-de-ti-curitiba": [
    {
      titulo: "Como um parque de máquinas é avaliado antes do contrato",
      paragrafos: [
        "O levantamento inicial não começa por chamado, começa por inventário: quantos equipamentos existem, qual a idade média, quais têm disco mecânico, quais rodam sistema sem atualização de segurança e quais concentram função crítica. Esse mapa mostra onde está o risco real, que raramente é a máquina que mais reclama e quase sempre é a que ninguém olha.",
        "Em seguida entram as rotinas: existe backup, quando foi testada a última restauração, quem tem acesso administrativo, como a rede está segmentada e o que acontece se o equipamento do financeiro parar hoje. Um contrato de suporte desenhado sem essas respostas vira apenas conserto sob demanda com nome melhor.",
      ],
    },
  ],

  "/problemas": [
    {
      titulo: "Por que a entrada por sintoma reduz erro de diagnóstico",
      paragrafos: [
        "Quem procura ajuda técnica raramente sabe nomear o defeito, e não deveria precisar saber. O que a pessoa observa é o sintoma: a máquina demora para abrir, a tela azula, o Wi-Fi cai, o arquivo sumiu. Nomear isso como “manutenção” logo de início joga fora informação — e é exatamente essa informação que separa causa de consequência.",
        "Cada página deste hub começa pelo que se observa e só depois desce para as causas compatíveis, na ordem de probabilidade e de custo de verificação. Verificar o mais barato primeiro é regra: não faz sentido abrir um notebook para investigar placa antes de descartar carregador, bateria e sistema.",
        "Há ainda um ganho prático nessa ordem: sintoma bem descrito permite atendimento remoto em boa parte dos casos, sem deslocamento e sem espera de agenda. Quando a descrição vem já traduzida para um serviço específico, essa triagem se perde e o atendimento tende a começar pela hipótese mais cara.",
      ],
    },
    {
      titulo: "Sintomas que costumam aparecer juntos e o que isso significa",
      paragrafos: [
        "Lentidão acompanhada de travamento e ruído de disco aponta para armazenamento em falha, não para excesso de programas. Desligamento súbito em uso pesado com ventoinha acelerada aponta para temperatura ou alimentação. Tela azul recorrente logo após atualização aponta para driver ou memória. Queda de rede só em parte do imóvel aponta para cobertura, não para o provedor.",
        "Quando dois sintomas de famílias diferentes aparecem no mesmo equipamento, a hipótese mais provável não é coincidência e sim uma causa comum a montante — alimentação instável e disco em falha são as duas que mais produzem sintomas aparentemente desconexos.",
      ],
    },
    {
      titulo: "O que fazer antes de acionar o atendimento",
      paragrafos: [
        "Três atitudes preservam a chance de reparo barato: parar de usar o equipamento quando há suspeita de perda de dados, anotar a mensagem de erro exatamente como aparece e não instalar programas de otimização baixados de anúncios. Os dois primeiros ajudam o diagnóstico; o terceiro evita que a evidência do defeito seja apagada.",
        "Se o equipamento apresenta cheiro de queimado, aquecimento anormal no carregador ou sinal de contato com líquido, o passo correto é desligar e não tentar ligar de novo. Cada tentativa nesses cenários pode transformar um reparo viável em perda total, e isso vale tanto para notebook quanto para desktop.",
      ],
    },
  ],

  "/problemas/tela-azul": [
    {
      titulo: "Como ler o código de parada sem virar especialista",
      paragrafos: [
        "A tela azul quase sempre exibe um nome de erro em letras maiúsculas e, às vezes, o arquivo que provocou a parada. Esses dois dados valem mais que qualquer descrição: erros relacionados a memória, a driver de vídeo e a sistema de arquivos apontam para caminhos de investigação completamente diferentes. Fotografar a tela é o registro mais útil que você pode fazer.",
        "Quando a tela reinicia rápido demais para ler, o próprio sistema guarda o registro do evento. Esse histórico mostra se as paradas se concentram após uma atualização específica, em um horário de uso pesado ou de forma aleatória — e essa distribuição já sugere se a causa é software ou hardware.",
      ],
    },
    {
      titulo: "Memória, driver e disco: como separar as três causas",
      paragrafos: [
        "Falha de memória produz paradas aleatórias, em tarefas diferentes, sem padrão de horário, e costuma piorar com o aquecimento. Driver defeituoso produz paradas repetidas na mesma situação — abrir um jogo, conectar um monitor externo, iniciar uma chamada de vídeo. Disco em falha produz travamento antes da tela azul, com o sistema congelando por alguns segundos.",
        "A verificação segue a mesma lógica de custo: teste de memória e leitura de saúde do disco são rápidos e não invasivos, reversão de driver é reversível, e reinstalação de sistema fica por último porque destrói o cenário de teste. Formatar antes de medir é o motivo mais comum de tela azul que volta uma semana depois.",
      ],
    },
  ],

  "/problemas/wifi-instavel": [
    {
      titulo: "Separar problema de provedor, de roteador e de cobertura",
      paragrafos: [
        "Três testes simples dividem o problema. Se a queda acontece também em cabo, o roteador ou o provedor estão envolvidos e o Wi-Fi é inocente. Se acontece só em um cômodo, é cobertura. Se acontece em todos os dispositivos ao mesmo tempo e volta com o reinício do aparelho, é o roteador; se acontece em um único aparelho, a investigação vai para o adaptador de rede dele.",
        "Registrar o horário das quedas ajuda mais do que parece: instabilidade concentrada em fim de tarde costuma indicar congestionamento de canal em prédios com muitas redes vizinhas, enquanto queda espalhada pelo dia inteiro aponta para enlace do provedor ou equipamento com defeito.",
      ],
    },
    {
      titulo: "Ajustes que resolvem sem trocar equipamento",
      paragrafos: [
        "Mudança de canal e de largura de banda, separação das faixas de frequência com nomes distintos, reposicionamento do roteador para fora de armário e longe de metal, e atualização de firmware resolvem uma parcela grande dos casos sem custo de peça. Em imóveis longos, um ponto de acesso ligado por cabo supera qualquer repetidor, que sempre reduz a velocidade disponível.",
        "Só depois desses ajustes faz sentido discutir troca de equipamento. Roteador fornecido pelo provedor costuma ser suficiente em apartamento pequeno e insuficiente em casa com laje e mais de um pavimento — mas essa conclusão precisa vir de medição de sinal, não da suposição de que o aparelho é ruim.",
      ],
    },
  ],

  "/problemas/arquivos-apagados": [
    {
      titulo: "O que decide a chance de recuperação nas primeiras horas",
      paragrafos: [
        "Arquivo apagado normalmente continua gravado até que outro dado ocupe o mesmo espaço. Por isso a variável que mais pesa não é o tempo passado e sim o uso do equipamento depois da perda: cada instalação, atualização e download reduz a chance de recuperação. Continuar trabalhando no mesmo disco é a atitude que mais destrói casos recuperáveis.",
        "Em discos de estado sólido há um agravante técnico: o mecanismo interno de limpeza de blocos pode eliminar o conteúdo de forma definitiva pouco depois da exclusão, mesmo sem uso aparente. Isso não torna a recuperação impossível, mas encurta muito a janela e desaconselha tentativas caseiras.",
      ],
    },
    {
      titulo: "Perda lógica e perda física exigem procedimentos distintos",
      paragrafos: [
        "Exclusão acidental, formatação rápida, tabela de partição corrompida e ação de ransomware são perdas lógicas: o suporte está íntegro e o trabalho é de leitura e reconstrução, feito sempre sobre uma imagem do disco, nunca sobre o original. Ruído mecânico, disco não reconhecido, curto na placa e contato com líquido são perdas físicas, com procedimento e custo diferentes.",
        "Misturar as duas categorias é o erro clássico: rodar programa de recuperação em disco com falha física costuma agravar o dano e reduzir a chance do procedimento correto. Por isso a primeira etapa aqui é sempre identificar em qual categoria o caso está antes de qualquer tentativa.",
      ],
    },
  ],

  "/problemas/notebook-nao-liga": [
    {
      titulo: "Diferenciar não ligar, não dar imagem e não iniciar o sistema",
      paragrafos: [
        "Três situações são confundidas com frequência e têm causas distintas. Não ligar é ausência total de reação: nenhum led, nenhuma ventoinha, nenhum som. Não dar imagem é a máquina reagir com led e ventoinha, mas a tela permanecer escura. Não iniciar o sistema é ligar normalmente e parar em logotipo, mensagem de erro ou reinício em loop.",
        "Cada uma aponta para um bloco diferente: alimentação e circuito de carga no primeiro caso; tela, cabo de vídeo ou vídeo integrado no segundo; disco, sistema ou memória no terceiro. Informar qual das três descreve o seu caso encurta o diagnóstico e evita orçamento de peça errada.",
      ],
    },
  ],

  "/solucoes/diagnostico": [
    {
      titulo: "Diagnóstico remoto e diagnóstico de bancada: quando usar cada um",
      paragrafos: [
        "O diagnóstico remoto cobre tudo que o sistema consegue relatar: saúde do disco, temperatura em uso, histórico de erros, drivers, integridade de arquivos, serviços em execução e programas indesejados. É a via mais rápida e resolve a maioria dos casos em que o equipamento ainda liga e mantém sessão estável.",
        "O diagnóstico de bancada é indispensável quando o equipamento não liga, desliga em uso, apresenta sinal de líquido ou precisa de medição elétrica. Ali entram fonte de alimentação sob carga, teste de componentes fora do circuito e inspeção visual com ampliação, procedimentos que nenhum software substitui.",
      ],
    },
    {
      titulo: "O que fazemos quando dois defeitos coexistem",
      paragrafos: [
        "Não é raro encontrar disco em falha e superaquecimento no mesmo equipamento, ou fonte instável somada a sistema corrompido. Nesses casos o laudo separa o que é causa do que é consequência e propõe ordem de execução, começando pelo defeito que impede testar os demais — normalmente alimentação, depois armazenamento.",
        "Também informamos quando o segundo defeito pode esperar. Nem tudo precisa ser resolvido no mesmo atendimento, e apresentar o conjunto inteiro como pacote único é uma forma silenciosa de inflar orçamento. A decisão sobre o que fazer agora e o que adiar é do cliente, com os custos de cada etapa na mesa.",
      ],
    },
    {
      titulo: "O que o diagnóstico entrega mesmo quando o reparo não é aprovado",
      paragrafos: [
        "Se você decidir não seguir com o conserto, o laudo continua sendo seu: causa provável, estado das peças principais, o que foi medido e qual seria o custo de cada etapa. Esse documento serve para negociar com terceiros, para decidir sobre substituição e para evitar pagar de novo por uma investigação já feita.",
        "Também informamos, quando aplicável, o que é seguro continuar usando e por quanto tempo aproximado. Um notebook com bateria degradada mas alimentação estável pode servir mais alguns meses ligado na tomada; um disco com setores realocados crescendo não deve receber nenhum arquivo novo antes da cópia.",
      ],
    },
  ],

  "/solucoes/formatacao": [
    {
      titulo: "O que precisa estar pronto antes da formatação começar",
      paragrafos: [
        "Formatação é o procedimento mais irreversível da manutenção comum, e por isso tem pré-requisito rígido: cópia dos arquivos feita e conferida abrindo amostras, lista de programas essenciais levantada, licenças e chaves localizadas, contas de e-mail e navegador com acesso confirmado e senhas de rede anotadas. Só quando esses cinco pontos estão fechados a formatação é iniciada.",
        "A conferência da cópia é a etapa mais pulada e a mais cara quando falha. Copiar uma pasta não garante que os arquivos dentro dela estejam íntegros — documentos corrompidos, fotos truncadas e bancos de dados de programas antigos só aparecem quando alguém abre e verifica antes de apagar o original.",
      ],
    },
    {
      titulo: "Formatar não é a solução para todo sintoma",
      paragrafos: [
        "Quando a lentidão vem de disco mecânico no fim da vida, formatar entrega uma melhora que dura poucos dias. Quando o travamento vem de superaquecimento ou memória com falha, a máquina recém-formatada volta a travar na primeira carga pesada. Nos dois casos o dinheiro foi gasto em um procedimento que não tocou na causa.",
        "Por isso a formatação entra depois do diagnóstico, não antes. Ela é a resposta certa para sistema corrompido, infecção persistente, acúmulo de anos de instalação e máquina que trocou de dono — cenários em que o problema realmente está no software instalado, e não no hardware que o executa.",
      ],
    },
    {
      titulo: "Como o equipamento é devolvido",
      paragrafos: [
        "A entrega padrão inclui sistema instalado e ativado quando há licença válida, drivers do fabricante aplicados, atualizações de segurança em dia, navegador e programas essenciais instalados, impressora e rede configuradas e os arquivos restaurados na estrutura de pastas original. O objetivo é que você abra a máquina e ela esteja pronta para uso, não pronta para configurar.",
        "Programas específicos de trabalho, licenças pagas e sistemas de terceiros dependem do que você tiver disponível — instalamos o que houver de mídia, chave ou acesso à conta, e informamos com antecedência o que não será possível reinstalar sem a licença original.",
      ],
    },
  ],

  "/solucoes/backup": [
    {
      titulo: "A regra prática que evita perda definitiva",
      paragrafos: [
        "A referência mais usada em ambiente profissional é simples de aplicar em casa: três cópias dos dados, em dois tipos de mídia diferentes, com uma delas fora do local. Isso cobre os três cenários que realmente destroem arquivos — falha do disco principal, acidente físico no imóvel e ação de ransomware que criptografa tudo que estiver acessível na rede.",
        "Cópia única em um HD externo guardado ao lado do computador não atende a nenhum dos três: se houver furto, incêndio ou surto elétrico, as duas mídias se perdem juntas. É o arranjo mais comum e o que mais produz casos de perda irreversível.",
      ],
    },
    {
      titulo: "Backup que nunca foi restaurado não é backup",
      paragrafos: [
        "A falha mais frequente não é a ausência de cópia e sim a cópia que não funciona: rotina interrompida meses atrás sem aviso, disco de destino cheio, pasta de trabalho que mudou de lugar e ficou de fora, arquivo de banco de dados copiado com o programa aberto e, por isso, inconsistente. Nada disso aparece até o dia em que a restauração é necessária.",
        "Por isso a rotina entregue aqui inclui teste de restauração: escolhemos amostras, restauramos em outro local e abrimos os arquivos para confirmar integridade. Em ambiente de empresa esse teste é repetido periodicamente e registrado, porque é a única prova de que a rotina está viva.",
      ],
    },
    {
      titulo: "Escolher entre mídia local, nuvem e arranjo misto",
      paragrafos: [
        "Mídia local restaura rápido e não depende de internet, mas está exposta ao mesmo risco físico do equipamento. Nuvem protege contra acidente no local e permite versionamento, mas depende de banda e de disciplina de senha e autenticação. Para volumes grandes, restaurar da nuvem pode levar mais tempo do que a operação suporta.",
        "O arranjo misto costuma ser o mais equilibrado: cópia local para restauração rápida do dia a dia e cópia em nuvem para o cenário de perda total. A proporção entre as duas depende de quanto tempo parado o seu uso tolera — e essa pergunta vem antes da escolha de qualquer ferramenta.",
      ],
    },
  ],

  "/solucoes/ssd": [
    {
      titulo: "Clonar ou instalar limpo: o que muda no resultado",
      paragrafos: [
        "Clonar preserva sistema, programas, licenças e configurações, e é o caminho indicado quando a instalação atual está saudável e há software difícil de reinstalar. Instalar limpo é melhor quando o sistema já vinha corrompido, com anos de acúmulo ou infecção persistente — porque clonar copia também os problemas que motivaram a troca.",
        "A decisão é tomada no diagnóstico, com base na saúde do disco de origem: setor com falha no disco antigo pode inviabilizar a clonagem íntegra, e nesse cenário a instalação limpa com restauração de arquivos é mais segura do que insistir na cópia bit a bit.",
      ],
    },
    {
      titulo: "Onde o ganho aparece e onde ele não aparece",
      paragrafos: [
        "A troca por SSD transforma o tempo de inicialização, a abertura de programas, a resposta do sistema com várias janelas abertas e o comportamento sob carga de leitura. Em máquinas com disco mecânico, é a intervenção com maior efeito percebido por real investido, à frente de qualquer outra atualização isolada.",
        "O que ela não resolve: taxa de quadros em jogos, que depende de placa de vídeo e processador; travamento por superaquecimento; instabilidade por memória com falha; e lentidão causada por programas em segundo plano ou infecção. Vender SSD como solução para esses casos é confundir sintoma com causa.",
      ],
    },
    {
      titulo: "Compatibilidade e o destino do disco antigo",
      paragrafos: [
        "Nem todo equipamento aceita qualquer modelo: existem diferenças de conexão, de formato físico e de suporte da placa a padrões mais rápidos. Notebooks antigos costumam aceitar apenas o formato tradicional; placas mais recentes aproveitam módulos compactos com desempenho superior. Essa verificação é feita antes da compra, com o modelo do equipamento em mãos.",
        "O disco antigo, quando saudável, ganha função de armazenamento secundário ou vira mídia de cópia externa com um adaptador — aproveitamento que custa pouco e agrega segurança. Quando ele já apresentava falha, a recomendação é o oposto: não reutilizar e apagar o conteúdo antes do descarte.",
      ],
    },
  ],

  "/solucoes/recuperacao-de-dados": [
    {
      titulo: "Por que trabalhamos sempre sobre uma imagem, nunca no disco original",
      paragrafos: [
        "A primeira etapa técnica de qualquer recuperação séria é criar uma cópia setor a setor do dispositivo, e conduzir toda a análise sobre essa imagem. O motivo é direto: disco em falha tende a piorar com o uso, e cada leitura adicional pode ser a que encerra a chance de extrair o conteúdo. Preservar o original é o que mantém uma segunda tentativa possível.",
        "Programas domésticos de recuperação fazem o contrário — trabalham direto no dispositivo e, em vários casos, gravam resultados no mesmo disco de onde tentam ler. É por isso que a tentativa caseira frequentemente reduz a taxa de sucesso do procedimento profissional feito depois.",
      ],
    },
    {
      titulo: "O que é possível prometer e o que não é",
      paragrafos: [
        "É possível informar, depois da avaliação, se o dispositivo é lido, qual a extensão do dano, se a estrutura de arquivos está reconstruível e qual a expectativa realista para cada tipo de conteúdo. Também é possível entregar a lista dos arquivos localizados antes de você decidir seguir com a extração.",
        "Não é possível garantir resultado antes dessa avaliação, e desconfie de quem garante. Dano físico severo, sobrescrita posterior à perda, criptografia sem chave e tentativas anteriores mal conduzidas são fatores que reduzem ou eliminam a chance — e nenhum deles é visível na descrição inicial do caso.",
      ],
    },
    {
      titulo: "Como os arquivos recuperados são entregues",
      paragrafos: [
        "A entrega é feita em mídia definida com você, com a estrutura de pastas preservada sempre que a reconstrução permitir. Quando a tabela de arquivos foi perdida, parte do conteúdo volta organizada por tipo em vez de por pasta original — resultado normal em recuperação profunda, informado antes para não gerar expectativa errada.",
        "Cópias temporárias criadas durante o processo são eliminadas após a confirmação de que você recebeu e conferiu o material, salvo pedido expresso de retenção por um período. Nenhum conteúdo é aberto além do necessário para validar integridade dos arquivos recuperados.",
      ],
    },
  ],

  "/equipamentos/notebook": [
    {
      titulo: "Os quatro pontos que concentram falha em notebook",
      paragrafos: [
        "Diferente do desktop, o notebook concentra defeito em pontos previsíveis: conector de energia e circuito de carga, dobradiça e o cabo de vídeo que passa por ela, sistema de refrigeração obstruído por poeira e bateria degradada. Esses quatro respondem pela maior parte dos atendimentos e quase todos dão sinal antes de parar de vez.",
        "Reconhecer o sinal precoce muda o custo do reparo. Carregador que só funciona em uma posição indica conector em fadiga; tela que pisca ao abrir e fechar indica cabo de vídeo; ventoinha barulhenta com base quente indica refrigeração saturada. Tratados cedo, são reparos simples; ignorados, evoluem para troca de placa ou de tela.",
      ],
    },
  ],

  "/equipamentos/desktop": [
    {
      titulo: "A fonte de alimentação é o componente mais subestimado",
      paragrafos: [
        "Em desktop, boa parte dos sintomas atribuídos a defeito de placa ou de memória nasce na fonte: reinício em carga, desligamento em jogo, instabilidade que aumenta com o tempo de uso e falha ao ligar após queda de energia. Fonte genérica com potência declarada acima da real é uma das causas mais frequentes e mais baratas de corrigir.",
        "Por isso, em máquinas montadas ou com histórico de instabilidade, o teste sob carga da fonte entra antes de qualquer troca de componente. Substituir memória ou placa de vídeo com a alimentação comprometida costuma resultar em defeito repetido e, em casos ruins, em peça nova danificada.",
        "Outro ponto subestimado é a poeira acumulada no dissipador do processador e na placa de vídeo. Ela não causa defeito imediato, mas eleva a temperatura de trabalho ao longo de meses até o ponto em que a máquina passa a reduzir desempenho sozinha ou desligar sob carga. Limpeza interna com troca de pasta térmica é manutenção preventiva barata que evita diagnóstico caro depois.",
      ],
    },
  ],

  "/equipamentos/impressora": [
    {
      titulo: "Impressora parada: rede, driver e mecânica são problemas distintos",
      paragrafos: [
        "Quando a impressora some do computador mas imprime a página de teste pelo próprio painel, o problema é de rede ou de driver — endereço mudou depois de reiniciar o roteador, fila travada, driver desatualizado após atualização do sistema. Quando a página de teste também falha, o problema é do equipamento, e aí a investigação é mecânica ou de suprimento.",
        "Essa separação evita o retrabalho mais comum do setor: reinstalar driver dezenas de vezes em uma impressora com cabeça de impressão entupida, ou desmontar um equipamento saudável cujo único problema era endereço de rede variável. Fixar o endereço na rede resolve boa parte dos casos recorrentes de escritório.",
        "Em escritório com várias estações, vale ainda separar o que é falha do equipamento do que é fila compartilhada mal configurada: documento preso na fila de uma máquina bloqueia a impressão das demais, e o sintoma aparece como impressora com defeito. Limpar a fila, fixar o endereço e padronizar o driver em todas as estações resolve a maior parte desses casos recorrentes sem troca de peça.",
      ],
    },
  ],

  "/equipamentos/roteador": [
    {
      titulo: "Roteador do provedor, roteador próprio e ponto de acesso",
      paragrafos: [
        "O aparelho fornecido pelo provedor acumula duas funções: terminar o enlace da operadora e distribuir a rede interna. Em imóvel pequeno isso basta. Em imóvel maior, o caminho mais estável é manter o aparelho do provedor apenas como enlace e assumir a rede interna com um roteador próprio, com controle real de canal, faixa e regras.",
        "Ponto de acesso ligado por cabo é a solução para cobertura em imóvel longo ou com mais de um pavimento, e supera repetidor em qualquer cenário, porque o repetidor divide a banda disponível para falar com o roteador e com os aparelhos ao mesmo tempo. Quando não há cabo possível, a rede pelo cabeamento elétrico é a alternativa intermediária.",
        "Vale checar também a quantidade de aparelhos conectados: câmeras, televisores, assistentes e celulares somam dezenas de conexões simultâneas em uma casa comum, e roteadores de entrada travam a tabela de dispositivos muito antes de a banda contratada acabar. Nesse cenário, a queda não é do provedor e trocar de plano não resolve — o que resolve é equipamento com capacidade compatível e rede organizada por faixa.",
      ],
    },
  ],

  "/tecnico-informatica-colombo": [
    {
      titulo: "Como a agenda de Colombo é organizada",
      paragrafos: [
        "Os atendimentos em Colombo são concentrados por sentido de deslocamento, o que torna a janela da manhã mais estável do que encaixes de fim de tarde. Quando o caso exige bancada, a coleta costuma ser mais vantajosa que a visita: o equipamento é recolhido na rota programada e devolvido testado, sem custo de deslocamento e com mínimo pré-aprovado informado antes.",
      ],
    },
  ],

  "/tecnico-informatica-araucaria": [
    {
      titulo: "Como a agenda de Araucária é organizada",
      paragrafos: [
        "Em Araucária a rota é planejada por região e concentrada em janelas específicas, o que torna o agendamento com antecedência mais eficiente que o chamado imediato. Para serviços de sistema, rede e configuração, o acesso remoto costuma resolver sem depender de rota; para hardware, a coleta com devolução tende a custar menos que a visita, porque concentra o trabalho na bancada.",
      ],
    },
  ],
};

export function blocos4q(path) {
  return BLOCOS_4Q[path] ?? null;
}
