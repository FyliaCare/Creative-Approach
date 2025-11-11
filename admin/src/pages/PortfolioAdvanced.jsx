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
  const [previewImages, setPreviewImages] = useState([]);
  const [previewVideo, setPreviewVideo] = useState('');

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
        case 'media':
          ref = mediaRef;
          break;
        case 'basic':
          ref = basicRef;
          break;
        case 'details':
          ref = detailsRef;
          break;
        case 'services':
          ref = servicesRef;
          break;
        case 'seo':
          ref = seoRef;
          break;
      }
      
      if (ref && ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Highlight the section briefly
        ref.current.classList.add('ring-4', 'ring-blue-400', 'ring-opacity-50');
        setTimeout(() => {
          ref.current.classList.remove('ring-4', 'ring-blue-400', 'ring-opacity-50');
        }, 2000);
      }
    }, 100);
  };

  // ... [Additional handler functions would continue here]
