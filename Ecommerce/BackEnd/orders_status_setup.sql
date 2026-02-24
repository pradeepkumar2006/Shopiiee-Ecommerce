-- Run this in Supabase SQL Editor
ALTER TABLE orders ADD COLUMN IF NOT EXISTS status text DEFAULT 'Processing';
