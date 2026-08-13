-- Defesa em profundidade: além dos GRANTs por coluna, garante que nenhuma
-- privilégio de leitura sobre colunas sensíveis sobreviva a alterações futuras.
REVOKE SELECT (documento, documento_tipo, notas_admin) ON public.partners FROM anon;
REVOKE SELECT (documento, documento_tipo, notas_admin) ON public.partners FROM authenticated;
REVOKE ALL ON public.partners FROM anon;

GRANT SELECT (
  id, slug, nome_profissional, foto_url, cidade, estado, regioes_atendidas,
  especialidades, descricao, servicos, experiencia, certificacoes, horario,
  formas_atendimento, whatsapp, site_url, redes_sociais, status, created_at, updated_at
) ON public.partners TO anon;

-- Superfície pública explícita: só colunas de perfil, só parceiros ativos.
CREATE OR REPLACE VIEW public.partners_public
WITH (security_invoker = true) AS
  SELECT id, slug, nome_profissional, foto_url, cidade, estado, regioes_atendidas,
         especialidades, descricao, servicos, experiencia, certificacoes, horario,
         formas_atendimento, whatsapp, site_url, redes_sociais, created_at, updated_at
  FROM public.partners
  WHERE status = 'ativo';

GRANT SELECT ON public.partners_public TO anon, authenticated;
GRANT ALL ON public.partners_public TO service_role;