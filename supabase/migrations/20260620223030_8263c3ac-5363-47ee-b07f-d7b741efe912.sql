ALTER TABLE public.reviews
  ADD COLUMN IF NOT EXISTS client_phone TEXT,
  ADD COLUMN IF NOT EXISTS service_closed_at TIMESTAMPTZ;

COMMENT ON COLUMN public.reviews.client_phone IS 'Telefone do cliente em E.164 ou só dígitos (ex: 5541999999999). Usado para disparar wa.me de pedido de review.';
COMMENT ON COLUMN public.reviews.service_closed_at IS 'Momento em que o atendimento foi fechado. Base para janelas T+24h / T+72h.';

CREATE INDEX IF NOT EXISTS idx_reviews_service_closed_at
  ON public.reviews (service_closed_at)
  WHERE service_closed_at IS NOT NULL;