// ─────────────────────────────────────────────────────────────
// RODADA 3Q — PADRÃO VISUAL DAS PÁGINAS COMERCIAIS DE SERVIÇO
//
// Espelho de src/lib/servicoVisual3q.ts usado pelo HTML estático
// (scripts/curated-static-body.mjs). Nada aqui cria conteúdo novo:
// resumo, sumário e caixas reorganizam copy já aprovada em
// src/lib/servicosCore.ts. Sem preço novo, sem promessa de prazo,
// sem avaliação, sem percentual de desempenho.
//
// Paridade React x estático validada por scripts/check-visual-wave-3q.mjs.
// ─────────────────────────────────────────────────────────────

/** Slugs no escopo fechado da Rodada 3Q (exatamente seis). */
export const VISUAL_3Q_SLUGS = [
  "manutencao-de-computador",
  "formatacao",
  "remocao-de-virus",
  "upgrade-ssd-ram",
  "recuperacao-de-dados",
  "redes-e-wifi",
];

export const SERVICO_VISUAL_3Q = {
  "manutencao-de-computador": {
    resumo: [
      { label: "Equipamento", value: "Desktop e all-in-one (notebook tem página própria)" },
      { label: "Diagnóstico", value: "Teste isolado de fonte, memória, armazenamento e placa-mãe" },
      { label: "Atendimento", value: "Domicílio, coleta e entrega ou bancada" },
      { label: "Aprovação", value: "Valor informado antes de qualquer troca de peça" },
    ],
    toc: [
      { id: "incluso", label: "O que está incluso" },
      { id: "quando-chamar", label: "Quando chamar o técnico" },
      { id: "pontos-de-atencao", label: "Pontos de atenção antes de autorizar" },
      { id: "como-funciona", label: "Como funciona o atendimento" },
      { id: "fatores-valor", label: "O que influencia o valor" },
      { id: "faq", label: "Perguntas frequentes" },
    ],
    caixasTitulo: "Pontos de atenção antes de autorizar",
    caixasPosicao: "apos-sinais",
    caixas: [
      {
        icone: "checklist",
        titulo: "O que verificamos",
        itens: [
          "Fonte e estabilidade da alimentação do gabinete.",
          "Memória e armazenamento, incluindo saúde do HD ou SSD.",
          "Placa-mãe, placa de vídeo e conectores internos.",
          "Refrigeração, ventoinhas e poeira acumulada.",
        ],
      },
      {
        icone: "bancada",
        titulo: "Quando o equipamento precisa de bancada",
        itens: [
          "Travamentos intermitentes que não se repetem em teste rápido.",
          "Suspeita de fonte ou placa-mãe, que exige troca controlada de componentes.",
          "Ruído anormal ou desligamento por proteção sob esforço.",
        ],
      },
      {
        icone: "limite",
        titulo: "Peças e autorização",
        itens: [
          "Nenhuma peça é trocada sem a sua autorização explícita.",
          "Informamos se o item é original, paralelo ou recondicionado.",
          "Peças e componentes são tratados à parte do serviço.",
        ],
      },
    ],
    ctaIntermediario: {
      titulo: "Seu desktop trava, reinicia ou não dá vídeo?",
      texto:
        "Descreva o comportamento na triagem. Começamos pelo teste isolado dos componentes antes de falar em peça.",
      label: "Descrever meu problema",
    },
  },

  formatacao: {
    resumo: [
      { label: "Escopo", value: "Instalação limpa do sistema, drivers e programas essenciais" },
      { label: "Dados", value: "Cópia prévia dos arquivos quando o disco permite leitura" },
      { label: "Antes de formatar", value: "Avaliação da causa — lentidão nem sempre é software" },
      { label: "Aprovação", value: "Valor informado antes da execução" },
    ],
    toc: [
      { id: "incluso", label: "O que está incluso" },
      { id: "pontos-de-atencao", label: "Antes de formatar" },
      { id: "quando-chamar", label: "Quando a formatação faz sentido" },
      { id: "como-funciona", label: "Como funciona o atendimento" },
      { id: "fatores-valor", label: "O que influencia o valor" },
      { id: "faq", label: "Perguntas frequentes" },
    ],
    caixasTitulo: "Antes de formatar: o que confirmamos",
    caixasPosicao: "antes-incluso",
    caixas: [
      {
        icone: "backup",
        titulo: "Antes da formatação",
        itens: [
          "Cópia de documentos, fotos, downloads e área de trabalho.",
          "Verificação da saúde do armazenamento antes de reinstalar.",
          "Disco com falha de leitura muda a prioridade: preservar os dados primeiro.",
        ],
      },
      {
        icone: "checklist",
        titulo: "O que precisa ser confirmado",
        itens: [
          "Acesso às contas de e-mail, navegador e serviços usados no dia a dia.",
          "Licença do sistema — não entregamos ativação irregular.",
          "Instalador e licença de programas específicos de trabalho.",
        ],
      },
      {
        icone: "limite",
        titulo: "O que não está incluído automaticamente",
        itens: [
          "Volumes muito grandes de dados ou mídia adicional são escopo à parte.",
          "Programas particulares dependem de instalador e licença fornecidos por você.",
          "Formatar não corrige HD com falha, memória insuficiente ou superaquecimento.",
        ],
      },
    ],
    ctaIntermediario: {
      titulo: "Formatar é mesmo o caminho no seu caso?",
      texto:
        "Descreva o sintoma na triagem. Avaliamos a causa antes de indicar reinstalação do sistema.",
      label: "Descrever meu caso",
    },
  },

  "remocao-de-virus": {
    resumo: [
      { label: "Escopo", value: "Vírus, malware, adware e sequestro de navegador" },
      { label: "Dados", value: "Limpeza com atenção à integridade dos arquivos" },
      { label: "Quando não basta", value: "Sistema muito comprometido pode exigir reinstalação" },
      { label: "Aprovação", value: "Valor informado antes da execução" },
    ],
    toc: [
      { id: "incluso", label: "O que está incluso" },
      { id: "quando-chamar", label: "Sinais de infecção" },
      { id: "pontos-de-atencao", label: "Segurança, contas e limites" },
      { id: "como-funciona", label: "Como funciona o atendimento" },
      { id: "faq", label: "Perguntas frequentes" },
    ],
    caixasTitulo: "Segurança: sinais, cuidados e limites",
    caixasPosicao: "apos-sinais",
    caixas: [
      {
        icone: "alerta",
        titulo: "Sinais que merecem atenção",
        itens: [
          "Pop-ups e propagandas aparecendo sem parar.",
          "Navegador com página inicial, busca ou extensões trocadas.",
          "Programas desconhecidos instalados sozinhos.",
          "Avisos falsos pedindo pagamento ou ligação.",
        ],
      },
      {
        icone: "seguranca",
        titulo: "Cuidados com senhas e contas",
        itens: [
          "Informe na triagem se houve acesso suspeito às suas contas.",
          "Troque as senhas das contas principais depois da limpeza.",
          "Evite acessos financeiros pelo equipamento antes da avaliação.",
        ],
      },
      {
        icone: "limite",
        titulo: "Limites da remoção",
        itens: [
          "Com criptografia ou corrupção, não é possível garantir integridade total dos arquivos.",
          "A limpeza não impede novas infecções depois da entrega.",
          "Recuperação de acesso a contas depende do provedor do serviço, não do atendimento técnico.",
        ],
      },
    ],
    ctaIntermediario: {
      titulo: "Pop-up, navegador trocado ou programa desconhecido?",
      texto:
        "Descreva o que está acontecendo na triagem. Avaliamos o grau de comprometimento antes de indicar limpeza ou reinstalação.",
      label: "Descrever o que está acontecendo",
    },
  },

  "upgrade-ssd-ram": {
    resumo: [
      { label: "Escopo", value: "SSD SATA ou NVMe e ampliação de memória" },
      { label: "Antes da peça", value: "Avaliação de compatibilidade do seu modelo" },
      { label: "Sistema", value: "Clonagem quando possível, instalação limpa quando indicado" },
      { label: "Aprovação", value: "Peça só é adquirida após a sua autorização" },
    ],
    toc: [
      { id: "incluso", label: "O que está incluso" },
      { id: "quando-chamar", label: "Sinais de que o upgrade pode ajudar" },
      { id: "pontos-de-atencao", label: "Compatibilidade e limites" },
      { id: "como-funciona", label: "Como funciona o atendimento" },
      { id: "fatores-valor", label: "O que influencia o valor" },
      { id: "faq", label: "Perguntas frequentes" },
    ],
    caixasTitulo: "Compatibilidade e limites do upgrade",
    caixasPosicao: "apos-sinais",
    caixas: [
      {
        icone: "checklist",
        titulo: "Quando o upgrade pode ajudar",
        itens: [
          "Equipamento que ainda usa HD mecânico.",
          "Disco sempre em uso elevado, segurando o sistema.",
          "Travamentos ao usar várias abas ou aplicativos ao mesmo tempo.",
          "Falta de espaço em disco no uso atual.",
        ],
      },
      {
        icone: "bancada",
        titulo: "Compatibilidade antes da compra",
        itens: [
          "Tipo de conexão suportada pela placa (SATA ou NVMe).",
          "Limite de memória aceito pelo equipamento.",
          "Memória soldada, que em parte dos notebooks não permite ampliação.",
        ],
      },
      {
        icone: "limite",
        titulo: "O que ainda pode limitar o desempenho",
        itens: [
          "Processador e plataforma antigos continuam sendo o teto da máquina.",
          "Superaquecimento e falha de armazenamento não se resolvem com peça nova.",
          "Uso acima do que o equipamento comporta mantém a limitação após o upgrade.",
        ],
      },
    ],
    ctaIntermediario: {
      titulo: "Quer saber o que o seu equipamento aceita?",
      texto:
        "Envie o modelo na triagem. Avaliamos compatibilidade e explicamos o ganho possível no seu caso, sem promessa genérica.",
      label: "Enviar o modelo do equipamento",
    },
  },

  "recuperacao-de-dados": {
    resumo: [
      { label: "Mídias", value: "HD, SSD, pendrive e cartão de memória" },
      { label: "Primeiro passo", value: "Avaliação do dispositivo e da causa da perda" },
      { label: "Transparência", value: "Recuperação de dados não é garantida" },
      { label: "Aprovação", value: "Valor informado antes de qualquer tentativa" },
    ],
    toc: [
      { id: "pontos-de-atencao", label: "Quando parar de usar" },
      { id: "incluso", label: "O que está incluso" },
      { id: "quando-chamar", label: "Situações mais comuns" },
      { id: "como-funciona", label: "Como funciona o atendimento" },
      { id: "fatores-valor", label: "O que influencia o valor" },
      { id: "faq", label: "Perguntas frequentes" },
    ],
    caixasTitulo: "Antes de qualquer tentativa",
    caixasPosicao: "antes-incluso",
    caixas: [
      {
        icone: "alerta",
        titulo: "Quando parar de usar",
        itens: [
          "Ruído anormal vindo do HD.",
          "Falhas progressivas ao abrir ou copiar arquivos.",
          "Dispositivo que desconecta sozinho durante o uso.",
          "Mídia não reconhecida ou pedindo formatação.",
          "Arquivos desaparecendo sem explicação.",
          "Sinal de dano físico no dispositivo.",
        ],
        nota: "Continuar usando pode sobrescrever informações ou agravar a falha.",
      },
      {
        icone: "checklist",
        titulo: "O que influencia a possibilidade de recuperação",
        itens: [
          "Se a falha é lógica ou física.",
          "Tempo e uso do dispositivo depois da perda.",
          "Estado da mídia no momento da avaliação.",
          "Existência de cópia anterior dos arquivos.",
        ],
      },
      {
        icone: "limite",
        titulo: "Limites técnicos",
        itens: [
          "A recuperação de dados não é garantida em nenhum cenário.",
          "Parte das mídias com falha física não permite nova tentativa.",
          "As chances reais só são explicadas depois da avaliação.",
        ],
      },
    ],
    ctaIntermediario: {
      titulo: "Perdeu acesso a arquivos importantes?",
      texto:
        "Descreva o que aconteceu na triagem antes de tentar soluções por conta própria. A avaliação vem antes de qualquer tentativa.",
      label: "Descrever a perda de dados",
    },
  },

  "redes-e-wifi": {
    resumo: [
      { label: "Escopo", value: "Roteador, repetidor, access point e cabeamento" },
      { label: "Ambientes", value: "Residencial e empresarial em Curitiba e região" },
      { label: "Periféricos", value: "Impressoras em rede: configuração e compartilhamento" },
      { label: "Aprovação", value: "Valor informado antes da execução" },
    ],
    toc: [
      { id: "incluso", label: "O que está incluso" },
      { id: "quando-chamar", label: "Sinais de rede instável" },
      { id: "pontos-de-atencao", label: "Cobertura, operadora e periféricos" },
      { id: "como-funciona", label: "Como funciona o atendimento" },
      { id: "faq", label: "Perguntas frequentes" },
    ],
    caixasTitulo: "Como avaliamos rede e Wi-Fi",
    caixasPosicao: "apos-sinais",
    caixas: [
      {
        icone: "checklist",
        titulo: "Cobertura não é a mesma coisa que velocidade",
        itens: [
          "Cobertura depende de posicionamento, obstáculos e interferência no ambiente.",
          "A velocidade contratada é limite do plano, não resultado por dispositivo.",
          "Ampliar cobertura melhora estabilidade onde faltava sinal, sem alterar o plano.",
        ],
      },
      {
        icone: "limite",
        titulo: "O que depende da operadora",
        itens: [
          "Link, modem e plano contratado.",
          "Instabilidade e falhas externas da rede da operadora.",
          "Alterações que só o suporte da operadora pode executar.",
        ],
      },
      {
        icone: "bancada",
        titulo: "Impressoras e periféricos em rede",
        itens: [
          "O atendimento de impressoras e periféricos se limita à configuração, comunicação e compartilhamento em rede.",
          "O escopo não inclui manutenção física do aparelho de impressão.",
          "Compartilhamento entre computadores da mesma rede entra no escopo.",
        ],
      },
    ],
    ctaIntermediario: {
      titulo: "Wi-Fi cai, some em alguns cômodos ou oscila?",
      texto:
        "Conte na triagem como é o ambiente e onde o sinal falha. Avaliamos cobertura, interferência e cabeamento antes de indicar equipamento.",
      label: "Descrever o problema de rede",
    },
  },
};

export default SERVICO_VISUAL_3Q;
