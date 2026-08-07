-- 1) Auditoria das consultas públicas de OS: rota, resultado e latência.
ALTER TABLE public.os_lookup_attempts
  ADD COLUMN IF NOT EXISTS path text,
  ADD COLUMN IF NOT EXISTS outcome text,
  ADD COLUMN IF NOT EXISTS latency_ms integer;

CREATE INDEX IF NOT EXISTS os_lookup_attempts_created_at_idx
  ON public.os_lookup_attempts (created_at DESC);

-- 2) Códigos de confirmação para liberar fotos e sintomas.
CREATE TABLE IF NOT EXISTS public.os_verification_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  telefone_hash text NOT NULL,
  ip_hash text NOT NULL,
  code_hash text NOT NULL,
  expires_at timestamptz NOT NULL,
  attempts smallint NOT NULL DEFAULT 0,
  consumed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.os_verification_codes TO service_role;
GRANT SELECT ON public.os_verification_codes TO authenticated;

ALTER TABLE public.os_verification_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read verification codes"
  ON public.os_verification_codes
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX IF NOT EXISTS os_verification_codes_lookup_idx
  ON public.os_verification_codes (telefone_hash, created_at DESC);