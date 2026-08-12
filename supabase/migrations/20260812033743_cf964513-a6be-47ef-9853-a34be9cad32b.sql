CREATE TYPE public.partner_status AS ENUM ('iniciado','aguardando_analise','aprovado','ativo','vencido','suspenso');

CREATE TABLE public.partners (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  slug text NOT NULL UNIQUE,
  nome_profissional text NOT NULL,
  foto_url text,
  cidade text NOT NULL,
  estado text NOT NULL,
  regioes_atendidas text[] NOT NULL DEFAULT '{}',
  especialidades text[] NOT NULL DEFAULT '{}',
  descricao text,
  servicos text[] NOT NULL DEFAULT '{}',
  experiencia text,
  certificacoes text[] NOT NULL DEFAULT '{}',
  horario text,
  formas_atendimento text[] NOT NULL DEFAULT '{}',
  whatsapp text,
  site_url text,
  redes_sociais jsonb NOT NULL DEFAULT '{}'::jsonb,
  documento_tipo text,
  documento text,
  status public.partner_status NOT NULL DEFAULT 'aguardando_analise',
  plano_expira_em date,
  aceite_termos_em timestamp with time zone,
  notas_admin text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX partners_status_idx ON public.partners (status);
CREATE INDEX partners_local_idx ON public.partners (estado, cidade);

GRANT SELECT ON public.partners TO anon;
GRANT SELECT, INSERT, UPDATE ON public.partners TO authenticated;
GRANT ALL ON public.partners TO service_role;

ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active partners"
  ON public.partners FOR SELECT TO anon, authenticated
  USING (status = 'ativo');

CREATE POLICY "Owner can read own partner record"
  ON public.partners FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can read all partners"
  ON public.partners FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public can submit partner application"
  ON public.partners FOR INSERT TO anon, authenticated
  WITH CHECK (
    status = 'aguardando_analise'
    AND plano_expira_em IS NULL
    AND notas_admin IS NULL
    AND length(nome_profissional) BETWEEN 2 AND 120
    AND length(slug) BETWEEN 2 AND 120
    AND length(cidade) BETWEEN 2 AND 80
    AND length(estado) BETWEEN 2 AND 40
    AND (descricao IS NULL OR length(descricao) <= 4000)
    AND (experiencia IS NULL OR length(experiencia) <= 2000)
    AND (whatsapp IS NULL OR length(whatsapp) <= 20)
    AND (documento IS NULL OR length(documento) <= 20)
    AND array_length(especialidades, 1) IS DISTINCT FROM 0
  );

CREATE POLICY "Admins can update partners"
  ON public.partners FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.partners_block_privileged_self_update()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF public.has_role(auth.uid(), 'admin') THEN
    RETURN NEW;
  END IF;
  NEW.status := OLD.status;
  NEW.plano_expira_em := OLD.plano_expira_em;
  NEW.notas_admin := OLD.notas_admin;
  NEW.user_id := OLD.user_id;
  RETURN NEW;
END;
$$;

CREATE POLICY "Owner can update own partner record"
  ON public.partners FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE TRIGGER partners_guard_privileged
  BEFORE UPDATE ON public.partners
  FOR EACH ROW EXECUTE FUNCTION public.partners_block_privileged_self_update();

CREATE TRIGGER update_partners_updated_at
  BEFORE UPDATE ON public.partners
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.partner_photos (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  partner_id uuid NOT NULL REFERENCES public.partners(id) ON DELETE CASCADE,
  url text NOT NULL,
  legenda text,
  ordem smallint NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX partner_photos_partner_idx ON public.partner_photos (partner_id, ordem);

GRANT SELECT ON public.partner_photos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.partner_photos TO authenticated;
GRANT ALL ON public.partner_photos TO service_role;

ALTER TABLE public.partner_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read photos of active partners"
  ON public.partner_photos FOR SELECT TO anon, authenticated
  USING (EXISTS (SELECT 1 FROM public.partners p WHERE p.id = partner_id AND p.status = 'ativo'));

CREATE POLICY "Owner can manage own photos"
  ON public.partner_photos FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.partners p WHERE p.id = partner_id AND p.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.partners p WHERE p.id = partner_id AND p.user_id = auth.uid()));

CREATE POLICY "Admins can manage all photos"
  ON public.partner_photos FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_partner_photos_updated_at
  BEFORE UPDATE ON public.partner_photos
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.partner_program_settings (
  id boolean NOT NULL DEFAULT true PRIMARY KEY CHECK (id),
  preco_anual_centavos integer NOT NULL DEFAULT 4999,
  moeda text NOT NULL DEFAULT 'BRL',
  aceitando_cadastros boolean NOT NULL DEFAULT true,
  texto_plano text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT ON public.partner_program_settings TO anon;
GRANT SELECT ON public.partner_program_settings TO authenticated;
GRANT ALL ON public.partner_program_settings TO service_role;

ALTER TABLE public.partner_program_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read program settings"
  ON public.partner_program_settings FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can update program settings"
  ON public.partner_program_settings FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_partner_program_settings_updated_at
  BEFORE UPDATE ON public.partner_program_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.partner_program_settings (id) VALUES (true);