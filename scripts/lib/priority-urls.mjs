/**
 * FONTE ÚNICA — URLs PRIORITÁRIAS DE MONITORAMENTO
 *
 * Reúne, sem duplicar listas espalhadas:
 *   - P0 comerciais (mesmo conjunto do gate check-jsonld-p0)
 *   - página de preços/políticas
 *   - pilares locais e de serviço já curados
 *   - os artigos liberados na primeira onda editorial
 *
 * Usada pelo monitoramento de indexação (GSC), pelo relatório semanal,
 * pelo guard de sitemap/noindex e pelo relatório pós-deploy.
 */
import { EDITORIAL_WAVE_SLUGS } from "./editorial-wave.mjs";

import { BASE_URL } from "./site-env.mjs";
export { BASE_URL };

/** Páginas comerciais P0 (dinheiro). */
export const P0_PATHS = [
  "/",
  "/tecnico-informatica-curitiba",
  "/atendimento-domicilio",
  "/empresa-de-ti-curitiba",
];

/** Página de preços/políticas — sempre auditada junto com as P0. */
export const PRECOS_PATH = "/precos-e-politicas";

/** Pilares de apoio (hubs comerciais já presentes no manifesto curado). */
export const PILAR_PATHS = ["/servicos", "/atendimento-remoto", "/faq"];

/** Artigos indexáveis da primeira onda editorial. */
export const EDITORIAL_PATHS = EDITORIAL_WAVE_SLUGS.map((slug) => `/blog/${slug}`);

/**
 * Páginas aprofundadas na segunda onda editorial (Rodada 3C) + o microgate 3C.1.
 * Monitoradas em bloco: indexação, desempenho no GSC e Core Web Vitals.
 */
export const WAVE_3C_PATHS = [
  "/servicos/upgrade-ssd-ram",
  "/servicos/recuperacao-de-dados",
  "/precos-e-politicas",
  "/sobre",
  "/problemas/computador-lento",
];

/** Classificação usada nos relatórios (filtro por pilar × artigo). */
export function groupOf(path) {
  if (P0_PATHS.includes(path)) return "p0";
  if (path === PRECOS_PATH) return "precos";
  if (EDITORIAL_PATHS.includes(path)) return "artigo";
  if (WAVE_3C_PATHS.includes(path)) return "onda3c";
  return "pilar";
}

/** Conjunto completo, sem duplicatas, em ordem estável. */
export const PRIORITY_PATHS = [
  ...new Set([...P0_PATHS, PRECOS_PATH, ...PILAR_PATHS, ...EDITORIAL_PATHS, ...WAVE_3C_PATHS]),
];

export const wave3cUrls = () =>
  WAVE_3C_PATHS.map((path) => ({ path, url: `${BASE_URL}${path}`, group: groupOf(path) }));

export const priorityUrls = () =>
  PRIORITY_PATHS.map((path) => ({
    path,
    url: path === "/" ? `${BASE_URL}/` : `${BASE_URL}${path}`,
    group: groupOf(path),
  }));
