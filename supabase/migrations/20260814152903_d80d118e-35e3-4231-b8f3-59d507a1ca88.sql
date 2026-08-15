CREATE TABLE public.qa_exclusion_justifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scope_type text NOT NULL CHECK (scope_type IN ('route','city','neighborhood','service','global')),
  scope_value text NOT NULL,
  period_start date NOT NULL,
  period_end date NOT NULL,
  qa_events integer NOT NULL DEFAULT 0,
  total_events integer NOT NULL DEFAULT 0,
  justification text NOT NULL CHECK (char_length(justification) BETWEEN 10 AND 2000),
  author_id uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.qa_exclusion_justifications TO authenticated;
GRANT ALL ON public.qa_exclusion_justifications TO service_role;

ALTER TABLE public.qa_exclusion_justifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins leem justificativas de QA"
  ON public.qa_exclusion_justifications FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins registram justificativas de QA"
  ON public.qa_exclusion_justifications FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin') AND author_id = auth.uid());

CREATE INDEX qa_excl_just_scope_idx ON public.qa_exclusion_justifications (scope_type, scope_value, period_start DESC);