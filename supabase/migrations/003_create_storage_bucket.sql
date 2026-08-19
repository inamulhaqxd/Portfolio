-- Create storage bucket for project images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('project-images', 'project-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']);

-- Allow public read access
CREATE POLICY "Public read access" ON storage.objects
  FOR SELECT USING (bucket_id = 'project-images');

-- Allow authenticated insert
CREATE POLICY "Authenticated insert" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'project-images');

-- Allow authenticated update
CREATE POLICY "Authenticated update" ON storage.objects
  FOR UPDATE USING (bucket_id = 'project-images');

-- Allow authenticated delete
CREATE POLICY "Authenticated delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'project-images');
