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

export const BASE_URL = "https://tecnico.curitiba.br";

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

/** Classificação usada nos relatórios (filtro por pilar × artigo). */
export function groupOf(path) {
  if (P0_PATHS.includes(path)) return "p0";
  if (path === PRECOS_PATH) return "precos";
  if (EDITORIAL_PATHS.includes(path)) return "artigo";
  return "pilar";
}

/** Conjunto completo, sem duplicatas, em ordem estável. */
export const PRIORITY_PATHS = [
  ...new Set([...P0_PATHS, PRECOS_PATH, ...PILAR_PATHS, ...EDITORIAL_PATHS]),
];

export const priorityUrls = () =>
  PRIORITY_PATHS.map((path) => ({
    path,
    url: path === "/" ? `${BASE_URL}/` : `${BASE_URL}${path}`,
    group: groupOf(path),
  }));
