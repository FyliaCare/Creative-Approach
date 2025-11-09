import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
  Camera, X, ArrowRight, Play, Award, MapPin, Calendar, 
  ExternalLink, ChevronLeft, ChevronRight, Heart, Eye
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

export default function Portfolio() {
  const [portfolios, setPortfolios] = useState([]);
  const [filteredPortfolios, setFilteredPortfolios] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [hoveredId, setHoveredId] = useState(null);

  const categories = [
    { value: 'all', label: 'All Work' },
    { value: 'aerial', label: 'Aerial' },
    { value: 'inspection', label: 'Inspection' },
    { value: 'mapping', label: 'Mapping' },
    { value: 'documentary', label: 'Film' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'construction', label: 'Construction' },
    { value: 'events', label: 'Events' }
  ];

  useEffect(() => {
    fetchPortfolios();
  }, []);

  useEffect(() => {
    filterPortfolios();
  }, [selectedCategory, portfolios]);

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL + '/api/portfolio');
      setPortfolios(response.data);
    } catch (error) {
      console.error('Error fetching portfolios:', error);
      setPortfolios([]);
    } finally {
      setLoading(false);
    }
  };

  const filterPortfolios = () => {
    if (selectedCategory === 'all') {
      setFilteredPortfolios(portfolios);
    } else {
      setFilteredPortfolios(portfolios.filter(p => p.category === selectedCategory));
    }
  };

  const openProject = (portfolio) => {
    setSelectedPortfolio(portfolio);
    setImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeProject = () => {
    setSelectedPortfolio(null);
    setImageIndex(0);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    if (selectedPortfolio?.images?.length > 0) {
      setImageIndex((prev) => (prev + 1) % (selectedPortfolio.images.length + 1));
    }
  };

  const prevImage = () => {
    if (selectedPortfolio?.images?.length > 0) {
      setImageIndex((prev) => 
        prev === 0 ? selectedPortfolio.images.length : prev - 1
      );
    }
  };

  // Masonry grid layout calculator
  const getGridItemClass = (index) => {
    const patterns = [
      'md:col-span-2 md:row-span-2', // Large square
      'md:col-span-1 md:row-span-1', // Small
      'md:col-span-1 md:row-span-2', // Tall
      'md:col-span-2 md:row-span-1', // Wide
      'md:col-span-1 md:row-span-1', // Small
      'md:col-span-2 md:row-span-2', // Large square
    ];
    return patterns[index % patterns.length];
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Hero */}
      <section className="relative pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-6">
              Selected Works
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl">
              A showcase of our finest aerial cinematography and drone services across Ghana.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Pills */}
      <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 py-4 px-4 md:px-8">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {categories.map((category, index) => (
              <motion.button
                key={category.value}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category.value
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-[1800px] mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[400px]">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`animate-pulse bg-gray-200 rounded-2xl ${getGridItemClass(i)}`}
                />
              ))}
            </div>
          ) : filteredPortfolios.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32"
            >
              <Camera className="w-20 h-20 mx-auto text-gray-300 mb-6" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">No Projects Yet</h3>
              <p className="text-gray-500 text-lg">Check back soon for amazing work.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[400px]">
              <AnimatePresence mode="popLayout">
                {filteredPortfolios.map((project, index) => (
                  <motion.div
                    key={project._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={`group relative overflow-hidden rounded-2xl cursor-pointer ${getGridItemClass(index)}`}
                    onClick={() => openProject(project)}
                    onMouseEnter={() => setHoveredId(project._id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    {/* Image */}
                    <div className="absolute inset-0">
                      {project.featuredImage ? (
                        <img
                          src={project.featuredImage}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-drone-500 to-sky-600 flex items-center justify-center">
                          <Camera className="w-20 h-20 text-white/30" />
                        </div>
                      )}
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Content */}
                    <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                      <motion.div
                        initial={false}
                        animate={{
                          y: hoveredId === project._id ? 0 : 20,
                          opacity: hoveredId === project._id ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-medium rounded-full uppercase tracking-wide">
                            {project.category.replace('-', ' ')}
                          </span>
                          {project.featured && (
                            <Award className="w-4 h-4 text-yellow-400" />
                          )}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                          {project.title}
                        </h3>
                        <p className="text-white/80 text-sm md:text-base mb-4 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-white/60 text-sm">{project.client}</span>
                          <ArrowRight className="w-5 h-5 text-white" />
                        </div>
                      </motion.div>
                    </div>

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                        Featured
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* Full-Screen Project Modal */}
      <AnimatePresence>
        {selectedPortfolio && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black"
            onClick={closeProject}
          >
            {/* Close Button */}
            <button
              onClick={closeProject}
              className="fixed top-6 right-6 z-50 w-12 h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation Arrows */}
            {selectedPortfolio.images && selectedPortfolio.images.length > 0 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="fixed left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="fixed right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}

            {/* Content */}
            <div className="h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="min-h-screen flex flex-col">
                {/* Hero Image */}
                <div className="relative h-screen flex items-center justify-center p-8">
                  <motion.img
                    key={imageIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    src={imageIndex === 0 ? selectedPortfolio.featuredImage : selectedPortfolio.images[imageIndex - 1]?.url}
                    alt={selectedPortfolio.title}
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                </div>

                {/* Project Details */}
                <div className="bg-white text-black px-8 md:px-16 py-16">
                  <div className="max-w-4xl mx-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <span className="px-4 py-2 bg-gray-100 text-gray-900 text-sm font-medium rounded-full uppercase tracking-wide">
                          {selectedPortfolio.category.replace('-', ' ')}
                        </span>
                        {selectedPortfolio.featured && (
                          <span className="px-4 py-2 bg-yellow-100 text-yellow-900 text-sm font-bold rounded-full flex items-center gap-2">
                            <Award className="w-4 h-4" />
                            Featured
                          </span>
                        )}
                      </div>

                      <h2 className="text-5xl md:text-7xl font-bold mb-6">
                        {selectedPortfolio.title}
                      </h2>
                      
                      <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
                        {selectedPortfolio.description}
                      </p>

                      {/* Meta Info Grid */}
                      <div className="grid md:grid-cols-3 gap-8 mb-12 pb-12 border-b border-gray-200">
                        <div>
                          <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Client</p>
                          <p className="text-lg font-semibold">{selectedPortfolio.client}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Location</p>
                          <p className="text-lg font-semibold flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {selectedPortfolio.location}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Date</p>
                          <p className="text-lg font-semibold flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(selectedPortfolio.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                          </p>
                        </div>
                      </div>

                      {/* Project Details */}
                      {selectedPortfolio.projectDetails && (
                        <div className="space-y-12">
                          {selectedPortfolio.projectDetails.challenge && (
                            <div>
                              <h3 className="text-2xl font-bold mb-4">The Challenge</h3>
                              <p className="text-lg text-gray-700 leading-relaxed">
                                {selectedPortfolio.projectDetails.challenge}
                              </p>
                            </div>
                          )}
                          
                          {selectedPortfolio.projectDetails.solution && (
                            <div>
                              <h3 className="text-2xl font-bold mb-4">Our Solution</h3>
                              <p className="text-lg text-gray-700 leading-relaxed">
                                {selectedPortfolio.projectDetails.solution}
                              </p>
                            </div>
                          )}
                          
                          {selectedPortfolio.projectDetails.results && (
                            <div>
                              <h3 className="text-2xl font-bold mb-4">Results</h3>
                              <p className="text-lg text-gray-700 leading-relaxed">
                                {selectedPortfolio.projectDetails.results}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Services */}
                      {selectedPortfolio.services && selectedPortfolio.services.length > 0 && (
                        <div className="mt-12">
                          <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-4">Services</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedPortfolio.services.map((service, i) => (
                              <span key={i} className="px-4 py-2 bg-gray-100 text-gray-900 rounded-full text-sm font-medium">
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Stats */}
                      <div className="flex items-center gap-6 mt-12 pt-12 border-t border-gray-200">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Eye className="w-5 h-5" />
                          <span className="text-sm">{selectedPortfolio.views || 0} views</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Heart className="w-5 h-5" />
                          <span className="text-sm">{selectedPortfolio.likes || 0} likes</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
