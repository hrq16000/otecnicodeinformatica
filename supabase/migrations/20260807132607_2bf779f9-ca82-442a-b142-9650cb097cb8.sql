GRANT INSERT ON public.click_events TO anon;
GRANT INSERT, SELECT ON public.click_events TO authenticated;
GRANT ALL ON public.click_events TO service_role;