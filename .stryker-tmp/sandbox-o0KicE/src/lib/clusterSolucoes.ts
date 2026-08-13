/**
 * Cluster SOLUÇÕES — entrada pelo procedimento técnico (diagnóstico,
 * formatação, SSD, backup, recuperação de dados).
 *
 * Regra do cluster (igual a PROBLEMAS e EQUIPAMENTOS): só entra solução com
 * conteúdo técnico próprio, etapas reais de execução e ligação explícita com
 * os sintomas que ela resolve. Nada de página gerada por variação de palavra.
 */
// @ts-nocheck


export type SolucaoFaq = { q: string; a: string };

export type ClusterSolucao = {
  slug: string;
  path: string;
  titulo: string; // H1
  metaTitle: string;
  metaDescription: string;
  resumo: string;
  waMessage: string;
  /** Quando essa solução é a indicada (sintoma → solução). */
  indicacoes: { titulo: string; desc: string }[];
  /** Etapas de execução, na ordem em que acontecem. */
  etapas: string[];
  /** O que evitar antes de acionar essa solução. */
  naoFaca: string[];
  /** Modalidade indicada por tipo de caso. */
  modalidades: { titulo: string; desc: string }[];
  faq: SolucaoFaq[];
  /** Links contextuais para problemas, equipamentos e serviços. */
  relacionados: { to: string; titulo: string; desc: string }[];
};

