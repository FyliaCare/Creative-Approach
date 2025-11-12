import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Camera, Video, CheckCircle, ArrowRight, Play, Award, 
  Clock, DollarSign, Users, TrendingUp, Zap, Shield,
  Star, MessageCircle, Download, Eye, Layers, Settings
} from 'lucide-react';
import SEO, { seoPresets } from '../../components/SEO';

export default function AerialPhotography() {
  const benefits = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Enhanced Marketing Impact',
      description: 'Aerial perspectives increase property interest by 68% and reduce time-to-sale by up to 50%.'
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Unique Perspectives',
      description: 'Showcase properties, events, and projects from angles impossible with ground photography.'
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: 'Cost-Effective Solutions',
      description: 'More affordable than helicopter or crane photography while delivering superior quality.'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Rapid Turnaround',
      description: 'Receive edited, professional-grade imagery within 3-5 business days of capture.'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Consultation & Planning',
      description: 'We discuss your vision, goals, and specific requirements. Site assessment, weather planning, and shot list creation.',
      duration: '1-2 days',
      icon: <MessageCircle className="w-8 h-8" />
    },
    {
      step: '02',
      title: 'Pre-Flight Preparation',
      description: 'GCAA flight authorization, safety briefings, equipment checks, and location reconnaissance.',
      duration: '1 day',
      icon: <Settings className="w-8 h-8" />
    },
    {
      step: '03',
      title: 'Aerial Capture',
      description: 'Professional drone operation with 4K/8K cameras, multiple angles, and creative compositions.',
      duration: '2-4 hours',
      icon: <Camera className="w-8 h-8" />
    },
    {
      step: '04',
      title: 'Post-Production',
      description: 'Professional editing, color grading, stabilization, and enhancement to deliver stunning final products.',
      duration: '3-5 days',
      icon: <Layers className="w-8 h-8" />
    },
    {
      step: '05',
      title: 'Delivery & Support',
      description: 'High-resolution files delivered via secure cloud storage with full usage rights and ongoing support.',
      duration: 'Same day',
      icon: <Download className="w-8 h-8" />
    }
  ];

  const applications = [
    {
      title: 'Real Estate Marketing',
      description: 'Showcase properties with stunning aerial views that highlight location, amenities, and surroundings. Proven to increase listing interest and accelerate sales.',
      icon: '🏡',
      stats: '68% increase in inquiries'
    },
    {
      title: 'Corporate Events',
      description: 'Capture the scale and atmosphere of conferences, product launches, festivals, and corporate gatherings from unique aerial perspectives.',
      icon: '🎉',
      stats: 'Coverage of 1000+ attendees'
    },
    {
      title: 'Construction Documentation',
      description: 'Monitor project progress, create stakeholder reports, and maintain visual records throughout the entire construction lifecycle.',
      icon: '🏗️',
      stats: 'Track 100% of project phases'
    },
    {
      title: 'Tourism & Hospitality',
      description: 'Highlight scenic locations, hotel properties, resorts, and attractions with breathtaking aerial imagery that drives bookings.',
      icon: '🌴',
      stats: '45% boost in booking rates'
    },
    {
      title: 'Film & Documentary',
      description: 'Add cinematic production value with professional aerial cinematography for films, documentaries, music videos, and commercials.',
      icon: '🎬',
      stats: 'Cinema-quality 8K footage'
    },
    {
      title: 'Agricultural Monitoring',
      description: 'Assess crop health, irrigation coverage, and land conditions with high-resolution aerial surveys of farms and plantations.',
      icon: '🌾',
      stats: 'Monitor 100+ hectares/day'
    }
  ];

  const equipment = [
    {
      name: 'DJI Inspire 3',
      specs: '8K video, Full-frame sensor, 14+ stops dynamic range',
      use: 'High-end commercial projects'
    },
    {
      name: 'DJI Mavic 3 Pro Cine',
      specs: '5.1K video, Hasselblad camera, Tri-camera system',
      use: 'Professional photography & videography'
    },
    {
      name: 'DJI Air 3',
      specs: '4K HDR, Dual cameras, 46-minute flight time',
      use: 'Extended coverage projects'
    }
  ];

  const faqs = [
    {
      question: 'What weather conditions are suitable for aerial photography?',
      answer: 'We operate in clear to partly cloudy conditions with wind speeds below 30 km/h. Rain, fog, and high winds prevent safe operations. We monitor weather forecasts closely and will reschedule if conditions are unsuitable.'
    },
    {
      question: 'Do you need permission to fly over my property?',
      answer: 'With your consent as the property owner, we can operate over private property. For areas near airports, government buildings, or controlled airspace, we obtain GCAA authorization, which may take 5-10 business days.'
    },
    {
      question: 'What is the maximum height and distance you can fly?',
      answer: 'Per GCAA regulations, we typically operate up to 120 meters (400 feet) altitude and within 500 meters horizontal distance. Special authorizations can be obtained for projects requiring extended parameters.'
    },
    {
      question: 'Can you fly at night or indoors?',
      answer: 'We have authorization for night operations with appropriate lighting equipment. Indoor flights are possible in large spaces like warehouses or event halls, subject to safety assessment.'
    },
    {
      question: 'What file formats do you provide?',
      answer: 'Photos: High-resolution JPEG (standard) and RAW files (upon request). Videos: MP4 (H.264/H.265), MOV, or your preferred format. All files are color-corrected and professionally edited.'
    },
    {
      question: 'How long does post-production take?',
      answer: 'Standard turnaround is 3-5 business days for photos and 7-14 days for video projects. Rush services are available for 50-100% additional fee, delivering within 24-48 hours.'
    },
    {
      question: 'Do I own the rights to the images?',
      answer: 'Yes! You receive full commercial usage rights for all deliverables. We retain copyright for portfolio use and may use images for marketing unless exclusive rights are purchased.'
    },
    {
      question: 'What if I\'m not satisfied with the results?',
      answer: 'We include revisions in all packages (1-2 rounds depending on package). If issues arise from our end, we offer free re-shoots. Our goal is 100% client satisfaction.'
    }
  ];

  return (
    <>
      <SEO {...seoPresets.aerialPhotography} />
      <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/AERIAL  PHOTOGRAPHY LANDING PAGE.jpg" 
            alt="Aerial Photography Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white container-custom"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-lg rounded-full mb-6"
          >
            <Camera className="w-10 h-10" />
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Aerial Photography & Videography
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
            Capture stunning perspectives that elevate your brand, showcase your properties, and tell your story from the sky
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg flex items-center gap-2 hover:bg-blue-50 transition-colors"
              >
                Get a Quote <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/20 backdrop-blur-lg text-white rounded-full font-semibold text-lg flex items-center gap-2 hover:bg-white/30 transition-colors"
            >
              <Play className="w-5 h-5" /> Watch Showreel
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-12">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">8K</div>
              <div className="text-blue-100">Ultra HD Quality</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">3-5 Days</div>
              <div className="text-blue-100">Average Turnaround</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-blue-100">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Transform Your Visual Marketing</h2>
              <p className="text-lg text-gray-700 mb-6">
                Our professional aerial photography and videography services deliver breathtaking perspectives that 
                captivate audiences and drive results. Using cutting-edge drone technology and cinematic expertise, 
                we create stunning visual content that sets your brand apart.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Whether you're marketing luxury real estate, documenting construction progress, promoting tourism 
                destinations, or producing corporate videos, our aerial imagery provides the "wow factor" that 
                traditional photography cannot match.
              </p>
              <div className="flex items-center gap-4 bg-blue-50 p-6 rounded-lg">
                <Shield className="w-12 h-12 text-blue-600 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-lg mb-1">GCAA Licensed & Insured</div>
                  <div className="text-gray-600">
                    All pilots are certified by Ghana Civil Aviation Authority with GHS 1M+ liability coverage
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <img 
                  src="/AERIAL PHOTOGRAPHY AND VIDEOGRAPHY/Atlantic.jpg" 
                  alt="Aerial view of Atlantic"
                  className="rounded-lg shadow-xl w-full h-48 object-cover"
                />
                <img 
                  src="/AERIAL PHOTOGRAPHY AND VIDEOGRAPHY/DJI_20231201134820_0013_V.JPG" 
                  alt="Aerial photography sample"
                  className="rounded-lg shadow-xl w-full h-64 object-cover"
                />
              </div>
              <div className="space-y-4 mt-8">
                <img 
                  src="/AERIAL PHOTOGRAPHY AND VIDEOGRAPHY/DJI_20231201134831_0014_V.JPG" 
                  alt="Professional aerial shot"
                  className="rounded-lg shadow-xl w-full h-64 object-cover"
                />
                <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg shadow-xl p-6 flex items-center justify-center text-white h-48">
                  <div className="text-center">
                    <Camera className="w-12 h-12 mb-3 mx-auto" />
                    <div className="text-2xl font-bold mb-1">8K Ultra HD</div>
                    <div className="text-sm">Professional Quality</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose Aerial Imagery?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Aerial photography delivers measurable business benefits that ground-level photography simply cannot match
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Proven Process</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From initial consultation to final delivery, we ensure a smooth, professional experience
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative mb-8 last:mb-0"
              >
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white shadow-lg">
                      {step.icon}
                    </div>
                  </div>
                  
                  <div className="flex-grow bg-white p-6 rounded-xl shadow-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-blue-600 font-bold text-sm">STEP {step.step}</span>
                        <h3 className="text-2xl font-bold mt-1">{step.title}</h3>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Duration</div>
                        <div className="font-semibold text-blue-600">{step.duration}</div>
                      </div>
                    </div>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
                
                {index < process.length - 1 && (
                  <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-cyan-600" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Quote Section */}
      <section className="section-padding bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Custom Pricing for Your Project</h2>
              <p className="text-xl text-gray-700 mb-4">
                Every project is unique, and we believe your pricing should be too. 
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Whether you need aerial photography for a small property or a comprehensive package for large-scale commercial projects, we'll create a tailored solution that fits your specific needs and budget.
              </p>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-lg rounded-full font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-xl"
                >
                  Request Custom Quote
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Applications & Use Cases</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our aerial photography services deliver results across diverse industries and applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {applications.map((app, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <div className="p-6">
                  <div className="text-5xl mb-4">{app.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{app.title}</h3>
                  <p className="text-gray-600 mb-4">{app.description}</p>
                  <div className="bg-blue-50 px-4 py-2 rounded-lg inline-block">
                    <span className="text-blue-600 font-semibold text-sm">{app.stats}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Professional-Grade Equipment</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We use industry-leading drones and cameras to ensure the highest quality output
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {equipment.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-xl p-6 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Camera className="w-8 h-8" />
                  <h3 className="text-xl font-bold">{item.name}</h3>
                </div>
                <p className="text-blue-100 mb-3">{item.specs}</p>
                <div className="border-t border-white/20 pt-3">
                  <div className="text-sm text-blue-100">Best For:</div>
                  <div className="font-semibold">{item.use}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our aerial photography services
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer p-6 hover:bg-gray-50 transition-colors">
                    <span className="font-semibold text-lg pr-4">{faq.question}</span>
                    <ArrowRight className="w-5 h-5 text-blue-600 group-open:rotate-90 transition-transform flex-shrink-0" />
                  </summary>
                  <div className="px-6 pb-6 text-gray-600">
                    {faq.answer}
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-600 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Elevate Your Visual Content?
            </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Let's create stunning aerial imagery that captures attention and drives results. 
              Get a free consultation and custom quote today.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg flex items-center gap-2 hover:bg-blue-50 transition-colors"
                >
                  Request Free Consultation <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/portfolio">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/20 backdrop-blur-lg text-white rounded-full font-semibold text-lg hover:bg-white/30 transition-colors"
                >
                  View Our Portfolio
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      </div>
    </>
  );
}
