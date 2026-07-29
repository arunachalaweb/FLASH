-- Allow admins to manage files in the cms-media bucket
CREATE POLICY "Admins can upload cms-media"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'cms-media' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update cms-media"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'cms-media' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete cms-media"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'cms-media' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can read cms-media"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'cms-media' AND public.has_role(auth.uid(), 'admin'));