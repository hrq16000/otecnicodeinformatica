/**
 * ============================================================================
 * FONTE ÚNICA DE VERDADE — URLs INDEXÁVEIS CURADAS
 * ============================================================================
 * Todo URL indexável do projeto é declarado aqui, agrupado por sub-sitemap.
 * `scripts/generate-sitemaps.mjs` emite o XML a partir deste manifesto e os
 * gates (`check:editorial-governance`, `check:sitemap-source`) comparam o
 * conjunto emitido com o conjunto declarado.
 *
 * Regra: o número de URLs NUNCA é a fonte da verdade — a lista é.
 * Incluir uma URL aqui significa afirmar que ela é curada, indexável,
 * canônica (não alias, não redirect) e aprovada pela hierarquia local.
 */

import { EDITORIAL_WAVE_SLUGS } from "./editorial-wave.mjs";

// RODADA 1: domínio vem de env (scripts/lib/site-env.mjs). Sem env = vazio,
// e o gerador de sitemap se recusa a publicar URLs.
import { BASE_URL } from "./site-env.mjs";
import { BLOCOS_4S_PATHS } from "./blocos-4s.mjs";
// RODADA 5: cidades, bairros e serviço × bairro deixam de ter lista própria
// aqui — a fonte única é src/lib/localIndexPolicy.json.
import { ENTIDADES, BAIRROS_ANCORA, SERVICO_BAIRRO_INDEXAVEIS } from "./local-index-policy.mjs";
export { BASE_URL };

export const MAIN = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/servicos", changefreq: "weekly", priority: "0.9" },
  { path: "/como-funciona", changefreq: "monthly", priority: "0.8" },
  { path: "/precos-e-politicas", changefreq: "monthly", priority: "0.8" },
  { path: "/sobre", changefreq: "monthly", priority: "0.6" },
  { path: "/contato", changefreq: "monthly", priority: "0.7" },
  { path: "/faq", changefreq: "monthly", priority: "0.7" },
  { path: "/anuncie", changefreq: "monthly", priority: "0.5" },
  { path: "/atendimento-domicilio", changefreq: "monthly", priority: "0.7" },
  { path: "/atendimento-remoto", changefreq: "monthly", priority: "0.7" },
  { path: "/equipamentos-atendidos", changefreq: "monthly", priority: "0.6" },
  { path: "/areas-atendidas", changefreq: "monthly", priority: "0.7" },
  { path: "/diagnostico-tecnico", changefreq: "monthly", priority: "0.6" },
  { path: "/coleta-e-entrega", changefreq: "monthly", priority: "0.6" },
  { path: "/quando-nao-compensa", changefreq: "monthly", priority: "0.5" },
  { path: "/seguranca-dos-dados", changefreq: "monthly", priority: "0.6" },
  { path: "/politica-de-pecas-do-cliente", changefreq: "monthly", priority: "0.6" },
];

/** Hubs de SEO temáticos (entram no sitemap-main). */
export const HUBS = [
  { path: "/empresa-de-ti-curitiba", changefreq: "weekly", priority: "0.8" },
  // Pillar informacional do cluster de informática (apoio das páginas comerciais).
  { path: "/guia-tecnico-informatica", changefreq: "monthly", priority: "0.7" },
];

/** Serviços essenciais — slugs canônicos (nunca variações com redirect). */
export const SERVICOS = [
  "/servicos/formatacao",
  "/servicos/manutencao-de-notebook",
  "/servicos/manutencao-de-computador",
  "/servicos/upgrade-ssd-ram",
  "/servicos/remocao-de-virus",
  "/servicos/recuperacao-de-dados",
  "/servicos/redes-e-wifi",
  "/servicos/suporte-tecnico-empresarial",
  "/servicos/manutencao-preventiva-empresas",
  "/servicos/backup-para-empresas",
  "/servicos/suporte-home-office",
  "/servicos/montagem-de-pc",
  "/servicos/pc-gamer",
  "/servicos/conserto-tv",
  "/servicos/conserto-placa",
  "/servicos/conserto-monitor",
].map((path) => ({ path, changefreq: "weekly", priority: "0.85" }));

/** Hubs de cidade reais — derivados da política local (Rodada 5). */
export const REGIOES = ENTIDADES.filter(
  (e) => e.family === "CIDADE" && e.indexability === "index",
).map((e) => ({ path: e.path, changefreq: "monthly", priority: "0.7" }));

/** Bairros âncora indexáveis — derivados da política local (Rodada 5). */
export const BAIRROS = BAIRROS_ANCORA.map((slug) => ({
  path: `/bairros/${slug}`,
  changefreq: "monthly",
  priority: "0.65",
}));

/**
 * Landings serviço × bairro-âncora (src/lib/servicoBairroFactory.ts).
 * Auditadas na Rodada 4G: rota estática própria, canonical self, robots index,
 * H1 e narrativa exclusivos por bairro, CTA do funil e links para o serviço-mãe
 * e para o hub de Curitiba. Devem permanecer em sincronia com
 * `GENERATED_INDEXABLE_PATHS`.
 */
