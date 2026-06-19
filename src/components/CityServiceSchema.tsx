import { useEffect } from "react";

/**
 * JSON-LD por página de cidade: emite um Service específico vinculado ao
 * LocalBusiness sitewide (#organization), com areaServed = cidade.
 * O LocalBusiness completo já é injetado pelo <JsonLdSchema /> da home/header,
 * aqui apenas reforçamos a relação Cidade ↔ Serviço para rich results locais.
 */
const BASE_URL = "https://tecnicocuritiba.com.br";

interface CityServiceSchemaProps {
  /** Nome da cidade — ex.: "Curitiba", "São José dos Pinhais" */
  city: string;
  /** sameAs wikipedia (opcional) */
  citySameAs?: string;
  /** Path relativo — ex.: "/tecnico-informatica-curitiba" */
  path: string;
  /** Preço mínimo BRL (default 99.99) */
  priceFrom?: number;
}

export const CityServiceSchema = ({
  city,
  citySameAs,
  path,
  priceFrom = 99.99,
}: CityServiceSchemaProps) => {
  useEffect(() => {
    const url = `${BASE_URL}${path}`;
    const cityNode: Record<string, unknown> = { "@type": "City", name: city };
    if (citySameAs) cityNode.sameAs = citySameAs;

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: `Técnico de Informática em ${city}`,
      description: `Assistência técnica em informática em ${city}: formatação, conserto de PC e notebook, remoção de vírus, upgrade de SSD/RAM e configuração de redes Wi-Fi. Atendimento em domicílio em até 30 minutos.`,
      serviceType: "Assistência Técnica de Informática",
      category: "Assistência Técnica de Informática",
      url,
      provider: { "@id": `${BASE_URL}/#organization` },
      areaServed: cityNode,
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: url,
        availableLanguage: ["pt-BR"],
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "BRL",
        price: priceFrom.toFixed(2),
        priceSpecification: {
          "@type": "PriceSpecification",
          price: priceFrom.toFixed(2),
          priceCurrency: "BRL",
          minPrice: priceFrom.toFixed(2),
          valueAddedTaxIncluded: true,
        },
        availability: "https://schema.org/InStock",
        url,
        seller: { "@id": `${BASE_URL}/#organization` },
      },
      // aggregateRating removido até existirem reviews verificadas (ver
      // pipeline GBP/Supabase). Schema.org exige rating real e auditável.
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `Serviços em ${city}`,
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Formatação de Computador" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Remoção de Vírus e Malware" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Upgrade de SSD e Memória RAM" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Conserto de PC e Notebook" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Configuração de Redes Wi-Fi" } },
        ],
      },
    };

    const marker = `city-schema-${path}`;
    document
      .querySelectorAll(`script[data-city-schema="${marker}"]`)
      .forEach((s) => s.remove());

    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.setAttribute("data-city-schema", marker);
    s.text = JSON.stringify(serviceSchema);
    document.head.appendChild(s);

    return () => {
      document
        .querySelectorAll(`script[data-city-schema="${marker}"]`)
        .forEach((s) => s.remove());
    };
  }, [city, citySameAs, path, priceFrom]);

  return null;
};

export default CityServiceSchema;
