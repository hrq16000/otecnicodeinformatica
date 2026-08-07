ALTER TABLE public.click_events
  ADD COLUMN IF NOT EXISTS viewport_bucket text,
  ADD COLUMN IF NOT EXISTS viewport_width integer,
  ADD COLUMN IF NOT EXISTS funnel_stage text,
  ADD COLUMN IF NOT EXISTS cta_position text,
  ADD COLUMN IF NOT EXISTS variant text;

CREATE INDEX IF NOT EXISTS click_events_path_created_idx ON public.click_events (path, created_at DESC);
CREATE INDEX IF NOT EXISTS click_events_stage_idx ON public.click_events (funnel_stage, created_at DESC);