-- Remove storage policies dependentes do bucket funnel-uploads
DROP POLICY IF EXISTS "Anyone can upload to funnel-uploads" ON storage.objects;
DROP POLICY IF EXISTS "Service role manages funnel-uploads" ON storage.objects;
DROP POLICY IF EXISTS "Admins can read funnel uploads" ON storage.objects;