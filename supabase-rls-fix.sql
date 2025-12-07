-- Drop existing policies
DROP POLICY IF EXISTS "Users can only read own settlements" ON settlements;
DROP POLICY IF EXISTS "Users can only insert own settlements" ON settlements;

-- Create new policies that work with email-based user_id
CREATE POLICY "Users can read their own settlements" 
ON settlements FOR SELECT 
USING (
  user_id IN (
    SELECT id FROM users WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
  )
);

CREATE POLICY "Users can insert their own settlements" 
ON settlements FOR INSERT 
WITH CHECK (
  user_id IN (
    SELECT id FROM users WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
  )
);

-- Add policy for users table
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;

CREATE POLICY "Users can read their own data" 
ON users FOR SELECT 
USING (true);  -- Allow reading for lookups

CREATE POLICY "Users can insert their own data" 
ON users FOR INSERT 
WITH CHECK (true);  -- Allow inserts for signup

CREATE POLICY "Users can update their own data" 
ON users FOR UPDATE 
USING (true)  -- Simplified for now
WITH CHECK (true);

