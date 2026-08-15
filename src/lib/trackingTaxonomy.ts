import localPolicy from "@/lib/localIndexPolicy.json";
// ─────────────────────────────────────────────────────────────
// TAXONOMIA ÚNICA DE TRACKING (GA4 + Google Ads + UTMs)
// Fonte única de verdade para nomes de eventos, utm_source/medium
// e normalização de `click_location`. Qualquer novo CTA deve usar
// estas constantes — nomes livres quebram os relatórios.
// ─────────────────────────────────────────────────────────────

/** Nomes canônicos de eventos GA4. */
export const GA4_EVENTS = {
  ctaClick: "cta_click",
  whatsapp: "click_whatsapp",
  call: "click_call",
  lead: "generate_lead",
  adsConversion: "conversion",
  funnelOpen: "funnel_open",
  funnelSubmit: "funnel_submit",
  faqToggle: "faq_toggle",
  /** Clique na âncora da pergunta (deep link #faq-N). */
  faqAnchor: "faq_anchor_click",
  /** Clique em link interno contextual dentro de uma resposta da FAQ. */
  faqInternalLink: "faq_internal_link",
  /** Marco de leitura (25/50/75/100%) de uma seção específica da FAQ. */
  faqSectionDepth: "faq_section_depth",
  fileDownload: "file_download",
} as const;



/** utm_source padrão quando o visitante não veio de campanha externa. */
export const DEFAULT_UTM_SOURCE = "site";

/** utm_medium canônicos — todo CTA cai em um destes. */
export const UTM_MEDIUMS = [
  "header",
  "footer",
  "float",
  "hero",
  "modal",
  "funnel",
  "cta",
] as const;
export type UtmMedium = (typeof UTM_MEDIUMS)[number];

/** Normaliza qualquer rótulo para snake_case ASCII estável. */
export function normalizeTrackingLabel(raw: string | undefined | null): string {
  if (!raw) return "desconhecido";
  return raw
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 60) || "desconhecido";
}

/** Garante que o medium enviado é um dos canônicos. */
export function normalizeUtmMedium(raw: string | undefined | null): UtmMedium {
  const v = normalizeTrackingLabel(raw) as UtmMedium;
  return (UTM_MEDIUMS as readonly string[]).includes(v) ? v : "cta";
}

/** utm_campaign derivado da rota atual (ex.: servicos_formatacao). */
export function campaignFromPath(pathname: string): string {
  const path = pathname.replace(/^\/+|\/+$/g, "") || "home";
  return normalizeTrackingLabel(path.replace(/\//g, "_")) || "home";
}

/**
 * Tipo de rota para segmentar conversão real no GA4/Ads.
 * home | pf | pj | servico | local | institucional | outro
 */
export type RouteType =
  | "home"
  | "pf"
  | "pj"
  | "servico"
  | "local"
  | "institucional"
  | "outro";

export function routeTypeFromPath(pathname: string): RouteType {
  const p = (pathname || "/").toLowerCase().replace(/\/+$/, "") || "/";
  if (p === "/") return "home";
  if (/(empresa|empresas|corporativ|pj|suporte-empresas|ti-curitiba)/.test(p)) return "pj";
  if (/(pessoa-fisica|residencial|domicilio|pf)\b/.test(p)) return "pf";
  if (/^\/(servicos|servico|arrumar-pc|problemas|marcas|cftv)/.test(p)) return "servico";
  if (/^\/(bairros?|tecnico-informatica-|assistencia-tecnica-)/.test(p)) return "local";
  if (
    /^\/(sobre|contato|faq|blog|precos-e-politicas|termos-e-condicoes|politica-privacidade|como-funciona|ordem-de-servico|seja-parceiro|status)/.test(
      p,
    )
  )
    return "institucional";
  return "outro";
}

/** Bairros âncora declarados na política local (cidade-pai por slug). */
const POLICY_BAIRROS = (localPolicy.bairrosAncora ?? []) as {
  slug: string;
  cidade?: string;
  cidadeSlug?: string;
}[];

/**
 * Cidade inferida a partir da rota — dimensão `city` dos eventos de conversão.
 * Cobre as famílias locais reais do projeto:
 *   /servicos/<slug>/<cidade>       → cidade do sufixo
 *   /tecnico-informatica-<cidade>   → cidade do slug
 *   /assistencia-tecnica-<cidade>   → cidade do slug
 *   /bairros/<bairro>               → curitiba (bairros são de Curitiba)
 * Sem correspondência ⇒ "nao_definida" (nunca cair em Curitiba por fallback).
 */
export function cityFromPath(pathname: string): string {
  const p = (pathname || "/").toLowerCase().replace(/\/+$/, "") || "/";
  const svc = p.match(/^\/servicos\/[^/]+\/([a-z0-9-]+)$/);
  if (svc) return normalizeTrackingLabel(svc[1]);
  const local = p.match(/^\/(?:tecnico-informatica|assistencia-tecnica|arrumar-pc|cftv)-([a-z0-9-]+)$/);
  if (local) return normalizeTrackingLabel(local[1]);
  const bairro = p.match(/^\/bairros\/([a-z0-9-]+)$/);
  if (bairro) {
    // Cidade-pai vem da política local. Sem correspondência ⇒ nao_definida
    // (proibido cair em Curitiba por herança — FASE 35 da Rodada 5E).
    const ancora = POLICY_BAIRROS.find((b) => b.slug === bairro[1]);
    return ancora ? normalizeTrackingLabel(ancora.cidadeSlug ?? ancora.cidade) : "nao_definida";
  }
  if (/curitiba/.test(p)) return "curitiba";
  return "nao_definida";
}

/** Slug do serviço quando a rota pertence à família /servicos. */
export function serviceSlugFromPath(pathname: string): string {
  const p = (pathname || "/").toLowerCase().replace(/\/+$/, "") || "/";
  const m = p.match(/^\/servicos\/([^/]+)/);
  return m ? normalizeTrackingLabel(m[1]) : "nao_aplicavel";
}

/**
 * Faixa de viewport para segmentar conversão mobile nos relatórios GA4
 * (360 / 390 / 430 são os alvos de QA das páginas empresariais).
 */
export function viewportBucket(w: number): string {
  if (!w) return "unknown";
  if (w <= 375) return "360";
  if (w <= 400) return "390";
  if (w < 768) return "430";
  if (w < 1024) return "tablet";
  return "desktop";
}

/**
 * Slug do bairro quando a rota pertence à família /bairros e o bairro é
 * âncora declarado na política. Taxonomia editorial categórica — nunca
 * endereço, rua, CEP ou coordenada (FASE 34 da Rodada 5E).
 */
export function neighborhoodSlugFromPath(pathname: string): string {
  const p = (pathname || "/").toLowerCase().replace(/\/+$/, "") || "/";
  const m = p.match(/^\/bairros\/([a-z0-9-]+)$/);
  if (!m) return "nao_aplicavel";
  return POLICY_BAIRROS.some((b) => b.slug === m[1]) ? normalizeTrackingLabel(m[1]) : "nao_aplicavel";
}
