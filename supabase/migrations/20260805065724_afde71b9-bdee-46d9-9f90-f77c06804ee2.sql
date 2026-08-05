ALTER TABLE public.click_events ADD COLUMN IF NOT EXISTS customer_type text;

ALTER TABLE public.click_events DROP CONSTRAINT IF EXISTS click_events_customer_type_check;
ALTER TABLE public.click_events ADD CONSTRAINT click_events_customer_type_check
  CHECK (customer_type IS NULL OR customer_type IN ('residential','business','unknown'));

CREATE INDEX IF NOT EXISTS click_events_customer_type_created_at_idx
  ON public.click_events (customer_type, created_at DESC);