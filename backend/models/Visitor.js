import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
  // Session Information
  sessionId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  
  // Location Data
  ipAddress: {
    type: String,
    required: true
  },
  country: {
    type: String,
    default: 'Unknown'
  },
  city: {
    type: String,
    default: 'Unknown'
  },
  region: {
    type: String
  },
  timezone: {
    type: String
  },
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  
  // Device Information
  userAgent: {
    type: String
  },
  browser: {
    type: String
  },
  os: {
    type: String
  },
  device: {
    type: String,
    enum: ['desktop', 'mobile', 'tablet', 'unknown'],
    default: 'unknown'
  },
  screenResolution: {
    type: String
  },
  
  // Visit Details
  pages: [{
    url: String,
    title: String,
    visitedAt: {
      type: Date,
      default: Date.now
    },
    timeSpent: Number, // in seconds
    referrer: String
  }],
  
  // Entry & Exit
  entryPage: {
    type: String
  },
  exitPage: {
    type: String
  },
  referrer: {
    type: String
  },
  referrerDomain: {
    type: String
  },
  utmSource: {
    type: String
  },
  utmMedium: {
    type: String
  },
  utmCampaign: {
    type: String
  },
  
  // Engagement Metrics
  totalPageViews: {
    type: Number,
    default: 1
  },
  sessionDuration: {
    type: Number,
    default: 0 // in seconds
  },
  bounced: {
    type: Boolean,
    default: false
  },
  
  // Session Dates
  firstVisit: {
    type: Date,
    default: Date.now
  },
  lastActivity: {
    type: Date,
    default: Date.now
  },
  
  // Conversion Tracking
  actions: [{
    type: String,
    action: String, // e.g., 'form_submit', 'quote_request', 'newsletter_signup'
    details: mongoose.Schema.Types.Mixed,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  converted: {
    type: Boolean,
    default: false
  },
  
  // Status
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes
visitorSchema.index({ country: 1 });
visitorSchema.index({ createdAt: -1 });
visitorSchema.index({ lastActivity: -1 });
visitorSchema.index({ isActive: 1, lastActivity: -1 });
visitorSchema.index({ converted: 1 });

// Virtual for returning user check
visitorSchema.virtual('isReturning').get(function() {
  return this.totalPageViews > 1;
});

// Method to update last activity
visitorSchema.methods.updateActivity = function() {
  this.lastActivity = new Date();
  return this.save();
};

// Method to add page view
visitorSchema.methods.addPageView = function(pageData) {
  this.pages.push(pageData);
  this.totalPageViews += 1;
  this.lastActivity = new Date();
  if (!this.exitPage) {
    this.exitPage = pageData.url;
  }
  return this.save();
};

// Method to mark as converted
visitorSchema.methods.markConverted = function(action, details) {
  this.converted = true;
  this.actions.push({
    action,
    details,
    timestamp: new Date()
  });
  return this.save();
};

const Visitor = mongoose.model('Visitor', visitorSchema);

export default Visitor;
