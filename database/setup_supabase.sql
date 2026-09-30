-- Complete Supabase Setup for AI Yoga Coach
-- Run this script in the Supabase Dashboard -> SQL Editor

-- 1. Create the asanas table
CREATE TABLE IF NOT EXISTS public.asanas (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  sanskrit_name TEXT,
  category TEXT,
  difficulty TEXT,
  storage_path TEXT,
  image_url TEXT,
  video_url TEXT,
  description TEXT,
  benefits TEXT[] DEFAULT '{}',
  instructions TEXT[] DEFAULT '{}',
  cues JSONB DEFAULT '[]'::jsonb,
  rules JSONB DEFAULT '[]'::jsonb,
  target_hold_seconds INTEGER DEFAULT 5,
  rule_ids TEXT[] DEFAULT '{}',
  is_premium BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for ordering and category lookup
CREATE INDEX IF NOT EXISTS idx_asanas_order_index ON public.asanas (order_index);
CREATE INDEX IF NOT EXISTS idx_asanas_category ON public.asanas (category);
CREATE INDEX IF NOT EXISTS idx_asanas_difficulty ON public.asanas (difficulty);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.asanas ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies
-- Allow public read access to all asanas
DROP POLICY IF EXISTS "Public Read Access" ON public.asanas;
CREATE POLICY "Public Read Access" 
ON public.asanas 
FOR SELECT 
USING (true);

-- Allow public insert/update access for seeding and management (or service role)
DROP POLICY IF EXISTS "Public Insert/Update Access" ON public.asanas;
CREATE POLICY "Public Insert/Update Access" 
ON public.asanas 
FOR ALL 
USING (true);

-- 4. Storage Bucket Setup
-- Create 'asana-images' public bucket if not already present
INSERT INTO storage.buckets (id, name, public)
VALUES ('asana-images', 'asana-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Allow public read access to asana-images storage
DROP POLICY IF EXISTS "Public Access to Asana Images" ON storage.objects;
CREATE POLICY "Public Access to Asana Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'asana-images');

-- Allow authenticated/service role/anon upload to asana-images (for upload endpoints)
DROP POLICY IF EXISTS "Allow Uploads to Asana Images" ON storage.objects;
CREATE POLICY "Allow Uploads to Asana Images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'asana-images');

DROP POLICY IF EXISTS "Allow Update to Asana Images" ON storage.objects;
CREATE POLICY "Allow Update to Asana Images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'asana-images');
