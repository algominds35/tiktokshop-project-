'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function QuickBooksSettings() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [accounts, setAccounts] = useState([])
  const [mapping, setMapping] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const shopId = 'default' // TODO: Get from user context

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')

      // Fetch QuickBooks accounts
      const accountsRes = await fetch(`/api/quickbooks/accounts?shopId=${shopId}`)
      if (!accountsRes.ok) {
        const result = await accountsRes.json()
        throw new Error(result.error || 'Failed to load QuickBooks accounts')
      }
      const accountsData = await accountsRes.json()
      setAccounts(accountsData.accounts || [])

      // Fetch existing mapping
      const mappingRes = await fetch(`/api/quickbooks/mapping?shopId=${shopId}`)
      if (mappingRes.ok) {
        const mappingData = await mappingRes.json()
        setMapping(mappingData.mapping)
      }
    } catch (err) {
      console.error('Load error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      setError('')
      setSuccess('')

      const formData = new FormData(e.target)
      const mappingData = {
        shopId: shopId,
        revenueAccountId: formData.get('revenue'),
        platformFeesAccountId: formData.get('platformFees'),
        paymentFeesAccountId: formData.get('paymentFees'),
        shippingIncomeAccountId: formData.get('shippingIncome'),
        shippingExpenseAccountId: formData.get('shippingExpense'),
        affiliateCommissionAccountId: formData.get('affiliateCommission'),
        refundsAccountId: formData.get('refunds'),
        adjustmentsAccountId: formData.get('adjustments'),
        clearingAccountId: formData.get('clearing'),
      }

      const response = await fetch('/api/quickbooks/mapping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mappingData),
      })

      if (!response.ok) {
        const result = await response.json()
        throw new Error(result.error || 'Failed to save mapping')
      }

      setSuccess('Account mapping saved successfully!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      console.error('Save error:', err)
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading QuickBooks accounts...</p>
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
                <span className="text-3xl">📊</span>
                <span className="text-2xl font-bold text-gray-800">QuickBooks Settings</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-700">{success}</p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Map QuickBooks Accounts
          </h2>
          <p className="text-gray-600 mb-6">
            Select which QuickBooks accounts to use for each type of transaction. These mappings will be used when syncing TikTok Shop settlements to QuickBooks.
          </p>

          <form onSubmit={handleSave} className="space-y-6">
            {/* Clearing Account (Most Important!) */}
            <div className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Clearing Account <span className="text-red-500">*</span>
                <span className="ml-2 text-xs font-normal text-green-700">(REQUIRED - Use "Other Current Assets")</span>
              </label>
              <select
                name="clearing"
                required
                defaultValue={mapping?.clearing_account_id || ''}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="">Select Clearing Account...</option>
                {accounts.filter(a => a.type === 'Other Current Asset').map(account => (
                  <option key={account.id} value={account.id}>
                    {account.fullyQualifiedName}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-sm text-gray-600">
                This account holds the net payout amount until it's deposited into your bank.
              </p>
            </div>

            {/* Revenue Account */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Revenue Account <span className="text-red-500">*</span>
              </label>
              <select
                name="revenue"
                required
                defaultValue={mapping?.revenue_account_id || ''}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="">Select Revenue Account...</option>
                {accounts.filter(a => a.type === 'Income').map(account => (
                  <option key={account.id} value={account.id}>
                    {account.fullyQualifiedName}
                  </option>
                ))}
              </select>
            </div>

            {/* Fee Accounts */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Platform Fees Account <span className="text-red-500">*</span>
                </label>
                <select
                  name="platformFees"
                  required
                  defaultValue={mapping?.platform_fees_account_id || ''}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="">Select Account...</option>
                  {accounts.filter(a => a.type === 'Expense').map(account => (
                    <option key={account.id} value={account.id}>
                      {account.fullyQualifiedName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Payment Fees Account <span className="text-red-500">*</span>
                </label>
                <select
                  name="paymentFees"
                  required
                  defaultValue={mapping?.payment_fees_account_id || ''}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="">Select Account...</option>
                  {accounts.filter(a => a.type === 'Expense').map(account => (
                    <option key={account.id} value={account.id}>
                      {account.fullyQualifiedName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Shipping Accounts */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Shipping Income Account <span className="text-red-500">*</span>
                </label>
                <select
                  name="shippingIncome"
                  required
                  defaultValue={mapping?.shipping_income_account_id || ''}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="">Select Account...</option>
                  {accounts.filter(a => a.type === 'Income').map(account => (
                    <option key={account.id} value={account.id}>
                      {account.fullyQualifiedName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Shipping Expense Account <span className="text-red-500">*</span>
                </label>
                <select
                  name="shippingExpense"
                  required
                  defaultValue={mapping?.shipping_expense_account_id || ''}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="">Select Account...</option>
                  {accounts.filter(a => a.type === 'Expense').map(account => (
                    <option key={account.id} value={account.id}>
                      {account.fullyQualifiedName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Other Accounts */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Affiliate Commission Account <span className="text-red-500">*</span>
                </label>
                <select
                  name="affiliateCommission"
                  required
                  defaultValue={mapping?.affiliate_commission_account_id || ''}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="">Select Account...</option>
                  {accounts.filter(a => a.type === 'Expense').map(account => (
                    <option key={account.id} value={account.id}>
                      {account.fullyQualifiedName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Refunds Account <span className="text-red-500">*</span>
                </label>
                <select
                  name="refunds"
                  required
                  defaultValue={mapping?.refunds_account_id || ''}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="">Select Account...</option>
                  {accounts.filter(a => a.type === 'Expense').map(account => (
                    <option key={account.id} value={account.id}>
                      {account.fullyQualifiedName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Adjustments Account <span className="text-red-500">*</span>
              </label>
              <select
                name="adjustments"
                required
                defaultValue={mapping?.adjustments_account_id || ''}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="">Select Account...</option>
                {accounts.filter(a => a.type === 'Expense' || a.type === 'Other Expense').map(account => (
                  <option key={account.id} value={account.id}>
                    {account.fullyQualifiedName}
                  </option>
                ))}
              </select>
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t">
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-gradient-to-r from-pink-500 to-cyan-500 text-white px-8 py-4 rounded-lg text-lg font-bold hover:shadow-xl transition-all disabled:opacity-50"
              >
                {saving ? '💾 Saving...' : '💾 Save Account Mapping'}
              </button>
            </div>
          </form>
        </div>

        {/* Help Section */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-2">
            💡 Need Help?
          </h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• <strong>Clearing Account:</strong> Should be "Other Current Assets" type in QuickBooks</li>
            <li>• <strong>Revenue:</strong> Your main sales income account</li>
            <li>• <strong>Fees:</strong> Expense accounts for different fee types</li>
            <li>• <strong>Shipping:</strong> Separate income and expense for shipping</li>
          </ul>
        </div>
      </main>
    </div>
  )
}

