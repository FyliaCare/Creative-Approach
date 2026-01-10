import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  DollarSign,
  Clock,
  FileText,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Download,
  Eye,
  User
} from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { jsPDF } from 'jspdf';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const QuotationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quotation, setQuotation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    fetchQuotation();
  }, [id]);

  const fetchQuotation = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/api/quotations/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setQuotation(response.data.data);
      } else if (response.data) {
        // Handle case where API returns quotation directly
        setQuotation(response.data);
      }
    } catch (error) {
      console.error('Error fetching quotation:', error);
      toast.error('Failed to load quotation details');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (newStatus) => {
    // Handle rejection - require reason
    if (newStatus === 'rejected') {
      setShowRejectModal(true);
      return;
    }

    // Handle acceptance - send acceptance email
    if (newStatus === 'accepted') {
      if (!confirm('This will send an acceptance email to the client. Continue?')) {
        return;
      }
    }

    try {
      setUpdating(true);
      const token = localStorage.getItem('adminToken');
      const response = await axios.patch(
        `${API_URL}/api/quotations/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.success || response.data) {
        toast.success(`Status updated to ${newStatus}`);
        fetchQuotation();
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      toast.error('Please provide a reason for rejection');
      return;
    }

    try {
      setUpdating(true);
      const token = localStorage.getItem('adminToken');
      const response = await axios.patch(
        `${API_URL}/api/quotations/${id}/status`,
        { 
          status: 'rejected',
          rejectionReason: rejectionReason.trim()
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.success || response.data) {
        toast.success('Quotation rejected and client notified');
        setShowRejectModal(false);
        setRejectionReason('');
        fetchQuotation();
      }
    } catch (error) {
      console.error('Error rejecting quotation:', error);
      toast.error('Failed to reject quotation');
    } finally {
      setUpdating(false);
    }
  };

  const deleteQuotation = async () => {
    if (!confirm('Are you sure you want to delete this quotation? This action cannot be undone.')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${API_URL}/api/quotations/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success('Quotation deleted successfully');
      navigate('/quotations');
    } catch (error) {
      console.error('Error deleting quotation:', error);
      toast.error('Failed to delete quotation');
    }
  };

  const generatePDF = () => {
    if (!quotation) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    
    // Header
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('CA Ghana', 14, 20);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Professional Drone Services', 14, 27);
    doc.text('Contact: +233 541 500 716', 14, 33);
    doc.text('Email: visuals@caghana.com', 14, 39);
    
    // Quote Title
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('QUOTATION REQUEST', pageWidth - 70, 20);
    
    // Quote Info
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Date: ${new Date(quotation.createdAt).toLocaleDateString()}`, pageWidth - 70, 27);
    doc.text(`Status: ${quotation.status.toUpperCase()}`, pageWidth - 70, 33);
    
    // Client Information
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('CLIENT INFORMATION', 14, 55);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    let y = 63;
    doc.text(`Name: ${quotation.name}`, 14, y);
    y += 6;
    doc.text(`Email: ${quotation.email}`, 14, y);
    y += 6;
    doc.text(`Phone: ${quotation.phone}`, 14, y);
    y += 6;
    if (quotation.company) {
      doc.text(`Company: ${quotation.company}`, 14, y);
      y += 6;
    }
    if (quotation.location) {
      doc.text(`Location: ${quotation.location}`, 14, y);
      y += 6;
    }
    
    // Project Details
    y += 8;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('PROJECT DETAILS', 14, y);
    
    y += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Service: ${quotation.service}`, 14, y);
    y += 6;
    if (quotation.projectType) {
      doc.text(`Project Type: ${quotation.projectType}`, 14, y);
      y += 6;
    }
    if (quotation.budget) {
      doc.text(`Budget: ${quotation.budget}`, 14, y);
      y += 6;
    }
    if (quotation.timeline) {
      doc.text(`Timeline: ${quotation.timeline}`, 14, y);
      y += 6;
    }
    
    // Message
    if (quotation.message) {
      y += 8;
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('MESSAGE', 14, y);
      
      y += 8;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const splitMessage = doc.splitTextToSize(quotation.message, pageWidth - 28);
      doc.text(splitMessage, 14, y);
    }
    
    // Footer
    const footerY = doc.internal.pageSize.height - 20;
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text('CA Ghana - Professional Drone Services', pageWidth / 2, footerY, { align: 'center' });
    doc.text('Takoradi, Ghana | visuals@caghana.com', pageWidth / 2, footerY + 5, { align: 'center' });
    
    return doc;
  };

  const downloadPDF = () => {
    const doc = generatePDF();
    if (doc) {
      doc.save(`Quotation_${quotation.name}_${new Date().toISOString().split('T')[0]}.pdf`);
      toast.success('PDF downloaded successfully');
    }
  };

  const previewPDF = () => {
    const doc = generatePDF();
    if (doc) {
      window.open(doc.output('bloburl'), '_blank');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      reviewed: 'bg-yellow-100 text-yellow-800',
      quoted: 'bg-purple-100 text-purple-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      completed: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || colors.new;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800'
    };
    return colors[priority] || colors.medium;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading quotation...</p>
        </div>
      </div>
    );
  }

  if (!quotation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Quotation Not Found</h2>
          <p className="text-gray-600 mb-4">The quotation you're looking for doesn't exist.</p>
          <Link
            to="/quotations"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Quotations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <Link
          to="/quotations"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Quotations
        </Link>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Quotation Details</h1>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(quotation.status)}`}>
                {quotation.status}
              </span>
              <span className={`px-3 py-1 text-sm rounded-full ${getPriorityColor(quotation.priority)}`}>
                {quotation.priority} priority
              </span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={previewPDF}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Eye className="w-4 h-4" />
              Preview PDF
            </button>
            <button
              onClick={downloadPDF}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <button
              onClick={deleteQuotation}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Client Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium text-gray-900">{quotation.name}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <a href={`mailto:${quotation.email}`} className="font-medium text-blue-600 hover:underline">
                    {quotation.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <a href={`tel:${quotation.phone}`} className="font-medium text-blue-600 hover:underline">
                    {quotation.phone}
                  </a>
                </div>
              </div>
              
              {quotation.company && (
                <div className="flex items-start gap-3">
                  <Building className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Company</p>
                    <p className="font-medium text-gray-900">{quotation.company}</p>
                  </div>
                </div>
              )}
              
              {quotation.location && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-medium text-gray-900">{quotation.location}</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Submitted</p>
                  <p className="font-medium text-gray-900">
                    {new Date(quotation.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Project Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Project Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-600">Service Type</p>
                <p className="font-medium text-gray-900">{quotation.service}</p>
              </div>
              
              {quotation.projectType && (
                <div>
                  <p className="text-sm text-gray-600">Project Type</p>
                  <p className="font-medium text-gray-900">{quotation.projectType}</p>
                </div>
              )}
              
              {quotation.budget && (
                <div>
                  <p className="text-sm text-gray-600">Budget</p>
                  <p className="font-medium text-gray-900">{quotation.budget}</p>
                </div>
              )}
              
              {quotation.timeline && (
                <div>
                  <p className="text-sm text-gray-600">Timeline</p>
                  <p className="font-medium text-gray-900">{quotation.timeline}</p>
                </div>
              )}
            </div>
            
            {quotation.message && (
              <div>
                <p className="text-sm text-gray-600 mb-2">Project Description</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-900 whitespace-pre-wrap">{quotation.message}</p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Quoted Amount (if any) */}
          {quotation.quotedAmount && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-green-50 border border-green-200 rounded-lg p-6"
            >
              <h2 className="text-xl font-bold text-green-900 mb-2 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Quoted Amount
              </h2>
              <p className="text-3xl font-bold text-green-600">
                GHS {quotation.quotedAmount.toLocaleString()}
              </p>
              {quotation.quotedNotes && (
                <p className="mt-2 text-sm text-green-700">{quotation.quotedNotes}</p>
              )}
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Management */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h3 className="font-semibold text-gray-900 mb-4">Update Status</h3>
            <div className="space-y-2">
              {['quoted', 'accepted', 'rejected'].map((status) => (
                <button
                  key={status}
                  onClick={() => updateStatus(status)}
                  disabled={updating || quotation.status === status}
                  className={`w-full px-4 py-2 text-left rounded-lg transition-colors ${
                    quotation.status === status
                      ? 'bg-blue-600 text-white cursor-default'
                      : status === 'accepted'
                      ? 'bg-green-100 text-green-700 hover:bg-green-200 disabled:opacity-50'
                      : status === 'rejected'
                      ? 'bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-50'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50'
                  }`}
                >
                  {status === 'quoted' && '💰'} 
                  {status === 'accepted' && '✅'} 
                  {status === 'rejected' && '❌'}
                  {' '}
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <a
                href={`mailto:${quotation.email}`}
                className="flex items-center gap-2 w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Send Email
              </a>
              <a
                href={`tel:${quotation.phone}`}
                className="flex items-center gap-2 w-full px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Client
              </a>
              <button
                onClick={downloadPDF}
                className="flex items-center gap-2 w-full px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </motion.div>

          {/* Timeline */}
          {quotation.statusHistory && quotation.statusHistory.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <h3 className="font-semibold text-gray-900 mb-4">Status History</h3>
              <div className="space-y-3">
                {quotation.statusHistory.map((history, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <Clock className="w-4 h-4 text-gray-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{history.status}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(history.changedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

      {/* Rejection Modal */}
      <AnimatePresence>
        {showRejectModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowRejectModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Reject Quotation</h3>
                <p className="text-gray-600 mb-4">
                  Please provide a reason for rejecting this quotation. This will be sent to the client.
                </p>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Enter rejection reason..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  rows={4}
                  autoFocus
                />
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => {
                      setShowRejectModal(false);
                      setRejectionReason('');
                    }}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    disabled={updating}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReject}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                    disabled={updating || !rejectionReason.trim()}
                  >
                    {updating ? 'Rejecting...' : 'Reject & Notify Client'}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
};
