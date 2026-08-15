# RLS & Role-Permission Audit

Last reviewed: 2026-06-22

All four tables in the `public` schema have RLS enabled and follow least-privilege:

| Table | RLS | anon | authenticated | service_role | Policies |
| --- | --- | --- | --- | --- | --- |
| `funnel_submissions` | ✅ | INSERT (validated) | INSERT + admin SELECT/UPDATE via `has_role` | full | 3 |
| `reviews` | ✅ | SELECT only where `verified=true AND published=true` | admin-only INSERT/UPDATE/DELETE/SELECT via `has_role` | full | 5 |
| `user_roles` | ✅ | — | SELECT own row only (`user_id = auth.uid()`) | full (admin writes) | 1 |
| `og_validation_status` | ✅ | SELECT (public OG/SEO metadata only) | SELECT | full | 1 |

## Function hardening

- `public.has_role(uuid, app_role)` is `SECURITY INVOKER` with `search_path = public`.
- `EXECUTE` revoked from `PUBLIC` and `anon`; granted only to `authenticated` and `service_role`.
- Works inside RLS because the `user_roles` self-read policy lets the invoker see their own admin row.

## Public INSERT validation (funnel)

The public INSERT policy on `funnel_submissions` enforces server-side length checks (session_id 6–64, wa_message ≤ 4000, equipamento ≤ 80, marca ≤ 120, sintoma ≤ 120) and `jsonb_array_length(media_paths) ≤ 10`. CAPTCHA/rate-limiting is intentionally deferred — abuse risk is low because submissions are admin-only readable.

## Sensitive fields

- `reviews.client_phone`: admin-only by RLS; never selected by the public client; public SELECT policy still scoped to `verified=true AND published=true`.

## What CI enforces

- `scripts/check-rls-migrations.ts` — every new `CREATE TABLE public.*` must be followed by `GRANT` + `ENABLE ROW LEVEL SECURITY` in the same migration.
- `scripts/check-security-headers.ts` — required HTTP security headers and CSP directives must remain in `public/_headers`.
- Gitleaks + Semgrep + `npm audit --audit-level=high` block PRs on regressions.
