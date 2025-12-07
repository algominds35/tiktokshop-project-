export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: December 7, 2024</p>
        <p className="text-sm text-blue-600 mb-8">Beta Version — GDPR/UK Compliant</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 mb-4">
              ReconcileBook ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our TikTok Shop profit tracking service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Information You Provide</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Account information (name, email address)</li>
              <li>Payment information (processed securely through Stripe)</li>
              <li>TikTok Shop OAuth credentials (securely stored)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Information Automatically Collected</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>TikTok Shop transaction data via API</li>
              <li>Usage data and analytics</li>
              <li>Device and browser information</li>
              <li>IP address and location data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Provide and maintain our service</li>
              <li>Calculate profit margins and fee breakdowns</li>
              <li>Sync data with QuickBooks (if enabled)</li>
              <li>Process payments and manage subscriptions</li>
              <li>Send service-related communications</li>
              <li>Improve our service and develop new features</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Sharing and Disclosure</h2>
            <p className="text-gray-700 mb-4">We do not sell your personal data. We may share your information with:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li><strong>Service Providers:</strong> TikTok, QuickBooks, Stripe, hosting providers</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
            <p className="text-gray-700 mb-4">
              We implement industry-standard security measures including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Encryption in transit (TLS/SSL) and at rest</li>
              <li>Secure OAuth authentication</li>
              <li>Regular security audits</li>
              <li>Access controls and monitoring</li>
              <li>SOC 2 compliant infrastructure</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights (GDPR/UK)</h2>
            <p className="text-gray-700 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li><strong>Access:</strong> Request a copy of your data</li>
              <li><strong>Rectification:</strong> Correct inaccurate data</li>
              <li><strong>Erasure:</strong> Request deletion of your data</li>
              <li><strong>Portability:</strong> Export your data</li>
              <li><strong>Objection:</strong> Object to certain processing</li>
              <li><strong>Restriction:</strong> Request restricted processing</li>
              <li><strong>Withdraw Consent:</strong> At any time</li>
            </ul>
            <p className="text-gray-700">
              To exercise these rights, contact us at: <a href="mailto:alex@reconcilebookapp.com" className="text-blue-600 hover:underline">alex@reconcilebookapp.com</a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
            <p className="text-gray-700 mb-4">
              We retain your data for as long as your account is active or as needed to provide services. After account deletion, we retain data for 90 days for recovery purposes, then permanently delete it unless required by law to retain longer.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. International Data Transfers</h2>
            <p className="text-gray-700 mb-4">
              Your data may be transferred to and processed in countries outside your residence. We ensure adequate protection through standard contractual clauses and appropriate safeguards.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Cookies and Tracking</h2>
            <p className="text-gray-700 mb-4">
              We use essential cookies for authentication and functionality. Analytics cookies help us improve our service. You can control cookies through your browser settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Children's Privacy</h2>
            <p className="text-gray-700 mb-4">
              Our service is not intended for users under 18. We do not knowingly collect data from children.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update this Privacy Policy periodically. We will notify you of material changes via email or prominent notice on our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
            <p className="text-gray-700 mb-2">
              For privacy-related questions or concerns:
            </p>
            <p className="text-gray-700">
              Email: <a href="mailto:alex@reconcilebookapp.com" className="text-blue-600 hover:underline">alex@reconcilebookapp.com</a><br />
              Data Protection Officer: <a href="mailto:alex@reconcilebookapp.com" className="text-blue-600 hover:underline">alex@reconcilebookapp.com</a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Supervisory Authority</h2>
            <p className="text-gray-700">
              If you're in the EU/UK, you have the right to lodge a complaint with your local data protection authority.
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