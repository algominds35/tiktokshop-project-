export default function SecurityPage() {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8">Information Security Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              <strong>Version:</strong> 1.0<br />
              <strong>Effective Date:</strong> December 8, 2024<br />
              <strong>Contact:</strong> alex@reconcilebookapp.com
            </p>
  
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">1. Purpose and Scope</h2>
              <p className="text-gray-700 mb-4">
                This Information Security Policy establishes the framework for protecting all information assets of ReconcileBook and our customers' data. This policy applies to all systems, applications, data, employees, contractors, and third-party services that process or store ReconcileBook data.
              </p>
              <h3 className="text-xl font-semibold mb-2">Objectives</h3>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Protect customer data and personal information from unauthorized access</li>
                <li>Ensure confidentiality, integrity, and availability of all data</li>
                <li>Comply with applicable data protection regulations (GDPR, CCPA, SOC 2)</li>
                <li>Maintain customer trust through transparent security practices</li>
              </ul>
            </section>
  
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">2. Data Classification</h2>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Highly Confidential</h3>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>Customer authentication credentials (passwords, API keys)</li>
                  <li>Payment information (processed via Stripe - PCI DSS compliant)</li>
                  <li>TikTok Shop OAuth tokens and refresh tokens</li>
                  <li>Personally Identifiable Information (PII)</li>
                </ul>
              </div>
  
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Confidential</h3>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>Customer business data (sales, profit, fees)</li>
                  <li>User account information (email, business name)</li>
                  <li>Transaction records and financial analytics</li>
                  <li>TikTok Shop order and product data</li>
                </ul>
              </div>
  
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left">Classification</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Encryption</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Access Control</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Retention</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Highly Confidential</td>
                      <td className="border border-gray-300 px-4 py-2">AES-256 at rest, TLS 1.3 in transit</td>
                      <td className="border border-gray-300 px-4 py-2">Role-based, MFA required</td>
                      <td className="border border-gray-300 px-4 py-2">As legally required</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Confidential</td>
                      <td className="border border-gray-300 px-4 py-2">AES-256 at rest, TLS 1.3 in transit</td>
                      <td className="border border-gray-300 px-4 py-2">Role-based access</td>
                      <td className="border border-gray-300 px-4 py-2">Active subscription + 30 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
  
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">3. Access Control and Authentication</h2>
              
              <h3 className="text-xl font-semibold mb-2">User Access Management</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>Multi-Factor Authentication (MFA):</strong> Required for all administrative access</li>
                <li><strong>Password Requirements:</strong> Minimum 8 characters, enforced by Supabase Auth</li>
                <li><strong>Session Management:</strong> Sessions expire after 14 days of inactivity with secure JWT tokens</li>
              </ul>
  
              <h3 className="text-xl font-semibold mb-2">Account Security</h3>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Account locked after 5 failed login attempts</li>
                <li>Secure email verification required for password reset</li>
                <li>Account deletion available via alex@reconcilebookapp.com</li>
              </ul>
            </section>
  
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">4. Data Encryption and Security</h2>
              
              <h3 className="text-xl font-semibold mb-2">Encryption Standards</h3>
              <p className="text-gray-700 mb-2"><strong>Data at Rest:</strong></p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Database: AES-256 encryption (Supabase PostgreSQL)</li>
                <li>Backups: AES-256 encrypted backups with separate keys</li>
                <li>API Keys: Encrypted in environment variables</li>
              </ul>
  
              <p className="text-gray-700 mb-2"><strong>Data in Transit:</strong></p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>TLS 1.3 for all API communications</li>
                <li>HTTPS enforced across all web properties</li>
                <li>Secure WebSocket connections (WSS)</li>
              </ul>
  
              <h3 className="text-xl font-semibold mb-2">Infrastructure Security</h3>
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left">Service</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Purpose</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Security Certification</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Vercel</td>
                      <td className="border border-gray-300 px-4 py-2">Hosting & CDN</td>
                      <td className="border border-gray-300 px-4 py-2">ISO 27001, SOC 2 Type II</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Supabase</td>
                      <td className="border border-gray-300 px-4 py-2">Database & Auth</td>
                      <td className="border border-gray-300 px-4 py-2">ISO 27001, SOC 2 Type II</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Stripe</td>
                      <td className="border border-gray-300 px-4 py-2">Payment Processing</td>
                      <td className="border border-gray-300 px-4 py-2">PCI DSS Level 1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
  
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">5. Privacy and Compliance</h2>
              
              <h3 className="text-xl font-semibold mb-2">Regulatory Compliance</h3>
              <div className="mb-4">
                <p className="font-semibold text-gray-900">GDPR Compliance</p>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>Legal basis: Contract performance, legitimate interest</li>
                  <li>Data subject rights fully supported</li>
                  <li>Data Protection Officer: alex@reconcilebookapp.com</li>
                </ul>
              </div>
  
              <div className="mb-4">
                <p className="font-semibold text-gray-900">CCPA Compliance</p>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>"Do Not Sell My Personal Information" honored</li>
                  <li>Consumer rights: Access, deletion, opt-out</li>
                </ul>
              </div>
  
              <div className="mb-4">
                <p className="font-semibold text-gray-900">SOC 2 Type II</p>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>Annual third-party audits conducted</li>
                  <li>Compliance reports available to enterprise customers</li>
                </ul>
              </div>
  
              <h3 className="text-xl font-semibold mb-2">Data Subject Rights</h3>
              <p className="text-gray-700 mb-2">Contact alex@reconcilebookapp.com to exercise:</p>
              <ul className="list-disc pl-6 text-gray-700">
                <li><strong>Right to Access:</strong> Export all personal data within 30 days</li>
                <li><strong>Right to Rectification:</strong> Update account information anytime</li>
                <li><strong>Right to Erasure:</strong> Account deletion with 30-day retention</li>
                <li><strong>Right to Portability:</strong> JSON export of all data</li>
                <li><strong>Right to Object:</strong> Opt-out of marketing communications</li>
              </ul>
            </section>
  
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">6. Data Retention and Deletion</h2>
              
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left">Data Type</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Retention Period</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Justification</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Active customer data</td>
                      <td className="border border-gray-300 px-4 py-2">Duration of subscription</td>
                      <td className="border border-gray-300 px-4 py-2">Service delivery</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Deleted account data</td>
                      <td className="border border-gray-300 px-4 py-2">30 days</td>
                      <td className="border border-gray-300 px-4 py-2">Recovery window</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Transaction logs</td>
                      <td className="border border-gray-300 px-4 py-2">7 years</td>
                      <td className="border border-gray-300 px-4 py-2">Legal/tax requirements</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Application logs</td>
                      <td className="border border-gray-300 px-4 py-2">90 days</td>
                      <td className="border border-gray-300 px-4 py-2">Security monitoring</td>
                    </tr>
                  </tbody>
                </table>
              </div>
  
              <h3 className="text-xl font-semibold mb-2">Secure Deletion Process</h3>
              <ol className="list-decimal pl-6 text-gray-700">
                <li>Customer requests deletion via dashboard or email</li>
                <li>Account marked for deletion with 30-day grace period</li>
                <li>After 30 days, secure deletion executed (database, backups, third-party data)</li>
                <li>Deletion confirmation email sent</li>
                <li>Audit log entry created (retained for 7 years)</li>
              </ol>
            </section>
  
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">7. Incident Response</h2>
              
              <h3 className="text-xl font-semibold mb-2">Response Timeline</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>Identification (0-1 hour):</strong> Incident detected and categorized</li>
                <li><strong>Containment (1-4 hours):</strong> Isolate affected systems</li>
                <li><strong>Investigation (4-24 hours):</strong> Determine scope and impact</li>
                <li><strong>Remediation (24-72 hours):</strong> Fix vulnerability, restore services</li>
                <li><strong>Recovery (72+ hours):</strong> Return to normal operations</li>
              </ul>
  
              <h3 className="text-xl font-semibold mb-2">Data Breach Notification</h3>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Customers notified within 72 hours of breach confirmation</li>
                <li>GDPR: Supervisory authority notified within 72 hours</li>
                <li>Public statement if breach affects more than 500 customers</li>
                <li>Contact: alex@reconcilebookapp.com</li>
              </ul>
            </section>
  
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">8. Security Monitoring</h2>
              
              <h3 className="text-xl font-semibold mb-2">Continuous Monitoring</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>24/7 automated security monitoring</li>
                <li>Real-time alerts for suspicious activity</li>
                <li>Database and infrastructure monitoring</li>
              </ul>
  
              <h3 className="text-xl font-semibold mb-2">Security Testing</h3>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Automated weekly vulnerability scans</li>
                <li>Annual third-party penetration tests</li>
                <li>Security review for all code changes</li>
                <li>Automated scanning for vulnerable dependencies</li>
              </ul>
            </section>
  
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">9. Business Continuity</h2>
              
              <h3 className="text-xl font-semibold mb-2">Backup Strategy</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Automated daily database backups with 30-day retention</li>
                <li>Geographic redundancy with multiple regions</li>
                <li>Monthly backup restoration tests</li>
              </ul>
  
              <h3 className="text-xl font-semibold mb-2">Recovery Objectives</h3>
              <ul className="list-disc pl-6 text-gray-700">
                <li><strong>Recovery Time Objective (RTO):</strong> 4 hours</li>
                <li><strong>Recovery Point Objective (RPO):</strong> 24 hours</li>
                <li><strong>Target Uptime:</strong> 99.9% availability</li>
              </ul>
            </section>
  
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">10. Contact Information</h2>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2">
                  <strong>General Security Inquiries:</strong><br />
                  alex@reconcilebookapp.com
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Data Protection Officer:</strong><br />
                  alex@reconcilebookapp.com
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Security Incident Reporting:</strong><br />
                  alex@reconcilebookapp.com<br />
                  <span className="text-sm">Response time: 24-48 hours</span>
                </p>
                <p className="text-gray-700">
                  <strong>Privacy Requests:</strong><br />
                  alex@reconcilebookapp.com
                </p>
              </div>
            </section>
  
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">11. Certifications</h2>
              
              <ul className="list-disc pl-6 text-gray-700">
                <li>Infrastructure partners: SOC 2 Type II, ISO 27001 certified</li>
                <li>Payment processing: PCI DSS Level 1 compliant (via Stripe)</li>
                <li>Privacy: GDPR and CCPA compliant</li>
                <li>Regular third-party security assessments conducted</li>
              </ul>
            </section>
  
            <div className="border-t pt-8 mt-12 text-sm text-gray-600">
              <p className="mb-2">
                <strong>Document Version:</strong> 1.0<br />
                <strong>Effective Date:</strong> December 8, 2024<br />
                <strong>Next Review Date:</strong> December 8, 2025<br />
                <strong>Classification:</strong> Public
              </p>
              <p className="mt-4">
                © 2024 ReconcileBook. All rights reserved.<br />
                This document is confidential and proprietary to ReconcileBook.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }