# ⚡ Quick Deploy Commands (Copy & Paste)

## 🚀 Deploy Right Now (5 minutes)

### Step 1: Git Setup
```bash
# Initialize git
git init

# Add all files
git add .

# Commit everything
git commit -m "Initial commit - TikTok Shop profit tracker"
```

### Step 2: Create GitHub Repo & Push

**Go to:** https://github.com/new

**Create repo named:** `reconcilebook`

**Then run these** (replace YOUR_USERNAME):
```bash
git remote add origin https://github.com/YOUR_USERNAME/reconcilebook.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

**Go to:** https://vercel.com

1. Click "Add New" → "Project"
2. Import your `reconcilebook` repo
3. Click "Deploy"
4. Wait 2 minutes ✅

### Step 4: Add Environment Variables in Vercel UI

**After deployment finishes:**

1. Go to: Settings → Environment Variables
2. Add these 12 variables one by one:

```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://xxxxx.supabase.co

Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJxxx...

Name: SUPABASE_SERVICE_ROLE_KEY
Value: eyJxxx...

Name: TIKTOK_APP_KEY
Value: your_app_key

Name: TIKTOK_APP_SECRET
Value: your_app_secret

Name: TIKTOK_REDIRECT_URI
Value: https://your-app.vercel.app/api/auth/callback
👆 USE YOUR ACTUAL VERCEL URL

Name: STRIPE_SECRET_KEY
Value: sk_test_xxx or sk_live_xxx

Name: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
Value: pk_test_xxx or pk_live_xxx

Name: STRIPE_PRICE_ID
Value: price_xxx

Name: STRIPE_WEBHOOK_SECRET
Value: whsec_xxx

Name: NEXTAUTH_SECRET
Value: (generate with: openssl rand -base64 32)

Name: NEXTAUTH_URL
Value: https://your-app.vercel.app
👆 USE YOUR ACTUAL VERCEL URL
```

### Step 5: Redeploy

In Vercel:
- Deployments tab
- Click ⋯ on latest deployment
- Click "Redeploy"

### Step 6: Update TikTok & Stripe

**TikTok Partner Center:**
- Update redirect URI to: `https://your-app.vercel.app/api/auth/callback`

**Stripe Dashboard:**
- Add webhook: `https://your-app.vercel.app/api/stripe/webhook`
- Copy webhook secret → Add to Vercel as `STRIPE_WEBHOOK_SECRET`

---

## ✅ Done! Test It:

Visit: `https://your-app.vercel.app`

---

## 🎯 Why This is Best:

✅ **No local .env.local needed** - Add vars in Vercel UI
✅ **Auto-deploys on push** - Just `git push` to update
✅ **Easy to manage** - See all env vars in one place
✅ **Preview deployments** - Test branches before merging
✅ **Rollback easily** - Click to restore previous version

---

## 📝 Your Workflow Going Forward:

```bash
# Make changes to code
git add .
git commit -m "Added new feature"
git push

# Vercel auto-deploys! 🎉
```

**No need to run vercel command ever!**

