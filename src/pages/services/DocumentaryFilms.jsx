import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Film, Video, Clapperboard, Palette, MessageCircle, FileText, Camera, Edit, Package, TrendingUp, Clock, Users, CheckCircle, ChevronRight } from 'lucide-react';
import SEO, { seoPresets } from '../../components/SEO';

export default function DocumentaryFilms() {
  const stats = [
    { label: 'Films Produced', value: '50+' },
    { label: 'Total Views', value: '5M+' },
    { label: 'Award Nominations', value: '15' },
    { label: 'Client Satisfaction', value: '100%' }
  ];

  const benefits = [
    {
      icon: Clapperboard,
      title: 'Compelling Storytelling',
      description: 'Expert narrative development that connects with audiences emotionally and drives engagement through powerful visual storytelling.'
    },
    {
      icon: Palette,
      title: 'Cinematic Quality',
      description: 'Professional-grade production with 8K cameras, aerial cinematography, color grading, and sound design for broadcast-ready content.'
    },
    {
      icon: Users,
      title: 'Full Production Team',
      description: 'Complete crew including directors, cinematographers, editors, sound engineers, and drone pilots working seamlessly together.'
    },
    {
      icon: Clock,
      title: 'Efficient Production',
      description: 'Streamlined workflows and experienced project management ensure on-time delivery without compromising creative vision.'
    }
  ];

  const process = [
    {
      step: '01',
      icon: MessageCircle,
      title: 'Concept Development',
      duration: '1-2 weeks',
      description: 'Collaborative brainstorming, research, story arc development, character identification, and creative brief finalization.'
    },
    {
      step: '02',
      icon: FileText,
      title: 'Pre-Production',
      duration: '2-3 weeks',
      description: 'Script writing, storyboarding, location scouting, talent casting, crew assembly, equipment planning, and shot list creation.'
    },
    {
      step: '03',
      icon: Camera,
      title: 'Production',
      duration: '1-4 weeks',
      description: 'Multi-camera filming, aerial cinematography, interviews, B-roll capture, on-location sound recording, and daily footage review.'
    },
    {
      step: '04',
      icon: Edit,
      title: 'Post-Production',
      duration: '3-6 weeks',
      description: 'Video editing, color grading, sound mixing, music composition, motion graphics, visual effects, and title sequences.'
    },
    {
      step: '05',
      icon: Package,
      title: 'Delivery & Distribution',
      duration: '1 week',
      description: 'Final rendering, format exports, screening coordination, distribution support, and marketing asset creation.'
    }
  ];

  const packages = [
    {
      name: 'Short Documentary',
      price: 'GHS 15,000',
      description: '10-15 minute film',
      features: [
        'Up to 15-minute runtime',
        'Single subject/location',
        '3-5 filming days',
        '2-3 interviews',
        'Aerial cinematography',
        'Professional editing',
        'Color grading',
        'Sound design & music',
        '1080p final delivery',
        '2 revision rounds'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Feature Documentary',
      price: 'GHS 45,000',
      description: '30-45 minute film',
      features: [
        'Up to 45-minute runtime',
        'Multiple subjects/locations',
        '10-15 filming days',
        '8-12 interviews',
        'Extensive aerial footage',
        'Multi-camera production',
        'Professional sound recording',
        'Advanced color grading',
        'Original music composition',
        'Motion graphics & animation',
        '4K final delivery',
        'Behind-the-scenes content',
        'Unlimited revisions',
        'Film festival submission support'
      ],
      cta: 'Most Popular',
      popular: true
    },
    {
      name: 'Series Production',
      price: 'Custom Quote',
      description: 'Multi-episode series',
      features: [
        '3-10 episode series',
        'Comprehensive storytelling',
        'Extended production schedule',
        'Multiple filming locations',
        '20+ interviews',
        'Complete production crew',
        'Dedicated director',
        'Show branding & graphics',
        'Episode-specific music',
        '4K/8K delivery options',
        'Distribution consultation',
        'Social media content',
        'Promotional materials',
        'Screening event coordination',
        'Ongoing creative partnership'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  const applications = [
    {
      title: 'Corporate Stories',
      icon: '🏢',
      description: 'Company history, brand values, founder journeys, impact stories, and employee spotlights',
      stats: 'Boost brand credibility 85%'
    },
    {
      title: 'Cultural Heritage',
      icon: '🎭',
      description: 'Preserve traditions, document ceremonies, showcase artisans, and celebrate community identity',
      stats: 'Archive for future generations'
    },
    {
      title: 'Environmental Stories',
      icon: '🌍',
      description: 'Conservation efforts, climate change impact, wildlife protection, sustainability initiatives',
      stats: 'Drive 3x more engagement'
    },
    {
      title: 'Tourism Promotion',
      icon: '✈️',
      description: 'Destination showcases, travel experiences, adventure activities, cultural attractions',
      stats: '60% increase in bookings'
    },
    {
      title: 'Social Impact',
      icon: '❤️',
      description: 'NGO work, community development, education programs, humanitarian projects',
      stats: 'Increase donations 2.5x'
    },
    {
      title: 'Biographical Films',
      icon: '👤',
      description: 'Personal stories, career highlights, life achievements, legacy documentation',
      stats: 'Timeless family treasures'
    }
  ];

  const equipment = [
    {
      name: 'Sony FX6 Cinema Camera',
      specs: '4K 120fps, 15+ stops DR, S-Log3, Full-frame sensor',
      use: 'Primary cinema-quality capture'
    },
    {
      name: 'DJI Inspire 3 (Aerial)',
      specs: '8K CinemaDNG, 14+ stops DR, Full-frame, Waypoint Pro',
      use: 'Cinematic aerial sequences'
    },
    {
      name: 'Complete Audio Package',
      specs: 'Sennheiser wireless, boom mics, Zoom F6 recorder',
      use: 'Professional sound capture'
    }
  ];

  const faqs = [
    {
      question: 'What is the typical timeline for documentary production?',
      answer: 'A short documentary (10-15 min) typically takes 6-10 weeks from concept to delivery. Feature documentaries (30-45 min) require 3-5 months. Series productions vary based on episode count and complexity. Timelines include pre-production planning, filming, post-production, and revision rounds. Rush production available for urgent projects at additional cost.'
    },
    {
      question: 'Do you help with story development and scripting?',
      answer: 'Absolutely. Our team includes experienced documentary directors and writers who guide story development. We conduct research, identify compelling narratives, structure story arcs, and develop shooting scripts. For interview-heavy documentaries, we prepare question guides and work with subjects to capture authentic, powerful testimonials.'
    },
    {
      question: 'What if we need to film in multiple locations?',
      answer: 'We regularly produce documentaries across Ghana and internationally. We handle all logistics including location scouting, permits, travel arrangements, local crew coordination, and equipment transport. Our team is experienced with remote locations, challenging environments, and multi-country productions. Travel and accommodation costs are itemized separately.'
    },
    {
      question: 'Who owns the rights to the finished documentary?',
      answer: 'Standard agreement grants you full ownership and unlimited usage rights for the final documentary. We retain the right to use excerpts for our portfolio and showreel unless exclusive rights are negotiated. For broadcast, streaming, or theatrical distribution, we provide all necessary rights documentation. Music licensing and talent releases are included in production costs.'
    },
    {
      question: 'Can you handle distribution and marketing?',
      answer: 'Yes. We offer distribution consulting including film festival submissions, broadcaster pitching, streaming platform guidance, and YouTube optimization. We can produce trailers, teasers, social media content, and promotional materials. For clients seeking wide distribution, we connect with our network of distributors, aggregators, and exhibition partners.'
    },
    {
      question: 'What if the story changes during production?',
      answer: 'Documentary storytelling is inherently flexible. We build adaptability into our process and regularly reassess the narrative as filming progresses. If the story evolves, we adjust shot lists and interview questions accordingly. Major scope changes may affect budget and timeline, which we discuss transparently. Our goal is serving the best story, not rigid adherence to initial plans.'
    },
    {
      question: 'Do you provide translation or subtitling services?',
      answer: 'Yes. We offer professional translation, subtitling, and closed captioning in multiple languages. This includes transcription, translation by native speakers, subtitle timing, on-screen text translations, and accessibility compliance. Essential for international distribution and reaching diverse audiences. Available in 20+ languages including English, French, Arabic, and local Ghanaian languages.'
    },
    {
      question: 'What makes a documentary successful?',
      answer: 'Successful documentaries combine compelling subjects, authentic storytelling, strong visuals, emotional resonance, and clear messaging. We focus on finding universal themes within specific stories, capturing intimate moments, maintaining narrative momentum, and delivering production quality that matches the story\'s importance. Our track record includes films with millions of views, award recognition, and measurable client impact.'
    }
  ];

  return (
    <>
      <SEO {...seoPresets.documentaryFilms} />
      <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-900 via-red-700 to-pink-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container-custom relative z-10 text-center text-white py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/10 backdrop-blur-lg mb-6"
          >
            <Film className="w-12 h-12" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Documentary Films & Photography
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-orange-100 mb-8 max-w-3xl mx-auto"
          >
            Powerful stories that inspire, educate, and connect audiences through cinematic visual storytelling
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/contact"
              className="px-8 py-4 bg-white text-orange-600 rounded-full font-semibold hover:bg-orange-50 transition-all hover:scale-105"
            >
              Start Your Story
            </Link>
            <Link
              to="/portfolio"
              className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white rounded-full font-semibold hover:bg-white/20 transition-all"
            >
              Watch Our Films
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gradient-to-r from-orange-600 to-pink-600 py-12">
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
                <div className="text-orange-100">{stat.label}</div>
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
                Stories That Move Audiences
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We craft documentaries that go beyond simple recording—we create emotional journeys that engage, inspire, and drive action. Our full-service production team handles everything from concept development to final delivery, ensuring your story reaches its full potential.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Whether showcasing cultural heritage, corporate achievements, environmental causes, or personal journeys, we combine cinematic techniques with authentic storytelling to produce films that resonate long after the credits roll.
              </p>
              
              <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                <Film className="w-8 h-8 text-orange-600 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900">Award-Winning Production</div>
                  <div className="text-sm text-gray-600">15 nominations • 5M+ views • Festival screened</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500"
                alt="Film production"
                className="rounded-lg shadow-xl"
              />
              <img
                src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500"
                alt="Documentary filming"
                className="rounded-lg shadow-xl mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=500"
                alt="Interview setup"
                className="rounded-lg shadow-xl -mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500"
                alt="Cinematography"
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
              Why Choose Our Documentary Services?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional storytelling that delivers impact and lasting value
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
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
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
      <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Production Process
            </h2>
            <p className="text-xl text-gray-600">
              From concept to premiere—comprehensive documentary filmmaking
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
                  <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-orange-600 to-pink-600"></div>
                )}
                
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-orange-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    <step.icon className="w-8 h-8" />
                  </div>
                  
                  <div className="flex-grow bg-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                      <span className="text-sm text-orange-600 font-semibold">{step.duration}</span>
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
              Production Packages
            </h2>
            <p className="text-xl text-gray-600">
              Flexible solutions for every story and budget
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
                  pkg.popular ? 'ring-4 ring-orange-600 scale-105' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="bg-gradient-to-r from-orange-600 to-pink-600 text-white text-center py-2 font-semibold">
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
                        <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    to="/contact"
                    className={`block w-full py-3 rounded-lg text-center font-semibold transition-all ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-orange-600 to-pink-600 text-white hover:shadow-lg'
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
              Documentary Applications
            </h2>
            <p className="text-xl text-gray-600">
              Stories that matter across every sector
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
                <div className="text-sm font-semibold text-orange-600">{app.stats}</div>
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
              Cinema-Grade Equipment
            </h2>
            <p className="text-xl text-gray-600">
              Professional tools for broadcast-quality production
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {equipment.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-orange-50 to-pink-50 p-6 rounded-xl"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-3">{item.specs}</p>
                <div className="text-sm text-orange-600 font-semibold">→ {item.use}</div>
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
                  <ChevronRight className="w-5 h-5 text-orange-600 group-open:rotate-90 transition-transform" />
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
      <section className="py-20 bg-gradient-to-br from-orange-900 via-red-700 to-pink-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Tell Your Story?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Let's create a documentary that inspires, educates, and drives meaningful change
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-white text-orange-600 rounded-full font-semibold hover:bg-orange-50 transition-all hover:scale-105"
            >
              Start Your Project
            </Link>
            <Link
              to="/portfolio"
              className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white rounded-full font-semibold hover:bg-white/20 transition-all"
            >
              Watch Our Work
            </Link>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
