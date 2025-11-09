import React from 'react';
import { motion } from 'framer-motion';
import { Scale, FileText } from 'lucide-react';

export const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container-custom max-w-5xl">
        {/* Legal Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b-4 border-gray-900 pb-8 mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <Scale className="w-12 h-12 text-gray-900" />
          </div>
          <h1 className="text-4xl font-bold text-center mb-6 text-gray-900 uppercase tracking-wide">
            Privacy Policy
          </h1>
          <div className="text-center space-y-2 text-gray-800 border-2 border-gray-300 p-6 bg-gray-50">
            <p className="font-bold text-xl uppercase">CREATIVE APPROACH GHANA LIMITED</p>
            <p className="text-sm uppercase tracking-wide">Registered in the Republic of Ghana</p>
            <p className="text-sm">Company Registration No.: [INSERT REGISTRATION NUMBER]</p>
            <p className="text-sm">Ghana Revenue Authority TIN: [INSERT TIN]</p>
            <div className="border-t-2 border-gray-300 mt-4 pt-4">
              <p className="font-semibold">EFFECTIVE DATE: November 9, 2025</p>
              <p className="text-sm">Last Revised: November 9, 2025</p>
            </div>
          </div>
        </motion.div>

        {/* Legal Content */}
        <div className="space-y-12 text-gray-900 leading-relaxed">
          
          {/* Preamble */}
          <section className="border-l-4 border-gray-900 pl-6">
            <h2 className="text-2xl font-bold uppercase mb-4 tracking-wide">PREAMBLE</h2>
            <div className="space-y-4 text-justify">
              <p className="font-semibold">
                WHEREAS Creative Approach Ghana Limited (hereinafter referred to as "the Company," "we," "us," or "our") 
                is a duly registered entity operating unmanned aerial vehicle (UAV) services in the Republic of Ghana;
              </p>
              <p className="font-semibold">
                AND WHEREAS the Company is committed to protecting the privacy and personal data of all individuals 
                who engage with our services, website, or operations;
              </p>
              <p className="font-semibold">
                AND WHEREAS this Privacy Policy is established in strict compliance with the Ghana Data Protection Act, 
                2012 (Act 843), the Data Protection Commission (Ghana) Regulations, and all applicable laws of the 
                Republic of Ghana;
              </p>
              <p className="font-semibold">
                NOW THEREFORE, the Company hereby adopts and publishes this Privacy Policy to govern the collection, 
                processing, storage, and protection of personal data.
              </p>
            </div>
          </section>

          {/* Article 1 */}
          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 tracking-wide border-b-2 border-gray-900 pb-2">
              ARTICLE 1: DEFINITIONS AND INTERPRETATION
            </h2>
            <div className="space-y-3 ml-6">
              <p><span className="font-bold">1.1 "Personal Data"</span> shall mean any information relating to an identified or identifiable natural person as defined under Section 42 of the Ghana Data Protection Act, 2012 (Act 843).</p>
              
              <p><span className="font-bold">1.2 "Data Subject"</span> shall mean any individual whose personal data is collected, processed, or stored by the Company.</p>
              
              <p><span className="font-bold">1.3 "Processing"</span> shall mean any operation performed on personal data including collection, recording, organization, storage, adaptation, retrieval, use, disclosure, or destruction.</p>
              
              <p><span className="font-bold">1.4 "Data Controller"</span> shall mean Creative Approach Ghana Limited, which determines the purposes and means of processing personal data.</p>
              
              <p><span className="font-bold">1.5 "Services"</span> shall mean all unmanned aerial vehicle operations including but not limited to aerial photography, videography, surveying, mapping, inspection services, and related activities provided by the Company.</p>
              
              <p><span className="font-bold">1.6 "GCAA"</span> shall mean the Ghana Civil Aviation Authority established under the Civil Aviation Act, 2020 (Act 1042).</p>
              
              <p><span className="font-bold">1.7 "DPC"</span> shall mean the Data Protection Commission established under the Ghana Data Protection Act, 2012 (Act 843).</p>
            </div>
          </section>

          {/* Article 2 */}
          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 tracking-wide border-b-2 border-gray-900 pb-2">
              ARTICLE 2: SCOPE AND APPLICATION
            </h2>
            <div className="space-y-3 ml-6">
              <p><span className="font-bold">2.1</span> This Privacy Policy applies to all personal data collected by the Company through any means including but not limited to:</p>
              <ul className="list-disc ml-8 space-y-2">
                <li>The Company's official website and digital platforms;</li>
                <li>Direct communications via email, telephone, or physical correspondence;</li>
                <li>Service agreements, contracts, and quotations;</li>
                <li>Unmanned aerial vehicle operations and site visits;</li>
                <li>Payment processing and financial transactions;</li>
                <li>Marketing materials, newsletters, and promotional activities.</li>
              </ul>
              
              <p><span className="font-bold">2.2</span> This Policy shall be binding upon all employees, contractors, agents, and third parties acting on behalf of the Company.</p>
              
              <p><span className="font-bold">2.3</span> This Policy shall be construed in accordance with the laws of the Republic of Ghana.</p>
            </div>
          </section>

          {/* Article 3 */}
          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 tracking-wide border-b-2 border-gray-900 pb-2">
              ARTICLE 3: CATEGORIES OF PERSONAL DATA COLLECTED
            </h2>
            <div className="space-y-4 ml-6">
              <div>
                <p className="font-bold">3.1 Identification Data:</p>
                <ul className="list-disc ml-8 space-y-1 mt-2">
                  <li>Full legal name and any aliases or business names;</li>
                  <li>Date of birth and age verification;</li>
                  <li>Government-issued identification numbers (Ghana Card, Passport, Driver's License);</li>
                  <li>Photographs and biometric data where required for security purposes.</li>
                </ul>
              </div>

              <div>
                <p className="font-bold">3.2 Contact Information:</p>
                <ul className="list-disc ml-8 space-y-1 mt-2">
                  <li>Physical address, postal address, and GPS coordinates;</li>
                  <li>Telephone numbers (mobile and landline);</li>
                  <li>Email addresses (personal and business);</li>
                  <li>Emergency contact information.</li>
                </ul>
              </div>

              <div>
                <p className="font-bold">3.3 Financial and Transactional Data:</p>
                <ul className="list-disc ml-8 space-y-1 mt-2">
                  <li>Payment card information (processed by PCI-DSS compliant third parties);</li>
                  <li>Bank account details for electronic fund transfers;</li>
                  <li>Billing addresses and invoicing information;</li>
                  <li>Transaction history, payment status, and financial records;</li>
                  <li>Tax identification numbers where applicable.</li>
                </ul>
              </div>

              <div>
                <p className="font-bold">3.4 Technical and Operational Data:</p>
                <ul className="list-disc ml-8 space-y-1 mt-2">
                  <li>IP addresses, browser types, and device identifiers;</li>
                  <li>Operating systems, screen resolution, and language preferences;</li>
                  <li>Website navigation patterns, clickstream data, and session recordings;</li>
                  <li>Cookies, web beacons, and similar tracking technologies;</li>
                  <li>Geolocation data from devices and aerial operations.</li>
                </ul>
              </div>

              <div>
                <p className="font-bold">3.5 Aerial Operations Data:</p>
                <ul className="list-disc ml-8 space-y-1 mt-2">
                  <li>Flight logs, flight paths, and altitude records;</li>
                  <li>Aerial photographs, videos, and thermal imaging data;</li>
                  <li>GPS coordinates of properties, sites, and operational areas;</li>
                  <li>Property boundaries, measurements, and survey data;</li>
                  <li>Images of individuals captured incidentally during operations;</li>
                  <li>Weather conditions, wind speed, and environmental data.</li>
                </ul>
              </div>

              <div>
                <p className="font-bold">3.6 Communications Data:</p>
                <ul className="list-disc ml-8 space-y-1 mt-2">
                  <li>Email correspondence and attachments;</li>
                  <li>Telephone call recordings (with prior consent);</li>
                  <li>Text messages, WhatsApp, and other instant messaging communications;</li>
                  <li>Customer feedback, reviews, testimonials, and complaints;</li>
                  <li>Survey responses and marketing preferences.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Article 4 */}
          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 tracking-wide border-b-2 border-gray-900 pb-2">
              ARTICLE 4: LAWFUL BASIS FOR PROCESSING
            </h2>
            <div className="space-y-3 ml-6">
              <p><span className="font-bold">4.1</span> The Company processes personal data only where there exists a lawful basis as prescribed under Section 17 of the Ghana Data Protection Act, 2012 (Act 843), including but not limited to:</p>
              
              <p><span className="font-bold">4.1.1 Consent:</span> Where the Data Subject has given explicit, informed, and unambiguous consent to the processing of their personal data for specific purposes.</p>
              
              <p><span className="font-bold">4.1.2 Contractual Necessity:</span> Where processing is necessary for the performance of a contract to which the Data Subject is party, or to take steps at the request of the Data Subject prior to entering into a contract.</p>
              
              <p><span className="font-bold">4.1.3 Legal Obligation:</span> Where processing is necessary for compliance with a legal obligation to which the Company is subject under Ghanaian law, including tax laws, aviation regulations, and GCAA requirements.</p>
              
              <p><span className="font-bold">4.1.4 Legitimate Interests:</span> Where processing is necessary for the purposes of legitimate interests pursued by the Company, provided such interests do not override the fundamental rights and freedoms of the Data Subject.</p>
              
              <p><span className="font-bold">4.1.5 Public Interest:</span> Where processing is necessary for the performance of a task carried out in the public interest or in the exercise of official authority vested in the Company.</p>
            </div>
          </section>

          {/* Article 5 */}
          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 tracking-wide border-b-2 border-gray-900 pb-2">
              ARTICLE 5: PURPOSES OF DATA PROCESSING
            </h2>
            <div className="space-y-3 ml-6">
              <p><span className="font-bold">5.1</span> Personal data collected by the Company shall be processed solely for the following purposes:</p>
              
              <div className="ml-6 space-y-3">
                <p><span className="font-bold">5.1.1</span> To provide, maintain, and improve the Services requested by the Data Subject;</p>
                <p><span className="font-bold">5.1.2</span> To process quotations, bookings, reservations, and service agreements;</p>
                <p><span className="font-bold">5.1.3</span> To facilitate payment processing, invoicing, and financial record-keeping;</p>
                <p><span className="font-bold">5.1.4</span> To comply with regulatory requirements imposed by the GCAA, DPC, and other governmental authorities;</p>
                <p><span className="font-bold">5.1.5</span> To maintain flight logs, operational records, and safety documentation as required by law;</p>
                <p><span className="font-bold">5.1.6</span> To communicate with Data Subjects regarding service delivery, scheduling, and project updates;</p>
                <p><span className="font-bold">5.1.7</span> To respond to inquiries, complaints, and customer service requests;</p>
                <p><span className="font-bold">5.1.8</span> To send marketing communications, newsletters, and promotional materials (with prior consent);</p>
                <p><span className="font-bold">5.1.9</span> To analyze website usage, improve user experience, and optimize digital platforms;</p>
                <p><span className="font-bold">5.1.10</span> To detect, prevent, and investigate fraud, security breaches, and unauthorized activities;</p>
                <p><span className="font-bold">5.1.11</span> To enforce our legal rights, defend against legal claims, and comply with court orders;</p>
                <p><span className="font-bold">5.1.12</span> To conduct internal audits, quality assessments, and business analytics.</p>
              </div>
              
              <p><span className="font-bold">5.2</span> The Company shall not process personal data for purposes beyond those specified herein without obtaining additional consent from the Data Subject.</p>
            </div>
          </section>

          {/* Article 6 */}
          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 tracking-wide border-b-2 border-gray-900 pb-2">
              ARTICLE 6: DATA SUBJECT RIGHTS
            </h2>
            <div className="space-y-3 ml-6">
              <p><span className="font-bold">6.1</span> In accordance with Sections 35-40 of the Ghana Data Protection Act, 2012 (Act 843), Data Subjects are hereby entitled to the following rights:</p>
              
              <div className="ml-6 space-y-4">
                <div>
                  <p className="font-bold">6.1.1 Right of Access (Section 35):</p>
                  <p className="ml-4">The Data Subject has the right to obtain from the Company confirmation as to whether personal data concerning them is being processed, and where applicable, access to such personal data and the following information:</p>
                  <ul className="list-disc ml-12 space-y-1 mt-2">
                    <li>The purposes of the processing;</li>
                    <li>The categories of personal data concerned;</li>
                    <li>The recipients or categories of recipients to whom the data has been disclosed;</li>
                    <li>The envisaged period of data retention;</li>
                    <li>The existence of the right to request rectification, erasure, or restriction;</li>
                    <li>The right to lodge a complaint with the Data Protection Commission.</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">6.1.2 Right to Rectification (Section 36):</p>
                  <p className="ml-4">The Data Subject has the right to obtain from the Company, without undue delay, the rectification of inaccurate personal data and the completion of incomplete personal data.</p>
                </div>

                <div>
                  <p className="font-bold">6.1.3 Right to Erasure (Section 37):</p>
                  <p className="ml-4">The Data Subject has the right to obtain erasure of personal data where:</p>
                  <ul className="list-disc ml-12 space-y-1 mt-2">
                    <li>The personal data is no longer necessary for the purposes for which it was collected;</li>
                    <li>The Data Subject withdraws consent and no other legal ground exists for processing;</li>
                    <li>The Data Subject objects to processing and no overriding legitimate grounds exist;</li>
                    <li>The personal data has been unlawfully processed;</li>
                    <li>Erasure is required for compliance with a legal obligation under Ghanaian law.</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">6.1.4 Right to Restriction of Processing (Section 38):</p>
                  <p className="ml-4">The Data Subject has the right to obtain restriction of processing where:</p>
                  <ul className="list-disc ml-12 space-y-1 mt-2">
                    <li>The accuracy of the personal data is contested by the Data Subject;</li>
                    <li>The processing is unlawful and the Data Subject opposes erasure;</li>
                    <li>The Company no longer needs the data but the Data Subject requires it for legal claims;</li>
                    <li>The Data Subject has objected to processing pending verification of legitimate grounds.</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">6.1.5 Right to Data Portability (Section 39):</p>
                  <p className="ml-4">The Data Subject has the right to receive personal data in a structured, commonly used, and machine-readable format and to transmit such data to another data controller without hindrance from the Company.</p>
                </div>

                <div>
                  <p className="font-bold">6.1.6 Right to Object (Section 40):</p>
                  <p className="ml-4">The Data Subject has the right to object, on grounds relating to their particular situation, to processing of personal data based on legitimate interests or public interest. The Company shall cease processing unless it can demonstrate compelling legitimate grounds that override the interests, rights, and freedoms of the Data Subject.</p>
                </div>

                <div>
                  <p className="font-bold">6.1.7 Right to Withdraw Consent:</p>
                  <p className="ml-4">Where processing is based on consent, the Data Subject has the right to withdraw such consent at any time without affecting the lawfulness of processing based on consent before its withdrawal.</p>
                </div>
              </div>

              <p><span className="font-bold">6.2 Exercise of Rights:</span> Data Subjects may exercise the aforementioned rights by submitting a written request to the Company's Data Protection Officer at the contact details specified in Article 14 hereof.</p>
              
              <p><span className="font-bold">6.3 Verification:</span> The Company reserves the right to verify the identity of any Data Subject exercising their rights to prevent unauthorized disclosure of personal data.</p>
              
              <p><span className="font-bold">6.4 Response Time:</span> The Company shall respond to requests within thirty (30) days of receipt, which period may be extended by an additional sixty (60) days where necessary, taking into account the complexity and number of requests.</p>
            </div>
          </section>

          {/* Article 7 */}
          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 tracking-wide border-b-2 border-gray-900 pb-2">
              ARTICLE 7: DATA SECURITY AND PROTECTION MEASURES
            </h2>
            <div className="space-y-3 ml-6">
              <p><span className="font-bold">7.1</span> The Company shall implement appropriate technical and organizational security measures to protect personal data against accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access, including but not limited to:</p>
              
              <div className="ml-6 space-y-3">
                <p><span className="font-bold">7.1.1 Technical Measures:</span></p>
                <ul className="list-disc ml-8 space-y-1">
                  <li>Encryption of data in transit using Transport Layer Security (TLS) 1.2 or higher;</li>
                  <li>Encryption of data at rest using industry-standard AES-256 encryption;</li>
                  <li>Multi-factor authentication for access to sensitive systems;</li>
                  <li>Regular security audits, vulnerability assessments, and penetration testing;</li>
                  <li>Firewalls, intrusion detection systems, and anti-malware software;</li>
                  <li>Secure backup systems with encrypted offsite storage;</li>
                  <li>Access controls and role-based permission systems.</li>
                </ul>

                <p><span className="font-bold">7.1.2 Organizational Measures:</span></p>
                <ul className="list-disc ml-8 space-y-1">
                  <li>Mandatory data protection training for all employees and contractors;</li>
                  <li>Confidentiality agreements and non-disclosure obligations;</li>
                  <li>Incident response plans and data breach notification procedures;</li>
                  <li>Regular review and updating of security policies and procedures;</li>
                  <li>Background checks for personnel with access to personal data;</li>
                  <li>Physical security measures for offices and data storage facilities;</li>
                  <li>Documented data handling procedures and audit trails.</li>
                </ul>
              </div>

              <p><span className="font-bold">7.2 Data Breach Notification:</span> In the event of a personal data breach, the Company shall, without undue delay and where feasible within seventy-two (72) hours of becoming aware of the breach, notify the Data Protection Commission and affected Data Subjects in accordance with Section 30 of the Ghana Data Protection Act, 2012 (Act 843).</p>
              
              <p><span className="font-bold">7.3 Third-Party Processors:</span> Where the Company engages third-party data processors, it shall ensure such processors provide sufficient guarantees to implement appropriate technical and organizational measures and shall enter into written agreements imposing equivalent data protection obligations.</p>
            </div>
          </section>

          {/* Article 8 */}
          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 tracking-wide border-b-2 border-gray-900 pb-2">
              ARTICLE 8: DATA RETENTION AND DELETION
            </h2>
            <div className="space-y-3 ml-6">
              <p><span className="font-bold">8.1</span> Personal data shall be retained only for as long as necessary to fulfill the purposes for which it was collected or as required by law.</p>
              
              <p><span className="font-bold">8.2 Retention Periods:</span></p>
              <div className="ml-6 space-y-2">
                <p><span className="font-bold">8.2.1</span> Financial and tax-related records: Seven (7) years from the end of the financial year, in compliance with the Ghana Revenue Authority Act, 2009 (Act 791) and the Companies Act, 2019 (Act 992);</p>
                <p><span className="font-bold">8.2.2</span> Flight logs and operational records: Five (5) years from the date of operation, in compliance with GCAA regulations;</p>
                <p><span className="font-bold">8.2.3</span> Contract and service agreement records: Seven (7) years from contract termination or completion;</p>
                <p><span className="font-bold">8.2.4</span> Marketing communications data: Until consent is withdrawn or three (3) years of inactivity;</p>
                <p><span className="font-bold">8.2.5</span> Aerial footage and deliverables: Thirty (30) to ninety (90) days post-delivery, unless otherwise agreed in writing;</p>
                <p><span className="font-bold">8.2.6</span> Website analytics and cookies: Thirteen (13) months from collection;</p>
                <p><span className="font-bold">8.2.7</span> Correspondence and communications: Three (3) years from the date of last communication.</p>
              </div>
              
              <p><span className="font-bold">8.3 Secure Deletion:</span> Upon expiration of the retention period, personal data shall be securely deleted or anonymized using methods that prevent reconstruction or recovery, including:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Cryptographic erasure of encrypted data;</li>
                <li>Overwriting of magnetic and solid-state storage media;</li>
                <li>Physical destruction of hardware containing personal data;</li>
                <li>Purging of backup systems and archived data.</li>
              </ul>
              
              <p><span className="font-bold">8.4</span> Notwithstanding the above, the Company may retain personal data for longer periods where required by law, necessary for the establishment, exercise, or defense of legal claims, or with the explicit consent of the Data Subject.</p>
            </div>
          </section>

          {/* Article 9 */}
          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 tracking-wide border-b-2 border-gray-900 pb-2">
              ARTICLE 9: DISCLOSURE AND SHARING OF PERSONAL DATA
            </h2>
            <div className="space-y-3 ml-6">
              <p><span className="font-bold">9.1</span> The Company shall not sell, rent, lease, or otherwise commercialize personal data to third parties under any circumstances.</p>
              
              <p><span className="font-bold">9.2</span> Personal data may be disclosed to the following categories of recipients where necessary and lawful:</p>
              
              <div className="ml-6 space-y-3">
                <p><span className="font-bold">9.2.1 Regulatory Authorities:</span> The GCAA, DPC, Ghana Revenue Authority, Police Service, or other governmental bodies where required by law or for regulatory compliance;</p>
                
                <p><span className="font-bold">9.2.2 Service Providers:</span> Third-party vendors providing essential services including payment processing, cloud hosting, website analytics, email delivery, and IT infrastructure, subject to written data processing agreements;</p>
                
                <p><span className="font-bold">9.2.3 Legal and Professional Advisors:</span> Lawyers, accountants, auditors, and consultants bound by professional confidentiality obligations;</p>
                
                <p><span className="font-bold">9.2.4 Law Enforcement:</span> Police, courts, tribunals, or other authorities where disclosure is required by court order, subpoena, or statutory obligation;</p>
                
                <p><span className="font-bold">9.2.5 Business Transfers:</span> In the event of a merger, acquisition, restructuring, or sale of assets, personal data may be transferred to the acquiring entity, subject to equivalent data protection obligations;</p>
                
                <p><span className="font-bold">9.2.6 Insurance Providers:</span> Where necessary for claims processing, risk assessment, or policy administration related to the Company's operations.</p>
              </div>
              
              <p><span className="font-bold">9.3 International Transfers:</span> Where personal data is transferred outside the Republic of Ghana, the Company shall ensure adequate safeguards are in place, including:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Transfers to countries deemed to have adequate data protection laws;</li>
                <li>Standard contractual clauses approved by the Data Protection Commission;</li>
                <li>Binding corporate rules for intra-group transfers;</li>
                <li>Explicit consent from the Data Subject for the specific transfer.</li>
              </ul>
              
              <p><span className="font-bold">9.4</span> Prior to any disclosure, the Company shall conduct a data protection impact assessment where appropriate and ensure the recipient has adequate security measures in place.</p>
            </div>
          </section>

          {/* Article 10 */}
          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 tracking-wide border-b-2 border-gray-900 pb-2">
              ARTICLE 10: AERIAL IMAGING AND PRIVACY CONSIDERATIONS
            </h2>
            <div className="space-y-3 ml-6">
              <p><span className="font-bold">10.1 Incidental Capture:</span> The Company acknowledges that aerial photography and videography operations may incidentally capture images of individuals, private properties, and sensitive locations.</p>
              
              <p><span className="font-bold">10.2 Minimization Principle:</span> The Company shall take reasonable steps to minimize the capture of personal data during aerial operations, including:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Limiting camera angles and zoom levels to the commissioned area;</li>
                <li>Conducting operations at appropriate altitudes to reduce identifiability;</li>
                <li>Blurring, pixelating, or redacting identifiable faces and license plates in final deliverables where not essential to the service;</li>
                <li>Restricting operations over residential areas to commissioned properties;</li>
                <li>Providing advance notice to neighboring property owners where practicable.</li>
              </ul>
              
              <p><span className="font-bold">10.3 Objections:</span> Individuals who object to being captured in aerial imagery may submit a written objection to the Company, which shall be addressed on a case-by-case basis, balancing legitimate operational needs with privacy rights.</p>
              
              <p><span className="font-bold">10.4 Sensitive Locations:</span> The Company shall not conduct operations over or near government installations, military facilities, correctional institutions, or other sensitive locations without proper authorization from relevant authorities.</p>
              
              <p><span className="font-bold">10.5 Usage Rights:</span> Aerial imagery containing identifiable individuals shall not be used for marketing, promotional, or portfolio purposes without obtaining explicit written consent from such individuals, except where individuals are part of a crowd or public event where no reasonable expectation of privacy exists.</p>
            </div>
          </section>

          {/* Article 11 */}
          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 tracking-wide border-b-2 border-gray-900 pb-2">
              ARTICLE 11: COOKIES AND TRACKING TECHNOLOGIES
            </h2>
            <div className="space-y-3 ml-6">
              <p><span className="font-bold">11.1 Definition:</span> Cookies are small text files placed on a user's device to store information about browsing behavior and preferences.</p>
              
              <p><span className="font-bold">11.2 Types of Cookies Used:</span></p>
              
              <div className="ml-6 space-y-3">
                <p><span className="font-bold">11.2.1 Essential Cookies:</span> Strictly necessary for website operation, security, and service delivery. These cookies do not require consent as they are essential for the functioning of the website.</p>
                
                <p><span className="font-bold">11.2.2 Analytics Cookies:</span> Used to collect aggregated, anonymized data about website traffic, user behavior, and performance metrics to improve user experience. These include Google Analytics cookies with IP anonymization enabled.</p>
                
                <p><span className="font-bold">11.2.3 Functional Cookies:</span> Store user preferences, language settings, and customization options to enhance user experience across sessions.</p>
                
                <p><span className="font-bold">11.2.4 Marketing Cookies:</span> Track user behavior across websites for targeted advertising purposes. These cookies are only deployed with explicit user consent.</p>
              </div>
              
              <p><span className="font-bold">11.3 Third-Party Cookies:</span> The Company's website may utilize third-party cookies from service providers including but not limited to Google Analytics, Facebook Pixel, and payment processors. Users are advised to review the privacy policies of these third parties.</p>
              
              <p><span className="font-bold">11.4 Cookie Management:</span> Users may control or disable cookies through browser settings, though this may affect website functionality. Instructions for managing cookies are available at:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Google Chrome: chrome://settings/cookies</li>
                <li>Mozilla Firefox: about:preferences#privacy</li>
                <li>Safari: Preferences → Privacy → Manage Website Data</li>
                <li>Microsoft Edge: edge://settings/privacy</li>
              </ul>
              
              <p><span className="font-bold">11.5 Consent:</span> By continuing to use the Company's website, users consent to the use of essential and analytics cookies. Consent for marketing cookies shall be obtained through a cookie consent banner before deployment.</p>
              
              <p><span className="font-bold">11.6 Duration:</span> Session cookies expire upon closing the browser, while persistent cookies remain for periods ranging from thirty (30) days to thirteen (13) months, depending on their purpose.</p>
            </div>
          </section>

          {/* Article 12 */}
          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 tracking-wide border-b-2 border-gray-900 pb-2">
              ARTICLE 12: CHILDREN'S PRIVACY
            </h2>
            <div className="space-y-3 ml-6">
              <p><span className="font-bold">12.1</span> The Company's Services are not directed to individuals under the age of eighteen (18) years.</p>
              
              <p><span className="font-bold">12.2</span> The Company does not knowingly collect, process, or solicit personal data from children under eighteen (18) years of age without verifiable parental or guardian consent.</p>
              
              <p><span className="font-bold">12.3</span> If the Company becomes aware that it has inadvertently collected personal data from a child under eighteen (18) years without appropriate consent, it shall take immediate steps to delete such data from its systems.</p>
              
              <p><span className="font-bold">12.4</span> Parents or legal guardians who believe their child has provided personal data to the Company may contact the Data Protection Officer to request access, rectification, or deletion of such data.</p>
              
              <p><span className="font-bold">12.5</span> Where children are incidentally captured in aerial imagery during operations (e.g., at events or public spaces), the Company shall exercise heightened care in handling such images and shall not use them for marketing purposes without parental consent.</p>
            </div>
          </section>

          {/* Article 13 */}
          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 tracking-wide border-b-2 border-gray-900 pb-2">
              ARTICLE 13: AMENDMENTS AND MODIFICATIONS
            </h2>
            <div className="space-y-3 ml-6">
              <p><span className="font-bold">13.1</span> The Company reserves the right to amend, modify, supplement, or replace this Privacy Policy at any time without prior notice, subject to compliance with applicable laws.</p>
              
              <p><span className="font-bold">13.2</span> Material changes to this Privacy Policy shall be communicated to Data Subjects through one or more of the following methods:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Prominent notice on the Company's website;</li>
                <li>Email notification to registered users;</li>
                <li>Publication in a newspaper of national circulation in Ghana;</li>
                <li>Direct communication to active clients.</li>
              </ul>
              
              <p><span className="font-bold">13.3</span> The effective date of any amendments shall be clearly indicated at the top of this Privacy Policy.</p>
              
              <p><span className="font-bold">13.4</span> Continued use of the Company's Services following notification of amendments shall constitute acceptance of such changes, provided that material changes requiring consent shall not be effective until explicit consent is obtained.</p>
              
              <p><span className="font-bold">13.5</span> Previous versions of this Privacy Policy shall be archived and made available upon request for a period of seven (7) years.</p>
            </div>
          </section>

          {/* Article 14 */}
          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 tracking-wide border-b-2 border-gray-900 pb-2">
              ARTICLE 14: CONTACT INFORMATION AND DATA PROTECTION OFFICER
            </h2>
            <div className="space-y-4 ml-6">
              <p><span className="font-bold">14.1 Data Controller:</span></p>
              <div className="ml-6 bg-gray-50 border-2 border-gray-300 p-4">
                <p className="font-bold">Creative Approach Ghana Limited</p>
                <p>Registered Address: [INSERT PHYSICAL ADDRESS]</p>
                <p>Postal Address: [INSERT POSTAL ADDRESS]</p>
                <p>Company Registration No.: [INSERT REGISTRATION NUMBER]</p>
                <p>TIN: [INSERT TIN]</p>
              </div>
              
              <p><span className="font-bold">14.2 Data Protection Officer:</span></p>
              <div className="ml-6 bg-gray-50 border-2 border-gray-300 p-4">
                <p>Name: [INSERT DPO NAME]</p>
                <p>Title: Data Protection Officer</p>
                <p>Email: privacy@creativeapproach.com.gh / dpo@creativeapproach.com.gh</p>
                <p>Telephone: +233 (0) [INSERT PHONE NUMBER]</p>
                <p>Office Hours: Monday - Friday, 9:00 AM - 5:00 PM (GMT)</p>
              </div>
              
              <p><span className="font-bold">14.3</span> Data Subjects may contact the Data Protection Officer for all matters relating to:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Inquiries about personal data processing;</li>
                <li>Exercise of Data Subject rights under Article 6;</li>
                <li>Complaints regarding data protection practices;</li>
                <li>Requests for copies of data processing agreements;</li>
                <li>Reporting of suspected data breaches;</li>
                <li>Withdrawal of consent for data processing.</li>
              </ul>
              
              <p><span className="font-bold">14.4 Response Time:</span> The Company shall acknowledge receipt of communications within five (5) business days and provide substantive responses within thirty (30) days, extendable by an additional sixty (60) days for complex requests.</p>
            </div>
          </section>

          {/* Article 15 */}
          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 tracking-wide border-b-2 border-gray-900 pb-2">
              ARTICLE 15: COMPLAINTS AND REGULATORY OVERSIGHT
            </h2>
            <div className="space-y-4 ml-6">
              <p><span className="font-bold">15.1</span> Data Subjects who are dissatisfied with the Company's handling of personal data or response to requests may lodge a complaint with the Data Protection Commission of Ghana.</p>
              
              <p><span className="font-bold">15.2 Data Protection Commission Contact Details:</span></p>
              <div className="ml-6 bg-gray-50 border-2 border-gray-300 p-4">
                <p className="font-bold">Data Protection Commission</p>
                <p>Address: No. 3 Ninth Circular Road, Cantonments, Accra, Ghana</p>
                <p>Postal Address: P.O. Box CT 5639, Cantonments, Accra</p>
                <p>Telephone: +233 (0) 302 971 232 / +233 (0) 302 971 658</p>
                <p>Email: info@dataprotection.org.gh</p>
                <p>Website: www.dataprotection.org.gh</p>
                <p>Office Hours: Monday - Friday, 8:00 AM - 5:00 PM (GMT)</p>
              </div>
              
              <p><span className="font-bold">15.3 Internal Complaint Procedure:</span> Before escalating to the Data Protection Commission, Data Subjects are encouraged to lodge complaints with the Company's Data Protection Officer, who shall investigate and respond within thirty (30) days.</p>
              
              <p><span className="font-bold">15.4</span> The Company shall cooperate fully with the Data Protection Commission in any investigation, audit, or enforcement action and shall implement any remedial measures ordered by the Commission.</p>
              
              <p><span className="font-bold">15.5 Right to Judicial Remedy:</span> Data Subjects retain the right to seek judicial remedies before the courts of Ghana for violations of their data protection rights, in accordance with Section 49 of the Ghana Data Protection Act, 2012 (Act 843).</p>
            </div>
          </section>

          {/* Article 16 */}
          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 tracking-wide border-b-2 border-gray-900 pb-2">
              ARTICLE 16: LIMITATION OF LIABILITY
            </h2>
            <div className="space-y-3 ml-6">
              <p><span className="font-bold">16.1</span> While the Company implements robust security measures as outlined in Article 7, it cannot guarantee absolute security of personal data transmitted over the internet or stored electronically.</p>
              
              <p><span className="font-bold">16.2</span> The Company shall not be liable for unauthorized access, hacking, data loss, or breaches resulting from:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Acts of God, force majeure events, natural disasters, or circumstances beyond the Company's reasonable control;</li>
                <li>Cyber attacks, distributed denial-of-service attacks, or sophisticated hacking attempts that bypass industry-standard security measures;</li>
                <li>Third-party service provider failures, provided the Company has exercised due diligence in vendor selection;</li>
                <li>Data Subject negligence, including but not limited to sharing passwords, falling victim to phishing attacks, or failing to secure personal devices;</li>
                <li>Compliance with court orders, subpoenas, or lawful government requests requiring disclosure of personal data.</li>
              </ul>
              
              <p><span className="font-bold">16.3</span> The Company's total aggregate liability for any data protection violation shall not exceed the greater of:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>The amount paid by the Data Subject to the Company in the twelve (12) months preceding the breach; or</li>
                <li>Five Thousand Ghana Cedis (GHS 5,000.00).</li>
              </ul>
              
              <p><span className="font-bold">16.4</span> This limitation of liability shall not apply to:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Liability for gross negligence, willful misconduct, or intentional violations of data protection laws;</li>
                <li>Liability for death or personal injury caused by the Company's negligence;</li>
                <li>Liability that cannot be excluded or limited under Ghanaian law.</li>
              </ul>
              
              <p><span className="font-bold">16.5</span> Data Subjects acknowledge and accept that transmission of data over the internet is inherently insecure and agree to assume the risks associated with electronic communications.</p>
            </div>
          </section>

          {/* Article 17 */}
          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 tracking-wide border-b-2 border-gray-900 pb-2">
              ARTICLE 17: GOVERNING LAW AND JURISDICTION
            </h2>
            <div className="space-y-3 ml-6">
              <p><span className="font-bold">17.1</span> This Privacy Policy shall be governed by and construed in accordance with the laws of the Republic of Ghana, including but not limited to:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>The Ghana Data Protection Act, 2012 (Act 843);</li>
                <li>The Civil Aviation Act, 2020 (Act 1042);</li>
                <li>The Electronic Transactions Act, 2008 (Act 772);</li>
                <li>The Companies Act, 2019 (Act 992);</li>
                <li>Any regulations, guidelines, or directives issued by the Data Protection Commission.</li>
              </ul>
              
              <p><span className="font-bold">17.2</span> Any dispute, controversy, or claim arising out of or relating to this Privacy Policy shall be subject to the exclusive jurisdiction of the courts of the Republic of Ghana, with the High Court of Justice (Accra) having primary jurisdiction.</p>
              
              <p><span className="font-bold">17.3</span> In the event of conflict between this Privacy Policy and applicable Ghanaian law, the provisions of Ghanaian law shall prevail to the extent of such conflict.</p>
              
              <p><span className="font-bold">17.4</span> Where international treaties or agreements to which Ghana is a signatory impose obligations relating to data protection, such obligations shall be deemed incorporated into this Privacy Policy.</p>
            </div>
          </section>

          {/* Article 18 */}
          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 tracking-wide border-b-2 border-gray-900 pb-2">
              ARTICLE 18: SEVERABILITY
            </h2>
            <div className="space-y-3 ml-6">
              <p><span className="font-bold">18.1</span> If any provision of this Privacy Policy is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction or regulatory authority, such provision shall be severed from this Policy, and the remaining provisions shall continue in full force and effect.</p>
              
              <p><span className="font-bold">18.2</span> In the event of severance, the parties shall negotiate in good faith to replace the invalid provision with a valid provision that most closely approximates the intent and economic effect of the severed provision.</p>
            </div>
          </section>

          {/* Article 19 */}
          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 tracking-wide border-b-2 border-gray-900 pb-2">
              ARTICLE 19: ENTIRE AGREEMENT
            </h2>
            <div className="space-y-3 ml-6">
              <p><span className="font-bold">19.1</span> This Privacy Policy, together with the Company's Terms of Service and any service-specific agreements, constitutes the entire agreement between the Company and Data Subjects regarding the processing of personal data.</p>
              
              <p><span className="font-bold">19.2</span> This Privacy Policy supersedes all prior communications, understandings, and agreements, whether written or oral, relating to the subject matter hereof.</p>
            </div>
          </section>

          {/* Article 20 */}
          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 tracking-wide border-b-2 border-gray-900 pb-2">
              ARTICLE 20: ACKNOWLEDGMENT AND CONSENT
            </h2>
            <div className="space-y-3 ml-6 bg-gray-50 border-2 border-gray-800 p-6">
              <p className="font-bold uppercase">BY ACCESSING, USING, OR CONTINUING TO USE THE COMPANY'S SERVICES, YOU ACKNOWLEDGE THAT:</p>
              
              <p className="font-bold">20.1</p>
              <p className="ml-6">You have read, understood, and agree to be bound by this Privacy Policy in its entirety;</p>
              
              <p className="font-bold">20.2</p>
              <p className="ml-6">You consent to the collection, processing, storage, and disclosure of your personal data as described herein;</p>
              
              <p className="font-bold">20.3</p>
              <p className="ml-6">You understand your rights as a Data Subject under the Ghana Data Protection Act, 2012 (Act 843) and the procedures for exercising such rights;</p>
              
              <p className="font-bold">20.4</p>
              <p className="ml-6">You acknowledge that the Company may amend this Privacy Policy from time to time and agree to review it periodically;</p>
              
              <p className="font-bold">20.5</p>
              <p className="ml-6">You accept the limitations of liability and disclaimers set forth in Article 16;</p>
              
              <p className="font-bold">20.6</p>
              <p className="ml-6">You agree that this Privacy Policy shall be governed by the laws of the Republic of Ghana and subject to the jurisdiction of Ghanaian courts;</p>
              
              <p className="font-bold">20.7</p>
              <p className="ml-6">If you do not agree to this Privacy Policy, you must immediately cease using the Company's Services and contact the Data Protection Officer to request deletion of your personal data.</p>
            </div>
          </section>

          {/* Signature Block */}
          <section className="border-4 border-gray-900 p-8 mt-12 bg-gray-50">
            <div className="text-center space-y-6">
              <p className="font-bold text-xl uppercase">Adopted and Published By:</p>
              <p className="font-bold text-2xl">CREATIVE APPROACH GHANA LIMITED</p>
              <div className="my-8 h-24 border-b-2 border-gray-400 flex items-end justify-center pb-2">
                <p className="text-sm text-gray-600">[Authorized Signature]</p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">Name: [INSERT NAME OF DIRECTOR/OFFICER]</p>
                <p className="font-semibold">Title: [INSERT TITLE]</p>
                <p className="font-semibold">Date: November 9, 2025</p>
              </div>
              <div className="mt-8 pt-8 border-t-2 border-gray-400">
                <p className="text-sm text-gray-700">
                  This document constitutes a legal instrument and should be retained for official records.
                  For questions or concerns, contact our Data Protection Officer at privacy@creativeapproach.com.gh
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};
