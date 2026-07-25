
CREATE TABLE public.click_events (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  event_type text NOT NULL CHECK (event_type IN ('wa_click','call_click')),
  servico text,
  bairro text,
  cidade text,
  cta_location text,
  modalidade text,
  equipamento text,
  problema text,
  session_id text,
  path text
);

CREATE INDEX click_events_created_at_idx ON public.click_events (created_at DESC);
CREATE INDEX click_events_bairro_servico_idx ON public.click_events (bairro, servico);

GRANT INSERT ON public.click_events TO anon, authenticated;
GRANT SELECT ON public.click_events TO authenticated;
GRANT ALL ON public.click_events TO service_role;

ALTER TABLE public.click_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can insert click events"
  ON public.click_events
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "admins can read click events"
  ON public.click_events
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
