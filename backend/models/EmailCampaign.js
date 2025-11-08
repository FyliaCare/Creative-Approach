import mongoose from 'mongoose';

const emailCampaignSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true
  },
  body: {
    type: String,
    required: [true, 'Email body is required']
  },
  recipientType: {
    type: String,
    enum: ['all', 'active', 'selected'],
    required: true
  },
  recipientCount: {
    type: Number,
    required: true,
    default: 0
  },
  sentCount: {
    type: Number,
    default: 0
  },
  failedCount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['sending', 'completed', 'failed'],
    default: 'sending'
  },
  sentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sentAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  },
  errors: [{
    email: String,
    error: String
  }]
}, {
  timestamps: true
});

// Index for faster queries
emailCampaignSchema.index({ sentAt: -1 });
emailCampaignSchema.index({ sentBy: 1 });

const EmailCampaign = mongoose.model('EmailCampaign', emailCampaignSchema);

export default EmailCampaign;
