import { useEffect } from "react";

/**
 * Injeta JSON-LD por página: Service + Offer (R$ a partir de) + FAQPage,
 * referenciando o LocalBusiness sitewide (#organization). Use em todas as
 * landings de serviço para rich results (Serviço + Perguntas Frequentes).
 */
const BASE_URL = "https://tecnicocuritiba.com.br";

export interface ServiceFaq {
  question: string;
  answer: string;
}

interface ServiceLandingSchemaProps {
  /** Nome curto do serviço — ex.: "Formatação de Computador" */
  serviceName: string;
  /** Descrição do serviço (1-2 frases). */
  description: string;
  /** Path relativo da landing — ex.: "/servicos/formatacao-computador" */
  path: string;
  /** Preço mínimo em BRL (sem símbolo). Ex.: 99.99 */
  priceFrom: number;
  /** Categoria do serviço — opcional, padrão "Assistência Técnica de Informática" */
  category?: string;
  /** Lista de perguntas frequentes (mín. 3 para rich results) */
  faqs: ServiceFaq[];
}

export const ServiceLandingSchema = ({
  serviceName,
  description,
  path,
  priceFrom,
  category = "Assistência Técnica de Informática",
  faqs,
}: ServiceLandingSchemaProps) => {
  useEffect(() => {
    const url = `${BASE_URL}${path}`;

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
      // AggregateRating removido: só pode ser reinjetado quando houver
      // reviews verificadas (Google/Supabase). Dados fake violam a política
      // de Rich Results do Google e podem gerar manual action.
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

    const marker = `service-schema-${path}`;
    document
      .querySelectorAll(`script[data-service-schema="${marker}"]`)
      .forEach((s) => s.remove());

    const make = (data: unknown) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.setAttribute("data-service-schema", marker);
      s.text = JSON.stringify(data);
      document.head.appendChild(s);
    };
    make(serviceSchema);
    if (faqs.length) make(faqSchema);

    return () => {
      document
        .querySelectorAll(`script[data-service-schema="${marker}"]`)
        .forEach((s) => s.remove());
    };
  }, [serviceName, description, path, priceFrom, category, faqs]);

  return null;
};

export default ServiceLandingSchema;
