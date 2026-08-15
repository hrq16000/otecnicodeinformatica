import { useMemo } from "react";
import { SCHEMA_SLOTS, SLOT_PRIORITY, useJsonLdSlot } from "@/lib/jsonLdSlots";
import { MODALIDADES, REGRA_CANCELAMENTO } from "@/lib/precosConfig";
import { siteConfig, absoluteUrl } from "@/lib/siteConfig";
import { AREA_SERVED } from "@/lib/localBusinessJsonLd";

/**
 * Service + OfferCatalog para /precos-e-politicas.
 * Cada modalidade comercial vira uma Offer com preço real (fonte única:
 * precosConfig). Nunca adiciona rating/review — apenas condições verificáveis.
 * O slot `faq` é preenchido por TermosConteudo (fonte única do FAQPage).
 */
const parseValor = (label: string): string | null => {
  const m = label.match(/R\$\s*([\d.]+),(\d{2})/);
  if (!m) return null;
  return `${m[1].replace(/\./g, "")}.${m[2]}`;
};

export const PrecosServiceSchema = ({ path = "/precos-e-politicas" }: { path?: string }) => {
  const schema = useMemo(() => {
    const url = absoluteUrl(path);
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: "Atendimento técnico de informática — modalidades e valores",
      description:
        "Modalidades de atendimento técnico em Curitiba e Região Metropolitana: visita de inspeção, pacote de até 2 horas e coleta com diagnóstico. Valores, condições e prazos.",
      serviceType: "Assistência técnica de informática",
      category: "Assistência Técnica de Informática",
      url,
      provider: { "@id": `${siteConfig.baseUrl}/#organization` },
      areaServed: AREA_SERVED(),
      termsOfService: url,
      offers: MODALIDADES.map((m) => {
        const price = parseValor(m.valorLabel);
        return {
          "@type": "Offer",
          name: m.titulo,
          description: `${m.resumo} Cancelamento: ${REGRA_CANCELAMENTO}`,
          priceCurrency: "BRL",
          ...(price
            ? {
                price,
                priceSpecification: {
                  "@type": "PriceSpecification",
                  minPrice: price,
                  priceCurrency: "BRL",
                  valueAddedTaxIncluded: true,
                  unitText: m.unidade,
                },
              }
            : {}),
          availability: "https://schema.org/InStock",
          url,
          seller: { "@id": `${siteConfig.baseUrl}/#organization` },
        };
      }),
    };
  }, [path]);

  useJsonLdSlot(SCHEMA_SLOTS.service, schema, SLOT_PRIORITY.page);
  return null;
};

export default PrecosServiceSchema;
