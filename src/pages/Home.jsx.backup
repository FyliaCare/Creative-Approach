import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';

// Counter Animation Component
function AnimatedCounter({ end, duration = 2, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
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
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  const services = [
    {
      title: 'Aerial Photography',
      description: 'Stunning aerial shots that capture your project from breathtaking angles',
      icon: '📸',
      gradient: 'from-drone-500 to-sky-500',
      iconBg: 'bg-drone-500/10'
    },
    {
      title: 'Drone Inspection',
      description: 'Safe and efficient inspections of infrastructure and hard-to-reach areas',
      icon: '🔍',
      gradient: 'from-purple-600 to-pink-500',
      iconBg: 'bg-purple-500/10'
    },
    {
      title: 'Mapping & Surveying',
      description: 'Precise 3D mapping and surveying for construction and land management',
      icon: '🗺️',
      gradient: 'from-sky-600 to-teal-500',
      iconBg: 'bg-sky-500/10'
    },
    {
      title: 'Documentary Production',
      description: 'Professional video production with cinematic aerial footage',
      icon: '🎬',
      gradient: 'from-orange-500 to-red-500',
      iconBg: 'bg-orange-500/10'
    }
  ];

  const stats = [
    { number: '500+', label: 'Projects Completed' },
    { number: '50+', label: 'Happy Clients' },
    { number: '10+', label: 'Years Experience' },
    { number: '100%', label: 'Satisfaction Rate' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-sky-950 via-drone-900 to-blue-950">
        {/* Particle Background */}
        <ParticleBackground />
        
        {/* Video Background Effect */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        
        {/* Animated Background Orbs */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-drone-500/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, -80, 0],
              y: [0, 80, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-sky-400/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        
        {/* Floating Drone Animation */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            rotate: [0, 3, -3, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 right-[10%] w-64 h-64 opacity-20 hidden lg:block"
        >
          <img src="/drone-animated.svg" alt="Drone" className="w-full h-full" />
        </motion.div>
        
        <motion.div
          animate={{
            y: [0, 25, 0],
            x: [0, -15, 0],
            rotate: [0, -2, 2, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/4 left-[8%] w-48 h-48 opacity-15 hidden lg:block"
        >
          <img src="/drone-animated.svg" alt="Drone" className="w-full h-full" />
        </motion.div>

        <motion.div
          style={{ opacity, scale }}
          className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold">Ghana's Leading Drone Service Provider</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            Elevate Your{' '}
            <span className="bg-gradient-to-r from-drone-400 via-sky-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              Perspective
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto"
          >
            Ghana's leading provider of drone-based geospatial and visual media solutions.
            Based in Takoradi, delivering accurate aerial data, professional photography, and documentary films across Ghana.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-4"
              >
                Explore Services
              </motion.button>
            </Link>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary text-lg px-8 py-4"
              >
                Get Quote
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Services Section - Modern Cards */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-block px-6 py-2 bg-drone-100 text-drone-700 rounded-full font-semibold mb-4"
            >
              What We Offer
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-drone-600 to-sky-600 bg-clip-text text-transparent">
              Professional Drone Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From aerial photography to precision surveying, we deliver excellence in every flight
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '📸',
                title: 'Aerial Photography & Videography',
                description: 'Stunning 4K/8K aerial imagery and cinematic footage for real estate, events, and marketing',
                features: ['High-resolution capture', 'Corporate events', 'Real estate showcases'],
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: '🔍',
                title: 'Inspection & Monitoring',
                description: 'Safe, efficient infrastructure inspections and agricultural monitoring with detailed reports',
                features: ['Infrastructure assessment', 'Construction monitoring', 'Crop health analysis'],
                color: 'from-purple-500 to-pink-500'
              },
              {
                icon: '🗺️',
                title: 'Mapping & Surveying',
                description: 'Precision 3D mapping, orthomosaic generation, and volumetric calculations for GIS analysis',
                features: ['3D terrain models', 'Topographic maps', 'Volumetric calculations'],
                color: 'from-green-500 to-teal-500'
              },
              {
                icon: '🎬',
                title: 'Documentary Production',
                description: 'Professional documentary films combining aerial cinematography with storytelling excellence',
                features: ['Full production services', 'Aerial cinematography', 'Post-production'],
                color: 'from-orange-500 to-red-500'
              },
              {
                icon: '📊',
                title: 'Custom Data Services',
                description: 'Specialized data collection, analysis, and reporting tailored to your project requirements',
                features: ['Custom reporting', 'Data analysis', 'GIS integration'],
                color: 'from-indigo-500 to-purple-500'
              },
              {
                icon: '🎓',
                title: 'Training & Consultation',
                description: 'Expert guidance and training for drone operations, data processing, and GCAA compliance',
                features: ['Operator training', 'Technical consultation', 'GCAA compliance'],
                color: 'from-yellow-500 to-orange-500'
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="card h-full hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-drone-200">
                  {/* Gradient accent bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} rounded-t-2xl`}></div>
                  
                  {/* Icon */}
                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg`}
                    >
                      {service.icon}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-drone-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-700">
                        <span className="text-drone-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Learn More Link */}
                  <Link to="/services">
                    <motion.div
                      className="inline-flex items-center gap-2 text-drone-600 font-semibold group-hover:gap-4 transition-all"
                      whileHover={{ x: 5 }}
                    >
                      <span>Learn More</span>
                      <span>→</span>
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Services Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary px-10 py-4 text-lg inline-flex items-center gap-3"
              >
                <span>View All Services</span>
                <span className="text-2xl">→</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-drone-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="inline-block px-6 py-2 bg-drone-600 text-white rounded-full font-semibold mb-6"
              >
                Why Creative Approach
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ghana's Most Trusted Drone Service Provider
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Based in Takoradi, we combine technical precision with creative excellence to deliver outstanding results across Ghana.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: '✓',
                    title: 'GCAA Certified',
                    description: 'Fully compliant with Ghana Civil Aviation Authority standards and regulations'
                  },
                  {
                    icon: '✓',
                    title: 'Expert Team',
                    description: 'Professional pilots and technicians with expertise in GIS, media production, and drone technology'
                  },
                  {
                    icon: '✓',
                    title: 'Cutting-Edge Equipment',
                    description: 'Latest drone technology for high-resolution 4K/8K capture and precision data collection'
                  },
                  {
                    icon: '✓',
                    title: 'Proven Track Record',
                    description: 'Trusted by leading companies in construction, mining, agriculture, and real estate'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-drone-500 to-sky-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-10"
              >
                <Link to="/about">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary px-8 py-4 inline-flex items-center gap-2"
                  >
                    <span>Learn More About Us</span>
                    <span>→</span>
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: Visual Element */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative">
                {/* Main card with stats */}
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-3xl p-8 shadow-2xl border border-drone-100"
                >
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { number: 500, label: 'Projects Completed', icon: '🎯', suffix: '+' },
                      { number: 50, label: 'Happy Clients', icon: '😊', suffix: '+' },
                      { number: 100, label: 'GCAA Compliant', icon: '✓', suffix: '%' },
                      { number: 24, label: 'Support Available', icon: '🛟', suffix: '/7' }
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="text-center p-6 bg-gradient-to-br from-drone-50 to-sky-50 rounded-2xl"
                      >
                        <div className="text-3xl mb-2">{stat.icon}</div>
                        <div className="text-3xl font-bold text-drone-600 mb-1">
                          <AnimatedCounter end={stat.number} suffix={stat.suffix} duration={2} />
                        </div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Floating drone animation */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-10 -right-10 w-32 h-32 opacity-20"
                >
                  <img src="/drone-animated.svg" alt="Drone" className="w-full h-full" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recent Projects Showcase */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-block px-6 py-2 bg-purple-100 text-purple-700 rounded-full font-semibold mb-4"
            >
              Our Work
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Recent Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our portfolio of successful drone missions across various industries
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Mining Site Survey',
                category: 'Mapping & Surveying',
                image: '🏔️',
                description: 'Comprehensive 3D terrain mapping for mining operations'
              },
              {
                title: 'Real Estate Showcase',
                category: 'Aerial Photography',
                image: '🏢',
                description: 'Luxury property marketing with cinematic aerial footage'
              },
              {
                title: 'Infrastructure Inspection',
                category: 'Inspection Services',
                image: '🌉',
                description: 'Detailed structural assessment of bridge infrastructure'
              }
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-drone-100 to-sky-100 aspect-[4/3] mb-6">
                  <div className="absolute inset-0 flex items-center justify-center text-9xl opacity-30 group-hover:scale-110 transition-transform duration-500">
                    {project.image}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-sm font-semibold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-drone-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <motion.div
                  className="inline-flex items-center gap-2 text-drone-600 font-semibold"
                  whileHover={{ gap: 12 }}
                >
                  <span>View Project</span>
                  <span>→</span>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/portfolio">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary px-10 py-4 text-lg inline-flex items-center gap-3"
              >
                <span>View Full Portfolio</span>
                <span className="text-2xl">→</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Impressive Numbers */}
      <section className="section-padding bg-gradient-to-br from-drone-600 via-sky-600 to-purple-600 text-white relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"
            style={{ backgroundSize: '60px 60px' }}
          ></motion.div>
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Our numbers speak for themselves
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: 500, label: 'Successful Flights', icon: <img src="/drone-animated.svg" alt="Drone" className="w-12 h-12 mx-auto" />, suffix: '+' },
              { number: 50, label: 'Happy Clients', icon: '🤝', suffix: '+' },
              { number: 10000, label: 'Hours of Flight Time', icon: '⏱️', suffix: '+' },
              { number: 100, label: 'Safety Record', icon: '🛡️', suffix: '%' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: 'spring' }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all"
                >
                  <div className="text-5xl mb-4">{stat.icon}</div>
                  <div className="text-5xl md:text-6xl font-bold mb-3">
                    <AnimatedCounter end={stat.number} suffix={stat.suffix} duration={2.5} />
                  </div>
                  <div className="text-lg text-white/90 font-medium">{stat.label}</div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - Modern Design */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl"
          >
            {/* Background with gradient and pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-drone-600 via-sky-600 to-purple-600"></div>
            <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>

            {/* Floating drones */}
            <motion.div
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-10 left-10 w-24 h-24 opacity-20"
            >
              <img src="/drone-animated.svg" alt="Drone" className="w-full h-full" />
            </motion.div>
            <motion.div
              animate={{
                x: [0, -80, 0],
                y: [0, 40, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute bottom-10 right-10 w-24 h-24 opacity-20"
            >
              <img src="/drone-animated.svg" alt="Drone" className="w-full h-full" />
            </motion.div>
            
            <div className="relative z-10 text-center p-12 md:p-20 text-white">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-bold mb-6"
              >
                Ready to Elevate Your Project?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl md:text-2xl mb-10 text-white/90 max-w-3xl mx-auto"
              >
                Get in touch today for a free consultation and custom quote for your drone service needs
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-drone-600 px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl transition-all inline-flex items-center gap-3"
                  >
                    <span>Get Started Now</span>
                    <span className="text-2xl">→</span>
                  </motion.button>
                </Link>
                <Link to="/portfolio">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-all inline-flex items-center gap-3"
                  >
                    <span>View Our Work</span>
                    <span className="text-2xl">→</span>
                  </motion.button>
                </Link>
              </motion.div>

              {/* Contact info */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-12 pt-12 border-t border-white/20"
              >
                <div className="flex flex-col md:flex-row gap-6 justify-center items-center text-white/90">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📞</span>
                    <span className="font-semibold">+233 54 150 0716</span>
                  </div>
                  <div className="hidden md:block text-white/40">|</div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📧</span>
                    <span className="font-semibold">info@creativeapproach.gh</span>
                  </div>
                  <div className="hidden md:block text-white/40">|</div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📍</span>
                    <span className="font-semibold">Takoradi, Ghana</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
