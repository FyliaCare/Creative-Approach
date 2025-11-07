import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'aerial', 'inspection', 'mapping', 'documentary'];

  const projects = [
    {
      id: 1,
      title: 'Accra Skyline Timelapse',
      category: 'aerial',
      image: '/assets/portfolio-1.jpg',
      description: 'Stunning 4K timelapse of Accra\'s business district',
      client: 'Tourism Ghana',
      date: '2024'
    },
    {
      id: 2,
      title: 'Bridge Infrastructure Inspection',
      category: 'inspection',
      image: '/assets/portfolio-2.jpg',
      description: 'Comprehensive structural assessment of major bridge',
      client: 'Ministry of Transport',
      date: '2024'
    },
    {
      id: 3,
      title: 'Mining Site Survey',
      category: 'mapping',
      image: '/assets/portfolio-3.jpg',
      description: '3D terrain mapping for mining operations',
      client: 'Gold Fields Ghana',
      date: '2024'
    },
    {
      id: 4,
      title: 'Cape Coast Documentary',
      category: 'documentary',
      image: '/assets/portfolio-4.jpg',
      description: 'Cultural heritage documentary with aerial cinematography',
      client: 'Ghana Museums',
      date: '2024'
    },
    {
      id: 5,
      title: 'Real Estate Marketing',
      category: 'aerial',
      image: '/assets/portfolio-5.jpg',
      description: 'Luxury property showcase with cinematic footage',
      client: 'Devtraco Plus',
      date: '2024'
    },
    {
      id: 6,
      title: 'Solar Farm Inspection',
      category: 'inspection',
      image: '/assets/portfolio-6.jpg',
      description: 'Thermal imaging inspection of solar panels',
      client: 'BXC Company',
      date: '2024'
    },
    {
      id: 7,
      title: 'Agricultural Field Mapping',
      category: 'mapping',
      image: '/assets/portfolio-7.jpg',
      description: 'NDVI crop health analysis for large-scale farm',
      client: 'Private Farm',
      date: '2024'
    },
    {
      id: 8,
      title: 'Tourism Promotional Video',
      category: 'documentary',
      image: '/assets/portfolio-8.jpg',
      description: 'Breathtaking aerial tour of Ghana\'s natural wonders',
      client: 'Ghana Tourism Authority',
      date: '2024'
    },
    {
      id: 9,
      title: 'Construction Site Monitoring',
      category: 'mapping',
      image: '/assets/portfolio-9.jpg',
      description: 'Progress tracking and volumetric analysis',
      client: 'MAKS Construction',
      date: '2024'
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-drone-900 to-sky-950 text-white section-padding overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <motion.div
            animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], x: [0, 100, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-drone-500 rounded-full blur-3xl"
          />
        </div>
        
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
              <span className="text-3xl">📸</span>
              <span className="text-sm font-semibold">Featured Projects</span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Our <span className="bg-gradient-to-r from-purple-400 via-drone-400 to-sky-400 bg-clip-text text-transparent">Portfolio</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">
              Showcasing excellence in aerial innovation and creativity
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-12 bg-white sticky top-20 z-40 border-b">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold capitalize transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-drone-500 to-sky-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -10 }}
                  className="card overflow-hidden cursor-pointer group"
                >
                  {/* Image Placeholder */}
                  <div className="relative h-64 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl overflow-hidden mb-4">
                    <div className="absolute inset-0 flex items-center justify-center text-white text-6xl opacity-50">
                      📷
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white text-sm">Click to view details</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-2">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium capitalize">
                        {project.category}
                      </span>
                      <span className="text-gray-500 text-sm">{project.date}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-3">{project.description}</p>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Client:</span> {project.client}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-2xl text-gray-500">No projects found in this category</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-gradient-to-br from-drone-600 via-sky-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
        </div>
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { number: '500+', label: 'Projects Completed' },
              { number: '50+', label: 'Happy Clients' },
              { number: '100K+', label: 'Hours of Flight' },
              { number: '15+', label: 'Awards Won' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
