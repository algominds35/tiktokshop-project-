import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { exchangeCodeForToken } from '@/lib/tiktok-api'
import { db } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const error = searchParams.get('error')

    // Handle OAuth errors
    if (error) {
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}?error=${encodeURIComponent(error)}`
      )
    }

    // Verify state parameter
    const storedState = cookies().get('oauth_state')?.value
    if (!state || state !== storedState) {
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}?error=invalid_state`
      )
    }

    // Clear state cookie
    cookies().delete('oauth_state')

    if (!code) {
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}?error=no_code`
      )
    }

    // Exchange code for access token
    const tokenData = await exchangeCodeForToken(code)

    // For demo purposes, we'll create a simple user session
    // In production, you'd want proper user authentication
    const userEmail = `user_${tokenData.open_id}@tiktokshop.com`
    
    // Check if user exists
    let user = await db.getUserByEmail(userEmail)
    
    if (!user) {
      // Create new user with 7-day trial
      const trialEndsAt = new Date()
      trialEndsAt.setDate(trialEndsAt.getDate() + 14) // 14 days from now

      user = await db.createUser({
        email: userEmail,
        subscription_status: 'trialing',
        trial_ends_at: trialEndsAt.toISOString(),
      })
    }

    // Save TikTok connection
    await db.saveTikTokConnection({
      user_id: user.id,
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      shop_id: tokenData.seller_shop?.shop_id || null,
      expires_at: new Date(Date.now() + tokenData.expires_in * 1000).toISOString(),
    })

    // Set user session cookie
    cookies().set('user_id', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    })

    // Redirect to dashboard
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard`)
  } catch (error) {
    console.error('OAuth callback error:', error)
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}?error=oauth_failed`
    )
  }
}

