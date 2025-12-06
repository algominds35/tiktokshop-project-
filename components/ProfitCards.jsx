'use client'

export default function ProfitCards({ data }) {
  const cards = [
    {
      title: 'Gross Revenue',
      value: data?.revenue || 0,
      color: 'blue',
    },
    {
      title: 'Total Fees',
      value: data?.fees || 0,
      color: 'slate',
    },
    {
      title: 'Net Profit',
      value: data?.profit || 0,
      color: 'blue',
    },
    {
      title: 'Profit Margin',
      value: `${data?.margin || 0}%`,
      color: 'slate',
    },
  ]

  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    slate: 'bg-slate-50 border-slate-200',
  }

  const textColorClasses = {
    blue: 'text-blue-600',
    slate: 'text-slate-700',
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${colorClasses[card.color]} border rounded-lg p-6 transition-all hover:shadow-md`}
        >
          <div className="mb-3">
            <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
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

