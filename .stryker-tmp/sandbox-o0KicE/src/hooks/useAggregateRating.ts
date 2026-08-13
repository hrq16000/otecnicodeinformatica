// @ts-nocheck
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface AggregateRatingData {
  enabled: boolean;
  ratingValue?: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
  minRequired?: number;
}

interface Options {
  service?: string;
  city?: string;
  neighborhood?: string;
}

/**
 * Consome a edge function `aggregate-rating` e retorna dados para
 * exibir nota média + ativar AggregateRating dinâmico no JSON-LD.
 * Só retorna enabled=true quando há >= MIN_REVIEWS reviews verificadas.
 */
export function useAggregateRating(opts: Options = {}) {
  const [data, setData] = useState<AggregateRatingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const params = new URLSearchParams();
        if (opts.service) params.set("service", opts.service);
        if (opts.city) params.set("city", opts.city);
        const { data: res, error } = await supabase.functions.invoke(
          `aggregate-rating?${params.toString()}`,
          { method: "GET" },
        );
        if (error) throw error;
        if (!cancelled) setData(res as AggregateRatingData);
      } catch {
        if (!cancelled) setData({ enabled: false, reviewCount: 0 });
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [opts.service, opts.city, opts.neighborhood]);

  return { data, loading };
}
