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
      },,
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
};

for (const rota of CLUSTER_PROBLEMAS_ROUTES) {
  const faq = FAQ_POR_ROTA[rota.path];
  if (faq) rota.faq = faq;
}
