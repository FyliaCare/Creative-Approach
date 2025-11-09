import { motion } from 'framer-motion';
import { Scale, FileText, AlertTriangle, CheckCircle, Shield, Plane, Camera, DollarSign, Clock, Users, Ban } from 'lucide-react';

export const TermsOfService = () => {
  const lastUpdated = "November 9, 2025";

  const sections = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "1. Agreement to Terms",
      content: `These Terms of Service ("Terms") constitute a legally binding agreement between you ("Client," "you," or "your") and Creative Approach Ghana Limited ("Creative Approach," "we," "us," or "our"), a company registered in Ghana.

**By engaging our services, you agree to:**
• These Terms of Service
• Our Privacy Policy
• All applicable laws and regulations of Ghana
• Ghana Civil Aviation Authority (GCAA) regulations
• International Civil Aviation Organization (ICAO) standards

**Governing Law:**
These Terms are governed by the laws of the Republic of Ghana. Any disputes shall be resolved in accordance with Ghanaian law and subject to the exclusive jurisdiction of the courts of Ghana.

**Business Registration:**
Creative Approach Ghana Limited
Company Registration Number: [Your Company Registration Number]
Registered Office: [Your Business Address], Accra, Ghana
Ghana Revenue Authority TIN: [Your TIN]

If you do not agree to these Terms, do not use our services.`
    },
    {
      icon: <Plane className="w-6 h-6" />,
      title: "2. Services Offered",
      content: `**2.1 Drone Services**
Creative Approach provides professional unmanned aerial vehicle (UAV/drone) services including:

• **Aerial Photography**: High-resolution still images from aerial perspectives
• **Aerial Videography**: Professional video capture including cinematic footage, 4K/HD video
• **Drone Inspection**: Visual and thermal inspections of structures, infrastructure, and facilities
• **Surveying and Mapping**: Topographic surveys, orthomosaic maps, 3D modeling, LiDAR scanning
• **Real Estate Photography**: Property marketing, aerial tours, development documentation
• **Construction Monitoring**: Progress documentation, site surveys, project management support
• **Event Coverage**: Weddings, corporate events, festivals, sports events
• **Agricultural Services**: Crop monitoring, precision agriculture, land assessment
• **Documentary and Film Production**: Cinematic aerial footage for films, commercials, documentaries

**2.2 Additional Services**
• Post-production editing and enhancement
• Photo and video retouching
• 3D modeling and rendering
• Data analysis and reporting
• Consultation services
• Training and workshops

**2.3 Service Customization**
All services can be customized to meet specific client requirements. Custom packages available upon request.

**2.4 Service Limitations**
We reserve the right to refuse service for:
• Illegal activities or surveillance
• Unsafe flight conditions
• Restricted or no-fly zones
• Projects that violate privacy or ethical standards
• Inadequate notice or preparation time`
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "3. Legal Compliance and Licensing",
      content: `**3.1 GCAA Compliance**
Creative Approach operates under full compliance with:
• Ghana Civil Aviation Authority (GCAA) regulations
• Remote Piloted Aircraft Systems (RPAS) rules
• Aviation Act, 2020 (Act 1042)
• Civil Aviation (Unmanned Aircraft Systems) Regulations

**3.2 Our Licenses and Certifications**
• GCAA Remote Pilot License (RPL)
• GCAA Operator Certificate (AOC for drones)
• Insurance coverage (Third-party liability and hull insurance)
• Equipment certifications and airworthiness certificates
• Radio frequency licenses (where applicable)

**3.3 Flight Authorization**
• We obtain all necessary flight authorizations before operations
• Compliance with airspace restrictions and no-fly zones
• Coordination with air traffic control when required
• Respect for security-sensitive areas

**3.4 Client Responsibilities**
Clients must:
• Provide accurate project location information
• Disclose any known restrictions or hazards
• Obtain necessary permissions for private property access
• Notify relevant parties of drone operations
• Comply with all applicable laws and regulations

**3.5 Restricted Operations**
We do NOT conduct:
• Surveillance or stalking activities
• Operations near airports without authorization
• Flights over crowds without special permits
• Night operations without proper lighting and authorization
• Beyond Visual Line of Sight (BVLOS) without waiver
• Operations in restricted military or government zones`
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "4. Pricing, Payment, and Refunds",
      content: `**4.1 Quotations**
• All prices quoted are in Ghana Cedis (GHS) unless otherwise stated
• Quotations valid for 30 days from issuance date
• Custom pricing based on project scope, duration, and complexity
• Additional charges may apply for expedited services

**4.2 Payment Terms**
• **Deposit**: 50% deposit required to confirm booking
• **Balance**: Remaining 50% due upon project completion and before final delivery
• **Corporate Clients**: Net 30 payment terms available upon credit approval
• **Large Projects**: Milestone-based payment schedule available

**4.3 Accepted Payment Methods**
• Bank transfer (preferred)
• Mobile money (MTN, Vodafone, AirtelTigo)
• Credit/Debit cards (Visa, Mastercard)
• Cash (for amounts below GHS 10,000)
• Checks (corporate clients only, subject to clearance)

**4.4 Late Payments**
• Overdue invoices subject to 2% monthly interest charge
• Deliverables withheld until full payment received
• Legal action may be pursued for significantly overdue accounts
• Client responsible for all collection costs

**4.5 Additional Costs**
Client responsible for:
• Travel expenses for locations beyond 50km from Accra
• Accommodation for multi-day projects
• Special permits or authorization fees
• Equipment rentals for specialized requirements
• Security personnel if required by location

**4.6 Cancellation and Refunds**
• **More than 7 days notice**: Full refund minus 10% administrative fee
• **3-7 days notice**: 50% refund
• **Less than 3 days notice**: Deposit forfeited
• **Weather cancellations**: Full rescheduling at no additional cost
• **Client cancellation after work commenced**: No refund, full payment due

**4.7 Price Changes**
• We reserve the right to adjust prices with 30 days notice
• Confirmed bookings honored at original quoted price
• Annual price reviews for recurring clients

**4.8 Taxes**
All prices exclude:
• Value Added Tax (VAT) - 15% (if applicable)
• Withholding tax (if applicable)
• Other applicable taxes per Ghana Revenue Authority regulations`
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "5. Booking and Scheduling",
      content: `**5.1 Booking Process**
1. Submit project inquiry via website, email, or phone
2. Receive detailed quotation and scope of work
3. Review and accept quotation
4. Pay 50% deposit to confirm booking
5. Receive booking confirmation with scheduled date

**5.2 Lead Time**
• **Standard Projects**: Minimum 7 days notice preferred
• **Simple Projects**: 3 days minimum notice
• **Complex Projects**: 14+ days notice required
• **Rush Services**: Available with 50% surcharge (subject to availability)

**5.3 Rescheduling**
• **Client-initiated**: One free reschedule with 48 hours notice; subsequent changes subject to GHS 500 fee
• **Weather-related**: Unlimited free rescheduling
• **Equipment issues**: Free rescheduling with alternative compensation
• **Emergency reschedules**: Mutual agreement required

**5.4 Weather Conditions**
• Flights cancelled for unsafe weather (high winds, rain, poor visibility)
• Pilot has final say on weather safety
• No charge for weather-related cancellations
• Rescheduling prioritized for weather-cancelled flights

**5.5 Project Duration**
• Estimated timelines provided in quotation
• Actual duration may vary based on conditions
• Extended hours subject to additional charges
• Multi-day projects scheduled with buffer days

**5.6 Deliverable Timelines**
• **Raw Footage**: 24-48 hours after flight
• **Edited Photos**: 3-5 business days
• **Edited Videos**: 7-14 business days
• **Survey Reports**: 10-20 business days
• **3D Models**: 14-30 business days
• Rush delivery available with additional fee`
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: "6. Intellectual Property and Usage Rights",
      content: `**6.1 Copyright Ownership**
• Creative Approach retains copyright of all raw footage and unedited materials
• Clients receive license to use final deliverables as specified in agreement
• Full copyright transfer available for additional fee

**6.2 Client Usage Rights**
Upon full payment, clients receive:
• **Standard License**: Non-exclusive rights to use deliverables for intended purpose
• **Commercial License**: Rights for commercial use, advertising, and marketing
• **Unlimited License**: Perpetual, worldwide rights (higher tier projects)

**6.3 Restrictions**
Clients may NOT:
• Resell or redistribute raw footage without permission
• Remove watermarks or credits (if applicable)
• Use footage for illegal or defamatory purposes
• Transfer rights to third parties without written consent
• Modify footage to misrepresent original context

**6.4 Creative Approach Portfolio Rights**
We reserve the right to:
• Use footage in our portfolio and marketing materials
• Share on social media and website
• Submit to industry competitions and awards
• Feature in case studies and presentations

Clients may request confidentiality or exclusion from portfolio.

**6.5 Third-Party Rights**
• Clients responsible for obtaining necessary property releases
• Clients warrant they have authority to commission work on subject property
• Creative Approach not liable for third-party intellectual property claims
• Music and graphics licensed separately (not included unless specified)

**6.6 Moral Rights**
• Creative Approach retains moral rights to be credited as creator
• Credit line appreciated: "Aerial footage by Creative Approach"
• No obligation to display credit, but encouraged

**6.7 Archival Rights**
• Raw footage archived for 90 days post-delivery
• Extended archival available for additional fee
• Clients may request deletion of all footage (right to erasure)
• Backup storage for security and recovery purposes`
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "7. Liability and Insurance",
      content: `**7.1 Our Insurance Coverage**
Creative Approach maintains:
• Comprehensive third-party liability insurance (minimum GHS 1,000,000)
• Equipment insurance (hull coverage)
• Professional indemnity insurance
• Public liability insurance

**7.2 Limitation of Liability**
Our total liability is limited to:
• The amount paid for the specific service
• Direct damages only (not consequential or indirect damages)
• Maximum liability not exceeding GHS 50,000 per incident

**7.3 Client Indemnification**
Client agrees to indemnify Creative Approach against:
• Claims arising from client's misuse of deliverables
• False information provided by client
• Client's failure to obtain necessary permissions
• Third-party claims related to client's property or activities

**7.4 Exclusions**
We are NOT liable for:
• Weather-related delays or cancellations
• Government restrictions or airspace closures
• Equipment failures despite proper maintenance
• Force majeure events (natural disasters, wars, pandemics)
• Errors in client-provided information

**7.5 Safety Protocols**
We maintain strict safety standards:
• Pre-flight safety checks and risk assessments
• Compliance with GCAA safety regulations
• Trained and certified remote pilots
• Emergency procedures and contingency plans
• Equipment maintenance schedules

**7.6 Incident Reporting**
In the event of an incident:
• Immediate notification to client and authorities
• Full investigation and report within 48 hours
• Cooperation with GCAA investigations
• Insurance claim processing support
• Remedial actions as required

**7.7 Client Property**
• We take reasonable care of client property and locations
• Not liable for pre-existing conditions or damages
• Client should secure valuables during operations
• Site safety is shared responsibility`
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "8. Privacy and Data Protection",
      content: `**8.1 Compliance**
We comply with:
• Ghana Data Protection Act, 2012 (Act 843)
• Data Protection Commission regulations
• International best practices (GDPR principles)

**8.2 Data Collection**
We collect only necessary information for service delivery:
• Contact information
• Project location and requirements
• Payment information
• Communication records

**8.3 Aerial Footage Privacy**
• We respect privacy of individuals in captured footage
• Blurring or editing available upon request
• No intentional surveillance or intrusive filming
• Compliance with reasonable privacy expectations

**8.4 Data Security**
• Secure storage with encryption
• Access limited to authorized personnel
• Regular security audits
• Secure file transfer for deliverables

**8.5 Client Rights**
Clients have the right to:
• Access their personal data
• Request corrections or deletions
• Object to data processing
• Withdraw consent

See our Privacy Policy for complete details.`
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "9. Warranties and Disclaimers",
      content: `**9.1 Service Warranty**
We warrant that:
• Services performed with reasonable skill and care
• Equipment maintained in airworthy condition
• Pilots properly licensed and trained
• Compliance with all applicable regulations

**9.2 Quality Standards**
• Professional-grade equipment used
• Industry-standard post-production
• Deliverables meet agreed specifications
• Revisions included as per service agreement

**9.3 No Guarantees**
We do NOT guarantee:
• Specific weather conditions
• Exact color reproduction (conditions vary)
• Presence of specific wildlife or subjects
• Absence of background elements beyond our control

**9.4 Technical Limitations**
• Drone operations subject to technical and regulatory constraints
• GPS accuracy limitations
• Sensor and camera limitations
• Weather-dependent operations

**9.5 Disclaimer of Warranties**
EXCEPT AS EXPRESSLY STATED, SERVICES PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO MERCHANTABILITY, FITNESS FOR PARTICULAR PURPOSE, OR NON-INFRINGEMENT.

**9.6 Revisions**
• Minor revisions included in quoted price
• Major changes subject to additional charges
• Revision requests must be submitted within 14 days of delivery
• Subjective changes (e.g., color preferences) may be charged`
    },
    {
      icon: <Ban className="w-6 h-6" />,
      title: "10. Prohibited Uses and Conduct",
      content: `**10.1 Prohibited Services**
We will NOT provide services for:
• Illegal surveillance or stalking
• Privacy violations or harassment
• Unauthorized data collection
• Drug trafficking or illegal substance monitoring
• Weapons or contraband transport
• Any illegal activities under Ghanaian law

**10.2 Client Conduct**
Clients must NOT:
• Misrepresent project purpose or use
• Provide false information
• Interfere with flight operations
• Endanger crew or public safety
• Use deliverables for defamatory purposes
• Violate intellectual property rights

**10.3 Consequences of Violations**
Violations may result in:
• Immediate termination of services
• Forfeiture of all payments
• Reporting to law enforcement
• Legal action for damages
• Ban from future services

**10.4 Regulatory Compliance**
Clients must:
• Comply with all applicable laws
• Not request illegal operations
• Obtain necessary permits
• Respect property rights and privacy`
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "11. Dispute Resolution",
      content: `**11.1 Negotiation**
Disputes should first be addressed through good-faith negotiation between parties.

**11.2 Mediation**
If negotiation fails, parties agree to:
• Engage professional mediator
• Share mediation costs equally
• Attempt resolution before litigation

**11.3 Arbitration**
For disputes exceeding GHS 10,000:
• Arbitration under Ghana Arbitration Act, 2010 (Act 798)
• Single arbitrator mutually agreed upon
• Arbitration conducted in Accra, Ghana
• Decision final and binding

**11.4 Legal Action**
• Jurisdiction: Courts of Ghana
• Governing Law: Laws of the Republic of Ghana
• Venue: Accra, Ghana
• Language: English

**11.5 Legal Costs**
Prevailing party entitled to recover reasonable legal fees and costs.

**11.6 Limitations Period**
Legal action must be commenced within 2 years of dispute arising.`
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "12. General Provisions",
      content: `**12.1 Entire Agreement**
These Terms, along with the Privacy Policy and service agreement, constitute the entire agreement between parties.

**12.2 Amendments**
• We may update these Terms with 30 days notice
• Continued use constitutes acceptance
• Material changes require explicit consent
• Specific project terms may supersede general Terms

**12.3 Severability**
If any provision is found invalid, remaining provisions remain in full force.

**12.4 Waiver**
Failure to enforce any right does not waive that right.

**12.5 Assignment**
• Clients may not assign rights without written consent
• We may assign to affiliates or successors
• Subcontracting permitted for specialized services

**12.6 Force Majeure**
Neither party liable for delays due to:
• Natural disasters
• Government actions or regulations
• Wars or terrorism
• Pandemics or health emergencies
• Other events beyond reasonable control

**12.7 Notices**
All notices must be sent to:
**Creative Approach Ghana Limited**
Email: legal@creativeapproach.com.gh
Phone: +233 (0) XX XXX XXXX
Address: [Your Business Address], Accra, Ghana

**12.8 Language**
These Terms are written in English. Any translations are for convenience only; English version prevails in case of conflict.

**12.9 Headings**
Section headings are for convenience only and do not affect interpretation.

**12.10 Survival**
Provisions regarding intellectual property, liability, indemnification, and dispute resolution survive termination of the agreement.`
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "13. Acceptance and Acknowledgment",
      content: `By engaging Creative Approach's services, you acknowledge and agree that:

✓ You have read and understood these Terms of Service
✓ You accept these Terms as legally binding
✓ You have authority to enter into this agreement
✓ You will comply with all applicable laws and regulations
✓ You understand our services, pricing, and limitations
✓ You agree to our intellectual property and usage rights provisions
✓ You accept our liability limitations and dispute resolution procedures
✓ You have read our Privacy Policy and consent to data processing
✓ You will provide accurate information and necessary permissions
✓ You understand your obligations and responsibilities

**For Corporate Clients:**
The person accepting these Terms warrants they have authority to bind the corporation or organization.

**For Individual Clients:**
You confirm you are at least 18 years of age and legally competent to enter into contracts.

**Contact for Questions:**
If you have questions about these Terms, contact us before engaging our services:
• Email: info@creativeapproach.com.gh
• Phone: +233 (0) XX XXX XXXX

**Effective Date:** ${lastUpdated}

These Terms of Service are effective as of the date stated above and govern all services provided from that date forward.

**Creative Approach Ghana Limited**
Committed to Professional Excellence and Legal Compliance`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Scale className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-purple-100">
              Professional drone services with clear, transparent terms
            </p>
            <p className="text-sm text-purple-200 mt-4">
              Last Updated: {lastUpdated}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Quick Summary */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-12"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-900">GCAA Compliant</p>
                <p className="text-sm text-gray-600">Fully licensed and insured operations</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-900">Clear Pricing</p>
                <p className="text-sm text-gray-600">50% deposit, balance on completion</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-900">Your Rights Protected</p>
                <p className="text-sm text-gray-600">Usage rights clearly defined in agreement</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-900">Ghana Law</p>
                <p className="text-sm text-gray-600">Governed by laws of Republic of Ghana</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-12"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 flex-shrink-0">
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
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-8 mt-16"
        >
          <h2 className="text-2xl font-bold mb-4">Questions About These Terms?</h2>
          <p className="text-purple-100 mb-6">
            We believe in transparency. If you have any questions about our Terms of Service, please contact us.
          </p>
          <div className="flex flex-wrap gap-6">
            <div>
              <p className="text-sm text-purple-200">Email</p>
              <p className="font-semibold">legal@creativeapproach.com.gh</p>
            </div>
            <div>
              <p className="text-sm text-purple-200">Phone</p>
              <p className="font-semibold">+233 (0) XX XXX XXXX</p>
            </div>
            <div>
              <p className="text-sm text-purple-200">Location</p>
              <p className="font-semibold">Accra, Ghana</p>
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
            Download Terms of Service (PDF)
          </button>
        </motion.div>
      </div>
    </div>
  );
};
