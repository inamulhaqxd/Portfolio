CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  tech_tags TEXT[] DEFAULT '{}',
  live_demo_url TEXT,
  github_url TEXT,
  youtube_url TEXT,
  images TEXT[] DEFAULT '{}',
  thumbnail_url TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access" ON projects
  FOR SELECT USING (status = 'published');

CREATE POLICY "Service role full access" ON projects
  USING (auth.role() = 'service_role');
