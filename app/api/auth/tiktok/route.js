import { NextResponse } from 'next/server'
import { getAuthorizationUrl } from '@/lib/tiktok-api'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  try {
    // Generate random state for OAuth security
    const state = Math.random().toString(36).substring(7)
    
    // Store state in cookie for verification
    cookies().set('oauth_state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 600, // 10 minutes
    })

    // Get authorization URL
    const authUrl = getAuthorizationUrl(state)

    return NextResponse.redirect(authUrl)
  } catch (error) {
    console.error('OAuth initialization error:', error)
    return NextResponse.json(
      { error: 'Failed to start OAuth flow' },
      { status: 500 }
    )
  }
}

