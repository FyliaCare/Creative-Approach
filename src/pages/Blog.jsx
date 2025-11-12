import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO, { seoPresets } from '../components/SEO';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ['all', 'Aerial Photography', 'Drone Technology', 'Industry News', 'Case Studies', 'Tutorials', 'Company News'];

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/blog`, {
          params: {
            status: 'published',
            limit: 50
          }
        });
        setBlogPosts(response.data.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts');
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const featuredPosts = blogPosts.filter(post => post.featured);
  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <>
      <SEO {...seoPresets.blog} />
      <div className="min-h-screen pt-20">
        <section className="relative text-white section-padding overflow-hidden min-h-[60vh] flex items-center">
          <img 
            src="/Our%20Blog.png" 
            alt="Blog" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <div className="container-custom relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-4xl mx-auto">
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8">
                <span className="text-3xl"></span>
                <span className="text-sm font-semibold">Insights & Updates</span>
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Our <span className="bg-gradient-to-r from-indigo-400 via-drone-400 to-sky-400 bg-clip-text text-transparent">Blog</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300">Insights, stories, and expertise from the world of drone services</p>
            </motion.div>
          </div>
        </section>
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
              <h2 className="text-4xl font-bold mb-8">Featured Articles</h2>
              {loading && (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                  <p className="mt-4 text-gray-600">Loading blog posts...</p>
                </div>
              )}
              {error && (
                <div className="text-center py-12">
                  <p className="text-red-600">{error}</p>
                </div>
              )}
              {!loading && !error && featuredPosts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600">No featured posts available yet. Check back soon!</p>
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-8">
                {!loading && featuredPosts.map((post, index) => (
                  <motion.div key={post._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ y: -10 }} className="card group cursor-pointer overflow-hidden">
                    <div className="h-64 overflow-hidden mb-4 rounded-xl bg-gray-200">
                      <img src={post.featuredImage || '/placeholder-blog.jpg'} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => { e.target.src = 'data:image/svg+xml,%3Csvg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 400 300&quot;%3E%3Crect fill=&quot;%23ddd&quot; width=&quot;400&quot; height=&quot;300&quot;/%3E%3Ctext fill=&quot;%23999&quot; font-family=&quot;sans-serif&quot; font-size=&quot;24&quot; x=&quot;50%25&quot; y=&quot;50%25&quot; text-anchor=&quot;middle&quot; dy=&quot;.3em&quot;%3EBlog Image%3C/text%3E%3C/svg%3E'; }} />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">{post.category}</span>
                      <span className="text-gray-500 text-xs">{post.readTime || '5 min read'}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
                      <span className="font-medium">{post.author?.name || 'Creative Approach'}</span>
                      <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString()}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        <section className="py-8 bg-white sticky top-20 z-40 border-b">
          <div className="container-custom">
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category) => (
                <motion.button 
                  key={category} 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }} 
                  onClick={() => setSelectedCategory(category)} 
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${selectedCategory === category ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {category === 'all' ? 'All' : category}
                </motion.button>
              ))}
            </div>
          </div>
        </section>
        <section className="section-padding">
          <div className="container-custom">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-bold mb-12">
              {selectedCategory === 'all' ? 'All Articles' : `${selectedCategory} Articles`}
            </motion.h2>
            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Loading articles...</p>
              </div>
            )}
            {!loading && filteredPosts.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                <div className="text-6xl mb-4"></div>
                <p className="text-2xl text-gray-500">No articles found in this category</p>
                <p className="text-gray-400 mt-2">Check back soon for new content!</p>
              </motion.div>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {!loading && filteredPosts.map((post, index) => (
                <motion.div key={post._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} whileHover={{ y: -10 }} className="card group cursor-pointer">
                  <div className="h-48 overflow-hidden bg-gray-200 rounded-xl mb-4">
                    <img src={post.featuredImage || '/placeholder-blog.jpg'} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => { e.target.src = 'data:image/svg+xml,%3Csvg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 400 300&quot;%3E%3Crect fill=&quot;%23ddd&quot; width=&quot;400&quot; height=&quot;300&quot;/%3E%3Ctext fill=&quot;%23999&quot; font-family=&quot;sans-serif&quot; font-size=&quot;20&quot; x=&quot;50%25&quot; y=&quot;50%25&quot; text-anchor=&quot;middle&quot; dy=&quot;.3em&quot;%3EBlog Image%3C/text%3E%3C/svg%3E'; }} />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">{post.category}</span>
                    <span className="text-gray-500 text-xs">{post.readTime || '5 min read'}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t">
                    <span className="font-medium">{post.author?.name || 'Creative Approach'}</span>
                    <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString()}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section className="section-padding bg-gradient-to-br from-blue-600 to-purple-600 text-white">
          <div className="container-custom">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto">
              <div className="text-6xl mb-6"></div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Subscribe to Our Newsletter</h2>
              <p className="text-xl mb-8 text-blue-100">Get the latest insights and updates delivered straight to your inbox</p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <input type="email" placeholder="Enter your email" className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30" />
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors">Subscribe</motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
