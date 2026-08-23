CREATE TABLE IF NOT EXISTS knowledge_base (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access" ON knowledge_base
  FOR SELECT USING (true);

CREATE POLICY "Service role full access" ON knowledge_base
  USING (auth.role() = 'service_role');
