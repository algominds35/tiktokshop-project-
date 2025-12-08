'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState('overview')

  // Sample TikTok Shop Data
  const sampleData = {
    totalRevenue: 24567.89,
    totalFees: 4234.56,
    netProfit: 12333.33,
    profitMargin: 50.2,
    totalOrders: 156,
    avgOrderValue: 157.48,
    products: [
      {
        id: 1,
        name: 'Wireless Bluetooth Earbuds',
        sku: 'WBE-001',
        unitsSold: 45,
        revenue: 3375.00,
        tiktokFees: 236.25,
        shippingCost: 225.00,
        productCost: 1350.00,
        netProfit: 1563.75,
        margin: 46.3
      },
      {
        id: 2,
        name: 'Smart Fitness Watch',
        sku: 'SFW-002',
        unitsSold: 32,
        revenue: 6080.00,
        tiktokFees: 425.60,
        shippingCost: 192.00,
        productCost: 2240.00,
        netProfit: 3222.40,
        margin: 53.0
      },
      {
        id: 3,
        name: 'LED Desk Lamp',
        sku: 'LDL-003',
        unitsSold: 79,
        revenue: 2370.00,
        tiktokFees: 165.90,
        shippingCost: 316.00,
        productCost: 948.00,
        netProfit: 940.10,
        margin: 39.7
      }
    ],
    recentTransactions: [
      { date: '2025-12-07', type: 'Sale', amount: 189.99, status: 'Completed' },
      { date: '2025-12-07', type: 'Sale', amount: 75.00, status: 'Completed' },
      { date: '2025-12-06', type: 'Sale', amount: 234.50, status: 'Completed' },
      { date: '2025-12-06', type: 'Refund', amount: -45.00, status: 'Processed' },
      { date: '2025-12-05', type: 'Sale', amount: 156.75, status: 'Completed' },
    ]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg"></div>
              <span className="text-xl font-bold text-gray-900">ReconcileBook</span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-green-600 bg-green-50 px-4 py-2 rounded-full">
                🎯 LIVE DEMO
              </span>
              <Link
                href="/signup"
                className="px-6 py-2.5 bg-[#FF6B5B] text-white rounded-lg hover:bg-[#FF5547] font-medium text-sm transition-colors"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            See Your REAL TikTok Shop Profits
          </h1>
          <p className="text-xl text-blue-100 mb-6">
            Stop guessing. Start knowing. This is what you'll see with ReconcileBook.
          </p>
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
            <span className="text-2xl">✨</span>
            <span className="font-semibold">Sample data shown below - Your real data will sync automatically</span>
          </div>
        </div>
      </div>

      {/* Dashboard Demo */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-gray-900">${sampleData.totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-green-600 mt-2">↗ +23% from last month</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <p className="text-sm text-gray-600 mb-1">Total Fees</p>
            <p className="text-3xl font-bold text-gray-900">${sampleData.totalFees.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">TikTok + Shipping</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <p className="text-sm text-gray-600 mb-1">Net Profit</p>
            <p className="text-3xl font-bold text-green-600">${sampleData.netProfit.toLocaleString()}</p>
            <p className="text-xs text-green-600 mt-2">↗ +18% from last month</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <p className="text-sm text-gray-600 mb-1">Profit Margin</p>
            <p className="text-3xl font-bold text-purple-600">{sampleData.profitMargin}%</p>
            <p className="text-xs text-gray-500 mt-2">{sampleData.totalOrders} orders</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-4 font-semibold ${
                  activeTab === 'overview'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Product Breakdown
              </button>
              <button
                onClick={() => setActiveTab('transactions')}
                className={`px-6 py-4 font-semibold ${
                  activeTab === 'transactions'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Recent Transactions
              </button>
            </div>
          </div>

          {/* Product Table */}
          {activeTab === 'overview' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Product</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Units</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Revenue</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Fees</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Cost</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Profit</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Margin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sampleData.products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.sku}</div>
                      </td>
                      <td className="px-6 py-4 text-right text-gray-900">{product.unitsSold}</td>
                      <td className="px-6 py-4 text-right font-semibold text-gray-900">
                        ${product.revenue.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right text-red-600">
                        ${(product.tiktokFees + product.shippingCost).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right text-gray-600">
                        ${product.productCost.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-green-600">
                        ${product.netProfit.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={`font-semibold ${
                          product.margin >= 50 ? 'text-green-600' : 
                          product.margin >= 40 ? 'text-blue-600' : 'text-orange-600'
                        }`}>
                          {product.margin}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Transactions Table */}
          {activeTab === 'transactions' && (
            <div className="p-6">
              <div className="space-y-4">
                {sampleData.recentTransactions.map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">{transaction.type}</p>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">{transaction.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* What You Get Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            What You Get When You Subscribe
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Real-Time Profit Tracking</h3>
              <p className="text-gray-600">
                Automatically sync your TikTok Shop data and see REAL profit margins, not TikTok's "net amount"
              </p>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fee Breakdown</h3>
              <p className="text-gray-600">
                See exactly where every dollar goes - TikTok fees, shipping, product costs, and YOUR profit
              </p>
            </div>
            
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">QuickBooks Integration</h3>
              <p className="text-gray-600">
                One-click sync to QuickBooks. Your accountant will love you.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-[#FF6B5B] to-[#FF5547] rounded-2xl shadow-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to See YOUR Real Profits?</h2>
          <p className="text-xl mb-8 text-white/90">
            Start your 14-day free trial. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/signup"
              className="px-12 py-4 bg-white text-[#FF6B5B] rounded-xl hover:bg-gray-100 font-bold text-lg transition-colors shadow-lg"
            >
              Start Free Trial →
            </Link>
            <Link
              href="/#pricing"
              className="px-12 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 font-semibold text-lg transition-colors"
            >
              View Pricing
            </Link>
          </div>
          <p className="mt-6 text-sm text-white/80">
            Join 100+ TikTok Shop sellers who finally know their REAL profits
          </p>
        </div>
      </div>
    </div>
  )
}

