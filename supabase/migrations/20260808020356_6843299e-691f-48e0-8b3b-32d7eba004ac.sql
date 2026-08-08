-- ============================================================
-- RODADA 4E.4 — Governança de telemetria first-party
-- Parâmetros fechados pela decisão de 07/08/2026:
--   RAW_RETENTION_DAYS = 90
--   AGGREGATE_RETENTION_MONTHS = 24
--   LOW_COUNT_THRESHOLD (k) = 5
--   PERSIST_VIEWPORT_WIDTH = false
-- Fluxo obrigatório: RAW -> CONSOLIDAÇÃO -> VALIDAÇÃO -> EXPURGO (fail-closed)
-- ============================================================

-- 1) Agregados diários (sem session_id, sem viewport_width, sem timestamp fino)
CREATE TABLE public.click_events_daily (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_date date NOT NULL,
  event_type text NOT NULL,
  path text,
  route_type text,
  servico text,
  customer_type text,
  funnel_stage text,
  cta_location text,
  attribution_channel text,
  viewport_bucket text,
  event_count integer NOT NULL,
  generalized boolean NOT NULL DEFAULT false,
  consolidated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX click_events_daily_cell_uidx
  ON public.click_events_daily (
    event_date,
    event_type,
    coalesce(path, ''),
    coalesce(route_type, ''),
    coalesce(servico, ''),
    coalesce(customer_type, ''),
    coalesce(funnel_stage, ''),
    coalesce(cta_location, ''),
    coalesce(attribution_channel, ''),
    coalesce(viewport_bucket, '')
  );

CREATE INDEX click_events_daily_date_idx ON public.click_events_daily (event_date DESC);

GRANT SELECT ON public.click_events_daily TO authenticated;
GRANT ALL ON public.click_events_daily TO service_role;

ALTER TABLE public.click_events_daily ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admins can read aggregated click events"
  ON public.click_events_daily
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- 2) Histórico de execuções (consolidação e expurgo)
CREATE TABLE public.telemetry_retention_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  run_type text NOT NULL,
  dry_run boolean NOT NULL DEFAULT true,
  period_start date,
  period_end date,
  rows_scanned integer NOT NULL DEFAULT 0,
  rows_written integer NOT NULL DEFAULT 0,
  rows_suppressed integer NOT NULL DEFAULT 0,
  rows_deleted integer NOT NULL DEFAULT 0,
  outcome text NOT NULL,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX telemetry_retention_runs_created_idx
  ON public.telemetry_retention_runs (created_at DESC);

GRANT SELECT ON public.telemetry_retention_runs TO authenticated;
GRANT ALL ON public.telemetry_retention_runs TO service_role;

