import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
  Camera, Filter, Heart, Eye, MapPin, Calendar, User,
  X, ChevronLeft, ChevronRight, Play,
  Grid, List, Search, TrendingUp, Award, Star
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

export default function Portfolio() {
  const [portfolios, setPortfolios] = useState([]);
  const [filteredPortfolios, setFilteredPortfolios] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [stats, setStats] = useState({});

  const categories = [
    { value: 'all', label: 'All Projects', icon: '🎯' },
    { value: 'aerial', label: 'Aerial Photography', icon: '📸' },
    { value: 'inspection', label: 'Inspections', icon: '🔍' },
    { value: 'mapping', label: 'Mapping & Survey', icon: '🗺️' },
    { value: 'documentary', label: 'Documentary', icon: '🎬' },
    { value: 'real-estate', label: 'Real Estate', icon: '🏢' },
    { value: 'construction', label: 'Construction', icon: '🏗️' },
    { value: 'events', label: 'Events', icon: '🎉' }
  ];

  useEffect(() => {
    fetchPortfolios();
    fetchStats();
  }, []);

  useEffect(() => {
    filterPortfolios();
  }, [selectedCategory, searchTerm, portfolios]);

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL + '/api/portfolio');
      setPortfolios(response.data);
    } catch (error) {
      console.error('Error fetching portfolios:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(API_URL + '/api/portfolio/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const filterPortfolios = () => {
    let filtered = portfolios;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.client.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPortfolios(filtered);
  };

  const handleLike = async (id) => {
    try {
      await axios.post(API_URL + '/api/portfolio/' + id + '/like');
      setPortfolios(portfolios.map(p =>
        p._id === id ? { ...p, likes: p.likes + 1 } : p
      ));
    } catch (error) {
      console.error('Error liking portfolio:', error);
    }
  };

  const openLightbox = (portfolio, imageIndex = 0) => {
    setSelectedPortfolio(portfolio);
    setLightboxIndex(imageIndex);
  };

  const closeLightbox = () => {
    setSelectedPortfolio(null);
    setLightboxIndex(0);
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <section className="relative bg-gradient-to-br from-purple-900 via-drone-900 to-sky-950 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
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
              <Camera className="w-5 h-5" />
              <span className="text-sm font-semibold">Featured Projects</span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Our <span className="bg-gradient-to-r from-purple-400 via-drone-400 to-sky-400 bg-clip-text text-transparent">Portfolio</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Showcasing excellence in aerial innovation and creativity
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {[
                { label: 'Projects', value: stats.totalProjects || 0, icon: Award },
                { label: 'Views', value: (stats.totalViews || 0).toLocaleString(), icon: Eye },
                { label: 'Likes', value: (stats.totalLikes || 0).toLocaleString(), icon: Heart },
                { label: 'Categories', value: stats.categories?.length || 0, icon: Filter }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-drone-400" />
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="sticky top-20 z-40 bg-white border-b shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={'p-3 rounded-xl border-2 transition-all ' + (viewMode === 'grid' ? 'bg-purple-600 text-white border-purple-600' : 'bg-gray-100 text-gray-600 border-gray-200')}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={'p-3 rounded-xl border-2 transition-all ' + (viewMode === 'list' ? 'bg-purple-600 text-white border-purple-600' : 'bg-gray-100 text-gray-600 border-gray-200')}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.value)}
                className={'px-4 py-2 rounded-full font-semibold transition-all flex items-center gap-2 ' + (selectedCategory === category.value ? 'bg-gradient-to-r from-drone-500 to-sky-500 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')}
              >
                <span>{category.icon}</span>
                <span className="hidden sm:inline">{category.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                  <div className="bg-gray-200 h-64 rounded-xl mb-4"></div>
                  <div className="bg-gray-200 h-6 rounded mb-2"></div>
                  <div className="bg-gray-200 h-4 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : filteredPortfolios.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Camera className="w-24 h-24 mx-auto text-gray-300 mb-4" />
              <p className="text-2xl text-gray-500 mb-2">No projects found</p>
              <p className="text-gray-400">Try adjusting your filters</p>
            </motion.div>
          ) : (
            <motion.div
              layout
              className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}
            >
              <AnimatePresence>
                {filteredPortfolios.map((project, index) => (
                  <motion.div
                    key={project._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer hover:shadow-2xl transition-all"
                    onClick={() => openLightbox(project)}
                  >
                    <div className="relative h-64 overflow-hidden">
                      {project.featuredImage ? (
                        <img
                          src={project.featuredImage}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
                          <Camera className="w-20 h-20 text-white opacity-50" />
                        </div>
                      )}
                      {project.featured && (
                        <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          Featured
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold capitalize">
                          {project.category.replace('-', ' ')}
                        </span>
                        <span className="text-gray-500 text-sm flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(project.date).getFullYear()}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold mb-2 line-clamp-2">{project.title}</h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">{project.description}</p>

                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {project.views}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLike(project._id);
                            }}
                            className="flex items-center gap-1 hover:text-red-500 transition-colors"
                          >
                            <Heart className="w-4 h-4" />
                            {project.likes}
                          </button>
                        </div>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {project.client}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {selectedPortfolio && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>

          <div
            className="max-w-6xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl overflow-hidden">
              <div className="relative h-[60vh]">
                <img
                  src={selectedPortfolio.featuredImage}
                  alt={selectedPortfolio.title}
                  className="w-full h-full object-contain bg-gray-900"
                />
              </div>

              <div className="p-6">
                <h2 className="text-3xl font-bold mb-4">{selectedPortfolio.title}</h2>
                <p className="text-gray-600 mb-6">{selectedPortfolio.description}</p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Client</p>
                    <p className="font-semibold">{selectedPortfolio.client}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Location</p>
                    <p className="font-semibold">{selectedPortfolio.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Category</p>
                    <p className="font-semibold capitalize">{selectedPortfolio.category.replace('-', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Date</p>
                    <p className="font-semibold">{new Date(selectedPortfolio.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
