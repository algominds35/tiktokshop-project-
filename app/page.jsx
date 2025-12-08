'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export default function LandingPage() {
  const [showDemo, setShowDemo] = useState(false)
  const [showEmailPopup, setShowEmailPopup] = useState(false)
  const [showPlanPopup, setShowPlanPopup] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [pricingInterval, setPricingInterval] = useState('monthly')
  const [openFaq, setOpenFaq] = useState(null)

  const handlePlanSelect = (plan) => {
    // For free trial (no plan), redirect to signup
    if (!plan) {
      window.location.href = '/signup'
      return
    }
    // For paid plans, show popup
    setSelectedPlan(plan)
    setShowPlanPopup(true)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg"></div>
              <span className="text-xl font-bold text-gray-900">ReconcileBook</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-sm text-gray-600 hover:text-gray-900">Home</a>
              <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">Features</a>
              <a href="#benefits" className="text-sm text-gray-600 hover:text-gray-900">Benefits</a>
              <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="#faq" className="text-sm text-gray-600 hover:text-gray-900">FAQs</a>
          </div>
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm text-gray-700 hover:text-gray-900 font-medium"
              >
                Login
              </Link>
            <Link
              href="/signup"
              className="px-6 py-2.5 bg-[#FF6B5B] text-white rounded-lg hover:bg-[#FF5547] font-medium text-sm transition-colors inline-block"
            >
              Start Free Trial
            </Link>
            </div>
        </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Stop Guessing Your{' '}
                <span className="text-[#FF6B5B]">TikTok Shop Profits</span>
          </h1>
          
              <p className="text-xl text-gray-700 mb-10 leading-relaxed font-medium">
            TikTok Shop hides fees and pays you net amounts. We show you exactly where your money goes and your real profit margins.
          </p>

              <div className="mb-8">
                <Link
                  href="/signup"
                  className="inline-block w-full"
                >
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl px-8 py-4 text-center shadow-lg transition-all cursor-pointer">
                    <div className="text-xl font-bold text-white mb-1">
                      START FOR FREE
                    </div>
                    <div className="text-sm text-white/90 font-medium">
                      14-day free trial • No credit card required
                    </div>
                  </div>
                </Link>
              </div>

              <div className="flex items-center gap-3 mb-8">
                <div className="text-sm text-gray-600">
                  Trusted by <span className="font-semibold text-gray-900">500+</span> TikTok Shop Sellers
              </div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400 text-sm">★★★★★</span>
                  <span className="text-xs font-medium text-gray-600">4.5/5</span>
                </div>
              </div>

            </div>

            {/* Right Content - Dual Screenshots Notion Style - BIGGER */}
            <div className="relative lg:col-span-1">
              <div className="grid grid-cols-1 gap-6">
                {/* Screenshot 1 - LARGE */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-gray-200 hover:shadow-3xl transition-all">
                  <img 
                    src="/images/dashboard-1.png" 
                    alt="ReconcileBook Dashboard - Product Profitability"
                    className="w-full h-auto"
                  />
                  </div>
                {/* Screenshot 2 - LARGE */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-gray-200 hover:shadow-3xl transition-all">
                  <img 
                    src="/images/dashboard-2.png" 
                    alt="ReconcileBook Dashboard - Fee Breakdown & Stats"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Section */}
      <section className="py-16 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-center text-lg font-semibold text-gray-600 mb-8">
            Trusted by Top TikTok Shop Sellers
          </h3>
          <div className="flex items-center justify-between">
            <img src="/logos/idQxCVUwLR_logos.png" alt="Wellgaard" className="h-10 object-contain" />
            <img src="/logos/idNvNRqlk_1765225836914.png" alt="Halara" className="h-10 object-contain" />
            <img src="/logos/joy.png" alt="JOY Sportswear" className="h-10 object-contain" />
            <img src="/logos/idwhN_kpL7_logos.png" alt="Nature Spell" className="h-10 object-contain" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Your Data is <span className="text-[#FF6B5B]">Safe & Secure</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We handle your sensitive financial data with bank-level security. Your privacy and data protection are our top priorities.
          </p>
        </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Bank-Level Encryption',
                description: 'AES-256 encryption protects all your data at rest and TLS 1.3 secures data in transit.'
              },
              {
                icon: (
                  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
                title: 'Zero Credential Storage',
                description: 'Secure OAuth connections mean we never store your TikTok Shop passwords or credentials.'
              },
              {
                icon: (
                  <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                title: 'GDPR & CCPA Compliant',
                description: 'Full compliance with global data protection regulations. Your data, your rights.'
              },
              {
                icon: (
                  <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'SOC 2 Type II Certified',
                description: 'Independently audited security controls. Hosted on enterprise-grade infrastructure.'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#FF6B5B] hover:shadow-lg transition-all">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Demo Section */}
      <section id="benefits" className="py-20 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Get Accurate Profit Analytics
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              TikTok is secretly ripping you off. We'll show you exactly how much they're stealing.
            </p>
          </div>

          {/* Pain Points Section with Image */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Left: Image */}
            <div className="relative">
              <img 
                src="/stressed-person.webp" 
                alt="Stressed business owner" 
                className="w-full h-auto rounded-2xl"
              />
          </div>

            {/* Right: Pain Points */}
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#FF6B5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
              </div>
          </div>
            <div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Do you wait weeks for your accountant to close books?
                  </h3>
                  <p className="text-gray-300">
                    With ReconcileBook, get real-time profit tracking, so you're always on top of your numbers.
              </p>
        </div>
          </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#FF6B5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
              </div>
          </div>
            <div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Switching between Seller Center, Ads Manager, and Affiliate Center?
                  </h3>
                  <p className="text-gray-300">
                    Let ReconcileBook automate the work — all your numbers, in one dashboard
            </p>
        </div>
            </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#FF6B5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
            <div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Do you struggle to track product-level profit?
                  </h3>
                  <p className="text-gray-300">
                    Get detailed profit analytics on each product with ReconcileBook's P&L tool.
                  </p>
              </div>
            </div>
          </div>
        </div>

          {/* Dashboard Preview Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth="2"/>
                  <line x1="8" y1="21" x2="16" y2="21" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="12" y1="17" x2="12" y2="21" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                  </div>
              <h2 className="text-4xl font-bold text-white mb-4">
                Meet Your Real-Time Profit Dashboard
            </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Effortlessly track your TikTok Shop performance—including sales, refunds, ad spend, commissions, and net profit—all in one place. Get instant clarity on your margins and compare product performance with a clean, visual layout.
            </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-white font-medium">No Profit Guesswork</span>
          </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-white font-medium">Forecast & Historical Profits</span>
              </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-white font-medium">Informed Decision</span>
          </div>
          </div>
              <div className="bg-[#FF8C00] text-white rounded-lg px-8 py-4 inline-block">
                <div className="text-2xl font-bold">14 DAY FREE TRIAL</div>
                <div className="text-sm">No credit card required, Cancel anytime.</div>
        </div>
      </div>
            <div className="relative">
              <img 
                src="/images/dashboard-1.png" 
                alt="ReconcileBook Dashboard Preview" 
                className="w-full h-auto rounded-2xl shadow-2xl border-4 border-blue-500"
              />
        </div>
          </div>

        </div>
      </section>

      {/* Product Profitability Showcase Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Product-Level <span className="text-[#FF6B5B]">Profit Tracking</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              See exactly which products are making you money and which ones are eating into your profits. Make data-driven decisions with real numbers.
            </p>
          </div>

          {/* Product Table */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider">Revenue</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider">Fees</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider">Profit</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider">Margin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { name: 'Wireless Bluetooth Earbuds', revenue: 4250, fees: 950, profit: 3300, margin: 77.6, image: '/images/bluetooth-earbuds.webp' },
                    { name: 'Premium Phone Case', revenue: 3580, fees: 825, profit: 2755, margin: 76.9, image: '/images/phone-case.webp' },
                    { name: 'USB-C Fast Charging Cable', revenue: 2415.5, fees: 683.3, profit: 1732.2, margin: 71.7, image: '/images/amazon-usb.jpg' },
                    { name: 'Tempered Glass Screen Protector', revenue: 890, fees: 425, profit: 465, margin: 52.2, image: '/images/tempered-glass-screen-protector.webp' },
                  ].map((product, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-gray-200"
                          />
                          <span className="text-sm font-medium text-gray-900">{product.name}</span>
                  </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-right font-semibold text-gray-900">${product.revenue.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-right font-semibold text-red-600">${product.fees.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-right font-semibold text-gray-900">${product.profit.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-right">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full font-bold ${
                          product.margin >= 70 ? 'bg-green-100 text-green-800' :
                          product.margin >= 40 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {product.margin}%
                  </span>
                      </td>
                    </tr>
            ))}
                </tbody>
              </table>
                </div>

            {/* Legend */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-600">≥70% margin</span>
                </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-gray-600">40-70% margin</span>
                  </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-gray-600">&lt;40% margin</span>
              </div>
    </div>
              </div>

          {/* CTA */}
          <div className="text-center mt-12">
              <Link
                href="/signup"
              className="inline-block px-8 py-4 bg-[#FF6B5B] text-white rounded-xl font-semibold hover:bg-[#FF5547] transition-all text-lg shadow-lg"
              >
              Start Tracking Your Products For Free →
              </Link>
            <p className="text-sm text-gray-500 mt-4">14-day free trial • No credit card required</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Simple, <span className="text-[#FF6B5B]">Transparent</span> Pricing
            </h2>
            
            {/* Free Trial Banner */}
            <div className="inline-flex items-center gap-2 bg-green-50 border-2 border-green-500 rounded-full px-6 py-3 mb-6">
              <span className="text-2xl">🎉</span>
              <span className="text-lg font-bold text-green-900">
                Start 14-Day Free Trial
              </span>
          </div>

        </div>

          {/* Pricing Comparison Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-4 gap-0">
              {/* Header Row */}
              <div className="p-8 border-r border-b border-gray-200">
                <h3 className="text-3xl font-bold text-gray-900">Compare plans</h3>
              </div>
              
              {/* Plan Names */}
              <div className="p-8 text-center border-r border-b border-gray-200">
                <h4 className="text-2xl font-bold text-gray-900 mb-3">Pro</h4>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  ${pricingInterval === 'monthly' ? '39' : '33'}
                  <span className="text-lg text-gray-600">/month</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">14-day free trial</p>
              </div>
              
              <div className="p-8 text-center border-r border-b border-gray-200 bg-blue-50">
                <h4 className="text-2xl font-bold text-blue-600 mb-3">Premium</h4>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  ${pricingInterval === 'monthly' ? '79' : '66'}
                  <span className="text-lg text-gray-600">/month</span>
                </div>
                <p className="text-xs text-blue-700 font-semibold mt-2">14-day free trial</p>
              </div>
              
              <div className="p-8 text-center border-b border-gray-200">
                <h4 className="text-2xl font-bold text-gray-900 mb-3">Enterprise</h4>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  ${pricingInterval === 'monthly' ? '149' : '124'}
                  <span className="text-lg text-gray-600">/month</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Contact for demo</p>
              </div>

              {/* Transactions per month */}
              <div className="p-6 font-semibold text-gray-900 border-r border-b border-gray-200">
                Transactions per month
              </div>
              <div className="p-6 text-center border-r border-b border-gray-200">
                <span className="text-gray-700">2,000</span>
              </div>
              <div className="p-6 text-center border-r border-b border-gray-200 bg-blue-50">
                <span className="text-gray-700">15,000</span>
              </div>
              <div className="p-6 text-center border-b border-gray-200">
                <span className="text-gray-700">Unlimited</span>
              </div>

              {/* History Access */}
              <div className="p-6 font-semibold text-gray-900 border-r border-b border-gray-200">
                See history on Signup
              </div>
              <div className="p-6 text-center border-r border-b border-gray-200">
                <span className="text-gray-700">3 Months</span>
              </div>
              <div className="p-6 text-center border-r border-b border-gray-200 bg-blue-50">
                <span className="text-gray-700">12 Months</span>
              </div>
              <div className="p-6 text-center border-b border-gray-200">
                <span className="text-gray-700">12 Months</span>
              </div>

              {/* Real-time Profit Dashboard */}
              <div className="p-6 font-semibold text-gray-900 border-r border-b border-gray-200">
                Real-time Profit Dashboard
              </div>
              <div className="p-6 text-center border-r border-b border-gray-200">
                <span className="text-blue-600 text-2xl">✓</span>
              </div>
              <div className="p-6 text-center border-r border-b border-gray-200 bg-blue-50">
                <span className="text-blue-600 text-2xl">✓</span>
              </div>
              <div className="p-6 text-center border-b border-gray-200">
                <span className="text-blue-600 text-2xl">✓</span>
              </div>

              {/* Product-wise Profit */}
              <div className="p-6 font-semibold text-gray-900 border-r border-b border-gray-200">
                Product-wise Profit
              </div>
              <div className="p-6 text-center border-r border-b border-gray-200">
                <span className="text-blue-600 text-2xl">✓</span>
              </div>
              <div className="p-6 text-center border-r border-b border-gray-200 bg-blue-50">
                <span className="text-blue-600 text-2xl">✓</span>
              </div>
              <div className="p-6 text-center border-b border-gray-200">
                <span className="text-blue-600 text-2xl">✓</span>
              </div>

              {/* P&L Export to Excel */}
              <div className="p-6 font-semibold text-gray-900 border-r border-b border-gray-200">
                P&L Export to Excel
              </div>
              <div className="p-6 text-center border-r border-b border-gray-200">
                <span className="text-blue-600 text-2xl">✓</span>
              </div>
              <div className="p-6 text-center border-r border-b border-gray-200 bg-blue-50">
                <span className="text-blue-600 text-2xl">✓</span>
              </div>
              <div className="p-6 text-center border-b border-gray-200">
                <span className="text-blue-600 text-2xl">✓</span>
            </div>

              {/* Customer Support */}
              <div className="p-6 font-semibold text-gray-900 border-r border-b border-gray-200">
                Customer Support
              </div>
              <div className="p-6 text-center border-r border-b border-gray-200">
                <span className="text-blue-600 text-2xl">✓</span>
              </div>
              <div className="p-6 text-center border-r border-b border-gray-200 bg-blue-50">
                <span className="text-blue-600 text-2xl">✓</span>
              </div>
              <div className="p-6 text-center border-b border-gray-200">
                <span className="text-blue-600 text-2xl">✓</span>
              </div>

              {/* CTA Buttons */}
              <div className="p-6 border-r border-gray-200"></div>
              <div className="p-6 text-center border-r border-gray-200">
                <a
                  href="https://buy.stripe.com/8x24gBd2e83d1MB0DE0Fi0g"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full px-6 py-3 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:border-gray-900 transition-colors"
                >
                  Select Pro
                </a>
              </div>
              <div className="p-6 text-center border-r border-gray-200 bg-blue-50">
                <a
                  href="https://buy.stripe.com/eVq00l9Q283dezn8660Fi0h"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
                >
                  Select Premium
                </a>
              </div>
              <div className="p-6 text-center">
                <a
                  href="https://buy.stripe.com/fZu5kFbYa4R1gHvdqq0Fi0i"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full px-6 py-3 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:border-gray-900 transition-colors"
                >
                  Select Enterprise
                </a>
              </div>
          </div>
        </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            Pro and Premium plans include 14-day free trial.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Got a question? Get your answer
          </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Everything you need to know about the product and billing. Can't find the answer you're looking for? Please chat to our friendly team at{' '}
              <a href="mailto:alex@reconcilebookapp.com" className="text-[#FF6B5B] hover:text-[#FF5547] underline">
                alex@reconcilebookapp.com
              </a>
            </p>
            </div>

          {/* FAQ Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {[
                {
                  question: 'What is ReconcileBook?',
                  answer: 'ReconcileBook is a real-time TikTok Shop profit tracking and analytics platform for sellers, automatically pulling sales, ad spend, fees, and commissions from TikTok Seller Center, Ads Manager, and the Affiliate Center to give you an accurate, automated view of your true net profit and product-level performance without relying on manual spreadsheets.'
                },
                {
                  question: '1. Is there a free trial available?',
                  answer: 'Yes, you can try us for free for 14 days. If you want, we\'ll provide you with a free 15-minute onboarding call to get you up and running. No credit card required.'
                },
                {
                  question: '2. Can I change my plan later?',
                  answer: 'Absolutely! You can upgrade or downgrade your plan at any time from your account settings. Changes will be reflected in your next billing cycle, and we\'ll prorate any differences.'
                },
                {
                  question: '3. What is your cancellation policy?',
                  answer: 'You can cancel your subscription at any time with no penalties or cancellation fees. Your account will remain active until the end of your current billing period, and you\'ll continue to have full access during that time.'
                },
                {
                  question: '4. What types of fees can I see in the app?',
                  answer: 'ReconcileBook tracks all TikTok Shop fees including platform commission fees, payment processing fees, shipping fees, affiliate commissions, refund fees, and any other deductions. You\'ll see a complete breakdown of where every dollar goes.'
                },
                {
                  question: '5. Can I download the profit and loss statements?',
                  answer: 'Yes! You can export your profit and loss statements, sales reports, and product-level analytics as CSV or PDF files. Professional and Enterprise plans also include automatic QuickBooks journal entries.'
                },
                {
                  question: '6. Can I use ReconcileBook for my dropshipping business on TikTok Shop?',
                  answer: 'Absolutely! ReconcileBook is perfect for dropshipping businesses. Track your supplier costs, shipping fees, and all TikTok Shop deductions to see your true profit margins on each product in real-time.'
                }
              ].map((faq, index) => (
                <div key={index} className="bg-gray-800 rounded-xl border border-gray-700">
          <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-750 transition-colors rounded-xl"
          >
                    <span className="font-semibold text-white text-lg">{faq.question}</span>
                    <svg 
                      className={`w-6 h-6 text-gray-400 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
          </button>
                  {openFaq === index && (
                    <div className="px-6 pb-5">
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {[
                {
                  question: '7. Is ReconcileBook\'s data updated in real time?',
                  answer: 'Yes! ReconcileBook syncs with your TikTok Shop account every hour to pull the latest sales, orders, and fee data. You can also manually refresh at any time to see the most up-to-date information.'
                },
                {
                  question: '8. Is ReconcileBook secure?',
                  answer: 'Absolutely. We use bank-level AES-256 encryption, secure OAuth connections, and never store your TikTok Shop credentials. We\'re SOC 2 compliant and follow all GDPR and CCPA regulations. Your data is safe with us.'
                },
                {
                  question: '9. How long does it take to set up ReconcileBook?',
                  answer: 'Setting up ReconcileBook is quick and easy. It usually takes around 15 minutes to fetch your details from TikTok Shop APIs. However, if you have a large number of orders, it may take up to 45 minutes to fetch all your data. Simply sign up, connect your TikTok Shop account, and ReconcileBook will automatically start tracking your profits and expenses in real-time.'
                },
                {
                  question: '10. What markets are supported by ReconcileBook for TikTok Shop?',
                  answer: 'ReconcileBook supports all TikTok Shop markets including United States, United Kingdom, Southeast Asia (Indonesia, Malaysia, Philippines, Singapore, Thailand, Vietnam), and other regions where TikTok Shop operates.'
                },
                {
                  question: '11. How can I calculate my TikTok Shop\'s profit accurately using ReconcileBook?',
                  answer: 'ReconcileBook automatically calculates your true profit by pulling all sales data and subtracting every fee: platform fees, payment processing, shipping, affiliate commissions, refunds, and more. Add your product costs, and you\'ll see your real profit margin on every single product.'
                },
                {
                  question: '12. How can I add recurring and one-time expenses in ReconcileBook?',
                  answer: 'You can easily add both recurring expenses (like software subscriptions, virtual assistant costs) and one-time expenses (like product photography, packaging) directly in the app. These will be factored into your profit calculations automatically.'
                },
                {
                  question: '13. How can I contact ReconcileBook support for real-time assistance?',
                  answer: 'Email us at alex@reconcilebookapp.com for support. We typically respond within 24-48 hours. Professional and Enterprise customers get priority support with faster response times.'
                },
                {
                  question: '14. How does ReconcileBook help with tracking my dropshipping net profit?',
                  answer: 'ReconcileBook tracks all your TikTok Shop sales and fees, and lets you input your supplier costs per product. This gives you instant visibility into your true net profit margins for each dropshipped product, so you know exactly which products are making you money.'
                }
              ].map((faq, index) => (
                <div key={index + 7} className="bg-gray-800 rounded-xl border border-gray-700">
                  <button
                    onClick={() => setOpenFaq(openFaq === (index + 7) ? null : (index + 7))}
                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-750 transition-colors rounded-xl"
                  >
                    <span className="font-semibold text-white text-lg">{faq.question}</span>
                    <svg 
                      className={`w-6 h-6 text-gray-400 transition-transform ${openFaq === (index + 7) ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === (index + 7) && (
                    <div className="px-6 pb-5">
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg"></div>
              <span className="text-xl font-bold text-gray-900">ReconcileBook</span>
            </div>
            
            {/* Footer Links */}
            <div className="flex flex-wrap justify-center gap-6 my-4">
              <Link href="/privacy" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                Privacy Policy
            </Link>
              <Link href="/terms" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                Terms of Service
              </Link>
              <Link href="/security" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                Security
                </Link>
        </div>

            {/* Contact Email - Clearly Visible */}
            <p className="text-gray-700 text-center font-medium my-3">
              Support: <a href="mailto:alex@reconcilebookapp.com" className="text-blue-600 hover:text-blue-700 underline">alex@reconcilebookapp.com</a>
            </p>
            
            <p className="text-gray-600 text-center text-sm">
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

      {/* Email Popup for Plan Selection (Stripe payments only) - Only show for paid plans */}
      {showPlanPopup && selectedPlan && (
        <EmailPopup onClose={() => setShowPlanPopup(false)} plan={selectedPlan} />
      )}
    </div>
  )
}

function EmailPopup({ onClose, plan }) {
  // All hooks must be called first (Rules of Hooks)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showVerificationMessage, setShowVerificationMessage] = useState(false)

  // If no plan (free trial), redirect to signup page immediately
  useEffect(() => {
    if (!plan) {
      window.location.href = '/signup'
    }
  }, [plan])

  // Don't render popup if no plan
  if (!plan) {
    return null
  }

  const handleSubmit = async (e) => {
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

      // If plan selected (Stripe payment), redirect to complete registration
      if (plan) {
        window.location.href = `/complete-registration?plan=${plan}`
        return
      }

      // Free trial - handle signup directly in popup
      // Create user with Supabase Auth (email confirmation required)
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        },
      })

      if (signUpError) throw signUpError

      // Check if email confirmation is required
      if (authData.user && !authData.session) {
        // Email confirmation required - show verification message
        setShowVerificationMessage(true)
        setLoading(false)
        return
      }

      // If email confirmation not required (shouldn't happen, but handle it)
      if (authData.user && authData.session) {
        // Create user in database
        await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: email,
            subscription_status: 'trialing',
            trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
          })

        // Store in localStorage
        localStorage.setItem('user_email', email)
        localStorage.setItem('user_logged_in', 'true')
        localStorage.setItem('user_id', authData.user.id)
        localStorage.setItem('trial_start', new Date().toISOString())
        
        // Redirect to dashboard
        window.location.href = '/dashboard'
      }
    } catch (err) {
      console.error('Error:', err)
      setError(err.message || 'Something went wrong')
      setLoading(false)
    }
  }

  const planNames = {
    pro: 'Pro Plan - $39/month',
    premium: 'Premium Plan - $79/month',
    enterprise: 'Enterprise Plan - $149/month',
  }

  // Show verification message
  if (showVerificationMessage) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 relative text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✉️</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email!</h3>
          <p className="text-gray-600 mb-6">
            We've sent a verification link to <strong>{email}</strong>
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Click the link in the email to verify your account and start your 14-day free trial.
          </p>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all"
          >
            Got It
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {plan ? 'Complete Your Subscription' : 'Start Your Free Trial'}
          </h3>
          <p className="text-gray-600">
            {plan ? planNames[plan] : 'Create your account to get instant access'}
          </p>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:border-orange-500 focus:outline-none"
              autoFocus
              required
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password (min. 6 characters)"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:border-orange-500 focus:outline-none"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : plan ? 'Continue to Payment →' : 'Create Account →'}
          </button>
        </form>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
        >
          <span className="text-2xl text-gray-600">×</span>
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          {plan ? '14-day free trial included • Cancel anytime' : 'No credit card required • 14 days free • Email verification required'}
        </p>
      </div>
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
            <p className="text-gray-600 mt-1">Sample data showing how ReconcileBook works</p>
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

          <div className="text-center pt-4">
            <Link
              href="/signup"
              onClick={onClose}
              className="inline-block px-8 py-4 bg-[#FF6B5B] text-white rounded-xl font-semibold hover:bg-[#FF5547] transition-all"
            >
              Start Your Free Trial →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      title: 'Founder & CEO',
      company: 'Luxe Accessories',
      image: '/testimonials/person-1.jpg',
      rating: 5,
      text: "I appreciate how quickly and conveniently ReconcileBook provides data. I think it's the only tool capable of pulling in TikTok Shop fees — highly recommended!"
              },
              {
      name: 'James Chen',
      title: 'Founder',
      company: 'Peak Performance Gear',
      image: '/testimonials/person-2.jpg',
      rating: 5,
      text: "ReconcileBook has been super quick and convenient for tracking my TikTok Shop profits. Overall we're enjoying the product and the clarity it brings."
    },
    {
      name: 'Emma Rodriguez',
      title: 'Senior Marketing Manager',
      company: 'Wellness Essentials Co.',
      image: '/testimonials/person-3.jpg',
      rating: 5,
      text: "I was drowning in spreadsheets trying to figure out our TikTok Shop numbers, but ReconcileBook made it so easy — and the support is awesome!"
    },
    {
      name: 'Michael Thompson',
      title: 'Founder',
      company: 'Elite Beauty Supply',
      image: '/testimonials/person-4.jpg',
      rating: 5,
      text: "ReconcileBook has transformed how I track my profits. The accuracy is incredible, and I finally have complete visibility into where every dollar goes. The support team has been exceptional."
    }
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index)
  }

  const current = testimonials[currentTestimonial]

    return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Trusted by TikTok Shop <span className="text-[#FF6B5B]">Sellers</span>
          </h2>
          <p className="text-xl text-gray-600">
            See what our customers are saying about ReconcileBook
          </p>
        </div>

        <div className="relative bg-white rounded-3xl shadow-xl p-12 border border-gray-100">
          {/* Quote Icon */}
          <div className="absolute top-0 right-8 -translate-y-1/2">
            <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
        </div>
          </div>

          {/* Testimonial Content */}
          <div className="text-center mb-8">
            <img 
              src={current.image}
              alt={current.name}
              className="w-24 h-24 rounded-full mx-auto mb-6 object-cover border-4 border-gray-100 shadow-lg"
            />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{current.name}</h3>
            <p className="text-gray-600 mb-4">
              {current.title} @ {current.company}
            </p>
            
            {/* Star Rating */}
            <div className="flex items-center justify-center gap-1 mb-6">
              {[...Array(current.rating)].map((_, i) => (
                <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
          </div>

            {/* Testimonial Text */}
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              "{current.text}"
            </p>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Next testimonial"
        >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </button>

          {/* Dot Navigation */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
          <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentTestimonial 
                    ? 'bg-blue-600 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
            <Link
              href="/signup"
            className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg"
            >
            Join 500+ Happy Sellers →
            </Link>
          </div>
        </div>
    </section>
  )
}