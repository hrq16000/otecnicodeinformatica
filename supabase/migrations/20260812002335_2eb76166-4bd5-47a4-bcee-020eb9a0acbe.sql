-- As rotinas de telemetria só são chamadas pela função de manutenção com a
-- credencial de serviço. Nenhum visitante ou usuário logado deve executá-las.
REVOKE EXECUTE ON FUNCTION public.consolidate_click_events(date) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.purge_click_events_raw(boolean) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.purge_click_events_aggregates(boolean) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.telemetry_guard_selftest() FROM anon, authenticated, public;

GRANT EXECUTE ON FUNCTION public.consolidate_click_events(date) TO service_role;
GRANT EXECUTE ON FUNCTION public.purge_click_events_raw(boolean) TO service_role;
GRANT EXECUTE ON FUNCTION public.purge_click_events_aggregates(boolean) TO service_role;
GRANT EXECUTE ON FUNCTION public.telemetry_guard_selftest() TO service_role;