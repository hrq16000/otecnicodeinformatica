// @ts-nocheck
// ─────────────────────────────────────────────────────────────
// FACADE DE COMPATIBILIDADE — a fonte de verdade agora é src/lib/config/*
//
// RODADA 2 — TRANSFORMAÇÃO ESTRUTURAL
// Marca, domínio, contato, analytics, geografia, política comercial e
// E-E-A-T vivem em módulos dedicados em `src/lib/config`. Este arquivo
// apenas reexporta esses valores no formato antigo (`siteConfig`) para
// os consumidores existentes, sem duplicar nenhuma decisão.
//
// Regra do WhatsApp: o número só pode existir em deep links (wa.me)
// e no campo `telephone` do JSON-LD. Nunca como texto visível no DOM.
// ─────────────────────────────────────────────────────────────

import brandConfig from "@/lib/config/brand";
import commercialConfig from "@/lib/config/commercial";
import contactConfig from "@/lib/config/contact";
import eeatConfig from "@/lib/config/eeat";
import geographyConfig from "@/lib/config/geography";
import { BASE_URL, DOMAIN, SITE_CONFIGURED as DOMAIN_CONFIGURED, absoluteUrl as buildAbsoluteUrl } from "@/lib/config/domain";
import { whatsappLink as buildWhatsappLink } from "@/lib/config/contact";

// ── Marca ────────────────────────────────────────────────────
export const BRAND_NAME = brandConfig.brandName;
export const BRAND_SHORT_NAME = brandConfig.shortName;
export const BRAND_LEGAL_NAME = brandConfig.legalName;
export const BRAND_FOUNDED_YEAR = eeatConfig.foundingYear;
export const BRAND_LOGO_PATH = brandConfig.logo;
export const BRAND_OG_PATH = brandConfig.ogImage;

// ── Domínio ──────────────────────────────────────────────────
export const SITE_DOMAIN = DOMAIN;
export const SITE_CONFIGURED = DOMAIN_CONFIGURED;
export const SITE_BASE_URL = BASE_URL;

// ── Contato ──────────────────────────────────────────────────
export const WHATSAPP_CONFIGURED = contactConfig.whatsappConfigured;
export const WHATSAPP_NUMBER = contactConfig.whatsappNumber;
export const WHATSAPP_PHONE_E164 = contactConfig.phoneE164;
export const CONTACT_FALLBACK_URL = contactConfig.fallbackUrl;

// ── Geo ──────────────────────────────────────────────────────
export const PRIMARY_CITY = geographyConfig.primaryCity;
export const REGION_UF = geographyConfig.primaryUF;
export const GEO_COORDS = geographyConfig.geo;

export const siteConfig = {
  // Marca
  siteName: brandConfig.siteName,
  brandName: brandConfig.brandName,
  shortName: brandConfig.shortName,
  /** Pode ser `undefined` — nunca renderizar sem checar. */
  legalName: brandConfig.legalName,
  tagline: brandConfig.tagline,
  alternateNames: brandConfig.alternateNames,

  /** Pode ser `undefined` — nunca renderizar sem checar. */
  foundedYear: eeatConfig.foundingYear,

  // Domínio
  domain: DOMAIN,
  baseUrl: BASE_URL,
  isConfigured: DOMAIN_CONFIGURED,
  get canonicalUrl() {
    return this.baseUrl;
  },

  // SEO base institucional (copy comercial vive nas próprias páginas)
  defaultTitle: `${brandConfig.brandName} | Assistência Técnica e Suporte Local`,
  defaultDescription:
    "Assistência técnica em informática para notebooks, computadores, redes e suporte empresarial em Curitiba, São José dos Pinhais e Região Metropolitana.",
  // Paridade com o HTML estático curado (scripts/curated-routes-meta.mjs) e ≤ 62 caracteres.
  homeTitle: `${brandConfig.brandName} | Assistência Técnica e Suporte Local`,
  homeDescription:
    "Notebook, computador ou rede com problema? Assistência técnica em informática para casa e empresa em Curitiba e São José dos Pinhais.",
  defaultOgImage: `${BASE_URL}${brandConfig.ogImage}`,

  // Contato — número NUNCA exibido como texto; só em wa.me / JSON-LD.
  whatsappNumber: contactConfig.whatsappNumber,
  whatsappConfigured: contactConfig.whatsappConfigured,
  phoneE164: contactConfig.phoneE164,

  // Localização / negócio
  primaryCity: geographyConfig.primaryCity,
  region: geographyConfig.primaryUF,
  country: geographyConfig.country,
  businessType: ["LocalBusiness", "ProfessionalService", "ComputerRepairService"],
  geo: geographyConfig.geo,
  serviceArea: geographyConfig.serviceArea,

  // Presença externa (só o que for comprovadamente da nova marca)
  sameAs: [] as string[],

  // Interlink de ecossistema — controlado, contextual, NUNCA em massa.
  ecosystemLinks: [] as Array<{ label: string; url: string }>,

  // Política comercial (fonte: config/commercial.ts)
  minPriceLabel: commercialConfig.minPriceLabel,
  pricingDisclaimer: commercialConfig.pricingDisclaimer,
};

/** Monta URL absoluta canônica a partir de um path. */
export function absoluteUrl(path = "/"): string {
  return buildAbsoluteUrl(path);
}

/**
 * Deep link WhatsApp (interceptado pelo funil global).
 * Sem número configurado retorna a rota de indisponibilidade —
 * fail-safe explícito, nunca o contato da marca de origem.
 */
export function whatsappLink(message?: string): string {
  return buildWhatsappLink(message);
}

export default siteConfig;
