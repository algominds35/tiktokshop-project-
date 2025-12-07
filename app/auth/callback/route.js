import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function GET(request) {
  const requestUrl = new URL(request.url)
  const token_hash = requestUrl.searchParams.get('token_hash')
  const type = requestUrl.searchParams.get('type')
  const next = requestUrl.searchParams.get('next') || '/dashboard'

  if (token_hash && type) {
    // Verify the token and exchange it for a session
    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })

    if (error) {
      // Redirect to login page with error
      return NextResponse.redirect(`${requestUrl.origin}/login?error=${encodeURIComponent(error.message)}`)
    }

    if (data.user) {
      // User verified! Create or update user in database
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('email', data.user.email)
        .single()

      if (!existingUser) {
        // Create user in database with trial
        await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email: data.user.email,
            subscription_status: 'trialing',
            trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
          })
      } else {
        // Update existing user to verified if needed
        await supabase
          .from('users')
          .update({
            subscription_status: 'trialing',
            trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
          })
          .eq('email', data.user.email)
      }

      // Redirect to dashboard with session
      const response = NextResponse.redirect(`${requestUrl.origin}${next}?verified=true`)
      
      // Set auth cookie (optional, since we're using localStorage)
      return response
    }
  }

  // Fallback redirect
  return NextResponse.redirect(`${requestUrl.origin}/login`)
}

