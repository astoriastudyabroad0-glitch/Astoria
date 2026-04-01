-- Astoria Study Abroad - Supabase Database Schema
-- Last Updated: 2026-04-01

-- 1. BLOGS TABLE
-- Stores blog posts for the Astoria website
CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    image TEXT,
    excerpt TEXT,
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS for Blogs
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to blogs" ON public.blogs FOR SELECT USING (true);
CREATE POLICY "Allow authenticated service role and admin write to blogs" ON public.blogs FOR ALL USING (auth.role() = 'authenticated');

-- 2. COUNTRIES TABLE
-- Stores study destinations (Canada, UK, etc.)
CREATE TABLE IF NOT EXISTS public.countries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    flag TEXT, -- Emoji or icon
    description TEXT,
    highlights TEXT[] DEFAULT '{}',
    popular_items TEXT[] DEFAULT '{}',
    average_tuition TEXT,
    order_index INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS for Countries
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to countries" ON public.countries FOR SELECT USING (true);
CREATE POLICY "Allow authenticated admin write to countries" ON public.countries FOR ALL USING (auth.role() = 'authenticated');

-- 3. MESSAGES TABLE
-- Stores contact form submissions from students
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    country TEXT,
    "ieltsTaken" TEXT DEFAULT 'no',
    "ieltsScore" TEXT,
    message TEXT,
    "isRead" BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS for Messages
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
-- Anyone can insert a message, but only authenticated users can read/delete
CREATE POLICY "Allow public insert messages" ON public.messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated read/write messages" ON public.messages FOR ALL USING (auth.role() = 'authenticated');

-- 4. REVIEWS TABLE
-- Stores student success stories
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    country TEXT,
    text TEXT NOT NULL,
    rating INT DEFAULT 5,
    status TEXT DEFAULT 'pending', -- 'pending' or 'approved'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS for Reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
-- Public can read approved reviews, anyone can insert pending reviews
CREATE POLICY "Allow public read approved reviews" ON public.reviews FOR SELECT USING (status = 'approved');
CREATE POLICY "Allow public insert reviews" ON public.reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated read/write all reviews" ON public.reviews FOR ALL USING (auth.role() = 'authenticated');

-- 5. SITE SETTINGS TABLE
-- Stores global configuration like phone numbers, office hours, etc.
CREATE TABLE IF NOT EXISTS public.site_settings (
    id INT PRIMARY KEY DEFAULT 1,
    phone TEXT,
    email TEXT,
    address TEXT,
    google_maps_url TEXT,
    instagram_username TEXT,
    instagram_url TEXT,
    facebook_url TEXT,
    linkedin_url TEXT,
    whatsapp TEXT,
    office_hours TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed initial settings if table is empty
INSERT INTO public.site_settings (id, phone, email, address, office_hours)
VALUES (1, '01913-354956', 'info@astoriastudyabroad.com', 'Airport Rd, Ahmednogor 6203', '10am to 8pm')
ON CONFLICT (id) DO NOTHING;

-- RLS for Settings
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Allow authenticated admin write settings" ON public.site_settings FOR ALL USING (auth.role() = 'authenticated');
