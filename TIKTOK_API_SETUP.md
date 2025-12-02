# TikTok Shop API Setup Guide

## 🔑 API Keys - When to Add Them

**You need to add API keys BEFORE running the app.**

The app won't work without:
- TikTok App Key & Secret
- Supabase credentials
- Stripe keys

Add them to `.env.local` file (see `ENV_EXAMPLE.txt`)

---

## 🎯 Required TikTok Shop API Scopes

When creating your TikTok Shop app, you MUST request these scopes:

### Required Scopes (Permissions)

```
✅ order.list           - View orders
✅ order.detail         - Get order details including fees
✅ seller.info          - Get shop information
```

### How to Set Scopes

1. Go to [TikTok Shop Partner Center](https://partner.tiktokshop.com)
2. Go to your app → **Authorization & APIs**
3. Select these permissions:
   - **Order Management** → `order.list`, `order.detail`
   - **Seller Management** → `seller.info`
4. Save and submit for review (if required)

---

## 📡 API Endpoints Used by ReconcileBook

### 1. **Get Orders** (Main Endpoint)
```
POST /order/202309/orders/search
```
**Purpose:** Fetch all orders with filters
**What we get:**
- Order ID
- Sale amounts
- Platform fees
- Payment processing fees
- Shipping fees
- Affiliate commissions
- Refund status

**Parameters we use:**
```javascript
{
  shop_id: "your_shop_id",
  create_time_from: timestamp,  // Last 30 days
  create_time_to: timestamp,
  page_size: 50,
  page: 1
}
```

### 2. **Get Order Details** (Optional - for more detail)
```
GET /order/202309/orders
```
**Purpose:** Get detailed info for specific order
**What we get:**
- Complete fee breakdown
- Item-level details
- Payment information

### 3. **Get Shop Info**
```
GET /shop/202309/shops
```
**Purpose:** Get seller shop information
**What we get:**
- Shop ID
- Shop name
- Shop status

### 4. **OAuth Token Exchange**
```
GET /token/202309/get
```
**Purpose:** Exchange authorization code for access token
**When:** After user authorizes your app

### 5. **Refresh Token**
```
GET /token/202309/refresh
```
**Purpose:** Refresh expired access token
**When:** Token expires (usually 24 hours)

---

## 📋 Fee Data Available from TikTok API

The app extracts these fees from each order:

```javascript
order.payment = {
  total_amount: 100.00,           // Gross sale
  platform_fee: 5.00,             // TikTok platform fee (5%)
  payment_processing_fee: 3.00,   // Payment processing
  seller_shipping_fee: 2.00,      // Shipping cost to seller
  affiliate_commission: 10.00,    // Creator commission
  refund_amount: 0.00,            // Refunds
}
```

**Real Profit Calculation:**
```
Net Profit = total_amount - (platform_fee + payment_processing_fee + seller_shipping_fee + affiliate_commission + refund_amount)
```

---

## 🔐 API Authentication Flow

### 1. User Authorization (OAuth 2.0)
```
User clicks "Connect TikTok Shop"
  ↓
App redirects to TikTok OAuth:
https://services.tiktokshop.com/open/authorize?app_key=XXX&state=XXX&redirect_uri=XXX
  ↓
User logs in and authorizes
  ↓
TikTok redirects back with code:
your-app.com/api/auth/callback?code=XXX&state=XXX
  ↓
App exchanges code for tokens:
POST /token/202309/get
  ↓
App stores access_token + refresh_token in Supabase
```

### 2. API Requests (with Signature)
```javascript
// Every API request needs:
{
  app_key: "your_app_key",
  timestamp: 1234567890,
  access_token: "user_access_token",
  sign: "generated_signature"  // HMAC-SHA256
}
```

**The app handles signature generation automatically in `lib/tiktok-api.js`**

---

## 🚨 Common Issues & Solutions

### Issue: "Invalid Signature"
**Cause:** Incorrect App Secret or signature algorithm
**Solution:** 
- Verify `TIKTOK_APP_SECRET` in `.env.local`
- Don't modify signature code in `lib/tiktok-api.js`

### Issue: "Invalid Access Token"
**Cause:** Token expired (24 hour lifetime)
**Solution:**
- Implement token refresh (code included in `lib/tiktok-api.js`)
- Reconnect TikTok Shop account

### Issue: "Scope Not Granted"
**Cause:** Missing required permissions
**Solution:**
- Check scopes in TikTok Partner Center
- User needs to re-authorize with correct scopes

### Issue: "No Orders Returned"
**Cause:** No orders in last 30 days OR shop not active
**Solution:**
- Verify shop has orders
- Check date range filters
- Ensure shop is in production mode

---

## 🧪 Testing Your TikTok App

### Before Production

1. **Sandbox Testing**
   - TikTok provides sandbox environment
   - Test OAuth flow
   - Test order fetching with dummy data

2. **Required Setup**
   ```
   ✅ App created in Partner Center
   ✅ Scopes configured (order.list, order.detail, seller.info)
   ✅ Redirect URI added: http://localhost:3000/api/auth/callback
   ✅ App Key & Secret copied
   ✅ App submitted for review (if required)
   ```

3. **Test Locally**
   ```bash
   # Add keys to .env.local
   npm run dev
   # Visit http://localhost:3000
   # Click "Connect TikTok Shop"
   # Authorize your test shop
   # Click "Sync Now"
   # Verify profit data displays
   ```

---

## 📝 TikTok Partner Center Checklist

### App Configuration

```
App Name: ReconcileBook Profit Tracker
App Description: Helps sellers understand real profit after TikTok fees
Category: Business Tools
Redirect URI: https://your-domain.vercel.app/api/auth/callback

Required Permissions:
✅ order.list
✅ order.detail  
✅ seller.info

App Status: Development → Submit for Review → Approved → Production
```

### Important Notes

⚠️ **Development Mode**
- Only you (app owner) can authorize
- Limited to test shops
- Good for initial testing

✅ **Production Mode**
- Any TikTok Shop seller can authorize
- Required before launching to public
- Requires app review by TikTok

---

## 🔄 Token Lifecycle

```
Access Token Lifetime: 24 hours
Refresh Token Lifetime: 60 days

Flow:
1. User authorizes → Get access_token (24h) + refresh_token (60d)
2. Use access_token for API calls
3. When expired → Use refresh_token to get new access_token
4. After 60 days → User must re-authorize
```

**The app stores both tokens in Supabase for automatic refresh**

---

## 📊 Data Sync Frequency

**Current Setup:** Manual sync (user clicks "Sync Now")

**Recommendation for Production:**
- Add automatic sync every 24 hours
- Use Vercel Cron Jobs (free)
- Add to `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/sync",
    "schedule": "0 0 * * *"
  }]
}
```

---

## 🎯 Quick Start Checklist

Before running the app, ensure you have:

### TikTok Shop Setup
- [ ] TikTok Shop Partner account created
- [ ] App created in Partner Center
- [ ] App Key copied to `TIKTOK_APP_KEY`
- [ ] App Secret copied to `TIKTOK_APP_SECRET`
- [ ] Scopes configured: order.list, order.detail, seller.info
- [ ] Redirect URI added: http://localhost:3000/api/auth/callback
- [ ] App status: Development (minimum) or Production (for launch)

### Other Services
- [ ] Supabase project created + schema.sql run
- [ ] Stripe product created ($29/month)
- [ ] All 12 environment variables in `.env.local`

### Ready to Test
```bash
npm install
npm run dev
# Visit http://localhost:3000
# Click "Connect TikTok Shop"
# Should redirect to TikTok OAuth
```

---

## 📞 Need Help?

**TikTok API Documentation:**
https://partner.tiktokshop.com/docv2/docs

**Common Questions:**

**Q: Do I need app review before testing?**
A: No, use Development mode to test with your own shop

**Q: Can I test without a real TikTok Shop?**
A: You need at least a TikTok Shop account (can use sandbox if available)

**Q: What if I don't have orders?**
A: The app will show "No data" - sync will work but display $0 values

**Q: How do I get Production approval?**
A: Submit app for review in Partner Center with description and use case

---

## ✅ You're Ready When...

✅ App created in TikTok Partner Center
✅ Scopes configured (3 permissions)
✅ API keys in `.env.local`
✅ App runs locally: `npm run dev`
✅ OAuth flow works (redirects to TikTok)
✅ Can authorize your test shop
✅ Sync returns data (or gracefully handles no data)

**Then deploy to Vercel! 🚀**

