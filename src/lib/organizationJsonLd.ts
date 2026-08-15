/**
 * ─────────────────────────────────────────────────────────────
 * ORGANIZATION — ENTIDADE INSTITUCIONAL ÚNICA (@id canônico)
 * ─────────────────────────────────────────────────────────────
 * Existe exatamente UM nó Organization por documento, com `@id`
 * `${SITE_BASE_URL}/#organization`. Todos os demais schemas
 * (publisher, provider, seller, parentOrganization, about, worksFor)
 * referenciam esse `@id` — nunca repetem o objeto completo.
 *
 * O mesmo objeto é espelhado no prerender estático
 * (scripts/curated-static-body.mjs) para manter prerender e client idênticos.
 */
import { siteConfig, SITE_BASE_URL, BRAND_LOGO_PATH } from "@/lib/siteConfig";
import { BUSINESS_HOURS } from "@/lib/config/contact";

export const ORGANIZATION_ID = `${siteConfig.baseUrl}/#organization`;
export const WEBSITE_ID = `${siteConfig.baseUrl}/#website`;

/** Referência curta à entidade institucional. */
export const organizationRef = { "@id": ORGANIZATION_ID } as const;

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: siteConfig.brandName,
    url: `${siteConfig.baseUrl}/`,
    inLanguage: "pt-BR",
    publisher: organizationRef,
  };
}

/** Horários de atendimento em formato schema.org (vazio = campo omitido). */
export const OPENING_HOURS = BUSINESS_HOURS.map((h) => ({
  "@type": "OpeningHoursSpecification",
  dayOfWeek: h.days,
  opens: h.opens,
  closes: h.closes,
}));

export function buildOrganizationSchema() {
  const sameAs = [
    ...siteConfig.sameAs,
    ...(siteConfig.whatsappConfigured ? [`https://wa.me/${siteConfig.whatsappNumber}`] : []),
  ];
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: siteConfig.brandName,
    alternateName: siteConfig.alternateNames,
    legalName: siteConfig.legalName,
    url: `${siteConfig.baseUrl}/`,
    logo: `${siteConfig.baseUrl}${BRAND_LOGO_PATH}`,
    telephone: siteConfig.phoneE164,
    foundingDate: siteConfig.foundedYear,
    areaServed: siteConfig.serviceArea.map((name) => ({ "@type": "City", name })),
    // Horários só aparecem quando configurados (VITE_BUSINESS_HOURS).
    ...(OPENING_HOURS.length ? { openingHoursSpecification: OPENING_HOURS } : {}),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: "Portuguese",
      areaServed: siteConfig.serviceArea.map((name) => ({ "@type": "City", name })),
      ...(OPENING_HOURS.length ? { hoursAvailable: OPENING_HOURS } : {}),
    },
    ...(sameAs.length ? { sameAs } : {}),
  };
}
