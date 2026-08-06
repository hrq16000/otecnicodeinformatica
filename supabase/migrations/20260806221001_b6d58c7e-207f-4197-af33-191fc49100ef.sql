CREATE POLICY "Admins manage os midias" ON storage.objects FOR ALL TO authenticated
USING (bucket_id = 'os-midias' AND has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (bucket_id = 'os-midias' AND has_role(auth.uid(), 'admin'::app_role));