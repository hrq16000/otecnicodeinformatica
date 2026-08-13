-- 1) Partners: remove sensitive/internal columns from public + generic authenticated reads
REVOKE SELECT (documento, documento_tipo, notas_admin, plano_expira_em, user_id, status)
  ON public.partners FROM anon, authenticated;

-- 2) Reviews: remove internal/PII columns from public reads
REVOKE SELECT (client_phone, origin_protocol, origin_path, authorized_publication, service_closed_at)
  ON public.reviews FROM anon, authenticated;

-- 3) SECURITY DEFINER functions no longer executable by signed-in users
REVOKE EXECUTE ON FUNCTION public.admin_list_partners() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.admin_update_partner_status(uuid, partner_status, date, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_list_partners() TO service_role;
GRANT EXECUTE ON FUNCTION public.admin_update_partner_status(uuid, partner_status, date, text) TO service_role;

-- admin_list_reviews stays callable by the admin UI, but as SECURITY INVOKER so RLS applies
CREATE OR REPLACE FUNCTION public.admin_list_reviews()
RETURNS SETOF public.reviews
LANGUAGE plpgsql
STABLE
SECURITY INVOKER
SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Acesso restrito a administradores';
  END IF;
  RETURN QUERY SELECT r.* FROM public.reviews r ORDER BY r.created_at DESC;
END;
$function$;
REVOKE EXECUTE ON FUNCTION public.admin_list_reviews() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_reviews() TO authenticated, service_role;