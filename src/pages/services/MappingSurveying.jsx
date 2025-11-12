import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Map, Layers, Box, Ruler, MessageCircle, Settings, Camera, Database, FileText, Mountain, Building2, Tractor, HardHat, TrendingUp, Clock, CheckCircle, ChevronRight } from 'lucide-react';
import SEO, { seoPresets } from '../../components/SEO';

export default function MappingSurveying() {
  const stats = [
    { label: '500+ Projects', value: '500+' },
    { label: '±2cm Accuracy', value: '±2cm' },
    { label: '5-7 Days Turnaround', value: '5-7 Days' },
    { label: 'GIS-Ready Data', value: '100%' }
  ];

  const benefits = [
    {
      icon: Ruler,
      title: 'Survey-Grade Accuracy',
      description: 'RTK/PPK positioning delivers ±2-5cm horizontal and vertical accuracy, meeting professional surveying standards.'
    },
    {
      icon: TrendingUp,
      title: '10x Faster Coverage',
      description: 'Map hundreds of acres per day compared to traditional ground surveying methods, dramatically reducing project timelines.'
    },
    {
      icon: Database,
      title: 'Rich 3D Data',
      description: 'Generate detailed point clouds, meshes, and models with millions of data points for comprehensive analysis.'
    },
    {
      icon: Clock,
      title: 'Rapid Deployment',
      description: 'Quick mobilization and data collection with minimal site disruption. Same-day field work for many projects.'
    }
  ];

  const process = [
    {
      step: '01',
      icon: MessageCircle,
      title: 'Project Planning',
      duration: '1-2 days',
      description: 'Define survey objectives, establish accuracy requirements, plan ground control points, and obtain site access.'
    },
    {
      step: '02',
      icon: Settings,
      title: 'Site Preparation',
      duration: '1 day',
      description: 'Deploy ground control points (GCPs), configure RTK base station, verify GPS accuracy, and establish flight parameters.'
    },
    {
      step: '03',
      icon: Camera,
      title: 'Aerial Data Capture',
      duration: '2-6 hours',
      description: 'Execute automated flight missions with high-overlap imagery capture, RTK positioning, and redundant coverage.'
    },
    {
      step: '04',
      icon: Database,
      title: 'Data Processing',
      duration: '3-5 days',
      description: 'Process images into orthomosaics, DEMs, point clouds, and 3D models using photogrammetry software.'
    },
    {
      step: '05',
      icon: FileText,
      title: 'Deliverables',
      duration: 'Same day',
      description: 'Receive georeferenced maps, CAD/GIS files, volumetric reports, and interactive 3D models via cloud platform.'
    }
  ];

  const applications = [
    {
      title: 'Mining & Quarries',
      icon: '⛏️',
      description: 'Stockpile volumes, haul road monitoring, pit progression, and reclamation verification',
      stats: 'Track millions of cubic meters'
    },
    {
      title: 'Construction Sites',
      icon: '🏗️',
      description: 'Site planning, cut/fill analysis, progress tracking, as-built documentation',
      stats: 'Weekly/monthly monitoring'
    },
    {
      title: 'Urban Planning',
      icon: '🏙️',
      description: 'City modeling, infrastructure planning, development visualization, zoning analysis',
      stats: 'Map entire neighborhoods'
    },
    {
      title: 'Agriculture',
      icon: '🌾',
      description: 'Field mapping, drainage planning, precision agriculture, crop health assessment',
      stats: 'Survey 1000+ acres/day'
    },
    {
      title: 'Land Development',
      icon: '📐',
      description: 'Topographic surveys, boundary mapping, grading design, environmental studies',
      stats: '±2cm accuracy guaranteed'
    },
    {
      title: 'Infrastructure',
      icon: '🛣️',
      description: 'Road corridors, pipeline routes, transmission lines, railway surveying',
      stats: 'Linear corridor mapping'
    }
  ];

  const equipment = [
    {
      name: 'DJI Phantom 4 RTK',
      specs: '20MP camera, 1cm+1ppm RTK accuracy, TimeSync 2.0',
      use: 'Survey-grade mapping projects'
    },
    {
      name: 'DJI Matrice 350 RTK',
      specs: 'Payload flexibility, D-RTK 2 base station, 55-min flight',
      use: 'Large-scale surveying operations'
    },
    {
      name: 'Emlid Reach RS2+',
      specs: 'Multi-band RTK base station, PPK processing, 1cm accuracy',
      use: 'Ground control & PPK workflows'
    }
  ];

  const faqs = [
    {
      question: 'What accuracy can I expect from drone surveying?',
      answer: 'With RTK/PPK positioning and proper ground control, we achieve ±2-5cm horizontal and vertical accuracy, which meets most professional surveying requirements. For projects requiring higher precision, we can implement additional ground control points and processing techniques to reach ±1cm accuracy.'
    },
    {
      question: 'How does drone surveying compare to traditional methods?',
      answer: 'Drone surveying is 10-20x faster than traditional ground surveying and provides more comprehensive data. While ground surveys capture discrete points, drones generate continuous coverage with millions of measurement points. Drones are ideal for large areas, difficult terrain, or active sites. Traditional surveys may still be preferred for small areas requiring extreme precision or where GNSS signals are blocked.'
    },
    {
      question: 'What file formats do you provide?',
      answer: 'We deliver data in all major formats: GeoTIFF (orthomosaics), LAS/LAZ (point clouds), DWG/DXF (CAD), SHP (GIS), KML/KMZ (Google Earth), OBJ/FBX (3D models), and PDF (map prints). All deliverables are georeferenced in your preferred coordinate system (WGS84, UTM, local grids).'
    },
    {
      question: 'How large an area can you map in one day?',
      answer: 'Coverage depends on required resolution and terrain. Typically, we map 100-500 acres per day at standard resolution (3-5cm/pixel). For higher resolution (1-2cm/pixel), expect 50-200 acres per day. Extremely large projects (1000+ acres) are completed over multiple days with coordinated flight missions.'
    },
    {
      question: 'Do I need ground control points?',
      answer: 'For projects requiring survey-grade accuracy (±2-5cm), we recommend ground control points (GCPs) for georeferencing and validation. Our RTK drones can often achieve acceptable accuracy without GCPs for less demanding projects. We can provide GCP surveying services or work with your survey team to coordinate placement and measurement.'
    },
    {
      question: 'Can you calculate stockpile volumes?',
      answer: 'Yes, volumetric calculations are a core service. We establish base surfaces, calculate cut/fill volumes, generate stockpile measurements, and provide detailed reports with contour maps and cross-sections. Our software accounts for void spaces and compaction factors. Accuracy typically ±1-2% for well-defined stockpiles.'
    },
    {
      question: 'How do you ensure data quality?',
      answer: 'We follow strict quality control procedures: pre-flight equipment calibration, adequate image overlap (75-80% forward, 60-70% side), RTK validation, checkpoint verification, and post-processing QA checks. Every project includes accuracy reports, GCP residuals, and checkpoint comparisons. We guarantee stated accuracy specifications or re-fly at no cost.'
    },
    {
      question: 'Can you integrate with my existing GIS/CAD workflow?',
      answer: 'Absolutely. We deliver data in formats compatible with all major platforms (ArcGIS, QGIS, AutoCAD, Civil 3D, Microstation, etc.). We can match your coordinate systems, datum, units, and layer structures. For enterprise clients, we offer direct database integration, API access, and training on data utilization within your existing workflows.'
    }
  ];

  return (
    <>
      <SEO {...seoPresets.mappingSurveying} />
      <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <img 
          src="/SURVEY AND MAPPING/Survey and mapping.jpg" 
          alt="Survey and Mapping" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/70 via-teal-700/60 to-cyan-600/70"></div>
        <div className="container-custom relative z-10 text-center text-white py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/10 backdrop-blur-lg mb-6"
          >
            <Map className="w-12 h-12" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Mapping, Surveying & 3D Modelling
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-emerald-100 mb-8 max-w-3xl mx-auto"
          >
            Survey-grade accuracy, comprehensive geospatial data, and photorealistic 3D models for every industry
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/contact"
              className="px-8 py-4 bg-white text-emerald-600 rounded-full font-semibold hover:bg-emerald-50 transition-all hover:scale-105"
            >
              Request Survey
            </Link>
            <Link
              to="/portfolio"
              className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white rounded-full font-semibold hover:bg-white/20 transition-all"
            >
              View Sample Data
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gradient-to-r from-emerald-600 to-cyan-600 py-12">
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
                <div className="text-emerald-100">{stat.label}</div>
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
                Precision Geospatial Intelligence
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our advanced drone mapping solutions combine RTK positioning, high-resolution sensors, and photogrammetry software to deliver survey-grade accuracy. From topographic surveys to volumetric analysis, we provide comprehensive geospatial data that drives informed decision-making.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Whether you need orthomosaic maps, digital elevation models, 3D site reconstructions, or GIS-ready datasets, our certified surveyors ensure data quality and coordinate system accuracy for seamless integration with your existing workflows.
              </p>
              
              <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-lg border-2 border-emerald-200">
                <Ruler className="w-8 h-8 text-emerald-600 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900">Survey-Grade Accuracy</div>
                  <div className="text-sm text-gray-600">RTK/PPK positioning • ±2cm precision • Professional standards</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/SURVEY AND MAPPING/Construction site monitoring.png"
                alt="Construction site monitoring"
                className="rounded-lg shadow-xl"
              />
              <img
                src="/SURVEY AND MAPPING/Orthomosaic-Detail-v2-2-1.jpg"
                alt="Orthomosaic mapping detail"
                className="rounded-lg shadow-xl mt-8"
              />
              <img
                src="/SURVEY AND MAPPING/pexels-tomfisk-3856477.jpg"
                alt="Survey equipment"
                className="rounded-lg shadow-xl -mt-8"
              />
              <img
                src="/SURVEY AND MAPPING/pexels-tomfisk-3856033.jpg"
                alt="Aerial surveying"
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
              Why Choose Drone Surveying?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Revolutionary mapping technology that delivers more data, faster, and at lower cost
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
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
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
      <section className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Surveying Process
            </h2>
            <p className="text-xl text-gray-600">
              Professional workflow from planning to delivery
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
                  <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-emerald-600 to-cyan-600"></div>
                )}
                
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-emerald-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    <step.icon className="w-8 h-8" />
                  </div>
                  
                  <div className="flex-grow bg-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                      <span className="text-sm text-emerald-600 font-semibold">{step.duration}</span>
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
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-cyan-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Custom Pricing for Your Survey</h2>
              <p className="text-xl text-gray-700 mb-4">
                Every mapping and surveying project has unique accuracy and scope requirements.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                From small-site topographic surveys to large-scale 3D mapping projects, we'll create a tailored package that delivers the precision, data formats, and deliverables your project demands.
              </p>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white text-lg rounded-full font-semibold hover:from-emerald-700 hover:to-cyan-700 transition-all shadow-xl"
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
              Industry Applications
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive mapping solutions across sectors
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
                <div className="text-sm font-semibold text-emerald-600">{app.stats}</div>
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
              Professional Survey Equipment
            </h2>
            <p className="text-xl text-gray-600">
              RTK-enabled drones and ground control systems
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {equipment.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-emerald-50 to-cyan-50 p-6 rounded-xl"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-3">{item.specs}</p>
                <div className="text-sm text-emerald-600 font-semibold">→ {item.use}</div>
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
                  <ChevronRight className="w-5 h-5 text-emerald-600 group-open:rotate-90 transition-transform" />
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
      <section className="py-20 bg-gradient-to-br from-emerald-900 via-teal-700 to-cyan-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Map Your Project?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Get accurate, actionable data that accelerates your projects and reduces costs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-white text-emerald-600 rounded-full font-semibold hover:bg-emerald-50 transition-all hover:scale-105"
            >
              Request Quote
            </Link>
            <Link
              to="/portfolio"
              className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white rounded-full font-semibold hover:bg-white/20 transition-all"
            >
              View Project Gallery
            </Link>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
