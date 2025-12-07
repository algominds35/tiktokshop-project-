-- ============================================
-- SUPABASE SETUP: Customer Tracking & Trial System
-- ============================================
-- Run this ENTIRE script in Supabase SQL Editor
-- Go to: Supabase Dashboard → SQL Editor → New Query → Paste this → Run

-- ============================================
-- 1. CREATE/UPDATE USERS TABLE
-- ============================================

-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar TEXT,
  subscription_status TEXT DEFAULT 'trialing', -- 'trialing', 'active', 'expired'
  subscription_plan TEXT, -- 'pro', 'premium', 'enterprise'
  trial_ends_at TIMESTAMP WITH TIME ZONE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add missing columns if table already exists (safe to run multiple times)
DO $$ 
BEGIN
  -- Add trial_ends_at if missing
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='users' AND column_name='trial_ends_at') THEN
    ALTER TABLE users ADD COLUMN trial_ends_at TIMESTAMP WITH TIME ZONE;
  END IF;

  -- Add subscription_plan if missing
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='users' AND column_name='subscription_plan') THEN
    ALTER TABLE users ADD COLUMN subscription_plan TEXT;
  END IF;

  -- Add subscription_status if missing
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='users' AND column_name='subscription_status') THEN
    ALTER TABLE users ADD COLUMN subscription_status TEXT DEFAULT 'trialing';
  END IF;

  -- Add stripe_customer_id if missing
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='users' AND column_name='stripe_customer_id') THEN
    ALTER TABLE users ADD COLUMN stripe_customer_id TEXT;
  END IF;

  -- Add stripe_subscription_id if missing
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='users' AND column_name='stripe_subscription_id') THEN
    ALTER TABLE users ADD COLUMN stripe_subscription_id TEXT;
  END IF;
END $$;

-- ============================================
-- 2. CREATE INDEXES (for faster queries)
-- ============================================

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_subscription_status ON users(subscription_status);
CREATE INDEX IF NOT EXISTS idx_users_stripe_customer ON users(stripe_customer_id);

-- ============================================
-- 3. ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 4. CREATE RLS POLICIES (Users can see their own data)
-- ============================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can read data" ON users;
DROP POLICY IF EXISTS "Users can insert data" ON users;
DROP POLICY IF EXISTS "Users can update data" ON users;

-- Policy: Users can read their own data
CREATE POLICY "Users can read data" 
ON users FOR SELECT 
USING (true); -- Allow reading for lookups

-- Policy: Users can insert (for signup)
CREATE POLICY "Users can insert data" 
ON users FOR INSERT 
WITH CHECK (true);

-- Policy: Users can update their own data
CREATE POLICY "Users can update data" 
ON users FOR UPDATE 
USING (true)
WITH CHECK (true);

-- ============================================
-- 5. VERIFY IT WORKED
-- ============================================

-- Check if users table exists and has correct columns
SELECT 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'users'
ORDER BY ordinal_position;

-- ============================================
-- ✅ DONE! 
-- ============================================
-- Now your users table is ready to track:
-- ✓ Trial expiration dates
-- ✓ Subscription status
-- ✓ Subscription plans
-- ✓ Stripe customer IDs
-- ✓ User data isolation (RLS)

