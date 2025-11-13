import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  // Company Information
  company: {
    siteName: { type: String, default: 'Creative Approach' },
    contactEmail: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    logo: { type: String },
    favicon: { type: String },
  },

  // Social Media
  socialMedia: {
    facebook: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
    youtube: { type: String },
    tiktok: { type: String },
  },

  // Email Configuration
  email: {
    smtpHost: { type: String },
    smtpPort: { type: Number },
    smtpUser: { type: String },
    smtpPassword: { type: String },
    fromEmail: { type: String },
    fromName: { type: String },
  },

  // API Settings
  api: {
    rateLimit: { type: Number, default: 100 },
    rateLimitWindow: { type: Number, default: 900000 }, // 15 minutes
    maxFileSize: { type: Number, default: 10485760 }, // 10MB
    allowedFileTypes: {
      type: [String],
      default: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
    },
  },

  // Security Settings
  security: {
    twoFactorAuth: { type: Boolean, default: false },
    sessionTimeout: { type: Number, default: 3600000 }, // 1 hour
    passwordMinLength: { type: Number, default: 8 },
    requireStrongPassword: { type: Boolean, default: true },
    maxLoginAttempts: { type: Number, default: 5 },
    lockoutDuration: { type: Number, default: 900000 }, // 15 minutes
  },

  // Maintenance
  maintenance: {
    enabled: { type: Boolean, default: false },
    message: { type: String, default: 'We are currently performing maintenance. Please check back soon.' },
    allowedIPs: { type: [String], default: [] },
  },

  // Analytics
  analytics: {
    googleAnalyticsId: { type: String },
    facebookPixelId: { type: String },
    enableTracking: { type: Boolean, default: true },
  },

  // Backup Settings
  backup: {
    autoBackup: { type: Boolean, default: false },
    backupFrequency: { type: String, default: 'daily' }, // daily, weekly, monthly
    lastBackup: { type: Date },
  },

  // SEO Settings
  seo: {
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: { type: [String] },
    ogImage: { type: String },
  },

  // Notification Settings (system-wide defaults)
  notifications: {
    enableEmail: { type: Boolean, default: true },
    enableSMS: { type: Boolean, default: false },
    enablePush: { type: Boolean, default: false },
  },

  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true
});

// Only allow one settings document
settingsSchema.statics.getSettings = async function() {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({
      company: {
        siteName: 'Creative Approach',
        contactEmail: process.env.EMAIL_USER || 'info@creativeapproach.gh',
      }
    });
  }
  return settings;
};

const Settings = mongoose.model('Settings', settingsSchema);

export default Settings;
