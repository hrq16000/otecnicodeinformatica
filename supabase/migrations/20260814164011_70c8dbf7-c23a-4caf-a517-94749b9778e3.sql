ALTER TABLE public.ordens_servico
  ADD COLUMN IF NOT EXISTS journey_id text,
  ADD COLUMN IF NOT EXISTS lead_id uuid REFERENCES public.funnel_submissions(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS origin_route text,
  ADD COLUMN IF NOT EXISTS city text,
  ADD COLUMN IF NOT EXISTS neighborhood_slug text,
  ADD COLUMN IF NOT EXISTS service_slug text;

CREATE INDEX IF NOT EXISTS ordens_servico_journey_id_idx ON public.ordens_servico (journey_id);
CREATE INDEX IF NOT EXISTS ordens_servico_lead_id_idx ON public.ordens_servico (lead_id);

CREATE OR REPLACE FUNCTION public.admin_link_os_lead(_protocolo text, _lead_id uuid)
RETURNS public.ordens_servico
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_lead public.funnel_submissions%ROWTYPE;
  v_os public.ordens_servico%ROWTYPE;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'not authorized';
  END IF;

  SELECT * INTO v_lead FROM public.funnel_submissions WHERE id = _lead_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'lead not found';
  END IF;

  UPDATE public.ordens_servico
     SET lead_id = v_lead.id,
         journey_id = v_lead.journey_id,
         origin_route = v_lead.origin_route,
         city = v_lead.city,
         neighborhood_slug = v_lead.neighborhood_slug,
         service_slug = v_lead.service_slug,
         updated_at = now()
   WHERE protocolo = _protocolo
   RETURNING * INTO v_os;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'ordem de servico not found';
  END IF;

  RETURN v_os;
END;
$$;

REVOKE ALL ON FUNCTION public.admin_link_os_lead(text, uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.admin_link_os_lead(text, uuid) TO authenticated;