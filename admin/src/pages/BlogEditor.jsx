import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  Sparkles, Save, Eye, ArrowLeft, Image as ImageIcon, Tag, Folder,
  Globe, Search, TrendingUp, BarChart3, CheckCircle, AlertCircle,
  Zap, Target, Hash, FileText, Award, Clock, Calendar, Link as LinkIcon
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

export const BlogEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [],
    featuredImage: '',
    status: 'draft',
    featured: false,
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
  });
  
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [seoScore, setSeoScore] = useState(0);
  const [seoAnalysis, setSeoAnalysis] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [isGeneratingSEO, setIsGeneratingSEO] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      fetchPost();
    }
  }, [id]);

  useEffect(() => {
    // Auto-generate slug from title
    if (!isEditMode || !formData.slug) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title]);

  useEffect(() => {
    // Analyze SEO whenever content changes
    analyzeSEO();
  }, [formData.title, formData.content, formData.metaTitle, formData.metaDescription, formData.metaKeywords]);

  const fetchPost = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/blog/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormData(response.data);
      setImagePreview(response.data.featuredImage);
    } catch (error) {
      console.error('Error fetching post:', error);
      toast.error('Failed to fetch post');
    }
  };

  // ==================== AI-POWERED SEO GENERATION ====================
  const generateSEOFromContent = async () => {
    if (!formData.title || !formData.content) {
      toast.error('Please add title and content first');
      return;
    }

    setIsGeneratingSEO(true);
    toast.loading('AI is analyzing your content and generating SEO...', { id: 'seo-gen' });

    try {
      // Simulate AI processing (in production, this would call an AI API)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Extract text content from HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = formData.content;
      const textContent = tempDiv.textContent || tempDiv.innerText || '';

      // Generate Meta Title (optimized for SEO: 50-60 characters)
      const metaTitle = formData.title.length > 60 
        ? formData.title.substring(0, 57) + '...'
        : formData.title;

      // Generate Meta Description (optimized for SEO: 150-160 characters)
      const firstSentence = textContent.split(/[.!?]/)[0].trim();
      const metaDescription = firstSentence.length > 160
        ? firstSentence.substring(0, 157) + '...'
        : firstSentence || formData.title;

      // Generate Keywords (extract from title and content)
      const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those']);
      
      const words = (formData.title + ' ' + textContent)
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .split(/\s+/)
        .filter(word => word.length > 3 && !commonWords.has(word));

      // Count word frequency
      const wordCount = {};
      words.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
      });

      // Get top keywords
      const topKeywords = Object.entries(wordCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([word]) => word);

      // Add category as keyword
      if (formData.category) {
        topKeywords.unshift(formData.category.toLowerCase());
      }

      const metaKeywords = topKeywords.join(', ');

      // Generate optimized excerpt if empty
      const excerpt = formData.excerpt || (textContent.length > 200 
        ? textContent.substring(0, 197) + '...'
        : textContent);

      setFormData(prev => ({
        ...prev,
        metaTitle,
        metaDescription,
        metaKeywords,
        excerpt: prev.excerpt || excerpt
      }));

      toast.success('AI-powered SEO generated successfully! 🚀', { id: 'seo-gen' });
      
      // Auto-generate tags from keywords
      const autoTags = topKeywords.slice(0, 5).map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      );
      setFormData(prev => ({
        ...prev,
        tags: [...new Set([...prev.tags, ...autoTags])]
      }));

    } catch (error) {
      console.error('Error generating SEO:', error);
      toast.error('Failed to generate SEO', { id: 'seo-gen' });
    } finally {
      setIsGeneratingSEO(false);
    }
  };

  // ==================== SEO ANALYSIS ====================
  const analyzeSEO = () => {
    let score = 0;
    const analysis = {
      title: { score: 0, message: '', status: 'error' },
      metaTitle: { score: 0, message: '', status: 'error' },
      metaDescription: { score: 0, message: '', status: 'error' },
      keywords: { score: 0, message: '', status: 'error' },
      content: { score: 0, message: '', status: 'error' },
      readability: { score: 0, message: '', status: 'error' }
    };

    // Title Analysis (15 points)
    if (formData.title.length >= 30 && formData.title.length <= 70) {
      analysis.title = { score: 15, message: 'Perfect title length!', status: 'success' };
      score += 15;
    } else if (formData.title.length > 0) {
      analysis.title = { score: 7, message: `Title should be 30-70 characters (currently ${formData.title.length})`, status: 'warning' };
      score += 7;
    } else {
      analysis.title = { score: 0, message: 'Title is required', status: 'error' };
    }

    // Meta Title Analysis (15 points)
    if (formData.metaTitle.length >= 50 && formData.metaTitle.length <= 60) {
      analysis.metaTitle = { score: 15, message: 'Optimal meta title length!', status: 'success' };
      score += 15;
    } else if (formData.metaTitle.length > 0) {
      analysis.metaTitle = { score: 7, message: `Meta title should be 50-60 characters (currently ${formData.metaTitle.length})`, status: 'warning' };
      score += 7;
    } else {
      analysis.metaTitle = { score: 0, message: 'Meta title needed for SEO', status: 'error' };
    }

    // Meta Description Analysis (20 points)
    if (formData.metaDescription.length >= 150 && formData.metaDescription.length <= 160) {
      analysis.metaDescription = { score: 20, message: 'Perfect meta description!', status: 'success' };
      score += 20;
    } else if (formData.metaDescription.length >= 120) {
      analysis.metaDescription = { score: 12, message: `Meta description should be 150-160 characters (currently ${formData.metaDescription.length})`, status: 'warning' };
      score += 12;
    } else if (formData.metaDescription.length > 0) {
      analysis.metaDescription = { score: 5, message: 'Meta description too short', status: 'warning' };
      score += 5;
    } else {
      analysis.metaDescription = { score: 0, message: 'Meta description is crucial for SEO', status: 'error' };
    }

    // Keywords Analysis (15 points)
    const keywordCount = formData.metaKeywords.split(',').filter(k => k.trim()).length;
    if (keywordCount >= 5 && keywordCount <= 10) {
      analysis.keywords = { score: 15, message: `Great keyword coverage (${keywordCount} keywords)`, status: 'success' };
      score += 15;
    } else if (keywordCount > 0) {
      analysis.keywords = { score: 8, message: `Add ${5 - keywordCount} more keywords for better SEO`, status: 'warning' };
      score += 8;
    } else {
      analysis.keywords = { score: 0, message: 'Keywords help search engines understand your content', status: 'error' };
    }

    // Content Length Analysis (20 points)
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = formData.content;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    const wordCount = textContent.split(/\s+/).filter(w => w.length > 0).length;

    if (wordCount >= 300 && wordCount <= 2000) {
      analysis.content = { score: 20, message: `Excellent content length (${wordCount} words)`, status: 'success' };
      score += 20;
    } else if (wordCount >= 200) {
      analysis.content = { score: 12, message: `Good content (${wordCount} words). Aim for 300-2000 words`, status: 'warning' };
      score += 12;
    } else if (wordCount > 0) {
      analysis.content = { score: 5, message: `Content too short (${wordCount} words). Add more detail`, status: 'warning' };
      score += 5;
    } else {
      analysis.content = { score: 0, message: 'Content is required', status: 'error' };
    }

    // Readability Analysis (15 points)
    const sentences = textContent.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const avgWordsPerSentence = wordCount / (sentences.length || 1);
    
    if (avgWordsPerSentence >= 15 && avgWordsPerSentence <= 20) {
      analysis.readability = { score: 15, message: 'Excellent readability!', status: 'success' };
      score += 15;
    } else if (avgWordsPerSentence >= 10 && avgWordsPerSentence <= 25) {
      analysis.readability = { score: 10, message: 'Good readability', status: 'warning' };
      score += 10;
    } else {
      analysis.readability = { score: 5, message: 'Improve sentence structure for better readability', status: 'warning' };
      score += 5;
    }

    setSeoScore(score);
    setSeoAnalysis(analysis);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image size should be less than 10MB');
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return formData.featuredImage;

    const formDataImage = new FormData();
    formDataImage.append('image', imageFile);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/api/upload`, formDataImage, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.url;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
      return formData.featuredImage;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content) {
      toast.error('Title and content are required');
      return;
    }

    if (seoScore < 50) {
      const proceed = confirm('Your SEO score is below 50. Do you want to continue publishing? We recommend improving your SEO first.');
      if (!proceed) return;
    }

    setLoading(true);
    toast.loading('Saving your post...', { id: 'save-post' });

    try {
      // Upload image if new one selected
      const featuredImage = await uploadImage();

      const token = localStorage.getItem('token');
      const postData = { ...formData, featuredImage };

      if (isEditMode) {
        await axios.patch(`${API_URL}/api/blog/${id}`, postData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Post updated successfully! 🎉', { id: 'save-post' });
      } else {
        await axios.post(`${API_URL}/api/blog`, postData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Post created successfully! 🎉', { id: 'save-post' });
      }

      navigate('/blog');
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error(error.response?.data?.message || 'Failed to save post', { id: 'save-post' });
    } finally {
      setLoading(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  const getSEOScoreColor = (score) => {
    if (score >= 80) return 'from-green-500 to-emerald-600';
    if (score >= 60) return 'from-yellow-500 to-orange-500';
    if (score >= 40) return 'from-orange-500 to-red-500';
    return 'from-red-500 to-red-700';
  };

  const getSEOScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Needs Work';
    return 'Poor';
  };

  return (
    <div className="max-w-7xl mx-auto pb-12">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl mb-6"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black mb-3 flex items-center gap-3">
              <Sparkles className="w-10 h-10" />
              {isEditMode ? 'Edit Blog Post' : 'Create New Post'}
            </h1>
            <p className="text-purple-100 text-lg font-medium">AI-powered SEO generation at your fingertips</p>
          </div>
          <button
            onClick={() => navigate('/blog')}
            className="group bg-white text-purple-600 px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor Column */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <label className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" />
                Post Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 text-lg font-semibold transition-all"
                placeholder="Enter an engaging title..."
              />
              <p className="text-xs text-gray-500 mt-2">Current length: {formData.title.length} characters (optimal: 30-70)</p>
            </motion.div>

            {/* Slug */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <label className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-purple-600" />
                URL Slug *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 font-mono transition-all"
                placeholder="post-url-slug"
              />
              <p className="text-xs text-gray-500 mt-2">URL: yoursite.com/blog/{formData.slug}</p>
            </motion.div>

            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <label className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-purple-600" />
                Featured Image
              </label>
              {imagePreview && (
                <div className="relative mb-4 rounded-xl overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                      <CheckCircle className="w-3 h-3 inline mr-1" />
                      Image loaded
                    </span>
                  </div>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              />
              <p className="text-xs text-gray-500 mt-2">Recommended: 1200x630px, Max 10MB</p>
            </motion.div>

            {/* Content Editor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <label className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" />
                Content *
              </label>
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                modules={quillModules}
                className="h-96 mb-16"
                placeholder="Start writing your amazing content..."
              />
            </motion.div>

            {/* Category, Tags & Excerpt */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <label className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Folder className="w-5 h-5 text-purple-600" />
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 font-semibold transition-all"
                >
                  <option value="">Select category</option>
                  <option value="Aerial Photography">📸 Aerial Photography</option>
                  <option value="Videography">🎥 Videography</option>
                  <option value="Surveying">🗺️ Surveying</option>
                  <option value="Inspection">🔍 Inspection</option>
                  <option value="Events">🎉 Events</option>
                  <option value="News">📰 News</option>
                  <option value="Tips & Tutorials">💡 Tips & Tutorials</option>
                  <option value="Industry Insights">📊 Industry Insights</option>
                  <option value="Case Studies">📋 Case Studies</option>
                </select>
              </motion.div>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <label className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-purple-600" />
                  Tags
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                    placeholder="Add tag"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-lg text-sm flex items-center gap-2 font-semibold shadow-sm"
                    >
                      <Hash className="w-3 h-3" />
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-purple-600 hover:text-purple-900 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Excerpt */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <label className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" />
                Excerpt
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                placeholder="Brief description of the post (auto-generated if left empty)"
              />
              <p className="text-xs text-gray-500 mt-2">Optional: Will be auto-generated from content if empty</p>
            </motion.div>

            {/* AI SEO Generation Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-lg p-6 border-2 border-purple-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-2 flex items-center gap-2">
                    <Zap className="w-6 h-6 text-purple-600" />
                    AI-Powered SEO Generator
                  </h3>
                  <p className="text-sm text-gray-600">Let AI analyze your content and generate perfect SEO fields automatically</p>
                </div>
              </div>
              <button
                type="button"
                onClick={generateSEOFromContent}
                disabled={isGeneratingSEO || !formData.title || !formData.content}
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-black text-lg shadow-xl hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all flex items-center justify-center gap-3"
              >
                {isGeneratingSEO ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    Generating SEO...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6" />
                    Generate SEO Magic ✨
                  </>
                )}
              </button>
            </motion.div>

            {/* SEO Meta Fields */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white rounded-xl shadow-lg p-6 space-y-4"
            >
              <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                <Globe className="w-6 h-6 text-purple-600" />
                SEO Meta Fields
              </h3>
              
              <div>
                <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Meta Title
                </label>
                <input
                  type="text"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                  placeholder="SEO title for search engines (50-60 chars)"
                />
                <p className="text-xs text-gray-500 mt-1">{formData.metaTitle.length}/60 characters</p>
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Meta Description
                </label>
                <textarea
                  value={formData.metaDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                  placeholder="SEO description for search engines (150-160 chars)"
                />
                <p className="text-xs text-gray-500 mt-1">{formData.metaDescription.length}/160 characters</p>
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  Meta Keywords
                </label>
                <input
                  type="text"
                  value={formData.metaKeywords}
                  onChange={(e) => setFormData(prev => ({ ...prev, metaKeywords: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                  placeholder="Comma-separated keywords"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.metaKeywords.split(',').filter(k => k.trim()).length} keywords added
                </p>
              </div>
            </motion.div>

            {/* Publish Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                <Globe className="w-6 h-6 text-purple-600" />
                Publish Settings
              </h3>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 font-semibold transition-all"
                  >
                    <option value="draft">📝 Draft</option>
                    <option value="published">🌍 Published</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <label className="flex items-center space-x-3 cursor-pointer bg-yellow-50 px-6 py-4 rounded-xl border-2 border-yellow-200 hover:bg-yellow-100 transition-all">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                      className="w-6 h-6 text-yellow-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                    />
                    <div>
                      <span className="text-sm font-bold text-gray-900 flex items-center gap-2">
                        <Award className="w-5 h-5 text-yellow-600" />
                        Featured Post
                      </span>
                      <p className="text-xs text-gray-600">Highlight on homepage</p>
                    </div>
                  </label>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex gap-4"
            >
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed font-black text-lg shadow-xl hover:shadow-2xl hover:scale-105 disabled:hover:scale-100 transition-all flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-6 h-6" />
                    {isEditMode ? 'Update Post' : 'Create Post'}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate('/blog')}
                className="px-8 py-4 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                Cancel
              </button>
            </motion.div>
          </form>
        </div>

        {/* SEO Analyzer Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* SEO Score Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 sticky top-6"
          >
            <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-purple-600" />
              SEO Score
            </h3>

            <div className="text-center mb-6">
              <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${getSEOScoreColor(seoScore)} flex items-center justify-center shadow-2xl`}>
                <div className="text-center">
                  <p className="text-5xl font-black text-white">{seoScore}</p>
                  <p className="text-sm font-bold text-white opacity-90">/ 100</p>
                </div>
              </div>
              <p className="mt-4 text-2xl font-black text-gray-900">{getSEOScoreLabel(seoScore)}</p>
            </div>

            <div className="space-y-3">
              {Object.entries(seoAnalysis).map(([key, data]) => (
                <div key={key} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-gray-700 capitalize flex items-center gap-2">
                      {data.status === 'success' && <CheckCircle className="w-4 h-4 text-green-600" />}
                      {data.status === 'warning' && <AlertCircle className="w-4 h-4 text-yellow-600" />}
                      {data.status === 'error' && <AlertCircle className="w-4 h-4 text-red-600" />}
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className={`text-sm font-bold ${
                      data.status === 'success' ? 'text-green-600' :
                      data.status === 'warning' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {data.score}/
                      {key === 'title' ? '15' :
                       key === 'metaTitle' ? '15' :
                       key === 'metaDescription' ? '20' :
                       key === 'keywords' ? '15' :
                       key === 'content' ? '20' :
                       '15'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{data.message}</p>
                </div>
              ))}
            </div>

            {seoScore < 80 && (
              <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
                <p className="text-sm font-bold text-yellow-800 mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Improve Your SEO
                </p>
                <p className="text-xs text-yellow-700">
                  Use the AI SEO Generator to automatically optimize your content for search engines!
                </p>
              </div>
            )}
          </motion.div>

          {/* Quick Tips */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-6 border-2 border-blue-200"
          >
            <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              SEO Pro Tips
            </h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Use clear, descriptive titles (30-70 chars)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Write compelling meta descriptions (150-160 chars)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Add 5-10 relevant keywords</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Aim for 300-2000 words of quality content</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Use high-quality featured images</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Add relevant tags and categories</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};


