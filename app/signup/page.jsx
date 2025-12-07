'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignup = (e) => {
    e.preventDefault()
    
    if (!email) {
      setError('Please enter your email')
      return
    }

    try {
      setLoading(true)
      setError('')

      // Simple localStorage auth
      localStorage.setItem('user_email', email)
      localStorage.setItem('user_logged_in', 'true')
      localStorage.setItem('trial_start', new Date().toISOString())

      // Redirect immediately
      router.push('/dashboard')
    } catch (err) {
      setError(err.message)
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
            <div className="mb-6">
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
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-4 bg-[#FF6B5B] text-white rounded-xl hover:bg-[#FF5547] font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? 'Creating account...' : 'Start Free Trial →'}
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
