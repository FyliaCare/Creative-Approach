import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Users, BookOpen, Award, MessageCircle, FileText, Monitor, Trophy, CheckCircle, TrendingUp, Clock, Target, Brain, ChevronRight } from 'lucide-react';
import SEO, { seoPresets } from '../../components/SEO';

export default function CustomTraining() {
  const stats = [
    { label: 'Students Trained', value: '500+' },
    { label: 'Certification Rate', value: '98%' },
    { label: 'Corporate Clients', value: '50+' },
    { label: 'Satisfaction Score', value: '4.9/5' }
  ];

  const benefits = [
    {
      icon: Award,
      title: 'GCAA-Certified Training',
      description: 'Official training recognized by Ghana Civil Aviation Authority, leading to legitimate RPL (Remote Pilot License) certification.'
    },
    {
      icon: Users,
      title: 'Expert Instructors',
      description: 'Learn from licensed pilots with 5+ years commercial experience and thousands of flight hours across multiple industries.'
    },
    {
      icon: Target,
      title: 'Customized Programs',
      description: 'Tailored curriculum designed for your specific needs, industry, and skill level—from beginners to advanced operators.'
    },
    {
      icon: TrendingUp,
      title: 'Career Support',
      description: 'Job placement assistance, portfolio development, ongoing mentorship, and access to our professional network.'
    }
  ];

  const process = [
    {
      step: '01',
      icon: MessageCircle,
      title: 'Needs Assessment',
      duration: '1 day',
      description: 'Discuss objectives, evaluate current skills, identify knowledge gaps, and design customized training program.'
    },
    {
      step: '02',
      icon: BookOpen,
      title: 'Theory Training',
      duration: '5-10 days',
      description: 'Aviation regulations, meteorology, airspace classification, flight planning, risk assessment, and emergency procedures.'
    },
    {
      step: '03',
      icon: Monitor,
      title: 'Simulator Practice',
      duration: '3-5 days',
      description: 'Virtual flight training, emergency scenario simulations, controlled environment practice for safe skill development.'
    },
    {
      step: '04',
      icon: Trophy,
      title: 'Practical Flight Training',
      duration: '10-20 hours',
      description: 'Hands-on drone operations, supervised flights, various weather conditions, real-world scenarios, and skill assessment.'
    },
    {
      step: '05',
      icon: Award,
      title: 'Certification & Licensing',
      duration: '1-2 weeks',
      description: 'GCAA examination preparation, practical test, RPL license application, and official certification issuance.'
    }
  ];

  const applications = [
    {
      title: 'RPL License Training',
      icon: '🎓',
      description: 'Complete program for GCAA Remote Pilot License certification with exam preparation',
      stats: '98% pass rate on first attempt'
    },
    {
      title: 'Corporate Training',
      icon: '🏢',
      description: 'Team training for construction, surveying, inspection, or media companies implementing drone programs',
      stats: 'Train entire teams efficiently'
    },
    {
      title: 'Data Processing Skills',
      icon: '💻',
      description: 'Learn Pix4D, DroneDeploy, Agisoft Metashape for photogrammetry and 3D modeling',
      stats: 'Master industry-standard software'
    },
    {
      title: 'Inspection Techniques',
      icon: '🔍',
      description: 'Specialized training for infrastructure inspection, thermal imaging, and defect identification',
      stats: 'Industry-specific applications'
    },
    {
      title: 'Safety & Compliance',
      icon: '✅',
      description: 'Risk assessment, flight planning, airspace regulations, and emergency procedures',
      stats: 'Zero-accident safety culture'
    },
    {
      title: 'Advanced Cinematography',
      icon: '🎬',
      description: 'Master cinematic techniques, camera settings, motion planning, and creative storytelling',
      stats: 'Elevate your visual content'
    }
  ];

  const equipment = [
    {
      name: 'Training Drones Fleet',
      specs: 'DJI Mini 3 Pro, Mavic 3, Phantom 4 Pro for progressive learning',
      use: 'Hands-on practice equipment'
    },
    {
      name: 'Simulation Software',
      specs: 'DJI Flight Simulator, RealFlight, industry-standard virtual training',
      use: 'Safe virtual environment practice'
    },
    {
      name: 'Classroom Facilities',
      specs: 'Modern training room, projectors, computers, manuals, resources',
      use: 'Professional learning environment'
    }
  ];

  const faqs = [
    {
      question: 'Do I need prior experience to start drone training?',
      answer: 'No prior experience required for our Beginner program. We teach from fundamentals including basic aviation concepts, drone technology, and safety protocols. If you can operate a smartphone, you can learn to fly drones. For advanced programs, basic flight experience is beneficial but not mandatory—we assess skills and customize training accordingly.'
    },
    {
      question: 'How long does it take to get GCAA RPL license?',
      answer: 'Our RPL Certification Program typically takes 4-8 weeks depending on your pace and schedule flexibility. This includes 10 days theory (can be weekends), 20 hours practical training (scheduled based on weather and availability), exam preparation, and GCAA licensing process. Intensive accelerated programs available for urgent needs (minimum 3 weeks).'
    },
    {
      question: 'What are the requirements for GCAA RPL certification?',
      answer: 'Applicants must be 18+ years old, have basic English literacy, pass a medical fitness declaration, complete approved training, pass GCAA written examination (70%+ score), demonstrate practical flight competency, and submit application with required documentation. We guide you through entire process and handle most paperwork on your behalf.'
    },
    {
      question: 'Is training available on weekends or evenings?',
      answer: 'Yes, we offer flexible scheduling including weekends and late afternoons/early evenings for theory sessions. Practical flight training is primarily daytime (weather-dependent) but can be scheduled for weekends. Corporate groups can arrange custom schedules. We accommodate working professionals and understand scheduling constraints.'
    },
    {
      question: 'What happens if I fail the GCAA exam?',
      answer: 'Our 98% first-attempt pass rate means most students succeed initially. If needed, we provide additional study materials, one-on-one tutoring, and exam retake preparation at no extra cost (included in RPL program). GCAA allows exam retakes after 30 days. We support you until successful certification—your success is our success.'
    },
    {
      question: 'Do you provide drones or do I need my own?',
      answer: 'All training drones provided during the program—no equipment purchase required to learn. We recommend practicing with your own drone if you have one, but it\'s optional. After certification, we offer equipment purchasing guidance, recommendations based on your intended use, and discounts through our vendor partnerships.'
    },
    {
      question: 'Can you train my company team on-site?',
      answer: 'Absolutely. Enterprise training can be delivered at your location for teams of 5+ people. We bring instructors, training drones, and materials to your site. Benefits include minimal travel disruption, team bonding, site-specific training scenarios, and customized curriculum for your operations. Requires suitable training space and flight area. Contact us for custom quote.'
    },
    {
      question: 'Do you offer refresher courses or advanced training?',
      answer: 'Yes, we offer annual refresher courses (required by GCAA), advanced technique workshops (thermal imaging, mapping, cinematography), software-specific training (Pix4D, DroneDeploy, etc.), and specialized application courses (inspection, surveying, media). Alumni receive discounted rates. Many clients return for skill upgrades as technology advances or their business needs evolve.'
    }
  ];

  return (
    <>
      <SEO {...seoPresets.customTraining} />
      <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-700 to-pink-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container-custom relative z-10 text-center text-white py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/10 backdrop-blur-lg mb-6"
          >
            <GraduationCap className="w-12 h-12" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Custom Data Services & Training
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-3xl mx-auto"
          >
            GCAA-certified drone training programs and specialized data solutions for professionals and enterprises
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/contact"
              className="px-8 py-4 bg-white text-indigo-600 rounded-full font-semibold hover:bg-indigo-50 transition-all hover:scale-105"
            >
              Enroll Today
            </Link>
            <Link
              to="/portfolio"
              className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white rounded-full font-semibold hover:bg-white/20 transition-all"
            >
              View Success Stories
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gradient-to-r from-indigo-600 to-pink-600 py-12">
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
                <div className="text-indigo-100">{stat.label}</div>
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
                Professional Drone Education
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Whether you're pursuing GCAA Remote Pilot License certification, training your team for commercial operations, or seeking specialized data services, we provide comprehensive solutions backed by expert instruction and hands-on experience.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our certified instructors bring real-world expertise from thousands of commercial flights across multiple industries. We don't just teach you to fly—we prepare you for successful professional drone operations with emphasis on safety, compliance, and business applications.
              </p>
              
              <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg border-2 border-indigo-200">
                <Award className="w-8 h-8 text-indigo-600 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900">GCAA Approved Training Provider</div>
                  <div className="text-sm text-gray-600">Official certification • 98% pass rate • 500+ graduates</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500"
                alt="Drone training"
                className="rounded-lg shadow-xl"
              />
              <img
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500"
                alt="Flight instruction"
                className="rounded-lg shadow-xl mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500"
                alt="Classroom training"
                className="rounded-lg shadow-xl -mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=500"
                alt="Certification"
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
              Why Train With Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Industry-leading instruction that launches successful drone careers
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
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
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
      <section className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Training Journey
            </h2>
            <p className="text-xl text-gray-600">
              Structured path from beginner to certified professional
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
                  <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-indigo-600 to-pink-600"></div>
                )}
                
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-indigo-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    <step.icon className="w-8 h-8" />
                  </div>
                  
                  <div className="flex-grow bg-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                      <span className="text-sm text-indigo-600 font-semibold">{step.duration}</span>
                    </div>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Quote Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-pink-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Custom Training Programs</h2>
              <p className="text-xl text-gray-700 mb-4">
                Every team has unique training needs and skill levels.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                From beginner drone pilot certification to advanced commercial cinematography, we'll design a customized training program that fits your schedule, location, and learning objectives.
              </p>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-4 bg-gradient-to-r from-indigo-600 to-pink-600 text-white text-lg rounded-full font-semibold hover:from-indigo-700 hover:to-pink-700 transition-all shadow-xl"
                >
                  Request Custom Quote
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Training Specializations
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive programs for diverse applications
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
                <div className="text-sm font-semibold text-indigo-600">{app.stats}</div>
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
              Training Resources
            </h2>
            <p className="text-xl text-gray-600">
              Professional facilities and equipment
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {equipment.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-indigo-50 to-pink-50 p-6 rounded-xl"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-3">{item.specs}</p>
                <div className="text-sm text-indigo-600 font-semibold">→ {item.use}</div>
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
                  <ChevronRight className="w-5 h-5 text-indigo-600 group-open:rotate-90 transition-transform" />
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
      <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-700 to-pink-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Launch Your Drone Career?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join 500+ successful graduates and start your journey to GCAA certification
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-white text-indigo-600 rounded-full font-semibold hover:bg-indigo-50 transition-all hover:scale-105"
            >
              Enroll Today
            </Link>
            <Link
              to="/portfolio"
              className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white rounded-full font-semibold hover:bg-white/20 transition-all"
            >
              Meet Our Graduates
            </Link>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
