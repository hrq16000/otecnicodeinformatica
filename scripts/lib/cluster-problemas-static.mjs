/**
 * Espelho estático do cluster PROBLEMAS (src/lib/clusterProblemas.ts) para o
 * prerender pré-hidratação. Crawlers sem JS precisam ver H1, meta e conteúdo
 * próprio de cada sintoma — sem isso a rota fica indexada como casca vazia.
 *
 * Ao mudar título/descrição no TS, atualize aqui (gate: check-meta-uniqueness).
 */
export const CLUSTER_PROBLEMAS_ROUTES = [
  {
    path: "/problemas",
    title: "Problemas comuns de computador, rede e dados | O Técnico de Informática",
    description:
      "Entre pelo sintoma: computador lento, notebook que não liga, Wi-Fi caindo, tela azul ou arquivos apagados. Cada página explica causas, o que checar e o atendimento indicado.",
    h1: "Comece pelo que está acontecendo",
    subtitulo:
      "Você não precisa saber o nome técnico da falha: escolha o sintoma mais parecido com o seu caso e veja causas, checagens e modalidade indicada.",
    blocos: [
      {
        titulo: "Sintoma primeiro, serviço depois",
        paragrafos: [
          "A maior parte das buscas por assistência técnica começa por uma frase de sintoma — “está lento”, “não liga”, “a internet cai” — e não pelo nome do serviço. Cada página deste hub responde a um desses sintomas com as causas que investigamos, o que dá para verificar sozinho antes de gastar e qual modalidade de atendimento costuma resolver.",
          "Só entram aqui problemas com resposta técnica real e caminho de atendimento definido. Não publicamos página genérica trocando equipamento ou bairro: quando o sintoma não tem conteúdo próprio, ele fica fora do índice e o atendimento acontece pelo funil.",
        ],
      },
      {
        titulo: "O que você encontra em cada página de problema",
        paragrafos: [
          "Como o problema costuma se manifestar, as causas checadas no diagnóstico, uma lista do que verificar antes de chamar alguém, o que evitar para não agravar o caso, as modalidades possíveis (remoto, domicílio ou bancada) e perguntas frequentes específicas daquele sintoma.",
          "Diagnóstico, deslocamento, mão de obra e peça são informados separadamente. Nada é executado sem aprovação prévia e não trabalhamos com valor fechado antes de entender o caso.",
        ],
      },
      {
        titulo: "Quando o sintoma vira urgência",
        paragrafos: [
          "Nem todo problema precisa de pressa, mas alguns sinais mudam a prioridade: ruído metálico ou clique repetido vindo do disco, cheiro de queimado, desligamento súbito por aquecimento e tela azul que se repete a cada poucos minutos. Nesses casos, continuar usando o equipamento aumenta o risco de perder dados de forma definitiva — a orientação é desligar e tratar a cópia dos arquivos como primeira etapa.",
          "Lentidão progressiva, travamento em um programa específico, Wi-Fi oscilante e atualização que não conclui raramente são emergência. Costumam ser resolvidos por acesso remoto ou em uma visita técnica com janela de até 30 minutos para inspeção, diagnóstico e tentativa de reparo rápido compatível, sem compromisso e sem peças inclusas.",
        ],
      }
    ],
  },
  {
    path: "/problemas/wifi-instavel",
    title: "Wi-Fi caindo ou lento: causas e o que checar | O Técnico de Informática",
    description:
      "Wi-Fi que cai, fica lento em alguns cômodos ou desconecta sozinho quase nunca é problema do plano. Veja as causas reais, o que testar antes e quando chamar técnico.",
    h1: "Wi-Fi caindo ou lento em parte da casa ou do escritório",
    subtitulo:
      "Cobertura, equipamento e provedor falham de formas diferentes — e cada uma pede uma solução diferente.",
    blocos: [
      {
        titulo: "Onde o sinal realmente se perde",
        paragrafos: [
          "Na maior parte dos atendimentos de Wi-Fi instável, o plano contratado está entregando o que promete: o sinal é que não chega. A investigação separa a internet que entra no imóvel, o equipamento que distribui o sinal e o caminho físico até o aparelho que reclama.",
          "Queda em cômodos específicos indica atenuação por parede, laje ou estrutura metálica. Desconexão em horários parecidos aponta interferência ou reinício automático do equipamento da operadora. Conectar “sem internet” coloca a suspeita entre roteador e provedor. E quando o celular vai bem e o computador não, o problema é do dispositivo — driver, adaptador antigo ou faixa 2.4 GHz saturada.",
        ],
      },
      {
        titulo: "Testes que você pode fazer antes de chamar",
        paragrafos: [
          "Meça a velocidade ao lado do roteador e depois no cômodo problemático: a diferença já separa cobertura de provedor. Ligue um notebook por cabo — se por cabo a navegação fica boa, a internet está chegando e o gargalo é a distribuição sem fio. Anote o horário das quedas por alguns dias e lembre se a rede piorou após alguma mudança recente.",
          "O que evitar: resetar o roteador da operadora sem as credenciais, empilhar repetidores em sequência (cada salto divide a banda) e trocar de plano antes do diagnóstico — se o gargalo é cobertura, mais megas continuam não chegando ao cômodo.",
        ],
      },
      {
        titulo: "Como o atendimento resolve",
        paragrafos: [
          "Ajuste de canal, separação das faixas 2.4/5 GHz, DNS e configuração de repetidor são feitos em suporte remoto quando ainda existe conexão utilizável. Medição de sinal cômodo a cômodo, teste de cabeamento e definição de onde vale instalar ponto adicional exigem atendimento no endereço.",
          "Escritório com muitos dispositivos, impressora em rede e sistema em nuvem entra em projeto de rede empresarial: segmentação, cabeamento e equipamento adequado no lugar de repetidor doméstico.",
        ],
      },
    ],
  },
  {
    path: "/problemas/tela-azul",
    title: "Tela azul no Windows: causas, o que anotar e como resolver | O Técnico de Informática",
    description:
      "Tela azul travando o computador? O código do erro aponta a origem: memória, driver, disco ou energia. Veja o que anotar antes de reiniciar e quando o reparo compensa.",
    h1: "Tela azul no Windows: o que o erro está dizendo",
    subtitulo:
      "O código exibido e o momento em que a falha aparece são as duas informações que direcionam o diagnóstico.",
    blocos: [
      {
        titulo: "Tela azul é interrupção de segurança, não defeito em si",
        paragrafos: [
          "O sistema para tudo porque encontrou uma falha que não conseguia contornar com segurança. Falha aleatória, sem padrão de uso, aponta para hardware — memória com erro, alimentação instável ou superaquecimento. Falha sempre no mesmo programa ou ao conectar um dispositivo aponta para driver.",
          "Depois de atualização do Windows, a causa frequente é driver antigo sobreposto por versão incompatível, com caminho de reversão sem formatação. Quando o equipamento entra em ciclo de reparo automático, a prioridade muda: primeiro preservar os dados, depois recuperar o sistema.",
        ],
      },
      {
        titulo: "O que anotar antes de reiniciar",
        paragrafos: [
          "Fotografe a tela azul inteira, com o código de erro e o nome do arquivo citado — essa foto encurta o diagnóstico. Registre o que estava sendo feito, mudanças recentes (atualização, peça nova, queda de energia) e se o travamento se repete em modo de segurança.",
          "Evite atualizadores automáticos de driver, que trocam o driver correto por versão genérica; evite formatar antes de checar disco e memória; e não force reinícios seguidos durante o reparo automático.",
        ],
      },
      {
        titulo: "O que é verificado no diagnóstico",
        paragrafos: [
          "Teste de memória, verificação de disco, medição térmica e teste de fonte cobrem as causas de hardware. Leitura de log de falha, reversão de driver e verificação de integridade do sistema são feitas remotamente quando o Windows ainda inicia.",
          "Se o disco apresentar sinal de falha, a cópia dos dados vem antes de qualquer tentativa de reparo — e o risco real é informado sem promessa de recuperação total.",
        ],
      },
    ],
  },
  {
    path: "/problemas/arquivos-apagados",
    title: "Arquivos apagados ou HD que não abre: primeiros passos | O Técnico de Informática",
    description:
      "Apagou arquivos, formatou por engano ou o HD parou de abrir? O que você faz na primeira hora define a chance de recuperação. Veja o que evitar e como funciona a avaliação.",
    h1: "Arquivos apagados ou disco que não abre: o que fazer agora",
    subtitulo:
      "Arquivo apagado costuma continuar no disco até ser sobrescrito — por isso a primeira hora vale mais que qualquer programa de recuperação.",
    blocos: [
      {
        titulo: "A primeira hora decide o resultado",
        paragrafos: [
          "Em recuperação de dados, o maior inimigo é a tentativa apressada. Cada programa instalado, cada cópia nova e cada reparo automático aumenta a chance de sobrescrever exatamente o que você quer de volta. Nenhum profissional sério promete recuperação total antes da avaliação.",
          "Exclusão com lixeira esvaziada e formatação rápida costumam ter boa chance quando o equipamento é desligado logo. Disco que pede formatação ao conectar indica corrupção da estrutura de arquivos — aceitar a formatação é o erro mais caro dessa situação. HD externo com barulho de clique é caso mecânico: cada nova ligação pode danificar mais a superfície.",
        ],
      },
      {
        titulo: "O que fazer e o que não fazer agora",
        paragrafos: [
          "Pare de usar o dispositivo imediatamente e não instale nada nele, nem o programa de recuperação. Guarde o disco externo ou pendrive em vez de reconectar várias vezes. Liste o que precisa voltar — pastas, período, tipos de arquivo — e confira se existe cópia esquecida em nuvem, e-mail, celular ou HD antigo.",
          "Não rode utilitários de correção no volume afetado, não abra o disco rígido em ambiente doméstico e não grave nada novo no dispositivo, nem os próprios arquivos recuperados.",
        ],
      },
      {
        titulo: "Como funciona a avaliação",
        paragrafos: [
          "A avaliação identifica o tipo de perda (lógica ou física), o estado do dispositivo e a estimativa realista de chance — sempre antes de qualquer orçamento de recuperação. Perda lógica, por exclusão ou corrupção de estrutura, é tratada com leitura controlada e cópia para outro destino.",
          "Falha física tem limite claro e é informada como tal. Casos de ransomware seguem outro caminho: isolar a máquina, avaliar backup e conter o incidente, porque arquivos criptografados por invasão não voltam com programa comum.",
        ],
      },
    ],
  },
  {
    path: "/problemas/computador-desliga-sozinho",
    title: "Computador desliga sozinho: causas e o que checar | O Técnico de Informática",
    description:
      "Desligamento súbito quase sempre é temperatura, fonte ou alimentação — raramente vírus. Veja como identificar a causa, o que testar antes e quando parar de usar.",
    h1: "Computador desligando sozinho ou reiniciando do nada",
    subtitulo:
      "Desligamento sem aviso é comportamento de proteção: alguma coisa cortou a energia ou o limite térmico foi atingido.",
    blocos: [
      {
        titulo: "Temperatura ou alimentação: o padrão indica a causa",
        paragrafos: [
          "Quando a máquina apaga durante jogo, edição ou videochamada e volta a ligar depois de esfriar, o padrão é térmico: dissipador entupido de poeira, ventoinha parada ou pasta térmica ressecada. O processador chega ao limite e o desligamento é a última defesa antes do dano permanente.",
          "Corte seco a qualquer momento, mesmo com a máquina ociosa, aponta para alimentação: fonte com capacitor no fim da vida, cabo de força folgado, régua sobrecarregada ou oscilação na tomada. Já reinício imediato, voltando na tela de boas-vindas, é o único cenário em que driver, atualização ou memória instável entram como suspeitos principais.",
        ],
      },
      {
        titulo: "O que dá para checar antes de chamar alguém",
        paragrafos: [
          "Anote se o desligamento acontece sempre em atividade pesada ou também parado, confira se as ventoinhas giram e se sai ar quente pela traseira, e teste em outra tomada sem régua nem extensão. Gabinete encostado na parede ou dentro de nicho fechado também derruba a troca de calor.",
          "Não insista no botão de ligar quando a máquina não responde: a proteção da fonte foi acionada e forçar aumenta o risco para placa-mãe e disco. E não formate — desligamento térmico ou elétrico volta igual depois da formatação, com os dados já perdidos.",
        ],
      },
      {
        titulo: "Como é feito o diagnóstico",
        paragrafos: [
          "A triagem remota lê temperatura, histórico de eventos e comportamento sob carga para confirmar o padrão antes de deslocar alguém. A visita técnica cobre limpeza interna, troca de pasta térmica e medição de tensão no local.",
          "Bancada entra quando a falha é intermitente: teste de fonte sob carga real, teste de memória prolongado e inspeção visual da placa exigem horas de observação. Diagnóstico, deslocamento, mão de obra e peça são informados separadamente, e nada é executado sem aprovação.",
        ],
      },
    ],
  },
  {
    path: "/problemas/notebook-nao-carrega",
    title: "Notebook não carrega: causas e o que testar | O Técnico de Informática",
    description:
      "Notebook ligado na tomada que não carrega pode ser fonte, conector, bateria ou placa. Veja como identificar cada caso, o que testar sozinho e o que evita gasto errado.",
    h1: "Notebook conectado na tomada e a bateria não carrega",
    subtitulo:
      "“Conectada, não carregando” aparece em quatro cenários diferentes — e trocar a bateria por palpite é o erro mais comum.",
    blocos: [
      {
        titulo: "Quatro causas com o mesmo sintoma",
        paragrafos: [
          "Carregador com defeito ou incompatível é a primeira hipótese porque é a mais barata de confirmar: tensão correta com corrente insuficiente, cabo rompido internamente ou conector USB-C que não negocia a potência certa. Em seguida vem o jack de energia, que sofre esforço mecânico e trinca a solda com o tempo — se mexer no plugue faz o LED piscar, o problema é físico.",
          "A bateria é peça de consumo e perde capacidade por ciclos e por idade, mas só indicamos troca depois de conferir capacidade real e contagem de ciclos. Quando carregador e bateria estão bons e a carga não acontece, a falha está no circuito de carga da placa-mãe: o cenário mais caro e o que mais exige diagnóstico honesto antes do orçamento.",
        ],
      },
      {
        titulo: "Testes que evitam comprar peça errada",
        paragrafos: [
          "Teste com outro carregador do mesmo modelo e potência, compare tensão e amperagem da etiqueta com o que o fabricante exige e observe se o LED de carga acende, pisca ou fica apagado. No Windows, o relatório de bateria mostra capacidade projetada contra capacidade original e resolve boa parte da dúvida sobre desgaste.",
          "Não compre bateria antes do diagnóstico, não adote carregador universal genérico de forma permanente e não force o plugue nem improvise apoio para segurar o contato — isso agrava a trinca na solda da placa. Bateria estufada precisa de manuseio e descarte adequados.",
        ],
      },
      {
        titulo: "Modalidades de atendimento",
        paragrafos: [
          "A triagem remota lê relatório de bateria, ciclos e capacidade real, separando desgaste natural de defeito antes de qualquer deslocamento. A visita técnica testa com carregador de referência e verifica o conector no local.",
          "Ressolda ou troca do jack de energia, medição no circuito de carga e substituição de bateria com peça compatível são serviços de bancada. Peça e mão de obra são informadas separadamente e aprovadas antes da execução.",
        ],
      },
    ],
  },
  {
    path: "/problemas/hd-fazendo-barulho",
    title: "HD fazendo barulho: clique, estalo e risco de perder dados | O Técnico de Informática",
    description:
      "Clique repetido, estalo ou zumbido vindo do HD é sinal mecânico e urgente. Entenda cada ruído, o que fazer imediatamente e o que destrói a chance de recuperar os arquivos.",
    h1: "HD fazendo barulho: clique, estalo ou zumbido no disco",
    subtitulo:
      "Ruído novo no disco muda a ordem das prioridades: antes de qualquer reparo vem a cópia dos dados.",
    blocos: [
      {
        titulo: "Cada ruído aponta para um estágio diferente",
        paragrafos: [
          "Clique repetido em intervalo regular é o sinal mais grave: o braço de leitura tenta encontrar a trilha, falha e recalibra em ciclo, o que costuma indicar cabeça ou motor comprometidos. Estalo seco acompanhado de travamento do sistema aponta setores defeituosos e tentativas de releitura — o disco ainda entrega dados, e essa é a janela para copiar tudo.",
          "Zumbido contínuo sugere rolamento desgastado ou disco mal fixado no gabinete, e vibração constante acelera o desgaste mecânico. Chiado agudo de raspagem é o pior cenário: indica contato da cabeça com o prato, e cada segundo ligado remove material da superfície magnética.",
        ],
      },
      {
        titulo: "O que fazer antes de qualquer reparo",
        paragrafos: [
          "Se o ruído é clique repetido ou raspagem, desligue o equipamento. Se o sistema ainda abre e o ruído é ocasional, copie primeiro os arquivos insubstituíveis para um disco externo ou nuvem — documentos e fotos antes de programas. Confirme também de onde vem o som: cooler com pá empenada e fonte com rolamento gasto fazem barulho parecido e custam muito menos para resolver.",
          "Não rode utilitário de correção de disco em HD com ruído mecânico: a varredura força milhares de leituras justamente onde o disco está frágil. Não abra o disco, não congele, não bata no equipamento e não formate esperando que o ruído pare — formatação não corrige defeito mecânico.",
        ],
      },
      {
        titulo: "Modalidades de atendimento",
        paragrafos: [
          "A orientação remota imediata vem primeiro: pelo WhatsApp indicamos o que desligar e o que copiar antes mesmo de mover o equipamento. Em bancada, o procedimento correto é gerar uma imagem setor a setor em outro dispositivo e trabalhar sobre a cópia, avaliando depois reparo lógico, troca por SSD e reinstalação.",
          "Quando o dano é físico na cabeça ou no prato, o caso exige laboratório em sala limpa e informamos isso com clareza. Diagnóstico, deslocamento, mão de obra e peça são informados separadamente, e nada é executado sem aprovação.",
        ],
      },
    ],
  },
  {
    path: "/problemas/notebook-molhado",
    title: "Notebook molhado com água ou café: o que fazer agora | O Técnico de Informática",
    description:
      "Derramou líquido no notebook? Os primeiros minutos decidem o custo do reparo. Veja o que desligar, o que nunca fazer (arroz e secador) e quando o caso é de bancada.",
    h1: "Notebook molhado: o que fazer nos primeiros minutos",
    subtitulo:
      "O que costuma destruir a placa não é o líquido em si, e sim a corrosão das horas seguintes e a tentativa de religar.",
    blocos: [
      {
        titulo: "Funcionar depois do acidente não significa que passou",
        paragrafos: [
          "Há cinco cenários típicos: o notebook desliga na hora e não liga mais, continua funcionando normalmente, apresenta teclas travadas ou digitando sozinhas, liga com comportamento estranho em áudio, touchpad e portas USB, ou exibe manchas esverdeadas e cheiro adocicado depois de alguns dias. O segundo é o mais enganoso, porque a corrosão dos contatos evolui em silêncio e a falha aparece quando ninguém mais associa ao derramamento.",
          "Água limpa é o melhor cenário. Café com açúcar, refrigerante e cerveja deixam resíduo pegajoso e condutivo que exige limpeza química, não apenas secagem. Com a bateria conectada existe tensão na placa mesmo com o aparelho desligado pelo botão — por isso cortar a energia é a primeira medida que realmente ajuda.",
        ],
      },
      {
        titulo: "Primeiros minutos: o que fazer e o que evitar",
        paragrafos: [
          "Desligue segurando o botão de energia, retire o carregador, remova a bateria quando o modelo permitir e vire o notebook em formato de tenda sobre uma toalha para o líquido escorrer. Retire periféricos, seque o excesso externo sem esfregar o teclado e anote o que foi derramado, a quantidade e o horário.",
          "Não ligue para testar, não use secador nem forno, não mergulhe em arroz e não coloque para carregar. Calor espalha o líquido e desloca componentes colados; o arroz não alcança a umidade interna e ainda deposita amido e pó no equipamento. Em líquido açucarado, o intervalo útil se mede em horas.",
        ],
      },
      {
        titulo: "Modalidades de atendimento",
        paragrafos: [
          "A orientação por WhatsApp cobre os primeiros minutos, antes de qualquer deslocamento. Em bancada, fazemos desmontagem completa, remoção de resíduo com solução apropriada, secagem controlada e inspeção da placa sob lupa — o teste de energização só acontece depois disso.",
          "Trilha rompida ou componente corroído pode exigir microssolda. A viabilidade é discutida antes da execução e a garantia cobre o serviço executado e a peça trocada, com escopo descrito na ordem de serviço; dano por líquido pode evoluir depois em pontos não relacionados ao reparo, e isso é dito antes da aprovação.",
        ],
      },
    ],
  },
];


