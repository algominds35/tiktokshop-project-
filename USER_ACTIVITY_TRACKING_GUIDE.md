# User Activity Tracking Guide

This guide explains how to track and monitor user signups, logins, and activity in your ReconcileBook app.

## 📊 What Gets Tracked

- **Signups**: New user registrations
- **Logins**: User login events  
- **User metadata**: IP addresses, user agents, timestamps
- **Login counts**: Total number of logins per user
- **Last login time**: Most recent login for each user

## 🚀 Setup Instructions

### Step 1: Run the SQL Setup Script

1. Go to your **Supabase Dashboard** → SQL Editor
2. Create a new query
3. Copy and paste the contents of `supabase-user-activity-tracking.sql`
4. Click **Run**

This creates:
- `user_activity_log` table - stores all user events
- `user_activity_summary` view - provides analytics
- Automatic triggers to update login counts
- Row-level security policies

### Step 2: Add Service Role Key to Vercel

1. Go to your **Supabase Dashboard** → Settings → API
2. Copy your **service_role** key (keep this secret!)
3. Go to **Vercel Dashboard** → Your Project → Settings → Environment Variables
4. Add a new variable:
   - **Name**: `SUPABASE_SERVICE_ROLE_KEY`
   - **Value**: Your service role key
   - **Environment**: Production, Preview, Development

### Step 3: Deploy

The code is already integrated! Just push to GitHub and Vercel will deploy.

## 📈 Viewing Analytics

### Option 1: Admin Dashboard (Recommended)

Visit: `https://your-domain.com/admin/analytics`

You'll see:
- Total users
- Active trials vs paid users
- Expired trials
- List of all users with login counts
- Recent activity feed

### Option 2: Supabase Dashboard

1. Go to **Supabase Dashboard** → Table Editor
2. View the `user_activity_log` table for raw events
3. View the `user_activity_summary` for aggregated stats

### Option 3: SQL Queries

Run custom queries in Supabase SQL Editor:

```sql
-- Get signups in the last 7 days
SELECT 
  DATE(created_at) as signup_date,
  COUNT(*) as signups
FROM user_activity_log
WHERE event_type = 'signup'
  AND created_at >= NOW() - INTERVAL '7 days'
GROUP BY DATE(created_at)
ORDER BY signup_date DESC;

-- Get users who haven't logged in for 7+ days
SELECT 
  email,
  last_login_at,
  login_count
FROM user_activity_summary
WHERE last_login_at < NOW() - INTERVAL '7 days'
ORDER BY last_login_at DESC;

-- Get most active users
SELECT 
  email,
  login_count,
  last_login_at
FROM user_activity_summary
ORDER BY login_count DESC
LIMIT 10;
```

## 🔍 Event Types

The system tracks these event types:

- `signup` - User created a new account
- `login` - User logged in
- `logout` - User logged out (if implemented)
- `trial_started` - User started a trial
- `trial_expired` - User's trial expired
- `subscription_created` - User subscribed to a paid plan
- `subscription_cancelled` - User cancelled their subscription

## 🛠 Adding Custom Events

To log custom events from your code:

```javascript
// Server-side (API routes)
import { logActivity } from '@/lib/activity-logger'

await logActivity(userId, 'trial_expired', {
  trial_days: 14,
  plan_selected: null
})

// Client-side
await fetch('/api/log-activity', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'user-id-here',
    eventType: 'custom_event',
    eventData: { key: 'value' }
  })
})
```

## 📊 Useful Analytics Queries

### Conversion Rate
```sql
SELECT 
  COUNT(DISTINCT CASE WHEN subscription_status = 'active' THEN id END) * 100.0 / 
  COUNT(*) as conversion_rate_percent
FROM users;
```

### Daily Active Users (Last 30 Days)
```sql
SELECT 
  DATE(created_at) as date,
  COUNT(DISTINCT user_id) as active_users
FROM user_activity_log
WHERE event_type = 'login'
  AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

### Cohort Analysis (Signups by Month)
```sql
SELECT 
  TO_CHAR(created_at, 'YYYY-MM') as month,
  COUNT(*) as signups
FROM users
GROUP BY TO_CHAR(created_at, 'YYYY-MM')
ORDER BY month DESC;
```

## 🔒 Security Notes

- The `user_activity_log` table has Row Level Security (RLS) enabled
- Users can only see their own activity
- The service role key can bypass RLS for admin operations
- **Never expose the service role key** in client-side code
- Activity logging uses the service role key for server-side operations

## 🎯 Best Practices

1. **Monitor regularly**: Check analytics weekly to spot trends
2. **Track conversions**: Watch trial-to-paid conversion rates
3. **Identify churn**: Find users who stopped logging in
4. **Re-engagement**: Reach out to inactive users
5. **Performance**: The activity log is indexed for fast queries

## 🆘 Troubleshooting

**Activity not being logged?**
- Check if `SUPABASE_SERVICE_ROLE_KEY` is set in Vercel
- Verify the SQL script ran successfully
- Check browser console for errors

**Can't see analytics page?**
- Visit `/admin/analytics` directly
- Check if you're logged in to Supabase
- Verify RLS policies allow access

**Need help?**
Check the Supabase logs in your dashboard for any errors.

