'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ProfitCards from '@/components/ProfitCards'
import FeeBreakdown from '@/components/FeeBreakdown'
import ProductTable from '@/components/ProductTable'

export default function Dashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [isDemo, setIsDemo] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await fetch('/api/profit')
      const result = await response.json()

      if (!response.ok) {
        if (response.status === 401) {
          // Don't redirect, just show empty state for now
          setData(null)
          setLoading(false)
          return
        }
        throw new Error(result.error || 'Failed to load data')
      }

      setData(result.data)
    } catch (err) {
      console.error('Load error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSync = async () => {
    try {
      setSyncing(true)
      setError('')

      const response = await fetch('/api/sync', {
        method: 'POST',
      })

      const result = await response.json()

      if (!response.ok) {
        if (response.status === 401) {
          router.push('/')
          return
        }
        if (response.status === 403) {
          // Redirect to subscription
          handleSubscribe()
          return
        }
        throw new Error(result.error || 'Failed to sync data')
      }

      // Reload data after sync
      await loadData()
    } catch (err) {
      console.error('Sync error:', err)
      setError(err.message)
    } finally {
      setSyncing(false)
    }
  }

  const handleSubscribe = async () => {
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create checkout session')
      }

      // Redirect to Stripe Checkout
      window.location.href = result.url
    } catch (err) {
      console.error('Checkout error:', err)
      setError(err.message)
    }
  }

  const handleLoadDemo = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await fetch('/api/demo/data')
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to load demo data')
      }

      setData(result.data)
      setIsDemo(true)
    } catch (err) {
      console.error('Load demo error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded"></div>
              <span className="text-2xl font-bold text-slate-900">ReconcileBook</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleSync}
                disabled={syncing}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {syncing ? 'Syncing...' : 'Sync Now'}
              </button>
              <button
                onClick={() => router.push('/settlements')}
                className="bg-white border border-gray-300 text-slate-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Settlements
              </button>
              <button
                onClick={() => router.push('/settings/quickbooks')}
                className="bg-white border border-gray-300 text-slate-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                QuickBooks
              </button>
              <button
                onClick={async () => {
                  await fetch('/api/auth/logout', { method: 'POST' })
                  router.push('/')
                }}
                className="bg-white border border-gray-300 text-slate-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Logout
              </button>
            </div>
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

        {!data ? (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Welcome to ReconcileBook
              </h2>
              <p className="text-slate-600 mb-8 max-w-lg mx-auto">
                Connect your TikTok Shop to get started, then sync your data to see profit breakdown.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <button
                  onClick={() => window.location.href = '/api/auth/tiktok'}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
                >
                  Connect TikTok Shop
                </button>
                <button
                  onClick={handleSync}
                  disabled={syncing}
                  className="bg-white border border-gray-300 text-slate-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all disabled:opacity-50"
                >
                  {syncing ? 'Syncing...' : 'Sync Data'}
                </button>
                <button
                  onClick={handleLoadDemo}
                  className="bg-slate-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-all"
                >
                  View Demo Data
                </button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  QuickBooks Integration
                </h3>
                <p className="text-slate-600 mb-6">
                  Connect QuickBooks to automatically sync your TikTok Shop settlements as journal entries.
                </p>
                <div className="space-y-3">
                  <button
                    onClick={() => window.location.href = '/api/quickbooks/connect?shopId=default'}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
                  >
                    Connect QuickBooks
                  </button>
                  <button
                    onClick={() => router.push('/settings/quickbooks')}
                    className="w-full bg-white border border-gray-300 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                  >
                    Configure Accounts
                  </button>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  View Settlements
                </h3>
                <p className="text-slate-600 mb-6">
                  See all your TikTok Shop settlements and sync them to QuickBooks with one click.
                </p>
                <button
                  onClick={() => router.push('/settlements')}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
                >
                  View Settlements
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Demo Banner */}
            {isDemo && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-center">
                  <strong>Demo Mode:</strong> This is sample data to showcase the dashboard. Connect your TikTok Shop to see your real data.
                </p>
              </div>
            )}

            {/* Profit Cards */}
            <ProfitCards data={data} />

            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Fee Breakdown */}
              <FeeBreakdown feeBreakdown={data.fee_breakdown} />

              {/* Quick Stats */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Quick Stats</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-gray-600">Last Sync</span>
                    <span className="font-semibold text-gray-800">
                      {new Date(data.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-gray-600">Effective Fee Rate</span>
                    <span className="font-semibold text-gray-800">
                      {data.revenue > 0 
                        ? ((data.fees / data.revenue) * 100).toFixed(1)
                        : 0
                      }%
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-gray-600">Products Tracked</span>
                    <span className="font-semibold text-gray-800">
                      {data.products?.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status</span>
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      ✓ Connected
                    </span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                  <p className="text-sm text-cyan-800">
                    💡 <strong>Tip:</strong> Products with margins below 40% (red) may need price adjustments or cost optimization.
                  </p>
                </div>
              </div>
            </div>

            {/* Product Table */}
            <ProductTable products={data.products} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16">
        <div className="text-center text-gray-500 text-sm">
          <p>Data synced from TikTok Shop API • Last 30 days</p>
        </div>
      </footer>
    </div>
  )
}