// RODADA 2A — QUARENTENA: a auditoria de herança editorial mediu 81%–83% de
// sobreposição de conteúdo entre as 11 combinações serviço × bairro. Elas saem
// temporariamente do sitemap e passam a renderizar `noindex, follow`
// (src/lib/servicoBairroFactory.ts → QUARENTENA_DUPLICADAS). Reentram uma a uma,
// somente com conteúdo próprio por bairro.
// RODADA 4S — reabilitação: reentram apenas as combinações com blocos
// autorais próprios declarados em src/lib/servicoBairroBlocos4s.json
// (fonte única, espelhada em scripts/lib/blocos-4s.mjs).
export const SERVICO_BAIRRO = SERVICO_BAIRRO_INDEXAVEIS.map((path) => ({
  path,
  changefreq: "monthly",
  priority: "0.6",
}));

/**
 * Cluster de problemas (sintomas). Piloto controlado da Rodada 3B: só entram
 * URLs com conteúdo próprio de sintoma, distinto da página de serviço-mãe.
 */
export const PROBLEMAS = [
  { path: "/problemas/notebook-nao-liga", changefreq: "monthly", priority: "0.6" },
  { path: "/problemas/computador-lento", changefreq: "monthly", priority: "0.6" },
  { path: "/problemas", changefreq: "monthly", priority: "0.7" },
  { path: "/problemas/wifi-instavel", changefreq: "monthly", priority: "0.6" },
  { path: "/problemas/tela-azul", changefreq: "monthly", priority: "0.6" },
  { path: "/problemas/arquivos-apagados", changefreq: "monthly", priority: "0.6" },
  { path: "/problemas/computador-desliga-sozinho", changefreq: "monthly", priority: "0.6" },
  { path: "/problemas/notebook-nao-carrega", changefreq: "monthly", priority: "0.6" },
  { path: "/problemas/hd-fazendo-barulho", changefreq: "monthly", priority: "0.6" },
  { path: "/problemas/computador-nao-da-imagem", changefreq: "monthly", priority: "0.6" },
  { path: "/problemas/cheiro-de-queimado", changefreq: "monthly", priority: "0.6" },
  { path: "/problemas/notebook-molhado", changefreq: "monthly", priority: "0.6" },
  { path: "/problemas/windows-nao-inicia", changefreq: "monthly", priority: "0.6" },
  { path: "/problemas/computador-esquentando", changefreq: "monthly", priority: "0.6" },
  { path: "/problemas/impressora-nao-imprime", changefreq: "monthly", priority: "0.6" },
  { path: "/problemas/teclado-notebook-nao-funciona", changefreq: "monthly", priority: "0.6" },
];

/**
 * Cluster de equipamentos (entrada por aparelho). Mesma regra do cluster de
 * problemas: só entra URL com conteúdo técnico próprio.
 */
export const EQUIPAMENTOS = [
  { path: "/equipamentos", changefreq: "monthly", priority: "0.7" },
  { path: "/equipamentos/notebook", changefreq: "monthly", priority: "0.6" },
  { path: "/equipamentos/desktop", changefreq: "monthly", priority: "0.6" },
  { path: "/equipamentos/impressora", changefreq: "monthly", priority: "0.6" },
  { path: "/equipamentos/roteador", changefreq: "monthly", priority: "0.6" },
];

/**
 * Cluster de soluções (entrada pelo procedimento técnico). Mesma regra dos
 * demais clusters: só entra URL com conteúdo próprio de execução.
 */
export const SOLUCOES = [
  { path: "/solucoes", changefreq: "monthly", priority: "0.7" },
  { path: "/solucoes/diagnostico", changefreq: "monthly", priority: "0.6" },
  { path: "/solucoes/formatacao", changefreq: "monthly", priority: "0.6" },
  { path: "/solucoes/ssd", changefreq: "monthly", priority: "0.6" },
  { path: "/solucoes/backup", changefreq: "monthly", priority: "0.6" },
  { path: "/solucoes/recuperacao-de-dados", changefreq: "monthly", priority: "0.6" },
];

/**
 * Onda editorial indexável (Rodada 4H). O hub /blog só é declarado aqui
 * porque passou a listar artigos aprovados de verdade. Cada artigo vem de
 * `scripts/lib/editorial-wave.mjs` — espelho de APPROVED_EDITORIAL_CONTENT.
 */
export const EDITORIAL = [
  { path: "/blog", changefreq: "weekly", priority: "0.6" },
  ...EDITORIAL_WAVE_SLUGS.map((slug) => ({
    path: `/blog/${slug}`,
    changefreq: "monthly",
    priority: "0.55",
  })),
];


/** Sub-sitemaps ativos, na ordem em que aparecem no índice. */
export const ACTIVE_SITEMAPS = [
  ["sitemap-main.xml", [...MAIN, ...HUBS]],
  ["sitemap-servicos.xml", [...SERVICOS, ...SERVICO_BAIRRO]],
  ["sitemap-regioes.xml", REGIOES],
  ["sitemap-bairros.xml", BAIRROS],
  ["sitemap-problemas.xml", PROBLEMAS],
  ["sitemap-equipamentos.xml", EQUIPAMENTOS],
  ["sitemap-solucoes.xml", SOLUCOES],
  ["sitemap-editorial.xml", EDITORIAL],
];

/** Sub-sitemaps herdados, mantidos vazios de propósito. */
export const EMPTY_SITEMAPS = ["sitemap-marcas.xml", "sitemap-news.xml"];


/** Conjunto plano de todas as URLs indexáveis declaradas. */
export const CURATED_PATHS = ACTIVE_SITEMAPS.flatMap(([, entries]) => entries.map((e) => e.path));
