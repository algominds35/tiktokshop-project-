'use client'

import Link from 'next/link'

export default function DemoPage() {
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

      {/* Demo Mode Banner */}
      <div className="bg-blue-50 border-b border-blue-200 py-3">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-blue-700 font-medium">
            <strong>Demo Mode:</strong> This is sample data to showcase the dashboard. Connect your TikTok Shop to see your real data.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-sm font-semibold text-gray-600 uppercase mb-3">Gross Revenue</p>
            <p className="text-3xl font-bold text-blue-600">$10,245.50</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-sm font-semibold text-gray-600 uppercase mb-3">Total Fees</p>
            <p className="text-3xl font-bold text-gray-900">$2,458.30</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-sm font-semibold text-gray-600 uppercase mb-3">Net Profit</p>
            <p className="text-3xl font-bold text-blue-600">$7,787.20</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-sm font-semibold text-gray-600 uppercase mb-3">Profit Margin</p>
            <p className="text-3xl font-bold text-blue-600">76%</p>
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
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Revenue</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Fees</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Profit</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Margin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { name: 'Wireless Bluetooth Earbuds', revenue: 4250.00, fees: 950.00, profit: 3300.00, margin: 77.6 },
                  { name: 'Premium Phone Case', revenue: 3580.00, fees: 825.00, profit: 2755.00, margin: 76.9 },
                  { name: 'USB-C Fast Charging Cable', revenue: 2415.50, fees: 683.30, profit: 1732.20, margin: 71.7 },
                  { name: 'Tempered Glass Screen Protector', revenue: 890.00, fees: 425.00, profit: 465.00, margin: 52.2 },
                  { name: '3-in-1 Wireless Charging Dock', revenue: 550.00, fees: 285.00, profit: 265.00, margin: 48.2 },
                  { name: 'Car Phone Mount', revenue: 380.00, fees: 210.00, profit: 170.00, margin: 44.7 },
                  { name: 'Portable Power Bank 20000mAh', revenue: 180.00, fees: 80.00, profit: 100.00, margin: 55.6 },
                ].map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">{product.name}</td>
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
