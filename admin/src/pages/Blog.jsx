import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

export const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/blog`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to fetch blog posts');
      setLoading(false);
    }
  };

  const togglePublishStatus = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      const newStatus = currentStatus === 'published' ? 'draft' : 'published';
      await axios.patch(
        `${API_URL}/api/blog/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Post ${newStatus === 'published' ? 'published' : 'unpublished'}`);
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
      toast.success(`Post ${!currentFeatured ? 'featured' : 'unfeatured'}`);
      fetchPosts();
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('Failed to update featured status');
    }
  };

  const deletePost = async (id) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
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

  const filteredPosts = posts.filter(post => {
    const matchesFilter = filter === 'all' || post.status === filter || (filter === 'featured' && post.featured);
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: posts.length,
    published: posts.filter(p => p.status === 'published').length,
    draft: posts.filter(p => p.status === 'draft').length,
    featured: posts.filter(p => p.featured).length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
        <Link
          to="/blog/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create New Post
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(stats).map(([key, value]) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow p-4"
          >
            <p className="text-sm text-gray-600 capitalize">{key}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search posts by title, excerpt, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'published', 'draft', 'featured'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No blog posts found
          </div>
        ) : (
          filteredPosts.map((post) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
            >
              {post.featuredImage && (
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  {post.featured && (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Featured
                    </span>
                  )}
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    post.status === 'published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {post.status}
                  </span>
                  {post.category && (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {post.category}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                {post.excerpt && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
                )}
                <div className="text-xs text-gray-500 mb-3">
                  {new Date(post.createdAt).toLocaleDateString()} • {post.author?.name || 'Admin'}
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/blog/edit/${post._id}`}
                    className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => togglePublishStatus(post._id, post.status)}
                    className="flex-1 px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    {post.status === 'published' ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    onClick={() => toggleFeatured(post._id, post.featured)}
                    className="px-3 py-2 text-sm bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                    title={post.featured ? 'Unfeature' : 'Feature'}
                  >
                    ★
                  </button>
                  <button
                    onClick={() => deletePost(post._id)}
                    className="px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};
