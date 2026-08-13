/**
 * RODADA 4C — DECISÃO INDIVIDUAL DAS 21 PÁGINAS MARCADAS COMO "reavaliar".
 *
 * O inventário da Rodada 4 (reports/problem-intent-map.json) deixou 21 URLs em
 * estado indefinido: todas com sufixo local `-curitiba`, todas fora do sitemap,
 * todas competindo dentro de um cluster já coberto por uma página canônica.
 *
 * "reavaliar" não é um estado publicável. Cada URL recebe aqui UMA decisão:
 *
 *  • CANONICALIZAR — o cluster já tem página canônica equivalente. A URL
 *    herdada permanece existindo (Fase 40: nenhuma URL some), continua
 *    `noindex, follow` e passa a declarar canonical para o alvo. Consolida
 *    sinal em vez de disputar SERP consigo mesma.
 *
 *  • REPOSICIONAR — o cluster ainda NÃO tem página canônica limpa. Não se
 *    inventa canonical para página inexistente: a URL fica `noindex`, canonical
 *    self, e entra no Lote 2 com a criação do sintoma canônico indicada em
 *    `criarCanonico`.
 *
 * Regra invariante: nenhuma destas URLs volta a ser indexável enquanto tiver o
 * sufixo local (src/lib/problemIntentPolicy.ts).
 */

export type Decisao4c =
  | {
      url: string;
      decisao: "CANONICALIZAR";
      /** Página canônica que recebe o sinal. Precisa existir e ser indexável. */
      canonical: string;
      motivo: string;
    }
  | {
      url: string;
      decisao: "REPOSICIONAR";
      /** Sintoma canônico a ser criado no Lote 2. */
      criarCanonico: string;
      motivo: string;
    };

