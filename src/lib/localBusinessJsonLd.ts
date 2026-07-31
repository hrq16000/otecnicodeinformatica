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
import { siteConfig, absoluteUrl } from "@/lib/siteConfig";

export const OPENING_HOURS = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "18:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: "Saturday",
    opens: "09:00",
    closes: "13:00",
  },
] as const;

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
  email: siteConfig.email,
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
    // Home mantém o @id canônico da organização; páginas internas usam @id
    // próprio referenciando a mesma entidade (evita duplicidade de nó).
    "@id": isHome ? `${siteConfig.baseUrl}/#organization` : `${url}#localbusiness`,
    ...(isHome ? {} : { parentOrganization: { "@id": `${siteConfig.baseUrl}/#organization` } }),
    name: NAP.name,
    legalName: NAP.legalName,
    alternateName: [
      "Técnico de Informática Curitiba",
      "Assistência Técnica em Informática Curitiba",
    ],
    description:
      opts.description ?? siteConfig.defaultDescription,
    url,
    mainEntityOfPage: url,
    image: siteConfig.defaultOgImage,
    logo: `${siteConfig.baseUrl}/logo.png`,
    email: NAP.email,
    telephone: NAP.telephone,
    address: NAP.address,
    geo: {
      "@type": "GeoCoordinates",
      latitude: String(siteConfig.geo.lat),
      longitude: String(siteConfig.geo.lng),
    },
    areaServed: opts.areaServed ?? AREA_SERVED,
    openingHoursSpecification: OPENING_HOURS,
    priceRange: `${siteConfig.minPriceLabel}+`,
    currenciesAccepted: "BRL",
    paymentAccepted: "PIX, Cartão de Crédito, Cartão de Débito, Dinheiro, Transferência Bancária",
    foundingDate: siteConfig.foundedYear,
    sameAs: [...siteConfig.sameAs, `https://wa.me/${siteConfig.whatsappNumber}`],
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
