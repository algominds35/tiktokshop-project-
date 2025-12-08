# ReconcileBook - Company Information Security Policy

**Document Version:** 1.0  
**Effective Date:** December 8, 2024  
**Last Updated:** December 8, 2024  
**Owner:** ReconcileBook Security Team  
**Contact:** alex@reconcilebookapp.com

---

## 1. Purpose and Scope

This Information Security Policy establishes the framework for protecting all information assets of ReconcileBook and our customers' data. This policy applies to all systems, applications, data, employees, contractors, and third-party services that process or store ReconcileBook data.

### 1.1 Objectives
- Protect customer data and personal information from unauthorized access
- Ensure confidentiality, integrity, and availability of all data
- Comply with applicable data protection regulations (GDPR, CCPA, SOC 2)
- Maintain customer trust through transparent security practices

---

## 2. Data Classification and Handling

### 2.1 Data Classification Levels

**HIGHLY CONFIDENTIAL**
- Customer authentication credentials (passwords, API keys)
- Payment information (processed via Stripe - PCI DSS compliant)
- TikTok Shop OAuth tokens and refresh tokens
- Personally Identifiable Information (PII)

**CONFIDENTIAL**
- Customer business data (sales, profit, fees)
- User account information (email, business name)
- Transaction records and financial analytics
- TikTok Shop order and product data

**INTERNAL**
- Application logs (sanitized - no PII)
- System configuration (non-sensitive)
- Aggregated analytics (anonymized)

**PUBLIC**
- Marketing materials
- Product documentation
- Public website content

### 2.2 Data Handling Requirements

| Classification | Encryption | Access Control | Retention | Disposal |
|----------------|-----------|----------------|-----------|----------|
| Highly Confidential | AES-256 at rest, TLS 1.3 in transit | Role-based, MFA required | As legally required | Secure deletion + audit trail |
| Confidential | AES-256 at rest, TLS 1.3 in transit | Role-based access | Active subscription + 30 days | Secure deletion |
| Internal | TLS 1.3 in transit | Authenticated users only | 90 days | Standard deletion |
| Public | TLS 1.3 in transit | Public access | Indefinite | Standard deletion |

---

## 3. Access Control and Authentication

### 3.1 User Access Management
- **Multi-Factor Authentication (MFA):** Required for all administrative access
- **Password Requirements:** Minimum 8 characters, enforced by Supabase Auth
- **Session Management:** 
  - Sessions expire after 14 days of inactivity
  - Secure JWT tokens with rotation
  - HttpOnly, Secure cookies to prevent XSS attacks

### 3.2 Role-Based Access Control (RBAC)

**Customer Users**
- Access only to their own business data
- Cannot view other customers' information
- Full CRUD operations on their own data

**System Administrators**
- Database access for maintenance only
- All actions logged and auditable
- Emergency access only with approval
- No access to customer passwords (hashed by Supabase)

**Third-Party Services**
- Principle of least privilege applied
- API keys rotated every 90 days
- Service accounts have read-only access where possible

### 3.3 Account Security
- Failed login attempts: Account locked after 5 failed attempts
- Password reset: Secure email verification required
- Account deletion: Customer can request via alex@reconcilebookapp.com

---

## 4. Data Encryption and Security Measures

### 4.1 Encryption Standards

**Data at Rest:**
- Database: AES-256 encryption (Supabase PostgreSQL)
- Backups: AES-256 encrypted backups with separate keys
- API Keys: Encrypted in environment variables

**Data in Transit:**
- TLS 1.3 for all API communications
- HTTPS enforced across all web properties
- Secure WebSocket connections (WSS)

### 4.2 Infrastructure Security

**Hosting and Infrastructure:**
- **Application:** Vercel (ISO 27001, SOC 2 Type II certified)
- **Database:** Supabase (ISO 27001, SOC 2 Type II certified)
- **Payments:** Stripe (PCI DSS Level 1 certified)
- **CDN:** Vercel Edge Network with DDoS protection

**Network Security:**
- Web Application Firewall (WAF) enabled
- DDoS protection through Vercel Edge
- IP rate limiting on API endpoints
- Automated security headers (CSP, HSTS, X-Frame-Options)

**Application Security:**
- Input validation and sanitization on all endpoints
- SQL injection prevention (parameterized queries)
- XSS protection (Content Security Policy)
- CSRF tokens on all state-changing operations

---

## 5. Third-Party Service Providers

### 5.1 Vetted Service Providers

| Service | Purpose | Security Certification | Data Access |
|---------|---------|----------------------|-------------|
| Supabase | Database & Auth | SOC 2 Type II, ISO 27001 | Customer data, authentication |
| Stripe | Payment Processing | PCI DSS Level 1 | Payment information only |
| Vercel | Hosting & CDN | SOC 2 Type II, ISO 27001 | Application code, logs |
| TikTok Shop API | Data Integration | TikTok Security Standards | OAuth tokens, shop data |

