'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SettlementsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [settlements, setSettlements] = useState([])
  const [syncing, setSyncing] = useState({})
  const [error, setError] = useState('')

  useEffect(() => {
    loadSettlements()
  }, [])

  const loadSettlements = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await fetch('/api/settlements')
      if (!response.ok) {
        const result = await response.json()
        throw new Error(result.error || 'Failed to load settlements')
      }

      const data = await response.json()
      setSettlements(data.settlements || [])
    } catch (err) {
      console.error('Load error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSyncToQuickBooks = async (settlementId) => {
    try {
      setSyncing(prev => ({ ...prev, [settlementId]: true }))
      setError('')

      const response = await fetch(`/api/quickbooks/settlements/${settlementId}/sync`, {
        method: 'POST',
      })

      const result = await response.json()

      if (!response.ok) {
        if (result.code === 'NO_CONNECTION') {
          if (confirm('QuickBooks is not connected. Would you like to connect now?')) {
            window.location.href = '/api/quickbooks/connect?shopId=default'
          }
          return
        }
        if (result.code === 'NO_MAPPING') {
          if (confirm('QuickBooks account mapping not configured. Would you like to set it up now?')) {
            router.push('/settings/quickbooks')
          }
          return
        }
        throw new Error(result.error || 'Failed to sync to QuickBooks')
      }

      alert('✅ Successfully synced to QuickBooks!')
      
      // Reload settlements to show updated sync status
      loadSettlements()
    } catch (err) {
      console.error('Sync error:', err)
      alert(`❌ ${err.message}`)
    } finally {
      setSyncing(prev => ({ ...prev, [settlementId]: false }))
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading settlements...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="text-gray-600 hover:text-gray-900"
              >
                ← Back
              </button>
              <div className="flex items-center gap-2">
                <span className="text-3xl">💰</span>
                <span className="text-2xl font-bold text-gray-800">TikTok Shop Settlements</span>
              </div>
            </div>
            <button
              onClick={() => router.push('/settings/quickbooks')}
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              ⚙️ QuickBooks Settings
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {settlements.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              No Settlements Yet
            </h2>
            <p className="text-gray-600 mb-6">
              Sync your TikTok Shop data from the dashboard to create settlements that can be synced to QuickBooks.
            </p>
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-gradient-to-r from-pink-500 to-cyan-500 text-white px-8 py-4 rounded-lg text-lg font-bold hover:shadow-xl transition-all"
            >
              Go to Dashboard
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Info Banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800">
                💡 <strong>Tip:</strong> Each settlement represents a TikTok Shop payout period. Click "Sync to QuickBooks" to create a journal entry using the A2X method.
              </p>
            </div>

            {/* Settlements List */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Period</th>
                      <th className="text-right py-4 px-6 font-semibold text-gray-700">Gross Revenue</th>
                      <th className="text-right py-4 px-6 font-semibold text-gray-700">Total Fees</th>
                      <th className="text-right py-4 px-6 font-semibold text-gray-700">Net Payout</th>
                      <th className="text-center py-4 px-6 font-semibold text-gray-700">QuickBooks</th>
                      <th className="text-center py-4 px-6 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {settlements.map((settlement) => {
                      const isSyncing = syncing[settlement.id]
                      const isSynced = !!settlement.quickbooks_journal_entry_id
                      
                      return (
                        <tr key={settlement.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-6">
                            <div className="font-medium text-gray-800">
                              {formatDate(settlement.period_start)} - {formatDate(settlement.period_end)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {settlement.currency}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-right font-semibold text-green-600">
                            {formatCurrency(settlement.gross_revenue)}
                          </td>
                          <td className="py-4 px-6 text-right font-semibold text-red-600">
                            {formatCurrency(
                              (settlement.platform_fees || 0) +
                              (settlement.payment_fees || 0) +
                              (settlement.shipping_cost || 0) +
                              (settlement.affiliate_commissions || 0) +
                              (settlement.refunds || 0) +
                              (settlement.adjustments || 0)
                            )}
                          </td>
                          <td className="py-4 px-6 text-right font-bold text-gray-900">
                            {formatCurrency(settlement.net_payout)}
                          </td>
                          <td className="py-4 px-6 text-center">
                            {isSynced ? (
                              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                                ✓ Synced
                              </div>
                            ) : (
                              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                                Not Synced
                              </div>
                            )}
                          </td>
                          <td className="py-4 px-6 text-center">
                            {isSynced ? (
                              <div className="text-xs text-gray-500">
                                Entry #{settlement.quickbooks_journal_entry_id}
                              </div>
                            ) : (
                              <button
                                onClick={() => handleSyncToQuickBooks(settlement.id)}
                                disabled={isSyncing}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {isSyncing ? '🔄 Syncing...' : '📊 Sync to QuickBooks'}
                              </button>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

