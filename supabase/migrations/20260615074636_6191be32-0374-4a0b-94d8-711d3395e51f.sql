
-- 1. Enum de papéis
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 2. Tabela user_roles (separada de profiles — segurança)
CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read their own roles" ON public.user_roles;
CREATE POLICY "Users can read their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- 3. Função has_role (security definer, evita recursão de RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- 4. Colunas administrativas em funnel_submissions
ALTER TABLE public.funnel_submissions
  ADD COLUMN IF NOT EXISTS status_atendimento text NOT NULL DEFAULT 'novo',
  ADD COLUMN IF NOT EXISTS notas_admin text,
  ADD COLUMN IF NOT EXISTS atendido_em timestamptz,
  ADD COLUMN IF NOT EXISTS atendido_por uuid REFERENCES auth.users(id);

-- Constraint de valores permitidos
DO $$ BEGIN
  ALTER TABLE public.funnel_submissions
    ADD CONSTRAINT funnel_submissions_status_chk
    CHECK (status_atendimento IN ('novo','contatado','agendado','fechado','perdido'));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE INDEX IF NOT EXISTS funnel_submissions_status_idx
  ON public.funnel_submissions (status_atendimento, created_at DESC);
CREATE INDEX IF NOT EXISTS funnel_submissions_created_at_idx
  ON public.funnel_submissions (created_at DESC);

-- 5. Policies admin em funnel_submissions
GRANT SELECT, UPDATE ON public.funnel_submissions TO authenticated;

DROP POLICY IF EXISTS "Admins can read all submissions" ON public.funnel_submissions;
CREATE POLICY "Admins can read all submissions"
  ON public.funnel_submissions FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update submissions" ON public.funnel_submissions;
CREATE POLICY "Admins can update submissions"
  ON public.funnel_submissions FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 6. Storage policies para o bucket funnel-uploads (admin read)
DROP POLICY IF EXISTS "Admins can read funnel uploads" ON storage.objects;
CREATE POLICY "Admins can read funnel uploads"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'funnel-uploads' AND public.has_role(auth.uid(), 'admin'));
