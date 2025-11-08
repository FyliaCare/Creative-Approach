import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  PenSquare, Search, Filter, Eye, Heart, Share2, TrendingUp, 
  BarChart3, Star, Calendar, Tag, Folder, Globe, CheckCircle, 
  XCircle, Clock, Sparkles, Download, Upload, MoreVertical,
  Edit, Trash2, Copy, ExternalLink
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

export const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [statsLoading, setStatsLoading] = useState(true);
  const [analytics, setAnalytics] = useState({
    totalViews: 0,
    totalLikes: 0,
    avgViews: 0,
    trending: []
  });

  useEffect(() => {
    fetchPosts();
    fetchCategories();
    fetchAnalytics();
  }, []);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/blog`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(Array.isArray(response.data) ? response.data : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to fetch blog posts');
      setPosts([]);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const uniqueCategories = [...new Set(posts.map(p => p.category).filter(Boolean))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      // Simulate analytics fetching
      setTimeout(() => {
        const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);
        const totalLikes = posts.reduce((sum, post) => sum + (post.likes || 0), 0);
        const avgViews = posts.length > 0 ? Math.round(totalViews / posts.length) : 0;
        const trending = [...posts]
          .sort((a, b) => (b.views || 0) - (a.views || 0))
          .slice(0, 5);
        
        setAnalytics({ totalViews, totalLikes, avgViews, trending });
        setStatsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchAnalytics();
  }, [posts]);

  const togglePublishStatus = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      const newStatus = currentStatus === 'published' ? 'draft' : 'published';
      await axios.patch(
        `${API_URL}/api/blog/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Post ${newStatus === 'published' ? 'published' : 'unpublished'} successfully`);
      fetchPosts();
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('Failed to update post status');
    }
  };

  const toggleFeatured = async (id, currentFeatured) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `${API_URL}/api/blog/${id}`,
        { featured: !currentFeatured },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Post ${!currentFeatured ? 'marked as featured' : 'removed from featured'}`);
      fetchPosts();
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('Failed to update featured status');
    }
  };

  const deletePost = async (id) => {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/api/blog/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Post deleted successfully');
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    }
  };

  const duplicatePost = async (post) => {
    try {
      const token = localStorage.getItem('token');
      const duplicateData = {
        ...post,
        title: `${post.title} (Copy)`,
        slug: `${post.slug}-copy-${Date.now()}`,
        status: 'draft',
        _id: undefined,
        createdAt: undefined,
        updatedAt: undefined
      };
      await axios.post(`${API_URL}/api/blog`, duplicateData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Post duplicated successfully');
      fetchPosts();
    } catch (error) {
      console.error('Error duplicating post:', error);
      toast.error('Failed to duplicate post');
    }
  };

  const handleBulkAction = async (action) => {
    if (selectedPosts.length === 0) {
      toast.error('Please select posts first');
      return;
    }

    if (!confirm(`Are you sure you want to ${action} ${selectedPosts.length} post(s)?`)) return;

    try {
      const token = localStorage.getItem('token');
      
      for (const postId of selectedPosts) {
        if (action === 'delete') {
          await axios.delete(`${API_URL}/api/blog/${postId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
        } else if (action === 'publish') {
          await axios.patch(
            `${API_URL}/api/blog/${postId}`,
            { status: 'published' },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } else if (action === 'unpublish') {
          await axios.patch(
            `${API_URL}/api/blog/${postId}`,
            { status: 'draft' },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }
      }

      toast.success(`Successfully ${action}ed ${selectedPosts.length} post(s)`);
      setSelectedPosts([]);
      setShowBulkActions(false);
      fetchPosts();
    } catch (error) {
      console.error('Error performing bulk action:', error);
      toast.error('Failed to perform bulk action');
    }
  };

  const togglePostSelection = (postId) => {
    setSelectedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedPosts.length === filteredPosts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(filteredPosts.map(post => post._id));
    }
  };

  const filteredPosts = posts
    .filter(post => {
      const matchesFilter = filter === 'all' || post.status === filter || (filter === 'featured' && post.featured);
      const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
      const matchesSearch = 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesFilter && matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'views':
          return (b.views || 0) - (a.views || 0);
        case 'likes':
          return (b.likes || 0) - (a.likes || 0);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const stats = {
    total: posts.length,
    published: posts.filter(p => p.status === 'published').length,
    draft: posts.filter(p => p.status === 'draft').length,
    featured: posts.filter(p => p.featured).length,
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
        <p className="text-gray-600 font-medium">Loading blog posts...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Gradient Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black mb-3 flex items-center gap-3">
              <PenSquare className="w-10 h-10" />
              Blog Management
            </h1>
            <p className="text-purple-100 text-lg font-medium">Manage your content with AI-powered SEO tools</p>
          </div>
          <Link
            to="/blog/new"
            className="group bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-3"
          >
            <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            Create New Post
          </Link>
        </div>
      </motion.div>

      {/* Advanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 opacity-10">
            <BarChart3 className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <p className="text-blue-100 font-medium">Total Posts</p>
              <Folder className="w-6 h-6 text-blue-200" />
            </div>
            <p className="text-5xl font-black mb-2">{stats.total}</p>
            <div className="flex items-center gap-2">
              <div className="bg-blue-400/30 px-3 py-1 rounded-full flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-bold">+{stats.total > 0 ? '12%' : '0%'}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 opacity-10">
            <CheckCircle className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <p className="text-green-100 font-medium">Published</p>
              <Globe className="w-6 h-6 text-green-200" />
            </div>
            <p className="text-5xl font-black mb-2">{stats.published}</p>
            <div className="flex items-center gap-2">
              <div className="bg-green-400/30 px-3 py-1 rounded-full">
                <span className="text-sm font-bold">{stats.total > 0 ? Math.round((stats.published / stats.total) * 100) : 0}% Live</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 opacity-10">
            <Clock className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <p className="text-orange-100 font-medium">Drafts</p>
              <XCircle className="w-6 h-6 text-orange-200" />
            </div>
            <p className="text-5xl font-black mb-2">{stats.draft}</p>
            <div className="flex items-center gap-2">
              <div className="bg-orange-400/30 px-3 py-1 rounded-full">
                <span className="text-sm font-bold">Pending</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 opacity-10">
            <Star className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <p className="text-yellow-100 font-medium">Featured</p>
              <Sparkles className="w-6 h-6 text-yellow-200" />
            </div>
            <p className="text-5xl font-black mb-2">{stats.featured}</p>
            <div className="flex items-center gap-2">
              <div className="bg-yellow-400/30 px-3 py-1 rounded-full">
                <span className="text-sm font-bold">Highlighted</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Analytics Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <BarChart3 className="w-7 h-7 text-purple-600" />
            Content Analytics
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200">
            <div className="flex items-center justify-between mb-3">
              <p className="text-purple-700 font-semibold">Total Views</p>
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-4xl font-black text-purple-900">{analytics.totalViews.toLocaleString()}</p>
            <p className="text-sm text-purple-600 mt-2">Across all posts</p>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 border-2 border-pink-200">
            <div className="flex items-center justify-between mb-3">
              <p className="text-pink-700 font-semibold">Total Likes</p>
              <Heart className="w-6 h-6 text-pink-600" />
            </div>
            <p className="text-4xl font-black text-pink-900">{analytics.totalLikes.toLocaleString()}</p>
            <p className="text-sm text-pink-600 mt-2">Community engagement</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <p className="text-blue-700 font-semibold">Avg Views/Post</p>
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-4xl font-black text-blue-900">{analytics.avgViews}</p>
            <p className="text-sm text-blue-600 mt-2">Performance metric</p>
          </div>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by title, excerpt, category, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
            />
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 font-medium"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="views">Most Viewed</option>
            <option value="likes">Most Liked</option>
            <option value="title">Title (A-Z)</option>
          </select>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-3 rounded-xl font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-3 rounded-xl font-medium transition-all ${
                viewMode === 'list'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              List
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {['all', 'published', 'draft', 'featured'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-5 py-2.5 rounded-xl capitalize font-semibold transition-all ${
                filter === status
                  ? 'bg-purple-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
              }`}
            >
              {status}
            </button>
          ))}

          <div className="h-8 w-px bg-gray-300"></div>

          {categories.length > 0 && (
            <>
              <button
                onClick={() => setCategoryFilter('all')}
                className={`px-5 py-2.5 rounded-xl font-semibold transition-all ${
                  categoryFilter === 'all'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-5 py-2.5 rounded-xl font-semibold transition-all ${
                    categoryFilter === cat
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedPosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-purple-600 text-white rounded-xl shadow-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <p className="font-bold text-lg">{selectedPosts.length} post(s) selected</p>
              <button
                onClick={() => setSelectedPosts([])}
                className="text-purple-200 hover:text-white font-medium"
              >
                Clear selection
              </button>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleBulkAction('publish')}
                className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-semibold shadow-lg transition-all"
              >
                Publish All
              </button>
              <button
                onClick={() => handleBulkAction('unpublish')}
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold shadow-lg transition-all"
              >
                Unpublish All
              </button>
              <button
                onClick={() => handleBulkAction('delete')}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-semibold shadow-lg transition-all"
              >
                Delete All
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Select All Checkbox */}
      {filteredPosts.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedPosts.length === filteredPosts.length}
              onChange={toggleSelectAll}
              className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
            />
            <span className="font-semibold text-gray-700">
              Select All ({filteredPosts.length} posts)
            </span>
          </label>
        </div>
      )}

      {/* Posts Grid/List */}
      {filteredPosts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-lg p-16 text-center"
        >
          <PenSquare className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-900 mb-3">No blog posts found</h3>
          <p className="text-gray-600 mb-6">Start creating amazing content with AI-powered SEO tools</p>
          <Link
            to="/blog/new"
            className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 text-white rounded-xl font-bold shadow-lg hover:bg-purple-700 hover:scale-105 transition-all"
          >
            <Sparkles className="w-5 h-5" />
            Create Your First Post
          </Link>
        </motion.div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8, scale: viewMode === 'grid' ? 1.02 : 1 }}
              className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all border-2 ${
                selectedPosts.includes(post._id) ? 'border-purple-500' : 'border-gray-100'
              }`}
            >
              {viewMode === 'grid' ? (
                <>
                  {/* Grid View */}
                  <div className="relative">
                    {post.featuredImage ? (
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-52 object-cover"
                      />
                    ) : (
                      <div className="w-full h-52 bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center">
                        <PenSquare className="w-16 h-16 text-white opacity-50" />
                      </div>
                    )}
                    
                    <div className="absolute top-3 left-3">
                      <input
                        type="checkbox"
                        checked={selectedPosts.includes(post._id)}
                        onChange={() => togglePostSelection(post._id)}
                        className="w-6 h-6 text-purple-600 border-2 border-white rounded-lg focus:ring-2 focus:ring-purple-500 shadow-lg"
                      />
                    </div>

                    <div className="absolute top-3 right-3 flex gap-2">
                      {post.featured && (
                        <span className="px-3 py-1.5 bg-yellow-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          Featured
                        </span>
                      )}
                      <span className={`px-3 py-1.5 text-xs font-bold rounded-full shadow-lg ${
                        post.status === 'published' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-orange-500 text-white'
                      }`}>
                        {post.status === 'published' ? 'Live' : 'Draft'}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {post.category && (
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full flex items-center gap-1">
                          <Folder className="w-3 h-3" />
                          {post.category}
                        </span>
                      )}
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-purple-600 transition-colors">
                      {post.title}
                    </h3>

                    {post.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                    )}

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                            +{post.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span className="font-semibold">{post.views || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span className="font-semibold">{post.likes || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Share2 className="w-4 h-4" />
                        <span className="font-semibold">{post.shares || 0}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        to={`/blog/edit/${post._id}`}
                        className="px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold text-center flex items-center justify-center gap-2 transition-all"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </Link>
                      <button
                        onClick={() => togglePublishStatus(post._id, post.status)}
                        className={`px-4 py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                          post.status === 'published'
                            ? 'bg-orange-500 hover:bg-orange-600 text-white'
                            : 'bg-green-500 hover:bg-green-600 text-white'
                        }`}
                      >
                        {post.status === 'published' ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                        {post.status === 'published' ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        onClick={() => toggleFeatured(post._id, post.featured)}
                        className={`px-4 py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                          post.featured
                            ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                        }`}
                        title={post.featured ? 'Unfeature' : 'Feature'}
                      >
                        <Star className="w-4 h-4" />
                        {post.featured ? 'Featured' : 'Feature'}
                      </button>
                      <button
                        onClick={() => duplicatePost(post)}
                        className="px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                      >
                        <Copy className="w-4 h-4" />
                        Copy
                      </button>
                    </div>

                    <button
                      onClick={() => deletePost(post._id)}
                      className="w-full mt-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Post
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* List View */}
                  <div className="p-6 flex gap-6">
                    <div className="flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={selectedPosts.includes(post._id)}
                        onChange={() => togglePostSelection(post._id)}
                        className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    {post.featuredImage ? (
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-lg flex items-center justify-center">
                        <PenSquare className="w-8 h-8 text-white opacity-50" />
                      </div>
                    )}

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1 hover:text-purple-600 transition-colors">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="text-gray-600 line-clamp-2">{post.excerpt}</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          {post.featured && (
                            <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              Featured
                            </span>
                          )}
                          <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                            post.status === 'published' 
                              ? 'bg-green-500 text-white' 
                              : 'bg-orange-500 text-white'
                          }`}>
                            {post.status === 'published' ? 'Live' : 'Draft'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-3">
                        {post.category && (
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full flex items-center gap-1">
                            <Folder className="w-3 h-3" />
                            {post.category}
                          </span>
                        )}
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{post.views || 0}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            <span>{post.likes || 0}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Link
                          to={`/blog/edit/${post._id}`}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold text-sm flex items-center gap-2"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </Link>
                        <button
                          onClick={() => togglePublishStatus(post._id, post.status)}
                          className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                            post.status === 'published'
                              ? 'bg-orange-500 hover:bg-orange-600 text-white'
                              : 'bg-green-500 hover:bg-green-600 text-white'
                          }`}
                        >
                          {post.status === 'published' ? 'Unpublish' : 'Publish'}
                        </button>
                        <button
                          onClick={() => toggleFeatured(post._id, post.featured)}
                          className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                            post.featured
                              ? 'bg-yellow-500 text-white'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          <Star className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => duplicatePost(post)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold text-sm"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deletePost(post._id)}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold text-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
