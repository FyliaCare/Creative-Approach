import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { SEOAnalyzer } from '../components/SEOAnalyzer';
import { ImageOptimizer } from '../components/ImageOptimizer';
import { AnalyticsDashboard } from '../components/AnalyticsDashboard';
import {
  generateTitle,
  generateDescription,
  generateMetaDescription,
  generateMetaKeywords,
  autoOptimizePortfolio
} from '../utils/aiHelpers';

const API_URL = import.meta.env.VITE_API_URL;

export const PortfolioAdvanced = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    client: '',
    location: '',
    date: '',
    category: 'aerial',
    featured: false,
    featuredImage: '',
    images: [],
    videoUrl: '',
    projectDetails: {
      challenge: '',
      solution: '',
      results: ''
    },
    services: [],
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    status: 'draft'
  });

  const [serviceInput, setServiceInput] = useState('');
  const [optimizedImages, setOptimizedImages] = useState([]);
  const [aiGenerating, setAiGenerating] = useState(false);

  const categories = [
    'aerial',
    'inspection',
    'mapping',
    'film',
    'real-estate',
    'construction',
    'events',
    'other'
  ];

  const commonServices = [
    'Aerial Photography',
    'Aerial Videography',
    'Drone Mapping',
    '3D Modeling',
    'Thermal Imaging',
    'LiDAR Scanning',
    'Construction Monitoring',
    'Real Estate Photography',
    'Event Coverage',
    'Inspection Services'
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/portfolio`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(Array.isArray(response.data) ? response.data : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to fetch portfolio');
      setProjects([]);
      setLoading(false);
    }
  };

  const handleAIGenerate = async (field) => {
    setAiGenerating(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate AI processing
      
      if (field === 'title') {
        const generatedTitle = generateTitle(formData.category, formData.location, formData.client);
        setFormData(prev => ({ ...prev, title: generatedTitle }));
        toast.success('Title generated!');
      } else if (field === 'description') {
        const generatedDesc = generateDescription(formData.category, formData.location, formData.client);
        setFormData(prev => ({ ...prev, description: generatedDesc }));
        toast.success('Description generated!');
      } else if (field === 'meta') {
        const metaTitle = formData.title || generateTitle(formData.category, formData.location, formData.client);
        const metaDesc = generateMetaDescription(formData);
        const metaKeywords = generateMetaKeywords(formData);
        
        setFormData(prev => ({
          ...prev,
          metaTitle,
          metaDescription: metaDesc,
          metaKeywords
        }));
        toast.success('Meta tags generated!');
      }
    } catch (error) {
      toast.error('Failed to generate content');
    } finally {
      setAiGenerating(false);
    }
  };

  const handleAutoOptimize = () => {
    const optimized = autoOptimizePortfolio(formData);
    setFormData(optimized);
    toast.success(`Portfolio optimized! SEO Score: ${optimized.seoScore}/100`);
  };

  const handleOptimizedImages = (images) => {
    setOptimizedImages(images);
    toast.success(`${images.length} images optimized and ready to use!`);
    setActiveTab('create');
  };

  const handleAddService = () => {
    if (serviceInput.trim() && !formData.services.includes(serviceInput.trim())) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, serviceInput.trim()]
      }));
      setServiceInput('');
    }
  };

  const handleRemoveService = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter(s => s !== service)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      
      // Upload optimized images if available
      let uploadedImages = [];
      if (optimizedImages.length > 0) {
        uploadedImages = await Promise.all(
          optimizedImages.map(async (img) => {
            const formDataImage = new FormData();
            formDataImage.append('image', img.file);
            
            const response = await axios.post(`${API_URL}/api/upload`, formDataImage, {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
              },
            });
            return response.data.url;
          })
        );
      }

      const projectData = {
        ...formData,
        images: uploadedImages.length > 0 ? uploadedImages : formData.images,
        featuredImage: uploadedImages.length > 0 ? uploadedImages[0] : formData.featuredImage
      };

      if (selectedProject) {
        await axios.patch(`${API_URL}/api/portfolio/${selectedProject._id}`, projectData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Project updated successfully');
      } else {
        await axios.post(`${API_URL}/api/portfolio`, projectData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Project created successfully');
      }

      // Reset form
      resetForm();
      fetchProjects();
      setActiveTab('optimize');
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Failed to save project');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      client: '',
      location: '',
      date: '',
      category: 'aerial',
      featured: false,
      featuredImage: '',
      images: [],
      videoUrl: '',
      projectDetails: {
        challenge: '',
        solution: '',
        results: ''
      },
      services: [],
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
      status: 'draft'
    });
    setOptimizedImages([]);
    setSelectedProject(null);
  };

  const loadProject = (project) => {
    setSelectedProject(project);
    setFormData({
      title: project.title || '',
      description: project.description || '',
      client: project.client || '',
      location: project.location || '',
      date: project.date ? new Date(project.date).toISOString().split('T')[0] : '',
      category: project.category || 'aerial',
      featured: project.featured || false,
      featuredImage: project.featuredImage || '',
      images: project.images || [],
      videoUrl: project.videoUrl || '',
      projectDetails: project.projectDetails || {
        challenge: '',
        solution: '',
        results: ''
      },
      services: project.services || [],
      metaTitle: project.metaTitle || '',
      metaDescription: project.metaDescription || '',
      metaKeywords: project.metaKeywords || '',
      status: project.status || 'draft'
    });
    setActiveTab('create');
  };

  const tabs = [
    { id: 'create', label: 'Create & Edit', icon: '✏️' },
    { id: 'optimize', label: 'SEO Optimizer', icon: '🎯' },
    { id: 'images', label: 'Image Optimizer', icon: '🖼️' },
    { id: 'analytics', label: 'Analytics', icon: '📊' }
  ];

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
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Advanced Portfolio Manager</h1>
          <p className="text-gray-600 mt-1">AI-powered tools to create world-class portfolio content</p>
        </div>
        <button
          onClick={handleAutoOptimize}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg"
        >
          🤖 Auto-Optimize
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Create & Edit Tab */}
          {activeTab === 'create' && (
            <motion.div
              key="create"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Project Selector */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Load Existing Project (Optional)
                </label>
                <select
                  onChange={(e) => {
                    const project = projects.find(p => p._id === e.target.value);
                    if (project) loadProject(project);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Create New Project</option>
                  {projects.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.title}
                    </option>
                  ))}
                </select>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title with AI Generate */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter a compelling title..."
                    />
                    <button
                      type="button"
                      onClick={() => handleAIGenerate('title')}
                      disabled={aiGenerating}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
                    >
                      🤖 AI Generate
                    </button>
                  </div>
                </div>

                {/* Description with AI Generate */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <div className="space-y-2">
                    <textarea
                      required
                      rows={5}
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe your project in detail..."
                    />
                    <button
                      type="button"
                      onClick={() => handleAIGenerate('description')}
                      disabled={aiGenerating}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 text-sm"
                    >
                      🤖 AI Generate Description
                    </button>
                  </div>
                </div>

                {/* Basic Info Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Client
                    </label>
                    <input
                      type="text"
                      value={formData.client}
                      onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Client name..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Project location..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 capitalize"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat} className="capitalize">
                          {cat.replace('-', ' ')}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Project Details */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Project Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Challenge
                      </label>
                      <textarea
                        rows={3}
                        value={formData.projectDetails.challenge}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          projectDetails: { ...prev.projectDetails, challenge: e.target.value }
                        }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="What challenge did this project solve?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Solution
                      </label>
                      <textarea
                        rows={3}
                        value={formData.projectDetails.solution}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          projectDetails: { ...prev.projectDetails, solution: e.target.value }
                        }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="How did you solve it?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Results
                      </label>
                      <textarea
                        rows={3}
                        value={formData.projectDetails.results}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          projectDetails: { ...prev.projectDetails, results: e.target.value }
                        }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="What were the outcomes?"
                      />
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Services Provided</h3>
                  
                  {/* Quick Add Common Services */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {commonServices.map((service) => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => {
                          if (!formData.services.includes(service)) {
                            setFormData(prev => ({
                              ...prev,
                              services: [...prev.services, service]
                            }));
                          }
                        }}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${
                          formData.services.includes(service)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>

                  {/* Custom Service Input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={serviceInput}
                      onChange={(e) => setServiceInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddService())}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Add custom service..."
                    />
                    <button
                      type="button"
                      onClick={handleAddService}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                    >
                      Add
                    </button>
                  </div>

                  {/* Selected Services */}
                  {formData.services.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {formData.services.map((service, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2"
                        >
                          {service}
                          <button
                            type="button"
                            onClick={() => handleRemoveService(service)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* SEO Meta Tags */}
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">SEO Meta Tags</h3>
                    <button
                      type="button"
                      onClick={() => handleAIGenerate('meta')}
                      disabled={aiGenerating}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 text-sm"
                    >
                      🤖 Auto-Generate Meta Tags
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meta Title
                      </label>
                      <input
                        type="text"
                        value={formData.metaTitle}
                        onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="SEO title for search engines..."
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {formData.metaTitle.length}/60 characters
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meta Description
                      </label>
                      <textarea
                        rows={3}
                        value={formData.metaDescription}
                        onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Brief description for search results..."
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {formData.metaDescription.length}/160 characters
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meta Keywords
                      </label>
                      <input
                        type="text"
                        value={formData.metaKeywords}
                        onChange={(e) => setFormData(prev => ({ ...prev, metaKeywords: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="keyword1, keyword2, keyword3..."
                      />
                    </div>
                  </div>
                </div>

                {/* Status & Featured */}
                <div className="border-t pt-6 flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Featured Project</span>
                  </label>

                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-6 border-t">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
                  >
                    {selectedProject ? 'Update Project' : 'Create Project'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* SEO Optimizer Tab */}
          {activeTab === 'optimize' && (
            <motion.div
              key="optimize"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <SEOAnalyzer
                portfolio={formData.title ? formData : selectedProject}
                onOptimize={(optimized) => {
                  setFormData(optimized);
                  toast.success('Portfolio optimized with SEO improvements!');
                }}
              />
            </motion.div>
          )}

          {/* Image Optimizer Tab */}
          {activeTab === 'images' && (
            <motion.div
              key="images"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ImageOptimizer onImagesOptimized={handleOptimizedImages} />
            </motion.div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AnalyticsDashboard portfolio={selectedProject} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
