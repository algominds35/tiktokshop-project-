# ReconcileBook - Complete Project Structure

## 📂 File Tree

```
reconcilebook/
│
├── 📄 package.json              # Dependencies and scripts
├── 📄 next.config.js            # Next.js configuration
├── 📄 tailwind.config.js        # Tailwind CSS configuration
├── 📄 postcss.config.js         # PostCSS configuration
├── 📄 jsconfig.json             # JavaScript/path configuration
├── 📄 vercel.json               # Vercel deployment config
├── 📄 .gitignore                # Git ignore rules
│
├── 📄 README.md                 # Full documentation
├── 📄 SETUP_GUIDE.md            # Quick setup guide
├── 📄 ENV_EXAMPLE.txt           # Environment variables template
│
├── 📁 app/                      # Next.js 14 App Router
│   ├── 📄 layout.jsx            # Root layout with metadata
│   ├── 📄 page.jsx              # Landing page (home)
│   ├── 📄 globals.css           # Global Tailwind styles
│   │
│   ├── 📁 dashboard/
│   │   └── 📄 page.jsx          # Main dashboard page
│   │
│   └── 📁 api/                  # API Routes (serverless functions)
│       ├── 📁 auth/
│       │   ├── 📁 tiktok/
│       │   │   └── 📄 route.js  # Start TikTok OAuth flow
│       │   └── 📁 callback/
│       │       └── 📄 route.js  # Handle OAuth callback
│       │
│       ├── 📁 sync/
│       │   └── 📄 route.js      # Sync TikTok data (POST)
│       │
│       ├── 📁 profit/
│       │   └── 📄 route.js      # Get profit data (GET)
│       │
│       └── 📁 stripe/
│           ├── 📁 checkout/
│           │   └── 📄 route.js  # Create checkout session (POST)
│           └── 📁 webhook/
│               └── 📄 route.js  # Handle Stripe webhooks (POST)
│
├── 📁 components/               # React components
│   ├── 📄 ProfitCards.jsx       # 4 metric cards component
│   ├── 📄 FeeBreakdown.jsx      # Fee visualization component
│   └── 📄 ProductTable.jsx      # Product profitability table
│
├── 📁 lib/                      # Utility libraries
│   ├── 📄 supabase.js           # Supabase client & DB operations
│   ├── 📄 tiktok-api.js         # TikTok API client & OAuth
│   ├── 📄 stripe.js             # Stripe client & helpers
│   └── 📄 profit-calculator.js  # Profit calculation logic
│
└── 📁 database/
    └── 📄 schema.sql            # PostgreSQL schema for Supabase
```

## 🎯 What Each File Does

### Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | npm dependencies (Next.js, React, Supabase, Stripe, etc.) |
| `next.config.js` | Next.js framework configuration |
| `tailwind.config.js` | Tailwind CSS theme and content paths |
| `postcss.config.js` | PostCSS configuration for Tailwind |
| `jsconfig.json` | Path aliases (`@/` points to root) |
| `vercel.json` | Vercel deployment settings |
| `.gitignore` | Files to ignore in git (node_modules, .env, etc.) |

### Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Complete project documentation |
| `SETUP_GUIDE.md` | Quick 5-minute setup instructions |
| `ENV_EXAMPLE.txt` | Environment variables template |
| `PROJECT_STRUCTURE.md` | This file - explains structure |

### App Files (Frontend & Backend)

#### Pages

| File | Route | Purpose |
|------|-------|---------|
| `app/layout.jsx` | All pages | Root layout with font & metadata |
| `app/page.jsx` | `/` | Landing page with hero & pricing |
| `app/dashboard/page.jsx` | `/dashboard` | Main profit dashboard |
| `app/globals.css` | - | Global Tailwind CSS imports |

#### API Routes (Serverless Functions)

| File | Route | Method | Purpose |
|------|-------|--------|---------|
| `app/api/auth/tiktok/route.js` | `/api/auth/tiktok` | GET | Start TikTok OAuth flow |
| `app/api/auth/callback/route.js` | `/api/auth/callback` | GET | Handle OAuth callback & save tokens |
| `app/api/sync/route.js` | `/api/sync` | POST | Fetch orders from TikTok & calculate profit |
| `app/api/profit/route.js` | `/api/profit` | GET | Get latest profit snapshot |
| `app/api/stripe/checkout/route.js` | `/api/stripe/checkout` | POST | Create Stripe checkout session |
| `app/api/stripe/webhook/route.js` | `/api/stripe/webhook` | POST | Handle Stripe webhook events |

### Components

| File | Used In | Purpose |
|------|---------|---------|
| `components/ProfitCards.jsx` | Dashboard | Shows 4 cards: Revenue, Fees, Profit, Margin |
| `components/FeeBreakdown.jsx` | Dashboard | Visual breakdown of fee types with progress bars |
| `components/ProductTable.jsx` | Dashboard | Table showing product profitability with color-coded margins |

### Library/Utility Files

| File | Used By | Purpose |
|------|---------|---------|
| `lib/supabase.js` | All API routes | Supabase client + database CRUD operations |
| `lib/tiktok-api.js` | Auth & Sync | TikTok API client, OAuth helpers, signature generation |
| `lib/stripe.js` | Stripe routes | Stripe client, checkout, webhooks |
| `lib/profit-calculator.js` | Sync route, Components | Calculate profit from orders, color-code margins |

