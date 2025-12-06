'use client'

export default function FeeBreakdown({ feeBreakdown }) {
  const fees = [
    { name: 'Platform Fees', value: feeBreakdown?.platformFees || 0, color: 'bg-red-500' },
    { name: 'Payment Fees', value: feeBreakdown?.paymentFees || 0, color: 'bg-orange-500' },
    { name: 'Shipping Fees', value: feeBreakdown?.shippingFees || 0, color: 'bg-yellow-500' },
    { name: 'Commissions', value: feeBreakdown?.commissions || 0, color: 'bg-purple-500' },
    { name: 'Refunds', value: feeBreakdown?.refunds || 0, color: 'bg-pink-500' },
  ]

  const totalFees = fees.reduce((sum, fee) => sum + fee.value, 0)

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Fee Breakdown</h2>
      
      <div className="space-y-4">
        {fees.map((fee, index) => {
          const percentage = totalFees > 0 ? (fee.value / totalFees) * 100 : 0
          
          return (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {fee.name}
                </span>
                <span className="text-sm font-bold text-gray-900">
                  ${fee.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              
              <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${fee.color} transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              
              <div className="text-xs text-gray-500 mt-1">
                {percentage.toFixed(1)}% of total fees
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-800">Total Fees</span>
          <span className="text-xl font-bold text-red-600">
            ${totalFees.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  )
}

