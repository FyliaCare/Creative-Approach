import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema({
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
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  service: {
    type: String,
    trim: true
  },
  
  // Message Content
  message: {
    type: String,
    required: [true, 'Message is required']
  },
  
  // Status & Management
  status: {
    type: String,
    enum: ['new', 'read', 'converted_to_quote', 'replied', 'archived', 'spam'],
    default: 'new',
    index: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  
  // Assignment
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  // Related Models
  quotationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quotation'
  },
  
  // Admin Notes
  adminNotes: [{
    note: String,
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Response tracking
  replied: {
    type: Boolean,
    default: false
  },
  repliedAt: {
    type: Date
  },
  repliedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  // Tracking
  source: {
    type: String,
    enum: ['website_contact_form', 'quote_bot', 'email', 'phone', 'other'],
    default: 'website_contact_form'
  },
  ipAddress: String,
  userAgent: String,
  
}, {
  timestamps: true
});

// Indexes for efficient querying
contactMessageSchema.index({ status: 1, createdAt: -1 });
contactMessageSchema.index({ email: 1 });
contactMessageSchema.index({ assignedTo: 1, status: 1 });

// Instance methods
contactMessageSchema.methods.markAsRead = async function() {
  this.status = 'read';
  return this.save();
};

contactMessageSchema.methods.convertToQuotation = async function(quotationId) {
  this.status = 'converted_to_quote';
  this.quotationId = quotationId;
  return this.save();
};

contactMessageSchema.methods.archive = async function() {
  this.status = 'archived';
  return this.save();
};

contactMessageSchema.methods.markAsSpam = async function() {
  this.status = 'spam';
  return this.save();
};

contactMessageSchema.methods.addNote = async function(note, userId) {
  this.adminNotes.push({
    note,
    addedBy: userId,
    addedAt: new Date()
  });
  return this.save();
};

// Static methods
contactMessageSchema.statics.getUnreadCount = async function() {
  return this.countDocuments({ status: 'new' });
};

contactMessageSchema.statics.getNewMessages = async function(limit = 10) {
  return this.find({ status: 'new' })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
};

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);

export default ContactMessage;
