-- Vitrines voltam a respeitar RLS de quem consulta (evita views SECURITY DEFINER)
ALTER VIEW public.partners_public SET (security_invoker = true);
ALTER VIEW public.reviews_public SET (security_invoker = true);

-- Políticas públicas restauradas nas tabelas base (necessárias para as vitrines)
CREATE POLICY "Public can read active partners"
  ON public.partners FOR SELECT TO anon, authenticated
  USING (status = 'ativo'::partner_status);

CREATE POLICY "Public can read verified published reviews"
  ON public.reviews FOR SELECT TO anon
  USING (verified = true AND published = true);

-- Acesso do público limitado, coluna a coluna, aos campos não sensíveis
GRANT SELECT (
  id, slug, nome_profissional, foto_url, cidade, estado, regioes_atendidas,
  especialidades, descricao, servicos, experiencia, certificacoes, horario,
  formas_atendimento, whatsapp, site_url, redes_sociais, created_at, updated_at
) ON public.partners TO anon;

GRANT SELECT (
  id, author_name, author_photo_url, rating, comment, service_slug, city,
  neighborhood, source, google_review_url, verified, published, review_date, created_at
) ON public.reviews TO anon;

REVOKE SELECT (documento, documento_tipo, notas_admin, plano_expira_em, user_id, status)
  ON public.partners FROM anon, authenticated;
REVOKE SELECT (client_phone, origin_protocol, origin_path, authorized_publication, service_closed_at)
  ON public.reviews FROM anon;