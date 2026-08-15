// ─────────────────────────────────────────────────────────────
// RODADA 5C/5D — SERVIÇO × CIDADE (conteúdo local autoral)
//
// Fontes únicas:
//   • src/lib/servicoCuritibaBlocos.json  (Curitiba — Rodada 5C)
//   • src/lib/servicoSjpBlocos.json       (São José dos Pinhais — Rodada 5D)
//
// Ambas são lidas também pelo prerender estático
// (scripts/lib/servico-curitiba.mjs), sem drift entre HTML e app React.
//
// Regra fail-closed: sem blocos/FAQ/intenção local declarados aqui, a rota
// /servicos/:servico/:cidade continua renderizando o template herdado e
// permanece canonicalizada para o serviço-pai (localIndexPolicy.json).
// ─────────────────────────────────────────────────────────────
import data from "./servicoCuritibaBlocos.json";
import dataSjp from "./servicoSjpBlocos.json";

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
  /** MICRO-RODADA LOCAL 1.2 — abertura autoral (primeira dobra) por intenção. */
  intro?: string[];
  blocos: BlocoLocal[];
  faq: FaqLocal[];
  interlinks: string[];
  /** Cidade da página (ausente = Curitiba, por herança da Rodada 5C). */
  cidadeSlug?: string;
  cidadeNome?: string;
}

const PAGINAS = (data as { paginas: Record<string, ServicoCuritibaPagina> }).paginas;
const PAGINAS_SJP = (dataSjp as { paginas: Record<string, ServicoCuritibaPagina> }).paginas;

/** Mapa cidade → (slug de serviço → conteúdo local). */
export const SERVICO_CIDADE_PAGINAS: Record<string, Record<string, ServicoCuritibaPagina>> = {
  curitiba: PAGINAS,
  "sao-jose-dos-pinhais": PAGINAS_SJP,
};

/** Slugs de serviço com conteúdo local próprio para Curitiba. */
export const SERVICO_CURITIBA_SLUGS = Object.keys(PAGINAS);

/** Paths declarados (`/servicos/:servico/curitiba`). */
export const SERVICO_CURITIBA_PATHS = Object.values(PAGINAS).map((p) => p.path);

/** Paths declarados para São José dos Pinhais (Rodada 5D). */
export const SERVICO_SJP_PATHS = Object.values(PAGINAS_SJP).map((p) => p.path);

/** Todas as páginas serviço × cidade com conteúdo local declarado. */
export const TODAS_PAGINAS_LOCAIS: ServicoCuritibaPagina[] = [
  ...Object.values(PAGINAS),
  ...Object.values(PAGINAS_SJP),
];

/** Conteúdo local do par serviço × cidade, ou null (fail-closed). */
export function servicoLocal(servicoSlug: string, cidadeSlug: string): ServicoCuritibaPagina | null {
  return SERVICO_CIDADE_PAGINAS[cidadeSlug]?.[servicoSlug] ?? null;
}

/** Compatibilidade com a Rodada 5C. */
export function servicoCuritiba(servicoSlug: string, cidadeSlug: string): ServicoCuritibaPagina | null {
  return servicoLocal(servicoSlug, cidadeSlug);
}

/** Conteúdo local a partir do path completo. */
export function servicoCuritibaPorPath(path: string): ServicoCuritibaPagina | null {
  return TODAS_PAGINAS_LOCAIS.find((p) => p.path === path) ?? null;
}
