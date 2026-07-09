-- Prevent anonymous/public readers from accessing client_phone on reviews.
-- Replace anon's table-wide SELECT with column-level SELECT that omits client_phone.
-- Admins remain 'authenticated' and keep full row access via existing policies.

REVOKE SELECT ON public.reviews FROM anon;

GRANT SELECT (
  id,
  author_name,
  author_photo_url,
  rating,
  comment,
  service_slug,
  city,
  neighborhood,
  review_date,
  verified,
  published,
  source,
  google_review_url,
  service_closed_at,
  updated_at,
  created_at
) ON public.reviews TO anon;