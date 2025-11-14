import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  updatePassword: (data) => api.put('/auth/password', data),
};

// Newsletter API
export const newsletterAPI = {
  getSubscribers: (params) => api.get('/newsletter/subscribers', { params }),
  getStats: () => api.get('/newsletter/stats'),
  deleteSubscriber: (id) => api.delete(`/newsletter/${id}`),
  sendBulkEmail: (data) => api.post('/newsletter/send-bulk', data),
  getCampaigns: (params) => api.get('/newsletter/campaigns', { params }),
  getCampaign: (id) => api.get(`/newsletter/campaigns/${id}`),
};

// Blog API
export const blogAPI = {
  getAllPosts: (params) => api.get('/blog', { params }),
  getPost: (id) => api.get(`/blog/${id}`),
  createPost: (data) => api.post('/blog', data),
  updatePost: (id, data) => api.put(`/blog/${id}`, data),
  deletePost: (id) => api.delete(`/blog/${id}`),
  getCategories: () => api.get('/blog/categories/list'),
  getTags: () => api.get('/blog/tags/popular'),
};

// Quotations API
export const quotationsAPI = {
  getAll: (params) => api.get('/quotations', { params }),
  getById: (id) => api.get(`/quotations/${id}`),
  update: (id, data) => api.put(`/quotations/${id}`, data),
  addNote: (id, note) => api.post(`/quotations/${id}/notes`, { note }),
  delete: (id) => api.delete(`/quotations/${id}`),
  getStats: () => api.get('/quotations/stats/overview'),
};

// Analytics API
export const analyticsAPI = {
  getOverview: (period = '7d') => api.get('/analytics/overview', { params: { period } }),
  getCountries: () => api.get('/analytics/countries'),
  getPages: () => api.get('/analytics/pages'),
  getReferrers: () => api.get('/analytics/referrers'),
  getDevices: () => api.get('/analytics/devices'),
  getRealtime: () => api.get('/analytics/realtime'),
  getTimeline: (period = '7d') => api.get('/analytics/timeline', { params: { period } }),
  getVisitorMap: (period = '24h', activeOnly = false) => api.get('/analytics/visitor-map', { params: { period, activeOnly } }),
  getVisitorHeatmap: (period = '7d') => api.get('/analytics/visitor-heatmap', { params: { period } }),
  getPortfolioOverview: () => api.get('/analytics/portfolio/overview'),
  trackPortfolioView: (portfolioId, data) => api.post('/analytics/portfolio/track-view', { portfolioId, ...data }),
};

// Portfolio API
export const portfolioAPI = {
  getAll: (params) => api.get('/portfolio', { params }),
  getById: (id) => api.get(`/portfolio/${id}`),
  create: (data) => api.post('/portfolio', data),
  update: (id, data) => api.patch(`/portfolio/${id}`, data),
  delete: (id) => api.delete(`/portfolio/${id}`),
  getStats: () => api.get('/portfolio/stats'),
};

// Notification API
export const notificationAPI = {
  getAll: (params) => api.get('/notifications', { params }),
  getById: (id) => api.get(`/notifications/${id}`),
  getUnreadCount: () => api.get('/notifications/unread-count'),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put('/notifications/mark-all-read'),
  delete: (id) => api.delete(`/notifications/${id}`),
  clearAll: () => api.delete('/notifications/clear-all'),
  createTest: () => api.post('/notifications/test'),
};

// Upload API
export const uploadAPI = {
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  uploadImages: (files) => {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));
    return api.post('/upload/images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  uploadVideo: (file, onProgress) => {
    const formData = new FormData();
    formData.append('video', file);
    return api.post('/upload/video', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentCompleted);
        }
      },
    });
  },
  uploadDocument: (file) => {
    const formData = new FormData();
    formData.append('document', file);
    return api.post('/upload/document', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export default api;
