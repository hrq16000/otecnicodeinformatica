ALTER TABLE public.click_events
  ADD COLUMN IF NOT EXISTS route_type text,
  ADD COLUMN IF NOT EXISTS utm_source text,
  ADD COLUMN IF NOT EXISTS utm_medium text,
  ADD COLUMN IF NOT EXISTS utm_campaign text;

CREATE INDEX IF NOT EXISTS click_events_created_at_idx ON public.click_events (created_at DESC);
CREATE INDEX IF NOT EXISTS click_events_route_type_idx ON public.click_events (route_type);
CREATE INDEX IF NOT EXISTS click_events_utm_campaign_idx ON public.click_events (utm_campaign);