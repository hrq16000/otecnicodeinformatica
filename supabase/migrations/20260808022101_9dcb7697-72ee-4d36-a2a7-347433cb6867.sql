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
    jsonb_build_object('k', 5, 'aggregate_retention_months', 24)
  );

  RETURN QUERY SELECT v_scanned, v_written, v_suppressed;
END;
$function$;

REVOKE ALL ON public.click_events_daily FROM anon;
REVOKE ALL ON public.click_events_daily FROM authenticated;
REVOKE ALL ON public.telemetry_retention_runs FROM anon;
REVOKE ALL ON public.telemetry_retention_runs FROM authenticated;

GRANT SELECT ON public.click_events_daily TO authenticated;
GRANT SELECT ON public.telemetry_retention_runs TO authenticated;
GRANT ALL ON public.click_events_daily TO service_role;
GRANT ALL ON public.telemetry_retention_runs TO service_role;