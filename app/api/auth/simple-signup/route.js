import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Check if user exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    let userId

    if (!existingUser) {
      // Create new user with trial
      const trialStart = new Date()
      const trialEnd = new Date(trialStart)
      trialEnd.setDate(trialEnd.getDate() + 14)

      const { data: newUser, error } = await supabase
        .from('users')
        .insert({
          email,
          trial_start_date: trialStart.toISOString(),
          trial_end_date: trialEnd.toISOString(),
          subscription_status: 'trial',
          created_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (error) throw error
      userId = newUser.id
    } else {
      userId = existingUser.id
    }

    // Create session cookie
    const cookieStore = await cookies()
    cookieStore.set('user_email', email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30 // 30 days
    })

    return NextResponse.json({ success: true, userId })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: error.message || 'Signup failed' },
      { status: 500 }
    )
  }
}

