# 🎯 How Everything Works - Complete Guide

This guide explains how **Signup/Login**, **Stripe Payments**, and **Free Trial** systems work in your ReconcileBook project.

---

## 📋 Table of Contents

1. [Signup & Login Flow](#signup--login-flow)
2. [Free Trial System](#free-trial-system)
3. [Stripe Integration](#stripe-integration)
4. [Complete User Journey](#complete-user-journey)
5. [Next Steps](#next-steps)

---

## 🔐 Signup & Login Flow

### **Signup Process** (`/signup`)

**What happens when a user signs up:**

1. **User fills form** → Email + Password (min 6 chars)
2. **Supabase Auth creates account** → `supabase.auth.signUp()`
3. **Email verification** (if enabled):
   - User receives verification email
   - Must click link to verify
   - Redirects to `/auth/callback?next=/dashboard`
4. **Database user record created**:
   ```javascript
   {
     id: authData.user.id,
     email: email,
     subscription_status: 'trialing',  // Starts in trial
     trial_ends_at: now + 14 days      // 14-day trial
   }
   ```
5. **Session stored** → localStorage + Supabase session
6. **Redirect to dashboard** → `/dashboard`

**Files involved:**
- `app/signup/page.jsx` - Signup UI
- `app/auth/callback/route.js` - Email verification handler
- Supabase Auth handles password hashing & security

---

### **Login Process** (`/login`)

**What happens when a user logs in:**

1. **User enters email + password**
2. **Supabase Auth validates** → `supabase.auth.signInWithPassword()`
3. **Fetch user from database** → Get subscription status
4. **Store session** → localStorage + Supabase session
5. **Check trial status** → Dashboard checks if trial expired
6. **Redirect to dashboard** → `/dashboard`

**Files involved:**
- `app/login/page.jsx` - Login UI
- Supabase Auth handles authentication

---

## 🎁 Free Trial System

### **How Trials Work**

**Trial Status Values:**
- `'trialing'` - User is in free trial period
- `'active'` - User has paid subscription
- `'expired'` - Trial ended, no active subscription

**Trial Duration:**
- **14 days** from signup date
- Stored in `trial_ends_at` column (TIMESTAMP)

### **Trial Check Flow**

**Dashboard checks trial on load:**

1. **Call `/api/user/trial-status`** → Passes user email
2. **API calculates:**
   ```javascript
   - isTrialExpired: now > trial_ends_at
   - hasAccess: status === 'active' OR (status === 'trialing' && !expired)
   - daysRemaining: days left in trial
   ```
3. **Dashboard actions:**
   - ✅ **Has access** → Show dashboard
   - ⚠️ **Trial expiring soon** (≤3 days) → Show banner
   - ❌ **Trial expired** → Redirect to `/subscribe?trial_expired=true`

**Files involved:**
- `app/api/user/trial-status/route.js` - Trial status API
- `app/dashboard/page.jsx` - Dashboard with trial checks
- `app/subscribe/page.jsx` - Subscription page

---

## 💳 Stripe Integration

### **How Stripe Works in Your App**

**Stripe handles:**
- Payment processing
- Subscription management
- Trial periods
- Webhooks (events)

### **Stripe Flow**

#### **1. User Clicks "Subscribe"**

**From landing page or subscribe page:**
- User selects plan (Pro, Premium, Enterprise)
- Calls `/api/stripe/checkout`

#### **2. Create Checkout Session** (`/api/stripe/checkout`)

**What happens:**
```javascript
1. Get or create user in database
2. Create/get Stripe Customer
3. Create Stripe Checkout Session:
   - Price ID from environment variable
   - 14-day trial period
   - Success URL: /dashboard?payment=success
   - Cancel URL: /?payment=canceled
4. Return checkout URL
```

**User redirected to Stripe Checkout** → Secure payment page

#### **3. User Completes Payment**

**Stripe processes:**
- Collects payment method
- Starts subscription with trial
- Sends webhook events

#### **4. Webhook Handles Events** (`/api/stripe/webhook`)

**Stripe sends webhooks for:**

**a) `checkout.session.completed`**
- User completed checkout
- Update database:
  ```javascript
  subscription_status: 'trialing'  // In trial period
  stripe_subscription_id: subscription.id
  trial_ends_at: subscription.trial_end
  subscription_plan: 'premium'
  ```

**b) `customer.subscription.updated`**
- Subscription status changed
- Update database:
  ```javascript
  if (subscription.status === 'trialing') → 'trialing'
  if (subscription.status === 'active') → 'active'
  if (subscription.status === 'canceled') → 'expired'
  ```

**c) `customer.subscription.deleted`**
- Subscription canceled
- Update database:
  ```javascript
  subscription_status: 'expired'
  ```

**Files involved:**
- `app/api/stripe/checkout/route.js` - Create checkout
- `app/api/stripe/webhook/route.js` - Handle Stripe events
- `lib/stripe.js` - Stripe client setup

---

## 🚀 Complete User Journey

### **Scenario 1: New User (Free Trial)**

```
1. User visits landing page (/)
   ↓
2. Clicks "Start Free Trial"
   ↓
3. Signs up (/signup)
   - Creates account
   - Gets 14-day trial
   - subscription_status: 'trialing'
   ↓
4. Redirected to dashboard (/dashboard)
   - Full access during trial
   - Trial banner shows days remaining
   ↓
5. After 14 days:
   - Trial expires
   - Redirected to /subscribe?trial_expired=true
   ↓
6. User subscribes:
   - Goes through Stripe checkout
   - Enters payment method
   - Gets 14-day trial on subscription
   ↓
7. Webhook updates:
   - subscription_status: 'trialing' (Stripe trial)
   - After Stripe trial: 'active'
```

### **Scenario 2: User Subscribes During Trial**

```
1. User in trial (day 5 of 14)
   ↓
2. Clicks "Subscribe" button
   ↓
3. Goes through Stripe checkout
   ↓
4. Webhook updates:
   - subscription_status: 'trialing' (Stripe trial)
   - trial_ends_at: Stripe trial end date
   ↓
5. After Stripe trial ends:
   - subscription_status: 'active'
   - User charged monthly
```

---

## ⚙️ Environment Variables Needed

**For Stripe to work, you need:**

```env
# Stripe Keys (from Stripe Dashboard)
STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx

# Stripe Price IDs (create products in Stripe Dashboard)
STRIPE_PRICE_ID_PRO=price_xxxxx
STRIPE_PRICE_ID_PREMIUM=price_xxxxx
STRIPE_PRICE_ID_ENTERPRISE=price_xxxxx

# Stripe Webhook Secret (from webhook endpoint)
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# App URL (for redirects)
NEXT_PUBLIC_APP_URL=http://localhost:3000  # or your Vercel URL
```

---

## 📝 Next Steps

### **1. Setup Supabase Database**

Run the SQL script:
```bash
# Go to Supabase Dashboard → SQL Editor
# Copy/paste contents of: supabase-setup-trial-tracking.sql
# Click "Run"
```

This creates:
- `users` table with trial tracking columns
- Indexes for performance
- Row Level Security (RLS) policies

---

### **2. Setup Stripe Account**

**a) Create Stripe Account:**
- Go to [stripe.com](https://stripe.com)
- Sign up / Login
- Get API keys from **Developers → API keys**

**b) Create Products:**
1. Go to **Products** in Stripe Dashboard
2. Create 3 products:
   - **Pro** - $29/month
   - **Premium** - $49/month (or your price)
   - **Enterprise** - $99/month (or your price)
3. Copy the **Price IDs** (starts with `price_`)

**c) Setup Webhook:**
1. Go to **Developers → Webhooks**
2. Click **Add endpoint**
3. Endpoint URL: `https://your-app.vercel.app/api/stripe/webhook`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy **Signing secret** (starts with `whsec_`)

