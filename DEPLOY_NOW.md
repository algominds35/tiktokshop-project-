# 🚀 Deploy Your TikTok Shop Profit Tracker NOW

## Your GitHub Repo is Ready!
Repository: `https://github.com/algominds35/tiktokshop-project-.git`

---

## Step 1: Push Code to GitHub (30 seconds)

Run these commands in your terminal:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit - TikTok Shop profit tracker"

# Connect to your GitHub repo
git remote add origin https://github.com/algominds35/tiktokshop-project-.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

**Wait for upload to complete...** ✅

---

## Step 2: Deploy to Vercel (2 minutes)

### A. Go to Vercel
1. Visit: **https://vercel.com**
2. Sign in (use your GitHub account for easy access)
3. Click **"Add New"** button
4. Select **"Project"**

### B. Import Your Repository
1. You'll see your GitHub repos
2. Find **"tiktokshop-project-"**
3. Click **"Import"**
4. Framework Preset: **Next.js** (auto-detected ✅)
5. Root Directory: **`./`** (leave as default)
6. Click **"Deploy"**

**Wait 2-3 minutes for build...** ⏳

---

## Step 3: Add Environment Variables (3 minutes)

### After deployment completes:

1. Go to your project dashboard
2. Click **"Settings"**
3. Click **"Environment Variables"** in sidebar
4. Add these **12 variables** one by one:

#### Supabase (3 vars)
```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://xxxxx.supabase.co
Environment: Production, Preview, Development

Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbG...
Environment: Production, Preview, Development

Name: SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbG...
Environment: Production, Preview, Development
```

#### TikTok Shop API (3 vars)
```
Name: TIKTOK_APP_KEY
Value: your_app_key_here
Environment: Production, Preview, Development

Name: TIKTOK_APP_SECRET
Value: your_app_secret_here
Environment: Production, Preview, Development

Name: TIKTOK_REDIRECT_URI
Value: https://your-app-name.vercel.app/api/auth/callback
⚠️ REPLACE "your-app-name" with YOUR actual Vercel URL
Environment: Production, Preview, Development
```

#### Stripe (4 vars)
```
Name: STRIPE_SECRET_KEY
Value: sk_test_xxx (or sk_live_xxx)
Environment: Production, Preview, Development

Name: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
Value: pk_test_xxx (or pk_live_xxx)
Environment: Production, Preview, Development

Name: STRIPE_PRICE_ID
Value: price_xxx
Environment: Production, Preview, Development

Name: STRIPE_WEBHOOK_SECRET
Value: whsec_xxx
Environment: Production, Preview, Development
```

#### NextAuth (2 vars)
```
Name: NEXTAUTH_SECRET
Value: (generate with: openssl rand -base64 32)
Environment: Production, Preview, Development

Name: NEXTAUTH_URL
Value: https://your-app-name.vercel.app
⚠️ REPLACE with YOUR actual Vercel URL
Environment: Production, Preview, Development
```

---

## Step 4: Redeploy with Environment Variables (30 seconds)

After adding all 12 variables:

1. Go to **"Deployments"** tab
2. Find your latest deployment
3. Click **⋯** (three dots menu)
4. Click **"Redeploy"**
5. Confirm

**Wait 2 minutes for rebuild...** ⏳

---

## Step 5: Update TikTok Shop App Settings (1 minute)

1. Go to **TikTok Shop Partner Center**: https://partner.tiktokshop.com
2. Go to your app settings
3. Find **"Redirect URI"** setting
4. Update to: `https://your-app-name.vercel.app/api/auth/callback`
5. **Save**

---

## Step 6: Setup Stripe Webhook (2 minutes)

1. Go to **Stripe Dashboard**: https://dashboard.stripe.com
2. **Developers** → **Webhooks**
3. Click **"Add endpoint"**
4. Endpoint URL: `https://your-app-name.vercel.app/api/stripe/webhook`
5. Select events to listen to:
   - ✅ `checkout.session.completed`
   - ✅ `customer.subscription.updated`
   - ✅ `customer.subscription.deleted`
   - ✅ `invoice.payment_failed`
6. Click **"Add endpoint"**
7. **Copy the webhook signing secret** (starts with `whsec_`)
8. Go back to Vercel → Settings → Environment Variables
9. Update `STRIPE_WEBHOOK_SECRET` with this value
10. Redeploy again

---

## 🎉 YOU'RE LIVE!

### Test Your App:

1. Visit: **https://your-app-name.vercel.app**
2. Click **"Connect TikTok Shop"**
3. Should redirect to TikTok OAuth ✅
4. Authorize your shop
5. Should redirect to Dashboard ✅
6. Click **"Sync Now"**
7. Should display profit data ✅

---

## 🔄 Future Updates (Easy!)

Whenever you make code changes:

```bash
git add .
git commit -m "Your update description"
git push
```

**Vercel automatically deploys!** 🎉

---

## 📝 Where to Get Your API Keys

### Supabase
- https://supabase.com → Your Project → Settings → API

### TikTok Shop
- https://partner.tiktokshop.com → Your App

### Stripe
- https://dashboard.stripe.com → Developers → API keys
- Create product: Products → Add Product ($29/month)

### Generate NEXTAUTH_SECRET
```bash
# Mac/Linux
openssl rand -base64 32

# Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

---

## 🚨 Important Notes

⚠️ **Your Vercel URL** will be something like:
- `https://tiktokshop-project.vercel.app`
- Or: `https://tiktokshop-project-algominds35.vercel.app`

Find it on your Vercel dashboard after first deployment!

⚠️ **Update TWO places with your Vercel URL:**
1. Vercel env vars: `TIKTOK_REDIRECT_URI` and `NEXTAUTH_URL`
2. TikTok Partner Center: Redirect URI

⚠️ **Don't forget** to add `/api/auth/callback` at the end of redirect URI!

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Project imported to Vercel
- [ ] First deployment successful
- [ ] All 12 environment variables added in Vercel
- [ ] Redeployed after adding env vars
- [ ] TikTok redirect URI updated
- [ ] Stripe webhook configured
- [ ] Tested live app - OAuth works
- [ ] Tested live app - Sync works
- [ ] Tested live app - Dashboard shows data

---

## 🎯 You're Ready to Launch! 🚀

Your TikTok Shop profit tracker is now live and ready for sellers!

**Share it:**
```
🚀 Know your real TikTok Shop profit in 30 seconds
Stop guessing, start knowing your real margins!
👉 https://your-app-name.vercel.app
```

