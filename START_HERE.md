# ⚡ START HERE - Quick Setup

## ✅ Is the Code Ready?

**YES!** All code is complete and production-ready. You just need to add your API keys.

---

## 🔑 What You Need to Do NOW

### Step 1: Install Dependencies (30 seconds)
```bash
npm install
```

### Step 2: Get Your API Keys (5-10 minutes)

You need keys from 3 services:

#### A. Supabase (2 minutes)
1. Go to https://supabase.com
2. Create new project (wait ~2 min for setup)
3. Go to SQL Editor → New Query
4. Copy/paste from `database/schema.sql` → Run
5. Go to Settings → API
6. Copy these 3 values:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key (secret!) → `SUPABASE_SERVICE_ROLE_KEY`

#### B. TikTok Shop API (3 minutes)
1. Go to https://partner.tiktokshop.com
2. Apps → Create App
3. Fill in:
   - **Name:** ReconcileBook
   - **Redirect URI:** `http://localhost:3000/api/auth/callback`
   - **Scopes:** Select these 3:
     - ✅ `order.list`
     - ✅ `order.detail`
     - ✅ `seller.info`
4. Save and copy:
   - `App Key` → `TIKTOK_APP_KEY`
   - `App Secret` → `TIKTOK_APP_SECRET`

#### C. Stripe (2 minutes)
1. Go to https://stripe.com
2. Create account (can use test mode)
3. Products → Add Product:
   - Name: "ReconcileBook Subscription"
   - Price: $29/month recurring
4. Copy:
   - Price ID (starts with `price_`) → `STRIPE_PRICE_ID`
5. Developers → API Keys:
   - Secret key → `STRIPE_SECRET_KEY`
   - Publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### Step 3: Create .env.local File (1 minute)

Copy `ENV_EXAMPLE.txt` to `.env.local`:

```bash
# Windows
copy ENV_EXAMPLE.txt .env.local

# Mac/Linux
cp ENV_EXAMPLE.txt .env.local
```

Then open `.env.local` and fill in all 12 values.

**Generate NEXTAUTH_SECRET:**
```bash
# Mac/Linux
openssl rand -base64 32

# Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

### Step 4: Run It! (5 seconds)
```bash
npm run dev
```

Visit: http://localhost:3000

---

## 🎯 Required TikTok Scopes

Your TikTok app MUST have these 3 permissions:

```
✅ order.list       - View list of orders
✅ order.detail     - See order details with fees
✅ seller.info      - Get shop information
```

**How to set:**
- TikTok Partner Center → Your App → Authorization & APIs
- Select the 3 permissions above
- Save

---

## 📡 API Endpoints Used

The app automatically uses these TikTok API endpoints:

1. **Orders:** `/order/202309/orders/search` - Fetches orders from last 30 days
2. **Details:** `/order/202309/orders` - Gets fee breakdown
3. **Shop Info:** `/shop/202309/shops` - Gets shop details
4. **OAuth:** `/token/202309/get` - Exchanges auth code for tokens

**You don't need to configure these - they're already in the code!**

---

## 📋 Quick Checklist

Before running `npm run dev`:

- [ ] `npm install` completed
- [ ] Supabase project created
- [ ] Database schema (`schema.sql`) ran in Supabase
- [ ] TikTok Shop app created
- [ ] TikTok scopes set: `order.list`, `order.detail`, `seller.info`
- [ ] Stripe product created ($29/month)
- [ ] `.env.local` file created with ALL 12 variables filled
- [ ] `NEXTAUTH_SECRET` generated (32+ characters)

---

## 🧪 Test It

1. Run: `npm run dev`
2. Visit: http://localhost:3000
3. Click: "Connect TikTok Shop"
4. **Should redirect to TikTok login** ✅
5. Authorize your shop
6. **Should redirect to Dashboard** ✅
7. Click: "Sync Now"
8. **Should show profit data** ✅ (or "No data" if no orders)

---

## 🚨 Troubleshooting

### "Module not found" error
```bash
npm install
```

### "OAuth failed" or "Invalid redirect URI"
- Check `TIKTOK_REDIRECT_URI` in `.env.local`
- Must match EXACTLY in TikTok Partner Center
- Should be: `http://localhost:3000/api/auth/callback`

### "Database error"
- Run `database/schema.sql` in Supabase SQL Editor
- Check `SUPABASE_SERVICE_ROLE_KEY` is correct

### "No data after sync"
- Check TikTok Shop has orders in last 30 days
- Verify scopes are granted
- Check Vercel/console logs for errors

---

## 🚀 Deploy to Vercel (After Local Testing Works)

```bash
npm install -g vercel
vercel
```

Then:
1. Add all env vars in Vercel dashboard
2. Update `TIKTOK_REDIRECT_URI` to: `https://your-app.vercel.app/api/auth/callback`
3. Update `NEXTAUTH_URL` to: `https://your-app.vercel.app`
4. Update redirect URI in TikTok Partner Center

---

## 📚 More Documentation

- `TIKTOK_API_SETUP.md` - Complete TikTok API guide with scopes
- `SETUP_GUIDE.md` - Detailed setup instructions
- `README.md` - Full documentation
- `PROJECT_STRUCTURE.md` - Code structure explained

---

## ✅ Summary

**YES, the dashboard is ready!**

**NO, don't add API keys to the code** - add them to `.env.local`

**Required scopes:** `order.list`, `order.detail`, `seller.info`

**Endpoints:** Already coded in `lib/tiktok-api.js` - you don't touch them

**Next step:** Follow this guide to add your API keys and run it!

🎉 **You're 10 minutes away from running your TikTok profit tracker!**

