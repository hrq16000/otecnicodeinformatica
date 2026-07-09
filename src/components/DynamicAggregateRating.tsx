import { useEffect } from "react";
import { useAggregateRating } from "@/hooks/useAggregateRating";

interface Props {
  itemId: string; // ex: "https://tecnico.curitiba.br/#organization"
  itemType?: string; // ex: "LocalBusiness" | "Service"
  itemName?: string;
  service?: string;
  city?: string;
}

/**
 * Injeta AggregateRating no <head> APENAS quando há >= MIN_REVIEWS
 * reviews verificadas na tabela `reviews`. Evita penalização do Google
 * por dados estruturados sem reviews reais correspondentes na página.
 *
 * Use junto com <ReviewsGrid /> renderizado na mesma página para que
 * o Google encontre as reviews visíveis associadas ao schema.
 */
export const DynamicAggregateRating = ({
  itemId,
  itemType = "LocalBusiness",
  itemName,
  service,
  city,
}: Props) => {
  const { data } = useAggregateRating({ service, city });

  useEffect(() => {
    const SCRIPT_ID = `dyn-aggregate-${itemId}`;
    document.getElementById(SCRIPT_ID)?.remove();

    if (!data?.enabled || !data.ratingValue) return;

    const schema = {
      "@context": "https://schema.org",
      "@type": itemType,
      "@id": itemId,
      ...(itemName ? { name: itemName } : {}),
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: data.ratingValue,
        reviewCount: data.reviewCount,
        bestRating: data.bestRating ?? 5,
        worstRating: data.worstRating ?? 1,
      },
    };

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.getElementById(SCRIPT_ID)?.remove();
    };
  }, [data, itemId, itemType, itemName]);

  return null;
};

export default DynamicAggregateRating;
