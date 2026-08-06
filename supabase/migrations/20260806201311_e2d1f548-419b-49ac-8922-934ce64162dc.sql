ALTER TABLE public.reviews DROP CONSTRAINT IF EXISTS reviews_source_check;
ALTER TABLE public.reviews ADD CONSTRAINT reviews_source_check
  CHECK (source = ANY (ARRAY['google'::text, 'whatsapp'::text, 'manual'::text, 'site'::text]));