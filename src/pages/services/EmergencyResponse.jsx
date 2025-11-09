import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, Radio, Zap, Eye, MessageCircle, Settings, Camera, FileText, Shield, Clock, MapPin, Phone, Target, Activity, CheckCircle, ChevronRight } from 'lucide-react';
import SEO, { seoPresets } from '../../components/SEO';

export default function EmergencyResponse() {
  const stats = [
    { label: 'Response Time', value: '<2 Hours' },
    { label: 'Coverage Area', value: '200+ km' },
    { label: '24/7 Availability', value: 'Always On' },
    { label: 'Response Rate', value: '100%' }
  ];

  const benefits = [
    {
      icon: Zap,
      title: 'Rapid Deployment',
      description: 'Mobile command unit ready within 2 hours. Quick response for time-critical situations requiring immediate aerial intelligence.'
    },
    {
      icon: Radio,
      title: 'Real-Time Streaming',
      description: 'Live HD video feeds directly to incident commanders, emergency operations centers, or mobile devices for instant situational awareness.'
    },
    {
      icon: Eye,
      title: 'Multi-Spectrum Imaging',
      description: 'Visual, thermal, and night vision capabilities provide comprehensive intelligence regardless of lighting or environmental conditions.'
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Keep personnel safe by assessing hazards remotely. Reduce risks while maintaining operational effectiveness during critical incidents.'
    }
  ];

  const process = [
    {
      step: '01',
      icon: Phone,
      title: 'Emergency Alert',
      duration: 'Immediate',
      description: 'Call our 24/7 emergency hotline. Provide incident location, nature of emergency, and specific requirements for rapid assessment.'
    },
    {
      step: '02',
      icon: Settings,
      title: 'Rapid Mobilization',
      duration: '30-120 min',
      description: 'Team deploys with appropriate equipment, coordinates with incident command, and travels to location using fastest safe route.'
    },
    {
      step: '03',
      icon: Camera,
      title: 'Aerial Assessment',
      duration: 'Ongoing',
      description: 'Launch drones for overhead surveillance, thermal imaging, live video streaming, and comprehensive situation documentation.'
    },
    {
      step: '04',
      icon: Radio,
      title: 'Real-Time Intelligence',
      duration: 'Continuous',
      description: 'Provide live feeds to incident commanders, identify hazards, track personnel, monitor changes, and document entire response.'
    },
    {
      step: '05',
      icon: FileText,
      title: 'Post-Incident Report',
      duration: '4-24 hours',
      description: 'Deliver comprehensive documentation including geo-tagged imagery, thermal data, video footage, and incident timeline.'
    }
  ];

  const packages = [
    {
      name: 'On-Demand Response',
      price: 'GHS 2,500/incident',
      description: 'Pay-per-use emergency service',
      features: [
        'Call when you need us',
        '2-hour response time',
        'Up to 4 hours on-site',
        'Single drone deployment',
        'Live video streaming',
        'Basic thermal imaging',
        'Incident documentation',
        'Post-incident report',
        'Standard priority',
        'Business hours (8am-6pm)'
      ],
      cta: 'Emergency Call',
      popular: false
    },
    {
      name: 'Priority Response Plan',
      price: 'GHS 5,000/month',
      description: 'Guaranteed fast response',
      features: [
        'Unlimited emergency calls',
        '1-hour response guarantee',
        'Up to 8 hours per incident',
        'Multi-drone capability',
        'HD live streaming',
        'Advanced thermal imaging',
        'Night vision operations',
        'Real-time GPS tracking',
        'Detailed incident reports',
        '24/7 availability',
        'Priority dispatch',
        'Quarterly training sessions',
        'Equipment standby'
      ],
      cta: 'Most Popular',
      popular: true
    },
    {
      name: 'Enterprise Command',
      price: 'Custom Quote',
      description: 'Dedicated response team',
      features: [
        'Dedicated response team',
        'On-site equipment storage',
        'Immediate response (<30 min)',
        'Unlimited flight time',
        'Complete drone fleet',
        'Multi-spectrum sensors',
        'Satellite communication',
        'Mobile command center',
        'Direct incident command integration',
        'API data integration',
        'Custom reporting formats',
        'Monthly drills & training',
        'Equipment maintenance included',
        'Dedicated account manager',
        'Annual contract discount'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  const applications = [
    {
      title: 'Search & Rescue',
      icon: '🔍',
      description: 'Locate missing persons using thermal imaging, coordinate ground teams, and cover large areas quickly',
      stats: 'Cover 500+ acres/hour'
    },
    {
      title: 'Fire Assessment',
      icon: '🔥',
      description: 'Monitor fire spread, identify hotspots, assess structural integrity, and guide firefighting efforts',
      stats: 'Thermal + visual intelligence'
    },
    {
      title: 'Disaster Response',
      icon: '🌪️',
      description: 'Rapid damage assessment after floods, earthquakes, storms, or other natural disasters',
      stats: 'Document 100% of affected area'
    },
    {
      title: 'Security Surveillance',
      icon: '🛡️',
      description: 'Monitor large events, detect intrusions, track suspects, and provide aerial security coverage',
      stats: '24/7 monitoring capability'
    },
    {
      title: 'Accident Investigation',
      icon: '🚗',
      description: 'Document crash scenes, traffic incidents, and industrial accidents with aerial perspective',
      stats: 'Millimeter-level documentation'
    },
    {
      title: 'Hazmat Response',
      icon: '☢️',
      description: 'Assess chemical spills, gas leaks, or environmental hazards without risking personnel',
      stats: 'Safe remote assessment'
    }
  ];

  const equipment = [
    {
      name: 'DJI Matrice 30T',
      specs: 'Thermal + zoom cameras, 48MP wide, laser rangefinder, IP55 rated',
      use: 'All-weather emergency operations'
    },
    {
      name: 'DJI Mavic 3T (Thermal)',
      specs: '56× zoom, radiometric thermal, RTK, 45-min flight time',
      use: 'Rapid response & thermal imaging'
    },
    {
      name: 'Mobile Command Unit',
      specs: 'Satellite uplink, multi-screen displays, live streaming, communications',
      use: 'On-site incident command center'
    }
  ];

  const faqs = [
    {
      question: 'How quickly can you respond to an emergency?',
      answer: 'Our standard response time is under 2 hours for the Greater Accra region and surrounding areas. Priority Response Plan clients receive guaranteed 1-hour response. Enterprise Command clients with on-site equipment can deploy in under 30 minutes. Response times to remote areas depend on distance and road conditions—we coordinate with local authorities for fastest access routes.'
    },
    {
      question: 'What types of emergencies do you support?',
      answer: 'We support search and rescue operations, fire incidents, natural disaster assessment (floods, earthquakes, storms), accident investigation, security threats, hazmat situations, structural collapses, civil disturbances, crowd management, and any scenario requiring rapid aerial intelligence. Our experienced pilots have worked with police, fire services, NADMO, and security agencies.'
    },
    {
      question: 'Can you fly at night?',
      answer: 'Yes. Our emergency drones are equipped with night vision and thermal imaging, plus LED lighting for safe night operations. We hold GCAA night flight authorizations and our pilots are trained for 24/7 operations. Thermal imaging is often more effective at night for locating people, detecting fires, and identifying hazards invisible in daylight.'
    },
    {
      question: 'How do you coordinate with emergency services?',
      answer: 'We integrate seamlessly with incident command structures. Our pilots are trained in ICS (Incident Command System) protocols and work directly with incident commanders. We provide live video feeds to command vehicles, mobile devices, or emergency operations centers. Radio communication with ground teams ensures coordinated operations. We\'ve worked extensively with Ghana Police, Fire Service, and disaster response agencies.'
    },
    {
      question: 'What happens if weather conditions are too dangerous?',
      answer: 'Safety is paramount. Our drones can operate in light rain, moderate winds (up to 50 km/h), and poor visibility where manned aircraft cannot. However, we will not fly in lightning, severe storms, or conditions that endanger equipment or personnel. We maintain contingency plans and standby equipment. If weather clears, we deploy immediately. Our IP55-rated drones have better weather tolerance than standard commercial drones.'
    },
    {
      question: 'Do you work with law enforcement?',
      answer: 'Yes. We regularly support Ghana Police Service, security agencies, and law enforcement operations. Our services include surveillance, suspect tracking, crowd monitoring, crime scene documentation, evidence collection, and tactical support. All operations follow legal protocols, chain-of-custody procedures, and data protection regulations. We maintain strict confidentiality and provide court-admissible documentation when required.'
    },
    {
      question: 'What area can you cover in an emergency?',
      answer: 'Our primary response zone covers Greater Accra and within 100km radius (2-hour response). For Priority clients, we cover 200km radius with advance notice. Beyond this, we can deploy but require additional mobilization time and travel costs. During active incidents, a single drone can survey 500+ acres per hour. For large-area disasters, we deploy multiple drones simultaneously to provide comprehensive coverage quickly.'
    },
    {
      question: 'How much does emergency response cost?',
      answer: 'On-demand response starts at GHS 2,500 per incident (up to 4 hours). Extended operations are GHS 500/hour additional. Priority Response Plan is GHS 5,000/month with unlimited calls and guaranteed response. Enterprise contracts are customized based on your needs and include dedicated teams, on-site storage, and immediate response. During genuine life-threatening emergencies, we deploy immediately and handle billing afterwards—saving lives takes priority.'
    }
  ];

  return (
    <>
      <SEO {...seoPresets.emergencyResponse} />
      <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-900 via-orange-700 to-yellow-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container-custom relative z-10 text-center text-white py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/10 backdrop-blur-lg mb-6"
          >
            <AlertTriangle className="w-12 h-12" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Emergency Response & Surveillance
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-red-100 mb-8 max-w-3xl mx-auto"
          >
            Rapid aerial intelligence for critical situations—24/7 deployment with real-time video streaming
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="tel:+233123456789"
              className="px-8 py-4 bg-white text-red-600 rounded-full font-semibold hover:bg-red-50 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Emergency Hotline
            </a>
            <Link
              to="/contact"
              className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white rounded-full font-semibold hover:bg-white/20 transition-all"
            >
              Request Information
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg px-6 py-3 rounded-full"
          >
            <Activity className="w-5 h-5 text-green-400 animate-pulse" />
            <span className="text-sm font-semibold">ACTIVE 24/7 • Response Ready</span>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gradient-to-r from-red-600 to-yellow-600 py-12">
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
                <div className="text-red-100">{stat.label}</div>
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
                Critical Aerial Intelligence
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                When seconds matter, our emergency response drones provide immediate aerial perspective, thermal imaging, and real-time intelligence to support first responders, incident commanders, and security operations.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Operating 24/7 with rapid deployment capability, we deliver the situational awareness needed to make critical decisions, coordinate resources effectively, and protect lives during emergencies and security situations.
              </p>
              
              <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg border-2 border-red-200">
                <Shield className="w-8 h-8 text-red-600 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900">Rapid Response Ready</div>
                  <div className="text-sm text-gray-600">24/7 availability • Under 2hr deployment • GHS 2M+ insurance</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=500"
                alt="Emergency response"
                className="rounded-lg shadow-xl"
              />
              <img
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500"
                alt="Thermal imaging"
                className="rounded-lg shadow-xl mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500"
                alt="Surveillance"
                className="rounded-lg shadow-xl -mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=500"
                alt="Disaster assessment"
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
              Why Choose Our Emergency Services?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Proven capabilities when every second counts
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
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-yellow-500 rounded-lg flex items-center justify-center mb-4">
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
      <section className="py-20 bg-gradient-to-br from-gray-50 to-red-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Emergency Response Process
            </h2>
            <p className="text-xl text-gray-600">
              Streamlined deployment from alert to intelligence delivery
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
                  <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-red-600 to-yellow-600"></div>
                )}
                
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-red-600 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    <step.icon className="w-8 h-8" />
                  </div>
                  
                  <div className="flex-grow bg-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                      <span className="text-sm text-red-600 font-semibold">{step.duration}</span>
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
              Response Plans
            </h2>
            <p className="text-xl text-gray-600">
              Flexible options for every organization
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
                  pkg.popular ? 'ring-4 ring-red-600 scale-105' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="bg-gradient-to-r from-red-600 to-yellow-600 text-white text-center py-2 font-semibold">
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
                        <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    to="/contact"
                    className={`block w-full py-3 rounded-lg text-center font-semibold transition-all ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-red-600 to-yellow-600 text-white hover:shadow-lg'
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
              Emergency Applications
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive support for critical situations
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
                <div className="text-sm font-semibold text-red-600">{app.stats}</div>
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
              Emergency Response Equipment
            </h2>
            <p className="text-xl text-gray-600">
              Mission-critical drones and systems
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {equipment.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-red-50 to-yellow-50 p-6 rounded-xl"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-3">{item.specs}</p>
                <div className="text-sm text-red-600 font-semibold">→ {item.use}</div>
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
                  <ChevronRight className="w-5 h-5 text-red-600 group-open:rotate-90 transition-transform" />
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
      <section className="py-20 bg-gradient-to-br from-red-900 via-orange-700 to-yellow-600 text-white">
        <div className="container-custom text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg px-6 py-3 rounded-full mb-6">
            <Activity className="w-5 h-5 text-green-400 animate-pulse" />
            <span className="text-sm font-semibold">24/7 EMERGENCY HOTLINE ACTIVE</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready for Immediate Deployment
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            When critical situations demand immediate aerial intelligence, we're ready to respond
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+233123456789"
              className="px-8 py-4 bg-white text-red-600 rounded-full font-semibold hover:bg-red-50 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call Emergency Hotline
            </a>
            <Link
              to="/contact"
              className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white rounded-full font-semibold hover:bg-white/20 transition-all"
            >
              Set Up Response Plan
            </Link>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
