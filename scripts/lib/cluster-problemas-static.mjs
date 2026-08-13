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
  {
    path: "/problemas/computador-nao-da-imagem",
    title: "Computador liga e não dá imagem: causas e o que testar | O Técnico de Informática",
    description:
      "Gabinete liga, coolers giram e o monitor fica preto ou em “sem sinal”. Veja como separar monitor, cabo, memória, placa de vídeo e fonte antes de trocar qualquer peça.",
    h1: "Computador liga mas não aparece imagem no monitor",
    subtitulo:
      "Antes de comprar peça: o diagnóstico separa o que exibe, o que gera vídeo e o que permite ligar.",
    blocos: [
      {
        titulo: "Três blocos diferentes, três caminhos de reparo",
        paragrafos: [
          "Ligar e não dar imagem não é um defeito único: é o resultado visível de qualquer falha que impeça o computador de concluir a inicialização. A investigação separa o que exibe (monitor e cabo), o que gera vídeo (placa dedicada ou vídeo integrado) e o que permite ligar (fonte, memória e placa-mãe). Trocar peça antes dessa separação é a forma mais cara de descobrir o problema.",
          "Monitor em “sem sinal” indica que a tela funciona e nada chega até ela — cabo, entrada selecionada ou saída de vídeo errada. Tela totalmente preta, sem mensagem, aponta para energia do monitor ou fonte que não sustenta o consumo. Coolers girando sem POST costuma ser memória ou placa de vídeo mal assentada. Bipes e LEDs de diagnóstico são código e indicam o subsistema travado.",
        ],
      },
      {
        titulo: "O que testar antes de chamar alguém",
        paragrafos: [
          "Teste outro cabo, outra entrada e confirme no menu do monitor qual entrada está ativa. Com placa de vídeo dedicada instalada, o cabo precisa estar na saída da placa, não na da placa-mãe. Ligue o monitor em outro aparelho para descobrir se o defeito é dele. Depois, com o computador fora da tomada, reencaixe firmemente memória e placa de vídeo até travar.",
          "Não fique ligando e desligando repetidamente esperando que “pegue”, e não compre placa de vídeo ou memória por palpite: na maior parte dos atendimentos a peça nova não era necessária. Forçar módulo ou conector torto no soquete transforma um caso simples em troca de placa-mãe.",
        ],
      },
      {
        titulo: "Modalidades de atendimento",
        paragrafos: [
          "A orientação remota conduz os testes de cabo, entrada e reencaixe e resolve boa parte dos casos de “sem sinal”, sem custo de deslocamento. A visita técnica leva cabo, memória e fonte de referência para isolar o componente no local, em janela de até 30 minutos de inspeção.",
          "Fonte, placa-mãe e vídeo exigem medição sob carga em bancada, com substituição controlada. Diagnóstico, deslocamento, mão de obra e peça são informados separadamente e nada é executado sem aprovação.",
        ],
      },
    ],
  },
  {
    path: "/problemas/cheiro-de-queimado",
    title: "Cheiro de queimado no computador: o que fazer imediatamente | O Técnico de Informática",
    description:
      "Cheiro de queimado vindo do gabinete, da fonte ou do carregador é sinal elétrico e urgente. Veja o que desligar agora, o que nunca fazer e como o diagnóstico é conduzido.",
    h1: "Cheiro de queimado no computador, fonte ou carregador",
    subtitulo:
      "É um dos poucos sintomas em que a orientação certa é parar de usar o equipamento na hora.",
    blocos: [
      {
        titulo: "Por que o cheiro muda a prioridade",
        paragrafos: [
          "Odor de queimado indica que algum componente ultrapassou a temperatura de projeto ou que houve falha elétrica. O risco deixa de ser apenas perder a peça: envolve dano em cascata na placa e, em casos extremos, princípio de incêndio. Cheiro acre de plástico costuma vir de fonte, carregador ou conector aquecendo; odor adocicado é típico de capacitor eletrolítico rompido; estalo ou clarão junto do cheiro significa que houve descarga.",
          "As origens mais frequentes são fonte de alimentação em fim de vida, carregador ou cabo com mau contato, surto elétrico pela rede, poeira acumulada bloqueando ventilação, capacitor rompido e bateria de lítio inchada — cada uma com caminho de reparo e risco próprios.",
        ],
      },
      {
        titulo: "O que fazer nos primeiros minutos",
        paragrafos: [
          "Desligue pelo botão de energia e tire o plugue da tomada; em notebook, remova também o carregador e a bateria quando o modelo permitir. Identifique de onde vem o odor com o equipamento já desligado e fotografe marcas escuras, derretimento no conector ou capacitor estufado — isso adianta a triagem.",
          "Não religue para testar se o cheiro volta, não use o equipamento “só um pouco para salvar arquivos”, não substitua a fonte por outra qualquer sem confirmar potência e origem da falha e não perfure nem descarte bateria inchada no lixo comum.",
        ],
      },
      {
        titulo: "Modalidades de atendimento",
        paragrafos: [
          "A orientação imediata por WhatsApp cuida primeiro da segurança: o que desligar, o que remover e como transportar — sem depender de contratar serviço. Em bancada, o procedimento começa com inspeção visual sob lupa e medição sem energizar; a fonte só é testada isolada da placa, com carga controlada.",
          "Quando a placa está comprometida, o disco costuma estar íntegro: retiramos a unidade e copiamos os arquivos independentemente da decisão sobre reparar ou substituir. Diagnóstico, mão de obra e peça são informados separadamente antes da execução.",
        ],
      },
    ],
  },
  {
    path: "/problemas/windows-nao-inicia",
    title: "Windows não inicia: causas, o que anotar e como resolver | O Técnico de Informática",
    description:
      "Windows que trava no logotipo, entra em reparo automático ou reinicia em loop tem causas separáveis: inicialização, disco, sistema de arquivos ou atualização. Veja o que checar.",
    h1: "Windows não inicia: para em logotipo, reinicia em loop ou pede reparo",
    subtitulo:
      "O hardware costuma estar vivo: o que falhou está entre a partida do disco e a carga do sistema.",
    blocos: [
      {
        titulo: "Onde exatamente a partida quebra",
        paragrafos: [
          "Travar no logotipo com o círculo girando indica serviço ou driver que não conclui a carga — quase sempre tratável em modo de segurança, sem tocar nos arquivos. Reparo automático repetindo aponta estrutura de arquivos danificada, típica de desligamento abrupto. Mensagem de dispositivo de inicialização não encontrado significa que a placa não enxerga a unidade, o que pode ser ordem de boot, cabo ou conector, e não necessariamente disco morto.",
          "Reinício antes da tela de senha mistura atualização mal aplicada com memória instável, e o teste de memória separa as duas em minutos. Tela preta com cursor mostra sistema carregado e interface que não subiu: perfil de usuário corrompido ou driver de vídeo.",
        ],
      },
      {
        titulo: "O que checar antes de aceitar formatação",
        paragrafos: [
          "Anote a mensagem exata da tela, inclusive o código iniciado por zero e x. Lembre o que mudou antes: atualização, driver, queda de energia ou troca de peça. Retire pendrive, HD externo e cartão de memória, porque mídia externa na ordem de partida provoca exatamente essa falha. Tente o modo de segurança: se abre, seus arquivos estão íntegros e o problema é de software.",
          "Evite repetir reinícios forçados, utilitários de reparo baixados de sites desconhecidos e reinstalação por cima quando existir suspeita de disco defeituoso — a gravação nova ocupa justamente o espaço dos dados a recuperar.",
        ],
      },
      {
        titulo: "Como o atendimento é conduzido",
        paragrafos: [
          "Com o modo de segurança acessível, reversão de atualização, remoção de driver e verificação de integridade acontecem por acesso remoto. Quando a máquina não abre de forma alguma, o atendimento no endereço leva mídia de recuperação e leitura de saúde do disco.",
          "Havendo sinal de falha na unidade, o disco é retirado, clonado e só então tratado: copiar antes de reparar é o que preserva o que é insubstituível. Diagnóstico, mão de obra e peça são informados separadamente antes de qualquer execução.",
        ],
      },
    ],
  },
  {
    path: "/problemas/computador-esquentando",
    title: "Computador esquentando muito: causas e o que fazer | O Técnico de Informática",
    description:
      "Ventoinha acelerada, base do notebook quente e queda de desempenho em jogos ou vídeo indicam problema térmico. Veja as causas, o que medir antes e qual manutenção resolve.",
    h1: "Computador ou notebook esquentando demais",
    subtitulo:
      "Todo equipamento aquece: o problema começa quando o próprio processador reduz a velocidade para se proteger.",
    blocos: [
      {
        titulo: "Como o calor se manifesta",
        paragrafos: [
          "Ventoinha acelerada com a máquina parada mostra arrefecimento no limite. Desempenho que começa bem e cai depois de alguns minutos é a assinatura da redução automática de frequência por temperatura. Base do notebook quente demais para apoiar indica troca térmica acontecendo pela carcaça, e não pelo caminho projetado.",
          "Travamento apenas em jogo, edição ou videochamada longa aponta qual componente aquece primeiro. Ar saindo morno e fraco, com cooler girando alto, denuncia radiador obstruído: o ar entra, mas não atravessa.",
        ],
      },
      {
        titulo: "Causas que aparecem na bancada",
        paragrafos: [
          "Radiador saturado de poeira e fiapo é a origem mais comum e não aparece em inspeção externa. Pasta térmica ressecada faz a mesma carga gerar dezenas de graus a mais. Ventoinha com rolamento gasto gira sem vencer a resistência do radiador, e a comparação entre rotação real e temperatura sob carga confirma isso.",
          "Apoio e ambiente também pesam: notebook sobre cama ou almofada tem a entrada tapada, e desktop encostado na parede recircula o próprio ar quente. Em gabinete, ventoinhas soprando uma contra a outra e filtro entupido derrubam a troca térmica inteira. Quando um processo em segundo plano mantém carga alta sem uso aparente, o calor é consequência, não causa.",
        ],
      },
      {
        titulo: "O que checar e como resolvemos",
        paragrafos: [
          "Observe se o calor aparece em repouso ou só sob carga, confira o fluxo na saída de ar, verifique processos com uso alto e teste o equipamento em superfície rígida por um dia. Nunca sopre ar comprimido com a ventoinha girando livre, não use aspirador comum encostado na placa e não empilhe pasta térmica.",
          "A avaliação remota mede temperatura sob carga, rotação e processos, separando causa de software de causa física. A limpeza técnica em bancada envolve desmontagem, limpeza das aletas, teste da ventoinha e troca de pasta, com medição antes e depois. Em desktop, revisar fluxo de ar no endereço costuma resolver sem levar o equipamento.",
        ],
      },
    ],
  },
  {
    path: "/problemas/impressora-nao-imprime",
    title: "Impressora não imprime: causas e o que checar | O Técnico de Informática",
    description:
      "Documento fica na fila, a impressora aparece offline ou sai página em branco? Veja o que separa falha de rede, driver e cabeça de impressão — e o que testar antes de chamar técnico.",
    h1: "Impressora não imprime mesmo aparecendo conectada",
    subtitulo:
      "Na maior parte dos casos o equipamento está bom: o que falha é o caminho entre o computador e ele.",
    blocos: [
      {
        titulo: "O padrão da falha já indica a origem",
        paragrafos: [
          "Documento que entra na fila e não sai aponta para serviço de impressão travado ou trabalho corrompido preso na frente dos demais. Impressora que aparece offline mesmo ligada é, quase sempre, endereço de rede: depois de uma queda de energia o roteador entrega outro IP e o computador continua procurando no endereço antigo.",
          "Página em branco ou borrada muda o diagnóstico para o lado físico — bico entupido, toner mal assentado ou cilindro no fim. E quando um computador imprime e outro não, o equipamento está saudável: a investigação se concentra em driver, permissão de compartilhamento, firewall e em qual rede cada máquina está.",
        ],
      },
      {
        titulo: "Testes que você pode fazer antes de chamar",
        paragrafos: [
          "Imprima a página de teste pelo painel da própria impressora: se ela sair, o problema não é o equipamento. Cancele tudo o que está na fila e envie um único arquivo simples. Confira no painel qual rede a impressora está usando, inclusive quando existem duas redes Wi-Fi no imóvel, e desligue o equipamento da tomada por um minuto para reiniciar o firmware interno.",
          "O que evitar: instalar vários drivers da mesma impressora tentando adivinhar qual funciona, lavar cabeça de impressão em água corrente, puxar papel preso no sentido contrário ao de saída e desinstalar a impressora com trabalho travado na fila — o resíduo continua lá e o novo cadastro nasce com erro.",
        ],
      },
      {
        titulo: "Como o atendimento resolve",
        paragrafos: [
          "Limpeza de fila, reinstalação correta do driver, correção de porta, compartilhamento e ajuste de firewall são resolvidos por suporte remoto na maioria dos casos domésticos e de escritório pequeno. Quando a impressora é de rede, o atendimento no endereço trata cabeamento, reserva de endereço fixo no roteador e as várias estações que imprimem no mesmo equipamento.",
          "Se o teste interno da própria impressora também falha — página em branco, ruído de engrenagem, papel amassando sempre no mesmo ponto — a avaliação é feita em bancada, com o equipamento aberto e o custo informado antes. Em modelos de entrada, comparamos abertamente o preço da peça com o de um aparelho novo em vez de empurrar reparo que não compensa.",
        ],
      },
    ],
  },
  {
    path: "/problemas/teclado-notebook-nao-funciona",
    title: "Teclado do notebook não funciona: causas e o que testar | O Técnico de Informática",
    description:
      "Teclas que não respondem, letra repetida ou teclado morto depois de líquido? Veja como separar falha de software, flat solto e dano físico antes de trocar a peça.",
    h1: "Teclado do notebook não funciona ou falha algumas teclas",
    subtitulo:
      "Um teclado USB externo separa em minutos o que é peça do que é sistema.",
    blocos: [
      {
        titulo: "Três falhas diferentes com o mesmo nome",
        paragrafos: [
          "Teclas isoladas que param apontam para membrana ou trilha rompida sob aquelas teclas: software não escolhe teclas específicas para desligar. Teclado inteiro sem resposta, com touchpad funcionando, leva a suspeita para o cabo flat solto ou oxidado no conector da placa. Tecla que repete ou digita sozinha indica contato preso por resíduo, borracha deformada ou trilha em curto.",
          "Há ainda os casos que nem são defeito: em teclados sem bloco numérico separado, o numérico embutido ativo faz letras virarem números. E falha que só aparece com o notebook aquecido sugere mau contato agravado por dilatação, no conector ou em solda fria da controladora.",
        ],
      },
      {
        titulo: "O que checar antes de comprar peça",
        paragrafos: [
          "Ligue um teclado USB externo: se ele digitar tudo, o sistema está bom e o problema é o teclado interno ou o cabo dele. Observe o teclado na tela de inicialização, antes do Windows carregar — funcionando ali, a falha é de software. Teste a tecla suspeita em um editor de texto simples e anote se houve líquido, queda ou abertura do equipamento nos últimos meses.",
          "O que evitar: seguir usando o notebook logo após derramar líquido, secar com secador quente, arrancar teclas sem conhecer o encaixe (o clipe plástico quebra com facilidade e não é vendido separadamente) e pingar álcool direto no teclado com a máquina montada, porque o líquido escorre para a placa.",
        ],
      },
      {
        titulo: "Como o atendimento resolve",
        paragrafos: [
          "Quando o teclado externo funciona e o interno não, driver, filtro de teclado e layout são verificados remotamente antes de qualquer indicação de peça. Reassentar o flat, medir a linha de alimentação do teclado, limpar oxidação e testar a peça exigem bancada, e é ali que se descobre se a falha é do teclado, do cabo ou da placa.",
          "Café, refrigerante e água com açúcar deixam resíduo condutor que corrói trilhas semanas depois do acidente — por isso o teclado às vezes falha bem depois do derramamento. Confirmada a troca, a peça é identificada pelo código do próprio equipamento, com peça e mão de obra apresentadas separadamente e nada comprado sem aprovação.",
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
  "/problemas/computador-nao-da-imagem": [
    { pergunta: "Meu computador liga e não dá imagem: é a placa de vídeo?", resposta: "Pode ser, mas é a conclusão menos provável logo de início. Cabo, entrada errada, memória com mau contato e fonte degradada aparecem com muito mais frequência. A placa de vídeo só é apontada depois de testada em outro equipamento ou substituída por uma de referência." },
    { pergunta: "Os bipes ajudam a descobrir o problema?", resposta: "Ajudam bastante. A sequência de bipes e os LEDs de diagnóstico da placa-mãe indicam qual subsistema travou — memória, vídeo ou processador. Anotar o padrão antes de abrir chamado reduz o tempo de diagnóstico." },
    { pergunta: "Vale a pena consertar ou é melhor trocar o computador?", resposta: "Depende da peça envolvida e da idade da máquina. Memória e fonte costumam ter custo baixo diante do valor do equipamento; placa-mãe antiga com defeito, muitas vezes não. Informamos a estimativa antes para você decidir, sem empurrar reparo inviável." },
    { pergunta: "Perco meus arquivos nesse tipo de reparo?", resposta: "Falha de vídeo não afeta o disco na maioria dos casos, e o procedimento padrão preserva os dados. Se durante o diagnóstico o disco também apresentar problema, avisamos antes de qualquer intervenção e a cópia vem primeiro." },
    { pergunta: "Dá para resolver sem levar o computador?", resposta: "Cabo, entrada, reencaixe e configuração resolvem uma parte relevante dos casos remotamente ou em visita. Teste de fonte sob carga e inspeção de placa exigem bancada, com instrumentos que não vão para a casa do cliente." },
  ],
  "/problemas/cheiro-de-queimado": [
    { pergunta: "Senti cheiro de queimado e o computador ainda liga. Posso usar?", resposta: "Não é recomendado. Cheiro indica componente fora da faixa térmica ou falha elétrica em andamento; continuar usando aumenta a chance de dano em cascata na placa e de risco elétrico. Desligue da tomada e trate como caso urgente." },
    { pergunta: "Como sei se o problema é a fonte ou a placa-mãe?", resposta: "Pelo teste isolado. A fonte é avaliada fora do computador, com carga controlada, e a placa é inspecionada sob lupa antes de qualquer energização. Sem essa separação, trocar a fonte pode apenas repetir a queima em uma placa já comprometida." },
    { pergunta: "Meus arquivos estão perdidos?", resposta: "Na maioria dos casos elétricos o disco continua íntegro, mesmo quando a placa não tem reparo viável. Retiramos a unidade e copiamos os dados em separado. Não prometemos recuperação total antes de examinar o dispositivo." },
    { pergunta: "Estabilizador ou nobreak evita esse problema?", resposta: "Reduz o risco de surto pela rede, mas não substitui manutenção: poeira, fonte no fim da vida e conector com mau contato queimam mesmo com proteção instalada. Um bom filtro de linha ajuda; limpeza periódica e fonte adequada ajudam mais." },
    { pergunta: "Vale a pena consertar um equipamento que queimou?", resposta: "Depende de qual componente foi atingido. Fonte, carregador e cabo têm custo baixo e troca direta. Placa-mãe com dano elétrico em máquina antiga costuma não compensar, e dizemos isso com clareza — diagnóstico, mão de obra e peça são informados separadamente antes de qualquer execução." },
  ],
  "/problemas/windows-nao-inicia": [
    { pergunta: "Windows que não inicia significa formatar e perder tudo?", resposta: "Na maioria dos atendimentos, não. Reversão de atualização, correção da estrutura de arquivos e remoção de driver resolvem com os documentos intactos. A formatação só entra quando o sistema está irrecuperável — e, mesmo assim, os arquivos são copiados antes." },
    { pergunta: "Como sei se é o disco ou o sistema?", resposta: "Pela leitura dos indicadores de saúde da unidade e pelo tempo de resposta na leitura. Disco saudável com sistema quebrado repara rápido; disco com setores realocados repete a falha em poucos dias mesmo depois de reinstalar." },
    { pergunta: "Modo de segurança abre. Isso é bom sinal?", resposta: "É ótimo sinal. Significa que o hardware está funcional, os arquivos estão acessíveis e a falha está em algum componente de software que pode ser identificado pela data de instalação." },
    { pergunta: "Perdi a senha de administrador. Muda alguma coisa?", resposta: "Muda o caminho, não o resultado. A recuperação dos arquivos é feita com a unidade acessada em bancada. Não fazemos remoção de bloqueio em equipamento sem comprovação de propriedade." },
    { pergunta: "Vale reinstalar o Windows num computador antigo?", resposta: "Depende do conjunto. Em máquina com disco mecânico, reinstalar sozinho entrega pouco: o ganho real vem de trocar por SSD e, se couber, ampliar a memória. Informamos essa diferença antes, com peça e mão de obra separadas." },
  ],
  "/problemas/computador-esquentando": [
    { pergunta: "Qual temperatura é considerada alta?", resposta: "Depende do modelo, mas a referência prática é o comportamento: se o equipamento reduz a velocidade sozinho ou desliga por proteção, passou do limite dele. Por isso medimos antes e depois da manutenção, em vez de trabalhar com números genéricos." },
    { pergunta: "Base refrigeradora resolve?", resposta: "Ajuda em uso pesado e em ambiente quente, principalmente por levantar o notebook e liberar a entrada de ar. Não substitui limpeza interna: se o radiador está entupido, o ar frio de fora não chega a lugar nenhum." },
    { pergunta: "De quanto em quanto tempo fazer limpeza interna?", resposta: "Em uso doméstico comum, algo entre um e dois anos. Em ambiente com pet, obra por perto, fumo ou uso intenso de jogos, o intervalo cai bastante. Quem carrega o notebook todo dia na mochila também acumula mais rápido." },
    { pergunta: "Trocar só a pasta térmica adianta?", resposta: "Adianta quando o radiador está limpo e a ventoinha saudável. Se o caminho do ar continua obstruído, a pasta nova baixa poucos graus e o problema volta em semanas — por isso os dois serviços costumam andar juntos." },
    { pergunta: "O calor pode ter estragado alguma peça?", resposta: "Exposição prolongada acelera o desgaste de bateria, capacitores e do próprio disco. Verificamos a saúde da unidade e da bateria junto da limpeza e informamos o que encontramos, sem transformar isso em venda automática de peça." },
  ],
  "/problemas/impressora-nao-imprime": [
    { pergunta: "A impressora aparece offline mesmo ligada. O que é?", resposta: "Na quase totalidade dos casos é endereço de rede: o computador procura a impressora onde ela não está mais. Reservar um endereço fixo para o equipamento no roteador encerra o problema de forma permanente." },
    { pergunta: "Vale a pena consertar impressora antiga?", resposta: "Depende do custo da peça e do consumível. Em modelos de entrada, uma cabeça de impressão nova costuma custar perto de um equipamento novo — e informamos isso antes, em vez de empurrar reparo que não compensa." },
    { pergunta: "Reinstalar o driver resolve?", resposta: "Resolve quando a causa é driver corrompido ou duplicado. Não resolve endereço de rede instável nem bico entupido: nesses casos o sintoma volta em poucos dias." },
    { pergunta: "Dá para imprimir do celular também?", resposta: "Sim, desde que celular e impressora estejam na mesma rede e o equipamento suporte impressão sem fio. Configuramos isso junto com as estações, sem custo adicional de deslocamento quando já estamos no local." },
    { pergunta: "Vocês atendem impressora de escritório com várias estações?", resposta: "Atendemos. Nesses casos a correção envolve rede: endereço fixo, compartilhamento, permissões e, quando faz sentido, um servidor de impressão simples para não depender de um computador ligado." },
  ],
  "/problemas/teclado-notebook-nao-funciona": [
    { pergunta: "Dá para trocar só uma tecla?", resposta: "Quando o problema é o clipe ou a borracha, sim — em vários modelos a tecla avulsa existe. Se a trilha da membrana rompeu, a substituição é do teclado inteiro, porque a falha está na camada interna." },
    { pergunta: "Meu teclado parou depois de café. Ainda tem jeito?", resposta: "Depende de quanto tempo o resíduo ficou lá. Quanto antes o equipamento for aberto e limpo, maior a chance de salvar o teclado e, principalmente, de evitar que a corrosão alcance a placa." },
    { pergunta: "Posso usar teclado externo em vez de trocar?", resposta: "Pode, e é uma solução legítima para quem usa o notebook parado na mesa. Só não resolve se a causa for oxidação avançando na placa — nesse caso o problema continua evoluindo por baixo." },
    { pergunta: "Quanto tempo leva a troca?", resposta: "Com a peça em mãos, costuma ser um serviço de bancada rápido. O prazo real depende da disponibilidade do teclado para aquele modelo, informada na avaliação." },
    { pergunta: "Teclado que digita sozinho pode ser vírus?", resposta: "É muito improvável. Digitação repetida em teclas específicas é contato preso. Antes de tratar como praga, o teste com teclado externo resolve a dúvida em um minuto." },
  ],
};


for (const rota of CLUSTER_PROBLEMAS_ROUTES) {
  const faq = FAQ_POR_ROTA[rota.path];
  if (faq) rota.faq = faq;
}
