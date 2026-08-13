-- 1) partners: remove exposição de documento/documento_tipo/notas_admin a leitores públicos
REVOKE SELECT ON public.partners FROM anon;
REVOKE SELECT ON public.partners FROM authenticated;

GRANT SELECT (
  id, slug, nome_profissional, foto_url, cidade, estado, regioes_atendidas,
  especialidades, descricao, servicos, experiencia, certificacoes, horario,
  formas_atendimento, whatsapp, site_url, redes_sociais, status, created_at, updated_at
) ON public.partners TO anon;

GRANT SELECT (
  id, user_id, slug, nome_profissional, foto_url, cidade, estado, regioes_atendidas,
  especialidades, descricao, servicos, experiencia, certificacoes, horario,
  formas_atendimento, whatsapp, site_url, redes_sociais, status, plano_expira_em,
  aceite_termos_em, created_at, updated_at
) ON public.partners TO authenticated;

-- Admin continua com acesso completo por view SECURITY DEFINER
CREATE OR REPLACE VIEW public.partners_admin_view AS
  SELECT * FROM public.partners WHERE public.has_role(auth.uid(), 'admin');
GRANT SELECT ON public.partners_admin_view TO authenticated;
GRANT ALL ON public.partners_admin_view TO service_role;

-- 2) partners: impedir auto-aprovação também na própria policy (defesa em profundidade além do trigger)
DROP POLICY IF EXISTS "Owner can update own partner record" ON public.partners;
CREATE POLICY "Owner can update own partner record"
  ON public.partners FOR UPDATE TO authenticated
  USING (user_id = auth.uid() AND NOT public.has_role(auth.uid(), 'admin'))
  WITH CHECK (
    user_id = auth.uid()
    AND status = (SELECT p.status FROM public.partners p WHERE p.id = partners.id)
    AND plano_expira_em IS NOT DISTINCT FROM (SELECT p.plano_expira_em FROM public.partners p WHERE p.id = partners.id)
    AND notas_admin IS NOT DISTINCT FROM (SELECT p.notas_admin FROM public.partners p WHERE p.id = partners.id)
  );

-- 3) reviews: telefone do cliente nunca sai para leitura pública/autenticada comum
REVOKE SELECT ON public.reviews FROM authenticated;
GRANT SELECT (
  id, author_name, author_photo_url, rating, comment, service_slug, city, neighborhood,
  source, google_review_url, verified, published, review_date, created_at
) ON public.reviews TO authenticated;

CREATE OR REPLACE VIEW public.reviews_admin_view AS
  SELECT * FROM public.reviews WHERE public.has_role(auth.uid(), 'admin');
GRANT SELECT ON public.reviews_admin_view TO authenticated;
GRANT ALL ON public.reviews_admin_view TO service_role;