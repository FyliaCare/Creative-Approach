import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/quotations`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setQuotes(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching quotes:', error);
      setLoading(false);
    }
  };

  const updateQuoteStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `${API_URL}/api/quotations/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchQuotes();
      setShowModal(false);
    } catch (error) {
      console.error('Error updating quote:', error);
    }
  };

  const deleteQuote = async (id) => {
    if (!confirm('Are you sure you want to delete this quote request?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/api/quotations/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchQuotes();
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting quote:', error);
    }
  };

  const filteredQuotes = quotes.filter(quote => {
    const matchesFilter = filter === 'all' || quote.status === filter;
    const matchesSearch = 
      quote.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.company?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: quotes.length,
    pending: quotes.filter(q => q.status === 'pending').length,
    reviewed: quotes.filter(q => q.status === 'reviewed').length,
    quoted: quotes.filter(q => q.status === 'quoted').length,
    accepted: quotes.filter(q => q.status === 'accepted').length,
    rejected: quotes.filter(q => q.status === 'rejected').length,
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    reviewed: 'bg-blue-100 text-blue-800',
    quoted: 'bg-purple-100 text-purple-800',
    accepted: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Quote Requests</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {Object.entries(stats).map(([key, value]) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow p-4"
          >
            <p className="text-sm text-gray-600 capitalize">{key}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name, email, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'pending', 'reviewed', 'quoted', 'accepted', 'rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quotes Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredQuotes.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    No quote requests found
                  </td>
                </tr>
              ) : (
                filteredQuotes.map((quote) => (
                  <tr key={quote._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(quote.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{quote.name}</div>
                      <div className="text-sm text-gray-500">{quote.email}</div>
                      {quote.company && <div className="text-xs text-gray-400">{quote.company}</div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {quote.serviceType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {quote.projectType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${quote.budget}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[quote.status]}`}>
                        {quote.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => {
                          setSelectedQuote(quote);
                          setShowModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quote Detail Modal */}
      {showModal && selectedQuote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Quote Request Details</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Client Information</h3>
                  <div className="mt-2 space-y-1">
                    <p className="text-gray-900"><span className="font-medium">Name:</span> {selectedQuote.name}</p>
                    <p className="text-gray-900"><span className="font-medium">Email:</span> {selectedQuote.email}</p>
                    <p className="text-gray-900"><span className="font-medium">Phone:</span> {selectedQuote.phone}</p>
                    {selectedQuote.company && (
                      <p className="text-gray-900"><span className="font-medium">Company:</span> {selectedQuote.company}</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Project Details</h3>
                  <div className="mt-2 space-y-1">
                    <p className="text-gray-900"><span className="font-medium">Service Type:</span> {selectedQuote.serviceType}</p>
                    <p className="text-gray-900"><span className="font-medium">Project Type:</span> {selectedQuote.projectType}</p>
                    <p className="text-gray-900"><span className="font-medium">Budget:</span> ${selectedQuote.budget}</p>
                    <p className="text-gray-900"><span className="font-medium">Timeline:</span> {selectedQuote.timeline}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Project Description</h3>
                  <p className="mt-2 text-gray-900 whitespace-pre-wrap">{selectedQuote.projectDescription}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Update Status</h3>
                  <div className="flex gap-2 flex-wrap">
                    {['pending', 'reviewed', 'quoted', 'accepted', 'rejected'].map((status) => (
                      <button
                        key={status}
                        onClick={() => updateQuoteStatus(selectedQuote._id, status)}
                        className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                          selectedQuote.status === status
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <button
                    onClick={() => deleteQuote(selectedQuote._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Delete Request
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
