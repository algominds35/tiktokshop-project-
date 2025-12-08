'use client'

import Link from 'next/link'

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl shadow-lg"></div>
              <span className="text-2xl font-bold text-gray-900">ReconcileBook</span>
            </Link>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-green-50 border-2 border-green-500 px-4 py-2 rounded-full">
                <span className="text-xl">🎯</span>
                <span className="text-sm font-bold text-green-700">LIVE DEMO - Sample Data</span>
              </div>
              <Link
                href="/signup"
                className="px-8 py-3 bg-gradient-to-r from-[#FF6B5B] to-[#FF5547] text-white rounded-xl hover:shadow-xl font-bold transition-all transform hover:scale-105"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl lg:text-6xl font-extrabold mb-4">
            See Your REAL TikTok Shop Profits
          </h1>
          <p className="text-2xl text-white/90 mb-6">
            Stop guessing. This is what you'll see with ReconcileBook.
          </p>
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md rounded-2xl px-8 py-4">
            <span className="text-3xl">✨</span>
            <div className="text-left">
              <p className="font-bold text-lg">Real Dashboard Preview Below</p>
              <p className="text-sm text-white/80">Your actual data syncs automatically</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* KPI Cards - Professional Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-blue-500 hover:shadow-2xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-600 uppercase">Gross Revenue</p>
              <span className="text-2xl">💰</span>
            </div>
            <p className="text-4xl font-extrabold text-gray-900 mb-2">$24,567</p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                ↗ +23.5%
              </span>
              <span className="text-xs text-gray-500">vs last month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-red-500 hover:shadow-2xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-600 uppercase">Total Fees</p>
              <span className="text-2xl">📉</span>
            </div>
            <p className="text-4xl font-extrabold text-red-600 mb-2">$4,234</p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                ↗ +8.2%
              </span>
              <span className="text-xs text-gray-500">TikTok + Shipping</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-green-500 hover:shadow-2xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-600 uppercase">Net Profit</p>
              <span className="text-2xl">💵</span>
            </div>
            <p className="text-4xl font-extrabold text-green-600 mb-2">$12,333</p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                ↗ +18.7%
              </span>
              <span className="text-xs text-gray-500">Your take-home</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-purple-500 hover:shadow-2xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-600 uppercase">Profit Margin</p>
              <span className="text-2xl">📊</span>
            </div>
            <p className="text-4xl font-extrabold text-purple-600 mb-2">50.2%</p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                ↗ +3.1%
              </span>
              <span className="text-xs text-gray-500">156 orders</span>
            </div>
          </div>
        </div>

        {/* Detailed Product Breakdown */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-8 py-6">
            <h2 className="text-2xl font-bold">Product Performance Breakdown</h2>
            <p className="text-gray-300 mt-1">Every product, every fee, every dollar tracked</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Units Sold</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">TikTok Fees</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Shipping</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Product Cost</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Net Profit</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Margin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { 
                    name: 'Wireless Bluetooth Earbuds', 
                    sku: 'WBE-001',
                    units: 45, 
                    revenue: 3375.00, 
                    tiktokFees: 236.25,
                    shipping: 225.00,
                    cost: 1350.00, 
                    profit: 1563.75,
                    margin: 46.3 
                  },
                  { 
                    name: 'Smart Fitness Watch', 
                    sku: 'SFW-002',
                    units: 32, 
                    revenue: 6080.00, 
                    tiktokFees: 425.60,
                    shipping: 192.00,
                    cost: 2240.00, 
                    profit: 3222.40,
                    margin: 53.0 
                  },
                  { 
                    name: 'LED Desk Lamp', 
                    sku: 'LDL-003',
                    units: 79, 
                    revenue: 2370.00, 
                    tiktokFees: 165.90,
                    shipping: 316.00,
                    cost: 948.00, 
                    profit: 940.10,
                    margin: 39.7 
                  },
                  { 
                    name: 'Phone Stand Holder', 
                    sku: 'PSH-004',
                    units: 67, 
                    revenue: 1340.00, 
                    tiktokFees: 93.80,
                    shipping: 201.00,
                    cost: 536.00, 
                    profit: 509.20,
                    margin: 38.0 
                  },
                  { 
                    name: 'USB-C Fast Charger', 
                    sku: 'UFC-005',
                    units: 52, 
                    revenue: 1560.00, 
                    tiktokFees: 109.20,
                    shipping: 156.00,
                    cost: 624.00, 
                    profit: 670.80,
                    margin: 43.0 
                  },
                ].map((product, index) => (
                  <tr key={index} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.sku}</div>
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-gray-900">{product.units}</td>
                    <td className="px-6 py-4 text-right font-bold text-gray-900">
                      ${product.revenue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right text-red-600 font-semibold">
                      -${product.tiktokFees.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right text-orange-600 font-semibold">
                      -${product.shipping.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-600 font-semibold">
                      -${product.cost.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right font-extrabold text-green-600 text-lg">
                      ${product.profit.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`font-bold text-lg px-3 py-1 rounded-full ${
                        product.margin >= 50 ? 'bg-green-100 text-green-700' : 
                        product.margin >= 40 ? 'bg-blue-100 text-blue-700' : 
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {product.margin}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-900 text-white font-bold">
                <tr>
                  <td className="px-6 py-4">TOTALS</td>
                  <td className="px-6 py-4 text-right">275</td>
                  <td className="px-6 py-4 text-right">$14,725</td>
                  <td className="px-6 py-4 text-right text-red-300">-$1,030.75</td>
                  <td className="px-6 py-4 text-right text-orange-300">-$1,090</td>
                  <td className="px-6 py-4 text-right">-$5,698</td>
                  <td className="px-6 py-4 text-right text-green-300 text-xl">$6,906.25</td>
                  <td className="px-6 py-4 text-right text-xl">46.9%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* What You Get */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-10 mb-8 text-white">
          <h2 className="text-3xl font-extrabold text-center mb-8">
            🎯 What You Get with ReconcileBook
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all">
              <div className="text-5xl mb-4 text-center">📊</div>
              <h3 className="text-xl font-bold mb-3 text-center">Real-Time Profit Tracking</h3>
              <p className="text-white/90 text-center">
                Auto-sync your TikTok Shop. See REAL profits, not TikTok's misleading "net amount"
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all">
              <div className="text-5xl mb-4 text-center">💰</div>
              <h3 className="text-xl font-bold mb-3 text-center">Complete Fee Breakdown</h3>
              <p className="text-white/90 text-center">
                TikTok fees, shipping, costs - see exactly where EVERY dollar goes
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all">
              <div className="text-5xl mb-4 text-center">📈</div>
              <h3 className="text-xl font-bold mb-3 text-center">QuickBooks Integration</h3>
              <p className="text-white/90 text-center">
                One-click sync to QuickBooks. Your accountant will thank you.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Ready to See YOUR Real Numbers?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start your 14-day free trial. No credit card required. Setup in 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/signup"
              className="px-12 py-5 bg-gradient-to-r from-[#FF6B5B] to-[#FF5547] text-white rounded-xl font-extrabold text-xl hover:shadow-2xl transition-all transform hover:scale-110"
            >
              Start Free Trial Now →
            </Link>
            <Link
              href="/#pricing"
              className="px-12 py-5 bg-gray-100 text-gray-900 rounded-xl font-bold text-xl hover:bg-gray-200 transition-all"
            >
              View Pricing
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-green-500 text-xl">✓</span>
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500 text-xl">✓</span>
              <span>No credit card</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500 text-xl">✓</span>
              <span>Cancel anytime</span>
            </div>
          </div>
          <p className="mt-6 text-gray-500">
            ⭐ Trusted by 100+ TikTok Shop sellers who finally know their real profits
          </p>
        </div>
      </div>
    </div>
  )
}
