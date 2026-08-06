CREATE TABLE public.ordens_servico (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  protocolo text NOT NULL UNIQUE,
  cliente_nome text,
  telefone text NOT NULL,
  equipamento text,
  marca_modelo text,
  sintomas text,
  fotos jsonb NOT NULL DEFAULT '[]'::jsonb,
  modalidade text,
  status text NOT NULL DEFAULT 'aberta',
  etapas jsonb NOT NULL DEFAULT '[]'::jsonb,
  previsao_conclusao timestamptz,
  observacoes_publicas text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_ordens_servico_telefone ON public.ordens_servico (telefone);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.ordens_servico TO authenticated;
GRANT ALL ON public.ordens_servico TO service_role;

ALTER TABLE public.ordens_servico ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read ordens" ON public.ordens_servico FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can insert ordens" ON public.ordens_servico FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update ordens" ON public.ordens_servico FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete ordens" ON public.ordens_servico FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_ordens_servico_updated_at BEFORE UPDATE ON public.ordens_servico FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.os_lookup_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_hash text NOT NULL,
  telefone_hash text NOT NULL,
  found boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_os_lookup_attempts_ip ON public.os_lookup_attempts (ip_hash, created_at DESC);
CREATE INDEX idx_os_lookup_attempts_tel ON public.os_lookup_attempts (telefone_hash, created_at DESC);

GRANT ALL ON public.os_lookup_attempts TO service_role;

ALTER TABLE public.os_lookup_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read lookup attempts" ON public.os_lookup_attempts FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));