ALTER TABLE public.telemetry_retention_runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admins can read telemetry retention runs"
  ON public.telemetry_retention_runs
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- 3) Consolidação com k-anonimato mínimo (k = 5) e generalização progressiva.
--    Ordem de generalização aprovada: variant -> cta_location -> customer_type
--    -> viewport_bucket -> path. `variant` já não entra no agregado.
CREATE OR REPLACE FUNCTION public.consolidate_click_events(p_until date DEFAULT (current_date - 1))
RETURNS TABLE (rows_scanned integer, rows_written integer, rows_suppressed integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_from date;
  v_scanned integer := 0;
  v_written integer := 0;
  v_suppressed integer := 0;
  v_level integer;
BEGIN
  -- Só consolida dias já fechados que ainda não foram consolidados.
  SELECT min(created_at::date) INTO v_from
  FROM public.click_events
  WHERE created_at::date <= p_until;

  IF v_from IS NULL THEN
    INSERT INTO public.telemetry_retention_runs (run_type, dry_run, period_end, outcome, details)
    VALUES ('consolidate', false, p_until, 'noop', jsonb_build_object('reason', 'sem eventos raw no periodo'));
    RETURN QUERY SELECT 0, 0, 0;
    RETURN;
  END IF;

  CREATE TEMP TABLE _cells ON COMMIT DROP AS
  SELECT
    created_at::date AS event_date,
    event_type,
    path,
    route_type,
    servico,
    customer_type,
    funnel_stage,
    cta_location,
    attribution_channel,
    viewport_bucket,
    count(*)::integer AS event_count,
    false AS generalized
  FROM public.click_events
  WHERE created_at::date BETWEEN v_from AND p_until
  GROUP BY 1,2,3,4,5,6,7,8,9,10;

  SELECT coalesce(sum(event_count), 0) INTO v_scanned FROM _cells;

  -- Generalização progressiva: cada nível apaga a dimensão de maior
  -- granularidade e recalcula as células que ficaram abaixo de k.
  FOR v_level IN 1..4 LOOP
    IF NOT EXISTS (SELECT 1 FROM _cells WHERE event_count < 5) THEN
      EXIT;
    END IF;

    CREATE TEMP TABLE _low ON COMMIT DROP AS
      SELECT * FROM _cells WHERE event_count < 5;
    DELETE FROM _cells WHERE event_count < 5;

    IF v_level = 1 THEN
      UPDATE _low SET cta_location = '(agrupado)', generalized = true;
    ELSIF v_level = 2 THEN
      UPDATE _low SET customer_type = '(agrupado)', generalized = true;
    ELSIF v_level = 3 THEN
      UPDATE _low SET viewport_bucket = '(agrupado)', generalized = true;
    ELSE
      UPDATE _low SET path = '(agrupado)', route_type = coalesce(route_type, '(agrupado)'), generalized = true;
    END IF;

    INSERT INTO _cells
    SELECT event_date, event_type, path, route_type, servico, customer_type,
           funnel_stage, cta_location, attribution_channel, viewport_bucket,
           sum(event_count)::integer, true
    FROM _low
    GROUP BY 1,2,3,4,5,6,7,8,9,10;

    DROP TABLE _low;
  END LOOP;

  -- Células que continuam abaixo de k=5 são suprimidas do histórico.
  SELECT coalesce(sum(event_count), 0) INTO v_suppressed FROM _cells WHERE event_count < 5;
  DELETE FROM _cells WHERE event_count < 5;

  INSERT INTO public.click_events_daily (
    event_date, event_type, path, route_type, servico, customer_type,
    funnel_stage, cta_location, attribution_channel, viewport_bucket,
    event_count, generalized
  )
  SELECT event_date, event_type, path, route_type, servico, customer_type,
         funnel_stage, cta_location, attribution_channel, viewport_bucket,
         event_count, generalized
  FROM _cells
  ON CONFLICT (
    event_date, event_type, coalesce(path, ''), coalesce(route_type, ''),
    coalesce(servico, ''), coalesce(customer_type, ''), coalesce(funnel_stage, ''),
    coalesce(cta_location, ''), coalesce(attribution_channel, ''), coalesce(viewport_bucket, '')
  ) DO UPDATE SET
    event_count = EXCLUDED.event_count,
    generalized = EXCLUDED.generalized,
    consolidated_at = now();

  GET DIAGNOSTICS v_written = ROW_COUNT;

  INSERT INTO public.telemetry_retention_runs (
    run_type, dry_run, period_start, period_end,
    rows_scanned, rows_written, rows_suppressed, outcome, details
  ) VALUES (
    'consolidate', false, v_from, p_until,
    v_scanned, v_written, v_suppressed, 'ok',
    jsonb_build_object('k', 5, 'aggregate_retention_months', 24)
  );

  RETURN QUERY SELECT v_scanned, v_written, v_suppressed;
END;
$$;

-- 4) Expurgo do raw expirado (90 dias) — fail-closed: só apaga dias já
--    consolidados; qualquer dia sem agregado aborta a operação inteira.
CREATE OR REPLACE FUNCTION public.purge_click_events_raw(p_dry_run boolean DEFAULT true)
RETURNS TABLE (candidate_rows integer, deleted_rows integer, blocked_days integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_cutoff date := current_date - 90;
  v_candidates integer := 0;
  v_deleted integer := 0;
  v_blocked integer := 0;
  v_blocked_list jsonb;
BEGIN
  SELECT count(*)::integer INTO v_candidates
  FROM public.click_events
  WHERE created_at::date < v_cutoff;

  SELECT count(*)::integer, coalesce(jsonb_agg(d ORDER BY d), '[]'::jsonb)
    INTO v_blocked, v_blocked_list
  FROM (
    SELECT DISTINCT created_at::date AS d
    FROM public.click_events
    WHERE created_at::date < v_cutoff
      AND NOT EXISTS (
        SELECT 1 FROM public.click_events_daily a WHERE a.event_date = click_events.created_at::date
      )
  ) missing;

  IF v_blocked > 0 THEN
    INSERT INTO public.telemetry_retention_runs (
      run_type, dry_run, period_end, rows_scanned, outcome, details
    ) VALUES (
      'purge_raw', p_dry_run, v_cutoff, v_candidates, 'blocked',
      jsonb_build_object('reason', 'dias sem consolidacao validada', 'dias', v_blocked_list)
    );
    RETURN QUERY SELECT v_candidates, 0, v_blocked;
    RETURN;
  END IF;

  IF p_dry_run THEN
    INSERT INTO public.telemetry_retention_runs (
      run_type, dry_run, period_end, rows_scanned, outcome, details
    ) VALUES (
      'purge_raw', true, v_cutoff, v_candidates, 'dry_run',
      jsonb_build_object('raw_retention_days', 90)
    );
    RETURN QUERY SELECT v_candidates, 0, 0;
    RETURN;
  END IF;

  -- Exige um dry-run anterior bem-sucedido antes do primeiro expurgo real.
  IF NOT EXISTS (
    SELECT 1 FROM public.telemetry_retention_runs
    WHERE run_type = 'purge_raw' AND dry_run AND outcome = 'dry_run'
  ) THEN
    INSERT INTO public.telemetry_retention_runs (
      run_type, dry_run, period_end, rows_scanned, outcome, details
    ) VALUES (
      'purge_raw', false, v_cutoff, v_candidates, 'blocked',
      jsonb_build_object('reason', 'dry-run obrigatorio ainda nao executado')
    );
    RETURN QUERY SELECT v_candidates, 0, 0;
    RETURN;
  END IF;

  DELETE FROM public.click_events WHERE created_at::date < v_cutoff;
  GET DIAGNOSTICS v_deleted = ROW_COUNT;

  INSERT INTO public.telemetry_retention_runs (
    run_type, dry_run, period_end, rows_scanned, rows_deleted, outcome, details
  ) VALUES (
    'purge_raw', false, v_cutoff, v_candidates, v_deleted, 'ok',
    jsonb_build_object('raw_retention_days', 90)
  );

  RETURN QUERY SELECT v_candidates, v_deleted, 0;
END;
$$;

-- 5) Expurgo dos agregados (24 meses)
CREATE OR REPLACE FUNCTION public.purge_click_events_aggregates(p_dry_run boolean DEFAULT true)
RETURNS TABLE (candidate_rows integer, deleted_rows integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_cutoff date := (current_date - interval '24 months')::date;
  v_candidates integer := 0;
  v_deleted integer := 0;
BEGIN
  SELECT count(*)::integer INTO v_candidates
  FROM public.click_events_daily WHERE event_date < v_cutoff;

  IF p_dry_run THEN
    INSERT INTO public.telemetry_retention_runs (run_type, dry_run, period_end, rows_scanned, outcome, details)
    VALUES ('purge_aggregate', true, v_cutoff, v_candidates, 'dry_run',
            jsonb_build_object('aggregate_retention_months', 24));
    RETURN QUERY SELECT v_candidates, 0;
    RETURN;
  END IF;

  DELETE FROM public.click_events_daily WHERE event_date < v_cutoff;
  GET DIAGNOSTICS v_deleted = ROW_COUNT;

  INSERT INTO public.telemetry_retention_runs (run_type, dry_run, period_end, rows_scanned, rows_deleted, outcome, details)
  VALUES ('purge_aggregate', false, v_cutoff, v_candidates, v_deleted, 'ok',
          jsonb_build_object('aggregate_retention_months', 24));

  RETURN QUERY SELECT v_candidates, v_deleted;
END;
$$;

-- 6) Zero ampliação de grants públicos: rotinas restritas ao backend.
REVOKE ALL ON FUNCTION public.consolidate_click_events(date) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.purge_click_events_raw(boolean) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.purge_click_events_aggregates(boolean) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.consolidate_click_events(date) TO service_role;
GRANT EXECUTE ON FUNCTION public.purge_click_events_raw(boolean) TO service_role;
GRANT EXECUTE ON FUNCTION public.purge_click_events_aggregates(boolean) TO service_role;