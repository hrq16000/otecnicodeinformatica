/**
 * ============================================================================
 * RODADA 5 — POLÍTICA CENTRAL DE INDEXAÇÃO LOCAL (fonte única de verdade)
 * ============================================================================
 * A existência de uma rota NÃO implica indexação. Toda decisão local
 * (meta robots, canonical, sitemap, navegação, gates, relatórios e prerender)
 * é resolvida aqui, a partir de `localIndexPolicy.json`.
 *
 * Regra de ouro: `indexability !== "index"` ⇒ `sitemap === false`.
 */
import data from "./localIndexPolicy.json";
import { SITE_BASE_URL } from "./siteConfig";

/** Famílias locais governadas pela política. */
export type LocalFamily =
  | "HOME"
  | "CIDADE"
  | "BAIRRO"
  | "SERVICO_CIDADE"
  | "SERVICO_BAIRRO"
  | "OUTRA_LOCAL";

/** Estados possíveis de indexabilidade. Sem "reavaliar": decisão é objetiva. */
export type Indexability = "index" | "noindex" | "canonicalized" | "redirect" | "disabled";

/** Classificação de bairro (Fase 5). */
export type BairroTier = "ANCORA" | "SECUNDARIO" | "NOINDEX" | "DESATIVADO";

export interface LocalDecision {
  path: string;
  family: LocalFamily;
  indexability: Indexability;
  /** Caminho canônico (self quando indexável). */
  canonical: string;
  /** URL absoluta correspondente ao canonical. */
  canonicalUrl: string;
  sitemap: boolean;
  reason: string;
  parent?: string;
  intent?: string;
  tier?: BairroTier | string;
}

interface RawEntity {
  path: string;
  family: LocalFamily;
  indexability: Indexability;
  canonical?: string;
  sitemap: boolean;
  reason: string;
  parent?: string;
  intent?: string;
  tier?: string;
}

const ENTITIES = data.entities as RawEntity[];
const BAIRROS_ANCORA = data.bairrosAncora as { slug: string; intent: string }[];
const SERVICO_BAIRRO_INDEX = new Set<string>(data.servicoBairroIndexaveis as string[]);
const PREFIXOS = data.prefixosNaoIndexaveis as {
  prefix: string;
  indexability: Indexability;
  reason: string;
}[];

/** Slugs de bairro âncora (únicos indexáveis da família BAIRRO). */
export const BAIRROS_ANCORA_SLUGS = BAIRROS_ANCORA.map((b) => b.slug);

/** As 12 URLs do Lote Local 1 (imutáveis nesta rodada). */
export const LOTE_LOCAL_1 = data.loteLocal1 as string[];

const byPath = new Map(ENTITIES.map((e) => [e.path, e]));

const normalize = (p: string) => (p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p) || "/";

function familyOf(path: string): LocalFamily {
  if (path === "/") return "HOME";
  if (path.startsWith("/bairros/")) return "BAIRRO";
  if (/^\/tecnico-informatica-[a-z-]+$/.test(path)) return "CIDADE";
  const svc = path.match(/^\/servicos\/[^/]+\/([^/]+)$/);
  if (svc) {
    return BAIRROS_ANCORA_SLUGS.includes(svc[1]) || !/^(curitiba|[a-z]+-[a-z-]+)$/.test(svc[1])
      ? "SERVICO_BAIRRO"
      : "SERVICO_CIDADE";
  }
  return "OUTRA_LOCAL";
}

function decide(path: string): LocalDecision {
  const p = normalize(path);
  const declared = byPath.get(p);
  const family = declared?.family ?? familyOf(p);

  const build = (d: Omit<LocalDecision, "canonicalUrl" | "path" | "family">): LocalDecision => {
    const canonical = d.canonical || p;
    const sitemap = d.indexability === "index" && d.sitemap;
    return {
      path: p,
      family,
      ...d,
      canonical,
      canonicalUrl: `${SITE_BASE_URL}${canonical}`,
      sitemap,
    };
  };

  if (declared) {
    return build({
      indexability: declared.indexability,
      canonical: declared.canonical ?? p,
      sitemap: declared.sitemap,
      reason: declared.reason,
      parent: declared.parent,
      intent: declared.intent,
      tier: declared.tier,
    });
  }

  const prefixo = PREFIXOS.find((x) => p.startsWith(x.prefix));
  if (prefixo) {
    return build({
      indexability: prefixo.indexability,
      canonical: p,
      sitemap: false,
      reason: prefixo.reason,
    });
  }

  if (family === "BAIRRO") {
    const slug = p.replace("/bairros/", "");
    const ancora = BAIRROS_ANCORA.find((b) => b.slug === slug);
    if (ancora) {
      return build({
        indexability: "index",
        canonical: p,
        sitemap: true,
        reason: "Bairro âncora aprovado pelo checklist anticanibalização (conteúdo próprio real).",
        parent: "/tecnico-informatica-curitiba",
        intent: ancora.intent,
        tier: "ANCORA",
      });
    }
    return build({
      indexability: "noindex",
      canonical: p,
      sitemap: false,
      reason: "Bairro sem conteúdo próprio suficiente: rota preservada, fora do índice (política de poda).",
      parent: "/tecnico-informatica-curitiba",
      tier: "NOINDEX",
    });
  }

  if (family === "SERVICO_BAIRRO") {
    const indexavel = SERVICO_BAIRRO_INDEX.has(p);
    const pai = `/servicos/${p.split("/")[2]}`;
    return indexavel
      ? build({
          indexability: "index",
          canonical: p,
          sitemap: true,
          reason: "Combinação serviço × bairro com blocos autorais próprios (Onda 4S).",
          parent: pai,
        })
      : build({
          indexability: "noindex",
          canonical: p,
          sitemap: false,
          reason: "Família de altíssimo risco de doorway: sem blocos autorais, permanece noindex.",
          parent: pai,
        });
  }

  if (family === "SERVICO_CIDADE") {
    const pai = `/servicos/${p.split("/")[2]}`;
    return build({
      indexability: "canonicalized",
      canonical: pai,
      sitemap: false,
      reason: "Serviço × cidade sem intenção local adicional comprovada: autoridade fica no serviço-pai.",
      parent: pai,
    });
  }

  return build({
    indexability: "index",
    canonical: p,
    sitemap: true,
    reason: "Rota não-local: fora do escopo da política local.",
  });
}

const cache = new Map<string, LocalDecision>();

/** Resolve a decisão de política para qualquer caminho. */
export function resolveLocal(path: string): LocalDecision {
  const key = normalize(path);
  const hit = cache.get(key);
  if (hit) return hit;
  const decision = decide(key);
  cache.set(key, decision);
  return decision;
}

/** `true` quando a rota deve renderizar `noindex`. */
export function isNoindex(path: string): boolean {
  return resolveLocal(path).indexability !== "index";
}

/** Caminho canônico governado pela política. */
export function canonicalFor(path: string): string {
  return resolveLocal(path).canonical;
}

/** Todas as entidades declaradas explicitamente (para gates e relatórios). */
export function declaredEntities(): LocalDecision[] {
  return ENTITIES.map((e) => resolveLocal(e.path));
}
