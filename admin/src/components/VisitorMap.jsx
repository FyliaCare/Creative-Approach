import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Users,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  Clock,
  Eye,
  Activity,
  Radio,
  Maximize2,
  Minimize2,
  RefreshCw,
  Chrome,
} from 'lucide-react';
import { analyticsAPI } from '../services/api';
import toast from 'react-hot-toast';
import { formatDistance } from 'date-fns';

// Fix Leaflet default marker icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create custom marker icons
const createCustomIcon = (color, isActive) => {
  const pulseClass = isActive ? 'animate-pulse' : '';
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="relative ${pulseClass}">
        ${isActive ? `
          <div class="absolute inset-0 rounded-full animate-ping" style="background-color: ${color}; opacity: 0.4;"></div>
          <div class="absolute inset-0 rounded-full animate-pulse" style="background-color: ${color}; opacity: 0.3;"></div>
        ` : ''}
        <div class="relative w-6 h-6 rounded-full border-2 border-white shadow-lg" style="background-color: ${color};">
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-2 h-2 rounded-full bg-white"></div>
          </div>
        </div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

// Component to update map view when data changes
const MapUpdater = ({ visitors }) => {
  const map = useMap();
  
  useEffect(() => {
    if (visitors.length > 0) {
      const bounds = visitors.map(v => [v.lat, v.lng]);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 6 });
    }
  }, [visitors, map]);
  
  return null;
};

