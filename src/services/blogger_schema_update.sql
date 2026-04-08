-- Update blogs table to support Blogger-style features
ALTER TABLE public.blogs 
ADD COLUMN IF NOT EXISTS labels TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS location TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Update existing blogs to have a slug if they don't have one (using ID as fallback)
UPDATE public.blogs 
SET slug = lower(regexp_replace(title, '[^a-zA-Z0-9]+', '-', 'g'))
WHERE slug IS NULL;
