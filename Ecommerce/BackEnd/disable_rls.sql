-- RUN THIS IN SUPABASE SQL EDITOR TO FIX PERMISSION ERRORS

-- Disable RLS (Row Level Security) on 'users' table 
-- This allows your Backend to Insert new users without complex policies
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Disable RLS on 'orders' table
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;

-- Disable RLS on 'products' table (if you plan to update products)
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
