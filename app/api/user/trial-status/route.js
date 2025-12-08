import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function GET(request) {
  try {
    // Get user email from header (sent by dashboard)
    const email = request.headers.get('x-user-email')

    if (!email) {
      return NextResponse.json(
        { error: 'Email required' },
        { status: 400 }
      )
    }

    // Get user from database
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (error || !user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Calculate trial status
    const now = new Date()
    const trialEndsAt = user.trial_ends_at ? new Date(user.trial_ends_at) : null
    const subscriptionStatus = user.subscription_status || 'trialing'

    // Check if trial has expired
    const isTrialExpired = trialEndsAt 
      ? now > trialEndsAt 
      : false

    // Check if user has active access (active subscription or valid trial)
    const hasAccess = subscriptionStatus === 'active' || 
                     (subscriptionStatus === 'trialing' && !isTrialExpired)

    // Calculate days remaining
    let daysRemaining = null
    if (trialEndsAt && subscriptionStatus === 'trialing') {
      const diff = trialEndsAt - now
      daysRemaining = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
    }

    return NextResponse.json({
      subscriptionStatus,
      trialEndsAt: trialEndsAt?.toISOString() || null,
      isTrialExpired,
      hasAccess,
      daysRemaining,
      subscriptionPlan: user.subscription_plan || null,
    })
  } catch (error) {
    console.error('Trial status error:', error)
    return NextResponse.json(
      { error: 'Failed to check trial status' },
      { status: 500 }
    )
  }
}




