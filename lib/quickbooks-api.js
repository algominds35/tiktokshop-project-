// QuickBooks API Helper Functions
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const QBO_BASE_URL = process.env.QBO_BASE_URL || 'https://sandbox-quickbooks.api.intuit.com'
const QBO_AUTH_URL = process.env.QBO_AUTH_URL || 'https://appcenter.intuit.com/connect/oauth2'
const QBO_TOKEN_URL = 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer'
const QBO_CLIENT_ID = process.env.QBO_CLIENT_ID
const QBO_CLIENT_SECRET = process.env.QBO_CLIENT_SECRET
const QBO_REDIRECT_URI = process.env.QBO_REDIRECT_URI

/**
 * Generate QuickBooks OAuth authorization URL
 */
export function getQuickBooksAuthUrl(state) {
  const params = new URLSearchParams({
    client_id: QBO_CLIENT_ID,
    response_type: 'code',
    scope: 'com.intuit.quickbooks.accounting',
    redirect_uri: QBO_REDIRECT_URI,
    state: state,
  })

  return `${QBO_AUTH_URL}?${params.toString()}`
}

/**
 * Exchange authorization code for access token
 */
export async function exchangeCodeForToken(code) {
  const authHeader = Buffer.from(`${QBO_CLIENT_ID}:${QBO_CLIENT_SECRET}`).toString('base64')

  const response = await fetch(QBO_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${authHeader}`,
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: QBO_REDIRECT_URI,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to exchange code for token: ${error}`)
  }

  const data = await response.json()
  
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in, // seconds
    realmId: data.x_refresh_token_expires_in, // This is actually in the URL params
  }
}

/**
 * Refresh QuickBooks access token
 */
export async function refreshQuickBooksToken(refreshToken) {
  const authHeader = Buffer.from(`${QBO_CLIENT_ID}:${QBO_CLIENT_SECRET}`).toString('base64')

  const response = await fetch(QBO_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${authHeader}`,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to refresh token: ${error}`)
  }

  const data = await response.json()
  
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
  }
}

/**
 * Get valid QuickBooks access token for a shop (handles refresh automatically)
 */
export async function getQuickBooksAccessTokenForShop(shopId) {
  // TODO: Get userId from session/context
  const userId = 'TODO_GET_FROM_SESSION'

  // Fetch connection from database
  const { data: connection, error } = await supabase
    .from('quickbooks_connections')
    .select('*')
    .eq('shop_id', shopId)
    .single()

  if (error || !connection) {
    throw new Error('No QuickBooks connection found for this shop')
  }

  // Check if token is expired or will expire in next 5 minutes
  const expiresAt = new Date(connection.access_token_expires_at)
  const now = new Date()
  const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60 * 1000)

  if (expiresAt <= fiveMinutesFromNow) {
    console.log('Access token expired, refreshing...')
    
    // Refresh the token
    const { accessToken, refreshToken, expiresIn } = await refreshQuickBooksToken(
      connection.refresh_token
    )

    // Update in database
    const newExpiresAt = new Date(Date.now() + expiresIn * 1000).toISOString()
    
    await supabase
      .from('quickbooks_connections')
      .update({
        access_token: accessToken,
        refresh_token: refreshToken,
        access_token_expires_at: newExpiresAt,
      })
      .eq('id', connection.id)

    return {
      accessToken,
      realmId: connection.realm_id,
    }
  }

  return {
    accessToken: connection.access_token,
    realmId: connection.realm_id,
  }
}

/**
 * Fetch QuickBooks accounts for a realm
 */
export async function fetchQuickBooksAccounts(accessToken, realmId) {
  const query = `SELECT * FROM Account WHERE Active = true`
  const url = `${QBO_BASE_URL}/v3/company/${realmId}/query?query=${encodeURIComponent(query)}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json',
    },
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to fetch accounts: ${error}`)
  }

  const data = await response.json()
  return data.QueryResponse.Account || []
}

/**
 * Create a Journal Entry in QuickBooks
 */
export async function createJournalEntry(accessToken, realmId, journalEntryData) {
  const url = `${QBO_BASE_URL}/v3/company/${realmId}/journalentry?minorversion=65`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(journalEntryData),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to create journal entry: ${error}`)
  }

  const data = await response.json()
  return data.JournalEntry
}

/**
 * Build QuickBooks JournalEntry JSON from a TikTok settlement and account mapping
 * 
 * Accounting logic (double-entry):
 * DR Clearing Account = Net Payout
 * CR Revenue Account = Gross Revenue
 * DR Platform Fees Account = Platform Fees
 * DR Payment Fees Account = Payment Fees
 * DR Shipping Expense Account = Shipping Cost
 * CR Shipping Income Account = Customer Shipping Paid
 * DR Affiliate Commission Account = Affiliate Commissions
 * DR Refunds Account = Refunds
 * DR Adjustments Account = Adjustments
 */
export function buildJournalEntryFromSettlement(settlement, mapping) {
  const lines = []

  // Helper to add a line
  const addLine = (accountId, amount, type) => {
    if (amount && amount !== 0) {
      lines.push({
        DetailType: 'JournalEntryLineDetail',
        Amount: Math.abs(amount),
        JournalEntryLineDetail: {
          PostingType: type, // 'Debit' or 'Credit'
          AccountRef: {
            value: accountId,
          },
        },
      })
    }
  }

  // Debits
  addLine(mapping.clearing_account_id, settlement.net_payout, 'Debit')
  addLine(mapping.platform_fees_account_id, settlement.platform_fees, 'Debit')
  addLine(mapping.payment_fees_account_id, settlement.payment_fees, 'Debit')
  addLine(mapping.shipping_expense_account_id, settlement.shipping_cost, 'Debit')
  addLine(mapping.affiliate_commission_account_id, settlement.affiliate_commissions, 'Debit')
  addLine(mapping.refunds_account_id, settlement.refunds, 'Debit')
  addLine(mapping.adjustments_account_id, settlement.adjustments, 'Debit')

  // Credits
  addLine(mapping.revenue_account_id, settlement.gross_revenue, 'Credit')
  addLine(mapping.shipping_income_account_id, settlement.customer_shipping_paid, 'Credit')

  // Build the journal entry
  const txnDate = settlement.period_end.split('T')[0] // YYYY-MM-DD format

  return {
    TxnDate: txnDate,
    PrivateNote: `TikTok Shop Settlement: ${settlement.period_start} to ${settlement.period_end}`,
    Line: lines,
  }
}

