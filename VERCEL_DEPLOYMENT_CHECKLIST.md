# ✅ VERCEL DEPLOYMENT - What To Do Next

Your app is deployed on Vercel. Here's what you need to do NOW:

---

## 🔴 CRITICAL: Add Environment Variables in Vercel

**Go to:** Vercel Dashboard → Your Project → Settings → Environment Variables

**Add ALL of these (copy from your `.env.local` or get new ones):**

### 1. Supabase (3 variables)
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```
**Get from:** Supabase Dashboard → Settings → API

### 2. Stripe (5 variables)
```
STRIPE_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_PRICE_ID_PRO
STRIPE_PRICE_ID_PREMIUM
STRIPE_PRICE_ID_ENTERPRISE
STRIPE_WEBHOOK_SECRET
```
**Get from:** Stripe Dashboard → Developers → API keys

### 3. NextAuth (2 variables)
```
NEXTAUTH_SECRET
NEXTAUTH_URL
```
**NEXTAUTH_URL = Your Vercel URL** (e.g., `https://your-app.vercel.app`)

### 4. TikTok Shop (3 variables)
```
TIKTOK_APP_KEY
TIKTOK_APP_SECRET
TIKTOK_REDIRECT_URI
```
**TIKTOK_REDIRECT_URI = `https://your-app.vercel.app/api/auth/callback`**

### 5. App URL (1 variable)
```
NEXT_PUBLIC_APP_URL
```
**Value = Your Vercel URL** (e.g., `https://your-app.vercel.app`)

**⚠️ IMPORTANT:** After adding variables, **redeploy** your app:
- Go to Deployments tab
- Click "..." on latest deployment → "Redeploy"

---

## 🗄️ STEP 2: Setup Supabase Database

**1. Go to Supabase Dashboard:**
- https://supabase.com → Your Project

**2. Run SQL Script:**
- Click **SQL Editor** → **New Query**
- Copy **ENTIRE contents** of `supabase-setup-trial-tracking.sql`
- Paste and click **Run**
- ✅ Should see "Success. No rows returned"

**3. Verify Tables Created:**
- Go to **Table Editor**
- You should see `users` table with columns:
  - `id`, `email`, `subscription_status`, `trial_ends_at`, `stripe_customer_id`, etc.

---

## 💳 STEP 3: Setup Stripe

### A. Create Products in Stripe

**1. Go to Stripe Dashboard:**
- https://dashboard.stripe.com → **Products**

**2. Create 3 Products:**

**Product 1: Pro**
- Name: `ReconcileBook Pro`
- Price: `$29` / month (recurring)
- Copy **Price ID** (starts with `price_`) → Use for `STRIPE_PRICE_ID_PRO`

**Product 2: Premium**
- Name: `ReconcileBook Premium`
- Price: `$49` / month (or your price)
- Copy **Price ID** → Use for `STRIPE_PRICE_ID_PREMIUM`

**Product 3: Enterprise**
- Name: `ReconcileBook Enterprise`
- Price: `$99` / month (or your price)
- Copy **Price ID** → Use for `STRIPE_PRICE_ID_ENTERPRISE`

### B. Setup Stripe Webhook

**1. Go to Stripe Dashboard:**
- **Developers** → **Webhooks** → **Add endpoint**

**2. Configure:**
- **Endpoint URL:** `https://your-app.vercel.app/api/stripe/webhook`
- **Events to listen to:**
  - ✅ `checkout.session.completed`
  - ✅ `customer.subscription.updated`
  - ✅ `customer.subscription.deleted`
  - ✅ `invoice.payment_failed`

**3. Click "Add endpoint"**

**4. Copy Webhook Secret:**
- Click on the webhook you just created
- Click **"Reveal"** next to "Signing secret"
- Copy the secret (starts with `whsec_`)
- Add to Vercel as `STRIPE_WEBHOOK_SECRET`

---

## 🔗 STEP 4: Update TikTok Shop Redirect URI

**1. Go to TikTok Shop Partner Center:**
- https://partner.tiktokshop.com

**2. Edit Your App:**
- Go to your app settings
- Find **Redirect URI** field
- Update to: `https://your-app.vercel.app/api/auth/callback`
- **Save**

---

## ✅ STEP 5: Test Your Deployed App

**1. Visit your Vercel URL:**
- `https://your-app.vercel.app`

**2. Test Signup:**
- Go to `/signup`
- Create an account
- ✅ Should create user in Supabase

**3. Test Login:**
- Go to `/login`
- Login with your account
- ✅ Should redirect to dashboard

**4. Test Stripe Checkout:**
- Click "Subscribe" button
- Use Stripe test card: `4242 4242 4242 4242`
- ✅ Should redirect to Stripe checkout
- ✅ After payment, webhook should update database

---

## 🐛 Troubleshooting

### App shows errors / blank page
- ✅ Check Vercel deployment logs (Deployments → Click deployment → View logs)
- ✅ Verify all environment variables are set
- ✅ Make sure you **redeployed** after adding env vars

### Database errors
- ✅ Run the SQL script in Supabase
- ✅ Check Supabase service role key is correct
- ✅ Verify RLS policies are enabled

### Stripe not working
- ✅ Check webhook URL is correct in Stripe
- ✅ Verify webhook secret matches in Vercel
- ✅ Check Stripe dashboard → Webhooks → See if events are being received

### Login/Signup not working
- ✅ Check Supabase URL and keys are correct
- ✅ Verify Supabase Auth is enabled
- ✅ Check browser console for errors

---

## 📋 Quick Checklist

- [ ] Added all environment variables in Vercel
- [ ] Redeployed app after adding env vars
- [ ] Ran SQL script in Supabase
- [ ] Created Stripe products (Pro, Premium, Enterprise)
- [ ] Setup Stripe webhook with correct URL
- [ ] Updated TikTok Shop redirect URI
- [ ] Tested signup flow
- [ ] Tested login flow
- [ ] Tested Stripe checkout

---

## 🎯 Your App Should Now Work!

Once all steps are done:
1. ✅ Users can sign up → Get 14-day free trial
2. ✅ Users can login → Access dashboard
3. ✅ Users can subscribe → Stripe checkout works
4. ✅ Webhooks update database automatically

**Need help?** Check Vercel deployment logs or Supabase logs for errors.


