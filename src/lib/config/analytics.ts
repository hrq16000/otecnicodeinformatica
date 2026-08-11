// ── ANALYTICS ────────────────────────────────────────────────
// IDs da marca de origem foram removidos. Sem IDs próprios configurados,
// NENHUM script externo é carregado (telemetria interna segue funcionando).
import { envStr } from "./env";

export const GA4_ID = envStr("VITE_GA4_ID");
export const GOOGLE_ADS_ID = envStr("VITE_GOOGLE_ADS_ID");
export const GOOGLE_ADS_CONVERSION_LABEL = envStr("VITE_GOOGLE_ADS_CONVERSION_LABEL");
export const ADSENSE_PUBLISHER_ID = envStr("VITE_ADSENSE_CLIENT");

export const ANALYTICS_ENABLED = Boolean(GA4_ID);
export const ADS_ENABLED = Boolean(GOOGLE_ADS_ID);
export const ADSENSE_ENABLED = Boolean(ADSENSE_PUBLISHER_ID);

export const analyticsConfig = {
  ga4Id: GA4_ID,
  googleAdsId: GOOGLE_ADS_ID,
  googleAdsConversionLabel: GOOGLE_ADS_CONVERSION_LABEL,
  adsensePublisherId: ADSENSE_PUBLISHER_ID,
  analyticsEnabled: ANALYTICS_ENABLED,
  adsEnabled: ADS_ENABLED,
  adsenseEnabled: ADSENSE_ENABLED,
} as const;

export default analyticsConfig;
