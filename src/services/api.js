// API Configuration
const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (!envUrl) {
    return 'http://localhost:5000/api';
  }
  // If the URL already ends with /api, use it as is
  // Otherwise, append /api
  return envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`;
};

const API_BASE_URL = getApiBaseUrl();

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
    try {
      return await apiRequest('/newsletter/subscribe', {
        method: 'POST',
        body: JSON.stringify({ email, name }),
      });
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      throw new Error(error.message || 'Failed to subscribe to newsletter. Please try again.');
    }
  },
  
  unsubscribe: async (email) => {
    try {
      return await apiRequest('/newsletter/unsubscribe', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
    } catch (error) {
      console.error('Newsletter unsubscribe error:', error);
      throw new Error(error.message || 'Failed to unsubscribe. Please try again.');
    }
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

// Contact API
export const contactAPI = {
  submit: async (contactData) => {
    try {
      return await apiRequest('/contact', {
        method: 'POST',
        body: JSON.stringify(contactData),
      });
    } catch (error) {
      console.error('Contact form error:', error);
      throw new Error(error.message || 'Failed to send message. Please try again.');
    }
  },
};

// Quote Bot API
export const quoteBotAPI = {
  submit: async (quoteData) => {
    try {
      return await apiRequest('/quote-bot', {
        method: 'POST',
        body: JSON.stringify(quoteData),
      });
    } catch (error) {
      console.error('Quote bot error:', error);
      throw new Error(error.message || 'Failed to submit quote. Please try again.');
    }
  },
};

export default {
  newsletterAPI,
  blogAPI,
  quotationAPI,
  portfolioAPI,
  contactAPI,
  quoteBotAPI,
};
