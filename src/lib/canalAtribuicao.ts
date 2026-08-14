/**
 * RODADA 6 — SEGMENTAÇÃO POR CANAL (source/medium)
 * ------------------------------------------------
 * Classifica a origem de cada evento em canais comparáveis:
 *   google_ads · paid_other · organic · social · referral · direct · unknown
 *
 * REGRAS
 *   1. A classificação usa apenas utm_source / utm_medium / attribution_channel.
 *      Nada de geografia: nenhum canal inventa cidade e nada vira "Curitiba".
 *   2. Sem dados suficientes → "unknown". Nunca chutar "direct".
 *   3. Função pura: não lê window, não bloqueia navegação, serve ao CI.
 */

export const CANAIS = [
  "google_ads",
  "paid_other",
  "organic",
  "social",
  "referral",
  "direct",
  "unknown",
] as const;

export type Canal = (typeof CANAIS)[number];

export const CANAL_LABEL: Record<Canal, string> = {
  google_ads: "Google Ads",
  paid_other: "Outras mídias pagas",
  organic: "Orgânico / SEO",
  social: "Social",
  referral: "Referência",
  direct: "Direto",
  unknown: "Não identificado",
};

export type FonteCanal = {
  utm_source?: string | null;
  utm_medium?: string | null;
  attribution_channel?: string | null;
};

const norm = (v?: string | null) => (v ?? "").trim().toLowerCase();

const MEDIUMS_PAGOS = ["cpc", "ppc", "paid", "paidsearch", "paid_search", "cpm", "display"];
const MEDIUMS_ORGANICOS = ["organic", "seo", "organic_search"];
const FONTES_SOCIAIS = ["facebook", "instagram", "linkedin", "youtube", "tiktok", "whatsapp", "x", "twitter"];

/** Deriva o canal de um evento. Sempre devolve um dos valores de `CANAIS`. */
export function canalDoEvento(fonte: FonteCanal): Canal {
  const source = norm(fonte.utm_source);
  const medium = norm(fonte.utm_medium);
  const canal = norm(fonte.attribution_channel);

  const pago = MEDIUMS_PAGOS.includes(medium) || canal === "paid";
  if (pago) {
    const googleAds = source === "google" || source === "googleads" || source === "google_ads" || source === "adwords";
    return googleAds ? "google_ads" : "paid_other";
  }

  if (MEDIUMS_ORGANICOS.includes(medium) || canal === "organic") return "organic";
  if (medium === "social" || canal === "social" || FONTES_SOCIAIS.includes(source)) return "social";
  if (medium === "referral" || canal === "referral") return "referral";
  if (canal === "direct" || (!source && !medium && canal === "none")) return "direct";
  if (!source && !medium && !canal) return "unknown";
  if (source && !medium) return "referral";
  return "unknown";
}

export type EtapaCanal = {
  sessoes: Set<string>;
  cta: Set<string>;
  triagem: Set<string>;
  whatsapp: Set<string>;
  leads: Set<string>;
};

export const novoBucketCanal = (): EtapaCanal => ({
  sessoes: new Set(),
  cta: new Set(),
  triagem: new Set(),
  whatsapp: new Set(),
  leads: new Set(),
});

const ETAPA_POR_EVENTO: Record<string, keyof EtapaCanal> = {
  page_view: "sessoes",
  cta_click: "cta",
  funnel_open: "triagem",
  triage_start: "triagem",
  triage_complete: "triagem",
  wa_click: "whatsapp",
  whatsapp_open: "whatsapp",
  lead_submitted: "leads",
  wa_funnel_submit: "leads",
};

export type EventoCanal = FonteCanal & {
  event_type: string;
  session_id?: string | null;
  created_at?: string | null;
};

/**
 * Agrega o funil por canal contando SESSÕES distintas em cada etapa.
 * Denominador explícito: taxas devem usar `sessoes` do próprio canal.
 */
export function funilPorCanal(eventos: EventoCanal[]): Array<{ canal: Canal; bucket: EtapaCanal }> {
  const mapa = new Map<Canal, EtapaCanal>();
  for (const e of eventos) {
    const canal = canalDoEvento(e);
    const bucket = mapa.get(canal) ?? novoBucketCanal();
    const sid = e.session_id || e.created_at || "sessao-desconhecida";
    bucket.sessoes.add(sid);
    const etapa = ETAPA_POR_EVENTO[e.event_type];
    if (etapa && etapa !== "sessoes") bucket[etapa].add(sid);
    mapa.set(canal, bucket);
  }
  return [...mapa.entries()]
    .map(([canal, bucket]) => ({ canal, bucket }))
    .sort((a, b) => b.bucket.sessoes.size - a.bucket.sessoes.size);
}
