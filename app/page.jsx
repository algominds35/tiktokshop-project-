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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded"></div>
              <span className="text-2xl font-bold text-slate-900">ReconcileBook</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => window.location.href = '/login'}
                className="px-6 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => window.location.href = '/signup'}
                className="px-6 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        {error && (
          <div className="max-w-2xl mx-auto mb-8 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 text-center">{error}</p>
          </div>
        )}

        <div className="text-center mb-20 pt-20">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Know Your Real<br />
            <span className="text-blue-600">TikTok Shop Profit</span>
            <br />
            in 30 Seconds
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            TikTok Shop hides fees and pays you net amounts. We show you exactly where your money goes, your real profit margins, and sync everything to QuickBooks automatically.
          </p>

          <button
            onClick={() => window.location.href = '/signup'}
            className="bg-blue-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
          >
            Start Free Trial
          </button>

          <p className="text-sm text-slate-500 mt-4">
            7-day free trial · No credit card required · Cancel anytime
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-20">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:border-blue-300 transition-all">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Instant Connection
            </h3>
            <p className="text-slate-600 text-sm">
              Connect your TikTok Shop in one click via secure OAuth. No manual data entry.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:border-blue-300 transition-all">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              See All Hidden Fees
            </h3>
            <p className="text-slate-600 text-sm">
              Platform fees, payment fees, shipping costs, commissions, and refunds - all in one place.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:border-blue-300 transition-all">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              QuickBooks Sync
            </h3>
            <p className="text-slate-600 text-sm">
              Automatic journal entries in QuickBooks using the A2X method. Perfect books, zero manual work.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:border-blue-300 transition-all">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Product-Level Insights
            </h3>
            <p className="text-slate-600 text-sm">
              Know which products are profitable and which ones are killing your margins.
            </p>
          </div>
        </div>

        {/* Problem/Solution */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              The Problem
            </h2>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start">
                <span className="text-slate-400 mr-2">•</span>
                <span>TikTok Shop takes multiple hidden fees before paying you</span>
              </li>
              <li className="flex items-start">
                <span className="text-slate-400 mr-2">•</span>
                <span>You see "net payout" but don't know your real profit margin</span>
              </li>
              <li className="flex items-start">
                <span className="text-slate-400 mr-2">•</span>
                <span>Some products look profitable but actually lose money</span>
              </li>
              <li className="flex items-start">
                <span className="text-slate-400 mr-2">•</span>
                <span>Hours spent trying to reconcile TikTok's confusing reports</span>
              </li>
              <li className="flex items-start">
                <span className="text-slate-400 mr-2">•</span>
                <span>Manual QuickBooks entries are tedious and error-prone</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              The Solution
            </h2>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span>Automatic sync with TikTok Shop API</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span>Complete fee breakdown (platform, payment, shipping, commissions)</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span>Real profit margins per product with color-coded alerts</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span>One-click QuickBooks sync with A2X-style journal entries</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span>Know your numbers in 30 seconds, not 3 hours</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Pricing */}
        <div className="max-w-md mx-auto text-center mb-20">
          <div className="bg-white rounded-lg shadow-xl p-10 border border-gray-200">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Simple Pricing</h2>
            <div className="text-5xl font-bold text-slate-900 mb-2">
              $29
              <span className="text-2xl text-slate-600 font-normal">/month</span>
            </div>
            <p className="text-slate-600 mb-8">
              Everything included. No hidden fees.
            </p>
            
            <ul className="text-left space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className="text-slate-700">Unlimited TikTok Shop sync</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className="text-slate-700">Real-time profit tracking</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className="text-slate-700">QuickBooks Online integration</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className="text-slate-700">Product profitability analysis</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className="text-slate-700">Complete fee breakdown</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className="text-slate-700">7-day free trial</span>
              </li>
            </ul>

            <button
              onClick={() => window.location.href = '/signup'}
              className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all shadow-md"
            >
              Start Free Trial
            </button>
            <p className="text-sm text-slate-500 mt-4">Cancel anytime. No questions asked.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-blue-600 rounded-lg p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Stop Guessing. Start Knowing.
          </h2>
          <p className="text-xl mb-6 text-blue-100">
            Join TikTok Shop sellers who know their real numbers
          </p>
          <button
            onClick={() => window.location.href = '/signup'}
            className="bg-white text-blue-600 px-10 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-all shadow-lg"
          >
            Start Free Trial
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-20 border-t border-gray-200">
        <div className="text-center text-slate-600">
          <p className="mb-2 text-sm">© 2024 ReconcileBook. All rights reserved.</p>
          <p className="text-xs text-slate-500">
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

