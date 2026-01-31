-- EduProject: Items Table Migration
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  comment text,
  created_at timestamptz DEFAULT now(),
  tags text[],
  metadata jsonb
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_items_created_at ON items(created_at DESC);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE items ENABLE ROW LEVEL SECURITY;

-- Policy: Allow all operations for authenticated service role
-- (The server uses service role key, so this is fine)
CREATE POLICY "Service role full access" ON items
  FOR ALL
  USING (true)
  WITH CHECK (true);
