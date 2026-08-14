/**
 * BUSCA INTELIGENTE DE SINTOMAS (Rodada 8B)
 *
 * O visitante digita o problema com as palavras dele ("ta muito devagar",
 * "tela azul do windows", "esquenta muito e desliga"). Esta engine traduz
 * essa frase na rota interna correta — cluster de problema ou serviço.
 *
 * Estratégia (sem dependência externa, determinística e testável):
 *   1. normalização (minúsculas, sem acento, sem pontuação);
 *   2. expansão de gírias/erros comuns por dicionário de sinônimos;
 *   3. casamento por frase inteira, por token e por prefixo;
 *   4. tolerância a erro de digitação via distância de Levenshtein (≤ 2
 *      para palavras com 5+ letras, ≤ 1 para 4 letras);
 *   5. desempate por peso da intenção (frequência real de atendimento).
 *
 * Nenhuma rota nova é inventada aqui: todos os destinos já existem.
 */

export type IntencaoBusca = {
  id: string;
  /** Rótulo em linguagem de cliente (usado nos chips da Home). */
  label: string;
  /** Rota de destino já existente no portal. */
  href: string;
  /** Termos e variações que representam a intenção. */
  termos: string[];
  /** Peso de desempate (quanto maior, mais frequente no atendimento). */
  peso: number;
};

/** Sinônimos e erros de digitação frequentes → termo canônico. */
const SINONIMOS: Record<string, string> = {
  devagar: "lento",
  lerdo: "lento",
  arrastando: "lento",
  travadao: "travando",
  travad: "travando",
  trava: "travando",
  pc: "computador",
  cpu: "computador",
  desktop: "computador",
  maquina: "computador",
  note: "notebook",
  laptop: "notebook",
  lap: "notebook",
  "note book": "notebook",
  bsod: "tela azul",
  "telinha azul": "tela azul",
  "tela azul da morte": "tela azul",
  net: "internet",
  wifi: "wi-fi",
  wireless: "wi-fi",
  roteador: "wi-fi",
  modem: "wi-fi",
  virus: "virus",
  malware: "virus",
  trojan: "virus",
  ransomware: "virus",
  hackeado: "virus",
  esquentando: "esquenta",
  aquecendo: "esquenta",
  fervendo: "esquenta",
  superaquecendo: "esquenta",
  cooler: "ventoinha",
  fan: "ventoinha",
  formatar: "formatacao",
  reinstalar: "formatacao",
  ssd: "ssd",
  hd: "hd",
  memoria: "memoria",
  ram: "memoria",
  arquivo: "arquivos",
  foto: "arquivos",
  fotos: "arquivos",
  documento: "arquivos",
  documentos: "arquivos",
  apaguei: "apagado",
  deletei: "apagado",
  sumiu: "apagado",
  impressora: "impressora",
  imprimir: "impressora",
  monitor: "monitor",
  tv: "tv",
  televisao: "tv",
  celular: "celular",
  smartphone: "celular",
  empresa: "empresa",
  escritorio: "empresa",
  cnpj: "empresa",
  servidor: "empresa",
};

