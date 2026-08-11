// ── MARCA ────────────────────────────────────────────────────
// Fonte única de identidade. Nenhum componente pode declarar nome,
// logo ou OG por conta própria.
import { envStr } from "./env";

export const brandConfig = {
  brandName: envStr("VITE_BRAND_NAME") ?? "O Técnico de Informática",
  siteName: envStr("VITE_BRAND_NAME") ?? "O Técnico de Informática",
  shortName: envStr("VITE_BRAND_SHORT_NAME") ?? "O Técnico",
  /**
   * Razão social. NÃO tem valor padrão: não se inventa pessoa jurídica.
   * `undefined` = campo simplesmente não é publicado nos schemas.
   */
  legalName: envStr("VITE_BRAND_LEGAL_NAME"),
  tagline: "Assistência técnica em informática",
  /** Nomes alternativos legítimos da NOVA marca (nunca da marca de origem). */
  alternateNames: ["O Técnico", "O Técnico de Informática"],

  // Assets — paths configuráveis; os arquivos oficiais entram no go-live.
  logo: envStr("VITE_BRAND_LOGO") ?? "/logo.webp",
  /** Variante para superfícies claras (header) — wordmark azul. */
  logoOnLight: envStr("VITE_BRAND_LOGO_LIGHT") ?? "/logo-dark.webp",
  logoAlt: "O Técnico de Informática — assistência técnica em informática",
  favicon: envStr("VITE_BRAND_FAVICON") ?? "/favicon.png",
  appleTouchIcon: envStr("VITE_BRAND_APPLE_ICON") ?? "/apple-touch-icon.png",
  ogImage: envStr("VITE_BRAND_OG_IMAGE") ?? "/og-image.png",

  themeColor: "#0b2733",
  backgroundColor: "#0b2733",
} as const;

export const BRAND_NAME = brandConfig.brandName;
export const BRAND_SHORT_NAME = brandConfig.shortName;
export const BRAND_LEGAL_NAME = brandConfig.legalName;
export const BRAND_LOGO_PATH = brandConfig.logo;
export const BRAND_OG_PATH = brandConfig.ogImage;

export default brandConfig;
