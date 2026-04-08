-- 1. Create a public bucket for blog images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Allow public access to read images
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'blog-images');

-- 3. Allow authenticated users to upload images
CREATE POLICY "Authenticated Upload" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'blog-images' AND 
  auth.role() = 'authenticated'
);

-- 4. Allow authenticated users to update/delete their own uploads (optional but good practice)
CREATE POLICY "Authenticated Update/Delete" ON storage.objects
FOR ALL USING (
  bucket_id = 'blog-images' AND 
  auth.role() = 'authenticated'
);