/** Índice de intenções — cada uma aponta para uma rota existente. */
export const INTENCOES: IntencaoBusca[] = [
  {
    id: "computador-lento",
    label: "Meu computador está muito lento",
    href: "/problemas/computador-lento",
    termos: [
      "lento",
      "lentidao",
      "travando",
      "demora para ligar",
      "demora",
      "engasga",
      "computador lento",
      "notebook lento",
      "windows lento",
      "abrir programas demora",
    ],
    peso: 10,
  },
  {
    id: "notebook-nao-liga",
    label: "Notebook não liga",
    href: "/problemas/notebook-nao-liga",
    termos: ["nao liga", "nao acende", "sem reacao", "morto", "nao inicia", "nao da imagem"],
    peso: 9,
  },
  {
    id: "superaquecimento",
    label: "Esquenta e desliga sozinho",
    href: "/servicos/manutencao-de-notebook",
    termos: ["esquenta", "quente", "superaquecimento", "desliga sozinho", "ventoinha", "barulho de ventoinha"],
    peso: 8,
  },
  {
    id: "tela-azul",
    label: "Tela azul e erros do Windows",
    href: "/problemas/tela-azul",
    termos: ["tela azul", "erro do windows", "reinicia sozinho", "erro critico", "bsod"],
    peso: 8,
  },
  {
    id: "wifi",
    label: "O Wi-Fi está ruim",
    href: "/problemas/wifi-instavel",
    termos: ["wi-fi", "internet cai", "sinal fraco", "rede instavel", "sem internet", "internet ruim"],
    peso: 7,
  },
  {
    id: "dados",
    label: "Preciso recuperar arquivos",
    href: "/problemas/arquivos-apagados",
    termos: ["arquivos", "apagado", "perdi", "recuperar dados", "backup", "hd nao aparece"],
    peso: 7,
  },
  {
    id: "virus",
    label: "Acho que peguei vírus",
    href: "/servicos/remocao-de-virus",
    termos: ["virus", "propaganda", "anuncio", "sequestro de arquivos", "navegador estranho"],
    peso: 6,
  },
  {
    id: "empresa",
    label: "Minha empresa está sem sistema",
    href: "/servicos/suporte-tecnico-empresarial",
    termos: ["empresa", "sistema fora", "estacao parada", "rede da empresa", "urgente empresa"],
    peso: 6,
  },
  {
    id: "upgrade",
    label: "Quero mais desempenho (SSD ou memória)",
    href: "/servicos/upgrade-ssd-ram",
    termos: ["ssd", "memoria", "upgrade", "desempenho", "deixar mais rapido"],
    peso: 5,
  },
  {
    id: "formatacao",
    label: "Preciso formatar e reinstalar o Windows",
    href: "/servicos/formatacao",
    // Cauda longa real do cluster piloto (Rodada 8F): quem digita
    // "quanto custa" tem intenção comercial, quem digita "sem perder
    // arquivos" ainda está se informando. Ambos entram por aqui e são
    // desambiguados pelo mapa de cauda longa.
    termos: [
      "formatacao",
      "formatar",
      "formatar pc",
      "formatar notebook",
      "formatar computador",
      "quanto custa formatar",
      "preco formatacao",
      "valor para formatar",
      "formatar sem perder arquivos",
      "formatar sem perder nada",
      "instalar windows",
      "reinstalar sistema",
      "reinstalar windows",
      "windows corrompido",
    ],
    peso: 5,
  },

  {
    id: "impressora",
    label: "Problema com impressora",
    href: "/conserto-impressora-curitiba",
    termos: ["impressora", "nao imprime", "impressora sumiu da rede"],
    peso: 4,
  },
  {
    id: "monitor",
    label: "Problema no monitor",
    href: "/servicos/conserto-monitor",
    termos: ["monitor", "tela do monitor", "monitor sem imagem", "manchas na tela"],
    peso: 4,
  },
  {
    id: "tv",
    label: "Conserto de TV",
    href: "/servicos/conserto-tv",
    termos: ["tv", "televisao sem imagem", "tv nao liga"],
    peso: 3,
  },
  {
    id: "celular",
    label: "Conserto de celular",
    href: "/servicos/conserto-celular",
    termos: ["celular", "tela do celular", "celular nao carrega"],
    peso: 3,
  },
  {
    id: "indefinido",
    label: "Não sei qual é o problema",
    href: "/diagnostico-tecnico",
    termos: ["nao sei", "duvida", "estranho", "diagnostico", "avaliar"],
    peso: 1,
  },
];

/** Rota usada quando nada casa com confiança mínima. */
export const ROTA_FALLBACK = "/diagnostico-tecnico";

export const normalizar = (v: string): string =>
  v
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Aplica o dicionário de sinônimos token a token e em expressões. */
export function expandirConsulta(consulta: string): string {
  let texto = ` ${normalizar(consulta)} `;
  for (const [de, para] of Object.entries(SINONIMOS)) {
    if (de.includes(" ")) texto = texto.split(` ${de} `).join(` ${para} `);
  }
  const tokens = texto
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((t) => SINONIMOS[t] ?? t);
  return tokens.join(" ");
}

