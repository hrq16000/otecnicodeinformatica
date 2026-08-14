// ─────────────────────────────────────────────────────────────
// RODADA 5C — SERVIÇO × CURITIBA (conteúdo local autoral)
//
// Fonte única: src/lib/servicoCuritibaBlocos.json (lido também pelo
// prerender estático em scripts/lib/servico-curitiba.mjs, sem drift).
//
// Regra fail-closed: sem blocos/FAQ/intenção local declarados aqui, a rota
// /servicos/:servico/curitiba continua renderizando o template herdado e
// permanece canonicalizada para o serviço-pai (localIndexPolicy.json).
// ─────────────────────────────────────────────────────────────
import data from "./servicoCuritibaBlocos.json";

export interface BlocoLocal {
  titulo: string;
  paragrafos: string[];
}

export interface FaqLocal {
  pergunta: string;
  resposta: string;
}

export interface ServicoCuritibaPagina {
  path: string;
  parent: string;
  nome: string;
  intentGlobal: string;
  intentLocal: string;
  title: string;
  description: string;
  h1: string;
  subtitulo: string;
  blocos: BlocoLocal[];
  faq: FaqLocal[];
  interlinks: string[];
}

const PAGINAS = (data as { paginas: Record<string, ServicoCuritibaPagina> }).paginas;

/** Slugs de serviço com conteúdo local próprio para Curitiba. */
export const SERVICO_CURITIBA_SLUGS = Object.keys(PAGINAS);

/** Paths declarados (`/servicos/:servico/curitiba`). */
export const SERVICO_CURITIBA_PATHS = Object.values(PAGINAS).map((p) => p.path);

/** Conteúdo local do par serviço × Curitiba, ou null (fail-closed). */
export function servicoCuritiba(servicoSlug: string, cidadeSlug: string): ServicoCuritibaPagina | null {
  if (cidadeSlug !== "curitiba") return null;
  return PAGINAS[servicoSlug] ?? null;
}

/** Conteúdo local a partir do path completo. */
export function servicoCuritibaPorPath(path: string): ServicoCuritibaPagina | null {
  return Object.values(PAGINAS).find((p) => p.path === path) ?? null;
}
