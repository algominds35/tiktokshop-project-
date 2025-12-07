'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

function CompleteRegistrationContent() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Get email from URL if Stripe passes it
    const emailParam = searchParams.get('email')
    if (emailParam) {
      setEmail(emailParam)
    }
  }, [searchParams])

  const handleComplete = async (e) => {
    e.preventDefault()
    
    if (!email || email.trim() === '') {
      setError('Please enter your email')
      return
    }

    if (!password || password.trim() === '') {
      setError('Please create a password')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    try {
      setLoading(true)
      setError('')
      
      // Check if user already exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single()

      if (existingUser) {
        // User exists, just update to active
        await supabase
          .from('users')
          .update({
            subscription_status: 'active',
          })
          .eq('email', email)

        // Log them in with existing password (they should use login page)
        setError('Account already exists. Please use the login page.')
        setLoading(false)
        return
      }

      // Create new user with Supabase Auth
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
      })

      if (signUpError) throw signUpError

      // Create user in database
      const { error: dbError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          email: email,
          subscription_status: 'active', // They just paid!
          trial_ends_at: null, // No trial needed, they paid
        })

      if (dbError && !dbError.message.includes('duplicate')) {
        throw dbError
      }
      
      // Log them in
      localStorage.setItem('user_email', email)
      localStorage.setItem('user_logged_in', 'true')
      localStorage.setItem('user_id', authData.user.id)
      localStorage.setItem('subscription_status', 'active')
      
      // Redirect to dashboard
      window.location.href = '/dashboard?welcome=true'
      
    } catch (err) {
      console.error('Registration error:', err)
      setError(err.message || 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg"></div>
            <span className="text-2xl font-bold text-gray-900">ReconcileBook</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✅</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
            <p className="text-gray-600">Complete your registration to access your dashboard</p>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-700 text-sm">{error}</p>
              {error.includes('already exists') && (
                <Link href="/login" className="text-red-700 text-sm font-semibold underline hover:text-red-900 mt-2 inline-block">
                  Go to Login Page →
                </Link>
              )}
            </div>
          )}

          <form onSubmit={handleComplete}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B5B] focus:border-transparent"
                disabled={loading}
                required
              />
              <p className="text-xs text-gray-500 mt-2">
                Use the same email you used for payment
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Create Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password (min. 6 characters)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B5B] focus:border-transparent"
                disabled={loading}
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-4 bg-[#FF6B5B] text-white rounded-xl hover:bg-[#FF5547] font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? 'Creating Your Account...' : 'Complete Registration →'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>What's next?</strong>
            </p>
            <ul className="text-sm text-gray-600 mt-2 space-y-1">
              <li>✓ Connect your TikTok Shop</li>
              <li>✓ View real-time profit tracking</li>
              <li>✓ Sync with QuickBooks</li>
            </ul>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Questions?{' '}
          <a href="mailto:support@reconcilebook.com" className="text-[#FF6B5B] hover:text-[#FF5547] font-medium">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  )
}

export default function CompleteRegistration() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    }>
      <CompleteRegistrationContent />
    </Suspense>
  )
}