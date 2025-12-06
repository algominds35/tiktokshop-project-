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
          router.push('/')
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
          handleSubscribe()
          return
        }
        throw new Error(result.error || 'Failed to sync data')
      }

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

      const response = await fetch('/api/demo/data', {
        method: 'POST',
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to load demo data')
      }

      setData(result.data)
      setIsDemo(true)
    } catch (err) {
      console.error('Demo load error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/')
    } catch (err) {
      console.error('Logout error:', err)
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
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-3xl">📊</span>
              <span className="text-2xl font-bold text-gray-800">ReconcileBook</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleSync}
                disabled={syncing}
                className="bg-gradient-to-r from-pink-500 to-cyan-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {syncing ? '🔄 Syncing...' : '🔄 Sync Now'}
              </button>
              <button
                onClick={handleSubscribe}
                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                💳 Manage Subscription
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-50 text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-red-100 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {!data ? (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Getting Started</h3>
              <p className="text-slate-600 text-sm mb-4">
                Follow these steps to start tracking your TikTok Shop profit:
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">1.</span>
                  <span className="text-slate-700">Connect your TikTok Shop (required - one time setup)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">2.</span>
                  <span className="text-slate-700">Click "Sync Data" to fetch orders and see profit breakdown</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-slate-400">3.</span>
                  <span className="text-slate-500">Connect QuickBooks (optional - for automatic bookkeeping)</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border-l-4 border-blue-600 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold">1</span>
                    <h3 className="text-lg font-bold text-slate-900">Connect TikTok Shop</h3>
                    <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded font-semibold">REQUIRED</span>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">
                    Link your TikTok Shop account to fetch sales data and fee information. This is required before you can sync any data.
                  </p>
                  <button
                    onClick={() => window.location.href = '/api/auth/tiktok'}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all"
                  >
                    Connect TikTok Shop
                  </button>
                </div>
                <div>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full font-semibold">
                    Not Connected
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border-l-4 border-slate-300 p-6 opacity-75">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-400 text-white text-xs font-bold">2</span>
                    <h3 className="text-lg font-bold text-slate-900">Sync Your Data</h3>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">
                    After connecting TikTok Shop, click this button to fetch your last 30 days of orders and calculate your real profit after all fees.
                  </p>
                  <button
                    onClick={handleSync}
                    disabled={syncing}
                    className="bg-slate-400 text-white px-6 py-2 rounded-lg font-semibold cursor-not-allowed"
                  >
                    {syncing ? 'Syncing...' : 'Sync Data'}
                  </button>
                  <p className="text-xs text-slate-500 mt-2">
                    Complete Step 1 first
                  </p>
                </div>
                <div>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full font-semibold">
                    No Data Yet
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border-l-4 border-green-600 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white text-xs font-bold">3</span>
                    <h3 className="text-lg font-bold text-slate-900">QuickBooks Integration</h3>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded font-semibold">OPTIONAL</span>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">
                    Automatically sync your TikTok Shop settlements to QuickBooks as journal entries (same method as A2X). This step is completely optional.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => window.location.href = '/api/quickbooks/connect?shopId=default'}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-all"
                    >
                      Connect QuickBooks
                    </button>
                    <button
                      onClick={() => router.push('/settings/quickbooks')}
                      className="bg-white border border-gray-300 text-slate-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                    >
                      Configure Accounts
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Can be done anytime, even after syncing TikTok data
                  </p>
                </div>
                <div>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full font-semibold">
                    Not Connected
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-base font-bold text-slate-900 mb-2">Don't Have a TikTok Shop Yet?</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Click below to preview the dashboard with sample data. Perfect for testing or showcasing the platform.
                  </p>
                  <button
                    onClick={handleLoadDemo}
                    className="bg-slate-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-slate-800 transition-all"
                  >
                    View Demo Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {isDemo && (
              <div className="bg-amber-50 border-l-4 border-amber-500 p-5">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                  </svg>
                  <div>
                    <p className="font-semibold text-amber-900 mb-1">Demo Mode Active</p>
                    <p className="text-sm text-amber-700">
                      You're viewing sample data. Connect your TikTok Shop to see your real profit and fees.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <ProfitCards data={data} />

            <div className="grid lg:grid-cols-2 gap-8">
              <FeeBreakdown feeBreakdown={data.fee_breakdown} />

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

            <ProductTable products={data.products} />
          </div>
        )}
      </main>

      <footer className="container mx-auto px-4 py-8 mt-16">
        <div className="text-center text-gray-500 text-sm">
          <p>Data synced from TikTok Shop API • Last 30 days</p>
        </div>
      </footer>
    </div>
  )
}
