CREATE OR REPLACE FUNCTION public.telemetry_guard_selftest()
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE
  v_out jsonb := '{}'::jsonb;
  v_detail text;
  v_old date := current_date - 200;
  v_com integer; v_run2 integer; v_pre integer;
  d integer; b integer; c integer;
BEGIN
  BEGIN
    INSERT INTO public.click_events (created_at, event_type, path, session_id, utm_source)
    SELECT now(), 'funnel_open', '/__selftest__', 'sess-com-' || g, NULL FROM generate_series(1,5) g;
    INSERT INTO public.click_events (created_at, event_type, path, session_id, utm_source)
    SELECT now(), 'funnel_open', '/__selftest__', 'sess-qa-' || g, 'qa' FROM generate_series(1,5) g;
    INSERT INTO public.click_events (created_at, event_type, path, session_id)
    SELECT public.telemetry_baseline_comercial() - interval '1 day', 'funnel_open', '/__selftest_pre__', 'sess-pre-' || g
    FROM generate_series(1,5) g;

    PERFORM public.consolidate_click_events(current_date);

    SELECT coalesce(sum(event_count),0) INTO v_com FROM public.click_events_daily WHERE path = '/__selftest__';
    SELECT coalesce(sum(event_count),0) INTO v_pre FROM public.click_events_daily WHERE path = '/__selftest_pre__';

    v_out := v_out || jsonb_build_object(
      'fixture_comercial_count', v_com,
      'fixture_qa_contaminou', (v_com > 5),
      'fixture_pre_baseline_count', v_pre);

    PERFORM public.consolidate_click_events(current_date);
    SELECT coalesce(sum(event_count),0) INTO v_run2 FROM public.click_events_daily WHERE path = '/__selftest__';
    SELECT count(*)::int INTO c FROM public.click_events_daily WHERE path = '/__selftest__';
    v_out := v_out || jsonb_build_object('idempotencia_run2_count', v_run2, 'idempotencia_run2_linhas', c);

    INSERT INTO public.click_events (created_at, event_type, path, session_id)
    SELECT v_old + time '10:00', 'funnel_open', '/__selftest_old__', 'sess-old-' || g
    FROM generate_series(1,6) g;
    SELECT deleted_rows, blocked_days INTO d, b FROM public.purge_click_events_raw(false);
    v_out := v_out || jsonb_build_object('failclosed_sem_consolidacao_deleted', d,
                                         'failclosed_sem_consolidacao_blocked_days', b);

    PERFORM public.consolidate_click_events(v_old);
    DELETE FROM public.telemetry_retention_runs WHERE run_type = 'purge_raw' AND dry_run;
    SELECT deleted_rows INTO d FROM public.purge_click_events_raw(false);
    SELECT count(*)::int INTO c FROM public.telemetry_retention_runs
      WHERE run_type='purge_raw' AND NOT dry_run AND outcome='blocked'
        AND details->>'reason' = 'dry-run obrigatorio ainda nao executado';
    v_out := v_out || jsonb_build_object('failclosed_sem_dryrun_deleted', d,
                                         'failclosed_sem_dryrun_blocked_logs', c);

    PERFORM public.purge_click_events_raw(true);
    SELECT deleted_rows INTO d FROM public.purge_click_events_raw(false);
    v_out := v_out || jsonb_build_object('caminho_permitido_deleted', d);

    RAISE EXCEPTION 'ROLLBACK_SELFTEST' USING DETAIL = v_out::text;
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_detail = PG_EXCEPTION_DETAIL;
    IF SQLERRM <> 'ROLLBACK_SELFTEST' THEN RAISE; END IF;
    RETURN v_detail::jsonb || jsonb_build_object('rolled_back', true);
  END;
END;
$function$;

REVOKE ALL ON FUNCTION public.telemetry_guard_selftest() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.telemetry_guard_selftest() TO service_role;