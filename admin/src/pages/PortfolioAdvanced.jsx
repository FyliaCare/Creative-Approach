import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { SEOAnalyzerEnhanced } from '../components/SEOAnalyzerEnhanced';
import { ImageOptimizerAdvanced } from '../components/ImageOptimizerAdvanced';
import { AnalyticsDashboard } from '../components/AnalyticsDashboard';
import { portfolioAPI, uploadAPI } from '../services/api';
import {
  generateTitle,
  generateDescription,
  generateMetaDescription,
  generateMetaKeywords,
  autoOptimizePortfolio
} from '../utils/aiHelpers';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const PortfolioAdvanced = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewImages, setPreviewImages] = useState([]);
  const [previewVideo, setPreviewVideo] = useState('');

  // Refs for scrolling to sections
  const mediaRef = useRef(null);
  const basicRef = useRef(null);
  const detailsRef = useRef(null);
  const servicesRef = useRef(null);
  const seoRef = useRef(null);
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

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
      const response = await portfolioAPI.getAll();
      setProjects(Array.isArray(response.data) ? response.data : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to fetch portfolio');
      setProjects([]);
      setLoading(false);
    }
  };

  const handleNavigate = (tab, section) => {
    setActiveTab(tab);
    
    setTimeout(() => {
      let ref = null;
      switch (section) {
        case 'media': ref = mediaRef; break;
        case 'basic': ref = basicRef; break;
        case 'details': ref = detailsRef; break;
        case 'services': ref = servicesRef; break;
        case 'seo': ref = seoRef; break;
      }
      
      if (ref && ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        ref.current.classList.add('ring-4', 'ring-blue-400', 'ring-opacity-50');
        setTimeout(() => {
          ref.current.classList.remove('ring-4', 'ring-blue-400', 'ring-opacity-50');
        }, 2000);
      }
    }, 100);
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const uploadedUrls = [];
      
      for (const file of files) {
        const response = await uploadAPI.uploadImage(file);
        if (response.data.success) {
          const fullUrl = `${API_URL}${response.data.data.url}`;
          uploadedUrls.push(fullUrl);
          
          const reader = new FileReader();
          reader.onload = (e) => {
            setPreviewImages(prev => [...prev, { url: fullUrl, preview: e.target.result }]);
          };
          reader.readAsDataURL(file);
        }
      }

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
        featuredImage: prev.featuredImage || uploadedUrls[0]
      }));

      toast.success(`${uploadedUrls.length} image(s) uploaded!`);
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 150 * 1024 * 1024) {
      toast.error('Video file too large. Maximum size is 150MB.');
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    
    try {
      const response = await uploadAPI.uploadVideo(file, (progress) => {
        setUploadProgress(progress);
      });

      if (response.data.success) {
        const videoUrl = `${API_URL}${response.data.data.url}`;
        setFormData(prev => ({ ...prev, videoUrl }));
        setPreviewVideo(URL.createObjectURL(file));
        toast.success('Video uploaded successfully!');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      toast.error('Failed to upload video');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemoveVideo = () => {
    setFormData(prev => ({ ...prev, videoUrl: '' }));
    setPreviewVideo('');
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      await portfolioAPI.delete(projectId);
      toast.success('Project deleted successfully');
      fetchProjects();
      if (selectedProject?._id === projectId) {
        resetForm();
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
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

    if (!formData.title || !formData.description || !formData.client || !formData.location || !formData.date) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!formData.featuredImage && formData.images.length === 0 && optimizedImages.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }

    try {
      // Upload optimized images if available
      let uploadedImages = [...formData.images];
      
      if (optimizedImages.length > 0) {
        const optimizedUploads = await Promise.all(
          optimizedImages.map(async (img) => {
            const response = await uploadAPI.uploadImage(img.file);
            if (response.data.success) {
              return `${API_URL}${response.data.data.url}`;
            }
            return null;
          })
        );
        uploadedImages = [...uploadedImages, ...optimizedUploads.filter(Boolean)];
      }

      const projectData = {
        ...formData,
        images: uploadedImages,
        featuredImage: formData.featuredImage || uploadedImages[0]
      };

      if (selectedProject) {
        await portfolioAPI.update(selectedProject._id, projectData);
        toast.success('Project updated successfully');
      } else {
        await portfolioAPI.create(projectData);
        toast.success('Project created successfully');
      }

      // Reset form
      resetForm();
      fetchProjects();
      setActiveTab('optimize');
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error(error.response?.data?.message || 'Failed to save project');
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
    setPreviewImages([]);
    setPreviewVideo('');
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
    
    // Set previews
    if (project.images && project.images.length > 0) {
      setPreviewImages(project.images.map(url => ({ url, preview: url })));
    }
    if (project.videoUrl) {
      setPreviewVideo(project.videoUrl);
    }
    
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
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Load Existing Project (Optional)
                    </label>
                    <select
                      onChange={(e) => {
                        const project = projects.find(p => p._id === e.target.value);
                        if (project) loadProject(project);
                        else resetForm();
                      }}
                      value={selectedProject?._id || ''}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Create New Project</option>
                      {projects.map((project) => (
                        <option key={project._id} value={project._id}>
                          {project.title} - {project.status}
                        </option>
                      ))}
                    </select>
                  </div>
                  {selectedProject && (
                    <button
                      type="button"
                      onClick={() => handleDeleteProject(selectedProject._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors mt-6"
                    >
                      🗑️ Delete
                    </button>
                  )}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Media Upload Section */}
                <div ref={mediaRef} className="border-t pt-6 transition-all duration-300 rounded-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">📸 Media Upload</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Image Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Images *
                      </label>
                      <div
                        onClick={() => imageInputRef.current?.click()}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
                      >
                        <input
                          ref={imageInputRef}
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <div className="text-4xl mb-2">📁</div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">Upload Images</p>
                        <p className="text-xs text-gray-500">Click to select or drag and drop</p>
                        <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP (Max 10MB each)</p>
                      </div>

                      {/* Image Previews */}
                      {previewImages.length > 0 && (
                        <div className="mt-4 grid grid-cols-3 gap-2">
                          {previewImages.map((img, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={img.preview || img.url}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                ×
                              </button>
                              {index === 0 && (
                                <span className="absolute bottom-1 left-1 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                                  Featured
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Video Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Video (Optional)
                      </label>
                      <div
                        onClick={() => videoInputRef.current?.click()}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
                      >
                        <input
                          ref={videoInputRef}
                          type="file"
                          accept="video/*"
                          onChange={handleVideoUpload}
                          className="hidden"
                        />
                        <div className="text-4xl mb-2">🎥</div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">Upload Video</p>
                        <p className="text-xs text-gray-500">Click to select video file</p>
                        <p className="text-xs text-gray-400 mt-1">MP4, MOV, WebM (Max 150MB)</p>
                      </div>

                      {/* Video Preview */}
                      {previewVideo && (
                        <div className="mt-4 relative">
                          <video
                            src={previewVideo}
                            controls
                            className="w-full rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={handleRemoveVideo}
                            className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
                          >
                            ×
                          </button>
                        </div>
                      )}

                      {uploading && uploadProgress > 0 && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-600">Uploading...</span>
                            <span className="text-blue-600 font-semibold">{uploadProgress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Title with AI Generate */}
                <div ref={basicRef} className="transition-all duration-300 rounded-lg">
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
                <div ref={detailsRef} className="border-t pt-6 transition-all duration-300 rounded-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">📋 Project Details</h3>
                  
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
                <div ref={servicesRef} className="border-t pt-6 transition-all duration-300 rounded-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">🛠️ Services Provided</h3>
                  
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
                <div ref={seoRef} className="border-t pt-6 transition-all duration-300 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">🔍 SEO Meta Tags</h3>
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
              <SEOAnalyzerEnhanced
                portfolio={formData.title ? formData : selectedProject}
                onNavigate={handleNavigate}
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
              <ImageOptimizerAdvanced onImagesOptimized={handleOptimizedImages} />
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
