import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO, { seoPresets } from '../components/SEO';

// Animated Counter Component
const AnimatedCounter = ({ end, suffix = '', duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

export default function Industries() {
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const industries = [
    {
      id: 1,
      name: 'Real Estate & Construction',
      category: 'commercial',
      icon: '🏗️',
      description: 'Showcase properties, monitor construction progress, and create compelling marketing materials with stunning aerial perspectives.',
      fullDescription: 'Transform how you market properties and manage construction projects with our comprehensive aerial solutions. From luxury developments to large-scale construction sites, we provide the visual assets and data you need to succeed.',
      services: [
        'Property photography & videography',
        'Construction site monitoring',
        'Progress documentation',
        '3D modeling & virtual tours',
        'Marketing material creation',
        'Site planning & surveying'
      ],
      benefits: [
        'Increase buyer inquiries by up to 300%',
        'Reduce site inspection time by 70%',
        'Improve project tracking accuracy',
        'Create stunning marketing content'
      ],
      gradient: 'from-orange-500 to-red-500',
      caseStudy: {
        title: 'Luxury Development Marketing',
        result: '300% increase in buyer inquiries',
        details: 'Aerial photography and virtual tours for a 50-unit luxury development in Accra resulted in record-breaking pre-sales.'
      },
      stats: { projects: 120, satisfaction: 98 }
    },
    {
      id: 2,
      name: 'Mining & Quarrying',
      category: 'industrial',
      icon: '⛏️',
      description: 'Improve safety, efficiency, and compliance in mining operations with precision mapping and volumetric analysis.',
      fullDescription: 'Maximize operational efficiency and safety in mining operations with accurate aerial surveys, stockpile measurements, and environmental monitoring. Our solutions help you make data-driven decisions and maintain compliance.',
      services: [
        'Stockpile volume calculations',
        'Terrain mapping & surveying',
        'Safety inspections',
        'Environmental monitoring',
        'Blast planning & analysis',
        'Haul road optimization'
      ],
      benefits: [
        'Save weeks of traditional surveying time',
        'Accurate volumetric measurements (±2%)',
        'Enhanced safety compliance',
        'Reduced operational costs'
      ],
      gradient: 'from-yellow-500 to-orange-500',
      caseStudy: {
        title: 'Gold Mine Site Survey',
        result: 'Saved 2 weeks of surveying time',
        details: 'Comprehensive terrain mapping and stockpile analysis for major gold mining operation, delivering results in days instead of weeks.'
      },
      stats: { projects: 45, satisfaction: 100 }
    },
    {
      id: 3,
      name: 'Agriculture & Farming',
      category: 'agriculture',
      icon: '🌾',
      description: 'Optimize crop yields and farm management with precision agriculture technology and aerial monitoring.',
      fullDescription: 'Revolutionize your farm management with precision agriculture solutions. Our multispectral imaging and AI-powered analysis help you maximize yields, reduce inputs, and make informed decisions.',
      services: [
        'Crop health monitoring (NDVI)',
        'Irrigation planning',
        'Pest & disease detection',
        'Yield estimation',
        'Field boundary mapping',
        'Soil analysis visualization'
      ],
      benefits: [
        'Increase crop yields by up to 25%',
        'Reduce water usage by 30%',
        'Early pest/disease detection',
        'Optimize fertilizer application'
      ],
      gradient: 'from-green-500 to-emerald-500',
      caseStudy: {
        title: '500-Acre Farm Analysis',
        result: '25% improvement in crop yield',
        details: 'NDVI mapping and precision irrigation planning for large-scale maize farm, resulting in significant yield improvements.'
      },
      stats: { projects: 85, satisfaction: 96 }
    },
    {
      id: 4,
      name: 'Energy & Utilities',
      category: 'industrial',
      icon: '⚡',
      description: 'Ensure infrastructure integrity and optimize operations with thermal imaging and detailed inspections.',
      fullDescription: 'Keep your energy infrastructure running safely and efficiently with our advanced inspection services. Thermal imaging and detailed surveys help you prevent failures and optimize performance.',
      services: [
        'Solar panel inspection',
        'Power line monitoring',
        'Wind turbine inspection',
        'Substation surveys',
        'Thermal anomaly detection',
        'Vegetation management'
      ],
      benefits: [
        'Detect issues before failure occurs',
        'Reduce downtime by 60%',
        'Improve safety for personnel',
        'Lower maintenance costs'
      ],
      gradient: 'from-drone-500 to-sky-500',
      caseStudy: {
        title: 'Solar Farm Thermal Scan',
        result: 'Detected 50+ faulty panels',
        details: 'Thermal imaging inspection of 5MW solar farm identified underperforming panels, preventing significant energy loss.'
      },
      stats: { projects: 67, satisfaction: 99 }
    },
    {
      id: 5,
      name: 'Media & Entertainment',
      category: 'commercial',
      icon: '🎬',
      description: 'Create breathtaking cinematic content for films, documentaries, commercials, and promotional videos.',
      fullDescription: 'Elevate your visual storytelling with stunning aerial cinematography. From blockbuster films to corporate videos, we deliver Hollywood-quality footage that captivates audiences.',
      services: [
        'Aerial cinematography',
        'Documentary production',
        'Event coverage',
        'Promotional videos',
        'Music video production',
        'Time-lapse & hyperlapse'
      ],
      benefits: [
        'Cinematic 4K/8K quality',
        'Professional crew & equipment',
        'Fast turnaround times',
        'Unlimited creative possibilities'
      ],
      gradient: 'from-purple-500 to-pink-500',
      caseStudy: {
        title: 'Tourism Documentary',
        result: '1M+ views on social media',
        details: 'Award-winning documentary showcasing Ghana\'s beauty, featuring stunning aerial footage that went viral across multiple platforms.'
      },
      stats: { projects: 150, satisfaction: 100 }
    },
    {
      id: 6,
      name: 'Infrastructure & Transportation',
      category: 'industrial',
      icon: '🌉',
      description: 'Maintain critical infrastructure and improve safety with comprehensive inspection and monitoring services.',
      fullDescription: 'Ensure the safety and longevity of critical infrastructure with our detailed inspection services. Access hard-to-reach areas safely and efficiently while maintaining comprehensive records.',
      services: [
        'Bridge inspections',
        'Road surveys',
        'Railway monitoring',
        'Structural assessments',
        'Crack detection & mapping',
        'Asset management documentation'
      ],
      benefits: [
        'Safer than traditional methods',
        'Faster inspection completion',
        'Detailed documentation',
        'Regulatory compliance support'
      ],
      gradient: 'from-gray-600 to-gray-800',
      caseStudy: {
        title: 'Highway Bridge Inspection',
        result: 'Zero safety incidents, faster reporting',
        details: 'Complete structural assessment of 3 major highway bridges, identifying maintenance needs without traffic disruption.'
      },
      stats: { projects: 38, satisfaction: 100 }
    },
    {
      id: 7,
      name: 'Environmental & Conservation',
      category: 'environmental',
      icon: '🌍',
      description: 'Support environmental protection and wildlife conservation with non-invasive aerial monitoring solutions.',
      fullDescription: 'Protect and preserve our natural world with cutting-edge aerial monitoring technology. Our non-invasive solutions help you track changes, monitor wildlife, and manage conservation efforts effectively.',
      services: [
        'Wildlife monitoring',
        'Deforestation tracking',
        'Coastal erosion assessment',
        'Habitat mapping',
        'Biodiversity surveys',
        'Climate impact assessment'
      ],
      benefits: [
        'Non-invasive monitoring',
        'Cover large areas quickly',
        'Accurate baseline data',
        'Long-term change tracking'
      ],
      gradient: 'from-green-600 to-teal-500',
      caseStudy: {
        title: 'Forest Conservation Project',
        result: 'Mapped 10,000 hectares in 1 week',
        details: 'Comprehensive forest health assessment and deforestation monitoring for major conservation NGO, providing critical data for protection efforts.'
      },
      stats: { projects: 42, satisfaction: 98 }
    },
    {
      id: 8,
      name: 'Emergency Services',
      category: 'emergency',
      icon: '🚨',
      description: '24/7 rapid response for search and rescue, disaster assessment, and crisis management operations.',
      fullDescription: 'When every second counts, our rapid response drone services provide critical situational awareness for emergency services. Available 24/7 with thermal imaging and real-time streaming capabilities.',
      services: [
        'Search & rescue operations',
        'Disaster assessment',
        'Fire monitoring',
        'Emergency coordination',
        'Flood response',
        'Real-time video streaming'
      ],
      benefits: [
        'Rapid deployment (< 30 minutes)',
        'Real-time situational awareness',
        'Thermal imaging capabilities',
        '24/7 availability'
      ],
      gradient: 'from-red-500 to-orange-600',
      caseStudy: {
        title: 'Flood Disaster Response',
        result: 'Assisted in 50+ rescues',
        details: 'Provided real-time aerial reconnaissance during major flooding event, helping coordinate rescue efforts and assess damage.'
      },
      stats: { projects: 28, satisfaction: 100 }
    }
  ];

  const categories = [
    { id: 'all', name: 'All Industries', icon: '🎯' },
    { id: 'commercial', name: 'Commercial', icon: '🏢' },
    { id: 'industrial', name: 'Industrial', icon: '🏭' },
    { id: 'agriculture', name: 'Agriculture', icon: '🌾' },
    { id: 'environmental', name: 'Environmental', icon: '🌍' },
    { id: 'emergency', name: 'Emergency', icon: '🚨' }
  ];

  const filteredIndustries = activeFilter === 'all' 
    ? industries 
    : industries.filter(ind => ind.category === activeFilter);

  const globalStats = [
    { number: 6, label: 'Industries Served', icon: '🏭' },
    { number: 75, suffix: '+', label: 'Projects Delivered', icon: '📊' },
    { number: 30, suffix: '+', label: 'Corporate Clients', icon: '🤝' },
    { number: 98, suffix: '%', label: 'Client Satisfaction', icon: '⭐' }
  ];

  return (
    <>
      <SEO {...seoPresets.industries} />
      <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative text-white section-padding overflow-hidden min-h-[70vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/INDUSTRIES LANDING PAGE.jpg" 
            alt="Industries Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
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
              <span className="text-sm font-semibold">Industry-Leading Solutions</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Transforming Operations
              <span className="block bg-gradient-to-r from-drone-400 via-sky-400 to-purple-400 bg-clip-text text-transparent">
                Across Every Industry
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              From construction sites to conservation areas, we deliver specialized drone solutions tailored to your industry's unique challenges
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {globalStats.slice(0, 4).map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20"
                >
                  <div className="text-3xl font-bold mb-1">
                    {stat.number}{stat.suffix}
                  </div>
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
                onClick={() => setActiveFilter(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeFilter === category.id
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

      {/* Industries Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div layout className="grid md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredIndustries.map((industry, index) => (
                <motion.div
                  key={industry.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  onClick={() => setSelectedIndustry(industry)}
                  className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
                >
                  {/* Card Header */}
                  <div className={`h-2 bg-gradient-to-r ${industry.gradient}`}></div>
                  
                  <div className="p-8">
                    {/* Icon & Title */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${industry.gradient} rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        {industry.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2 text-gray-900">{industry.name}</h3>
                        <p className="text-gray-600">{industry.description}</p>
                      </div>
                    </div>

                    {/* Services Preview */}
                    <div className="space-y-2 mb-6">
                      {industry.services.slice(0, 4).map((service, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-green-500 mt-0.5">✓</span>
                          <span className="text-gray-700">{service}</span>
                        </div>
                      ))}
                      {industry.services.length > 4 && (
                        <div className="text-sm text-drone-600 font-semibold">
                          +{industry.services.length - 4} more services
                        </div>
                      )}
                    </div>

                    {/* Case Study Badge */}
                    <div className={`bg-gradient-to-r ${industry.gradient} rounded-2xl p-4 text-white mb-4`}>
                      <div className="text-xs font-semibold mb-1 opacity-90">SUCCESS STORY</div>
                      <div className="font-bold">{industry.caseStudy.result}</div>
                    </div>

                    {/* Stats & CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex gap-4 text-sm">
                        <div>
                          <div className="text-2xl font-bold text-drone-600">{industry.stats.projects}</div>
                          <div className="text-gray-500 text-xs">Projects</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-600">{industry.stats.satisfaction}%</div>
                          <div className="text-gray-500 text-xs">Satisfied</div>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 bg-gray-100 group-hover:bg-gradient-to-r group-hover:from-drone-600 group-hover:to-sky-600 group-hover:text-white text-gray-700 rounded-full font-semibold text-sm transition-all"
                      >
                        Learn More
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Industry Detail Modal */}
      <AnimatePresence>
        {selectedIndustry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedIndustry(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={`bg-gradient-to-r ${selectedIndustry.gradient} p-6 sm:p-8 md:p-8 text-white relative`}>
                <button
                  onClick={() => setSelectedIndustry(null)}
                  className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  ✕
                </button>
                <div className="text-4xl sm:text-5xl md:text-6xl mb-4">{selectedIndustry.icon}</div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">{selectedIndustry.name}</h2>
                <p className="text-white/90 text-lg max-w-3xl">{selectedIndustry.fullDescription}</p>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 md:p-8">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* All Services */}
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Services</h3>
                    <div className="space-y-3">
                      {selectedIndustry.services.map((service, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl"
                        >
                          <span className="text-green-500 text-xl">✓</span>
                          <span className="text-gray-700">{service}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">Key Benefits</h3>
                    <div className="space-y-3">
                      {selectedIndustry.benefits.map((benefit, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl"
                        >
                          <span className="text-drone-500 text-xl">📈</span>
                          <span className="text-gray-700">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Case Study */}
                <div className={`bg-gradient-to-br ${selectedIndustry.gradient} rounded-3xl p-8 text-white mb-8`}>
                  <div className="flex items-start gap-6">
                    <div className="text-4xl sm:text-5xl md:text-6xl">🏆</div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold mb-2 opacity-90">CASE STUDY</div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">{selectedIndustry.caseStudy.title}</h3>
                      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-4">
                        <div className="text-2xl font-bold mb-1">{selectedIndustry.caseStudy.result}</div>
                      </div>
                      <p className="text-white/90">{selectedIndustry.caseStudy.details}</p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/contact"
                    className={`flex-1 py-4 px-8 bg-gradient-to-r ${selectedIndustry.gradient} text-white rounded-2xl font-bold text-center hover:shadow-lg transition-all`}
                  >
                    Get Started with This Industry
                  </Link>
                  <Link
                    to="/services"
                    className="flex-1 py-4 px-8 bg-gray-100 text-gray-900 rounded-2xl font-bold text-center hover:bg-gray-200 transition-all"
                  >
                    View All Services
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Stats Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Industry <span className="bg-gradient-to-r from-drone-600 to-sky-600 bg-clip-text text-transparent">Impact</span>
            </h2>
            <p className="text-xl text-gray-600">Real results across all sectors</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {globalStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <div className="text-5xl mb-4">{stat.icon}</div>
                <div className="text-5xl font-bold text-drone-600 mb-2">
                  <AnimatedCounter end={stat.number} suffix={stat.suffix || ''} duration={2.5} />
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-drone-900 via-sky-900 to-purple-950 text-white relative overflow-hidden">
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="mb-8">
              <img src="/drone-animated.svg" alt="Drone" className="w-32 h-32 mx-auto" />
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Don't See Your Industry?
              <span className="block bg-gradient-to-r from-drone-400 via-sky-400 to-purple-400 bg-clip-text text-transparent">
                Let's Create a Solution
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              We provide custom drone solutions for unique challenges. Every industry has different needs, and we're here to meet them.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/contact"
                className="group px-10 py-5 bg-white text-drone-900 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  Discuss Your Project
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
                <span>visuals@caghana.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">📍</span>
                <span>Takoradi, Ghana</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      </div>
    </>
  );
}
