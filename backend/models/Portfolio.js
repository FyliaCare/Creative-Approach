import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['aerial', 'inspection', 'mapping', 'documentary', 'real-estate', 'construction', 'events', 'other']
  },
  client: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  featuredImage: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  videoUrl: {
    type: String
  },
  projectDetails: {
    challenge: String,
    solution: String,
    results: String
  },
  services: [{
    type: String
  }],
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  metaTitle: String,
  metaDescription: String,
  metaKeywords: String,
  // AI-powered optimization scores
  seoScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  qualityScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  optimization: {
    imageCompressed: {
      type: Boolean,
      default: false
    },
    metaTagsComplete: {
      type: Boolean,
      default: false
    },
    altTextComplete: {
      type: Boolean,
      default: false
    },
    lastOptimized: Date
  },
  // Analytics tracking
  analytics: {
    totalViews: {
      type: Number,
      default: 0
    },
    totalLikes: {
      type: Number,
      default: 0
    },
    totalShares: {
      type: Number,
      default: 0
    },
    avgTimeOnPage: {
      type: Number,
      default: 0
    },
    bounceRate: {
      type: Number,
      default: 0
    },
    viewHistory: [{
      date: Date,
      count: Number
    }],
    engagementRate: {
      type: Number,
      default: 0
    },
    trafficSources: {
      direct: { type: Number, default: 0 },
      search: { type: Number, default: 0 },
      social: { type: Number, default: 0 },
      referral: { type: Number, default: 0 }
    },
    devices: {
      desktop: { type: Number, default: 0 },
      mobile: { type: Number, default: 0 },
      tablet: { type: Number, default: 0 }
    },
    topLocations: [{
      country: String,
      views: Number
    }]
  }
}, {
  timestamps: true
});

// Create slug from title before saving
portfolioSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

export default mongoose.model('Portfolio', portfolioSchema);
