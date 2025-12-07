'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function SubscribePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (searchParams.get('payment') === 'canceled') {
      setError('Payment was canceled. Please try again.')
    }
  }, [searchParams])

  const handleSubscribe = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create checkout session')
      }

      // Redirect to Stripe Checkout
      window.location.href = result.url
    } catch (err) {
      console.error('Subscribe error:', err)
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg"></div>
            <span className="text-2xl font-bold text-gray-900">ReconcileBook</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-10">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">⏰</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Trial Has Ended</h1>
            <p className="text-gray-600">Continue tracking your real profits with a paid subscription</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 text-sm text-center">{error}</p>
            </div>
          )}

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 mb-8 border-2 border-blue-200">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-gray-900 mb-2">
                $29
                <span className="text-2xl text-gray-600 font-normal">/month</span>
              </div>
              <p className="text-gray-600">All features included • Cancel anytime</p>
            </div>

            <ul className="space-y-3 mb-6">
              {[
                'Unlimited TikTok Shop connections',
                'Real-time profit tracking',
                'Complete fee breakdown',
                'Product profitability analysis',
                'QuickBooks integration',
                'Email support'
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg mb-4"
          >
            {loading ? 'Processing...' : 'Subscribe Now'}
          </button>

          <p className="text-center text-sm text-gray-500">
            Secure payment powered by Stripe
          </p>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Questions?{' '}
          <a href="mailto:support@reconcilebook.com" className="text-blue-600 hover:text-blue-700 font-medium">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  )
}

