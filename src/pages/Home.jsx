import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO, { seoPresets } from '../components/SEO';
import Newsletter from '../components/Newsletter';
import LiveChat from '../components/chat/LiveChat';
import heroVideo from '/landing-page.mp4';

// Counter Animation Component
function AnimatedCounter({ end, duration = 2, suffix = '', prefix = '' }) {
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

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isInView]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  const services = [
    {
      id: 1,
      title: 'Aerial Photography & Videography',
      slug: 'aerial-photography',
      shortDesc: 'Stunning aerial visuals that tell your story',
      description: 'Professional high-resolution aerial imagery for commercial properties, real estate showcases, infrastructure documentation, corporate event coverage, and cinematic documentary storytelling.',
      icon: '📸',
      image: '/Homepage service cards/Aerial Photography and Videography.jpg',
      features: [
        '4K/8K ultra high-resolution capture',
        'Professional color grading & editing',
        'Real estate marketing packages'
      ],
      useCases: ['Real Estate', 'Events', 'Marketing'],
      link: '/services/aerial-photography',
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      iconBg: 'bg-blue-100',
      duration: '1-3 days'
    },
    {
      id: 2,
      title: 'Drone Inspection & Monitoring',
      slug: 'drone-inspection',
      shortDesc: 'Safe, efficient infrastructure assessments',
      description: 'Comprehensive inspection services for infrastructure, construction sites, roofs, utilities, towers, and agricultural monitoring with detailed progress tracking and reporting.',
      icon: '🔍',
      image: '/Homepage service cards/Drone Inspection and Monitoring.jpg',
      features: [
        'Infrastructure health assessments',
        'Construction progress monitoring',
        'Thermal imaging capabilities'
      ],
      useCases: ['Construction', 'Agriculture', 'Energy'],
      link: '/services/drone-inspection',
      gradient: 'from-purple-500 via-pink-500 to-rose-500',
      iconBg: 'bg-purple-100',
      duration: '2-5 days'
    },
    {
      id: 3,
      title: 'Mapping, Surveying & 3D Modelling',
      slug: 'mapping-surveying',
      shortDesc: 'Precision geospatial data & 3D models',
      description: 'Advanced mapping solutions including orthomosaic generation, digital elevation models (DEMs), contour mapping, 3D site reconstructions, volumetric analysis, and comprehensive GIS data processing.',
      icon: '🗺️',
      image: '/Homepage service cards/Mapping Surveying and 3D Modelling.jpg',
      features: [
        'High-precision orthomosaic maps',
        'Digital elevation models (DEMs)',
        'Photorealistic 3D models'
      ],
      useCases: ['Mining', 'Construction', 'Agriculture'],
      link: '/services/mapping-surveying',
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      iconBg: 'bg-emerald-100',
      duration: '3-7 days'
    },
    {
      id: 4,
      title: 'Documentary Films & Photography',
      slug: 'documentary-films',
      shortDesc: 'Compelling visual storytelling',
      description: 'Full-service documentary production from concept development to post-production, combining professional photography, aerial cinematography, and ground footage to tell powerful stories.',
      icon: '🎬',
      image: '/Homepage service cards/Documentary Films and Photography.jpg',
      features: [
        'Concept development & scripting',
        'Multi-camera production',
        'Post-production & editing'
      ],
      useCases: ['Corporate', 'Cultural', 'Tourism'],
      link: '/services/documentary-films',
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      iconBg: 'bg-orange-100',
      duration: '2-6 weeks'
    },
    {
      id: 5,
      title: 'Custom Data Services & Training',
      slug: 'custom-training',
      shortDesc: 'Specialized solutions & expert guidance',
      description: 'Tailored data collection, analysis, and reporting services combined with comprehensive training programs for drone operations, data interpretation, and workflow integration.',
      icon: '📊',
      image: '/Homepage service cards/Custom Data Services and Training.png',
      features: [
        'Custom data collection protocols',
        'Advanced data analysis',
        'Operator training programs'
      ],
      useCases: ['Enterprise', 'Government', 'Education'],
      link: '/services/custom-training',
      gradient: 'from-indigo-500 via-purple-500 to-pink-500',
      iconBg: 'bg-indigo-100',
      duration: 'Variable'
    },
    {
      id: 6,
      title: 'Emergency Response & Surveillance',
      slug: 'emergency-response',
      shortDesc: 'Rapid deployment for critical situations',
      description: 'Quick-response drone services for emergency situations, disaster assessment, search and rescue support, security surveillance, and real-time monitoring of critical events.',
      icon: '🚨',
      image: '/Homepage service cards/Emergency and Response Survelliance.png',
      features: [
        'Rapid deployment capabilities',
        'Real-time video streaming',
        'Thermal imaging'
      ],
      useCases: ['Emergency Services', 'Security', 'Disaster Relief'],
      link: '/services/emergency-response',
      gradient: 'from-red-500 via-orange-500 to-yellow-500',
      iconBg: 'bg-red-100',
      duration: 'Immediate'
    }
  ];

  const whyChooseUs = [
    {
      icon: '📸',
      title: 'Professional Drone Photography & Video',
      description: 'Let us capture breathtaking aerial imagery to showcase the best your property has to offer, or have us map, collect, inspect, and analyze critical data for your enterprise.'
    },
    {
      icon: '✓',
      title: 'Easy Scheduling',
      description: 'Save time scheduling. Let us manage your drone projects while your team focuses on what it does best. Simply tell us about your project and we\'ll take care of the rest.'
    },
    {
      icon: '🤝',
      title: 'Experienced Professionals',
      description: 'We understand how aerial imagery elevates your business and will help you determine the best drone service options for your company.'
    },
    {
      icon: '⚡',
      title: 'Completely Custom',
      description: 'We tailor our services for your needs, whatever you need. Let us know what you\'re looking for and how we can help out.'
    },
    {
      icon: '🚀',
      title: 'Fast Turnaround',
      description: 'Easy scheduling and fast turnaround makes completing projects a snap. We share your edited images as soon as they are ready.'
    },
    {
      icon: '🇬🇭',
      title: 'Ghana-Wide Service',
      description: 'Get the same great experience and high quality wherever you need your aerial imagery with zero travel expenses. We\'re there when you need it, where you need it.'
    }
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Tell Us About Your Project',
      description: 'Describe your project and tell us what kind of footage or photos you want to be captured.',
      icon: '📝'
    },
    {
      number: '02',
      title: 'We\'ll Schedule a Flight',
      description: 'After confirming your project details & requirements, we\'ll send a pilot to your specified location, wherever it is you need us.',
      icon: '📅'
    },
    {
      number: '03',
      title: 'Download Your Aerial Imagery',
      description: 'We will share your drone photos and videos with you and make them available to download within 24 hours following the time of the shoot.',
      icon: '📥'
    }
  ];

  const trustedBy = [
    { name: 'Mining Companies', icon: '⛏️' },
    { name: 'Construction Firms', icon: '🏗️' },
    { name: 'Real Estate', icon: '🏢' },
    { name: 'Agriculture', icon: '🌾' },
    { name: 'Energy Sector', icon: '⚡' },
    { name: 'Media Production', icon: '🎬' }
  ];

  return (
    <>
      <SEO {...seoPresets.home} />
      <div className="min-h-screen bg-white">
        {/* Hero Section - Full Width with Video Background */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInLine
          preload="metadata"
          disablePictureInPicture
          controlsList="nodownload"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          src={heroVideo}
          onContextMenu={(e) => e.preventDefault()}
          onError={(e) => {
            console.error('Video failed to load:', e);
          }}
        >
          Your browser does not support the video tag.
        </video>
        
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-30 text-center text-white px-4 max-w-6xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl">
              GHANA-WIDE DRONE SERVICES
            </h1>
            <div className="w-24 h-1 bg-drone-500 mx-auto mb-6 shadow-lg"></div>
            <p className="text-xl sm:text-2xl md:text-3xl mb-8 font-light tracking-wide drop-shadow-xl">
              SIMPLE, CONVENIENT, & COMPLETELY CUSTOM<br />
              <span className="text-drone-400 font-semibold">AERIAL DRONE PHOTOGRAPHY</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
          >
            <Link to="/services">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-drone-600 hover:bg-drone-700 text-white font-bold text-lg rounded-md shadow-2xl transition-all backdrop-blur-sm"
              >
                LEARN MORE
              </motion.button>
            </Link>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-white/95 hover:bg-white text-drone-600 font-bold text-lg rounded-md shadow-2xl transition-all backdrop-blur-sm"
              >
                GET A QUOTE
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white z-30"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm uppercase tracking-wider">Scroll Down</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 md:py-32 bg-white relative overflow-hidden">
        {/* Floating Drones in Background */}
        <motion.div
          animate={{
            y: [0, -40, 0],
            x: [0, 30, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-10 w-32 h-32 opacity-15 z-0"
        >
          <img src="/drone-animated.svg" alt="Drone" className="w-full h-full" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, -40, 0],
            rotate: [0, -8, 8, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-20 left-10 w-40 h-40 opacity-15 z-0"
        >
          <img src="/drone-animated.svg" alt="Drone" className="w-full h-full" />
        </motion.div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              For Your Company
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how drone photography, aerial imagery, and data analysis can benefit your business in powerful new ways.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={service.link}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group relative h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    {/* Full Image Background */}
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Minimal gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-drone-600 group-hover:to-sky-600 transition-all">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {service.shortDesc}
                      </p>

                      {/* Use Cases Pills */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {service.useCases.map((useCase) => (
                          <span key={useCase} className="px-2.5 py-1 bg-white border border-gray-200 text-gray-900 text-xs font-medium rounded-full shadow-sm">
                            {useCase}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-sm text-gray-500 font-medium">View Details</span>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="text-drone-600 group-hover:text-sky-600 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 md:py-32 bg-gray-50 relative overflow-hidden">
        {/* Floating Drones */}
        <motion.div
          animate={{
            y: [0, -35, 0],
            x: [0, 50, 0],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-40 right-[5%] w-36 h-36 opacity-20 z-0"
        >
          <img src="/drone-animated.svg" alt="Drone" className="w-full h-full" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 40, 0],
            x: [0, -35, 0],
            rotate: [0, -12, 12, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
          className="absolute bottom-32 left-[8%] w-44 h-44 opacity-20 z-0"
        >
          <img src="/drone-animated.svg" alt="Drone" className="w-full h-full" />
        </motion.div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Hassle-Free Drone Photography
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Get premium quality aerial photos, video, maps & data captured by our vetted and experienced professional drone pilots & photographers. We have the skills & training required to get the job done right the first time and on time.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-drone-500 to-sky-500 rounded-full text-4xl mb-6 shadow-xl"
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-drone-600 via-sky-600 to-purple-600 text-white relative overflow-hidden">
        {/* Large Floating Drones */}
        <motion.div
          animate={{
            y: [0, -50, 0],
            x: [0, 60, 0],
            rotate: [0, 20, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 right-[10%] w-48 h-48 md:w-72 md:h-72 opacity-20 z-0"
        >
          <img src="/drone-animated.svg" alt="Drone" className="w-full h-full filter brightness-150" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 45, 0],
            x: [0, -50, 0],
            rotate: [0, -15, 15, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-10 left-[5%] w-56 h-56 md:w-80 md:h-80 opacity-20 z-0"
        >
          <img src="/drone-animated.svg" alt="Drone" className="w-full h-full filter brightness-150" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 40, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-[50%] left-[50%] w-64 h-64 opacity-10 z-0 hidden lg:block"
        >
          <img src="/drone-animated.svg" alt="Drone" className="w-full h-full filter brightness-150" />
        </motion.div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Enterprise Scalability. Consistent Quality. Fast Turnaround.
            </h2>
            <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              We offer Ghana-wide drone photography services and provide professional consistency and reliability for your brand. Contact us today and turn your project into a compelling visual story in three easy steps.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12 mt-16">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="text-center">
                  {/* Step Number */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-md rounded-full text-6xl mb-6 border-4 border-white/30"
                  >
                    {step.icon}
                  </motion.div>

                  {/* Step Title */}
                  <div className="text-6xl font-bold text-white/20 mb-2">
                    {step.number}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-white/90 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connection Line (except for last item) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-full h-1 bg-white/20">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
                      className="h-full bg-white/50 origin-left"
                    ></motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 bg-white text-drone-600 font-bold text-lg rounded-md shadow-2xl hover:shadow-3xl transition-all"
              >
                GET STARTED
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Trusted By
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leading companies across Ghana trust Creative Approach for their aerial data and visual media needs
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {trustedBy.map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer"
              >
                <div className="text-5xl mb-3">{company.icon}</div>
                <div className="text-sm font-semibold text-gray-700 text-center">
                  {company.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-32 bg-gray-900 text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: 11, label: 'Projects Delivered', suffix: '' },
              { number: 50, label: 'Happy Clients', suffix: '+' },
              { number: 420, label: 'Flight Hours', suffix: '+' },
              { number: 95, label: 'Success Rate', suffix: '%' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-bold text-drone-400 mb-3">
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} duration={2.5} />
                </div>
                <div className="text-lg md:text-xl text-gray-300 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-br from-drone-600 to-sky-600 rounded-3xl p-12 md:p-16 shadow-2xl relative overflow-hidden"
          >
            {/* Floating Drone in CTA */}
            <motion.div
              animate={{
                y: [0, -25, 0],
                x: [0, 30, 0],
                rotate: [0, 15, -15, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-10 right-10 w-32 h-32 md:w-48 md:h-48 opacity-30 z-0"
            >
              <img src="/drone-animated.svg" alt="Drone" className="w-full h-full filter brightness-150" />
            </motion.div>

            <motion.div
              animate={{
                y: [0, 30, 0],
                x: [0, -25, 0],
                rotate: [0, -12, 12, 0],
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute bottom-10 left-10 w-28 h-28 md:w-40 md:h-40 opacity-30 z-0"
            >
              <img src="/drone-animated.svg" alt="Drone" className="w-full h-full filter brightness-150" />
            </motion.div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Contact us today for a free consultation and custom quote for your drone service needs
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-5 bg-white text-drone-600 font-bold text-lg rounded-md shadow-xl hover:shadow-2xl transition-all"
                >
                  GET A QUOTE NOW
                </motion.button>
              </Link>
              <Link to="/services">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-5 bg-transparent border-2 border-white text-white font-bold text-lg rounded-md hover:bg-white/10 transition-all"
                >
                  VIEW SERVICES
                </motion.button>
              </Link>
            </div>

            {/* Contact Details */}
            <div className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row gap-6 justify-center text-white/90">
              <div className="flex items-center gap-2 justify-center">
                <span>📞</span>
                <span className="font-semibold">+233 54 150 0716</span>
              </div>
              <div className="hidden md:block text-white/40">|</div>
              <div className="flex items-center gap-2 justify-center">
                <span>📧</span>
                <span className="font-semibold">sales@caghana.com</span>
              </div>
              <div className="hidden md:block text-white/40">|</div>
              <div className="flex items-center gap-2 justify-center">
                <span>📍</span>
                <span className="font-semibold">Takoradi, Ghana</span>
              </div>
            </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />

      {/* Live Chat Widget */}
      <LiveChat />
      </div>
    </>
  );
}
