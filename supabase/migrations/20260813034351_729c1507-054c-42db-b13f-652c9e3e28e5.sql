DROP VIEW IF EXISTS public.partners_admin_view;
DROP VIEW IF EXISTS public.reviews_admin_view;

-- Acesso administrativo aos campos sensíveis via função com verificação explícita de papel.
CREATE OR REPLACE FUNCTION public.admin_list_reviews()
RETURNS SETOF public.reviews
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT r.* FROM public.reviews r
  WHERE public.has_role(auth.uid(), 'admin')
  ORDER BY r.created_at DESC;
$$;

REVOKE ALL ON FUNCTION public.admin_list_reviews() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_reviews() TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_list_partners()
RETURNS SETOF public.partners
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT p.* FROM public.partners p
  WHERE public.has_role(auth.uid(), 'admin')
  ORDER BY p.created_at DESC;
$$;

REVOKE ALL ON FUNCTION public.admin_list_partners() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_partners() TO authenticated;