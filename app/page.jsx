'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'

function HomeContent() {
  const searchParams = useSearchParams()
  const [error, setError] = useState('')

  useEffect(() => {
    const errorParam = searchParams.get('error')
    if (errorParam) {
      const errorMessages = {
        'invalid_state': 'OAuth state validation failed. Please try again.',
        'no_code': 'No authorization code received. Please try again.',
        'oauth_failed': 'Failed to connect to TikTok Shop. Please try again.',
        'canceled': 'Payment was canceled.',
      }
      setError(errorMessages[errorParam] || 'An error occurred. Please try again.')
    }
  }, [searchParams])

  const handleConnect = () => {
    window.location.href = '/api/auth/tiktok'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-cyan-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">📊</span>
            <span className="text-2xl font-bold text-gray-800">ReconcileBook</span>
          </div>
          <button
            onClick={handleConnect}
            className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
          >
            Sign In
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        {error && (
          <div className="max-w-2xl mx-auto mb-8 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 text-center">{error}</p>
          </div>
        )}

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Know Your Real<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500">
              TikTok Shop Profit
            </span>
            <br />
            in 30 Seconds
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            TikTok Shop hides fees and pays you net amounts. We show you exactly where your money goes and your real profit margins.
          </p>

          <button
            onClick={handleConnect}
            className="bg-gradient-to-r from-pink-500 to-cyan-500 text-white px-8 py-4 rounded-lg text-lg font-bold hover:shadow-xl transition-all transform hover:scale-105"
          >
            🚀 Connect TikTok Shop (Free Trial)
          </button>

          <p className="text-sm text-gray-500 mt-4">
            7-day free trial • No credit card required • Cancel anytime
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="text-4xl mb-4">🔗</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Instant Connection
            </h3>
            <p className="text-gray-600">
              Connect your TikTok Shop in one click via secure OAuth. No manual data entry.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              See All Hidden Fees
            </h3>
            <p className="text-gray-600">
              Platform fees, payment fees, shipping costs, commissions, and refunds - all in one place.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Product-Level Insights
            </h3>
            <p className="text-gray-600">
              Know which products are profitable and which ones are killing your margins.
            </p>
          </div>
        </div>

        {/* Problem/Solution */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-red-800 mb-4">
              ❌ The Problem
            </h2>
            <ul className="space-y-2 text-red-700">
              <li>• TikTok Shop takes multiple hidden fees before paying you</li>
              <li>• You see "net payout" but don't know your real profit margin</li>
              <li>• Some products look profitable but actually lose money</li>
              <li>• Hours spent trying to reconcile TikTok's confusing reports</li>
            </ul>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              ✅ The Solution
            </h2>
            <ul className="space-y-2 text-green-700">
              <li>• Automatic sync with TikTok Shop API</li>
              <li>• Complete fee breakdown (platform, payment, shipping, commissions)</li>
              <li>• Real profit margins per product with color-coded alerts</li>
              <li>• Know your numbers in 30 seconds, not 3 hours</li>
            </ul>
          </div>
        </div>

        {/* Pricing */}
        <div className="max-w-md mx-auto text-center mb-16">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-cyan-200">
            <div className="text-5xl mb-4">💎</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Simple Pricing</h2>
            <div className="text-5xl font-bold text-gray-900 mb-2">
              $29
              <span className="text-xl text-gray-600">/month</span>
            </div>
            <p className="text-gray-600 mb-6">
              Everything included. No hidden fees (we hate those too! 😉)
            </p>
            
            <ul className="text-left space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <span className="text-gray-700">Unlimited TikTok Shop sync</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <span className="text-gray-700">Real-time profit tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <span className="text-gray-700">Product profitability analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <span className="text-gray-700">Complete fee breakdown</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <span className="text-gray-700">7-day free trial</span>
              </li>
            </ul>

            <button
              onClick={handleConnect}
              className="w-full bg-gradient-to-r from-pink-500 to-cyan-500 text-white px-8 py-4 rounded-lg text-lg font-bold hover:shadow-xl transition-all"
            >
              Start Free Trial
            </button>
            <p className="text-xs text-gray-500 mt-3">Cancel anytime. No questions asked.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-pink-500 to-cyan-500 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Stop Guessing. Start Knowing.
          </h2>
          <p className="text-xl mb-6 opacity-90">
            Join TikTok Shop sellers who know their real numbers
          </p>
          <button
            onClick={handleConnect}
            className="bg-white text-gray-900 px-8 py-4 rounded-lg text-lg font-bold hover:shadow-xl transition-all transform hover:scale-105"
          >
            Connect TikTok Shop Now
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16 border-t border-gray-200">
        <div className="text-center text-gray-600">
          <p className="mb-2">© 2024 ReconcileBook. All rights reserved.</p>
          <p className="text-sm">
            We are not affiliated with TikTok or ByteDance.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-cyan-50 flex items-center justify-center"><div className="text-2xl">Loading...</div></div>}>
      <HomeContent />
    </Suspense>
  )
}

