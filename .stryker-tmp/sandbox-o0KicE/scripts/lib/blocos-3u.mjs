// @ts-nocheck
// ─────────────────────────────────────────────────────────────
// RODADA 3U — ÚLTIMA PROPAGAÇÃO VISUAL CONTEXTUAL
//
//   • /atendimento-remoto        → modalidade de atendimento (público misto)
//   • /seguranca-dos-dados       → página institucional e educativa
//   • /servicos/montagem-de-pc   → serviço comercial (público misto)
//
// Três contratos distintos: hero, ordem, blocos e CTA são diferentes em
// cada página. Fonte única compartilhada entre o React (src/lib/blocos3u.ts)
// e o HTML estático (scripts/curated-static-body.mjs).
//
// Nada aqui cria URL, preço, prazo, SLA, plano, benchmark, conformidade,
// monitoramento contínuo ou promessa de desempenho.
// ─────────────────────────────────────────────────────────────

/** Escopo fechado — exatamente três páginas. */
export const BLOCOS_3U_PATHS = [
  "/atendimento-remoto",
  "/seguranca-dos-dados",
  "/servicos/montagem-de-pc",
];

export const BLOCOS_3U = {
  // ── PÁGINA 1 — ATENDIMENTO REMOTO (modalidade) ───────────────
  "/atendimento-remoto": {
    eyebrow: "Modalidade de atendimento",
    resumo: [
      { label: "Modalidade", value: "Sessão remota autorizada e acompanhada" },
      { label: "Público", value: "Residência, home office, autônomo e empresa" },
      { label: "Requisito", value: "Equipamento liga, sistema carrega e há internet" },
      { label: "Limite", value: "Falha física segue para domicílio, coleta ou bancada" },
    ],
    tocExtra: [
      { id: "elegibilidade", label: "Requisitos de elegibilidade" },
      { id: "fluxo-remoto", label: "Como funciona a sessão" },
      { id: "limites-remoto", label: "O que não pode ser resolvido remotamente" },
      { id: "autorizacao-remota", label: "Segurança e autorização" },
    ],
    secoes: [
      {
        kind: "pilares",
        id: "elegibilidade",
        titulo: "Quatro indicadores de elegibilidade do atendimento remoto",
        intro:
          "Antes de agendar, vale conferir se o cenário permite a sessão. Quando um destes quatro pontos não se confirma, a triagem indica outra modalidade em vez de abrir acesso que não resolveria o caso.",
        cards: [
          {
            titulo: "O computador inicia",
            texto:
              "O equipamento precisa ligar e permitir acesso ao sistema. Sem chegar à área de trabalho não existe sessão remota possível.",
          },
          {
            titulo: "Há conexão com a internet",
            texto:
              "A estabilidade da conexão influencia diretamente a sessão. Queda constante interrompe o procedimento e pode inviabilizar o atendimento remoto.",
          },
          {
            titulo: "O usuário pode autorizar",
            texto:
              "A pessoa responsável pelo equipamento precisa acompanhar ou autorizar o acesso. Nada é iniciado sem essa liberação explícita.",
          },
          {
            titulo: "O problema é compatível",
            texto:
              "Falhas físicas, energia, tela sem imagem e equipamentos que não ligam podem exigir atendimento presencial, coleta ou bancada.",
          },
        ],
      },
      {
        kind: "fluxo",
        id: "fluxo-remoto",
        titulo: "Como funciona a sessão remota, do pedido ao encerramento",
        passos: [
          "Solicitação: você descreve o sintoma e o contexto de uso do equipamento.",
          "Triagem: o técnico verifica se o cenário descrito é compatível com acesso remoto.",
          "Confirmação de compatibilidade: se o caso exigir presença física, a modalidade é trocada antes de qualquer cobrança.",
          "Autorização: o acesso só começa quando você libera a conexão no próprio computador.",
          "Acesso temporário: a sessão é aberta apenas pelo tempo necessário ao procedimento combinado.",
          "Procedimento: o que foi autorizado é executado com você acompanhando a tela.",
          "Encerramento da sessão: o acesso é fechado ao final e pode ser revogado a qualquer momento.",
          "Orientação: você recebe o registro do que foi feito e as recomendações de uso.",
        ],
        nota:
          "Nem todo problema pode ser resolvido remotamente. Quando há suspeita de falha física, ausência de imagem, falta de energia ou risco para os dados, pode ser necessário atendimento presencial, coleta ou bancada.",
      },
      {
        kind: "duas-colunas",
        id: "limites-remoto",
        titulo: "Compatível com a sessão remota e o que pede presença física",
        colunas: [
          {
            titulo: "Costuma ser compatível",
            itens: [
              "Configuração de programas legítimos e ajustes do sistema",
              "Drivers, atualizações pendentes e mensagens de erro",
              "Impressoras já conectadas ao computador ou à rede",
              "Configurações de e-mail e problemas de navegação",
              "Triagem de lentidão ligada a software e orientação de uso",
              "Ajustes de rede local acessíveis pelo próprio computador",
            ],
          },
          {
            titulo: "Costuma exigir atendimento presencial",
            itens: [
              "Equipamento que não liga ou tela sem imagem",
              "Cheiro, calor ou ruído incomum e contato com líquido",
              "Falha física, troca de peça e limpeza interna",
              "Bateria, conector e armazenamento com ruído",
              "Rede completamente indisponível quando não há acesso alternativo",
            ],
          },
        ],
        nota:
          "Suporte a sistemas de terceiros acontece dentro dos limites aprovados: podemos verificar o computador, o acesso e a configuração local, mas não corrigimos o sistema mantido pelo fornecedor.",
      },
      {
        kind: "limites",
        id: "autorizacao-remota",
        titulo: "Como o acesso remoto deve ser autorizado",
        destaque:
          "O acesso é temporário, acompanhado e revogável. Não existe acesso permanente ao seu equipamento sem contratação e autorização específicas para isso.",
        listas: [
          {
            titulo: "O que sempre acontece",
            itens: [
              "Consentimento antes de abrir a conexão",
              "Código temporário informado por você no momento da sessão",
              "Acompanhamento na tela durante todo o procedimento",
              "Encerramento do acesso ao final do atendimento",
              "Revogação imediata sempre que você decidir interromper",
              "Acesso mínimo: apenas o necessário ao que foi combinado",
            ],
          },
          {
            titulo: "O que nunca deve ser feito",
            itens: [
              "Enviar senha bancária por mensagem",
              "Enviar código de autenticação recebido no celular",
              "Instalar programa de acesso indicado por anúncio ou desconhecido",
              "Manter acesso ativo depois do encerramento do atendimento",
            ],
          },
        ],
      },
    ],
  },

  // ── PÁGINA 2 — SEGURANÇA DOS DADOS (institucional) ───────────
  "/seguranca-dos-dados": {
    eyebrow: "Página institucional",
    resumo: [],
    tocExtra: [
      { id: "pilares-dados", label: "Práticas que reduzem risco" },
      { id: "responsabilidades-dados", label: "Matriz de responsabilidades" },
      { id: "credenciais", label: "Credenciais e dados sensíveis" },
      { id: "armazenamento-dados", label: "Backup, nuvem e recuperação" },
    ],
    secoes: [
      {
        kind: "pilares",
        id: "pilares-dados",
        titulo: "Quatro práticas que reduzem risco na assistência técnica",
        intro:
          "Nenhum procedimento técnico elimina totalmente o risco de perda. Backup, autorização, acesso mínimo e comunicação clara reduzem riscos, mas não substituem avaliação e responsabilidade compartilhada.",
        cards: [
          {
            titulo: "Backup",
            texto:
              "Cópias feitas antes do atendimento, mantidas em local separado do equipamento e verificadas por restauração. A responsabilidade pela cópia é combinada antes do serviço começar.",
          },
          {
            titulo: "Acesso mínimo",
            texto:
              "Só é acessado o que o procedimento autorizado exige, pelo tempo necessário, com encerramento do acesso quando o serviço termina.",
          },
          {
            titulo: "Autorização",
            texto:
              "Há um responsável identificado, escopo definido, registro do que foi autorizado e limite explícito do que não pode ser alterado sem nova aprovação.",
          },
          {
            titulo: "Sistemas de terceiros",
            texto:
              "Licença, conta, autenticação e disponibilidade de plataformas externas permanecem com o fornecedor. Registramos por escrito o que depende dele.",
          },
        ],
      },
      {
        kind: "responsabilidades",
        id: "responsabilidades-dados",
        titulo: "Matriz de responsabilidades: quem responde por o quê",
        cards: [
          {
            titulo: "Cliente",
            itens: [
              "Indicar quem responde pelo equipamento e pelos dados",
              "Informar restrições de acesso e arquivos críticos",
              "Manter acessos de recuperação das próprias contas",
              "Preservar códigos e meios de autenticação",
              "Comunicar quais dados não podem ser perdidos",
              "Manter backup próprio das informações essenciais",
            ],
          },
          {
            titulo: "Técnico",
            itens: [
              "Solicitar apenas o acesso mínimo necessário",
              "Explicar o procedimento antes de executar",
              "Não armazenar credencial sem necessidade",
              "Encerrar sessões e acessos ao final",
              "Respeitar o escopo autorizado",
              "Registrar limitações encontradas no atendimento",
            ],
          },
          {
            titulo: "Fornecedor externo",
            itens: [
              "Licença e condições de uso da plataforma",
              "Conta, autenticação e recuperação do acesso",
              "Servidor e disponibilidade do serviço",
              "Correção de erro interno do próprio sistema",
              "Recuperação de dados hospedados na plataforma",
            ],
          },
        ],
      },
      {
        kind: "limites",
        id: "credenciais",
        titulo: "O que nunca deve ser enviado por mensagem",
        destaque:
          "Nenhum atendimento legítimo pede estes dados por mensagem. Se alguém pedir em nome do serviço, interrompa e confirme pelo canal oficial.",
        listas: [
          {
            titulo: "Nunca envie",
            itens: [
              "Senha bancária",
              "Código de autenticação em duas etapas",
              "Token de acesso",
              "Chave privada",
              "Credencial de carteira digital",
              "Código de recuperação de conta",
              "Arquivo confidencial sem necessidade e autorização",
            ],
          },
          {
            titulo: "O que costuma ser suficiente",
            itens: [
              "Descrição do sintoma e do contexto de uso",
              "Mensagem de erro exibida na tela",
              "Senha do próprio computador, informada no momento do atendimento",
              "Nome do responsável que autoriza o procedimento",
            ],
          },
        ],
      },
      {
        kind: "conceitos",
        id: "armazenamento-dados",
        titulo: "Backup, sincronização, nuvem e recuperação não são a mesma coisa",
        cards: [
          {
            titulo: "Backup",
            texto:
              "Cópia planejada e separada, feita antes de qualquer problema. É prevenção e depende de rotina definida.",
          },
          {
            titulo: "Sincronização",
            texto:
              "Replica alterações entre dispositivos, inclusive exclusões e arquivos danificados. Não substitui backup.",
          },
          {
            titulo: "Armazenamento em nuvem",
            texto:
              "Depende da conta, da autenticação e da disponibilidade do fornecedor. O acesso pode ser perdido junto com a conta.",
          },
          {
            titulo: "Recuperação de dados",
            texto:
              "Tentativa posterior à falha, sem garantia de resultado. É o último recurso, não um plano de proteção.",
          },
        ],
      },
    ],
  },

  // ── PÁGINA 3 — MONTAGEM DE PC (serviço comercial) ────────────
  "/servicos/montagem-de-pc": {
    eyebrow: "Serviço de montagem e configuração",
    resumo: [
      { label: "Escopo", value: "Montagem, configuração e testes em bancada" },
      { label: "Público", value: "Uso geral, gamer, workstation e empresa" },
      { label: "Peças", value: "Fornecidas pelo cliente ou definidas na triagem" },
      { label: "Autorização", value: "Configuração aprovada antes da montagem" },
    ],
    tocExtra: [
      { id: "escopo-montagem", label: "Indicadores de escopo" },
      { id: "fluxo-montagem", label: "Como funciona a montagem" },
      { id: "contextos-montagem", label: "Contextos de uso" },
      { id: "compatibilidade-montagem", label: "Compatibilidade" },
      { id: "pecas-do-cliente", label: "Peças fornecidas pelo cliente" },
      { id: "bios-firmware", label: "BIOS e firmware" },
      { id: "testes-montagem", label: "Testes antes da entrega" },
      { id: "garantias-montagem", label: "Garantias distintas" },
    ],
    secoes: [
      {
        kind: "pilares",
        id: "escopo-montagem",
        titulo: "Indicadores de escopo da montagem",
        intro:
          "A montagem é um serviço de execução e validação do conjunto. O que entra no escopo é definido na triagem, antes de qualquer compra ou deslocamento.",
        cards: [
          {
            titulo: "Peças do cliente ou configuração a definir",
            texto:
              "Você pode trazer os componentes já adquiridos ou definir a configuração junto na triagem, conforme o uso pretendido.",
          },
          {
            titulo: "Compatibilidade antes da montagem",
            texto:
              "Soquete, chipset, memória, fonte, conectores e espaço interno são conferidos antes de montar, evitando conflito descoberto no meio do processo.",
          },
          {
            titulo: "Organização e configuração",
            texto:
              "Cabeamento organizado, fluxo de ar definido, BIOS ajustada e drivers instalados a partir das fontes oficiais.",
          },
          {
            titulo: "Testes antes da entrega",
            texto:
              "Memória, armazenamento, temperatura, portas e estabilidade verificados em bancada antes de o equipamento ser liberado.",
          },
        ],
      },
      {
        kind: "fluxo",
        id: "fluxo-montagem",
        titulo: "Como funciona a montagem, do levantamento à entrega",
        passos: [
          "Levantamento de requisitos: uso pretendido, programas exigentes e o que já existe.",
          "Lista de componentes: definição do conjunto ou conferência das peças já adquiridas.",
          "Compatibilidade: verificação de soquete, chipset, memória, fonte, conectores e dimensões.",
          "Autorização: a configuração e o escopo são aprovados antes da execução.",
          "Montagem: instalação dos componentes, cabeamento e definição do fluxo de ar.",
          "BIOS e drivers: ajustes de firmware quando necessário e instalação a partir de fontes oficiais.",
          "Testes: memória, armazenamento, temperatura, portas, vídeo, rede e reinicialização.",
          "Entrega e orientação: registro do que foi feito e recomendações de uso.",
        ],
        nota:
          "Nem toda peça é compatível entre si, peça usada pode apresentar defeito prévio, atualização de BIOS depende de necessidade real e o desempenho final depende do conjunto e do software utilizado.",
      },
      {
        kind: "contextos",
        id: "contextos-montagem",
        titulo: "Contextos de uso considerados na configuração",
        intro:
          "Não existe configuração universal. O conjunto é dimensionado a partir do uso real descrito na triagem.",
        cards: [
          {
            titulo: "Uso geral",
            itens: [
              "Estudo, navegação e trabalho de escritório",
              "Multitarefa com várias abas e programas abertos",
              "Armazenamento rápido para inicialização e arquivos do dia a dia",
            ],
            link: { label: "Manutenção de computador", to: "/servicos/manutencao-de-computador" },
          },
          {
            titulo: "PC Gamer",
            itens: [
              "Jogos com dependência direta da placa de vídeo",
              "Refrigeração dimensionada para o gabinete escolhido",
              "Fonte compatível com o consumo do conjunto",
              "Espaço para expansão futura de memória e armazenamento",
            ],
            link: { label: "Upgrade de SSD e memória", to: "/servicos/upgrade-ssd-ram" },
          },
          {
            titulo: "Workstation",
            itens: [
              "Arquivos grandes e programas exigentes",
              "Memória dimensionada para o fluxo de trabalho",
              "Armazenamento separado para projeto e sistema",
              "GPU considerada quando o programa realmente utiliza",
            ],
            link: { label: "Equipamentos atendidos", to: "/equipamentos-atendidos" },
          },
          {
            titulo: "Empresa",
            itens: [
              "Estação de trabalho padronizada entre usuários",
              "Suporte a múltiplos monitores quando necessário",
              "Facilidade de manutenção e reposição de peças",
              "Rotina de backup considerada desde a entrega",
            ],
            link: { label: "Empresa de TI em Curitiba", to: "/empresa-de-ti-curitiba" },
          },
        ],
      },
      {
        kind: "duas-colunas",
        id: "compatibilidade-montagem",
        titulo: "O que é verificado na compatibilidade antes da compra",
        colunas: [
          {
            titulo: "Conjunto principal",
            itens: [
              "Soquete do processador e chipset da placa-mãe",
              "Tipo, quantidade e velocidade suportada de memória",
              "Potência e conectores disponíveis na fonte",
              "Versão de firmware exigida pelo componente",
            ],
          },
          {
            titulo: "Espaço físico e refrigeração",
            itens: [
              "Dimensões da placa de vídeo e do cooler",
              "Compatibilidade do gabinete com a placa-mãe",
              "Fluxo de ar e posicionamento das ventoinhas",
              "Conectores de armazenamento e portas frontais",
            ],
          },
        ],
        nota:
          "A conferência é feita sobre o conjunto informado. Alterar uma peça depois pode exigir nova verificação de compatibilidade.",
      },
      {
        kind: "limites",
        id: "pecas-do-cliente",
        titulo: "Peças fornecidas pelo cliente",
        destaque:
          "Peças trazidas pelo cliente são bem-vindas e entram no registro com identificação própria. A garantia da peça permanece com quem a vendeu ou fabricou.",
        listas: [
          {
            titulo: "O que é feito na chegada",
            itens: [
              "Conferência item a item, com modelo e estado da embalagem",
              "Verificação de procedência e de acessórios que acompanham a peça",
              "Registro de integridade e de sinais visíveis de uso",
              "Checagem de compatibilidade com o restante do conjunto",
            ],
          },
          {
            titulo: "O que fica fora da nossa responsabilidade",
            itens: [
              "Defeito prévio existente na peça entregue",
              "Defeito de fabricação, que segue com o fabricante",
              "Ausência de acessório não entregue junto com a peça",
              "Componente incompatível adquirido antes da conferência",
            ],
          },
        ],
      },
      {
        kind: "conceitos",
        id: "bios-firmware",
        titulo: "Quando uma atualização de BIOS pode ser necessária",
        cards: [
          {
            titulo: "Compatibilidade",
            texto:
              "Algumas placas só reconhecem processadores ou memórias mais novos após uma versão específica de firmware.",
          },
          {
            titulo: "Estabilidade",
            texto:
              "Correções do fabricante podem resolver comportamento instável já identificado no conjunto montado.",
          },
          {
            titulo: "Risco e autorização",
            texto:
              "Toda atualização envolve risco de interrupção. Por isso só é feita quando há necessidade real e com autorização.",
          },
          {
            titulo: "Quando não fazer",
            texto:
              "Se o conjunto está estável e o componente é reconhecido, atualizar sem motivo apenas adiciona risco desnecessário.",
          },
        ],
      },
      {
        kind: "duas-colunas",
        id: "testes-montagem",
        titulo: "Testes executados antes da entrega",
        colunas: [
          {
            titulo: "Conjunto e componentes",
            itens: [
              "Reconhecimento de todos os componentes instalados",
              "Teste de memória e verificação do armazenamento",
              "Inicialização e reinicialização repetidas",
              "Portas, vídeo e rede em funcionamento",
            ],
          },
          {
            titulo: "Comportamento em uso",
            itens: [
              "Leitura de temperatura sob carga",
              "Estabilidade durante o período de bancada",
              "Verificação de ruído anormal de ventoinha",
              "Confirmação das configurações aplicadas na BIOS",
            ],
          },
        ],
        nota:
          "Os testes verificam funcionamento e estabilidade do conjunto. Não são medição de desempenho, comparação entre equipamentos nem estimativa de quadros por segundo.",
      },
      {
        kind: "matriz",
        id: "garantias-montagem",
        titulo: "Garantias distintas: montagem, configuração e peça",
        colunas: ["Cobertura", "O que abrange", "O que pode alterar a cobertura"],
        linhas: [
          [
            "Garantia da montagem",
            "Execução do serviço: instalação, encaixe, cabeamento e organização interna.",
            "Intervenção de terceiro no equipamento depois da entrega.",
          ],
          [
            "Garantia da configuração",
            "Ajustes aplicados em BIOS, drivers e sistema conforme o escopo autorizado.",
            "Alteração posterior feita por outra pessoa ou overclock aplicado depois.",
          ],
          [
            "Garantia da peça",
            "Componente adquirido junto ao fornecedor indicado, nas condições do vendedor.",
            "Peça usada, uso inadequado ou dano físico posterior.",
          ],
          [
            "Garantia do fabricante",
            "Defeito de fabricação tratado diretamente pelo fabricante do componente.",
            "Prazo do fabricante, lacre violado ou número de série ilegível.",
          ],
        ],
        nota:
          "As condições comerciais vigentes continuam publicadas em preços e políticas. Esta tabela apenas diferencia visualmente coberturas que já existem.",
      },
    ],
  },
};

/** CTA intermediário — só nas páginas comerciais/modalidade. */
export const CTA_3U = {
  "/atendimento-remoto": {
    titulo: "Não tem certeza se o seu caso é compatível?",
    texto:
      "Descreva o sintoma e o contexto de uso. A triagem confirma se a sessão remota resolve ou se o caso precisa de atendimento presencial.",
    label: "Verificar se o atendimento remoto é adequado",
  },
  "/servicos/montagem-de-pc": {
    titulo: "Já tem as peças ou quer definir a configuração?",
    texto:
      "Envie a lista de componentes ou descreva o uso pretendido. A compatibilidade é conferida antes de qualquer compra ou montagem.",
    label: "Descrever a configuração ou as peças",
  },
};

/** Contexto de triagem esperado por página (sem criar campo novo). */
export const CONTEXTO_3U = {
  "/atendimento-remoto": { service: "atendimento-remoto", source: "atendimento-remoto" },
  "/servicos/montagem-de-pc": {
    service: "montagem-de-pc",
    equipment: "computador",
    source: "servico-montagem-de-pc",
  },
};

export default BLOCOS_3U;