/** Distância de Levenshtein limitada (para tolerar erro de digitação). */
export function distancia(a: string, b: string): number {
  if (a === b) return 0;
  const m = a.length;
  const n = b.length;
  if (Math.abs(m - n) > 2) return 3;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i += 1) {
    const cur = [i];
    for (let j = 1; j <= n; j += 1) {
      cur[j] = Math.min(
        prev[j] + 1,
        cur[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    prev = cur;
  }
  return prev[n];
}

const tolerancia = (palavra: string) => (palavra.length >= 7 ? 2 : palavra.length >= 5 ? 1 : 0);

const STOPWORDS = new Set([
  "meu",
  "minha",
  "o",
  "a",
  "de",
  "do",
  "da",
  "que",
  "esta",
  "ta",
  "muito",
  "e",
  "em",
  "no",
  "na",
  "com",
  "um",
  "uma",
  "pra",
  "para",
  "nao",
]);

export type ResultadoBusca = { intencao: IntencaoBusca; score: number };

/** Pontua todas as intenções para a consulta digitada. */
export function pontuar(consulta: string): ResultadoBusca[] {
  const q = expandirConsulta(consulta);
  if (!q) return [];
  const tokens = q.split(" ").filter((t) => t.length > 1 && !STOPWORDS.has(t));

  const resultados = INTENCOES.map((intencao) => {
    let score = 0;
    const alvos = [normalizar(intencao.label), ...intencao.termos.map(normalizar)];

    for (const alvo of alvos) {
      // Frase inteira presente na consulta (sinal mais forte).
      if (alvo.includes(" ") && q.includes(alvo)) score += 12;

      const alvoTokens = alvo.split(" ").filter((t) => !STOPWORDS.has(t));
      for (const at of alvoTokens) {
        for (const t of tokens) {
          if (t === at) score += 6;
          else if (t.length >= 4 && (at.startsWith(t) || t.startsWith(at))) score += 3;
          else if (tolerancia(t) > 0 && distancia(t, at) <= tolerancia(t)) score += 4;
        }
      }
    }

    if (score > 0) score += intencao.peso / 10;
    return { intencao, score };
  });

  return resultados.filter((r) => r.score > 0).sort((a, b) => b.score - a.score);
}

/** Sugestões exibidas enquanto o visitante digita. */
export function sugerir(consulta: string, limite = 6): IntencaoBusca[] {
  if (!normalizar(consulta)) {
    return [...INTENCOES].sort((a, b) => b.peso - a.peso).slice(0, limite);
  }
  const hits = pontuar(consulta).map((r) => r.intencao);
  return (hits.length ? hits : [...INTENCOES].sort((a, b) => b.peso - a.peso)).slice(0, limite);
}

export type Resolucao = {
  href: string;
  intencaoId: string | null;
  confianca: "alta" | "media" | "nenhuma";
};

/**
 * Resolve o destino final do botão "Diagnosticar meu problema".
 * Sem confiança mínima, cai na triagem geral — nunca em rota inexistente.
 */
export function resolverBusca(consulta: string): Resolucao {
  const [melhor] = pontuar(consulta);
  if (!melhor || melhor.score < 4) {
    return { href: ROTA_FALLBACK, intencaoId: null, confianca: "nenhuma" };
  }
  return {
    href: melhor.intencao.href,
    intencaoId: melhor.intencao.id,
    confianca: melhor.score >= 10 ? "alta" : "media",
  };
}

/* ─────────────────────────────────────────────────────────────────────────
 * RESOLUÇÃO DE AMBIGUIDADE (Rodada 8B)
 *
 * Alguns sintomas descrevem o MESMO efeito com causas distintas ("tela
 * preta" pode ser fonte, vídeo, tela ou sistema). Nesses casos, rotear
 * direto é chute: a interface pergunta antes, com opções em linguagem de
 * cliente, e só então leva ao cluster certo.
 *
 * Duas origens de ambiguidade:
 *   1. termo explicitamente ambíguo (mapa abaixo);
 *   2. empate técnico entre as duas melhores intenções (score próximo).
 * ──────────────────────────────────────────────────────────────────────── */

export type OpcaoClarificacao = { label: string; href: string; intencaoId: string };
export type ResolucaoAmbigua =
  | { tipo: "destino"; href: string; intencaoId: string | null; confianca: Resolucao["confianca"] }
  | { tipo: "ambiguo"; pergunta: string; opcoes: OpcaoClarificacao[] };

type RegraAmbigua = { termos: string[]; pergunta: string; opcoes: OpcaoClarificacao[] };

const AMBIGUIDADES: RegraAmbigua[] = [
  {
    termos: ["tela preta", "sem imagem", "nao da imagem", "monitor apagado", "tela escura"],
    pergunta: "Quando a tela fica preta, o equipamento dá algum sinal de vida?",
    opcoes: [
      { label: "Não acende nada: sem luz, sem ventoinha", href: "/problemas/notebook-nao-liga", intencaoId: "notebook-nao-liga" },
      { label: "Liga e faz barulho, mas a tela não mostra imagem", href: "/problemas/computador-nao-da-imagem", intencaoId: "computador-nao-da-imagem" },
      { label: "Mostra imagem e depois apaga ou reinicia", href: "/problemas/computador-desliga-sozinho", intencaoId: "computador-desliga-sozinho" },
    ],
  },
  {
    termos: ["nao liga", "morreu", "nao funciona", "parou de funcionar"],
    pergunta: "O que exatamente acontece ao apertar o botão de ligar?",
    opcoes: [
      { label: "Nada acontece, nem luz nem som", href: "/problemas/notebook-nao-liga", intencaoId: "notebook-nao-liga" },
      { label: "Só funciona na tomada / não segura carga", href: "/problemas/notebook-nao-carrega", intencaoId: "notebook-nao-carrega" },
      { label: "Liga, mas o Windows não abre", href: "/problemas/windows-nao-inicia", intencaoId: "windows-nao-inicia" },
    ],
  },
  {
    termos: ["barulho", "ruido", "zumbido", "estalo"],
    pergunta: "De onde vem o barulho?",
    opcoes: [
      { label: "Barulho de clique ou raspagem vindo do disco", href: "/problemas/hd-fazendo-barulho", intencaoId: "hd-fazendo-barulho" },
      { label: "Ventoinha acelerada, com o aparelho quente", href: "/problemas/computador-esquentando", intencaoId: "computador-esquentando" },
    ],
  },
  {
    termos: ["travando", "trava", "congela", "para do nada"],
    pergunta: "Como o travamento acontece?",
    opcoes: [
      { label: "Fica lento e engasga o tempo todo", href: "/problemas/computador-lento", intencaoId: "computador-lento" },
      { label: "Congela e aparece tela azul com código de erro", href: "/problemas/tela-azul", intencaoId: "tela-azul" },
      { label: "Desliga sozinho sem aviso", href: "/problemas/computador-desliga-sozinho", intencaoId: "computador-desliga-sozinho" },
    ],
  },
  {
    termos: ["internet ruim", "internet caindo", "sinal fraco", "sem internet"],
    pergunta: "A instabilidade acontece em qual situação?",
    opcoes: [
      { label: "Cai ou oscila no Wi-Fi, em partes da casa", href: "/problemas/wifi-instavel", intencaoId: "wifi-instavel" },
      { label: "Só neste computador, mesmo perto do roteador", href: "/problemas/computador-lento", intencaoId: "computador-lento" },
    ],
  },
];

/** Só oferecemos opções cujo destino existe no índice de intenções. */
function opcoesValidas(opcoes: OpcaoClarificacao[]): OpcaoClarificacao[] {
  const rotas = new Set(INTENCOES.map((i) => i.href));
  return opcoes.filter((o) => rotas.has(o.href));
}

/**
 * Resolve a consulta podendo devolver uma pergunta de clarificação.
 * Fail-safe: sem opções válidas, cai no comportamento determinístico
 * de `resolverBusca` (nunca uma rota inventada).
 */
export function resolverComAmbiguidade(consulta: string): ResolucaoAmbigua {
  const q = expandirConsulta(consulta);
  if (q) {
    for (const regra of AMBIGUIDADES) {
      if (!regra.termos.some((t) => q.includes(normalizar(t)))) continue;
      const opcoes = opcoesValidas(regra.opcoes);
      if (opcoes.length >= 2) return { tipo: "ambiguo", pergunta: regra.pergunta, opcoes };
    }
  }

  const resultados = pontuar(consulta);
  const [primeiro, segundo] = resultados;
  // Empate técnico: dois clusters plausíveis e nenhum claramente melhor.
  if (primeiro && segundo && primeiro.score >= 4 && segundo.score / primeiro.score >= 0.8) {
    const opcoes = opcoesValidas(
      resultados.slice(0, 3).map((r) => ({
        label: r.intencao.label,
        href: r.intencao.href,
        intencaoId: r.intencao.id,
      })),
    );
    if (opcoes.length >= 2) {
      return {
        tipo: "ambiguo",
        pergunta: "Encontrei mais de um caminho possível. Qual descreve melhor o seu caso?",
        opcoes,
      };
    }
  }

  const r = resolverBusca(consulta);
  return { tipo: "destino", href: r.href, intencaoId: r.intencaoId, confianca: r.confianca };
}