const VisitorMap = () => {
  const [visitors, setVisitors] = useState([]);
  const [stats, setStats] = useState({
    totalVisitors: 0,
    activeVisitors: 0,
    countries: 0,
    devices: { desktop: 0, mobile: 0, tablet: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [period, setPeriod] = useState('24h');
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const refreshIntervalRef = useRef(null);

  useEffect(() => {
    fetchMapData();

    if (autoRefresh) {
      refreshIntervalRef.current = setInterval(() => {
        fetchMapData(true);
      }, 15000); // Refresh every 15 seconds
    }

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [period, showActiveOnly, autoRefresh]);

  const fetchMapData = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      
      const response = await analyticsAPI.getVisitorMap(period, showActiveOnly);
      
      if (response.data.success) {
        setVisitors(response.data.data.visitors);
        setStats(response.data.data.stats);
      }
    } catch (error) {
      console.error('Error fetching map data:', error);
      if (!silent) {
        toast.error('Failed to load visitor map data');
      }
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const handleRefresh = () => {
    toast.promise(
      fetchMapData(),
      {
        loading: 'Refreshing map data...',
        success: 'Map data updated!',
        error: 'Failed to refresh data'
      }
    );
  };

  const getMarkerColor = (visitor) => {
    if (!visitor.isActive) return '#94a3b8'; // gray
    if (visitor.device === 'mobile') return '#10b981'; // green
    if (visitor.device === 'tablet') return '#f59e0b'; // orange
    return '#3b82f6'; // blue
  };

  const getDeviceIcon = (device) => {
    switch(device) {
      case 'mobile': return Smartphone;
      case 'tablet': return Tablet;
      default: return Monitor;
    }
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-white p-6' : ''}`}>
      <div className="space-y-6">
        {/* Header Controls */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Globe className="w-7 h-7 text-blue-600" />
              Live Visitor Map
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Real-time geographic tracking of website visitors
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Period Selector */}
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="px-4 py-2 border-2 border-gray-300 rounded-xl font-medium focus:outline-none focus:border-blue-500"
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>

            {/* Active Only Toggle */}
            <button
              onClick={() => setShowActiveOnly(!showActiveOnly)}
              className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                showActiveOnly
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Radio className={`w-4 h-4 ${showActiveOnly ? 'animate-pulse' : ''}`} />
              Active Only
            </button>

            {/* Auto Refresh */}
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                autoRefresh
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Activity className={`w-4 h-4 ${autoRefresh ? 'animate-pulse' : ''}`} />
              Auto-refresh
            </button>

            {/* Manual Refresh */}
            <button
              onClick={handleRefresh}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              <RefreshCw className="w-5 h-5 text-gray-700" />
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              {isFullscreen ? (
                <Minimize2 className="w-5 h-5 text-gray-700" />
              ) : (
                <Maximize2 className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-6 h-6 opacity-80" />
              <span className="text-2xl font-bold">{stats.totalVisitors}</span>
            </div>
            <p className="text-sm opacity-90">Total Visitors</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <Radio className="w-6 h-6 opacity-80 animate-pulse" />
              <span className="text-2xl font-bold">{stats.activeVisitors}</span>
            </div>
            <p className="text-sm opacity-90">Active Now</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <Globe className="w-6 h-6 opacity-80" />
              <span className="text-2xl font-bold">{stats.countries}</span>
            </div>
            <p className="text-sm opacity-90">Countries</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <Monitor className="w-6 h-6 opacity-80" />
              <span className="text-2xl font-bold">{stats.devices.desktop + stats.devices.mobile + stats.devices.tablet}</span>
            </div>
            <p className="text-sm opacity-90">Total Devices</p>
          </div>
        </div>

        {/* Map Container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-gray-200">
          {loading ? (
            <div className="h-[600px] flex items-center justify-center">
              <div className="text-center">
                <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Loading visitor map...</p>
              </div>
            </div>
          ) : visitors.length === 0 ? (
            <div className="h-[600px] flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-700 mb-2">No Visitors Yet</h3>
                <p className="text-gray-600">Visitor locations will appear here once traffic starts</p>
              </div>
            </div>
          ) : (
            <div className="h-[600px] relative">
              <MapContainer
                center={[20, 0]}
                zoom={2}
                style={{ height: '100%', width: '100%' }}
                className="z-0"
              >
                {/* OpenStreetMap Tiles - Free and Real */}
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {/* Auto-adjust view to show all markers */}
                <MapUpdater visitors={visitors} />
                
                {/* Visitor Markers */}
                {visitors.map((visitor) => {
                  if (!visitor.lat || !visitor.lng) return null;
                  
                  const color = getMarkerColor(visitor);
                  const DeviceIcon = getDeviceIcon(visitor.device);
                  
                  return (
                    <Marker
                      key={visitor.id}
                      position={[visitor.lat, visitor.lng]}
                      icon={createCustomIcon(color, visitor.isActive)}
                    >
                      <Popup className="custom-popup">
                        <div className="p-2 min-w-[250px]">
                          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200">
                            <MapPin className="w-5 h-5 text-blue-600" />
                            <h3 className="font-bold text-lg">Visitor Details</h3>
                            {visitor.isActive && (
                              <span className="ml-auto inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                <Radio className="w-3 h-3 animate-pulse" />
                                Active
                              </span>
                            )}
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex items-start gap-2">
                              <Globe className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="font-semibold text-gray-700">Location:</span>
                                <p className="text-gray-900">{visitor.city}, {visitor.country}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <DeviceIcon className="w-4 h-4 text-gray-400" />
                              <span className="font-semibold text-gray-700">Device:</span>
                              <span className="capitalize text-gray-900">{visitor.device}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <Chrome className="w-4 h-4 text-gray-400" />
                              <span className="font-semibold text-gray-700">Browser:</span>
                              <span className="text-gray-900">{visitor.browser} ({visitor.os})</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <Eye className="w-4 h-4 text-gray-400" />
                              <span className="font-semibold text-gray-700">Page Views:</span>
                              <span className="text-gray-900">{visitor.pageViews}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="font-semibold text-gray-700">Duration:</span>
                              <span className="text-gray-900">
                                {Math.floor(visitor.duration / 60)}m {visitor.duration % 60}s
                              </span>
                            </div>

                            {visitor.currentPage && (
                              <div className="pt-2 border-t border-gray-200 mt-2">
                                <p className="font-semibold text-gray-700 mb-1">Current Page:</p>
                                <p className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded break-all">
                                  {visitor.currentPage}
                                </p>
                              </div>
                            )}

                            <div className="pt-2 border-t border-gray-200 mt-2">
                              <p className="text-xs text-gray-500">
                                Last activity: {formatDistance(new Date(visitor.lastActivity), new Date(), { addSuffix: true })}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>

              {/* Legend Overlay */}
              <div className="absolute bottom-4 left-4 bg-white rounded-xl shadow-lg p-4 border-2 border-gray-200 z-[1000]">
                <h4 className="font-bold text-sm mb-3">Legend</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white"></div>
                    <span>Desktop (Active)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white"></div>
                    <span>Mobile (Active)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-orange-500 border-2 border-white"></div>
                    <span>Tablet (Active)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-gray-400 border-2 border-white"></div>
                    <span>Inactive</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisitorMap;
