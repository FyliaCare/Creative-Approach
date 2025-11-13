import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import io from 'socket.io-client';
import { 
  Send, X, Paperclip, Smile, Check, CheckCheck, 
  Clock, AlertCircle, MessageCircle, Minimize2 
} from 'lucide-react';

// Construct socket URL properly
const getSocketURL = () => {
  const apiUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
  // Remove /api if it exists, and any trailing slashes
  return apiUrl.replace(/\/api\/?$/, '').replace(/\/$/, '');
};

const SOCKET_URL = getSocketURL();

console.log('🔌 Socket connecting to:', SOCKET_URL);

const AdvancedLiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [hasJoined, setHasJoined] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [adminOnline, setAdminOnline] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const conversationIdRef = useRef(`visitor-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const typingTimeoutRef = useRef(null);
  const fileInputRef = useRef(null);

  // Common emojis for quick access
  const commonEmojis = ['😊', '👍', '❤️', '😂', '🙏', '👋', '🎉', '✅', '❌', '🔥'];

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(SOCKET_URL, {
      withCredentials: true,
      transports: ['websocket', 'polling']
    });

    socketRef.current.on('connect', () => {
      console.log('Connected to chat server');
      setIsConnected(true);
    });

    socketRef.current.on('disconnect', () => {
      console.log('Disconnected from chat server');
      setIsConnected(false);
      setAdminOnline(false);
    });

    socketRef.current.on('conversation-history', (history) => {
      setMessages(history);
      scrollToBottom();
    });

    socketRef.current.on('new-message', (message) => {
      // Don't add our own messages again (they're already added optimistically)
      // Only add messages from others (admin)
      if (message.senderType === 'admin') {
        setMessages((prev) => {
          // Check if message already exists
          const exists = prev.some(msg => msg._id === message._id);
          if (exists) return prev;
          return [...prev, message];
        });
        
        // If chat is closed and message is from admin, increment unread count
        if (!isOpen) {
          setUnreadCount((prev) => prev + 1);
          
          // Show browser notification
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('New message from Creative Approach', {
              body: message.message,
              icon: '/logo.png'
            });
          }
        }
        
        // Mark as read if chat is open and message is from admin
        if (isOpen && !isMinimized) {
          markMessagesAsRead([message._id]);
        }
        
        scrollToBottom();
      }
    });

    socketRef.current.on('message-delivered', ({ messageId, tempId }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.tempId === tempId ? { ...msg, _id: messageId, status: 'delivered' } : msg
        )
      );
    });

    socketRef.current.on('message-status-updated', ({ messageId, status }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === messageId ? { ...msg, status } : msg
        )
      );
    });

    socketRef.current.on('messages-read', ({ messageIds }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          messageIds.includes(msg._id) ? { ...msg, status: 'read', isRead: true } : msg
        )
      );
    });

    socketRef.current.on('user-typing', () => {
      setIsTyping(true);
    });

    socketRef.current.on('user-stop-typing', () => {
      setIsTyping(false);
    });

    socketRef.current.on('admin-online', () => {
      setAdminOnline(true);
    });

    socketRef.current.on('admin-offline', () => {
      setAdminOnline(false);
    });

    socketRef.current.on('error', (error) => {
      console.error('Chat error:', error);
    });

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setUnreadCount(0);
      scrollToBottom();
      
      // Mark unread admin messages as read
      const unreadAdminMessages = messages
        .filter(msg => msg.senderType === 'admin' && !msg.isRead)
        .map(msg => msg._id);
      
      if (unreadAdminMessages.length > 0) {
        markMessagesAsRead(unreadAdminMessages);
      }
    }
  }, [isOpen, isMinimized]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const markMessagesAsRead = (messageIds) => {
    if (socketRef.current && messageIds.length > 0) {
      socketRef.current.emit('mark-read', {
        conversationId: conversationIdRef.current,
        messageIds
      });
    }
  };

  const joinChat = (e) => {
    e.preventDefault();
    
    if (!userName.trim()) {
      alert('Please enter your name');
      return;
    }

    socketRef.current.emit('join', {
      conversationId: conversationIdRef.current,
      user: {
        name: userName,
        email: userEmail || null,
        type: 'visitor'
      }
    });

    setHasJoined(true);
  };

  const sendMessage = (e) => {
    e?.preventDefault();
    
    if (!inputMessage.trim()) return;

    const tempId = `temp-${Date.now()}`;
    const messageData = {
      tempId,
      conversationId: conversationIdRef.current,
      senderName: userName,
      senderEmail: userEmail || null,
      senderType: 'visitor',
      message: inputMessage.trim(),
      status: 'sending',
      createdAt: new Date()
    };

    // Optimistically add message to UI
    setMessages(prev => [...prev, messageData]);
    
    socketRef.current.emit('send-message', messageData);
    setInputMessage('');
    setShowEmojiPicker(false);
    
    // Stop typing indicator
    socketRef.current.emit('stop-typing', {
      conversationId: conversationIdRef.current,
      user: { name: userName, type: 'visitor' }
    });
    
    scrollToBottom();
  };

  const handleTyping = () => {
    socketRef.current.emit('typing', {
      conversationId: conversationIdRef.current,
      user: { name: userName, type: 'visitor' }
    });

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set timeout to stop typing after 2 seconds
    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current.emit('stop-typing', {
        conversationId: conversationIdRef.current,
        user: { name: userName, type: 'visitor' }
      });
    }, 2000);
  };

  const handleEmojiClick = (emoji) => {
    setInputMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMessageStatusIcon = (msg) => {
    if (msg.senderType !== 'visitor') return null;
    
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

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full p-4 shadow-2xl hover:shadow-blue-500/50 transition-all"
          >
            <MessageCircle className="w-8 h-8" />
            
            {/* Unread Badge */}
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </motion.span>
            )}
            
            {/* Online Indicator */}
            {isConnected && adminOnline && (
              <span className="absolute -top-1 -left-1 bg-green-400 rounded-full w-4 h-4 border-2 border-white animate-pulse" />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-full max-w-md"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px]">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold">CA</span>
                    </div>
                    {isConnected && adminOnline && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">Creative Approach</h3>
                    <p className="text-xs text-blue-100">
                      {!isConnected ? 'Connecting...' : adminOnline ? 'Online' : 'Typically replies instantly'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Minimized State */}
              {isMinimized && (
                <div className="p-4 bg-gray-50 text-center text-gray-600">
                  Chat minimized. Click above to expand.
                </div>
              )}

              {/* Messages or Join Form */}
              {!isMinimized && !hasJoined && (
                <div className="flex-1 flex items-center justify-center p-6">
                  <form onSubmit={joinChat} className="w-full space-y-4">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageCircle className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Start a conversation
                      </h3>
                      <p className="text-sm text-gray-600">
                        We're here to help! Let us know how we can assist you.
                      </p>
                    </div>
                    
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Your Name *"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="Email (optional)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    
                    <button
                      type="submit"
                      disabled={!isConnected}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isConnected ? 'Start Chat' : 'Connecting...'}
                    </button>
                  </form>
                </div>
              )}

              {!isMinimized && hasJoined && (
                <>
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                    {messages.length === 0 && (
                      <div className="text-center text-gray-500 py-8">
                        <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                        <p>No messages yet. Say hi!</p>
                      </div>
                    )}
                    
                    {messages.map((msg, idx) => (
                      <motion.div
                        key={msg._id || msg.tempId || idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.senderType === 'visitor' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                            msg.senderType === 'visitor'
                              ? 'bg-blue-600 text-white rounded-br-sm'
                              : 'bg-white text-gray-800 shadow-sm rounded-bl-sm'
                          }`}
                        >
                          <p className="text-sm break-words">{msg.message}</p>
                          <div className={`flex items-center gap-1 mt-1 text-xs ${
                            msg.senderType === 'visitor' ? 'text-blue-100 justify-end' : 'text-gray-500'
                          }`}>
                            <span>{formatTime(msg.createdAt)}</span>
                            {getMessageStatusIcon(msg)}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <div className="bg-white text-gray-800 shadow-sm rounded-2xl rounded-bl-sm px-4 py-3">
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
                        className="px-4 py-2 bg-white border-t border-gray-200"
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

                  {/* Input */}
                  <form onSubmit={sendMessage} className="p-4 bg-white border-t border-gray-200">
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
                        value={inputMessage}
                        onChange={(e) => {
                          setInputMessage(e.target.value);
                          handleTyping();
                        }}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                          }
                        }}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={!isConnected}
                      />
                      <button
                        type="submit"
                        disabled={!isConnected || !inputMessage.trim()}
                        className="bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdvancedLiveChat;
