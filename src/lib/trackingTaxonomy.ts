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
