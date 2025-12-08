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

              <div className="flex items-center gap-3 mb-6">
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
      <section className="py-12 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between opacity-40 grayscale">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="text-2xl font-bold text-gray-400">
                LOGO
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Know Your Real{' '}
              <span className="text-[#FF6B5B]">TikTok Shop Profit</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our AI-powered profit tracking solution helps you see every fee, understand your margins, and optimize your TikTok Shop for maximum profitability.
          </p>
        </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🤖',
                title: 'AI-Powered Fee Analysis',
                description: 'Automatically identifies and categorizes every TikTok Shop fee.'
              },
              {
                icon: '📊',
                title: 'Real-Time Sync',
                description: 'Live connection to TikTok Shop API for instant profit updates.'
              },
              {
                icon: '📈',
                title: 'Product-Level Insights',
                description: 'Know exactly which products are profitable and which aren\'t.'
              },
              {
                icon: '👥',
                title: 'QuickBooks Integration',
                description: 'Sync payouts automatically with proper reconciliation.'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#FF6B5B] transition-colors">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Demo Section */}
      <section id="benefits" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              See Your <span className="text-[#FF6B5B]">Real Numbers</span> Clearly
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              ReconcileBook is designed to help you understand your TikTok Shop finances, see hidden fees, and track real profit margins.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: 'Complete Fee Breakdown',
                subtitle: 'See every fee clearly',
                placeholder: 'Fee Chart'
              },
              {
                title: 'Profit Tracking',
                subtitle: 'Real-time profit margins',
                placeholder: 'Profit Graph'
              },
              {
                title: 'Product Performance',
                subtitle: 'Review your top products',
                placeholder: 'Product Table'
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{item.subtitle}</p>
                <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 aspect-[4/3] flex items-center justify-center">
                  <p className="text-gray-400 text-sm">{item.placeholder}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Instant Connection',
                description: 'Connect your TikTok Shop in one click and get immediate insights into your fees and profit margins.'
              },
              {
                title: 'Track Your Numbers',
                description: 'Monitor your profit margins in real-time with our intuitive dashboard and clear visualizations.'
              },
              {
                title: 'Automated Reports',
                description: 'Get detailed breakdowns of every fee, payout, and profit margin automatically.'
              }
            ].map((item, index) => (
              <div key={index}>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                From Guessing{' '}
                <span className="text-[#FF6B5B]">to Knowing</span>
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Stop wasting hours trying to calculate TikTok Shop fees manually. Our platform automatically tracks every fee, shows real profit margins, and helps you make data-driven decisions about your products.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Get clarity on your finances in seconds, reduce stress about hidden fees, and grow your TikTok Shop with confidence knowing your real numbers.
              </p>
              <Link
                href="/signup"
                className="inline-block px-8 py-4 bg-[#FF6B5B] text-white rounded-lg hover:bg-[#FF5547] font-semibold transition-colors"
              >
                Start Free Trial
              </Link>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <div className="text-sm text-gray-500 text-center mb-2">Profit Clarity Score</div>
                {/* Gauge placeholder */}
                <div className="w-64 h-64 bg-white rounded-full border-8 border-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-gray-900">100</div>
                    <div className="text-sm text-gray-500">Crystal Clear</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Sellers Who've <span className="text-[#FF6B5B]">Transformed</span> Their Business
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our users are the reason we're here. Their success stories inspire us to keep pushing the boundaries of what's possible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: 'Sarah M., TikTok Shop Seller',
                quote: 'The fee transparency has given me complete peace of mind. I finally know my real profit margins and can make informed decisions about pricing.'
              },
              {
                name: 'Mike T., E-commerce Entrepreneur',
                quote: 'ReconcileBook saved me hours every week. The automated tracking and QuickBooks sync make accounting so much easier.'
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-8 border border-orange-200">
                <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Who Can Benefit From{' '}
              <span className="text-[#FF6B5B]">ReconcileBook?</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our profit tracking platform is perfect for anyone selling on TikTok Shop who wants clarity on their finances.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {[
              {
                title: 'TikTok Shop Sellers',
                description: 'Track multiple products, understand fees, and maximize your profit margins with ease.',
                image: '👨‍💼'
              },
              {
                title: 'E-commerce Entrepreneurs',
                description: 'Manage your finances across platforms and grow your business with QuickBooks integration.',
                image: '👩‍💼'
              },
              {
                title: 'Small Business Owners',
                description: 'Stay organized with automated tracking and spend less time on manual accounting.',
                image: '👥'
              },
              {
                title: 'Freelance Sellers',
                description: 'Keep your finances clear and meet deadlines with real-time profit tracking.',
                image: '💼'
              }
            ].map((audience, index) => (
              <div key={index} className="flex items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-40 h-40 bg-white rounded-2xl border-2 border-gray-200 flex items-center justify-center text-6xl">
                    {audience.image}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{audience.title}</h3>
                  <p className="text-gray-600">{audience.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 mt-40">
                    <div className="w-0.5 h-12 border-l-2 border-dashed border-[#FF6B5B]"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

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
                Start 14-Day Free Trial - No Credit Card Required
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
                <p className="text-xs text-gray-500 mt-2">14-day free trial</p>
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

              {/* QuickBooks Integration */}
              <div className="p-6 font-semibold text-gray-900 border-r border-b border-gray-200">
                QuickBooks Integration
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
            All plans include 14-day free trial. No credit card required.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Side */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                <span className="text-[#FF6B5B]">Frequently</span> Asked Questions
          </h2>
              <p className="text-gray-600 mb-6">
                Still confused with something? Let us know, we are here to help!
              </p>
              <a 
                href="mailto:alex@reconcilebookapp.com?subject=ReconcileBook Support Request"
                className="inline-block px-6 py-3 bg-[#FF6B5B] text-white rounded-lg hover:bg-[#FF5547] font-semibold transition-colors"
              >
                Contact Us
              </a>
            </div>

            {/* Right Side - FAQ Items */}
            <div className="space-y-4">
              {[
                {
                  question: 'How does the profit tracking work?',
                  answer: 'We connect to your TikTok Shop via OAuth and automatically pull all transaction data, fees, and payouts. Our system calculates your real profit margins by tracking every fee.'
                },
                {
                  question: 'What fees does ReconcileBook track?',
                  answer: 'We track platform fees, payment processing fees, shipping fees, affiliate commissions, refunds, and all other TikTok Shop deductions.'
                },
                {
                  question: 'Is my data secure?',
                  answer: 'Yes! We use bank-level encryption and secure OAuth connections. We never store your TikTok Shop credentials and comply with all data protection regulations.'
                },
                {
                  question: 'Can I integrate with QuickBooks?',
                  answer: 'Yes! Professional and Enterprise plans include QuickBooks Online integration with automatic journal entry creation for each payout.'
                },
                {
                  question: 'Do you offer a free trial?',
                  answer: 'Yes! We offer a 14-day free trial with full access to all Professional features. No credit card required to start.'
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200">
          <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                    <span className="text-gray-400">{openFaq === index ? '−' : '+'}</span>
          </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
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