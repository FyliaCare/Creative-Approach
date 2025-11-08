import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import io from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [visitors, setVisitors] = useState([]);
  const [activeVisitor, setActiveVisitor] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    // Initialize Socket.io connection
    const newSocket = io(SOCKET_URL, {
      auth: {
        token: localStorage.getItem('token'),
        role: 'admin'
      }
    });

    setSocket(newSocket);

    // Listen for active visitors
    newSocket.on('active_visitors', (data) => {
      setVisitors(data);
    });

    // Listen for new visitor
    newSocket.on('visitor_connected', (visitor) => {
      setVisitors(prev => [...prev, visitor]);
    });

    // Listen for visitor disconnect
    newSocket.on('visitor_disconnected', (visitorId) => {
      setVisitors(prev => prev.filter(v => v.id !== visitorId));
      if (activeVisitor?.id === visitorId) {
        setActiveVisitor(null);
        setMessages([]);
      }
    });

    // Listen for new messages
    newSocket.on('new_message', (message) => {
      if (activeVisitor && message.visitorId === activeVisitor.id) {
        setMessages(prev => [...prev, message]);
      }
    });

    // Listen for typing indicator
    newSocket.on('visitor_typing', (data) => {
      if (activeVisitor && data.visitorId === activeVisitor.id) {
        setIsTyping(data.isTyping);
      }
    });

    // Cleanup on unmount
    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const selectVisitor = (visitor) => {
    setActiveVisitor(visitor);
    // Fetch chat history for this visitor
    if (socket) {
      socket.emit('get_chat_history', { visitorId: visitor.id }, (history) => {
        setMessages(history);
      });
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeVisitor || !socket) return;

    const message = {
      visitorId: activeVisitor.id,
      text: messageInput.trim(),
      sender: 'admin',
      timestamp: new Date().toISOString(),
    };

    socket.emit('admin_message', message);
    setMessages(prev => [...prev, message]);
    setMessageInput('');
  };

  const handleTyping = () => {
    if (!activeVisitor || !socket) return;

    socket.emit('admin_typing', { visitorId: activeVisitor.id, isTyping: true });

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('admin_typing', { visitorId: activeVisitor.id, isTyping: false });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Live Chat</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Visitors Sidebar */}
        <div className="bg-white rounded-lg shadow p-4 md:col-span-1">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Active Visitors ({visitors.length})
          </h2>
          <div className="space-y-2">
            {visitors.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-8">No active visitors</p>
            ) : (
              visitors.map((visitor) => (
                <motion.button
                  key={visitor.id}
                  onClick={() => selectVisitor(visitor)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    activeVisitor?.id === visitor.id
                      ? 'bg-blue-100 border-2 border-blue-500'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-sm font-medium text-gray-900">
                      Visitor {visitor.id.substring(0, 8)}
                    </p>
                  </div>
                  {visitor.location && (
                    <p className="text-xs text-gray-500">{visitor.location}</p>
                  )}
                  {visitor.page && (
                    <p className="text-xs text-gray-400 truncate">{visitor.page}</p>
                  )}
                </motion.button>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="bg-white rounded-lg shadow md:col-span-3 flex flex-col h-[600px]">
          {activeVisitor ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b">
                <h3 className="text-lg font-bold text-gray-900">
                  Chat with Visitor {activeVisitor.id.substring(0, 8)}
                </h3>
                {activeVisitor.location && (
                  <p className="text-sm text-gray-500">{activeVisitor.location}</p>
                )}
                {activeVisitor.device && (
                  <p className="text-xs text-gray-400">
                    {activeVisitor.device} • {activeVisitor.browser}
                  </p>
                )}
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    No messages yet. Start the conversation!
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.sender === 'admin'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'admin' ? 'text-blue-200' : 'text-gray-500'
                        }`}>
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </motion.div>
                  ))
                )}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <form onSubmit={sendMessage} className="p-4 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => {
                      setMessageInput(e.target.value);
                      handleTyping();
                    }}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={!messageInput.trim()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Send
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a visitor to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
