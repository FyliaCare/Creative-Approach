import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import toast from 'react-hot-toast';

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
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
    setLoading(true);

    try {
      // Upload image if new one selected
      const featuredImage = await uploadImage();

      const token = localStorage.getItem('token');
      const postData = { ...formData, featuredImage };

      if (isEditMode) {
        await axios.patch(`${API_URL}/api/blog/${id}`, postData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Post updated successfully');
      } else {
        await axios.post(`${API_URL}/api/blog`, postData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Post created successfully');
      }

      navigate('/blog');
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error(error.response?.data?.message || 'Failed to save post');
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
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditMode ? 'Edit Post' : 'Create New Post'}
        </h1>
        <button
          onClick={() => navigate('/blog')}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          ← Back to Blog
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="bg-white rounded-lg shadow p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter post title"
          />
        </div>

        {/* Slug */}
        <div className="bg-white rounded-lg shadow p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Slug (URL) *
          </label>
          <input
            type="text"
            required
            value={formData.slug}
            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="post-url-slug"
          />
        </div>

        {/* Featured Image */}
        <div className="bg-white rounded-lg shadow p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Featured Image
          </label>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Excerpt */}
        <div className="bg-white rounded-lg shadow p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Excerpt
          </label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Brief description of the post"
          />
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content *
          </label>
          <ReactQuill
            theme="snow"
            value={formData.content}
            onChange={(content) => setFormData(prev => ({ ...prev, content }))}
            modules={quillModules}
            className="h-96 mb-12"
          />
        </div>

        {/* Category and Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select category</option>
              <option value="Aerial Photography">Aerial Photography</option>
              <option value="Videography">Videography</option>
              <option value="Surveying">Surveying</option>
              <option value="Inspection">Inspection</option>
              <option value="Events">Events</option>
              <option value="News">News</option>
              <option value="Tips & Tutorials">Tips & Tutorials</option>
            </select>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add tag"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* SEO Meta */}
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">SEO Settings</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meta Title
            </label>
            <input
              type="text"
              value={formData.metaTitle}
              onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="SEO title for search engines"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meta Description
            </label>
            <textarea
              value={formData.metaDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="SEO description for search engines"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meta Keywords
            </label>
            <input
              type="text"
              value={formData.metaKeywords}
              onChange={(e) => setFormData(prev => ({ ...prev, metaKeywords: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Comma-separated keywords"
            />
          </div>
        </div>

        {/* Status and Featured */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div className="flex items-center">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Featured Post</span>
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : (isEditMode ? 'Update Post' : 'Create Post')}
          </button>
          <button
            type="button"
            onClick={() => navigate('/blog')}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
