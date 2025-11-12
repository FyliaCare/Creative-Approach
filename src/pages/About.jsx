import React, { useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';
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

export default function About() {
  const [activeTab, setActiveTab] = useState('story');
  const [selectedMember, setSelectedMember] = useState(null);

  const stats = [
    { number: 500, suffix: '+', label: 'Projects Completed', icon: '📊' },
    { number: 50, suffix: '+', label: 'Happy Clients', icon: '😊' },
    { number: 10000, suffix: '+', label: 'Flight Hours', icon: '⏱️' },
    { number: 100, suffix: '%', label: 'Safety Record', icon: '🛡️' }
  ];

  const team = [
    {
      name: 'Kwame Mensah',
      role: 'CEO & Lead Pilot',
      bio: '10+ years in aviation, certified drone instructor with GCAA credentials',
      image: '👨‍✈️',
      achievements: [
        'GCAA Certified Drone Pilot',
        '10,000+ successful flight hours',
        'Aviation Safety Award 2023',
        'Lead Instructor for drone training'
      ],
      specialties: ['Flight Operations', 'Safety Management', 'Team Leadership', 'Client Relations']
    },
    {
      name: 'Ama Owusu',
      role: 'Creative Director',
      bio: 'Award-winning cinematographer and visual storyteller',
      image: '🎬',
      achievements: [
        'National Film Award Winner',
        '50+ documentary projects',
        'International recognition',
        'Creative excellence in media'
      ],
      specialties: ['Cinematography', 'Visual Storytelling', 'Post-Production', 'Art Direction']
    },
    {
      name: 'Kofi Asante',
      role: 'Technical Director',
      bio: 'Engineering expert in drone technology and systems',
      image: '👨‍💻',
      achievements: [
        'Masters in Aerospace Engineering',
        'Drone systems specialist',
        'GIS & mapping expert',
        'Technology innovation leader'
      ],
      specialties: ['Drone Technology', 'GIS Mapping', '3D Modeling', 'Data Processing']
    },
    {
      name: 'Akua Boateng',
      role: 'Operations Manager',
      bio: 'Logistics specialist ensuring smooth project execution',
      image: '👩‍💼',
      achievements: [
        'PMP Certified',
        '100+ successful projects',
        'Operations excellence',
        'Client satisfaction expert'
      ],
      specialties: ['Project Management', 'Logistics', 'Quality Control', 'Client Coordination']
    }
  ];

  const timeline = [
    { 
      year: '2015', 
      event: 'Company Founded', 
      description: 'Started with a vision to revolutionize aerial services in Ghana',
      icon: '🚀',
      details: 'Founded in Takoradi with a small team and a big vision to transform how aerial data is captured and used in Ghana.'
    },
    { 
      year: '2017', 
      event: 'First Major Contract', 
      description: 'Secured government infrastructure inspection project',
      icon: '🏗️',
      details: 'Won competitive bid for large-scale government infrastructure project, establishing our reputation for quality.'
    },
    { 
      year: '2019', 
      event: 'Fleet Expansion', 
      description: 'Expanded to 15 professional-grade drones',
      icon: '🚁',
      details: 'Invested in cutting-edge drone technology including thermal imaging and 3D mapping capabilities.'
    },
    { 
      year: '2021', 
      event: 'Regional Leader', 
      description: 'Became West Africa\'s top drone service provider',
      icon: '🏆',
      details: 'Recognized as the leading drone services company in West Africa with clients across multiple countries.'
    },
    { 
      year: '2023', 
      event: 'Innovation Award', 
      description: 'Received National Innovation Award for Technology',
      icon: '🥇',
      details: 'Honored with Ghana\'s National Innovation Award for pioneering drone applications in agriculture and mining.'
    },
    { 
      year: '2024', 
      event: 'International Recognition', 
      description: 'Featured in global drone industry publications',
      icon: '🌍',
      details: 'Featured in international publications and invited to speak at global drone technology conferences.'
    }
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Excellence',
      description: 'We deliver nothing but the highest quality in every project',
      details: 'Our commitment to excellence drives us to exceed expectations in every flight, every capture, every delivery.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🔒',
      title: 'Safety First',
      description: 'Safety protocols and regulations are our top priority',
      details: '100% safety record maintained through rigorous training, maintenance, and adherence to GCAA standards.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: 'Constantly pushing boundaries with cutting-edge technology',
      details: 'We invest in the latest drone technology and continuously develop new applications and solutions.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '🤝',
      title: 'Integrity',
      description: 'Building trust through transparent and ethical practices',
      details: 'Honest communication, fair pricing, and ethical business practices are the foundation of our relationships.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: '🌟',
      title: 'Quality',
      description: 'Uncompromising standards in every aspect of our work',
      details: 'From equipment maintenance to data processing, quality control is embedded in our processes.',
      color: 'from-teal-500 to-cyan-500'
    },
    {
      icon: '⚡',
      title: 'Efficiency',
      description: 'Fast turnaround without sacrificing quality',
      details: 'Streamlined workflows and experienced teams enable rapid delivery while maintaining excellence.',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const certifications = [
    { name: 'GCAA Certified', icon: '✓', color: 'text-green-600' },
    { name: 'ISO 9001:2015', icon: '📋', color: 'text-blue-600' },
    { name: 'Insurance Coverage', icon: '🛡️', color: 'text-purple-600' },
    { name: 'Safety Compliance', icon: '🔒', color: 'text-orange-600' }
  ];

  const services = [
    { title: 'Aerial Photography', count: '250+', icon: '📸' },
    { title: 'Mapping Projects', count: '150+', icon: '🗺️' },
    { title: 'Inspections', count: '100+', icon: '🔍' },
    { title: 'Documentaries', count: '50+', icon: '🎬' }
  ];

  return (
    <>
      <SEO {...seoPresets.about} />
      <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative text-white section-padding overflow-hidden min-h-[70vh] flex items-center">
        {/* Background Image */}
        <img 
          src="/AERIAL PHOTOGRAPHY AND VIDEOGRAPHY/DJI_20231201134820_0013_V.JPG" 
          alt="About CA Ghana" 
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        
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
              <span className="text-sm font-semibold">Pioneers in Aerial Innovation</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Where Technology Meets
              <span className="block bg-gradient-to-r from-drone-400 via-sky-400 to-purple-400 bg-clip-text text-transparent">
                Creative Vision
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Based in Takoradi, delivering cutting-edge drone and digital media solutions across Ghana and beyond
            </p>

            {/* Certifications */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {certifications.map((cert) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 flex items-center gap-2"
                >
                  <span className="text-xl">{cert.icon}</span>
                  <span className="text-sm font-semibold">{cert.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl mb-3">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-bold text-drone-600 mb-2">
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} duration={2.5} />
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="relative bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-drone-100 to-sky-100 rounded-bl-full"></div>
              <div className="relative z-10">
                <div className="text-4xl sm:text-5xl md:text-6xl mb-6">🎯</div>
                <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold mb-4 text-drone-900">Our Mission</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To deliver accurate aerial data, professional photography, and documentary films 
                  that help clients plan, build, and communicate their work effectively. To combine 
                  technology and creativity to produce results that are reliable, efficient, and meaningful.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="relative bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-bl-full"></div>
              <div className="relative z-10">
                <div className="text-4xl sm:text-5xl md:text-6xl mb-6">🚀</div>
                <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold mb-4 text-drone-900">Our Vision</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To be the leading provider of drone-based geospatial and visual media solutions 
                  in Ghana, delivering data and stories that drive progress and informed decision-making.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tabbed Content Section */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-6xl">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: 'story', label: 'Our Story', icon: '📖' },
              { id: 'journey', label: 'Our Journey', icon: '🛤️' },
              { id: 'services', label: 'What We Do', icon: '⚙️' }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-drone-600 to-sky-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'story' && (
              <motion.div
                key="story"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="prose prose-lg max-w-none"
              >
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 shadow-lg space-y-6 text-gray-700">
                  <p className="text-xl leading-relaxed">
                    Creative Approach was founded to meet the growing need for reliable aerial data, photography, and visual documentation services in Ghana. Operating from our base in Takoradi, we focus on using drone and digital media technology to support industries, organizations, and individuals with accurate, engaging, and high-quality visual content.
                  </p>
                  <p className="text-lg leading-relaxed">
                    We provide comprehensive drone surveying, aerial mapping, and inspection services for construction, mining, and agriculture projects. In addition, we produce professional photography and documentary films that capture development activities, corporate events, social initiatives, and environmental projects.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Our founders bring together backgrounds in GIS, media production, and drone technology. This combination of technical and creative expertise allows Creative Approach to deliver data-driven insights as well as powerful visual storytelling.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Creative Approach follows Ghana Civil Aviation Authority (GCAA) standards and maintains strong safety and quality procedures in every operation. Our goal is to become a trusted provider of both geospatial and media solutions, helping clients improve project outcomes, visibility, and communication through accurate data and compelling imagery.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'journey' && (
              <motion.div
                key="journey"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="space-y-8">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={item.year}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-6"
                    >
                      <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-drone-600 to-sky-600 rounded-2xl flex flex-col items-center justify-center text-white shadow-xl">
                        <div className="text-3xl mb-1">{item.icon}</div>
                        <div className="text-sm font-bold">{item.year}</div>
                      </div>
                      <div className="flex-1 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                        <h3 className="text-2xl font-bold mb-3 text-gray-900">{item.event}</h3>
                        <p className="text-gray-600 mb-3 text-lg">{item.description}</p>
                        <p className="text-gray-500">{item.details}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'services' && (
              <motion.div
                key="services"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {services.map((service, index) => (
                    <motion.div
                      key={service.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100"
                    >
                      <div className="text-5xl mb-4">{service.icon}</div>
                      <h3 className="text-2xl font-bold mb-2 text-gray-900">{service.title}</h3>
                      <div className="text-4xl font-bold text-drone-600">{service.count}</div>
                      <div className="text-gray-600 text-sm">Projects Delivered</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Meet Our <span className="bg-gradient-to-r from-drone-600 to-sky-600 bg-clip-text text-transparent">Expert Team</span>
            </h2>
            <p className="text-xl text-gray-600">Passionate professionals driving aerial innovation</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedMember(member)}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
              >
                <div className="text-5xl sm:text-6xl md:text-7xl mb-6 group-hover:scale-110 transition-transform">
                  {member.image}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{member.name}</h3>
                <p className="text-drone-600 font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                <button className="text-drone-600 font-semibold text-sm hover:text-drone-700 flex items-center gap-2">
                  View Profile
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Member Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-drone-600 to-sky-600 p-6 sm:p-8 md:p-8 text-white relative">
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  ✕
                </button>
                <div className="text-5xl sm:text-6xl md:text-7xl mb-4">{selectedMember.image}</div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{selectedMember.name}</h2>
                <p className="text-white/90 text-xl">{selectedMember.role}</p>
              </div>

              <div className="p-6 sm:p-8 md:p-8">
                <p className="text-lg text-gray-700 mb-8">{selectedMember.bio}</p>

                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Key Achievements</h3>
                  <div className="space-y-3">
                    {selectedMember.achievements.map((achievement, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl"
                      >
                        <span className="text-green-500 text-xl">✓</span>
                        <span className="text-gray-700">{achievement}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Specialties</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedMember.specialties.map((specialty) => (
                      <span key={specialty} className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Values Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our Core <span className="bg-gradient-to-r from-drone-600 to-sky-600 bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-6 text-3xl text-white group-hover:scale-110 transition-transform`}>
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{value.title}</h3>
                <p className="text-gray-600 mb-4">{value.description}</p>
                <p className="text-sm text-gray-500">{value.details}</p>
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
              Join Us on This
              <span className="block bg-gradient-to-r from-drone-400 via-sky-400 to-purple-400 bg-clip-text text-transparent">
                Incredible Journey
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Let's work together to bring your vision to new heights. Experience the difference that expertise, innovation, and passion make.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/contact"
                className="group px-10 py-5 bg-white text-drone-900 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  Start Your Project
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
                  📞 0541 500 716
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
      </section>
      </div>
    </>
  );
}
