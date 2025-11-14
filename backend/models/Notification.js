import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  type: {
    type: String,
    enum: [
      'new_quotation',
      'new_newsletter_subscriber',
      'new_chat_message',
      'new_blog_comment',
      'portfolio_view_milestone',
      'system_alert',
      'visitor_milestone',
      'form_submission',
      'contact_message'
    ],
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  link: {
    type: String,
    trim: true
  },
  icon: {
    type: String,
    default: 'Bell'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  read: {
    type: Boolean,
    default: false,
    index: true
  },
  readAt: {
    type: Date
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  expiresAt: {
    type: Date,
    index: true
  }
}, {
  timestamps: true
});

// Index for efficient querying
notificationSchema.index({ recipient: 1, read: 1, createdAt: -1 });
notificationSchema.index({ recipient: 1, createdAt: -1 });

// Auto-delete expired notifications
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Instance methods
notificationSchema.methods.markAsRead = async function() {
  this.read = true;
  this.readAt = new Date();
  return this.save();
};

// Static methods
notificationSchema.statics.createNotification = async function(data) {
  const notification = await this.create(data);
  return notification;
};

notificationSchema.statics.markAllAsRead = async function(recipientId) {
  return this.updateMany(
    { recipient: recipientId, read: false },
    { $set: { read: true, readAt: new Date() } }
  );
};

notificationSchema.statics.getUnreadCount = async function(recipientId) {
  return this.countDocuments({ recipient: recipientId, read: false });
};

notificationSchema.statics.deleteOldNotifications = async function(daysOld = 30) {
  const cutoffDate = new Date(Date.now() - daysOld * 24 * 60 * 60 * 1000);
  return this.deleteMany({ createdAt: { $lt: cutoffDate }, read: true });
};

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
