-- User Activity Tracking Table
-- This tracks all user signups, logins, and important events

-- Create activity log table
CREATE TABLE IF NOT EXISTS user_activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL, -- 'signup', 'login', 'logout', 'trial_started', 'subscription_created', etc.
  event_data JSONB, -- Additional data about the event
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_user_activity_user_id ON user_activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_event_type ON user_activity_log(event_type);
CREATE INDEX IF NOT EXISTS idx_user_activity_created_at ON user_activity_log(created_at DESC);

-- Add last_login_at column to users table (if not exists)
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS login_count INTEGER DEFAULT 0;

-- Function to update last login
CREATE OR REPLACE FUNCTION update_last_login()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.event_type = 'login' THEN
    UPDATE users 
    SET 
      last_login_at = NOW(),
      login_count = COALESCE(login_count, 0) + 1
    WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update last login automatically
DROP TRIGGER IF EXISTS trigger_update_last_login ON user_activity_log;
CREATE TRIGGER trigger_update_last_login
  AFTER INSERT ON user_activity_log
  FOR EACH ROW
  EXECUTE FUNCTION update_last_login();

-- Row Level Security (RLS)
ALTER TABLE user_activity_log ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own activity
CREATE POLICY "Users can view own activity"
  ON user_activity_log
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Service role can insert activity logs
CREATE POLICY "Service role can insert activity logs"
  ON user_activity_log
  FOR INSERT
  WITH CHECK (true);

-- Create a view for easy analytics
CREATE OR REPLACE VIEW user_activity_summary AS
SELECT 
  u.id,
  u.email,
  u.name,
  u.subscription_status,
  u.created_at as signup_date,
  u.last_login_at,
  u.login_count,
  (SELECT COUNT(*) FROM user_activity_log WHERE user_id = u.id AND event_type = 'login') as total_logins,
  (SELECT MAX(created_at) FROM user_activity_log WHERE user_id = u.id) as last_activity
FROM users u;

-- Grant access to the view
GRANT SELECT ON user_activity_summary TO authenticated;

COMMENT ON TABLE user_activity_log IS 'Tracks all user activity including signups, logins, and important events';
COMMENT ON COLUMN user_activity_log.event_type IS 'Type of event: signup, login, logout, trial_started, subscription_created, etc.';
COMMENT ON COLUMN user_activity_log.event_data IS 'Additional JSON data about the event';

