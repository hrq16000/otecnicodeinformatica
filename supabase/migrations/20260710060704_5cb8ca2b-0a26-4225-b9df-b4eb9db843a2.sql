-- FINDING 1 (reviews.client_phone): anon is already blocked at the column-grant
-- level (has_column_privilege(anon, client_phone) = false; select=* returns 401).
-- The only remaining structural exposure is that the public-read policy also
-- targeted the `authenticated` role, which holds a table-wide/column grant that
-- includes client_phone. Scope the public-read policy to `anon` only so that:
--  * anon reads only safe columns of verified+published reviews (phone blocked by grant)
--  * a common authenticated (non-admin) user is covered ONLY by the admin has_role
--    policies -> gets 0 rows and never client_phone
--  * admins (authenticated + has_role) keep full access via the admin policies
-- No view/RPC needed; AdminReviews (admin) is unaffected.
DROP POLICY IF EXISTS "Public can read verified published reviews" ON public.reviews;
CREATE POLICY "Public can read verified published reviews"
  ON public.reviews
  FOR SELECT
  TO anon
  USING (verified = true AND published = true);

-- FINDING 2 (og_validation_status): internal SEO/OG diagnostic data was publicly
-- readable (anon select=* -> 200). The only consumer is the og-validate-cities
-- edge function, which uses the service_role key (bypasses RLS). No frontend or
-- admin panel reads this table. Remove the public read policy and revoke all
-- privileges from anon/authenticated (least privilege). service_role keeps GRANT
-- ALL and RLS bypass, so the edge function continues to insert normally. RLS
-- remains enabled with no anon/authenticated-facing policy => fully blocked.
DROP POLICY IF EXISTS "Public read og validation" ON public.og_validation_status;
REVOKE ALL ON public.og_validation_status FROM anon;
REVOKE ALL ON public.og_validation_status FROM authenticated;