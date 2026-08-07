REVOKE ALL ON public.click_events FROM anon;
REVOKE ALL ON public.click_events FROM authenticated;
GRANT INSERT ON public.click_events TO anon;
GRANT SELECT, INSERT ON public.click_events TO authenticated;
GRANT ALL ON public.click_events TO service_role;