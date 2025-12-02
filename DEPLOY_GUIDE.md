# 🚀 Deploy to Vercel (Recommended Method)

## ✅ Best Workflow: Git → Vercel → Add Env Vars

This is the **easiest and recommended** way to deploy!

---

## 📋 Quick Steps (5 minutes)

### Step 1: Create Git Repository (1 minute)

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - ReconcileBook TikTok profit tracker"
```

### Step 2: Push to GitHub (2 minutes)

#### Option A: GitHub Website (Easier)
1. Go to https://github.com/new
2. Name: `reconcilebook` (or whatever you want)
3. **Don't** initialize with README (we already have files)
4. Click "Create repository"
5. Copy the commands shown and run:

```bash
git remote add origin https://github.com/YOUR_USERNAME/reconcilebook.git
git branch -M main
git push -u origin main
```

#### Option B: GitHub CLI (If you have it)
```bash
gh repo create reconcilebook --public --source=. --push
```

### Step 3: Deploy to Vercel (2 minutes)

1. Go to https://vercel.com
2. Sign in (can use GitHub account)
3. Click "Add New" → "Project"
4. **Import** your GitHub repository (reconcilebook)
5. Vercel will auto-detect Next.js ✅
6. **DON'T** add environment variables yet
7. Click **"Deploy"**
8. Wait ~2 minutes for build

### Step 4: Add Environment Variables (3 minutes)

After deployment:

1. Go to your project on Vercel
2. Settings → Environment Variables
3. Add all 12 variables:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY

TIKTOK_APP_KEY
TIKTOK_APP_SECRET
TIKTOK_REDIRECT_URI

STRIPE_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_PRICE_ID
STRIPE_WEBHOOK_SECRET

NEXTAUTH_SECRET
NEXTAUTH_URL
```

**IMPORTANT UPDATES for Production:**
```bash
# Update these two for your live domain:
TIKTOK_REDIRECT_URI=https://your-app.vercel.app/api/auth/callback
NEXTAUTH_URL=https://your-app.vercel.app
```

4. Click "Save" for each variable
5. Choose "Production, Preview, and Development" for each

### Step 5: Redeploy (30 seconds)

After adding env vars:

1. Go to Deployments tab
2. Click ⋯ (three dots) on latest deployment
3. Click "Redeploy"
4. **OR** just push a new commit:

```bash
# Make any small change
git commit --allow-empty -m "Trigger redeploy"
git push
```

### Step 6: Update TikTok & Stripe (2 minutes)

#### TikTok Partner Center
1. Go to your app settings
2. Update Redirect URI to:
   ```
   https://your-app.vercel.app/api/auth/callback
   ```
3. Save

#### Stripe Webhook
1. Stripe Dashboard → Developers → Webhooks
2. Add endpoint:
   ```
   https://your-app.vercel.app/api/stripe/webhook
   ```
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
4. Copy webhook signing secret
5. Add to Vercel as `STRIPE_WEBHOOK_SECRET`

---

## 🎯 Why This Method is Best

✅ **Easy Environment Variable Management**
- Add/edit env vars in Vercel UI (no command line)
- See all vars at a glance
- Easy to update

✅ **Automatic Deployments**
- Push to GitHub → Auto-deploys to Vercel
- Preview deployments for branches
- Rollback easily

✅ **Better Workflow**
- Production + Preview + Development environments
- Environment-specific variables
- Team collaboration ready

✅ **No CLI Needed**
- Everything through web interface
- No `vercel` command needed
- Less complexity

---

## 📝 Complete Checklist

### Before Deploying
- [ ] All code is committed to Git
- [ ] Pushed to GitHub
- [ ] Have all API keys ready (Supabase, TikTok, Stripe)

### GitHub
- [ ] Repository created
- [ ] Code pushed to `main` branch
- [ ] Repository is public or Vercel has access

### Vercel
- [ ] Project imported from GitHub
- [ ] Initial deployment successful
- [ ] All 12 environment variables added
- [ ] `TIKTOK_REDIRECT_URI` updated to Vercel URL
- [ ] `NEXTAUTH_URL` updated to Vercel URL
- [ ] Redeployed after adding env vars

### TikTok Setup
- [ ] Redirect URI updated to: `https://your-app.vercel.app/api/auth/callback`
- [ ] Scopes set: `order.list`, `order.detail`, `seller.info`
- [ ] App approved (or in Development mode for testing)

