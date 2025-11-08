import ChatMessage from '../models/ChatMessage.js';
import { v4 as uuidv4 } from 'uuid';

// Store for active connections
const activeUsers = new Map();

export const initializeChat = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);
    
    // Join conversation
    socket.on('join', async ({ conversationId, user }) => {
      try {
        socket.join(conversationId);
        
        // Store user info
        activeUsers.set(socket.id, {
          conversationId,
          user,
          socketId: socket.id
        });
        
        // Notify admin of new visitor
        if (user.type === 'visitor') {
          io.to('admin-room').emit('visitor-joined', {
            conversationId,
            user,
            timestamp: new Date()
          });
        }
        
        // Load conversation history
        const messages = await ChatMessage.find({ conversationId })
          .sort({ createdAt: 1 })
          .limit(50);
        
        socket.emit('conversation-history', messages);
        
        // Notify user joined
        socket.to(conversationId).emit('user-joined', {
          conversationId,
          user
        });
      } catch (error) {
        console.error('Join error:', error);
        socket.emit('error', { message: 'Failed to join conversation' });
      }
    });
    
    // Send message
    socket.on('send-message', async (messageData) => {
      try {
        const {
          conversationId,
          sender,
          senderName,
          senderEmail,
          senderType,
          message,
          messageType = 'text',
          attachments = []
        } = messageData;
        
        // Create message in database
        const newMessage = await ChatMessage.create({
          conversationId,
          sender: sender || null,
          senderName,
          senderEmail,
          senderType,
          message,
          messageType,
          attachments,
          sessionId: socket.handshake.sessionID,
          ipAddress: socket.handshake.address,
          userAgent: socket.handshake.headers['user-agent']
        });
        
        // Emit to conversation room
        io.to(conversationId).emit('new-message', newMessage);
        
        // Notify admin room if message from visitor
        if (senderType === 'visitor') {
          io.to('admin-room').emit('new-visitor-message', {
            conversationId,
            message: newMessage
          });
        }
      } catch (error) {
        console.error('Send message error:', error);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });
    
    // Typing indicator
    socket.on('typing', ({ conversationId, user }) => {
      socket.to(conversationId).emit('user-typing', {
        conversationId,
        user
      });
    });
    
    socket.on('stop-typing', ({ conversationId, user }) => {
      socket.to(conversationId).emit('user-stop-typing', {
        conversationId,
        user
      });
    });
    
    // Mark messages as read
    socket.on('mark-read', async ({ conversationId, messageIds }) => {
      try {
        await ChatMessage.updateMany(
          {
            _id: { $in: messageIds },
            conversationId
          },
          {
            $set: {
              isRead: true,
              readAt: new Date()
            }
          }
        );
        
        socket.to(conversationId).emit('messages-read', {
          conversationId,
          messageIds
        });
      } catch (error) {
        console.error('Mark read error:', error);
      }
    });
    
    // Admin joins admin room
    socket.on('join-admin', ({ userId }) => {
      socket.join('admin-room');
      console.log('Admin joined admin room:', userId);
      
      // Send active conversations count
      const activeConversations = Array.from(activeUsers.values())
        .filter(u => u.user.type === 'visitor')
        .map(u => u.conversationId);
      
      socket.emit('active-conversations', {
        count: new Set(activeConversations).size,
        conversations: [...new Set(activeConversations)]
      });
    });
    
    // Get active conversations (admin only)
    socket.on('get-active-conversations', async () => {
      try {
        // Get unique conversation IDs from active users
        const conversationIds = [...new Set(
          Array.from(activeUsers.values())
            .filter(u => u.user.type === 'visitor')
            .map(u => u.conversationId)
        )];
        
        // Get last message for each conversation
        const conversations = await Promise.all(
          conversationIds.map(async (convId) => {
            const lastMessage = await ChatMessage.findOne({ conversationId: convId })
              .sort({ createdAt: -1 });
            
            const unreadCount = await ChatMessage.countDocuments({
              conversationId: convId,
              isRead: false,
              senderType: 'visitor'
            });
            
            return {
              conversationId: convId,
              lastMessage,
              unreadCount
            };
          })
        );
        
        socket.emit('active-conversations', {
          count: conversations.length,
          conversations
        });
      } catch (error) {
        console.error('Get conversations error:', error);
        socket.emit('error', { message: 'Failed to get conversations' });
      }
    });
    
    // Get conversation messages
    socket.on('get-conversation', async ({ conversationId, limit = 50, skip = 0 }) => {
      try {
        const messages = await ChatMessage.find({ conversationId })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit);
        
        socket.emit('conversation-messages', {
          conversationId,
          messages: messages.reverse()
        });
      } catch (error) {
        console.error('Get conversation error:', error);
        socket.emit('error', { message: 'Failed to get conversation' });
      }
    });
    
    // Disconnect
    socket.on('disconnect', () => {
      const userData = activeUsers.get(socket.id);
      
      if (userData) {
        const { conversationId, user } = userData;
        
        // Notify others in conversation
        socket.to(conversationId).emit('user-left', {
          conversationId,
          user
        });
        
        // Notify admin if visitor left
        if (user.type === 'visitor') {
          io.to('admin-room').emit('visitor-left', {
            conversationId,
            user,
            timestamp: new Date()
          });
        }
        
        activeUsers.delete(socket.id);
      }
      
      console.log('Client disconnected:', socket.id);
    });
  });
  
  // Return helper functions
  return {
    getActiveUsers: () => Array.from(activeUsers.values()),
    getActiveConversationsCount: () => {
      const conversationIds = new Set(
        Array.from(activeUsers.values())
          .filter(u => u.user.type === 'visitor')
          .map(u => u.conversationId)
      );
      return conversationIds.size;
    }
  };
};