---

### **3. Configure Environment Variables**

Create `.env.local`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_PRICE_ID_PRO=price_xxxxx
STRIPE_PRICE_ID_PREMIUM=price_xxxxx
STRIPE_PRICE_ID_ENTERPRISE=price_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_here
```

**For production (Vercel):**
- Add same variables in Vercel Dashboard → Settings → Environment Variables
- Update `NEXT_PUBLIC_APP_URL` to your Vercel URL

---

### **4. Test the Flow**

**Local Testing:**
```bash
npm run dev
```

**Test scenarios:**
1. ✅ Sign up → Check trial status
2. ✅ Login → Access dashboard
3. ✅ Click subscribe → Stripe checkout (use test card: `4242 4242 4242 4242`)
4. ✅ Complete payment → Check webhook updates database
5. ✅ Wait for trial to expire → Check redirect to subscribe page

**Stripe Test Cards:**
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Use any future expiry date and any CVC

---

## 🔍 Key Files Reference

| File | Purpose |
|------|---------|
| `app/signup/page.jsx` | Signup UI & logic |
| `app/login/page.jsx` | Login UI & logic |
| `app/dashboard/page.jsx` | Dashboard with trial checks |
| `app/subscribe/page.jsx` | Subscription page |
| `app/api/user/trial-status/route.js` | Check trial status API |
| `app/api/stripe/checkout/route.js` | Create Stripe checkout |
| `app/api/stripe/webhook/route.js` | Handle Stripe webhooks |
| `lib/auth.js` | Auth helper functions |
| `lib/stripe.js` | Stripe client |
| `supabase-setup-trial-tracking.sql` | Database schema |

---

## ✅ Summary

**Your app flow:**
1. **Signup** → Creates account with 14-day trial
2. **Login** → Authenticates user
3. **Dashboard** → Checks trial status, shows data
4. **Subscribe** → Stripe checkout with trial
5. **Webhook** → Updates subscription status automatically

**Everything is connected and ready to go!** 🎉

Just need to:
- Run the SQL script in Supabase
- Setup Stripe products & webhook
- Add environment variables
- Test the flow

---

**Questions?** Check the code comments or test each step individually!


