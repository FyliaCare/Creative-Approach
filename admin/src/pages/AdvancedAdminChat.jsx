import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import io from 'socket.io-client';
import {
  Send, Search, MoreVertical, Phone, Video, Info,
  Paperclip, Smile, Check, CheckCheck, Clock, AlertCircle,
  Image as ImageIcon, File, Download, X, MessageCircle,
  User, Mail, Calendar, MapPin, Monitor
} from 'lucide-react';

// Construct socket URL properly
const getSocketURL = () => {
  const apiUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
  // Remove /api if it exists, and any trailing slashes
  return apiUrl.replace(/\/api\/?$/, '').replace(/\/$/, '');
};

const SOCKET_URL = getSocketURL();

console.log('🔌 Admin socket connecting to:', SOCKET_URL);

export default function AdvancedAdminChat() {
  const [socket, setSocket] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const fileInputRef = useRef(null);

  const adminName = JSON.parse(localStorage.getItem('user') || '{}').name || 'Admin';
  const commonEmojis = ['😊', '👍', '❤️', '😂', '🙏', '👋', '🎉', '✅', '❌', '🔥'];

  useEffect(() => {
    // Initialize Socket.io connection
    const token = localStorage.getItem('token');
    const newSocket = io(SOCKET_URL, {
      auth: {
        token,
        role: 'admin'
      },
      withCredentials: true,
      transports: ['websocket', 'polling']
    });

    setSocket(newSocket);

    // Admin joins admin room
    newSocket.on('connect', () => {
      console.log('Admin connected to chat server');
      newSocket.emit('join-admin', {
        userId: JSON.parse(localStorage.getItem('user') || '{}')._id,
        adminName
      });
    });

    // Listen for active conversations
    newSocket.on('active-conversations', (data) => {
      fetchConversations(newSocket);
    });

    // Listen for new visitor
    newSocket.on('visitor-joined', (data) => {
      fetchConversations(newSocket);
    });

    // Listen for visitor disconnect
    newSocket.on('visitor-left', ({ conversationId }) => {
      setConversations(prev =>
        prev.map(conv =>
          conv.conversationId === conversationId
            ? { ...conv, isOnline: false }
            : conv
        )
      );
    });

    // Listen for new messages
    newSocket.on('new-visitor-message', ({ conversationId, message, unreadCount }) => {
      // Update conversation list
      setConversations(prev =>
        prev.map(conv =>
          conv.conversationId === conversationId
            ? { ...conv, lastMessage: message, unreadCount, updatedAt: new Date() }
            : conv
        ).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      );

      // Update messages if this conversation is active
      if (activeConversation?.conversationId === conversationId) {
        setMessages(prev => {
          // Check if message already exists to prevent duplicates
          const exists = prev.some(msg => msg._id === message._id || msg.tempId === message.tempId);
          if (exists) return prev;
          return [...prev, message];
        });
        scrollToBottom();
        
        // Mark as read
        newSocket.emit('mark-read', {
          conversationId,
          messageIds: [message._id]
        });
      }
    });

    newSocket.on('new-message', (message) => {
      // Only add message if it's from a visitor (not our own admin messages)
      if (activeConversation && 
          message.conversationId === activeConversation.conversationId &&
          message.senderType === 'visitor') {
        setMessages(prev => {
          // Check if message already exists
          const exists = prev.some(msg => msg._id === message._id);
          if (exists) return prev;
          return [...prev, message];
        });
        scrollToBottom();
      }
    });

    newSocket.on('message-delivered', ({ messageId, tempId }) => {
      setMessages(prev =>
        prev.map(msg =>
          msg.tempId === tempId ? { ...msg, _id: messageId, status: 'delivered' } : msg
        )
      );
    });

    newSocket.on('message-status-updated', ({ messageId, status }) => {
      setMessages(prev =>
        prev.map(msg =>
          msg._id === messageId ? { ...msg, status } : msg
        )
      );
    });

    newSocket.on('messages-read', ({ messageIds }) => {
      setMessages(prev =>
        prev.map(msg =>
          messageIds.includes(msg._id) ? { ...msg, status: 'read', isRead: true } : msg
        )
      );
    });

    // Listen for typing indicator
    newSocket.on('user-typing', ({ conversationId }) => {
      if (activeConversation?.conversationId === conversationId) {
        setIsTyping(true);
      }
    });

    newSocket.on('user-stop-typing', ({ conversationId }) => {
      if (activeConversation?.conversationId === conversationId) {
        setIsTyping(false);
      }
    });

    newSocket.on('unread-count-updated', ({ conversationId, unreadCount }) => {
      setConversations(prev =>
        prev.map(conv =>
          conv.conversationId === conversationId ? { ...conv, unreadCount } : conv
        )
      );
    });

    // Cleanup on unmount
    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchConversations = async (socketInstance) => {
    const sock = socketInstance || socket;
    if (!sock) return;

    sock.emit('get-active-conversations');
    
    sock.once('active-conversations', async ({ conversations: convList }) => {
      const enhancedConversations = await Promise.all(
        convList.map(async (conv) => {
          return {
            conversationId: conv.conversationId,
            lastMessage: conv.lastMessage,
            unreadCount: conv.unreadCount || 0,
            isOnline: true,
            updatedAt: conv.lastMessage?.createdAt || new Date()
          };
        })
      );

      setConversations(
        enhancedConversations.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      );
    });
  };

  const selectConversation = (conversation) => {
    setActiveConversation(conversation);
    setShowInfo(false);
    
    if (socket) {
      // Join conversation
      socket.emit('join', {
        conversationId: conversation.conversationId,
        user: {
          name: adminName,
          type: 'admin'
        }
      });

      // Get conversation messages
      socket.emit('get-conversation', {
        conversationId: conversation.conversationId,
        limit: 100
      });

      socket.once('conversation-messages', ({ messages: convMessages }) => {
        setMessages(convMessages);
        scrollToBottom();
        
        // Mark all as read
        const unreadIds = convMessages
          .filter(msg => msg.senderType === 'visitor' && !msg.isRead)
          .map(msg => msg._id);
        
        if (unreadIds.length > 0) {
          socket.emit('mark-read', {
            conversationId: conversation.conversationId,
            messageIds: unreadIds
          });
        }
      });

      // Update unread count to 0
      setConversations(prev =>
        prev.map(conv =>
          conv.conversationId === conversation.conversationId
            ? { ...conv, unreadCount: 0 }
            : conv
        )
      );
    }
  };

  const sendMessage = (e) => {
    e?.preventDefault();
    
    if (!messageInput.trim() || !activeConversation || !socket) return;

    const tempId = `temp-${Date.now()}`;
    const messageData = {
      tempId,
      conversationId: activeConversation.conversationId,
      senderName: adminName,
      senderType: 'admin',
      message: messageInput.trim(),
      status: 'sending',
      createdAt: new Date()
    };

    // Optimistically add message to UI
    setMessages(prev => [...prev, messageData]);
    
    socket.emit('send-message', messageData);
    setMessageInput('');
    setShowEmojiPicker(false);
    
    // Stop typing indicator
    socket.emit('stop-typing', {
      conversationId: activeConversation.conversationId,
      user: { name: adminName, type: 'admin' }
    });
    
    scrollToBottom();
  };

  const handleTyping = () => {
    if (!activeConversation || !socket) return;

    socket.emit('typing', {
      conversationId: activeConversation.conversationId,
      user: { name: adminName, type: 'admin' }
    });

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('stop-typing', {
        conversationId: activeConversation.conversationId,
        user: { name: adminName, type: 'admin' }
      });
    }, 2000);
  };

  const handleEmojiClick = (emoji) => {
    setMessageInput(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (diff < 86400000) {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getMessageStatusIcon = (msg) => {
    if (msg.senderType !== 'admin') return null;
    
    switch (msg.status) {
      case 'sending':
        return <Clock className="w-3 h-3 text-gray-400" />;
      case 'sent':
        return <Check className="w-3 h-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-blue-400" />;
      case 'failed':
        return <AlertCircle className="w-3 h-3 text-red-400" />;
      default:
        return null;
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.conversationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage?.message?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUnread = conversations.reduce((sum, conv) => sum + (conv.unreadCount || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Live Chat</h1>
          <p className="text-gray-600 mt-1">
            {conversations.length} active conversation{conversations.length !== 1 ? 's' : ''}
            {totalUnread > 0 && ` • ${totalUnread} unread message${totalUnread !== 1 ? 's' : ''}`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Conversations Sidebar */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-[calc(100vh-16rem)]">
          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="text-center py-12 px-4">
                <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-500">
                  {searchQuery ? 'No conversations found' : 'No active conversations'}
                </p>
              </div>
            ) : (
              filteredConversations.map((conv) => (
                <motion.button
                  key={conv.conversationId}
                  onClick={() => selectConversation(conv)}
                  className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    activeConversation?.conversationId === conv.conversationId
                      ? 'bg-blue-50 border-l-4 border-l-blue-600'
                      : ''
                  }`}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {conv.lastMessage?.senderName?.[0] || 'V'}
                      </div>
                      {conv.isOnline && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-gray-900 truncate">
                          {conv.lastMessage?.senderName || `Visitor ${conv.conversationId.substring(8, 14)}`}
                        </p>
                        <span className="text-xs text-gray-500">
                          {formatTime(conv.updatedAt)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 truncate">
                          {conv.lastMessage?.message || 'No messages yet'}
                        </p>
                        {conv.unreadCount > 0 && (
                          <span className="ml-2 flex-shrink-0 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {conv.unreadCount > 9 ? '9+' : conv.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`${showInfo ? 'lg:col-span-2' : 'lg:col-span-3'} bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-[calc(100vh-16rem)]`}>
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {activeConversation.lastMessage?.senderName?.[0] || 'V'}
                    </div>
                    {activeConversation.isOnline && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {activeConversation.lastMessage?.senderName || 'Visitor'}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {activeConversation.isOnline ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Phone className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Video className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => setShowInfo(!showInfo)}
                    className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${
                      showInfo ? 'bg-blue-100 text-blue-600' : ''
                    }`}
                  >
                    <Info className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                      <p>No messages yet. Start the conversation!</p>
                    </div>
                  </div>
                ) : (
                  messages.map((msg, index) => (
                    <motion.div
                      key={msg._id || msg.tempId || index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.senderType === 'admin' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                          msg.senderType === 'admin'
                            ? 'bg-blue-600 text-white rounded-br-sm'
                            : 'bg-white text-gray-900 shadow-sm rounded-bl-sm'
                        }`}
                      >
                        <p className="text-sm break-words">{msg.message}</p>
                        <div className={`flex items-center gap-1 mt-1 text-xs ${
                          msg.senderType === 'admin' ? 'text-blue-100 justify-end' : 'text-gray-500'
                        }`}>
                          <span>{formatTime(msg.createdAt)}</span>
                          {getMessageStatusIcon(msg)}
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white shadow-sm rounded-2xl rounded-bl-sm px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Emoji Picker */}
              <AnimatePresence>
                {showEmojiPicker && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="px-4 py-2 border-t border-gray-200"
                  >
                    <div className="flex flex-wrap gap-2">
                      {commonEmojis.map((emoji, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleEmojiClick(emoji)}
                          className="text-2xl hover:bg-gray-100 rounded p-1 transition-colors"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Message Input */}
              <form onSubmit={sendMessage} className="p-4 border-t border-gray-200">
                <div className="flex gap-2 items-end">
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="text-gray-500 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Smile className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-gray-500 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Paperclip className="w-5 h-5" />
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept="image/*,.pdf,.doc,.docx"
                    />
                  </div>
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => {
                      setMessageInput(e.target.value);
                      handleTyping();
                    }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={!messageInput.trim()}
                    className="bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium">Select a conversation to start chatting</p>
                <p className="text-sm mt-2">Choose from the list on the left</p>
              </div>
            </div>
          )}
        </div>

        {/* Info Sidebar */}
        <AnimatePresence>
          {showInfo && activeConversation && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-[calc(100vh-16rem)] overflow-y-auto"
            >
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3">
                  {activeConversation.lastMessage?.senderName?.[0] || 'V'}
                </div>
                <h3 className="font-semibold text-lg text-gray-900">
                  {activeConversation.lastMessage?.senderName || 'Visitor'}
                </h3>
                {activeConversation.lastMessage?.senderEmail && (
                  <p className="text-sm text-gray-600">
                    {activeConversation.lastMessage.senderEmail}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-gray-500">Name</p>
                    <p className="font-medium">
                      {activeConversation.lastMessage?.senderName || 'Unknown'}
                    </p>
                  </div>
                </div>

                {activeConversation.lastMessage?.senderEmail && (
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-gray-500">Email</p>
                      <p className="font-medium">
                        {activeConversation.lastMessage.senderEmail}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-gray-500">First Message</p>
                    <p className="font-medium">
                      {formatTime(activeConversation.lastMessage?.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <MessageCircle className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-gray-500">Conversation ID</p>
                    <p className="font-medium text-xs">
                      {activeConversation.conversationId}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="w-full py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium">
                  End Conversation
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
