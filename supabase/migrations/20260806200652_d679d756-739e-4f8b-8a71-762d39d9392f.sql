ALTER TABLE public.reviews
  ADD COLUMN IF NOT EXISTS authorized_publication boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS origin_protocol text,
  ADD COLUMN IF NOT EXISTS origin_path text;

GRANT INSERT ON public.reviews TO anon;

DROP POLICY IF EXISTS "Public can submit pending reviews" ON public.reviews;
CREATE POLICY "Public can submit pending reviews"
ON public.reviews
FOR INSERT
TO anon, authenticated
WITH CHECK (
  verified = false
  AND published = false
  AND rating BETWEEN 1 AND 5
  AND length(author_name) BETWEEN 2 AND 80
  AND length(comment) BETWEEN 10 AND 1500
  AND source = 'site'
  AND (city IS NULL OR length(city) <= 80)
  AND (neighborhood IS NULL OR length(neighborhood) <= 80)
  AND (service_slug IS NULL OR length(service_slug) <= 80)
  AND (origin_protocol IS NULL OR length(origin_protocol) <= 40)
  AND (origin_path IS NULL OR length(origin_path) <= 200)
  AND author_photo_url IS NULL
  AND google_review_url IS NULL
);