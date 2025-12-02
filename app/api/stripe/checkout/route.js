import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { db } from '@/lib/supabase'
import { createCheckoutSession } from '@/lib/stripe'

export async function POST(request) {
  try {
    // Get user from session
    const userId = cookies().get('user_id')?.value

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user details
    const user = await db.getUser(userId)
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Create Stripe checkout session
    const session = await createCheckoutSession(userId, user.email)

    return NextResponse.json({
      success: true,
      url: session.url,
    })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}

