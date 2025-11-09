import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Shield, TrendingDown, Clock, MessageCircle, Settings, Camera, BarChart, FileText, Zap, Building, Leaf, Battery, AlertTriangle, CheckCircle, ChevronRight } from 'lucide-react';
import SEO, { seoPresets } from '../../components/SEO';

export default function DroneInspection() {
  const stats = [
    { label: '2000+ Inspections', value: '2000+' },
    { label: '99.5% Accuracy', value: '99.5%' },
    { label: '2-3 Days Turnaround', value: '2-3 Days' },
    { label: 'Zero Safety Incidents', value: '100%' }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Enhanced Safety',
      description: 'Eliminate risks of working at heights or in hazardous environments. No scaffolding, ladders, or confined space entry required.'
    },
    {
      icon: TrendingDown,
      title: 'Cost Reduction',
      description: 'Up to 70% cost savings compared to traditional inspection methods. Reduce downtime and labor costs significantly.'
    },
    {
      icon: BarChart,
      title: 'Detailed Documentation',
      description: 'High-resolution imagery and thermal data provide comprehensive visual records for analysis and compliance reporting.'
    },
    {
      icon: Clock,
      title: 'Rapid Deployment',
      description: 'Complete inspections in hours instead of days. Minimal disruption to operations with quick setup and execution.'
    }
  ];

  const process = [
    {
      step: '01',
      icon: MessageCircle,
      title: 'Initial Consultation',
      duration: '1 day',
      description: 'Discuss inspection objectives, identify areas of concern, review site access, and plan safety protocols.'
    },
    {
      step: '02',
      icon: Settings,
      title: 'Pre-Inspection Planning',
      duration: '1-2 days',
      description: 'Conduct site survey, obtain necessary permits, configure inspection equipment, and brief team on procedures.'
    },
    {
      step: '03',
      icon: Camera,
      title: 'Aerial Inspection',
      duration: '2-6 hours',
      description: 'Deploy drones with high-resolution cameras and thermal imaging to capture comprehensive visual data of all target areas.'
    },
    {
      step: '04',
      icon: BarChart,
      title: 'Data Analysis',
      duration: '2-3 days',
      description: 'Process imagery, identify defects or anomalies, annotate findings, and categorize issues by severity level.'
    },
    {
      step: '05',
      icon: FileText,
      title: 'Report Delivery',
      duration: 'Same day',
      description: 'Receive detailed inspection report with annotated images, recommendations, and prioritized action items.'
    }
  ];

  const packages = [
    {
      name: 'Basic Inspection',
      price: 'GHS 2,000',
      description: 'Essential visual inspection',
      features: [
        'Visual inspection only',
        'Up to 2 structures/areas',
        'High-resolution photography',
        '50+ detailed images',
        'Basic inspection report',
        'Issue identification',
        '5-day turnaround',
        'Email support'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Professional Inspection',
      price: 'GHS 4,500',
      description: 'Comprehensive assessment',
      features: [
        'Visual + thermal imaging',
        'Up to 5 structures/areas',
        '8K resolution imagery',
        '150+ annotated images',
        'Detailed technical report',
        'Severity classification',
        '3-day turnaround',
        'Priority support',
        '1 follow-up inspection'
      ],
      cta: 'Most Popular',
      popular: true
    },
    {
      name: 'Enterprise Inspection',
      price: 'GHS 8,000',
      description: 'Complete facility assessment',
      features: [
        'Multi-spectrum imaging',
        'Unlimited structures',
        '8K + RAW thermal data',
        '300+ images + video',
        'Comprehensive analysis report',
        'Predictive maintenance insights',
        '24-hour turnaround',
        'Dedicated project manager',
        'Quarterly inspection program',
        'Real-time monitoring portal'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  const applications = [
    {
      title: 'Building & Roof Inspections',
      icon: '🏢',
      description: 'Identify structural damage, roof deterioration, water damage, and facade issues',
      stats: 'Detect 95% of issues'
    },
    {
      title: 'Infrastructure Assessment',
      icon: '🌉',
      description: 'Inspect bridges, towers, dams, and utilities for cracks, corrosion, and wear',
      stats: '70% cost reduction'
    },
    {
      title: 'Construction Monitoring',
      icon: '🏗️',
      description: 'Track progress, ensure quality, document phases, and verify compliance',
      stats: 'Weekly updates available'
    },
    {
      title: 'Solar Panel Inspection',
      icon: '☀️',
      description: 'Thermal imaging to detect hotspots, damaged cells, and efficiency issues',
      stats: 'Scan 100+ panels/hour'
    },
    {
      title: 'Agricultural Monitoring',
      icon: '🌾',
      description: 'Assess crop health, irrigation systems, pest damage, and field conditions',
      stats: 'Monitor 500+ acres/day'
    },
    {
      title: 'Industrial Facilities',
      icon: '🏭',
      description: 'Inspect refineries, plants, storage tanks, and equipment for safety hazards',
      stats: '24/7 availability'
    }
  ];

  const equipment = [
    {
      name: 'DJI Mavic 3T',
      specs: 'Thermal + Visual Cameras, 56× Zoom, RTK Positioning',
      use: 'Thermal inspections & precision work'
    },
    {
      name: 'DJI Matrice 350 RTK',
      specs: 'Payload flexibility, IP55 rating, 55-min flight time',
      use: 'Industrial & infrastructure inspections'
    },
    {
      name: 'Zenmuse H20T',
      specs: 'Hybrid sensor, 20MP zoom, thermal + laser rangefinder',
      use: 'Multi-spectrum detailed inspections'
    }
  ];

  const faqs = [
    {
      question: 'What types of defects can drone inspections detect?',
      answer: 'Our drone inspections can identify cracks, corrosion, water damage, structural deformations, thermal anomalies, missing components, vegetation growth, deterioration, and safety hazards. Thermal imaging reveals hidden issues like moisture intrusion, electrical hotspots, and insulation problems.'
    },
    {
      question: 'How accurate are drone inspections compared to manual methods?',
      answer: 'Drone inspections typically achieve 99%+ accuracy when conducted by certified operators. High-resolution cameras capture details down to 1-2mm, and thermal sensors detect temperature variations as small as 0.05°C. Our reports are accepted by insurance companies and regulatory authorities.'
    },
    {
      question: 'Do you need to shut down operations for inspection?',
      answer: 'In most cases, no. Drone inspections are minimally disruptive and can often be conducted while operations continue. For sensitive areas or safety concerns, we may require temporary restricted access. We work with your schedule to minimize downtime.'
    },
    {
      question: 'What deliverables are included in the inspection report?',
      answer: 'You receive a comprehensive PDF report with annotated high-resolution images, thermal data overlays, defect locations marked on site maps, severity classifications, detailed descriptions, recommendations for remediation, and prioritized action items. Raw data and additional formats available upon request.'
    },
    {
      question: 'How often should facilities be inspected?',
      answer: 'Frequency depends on asset type, age, environment, and regulations. We typically recommend: buildings (annually), industrial facilities (quarterly), solar farms (bi-annually), bridges (per code requirements), and construction sites (weekly to monthly). We can develop custom inspection schedules.'
    },
    {
      question: 'Can you inspect during bad weather?',
      answer: 'Safety is paramount. We cannot fly in rain, snow, high winds (>35 km/h), or lightning conditions. However, we can perform inspections in light clouds, fog, and immediately after weather events to assess damage. We maintain flexible scheduling to accommodate weather delays.'
    },
    {
      question: 'Do you provide thermal imaging?',
      answer: 'Yes, our Professional and Enterprise packages include thermal imaging using FLIR radiometric cameras. This reveals temperature variations indicating moisture, insulation defects, electrical issues, and structural anomalies invisible to standard cameras. All thermal data is radiometric for precise temperature measurement.'
    },
    {
      question: 'Are inspection reports accepted by insurance and regulators?',
      answer: 'Yes, our inspection reports meet industry standards and are regularly accepted by insurance companies, engineering firms, regulatory bodies, and courts. All inspections are performed by GCAA-licensed operators following documented procedures, ensuring credibility and legal validity.'
    }
  ];

  return (
    <>
      <SEO {...seoPresets.droneInspection} />
      <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container-custom relative z-10 text-center text-white py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/10 backdrop-blur-lg mb-6"
          >
            <Search className="w-12 h-12" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Drone Inspection & Monitoring
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto"
          >
            Safe, efficient, and cost-effective inspections for infrastructure, buildings, and industrial facilities
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/contact"
              className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:bg-purple-50 transition-all hover:scale-105"
            >
              Request Inspection
            </Link>
            <Link
              to="/portfolio"
              className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white rounded-full font-semibold hover:bg-white/20 transition-all"
            >
              View Case Studies
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-12">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center text-white"
              >
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-purple-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Advanced Inspection Technology
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our drone inspection services eliminate the need for costly scaffolding, dangerous climbing, or lengthy shutdowns. Using advanced cameras and thermal imaging, we capture high-resolution data from every angle, identifying issues that traditional methods might miss.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                From routine maintenance checks to emergency damage assessments, our certified operators deliver detailed reports that help you make informed decisions about repairs, maintenance schedules, and asset management.
              </p>
              
              <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                <Shield className="w-8 h-8 text-purple-600 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900">GCAA Licensed & Insured</div>
                  <div className="text-sm text-gray-600">GHS 2M+ liability coverage • Certified operators</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=500"
                alt="Infrastructure inspection"
                className="rounded-lg shadow-xl"
              />
              <img
                src="https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=500"
                alt="Thermal imaging"
                className="rounded-lg shadow-xl mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500"
                alt="Building inspection"
                className="rounded-lg shadow-xl -mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=500"
                alt="Industrial inspection"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Drone Inspections?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Revolutionary inspection technology that saves time, money, and lives
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Inspection Process
            </h2>
            <p className="text-xl text-gray-600">
              Streamlined workflow from consultation to delivery
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8 pb-12 last:pb-0"
              >
                {index !== process.length - 1 && (
                  <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 to-pink-600"></div>
                )}
                
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    <step.icon className="w-8 h-8" />
                  </div>
                  
                  <div className="flex-grow bg-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                      <span className="text-sm text-purple-600 font-semibold">{step.duration}</span>
                    </div>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Inspection Packages
            </h2>
            <p className="text-xl text-gray-600">
              Flexible solutions for every inspection need
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden ${
                  pkg.popular ? 'ring-4 ring-purple-600 scale-105' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2 font-semibold">
                    MOST POPULAR
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 mb-4">{pkg.description}</p>
                  <div className="text-4xl font-bold text-gray-900 mb-6">{pkg.price}</div>
                  
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    to="/contact"
                    className={`block w-full py-3 rounded-lg text-center font-semibold transition-all ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {pkg.cta}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Inspection Applications
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive solutions across multiple industries
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {applications.map((app, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-4xl mb-4">{app.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{app.title}</h3>
                <p className="text-gray-600 mb-3">{app.description}</p>
                <div className="text-sm font-semibold text-purple-600">{app.stats}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Professional Equipment
            </h2>
            <p className="text-xl text-gray-600">
              Industry-leading drones and sensors
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {equipment.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-3">{item.specs}</p>
                <div className="text-sm text-purple-600 font-semibold">→ {item.use}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.details
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-lg shadow-md overflow-hidden group"
              >
                <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 flex items-center justify-between hover:bg-gray-50">
                  {faq.question}
                  <ChevronRight className="w-5 h-5 text-purple-600 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-6 pb-4 text-gray-600">
                  {faq.answer}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Modernize Your Inspections?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Get a free consultation and discover how drone technology can save you time and money
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:bg-purple-50 transition-all hover:scale-105"
            >
              Schedule Consultation
            </Link>
            <Link
              to="/portfolio"
              className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white rounded-full font-semibold hover:bg-white/20 transition-all"
            >
              View Inspection Gallery
            </Link>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
