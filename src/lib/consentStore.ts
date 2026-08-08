// ─────────────────────────────────────────────────────────────
// Consentimento LGPD — fonte única de verdade (v2, granular).
// Guarda a decisão do visitante (análise e anúncios) com data e versão,
// reaplica no Google Consent Mode v2 e só libera o script do AdSense
// depois do aceite explícito de anúncios.
// Não altera a telemetria first-party (click_events), que é técnica,
// sem cookies e sem dados pessoais — descrita na Política de Cookies.
// ─────────────────────────────────────────────────────────────

export const CONSENT_KEY_V2 = "lgpd_consent_v2";
export const CONSENT_KEY_LEGACY = "lgpd_consent_v1";
export const CONSENT_VERSION = "2026-08-08";
export const CONSENT_EVENT = "lgpd:consent-change";

export type ConsentRecord = {
  analytics: boolean;
  ads: boolean;
  ts: string;
  version: string;
};

const ADSENSE_CLIENT = "ca-pub-3762170279587706";

export function readConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY_V2);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<ConsentRecord>;
      if (typeof parsed.analytics === "boolean" && typeof parsed.ads === "boolean") {
        return {
          analytics: parsed.analytics,
          ads: parsed.ads,
          ts: parsed.ts ?? "",
          version: parsed.version ?? "",
        };
      }
    }
    // Migração do formato antigo (tudo ou nada).
    const legacy = localStorage.getItem(CONSENT_KEY_LEGACY);
    if (legacy === "granted" || legacy === "denied") {
      const granted = legacy === "granted";
      return { analytics: granted, ads: granted, ts: "", version: "1" };
    }
  } catch {
    /* storage indisponível → trata como sem decisão */
  }
  return null;
}

export function applyConsent(record: Pick<ConsentRecord, "analytics" | "ads">) {
  if (typeof window === "undefined" || !window.gtag) return;
  const ads = record.ads ? "granted" : "denied";
  window.gtag("consent", "update", {
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
    analytics_storage: record.analytics ? "granted" : "denied",
  });
}

/** Injeta o adsbygoogle apenas após aceite de anúncios (uma única vez). */
export function loadAdsScript() {
  if (typeof document === "undefined") return;
  if (document.querySelector('script[data-adsense="1"]')) return;
  const s = document.createElement("script");
  s.async = true;
  s.crossOrigin = "anonymous";
  s.dataset.adsense = "1";
  s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
  document.head.appendChild(s);
}

export function saveConsent(choice: Pick<ConsentRecord, "analytics" | "ads">): ConsentRecord {
  const record: ConsentRecord = {
    ...choice,
    ts: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  try {
    localStorage.setItem(CONSENT_KEY_V2, JSON.stringify(record));
    // Mantém compatibilidade com o bootstrap inline do index.html.
    localStorage.setItem(CONSENT_KEY_LEGACY, choice.ads && choice.analytics ? "granted" : "denied");
  } catch {
    /* ignora storage bloqueado */
  }
  applyConsent(record);
  if (record.ads) loadAdsScript();
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: record }));
  }
  return record;
}

/** Reabre o banner para o visitante trocar de ideia. */
export function resetConsent() {
  try {
    localStorage.removeItem(CONSENT_KEY_V2);
    localStorage.removeItem(CONSENT_KEY_LEGACY);
  } catch {
    /* ignora */
  }
  applyConsent({ analytics: false, ads: false });
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: null }));
  }
}
