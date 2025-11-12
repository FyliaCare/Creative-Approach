// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Generic API request handler
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };
  
  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Newsletter API
export const newsletterAPI = {
  subscribe: async (email, name = '') => {
    return apiRequest('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email, name }),
    });
  },
  
  unsubscribe: async (email) => {
    return apiRequest('/newsletter/unsubscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },
};

// Blog API
export const blogAPI = {
  getAllPosts: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/blog?${queryString}`);
  },
  
  getPostBySlug: async (slug) => {
    return apiRequest(`/blog/${slug}`);
  },
  
  likePost: async (id) => {
    return apiRequest(`/blog/${id}/like`, {
      method: 'POST',
    });
  },
  
  getCategories: async () => {
    return apiRequest('/blog/categories/list');
  },
  
  getPopularTags: async () => {
    return apiRequest('/blog/tags/popular');
  },
};

// Quotation API
export const quotationAPI = {
  submitQuote: async (quoteData) => {
    return apiRequest('/quotations', {
      method: 'POST',
      body: JSON.stringify(quoteData),
    });
  },
};

// Portfolio API
export const portfolioAPI = {
  getAll: async () => {
    return apiRequest('/portfolio');
  },
  
  getById: async (id) => {
    return apiRequest(`/portfolio/${id}`);
  },
  
  create: async (portfolioData) => {
    return apiRequest('/portfolio', {
      method: 'POST',
      body: JSON.stringify(portfolioData),
    });
  },
  
  update: async (id, portfolioData) => {
    return apiRequest(`/portfolio/${id}`, {
      method: 'PUT',
      body: JSON.stringify(portfolioData),
    });
  },
  
  delete: async (id) => {
    return apiRequest(`/portfolio/${id}`, {
      method: 'DELETE',
    });
  },
};

export default {
  newsletterAPI,
  blogAPI,
  quotationAPI,
  portfolioAPI,
};
