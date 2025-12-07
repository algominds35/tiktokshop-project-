'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function LandingPage() {
  const [showDemo, setShowDemo] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg"></div>
              <span className="text-xl font-bold text-gray-900">ReconcileBook</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium transition-all"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full mb-8">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-900">14-Day Free Trial • No Credit Card Required</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              Stop Guessing Your<br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                TikTok Shop Profits
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              TikTok Shop hides fees and pays you net amounts. We show you exactly where your money goes and your real profit margins.
            </p>

            <div className="flex items-center justify-center gap-4 mb-12">
              <Link
                href="/signup"
                className="px-8 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Get Started Free →
              </Link>
              <button
                onClick={() => setShowDemo(true)}
                className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-200 rounded-xl hover:border-gray-900 font-semibold transition-all"
              >
                Try Demo
              </button>
            </div>

            <p className="text-sm text-gray-500">
              Join 500+ TikTok Shop sellers tracking their real profits
            </p>
          </div>

          {/* Hero Image - Dashboard Preview */}
          <div className="mt-20 max-w-6xl mx-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur-3xl opacity-20"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 p-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8 aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl mb-4">📊</div>
                    <p className="text-gray-600 font-medium">Dashboard Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              See Your Real Numbers
            </h2>
            <p className="text-xl text-gray-600">
              No more guessing. Know exactly where your money goes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '💸',
                title: 'Complete Fee Breakdown',
                description: 'Platform fees, payment processing, shipping costs, and affiliate commissions - all in one place.'
              },
              {
                icon: '⚡',
                title: 'Real-Time Sync',
                description: 'Connect your TikTok Shop once and get automatic updates. No manual data entry required.'
              },
              {
                icon: '📈',
                title: 'Product-Level Insights',
                description: 'Know which products are actually profitable and which ones are draining your margins.'
              },
              {
                icon: '🔗',
                title: 'QuickBooks Integration',
                description: 'Automatically sync payouts to QuickBooks with proper journal entries and reconciliation.'
              },
              {
                icon: '🎯',
                title: 'Accurate Profit Margins',
                description: 'See your true profit margins after all fees, not just the net payout from TikTok.'
              },
              {
                icon: '⏱️',
                title: 'Save Hours Every Week',
                description: 'Stop manually calculating fees. Get instant clarity on your business performance.'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 border border-gray-200 hover:border-gray-900 transition-all hover:shadow-lg"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-10">
              <div className="text-4xl mb-4">😵‍💫</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">The Problem</h3>
              <ul className="space-y-4">
                {[
                  'TikTok Shop takes multiple hidden fees before paying you',
                  'You only see "net payout" with no breakdown',
                  'Some products look profitable but actually lose money',
                  'Hours wasted reconciling confusing reports'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-red-600 font-bold mt-1">✕</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-10">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">The Solution</h3>
              <ul className="space-y-4">
                {[
                  'Automatic sync with TikTok Shop API',
                  'Complete breakdown of every single fee',
                  'Real profit margins per product with alerts',
                  'Know your numbers in 30 seconds, not 3 hours'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              No hidden fees. Because we hate those too.
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-2xl border-2 border-gray-900 p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-br from-blue-600 to-cyan-600 text-white px-4 py-1 text-sm font-bold">
                POPULAR
              </div>
              
              <div className="text-center mb-8">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  $29
                  <span className="text-2xl text-gray-600 font-normal">/month</span>
                </div>
                <p className="text-gray-600">Everything you need to track profits</p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  'Unlimited TikTok Shop connections',
                  'Real-time profit tracking',
                  'Complete fee breakdown',
                  'Product profitability analysis',
                  'QuickBooks integration',
                  'Email support'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 text-xs font-bold">✓</span>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/signup"
                className="block w-full py-4 bg-gray-900 text-white text-center rounded-xl font-semibold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl mb-4"
              >
                Start 14-Day Free Trial
              </Link>
              
              <p className="text-center text-sm text-gray-500">
                No credit card required • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20"></div>
            <div className="relative">
              <h2 className="text-4xl font-bold mb-4">
                Ready to Stop Guessing?
              </h2>
              <p className="text-xl mb-8 text-gray-300">
                Start your 14-day free trial today. No credit card required.
              </p>
              <Link
                href="/signup"
                className="inline-block px-10 py-4 bg-white text-gray-900 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Get Started Free →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg"></div>
              <span className="text-xl font-bold text-gray-900">ReconcileBook</span>
            </div>
            <p className="text-gray-600 text-center">
              © 2024 ReconcileBook. All rights reserved.
            </p>
            <p className="text-sm text-gray-500">
              Not affiliated with TikTok or ByteDance
            </p>
          </div>
        </div>
      </footer>

      {/* Demo Modal */}
      {showDemo && (
        <DemoModal onClose={() => setShowDemo(false)} />
      )}
    </div>
  )
}

function DemoModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Demo Dashboard</h3>
            <p className="text-gray-600 mt-1">This is sample data to show you how it works</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="text-2xl text-gray-600">×</span>
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Gross Revenue', value: '$12,450.00', change: '+12.5%', positive: true },
              { label: 'Total Fees', value: '$3,862.50', change: '+8.2%', positive: false },
              { label: 'Net Profit', value: '$8,587.50', change: '+15.3%', positive: true },
              { label: 'Profit Margin', value: '68.9%', change: '+2.1%', positive: true }
            ].map((kpi, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600 font-medium">{kpi.label}</p>
                  <span className={`text-xs font-medium ${kpi.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.change}
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
              </div>
            ))}
          </div>

          {/* Fee Breakdown */}
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <h4 className="text-lg font-bold text-gray-900 mb-6">Fee Breakdown</h4>
            <div className="space-y-6">
              {[
                { label: 'Platform Fees', amount: '$1,867.50', percentage: 48, color: 'bg-red-500' },
                { label: 'Payment Processing', amount: '$994.00', percentage: 26, color: 'bg-orange-500' },
                { label: 'Shipping Fees', amount: '$622.50', percentage: 16, color: 'bg-yellow-500' },
                { label: 'Affiliate Commissions', amount: '$378.50', percentage: 10, color: 'bg-purple-500' }
              ].map((fee, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{fee.label}</span>
                    <span className="text-sm font-bold text-gray-900">{fee.amount}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className={`${fee.color} h-3 rounded-full transition-all`} style={{ width: `${fee.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Table */}
          <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h4 className="text-lg font-bold text-gray-900">Product Performance</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Revenue</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Fees</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Profit</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Margin</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-50">
                  {[
                    { name: 'Wireless Earbuds', revenue: 4280, fees: 1327, profit: 2953, margin: 69.0 },
                    { name: 'Phone Case Set', revenue: 3150, fees: 977, profit: 2173, margin: 69.0 },
                    { name: 'Portable Charger', revenue: 2890, fees: 897, profit: 1993, margin: 69.0 },
                    { name: 'LED Strip Lights', revenue: 2130, fees: 661, profit: 1469, margin: 69.0 }
                  ].map((product, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.name}</td>
                      <td className="px-6 py-4 text-sm text-right text-gray-900">${product.revenue.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-right text-gray-900">${product.fees.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-right text-green-600 font-medium">${product.profit.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-right font-bold text-gray-900">{product.margin}%</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Profitable
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-center pt-4">
            <Link
              href="/signup"
              onClick={onClose}
              className="inline-block px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all"
            >
              Start Your Free Trial →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
