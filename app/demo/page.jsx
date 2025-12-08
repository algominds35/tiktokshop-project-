'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function DemoPage() {
  const [dateRange, setDateRange] = useState('last30days')
  
  // Demo data that changes based on date range
  const getDemoData = () => {
    const dataByRange = {
      today: { revenue: 342.50, fees: 82.20, profit: 260.30, margin: 76 },
      yesterday: { revenue: 428.75, fees: 102.90, profit: 325.85, margin: 76 },
      last7days: { revenue: 2850.25, fees: 684.06, profit: 2166.19, margin: 76 },
      last14days: { revenue: 5687.40, fees: 1364.98, profit: 4322.42, margin: 76 },
      last30days: { revenue: 10245.50, fees: 2458.30, profit: 7787.20, margin: 76 },
      custom: { revenue: 10245.50, fees: 2458.30, profit: 7787.20, margin: 76 }
    }
    return dataByRange[dateRange] || dataByRange.last30days
  }

  const demoData = getDemoData()
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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

      {/* TikTok Shop Connected Badge */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-center">
          <div className="flex items-center gap-3 bg-green-50 border-2 border-green-300 px-6 py-3 rounded-lg">
            <svg className="w-6 h-6 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-8v13a3 3 0 11-3-3v-2a5 5 0 105 5V6.69a7.17 7.17 0 005.77 4.25v-4.25z"/>
            </svg>
            <span className="font-bold text-gray-900 text-lg">TikTok Shop</span>
            <div className="flex items-center gap-2 ml-3 pl-3 border-l-2 border-green-400">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
              <span className="font-semibold text-green-600">Connected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Date Range Filters */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setDateRange('today')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                dateRange === 'today' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setDateRange('yesterday')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                dateRange === 'yesterday' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Yesterday
            </button>
            <button
              onClick={() => setDateRange('last7days')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                dateRange === 'last7days' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Last 7 days
            </button>
            <button
              onClick={() => setDateRange('last14days')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                dateRange === 'last14days' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Last 14 days
            </button>
            <button
              onClick={() => setDateRange('last30days')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                dateRange === 'last30days' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Last 30 days
            </button>
            <button
              onClick={() => setDateRange('custom')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                dateRange === 'custom' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Custom
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-sm font-semibold text-gray-600 uppercase mb-3">Gross Revenue</p>
            <p className="text-3xl font-bold text-blue-600">${demoData.revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-sm font-semibold text-gray-600 uppercase mb-3">Total Fees</p>
            <p className="text-3xl font-bold text-gray-900">${demoData.fees.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-sm font-semibold text-gray-600 uppercase mb-3">Net Profit</p>
            <p className="text-3xl font-bold text-blue-600">${demoData.profit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-sm font-semibold text-gray-600 uppercase mb-3">Profit Margin</p>
            <p className="text-3xl font-bold text-blue-600">{demoData.margin}%</p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* Fee Breakdown */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Fee Breakdown</h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Platform Fees</span>
                  <span className="text-sm font-bold text-gray-900">$1,450.00</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '59%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">59.0% of total fees</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Payment Fees</span>
                  <span className="text-sm font-bold text-gray-900">$580.00</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '23.6%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">23.6% of total fees</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Shipping Fees</span>
                  <span className="text-sm font-bold text-gray-900">$280.30</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '11.4%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">11.4% of total fees</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Commissions</span>
                  <span className="text-sm font-bold text-gray-900">$148.00</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '6%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">6.0% of total fees</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Refunds</span>
                  <span className="text-sm font-bold text-gray-900">$0.00</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">0.0% of total fees</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Stats</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-700">Last Sync</span>
                <span className="font-semibold text-gray-900">Dec 6, 2025, 01:22 PM</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-700">Effective Fee Rate</span>
                <span className="font-semibold text-gray-900">24.0%</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-700">Products Tracked</span>
                <span className="font-semibold text-gray-900">7</span>
              </div>

              <div className="flex justify-between items-center py-3">
                <span className="text-gray-700">Status</span>
                <span className="font-semibold text-green-600">✓ Connected</span>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex gap-2">
                <span className="text-blue-600">💡</span>
                <div>
                  <p className="text-sm text-blue-900 font-medium">Tip:</p>
                  <p className="text-sm text-blue-700">Products with margins below 40% (red) may need price adjustments or cost optimization.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Profitability Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Product Profitability</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Product</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Units Sold</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Revenue</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Fees</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Profit</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Margin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { 
                    name: 'Wireless Bluetooth Earbuds', 
                    id: '1729669027988280020',
                    unitsSold: 85,
                    revenue: 4250.00, 
                    fees: 950.00, 
                    profit: 3300.00, 
                    margin: 77.6,
                    bgColor: 'bg-blue-100'
                  },
                  { 
                    name: 'Premium Phone Case', 
                    id: '1729669065913045716',
                    unitsSold: 179,
                    revenue: 3580.00, 
                    fees: 825.00, 
                    profit: 2755.00, 
                    margin: 76.9,
                    bgColor: 'bg-purple-100'
                  },
                  { 
                    name: 'USB-C Fast Charging Cable', 
                    id: '1729669102847562340',
                    unitsSold: 241,
                    revenue: 2415.50, 
                    fees: 683.30, 
                    profit: 1732.20, 
                    margin: 71.7,
                    bgColor: 'bg-green-100'
                  },
                  { 
                    name: 'Tempered Glass Screen Protector', 
                    id: '1729669138294018560',
                    unitsSold: 89,
                    revenue: 890.00, 
                    fees: 425.00, 
                    profit: 465.00, 
                    margin: 52.2,
                    bgColor: 'bg-orange-100'
                  },
                  { 
                    name: '3-in-1 Wireless Charging Dock', 
                    id: '1729669174561892352',
                    unitsSold: 11,
                    revenue: 550.00, 
                    fees: 285.00, 
                    profit: 265.00, 
                    margin: 48.2,
                    bgColor: 'bg-pink-100'
                  },
                  { 
                    name: 'Car Phone Mount', 
                    id: '1729669210483945728',
                    unitsSold: 19,
                    revenue: 380.00, 
                    fees: 210.00, 
                    profit: 170.00, 
                    margin: 44.7,
                    bgColor: 'bg-yellow-100'
                  },
                  { 
                    name: 'Portable Power Bank 20000mAh', 
                    id: '1729669246729834496',
                    unitsSold: 6,
                    revenue: 180.00, 
                    fees: 80.00, 
                    profit: 100.00, 
                    margin: 55.6,
                    bgColor: 'bg-red-100'
                  },
                ].map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {/* Product Image Placeholder */}
                        <div className={`w-12 h-12 ${product.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                        {/* Product Name and ID */}
                        <div>
                          <div className="text-sm text-gray-500 font-mono">{product.id}</div>
                          <div className="font-medium text-gray-900">{product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-gray-900 font-semibold">{product.unitsSold}</td>
                    <td className="px-6 py-4 text-right text-gray-900">${product.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right text-red-600 font-medium">${product.fees.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right text-gray-900 font-semibold">${product.profit.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`font-bold ${
                        product.margin >= 70 ? 'text-green-600' : 
                        product.margin >= 40 ? 'text-yellow-600' : 
                        'text-red-600'
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
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-600 rounded-sm"></div>
                <span className="text-gray-600">≥70% margin</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-600 rounded-sm"></div>
                <span className="text-gray-600">40-70% margin</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-600 rounded-sm"></div>
                <span className="text-gray-600">&lt;40% margin</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to See YOUR Real Numbers?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Start your 14-day free trial. No credit card required.
          </p>
          <Link
            href="/signup"
            className="inline-block px-10 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            Start Free Trial →
          </Link>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-blue-100">
            <span>✓ 14-day free trial</span>
            <span>✓ No credit card</span>
            <span>✓ Cancel anytime</span>
          </div>
        </div>
      </div>
    </div>
  )
}
