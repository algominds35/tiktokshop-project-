import { NextResponse } from 'next/server'
import { getQuickBooksAuthUrl } from '@/lib/quickbooks-api'
import crypto from 'crypto'

/**
 * GET /api/quickbooks/connect
 * Redirects user to QuickBooks OAuth authorization page
 */
export async function GET(request) {
  try {
    // TODO: Get userId and shopId from session/query params
    // For now, we'll pass them via query params
    const { searchParams } = new URL(request.url)
    const shopId = searchParams.get('shopId')

    if (!shopId) {
      return NextResponse.json(
        { error: 'shopId is required' },
        { status: 400 }
      )
    }

    // Generate a random state parameter for CSRF protection
    // Store shopId in state so we can retrieve it in callback
    const state = crypto.randomBytes(16).toString('hex')
    const stateData = {
      state,
      shopId,
      timestamp: Date.now(),
    }

    // TODO: Store state in session or temporary database table
    // For production, you'd want to store this in Redis or a temp table
    // and validate it in the callback
    const encodedState = Buffer.from(JSON.stringify(stateData)).toString('base64')

    // Get QuickBooks authorization URL
    const authUrl = getQuickBooksAuthUrl(encodedState)

    // Redirect to QuickBooks
    return NextResponse.redirect(authUrl)
  } catch (error) {
    console.error('QuickBooks connect error:', error)
    return NextResponse.json(
      { error: 'Failed to initiate QuickBooks connection' },
      { status: 500 }
    )
  }
}

