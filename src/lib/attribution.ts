/**
 * ATRIBUIÇÃO POR ORIGEM (first-touch) — SEO × Ads × orgânico
 *
 * Resolve o canal de aquisição uma única vez por sessão (primeiro hit) e
 * reutiliza o valor em todos os eventos de clique em "WhatsApp Agora" e
 * "Ligar Agora". Sem cookies de terceiros e sem chamadas externas.
 *
 * Canais:
 *   ads       — clique pago identificável (gclid/gbraid/wbraid/msclkid, utm cpc/ppc/paid)
 *   seo       — busca orgânica (referrer de buscador sem marcador de pago)
 *   social    — redes sociais
 *   referral  — outro site
 *   direto    — sem referrer e sem UTM
 *   campanha  — UTM presente que não é pago nem social (e-mail, parceiro, QR)
 */
import { readUtms } from "./utmCapture";

export const ATTRIBUTION_CHANNELS = ["ads", "seo", "social", "referral", "direto", "campanha"] as const;
export type AttributionChannel = (typeof ATTRIBUTION_CHANNELS)[number];

const KEY = "attribution_v1";

const PAID_PARAMS = ["gclid", "gbraid", "wbraid", "msclkid", "fbclid_paid", "ttclid"];
const PAID_MEDIUMS = /^(cpc|ppc|paid|paidsearch|paid_search|cpm|display|retargeting)$/i;
const SEARCH_HOSTS = /(google\.|bing\.|duckduckgo\.|yahoo\.|ecosia\.|search\.brave|yandex\.|baidu\.)/i;
const SOCIAL_HOSTS = /(facebook\.|instagram\.|l\.instagram|linkedin\.|lnkd\.in|t\.co|twitter\.|x\.com|tiktok\.|youtube\.|whatsapp\.|wa\.me|reddit\.)/i;

export type Attribution = {
  channel: AttributionChannel;
  source: string;
  landing_page: string;
};

function detect(): Attribution {
  const search = new URLSearchParams(window.location.search);
  const utms = readUtms();
  const referrer = document.referrer || "";
  let refHost = "";
  try {
    refHost = referrer ? new URL(referrer).hostname : "";
  } catch {
    refHost = "";
  }
  const sameHost = refHost && refHost === window.location.hostname;

  const paidClick = PAID_PARAMS.some((p) => search.get(p)) || !!utms.gclid;
  const utmMedium = (search.get("utm_medium") || utms.utm_medium || "").trim();
  const utmSource = (search.get("utm_source") || utms.utm_source || "").trim();

  let channel: AttributionChannel;
  if (paidClick || PAID_MEDIUMS.test(utmMedium)) channel = "ads";
  else if (/^(organic|seo)$/i.test(utmMedium)) channel = "seo";
  else if (/^(social|social_paid|social_organic)$/i.test(utmMedium) || (!sameHost && SOCIAL_HOSTS.test(refHost)))
    channel = "social";
  else if (!sameHost && SEARCH_HOSTS.test(refHost)) channel = "seo";
  else if (utmSource && utmSource !== "site") channel = "campanha";
  else if (!sameHost && refHost) channel = "referral";
  else channel = "direto";

  return {
    channel,
    source: (utmSource || refHost || "direto").slice(0, 80),
    landing_page: window.location.pathname,
  };
}

/** First-touch: grava no primeiro hit da sessão e nunca sobrescreve. */
export function captureAttribution(): Attribution {
  const fallback: Attribution = { channel: "direto", source: "direto", landing_page: "/" };
  if (typeof window === "undefined") return fallback;
  try {
    const raw = sessionStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Attribution;
    const found = detect();
    sessionStorage.setItem(KEY, JSON.stringify(found));
    return found;
  } catch {
    return fallback;
  }
}

export function readAttribution(): Attribution {
  if (typeof window === "undefined") return { channel: "direto", source: "direto", landing_page: "/" };
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Attribution) : captureAttribution();
  } catch {
    return { channel: "direto", source: "direto", landing_page: "/" };
  }
}
