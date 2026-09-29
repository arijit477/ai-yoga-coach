-- Create the asanas table
CREATE TABLE asanas (
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
  benefits TEXT[], -- Array of strings
  instructions TEXT[], -- Array of strings
  cues JSONB, -- Array of objects
  rules JSONB, -- Array of PoseRule objects
  target_hold_seconds INTEGER DEFAULT 5,
  rule_ids TEXT[], -- Array of strings
  is_premium BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE asanas ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public Read Access" 
ON asanas 
FOR SELECT 
USING (true);

-- Allow public insert/update access for seeding purposes (remove in production)
CREATE POLICY "Public Insert/Update Access" 
ON asanas 
FOR ALL 
USING (true);
