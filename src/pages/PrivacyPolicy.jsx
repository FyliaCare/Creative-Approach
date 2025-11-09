import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, AlertCircle, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';

export const PrivacyPolicy = () => {
  const lastUpdated = "November 9, 2025";

  const sections = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "1. Introduction",
      content: `Creative Approach ("we," "us," "our," or "the Company") is committed to protecting your privacy and personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or engage with our drone operations.

This policy complies with:
• Ghana Data Protection Act, 2012 (Act 843)
• Data Protection Commission (Ghana) Regulations
• General Data Protection Regulation (GDPR) principles
• International Civil Aviation Organization (ICAO) standards
• Ghana Civil Aviation Authority (GCAA) regulations

By using our services, you consent to the data practices described in this policy.`
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "2. Information We Collect",
      content: `**2.1 Personal Information**
We may collect the following personal information:
• Full name and business name
• Email address and phone number
• Physical address and billing address
• Government-issued identification (for regulatory compliance)
• Payment information (processed securely by third-party payment processors)
• Project location coordinates and site details
• Communication preferences

**2.2 Drone Operation Data**
• Flight logs and telemetry data
• Aerial photographs and videos captured during services
• GPS coordinates of flight operations
• Weather conditions during flights
• Drone equipment specifications

**2.3 Technical Information**
• IP address and device information
• Browser type and version
• Operating system
• Website usage data (cookies, analytics)
• Pages visited and time spent
• Referral sources

**2.4 Business Information**
• Company registration details
• Tax identification numbers
• Project specifications and requirements
• Contract documents
• Communication records`
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "3. How We Use Your Information",
      content: `We use collected information for the following purposes:

**3.1 Service Delivery**
• Processing and fulfilling service requests
• Planning and executing drone operations
• Delivering aerial photography, videography, inspection, and mapping services
• Communicating project updates and deliverables
• Providing customer support

**3.2 Legal Compliance**
• Complying with Ghana Civil Aviation Authority (GCAA) requirements
• Maintaining flight logs as required by law
• Responding to legal requests and preventing fraud
• Ensuring aviation safety and security

**3.3 Business Operations**
• Processing payments and managing accounts
• Sending invoices and receipts
• Managing contracts and agreements
• Maintaining business records

**3.4 Marketing and Communications**
• Sending newsletters and promotional materials (with consent)
• Sharing portfolio updates and case studies
• Conducting customer satisfaction surveys
• Providing industry news and updates

**3.5 Website Improvement**
• Analyzing website usage and performance
• Improving user experience
• Developing new features and services
• Troubleshooting technical issues`
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "4. Data Protection and Security",
      content: `**4.1 Security Measures**
We implement industry-standard security measures to protect your data:
• SSL/TLS encryption for data transmission
• Secure cloud storage with encryption at rest
• Access controls and authentication mechanisms
• Regular security audits and updates
• Employee confidentiality agreements
• Secure backup systems

**4.2 Aerial Footage Security**
• Raw footage stored on encrypted drives
• Access limited to authorized personnel only
• Client-specific folders with password protection
• Secure file transfer protocols for deliverables
• Deletion of raw footage after project completion (unless otherwise agreed)

**4.3 Data Retention**
• Personal data: Retained for duration of business relationship plus 7 years (as required by Ghanaian tax law)
• Flight logs: Retained for 5 years (GCAA requirement)
• Aerial footage: Retained as per contract terms (typically 30-90 days post-delivery)
• Financial records: Retained for 7 years (Companies Act, 2019)
• Marketing data: Retained until consent is withdrawn

**4.4 Data Breach Protocol**
In the event of a data breach, we will:
• Notify affected individuals within 72 hours
• Report to the Data Protection Commission (Ghana)
• Take immediate remedial action
• Conduct thorough investigation
• Implement additional security measures`
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "5. Your Rights Under Ghana Data Protection Act",
      content: `You have the following rights regarding your personal data:

**5.1 Right to Access**
• Request copies of your personal data
• Receive information about data processing
• Obtain data in accessible format

**5.2 Right to Rectification**
• Correct inaccurate personal data
• Complete incomplete information
• Update outdated records

**5.3 Right to Erasure ("Right to be Forgotten")**
• Request deletion of personal data
• Withdraw consent for data processing
• Object to continued processing

**5.4 Right to Restriction**
• Limit how we use your data
• Request temporary halt of processing
• Block certain uses of information

**5.5 Right to Data Portability**
• Receive personal data in structured format
• Transfer data to another service provider
• Request data export

**5.6 Right to Object**
• Object to data processing for marketing
• Opt-out of automated decision-making
• Refuse profiling activities

**5.7 Right to Withdraw Consent**
• Withdraw consent at any time
• Unsubscribe from communications
• Request account closure

To exercise these rights, contact: privacy@creativeapproach.com.gh`
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "6. Aerial Footage and Image Rights",
      content: `**6.1 Client Ownership**
• Clients own final edited deliverables upon full payment
• Raw footage remains property of Creative Approach
• Usage rights specified in service agreement
• Commercial use rights transferable upon agreement

**6.2 Portfolio Usage**
We may use aerial footage for:
• Company portfolio and marketing materials
• Social media and website galleries
• Industry awards and competitions
• Training and educational purposes

Clients may request exclusion from portfolio by notifying us in writing.

**6.3 Privacy Considerations**
• We respect privacy of individuals captured in aerial footage
• Blurring of identifiable persons available upon request
• No surveillance or intrusive filming without consent
• Compliance with privacy laws in all operations

**6.4 Third-Party Property**
• Permission obtained for filming private property
• Respect for neighboring property rights
• No-fly zones strictly observed
• Security-sensitive areas avoided`
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "7. Cookies and Tracking Technologies",
      content: `**7.1 Types of Cookies We Use**
• **Essential Cookies**: Required for website functionality
• **Analytics Cookies**: Track website usage and performance (Google Analytics)
• **Marketing Cookies**: Personalize advertisements and content
• **Preference Cookies**: Remember your settings and choices

**7.2 Third-Party Services**
We use the following third-party services that may collect data:
• Google Analytics (website analytics)
• Google Maps (location services)
• Payment processors (Stripe, Paystack)
• Email service providers (for newsletters)
• Cloud storage providers (AWS, Google Cloud)

**7.3 Cookie Management**
You can control cookies through:
• Browser settings (accept/reject/delete)
• Opt-out links in cookie banner
• Privacy preference center
• Third-party opt-out tools

Disabling cookies may affect website functionality.`
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "8. Data Sharing and Disclosure",
      content: `**8.1 We Do NOT Sell Your Data**
Creative Approach does not sell, rent, or trade personal information to third parties.

**8.2 Authorized Sharing**
We may share data with:
• **Service Providers**: Payment processors, cloud storage, email services
• **Legal Authorities**: When required by Ghanaian law or court order
• **Aviation Authorities**: GCAA compliance and safety reporting
• **Professional Advisors**: Lawyers, accountants (under confidentiality)
• **Business Partners**: With explicit consent for joint projects

**8.3 International Transfers**
• Data stored primarily in Ghana or EU-compliant data centers
• International transfers comply with GDPR adequacy standards
• Standard contractual clauses used where applicable
• Client notification for cross-border transfers

**8.4 Business Transfers**
In the event of merger, acquisition, or sale:
• Data may be transferred to new entity
• Clients notified of ownership change
• Privacy policy remains binding
• Opt-out option provided`
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "9. Children's Privacy",
      content: `Our services are not directed to individuals under 18 years of age.

• We do not knowingly collect data from children
• Parental consent required for minors in footage
• Immediate deletion upon discovery of child data
• Schools and youth organizations require guardian authorization
• Special protocols for educational projects involving minors

If you believe we have collected data from a child, contact us immediately.`
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "10. Changes to Privacy Policy",
      content: `**10.1 Policy Updates**
• We may update this policy to reflect legal changes or operational needs
• Material changes notified via email or website banner
• Continued use constitutes acceptance of updated policy
• Previous versions archived for reference

**10.2 Notification Process**
• Email notification to registered users
• Website banner for 30 days
• Updated "Last Modified" date
• Summary of key changes provided

**10.3 Review Schedule**
This policy is reviewed annually or as needed for compliance.`
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "11. Contact Information",
      content: `**Data Protection Officer**
Creative Approach Ghana Limited

**Email**: privacy@creativeapproach.com.gh
**Phone**: +233 (0) XX XXX XXXX
**Address**: [Your Business Address], Accra, Ghana

**Data Protection Commission (Ghana)**
For complaints or concerns:
**Website**: www.dataprotection.org.gh
**Email**: info@dataprotection.org.gh
**Phone**: +233 (0)302 971 245

**Response Time**
We aim to respond to all privacy inquiries within 10 business days.

**Complaints Process**
1. Contact our Data Protection Officer
2. Escalate to management if unresolved
3. File complaint with Data Protection Commission
4. Seek legal recourse if necessary`
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "12. Consent and Acceptance",
      content: `By using Creative Approach's services, you acknowledge that:

• You have read and understood this Privacy Policy
• You consent to collection and processing of your data as described
• You understand your rights under Ghana Data Protection Act, 2012
• You agree to receive necessary communications related to services
• You may withdraw consent at any time

**For Marketing Communications:**
• Opt-in required for newsletters and promotions
• Unsubscribe link provided in all emails
• No penalty for declining marketing communications
• Service-related communications continue regardless of marketing preferences

**Last Updated**: ${lastUpdated}

This Privacy Policy is effective as of the date stated above and governs our data practices from that date forward.`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Shield className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-blue-100">
              Your privacy is our priority. We are committed to protecting your personal information.
            </p>
            <p className="text-sm text-blue-200 mt-4">
              Last Updated: {lastUpdated}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Key Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Key Privacy Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-900">We don't sell your data</p>
                <p className="text-sm text-gray-600">Your information is never sold to third parties</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-900">Ghana Law Compliant</p>
                <p className="text-sm text-gray-600">Follows Data Protection Act, 2012 (Act 843)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-900">Your Rights Protected</p>
                <p className="text-sm text-gray-600">Access, correct, or delete your data anytime</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-900">Secure Storage</p>
                <p className="text-sm text-gray-600">Encrypted data with industry-standard security</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Sections */}
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-12"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                {section.icon}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 mt-16"
        >
          <h2 className="text-2xl font-bold mb-4">Questions About Your Privacy?</h2>
          <p className="text-blue-100 mb-6">
            If you have any questions or concerns about how we handle your data, please don't hesitate to contact us.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5" />
              <div>
                <p className="text-sm text-blue-200">Email</p>
                <p className="font-semibold">privacy@creativeapproach.com.gh</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5" />
              <div>
                <p className="text-sm text-blue-200">Phone</p>
                <p className="font-semibold">+233 (0) XX XXX XXXX</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5" />
              <div>
                <p className="text-sm text-blue-200">Location</p>
                <p className="font-semibold">Accra, Ghana</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Download Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-12"
        >
          <button className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
            Download Privacy Policy (PDF)
          </button>
        </motion.div>
      </div>
    </div>
  );
};
