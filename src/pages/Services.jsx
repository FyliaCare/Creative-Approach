import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO, { seoPresets } from '../components/SEO';

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeFAQ, setActiveFAQ] = useState(null);

  const services = [
    {
      id: 1,
      title: 'Aerial Photography & Videography',
      slug: 'aerial-photography',
      category: 'media',
      shortDesc: 'Stunning aerial visuals that tell your story',
      description: 'Professional high-resolution aerial imagery for commercial properties, real estate showcases, infrastructure documentation, corporate event coverage, and cinematic documentary storytelling.',
      icon: '📸',
      features: [
        '4K/8K ultra high-resolution capture',
        'Professional color grading & editing',
        'Corporate event aerial coverage',
        'Real estate marketing packages',
        'Documentary drone cinematography',
        'Time-lapse & hyperlapse services'
      ],
      deliverables: [
        'Raw & edited footage',
        'Multiple format exports',
        'Full licensing rights',
        'Cloud storage delivery'
      ],
      useCases: ['Real Estate', 'Events', 'Marketing', 'Tourism'],
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      iconBg: 'bg-blue-100',
      price: 'Custom Quote',
      duration: '1-3 days'
    },
    {
      id: 2,
      title: 'Drone Inspection & Monitoring',
      slug: 'drone-inspection',
      category: 'inspection',
      shortDesc: 'Safe, efficient infrastructure assessments',
      description: 'Comprehensive inspection services for infrastructure, construction sites, roofs, utilities, towers, and agricultural monitoring with detailed progress tracking and reporting.',
      icon: '🔍',
      features: [
        'Infrastructure health assessments',
        'Construction progress monitoring',
        'Roof & building inspections',
        'Agricultural crop health analysis',
        'Solar panel & wind turbine checks',
        'Thermal imaging capabilities'
      ],
      deliverables: [
        'Detailed inspection reports',
        'Annotated imagery',
        'Issue identification',
        'Periodic update schedules'
      ],
      useCases: ['Construction', 'Agriculture', 'Energy', 'Mining'],
      gradient: 'from-purple-500 via-pink-500 to-rose-500',
      iconBg: 'bg-purple-100',
      price: 'Custom Quote',
      duration: '2-5 days'
    },
    {
      id: 3,
      title: 'Mapping, Surveying & 3D Modelling',
      slug: 'mapping-surveying',
      category: 'surveying',
      shortDesc: 'Precision geospatial data & 3D models',
      description: 'Advanced mapping solutions including orthomosaic generation, digital elevation models (DEMs), contour mapping, 3D site reconstructions, volumetric analysis, and comprehensive GIS data processing.',
      icon: '🗺️',
      features: [
        'High-precision orthomosaic maps',
        'Digital elevation models (DEMs)',
        'Topographic & contour mapping',
        'Photorealistic 3D models',
        'Volumetric calculations',
        'GIS-ready data exports'
      ],
      deliverables: [
        'Georeferenced maps',
        '3D point clouds',
        'CAD-compatible files',
        'Interactive 3D models'
      ],
      useCases: ['Mining', 'Construction', 'Urban Planning', 'Agriculture'],
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      iconBg: 'bg-emerald-100',
      price: 'Custom Quote',
      duration: '3-7 days'
    },
    {
      id: 4,
      title: 'Documentary Films & Photography',
      slug: 'documentary-films',
      category: 'media',
      shortDesc: 'Compelling visual storytelling',
      description: 'Full-service documentary production from concept development to post-production, combining professional photography, aerial cinematography, and ground footage to tell powerful stories.',
      icon: '🎬',
      features: [
        'Concept development & scripting',
        'Professional photography services',
        'Multi-camera production',
        'Aerial cinematography integration',
        'Post-production & editing',
        'Sound design & music'
      ],
      deliverables: [
        'Final edited film',
        'Behind-the-scenes content',
        'Photo gallery',
        'Multiple viewing formats'
      ],
      useCases: ['Corporate', 'Cultural', 'Environmental', 'Tourism'],
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      iconBg: 'bg-orange-100',
      price: 'Custom Quote',
      duration: '2-6 weeks'
    },
    {
      id: 5,
      title: 'Custom Data Services & Training',
      slug: 'custom-training',
      category: 'training',
      shortDesc: 'Specialized solutions & expert guidance',
      description: 'Tailored data collection, analysis, and reporting services combined with comprehensive training programs for drone operations, data interpretation, and workflow integration.',
      icon: '📊',
      features: [
        'Custom data collection protocols',
        'Advanced data analysis',
        'Specialized reporting formats',
        'Operator training programs',
        'Drone awareness workshops',
        'Workflow integration consulting'
      ],
      deliverables: [
        'Custom reports',
        'Training materials',
        'Certificate of completion',
        'Ongoing support'
      ],
      useCases: ['Enterprise', 'Government', 'Research', 'Education'],
      gradient: 'from-indigo-500 via-purple-500 to-pink-500',
      iconBg: 'bg-indigo-100',
      price: 'Custom Quote',
      duration: 'Variable'
    },
    {
      id: 6,
      title: 'Emergency Response & Surveillance',
      slug: 'emergency-response',
      category: 'inspection',
      shortDesc: 'Rapid deployment for critical situations',
      description: 'Quick-response drone services for emergency situations, disaster assessment, search and rescue support, security surveillance, and real-time monitoring of critical events.',
      icon: '🚨',
      features: [
        'Rapid deployment capabilities',
        'Real-time video streaming',
        'Thermal imaging',
        'Night vision operations',
        'Live GPS tracking',
        '24/7 availability'
      ],
      deliverables: [
        'Live video feeds',
        'Incident reports',
        'Geo-tagged imagery',
        'Emergency documentation'
      ],
      useCases: ['Emergency Services', 'Security', 'Disaster Relief', 'Law Enforcement'],
      gradient: 'from-red-500 via-orange-500 to-yellow-500',
      iconBg: 'bg-red-100',
      price: 'Priority Quote',
      duration: 'Immediate'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Services', icon: '🎯' },
    { id: 'media', name: 'Media & Content', icon: '📸' },
    { id: 'inspection', name: 'Inspection & Monitoring', icon: '🔍' },
    { id: 'surveying', name: 'Mapping & Surveying', icon: '🗺️' },
    { id: 'training', name: 'Training & Consulting', icon: '🎓' }
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Initial Consultation',
      description: 'We discuss your project requirements, objectives, timeline, and budget to understand your unique needs.',
      icon: '💬',
      details: ['Free consultation call', 'Requirements analysis', 'Feasibility assessment', 'Initial recommendations']
    },
    {
      number: '02',
      title: 'Custom Proposal',
      description: 'Receive a detailed proposal with scope, methodology, deliverables, timeline, and transparent pricing.',
      icon: '📋',
      details: ['Detailed project scope', 'Methodology breakdown', 'Transparent pricing', 'Timeline estimation']
    },
    {
      number: '03',
      title: 'Pre-Flight Planning',
      description: 'Our team develops flight plans, obtains necessary permits, conducts site surveys, and prepares equipment.',
      icon: '🗓️',
      details: ['Flight plan development', 'Permit acquisition', 'Site risk assessment', 'Equipment preparation']
    },
    {
      number: '04',
      title: 'Professional Execution',
      description: 'GCAA-certified pilots capture high-quality data with precision, safety, and efficiency as top priorities.',
      icon: '🚁',
      details: ['Certified pilot operations', 'Safety protocols followed', 'Quality data capture', 'Real-time monitoring']
    },
    {
      number: '05',
      title: 'Data Processing',
      description: 'Advanced processing, editing, and quality control ensure deliverables meet the highest standards.',
      icon: '⚙️',
      details: ['Professional editing', 'Quality control checks', 'Format optimization', 'Final review']
    },
    {
      number: '06',
      title: 'Delivery & Support',
      description: 'Receive production-ready files with full documentation, training, and ongoing technical support.',
      icon: '✅',
      details: ['Secure file delivery', 'Complete documentation', 'Usage training', '30-day support']
    }
  ];

  const faqs = [
    {
      question: 'How do I choose the right service for my project?',
      answer: 'Contact us for a free consultation where we\'ll discuss your objectives and recommend the best service package. We often combine services for comprehensive solutions.'
    },
    {
      question: 'Are your drone operations legal and compliant?',
      answer: 'Absolutely. We are fully certified by the Ghana Civil Aviation Authority (GCAA), carry comprehensive insurance, and follow all aviation regulations for safe, legal operations.'
    },
    {
      question: 'What is the typical turnaround time?',
      answer: 'Turnaround varies by service complexity. Simple aerial photography: 1-3 days. Mapping projects: 3-7 days. Documentary films: 2-6 weeks. We provide specific timelines in your custom quote.'
    },
    {
      question: 'Do you work outside of Takoradi?',
      answer: 'Yes! While based in Takoradi, we serve clients across Ghana and can deploy to any location. Travel costs are included in project quotes for locations outside our local service area.'
    },
    {
      question: 'What file formats do you deliver?',
      answer: 'We deliver in industry-standard formats: MP4/MOV for video, JPEG/TIFF for photos, GeoTIFF for maps, LAS/LAZ for point clouds, and DXF/SHP for CAD data. Custom formats available on request.'
    },
    {
      question: 'Can you work in challenging weather or terrain?',
      answer: 'Our advanced equipment and experienced pilots can handle most conditions, but safety is paramount. We assess weather and terrain during planning and reschedule if conditions are unsafe.'
    }
  ];

  const whyChooseUs = [
    {
      title: 'GCAA Certified',
      description: 'Fully compliant with Ghana Civil Aviation Authority regulations',
      icon: '✓',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Expert Team',
      description: 'Experienced pilots and technicians with 10,000+ flight hours',
      icon: '👥',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Latest Technology',
      description: 'Cutting-edge drones with 4K/8K cameras and thermal imaging',
      icon: '🔧',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Quick Turnaround',
      description: 'Fast processing and delivery without compromising quality',
      icon: '⚡',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Comprehensive Insurance',
      description: 'Full liability coverage for your peace of mind',
      icon: '🛡️',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      title: 'Competitive Pricing',
      description: 'Transparent, fair pricing with no hidden costs',
      icon: '💰',
      color: 'from-teal-500 to-cyan-500'
    }
  ];

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  return (
    <>
      <SEO {...seoPresets.services} />
      <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-drone-900 via-sky-900 to-purple-950 text-white section-padding overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              backgroundPosition: ['0% 0%', '100% 100%'],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"
            style={{ backgroundSize: '60px 60px' }}
          />
        </div>
        
        {/* Floating Drones */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-32 h-32 opacity-10"
        >
          <img src="/drone-animated.svg" alt="Drone" className="w-full h-full" />
        </motion.div>
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-20 right-10 w-40 h-40 opacity-10"
        >
          <img src="/drone-animated.svg" alt="Drone" className="w-full h-full" />
        </motion.div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold">Professional Drone Solutions</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Services That
              <span className="block bg-gradient-to-r from-drone-400 via-sky-400 to-purple-400 bg-clip-text text-transparent">
                Elevate Your Vision
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              From aerial cinematography to precision surveying, we deliver excellence in every flight
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { number: '6', label: 'Service Categories' },
                { number: '500+', label: 'Projects Completed' },
                { number: '24/7', label: 'Support Available' },
                { number: '100%', label: 'GCAA Compliant' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20"
                >
                  <div className="text-3xl font-bold mb-1">{stat.number}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-drone-600 to-sky-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <Link to={`/services/${service.slug}`} className="block">
                    {/* Card Header */}
                    <div className={`h-2 bg-gradient-to-r ${service.gradient}`}></div>
                  
                  <div className="p-8">
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-16 h-16 ${service.iconBg} rounded-2xl mb-6 text-3xl group-hover:scale-110 transition-transform duration-300`}>
                      {service.icon}
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">{service.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.shortDesc}</p>

                    {/* Key Features */}
                    <div className="space-y-2 mb-6">
                      {service.features.slice(0, 3).map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Use Cases Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.useCases.slice(0, 3).map((useCase) => (
                        <span key={useCase} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {useCase}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                      <div>
                        <div className="text-sm text-gray-500">Duration</div>
                        <div className="font-semibold text-gray-900">{service.duration}</div>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-6 py-2 bg-gradient-to-r ${service.gradient} text-white rounded-full font-semibold text-sm`}
                      >
                        Learn More
                      </motion.div>
                    </div>
                  </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="bg-gradient-to-r from-drone-600 to-sky-600 bg-clip-text text-transparent">Creative Approach</span>
            </h2>
            <p className="text-xl text-gray-600">
              Industry-leading expertise, cutting-edge technology, and unwavering commitment to excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mb-6 text-2xl text-white group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="bg-gradient-to-r from-drone-600 to-sky-600 bg-clip-text text-transparent">Process</span>
            </h2>
            <p className="text-xl text-gray-600">
              A proven 6-step workflow that ensures exceptional results every time
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative mb-12 last:mb-0"
              >
                {/* Connector Line */}
                {index !== processSteps.length - 1 && (
                  <div className="absolute left-8 top-24 w-0.5 h-full bg-gradient-to-b from-drone-300 to-transparent hidden md:block"></div>
                )}

                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Number Badge */}
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-drone-600 to-sky-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {step.number}
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100 shadow-md hover:shadow-xl transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{step.description}</p>
                      </div>
                      <span className="text-2xl sm:text-3xl md:text-4xl ml-4">{step.icon}</span>
                    </div>

                    {/* Details */}
                    <div className="grid sm:grid-cols-2 gap-3 mt-6">
                      {step.details.map((detail, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-drone-500 rounded-full"></span>
                          <span className="text-sm text-gray-700">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked <span className="bg-gradient-to-r from-drone-600 to-sky-600 bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our drone services
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <button
                  onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-lg text-gray-900 pr-8">{faq.question}</span>
                  <motion.span
                    animate={{ rotate: activeFAQ === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-drone-600 text-2xl flex-shrink-0"
                  >
                    ▼
                  </motion.span>
                </button>
                <AnimatePresence>
                  {activeFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-gradient-to-br from-drone-900 via-sky-900 to-purple-950 text-white relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-drone-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [0, -90, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="mb-8">
                <img src="/drone-animated.svg" alt="Drone" className="w-32 h-32 mx-auto" />
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Ready to Take Your Project
                <span className="block bg-gradient-to-r from-drone-400 via-sky-400 to-purple-400 bg-clip-text text-transparent">
                  To New Heights?
                </span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                Let's discuss how our drone services can bring your vision to life. Get a free consultation and custom quote today.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link
                  to="/contact"
                  className="group px-10 py-5 bg-white text-drone-900 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  <span className="flex items-center gap-2">
                    Get Free Consultation
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                </Link>
                
                <a
                  href="tel:0541500716"
                  className="px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all"
                >
                  <span className="flex items-center gap-2">
                    📞 Call Us Now
                  </span>
                </a>
              </div>

              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-white/80">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📧</span>
                  <span>sales@caghana.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📍</span>
                  <span>Takoradi, Ghana</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
