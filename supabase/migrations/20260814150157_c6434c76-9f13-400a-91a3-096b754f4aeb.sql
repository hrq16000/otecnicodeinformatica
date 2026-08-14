ALTER TABLE public.click_events
  ADD COLUMN IF NOT EXISTS route_family text,
  ADD COLUMN IF NOT EXISTS intent text,
  ADD COLUMN IF NOT EXISTS neighborhood_slug text,
  ADD COLUMN IF NOT EXISTS journey_id text,
  ADD COLUMN IF NOT EXISTS event_id text,
  ADD COLUMN IF NOT EXISTS landing_route text;

CREATE UNIQUE INDEX IF NOT EXISTS click_events_event_id_uidx
  ON public.click_events (event_id) WHERE event_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS click_events_route_family_idx
  ON public.click_events (route_family, created_at DESC);