### Stripe Setup
- [ ] Webhook endpoint added: `https://your-app.vercel.app/api/stripe/webhook`
- [ ] Webhook events selected (4 events)
- [ ] Webhook secret added to Vercel env vars
- [ ] Product created ($29/month)

### Supabase
- [ ] Database schema (`schema.sql`) executed
- [ ] Tables created successfully
- [ ] API keys added to Vercel

---

## 🧪 Test Your Live App

1. Visit: `https://your-app.vercel.app`
2. Click "Connect TikTok Shop"
3. Should redirect to TikTok OAuth ✅
4. Authorize your shop
5. Should redirect to Dashboard ✅
6. Click "Sync Now"
7. Should fetch and display data ✅

---

## 🔄 Making Updates Later

### Update Code
```bash
# Make changes to code
git add .
git commit -m "Description of changes"
git push
# Vercel auto-deploys! 🎉
```

### Update Environment Variables
1. Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Find variable → Click Edit
4. Update value → Save
5. Redeploy (Deployments → Redeploy)

---

## 📊 Vercel Dashboard Features

### Deployments Tab
- See all deployments
- Preview each one
- Rollback if needed
- View build logs

### Analytics
- Page views
- Performance metrics
- User activity

### Logs
- Real-time function logs
- Error tracking
- Debug issues

### Domains
- Add custom domain
- Free SSL certificate
- DNS configuration

---

## 🎯 Environment Variables You Need

### Supabase (3 variables)
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
```

### TikTok (3 variables)
```bash
TIKTOK_APP_KEY=your_app_key
TIKTOK_APP_SECRET=your_app_secret
TIKTOK_REDIRECT_URI=https://your-app.vercel.app/api/auth/callback
```

### Stripe (4 variables)
```bash
STRIPE_SECRET_KEY=sk_live_xxx or sk_test_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx or pk_test_xxx
STRIPE_PRICE_ID=price_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

### Auth (2 variables)
```bash
NEXTAUTH_SECRET=your_random_32_char_secret
NEXTAUTH_URL=https://your-app.vercel.app
```

**Total: 12 variables**

---

## 🚨 Common Issues

### "Build failed"
**Check Vercel build logs:**
- Settings → Environment Variables
- Make sure all `NEXT_PUBLIC_*` vars are added
- Redeploy

### "OAuth redirect mismatch"
**Fix:**
1. Check `TIKTOK_REDIRECT_URI` in Vercel env vars
2. Must match TikTok Partner Center EXACTLY
3. Should be: `https://your-app.vercel.app/api/auth/callback`

### "Database connection failed"
**Fix:**
1. Verify Supabase keys in Vercel
2. Check schema.sql was run in Supabase
3. Test Supabase connection in logs

### "Stripe webhook failed"
**Fix:**
1. Check `STRIPE_WEBHOOK_SECRET` in Vercel
2. Verify webhook endpoint in Stripe dashboard
3. Test webhook in Stripe dashboard

### Environment variable not updating
**Fix:**
1. Edit variable in Vercel
2. **Must redeploy** after changing env vars
3. Or push new commit to auto-deploy

---

## 💡 Pro Tips

### Use Preview Deployments
- Create branch: `git checkout -b feature-name`
- Push: `git push origin feature-name`
- Vercel creates preview URL
- Test before merging to main

### Check Build Logs
- Vercel → Deployments → Click deployment
- View Function Logs for runtime errors
- View Build Logs for build errors

### Custom Domain (Optional)
- Vercel → Settings → Domains
- Add your domain
- Update DNS records
- Free SSL included

### Enable Analytics
- Vercel → Analytics (free tier available)
- See real usage data
- Track performance

---

## ✅ You're Done When...

✅ App deployed to Vercel
✅ All 12 env vars added
✅ TikTok redirect URI updated
✅ Stripe webhook configured
✅ Can visit live URL
✅ OAuth flow works
✅ Sync displays data
✅ Stripe checkout works

---

## 🎉 Deployment Complete!

Your TikTok Shop profit tracker is now live!

**Share with sellers:**
```
🚀 ReconcileBook is live!
Know your real TikTok Shop profit in 30 seconds.
Visit: https://your-app.vercel.app
```

**Next steps:**
1. Test thoroughly
2. Share with beta users
3. Collect feedback
4. Iterate and improve

**Auto-deploys on every push to GitHub! 🔥**

