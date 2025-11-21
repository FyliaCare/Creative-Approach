import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ChevronDown, Search, MessageCircle, Phone, Mail } from 'lucide-react';

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Questions', icon: '📋' },
    { id: 'general', name: 'General', icon: '💡' },
    { id: 'services', name: 'Services', icon: '🚁' },
    { id: 'pricing', name: 'Pricing & Booking', icon: '💰' },
    { id: 'technical', name: 'Technical', icon: '⚙️' },
    { id: 'legal', name: 'Legal & Safety', icon: '⚖️' },
  ];

  const faqs = [
    // General Questions
    {
      category: 'general',
      question: 'What is Creative Approach Ghana?',
      answer: 'Creative Approach is Ghana\'s premier provider of professional drone services, specializing in aerial photography, videography, mapping, surveying, inspections, and documentary production. Based in Takoradi, we serve clients across all regions of Ghana with cutting-edge drone technology and expert pilots.'
    },
    {
      category: 'general',
      question: 'Where are you located and what areas do you serve?',
      answer: 'Our headquarters is in Takoradi, Western Region, Ghana. However, we provide Ghana-wide services with zero travel expenses to our clients. We can deploy to any location across the country including Greater Accra, Ashanti, Northern, Eastern, Western, Central, Volta, Upper East, Upper West, and all other regions.'
    },
    {
      category: 'general',
      question: 'How quickly can you deploy for a project?',
      answer: 'For standard projects, we typically schedule within 2-5 business days. For emergency response and urgent inspections, we offer same-day or next-day deployment depending on location and availability. Contact us directly for immediate needs.'
    },
    {
      category: 'general',
      question: 'What industries do you serve?',
      answer: 'We serve a wide range of industries including: Real Estate & Property Development, Construction & Infrastructure, Mining & Quarrying, Agriculture & Farming, Energy & Utilities, Media & Entertainment, Tourism & Hospitality, Government & NGOs, Emergency Services, Environmental Conservation, and Corporate Communications.'
    },

    // Services Questions
    {
      category: 'services',
      question: 'What drone services do you offer?',
      answer: 'We offer comprehensive drone services including: 1) Aerial Photography & Videography (4K/8K), 2) Drone Inspection & Monitoring, 3) Mapping, Surveying & 3D Modelling, 4) Documentary Films & Photography, 5) Custom Data Services & Training, and 6) Emergency Response & Surveillance. Each service is fully customizable to your specific needs.'
    },
    {
      category: 'services',
      question: 'Do you provide post-production editing and processing?',
      answer: 'Yes! All our packages include professional post-production services. This includes color grading, video editing, photo retouching, orthomosaic map generation, 3D model creation, data analysis, and detailed reporting. You receive fully polished, ready-to-use deliverables.'
    },
    {
      category: 'services',
      question: 'What is the typical turnaround time for deliverables?',
      answer: 'Turnaround times vary by service: Aerial Photos/Videos: 24-48 hours, Inspection Reports: 2-5 days, Orthomosaic Maps: 3-7 days, 3D Models: 5-10 days, Documentary Production: 2-6 weeks. Rush delivery is available upon request for an additional fee.'
    },
    {
      category: 'services',
      question: 'Can you handle large-scale projects?',
      answer: 'Absolutely! We have experience managing projects of all sizes, from single-property shoots to multi-site campaigns covering hundreds of hectares. Our fleet of drones and experienced team allows us to scale operations efficiently while maintaining quality and consistency.'
    },
    {
      category: 'services',
      question: 'Do you offer training for drone operations?',
      answer: 'Yes, we provide comprehensive drone training programs including: Basic Drone Piloting, Commercial Operations, Data Collection & Processing, Safety & Regulations, and Custom Workflow Integration. Training can be tailored for individuals, teams, or organizations.'
    },

    // Pricing & Booking
    {
      category: 'pricing',
      question: 'How much do your services cost?',
      answer: 'Pricing varies based on project scope, location, duration, and deliverables. Basic aerial photography starts from affordable rates, while complex mapping and 3D modeling projects are quoted individually. Contact us for a free, customized quote tailored to your specific requirements.'
    },
    {
      category: 'pricing',
      question: 'Do you charge travel fees?',
      answer: 'No! We offer Ghana-wide service with zero travel expenses. Whether you\'re in Accra, Kumasi, Tamale, or any remote location, the price remains the same. This is part of our commitment to making professional drone services accessible across Ghana.'
    },
    {
      category: 'pricing',
      question: 'What payment methods do you accept?',
      answer: 'We accept various payment methods including: Bank Transfers (Ghana Commercial Bank, Ecobank, etc.), Mobile Money (MTN, Vodafone, AirtelTigo), Credit/Debit Cards, and Corporate Purchase Orders for registered businesses. Payment terms can be arranged for large projects.'
    },
    {
      category: 'pricing',
      question: 'Do you offer package deals or discounts?',
      answer: 'Yes! We offer discounted rates for: Multi-property packages, Long-term contracts, Recurring services (monthly/quarterly monitoring), Bulk booking, Educational institutions, and Non-profit organizations. Contact us to discuss custom package options.'
    },
    {
      category: 'pricing',
      question: 'How do I book your services?',
      answer: 'Booking is simple: 1) Request a quote through our website, phone, or email, 2) We\'ll discuss your project details and provide a customized quote, 3) Confirm booking and make payment/deposit, 4) We schedule the flight at your preferred date/time, 5) Receive your deliverables within the agreed timeframe.'
    },
    {
      category: 'pricing',
      question: 'What is your cancellation and rescheduling policy?',
      answer: 'We offer flexible rescheduling at no cost if notified at least 24 hours in advance. Weather-related cancellations are rescheduled for free. Cancellations made less than 24 hours before scheduled flight may incur a 25% fee. Emergency situations are handled case-by-case.'
    },

    // Technical Questions
    {
      category: 'technical',
      question: 'What types of drones and cameras do you use?',
      answer: 'We operate a professional fleet including DJI Mavic 3 Enterprise, DJI Phantom 4 RTK, DJI Matrice series, and specialized inspection drones. Our cameras include 4K/8K video capabilities, 20MP+ still cameras, thermal imaging sensors, and multispectral cameras for specialized applications.'
    },
    {
      category: 'technical',
      question: 'What is the maximum area you can map in a single flight?',
      answer: 'Depending on required resolution and terrain, we can typically map: 50-100 hectares per day at high resolution (2-3cm GSD), 200-500 hectares per day at medium resolution (5-10cm GSD). Larger areas are completed over multiple flight sessions with seamless data integration.'
    },
    {
      category: 'technical',
      question: 'What file formats do you deliver?',
      answer: 'We provide deliverables in industry-standard formats: Photos: JPEG, RAW (DNG), TIFF; Videos: MP4, MOV, ProRes; Maps: GeoTIFF, KMZ, SHP; 3D Models: OBJ, LAS, PLY, FBX; Data: CSV, Excel, PDF reports. Custom formats available upon request.'
    },
    {
      category: 'technical',
      question: 'Do you provide georeferenced data?',
      answer: 'Yes! All mapping and surveying deliverables include accurate georeferencing with GPS coordinates. We use RTK/PPK technology for centimeter-level accuracy and provide data with proper coordinate systems (WGS84, UTM, local datums) suitable for GIS integration.'
    },
    {
      category: 'technical',
      question: 'Can you fly in adverse weather conditions?',
      answer: 'Safety is our priority. We monitor weather conditions carefully and can operate in light rain with specialized equipment. However, we postpone flights during heavy rain, strong winds (above 35 km/h), thunderstorms, or poor visibility. Weather-related delays are rescheduled at no extra cost.'
    },
    {
      category: 'technical',
      question: 'What is the maximum altitude and range you can achieve?',
      answer: 'While our drones are capable of flying up to 500 meters altitude and several kilometers range, we operate within Ghana Civil Aviation Authority (GCAA) regulations, typically staying below 120 meters (400 feet) unless special permissions are obtained for specific projects.'
    },

    // Legal & Safety
    {
      category: 'legal',
      question: 'Are you licensed and insured?',
      answer: 'Yes, we are fully licensed by the Ghana Civil Aviation Authority (GCAA) with certified Remote Pilot Licenses (RPL). We carry comprehensive liability insurance covering equipment, third-party damage, and professional indemnity. All certifications available upon request.'
    },
    {
      category: 'legal',
      question: 'Do I need special permits for drone flights?',
      answer: 'For most commercial projects, we handle all necessary permits and authorizations. This includes GCAA flight clearances, local authority permissions, and restricted airspace approvals. We factor permit acquisition time into project timelines and keep you informed throughout.'
    },
    {
      category: 'legal',
      question: 'What safety measures do you implement?',
      answer: 'We maintain strict safety protocols: Pre-flight equipment checks, Site risk assessment, No-fly zone verification, Weather monitoring, Trained spotter assistance, Emergency procedures, Equipment redundancy, and Full compliance with GCAA regulations. Safety is never compromised.'
    },
    {
      category: 'legal',
      question: 'Who owns the rights to the footage and data collected?',
      answer: 'Upon full payment, clients receive full commercial rights to all deliverables for their specified use. We retain raw footage for backup purposes only. For marketing purposes, we may request permission to use selected work in our portfolio. Specific licensing arrangements can be customized.'
    },
    {
      category: 'legal',
      question: 'Do you comply with data protection and privacy laws?',
      answer: 'Yes, we strictly adhere to Ghana\'s Data Protection Act and international best practices. We ensure: Secure data storage and transmission, Privacy considerations during flights, Confidentiality agreements, Limited data retention periods, and Client data ownership. NDAs available for sensitive projects.'
    },
    {
      category: 'legal',
      question: 'Can you fly over private property or restricted areas?',
      answer: 'We can fly over private property with proper authorization from the property owner. For restricted areas (airports, military installations, government buildings), we coordinate with relevant authorities to obtain necessary clearances. Some areas may be permanently restricted.'
    },
  ];

  // Filter FAQs based on category and search
  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <>
      <SEO 
        title="Frequently Asked Questions - Creative Approach Ghana"
        description="Find answers to common questions about our drone services, pricing, booking process, technical specifications, and more. Professional drone solutions across Ghana."
        keywords="drone services FAQ, Ghana drone questions, aerial photography pricing, drone inspection info, mapping services Ghana"
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-drone-600 via-sky-600 to-purple-600 text-white py-20 overflow-hidden">
          <motion.div
            animate={{
              y: [0, -30, 0],
              x: [0, 40, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-10 right-10 w-40 h-40 opacity-20"
          >
            <img src="/drone-animated.svg" alt="Drone" className="w-full h-full filter brightness-150" />
          </motion.div>

          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
                Everything you need to know about our drone services, pricing, and operations
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search for answers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-white/30 shadow-2xl"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex overflow-x-auto py-4 gap-2 scrollbar-hide">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold whitespace-nowrap transition-all ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-drone-600 to-sky-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="text-xl">{category.icon}</span>
                  <span>{category.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ List */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {filteredFAQs.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">Try adjusting your search or category filter</p>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-6 py-5 flex items-start justify-between text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-bold text-lg text-gray-900 pr-8 flex-1">
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{ rotate: activeFAQ === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown className="w-6 h-6 text-drone-600" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {activeFAQ === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Results Counter */}
            {filteredFAQs.length > 0 && (
              <p className="text-center text-gray-500 mt-8">
                Showing {filteredFAQs.length} of {faqs.length} questions
              </p>
            )}
          </div>
        </section>

        {/* Still Have Questions CTA */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-drone-600 to-sky-600 rounded-3xl p-12 text-white text-center relative overflow-hidden"
            >
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  x: [0, 30, 0],
                  rotate: [0, 15, -15, 0],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-5 right-5 w-32 h-32 opacity-30"
              >
                <img src="/drone-animated.svg" alt="Drone" className="w-full h-full filter brightness-150" />
              </motion.div>

              <div className="relative z-10">
                <h2 className="text-4xl font-bold mb-4">Still Have Questions?</h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Can't find the answer you're looking for? Our team is here to help!
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-white text-drone-600 font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Contact Us
                    </motion.button>
                  </Link>

                  <a href="tel:+233541500716">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border-2 border-white hover:bg-white/20 transition-all flex items-center gap-2"
                    >
                      <Phone className="w-5 h-5" />
                      +233 541 500 716
                    </motion.button>
                  </a>
                </div>

                <div className="mt-8 pt-8 border-t border-white/20">
                  <a 
                    href="mailto:visuals@caghana.com"
                    className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>visuals@caghana.com</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Explore Our Services
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'View All Services', path: '/services', icon: '🚁', color: 'from-blue-500 to-cyan-500' },
                { title: 'See Our Portfolio', path: '/portfolio', icon: '📸', color: 'from-purple-500 to-pink-500' },
                { title: 'Get a Quote', path: '/contact', icon: '💬', color: 'from-green-500 to-teal-500' },
              ].map((link, index) => (
                <Link key={index} to={link.path}>
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`bg-gradient-to-br ${link.color} p-8 rounded-2xl text-white text-center shadow-lg hover:shadow-2xl transition-all`}
                  >
                    <div className="text-5xl mb-4">{link.icon}</div>
                    <h3 className="text-xl font-bold">{link.title}</h3>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
