# Quick Setup Guide

## 🚀 5-Minute Setup

### Step 1: Clone and Install (1 min)
```bash
git clone <your-repo>
cd reconcilebook
npm install
```

### Step 2: Setup Supabase (2 min)
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Go to SQL Editor → New Query
4. Copy/paste contents from `database/schema.sql`
5. Run the query
6. Go to Settings → API
7. Copy:
   - Project URL
   - `anon` key
   - `service_role` key

### Step 3: Setup TikTok Shop API (1 min)
1. Go to [TikTok Shop Partner Center](https://partner.tiktokshop.com)
2. Create app (if you haven't)
3. Copy App Key and App Secret
4. Add redirect URI: `http://localhost:3000/api/auth/callback` (for dev)

### Step 4: Setup Stripe (1 min)
1. Create account at [stripe.com](https://stripe.com)
2. Create product: "$29/month subscription"
3. Copy Price ID (starts with `price_`)
4. Copy API keys from Developers → API keys

### Step 5: Create .env.local
Copy `.env.local.example` to `.env.local` and fill in your values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

TIKTOK_APP_KEY=your_app_key
TIKTOK_APP_SECRET=your_app_secret
TIKTOK_REDIRECT_URI=http://localhost:3000/api/auth/callback

STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_PRICE_ID=price_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

NEXTAUTH_SECRET=$(openssl rand -base64 32)
NEXTAUTH_URL=http://localhost:3000
```

### Step 6: Run It!
```bash
npm run dev
```

Visit http://localhost:3000

---

## 🌐 Deploy to Vercel (2 min)

### Deploy
```bash
npm install -g vercel
vercel
```

### Add Environment Variables
1. Go to Vercel dashboard → Your Project
2. Settings → Environment Variables
3. Add all variables from `.env.local`
4. **Important**: Update these for production:
   - `TIKTOK_REDIRECT_URI=https://your-app.vercel.app/api/auth/callback`
   - `NEXTAUTH_URL=https://your-app.vercel.app`

### Update TikTok App
1. Go to TikTok Partner Center
2. Update redirect URI to: `https://your-app.vercel.app/api/auth/callback`

### Setup Stripe Webhook
1. Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-app.vercel.app/api/stripe/webhook`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
4. Copy webhook secret
5. Add to Vercel env vars as `STRIPE_WEBHOOK_SECRET`

---

## ✅ Test It

1. Visit your deployed URL
2. Click "Connect TikTok Shop"
3. Authorize the app
4. Click "Sync Now" on dashboard
5. See your profit breakdown!

---

## 🐛 Common Issues

**"OAuth failed"**
- Check redirect URI matches exactly (including http vs https)
- Verify TikTok app is in production mode

**"Database error"**
- Run schema.sql in Supabase
- Check service role key is correct

**"No data after sync"**
- Ensure TikTok Shop has orders
- Check that shop is connected and authorized

**"Stripe webhook failed"**
- Verify webhook secret is correct
- Check endpoint is publicly accessible
- Test in Stripe dashboard

---

## 📞 Need Help?

1. Check README.md for detailed docs
2. Review Vercel logs for errors
3. Check Supabase logs
4. Verify all env vars are set

---

## 🎉 You're Done!

Your TikTok Shop profit tracker is now live and ready to help sellers understand their real profitability!

