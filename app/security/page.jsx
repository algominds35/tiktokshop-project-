export default function DataProtectionSummary() {
  return (
    <div className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Data Protection Summary</h1>
        <p className="text-lg text-gray-600 mb-8">Security + How Your Data Is Handled</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8 bg-green-50 border-l-4 border-green-500 p-6 rounded">
            <h2 className="text-2xl font-bold text-green-900 mb-3">🔒 Enterprise-Grade Security</h2>
            <p className="text-green-800">
              Your data is protected with the same security standards used by banks and Fortune 500 companies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. How We Protect Your Data</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-blue-900 mb-2">🔐 Encryption</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• TLS 1.3 encryption in transit</li>
                  <li>• AES-256 encryption at rest</li>
                  <li>• End-to-end encrypted backups</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-purple-900 mb-2">🛡️ Access Control</h3>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• Role-based access controls</li>
                  <li>• Multi-factor authentication</li>
                  <li>• Audit logs for all access</li>
                </ul>
              </div>

              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-orange-900 mb-2">🏢 Infrastructure</h3>
                <ul className="text-sm text-orange-800 space-y-1">
                  <li>• SOC 2 Type II certified hosting</li>
                  <li>• Redundant data centers</li>
                  <li>• 99.9% uptime guarantee</li>
                </ul>
              </div>

              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-red-900 mb-2">👁️ Monitoring</h3>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>• 24/7 security monitoring</li>
                  <li>• Automated threat detection</li>
                  <li>• Regular penetration testing</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. What Data We Collect</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 mb-4">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Data Type</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Purpose</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Retention</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">Account Info (email, name)</td>
                    <td className="border border-gray-300 px-4 py-3">Authentication & support</td>
                    <td className="border border-gray-300 px-4 py-3">Account lifetime + 90 days</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">TikTok Shop Data</td>
                    <td className="border border-gray-300 px-4 py-3">Profit calculations</td>
                    <td className="border border-gray-300 px-4 py-3">Account lifetime + 90 days</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">Payment Info</td>
                    <td className="border border-gray-300 px-4 py-3">Billing (via Stripe)</td>
                    <td className="border border-gray-300 px-4 py-3">Per Stripe policy</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">Usage Analytics</td>
                    <td className="border border-gray-300 px-4 py-3">Service improvement</td>
                    <td className="border border-gray-300 px-4 py-3">24 months</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Data</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <h3 className="font-bold text-gray-900">Calculate Your Profits</h3>
                  <p className="text-gray-700">We analyze your TikTok Shop transactions to show real profit margins and fee breakdowns.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <h3 className="font-bold text-gray-900">Sync with QuickBooks</h3>
                  <p className="text-gray-700">If enabled, we create journal entries in your QuickBooks account for each payout.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <h3 className="font-bold text-gray-900">Provide Support</h3>
                  <p className="text-gray-700">We may access your account to troubleshoot issues (only with your permission).</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <h3 className="font-bold text-gray-900">Improve Our Service</h3>
                  <p className="text-gray-700">Anonymous usage data helps us fix bugs and build better features.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Who Can Access Your Data</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded mb-4">
              <p className="font-bold text-yellow-900 mb-2">⚠️ We NEVER sell your data</p>
              <p className="text-yellow-800">Your financial information is yours. We will never sell it to advertisers or third parties.</p>
            </div>

            <p className="text-gray-700 mb-4">Limited access only to:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li><strong>ReconcileBook Engineers:</strong> For support and maintenance (access logged)</li>
              <li><strong>TikTok Shop API:</strong> To retrieve your transaction data</li>
              <li><strong>QuickBooks API:</strong> To sync payouts (if enabled by you)</li>
              <li><strong>Stripe:</strong> For payment processing only</li>
              <li><strong>Hosting Provider:</strong> Encrypted storage (Vercel/AWS)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Processing Locations</h2>
            <p className="text-gray-700 mb-4">
              Your data is processed and stored in secure data centers located in the United States. We use cloud infrastructure with automatic failover and redundancy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Control Over Your Data</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-gray-300 p-4 rounded">
                <h3 className="font-bold text-gray-900 mb-2">📥 Export Your Data</h3>
                <p className="text-sm text-gray-700">Download all your data anytime in CSV/JSON format</p>
              </div>

              <div className="border border-gray-300 p-4 rounded">
                <h3 className="font-bold text-gray-900 mb-2">🗑️ Delete Your Data</h3>
                <p className="text-sm text-gray-700">Permanently delete your account and all associated data</p>
              </div>

              <div className="border border-gray-300 p-4 rounded">
                <h3 className="font-bold text-gray-900 mb-2">✏️ Update Your Data</h3>
                <p className="text-sm text-gray-700">Correct any inaccurate information in your account</p>
              </div>

              <div className="border border-gray-300 p-4 rounded">
                <h3 className="font-bold text-gray-900 mb-2">🔌 Disconnect Services</h3>
                <p className="text-sm text-gray-700">Revoke TikTok Shop or QuickBooks access anytime</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Compliance & Certifications</h2>
            <div className="flex flex-wrap gap-4">
              <div className="bg-gray-100 px-6 py-3 rounded-lg font-semibold">GDPR Compliant</div>
              <div className="bg-gray-100 px-6 py-3 rounded-lg font-semibold">UK GDPR</div>
              <div className="bg-gray-100 px-6 py-3 rounded-lg font-semibold">SOC 2 Type II</div>
              <div className="bg-gray-100 px-6 py-3 rounded-lg font-semibold">CCPA Compliant</div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Breach Notification</h2>
            <p className="text-gray-700 mb-4">
              In the unlikely event of a data breach, we will notify affected users within 72 hours via email and provide details about the breach, impact, and remediation steps.
            </p>
          </section>

          <section className="mb-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
            <h2 className="text-2xl font-bold text-blue-900 mb-3">Questions About Security?</h2>
            <p className="text-blue-800 mb-4">
              Our security team is here to help answer any questions from your IT or compliance team.
            </p>
            <p className="text-blue-800">
              <strong>Contact:</strong> <a href="mailto:security@reconcilebook.com" className="underline">security@reconcilebook.com</a><br />
              <strong>Data Protection Officer:</strong> <a href="mailto:dpo@reconcilebook.com" className="underline">dpo@reconcilebook.com</a>
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <a href="/" className="text-blue-600 hover:underline">← Back to Home</a>
        </div>
      </div>
    </div>
  )
}