### 5.2 Third-Party Requirements
- All vendors must maintain SOC 2 Type II or equivalent certification
- Data Processing Agreements (DPAs) in place with all processors
- Regular vendor security assessments conducted annually
- Vendor access is logged and monitored

---

## 6. Privacy and Compliance

### 6.1 Regulatory Compliance

**GDPR (General Data Protection Regulation):**
- Legal basis for processing: Contract performance, legitimate interest
- Data subject rights supported: Access, rectification, erasure, portability
- Data Protection Officer contact: alex@reconcilebookapp.com
- EU data residency available upon request

**CCPA (California Consumer Privacy Act):**
- Do Not Sell My Personal Information honored
- Consumer rights: Access, deletion, opt-out
- Privacy policy publicly available at reconcilebookapp.com/privacy

**SOC 2 Type II:**
- Annual third-party audits conducted
- Continuous monitoring of security controls
- Compliance reports available to enterprise customers

### 6.2 Data Subject Rights
Customers can exercise their rights by contacting alex@reconcilebookapp.com:
- **Right to Access:** Export all personal data within 30 days
- **Right to Rectification:** Update account information anytime
- **Right to Erasure:** Account deletion with 30-day retention for recovery
- **Right to Portability:** JSON export of all data available
- **Right to Object:** Opt-out of marketing communications

### 6.3 Privacy by Design
- Data minimization: Only collect necessary information
- Purpose limitation: Data used only for stated purposes
- Storage limitation: Data deleted after retention period
- Transparency: Clear privacy policy and terms of service

---

## 7. Data Retention and Deletion

### 7.1 Retention Periods

| Data Type | Retention Period | Justification |
|-----------|-----------------|---------------|
| Active customer data | Duration of subscription | Service delivery |
| Deleted account data | 30 days | Recovery window |
| Transaction logs | 7 years | Legal/tax requirements |
| Application logs | 90 days | Security monitoring |
| Backup data | 30 days | Disaster recovery |
| Marketing emails | Until opt-out | Consent-based |

### 7.2 Secure Deletion Process
1. Customer requests deletion via dashboard or email
2. Account marked for deletion with 30-day grace period
3. After 30 days, secure deletion executed:
   - Database records permanently deleted
   - Backups purged within next 30 days
   - Third-party data deletion requests sent (TikTok, Stripe)
4. Deletion confirmation email sent to customer
5. Audit log entry created (retained for 7 years per compliance)

---

## 8. Incident Response and Breach Notification

### 8.1 Incident Response Plan

**Detection:**
- 24/7 automated security monitoring
- Real-time alerts for suspicious activity
- Regular security log reviews

**Response Process:**
1. **Identification** (0-1 hour): Incident detected and categorized
2. **Containment** (1-4 hours): Isolate affected systems
3. **Investigation** (4-24 hours): Determine scope and impact
4. **Remediation** (24-72 hours): Fix vulnerability, restore services
5. **Recovery** (72+ hours): Return to normal operations
6. **Post-Incident Review** (Within 7 days): Document lessons learned

### 8.2 Data Breach Notification

**Customer Notification:**
- Notified within 72 hours of breach discovery
- Email to registered address with incident details
- Information provided: What happened, data affected, remediation steps
- Dedicated support line: alex@reconcilebookapp.com

**Regulatory Notification:**
- GDPR: Supervisory authority notified within 72 hours
- CCPA: California Attorney General notified if required
- Other jurisdictions: Per applicable law

**Public Disclosure:**
- Public statement if breach affects >500 customers
- Status page updates during active incidents
- Post-mortem published within 30 days

---

## 9. Employee and Contractor Security

### 9.1 Security Training
- **Onboarding:** Security training required for all new team members
- **Annual Training:** Mandatory security awareness training
- **Topics Covered:**
  - Data classification and handling
  - Phishing and social engineering
  - Incident reporting procedures
  - GDPR and privacy principles

### 9.2 Access Management
- **Principle of Least Privilege:** Access granted based on job function only
- **Access Reviews:** Quarterly review of all access permissions
- **Offboarding:** Immediate access revocation upon termination
- **Audit Trails:** All administrative actions logged

### 9.3 Confidentiality Agreements
- All employees sign confidentiality and non-disclosure agreements
- Contractors bound by data protection clauses in contracts
- Penalties for unauthorized disclosure clearly defined

---

## 10. Security Monitoring and Auditing

### 10.1 Continuous Monitoring
- **Application Monitoring:** Real-time error tracking and performance monitoring
- **Security Monitoring:** Automated alerts for suspicious activity
- **Database Monitoring:** Query performance and unusual access patterns
- **Infrastructure Monitoring:** Server health, uptime, and DDoS attempts

### 10.2 Logging and Audit Trails
**Logs Collected:**
- Authentication attempts (success and failure)
- API access and requests
- Administrative actions
- Data access and modifications
- System errors and exceptions

