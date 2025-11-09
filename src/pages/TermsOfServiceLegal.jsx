import React from 'react';
import { motion } from 'framer-motion';
import { Scale, FileText } from 'lucide-react';

export const TermsOfService = () => {
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
            Terms of Service Agreement
          </h1>
          <div className="text-center space-y-2 text-gray-800 border-2 border-gray-300 p-6 bg-gray-50">
            <p className="font-bold text-xl uppercase">CREATIVE APPROACH GHANA LIMITED</p>
            <p className="text-sm uppercase tracking-wide">Registered in the Republic of Ghana</p>
            <p className="text-sm">Company Registration No.: [INSERT REGISTRATION NUMBER]</p>
            <p className="text-sm">Ghana Revenue Authority TIN: [INSERT TIN]</p>
            <p className="text-sm">GCAA License No.: [INSERT LICENSE NUMBER]</p>
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
                THIS TERMS OF SERVICE AGREEMENT ("Agreement") is entered into between Creative Approach Ghana Limited, 
                a company duly incorporated and registered under the laws of the Republic of Ghana with Company Registration 
                Number [INSERT NUMBER] ("Company," "we," "us," or "our"), and any individual or entity ("Client," "you," 
                or "your") who engages, contracts with, or otherwise utilizes the services provided by the Company.
              </p>
              <p className="font-semibold">
                WHEREAS the Company operates unmanned aerial vehicle (UAV) services including but not limited to aerial 
                photography, videography, surveying, mapping, inspection, and related geospatial and visual media services 
                in strict compliance with the laws of the Republic of Ghana;
              </p>
              <p className="font-semibold">
                AND WHEREAS the Company holds all requisite licenses, permits, and authorizations from the Ghana Civil 
                Aviation Authority (GCAA) as mandated under the Civil Aviation Act, 2020 (Act 1042) and related regulations;
              </p>
              <p className="font-semibold">
                NOW THEREFORE, in consideration of the mutual covenants, terms, and conditions set forth herein, and for 
                other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the 
                parties agree as follows:
              </p>
            </div>
          </section>

          {/* Article 1 */}
          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 tracking-wide border-b-2 border-gray-900 pb-2">
              ARTICLE 1: ACCEPTANCE OF TERMS
            </h2>
            <div className="space-y-3 ml-6">
              <p><span className="font-bold">1.1 Binding Agreement:</span> By accessing the Company's website, submitting a quotation request, executing a service contract, making a payment, or otherwise engaging the Company's services, you expressly acknowledge that you have read, understood, and agree to be legally bound by all terms and conditions contained in this Agreement.</p>
              
              <p><span className="font-bold">1.2 Legal Capacity:</span> You represent and warrant that you possess the legal capacity and authority to enter into this Agreement. If you are entering into this Agreement on behalf of an organization, you represent and warrant that you have the authority to bind such organization to these terms.</p>
              
              <p><span className="font-bold">1.3 Age Requirement:</span> The Services are available only to individuals who are at least eighteen (18) years of age or who have attained the age of majority in their jurisdiction of residence. Minors must have parental or guardian consent to engage the Company's services.</p>
              
              <p><span className="font-bold">1.4 Modification of Terms:</span> The Company reserves the right to modify, amend, or update this Agreement at any time without prior notice. Material changes shall be communicated via email or prominent website notice. Continued use of the Services following such modifications constitutes acceptance of the revised terms.</p>
              
              <p><span className="font-bold">1.5 Entire Agreement:</span> This Agreement, together with any service-specific contracts, quotations, and the Company's Privacy Policy, constitutes the entire agreement between the parties and supersedes all prior negotiations, understandings, or agreements, whether written or oral.</p>
            </div>
          </section>

          {/* Article 2 */}
          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 tracking-wide border-b-2 border-gray-900 pb-2">
              ARTICLE 2: DEFINITIONS
            </h2>
            <div className="space-y-3 ml-6">
              <p><span className="font-bold">2.1 "Services"</span> shall mean all unmanned aerial vehicle operations, geospatial services, visual media production, and related services provided by the Company, including but not limited to:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Aerial photography and videography;</li>
                <li>Thermal and visual inspection services;</li>
                <li>Surveying, mapping, and photogrammetry;</li>
                <li>Topographic surveys and orthomosaic generation;</li>
                <li>3D modeling and LiDAR scanning;</li>
                <li>Real estate photography and marketing materials;</li>
                <li>Construction progress monitoring and documentation;</li>
                <li>Agricultural monitoring and precision agriculture services;</li>
                <li>Event coverage and documentary production;</li>
                <li>Deliverables including raw footage, edited content, reports, and data products.</li>
              </ul>
              
              <p><span className="font-bold">2.2 "UAV"</span> shall mean unmanned aerial vehicles, commonly referred to as drones, operated by the Company pursuant to GCAA regulations.</p>
              
              <p><span className="font-bold">2.3 "Client"</span> shall mean any individual, corporation, partnership, or entity that contracts for or receives Services from the Company.</p>
              
              <p><span className="font-bold">2.4 "Deliverables"</span> shall mean all work products, outputs, files, reports, images, videos, data, and materials produced by the Company as specified in the service agreement or quotation.</p>
              
              <p><span className="font-bold">2.5 "Force Majeure"</span> shall mean events beyond the reasonable control of the Company including but not limited to acts of God, natural disasters, war, civil unrest, terrorism, government action, pandemics, strikes, power failures, equipment malfunctions, and adverse weather conditions.</p>
              
              <p><span className="font-bold">2.6 "Intellectual Property"</span> shall mean all copyrights, trademarks, patents, trade secrets, moral rights, and other proprietary rights in the Deliverables and materials produced by the Company.</p>
            </div>
          </section>

          {/* Article 3 */}
          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 tracking-wide border-b-2 border-gray-900 pb-2">
              ARTICLE 3: REGULATORY COMPLIANCE AND LICENSING
            </h2>
            <div className="space-y-3 ml-6">
              <p><span className="font-bold">3.1 GCAA Compliance:</span> The Company is duly licensed by the Ghana Civil Aviation Authority (GCAA) and operates in full compliance with the Civil Aviation Act, 2020 (Act 1042), GCAA regulations, and all applicable aviation safety standards.</p>
              
              <p><span className="font-bold">3.2 Pilot Qualifications:</span> All UAV operations are conducted by Remote Pilot License (RPL) holders who have successfully completed GCAA-mandated training, examinations, and medical assessments. The Company maintains current and valid licenses for all pilots.</p>
              
              <p><span className="font-bold">3.3 Operational Limitations:</span> UAV operations are subject to the following regulatory restrictions:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Visual Line of Sight (VLOS) operations within 500 meters horizontal and 400 feet vertical limits;</li>
                <li>Daylight operations only, unless specifically authorized for night operations;</li>
                <li>Minimum distance of 50 meters from uninvolved persons;</li>
                <li>Prohibited operations over crowds exceeding 12 persons;</li>
                <li>Restricted flight zones including airports (5km radius), government installations, military facilities;</li>
                <li>Compliance with airspace classifications and altitude restrictions;</li>
                <li>Weather minima including visibility, wind speed, and precipitation limits.</li>
              </ul>
              
              <p><span className="font-bold">3.4 Flight Authorization:</span> For operations in controlled airspace, restricted zones, or exceeding standard limitations, the Company shall obtain advance authorization from GCAA. Clients acknowledge that such authorizations may cause delays and are not guaranteed.</p>
              
              <p><span className="font-bold">3.5 Safety Management:</span> The Company maintains a comprehensive Safety Management System (SMS) including pre-flight checks, risk assessments, emergency procedures, and incident reporting protocols in accordance with ICAO standards.</p>
              
              <p><span className="font-bold">3.6 Equipment Airworthiness:</span> All UAV equipment is maintained in airworthy condition, subjected to regular inspections, and replaced or serviced according to manufacturer specifications and GCAA requirements.</p>
              
              <p><span className="font-bold">3.7 Client Obligations:</span> Clients shall:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Provide accurate location information and site access;</li>
                <li>Disclose any known hazards, obstacles, or airspace restrictions;</li>
                <li>Obtain necessary permissions from property owners and affected parties;</li>
                <li>Ensure compliance with local bylaws and regulations;</li>
                <li>Not request operations that violate GCAA regulations or Ghanaian law.</li>
              </ul>
            </div>
          </section>

          {/* Article 4 */}
          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 tracking-wide border-b-2 border-gray-900 pb-2">
              ARTICLE 4: QUOTATIONS, PRICING, AND PAYMENT TERMS
            </h2>
            <div className="space-y-3 ml-6">
              <p><span className="font-bold">4.1 Quotations:</span> All quotations provided by the Company are:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Valid for thirty (30) days from the date of issuance unless otherwise specified;</li>
                <li>Based on information provided by the Client and subject to site inspection;</li>
                <li>Exclusive of Value Added Tax (VAT) at the prevailing rate of fifteen percent (15%) unless stated otherwise;</li>
                <li>Denominated in Ghana Cedis (GHS) unless alternative currency is agreed;</li>
                <li>Subject to adjustment for material changes in scope, location, or Client requirements.</li>
              </ul>
              
              <p><span className="font-bold">4.2 Payment Structure:</span></p>
              <div className="ml-6 space-y-2">
                <p><span className="font-bold">4.2.1 Deposit:</span> A non-refundable deposit of fifty percent (50%) of the total project cost is required to confirm booking and commence planning. No booking is confirmed until deposit payment is received.</p>
                
                <p><span className="font-bold">4.2.2 Balance Payment:</span> The remaining fifty percent (50%) balance is due upon project completion and prior to delivery of Deliverables. The Company reserves the right to withhold Deliverables until full payment is received.</p>
                
                <p><span className="font-bold">4.2.3 Corporate Accounts:</span> Established corporate clients may apply for Net 30 credit terms subject to credit approval, financial references, and execution of a credit agreement. Late payments shall incur interest at two percent (2%) per month or the maximum rate permitted by law, whichever is less.</p>
              </div>
              
              <p><span className="font-bold">4.3 Additional Costs:</span> The following costs may be charged separately or added to quotations:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Travel expenses for projects beyond 50km from the Company's base of operations;</li>
                <li>Accommodation and per diem for multi-day projects;</li>
                <li>GCAA permit application fees and regulatory compliance costs;</li>
                <li>Rush service premiums for expedited delivery (25-50% surcharge);</li>
                <li>Revision fees for changes exceeding two (2) rounds of revisions;</li>
                <li>Re-shoot costs resulting from Client-caused cancellations or scope changes;</li>
                <li>Extended data retention beyond standard ninety (90) day period.</li>
              </ul>
              
              <p><span className="font-bold">4.4 Payment Methods:</span> The Company accepts the following payment methods:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Mobile money transfers (MTN Mobile Money, Vodafone Cash, AirtelTigo Money);</li>
                <li>Bank transfers to designated Company accounts;</li>
                <li>Cheques payable to "Creative Approach Ghana Limited" (subject to clearance);</li>
                <li>Credit/debit card payments (subject to processing fees);</li>
                <li>Cash payments at the Company's registered office (with official receipt).</li>
              </ul>
              
              <p><span className="font-bold">4.5 Taxes and Withholding:</span></p>
              <ul className="list-disc ml-12 space-y-1">
                <li>All prices are exclusive of VAT at fifteen percent (15%) unless stated otherwise;</li>
                <li>Withholding tax may be deducted by corporate/government Clients as required by law;</li>
                <li>Clients deducting withholding tax must provide official withholding certificates;</li>
                <li>The Company shall issue tax invoices for all transactions in compliance with GRA requirements.</li>
              </ul>
              
              <p><span className="font-bold">4.6 Currency and Exchange Rates:</span> While quotations are typically in Ghana Cedis (GHS), international clients may request invoicing in USD or EUR. Exchange rate fluctuations exceeding five percent (5%) between quotation and payment dates may result in price adjustments.</p>
              
              <p><span className="font-bold">4.7 Non-Payment Consequences:</span> Failure to make timely payments shall entitle the Company to:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Suspend or terminate Services immediately;</li>
                <li>Withhold Deliverables until full payment is received;</li>
                <li>Charge late payment interest and collection costs;</li>
                <li>Report non-payment to credit bureaus where applicable;</li>
                <li>Pursue legal remedies including debt collection and litigation;</li>
                <li>Retain and license Deliverables for Company marketing purposes.</li>
              </ul>
            </div>
          </section>

          {/* Article 5 */}
          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 tracking-wide border-b-2 border-gray-900 pb-2">
              ARTICLE 5: BOOKING, SCHEDULING, AND CANCELLATION
            </h2>
            <div className="space-y-3 ml-6">
              <p><span className="font-bold">5.1 Lead Time:</span> Clients are required to provide minimum notice as follows:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Standard projects: Five (5) business days;</li>
                <li>Complex surveying/mapping projects: Ten (10) business days;</li>
                <li>Projects requiring GCAA permits: Twenty (20) business days;</li>
                <li>Rush services available subject to availability and premium charges.</li>
              </ul>
              
              <p><span className="font-bold">5.2 Scheduling:</span> The Company shall make reasonable efforts to accommodate Client-preferred dates, however, scheduling is subject to:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Equipment and pilot availability;</li>
                <li>Weather conditions suitable for safe UAV operations;</li>
                <li>Regulatory approvals and airspace availability;</li>
                <li>Competing bookings and operational priorities.</li>
              </ul>
              
              <p><span className="font-bold">5.3 Client Cancellation:</span></p>
              <div className="ml-6 space-y-2">
                <p><span className="font-bold">5.3.1</span> Cancellations more than seven (7) days before scheduled operation: Fifty percent (50%) deposit retained.</p>
                <p><span className="font-bold">5.3.2</span> Cancellations three (3) to seven (7) days before scheduled operation: Seventy-five percent (75%) of total cost charged.</p>
                <p><span className="font-bold">5.3.3</span> Cancellations less than three (3) days or no-shows: One hundred percent (100%) of total cost charged.</p>
                <p><span className="font-bold">5.3.4</span> Cancellations due to Client emergencies may be rescheduled once without penalty at the Company's discretion.</p>
              </div>
              
              <p><span className="font-bold">5.4 Company Cancellation:</span> The Company may cancel or reschedule operations due to:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Unsafe weather conditions (high winds, rain, fog, thunderstorms);</li>
                <li>Equipment malfunction or unserviceable UAVs;</li>
                <li>Pilot illness or unavailability;</li>
                <li>Regulatory restrictions or airspace closures;</li>
                <li>Site access issues or safety concerns;</li>
                <li>Force Majeure events as defined in Article 11.</li>
              </ul>
              <p className="ml-6">In such cases, the Company shall offer rescheduling without additional charges or, at Client's option, provide a full refund of amounts paid.</p>
              
              <p><span className="font-bold">5.5 Weather Delays:</span> UAV operations are weather-dependent. The Company makes final decisions on flight safety and may delay operations until conditions improve. Standby time due to weather delays may be charged at fifty percent (50%) of the hourly rate.</p>
              
              <p><span className="font-bold">5.6 Rescheduling:</span> Clients may request rescheduling with minimum forty-eight (48) hours notice without penalty. Short-notice rescheduling requests may incur fees at the Company's discretion.</p>
            </div>
          </section>

          {/* Article 6 */}
          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 tracking-wide border-b-2 border-gray-900 pb-2">
              ARTICLE 6: DELIVERABLES AND TIMELINES
            </h2>
            <div className="space-y-3 ml-6">
              <p><span className="font-bold">6.1 Standard Delivery Timelines:</span> Unless otherwise specified in the service agreement, the following timelines apply from the date of operation:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Raw aerial footage/images: Twenty-four (24) to forty-eight (48) hours;</li>
                <li>Basic edited photographs: Three (3) to five (5) business days;</li>
                <li>Edited videos (up to 3 minutes): Seven (7) to fourteen (14) business days;</li>
                <li>Survey reports and orthomosaic maps: Ten (10) to twenty (20) business days;</li>
                <li>3D models and complex data products: Fourteen (14) to thirty (30) business days;</li>
                <li>Rush delivery available for additional fees (50-100% surcharge).</li>
              </ul>
              
              <p><span className="font-bold">6.2 Delivery Methods:</span> Deliverables shall be provided via:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Secure download links (WeTransfer, Dropbox, Google Drive) with seven (7) day availability;</li>
                <li>Cloud storage links for extended access (upon request);</li>
                <li>Physical media (USB drives, hard drives) for additional fees;</li>
                <li>Direct upload to Client-specified platforms (additional charges may apply).</li>
              </ul>
              
              <p><span className="font-bold">6.3 File Formats:</span> Deliverables shall be provided in industry-standard formats:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Images: JPEG (high resolution), RAW formats (DNG, CR2) upon request;</li>
                <li>Videos: MP4 (H.264/H.265), MOV, or Client-specified format;</li>
                <li>Survey data: GeoTIFF, LAS, LAZ, DXF, SHP, KML formats;</li>
                <li>3D models: OBJ, FBX, PLY, or Client-specified format;</li>
                <li>Reports: PDF with embedded images and data.</li>
              </ul>
              
              <p><span className="font-bold">6.4 Revisions and Amendments:</span></p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Two (2) rounds of minor revisions included in base price;</li>
                <li>Revisions must be requested within seven (7) days of initial delivery;</li>
                <li>Additional revisions charged at GHS [INSERT RATE] per hour;</li>
                <li>Major scope changes require new quotation;</li>
                <li>Re-shoots due to Client dissatisfaction charged separately.</li>
              </ul>
              
              <p><span className="font-bold">6.5 Data Backup and Retention:</span></p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Raw footage archived for thirty (30) days post-delivery at no charge;</li>
                <li>Extended retention (90 days) available for additional fees;</li>
                <li>Long-term archival services available upon request;</li>
                <li>Clients responsible for backing up downloaded Deliverables;</li>
                <li>Company not liable for data loss after retention period expires.</li>
              </ul>
              
              <p><span className="font-bold">6.6 Acceptance:</span> Deliverables shall be deemed accepted unless Client provides written objections within seven (7) days of delivery, specifying deficiencies with reasonable particularity.</p>
            </div>
          </section>

          {/* Article 7 */}
          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 tracking-wide border-b-2 border-gray-900 pb-2">
              ARTICLE 7: INTELLECTUAL PROPERTY RIGHTS
            </h2>
            <div className="space-y-3 ml-6">
              <p><span className="font-bold">7.1 Copyright Ownership:</span> Upon full payment of all amounts due, the Company grants to the Client the following rights in the Deliverables:</p>
              
              <p><span className="font-bold">7.2 License Grant:</span> Subject to full payment, Client receives a perpetual, non-exclusive, worldwide license to use, reproduce, display, and distribute the Deliverables for the following purposes:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Internal business operations and documentation;</li>
                <li>Marketing, advertising, and promotional materials;</li>
                <li>Website, social media, and digital marketing;</li>
                <li>Print publications, brochures, and presentations;</li>
                <li>Property listings and real estate marketing;</li>
                <li>Project reporting and stakeholder communications;</li>
                <li>Any lawful purpose related to Client's business operations.</li>
              </ul>
              
              <p><span className="font-bold">7.3 Company Retention of Rights:</span> Notwithstanding the license granted above, the Company retains:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Copyright ownership in all Deliverables and underlying creative elements;</li>
                <li>Right to use Deliverables in Company portfolio, website, and marketing materials;</li>
                <li>Right to display Deliverables at exhibitions, competitions, and professional events;</li>
                <li>Right to license Deliverables to stock photography/video libraries;</li>
                <li>Right to create derivative works for Company promotional purposes;</li>
                <li>Moral rights to be identified as creator and object to derogatory treatment.</li>
              </ul>
              
              <p><span className="font-bold">7.4 Exclusive Rights:</span> Clients requiring exclusive rights must:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Request exclusivity in writing prior to project commencement;</li>
                <li>Pay exclusivity premium of 100-300% depending on scope;</li>
                <li>Execute separate licensing agreement specifying exclusivity terms;</li>
                <li>Acknowledge that exclusivity applies only to specific Deliverables, not locations.</li>
              </ul>
              
              <p><span className="font-bold">7.5 Attribution:</span> Where Deliverables are published, displayed, or broadcast, Client shall provide credit to "Creative Approach Ghana Limited" where practicable and customary in the medium. Failure to provide attribution does not constitute breach unless exclusive rights agreement requires attribution.</p>
              
              <p><span className="font-bold">7.6 Prohibited Uses:</span> Client shall not:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Remove, alter, or obscure Company watermarks, metadata, or copyright notices;</li>
                <li>Sub-license, sell, or transfer Deliverables to third parties for commercial gain;</li>
                <li>Use Deliverables in defamatory, pornographic, or unlawful contexts;</li>
                <li>Claim authorship or ownership of copyright in Deliverables;</li>
                <li>Reverse engineer, decompile, or extract source data without permission;</li>
                <li>Use Deliverables in ways that disparage or harm the Company's reputation.</li>
              </ul>
              
              <p><span className="font-bold">7.7 Third-Party Rights:</span> Client acknowledges that Deliverables may incidentally capture third-party properties, trademarks, or copyrighted works. Client assumes responsibility for obtaining necessary releases or permissions for commercial use of such elements.</p>
              
              <p><span className="font-bold">7.8 Model and Property Releases:</span> Client is responsible for obtaining signed model releases from identifiable individuals and property releases from property owners where Deliverables are used for commercial advertising purposes. The Company does not provide release services unless specifically contracted.</p>
            </div>
          </section>

          {/* Article 8 */}
          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 tracking-wide border-b-2 border-gray-900 pb-2">
              ARTICLE 8: LIABILITY, INSURANCE, AND INDEMNIFICATION
            </h2>
            <div className="space-y-3 ml-6">
              <p><span className="font-bold">8.1 Insurance Coverage:</span> The Company maintains the following insurance policies:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Third-Party Liability Insurance: Minimum coverage of GHS 1,000,000 per occurrence;</li>
                <li>Hull Insurance: Covering UAV equipment damage or loss;</li>
                <li>Professional Indemnity Insurance: Covering errors and omissions;</li>
                <li>Public Liability Insurance: Covering bodily injury and property damage;</li>
                <li>All policies issued by licensed insurers and compliant with GCAA requirements.</li>
              </ul>
              
              <p><span className="font-bold">8.2 Limitation of Liability:</span> To the maximum extent permitted by Ghanaian law:</p>
              <div className="ml-6 space-y-2">
                <p><span className="font-bold">8.2.1</span> The Company's total aggregate liability for any claim arising from or related to the Services, whether in contract, tort, negligence, strict liability, or otherwise, shall not exceed the total amount paid by the Client for the specific project giving rise to the claim.</p>
                
                <p><span className="font-bold">8.2.2</span> In no event shall the Company be liable for indirect, incidental, consequential, special, exemplary, or punitive damages including but not limited to:</p>
                <ul className="list-disc ml-12 space-y-1">
                  <li>Loss of profits, revenue, business opportunities, or goodwill;</li>
                  <li>Business interruption or loss of data;</li>
                  <li>Cost of substitute services or procurement;</li>
                  <li>Emotional distress or reputational harm;</li>
                  <li>Claims by third parties;</li>
                  <li>Any damages exceeding the fees paid for the Services.</li>
                </ul>
              </div>
              
              <p><span className="font-bold">8.3 Exclusions from Liability:</span> The Company shall not be liable for:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Delays or failures caused by weather conditions, Force Majeure events, or regulatory restrictions;</li>
                <li>Client-caused delays, incomplete information, or failure to meet obligations;</li>
                <li>Third-party service provider failures (hosting, payment processors, etc.);</li>
                <li>Losses resulting from Client's use or misuse of Deliverables;</li>
                <li>Claims arising from Client's failure to obtain necessary releases or permissions;</li>
                <li>Equipment malfunctions that occur despite proper maintenance;</li>
                <li>Unauthorized access, hacking, or cyber attacks affecting data security;</li>
                <li>Acts or omissions of Client personnel, contractors, or agents.</li>
              </ul>
              
              <p><span className="font-bold">8.4 Client Indemnification:</span> Client agrees to indemnify, defend, and hold harmless the Company, its directors, officers, employees, agents, and contractors from and against any and all claims, liabilities, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising from or related to:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Client's breach of this Agreement or violation of applicable laws;</li>
                <li>Client's use or misuse of Deliverables;</li>
                <li>Infringement of third-party intellectual property rights;</li>
                <li>Claims by third parties related to operations on Client's property;</li>
                <li>Client's failure to obtain necessary permissions, releases, or authorizations;</li>
                <li>Inaccurate or misleading information provided by Client;</li>
                <li>Client's negligence, willful misconduct, or illegal activities.</li>
              </ul>
              
              <p><span className="font-bold">8.5 Safety and Risk Acknowledgment:</span> Client acknowledges that UAV operations involve inherent risks including but not limited to equipment failure, adverse weather, and human error. Client assumes these risks and agrees that the Company shall not be liable for damages except in cases of gross negligence or willful misconduct.</p>
              
              <p><span className="font-bold">8.6 Property Damage:</span> While the Company exercises utmost care, Client acknowledges minimal risk of property damage during operations. The Company's liability for property damage is limited to the lesser of:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Actual repair or replacement cost; or</li>
                <li>GHS 50,000 per incident; or</li>
                <li>Insurance policy limits.</li>
              </ul>
              
              <p><span className="font-bold">8.7 Survival:</span> The limitations of liability and indemnification obligations shall survive termination or expiration of this Agreement.</p>
            </div>
          </section>

          {/* Article 9 */}
          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 tracking-wide border-b-2 border-gray-900 pb-2">
              ARTICLE 9: WARRANTIES AND DISCLAIMERS
            </h2>
            <div className="space-y-3 ml-6">
              <p><span className="font-bold">9.1 Company Warranties:</span> The Company warrants that:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Services shall be performed in a professional and workmanlike manner consistent with industry standards;</li>
                <li>All pilots possess valid GCAA Remote Pilot Licenses and medical certificates;</li>
                <li>UAV equipment is maintained in airworthy condition and compliant with GCAA regulations;</li>
                <li>Operations shall comply with all applicable Ghanaian laws and regulations;</li>
                <li>Deliverables shall be of satisfactory quality and reasonably fit for intended purposes;</li>
                <li>The Company owns or has license to use all intellectual property incorporated in Deliverables;</li>
                <li>Services shall be free from material defects for thirty (30) days post-delivery.</li>
              </ul>
              
              <p><span className="font-bold">9.2 Technical Limitations:</span> Client acknowledges the following technical limitations:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Image and video quality dependent on weather, lighting, and atmospheric conditions;</li>
                <li>Accuracy of survey data subject to GPS precision (±3-5cm typical);</li>
                <li>Thermal imaging affected by ambient temperature and surface emissivity;</li>
                <li>LiDAR penetration limited by vegetation density and canopy cover;</li>
                <li>Battery life constraints limiting flight duration (20-30 minutes typical);</li>
                <li>Wind and weather conditions affecting operational capability;</li>
                <li>Regulatory restrictions limiting operational flexibility.</li>
              </ul>
              
              <p><span className="font-bold">9.3 Disclaimer of Warranties:</span> EXCEPT AS EXPRESSLY SET FORTH IN SECTION 9.1, THE COMPANY PROVIDES SERVICES "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE. THE COMPANY SPECIFICALLY DISCLAIMS ALL IMPLIED WARRANTIES INCLUDING:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>WARRANTIES OF MERCHANTABILITY;</li>
                <li>WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE;</li>
                <li>WARRANTIES OF NON-INFRINGEMENT;</li>
                <li>WARRANTIES ARISING FROM COURSE OF DEALING OR USAGE OF TRADE;</li>
                <li>WARRANTIES REGARDING UNINTERRUPTED OR ERROR-FREE SERVICES;</li>
                <li>WARRANTIES REGARDING ACCURACY, COMPLETENESS, OR RELIABILITY OF DELIVERABLES.</li>
              </ul>
              
              <p><span className="font-bold">9.4 No Guarantee of Results:</span> The Company makes no guarantee that Services will meet Client's subjective expectations or achieve specific outcomes. The Company's obligation is to perform Services professionally, not to guarantee particular results.</p>
              
              <p><span className="font-bold">9.5 Third-Party Services:</span> The Company disclaims all liability for third-party services, platforms, or products used in conjunction with Services, including but not limited to cloud storage, payment processors, and software applications.</p>
              
              <p><span className="font-bold">9.6 Remedy for Breach of Warranty:</span> Client's sole and exclusive remedy for breach of warranty under Section 9.1 is, at the Company's option:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Re-performance of defective Services at no additional charge; or</li>
                <li>Refund of fees paid for defective Services.</li>
              </ul>
            </div>
          </section>

          {/* Article 10 */}
          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 tracking-wide border-b-2 border-gray-900 pb-2">
              ARTICLE 10: PROHIBITED USES AND CLIENT CONDUCT
            </h2>
            <div className="space-y-3 ml-6">
              <p><span className="font-bold">10.1 Prohibited Activities:</span> Client shall not request or use Services for any unlawful, unethical, or prohibited purposes including but not limited to:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Surveillance of individuals without consent or lawful authority;</li>
                <li>Invasion of privacy, stalking, harassment, or intimidation;</li>
                <li>Espionage, intelligence gathering, or military/paramilitary activities;</li>
                <li>Trespass on private property without authorization;</li>
                <li>Interference with emergency response operations;</li>
                <li>Operations near prisons, police stations, or sensitive government facilities;</li>
                <li>Smuggling, trafficking, or other criminal activities;</li>
                <li>Environmental damage or wildlife harassment;</li>
                <li>Violation of airspace restrictions, No-Fly Zones, or GCAA regulations;</li>
                <li>Defamation, libel, or reputational harm to third parties;</li>
                <li>Creation of pornographic, obscene, or offensive content;</li>
                <li>Intellectual property infringement or misappropriation of trade secrets.</li>
              </ul>
              
              <p><span className="font-bold">10.2 Compliance with Laws:</span> Client warrants that all requests for Services comply with applicable laws including but not limited to:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Ghana Data Protection Act, 2012 (Act 843);</li>
                <li>Civil Aviation Act, 2020 (Act 1042);</li>
                <li>Criminal Offences Act, 1960 (Act 29);</li>
                <li>Copyright Act, 2005 (Act 690);</li>
                <li>Local government bylaws and property regulations.</li>
              </ul>
              
              <p><span className="font-bold">10.3 Right to Refuse Service:</span> The Company reserves the absolute right to refuse, suspend, or terminate Services if:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Requested activities appear unlawful, unethical, or prohibited;</li>
                <li>Client fails to provide necessary authorizations or documentation;</li>
                <li>Operations pose unacceptable safety or reputational risks;</li>
                <li>Client breaches this Agreement or behaves inappropriately;</li>
                <li>Client provides false, misleading, or incomplete information;</li>
                <li>Regulatory authorities prohibit or restrict requested operations.</li>
              </ul>
              
              <p><span className="font-bold">10.4 Site Conduct:</span> During on-site operations, Client and Client personnel shall:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Maintain safe distance from UAV operations (minimum 10 meters);</li>
                <li>Not interfere with pilot operations or distract pilot in command;</li>
                <li>Follow all safety instructions provided by Company personnel;</li>
                <li>Not touch, operate, or manipulate Company equipment without permission;</li>
                <li>Disclose all site hazards, obstacles, and safety concerns;</li>
                <li>Provide safe and unobstructed access to operational areas;</li>
                <li>Evacuate areas as directed for safety reasons.</li>
              </ul>
              
              <p><span className="font-bold">10.5 Consequences of Violations:</span> Violation of prohibited uses shall result in:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Immediate termination of Services without refund;</li>
                <li>Forfeiture of all Deliverables and rights thereto;</li>
                <li>Reporting to law enforcement and regulatory authorities;</li>
                <li>Pursuit of legal remedies including injunctive relief and damages;</li>
                <li>Blacklisting from future Services.</li>
              </ul>
            </div>
          </section>

          {/* Article 11 */}
          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 tracking-wide border-b-2 border-gray-900 pb-2">
              ARTICLE 11: FORCE MAJEURE
            </h2>
            <div className="space-y-3 ml-6">
              <p><span className="font-bold">11.1 Definition:</span> "Force Majeure" means any event or circumstance beyond the reasonable control of the Company that prevents or delays performance of this Agreement, including but not limited to:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Acts of God, natural disasters, earthquakes, floods, storms, hurricanes;</li>
                <li>Fire, explosion, epidemic, pandemic, quarantine, public health emergency;</li>
                <li>War, invasion, terrorism, civil unrest, riot, insurrection, revolution;</li>
                <li>Government action, embargo, regulatory prohibition, airspace closure;</li>
                <li>Labor disputes, strikes, lockouts (excluding Company employees);</li>
                <li>Power failures, telecommunications failures, internet outages;</li>
                <li>Severe weather unsuitable for UAV operations;</li>
                <li>Equipment malfunction despite proper maintenance;</li>
                <li>Supplier or subcontractor failures;</li>
                <li>Acts or omissions of third parties;</li>
                <li>Any other cause beyond the Company's reasonable control.</li>
              </ul>
              
              <p><span className="font-bold">11.2 Effect of Force Majeure:</span> Upon occurrence of a Force Majeure event:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>The Company shall be excused from performance of affected obligations;</li>
                <li>Performance deadlines shall be extended by the duration of the Force Majeure event;</li>
                <li>The Company shall not be liable for delays, non-performance, or damages resulting from Force Majeure;</li>
                <li>The Company shall use reasonable efforts to mitigate effects and resume performance;</li>
                <li>Client remains obligated to pay for Services performed prior to Force Majeure event.</li>
              </ul>
              
              <p><span className="font-bold">11.3 Notice:</span> The Company shall provide written notice to Client as soon as practicable after becoming aware of a Force Majeure event, specifying the nature, expected duration, and anticipated impact on Services.</p>
              
              <p><span className="font-bold">11.4 Termination:</span> If a Force Majeure event continues for more than thirty (30) consecutive days, either party may terminate affected Services upon written notice. In such case:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Client shall pay for Services performed prior to termination;</li>
                <li>Company shall refund payments for unperformed Services;</li>
                <li>Neither party shall have further obligations or liability.</li>
              </ul>
            </div>
          </section>

          {/* Article 12 */}
          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 tracking-wide border-b-2 border-gray-900 pb-2">
              ARTICLE 12: DISPUTE RESOLUTION
            </h2>
            <div className="space-y-3 ml-6">
              <p><span className="font-bold">12.1 Negotiation:</span> In the event of any dispute, controversy, or claim arising out of or relating to this Agreement, the parties shall first attempt to resolve the matter through good faith negotiations between senior representatives with authority to settle.</p>
              
              <p><span className="font-bold">12.2 Mediation:</span> If negotiations fail to resolve the dispute within fourteen (14) days, the parties agree to submit the matter to mediation administered by a mutually agreed mediator or mediation service in Accra, Ghana. The costs of mediation shall be borne equally by the parties.</p>
              
              <p><span className="font-bold">12.3 Arbitration:</span> If mediation fails to resolve the dispute within thirty (30) days, disputes exceeding GHS 10,000 in value shall be finally resolved by arbitration in accordance with the Ghana Arbitration Act, 2010 (Act 798) and the following provisions:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Seat of Arbitration: Accra, Ghana;</li>
                <li>Number of Arbitrators: One (1) arbitrator mutually agreed, or failing agreement, appointed by the Ghana Arbitration Centre;</li>
                <li>Language: English;</li>
                <li>Governing Law: Laws of the Republic of Ghana;</li>
                <li>Arbitral Award: Final, binding, and enforceable in any court of competent jurisdiction;</li>
                <li>Costs: Arbitrator shall determine allocation of costs and attorneys' fees;</li>
                <li>Confidentiality: Arbitration proceedings and awards shall be confidential.</li>
              </ul>
              
              <p><span className="font-bold">12.4 Litigation:</span> Disputes not exceeding GHS 10,000 or where arbitration is not elected may be brought before the courts of the Republic of Ghana, with the High Court of Justice (Accra) having primary jurisdiction.</p>
              
              <p><span className="font-bold">12.5 Injunctive Relief:</span> Notwithstanding the above, either party may seek injunctive relief, specific performance, or other equitable remedies in court for:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Intellectual property infringement;</li>
                <li>Breach of confidentiality obligations;</li>
                <li>Urgent matters requiring immediate relief;</li>
                <li>Enforcement of arbitral awards.</li>
              </ul>
              
              <p><span className="font-bold">12.6 Continuation of Services:</span> Except where Services are terminated or suspended in accordance with this Agreement, the parties shall continue performing their respective obligations during dispute resolution.</p>
              
              <p><span className="font-bold">12.7 Limitation Period:</span> No action or proceeding arising from this Agreement may be commenced more than two (2) years after the cause of action accrues.</p>
            </div>
          </section>

          {/* Article 13 */}
          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 tracking-wide border-b-2 border-gray-900 pb-2">
              ARTICLE 13: TERMINATION
            </h2>
            <div className="space-y-3 ml-6">
              <p><span className="font-bold">13.1 Termination for Convenience:</span> Either party may terminate this Agreement:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Prior to commencement of Services upon written notice, subject to cancellation fees;</li>
                <li>After commencement by mutual written agreement;</li>
                <li>Upon completion and full payment for Services.</li>
              </ul>
              
              <p><span className="font-bold">13.2 Termination for Cause:</span> Either party may terminate this Agreement immediately upon written notice if the other party:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Commits a material breach and fails to cure within fourteen (14) days of written notice;</li>
                <li>Becomes insolvent, bankrupt, or enters receivership or liquidation;</li>
                <li>Engages in fraud, misrepresentation, or illegal conduct;</li>
                <li>Fails to make payments when due (Company termination right only);</li>
                <li>Violates intellectual property rights or confidentiality obligations.</li>
              </ul>
              
              <p><span className="font-bold">13.3 Effect of Termination:</span> Upon termination:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Company shall cease providing Services;</li>
                <li>Client shall pay for all Services performed up to termination date;</li>
                <li>Company shall deliver completed Deliverables upon full payment;</li>
                <li>All outstanding invoices become immediately due and payable;</li>
                <li>Company may retain deposits and fees for Services performed;</li>
                <li>Licenses to use Deliverables may be revoked if payment not received;</li>
                <li>Confidentiality obligations continue post-termination.</li>
              </ul>
              
              <p><span className="font-bold">13.4 Survival:</span> The following provisions shall survive termination: intellectual property rights, payment obligations, confidentiality, limitation of liability, indemnification, dispute resolution, and governing law.</p>
            </div>
          </section>

          {/* Article 14 */}
          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 tracking-wide border-b-2 border-gray-900 pb-2">
              ARTICLE 14: GENERAL PROVISIONS
            </h2>
            <div className="space-y-3 ml-6">
              <p><span className="font-bold">14.1 Assignment:</span> Client may not assign, transfer, or delegate this Agreement or any rights hereunder without prior written consent of the Company. The Company may assign this Agreement to affiliates, successors, or acquirers without consent.</p>
              
              <p><span className="font-bold">14.2 No Waiver:</span> Failure to enforce any provision of this Agreement shall not constitute a waiver of that or any other provision. Waiver must be in writing and signed by the waiving party.</p>
              
              <p><span className="font-bold">14.3 Severability:</span> If any provision is found invalid or unenforceable, the remaining provisions shall continue in full force and effect, and the invalid provision shall be reformed to the maximum extent permitted by law.</p>
              
              <p><span className="font-bold">14.4 Notices:</span> All notices shall be in writing and delivered to:</p>
              <div className="ml-6 bg-gray-50 border-2 border-gray-300 p-4 my-3">
                <p className="font-bold">For the Company:</p>
                <p>Creative Approach Ghana Limited</p>
                <p>Attention: Legal Department</p>
                <p>Address: [INSERT ADDRESS]</p>
                <p>Email: legal@creativeapproach.com.gh</p>
                <p className="mt-3 font-bold">For the Client:</p>
                <p>To the address provided in the service agreement or quotation</p>
              </div>
              <p className="ml-6">Notices shall be deemed received: (i) when personally delivered; (ii) three (3) business days after mailing by registered post; (iii) upon confirmation of email delivery.</p>
              
              <p><span className="font-bold">14.5 Relationship of Parties:</span> The parties are independent contractors. This Agreement does not create partnership, joint venture, employment, agency, or franchise relationship.</p>
              
              <p><span className="font-bold">14.6 Confidentiality:</span> Both parties agree to maintain confidentiality of proprietary information, trade secrets, and non-public information disclosed during the relationship, except as required by law.</p>
              
              <p><span className="font-bold">14.7 Headings:</span> Section headings are for convenience only and shall not affect interpretation.</p>
              
              <p><span className="font-bold">14.8 Counterparts:</span> This Agreement may be executed in counterparts, each deemed an original, and electronic signatures shall have same effect as original signatures.</p>
              
              <p><span className="font-bold">14.9 Language:</span> This Agreement is executed in English. Any translation is for convenience only, and the English version shall prevail in case of discrepancy.</p>
              
              <p><span className="font-bold">14.10 Privacy:</span> Collection, use, and protection of personal data is governed by the Company's Privacy Policy, incorporated herein by reference.</p>
            </div>
          </section>

          {/* Article 15 */}
          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 tracking-wide border-b-2 border-gray-900 pb-2">
              ARTICLE 15: GOVERNING LAW AND JURISDICTION
            </h2>
            <div className="space-y-3 ml-6">
              <p><span className="font-bold">15.1 Governing Law:</span> This Agreement shall be governed by and construed in accordance with the laws of the Republic of Ghana, including but not limited to:</p>
              <ul className="list-disc ml-12 space-y-1">
                <li>Civil Aviation Act, 2020 (Act 1042);</li>
                <li>Ghana Data Protection Act, 2012 (Act 843);</li>
                <li>Copyright Act, 2005 (Act 690);</li>
                <li>Companies Act, 2019 (Act 992);</li>
                <li>Ghana Arbitration Act, 2010 (Act 798);</li>
                <li>Electronic Transactions Act, 2008 (Act 772);</li>
                <li>All regulations and guidelines issued by the GCAA and other regulatory bodies.</li>
              </ul>
              
              <p><span className="font-bold">15.2 Jurisdiction:</span> Subject to the dispute resolution provisions in Article 12, the courts of the Republic of Ghana shall have exclusive jurisdiction over all disputes arising from this Agreement, with the High Court of Justice (Accra) having primary jurisdiction.</p>
              
              <p><span className="font-bold">15.3 Venue:</span> Any litigation shall be commenced and maintained exclusively in the courts located in Accra, Ghana, and the parties consent to personal jurisdiction and venue in such courts.</p>
              
              <p><span className="font-bold">15.4 Enforcement of Foreign Judgments:</span> If Client is located outside Ghana, Client consents to enforcement of any judgments or arbitral awards in their jurisdiction and waives any objection to jurisdiction or venue.</p>
            </div>
          </section>

          {/* Acknowledgment */}
          <section className="border-4 border-gray-900 p-8 mt-12 bg-gray-50">
            <h2 className="text-2xl font-bold uppercase text-center mb-6">ACKNOWLEDGMENT AND ACCEPTANCE</h2>
            <div className="space-y-4 text-justify">
              <p className="font-bold uppercase">
                BY EXECUTING A SERVICE AGREEMENT, MAKING A PAYMENT, OR OTHERWISE ENGAGING THE COMPANY'S SERVICES, 
                YOU ACKNOWLEDGE AND AGREE THAT:
              </p>
              
              <div className="space-y-3 ml-6">
                <p><span className="font-bold">1.</span> You have read, understood, and agree to be legally bound by all terms and conditions of this Agreement;</p>
                
                <p><span className="font-bold">2.</span> You have had sufficient opportunity to seek independent legal advice regarding this Agreement;</p>
                
                <p><span className="font-bold">3.</span> You possess the legal capacity and authority to enter into this Agreement;</p>
                
                <p><span className="font-bold">4.</span> All information provided to the Company is accurate, complete, and not misleading;</p>
                
                <p><span className="font-bold">5.</span> You accept all limitations of liability, disclaimers, and exclusions set forth herein;</p>
                
                <p><span className="font-bold">6.</span> You agree to the payment terms, cancellation policies, and intellectual property provisions;</p>
                
                <p><span className="font-bold">7.</span> You consent to the Company's use of Deliverables for portfolio and marketing purposes unless exclusive rights are purchased;</p>
                
                <p><span className="font-bold">8.</span> You agree to resolve disputes through negotiation, mediation, and arbitration as specified;</p>
                
                <p><span className="font-bold">9.</span> This Agreement is governed by the laws of the Republic of Ghana;</p>
                
                <p><span className="font-bold">10.</span> If you do not agree to these terms, you must immediately cease using the Company's Services and notify the Company in writing.</p>
              </div>
            </div>
          </section>

          {/* Signature Block */}
          <section className="border-4 border-gray-900 p-8 mt-8 bg-gray-50">
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
              <div className="mt-8 pt-8 border-t-2 border-gray-400 space-y-3">
                <p className="text-sm font-bold uppercase">For Legal Inquiries:</p>
                <p className="text-sm">Email: legal@creativeapproach.com.gh</p>
                <p className="text-sm">Phone: +233 (0) [INSERT PHONE NUMBER]</p>
                <p className="text-sm text-gray-700 mt-4">
                  This document constitutes a legal instrument and should be retained for official records.
                  Clients are advised to seek independent legal counsel before entering into service agreements.
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};
