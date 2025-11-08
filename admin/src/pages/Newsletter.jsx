import { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Filter,
  Download,
  Trash2,
  Mail,
  Globe,
  TrendingUp,
  Calendar,
  X,
  Send,
  Eye,
} from 'lucide-react';
import { newsletterAPI } from '../services/api';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const Newsletter = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedSubscribers, setSelectedSubscribers] = useState([]);
  
  // Email modal state
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [recipientType, setRecipientType] = useState('active');
  const [sending, setSending] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    fetchData();
  }, [statusFilter]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const params = statusFilter !== 'all' ? { status: statusFilter } : {};
      
      const [subscribersRes, statsRes] = await Promise.all([
        newsletterAPI.getSubscribers(params),
        newsletterAPI.getStats(),
      ]);

      setSubscribers(subscribersRes.data.data || []);
      setStats(statsRes.data.data || {});
    } catch (error) {
      console.error('Error fetching newsletter data:', error);
      toast.error('Failed to load subscribers');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this subscriber?')) return;

    try {
      await newsletterAPI.deleteSubscriber(id);
      toast.success('Subscriber deleted successfully');
      fetchData();
    } catch (error) {
      console.error('Error deleting subscriber:', error);
      toast.error('Failed to delete subscriber');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedSubscribers.length === 0) {
      toast.error('No subscribers selected');
      return;
    }

    if (!confirm(`Delete ${selectedSubscribers.length} subscribers?`)) return;

    try {
      await Promise.all(
        selectedSubscribers.map((id) => newsletterAPI.deleteSubscriber(id))
      );
      toast.success(`${selectedSubscribers.length} subscribers deleted`);
      setSelectedSubscribers([]);
      fetchData();
    } catch (error) {
      console.error('Error bulk deleting:', error);
      toast.error('Failed to delete subscribers');
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedSubscribers(filteredSubscribers.map((s) => s._id));
    } else {
      setSelectedSubscribers([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedSubscribers((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const exportToCSV = () => {
    const headers = ['Email', 'Name', 'Status', 'Country', 'Subscribed Date'];
    const rows = filteredSubscribers.map((sub) => [
      sub.email,
      sub.name || '',
      sub.status,
      sub.country || '',
      format(new Date(sub.subscribedAt), 'yyyy-MM-dd HH:mm'),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `subscribers-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    toast.success('Subscribers exported successfully');
  };

  const handleSendBulkEmail = async () => {
    if (!emailSubject.trim()) {
      toast.error('Please enter email subject');
      return;
    }
    
    if (!emailBody.trim() || emailBody === '<p><br></p>') {
      toast.error('Please enter email body');
      return;
    }
    
    if (recipientType === 'selected' && selectedSubscribers.length === 0) {
      toast.error('Please select at least one subscriber');
      return;
    }
    
    if (!confirm(`Send email to ${getRecipientCount()} subscribers?`)) {
      return;
    }
    
    try {
      setSending(true);
      
      const payload = {
        subject: emailSubject,
        body: emailBody,
        recipients: recipientType,
        selectedEmails: recipientType === 'selected' 
          ? subscribers.filter(s => selectedSubscribers.includes(s._id)).map(s => s.email)
          : []
      };
      
      const response = await newsletterAPI.sendBulkEmail(payload);
      
      toast.success(
        `Email sent successfully! Sent to ${response.data.data.sent} subscribers`,
        { duration: 5000 }
      );
      
      // Reset form
      setShowEmailModal(false);
      setEmailSubject('');
      setEmailBody('');
      setRecipientType('active');
      setSelectedSubscribers([]);
      
    } catch (error) {
      console.error('Error sending bulk email:', error);
      toast.error(error.response?.data?.message || 'Failed to send email');
    } finally {
      setSending(false);
    }
  };
  
  const getRecipientCount = () => {
    if (recipientType === 'all') {
      return subscribers.length;
    } else if (recipientType === 'active') {
      return subscribers.filter(s => s.status === 'active').length;
    } else if (recipientType === 'selected') {
      return selectedSubscribers.length;
    }
    return 0;
  };
  
  const getPreviewBody = () => {
    return emailBody
      .replace(/\{name\}/g, 'John Doe')
      .replace(/\{email\}/g, 'subscriber@example.com');
  };

  // Filter subscribers
  const filteredSubscribers = subscribers.filter((sub) => {
    const matchesSearch =
      sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (sub.name && sub.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCountry =
      selectedCountry === 'all' || sub.country === selectedCountry;

    return matchesSearch && matchesCountry;
  });

  // Get unique countries
  const countries = [...new Set(subscribers.map((s) => s.country).filter(Boolean))];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Subscribers
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats?.totalSubscribers || 0}
              </p>
              <p className="text-sm text-green-600 mt-2">
                +{stats?.recentSubscriptions || 0} this month
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {subscribers.filter((s) => s.status === 'active').length}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {subscribers.length > 0
                  ? Math.round(
                      (subscribers.filter((s) => s.status === 'active')
                        .length /
                        subscribers.length) *
                        100
                    )
                  : 0}
                % active rate
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Countries</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {countries.length}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {stats?.byCountry?.[0]?._id || 'N/A'} (Top)
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Globe className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by email or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            {/* Status filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="unsubscribed">Unsubscribed</option>
            </select>

            {/* Country filter */}
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Countries</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            {/* Export button */}
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export
            </button>

            {/* Send Email button */}
            <button
              onClick={() => setShowEmailModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              Send Email
            </button>

            {/* Bulk delete */}
            {selectedSubscribers.length > 0 && (
              <button
                onClick={handleBulkDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Delete ({selectedSubscribers.length})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Subscribers table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedSubscribers.length === filteredSubscribers.length &&
                      filteredSubscribers.length > 0
                    }
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subscriber
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Country
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subscribed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubscribers.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No subscribers found
                  </td>
                </tr>
              ) : (
                filteredSubscribers.map((subscriber) => (
                  <tr key={subscriber._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedSubscribers.includes(subscriber._id)}
                        onChange={() => handleSelectOne(subscriber._id)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {subscriber.email}
                        </p>
                        {subscriber.name && (
                          <p className="text-sm text-gray-500">
                            {subscriber.name}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          subscriber.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {subscriber.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {subscriber.country || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {format(
                        new Date(subscriber.subscribedAt),
                        'MMM dd, yyyy'
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(subscriber._id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete subscriber"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-600 text-center">
        Showing {filteredSubscribers.length} of {subscribers.length} subscribers
      </div>

      {/* Email Composition Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Mail className="h-6 w-6 text-blue-600" />
                Compose Email Campaign
              </h2>
              <button
                onClick={() => setShowEmailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Recipients Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Send To
                </label>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="recipients"
                      value="active"
                      checked={recipientType === 'active'}
                      onChange={(e) => setRecipientType(e.target.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">
                      All Active Subscribers ({subscribers.filter(s => s.status === 'active').length})
                    </span>
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="recipients"
                      value="selected"
                      checked={recipientType === 'selected'}
                      onChange={(e) => setRecipientType(e.target.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">
                      Selected Subscribers Only ({selectedSubscribers.length})
                    </span>
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="recipients"
                      value="all"
                      checked={recipientType === 'all'}
                      onChange={(e) => setRecipientType(e.target.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">
                      All Subscribers ({subscribers.length})
                    </span>
                  </label>
                </div>
                
                {recipientType === 'selected' && selectedSubscribers.length === 0 && (
                  <p className="mt-2 text-sm text-red-600">
                    Please select subscribers from the table below before sending
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Enter email subject..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Email Body */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Body *
                </label>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <ReactQuill
                    theme="snow"
                    value={emailBody}
                    onChange={setEmailBody}
                    placeholder="Write your email content here..."
                    style={{ height: '300px', marginBottom: '42px' }}
                    modules={{
                      toolbar: [
                        [{ header: [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ color: [] }, { background: [] }],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        [{ align: [] }],
                        ['link', 'image'],
                        ['clean'],
                      ],
                    }}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Tip: Use <code className="px-1 py-0.5 bg-gray-100 rounded">&#123;name&#125;</code> to personalize with subscriber's name
                </p>
              </div>

              {/* Preview Toggle */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <Eye className="h-4 w-4" />
                  {showPreview ? 'Hide' : 'Show'} Preview
                </button>
                
                <div className="text-sm text-gray-600">
                  Will be sent to <span className="font-semibold">{getRecipientCount()}</span> subscribers
                </div>
              </div>

              {/* Preview */}
              {showPreview && (
                <div className="border border-gray-300 rounded-lg p-6 bg-gray-50">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b">
                    {emailSubject || '(No Subject)'}
                  </h3>
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: getPreviewBody() }}
                  />
                  <div className="mt-6 pt-4 border-t border-gray-300 text-xs text-gray-500 text-center">
                    <p>You are receiving this email because you subscribed to our newsletter.</p>
                    <a href="#" className="text-blue-600 hover:underline">Unsubscribe</a> from future emails.
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowEmailModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg"
                disabled={sending}
              >
                Cancel
              </button>
              <button
                onClick={handleSendBulkEmail}
                disabled={sending || !emailSubject.trim() || !emailBody.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {sending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Email
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
