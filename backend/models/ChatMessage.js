import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema({
  // Conversation ID
  conversationId: {
    type: String,
    required: true,
    index: true
  },
  
  // Sender Info
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Allow guest users (visitors)
  },
  senderName: {
    type: String,
    required: true,
    trim: true
  },
  senderEmail: {
    type: String,
    trim: true,
    lowercase: true
  },
  senderType: {
    type: String,
    enum: ['admin', 'user', 'visitor'],
    required: true,
    default: 'visitor'
  },
  
  // Message Content
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true
  },
  messageType: {
    type: String,
    enum: ['text', 'image', 'file', 'system'],
    default: 'text'
  },
  attachments: [{
    type: String,
    url: String,
    name: String,
    size: Number
  }],
  
  // Status
  isRead: {
    type: Boolean,
    default: false
  },
  readAt: {
    type: Date
  },
  
  // Session Info
  sessionId: {
    type: String
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  }
}, {
  timestamps: true
});

// Indexes
chatMessageSchema.index({ conversationId: 1, createdAt: -1 });
chatMessageSchema.index({ sender: 1 });
chatMessageSchema.index({ isRead: 1 });

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

export default ChatMessage;
