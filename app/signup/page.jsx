'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

function SignupContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    // Pre-fill email if coming from landing page
    const emailParam = searchParams.get('email')
    if (emailParam) {
      setEmail(emailParam)
    }
  }, [searchParams])

  const handleSignup = async (e) => {
    e.preventDefault()
    
    if (!email || email.trim() === '') {
      setError('Please enter your email')
      return
    }

    if (!password || password.trim() === '') {
      setError('Please enter a password')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    try {
      setLoading(true)
      setError('')
      
      // Create user with Supabase Auth (email confirmation required)
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      })

      if (signUpError) throw signUpError

      // Check if email confirmation is required
      if (authData.user && !authData.session) {
        // Email confirmation required - show message
        setSuccess(true)
        return
      }

      // If email confirmation not required (for testing), create user in database
      if (authData.user && authData.session) {
        const { error: dbError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: email,
            subscription_status: 'trialing',
            trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
          })

        if (dbError && !dbError.message.includes('duplicate')) {
          throw dbError
        }
        
        // Store in localStorage
        localStorage.setItem('user_email', email)
        localStorage.setItem('user_logged_in', 'true')
        localStorage.setItem('user_id', authData.user.id)
        localStorage.setItem('trial_start', new Date().toISOString())
        
        // Redirect to dashboard
        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 500)
        return
      }
      
    } catch (err) {
      console.error('Signup error:', err)
      setError(err.message || 'Something went wrong')
      setLoading(false)
    }
  }

  // Show verification message if signup successful but email confirmation required
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">✉️</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Check Your Email!</h1>
            <p className="text-gray-600 mb-4">
              We've sent a verification link to <strong>{email}</strong>
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Click the link in the email to verify your account and start your 14-day free trial.
            </p>
            <div className="space-y-3">
              <Link
                href="/login"
                className="block px-6 py-3 bg-[#FF6B5B] text-white rounded-xl hover:bg-[#FF5547] font-semibold transition-colors"
              >
                Go to Login
              </Link>
              <p className="text-xs text-gray-500">
                Didn't receive the email? Check your spam folder or{' '}
                <a href="/signup" className="text-[#FF6B5B] hover:underline">try again</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg"></div>
            <span className="text-2xl font-bold text-gray-900">ReconcileBook</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Start Your Free Trial</h1>
          <p className="text-gray-600">14 days free • No credit card required</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">What you get:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 14 days full access</li>
                  <li>• No credit card required</li>
                  <li>• Cancel anytime</li>
                  <li>• All features included</li>
                </ul>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSignup}>
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
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
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
              {loading ? 'Creating Account...' : 'Start For Free →'}
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-[#FF6B5B] hover:text-[#FF5547] font-medium">
              Sign In
            </Link>
          </p>
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          By signing up, you agree to our <Link href="/terms" className="underline">Terms</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    }>
      <SignupContent />
    </Suspense>
  )
}
