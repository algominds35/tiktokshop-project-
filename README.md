# ReconcileBook - TikTok Shop Profit Tracker

A complete SaaS application that helps TikTok Shop sellers understand their real profit after all hidden fees. Built with Next.js 14 and deployed entirely on Vercel.

## 🎯 What It Does

TikTok Shop sellers receive net payouts after TikTok deducts multiple hidden fees. ReconcileBook:
- Connects to TikTok Shop via OAuth 2.0
- Automatically fetches order data via TikTok Shop API
- Calculates real profit after ALL fees (platform, payment, shipping, commissions, refunds)
- Shows dashboard with profit breakdown and product-level profitability
- Color-codes margins: Green (≥70%), Yellow (40-70%), Red (<40%)

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase PostgreSQL (cloud)
- **Styling**: Tailwind CSS
- **Authentication**: TikTok Shop OAuth 2.0
- **Payments**: Stripe ($29/month subscription with 7-day trial)
- **Deployment**: Vercel

## 📁 Project Structure

```
reconcilebook/
├── app/
│   ├── page.jsx                    # Landing page
│   ├── dashboard/page.jsx          # Profit dashboard
│   ├── layout.jsx                  # Root layout
│   ├── globals.css                 # Global styles
│   └── api/
│       ├── auth/
│       │   ├── tiktok/route.js    # OAuth initialization
│       │   └── callback/route.js  # OAuth callback handler
│       ├── sync/route.js          # Sync TikTok data
│       ├── profit/route.js        # Get profit calculations
│       └── stripe/
│           ├── checkout/route.js  # Create checkout session
│           └── webhook/route.js   # Handle Stripe webhooks
├── components/
│   ├── ProfitCards.jsx            # Revenue/profit cards
│   ├── FeeBreakdown.jsx           # Fee visualization
│   └── ProductTable.jsx           # Product profitability table
├── lib/
│   ├── tiktok-api.js              # TikTok API client
│   ├── profit-calculator.js       # Profit calculation logic
│   ├── supabase.js                # Supabase database client
│   └── stripe.js                  # Stripe payment client
├── database/
│   └── schema.sql                 # Database schema
├── package.json
├── tailwind.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

1. **Node.js** 18+ installed
2. **Supabase Account** (free tier works)
3. **TikTok Shop Developer Account** with app created
4. **Stripe Account** with product/price created
5. **Vercel Account** (free tier works)

### Setup Instructions

#### 1. Clone and Install

```bash
git clone <your-repo-url>
cd reconcilebook
npm install
```

#### 2. Setup Supabase Database

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the SQL from `database/schema.sql`
3. Note your project URL and API keys (Settings → API)

#### 3. Setup TikTok Shop API

1. Go to [TikTok Shop Partner Center](https://partner.tiktokshop.com)
2. Create a new app
3. Note your `App Key` and `App Secret`
4. Set redirect URI to: `https://your-domain.vercel.app/api/auth/callback`

#### 4. Setup Stripe

