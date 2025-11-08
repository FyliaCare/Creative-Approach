import mongoose from 'mongoose';

const quotationSchema = new mongoose.Schema({
  // Contact Information
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  
  // Project Details
  service: {
    type: String,
    required: [true, 'Service is required'],
    enum: [
      'Aerial Photography',
      'Drone Inspection',
      'Mapping & Surveying',
      'Documentary Production',
      'Training',
      'Other'
    ]
  },
  projectType: {
    type: String,
    enum: [
      'Real Estate',
      'Construction',
      'Mining',
      'Agriculture',
      'Infrastructure',
      'Events',
      'Other'
    ]
  },
  budget: {
    type: String,
    enum: [
      'Less than GHS 5,000',
      'GHS 5,000 - 10,000',
      'GHS 10,000 - 25,000',
      'GHS 25,000 - 50,000',
      'More than GHS 50,000',
      'Not sure'
    ]
  },
  timeline: {
    type: String,
    enum: [
      'Urgent (Within 1 week)',
      '1-2 weeks',
      '2-4 weeks',
      '1-2 months',
      'Flexible'
    ]
  },
  location: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Message is required']
  },
  
  // Status & Assignment
  status: {
    type: String,
    enum: ['new', 'reviewed', 'quoted', 'accepted', 'rejected', 'completed'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  // Quote Details
  quotedAmount: {
    type: Number
  },
  quotedAt: {
    type: Date
  },
  quotePDF: {
    type: String
  },
  
  // Tracking
  ipAddress: {
    type: String
  },
  country: {
    type: String
  },
  source: {
    type: String,
    default: 'website'
  },
  
  // Notes & Follow-ups
  notes: [{
    note: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  followUpDate: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes
quotationSchema.index({ status: 1, createdAt: -1 });
quotationSchema.index({ email: 1 });
quotationSchema.index({ priority: 1 });

const Quotation = mongoose.model('Quotation', quotationSchema);

export default Quotation;
