-- 1) PARCEIROS: leitura pública apenas via vitrine sem documento/dados internos
ALTER VIEW public.partners_public SET (security_invoker = false);
GRANT SELECT ON public.partners_public TO anon, authenticated;

DROP POLICY IF EXISTS "Public can read active partners" ON public.partners;
REVOKE SELECT ON public.partners FROM anon;

-- 2) AVALIAÇÕES: vitrine pública sem client_phone / origin_protocol / origin_path
CREATE OR REPLACE VIEW public.reviews_public AS
SELECT
  id,
  author_name,
  author_photo_url,
  rating,
  comment,
  service_slug,
  city,
  neighborhood,
  source,
  google_review_url,
  review_date,
  created_at
FROM public.reviews
WHERE verified = true AND published = true;

ALTER VIEW public.reviews_public SET (security_invoker = false);
GRANT SELECT ON public.reviews_public TO anon, authenticated;
GRANT ALL ON public.reviews_public TO service_role;

DROP POLICY IF EXISTS "Public can read verified published reviews" ON public.reviews;
REVOKE SELECT ON public.reviews FROM anon;