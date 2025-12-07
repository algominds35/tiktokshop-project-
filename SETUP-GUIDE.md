# ReconcileBook Setup Guide

## 🚀 Complete Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in your root directory with these variables:

```bash
# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase (Database)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# NextAuth (Authentication)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_string

# Google OAuth (Sign in with Google)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Stripe (Payments)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...

# TikTok Shop (existing)
TIKTOK_APP_KEY=your_tiktok_app_key
TIKTOK_APP_SECRET=your_tiktok_app_secret
```

---

### 2. Database Setup (Supabase)

1. Go to [https://supabase.com](https://supabase.com) and create a project
2. Copy the `supabase-schema.sql` file contents
3. Go to your Supabase SQL Editor
4. Paste and run the SQL to create the users table
5. Copy your API keys from Settings > API

---

### 3. Google OAuth Setup

1. Go to [https://console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable "Google+ API"
4. Go to "Credentials" > "Create Credentials" > "OAuth 2.0 Client ID"
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
6. Copy Client ID and Client Secret to `.env.local`

---

### 4. Stripe Setup

#### Create Product & Price:

1. Go to [https://dashboard.stripe.com](https://dashboard.stripe.com)
2. Go to **Products** > **Add Product**
3. Name: "ReconcileBook Pro"
4. Pricing: **Recurring** → $29/month
5. Copy the **Price ID** (starts with `price_...`)
6. Add to `.env.local` as `STRIPE_PRICE_ID`

#### Get API Keys:

7. Go to **Developers** > **API Keys**
8. Copy **Secret key** and **Publishable key**
9. Add to `.env.local`

#### Set up Webhook:

10. Go to **Developers** > **Webhooks** > **Add endpoint**
11. Endpoint URL: `https://yourdomain.com/api/stripe/webhook`
12. Select events:
    - `checkout.session.completed`
    - `customer.subscription.deleted`
    - `customer.subscription.updated`
13. Copy the **Signing secret** (starts with `whsec_...`)
14. Add to `.env.local` as `STRIPE_WEBHOOK_SECRET`

---

### 5. NextAuth Secret

Generate a random secret for NextAuth:

```bash
openssl rand -base64 32
```

Add the output to `.env.local` as `NEXTAUTH_SECRET`

---

### 6. Run the Application

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 🎯 How It Works

### User Flow:

1. **User visits landing page** → Sees demo + features
2. **Clicks "Try Demo"** → Interactive modal with sample data
3. **Clicks "Start Free Trial"** → Signs up with Google
4. **14-Day Trial Starts** → Full access, no credit card
5. **Day 15** → Redirected to payment page
6. **After Payment** → Subscription activated via Stripe webhook

### Trial System:

- Trial automatically starts on signup
- No credit card required
- 14 days full access
- Auto-redirect to payment after expiration
- Dashboard shows remaining days

### Payment Flow:

1. User clicks "Subscribe Now"
2. Creates Stripe Checkout session
3. User pays via Stripe
4. Webhook updates user status to "active"
5. User can access dashboard indefinitely

---

## 📁 Key Files

- `app/page.jsx` - Landing page with demo
- `app/login/page.jsx` - Sign in page
- `app/signup/page.jsx` - Sign up page
- `app/dashboard/page.jsx` - Main dashboard (demo removed)
- `app/subscribe/page.jsx` - Payment page
- `app/api/auth/[...nextauth]/route.js` - Google OAuth + trial creation
- `app/api/stripe/checkout/route.js` - Create payment session
- `app/api/stripe/webhook/route.js` - Handle Stripe events
- `supabase-schema.sql` - Database schema

---

## ✅ Features Implemented

✅ Professional, unique landing page design  
✅ Interactive demo modal on landing page  
✅ Google OAuth sign-in  
✅ 14-day free trial (no credit card)  
✅ Trial countdown in dashboard  
✅ Auto-redirect when trial expires  
✅ Stripe payment integration  
✅ Webhook handling for subscription status  
✅ Removed demo mode from dashboard  

---

## 🚨 Important Notes

1. **Test Mode First**: Use Stripe test keys before going live
2. **Webhook Testing**: Use Stripe CLI for local webhook testing:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
3. **Production URLs**: Update all URLs in env vars for production
4. **Security**: Never commit `.env.local` to git

---

## 🎨 Design Highlights

- Clean, modern UI (not generic AI SaaS look)
- Professional typography and spacing
- Smooth transitions and hover states
- Mobile responsive
- Accessible color contrast
- No overused gradients everywhere

---

## 💡 Next Steps

1. Add your Stripe keys
2. Configure Google OAuth
3. Set up Supabase database
4. Test the complete flow
5. Deploy to Vercel
6. Update production URLs

---

Need help? Check the inline comments in each file!



