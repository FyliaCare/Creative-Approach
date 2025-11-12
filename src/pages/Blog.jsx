import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO, { seoPresets } from '../components/SEO';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'industry-news', 'case-studies', 'tutorials', 'technology'];

  const blogPosts = [
    {
      id: 1,
      title: '5 Reasons Why Drone Inspections Are Safer Than Traditional Methods',
      excerpt: 'Discover how drone technology is revolutionizing infrastructure inspection and improving workplace safety across industries.',
      category: 'industry-news',
      author: 'Kwame Mensah',
      date: 'October 15, 2024',
      readTime: '5 min read',
      image: '📰',
      featured: true
    },
    {
      id: 2,
      title: 'Case Study: Mapping 500 Acres in 2 Hours',
      excerpt: 'How we helped a major mining company complete surveying work that would have taken weeks using traditional methods.',
      category: 'case-studies',
      author: 'Ama Owusu',
      date: 'October 10, 2024',
      readTime: '8 min read',
      image: '📊',
      featured: true
    },
    {
      id: 3,
      title: 'Getting Started with Aerial Photography: A Beginner\'s Guide',
      excerpt: 'Essential tips and techniques for capturing stunning aerial photographs with drones.',
      category: 'tutorials',
      author: 'Kofi Asante',
      date: 'October 5, 2024',
      readTime: '6 min read',
      image: '📸',
      featured: false
    },
    {
      id: 4,
      title: 'The Future of Drone Technology in West Africa',
      excerpt: 'Exploring emerging trends and opportunities in the rapidly growing drone services sector.',
      category: 'technology',
      author: 'Akua Boateng',
      date: 'September 28, 2024',
      readTime: '7 min read',
      image: '🚁',
      featured: false
    },
    {
      id: 5,
      title: 'How Thermal Imaging Drones Detect Solar Panel Defects',
      excerpt: 'Understanding the technology behind thermal imaging and its applications in solar farm inspection.',
      category: 'technology',
      author: 'Kwame Mensah',
      date: 'September 20, 2024',
      readTime: '5 min read',
      image: '🔥',
      featured: false
    },
    {
      id: 6,
      title: 'Success Story: Real Estate Marketing That Sold in 48 Hours',
      excerpt: 'How professional aerial photography helped a luxury property sell faster than the market average.',
      category: 'case-studies',
      author: 'Ama Owusu',
      date: 'September 15, 2024',
      readTime: '4 min read',
      image: '🏡',
      featured: false
    },
    {
      id: 7,
      title: 'Understanding Ghana\'s Drone Regulations in 2024',
      excerpt: 'A comprehensive guide to legal requirements and best practices for commercial drone operations.',
      category: 'industry-news',
      author: 'Kofi Asante',
      date: 'September 10, 2024',
      readTime: '10 min read',
      image: '⚖️',
      featured: false
    },
    {
      id: 8,
      title: 'DIY Drone Maintenance: 10 Essential Checks',
      excerpt: 'Keep your drone in perfect condition with these regular maintenance procedures.',
      category: 'tutorials',
      author: 'Akua Boateng',
      date: 'September 5, 2024',
      readTime: '6 min read',
      image: '🔧',
      featured: false
    }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <>
      <SEO {...seoPresets.blog} />
      <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative text-white section-padding overflow-hidden min-h-[60vh] flex items-center">
        {/* Background Image */}
        <img 
          src="/SURVEY AND MAPPING/Orthomosaic-Detail-v2-2-1.jpg" 
          alt="Blog" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        
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
              <span className="text-3xl">📝</span>
              <span className="text-sm font-semibold">Insights & Updates</span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Our <span className="bg-gradient-to-r from-indigo-400 via-drone-400 to-sky-400 bg-clip-text text-transparent">Blog</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">
              Insights, stories, and expertise from the world of drone services
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl font-bold mb-8">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="card group cursor-pointer overflow-hidden"
                >
                  <div className="h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-6 flex items-center justify-center text-8xl">
                    {post.image}
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-semibold capitalize">
                      {post.category.replace('-', ' ')}
                    </span>
                    <span className="text-gray-500 text-sm">{post.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 bg-white sticky top-20 z-40 border-b">
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
                {category.replace('-', ' ')}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-12"
          >
            {selectedCategory === 'all' ? 'All Articles' : `${selectedCategory.replace('-', ' ')} Articles`}
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -10 }}
                className="card group cursor-pointer"
              >
                <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl mb-4 flex items-center justify-center text-6xl">
                  {post.image}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium capitalize">
                    {post.category.replace('-', ' ')}
                  </span>
                  <span className="text-gray-500 text-xs">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t">
                  <span className="font-medium">{post.author}</span>
                  <span>{post.date}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-2xl text-gray-500">No articles found in this category</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="text-6xl mb-6">📬</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Get the latest insights and updates delivered straight to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full text-gray-900 outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05, x: 2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-drone-600 px-8 py-4 rounded-full font-semibold hover:shadow-2xl transition-all inline-flex items-center gap-2"
              >
                <span>Subscribe</span>
                <span className="text-xl">→</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
      </div>
    </>
  );
}