export const DECISOES_4C: Decisao4c[] = [
  // ── Cluster: sem imagem / tela preta ───────────────────────────────────────
  {
    url: "/problemas/computador-sem-video-curitiba",
    decisao: "CANONICALIZAR",
    canonical: "/problemas/computador-nao-da-imagem",
    motivo: "mesmo sintoma (sem sinal de vídeo) já coberto pelo canônico do cluster",
  },
  {
    url: "/problemas/computador-com-tela-preta-curitiba",
    decisao: "CANONICALIZAR",
    canonical: "/problemas/computador-nao-da-imagem",
    motivo: "variação lexical de tela preta; overlap 0.7+ com o canônico",
  },
  {
    url: "/problemas/pc-com-tela-preta-curitiba",
    decisao: "CANONICALIZAR",
    canonical: "/problemas/computador-nao-da-imagem",
    motivo: "'pc' e 'computador' são o mesmo equipamento para a busca",
  },
  {
    url: "/problemas/notebook-sem-imagem-curitiba",
    decisao: "CANONICALIZAR",
    canonical: "/problemas/computador-nao-da-imagem",
    motivo: "diagnóstico idêntico; o canônico cobre notebook e desktop",
  },
  {
    url: "/problemas/monitor-sem-sinal-curitiba",
    decisao: "CANONICALIZAR",
    canonical: "/servicos/conserto-monitor",
    motivo: "intenção real é de serviço no monitor, não diagnóstico do computador",
  },
  {
    url: "/problemas/tv-sem-imagem-curitiba",
    decisao: "CANONICALIZAR",
    canonical: "/servicos/conserto-tv",
    motivo: "equipamento fora do cluster de informática; pertence à vertical de TV",
  },
  {
    url: "/problemas/tv-som-sem-video-curitiba",
    decisao: "CANONICALIZAR",
    canonical: "/servicos/conserto-tv",
    motivo: "mesma vertical de TV; sintoma tratado dentro da página de serviço",
  },

  // ── Cluster: superaquecimento ──────────────────────────────────────────────
  {
    url: "/problemas/notebook-esquentando-curitiba",
    decisao: "CANONICALIZAR",
    canonical: "/problemas/computador-esquentando",
    motivo: "canônico do cluster de superaquecimento já autoral e indexado",
  },
  {
    url: "/problemas/notebook-esquentando-muito-curitiba",
    decisao: "CANONICALIZAR",
    canonical: "/problemas/computador-esquentando",
    motivo: "apenas intensificador no slug; overlap 0.88 com o canônico",
  },
  {
    url: "/problemas/notebook-superaquecendo-curitiba",
    decisao: "CANONICALIZAR",
    canonical: "/problemas/computador-esquentando",
    motivo: "sinônimo direto de esquentando; não há intenção distinta",
  },

  // ── Cluster: desliga sozinho ───────────────────────────────────────────────
  {
    url: "/problemas/notebook-esquentando-desligando-curitiba",
    decisao: "CANONICALIZAR",
    canonical: "/problemas/computador-desliga-sozinho",
    motivo: "o desligamento é o sintoma dominante da busca; calor é a causa tratada lá",
  },
  {
    url: "/problemas/notebook-desligando-sozinho-curitiba",
    decisao: "CANONICALIZAR",
    canonical: "/problemas/computador-desliga-sozinho",
    motivo: "mesmo sintoma, equipamento coberto pelo canônico",
  },
  {
    url: "/problemas/pc-desligando-sozinho-curitiba",
    decisao: "CANONICALIZAR",
    canonical: "/problemas/computador-desliga-sozinho",
    motivo: "duplicata lexical do canônico",
  },
  {
    url: "/problemas/computador-liga-e-desliga-curitiba",
    decisao: "CANONICALIZAR",
    canonical: "/problemas/computador-desliga-sozinho",
    motivo: "ciclo liga/desliga é o mesmo diagnóstico de desligamento espontâneo",
  },

  // ── Cluster: não liga ──────────────────────────────────────────────────────
  {
    url: "/problemas/notebook-nao-liga-curitiba",
    decisao: "CANONICALIZAR",
    canonical: "/problemas/notebook-nao-liga",
    motivo: "gêmeo limpo existe e é indexável; sufixo local só duplicava a URL",
  },
  {
    url: "/problemas/computador-nao-liga-curitiba",
    decisao: "REPOSICIONAR",
    criarCanonico: "/problemas/computador-nao-liga",
    motivo:
      "desktop tem diagnóstico próprio (fonte, placa, botão) e não deve herdar o canônico de notebook",
  },

  // ── Cluster: periféricos e rede ────────────────────────────────────────────
  {
    url: "/problemas/teclado-mouse-nao-funciona-curitiba",
    decisao: "CANONICALIZAR",
    canonical: "/problemas/teclado-notebook-nao-funciona",
    motivo: "canônico já cobre teclado e apontador do notebook",
  },
  {
    url: "/problemas/notebook-sem-wifi-curitiba",
    decisao: "CANONICALIZAR",
    canonical: "/problemas/wifi-instavel",
    motivo: "cluster de rede consolidado no canônico de Wi-Fi",
  },
  {
    url: "/problemas/computador-nao-conecta-bluetooth-curitiba",
    decisao: "REPOSICIONAR",
    criarCanonico: "/problemas/bluetooth-nao-conecta",
    motivo: "cluster Bluetooth sem canônico limpo; as três variações convergem no Lote 2",
  },
  {
    url: "/problemas/notebook-nao-conecta-bluetooth-curitiba",
    decisao: "REPOSICIONAR",
    criarCanonico: "/problemas/bluetooth-nao-conecta",
    motivo: "mesma consolidação de Bluetooth prevista para o Lote 2",
  },
  {
    url: "/problemas/pc-nao-conecta-bluetooth-curitiba",
    decisao: "REPOSICIONAR",
    criarCanonico: "/problemas/bluetooth-nao-conecta",
    motivo: "mesma consolidação de Bluetooth prevista para o Lote 2",
  },
];

const PORT_URL = new Map(DECISOES_4C.map((d) => [d.url, d]));

export const decisao4cDe = (url: string) => PORT_URL.get(url.replace(/\/$/, ""));

/**
 * Canonical efetivo de uma página de problema.
 * Sem decisão registrada, a página é canônica de si mesma.
 */
export function canonicalDecidido(url: string): string {
  const d = decisao4cDe(url);
  return d && d.decisao === "CANONICALIZAR" ? d.canonical : url;
}

/** Alvos de canonical que o gate exige que existam e sejam indexáveis. */
export const alvosCanonical4c = () =>
  [...new Set(DECISOES_4C.filter((d) => d.decisao === "CANONICALIZAR").map((d) => d.canonical))];

/** Sintomas canônicos que o Lote 2 precisa criar. */
export const canonicosPendentes4c = () =>
  [...new Set(DECISOES_4C.filter((d) => d.decisao === "REPOSICIONAR").map((d) => d.criarCanonico))];
