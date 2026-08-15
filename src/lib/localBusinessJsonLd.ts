/**
 * ============================================================================
 * NAP + LocalBusiness — FONTE ÚNICA DE VERDADE DO SCHEMA LOCAL
 * ============================================================================
 * Todo JSON-LD de LocalBusiness do site deve sair daqui, para garantir NAP,
 * área atendida e horários idênticos em todas as páginas (home, modalidades
 * de atendimento, cidades e bairros).
 *
 * Regras do projeto:
 *  - O telefone só existe dentro do JSON-LD e em deep links wa.me.
 *  - Nunca inventar avaliação / aggregateRating.
 */
import { siteConfig, absoluteUrl, BRAND_LOGO_PATH } from "@/lib/siteConfig";
import { BUSINESS_HOURS } from "@/lib/config/contact";

export const OPENING_HOURS = BUSINESS_HOURS.map((h) => ({
  "@type": "OpeningHoursSpecification",
  dayOfWeek: h.days,
  opens: h.opens,
  closes: h.closes,
}));

export const NAP = {
  name: siteConfig.brandName,
  legalName: siteConfig.legalName,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.primaryCity,
    addressRegion: siteConfig.region,
    addressCountry: siteConfig.country,
  },
  telephone: siteConfig.phoneE164,
} as const;

export const AREA_SERVED = siteConfig.serviceArea.map((name) => ({
  "@type": "City" as const,
  name,
}));

export interface LocalBusinessOptions {
  /** Path da página (para @id único por rota). */
  path?: string;
  /** Nome específico da página/modalidade. */
  name?: string;
  description?: string;
  /** Sobrescreve a área atendida (ex.: página de bairro/cidade). */
  areaServed?: Array<{ "@type": "City"; name: string }>;
  /** Serviços destacados nesta página (vira hasOfferCatalog). */
  services?: Array<{ name: string; url?: string }>;
}

/** Constrói o LocalBusiness canônico do site com NAP/área/horários idênticos. */
export function buildLocalBusinessSchema(opts: LocalBusinessOptions = {}) {
  const path = opts.path ?? "/";
  const url = absoluteUrl(path);

  const isHome = path === "/";
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": siteConfig.businessType,
    // A entidade institucional (#organization) tem dono único (JsonLdSchema).
    // Todo LocalBusiness — inclusive o da home — usa @id próprio e referencia
    // a organização por parentOrganization (nunca duplica o mesmo @id).
    "@id": isHome ? `${siteConfig.baseUrl}/#localbusiness` : `${url}#localbusiness`,
    parentOrganization: { "@id": `${siteConfig.baseUrl}/#organization` },
    name: NAP.name,
    alternateName: siteConfig.alternateNames,
    description:
      opts.description ?? siteConfig.defaultDescription,
    url,
    mainEntityOfPage: url,
    image: siteConfig.defaultOgImage,
    logo: `${siteConfig.baseUrl}${BRAND_LOGO_PATH}`,
    telephone: NAP.telephone,
    address: NAP.address,
    ...(siteConfig.geo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: String(siteConfig.geo.lat),
            longitude: String(siteConfig.geo.lng),
          },
        }
      : {}),
    areaServed: opts.areaServed ?? AREA_SERVED,
    ...(OPENING_HOURS.length ? { openingHoursSpecification: OPENING_HOURS } : {}),
    priceRange: `${siteConfig.minPriceLabel}+`,
    currenciesAccepted: "BRL",
    paymentAccepted: "PIX, Cartão de Crédito, Cartão de Débito, Dinheiro, Transferência Bancária",
    foundingDate: siteConfig.foundedYear,
    ...(siteConfig.whatsappConfigured || siteConfig.sameAs.length
      ? {
          sameAs: [
            ...siteConfig.sameAs,
            ...(siteConfig.whatsappConfigured ? [`https://wa.me/${siteConfig.whatsappNumber}`] : []),
          ],
        }
      : {}),
  };

  if (opts.name) schema.name = opts.name;

  if (opts.services?.length) {
    schema.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: `Serviços — ${opts.name ?? siteConfig.brandName}`,
      itemListElement: opts.services.map((s, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: {
          "@type": "Service",
          name: s.name,
          ...(s.url ? { url: absoluteUrl(s.url) } : {}),
          provider: { "@id": `${siteConfig.baseUrl}/#organization` },
          areaServed: opts.areaServed ?? AREA_SERVED,
        },
      })),
    };
  }

  return schema;
}
