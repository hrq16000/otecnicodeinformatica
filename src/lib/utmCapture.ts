/**
 * Captura e persiste UTMs + gclid no primeiro hit da sessão.
 * Reutilizado pelo funil, eventos GA4 e links de WhatsApp.
 */

const KEY = "utm_payload_v1";
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
] as const;

export type UtmPayload = Partial<Record<(typeof UTM_KEYS)[number], string>>;

export function captureUtmsFromUrl(): UtmPayload {
  if (typeof window === "undefined") return {};
  try {
    const sp = new URLSearchParams(window.location.search);
    const incoming: UtmPayload = {};
    for (const k of UTM_KEYS) {
      const v = sp.get(k);
      if (v) incoming[k] = v.slice(0, 200);
    }
    const existing = readUtms();
    // Primeiro hit ganha (atribuição); só sobrescreve se vier algo novo
    const merged: UtmPayload = { ...incoming, ...existing };
    if (Object.keys(merged).length > 0) {
      sessionStorage.setItem(KEY, JSON.stringify(merged));
    }
    return merged;
  } catch {
    return {};
  }
}

export function readUtms(): UtmPayload {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as UtmPayload) : {};
  } catch {
    return {};
  }
}

/**
 * Anexa a UTM de aquisição capturada na entrada da sessão a um link de saída
 * (WhatsApp). Quando não houve UTM real de aquisição, o link é marcado como
 * CTA interno — nunca como "organic", que falsificaria a origem da sessão
 * (Rodada 8A: `utm_medium=organic` fixo contaminava o funil).
 */
export function appendUtmsToUrl(url: URL): URL {
  const utms = readUtms();
  for (const [k, v] of Object.entries(utms)) {
    if (v && !url.searchParams.has(k)) url.searchParams.set(k, v);
  }
  if (!url.searchParams.has("utm_source")) url.searchParams.set("utm_source", "site");
  if (!url.searchParams.has("utm_medium")) url.searchParams.set("utm_medium", "cta_interno");
  return url;
}
