'use client'

import Link from 'next/link'

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Clean Professional Header */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg"></div>
              <span className="text-2xl font-bold text-gray-900">ReconcileBook</span>
            </Link>
            <div className="flex items-center gap-4">
              <div className="bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg">
                <span className="text-sm font-semibold text-blue-700">Live Demo</span>
              </div>
              <Link
                href="/signup"
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Title Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Dashboard Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See exactly how ReconcileBook tracks your TikTok Shop profits with real-time data and detailed breakdowns
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* KPI Cards - Professional White & Blue */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-gray-600 uppercase">Gross Revenue</p>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xl">💰</span>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">$24,567</p>
            <div className="flex items-center text-sm">
              <span className="text-green-600 font-semibold">+23.5%</span>
              <span className="text-gray-500 ml-2">vs last month</span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-gray-600 uppercase">Total Fees</p>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-red-600 text-xl">📉</span>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">$4,234</p>
            <div className="flex items-center text-sm">
              <span className="text-gray-500">TikTok + Shipping</span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-gray-600 uppercase">Net Profit</p>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-xl">💵</span>
              </div>
            </div>
            <p className="text-3xl font-bold text-green-600 mb-2">$12,333</p>
            <div className="flex items-center text-sm">
              <span className="text-green-600 font-semibold">+18.7%</span>
              <span className="text-gray-500 ml-2">vs last month</span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-gray-600 uppercase">Profit Margin</p>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xl">📊</span>
              </div>
            </div>
            <p className="text-3xl font-bold text-blue-600 mb-2">50.2%</p>
            <div className="flex items-center text-sm">
              <span className="text-gray-500">156 orders</span>
            </div>
          </div>
        </div>

        {/* Product Breakdown Table - Professional Design */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-12">
          <div className="bg-blue-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">Product Performance Breakdown</h2>
            <p className="text-blue-100 mt-1">Complete visibility into every product's profitability</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Product</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase">Units</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase">Revenue</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase">TikTok Fees</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase">Shipping</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase">Product Cost</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase">Net Profit</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase">Margin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { name: 'Wireless Bluetooth Earbuds', sku: 'WBE-001', units: 45, revenue: 3375.00, fees: 236.25, shipping: 225.00, cost: 1350.00, profit: 1563.75, margin: 46.3 },
                  { name: 'Smart Fitness Watch', sku: 'SFW-002', units: 32, revenue: 6080.00, fees: 425.60, shipping: 192.00, cost: 2240.00, profit: 3222.40, margin: 53.0 },
                  { name: 'LED Desk Lamp', sku: 'LDL-003', units: 79, revenue: 2370.00, fees: 165.90, shipping: 316.00, cost: 948.00, profit: 940.10, margin: 39.7 },
                  { name: 'Phone Stand Holder', sku: 'PSH-004', units: 67, revenue: 1340.00, fees: 93.80, shipping: 201.00, cost: 536.00, profit: 509.20, margin: 38.0 },
                  { name: 'USB-C Fast Charger', sku: 'UFC-005', units: 52, revenue: 1560.00, fees: 109.20, shipping: 156.00, cost: 624.00, profit: 670.80, margin: 43.0 },
                ].map((product, index) => (
                  <tr key={index} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.sku}</div>
                    </td>
                    <td className="px-6 py-4 text-right text-gray-900 font-medium">{product.units}</td>
                    <td className="px-6 py-4 text-right text-gray-900 font-semibold">
                      ${product.revenue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right text-red-600 font-medium">
                      ${product.fees.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right text-orange-600 font-medium">
                      ${product.shipping.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-600 font-medium">
                      ${product.cost.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right text-green-600 font-bold text-lg">
                      ${product.profit.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`font-bold px-3 py-1 rounded-full ${
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
              <tfoot className="bg-blue-600 text-white font-bold">
                <tr>
                  <td className="px-6 py-4 text-lg">TOTALS</td>
                  <td className="px-6 py-4 text-right">275</td>
                  <td className="px-6 py-4 text-right">$14,725</td>
                  <td className="px-6 py-4 text-right">$1,030.75</td>
                  <td className="px-6 py-4 text-right">$1,090</td>
                  <td className="px-6 py-4 text-right">$5,698</td>
                  <td className="px-6 py-4 text-right text-xl">$6,906.25</td>
                  <td className="px-6 py-4 text-right text-xl">46.9%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center hover:border-blue-300 hover:shadow-lg transition-all">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📊</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Real-Time Tracking</h3>
            <p className="text-gray-600">
              Automatic sync with your TikTok Shop. See real profits instantly, not TikTok's misleading numbers.
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center hover:border-blue-300 hover:shadow-lg transition-all">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💰</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Complete Fee Breakdown</h3>
            <p className="text-gray-600">
              Every TikTok fee, shipping cost, and product expense tracked. Know exactly where your money goes.
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center hover:border-blue-300 hover:shadow-lg transition-all">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📈</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">QuickBooks Sync</h3>
            <p className="text-gray-600">
              One-click integration with QuickBooks. Export your data seamlessly for accounting.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 rounded-lg p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Track Your Real Profits?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join 100+ TikTok Shop sellers who finally know their true profit margins. Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="px-10 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Start Free Trial →
            </Link>
            <Link
              href="/#pricing"
              className="px-10 py-4 bg-blue-700 text-white rounded-lg font-semibold text-lg hover:bg-blue-800 transition-colors border-2 border-blue-500"
            >
              View Pricing
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
