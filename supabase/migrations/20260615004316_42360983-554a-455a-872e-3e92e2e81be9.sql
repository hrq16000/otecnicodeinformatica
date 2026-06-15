-- Extensions
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Table
CREATE TABLE IF NOT EXISTS public.og_validation_status (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city_slug text NOT NULL,
  url text NOT NULL,
  og_image text,
  og_title text,
  og_description text,
  canonical text,
  http_status int,
  fb_status text,
  fb_error text,
  linkedin_status text,
  linkedin_error text,
  raw jsonb,
  checked_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS og_validation_status_city_slug_checked_at_idx
  ON public.og_validation_status (city_slug, checked_at DESC);

GRANT SELECT ON public.og_validation_status TO anon, authenticated;
GRANT ALL ON public.og_validation_status TO service_role;

ALTER TABLE public.og_validation_status ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read og validation" ON public.og_validation_status;
CREATE POLICY "Public read og validation"
  ON public.og_validation_status FOR SELECT
  USING (true);

-- Weekly cron — Monday 03:00 UTC
SELECT cron.unschedule('og-validate-cities-weekly')
WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'og-validate-cities-weekly');

SELECT cron.schedule(
  'og-validate-cities-weekly',
  '0 3 * * 1',
  $$
  SELECT net.http_post(
    url:='https://fvleuzkxsykltjbknrmh.supabase.co/functions/v1/og-validate-cities',
    headers:='{"Content-Type":"application/json","apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2bGV1emt4c3lrbHRqYmtucm1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3NzgwNDQsImV4cCI6MjA4NDM1NDA0NH0.mG3A3rdbIJ-5couORXyGxDmySsShmNvVwR8D7l4L8BA"}'::jsonb,
    body:='{"source":"cron"}'::jsonb
  ) AS request_id;
  $$
);