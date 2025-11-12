import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quotationAPI } from '../services/api';
import SEO, { seoPresets } from '../components/SEO';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    projectType: '',
    budget: '',
    timeline: '',
    location: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [activeContactMethod, setActiveContactMethod] = useState('form');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.service) newErrors.service = 'Please select a service';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      setSubmitError('');
      
      try {
        // Submit to backend API
        const response = await quotationAPI.submitQuote(formData);
        
        setSubmitted(true);
        setIsSubmitting(false);
        console.log('Quote submitted:', response);
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            service: '',
            projectType: '',
            budget: '',
            timeline: '',
            location: '',
            message: ''
          });
          setSubmitted(false);
        }, 5000);
      } catch (error) {
        setIsSubmitting(false);
        setSubmitError(error.message || 'Failed to submit quote request. Please try again.');
        console.error('Quote submission error:', error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const contactInfo = [
    {
      icon: '📍',
      title: 'Visit Us',
      primary: 'Racecourse – Takoradi',
      secondary: 'Western Region, Ghana',
      action: null,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '📞',
      title: 'Call Us',
      primary: '+233 54 150 0716',
      secondary: '+233 20 386 5717',
      action: 'tel:+233541500716',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '✉️',
      title: 'Email Us',
      primary: 'sales@caghana.com',
      secondary: 'Available 24/7',
      action: 'mailto:sales@caghana.com',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '⏰',
      title: 'Working Hours',
      primary: 'Mon - Fri: 8AM - 6PM',
      secondary: 'Sat: 9AM - 2PM',
      action: null,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const services = [
    'Aerial Photography & Videography',
    'Drone Inspection & Monitoring',
    'Mapping, Surveying & 3D Modelling',
    'Documentary Films & Photography',
    'Custom Data Services & Training',
    'Emergency Response & Surveillance',
    'Real Estate Marketing',
    'Construction Progress Monitoring',
    'Agricultural Monitoring',
    'Infrastructure Inspection',
    'Other'
  ];

  const projectTypes = [
    'One-time Project',
    'Ongoing Contract',
    'Emergency Service',
    'Consultation Only',
    'Not Sure Yet'
  ];

  const budgetRanges = [
    'Under GH₵ 5,000',
    'GH₵ 5,000 - GH₵ 10,000',
    'GH₵ 10,000 - GH₵ 25,000',
    'GH₵ 25,000 - GH₵ 50,000',
    'Over GH₵ 50,000',
    'Need Quote'
  ];

  const timelines = [
    'Urgent (Within 1 week)',
    'Soon (1-2 weeks)',
    'Flexible (1 month+)',
    'Planning Phase'
  ];

  const contactMethods = [
    { id: 'form', label: 'Contact Form', icon: '📝' },
    { id: 'whatsapp', label: 'WhatsApp', icon: '💬' },
    { id: 'call', label: 'Phone Call', icon: '📞' }
  ];

  const faqs = [
    {
      question: 'How quickly can you start my project?',
      answer: 'For most projects, we can begin within 3-5 business days. Emergency services are available with same-day deployment.'
    },
    {
      question: 'Do you provide free quotes?',
      answer: 'Yes! All consultations and project quotes are completely free. We\'ll discuss your needs and provide a detailed proposal.'
    },
    {
      question: 'What areas do you serve?',
      answer: 'We\'re based in Takoradi but serve all of Ghana. We can deploy anywhere in the country for projects of all sizes.'
    },
    {
      question: 'Are your services insured?',
      answer: 'Absolutely. We carry comprehensive liability insurance and all our pilots are GCAA certified for your peace of mind.'
    }
  ];

  return (
    <>
      <SEO {...seoPresets.contact} />
      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative text-white section-padding overflow-hidden min-h-[60vh] flex items-center">
        {/* Background Image */}
        <img 
          src="/AERIAL PHOTOGRAPHY AND VIDEOGRAPHY/Atlantic.jpg" 
          alt="Contact Us" 
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
              <span className="text-sm font-semibold">We're Here to Help</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Let's Bring Your Vision
              <span className="block bg-gradient-to-r from-drone-400 via-sky-400 to-purple-400 bg-clip-text text-transparent">
                To New Heights
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Get in touch with our team for a free consultation and custom quote. We typically respond within 2 hours.
            </p>

            {/* Response Time Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-8 py-4"
            >
              <span className="text-3xl">⚡</span>
              <div className="text-left">
                <div className="font-bold">2-Hour Response Time</div>
                <div className="text-sm text-white/80">Available 24/7 for emergencies</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all overflow-hidden group"
              >
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${info.color} opacity-10 rounded-bl-full`}></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-4">{info.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{info.title}</h3>
                  {info.action ? (
                    <a href={info.action} className="block group">
                      <div className="text-drone-600 font-semibold mb-1 group-hover:text-drone-700">
                        {info.primary}
                      </div>
                      <div className="text-sm text-gray-500">{info.secondary}</div>
                    </a>
                  ) : (
                    <>
                      <div className="text-gray-700 font-semibold mb-1">{info.primary}</div>
                      <div className="text-sm text-gray-500">{info.secondary}</div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Method Tabs */}
      <section className="py-8 bg-white">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            {contactMethods.map((method) => (
              <motion.button
                key={method.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveContactMethod(method.id)}
                className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                  activeContactMethod === method.id
                    ? 'bg-gradient-to-r from-drone-600 to-sky-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{method.icon}</span>
                {method.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <AnimatePresence mode="wait">
            {activeContactMethod === 'form' && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid lg:grid-cols-2 gap-12"
              >
                {/* Contact Form */}
                <div>
                  <div className="mb-8">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Send Us a Message</h2>
                    <p className="text-gray-600 text-lg">Fill out the form below and we'll get back to you within 2 hours during business hours.</p>
                  </div>

                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-500 rounded-3xl p-10 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="text-5xl sm:text-6xl md:text-7xl mb-6"
                      >
                        ✅
                      </motion.div>
                      <h3 className="text-3xl font-bold text-green-700 mb-3">Quote Request Sent!</h3>
                      <p className="text-green-600 text-lg mb-4">Thank you for reaching out. We'll respond within 2 hours.</p>
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <span className="animate-pulse">●</span>
                        <span>Check your email for confirmation</span>
                      </div>
                    </motion.div>
                  ) : (
                    <>
                      {/* Error Message */}
                      {submitError && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-red-50 border-2 border-red-500 rounded-xl p-4 flex items-center gap-3"
                        >
                          <span className="text-2xl">⚠️</span>
                          <div>
                            <p className="font-bold text-red-700">Submission Failed</p>
                            <p className="text-red-600 text-sm">{submitError}</p>
                          </div>
                        </motion.div>
                      )}
                      
                      <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold mb-2 text-gray-700">Full Name *</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                              errors.name ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-drone-500 bg-white'
                            } outline-none`}
                            placeholder="John Doe"
                          />
                          {errors.name && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-500 text-sm mt-1 flex items-center gap-1"
                            >
                              <span>⚠️</span> {errors.name}
                            </motion.p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-bold mb-2 text-gray-700">Company (Optional)</label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-drone-500 outline-none transition-all"
                            placeholder="Your Company"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold mb-2 text-gray-700">Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                              errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-drone-500 bg-white'
                            } outline-none`}
                            placeholder="john@example.com"
                          />
                          {errors.email && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-500 text-sm mt-1 flex items-center gap-1"
                            >
                              <span>⚠️</span> {errors.email}
                            </motion.p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-bold mb-2 text-gray-700">Phone Number *</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                              errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-drone-500 bg-white'
                            } outline-none`}
                            placeholder="+233 24 123 4567"
                          />
                          {errors.phone && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-500 text-sm mt-1 flex items-center gap-1"
                            >
                              <span>⚠️</span> {errors.phone}
                            </motion.p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold mb-2 text-gray-700">Service Interested In *</label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                            errors.service ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-drone-500 bg-white'
                          } outline-none`}
                        >
                          <option value="">Select a service</option>
                          {services.map((service) => (
                            <option key={service} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>
                        {errors.service && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm mt-1 flex items-center gap-1"
                          >
                            <span>⚠️</span> {errors.service}
                          </motion.p>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold mb-2 text-gray-700">Project Type</label>
                          <select
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-drone-500 outline-none transition-all"
                          >
                            <option value="">Select type</option>
                            {projectTypes.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-bold mb-2 text-gray-700">Budget Range</label>
                          <select
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-drone-500 outline-none transition-all"
                          >
                            <option value="">Select budget</option>
                            {budgetRanges.map((range) => (
                              <option key={range} value={range}>
                                {range}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold mb-2 text-gray-700">Timeline</label>
                          <select
                            name="timeline"
                            value={formData.timeline}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-drone-500 outline-none transition-all"
                          >
                            <option value="">Select timeline</option>
                            {timelines.map((time) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-bold mb-2 text-gray-700">Project Location</label>
                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-drone-500 outline-none transition-all"
                            placeholder="City or Region in Ghana"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold mb-2 text-gray-700">Project Details *</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows="6"
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                            errors.message ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-drone-500 bg-white'
                          } outline-none resize-none`}
                          placeholder="Tell us about your project, goals, and any specific requirements..."
                        />
                        {errors.message && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm mt-1 flex items-center gap-1"
                          >
                            <span>⚠️</span> {errors.message}
                          </motion.p>
                        )}
                      </div>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-drone-600 to-sky-600 text-white py-5 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              ⚙️
                            </motion.span>
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <span className="text-2xl">→</span>
                          </>
                        )}
                      </motion.button>
                    </form>
                    </>
                  )}
                </div>

                {/* Right Column - FAQs & Info */}
                <div className="space-y-8">
                  {/* Quick Info */}
                  <div className="bg-gradient-to-br from-drone-600 to-sky-600 text-white rounded-3xl p-8 shadow-xl">
                    <h3 className="text-3xl font-bold mb-6">⚡ Why Choose Us?</h3>
                    <div className="space-y-4">
                      {[
                        { icon: '✓', text: 'Free consultation & quote' },
                        { icon: '✓', text: '2-hour response guarantee' },
                        { icon: '✓', text: 'GCAA certified pilots' },
                        { icon: '✓', text: 'Comprehensive insurance' },
                        { icon: '✓', text: '24/7 emergency services' },
                        { icon: '✓', text: 'Transparent pricing' }
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-3 text-lg"
                        >
                          <span className="text-2xl">{item.icon}</span>
                          <span>{item.text}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* FAQs */}
                  <div className="bg-gray-50 rounded-3xl p-8">
                    <h3 className="text-2xl font-bold mb-6 text-gray-900">Quick Answers</h3>
                    <div className="space-y-4">
                      {faqs.map((faq, index) => (
                        <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                          <h4 className="font-bold text-gray-900 mb-2">{faq.question}</h4>
                          <p className="text-gray-600 text-sm">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeContactMethod === 'whatsapp' && (
              <motion.div
                key="whatsapp"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center max-w-2xl mx-auto"
              >
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-12 border-2 border-green-500">
                  <div className="text-6xl sm:text-7xl md:text-8xl mb-6">💬</div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">Chat With Us on WhatsApp</h2>
                  <p className="text-xl text-gray-600 mb-8">
                    Get instant responses to your questions. We're available 24/7 for consultations and quotes.
                  </p>
                  <a
                    href="https://wa.me/233541500716"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                  >
                    <span className="text-2xl">📱</span>
                    <span>Start WhatsApp Chat</span>
                  </a>
                  <div className="mt-8 text-gray-600">
                    <p>+233 54 150 0716</p>
                    <p className="text-sm mt-2">Available Mon-Sat, 8AM-6PM</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeContactMethod === 'call' && (
              <motion.div
                key="call"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center max-w-2xl mx-auto"
              >
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-12 border-2 border-blue-500">
                  <div className="text-6xl sm:text-7xl md:text-8xl mb-6">📞</div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">Call Us Directly</h2>
                  <p className="text-xl text-gray-600 mb-8">
                    Speak with our team for immediate assistance. We're here to answer your questions and provide expert advice.
                  </p>
                  <div className="space-y-4">
                    <a
                      href="tel:+233541500716"
                      className="block bg-gradient-to-r from-drone-600 to-sky-600 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-3xl">📱</span>
                        <span>+233 54 150 0716</span>
                      </div>
                      <div className="text-sm mt-2 opacity-90">Primary Line</div>
                    </a>
                    <a
                      href="tel:+233203865717"
                      className="block bg-white text-gray-900 px-10 py-5 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all border-2 border-gray-200"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-3xl">📞</span>
                        <span>+233 20 386 5717</span>
                      </div>
                      <div className="text-sm mt-2 text-gray-600">Alternative Line</div>
                    </a>
                  </div>
                  <div className="mt-8 text-gray-600">
                    <p className="font-semibold">Working Hours</p>
                    <p className="text-sm mt-2">Mon-Fri: 8:00 AM - 6:00 PM</p>
                    <p className="text-sm">Sat: 9:00 AM - 2:00 PM</p>
                    <p className="text-sm mt-2 text-red-600 font-semibold">24/7 Emergency Services Available</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Find Us in Takoradi</h2>
            <p className="text-xl text-gray-600">Visit our office for in-person consultations</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="relative h-[350px] sm:h-[450px] md:h-[500px] w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31777.456789!2d-1.7502!3d4.8967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdde8c1e1e1e1e1%3A0x1e1e1e1e1e1e1e1e!2sTakoradi%2C%20Ghana!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Creative Approach Location - Takoradi, Ghana"
                className="rounded-3xl"
              ></iframe>
              
              {/* Location Overlay Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-drone-600 to-sky-600 rounded-xl flex items-center justify-center text-2xl text-white flex-shrink-0">
                    �
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Our Office</h3>
                    <p className="text-gray-700 mb-3">
                      Racecourse – Takoradi<br />
                      Western Region, Ghana
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="https://www.google.com/maps/dir/?api=1&destination=Takoradi,Ghana"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-drone-600 to-sky-600 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all"
                      >
                        <span>🧭</span>
                        <span>Get Directions</span>
                      </a>
                      <a
                        href="tel:+233541500716"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-200 transition-all"
                      >
                        <span>📞</span>
                        <span>Call Us</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      </div>
    </>
  );
}
