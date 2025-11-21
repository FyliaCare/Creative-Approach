import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader, CheckCircle } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function QuoteBot({ isOpen, onClose }) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    location: '',
    service: '',
    projectDetails: '',
    budget: '',
    timeline: '',
    additionalInfo: '',
  });
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "👋 Hi! I'm CA Ghana's Quote Assistant. I'll help you get a custom quote for our drone services. Let's start!",
    },
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && step === 0) {
      setTimeout(() => askQuestion(0), 1000);
    }
  }, [isOpen]);

  const questions = [
    {
      field: 'name',
      question: "What's your name?",
      placeholder: 'Enter your full name',
      type: 'text',
    },
    {
      field: 'email',
      question: 'Great! What is your email address?',
      placeholder: 'your@email.com',
      type: 'email',
    },
    {
      field: 'phone',
      question: 'Your phone number? (Optional)',
      placeholder: '+233 XXX XXX XXX',
      type: 'tel',
      optional: true,
    },
    {
      field: 'company',
      question: 'Do you represent a company? (Optional)',
      placeholder: 'Company name',
      type: 'text',
      optional: true,
    },
    {
      field: 'location',
      question: 'Where is your project located?',
      placeholder: 'City, Region',
      type: 'text',
    },
    {
      field: 'service',
      question: 'Which service are you interested in?',
      type: 'select',
      options: [
        'Aerial Photography & Videography',
        'Drone Inspection & Monitoring',
        'Mapping, Surveying & 3D Modelling',
        'Documentary Films & Photography',
        'Custom Data Services & Training',
        'Emergency Response & Surveillance',
      ],
    },
    {
      field: 'projectDetails',
      question: 'Tell me about your project. What do you need?',
      placeholder: 'Describe your project in detail...',
      type: 'textarea',
    },
    {
      field: 'budget',
      question: 'Do you have a budget range in mind? (Optional)',
      placeholder: 'e.g., GH₵ 5,000 - 10,000',
      type: 'text',
      optional: true,
    },
    {
      field: 'timeline',
      question: 'When do you need this completed? (Optional)',
      placeholder: 'e.g., Within 2 weeks, Flexible',
      type: 'text',
      optional: true,
    },
    {
      field: 'additionalInfo',
      question: 'Anything else you would like us to know? (Optional)',
      placeholder: 'Additional details...',
      type: 'textarea',
      optional: true,
    },
  ];

  const askQuestion = (stepIndex) => {
    if (stepIndex < questions.length) {
      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          text: questions[stepIndex].question,
        },
      ]);
      setStep(stepIndex);
    }
  };

  const handleAnswer = async (value) => {
    const currentQuestion = questions[step];
    
    // Skip optional questions if no value provided
    if (!value && currentQuestion.optional) {
      handleNext();
      return;
    }

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        type: 'user',
        text: value || '(Skipped)',
      },
    ]);

    // Update form data
    setFormData((prev) => ({
      ...prev,
      [currentQuestion.field]: value,
    }));

    // Move to next question or submit
    if (step < questions.length - 1) {
      setTimeout(() => askQuestion(step + 1), 500);
    } else {
      // Submit the quote
      await submitQuote({ ...formData, [currentQuestion.field]: value });
    }
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setTimeout(() => askQuestion(step + 1), 300);
    } else {
      submitQuote(formData);
    }
  };

  const submitQuote = async (data) => {
    setLoading(true);
    setMessages((prev) => [
      ...prev,
      {
        type: 'bot',
        text: '⏳ Processing your quote request...',
      },
    ]);

    try {
      const response = await axios.post(`${API_URL}/api/quote-bot`, data);

      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          text: `✅ Perfect! Your quote request has been submitted successfully! 

📧 Check your email (${data.email}) for a confirmation message.

⚡ Our team will review your requirements and send you a custom quote within 2 hours!

📞 Need immediate assistance? Call us at +233 541 500 716`,
        },
      ]);
      setSubmitted(true);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          text: `❌ Oops! Something went wrong. Please try again or contact us directly at visuals@caghana.com or call +233 541 500 716.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (option) => {
    handleAnswer(option);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    const input = e.target.elements.answer;
    if (input.value.trim()) {
      handleAnswer(input.value.trim());
      input.value = '';
    } else if (questions[step].optional) {
      handleNext();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Get Custom Quote 🚁</h2>
              <p className="text-sm text-gray-600 mt-1">Quick & Easy - 2 Minute Response Time</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-drone-600 to-sky-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="whitespace-pre-line">{message.text}</p>
                </div>
              </motion.div>
            ))}

            {/* Options for select type questions */}
            {!submitted && !loading && step < questions.length && questions[step].type === 'select' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                {questions[step].options.map((option) => (
                  <motion.button
                    key={option}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectOption(option)}
                    className="p-4 bg-white border-2 border-gray-200 hover:border-drone-600 hover:bg-drone-50 rounded-xl text-left transition-all"
                  >
                    <span className="font-medium text-gray-900">{option}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          {!submitted && !loading && step < questions.length && questions[step].type !== 'select' && (
            <form onSubmit={handleInputSubmit} className="p-6 border-t border-gray-200">
              {questions[step].type === 'textarea' ? (
                <div className="flex gap-2">
                  <textarea
                    ref={inputRef}
                    name="answer"
                    rows="3"
                    placeholder={questions[step].placeholder}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-drone-600 focus:border-transparent resize-none"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-drone-600 to-sky-600 text-white rounded-xl hover:from-drone-700 hover:to-sky-700 transition-all flex items-center gap-2 self-end"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type={questions[step].type}
                    name="answer"
                    placeholder={questions[step].placeholder}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-drone-600 focus:border-transparent"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-drone-600 to-sky-600 text-white rounded-xl hover:from-drone-700 hover:to-sky-700 transition-all flex items-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              )}
              {questions[step].optional && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="mt-2 text-sm text-gray-500 hover:text-gray-700"
                >
                  Skip this question →
                </button>
              )}
            </form>
          )}

          {/* Loading state */}
          {loading && (
            <div className="p-6 border-t border-gray-200 flex items-center justify-center">
              <Loader className="w-6 h-6 text-drone-600 animate-spin" />
              <span className="ml-2 text-gray-600">Submitting your request...</span>
            </div>
          )}

          {/* Success state */}
          {submitted && (
            <div className="p-6 border-t border-gray-200 flex flex-col items-center">
              <CheckCircle className="w-12 h-12 text-green-500 mb-3" />
              <button
                onClick={onClose}
                className="px-8 py-3 bg-gradient-to-r from-drone-600 to-sky-600 text-white rounded-xl hover:from-drone-700 hover:to-sky-700 transition-all font-semibold"
              >
                Close
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