export const CLUSTER_SOLUCOES: ClusterSolucao[] = [
  {
    slug: "diagnostico",
    path: "/solucoes/diagnostico",
    titulo: "Diagnóstico técnico: descobrir a causa antes de trocar qualquer peça",
    metaTitle: "Diagnóstico técnico de computador e notebook | O Técnico de Informática",
    metaDescription:
      "Diagnóstico técnico que separa software, energia, armazenamento e temperatura antes de indicar peça. Veja as etapas, o que é medido e como o orçamento é apresentado.",
    resumo:
      "Diagnóstico não é abrir o equipamento e olhar. É uma sequência de testes que elimina hipóteses na ordem certa — energia, armazenamento, memória, temperatura e sistema — até sobrar a causa real. Sem essa etapa, qualquer orçamento é chute, e chute custa peça trocada à toa.",
    waMessage:
      "Olá! Vim da página de diagnóstico técnico. Preciso descobrir a causa do problema no meu equipamento.",
    indicacoes: [
      {
        titulo: "O equipamento apresenta mais de um sintoma ao mesmo tempo",
        desc: "Lentidão junto com travamento e desligamento raramente tem causa única. O diagnóstico separa o que é consequência do que é origem, evitando dois reparos para um problema só.",
      },
      {
        titulo: "Já trocaram peça e o problema continua",
        desc: "Quando a peça nova não resolveu, o defeito estava em outro ponto do circuito. Recomeçamos pela medição, não pela suposição anterior.",
      },
      {
        titulo: "Você precisa decidir entre consertar e substituir",
        desc: "O laudo mostra o custo do reparo viável e a vida útil esperada, para a decisão ser econômica e não emocional.",
      },
    ],
    etapas: [
      "Levantamento do histórico: quando começou, o que mudou antes, se houve queda, líquido ou queda de energia.",
      "Teste de alimentação: fonte, carregador, circuito de carga e comportamento sob carga.",
      "Verificação de armazenamento com leitura de saúde do disco e tempo real de resposta.",
      "Teste de memória e temperatura em uso, não apenas em repouso.",
      "Análise do sistema: inicialização, serviços, drivers, integridade de arquivos e presença de programas indesejados.",
      "Laudo com causa provável, o que é reparável, o que não compensa e o valor de cada etapa antes de qualquer execução.",
    ],
    naoFaca: [
      "Instalar otimizadores e limpadores baixados de anúncios — costumam mascarar o sintoma e apagar evidência do defeito.",
      "Reinstalar o sistema antes do diagnóstico quando há dados importantes ainda no disco.",
      "Insistir em ligar repetidamente um equipamento que dá curto ou cheiro de queimado.",
    ],
    modalidades: [
      {
        titulo: "Remoto",
        desc: "Serve para casos de sistema, lentidão por software, e-mail, contas e programas. Começa na hora marcada, sem deslocamento.",
      },
      {
        titulo: "Visita técnica",
        desc: "Inspeção, diagnóstico, avaliação e tentativa de reparo rápido compatível, sem compromisso de conserto e sem peças inclusas. O tempo é contado em blocos de até 30 minutos.",
      },
      {
        titulo: "Coleta com entrega",
        desc: "Quando o caso passa de uma a duas horas de trabalho, a coleta é oferecida sem custo de deslocamento, com mínimo pré-aprovado de R$ 299,99. O que couber nesse valor já é executado; o que passar é informado antes.",
      },
    ],
    faq: [
      {
        q: "O diagnóstico é cobrado separadamente?",
        a: "O diagnóstico é uma etapa com valor próprio, informado antes de começar. Quando o reparo é aprovado na sequência, ele é considerado dentro do escopo combinado. As condições completas estão em preços e políticas.",
      },
      {
        q: "Quanto tempo leva?",
        a: "Casos de software costumam fechar dentro de uma sessão. Casos de hardware dependem de teste sob carga e substituição controlada de componentes, o que normalmente exige bancada e prazo informado na triagem.",
      },
      {
        q: "Vocês têm balcão para eu levar o aparelho?",
        a: "Não. Trabalhamos apenas com atendimento remoto, visita técnica e coleta com entrega no endereço combinado.",
      },
    ],
    relacionados: [
      { to: "/problemas/computador-lento", titulo: "Computador lento", desc: "O sintoma mais comum que começa pelo diagnóstico." },
      { to: "/problemas/tela-azul", titulo: "Tela azul no Windows", desc: "Falha que exige teste de memória e armazenamento." },
      { to: "/solucoes/formatacao", titulo: "Formatação e reinstalação", desc: "O que fazer quando o diagnóstico aponta sistema comprometido." },
    ],
  },
  {
    slug: "formatacao",
    path: "/solucoes/formatacao",
    titulo: "Formatação e reinstalação de sistema sem perder o que importa",
    metaTitle: "Formatação e reinstalação de Windows com backup | O Técnico de Informática",
    metaDescription:
      "Formatação feita na ordem correta: backup conferido, sistema limpo, drivers corretos e programas de trabalho restaurados. Veja etapas, riscos e quando formatar não resolve.",
    resumo:
      "Formatar resolve sistema corrompido, infecção persistente e acúmulo de anos de instalação — mas não conserta disco em falha nem memória defeituosa. Por isso a formatação só entra depois do diagnóstico, e sempre com backup conferido antes de qualquer apagamento.",
    waMessage:
      "Olá! Vim da página de formatação. Preciso formatar e reinstalar o sistema preservando meus arquivos.",
    indicacoes: [
      {
        titulo: "Sistema travando, com erros de atualização ou perfil corrompido",
        desc: "Quando a base do sistema está inconsistente, reparo pontual vira retrabalho. A reinstalação limpa devolve previsibilidade.",
      },
      {
        titulo: "Infecção que volta depois da remoção",
        desc: "Ameaças que se reinstalam sozinhas costumam viver em componentes do sistema. A reinstalação corta a origem.",
      },
      {
        titulo: "Equipamento herdado ou comprado usado",
        desc: "Começar do zero elimina contas antigas, licenças penduradas e programas desconhecidos rodando em segundo plano.",
      },
    ],
    etapas: [
      "Conferência do que precisa ser preservado: documentos, fotos, e-mails, favoritos, licenças e perfis de programa.",
      "Backup em mídia separada com verificação de leitura — só depois disso qualquer coisa é apagada.",
      "Instalação limpa do sistema, com particionamento adequado ao armazenamento existente.",
      "Drivers corretos do modelo, não pacotes genéricos automáticos.",
      "Reinstalação dos programas de trabalho e restauração dos dados nos caminhos originais.",
      "Ajustes finais de atualização, segurança e inicialização, com validação do que você usa no dia a dia.",
    ],
    naoFaca: [
      "Formatar por conta própria quando há arquivos importantes e nenhum backup verificado.",
      "Usar instaladores de sistema baixados de sites de download com programas embutidos.",
      "Formatar antes de testar o disco: em disco com setores em falha, o sistema novo volta a travar em poucos dias.",
    ],
    modalidades: [
      { titulo: "Remoto", desc: "Possível quando o sistema ainda inicia e a conexão é estável, com backup em mídia local sua." },
      { titulo: "Visita técnica", desc: "Inspeção e execução no endereço, em blocos de até 30 minutos, sem compromisso de conserto e sem peças inclusas." },
      { titulo: "Coleta com entrega", desc: "Indicada quando o volume de dados é grande ou o serviço passa de uma a duas horas. Coleta sem custo de deslocamento e mínimo pré-aprovado de R$ 299,99." },
    ],
    faq: [
      {
        q: "Vou perder meus arquivos?",
        a: "Não, quando o backup é possível. A ordem de trabalho é backup conferido primeiro, apagamento depois. Se o disco estiver em falha grave, isso é informado antes e o caso passa a ser tratado como recuperação de dados.",
      },
      {
        q: "Formatar deixa o computador rápido de novo?",
        a: "Deixa mais previsível, mas não muda hardware. Se o gargalo for disco mecânico ou memória insuficiente, a melhora real vem com SSD e memória adequada — o diagnóstico mostra qual é o caso.",
      },
      {
        q: "Meus programas de trabalho voltam?",
        a: "Sim, os que você tiver direito de uso. Licenças, contas e chaves precisam estar disponíveis; isso é levantado na triagem, antes do agendamento.",
      },
    ],
    relacionados: [
      { to: "/solucoes/diagnostico", titulo: "Diagnóstico técnico", desc: "Etapa que define se formatar resolve o seu caso." },
      { to: "/solucoes/backup", titulo: "Backup", desc: "O que é preservado e como a cópia é conferida." },
      { to: "/equipamentos/notebook", titulo: "Notebook", desc: "Sintomas de notebook que costumam terminar em reinstalação." },
    ],
  },
  {
    slug: "ssd",
    path: "/solucoes/ssd",
    titulo: "Troca por SSD: o upgrade que realmente muda o tempo de resposta",
    metaTitle: "Instalação e troca de SSD com clonagem | O Técnico de Informática",
    metaDescription:
      "Instalação de SSD com clonagem do sistema, alinhamento correto e teste de desempenho. Veja quando o SSD resolve, quando não resolve e como o serviço é executado.",
    resumo:
      "Na maioria dos computadores com mais de quatro anos, o disco mecânico responde por quase toda a lentidão percebida. Trocar por SSD reduz o tempo de inicialização e abertura de programas de forma mensurável — mas só faz sentido depois de confirmar que o gargalo é o armazenamento, e não memória, temperatura ou sistema.",
    waMessage:
      "Olá! Vim da página de SSD. Quero avaliar a troca por SSD no meu equipamento.",
    indicacoes: [
      { titulo: "Demora para ligar e para abrir programas simples", desc: "Quando o uso de disco fica constantemente saturado com pouca atividade, o armazenamento é o gargalo." },
      { titulo: "Disco mecânico com ruído ou leitura instável", desc: "Além de lento, é um disco em risco. A troca protege os dados antes de a falha se tornar perda." },
      { titulo: "Máquina boa parada por causa de armazenamento", desc: "Processador e placa ainda adequados não justificam trocar o computador inteiro." },
    ],
    etapas: [
      "Medição do gargalo real: tempo de resposta do disco, uso de memória e temperatura sob carga.",
      "Escolha do tipo compatível com a placa: SATA ou NVMe, com a capacidade adequada ao seu uso.",
      "Clonagem do sistema quando o disco atual está íntegro, preservando programas e configurações.",
      "Instalação limpa quando o sistema atual já está comprometido — nesse caso, com backup conferido antes.",
      "Ajuste de inicialização, verificação de alinhamento e atualização de firmware quando aplicável.",
      "Teste comparativo de desempenho e entrega com o disco antigo devolvido a você.",
    ],
    naoFaca: [
      "Comprar SSD sem confirmar o conector da placa: nem todo notebook aceita NVMe.",
      "Descartar o disco antigo antes de conferir que tudo foi migrado.",
      "Esperar ganho de desempenho em jogos pesados — SSD reduz carregamento, não substitui placa de vídeo.",
    ],
    modalidades: [
      { titulo: "Visita técnica", desc: "Possível em desktops e notebooks de acesso simples, em blocos de até 30 minutos, sem peças inclusas no tempo de inspeção." },
      { titulo: "Coleta com entrega", desc: "Indicada quando há clonagem de grande volume ou desmontagem mais profunda. Coleta sem custo de deslocamento, mínimo pré-aprovado de R$ 299,99." },
      { titulo: "Remoto", desc: "Não se aplica à troca física, mas o diagnóstico que confirma o gargalo pode ser feito remotamente." },
    ],
    faq: [
      {
        q: "A peça está incluída no valor do serviço?",
        a: "Não. Mão de obra e peça são informadas separadamente, sempre antes da execução. Você pode fornecer o SSD ou pedir a indicação de um modelo compatível.",
      },
      {
        q: "Preciso reinstalar tudo depois da troca?",
        a: "Não, quando o sistema atual está íntegro: a clonagem preserva programas, contas e arquivos. Se o sistema já estiver comprometido, a instalação limpa é mais segura e isso é informado no diagnóstico.",
      },
      {
        q: "Vale a pena em computador muito antigo?",
        a: "Depende do conjunto. Em máquinas muito limitadas de memória, o SSD ajuda menos do que parece. O diagnóstico mostra o ganho esperado antes de você gastar.",
      },
    ],
    relacionados: [
      { to: "/problemas/computador-lento", titulo: "Computador lento", desc: "O sintoma que mais leva à troca por SSD." },
      { to: "/solucoes/backup", titulo: "Backup", desc: "Proteção dos dados antes de qualquer migração." },
      { to: "/equipamentos/desktop", titulo: "Desktop / PC", desc: "Como o upgrade é executado em máquinas de mesa." },
    ],
  },
  {
    slug: "backup",
    path: "/solucoes/backup",
    titulo: "Backup: cópia conferida, não pasta copiada às pressas",
    metaTitle: "Backup de arquivos e rotina de cópia segura | O Técnico de Informática",
    metaDescription:
      "Backup com verificação de leitura, separação do que realmente importa e rotina que continua funcionando depois do atendimento. Veja etapas, mídias e limites.",
    resumo:
      "Backup só existe quando alguém já testou a restauração. Cópia feita de qualquer jeito, na mesma máquina ou no mesmo disco, some junto com o problema. A rotina que montamos separa o que importa, grava em mídia independente e confere a leitura antes de considerar a cópia concluída.",
    waMessage:
      "Olá! Vim da página de backup. Quero organizar uma rotina de cópia dos meus arquivos.",
    indicacoes: [
      { titulo: "Antes de formatar, trocar disco ou fazer upgrade", desc: "Qualquer procedimento que mexa em armazenamento começa pela cópia conferida." },
      { titulo: "Disco dando sinais de falha", desc: "Ruído, travamento em leitura e erros de arquivo indicam janela curta para salvar o conteúdo." },
      { titulo: "Empresa sem rotina definida", desc: "Documentos fiscais, contratos e bases de sistema precisam de cópia com periodicidade e responsável definidos." },
    ],
    etapas: [
      "Mapeamento do que precisa ser copiado: documentos, fotos, e-mails, bases de sistema e configurações.",
      "Escolha da mídia de destino independente da máquina de origem.",
      "Cópia com verificação de integridade, arquivo a arquivo, não apenas contagem de pastas.",
      "Teste de restauração de amostra, para confirmar que a cópia abre de verdade.",
      "Definição de periodicidade e de quem executa, quando é rotina de empresa.",
      "Orientação de guarda: onde ficam as mídias e o que fazer quando a principal falhar.",
    ],
    naoFaca: [
      "Guardar o backup na mesma máquina ou na mesma unidade que está sendo protegida.",
      "Confiar em sincronização automática como se fosse backup: arquivo apagado por engano some dos dois lados.",
      "Continuar usando um disco que já apresentou erro de leitura enquanto a cópia não terminou.",
    ],
    modalidades: [
      { titulo: "Remoto", desc: "Adequado para organizar rotina, configurar destino e validar restauração de amostra." },
      { titulo: "Visita técnica", desc: "Para ambientes com vários equipamentos ou rede local, em blocos de até 30 minutos, sem compromisso de conserto." },
      { titulo: "Coleta com entrega", desc: "Quando o volume é grande ou o disco de origem está instável. Coleta sem custo de deslocamento e mínimo pré-aprovado de R$ 299,99." },
    ],
    faq: [
      {
        q: "Vocês fornecem a mídia de destino?",
        a: "Pode ser sua ou indicada por nós. O custo da mídia é informado separadamente da mão de obra, antes da execução.",
      },
      {
        q: "Backup garante recuperar arquivo já apagado?",
        a: "Não. Backup protege daqui para frente. Arquivo já perdido entra em recuperação de dados, que é outro procedimento e tem resultado dependente do estado da mídia.",
      },
      {
        q: "Dá para automatizar?",
        a: "Sim, com rotina agendada e destino independente. A automação só é entregue depois de um teste de restauração bem-sucedido.",
      },
    ],
    relacionados: [
      { to: "/solucoes/recuperacao-de-dados", titulo: "Recuperação de dados", desc: "Quando a perda já aconteceu." },
      { to: "/solucoes/formatacao", titulo: "Formatação", desc: "Procedimento que sempre começa pelo backup." },
      { to: "/empresas", titulo: "Atendimento para empresas", desc: "Rotinas de cópia com responsável e periodicidade." },
    ],
  },
  {
    slug: "recuperacao-de-dados",
    path: "/solucoes/recuperacao-de-dados",
    titulo: "Recuperação de dados: o que dá para salvar e o que não dá",
    metaTitle: "Recuperação de dados de HD, SSD e pen drive | O Técnico de Informática",
    metaDescription:
      "Recuperação de arquivos apagados, partição perdida e disco que não é reconhecido. Veja o que aumenta a chance, o que destrói o resultado e como o caso é avaliado.",
    resumo:
      "Recuperação de dados não tem garantia de resultado — tem procedimento honesto. A chance depende do que aconteceu com a mídia e, principalmente, do que foi feito depois. Cada gravação nova sobre a área afetada reduz o que ainda pode ser lido, por isso o primeiro passo é parar de usar o equipamento.",
    waMessage:
      "Olá! Vim da página de recuperação de dados. Perdi arquivos e preciso de uma avaliação.",
    indicacoes: [
      { titulo: "Arquivos apagados por engano ou lixeira esvaziada", desc: "Enquanto a área não for sobrescrita, boa parte do conteúdo continua legível." },
      { titulo: "Partição sumiu ou o disco pede formatação", desc: "Costuma ser dano de estrutura, não perda do conteúdo em si." },
      { titulo: "Disco externo ou pen drive não reconhecido", desc: "Pode ser conector, controladora ou mídia. A separação disso define se há caminho viável." },
    ],
    etapas: [
      "Parar o uso imediatamente e registrar exatamente o que aconteceu e quando.",
      "Avaliação do estado da mídia: reconhecimento, saúde, ruído e comportamento de leitura.",
      "Leitura controlada, sem gravar nada na mídia de origem.",
      "Geração de imagem quando o disco está instável, para trabalhar sobre a cópia.",
      "Listagem do que foi possível recuperar, com estrutura de pastas quando ela sobrevive.",
      "Entrega em mídia separada e descarte da área temporária depois da sua conferência.",
    ],
    naoFaca: [
      "Instalar programas de recuperação no próprio disco afetado — cada instalação grava por cima do que se quer salvar.",
      "Formatar ou aceitar a sugestão de formatação do sistema.",
      "Abrir o disco, congelar ou bater no equipamento seguindo receita de vídeo.",
    ],
    modalidades: [
      { titulo: "Coleta com entrega", desc: "Modalidade padrão: o trabalho exige bancada. Coleta sem custo de deslocamento, com mínimo pré-aprovado de R$ 299,99 e informação prévia se o caso exigir mais." },
      { titulo: "Visita técnica", desc: "Serve para avaliação inicial e orientação de preservação, em blocos de até 30 minutos, sem compromisso de resultado." },
      { titulo: "Remoto", desc: "Aplicável apenas para orientação imediata de preservação, antes da coleta." },
    ],
    faq: [
      {
        q: "Existe garantia de recuperar tudo?",
        a: "Não. Nenhum procedimento sério garante resultado integral. O que é garantido é a avaliação transparente: o que foi possível ler, o que não foi e por quê, antes de você decidir seguir.",
      },
      {
        q: "Quanto custa?",
        a: "A avaliação e o mínimo pré-aprovado seguem a política publicada em preços e políticas. Se o caso exigir procedimento acima do valor aprovado, isso é informado antes de qualquer execução adicional.",
      },
      {
        q: "Meus arquivos ficam guardados com vocês?",
        a: "O material lido fica em área temporária apenas até a entrega e sua conferência. Depois da validação, é descartado, salvo combinação diferente registrada no atendimento.",
      },
    ],
    relacionados: [
      { to: "/problemas/arquivos-apagados", titulo: "Arquivos apagados", desc: "O sintoma que leva a esse procedimento." },
      { to: "/solucoes/backup", titulo: "Backup", desc: "Como evitar a próxima perda." },
      { to: "/equipamentos/notebook", titulo: "Notebook", desc: "Casos de armazenamento em notebooks." },
    ],
  },
];

export const clusterSolucao = (slug: string) =>
  CLUSTER_SOLUCOES.find((s) => s.slug === slug) ?? null;

export const SOLUCOES_PATHS = CLUSTER_SOLUCOES.map((s) => s.path);
