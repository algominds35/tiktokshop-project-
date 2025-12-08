'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export default function Dashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: 'revenue', direction: 'desc' })
  const [trialStatus, setTrialStatus] = useState(null)
  const [showTrialBanner, setShowTrialBanner] = useState(false)
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(false)
  const [dateRange, setDateRange] = useState('last30days')

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    // Check Supabase session first
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      // No active session, check localStorage as fallback
    const loggedIn = localStorage.getItem('user_logged_in')
    const email = localStorage.getItem('user_email')
    
    if (!loggedIn || !email) {
      router.push('/login')
      return
    }
      
      // Has localStorage but no session, continue but user might need to reauth
      checkTrialStatus(email)
      loadData()
      return
    }
    
    // Has active session, store in localStorage
    const email = session.user.email
    localStorage.setItem('user_email', email)
    localStorage.setItem('user_logged_in', 'true')
    localStorage.setItem('user_id', session.user.id)

    // Check for verified parameter (from email confirmation)
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('verified') === 'true') {
      setShowWelcomeBanner(true)
      setTimeout(() => {
        // Remove verified param from URL
        window.history.replaceState({}, '', '/dashboard')
      }, 5000)
    }

    // Check trial status
    checkTrialStatus(email)
    loadData()
  }

  const checkTrialStatus = async (email) => {
    try {
      const response = await fetch('/api/user/trial-status', {
        headers: {
          'x-user-email': email
        }
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to check trial status')
      }

      setTrialStatus(result)

      // If trial expired and no active subscription, redirect to subscribe
      if (result.isTrialExpired && !result.hasAccess) {
        router.push('/subscribe?trial_expired=true')
        return
      }

      // Show banner if trial is expiring soon (3 days or less)
      if (result.subscriptionStatus === 'trialing' && result.daysRemaining <= 3 && result.daysRemaining > 0) {
        setShowTrialBanner(true)
      }
    } catch (err) {
      console.error('Trial status check error:', err)
    }
  }

  const getDateRange = (range) => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    let startDate, endDate

    switch (range) {
      case 'today':
        startDate = today
        endDate = now
        break
      case 'yesterday':
        startDate = new Date(today)
        startDate.setDate(startDate.getDate() - 1)
        endDate = new Date(today)
        endDate.setSeconds(endDate.getSeconds() - 1)
        break
      case 'last7days':
        startDate = new Date(today)
        startDate.setDate(startDate.getDate() - 7)
        endDate = now
        break
      case 'last14days':
        startDate = new Date(today)
        startDate.setDate(startDate.getDate() - 14)
        endDate = now
        break
      case 'last30days':
        startDate = new Date(today)
        startDate.setDate(startDate.getDate() - 30)
        endDate = now
        break
      default:
        startDate = new Date(today)
        startDate.setDate(startDate.getDate() - 30)
        endDate = now
    }

    return {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    }
  }

  const loadData = async (dateRangeFilter = dateRange) => {
    try {
      setLoading(true)
      setError('')

      const { startDate, endDate } = getDateRange(dateRangeFilter)
      const url = `/api/profit?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`
      
      const response = await fetch(url)
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

  const handleDateRangeChange = (range) => {
    setDateRange(range)
    loadData(range)
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


  const handleLogout = () => {
    localStorage.removeItem('user_email')
    localStorage.removeItem('user_logged_in')
    localStorage.removeItem('trial_start')
    router.push('/')
  }


  const sortTable = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const getSortedProducts = () => {
    if (!data?.products) return []
    
    const sorted = [...data.products].sort((a, b) => {
      if (sortConfig.direction === 'asc') {
        return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1
      }
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1
    })
    
    return sorted
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ReconcileBook</h1>
                <p className="text-xs text-gray-500">TikTok Shop Analytics</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleSync}
                disabled={syncing}
                className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {syncing ? 'Syncing...' : 'Sync Data'}
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner (after email verification) */}
        {showWelcomeBanner && (
          <div className="mb-6 bg-green-50 border-2 border-green-400 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl">🎉</div>
                <div>
                  <p className="font-semibold text-green-900">
                    Welcome! Your account has been verified.
                  </p>
                  <p className="text-sm text-green-700 mt-1">
                    Your 14-day free trial has started. Connect your TikTok Shop to get started!
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowWelcomeBanner(false)}
                className="text-green-700 hover:text-green-900 font-semibold"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Trial Expiration Banner */}
        {showTrialBanner && trialStatus && trialStatus.daysRemaining > 0 && (
          <div className="mb-6 bg-orange-50 border-2 border-orange-400 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl">⏰</div>
                <div>
                  <p className="font-semibold text-orange-900">
                    Your free trial expires in {trialStatus.daysRemaining} {trialStatus.daysRemaining === 1 ? 'day' : 'days'}
                  </p>
                  <p className="text-sm text-orange-700 mt-1">
                    Subscribe now to continue tracking your profits after your trial ends.
                  </p>
                </div>
              </div>
              <button
                onClick={() => router.push('/subscribe')}
                className="px-6 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors whitespace-nowrap"
              >
                Subscribe Now
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {!data ? (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Get Started</h2>
                <p className="text-gray-600 mb-6">Connect your TikTok Shop to start tracking your real profit and fees.</p>
                <div className="space-y-3">
                  <button
                    onClick={() => window.location.href = '/api/auth/tiktok'}
                    className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Connect TikTok Shop
                  </button>
                </div>
              </div>
            </div>

                  </div>
        ) : (
          <div className="space-y-6">
            {/* Date Range Filters */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleDateRangeChange('today')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    dateRange === 'today' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Today
                </button>
                <button
                  onClick={() => handleDateRangeChange('yesterday')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    dateRange === 'yesterday' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Yesterday
                </button>
                <button
                  onClick={() => handleDateRangeChange('last7days')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    dateRange === 'last7days' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Last 7 days
                </button>
                <button
                  onClick={() => handleDateRangeChange('last14days')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    dateRange === 'last14days' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Last 14 days
                </button>
                    <button
                  onClick={() => handleDateRangeChange('last30days')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    dateRange === 'last30days' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                    >
                  Last 30 days
                    </button>
            <button
                  onClick={() => handleDateRangeChange('custom')}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-600">Gross Revenue</p>
                  <span className="text-xs text-green-600 font-medium">↑ 12.5%</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">${data.revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p className="text-xs text-gray-500 mt-2">Last 30 days</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-600">Total Fees</p>
                  <span className="text-xs text-red-600 font-medium">↑ 8.2%</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">${data.fees.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p className="text-xs text-gray-500 mt-2">{((data.fees / data.revenue) * 100).toFixed(1)}% of revenue</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-600">Net Profit</p>
                  <span className="text-xs text-green-600 font-medium">↑ 15.3%</span>
                </div>
                <p className="text-3xl font-bold text-green-600">${data.profit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p className="text-xs text-gray-500 mt-2">After all fees</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-600">Profit Margin</p>
                  <span className="text-xs text-green-600 font-medium">↑ 2.1%</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{data.margin.toFixed(1)}%</p>
                <p className="text-xs text-gray-500 mt-2">Industry avg: 20-30%</p>
              </div>
            </div>

              {/* Fee Breakdown */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Fee Breakdown</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Platform Fees</span>
                    <span className="text-sm font-bold text-gray-900">${data.fee_breakdown.platformFees.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(data.fee_breakdown.platformFees / data.fees) * 100}%` }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{((data.fee_breakdown.platformFees / data.fees) * 100).toFixed(1)}% of total fees</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Payment Processing</span>
                    <span className="text-sm font-bold text-gray-900">${data.fee_breakdown.paymentFees.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${(data.fee_breakdown.paymentFees / data.fees) * 100}%` }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{((data.fee_breakdown.paymentFees / data.fees) * 100).toFixed(1)}% of total fees</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Shipping Fees</span>
                    <span className="text-sm font-bold text-gray-900">${data.fee_breakdown.shippingFees.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${(data.fee_breakdown.shippingFees / data.fees) * 100}%` }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{((data.fee_breakdown.shippingFees / data.fees) * 100).toFixed(1)}% of total fees</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Affiliate Commissions</span>
                    <span className="text-sm font-bold text-gray-900">${data.fee_breakdown.commissions.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${(data.fee_breakdown.commissions / data.fees) * 100}%` }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{((data.fee_breakdown.commissions / data.fees) * 100).toFixed(1)}% of total fees</p>
                </div>
              </div>
            </div>

            {/* Product Performance Table */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900">Product Performance</h2>
                  <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    Export CSV
                  </button>
                </div>
                  </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => sortTable('productName')}>
                        Product Name {sortConfig.key === 'productName' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => sortTable('revenue')}>
                        Revenue {sortConfig.key === 'revenue' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => sortTable('fees')}>
                        Fees {sortConfig.key === 'fees' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => sortTable('profit')}>
                        Profit {sortConfig.key === 'profit' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => sortTable('margin')}>
                        Margin {sortConfig.key === 'margin' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getSortedProducts().map((product, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{product.productName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm font-medium text-gray-900">${product.revenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm text-gray-900">${product.fees.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm font-medium text-green-600">${product.profit.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm font-bold text-gray-900">{product.margin.toFixed(1)}%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {product.margin >= 60 ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-600 mr-1.5"></span>
                              Profitable
                    </span>
                          ) : product.margin >= 50 ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-1.5"></span>
                              Moderate
                    </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mr-1.5"></span>
                              Low Margin
                    </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                  </div>
                </div>

            {/* QuickBooks Integration CTA */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Sync Payouts to QuickBooks</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Automatically sync your TikTok Shop payouts to QuickBooks. One journal entry per payout with proper reconciliation.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => window.location.href = '/api/quickbooks/connect?shopId=default'}
                      className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Connect QuickBooks
                    </button>
                    <button
                      onClick={() => router.push('/settings/quickbooks')}
                      className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Configure Settings
                    </button>
                  </div>
                </div>
                <div className="ml-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Optional
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}