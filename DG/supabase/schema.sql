-- Enable vector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Notes table
CREATE TABLE notes (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  summary TEXT,
  tags TEXT[] DEFAULT '{}',
  category TEXT,
  embedding VECTOR(384),   -- 384 for all-MiniLM-L6-v2
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own notes" ON notes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own notes" ON notes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own notes" ON notes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own notes" ON notes FOR DELETE USING (auth.uid() = user_id);

-- Vector similarity search function
CREATE OR REPLACE FUNCTION match_notes (
  query_embedding vector(384),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id bigint,
  title text,
  content text,
  summary text,
  tags text[],
  category text,
  similarity float,
  user_id uuid
)
LANGUAGE sql
AS $$
  SELECT
    id,
    title,
    content,
    summary,
    tags,
    category,
    1 - (embedding <=> query_embedding) AS similarity,
    user_id
  FROM notes
  WHERE 1 - (embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
$$;