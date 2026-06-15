DROP POLICY "Anyone can insert funnel submissions" ON public.funnel_submissions;

CREATE POLICY "Public can insert validated funnel submissions"
ON public.funnel_submissions FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(session_id) BETWEEN 6 AND 64
  AND (wa_message IS NULL OR length(wa_message) <= 4000)
  AND (equipamento IS NULL OR length(equipamento) <= 80)
  AND (marca IS NULL OR length(marca) <= 120)
  AND (sintoma IS NULL OR length(sintoma) <= 120)
  AND jsonb_array_length(media_paths) <= 10
);