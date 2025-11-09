import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import imageCompression from 'browser-image-compression';

export const ImageOptimizer = ({ onImagesOptimized }) => {
  const [files, setFiles] = useState([]);
  const [optimizing, setOptimizing] = useState(false);
  const [results, setResults] = useState([]);
  const [quality, setQuality] = useState(0.8);
  const [maxWidth, setMaxWidth] = useState(1920);

  const presets = {
    web: { quality: 0.85, maxWidth: 1920, label: 'Web (High Quality)', size: '~300KB' },
    balanced: { quality: 0.75, maxWidth: 1600, label: 'Balanced', size: '~200KB' },
    mobile: { quality: 0.65, maxWidth: 1200, label: 'Mobile', size: '~150KB' },
    thumbnail: { quality: 0.7, maxWidth: 600, label: 'Thumbnail', size: '~50KB' }
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const fileData = selectedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      originalSize: file.size,
      optimizedSize: null,
      optimizedFile: null,
      status: 'pending'
    }));
    setFiles(fileData);
    setResults([]);
  };

  const applyPreset = (presetKey) => {
    const preset = presets[presetKey];
    setQuality(preset.quality);
    setMaxWidth(preset.maxWidth);
  };

  const optimizeImages = async () => {
    setOptimizing(true);
    const optimizedResults = [];

    for (let i = 0; i < files.length; i++) {
      const fileData = files[i];
      
      try {
        // Update status
        setFiles(prev => prev.map((f, idx) => 
          idx === i ? { ...f, status: 'processing' } : f
        ));

        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: maxWidth,
          useWebWorker: true,
          initialQuality: quality
        };

        const compressedFile = await imageCompression(fileData.file, options);
        
        const optimizedBlob = new Blob([compressedFile], { type: 'image/jpeg' });
        const optimizedUrl = URL.createObjectURL(optimizedBlob);
        
        const result = {
          ...fileData,
          optimizedFile: compressedFile,
          optimizedSize: compressedFile.size,
          optimizedPreview: optimizedUrl,
          status: 'completed',
          savings: ((fileData.originalSize - compressedFile.size) / fileData.originalSize * 100).toFixed(1)
        };

        optimizedResults.push(result);
        
        // Update results in real-time
        setResults(prev => [...prev, result]);
        setFiles(prev => prev.map((f, idx) => 
          idx === i ? result : f
        ));

      } catch (error) {
        console.error('Error optimizing image:', error);
        setFiles(prev => prev.map((f, idx) => 
          idx === i ? { ...f, status: 'error' } : f
        ));
      }
    }

    setOptimizing(false);
  };

  const downloadOptimized = (result) => {
    const link = document.createElement('a');
    link.href = result.optimizedPreview;
    link.download = `optimized-${result.name}`;
    link.click();
  };

  const downloadAll = () => {
    results.forEach(result => {
      if (result.optimizedFile) {
        downloadOptimized(result);
      }
    });
  };

  const useOptimized = () => {
    const optimizedFiles = results
      .filter(r => r.optimizedFile)
      .map(r => ({
        file: r.optimizedFile,
        url: r.optimizedPreview,
        name: r.name
      }));
    
    onImagesOptimized(optimizedFiles);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const totalSavings = results.reduce((acc, r) => {
    return acc + (r.originalSize - (r.optimizedSize || r.originalSize));
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Image Optimizer</h2>
        <p className="text-gray-600 mb-6">
          Compress images for faster loading and better SEO performance. Client-side processing ensures privacy.
        </p>

        {/* File Upload */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <div className="text-6xl mb-4">📁</div>
            <p className="text-lg font-semibold text-gray-900 mb-2">
              Click to select images or drag and drop
            </p>
            <p className="text-sm text-gray-500">
              Supports JPG, PNG, WebP (Max 10MB per image)
            </p>
          </label>
        </div>
      </div>

      {/* Settings */}
      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Optimization Settings</h3>
          
          {/* Presets */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {Object.entries(presets).map(([key, preset]) => (
              <button
                key={key}
                onClick={() => applyPreset(key)}
                className={`p-4 border-2 rounded-lg transition-all ${
                  quality === preset.quality && maxWidth === preset.maxWidth
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <p className="font-semibold text-gray-900 mb-1">{preset.label}</p>
                <p className="text-xs text-gray-500">{preset.size}</p>
              </button>
            ))}
          </div>

          {/* Custom Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quality: {Math.round(quality * 100)}%
              </label>
              <input
                type="range"
                min="0.3"
                max="1"
                step="0.05"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Lower Size</span>
                <span>Higher Quality</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Width: {maxWidth}px
              </label>
              <input
                type="range"
                min="600"
                max="3840"
                step="200"
                value={maxWidth}
                onChange={(e) => setMaxWidth(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>600px</span>
                <span>3840px (4K)</span>
              </div>
            </div>
          </div>

          {/* Optimize Button */}
          <button
            onClick={optimizeImages}
            disabled={optimizing}
            className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold transition-colors"
          >
            {optimizing ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Optimizing Images...
              </span>
            ) : (
              `Optimize ${files.length} Image${files.length > 1 ? 's' : ''}`
            )}
          </button>
        </motion.div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow p-6"
        >
          {/* Summary */}
          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Savings</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatFileSize(totalSavings)}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {files.length} image{files.length > 1 ? 's' : ''} optimized
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={downloadAll}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Download All
                </button>
                <button
                  onClick={useOptimized}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Use Optimized
                </button>
              </div>
            </div>
          </div>

          {/* Image Comparison */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Optimization Results</h3>
            <AnimatePresence>
              {results.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    {/* Original */}
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-2">Original</p>
                      <img
                        src={result.preview}
                        alt={result.name}
                        className="w-full h-32 object-cover rounded-lg mb-2"
                      />
                      <p className="text-sm font-semibold text-gray-900">
                        {formatFileSize(result.originalSize)}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center justify-center pt-8">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>

                    {/* Optimized */}
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-2">Optimized</p>
                      <img
                        src={result.optimizedPreview}
                        alt={result.name}
                        className="w-full h-32 object-cover rounded-lg mb-2"
                      />
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-green-600">
                          {formatFileSize(result.optimizedSize)}
                        </p>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                          -{result.savings}%
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <button
                      onClick={() => downloadOptimized(result)}
                      className="mt-6 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Download"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 mt-2">{result.name}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-50 rounded-lg p-6 border border-blue-200"
      >
        <h3 className="text-lg font-bold text-blue-900 mb-3">💡 Optimization Tips</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>Web preset (85% quality) is recommended for portfolio images</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>Optimized images load faster and improve SEO rankings</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>All processing happens in your browser - images never leave your device</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>Aim for under 300KB per image for best web performance</span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};
