CREATE TABLE public.photo_review_items (
  id uuid primary key default gen_random_uuid(),
  hash text not null unique,
  slug text not null,
  status text not null default 'rascunho' check (status in ('rascunho','em_revisao','aprovado','publicado')),
  nota text,
  updated_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

GRANT SELECT, INSERT, UPDATE ON public.photo_review_items TO authenticated;
GRANT ALL ON public.photo_review_items TO service_role;
ALTER TABLE public.photo_review_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "review_items_select" ON public.photo_review_items FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'));
CREATE POLICY "review_items_insert" ON public.photo_review_items FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'));
CREATE POLICY "review_items_update" ON public.photo_review_items FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'))
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'));

CREATE TRIGGER update_photo_review_items_updated_at BEFORE UPDATE ON public.photo_review_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.admin_audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id),
  actor_email text,
  area text not null,
  action text not null,
  target text,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

GRANT SELECT, INSERT ON public.admin_audit_log TO authenticated;
GRANT ALL ON public.admin_audit_log TO service_role;
ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "audit_select" ON public.admin_audit_log FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'));
CREATE POLICY "audit_insert" ON public.admin_audit_log FOR INSERT TO authenticated
  WITH CHECK (actor_id = auth.uid() AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')));

CREATE INDEX idx_admin_audit_log_created_at ON public.admin_audit_log (created_at DESC);