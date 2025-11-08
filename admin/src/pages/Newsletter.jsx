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
} from 'lucide-react';
import { newsletterAPI } from '../services/api';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

export const Newsletter = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedSubscribers, setSelectedSubscribers] = useState([]);

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
    </div>
  );
};
