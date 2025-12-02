'use client'

import { getMarginClass } from '@/lib/profit-calculator'

export default function ProductTable({ products }) {
  if (!products || products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Product Profitability</h2>
        <p className="text-gray-500 text-center py-8">
          No product data available. Sync your TikTok Shop data to see product profitability.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Product Profitability</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Product
              </th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">
                Revenue
              </th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">
                Fees
              </th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">
                Profit
              </th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">
                Margin
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-4 font-medium text-gray-800">
                  {product.product_name || product.productName}
                </td>
                <td className="py-4 px-4 text-right text-gray-700">
                  ${product.revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="py-4 px-4 text-right text-red-600">
                  ${product.fees.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="py-4 px-4 text-right font-semibold text-gray-900">
                  ${product.profit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="py-4 px-4 text-right">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${getMarginClass(product.margin)}`}
                  >
                    {product.margin.toFixed(1)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-green-50 border-2 border-green-600 rounded"></span>
          <span className="text-gray-600">≥70% margin</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-yellow-50 border-2 border-yellow-600 rounded"></span>
          <span className="text-gray-600">40-70% margin</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-red-50 border-2 border-red-600 rounded"></span>
          <span className="text-gray-600">&lt;40% margin</span>
        </div>
      </div>
    </div>
  )
}

