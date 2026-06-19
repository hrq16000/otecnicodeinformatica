// Edge function: aggregate-rating
// Retorna { ratingValue, reviewCount } com base em reviews verificadas+publicadas.
// Usado pelo frontend para reativar AggregateRating no JSON-LD SOMENTE quando há
// avaliações reais (>= MIN_REVIEWS). Caso contrário, retorna { enabled: false }.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const MIN_REVIEWS = 5; // política: só publica AggregateRating com >=5 reviews reais

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const serviceSlug = url.searchParams.get("service") ?? undefined;
    const city = url.searchParams.get("city") ?? undefined;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    let query = supabase
      .from("reviews")
      .select("rating", { count: "exact" })
      .eq("verified", true)
      .eq("published", true);

    if (serviceSlug) query = query.eq("service_slug", serviceSlug);
    if (city) query = query.eq("city", city);

    const { data, count, error } = await query;
    if (error) throw error;

    const reviewCount = count ?? data?.length ?? 0;

    if (reviewCount < MIN_REVIEWS) {
      return new Response(
        JSON.stringify({
          enabled: false,
          reviewCount,
          minRequired: MIN_REVIEWS,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const sum = (data ?? []).reduce((acc, r: { rating: number }) => acc + r.rating, 0);
    const ratingValue = Math.round((sum / reviewCount) * 10) / 10;

    return new Response(
      JSON.stringify({
        enabled: true,
        ratingValue,
        reviewCount,
        bestRating: 5,
        worstRating: 1,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=600",
        },
      },
    );
  } catch (err) {
    console.error("aggregate-rating error", err);
    return new Response(
      JSON.stringify({ enabled: false, error: String(err) }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