1. Create account at [stripe.com](https://stripe.com)
2. Create a product: **ReconcileBook Subscription** - $29/month
3. Copy the Price ID (starts with `price_`)
4. Get your API keys from Developers → API keys
5. Setup webhook endpoint: `https://your-domain.vercel.app/api/stripe/webhook`
   - Listen for events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`

#### 5. Environment Variables

Create `.env.local` file (use `.env.local.example` as template):

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# TikTok Shop API
TIKTOK_APP_KEY=your_app_key
TIKTOK_APP_SECRET=your_app_secret
TIKTOK_REDIRECT_URI=http://localhost:3000/api/auth/callback

# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_PRICE_ID=price_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# NextAuth
NEXTAUTH_SECRET=your_random_secret_here
NEXTAUTH_URL=http://localhost:3000
```

Generate `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

#### 6. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📤 Deployment to Vercel

### One-Command Deploy

```bash
npm install -g vercel
vercel
```

Follow the prompts to deploy.

### Add Environment Variables

After deployment, add all environment variables in Vercel dashboard:

1. Go to your project on Vercel
2. Settings → Environment Variables
3. Add all variables from `.env.local`
4. Update `TIKTOK_REDIRECT_URI` and `NEXTAUTH_URL` to your Vercel domain

### Update TikTok App

Update your TikTok Shop app redirect URI to:
```
https://your-app.vercel.app/api/auth/callback
```

### Update Stripe Webhook

Update your Stripe webhook endpoint to:
```
https://your-app.vercel.app/api/stripe/webhook
```

## 🎨 Features

### Landing Page
- Hero section with clear value proposition
- Feature highlights
- Problem/solution breakdown
- Simple pricing ($29/month)
- Call-to-action buttons

### OAuth Connection
- Secure TikTok Shop OAuth 2.0 flow
- State parameter validation
- Automatic token storage in Supabase

### Auto Sync
- Fetches last 30 days of orders
- Extracts all fee types:
  - Platform fees
  - Payment processing fees
  - Shipping fees
  - Affiliate commissions
  - Refunds
- Calculates profit and margins
- Stores snapshots in database

### Dashboard
- **4 Key Metrics Cards**: Gross Revenue, Total Fees, Net Profit, Margin
- **Fee Breakdown**: Visual breakdown of all fee types with percentages
- **Product Table**: Product-level profitability with color-coded margins
- **Sync Button**: Manual sync for fresh data
- **Quick Stats**: Last sync time, effective fee rate, product count

### Stripe Integration
- 7-day free trial
- $29/month subscription
- Customer portal for subscription management
- Webhook handling for subscription events

## 🔐 Security

- TikTok OAuth state validation
- HTTP-only cookies for session management
- Supabase Row Level Security (RLS)
- Environment variables for all secrets
- Stripe webhook signature verification

## 📊 Database Schema

### Tables
- **users**: User accounts with Stripe info
- **tiktok_connections**: OAuth tokens and shop IDs
- **profit_snapshots**: Historical profit data
- **product_profits**: Product-level profitability

See `database/schema.sql` for full schema.

## 🧮 Profit Calculation

```javascript
gross_revenue = sum(sale_amount)
total_fees = platform_fees + payment_fees + shipping_fees + commissions + refunds
net_profit = gross_revenue - total_fees
margin = (net_profit / gross_revenue) * 100
```

Product margins are color-coded:
- 🟢 Green: ≥70% margin (great!)
- 🟡 Yellow: 40-70% margin (okay)
- 🔴 Red: <40% margin (needs attention)

## 🐛 Troubleshooting

### OAuth Not Working
- Verify `TIKTOK_REDIRECT_URI` matches your TikTok app settings exactly
- Check that redirect URI is whitelisted in TikTok Partner Center

### Database Errors
- Ensure all tables are created (run `schema.sql`)
- Verify Supabase service role key has proper permissions

### Stripe Webhook Fails
- Check webhook secret matches Stripe dashboard
- Verify webhook endpoint is publicly accessible
- Test webhook in Stripe dashboard

### No Data After Sync
- Check TikTok Shop has orders in last 30 days
- Verify access token is valid and not expired
- Check API logs in Vercel dashboard

## 📝 API Endpoints

- `GET /api/auth/tiktok` - Start OAuth flow
- `GET /api/auth/callback` - OAuth callback handler
- `POST /api/sync` - Sync TikTok data
- `GET /api/profit` - Get profit data
- `POST /api/stripe/checkout` - Create checkout session
- `POST /api/stripe/webhook` - Handle Stripe webhooks

## 🔄 Future Enhancements

- Historical profit charts
- Email alerts for low-margin products
- Multi-shop support
- CSV export
- Inventory tracking
- Cost of goods (COGS) input

## 📄 License

MIT License - feel free to use for your own projects!

## 🤝 Support

For issues or questions:
1. Check troubleshooting section above
2. Review Vercel deployment logs
3. Check Supabase logs
4. Verify all environment variables are set correctly

## 🎉 Success!

Once deployed, your TikTok Shop profit tracker is live! Sellers can:
1. Connect their TikTok Shop (30 seconds)
2. See real profit breakdown (instantly)
3. Identify unprofitable products (color-coded)
4. Make data-driven pricing decisions

**No more guessing. Real numbers. Real profit.**

