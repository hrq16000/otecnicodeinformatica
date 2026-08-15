-- 1) Privilégios por coluna: público e profissional nunca leem dados sensíveis.
REVOKE SELECT ON public.partners FROM anon, authenticated;
REVOKE UPDATE ON public.partners FROM authenticated;

GRANT SELECT (
  id, slug, nome_profissional, foto_url, cidade, estado, regioes_atendidas,
  especialidades, descricao, servicos, experiencia, certificacoes, horario,
  formas_atendimento, whatsapp, site_url, redes_sociais, status, created_at, updated_at
) ON public.partners TO anon, authenticated;

GRANT UPDATE (
  nome_profissional, foto_url, cidade, estado, regioes_atendidas, especialidades,
  descricao, servicos, experiencia, certificacoes, horario, formas_atendimento,
  whatsapp, site_url, redes_sociais, documento_tipo, documento
) ON public.partners TO authenticated;

-- 2) Escalada de privilégio: bloqueio explícito, com erro, em vez de silêncio.
CREATE OR REPLACE FUNCTION public.partners_block_privileged_self_update()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF public.has_role(auth.uid(), 'admin') THEN
    RETURN NEW;
  END IF;

  IF NEW.status IS DISTINCT FROM OLD.status
     OR NEW.plano_expira_em IS DISTINCT FROM OLD.plano_expira_em
     OR NEW.notas_admin IS DISTINCT FROM OLD.notas_admin
     OR NEW.user_id IS DISTINCT FROM OLD.user_id THEN
    RAISE EXCEPTION 'Alteracao de status, plano, notas administrativas ou vinculo de usuario e exclusiva de administradores';
  END IF;

  RETURN NEW;
END;
$$;

-- 3) Operações administrativas explícitas (security definer, checagem de papel).
CREATE OR REPLACE FUNCTION public.admin_list_partners()
RETURNS SETOF public.partners
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT p.* FROM public.partners p
  WHERE public.has_role(auth.uid(), 'admin')
  ORDER BY p.created_at DESC;
$$;

CREATE OR REPLACE FUNCTION public.admin_update_partner_status(
  _partner_id uuid,
  _status public.partner_status,
  _plano_expira_em date DEFAULT NULL,
  _notas_admin text DEFAULT NULL
)
RETURNS public.partners
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_row public.partners;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Somente administradores podem alterar o cadastro de parceiros';
  END IF;

  UPDATE public.partners
     SET status = _status,
         plano_expira_em = COALESCE(_plano_expira_em, plano_expira_em),
         notas_admin = COALESCE(_notas_admin, notas_admin)
   WHERE id = _partner_id
  RETURNING * INTO v_row;

  RETURN v_row;
END;
$$;

REVOKE ALL ON FUNCTION public.admin_list_partners() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.admin_update_partner_status(uuid, public.partner_status, date, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_partners() TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_update_partner_status(uuid, public.partner_status, date, text) TO authenticated;