# QuickBooks Online Integration Setup Guide

This guide will walk you through setting up QuickBooks Online integration for your TikTok Shop profit tracker.

## 🎯 What This Integration Does

The QuickBooks integration automatically creates journal entries in QuickBooks for each TikTok Shop settlement, using the clearing account method (similar to A2X and LinkMyBooks).

**For each settlement, it creates a journal entry with:**
- **Debit** Clearing Account = Net Payout (the amount you'll receive)
- **Credit** Revenue Account = Gross Revenue
- **Debit** Expense Accounts = All fees (platform, payment, shipping, commissions, refunds, adjustments)

This ensures your books accurately reflect all TikTok Shop transactions and fees.

## 📋 Prerequisites

1. Active QuickBooks Online account (any tier)
2. TikTok Shop account connected to your app
3. Basic understanding of double-entry accounting (or consult with your accountant)

## 🚀 Step 1: Create QuickBooks Developer App

### 1.1 Go to QuickBooks Developer Portal

1. Visit [developer.intuit.com](https://developer.intuit.com)
2. Sign in with your Intuit account (same as QuickBooks login)
3. Click **"My Apps"** in the top right
4. Click **"Create an app"**

### 1.2 Create Your App

1. **App Name**: "ReconcileBook QuickBooks Integration" (or your app name)
2. **Select API**: Choose **"QuickBooks Online Accounting"**
3. **Scopes**: Select `com.intuit.quickbooks.accounting`
4. Click **"Create app"**

### 1.3 Get Your Credentials

1. Go to **"Keys & OAuth"** tab
2. You'll see:
   - **Client ID** (starts with `AB...`)
   - **Client Secret** (click "Show" to reveal)
3. **Copy these** - you'll need them for environment variables

### 1.4 Set Redirect URIs

1. In the **"Keys & OAuth"** section
2. Under **"Redirect URIs"**, add:
   - For development: `http://localhost:3000/api/quickbooks/callback`
   - For production: `https://your-domain.vercel.app/api/quickbooks/callback`
3. Click **"Save"**

### 1.5 Choose Environment

- **Sandbox**: For development and testing (use sandbox QuickBooks companies)
- **Production**: For real QuickBooks companies (requires app verification by Intuit)

For development, start with **Sandbox**.

## 🗄️ Step 2: Set Up Database Tables

Run the SQL schema in your Supabase SQL Editor:

```bash
# In Supabase Dashboard:
# 1. Go to SQL Editor
# 2. Copy contents from database/quickbooks-schema.sql
# 3. Run the SQL
```

This creates three tables:
- `quickbooks_connections` - Stores OAuth tokens
- `quickbooks_account_mappings` - Stores account mappings
- `tiktok_settlements` - Stores settlement data (if not exists)

## ⚙️ Step 3: Configure Environment Variables

Add these to your `.env.local` (development) and Vercel environment variables (production):

```env
# QuickBooks OAuth Credentials
QBO_CLIENT_ID=your_client_id_here
QBO_CLIENT_SECRET=your_client_secret_here

# Redirect URI (must match what you set in QuickBooks Developer Portal)
QBO_REDIRECT_URI=http://localhost:3000/api/quickbooks/callback

# QuickBooks API URLs
# For Sandbox (development):
QBO_BASE_URL=https://sandbox-quickbooks.api.intuit.com
QBO_AUTH_URL=https://appcenter.intuit.com/connect/oauth2

# For Production:
# QBO_BASE_URL=https://quickbooks.api.intuit.com
# QBO_AUTH_URL=https://appcenter.intuit.com/connect/oauth2
```

## 📊 Step 4: Set Up QuickBooks Chart of Accounts

Before syncing settlements, you need to create the necessary accounts in QuickBooks.

### Recommended Account Structure

1. **Log in to QuickBooks Online**
2. Go to **Settings (⚙️) → Chart of Accounts**
3. Create these accounts:

#### Revenue Account
- **Type**: Income
- **Detail Type**: Sales of Product Income
- **Name**: "TikTok Shop Revenue"

#### Clearing Account (Most Important!)
- **Type**: Other Current Assets
- **Detail Type**: Other Current Assets
- **Name**: "TikTok Shop Clearing"
- **Description**: "Temporary holding for TikTok Shop settlements pending deposit"

#### Expense Accounts
- **Type**: Expenses
- **Detail Type**: Commissions & Fees
- Create these:
  - "TikTok Platform Fees"
  - "TikTok Payment Processing Fees"
  - "TikTok Affiliate Commissions"

#### Shipping Accounts
- **Income Type**: "Shipping Income" (for customer-paid shipping)
- **Expense Type**: "Shipping Expense" (for actual shipping costs)

#### Other Accounts
- "TikTok Refunds" (Expense)
- "TikTok Adjustments" (can be Income or Expense depending on your setup)

## 🔗 Step 5: Connect QuickBooks in Your App

### 5.1 User Flow

1. User clicks **"Connect QuickBooks"** in your app
2. They're redirected to QuickBooks authorization page
3. They select their QuickBooks company and authorize
4. They're redirected back to your app
5. Connection is saved in database

### 5.2 Implementation

The connection is initiated by visiting:

```
GET /api/quickbooks/connect?shopId={shopId}
```

The callback is handled automatically at:

```
GET /api/quickbooks/callback
```

## 🗺️ Step 6: Map Accounts

After connecting, users need to map their QuickBooks accounts to TikTok settlement fields.

### 6.1 Fetch Available Accounts

```javascript
const response = await fetch('/api/quickbooks/accounts?shopId=YOUR_SHOP_ID')
const { accounts } = await response.json()
```

### 6.2 Save Mapping

```javascript
await fetch('/api/quickbooks/mapping', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    shopId: 'YOUR_SHOP_ID',
    revenueAccountId: '80', // QuickBooks account ID
    clearingAccountId: '85',
    platformFeesAccountId: '62',
    paymentFeesAccountId: '63',
    shippingIncomeAccountId: '45',
    shippingExpenseAccountId: '64',
    affiliateCommissionAccountId: '65',
    refundsAccountId: '66',
    adjustmentsAccountId: '67',
  })
})
```

## 💾 Step 7: Sync Settlements

Once connected and mapped, you can sync settlements to QuickBooks.

### 7.1 Sync a Single Settlement

```javascript
const response = await fetch(`/api/quickbooks/settlements/${settlementId}/sync`, {
  method: 'POST'
})

const result = await response.json()
// { success: true, journalEntry: { id: '145', txnDate: '2024-12-01' } }
```

### 7.2 Check Sync Status

```javascript
const response = await fetch(`/api/quickbooks/settlements/${settlementId}/sync`)
const { synced, journalEntryId } = await response.json()
```

## 🧮 Understanding the Journal Entry

For a settlement with:
- Gross Revenue: $10,000
- Platform Fees: $1,500
- Payment Fees: $300
- Shipping Cost: $200
- Customer Shipping: $500
- Net Payout: $8,500

The journal entry will be:

```
DATE: Settlement End Date
DESCRIPTION: TikTok Shop Settlement: 2024-11-01 to 2024-11-30

DEBITS:
  TikTok Shop Clearing           $8,500.00
  TikTok Platform Fees           $1,500.00
  TikTok Payment Fees              $300.00
  Shipping Expense                 $200.00
TOTAL DEBITS:                   $10,500.00

CREDITS:
  TikTok Shop Revenue           $10,000.00
  Shipping Income                  $500.00
TOTAL CREDITS:                  $10,500.00
```

When the actual bank deposit arrives, you'll create a deposit transaction:
```
DR Bank Account: $8,500
CR TikTok Shop Clearing: $8,500
```

This clears the clearing account and matches your bank statement.

## 🔒 Security Best Practices

1. **Never commit credentials**: Use environment variables only
2. **Token security**: Refresh tokens are encrypted in database
3. **Validate state**: OAuth state parameter prevents CSRF attacks
4. **Use HTTPS**: Always use HTTPS in production
5. **Scope limitation**: Only request `accounting` scope (minimal permissions)

## 🧪 Testing

### Testing in Sandbox

1. Create a sandbox company at [developer.intuit.com/app/developer/sandbox](https://developer.intuit.com/app/developer/sandbox)
2. Use sandbox credentials in your `.env.local`
3. Connect to your sandbox company
4. Create test settlements and sync them
5. Verify journal entries in sandbox QuickBooks

### Testing Checklist

- [ ] OAuth connection works
- [ ] Tokens refresh automatically
- [ ] Accounts fetch correctly
- [ ] Mapping saves successfully
- [ ] Journal entries post to QuickBooks
- [ ] Settlement is marked as synced
- [ ] Error handling works (no connection, no mapping, invalid data)

## 🐛 Troubleshooting

### "No QuickBooks connection found"
→ User needs to connect QuickBooks via `/api/quickbooks/connect`

### "QuickBooks account mapping not configured"
→ User needs to set up account mappings via `/api/quickbooks/mapping`

### "Failed to create journal entry"
→ Check that:
- Account IDs are valid
- Debits and credits balance
- User has permissions in QuickBooks
- Access token is valid

### "Invalid grant" error
→ Refresh token expired (happens after 100 days). User needs to reconnect.

## 📚 Additional Resources

- [QuickBooks API Documentation](https://developer.intuit.com/app/developer/qbo/docs/get-started)
- [Journal Entry API Reference](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/journalentry)
- [OAuth 2.0 Guide](https://developer.intuit.com/app/developer/qbo/docs/develop/authentication-and-authorization/oauth-2.0)

## 🚢 Going to Production

Before launching with real QuickBooks companies:

1. **Get Production Keys**: Switch from sandbox to production in developer portal
2. **App Verification**: Intuit requires app review for production access
3. **Update Environment Variables**: Change to production URLs
4. **User Communication**: Inform users about QuickBooks integration
5. **Support Documentation**: Provide help docs for users

## 💰 Monetization Tip

Consider adding QuickBooks integration as a premium feature:
- Basic plan: Manual export
- Premium plan: Automatic QuickBooks sync

This adds significant value for accounting-conscious sellers!