### Database

| File | Purpose |
|------|---------|
| `database/schema.sql` | PostgreSQL schema with 4 tables: users, tiktok_connections, profit_snapshots, product_profits |

## 🔄 Data Flow

### 1. OAuth Connection Flow
```
User clicks "Connect TikTok Shop"
  ↓
GET /api/auth/tiktok
  ↓
Redirect to TikTok OAuth
  ↓
User authorizes
  ↓
GET /api/auth/callback
  ↓
Exchange code for tokens
  ↓
Save to Supabase (tiktok_connections)
  ↓
Redirect to /dashboard
```

### 2. Data Sync Flow
```
User clicks "Sync Now"
  ↓
POST /api/sync
  ↓
Fetch orders from TikTok API (last 30 days)
  ↓
Calculate profit (lib/profit-calculator.js)
  ↓
Save snapshot to Supabase (profit_snapshots + product_profits)
  ↓
Return success
  ↓
Dashboard refreshes with new data
```

### 3. Payment Flow
```
User clicks "Manage Subscription"
  ↓
POST /api/stripe/checkout
  ↓
Create Stripe checkout session
  ↓
Redirect to Stripe hosted page
  ↓
User completes payment
  ↓
Stripe sends webhook to /api/stripe/webhook
  ↓
Update user subscription_status in Supabase
  ↓
User can now sync data
```

## 🗄️ Database Schema

### Tables

**users**
- `id` (UUID, PK)
- `email` (VARCHAR, unique)
- `stripe_customer_id` (VARCHAR)
- `subscription_status` (VARCHAR: trial/active/past_due/cancelled)
- `created_at`, `updated_at` (TIMESTAMP)

**tiktok_connections**
- `id` (UUID, PK)
- `user_id` (UUID, FK → users)
- `access_token` (TEXT)
- `refresh_token` (TEXT)
- `shop_id` (VARCHAR)
- `expires_at` (TIMESTAMP)
- `created_at`, `updated_at` (TIMESTAMP)

**profit_snapshots**
- `id` (UUID, PK)
- `user_id` (UUID, FK → users)
- `revenue` (DECIMAL)
- `fees` (DECIMAL)
- `profit` (DECIMAL)
- `margin` (DECIMAL)
- `fee_breakdown` (JSONB)
- `date` (TIMESTAMP)
- `created_at` (TIMESTAMP)

**product_profits**
- `id` (UUID, PK)
- `snapshot_id` (UUID, FK → profit_snapshots)
- `product_name` (VARCHAR)
- `revenue` (DECIMAL)
- `fees` (DECIMAL)
- `profit` (DECIMAL)
- `margin` (DECIMAL)
- `created_at` (TIMESTAMP)

## 🚀 Key Technologies

- **Next.js 14** (App Router) - Full-stack React framework
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS
- **Supabase** - PostgreSQL database (cloud)
- **TikTok Shop API** - Order & fee data
- **Stripe** - Payment processing
- **Vercel** - Serverless deployment

## 📦 npm Packages

### Production Dependencies
- `next` - Framework
- `react`, `react-dom` - UI
- `@supabase/supabase-js` - Database client
- `stripe` - Payment processing
- `axios` - HTTP requests
- `date-fns` - Date utilities

### Dev Dependencies
- `tailwindcss` - CSS framework
- `autoprefixer`, `postcss` - CSS processing
- `eslint`, `eslint-config-next` - Linting

## 🎨 Design Features

### Landing Page
- Gradient hero section (pink to cyan)
- 3 feature cards
- Problem/solution boxes (red/green)
- Pricing card with CTA
- Fully responsive

### Dashboard
- 4 metric cards with icons
- Fee breakdown with animated progress bars
- Product table with color-coded margins:
  - 🟢 Green: ≥70% (great!)
  - 🟡 Yellow: 40-70% (okay)
  - 🔴 Red: <40% (attention needed)
- Sync button with loading state
- Quick stats panel

## 🔐 Security Features

✅ TikTok OAuth state validation
✅ HTTP-only cookies for sessions
✅ Supabase Row Level Security
✅ Environment variables for secrets
✅ Stripe webhook signature verification
✅ CSRF protection via Next.js

## 📝 Environment Variables Required

See `ENV_EXAMPLE.txt` for the complete list. You need:
- Supabase credentials (3 vars)
- TikTok Shop API keys (3 vars)
- Stripe keys (4 vars)
- NextAuth config (2 vars)

**Total: 12 environment variables**

## 🎯 Success Criteria

✅ Complete Next.js 14 App Router structure
✅ TikTok Shop OAuth integration
✅ Automatic order sync & profit calculation
✅ Product-level profitability analysis
✅ Stripe subscription with 7-day trial
✅ Beautiful, responsive UI
✅ Vercel-ready deployment
✅ Production-ready security
✅ Complete documentation

## 🚀 Next Steps

1. Follow `SETUP_GUIDE.md` to set up locally
2. Test OAuth, sync, and payments
3. Deploy to Vercel using `vercel` command
4. Update environment variables for production
5. Test live deployment
6. Share with TikTok Shop sellers!

---

**Total Files Created: 28**
**Total Lines of Code: ~2,500+**
**Time to Deploy: ~10 minutes**

🎉 **Ready to ship!**

