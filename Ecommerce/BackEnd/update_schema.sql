-- RUN THIS TO UPDATE TABLES FOR EMAIL AUTH

-- 1. Alter Users Table to add Email and Password
ALTER TABLE users ADD COLUMN email text UNIQUE;
ALTER TABLE users ADD COLUMN password text;

-- 2. Alter Orders Table to add Email
ALTER TABLE orders ADD COLUMN email text;