**Log Security:**
- Logs stored in separate, secured environment
- Tamper-proof logging with cryptographic signatures
- Retention: 90 days for operational logs, 7 years for audit logs
- Regular log reviews conducted weekly

### 10.3 Security Assessments
- **Vulnerability Scanning:** Automated weekly scans
- **Penetration Testing:** Annual third-party penetration tests
- **Code Reviews:** Security review for all code changes
- **Dependency Scanning:** Automated scanning for vulnerable libraries

---

## 11. Business Continuity and Disaster Recovery

### 11.1 Backup Strategy
- **Database Backups:** Automated daily backups with 30-day retention
- **Application Backups:** Infrastructure as Code (IaC) in version control
- **Geographic Redundancy:** Backups stored in multiple regions
- **Backup Testing:** Monthly restoration tests to verify integrity

### 11.2 Disaster Recovery Plan
- **Recovery Time Objective (RTO):** 4 hours
- **Recovery Point Objective (RPO):** 24 hours
- **Failover Strategy:** Automated failover to secondary region
- **Communication Plan:** Status page and email notifications to customers

### 11.3 Service Availability
- **Target Uptime:** 99.9% availability
- **Maintenance Windows:** Scheduled during off-peak hours with 48-hour notice
- **Status Monitoring:** Public status page at status.reconcilebookapp.com (if applicable)

---

## 12. Secure Development Practices

### 12.1 Development Security
- **Code Review:** All code changes peer-reviewed before deployment
- **Version Control:** Git with protected main branch
- **Secrets Management:** No credentials in code; environment variables only
- **Dependency Management:** Automated alerts for vulnerable dependencies

### 12.2 Deployment Security
- **CI/CD Pipeline:** Automated testing and security checks
- **Staging Environment:** All changes tested before production deployment
- **Rollback Capability:** Instant rollback to previous version if needed
- **Change Management:** All production changes documented and approved

### 12.3 API Security
- **Authentication:** JWT tokens with expiration
- **Rate Limiting:** 100 requests per minute per user
- **Input Validation:** All inputs sanitized and validated
- **CORS Policy:** Restricted to authorized domains only

---

## 13. Physical and Environmental Security

### 13.1 Cloud Infrastructure Security
- All infrastructure hosted in Tier III+ or equivalent data centers
- Physical security managed by cloud providers (Supabase, Vercel)
- 24/7 security personnel and surveillance
- Biometric access controls
- Environmental controls (fire suppression, climate control, power redundancy)

### 13.2 Office Security (if applicable)
- Secure disposal of physical documents (shredding)
- Clean desk policy for sensitive information
- Visitor access logs maintained
- Device encryption required for all laptops

---

## 14. Policy Management and Updates

### 14.1 Policy Review
- **Review Frequency:** Annually or after significant security events
- **Approval Authority:** Security Officer and Legal Team
- **Communication:** All changes communicated to team and customers

### 14.2 Policy Violations
- **Reporting:** Violations reported to alex@reconcilebookapp.com
- **Investigation:** All reports investigated within 24 hours
- **Consequences:** Disciplinary action up to and including termination
- **Remediation:** Corrective actions implemented to prevent recurrence

### 14.3 Continuous Improvement
- Regular review of security incidents and near-misses
- Implementation of lessons learned
- Adoption of industry best practices
- Participation in security community and threat intelligence sharing

---

## 15. Contact Information

### 15.1 Security Contacts
- **General Security Inquiries:** alex@reconcilebookapp.com
- **Data Protection Officer:** alex@reconcilebookapp.com
- **Security Incident Reporting:** alex@reconcilebookapp.com (24-48 hour response time)
- **Privacy Requests:** alex@reconcilebookapp.com

### 15.2 Customer Support
- **Support Email:** alex@reconcilebookapp.com
- **Privacy Policy:** https://reconcilebookapp.com/privacy
- **Terms of Service:** https://reconcilebookapp.com/terms
- **Security Page:** https://reconcilebookapp.com/security

---

## 16. Compliance Attestation

ReconcileBook commits to:
- Maintaining this Information Security Policy as a living document
- Regular security audits and assessments
- Prompt notification of security incidents
- Continuous improvement of security practices
- Transparency with customers about our security measures

**This policy demonstrates our commitment to protecting customer data and maintaining the highest standards of information security.**

---

**Document Control:**
- Version: 1.0
- Classification: Public
- Next Review Date: December 8, 2025
- Approved By: ReconcileBook Management
- Contact: alex@reconcilebookapp.com

**Certifications and Compliance:**
- Infrastructure partners: SOC 2 Type II, ISO 27001 certified
- Payment processing: PCI DSS Level 1 compliant (via Stripe)
- Privacy: GDPR and CCPA compliant
- Regular third-party security assessments conducted

---

*© 2024 ReconcileBook. All rights reserved.*
*This document is confidential and proprietary to ReconcileBook.*

