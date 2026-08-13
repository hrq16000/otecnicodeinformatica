-- Materializa no repositório as funções de telemetria (4E.4 / 4E.5.1) que
-- vieram do remix apenas no banco, sem histórico de migration. Definições
-- idênticas às vigentes: CREATE OR REPLACE, sem mudança de comportamento.

CREATE OR REPLACE FUNCTION public.telemetry_baseline_comercial()
 RETURNS timestamp with time zone
 LANGUAGE sql
 IMMUTABLE
 SET search_path TO 'public'
AS $function$ SELECT '2026-08-08T00:10:00Z'::timestamptz $function$;

CREATE OR REPLACE FUNCTION public.is_qa_click_event(_created_at timestamp with time zone, _utm_source text, _utm_medium text, _utm_campaign text, _session_id text)
 RETURNS boolean
 LANGUAGE sql
 IMMUTABLE
 SET search_path TO 'public'
AS $function$
  SELECT
    lower(coalesce(_utm_source, '')) IN ('teste_4d1','teste_4d','teste_4c','qa')
    OR lower(coalesce(_utm_medium, '')) IN ('qa')
    OR lower(coalesce(_utm_campaign, '')) IN ('measurement_final','measurement_cutover')
    OR _created_at < public.telemetry_baseline_comercial()
$function$;

CREATE OR REPLACE FUNCTION public.consolidate_click_events(p_until date DEFAULT (CURRENT_DATE - 1))
 RETURNS TABLE(rows_scanned integer, rows_written integer, rows_suppressed integer)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_from date;
  v_scanned integer := 0;
  v_written integer := 0;
  v_suppressed integer := 0;
  v_level integer;
BEGIN
  DROP TABLE IF EXISTS _cells;
  DROP TABLE IF EXISTS _low;

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
    event_type, path, route_type, servico, customer_type,
    funnel_stage, cta_location, attribution_channel, viewport_bucket,
    count(*)::integer AS event_count,
    false AS generalized
  FROM public.click_events
  WHERE created_at::date BETWEEN v_from AND p_until
    AND NOT public.is_qa_click_event(created_at, utm_source, utm_medium, utm_campaign, session_id)
  GROUP BY 1,2,3,4,5,6,7,8,9,10;

  SELECT coalesce(sum(event_count), 0) INTO v_scanned FROM _cells;

  FOR v_level IN 1..4 LOOP
    IF NOT EXISTS (SELECT 1 FROM _cells WHERE event_count < 5) THEN
      EXIT;
    END IF;

    CREATE TEMP TABLE _low ON COMMIT DROP AS
      SELECT * FROM _cells WHERE event_count < 5;
    DELETE FROM _cells WHERE event_count < 5;

    IF v_level = 1 THEN
      UPDATE _low SET cta_location = '(agrupado)', generalized = true WHERE true;
    ELSIF v_level = 2 THEN
      UPDATE _low SET customer_type = '(agrupado)', generalized = true WHERE true;
    ELSIF v_level = 3 THEN
      UPDATE _low SET viewport_bucket = '(agrupado)', generalized = true WHERE true;
    ELSE
      UPDATE _low SET path = '(agrupado)', route_type = coalesce(route_type, '(agrupado)'), generalized = true WHERE true;
    END IF;

    INSERT INTO _cells
    SELECT event_date, event_type, path, route_type, servico, customer_type,
           funnel_stage, cta_location, attribution_channel, viewport_bucket,
           sum(event_count)::integer, true
    FROM _low
    GROUP BY 1,2,3,4,5,6,7,8,9,10;

    DROP TABLE _low;
  END LOOP;

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
    jsonb_build_object('k', 5, 'aggregate_retention_months', 24,
                       'scope', 'comercial', 'qa_excluded_before_grouping', true,
                       'baseline_comercial', public.telemetry_baseline_comercial())
  );

  DROP TABLE IF EXISTS _cells;
  RETURN QUERY SELECT v_scanned, v_written, v_suppressed;
END;
$function$;

CREATE OR REPLACE FUNCTION public.purge_click_events_raw(p_dry_run boolean DEFAULT true)
 RETURNS TABLE(candidate_rows integer, deleted_rows integer, blocked_days integer)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_cutoff date := current_date - 90;
  v_candidates integer := 0;
  v_deleted integer := 0;
  v_blocked integer := 0;
  v_blocked_list jsonb;
BEGIN
  SELECT count(*)::integer INTO v_candidates
  FROM public.click_events WHERE created_at::date < v_cutoff;

  SELECT count(*)::integer, coalesce(jsonb_agg(d ORDER BY d), '[]'::jsonb)
    INTO v_blocked, v_blocked_list
  FROM (
    SELECT DISTINCT created_at::date AS d
    FROM public.click_events
    WHERE created_at::date < v_cutoff
      AND NOT EXISTS (
        SELECT 1 FROM public.click_events_daily a WHERE a.event_date = click_events.created_at::date
      )
      AND NOT EXISTS (
        SELECT 1 FROM public.telemetry_retention_runs r
        WHERE r.run_type = 'consolidate' AND r.outcome = 'ok' AND NOT r.dry_run
          AND r.period_start IS NOT NULL AND r.period_end IS NOT NULL
          AND click_events.created_at::date BETWEEN r.period_start AND r.period_end
      )
  ) missing;

  IF v_blocked > 0 THEN
    INSERT INTO public.telemetry_retention_runs (run_type, dry_run, period_end, rows_scanned, outcome, details)
    VALUES ('purge_raw', p_dry_run, v_cutoff, v_candidates, 'blocked',
            jsonb_build_object('reason', 'dias sem consolidacao validada', 'dias', v_blocked_list));
    RETURN QUERY SELECT v_candidates, 0, v_blocked;
    RETURN;
  END IF;

  IF p_dry_run THEN
    INSERT INTO public.telemetry_retention_runs (run_type, dry_run, period_end, rows_scanned, outcome, details)
    VALUES ('purge_raw', true, v_cutoff, v_candidates, 'dry_run',
            jsonb_build_object('raw_retention_days', 90));
    RETURN QUERY SELECT v_candidates, 0, 0;
    RETURN;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM public.telemetry_retention_runs
    WHERE run_type = 'purge_raw' AND dry_run AND outcome = 'dry_run'
  ) THEN
    INSERT INTO public.telemetry_retention_runs (run_type, dry_run, period_end, rows_scanned, outcome, details)
    VALUES ('purge_raw', false, v_cutoff, v_candidates, 'blocked',
            jsonb_build_object('reason', 'dry-run obrigatorio ainda nao executado'));
    RETURN QUERY SELECT v_candidates, 0, 0;
    RETURN;
  END IF;

  DELETE FROM public.click_events WHERE created_at::date < v_cutoff;
  GET DIAGNOSTICS v_deleted = ROW_COUNT;

  INSERT INTO public.telemetry_retention_runs (run_type, dry_run, period_end, rows_scanned, rows_deleted, outcome, details)
  VALUES ('purge_raw', false, v_cutoff, v_candidates, v_deleted, 'ok',
          jsonb_build_object('raw_retention_days', 90));

  RETURN QUERY SELECT v_candidates, v_deleted, 0;
END;
$function$;

CREATE OR REPLACE FUNCTION public.purge_click_events_aggregates(p_dry_run boolean DEFAULT true)
 RETURNS TABLE(candidate_rows integer, deleted_rows integer)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
$function$;