-- Reviews: anon só pode ler colunas públicas seguras (nunca client_phone)
REVOKE ALL ON public.reviews FROM anon;
GRANT SELECT (id, author_name, author_photo_url, rating, comment, service_slug, city, neighborhood, source, google_review_url, verified, published, review_date, created_at) ON public.reviews TO anon;
GRANT INSERT (author_name, rating, comment, service_slug, city, neighborhood, source, review_date, client_phone, origin_protocol, origin_path, authorized_publication) ON public.reviews TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.reviews TO authenticated;
GRANT ALL ON public.reviews TO service_role;

-- OG validation: tabela interna, sem qualquer acesso anônimo
REVOKE ALL ON public.og_validation_status FROM anon;
GRANT SELECT ON public.og_validation_status TO authenticated;
GRANT ALL ON public.og_validation_status TO service_role;