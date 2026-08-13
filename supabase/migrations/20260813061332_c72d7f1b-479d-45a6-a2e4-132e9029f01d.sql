-- ── Parceiros: privilégios por coluna (documento e notas_admin fora do alcance) ──
REVOKE ALL ON public.partners FROM authenticated;
REVOKE ALL ON public.partners FROM anon;

GRANT SELECT (
  id, user_id, slug, nome_profissional, foto_url, cidade, estado,
  regioes_atendidas, especialidades, descricao, servicos, experiencia,
  certificacoes, horario, formas_atendimento, whatsapp, site_url,
  redes_sociais, documento_tipo, status, plano_expira_em, aceite_termos_em,
  created_at, updated_at
) ON public.partners TO authenticated;

GRANT UPDATE (
  slug, nome_profissional, foto_url, cidade, estado, regioes_atendidas,
  especialidades, descricao, servicos, experiencia, certificacoes, horario,
  formas_atendimento, whatsapp, site_url, redes_sociais, documento_tipo,
  documento, aceite_termos_em, updated_at
) ON public.partners TO authenticated;

GRANT INSERT ON public.partners TO authenticated;
GRANT INSERT ON public.partners TO anon;
GRANT ALL ON public.partners TO service_role;

-- ── Vitrine pública: somente leitura ──
REVOKE ALL ON public.partners_public FROM anon, authenticated;
GRANT SELECT ON public.partners_public TO anon, authenticated;
GRANT SELECT ON public.partners_public TO service_role;

-- ── Fotos de parceiros ──
REVOKE ALL ON public.partner_photos FROM anon;
GRANT SELECT ON public.partner_photos TO anon;
REVOKE ALL ON public.partner_photos FROM authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.partner_photos TO authenticated;
GRANT ALL ON public.partner_photos TO service_role;

-- ── Telemetria de cliques: anon só insere; logado insere e (se admin) lê ──
REVOKE ALL ON public.click_events FROM anon;
GRANT INSERT ON public.click_events TO anon;
REVOKE ALL ON public.click_events FROM authenticated;
GRANT SELECT, INSERT ON public.click_events TO authenticated;
GRANT ALL ON public.click_events TO service_role;

-- ── Funções administrativas: fail-closed explícito ──
CREATE OR REPLACE FUNCTION public.admin_list_partners()
RETURNS SETOF public.partners
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Acesso restrito a administradores';
  END IF;
  RETURN QUERY SELECT p.* FROM public.partners p ORDER BY p.created_at DESC;
END;
$function$;

CREATE OR REPLACE FUNCTION public.admin_list_reviews()
RETURNS SETOF public.reviews
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Acesso restrito a administradores';
  END IF;
  RETURN QUERY SELECT r.* FROM public.reviews r ORDER BY r.created_at DESC;
END;
$function$;

REVOKE ALL ON FUNCTION public.admin_list_partners() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.admin_list_reviews() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.admin_update_partner_status(uuid, public.partner_status, date, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_partners() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.admin_list_reviews() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.admin_update_partner_status(uuid, public.partner_status, date, text) TO authenticated, service_role;