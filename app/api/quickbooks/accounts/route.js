import { NextResponse } from 'next/server'
import { getQuickBooksAccessTokenForShop, fetchQuickBooksAccounts } from '@/lib/quickbooks-api'

export const dynamic = 'force-dynamic'

/**
 * GET /api/quickbooks/accounts?shopId=xxx
 * Fetches available QuickBooks accounts for display in mapping UI
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const shopId = searchParams.get('shopId')

    if (!shopId) {
      return NextResponse.json(
        { error: 'shopId is required' },
        { status: 400 }
      )
    }

    // Get valid access token (handles refresh if needed)
    const { accessToken, realmId } = await getQuickBooksAccessTokenForShop(shopId)

    // Fetch accounts from QuickBooks
    const accounts = await fetchQuickBooksAccounts(accessToken, realmId)

    // Format accounts for frontend
    const formattedAccounts = accounts.map(account => ({
      id: account.Id,
      name: account.Name,
      fullyQualifiedName: account.FullyQualifiedName,
      type: account.AccountType,
      subType: account.AccountSubType,
      active: account.Active,
    }))

    return NextResponse.json({
      success: true,
      accounts: formattedAccounts,
    })
  } catch (error) {
    console.error('Fetch QuickBooks accounts error:', error)
    
    if (error.message.includes('No QuickBooks connection')) {
      return NextResponse.json(
        { error: 'QuickBooks not connected. Please connect your QuickBooks account first.' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to fetch QuickBooks accounts' },
      { status: 500 }
    )
  }
}


