CREATE TABLE public.consent_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text,
  analytics boolean NOT NULL,
  ads boolean NOT NULL,
  policy_version text,
  path text,
  source text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX consent_events_created_at_idx ON public.consent_events (created_at DESC);

GRANT INSERT ON public.consent_events TO anon, authenticated;
GRANT SELECT ON public.consent_events TO authenticated;
GRANT ALL ON public.consent_events TO service_role;

ALTER TABLE public.consent_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can record consent"
  ON public.consent_events
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "admins can read consent events"
  ON public.consent_events
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));