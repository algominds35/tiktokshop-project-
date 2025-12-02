'use client'

export default function ProfitCards({ data }) {
  const cards = [
    {
      title: 'Gross Revenue',
      value: data?.revenue || 0,
      color: 'blue',
      icon: '💰',
    },
    {
      title: 'Total Fees',
      value: data?.fees || 0,
      color: 'red',
      icon: '💸',
    },
    {
      title: 'Net Profit',
      value: data?.profit || 0,
      color: 'green',
      icon: '✅',
    },
    {
      title: 'Profit Margin',
      value: `${data?.margin || 0}%`,
      color: 'purple',
      icon: '📊',
    },
  ]

  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    red: 'bg-red-50 border-red-200',
    green: 'bg-green-50 border-green-200',
    purple: 'bg-purple-50 border-purple-200',
  }

  const textColorClasses = {
    blue: 'text-blue-600',
    red: 'text-red-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${colorClasses[card.color]} border-2 rounded-lg p-6 transition-all hover:shadow-lg`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">{card.icon}</span>
            <span className="text-sm font-medium text-gray-600">
              {card.title}
            </span>
          </div>
          <div className={`text-3xl font-bold ${textColorClasses[card.color]}`}>
            {typeof card.value === 'number' 
              ? `$${card.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
              : card.value
            }
          </div>
        </div>
      ))}
    </div>
  )
}

