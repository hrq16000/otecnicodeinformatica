ALTER TABLE public.funnel_submissions
  ADD COLUMN IF NOT EXISTS origin_route text,
  ADD COLUMN IF NOT EXISTS route_family text,
  ADD COLUMN IF NOT EXISTS city text,
  ADD COLUMN IF NOT EXISTS neighborhood_slug text,
  ADD COLUMN IF NOT EXISTS service_slug text,
  ADD COLUMN IF NOT EXISTS journey_id text,
  ADD COLUMN IF NOT EXISTS landing_route text;

CREATE INDEX IF NOT EXISTS funnel_submissions_origin_route_idx ON public.funnel_submissions (origin_route);
CREATE INDEX IF NOT EXISTS funnel_submissions_city_idx ON public.funnel_submissions (city);