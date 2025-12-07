import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function GET(request) {
  try {
    const email = request.headers.get('x-user-email')
    
    if (!email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user from database
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (error || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const now = new Date()
    const trialEndsAt = user.trial_ends_at ? new Date(user.trial_ends_at) : null
    const subscriptionStatus = user.subscription_status || 'trialing'

    // Check if trial expired
    let isTrialExpired = false
    let daysRemaining = 0

    if (subscriptionStatus === 'trialing' && trialEndsAt) {
      isTrialExpired = now > trialEndsAt
      const diffTime = trialEndsAt - now
      daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      if (daysRemaining < 0) daysRemaining = 0
    }

    // If user has active subscription, they're good
    const hasAccess = subscriptionStatus === 'active' || 
                     (subscriptionStatus === 'trialing' && !isTrialExpired)

    return NextResponse.json({
      hasAccess,
      subscriptionStatus,
      isTrialExpired,
      daysRemaining,
      trialEndsAt: user.trial_ends_at,
      subscriptionPlan: user.subscription_plan
    })
  } catch (error) {
    console.error('Trial status error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to check trial status' },
      { status: 500 }
    )
  }
}

