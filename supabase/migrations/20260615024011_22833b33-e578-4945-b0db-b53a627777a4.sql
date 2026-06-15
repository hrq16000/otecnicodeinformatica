CREATE TABLE public.funnel_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  equipamento text,
  marca text,
  sintoma text,
  requires_coleta boolean NOT NULL DEFAULT false,
  media_paths jsonb NOT NULL DEFAULT '[]'::jsonb,
  wa_message text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  gclid text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.funnel_submissions TO anon, authenticated;
GRANT ALL ON public.funnel_submissions TO service_role;

ALTER TABLE public.funnel_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert funnel submissions"
ON public.funnel_submissions FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE INDEX idx_funnel_submissions_created ON public.funnel_submissions (created_at DESC);