/** FAQ espelhada (mesma copy do TS) — paridade FAQPage estático × conteúdo visível. */
const FAQ_POR_ROTA = {
  "/problemas/wifi-instavel": [
    { pergunta: "Trocar o roteador resolve Wi-Fi que cai?", resposta: "Resolve quando o equipamento é o gargalo — modelo antigo, sem 5 GHz ou com defeito. Não resolve quando o problema é posicionamento, cabo ou interferência. Por isso o diagnóstico vem antes da indicação de compra." },
    { pergunta: "Mesh é melhor que repetidor?", resposta: "Em geral sim, porque os pontos trabalham como uma rede só e o aparelho troca de ponto sem cair. Mas mesh também depende de bom posicionamento e, quando possível, de ligação por cabo entre os pontos." },
    { pergunta: "Preciso trocar meu plano de internet?", resposta: "Só se o teste com cabo mostrar que a velocidade contratada não está chegando. Se por cabo o resultado é bom, o plano não é o problema." },
    { pergunta: "Dá para resolver sem visita?", resposta: "Parte dos casos sim — configuração e ajuste de canal são feitos remotamente. Cobertura, cabeamento e interferência física exigem medição no local." },
    { pergunta: "Vocês vendem o equipamento?", resposta: "Indicamos o que atende ao caso e você decide onde comprar. Se preferir, a instalação e a configuração ficam por nossa conta depois que o equipamento chegar." },
  ],
  "/problemas/tela-azul": [
    { pergunta: "Tela azul significa que o computador vai parar de funcionar?", resposta: "Não necessariamente. Muitos casos são driver ou atualização e se resolvem sem troca de peça. O que define é o diagnóstico: memória, disco, temperatura e alimentação são verificados antes de qualquer conclusão." },
    { pergunta: "Formatar resolve tela azul?", resposta: "Só quando a origem é o sistema. Se a causa for memória, disco ou fonte, a tela azul volta depois da formatação — e os dados já terão sido perdidos." },
    { pergunta: "Perco meus arquivos no reparo?", resposta: "O procedimento padrão preserva os dados. Quando o disco apresenta falha física, a cópia é feita primeiro e o risco real é informado antes de qualquer intervenção — sem promessa de recuperação total." },
    { pergunta: "O código do erro é mesmo importante?", resposta: "É o melhor atalho que existe. Códigos ligados a memória, disco e driver direcionam o teste inicial e reduzem o tempo de bancada." },
    { pergunta: "Dá para fazer o diagnóstico remotamente?", resposta: "Quando o Windows inicia, sim: log, driver e integridade são verificados remotamente. Teste de memória e de fonte exige o equipamento em bancada." },
  ],
  "/problemas/arquivos-apagados": [
    { pergunta: "Vocês garantem que os arquivos voltam?", resposta: "Não. Nenhuma avaliação séria garante recuperação antes de examinar o dispositivo. O que informamos é o cenário encontrado, a chance estimada e o custo — para você decidir com clareza." },
    { pergunta: "Quanto custa recuperar dados?", resposta: "Depende do tipo de falha. Casos lógicos têm custo previsível; casos físicos dependem de peça, tempo e encaminhamento. O valor é apresentado depois da avaliação e antes de qualquer execução." },
    { pergunta: "Programas de recuperação que baixo na internet funcionam?", resposta: "Às vezes, em exclusão simples. O risco é instalar o programa no mesmo disco e sobrescrever justamente os arquivos que você quer. Se os dados forem importantes, não é o primeiro passo indicado." },
    { pergunta: "Quanto tempo leva?", resposta: "Varredura lógica costuma levar de horas a alguns dias, conforme o tamanho do disco. Casos físicos dependem de avaliação e de peça compatível." },
    { pergunta: "Depois de recuperar, como evitar de novo?", resposta: "Backup em duas frentes: uma cópia local e uma em nuvem, com verificação periódica. Configuramos a rotina junto com a entrega, se você quiser." },
  ],
  "/problemas/computador-desliga-sozinho": [
    { pergunta: "Computador que desliga sozinho é vírus?", resposta: "Quase nunca. Vírus costuma deixar o sistema lento, exibir anúncios ou travar programas — não cortar a energia da máquina. Desligamento seco é sinal físico: temperatura, fonte ou alimentação." },
    { pergunta: "Só limpar por dentro resolve?", resposta: "Resolve quando a causa é térmica e o dissipador está entupido. Se a fonte estiver degradada ou a memória instável, a limpeza melhora por alguns dias e o problema volta." },
    { pergunta: "Posso continuar usando até resolver?", resposta: "Se o desligamento é térmico e esporádico, o risco é moderado. Se acontece durante gravação de arquivos, o risco de corromper dados é real — faça cópia dos arquivos importantes antes de qualquer coisa." },
    { pergunta: "Como vocês descobrem se é a fonte?", resposta: "Medindo tensão sob carga real e, quando possível, substituindo por uma fonte de teste compatível. Fonte que liga não significa fonte saudável: o defeito aparece quando o consumo sobe." },
    { pergunta: "Notebook também desliga sozinho por temperatura?", resposta: "Sim, e com mais frequência que desktop, porque o espaço interno é menor. Em notebook a limpeza envolve desmontagem parcial e troca de pasta térmica — procedimento de bancada." },
  ],
  "/problemas/notebook-nao-carrega": [
    { pergunta: "Trocar a bateria resolve notebook que não carrega?", resposta: "Só quando a bateria é a causa. Carregador defeituoso, jack trincado e circuito de carga da placa produzem o mesmo sintoma — por isso o diagnóstico vem antes da compra da peça." },
    { pergunta: "Posso usar o notebook sem bateria, direto na tomada?", resposta: "Na maioria dos modelos sim, mas você fica exposto a qualquer oscilação de energia: uma queda breve desliga a máquina e pode corromper arquivos abertos." },
    { pergunta: "Bateria parada em 80% é defeito?", resposta: "Nem sempre. Vários fabricantes limitam a carga para prolongar a vida útil da bateria, e isso é configurável. Conferimos a configuração antes de tratar como falha." },
    { pergunta: "Bateria estufada é perigosa?", resposta: "Sim. Estufamento indica degradação química e risco de vazamento ou incêndio. Pare de usar, não perfure e encaminhe para troca e descarte correto." },
    { pergunta: "Vocês vendem a bateria?", resposta: "Indicamos a peça compatível com o seu modelo e você decide onde comprar; se preferir, cuidamos da aquisição e da troca. Peça e mão de obra são informadas separadamente." },
  ],
  "/problemas/hd-fazendo-barulho": [
    { pergunta: "HD fazendo clique tem conserto?", resposta: "O disco em si raramente volta a ser confiável — o objetivo passa a ser recuperar os dados, não salvar a peça. Depois da cópia, a recomendação é substituir por um SSD e aposentar o disco com ruído." },
    { pergunta: "Dá tempo de copiar os arquivos?", resposta: "Depende do ruído. Estalo ocasional com sistema ainda funcional geralmente permite clonagem completa. Clique repetido significa que o disco já não encontra as trilhas, e cada tentativa reduz a janela." },
    { pergunta: "Congelar o HD funciona?", resposta: "Não. É um mito antigo que causa condensação dentro do disco e destrói o que ainda restava. Nenhum laboratório sério usa esse procedimento." },
    { pergunta: "SSD também faz barulho?", resposta: "Não, porque não tem partes móveis. Se o ruído aparece em uma máquina só com SSD, a fonte é outra: cooler, fonte de alimentação ou drive óptico." },
    { pergunta: "Quanto custa recuperar os dados?", resposta: "Depende do tipo de dano. Clonagem e recuperação lógica em bancada têm um custo; caso físico em sala limpa é outro patamar e é orçado à parte. Diagnóstico, mão de obra e peça são informados separadamente e nada é executado sem aprovação." },
  ],
  "/problemas/notebook-molhado": [
    { pergunta: "Meu notebook molhou e continua funcionando. Preciso levar?", resposta: "Sim, e de preferência logo. A corrosão avança por dias com o equipamento aparentemente normal; a limpeza feita cedo costuma custar uma fração do reparo de placa depois." },
    { pergunta: "Arroz funciona para secar notebook?", resposta: "Não. O arroz não alcança a umidade interna, não remove resíduo de açúcar e ainda deposita pó e amido dentro do equipamento. É um mito que atrasa o único procedimento que ajuda: a limpeza técnica." },
    { pergunta: "Quanto tempo tenho para levar?", resposta: "Água limpa dá alguma folga; café, refrigerante e outros líquidos açucarados corroem rápido e o intervalo útil é de horas. Em qualquer caso, mantenha o equipamento desligado e sem carregador até a bancada." },
    { pergunta: "Só o teclado molhou. Precisa mexer na placa?", resposta: "Nem sempre. Em vários modelos o teclado é uma peça separada e a placa fica preservada. A desmontagem é o que confirma até onde o líquido chegou — sem abrir, é palpite." },
    { pergunta: "Tem garantia no reparo de equipamento molhado?", resposta: "A garantia cobre o serviço executado e a peça trocada, com escopo descrito na ordem de serviço. Dano por líquido pode evoluir depois em pontos não relacionados ao reparo, e isso é explicado antes da aprovação." },
  ],
};


for (const rota of CLUSTER_PROBLEMAS_ROUTES) {
  const faq = FAQ_POR_ROTA[rota.path];
  if (faq) rota.faq = faq;
}
