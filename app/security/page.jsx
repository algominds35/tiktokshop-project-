export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">ReconcileBook - Information Security Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            <strong>Version:</strong> 1.0<br />
            <strong>Effective Date:</strong> December 8, 2024<br />
            <strong>Last Updated:</strong> December 8, 2024<br />
            <strong>Owner:</strong> ReconcileBook Security Team<br />
            <strong>Contact:</strong> alex@reconcilebookapp.com
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">1. Purpose and Scope</h2>
            <p className="text-gray-700 mb-4">
              This Information Security Policy establishes the framework for protecting all information assets of ReconcileBook and our customers' data. This policy applies to all systems, applications, data, employees, contractors, and third-party services that process or store ReconcileBook data.
            </p>
            <h3 className="text-xl font-semibold mb-2">1.1 Objectives</h3>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Protect customer data and personal information from unauthorized access</li>
              <li>Ensure confidentiality, integrity, and availability of all data</li>
              <li>Comply with applicable data protection regulations (GDPR, CCPA, SOC 2)</li>
              <li>Maintain customer trust through transparent security practices</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">2. Data Classification and Handling</h2>
            
            <h3 className="text-xl font-semibold mb-2">2.1 Data Classification Levels</h3>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2">HIGHLY CONFIDENTIAL</h4>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Customer authentication credentials (passwords, API keys)</li>
                <li>Payment information (processed via Stripe - PCI DSS compliant)</li>
                <li>TikTok Shop OAuth tokens and refresh tokens</li>
                <li>Personally Identifiable Information (PII)</li>
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2">CONFIDENTIAL</h4>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Customer business data (sales, profit, fees)</li>
                <li>User account information (email, business name)</li>
                <li>Transaction records and financial analytics</li>
                <li>TikTok Shop order and product data</li>
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2">INTERNAL</h4>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Application logs (sanitized - no PII)</li>
                <li>System configuration (non-sensitive)</li>
                <li>Aggregated analytics (anonymized)</li>
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2">PUBLIC</h4>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Marketing materials</li>
                <li>Product documentation</li>
                <li>Public website content</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold mb-2">2.2 Data Handling Requirements</h3>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">Classification</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Encryption</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Access Control</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Retention</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Disposal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Highly Confidential</td>
                    <td className="border border-gray-300 px-4 py-2">AES-256 at rest, TLS 1.3 in transit</td>
                    <td className="border border-gray-300 px-4 py-2">Role-based, MFA required</td>
                    <td className="border border-gray-300 px-4 py-2">As legally required</td>
                    <td className="border border-gray-300 px-4 py-2">Secure deletion + audit trail</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Confidential</td>
                    <td className="border border-gray-300 px-4 py-2">AES-256 at rest, TLS 1.3 in transit</td>
                    <td className="border border-gray-300 px-4 py-2">Role-based access</td>
                    <td className="border border-gray-300 px-4 py-2">Active subscription + 30 days</td>
                    <td className="border border-gray-300 px-4 py-2">Secure deletion</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Internal</td>
                    <td className="border border-gray-300 px-4 py-2">TLS 1.3 in transit</td>
                    <td className="border border-gray-300 px-4 py-2">Authenticated users only</td>
                    <td className="border border-gray-300 px-4 py-2">90 days</td>
                    <td className="border border-gray-300 px-4 py-2">Standard deletion</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Public</td>
                    <td className="border border-gray-300 px-4 py-2">TLS 1.3 in transit</td>
                    <td className="border border-gray-300 px-4 py-2">Public access</td>
                    <td className="border border-gray-300 px-4 py-2">Indefinite</td>
                    <td className="border border-gray-300 px-4 py-2">Standard deletion</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">3. Access Control and Authentication</h2>
            
            <h3 className="text-xl font-semibold mb-2">3.1 User Access Management</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>Multi-Factor Authentication (MFA):</strong> Required for all administrative access</li>
              <li><strong>Password Requirements:</strong> Minimum 8 characters, enforced by Supabase Auth</li>
              <li><strong>Session Management:</strong> Sessions expire after 14 days of inactivity with secure JWT tokens</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">3.2 Role-Based Access Control (RBAC)</h3>
            
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">Customer Users</h4>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Access only to their own business data</li>
                <li>Cannot view other customers' information</li>
                <li>Full CRUD operations on their own data</li>
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">System Administrators</h4>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Database access for maintenance only</li>
                <li>All actions logged and auditable</li>
                <li>Emergency access only with approval</li>
                <li>No access to customer passwords (hashed by Supabase)</li>
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">Third-Party Services</h4>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Principle of least privilege applied</li>
                <li>API keys rotated every 90 days</li>
                <li>Service accounts have read-only access where possible</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold mb-2">3.3 Account Security</h3>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Failed login attempts: Account locked after 5 failed attempts</li>
              <li>Password reset: Secure email verification required</li>
              <li>Account deletion: Customer can request via alex@reconcilebookapp.com</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">4. Data Encryption and Security Measures</h2>
            
            <h3 className="text-xl font-semibold mb-2">4.1 Encryption Standards</h3>
            
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">Data at Rest:</h4>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Database: AES-256 encryption (Supabase PostgreSQL)</li>
                <li>Backups: AES-256 encrypted backups with separate keys</li>
                <li>API Keys: Encrypted in environment variables</li>
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">Data in Transit:</h4>
              <ul className="list-disc pl-6 text-gray-700">
                <li>TLS 1.3 for all API communications</li>
                <li>HTTPS enforced across all web properties</li>
                <li>Secure WebSocket connections (WSS)</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold mb-2">4.2 Infrastructure Security</h3>
            
            <h4 className="text-lg font-semibold mb-2">Hosting and Infrastructure:</h4>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">Service</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Purpose</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Security Certification</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Data Access</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Supabase</td>
                    <td className="border border-gray-300 px-4 py-2">Database & Auth</td>
                    <td className="border border-gray-300 px-4 py-2">SOC 2 Type II, ISO 27001</td>
                    <td className="border border-gray-300 px-4 py-2">Customer data, authentication</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Stripe</td>
                    <td className="border border-gray-300 px-4 py-2">Payment Processing</td>
                    <td className="border border-gray-300 px-4 py-2">PCI DSS Level 1</td>
                    <td className="border border-gray-300 px-4 py-2">Payment information only</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Vercel</td>
                    <td className="border border-gray-300 px-4 py-2">Hosting & CDN</td>
                    <td className="border border-gray-300 px-4 py-2">SOC 2 Type II, ISO 27001</td>
                    <td className="border border-gray-300 px-4 py-2">Application code, logs</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">TikTok Shop API</td>
                    <td className="border border-gray-300 px-4 py-2">Data Integration</td>
                    <td className="border border-gray-300 px-4 py-2">TikTok Security Standards</td>
                    <td className="border border-gray-300 px-4 py-2">OAuth tokens, shop data</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 className="text-lg font-semibold mb-2">Network Security:</h4>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Web Application Firewall (WAF) enabled</li>
              <li>DDoS protection through Vercel Edge</li>
              <li>IP rate limiting on API endpoints</li>
              <li>Automated security headers (CSP, HSTS, X-Frame-Options)</li>
            </ul>

            <h4 className="text-lg font-semibold mb-2">Application Security:</h4>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Input validation and sanitization on all endpoints</li>
              <li>SQL injection prevention (parameterized queries)</li>
              <li>XSS protection (Content Security Policy)</li>
              <li>CSRF tokens on all state-changing operations</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">5. Third-Party Service Providers</h2>
            
            <h3 className="text-xl font-semibold mb-2">5.1 Vetted Service Providers</h3>
            <p className="text-gray-700 mb-4">All vendors maintain SOC 2 Type II or equivalent certification with Data Processing Agreements (DPAs) in place.</p>
            
            <h3 className="text-xl font-semibold mb-2">5.2 Third-Party Requirements</h3>
            <ul className="list-disc pl-6 text-gray-700">
              <li>All vendors must maintain SOC 2 Type II or equivalent certification</li>
              <li>Data Processing Agreements (DPAs) in place with all processors</li>
              <li>Regular vendor security assessments conducted annually</li>
              <li>Vendor access is logged and monitored</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">6. Privacy and Compliance</h2>
            
            <h3 className="text-xl font-semibold mb-2">6.1 Regulatory Compliance</h3>
            
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">GDPR (General Data Protection Regulation):</h4>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Legal basis for processing: Contract performance, legitimate interest</li>
                <li>Data subject rights supported: Access, rectification, erasure, portability</li>
                <li>Data Protection Officer contact: alex@reconcilebookapp.com</li>
                <li>EU data residency available upon request</li>
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">CCPA (California Consumer Privacy Act):</h4>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Do Not Sell My Personal Information honored</li>
                <li>Consumer rights: Access, deletion, opt-out</li>
                <li>Privacy policy publicly available at reconcilebookapp.com/privacy</li>
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">SOC 2 Type II:</h4>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Annual third-party audits conducted</li>
                <li>Continuous monitoring of security controls</li>
                <li>Compliance reports available to enterprise customers</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold mb-2">6.2 Data Subject Rights</h3>
            <p className="text-gray-700 mb-2">Customers can exercise their rights by contacting alex@reconcilebookapp.com:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>Right to Access:</strong> Export all personal data within 30 days</li>
              <li><strong>Right to Rectification:</strong> Update account information anytime</li>
              <li><strong>Right to Erasure:</strong> Account deletion with 30-day retention for recovery</li>
              <li><strong>Right to Portability:</strong> JSON export of all data available</li>
              <li><strong>Right to Object:</strong> Opt-out of marketing communications</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">6.3 Privacy by Design</h3>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Data minimization: Only collect necessary information</li>
              <li>Purpose limitation: Data used only for stated purposes</li>
              <li>Storage limitation: Data deleted after retention period</li>
              <li>Transparency: Clear privacy policy and terms of service</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">7. Data Retention and Deletion</h2>
            
            <h3 className="text-xl font-semibold mb-2">7.1 Retention Periods</h3>
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
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Backup data</td>
                    <td className="border border-gray-300 px-4 py-2">30 days</td>
                    <td className="border border-gray-300 px-4 py-2">Disaster recovery</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Marketing emails</td>
                    <td className="border border-gray-300 px-4 py-2">Until opt-out</td>
                    <td className="border border-gray-300 px-4 py-2">Consent-based</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold mb-2">7.2 Secure Deletion Process</h3>
            <ol className="list-decimal pl-6 text-gray-700">
              <li>Customer requests deletion via dashboard or email</li>
              <li>Account marked for deletion with 30-day grace period</li>
              <li>After 30 days, secure deletion executed:
                <ul className="list-disc pl-6 mt-2">
                  <li>Database records permanently deleted</li>
                  <li>Backups purged within next 30 days</li>
                  <li>Third-party data deletion requests sent (TikTok, Stripe)</li>
                </ul>
              </li>
              <li>Deletion confirmation email sent to customer</li>
              <li>Audit log entry created (retained for 7 years per compliance)</li>
            </ol>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">8. Incident Response and Breach Notification</h2>
            
            <h3 className="text-xl font-semibold mb-2">8.1 Incident Response Plan</h3>
            
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">Detection:</h4>
              <ul className="list-disc pl-6 text-gray-700">
                <li>24/7 automated security monitoring</li>
                <li>Real-time alerts for suspicious activity</li>
                <li>Regular security log reviews</li>
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">Response Process:</h4>
              <ol className="list-decimal pl-6 text-gray-700">
                <li><strong>Identification</strong> (0-1 hour): Incident detected and categorized</li>
                <li><strong>Containment</strong> (1-4 hours): Isolate affected systems</li>
                <li><strong>Investigation</strong> (4-24 hours): Determine scope and impact</li>
                <li><strong>Remediation</strong> (24-72 hours): Fix vulnerability, restore services</li>
                <li><strong>Recovery</strong> (72+ hours): Return to normal operations</li>
                <li><strong>Post-Incident Review</strong> (Within 7 days): Document lessons learned</li>
              </ol>
            </div>

            <h3 className="text-xl font-semibold mb-2">8.2 Data Breach Notification</h3>
            
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">Customer Notification:</h4>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Notified within 72 hours of breach discovery</li>
                <li>Email to registered address with incident details</li>
                <li>Information provided: What happened, data affected, remediation steps</li>
                <li>Dedicated support line: alex@reconcilebookapp.com</li>
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">Regulatory Notification:</h4>
              <ul className="list-disc pl-6 text-gray-700">
                <li>GDPR: Supervisory authority notified within 72 hours</li>
                <li>CCPA: California Attorney General notified if required</li>
                <li>Other jurisdictions: Per applicable law</li>
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">Public Disclosure:</h4>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Public statement if breach affects &gt;500 customers</li>
                <li>Status page updates during active incidents</li>
                <li>Post-mortem published within 30 days</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">9. Employee and Contractor Security</h2>
            
            <h3 className="text-xl font-semibold mb-2">9.1 Security Training</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>Onboarding:</strong> Security training required for all new team members</li>
              <li><strong>Annual Training:</strong> Mandatory security awareness training</li>
              <li><strong>Topics Covered:</strong> Data classification, phishing, incident reporting, GDPR principles</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">9.2 Access Management</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>Principle of Least Privilege:</strong> Access granted based on job function only</li>
              <li><strong>Access Reviews:</strong> Quarterly review of all access permissions</li>
              <li><strong>Offboarding:</strong> Immediate access revocation upon termination</li>
              <li><strong>Audit Trails:</strong> All administrative actions logged</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">9.3 Confidentiality Agreements</h3>
            <ul className="list-disc pl-6 text-gray-700">
              <li>All employees sign confidentiality and non-disclosure agreements</li>
              <li>Contractors bound by data protection clauses in contracts</li>
              <li>Penalties for unauthorized disclosure clearly defined</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">10. Security Monitoring and Auditing</h2>
            
            <h3 className="text-xl font-semibold mb-2">10.1 Continuous Monitoring</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>Application Monitoring:</strong> Real-time error tracking and performance monitoring</li>
              <li><strong>Security Monitoring:</strong> Automated alerts for suspicious activity</li>
              <li><strong>Database Monitoring:</strong> Query performance and unusual access patterns</li>
              <li><strong>Infrastructure Monitoring:</strong> Server health, uptime, and DDoS attempts</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">10.2 Logging and Audit Trails</h3>
            
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">Logs Collected:</h4>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Authentication attempts (success and failure)</li>
                <li>API access and requests</li>
                <li>Administrative actions</li>
                <li>Data access and modifications</li>
                <li>System errors and exceptions</li>
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">Log Security:</h4>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Logs stored in separate, secured environment</li>
                <li>Tamper-proof logging with cryptographic signatures</li>
                <li>Retention: 90 days for operational logs, 7 years for audit logs</li>
                <li>Regular log reviews conducted weekly</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold mb-2">10.3 Security Assessments</h3>
            <ul className="list-disc pl-6 text-gray-700">
              <li><strong>Vulnerability Scanning:</strong> Automated weekly scans</li>
              <li><strong>Penetration Testing:</strong> Annual third-party penetration tests</li>
              <li><strong>Code Reviews:</strong> Security review for all code changes</li>
              <li><strong>Dependency Scanning:</strong> Automated scanning for vulnerable libraries</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">11. Business Continuity and Disaster Recovery</h2>
            
            <h3 className="text-xl font-semibold mb-2">11.1 Backup Strategy</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>Database Backups:</strong> Automated daily backups with 30-day retention</li>
              <li><strong>Application Backups:</strong> Infrastructure as Code (IaC) in version control</li>
              <li><strong>Geographic Redundancy:</strong> Backups stored in multiple regions</li>
              <li><strong>Backup Testing:</strong> Monthly restoration tests to verify integrity</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">11.2 Disaster Recovery Plan</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>Recovery Time Objective (RTO):</strong> 4 hours</li>
              <li><strong>Recovery Point Objective (RPO):</strong> 24 hours</li>
              <li><strong>Failover Strategy:</strong> Automated failover to secondary region</li>
              <li><strong>Communication Plan:</strong> Status page and email notifications to customers</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">11.3 Service Availability</h3>
            <ul className="list-disc pl-6 text-gray-700">
              <li><strong>Target Uptime:</strong> 99.9% availability</li>
              <li><strong>Maintenance Windows:</strong> Scheduled during off-peak hours with 48-hour notice</li>
              <li><strong>Status Monitoring:</strong> Public status page available</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">12. Secure Development Practices</h2>
            
            <h3 className="text-xl font-semibold mb-2">12.1 Development Security</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>Code Review:</strong> All code changes peer-reviewed before deployment</li>
              <li><strong>Version Control:</strong> Git with protected main branch</li>
              <li><strong>Secrets Management:</strong> No credentials in code; environment variables only</li>
              <li><strong>Dependency Management:</strong> Automated alerts for vulnerable dependencies</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">12.2 Deployment Security</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>CI/CD Pipeline:</strong> Automated testing and security checks</li>
              <li><strong>Staging Environment:</strong> All changes tested before production deployment</li>
              <li><strong>Rollback Capability:</strong> Instant rollback to previous version if needed</li>
              <li><strong>Change Management:</strong> All production changes documented and approved</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">12.3 API Security</h3>
            <ul className="list-disc pl-6 text-gray-700">
              <li><strong>Authentication:</strong> JWT tokens with expiration</li>
              <li><strong>Rate Limiting:</strong> 100 requests per minute per user</li>
              <li><strong>Input Validation:</strong> All inputs sanitized and validated</li>
              <li><strong>CORS Policy:</strong> Restricted to authorized domains only</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">13. Physical and Environmental Security</h2>
            
            <h3 className="text-xl font-semibold mb-2">13.1 Cloud Infrastructure Security</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>All infrastructure hosted in Tier III+ or equivalent data centers</li>
              <li>Physical security managed by cloud providers (Supabase, Vercel)</li>
              <li>24/7 security personnel and surveillance</li>
              <li>Biometric access controls</li>
              <li>Environmental controls (fire suppression, climate control, power redundancy)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">13.2 Office Security</h3>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Secure disposal of physical documents (shredding)</li>
              <li>Clean desk policy for sensitive information</li>
              <li>Visitor access logs maintained</li>
              <li>Device encryption required for all laptops</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">14. Policy Management and Updates</h2>
            
            <h3 className="text-xl font-semibold mb-2">14.1 Policy Review</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>Review Frequency:</strong> Annually or after significant security events</li>
              <li><strong>Approval Authority:</strong> Security Officer and Legal Team</li>
              <li><strong>Communication:</strong> All changes communicated to team and customers</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">14.2 Policy Violations</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>Reporting:</strong> Violations reported to alex@reconcilebookapp.com</li>
              <li><strong>Investigation:</strong> All reports investigated within 24 hours</li>
              <li><strong>Consequences:</strong> Disciplinary action up to and including termination</li>
              <li><strong>Remediation:</strong> Corrective actions implemented to prevent recurrence</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">14.3 Continuous Improvement</h3>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Regular review of security incidents and near-misses</li>
              <li>Implementation of lessons learned</li>
              <li>Adoption of industry best practices</li>
              <li>Participation in security community and threat intelligence sharing</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">15. Contact Information</h2>
            
            <h3 className="text-xl font-semibold mb-2">15.1 Security Contacts</h3>
            <div className="bg-gray-50 p-6 rounded-lg mb-4">
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
                <span className="text-sm">(24-48 hour response time)</span>
              </p>
              <p className="text-gray-700">
                <strong>Privacy Requests:</strong><br />
                alex@reconcilebookapp.com
              </p>
            </div>

            <h3 className="text-xl font-semibold mb-2">15.2 Customer Support</h3>
            <ul className="list-disc pl-6 text-gray-700">
              <li><strong>Support Email:</strong> alex@reconcilebookapp.com</li>
              <li><strong>Privacy Policy:</strong> https://reconcilebookapp.com/privacy</li>
              <li><strong>Terms of Service:</strong> https://reconcilebookapp.com/terms</li>
              <li><strong>Security Page:</strong> https://reconcilebookapp.com/security</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">16. Compliance Attestation</h2>
            <p className="text-gray-700 mb-4">ReconcileBook commits to:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Maintaining this Information Security Policy as a living document</li>
              <li>Regular security audits and assessments</li>
              <li>Prompt notification of security incidents</li>
              <li>Continuous improvement of security practices</li>
              <li>Transparency with customers about our security measures</li>
            </ul>
            <p className="text-gray-700 font-semibold">
              This policy demonstrates our commitment to protecting customer data and maintaining the highest standards of information security.
            </p>
          </section>

          <div className="border-t pt-8 mt-12 text-sm text-gray-600">
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-2">Document Control:</h3>
              <p className="mb-1"><strong>Version:</strong> 1.0</p>
              <p className="mb-1"><strong>Classification:</strong> Public</p>
              <p className="mb-1"><strong>Next Review Date:</strong> December 8, 2025</p>
              <p className="mb-1"><strong>Approved By:</strong> ReconcileBook Management</p>
              <p className="mb-1"><strong>Contact:</strong> alex@reconcilebookapp.com</p>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-2">Certifications and Compliance:</h3>
              <ul className="list-disc pl-6">
                <li>Infrastructure partners: SOC 2 Type II, ISO 27001 certified</li>
                <li>Payment processing: PCI DSS Level 1 compliant (via Stripe)</li>
                <li>Privacy: GDPR and CCPA compliant</li>
                <li>Regular third-party security assessments conducted</li>
              </ul>
            </div>

            <p className="mt-6 text-xs">
              © 2024 ReconcileBook. All rights reserved.<br />
              This document is confidential and proprietary to ReconcileBook.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
