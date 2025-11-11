import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import imageCompression from 'browser-image-compression';
import toast from 'react-hot-toast';

export const ImageOptimizerAdvanced = ({ onImagesOptimized }) => {
  const [files, setFiles] = useState([]);
  const [optimizing, setOptimizing] = useState(false);
  const [results, setResults] = useState([]);
  const [quality, setQuality] = useState(0.8);
  const [maxWidth, setMaxWidth] = useState(1920);
  const [outputFormat, setOutputFormat] = useState('original'); // 'original', 'webp', 'jpeg'
  const [selectedPreset, setSelectedPreset] = useState('web');
  const [batchMode, setBatchMode] = useState(false);
  const fileInputRef = useRef(null);

  const presets = {
    web: { quality: 0.85, maxWidth: 1920, label: 'Web (High Quality)', size: '~300KB', desc: 'Best for portfolio websites' },
    balanced: { quality: 0.75, maxWidth: 1600, label: 'Balanced', size: '~200KB', desc: 'Good quality, reasonable size' },
    mobile: { quality: 0.65, maxWidth: 1200, label: 'Mobile Optimized', size: '~150KB', desc: 'Fast loading on mobile' },
    thumbnail: { quality: 0.7, maxWidth: 600, label: 'Thumbnail', size: '~50KB', desc: 'Preview images and thumbnails' },
    hero: { quality: 0.9, maxWidth: 2560, label: 'Hero/Banner', size: '~500KB', desc: 'Large banner images' },
    social: { quality: 0.8, maxWidth: 1200, label: 'Social Media', size: '~250KB', desc: 'Optimized for social sharing' }
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    if (selectedFiles.length === 0) return;
    
    const fileData = selectedFiles.map(file => {
      const reader = new FileReader();
      const preview = URL.createObjectURL(file);
      
      return {
        file,
        preview,
        name: file.name,
        originalSize: file.size,
        optimizedSize: null,
        optimizedFile: null,
        optimizedPreview: null,
        status: 'pending',
        metadata: {
          type: file.type,
          lastModified: new Date(file.lastModified).toLocaleDateString()
        }
      };
    });
    
    setFiles(fileData);
    setResults([]);
    toast.success(`${selectedFiles.length} image(s) loaded`);
  };

  const applyPreset = (presetKey) => {
    const preset = presets[presetKey];
    setQuality(preset.quality);
    setMaxWidth(preset.maxWidth);
    setSelectedPreset(presetKey);
    toast.success(`Applied ${preset.label} preset`);
  };

  const optimizeImages = async () => {
    if (files.length === 0) {
      toast.error('Please select images first');
      return;
    }

    setOptimizing(true);
    setResults([]);
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
          initialQuality: quality,
          fileType: outputFormat === 'original' ? fileData.file.type : `image/${outputFormat}`
        };

        const compressedFile = await imageCompression(fileData.file, options);
        
        // Convert to selected format if needed
        let finalBlob = compressedFile;
        let finalType = compressedFile.type;
        
        if (outputFormat === 'webp' || outputFormat === 'jpeg') {
          finalBlob = await convertImageFormat(compressedFile, outputFormat);
          finalType = `image/${outputFormat}`;
        }
        
        const optimizedUrl = URL.createObjectURL(finalBlob);
        
        const result = {
          ...fileData,
          optimizedFile: finalBlob,
          optimizedSize: finalBlob.size,
          optimizedPreview: optimizedUrl,
          status: 'completed',
          savings: ((fileData.originalSize - finalBlob.size) / fileData.originalSize * 100).toFixed(1),
          finalFormat: finalType
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
          idx === i ? { ...f, status: 'error', error: error.message } : f
        ));
        toast.error(`Failed to optimize ${fileData.name}`);
      }
    }

    setOptimizing(false);
    if (optimizedResults.length > 0) {
      toast.success(`✨ Optimized ${optimizedResults.length} image(s) successfully!`);
    }
  };

  const convertImageFormat = (blob, format) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(blob);
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((newBlob) => {
          URL.revokeObjectURL(url);
          if (newBlob) {
            resolve(newBlob);
          } else {
            reject(new Error('Failed to convert image'));
          }
        }, `image/${format}`, quality);
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Failed to load image'));
      };
      
      img.src = url;
    });
  };

  const downloadOptimized = (result) => {
    const link = document.createElement('a');
    link.href = result.optimizedPreview;
    const extension = result.finalFormat.split('/')[1];
    const nameWithoutExt = result.name.split('.').slice(0, -1).join('.');
    link.download = `optimized-${nameWithoutExt}.${extension}`;
    link.click();
    toast.success(`Downloaded ${link.download}`);
  };

  const downloadAll = () => {
    if (results.length === 0) {
      toast.error('No optimized images to download');
      return;
    }

    results.forEach((result, index) => {
      if (result.optimizedFile) {
        setTimeout(() => downloadOptimized(result), index * 200);
      }
    });
    toast.success(`Downloading ${results.length} images...`);
  };

  const useOptimized = () => {
    if (results.length === 0) {
      toast.error('No optimized images available');
      return;
    }

    const optimizedFiles = results
      .filter(r => r.optimizedFile)
      .map(r => ({
        file: r.optimizedFile,
        url: r.optimizedPreview,
        name: r.name
      }));
    
    onImagesOptimized(optimizedFiles);
    toast.success(`Using ${optimizedFiles.length} optimized image(s)`);
  };

  const clearAll = () => {
    setFiles([]);
    setResults([]);
    setOptimizing(false);
    toast.success('Cleared all images');
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setResults(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const totalOriginalSize = files.reduce((acc, f) => acc + f.originalSize, 0);
  const totalOptimizedSize = results.reduce((acc, r) => acc + (r.optimizedSize || r.originalSize), 0);
  const totalSavings = totalOriginalSize - totalOptimizedSize;
  const savingsPercent = totalOriginalSize > 0 ? ((totalSavings / totalOriginalSize) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">🎨 Advanced Image Optimizer</h2>
            <p className="text-blue-100">
              Professional image optimization with format conversion, batch processing, and more
            </p>
          </div>
          {files.length > 0 && (
            <div className="text-right">
              <p className="text-sm text-blue-100">Total Files</p>
              <p className="text-3xl font-bold">{files.length}</p>
            </div>
          )}
        </div>
      </div>

      {/* File Upload */}
      <div className="bg-white rounded-lg shadow p-6">
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="text-6xl mb-4">📁</div>
          <p className="text-lg font-semibold text-gray-900 mb-2">
            Click to select images or drag and drop
          </p>
          <p className="text-sm text-gray-500 mb-1">
            Supports JPG, PNG, WebP, GIF (Max 10MB per image)
          </p>
          <p className="text-xs text-gray-400">
            Select multiple images for batch processing
          </p>
        </div>
      </div>

      {/* Settings */}
      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">⚙️ Optimization Settings</h3>
            <div className="flex gap-2">
              <button
                onClick={clearAll}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
              >
                Clear All
              </button>
              <button
                onClick={optimizeImages}
                disabled={optimizing || results.length === files.length}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed font-semibold transition-all shadow-md"
              >
                {optimizing ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Optimizing...
                  </span>
                ) : results.length === files.length ? (
                  '✅ All Optimized'
                ) : (
                  `🚀 Optimize ${files.length} Image${files.length > 1 ? 's' : ''}`
                )}
              </button>
            </div>
          </div>

          {/* Presets */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Quick Presets
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {Object.entries(presets).map(([key, preset]) => (
                <button
                  key={key}
                  onClick={() => applyPreset(key)}
                  className={`p-4 border-2 rounded-lg transition-all text-left ${
                    selectedPreset === key
                      ? 'border-blue-600 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-blue-300 hover:shadow'
                  }`}
                >
                  <p className="font-bold text-gray-900 mb-1 text-sm">{preset.label}</p>
                  <p className="text-xs text-gray-600 mb-1">{preset.size}</p>
                  <p className="text-xs text-gray-500">{preset.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Settings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
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
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>600px</span>
                <span>3840px (4K)</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Output Format
              </label>
              <select
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="original">Keep Original</option>
                <option value="webp">Convert to WebP</option>
                <option value="jpeg">Convert to JPEG</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                {outputFormat === 'webp' && 'WebP offers better compression'}
                {outputFormat === 'jpeg' && 'JPEG is universally supported'}
                {outputFormat === 'original' && 'Maintains original format'}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Statistics */}
      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 border-2 border-green-200 shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Original Size</p>
              <p className="text-2xl font-bold text-gray-900">{formatFileSize(totalOriginalSize)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Optimized Size</p>
              <p className="text-2xl font-bold text-blue-600">{formatFileSize(totalOptimizedSize)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Savings</p>
              <p className="text-2xl font-bold text-green-600">{formatFileSize(totalSavings)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Compression</p>
              <p className="text-2xl font-bold text-purple-600">{savingsPercent}%</p>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={downloadAll}
              className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold"
            >
              📥 Download All
            </button>
            <button
              onClick={useOptimized}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all font-semibold shadow-md"
            >
              ✨ Use in Portfolio
            </button>
          </div>
        </motion.div>
      )}

      {/* Image Comparison */}
      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {results.length > 0 ? '📊 Optimization Results' : '📝 Selected Images'}
          </h3>
          <div className="space-y-4">
            <AnimatePresence>
              {files.map((fileData, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    {/* Original */}
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-500 mb-2">ORIGINAL</p>
                      <img
                        src={fileData.preview}
                        alt={fileData.name}
                        className="w-full h-32 object-cover rounded-lg mb-2 border border-gray-200"
                      />
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-gray-900">
                          {formatFileSize(fileData.originalSize)}
                        </p>
                        <p className="text-xs text-gray-500">{fileData.metadata.type}</p>
                      </div>
                    </div>

                    {/* Status/Arrow */}
                    <div className="flex flex-col items-center justify-center pt-8 px-2">
                      {fileData.status === 'processing' ? (
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      ) : fileData.status === 'completed' ? (
                        <>
                          <svg className="w-8 h-8 text-green-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                          <span className="text-xs font-bold text-green-600">DONE</span>
                        </>
                      ) : fileData.status === 'error' ? (
                        <span className="text-xs font-bold text-red-600">ERROR</span>
                      ) : (
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      )}
                    </div>

                    {/* Optimized */}
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-500 mb-2">OPTIMIZED</p>
                      {fileData.optimizedPreview ? (
                        <>
                          <img
                            src={fileData.optimizedPreview}
                            alt={fileData.name}
                            className="w-full h-32 object-cover rounded-lg mb-2 border-2 border-green-300"
                          />
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-bold text-green-600">
                                {formatFileSize(fileData.optimizedSize)}
                              </p>
                              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded">
                                -{fileData.savings}%
                              </span>
                            </div>
                            <p className="text-xs text-gray-500">{fileData.finalFormat}</p>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-300">
                          {fileData.status === 'processing' ? 'Optimizing...' : 'Not optimized yet'}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 pt-8">
                      {fileData.optimizedFile && (
                        <button
                          onClick={() => downloadOptimized(fileData)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Download"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </button>
                      )}
                      <button
                        onClick={() => removeFile(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-600 truncate">{fileData.name}</p>
                  </div>
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
        className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border-2 border-blue-200"
      >
        <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
          <span>💡</span>
          <span>Optimization Tips & Best Practices</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded-lg border border-blue-100">
            <h4 className="font-bold text-blue-900 mb-1">🎯 Web Preset</h4>
            <p className="text-sm text-blue-800">Best for portfolio images - balances quality and performance</p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-blue-100">
            <h4 className="font-bold text-blue-900 mb-1">🌐 WebP Format</h4>
            <p className="text-sm text-blue-800">30% smaller than JPEG with same quality - modern browser support</p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-blue-100">
            <h4 className="font-bold text-blue-900 mb-1">🔒 Privacy First</h4>
            <p className="text-sm text-blue-800">All processing happens in your browser - images never leave your device</p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-blue-100">
            <h4 className="font-bold text-blue-900 mb-1">⚡ Performance</h4>
            <p className="text-sm text-blue-800">Aim for under 300KB per image for best web performance and SEO</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
