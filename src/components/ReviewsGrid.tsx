import { useEffect, useState } from "react";
import { Star, MessageCircle, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAggregateRating } from "@/hooks/useAggregateRating";
import { Button } from "@/components/ui/button";

interface Review {
  id: string;
  author_name: string;
  author_photo_url: string | null;
  rating: number;
  comment: string | null;
  service_slug: string | null;
  city: string | null;
  neighborhood: string | null;
  review_date: string | null;
}

interface ReviewsGridProps {
  filter?: {
    service?: string;
    city?: string;
    neighborhood?: string;
  };
  limit?: number;
  showAverage?: boolean;
  title?: string;
  whatsappCta?: boolean;
}

const WHATSAPP_NUMBER = "5541997452053";

export const ReviewsGrid = ({
  filter = {},
  limit = 6,
  showAverage = true,
  title = "Avaliações de clientes reais",
  whatsappCta = true,
}: ReviewsGridProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: agg } = useAggregateRating({
    service: filter.service,
    city: filter.city,
    neighborhood: filter.neighborhood,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      let q = supabase
        .from("reviews")
        .select(
          "id, author_name, author_photo_url, rating, comment, service_slug, city, neighborhood, review_date",
        )
        .eq("verified", true)
        .eq("published", true)
        .order("review_date", { ascending: false })
        .limit(limit);
      if (filter.service) q = q.eq("service_slug", filter.service);
      if (filter.city) q = q.eq("city", filter.city);
      if (filter.neighborhood) q = q.eq("neighborhood", filter.neighborhood);
      const { data } = await q;
      if (!cancelled) {
        setReviews((data as Review[]) ?? []);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [filter.service, filter.city, filter.neighborhood, limit]);

  if (!loading && reviews.length === 0) {
    return null; // fallback silencioso, evita schema vazio
  }

  const whatsappMsg = encodeURIComponent(
    `Olá! Vi as avaliações no site e gostaria de um orçamento${
      filter.neighborhood ? ` em ${filter.neighborhood}` : ""
    }.`,
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`;

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
            {title}
          </h2>
          {showAverage && agg?.enabled && (
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    className={`w-5 h-5 ${
                      n <= Math.round(agg.ratingValue ?? 0)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold text-foreground">
                {agg.ratingValue?.toFixed(1)}
              </span>
              <span>· {agg.reviewCount} avaliações verificadas</span>
            </div>
          )}
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-40 rounded-xl bg-muted/40 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.map((r) => (
              <article
                key={r.id}
                className="rounded-xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  {r.author_photo_url ? (
                    <img
                      src={r.author_photo_url}
                      alt={r.author_name}
                      loading="lazy"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                      {r.author_name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="font-semibold text-foreground flex items-center gap-1">
                      {r.author_name}
                      <ShieldCheck className="w-4 h-4 text-green-600" aria-label="Verificado" />
                    </div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star
                          key={n}
                          className={`w-4 h-4 ${
                            n <= r.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                {r.comment && (
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    "{r.comment}"
                  </p>
                )}
                <div className="text-xs text-muted-foreground flex items-center justify-between">
                  <span>
                    {r.neighborhood ? `${r.neighborhood} · ` : ""}
                    {r.city ?? "Curitiba"}
                  </span>
                  {r.review_date && (
                    <time dateTime={r.review_date}>
                      {new Date(r.review_date).toLocaleDateString("pt-BR")}
                    </time>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {whatsappCta && (
          <div className="text-center mt-8">
            <Button asChild size="lg" className="gap-2">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
                Quero o mesmo atendimento pelo WhatsApp
              </a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewsGrid;
