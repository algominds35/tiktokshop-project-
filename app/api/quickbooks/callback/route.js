import { NextResponse } from 'next/server'
import { exchangeCodeForToken } from '@/lib/quickbooks-api'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

/**
 * GET /api/quickbooks/callback
 * Handles OAuth callback from QuickBooks
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const realmId = searchParams.get('realmId')
    const error = searchParams.get('error')

    // Check for OAuth errors
    if (error) {
      console.error('QuickBooks OAuth error:', error)
      return NextResponse.redirect(
        new URL('/?error=quickbooks_auth_failed', request.url)
      )
    }

    // Validate required parameters
    if (!code || !state || !realmId) {
      return NextResponse.redirect(
        new URL('/?error=invalid_callback', request.url)
      )
    }

    // TODO: Validate state parameter against stored value
    // Decode state to get shopId
    let stateData
    try {
      stateData = JSON.parse(Buffer.from(state, 'base64').toString('utf-8'))
    } catch (err) {
      console.error('Invalid state parameter:', err)
      return NextResponse.redirect(
        new URL('/?error=invalid_state', request.url)
      )
    }

    const { shopId } = stateData

    // Exchange authorization code for access token
    const { accessToken, refreshToken, expiresIn } = await exchangeCodeForToken(code)

    // Calculate expiration timestamp
    const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString()

    // Get userId from session
    const { getUserId } = await import('@/lib/auth')
    const userId = getUserId()
    
    if (!userId) {
      return NextResponse.redirect(
        new URL('/login?error=unauthorized', request.url)
      )
    }

    // Store or update connection in database
    const { data: existingConnection } = await supabase
      .from('quickbooks_connections')
      .select('id')
      .eq('shop_id', shopId)
      .single()

    if (existingConnection) {
      // Update existing connection
      await supabase
        .from('quickbooks_connections')
        .update({
          realm_id: realmId,
          access_token: accessToken,
          refresh_token: refreshToken,
          access_token_expires_at: expiresAt,
        })
        .eq('id', existingConnection.id)
    } else {
      // Create new connection
      await supabase
        .from('quickbooks_connections')
        .insert({
          user_id: userId,
          shop_id: shopId,
          realm_id: realmId,
          access_token: accessToken,
          refresh_token: refreshToken,
          access_token_expires_at: expiresAt,
        })
    }

    // Redirect to dashboard with success message
    return NextResponse.redirect(
      new URL('/dashboard?quickbooks=connected', request.url)
    )
  } catch (error) {
    console.error('QuickBooks callback error:', error)
    return NextResponse.redirect(
      new URL('/?error=quickbooks_callback_failed', request.url)
    )
  }
}


