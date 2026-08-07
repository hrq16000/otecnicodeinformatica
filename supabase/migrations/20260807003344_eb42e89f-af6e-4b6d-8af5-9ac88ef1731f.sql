GRANT SELECT ON public.og_validation_status TO authenticated;
GRANT ALL ON public.og_validation_status TO service_role;

CREATE POLICY "Admins can read og validation status"
  ON public.og_validation_status
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));