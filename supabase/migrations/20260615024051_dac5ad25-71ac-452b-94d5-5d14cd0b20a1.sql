CREATE POLICY "Anyone can upload to funnel-uploads"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'funnel-uploads'
  AND (storage.foldername(name))[1] IS NOT NULL
);

CREATE POLICY "Service role manages funnel-uploads"
ON storage.objects FOR ALL
TO service_role
USING (bucket_id = 'funnel-uploads')
WITH CHECK (bucket_id = 'funnel-uploads');