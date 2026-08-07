ALTER TABLE public.os_verification_codes
  ADD COLUMN IF NOT EXISTS code_plain text,
  ADD COLUMN IF NOT EXISTS telefone_masked text;