import { useEffect } from "react";
import { validateAndInjectSchema } from "@/lib/schemaValidation";

/**
 * JSON-LD por landing de serviço: Service + Offer + FAQPage + WebPage + Speakable.
 * Usa validateAndInjectSchema (bloqueia AggregateRating com <5 reviews e injeta dateModified).
 */
const BASE_URL = "https://tecnicocuritiba.com.br";

export interface ServiceFaq {
  question: string;
  answer: string;
}

interface ServiceLandingSchemaProps {
  serviceName: string;
  description: string;
  path: string;
  priceFrom: number;
  category?: string;
  faqs: ServiceFaq[];
  /** ISO date opcional; default = build time. Atualizar quando reescrever a página. */
  dateModified?: string;
}

export const ServiceLandingSchema = ({
  serviceName,
  description,
  path,
  priceFrom,
  category = "Assistência Técnica de Informática",
  faqs,
  dateModified,
}: ServiceLandingSchemaProps) => {
  useEffect(() => {
    const url = `${BASE_URL}${path}`;
    const modified = dateModified ?? new Date().toISOString();

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: serviceName,
      description,
      category,
      serviceType: serviceName,
      url,
      provider: { "@id": `${BASE_URL}/#organization` },
      areaServed: [
        { "@type": "City", name: "Curitiba" },
        { "@type": "City", name: "São José dos Pinhais" },
        { "@type": "City", name: "Pinhais" },
        { "@type": "City", name: "Colombo" },
        { "@type": "City", name: "Araucária" },
        { "@type": "City", name: "Campo Largo" },
      ],
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
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    };

    // WebPage + Speakable — otimizado para Bing Copilot / Google AI Overviews
    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: serviceName,
      description,
      inLanguage: "pt-BR",
      isPartOf: { "@id": `${BASE_URL}/#website` },
      about: { "@id": `${BASE_URL}/#organization` },
      dateModified: modified,
      primaryImageOfPage: { "@type": "ImageObject", url: `${BASE_URL}/og-image.jpg` },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", ".tldr", "[data-speakable]"],
      },
      mainEntity: { "@id": `${url}#service` },
    };

    const ids = [
      [`service-schema-svc-${path}`, serviceSchema],
      [`service-schema-faq-${path}`, faqSchema],
      [`service-schema-page-${path}`, webPageSchema],
    ] as const;

    ids.forEach(([id, s]) => validateAndInjectSchema(id, s));

    return () => {
      ids.forEach(([id]) => document.getElementById(id)?.remove());
    };
  }, [serviceName, description, path, priceFrom, category, faqs, dateModified]);

  return null;
};

export default ServiceLandingSchema;
