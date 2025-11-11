import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  calculateSEOScore,
  calculateQualityScore,
  calculateReadability,
  extractKeywords,
  generateMetaDescription,
  generateMetaKeywords,
  suggestImprovements
} from '../utils/aiHelpers';

export const SEOAnalyzerEnhanced = ({ portfolio, onOptimize, onNavigate }) => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (portfolio) {
      analyzePortfolio();
    }
  }, [portfolio]);

  const analyzePortfolio = () => {
    setLoading(true);
    
    setTimeout(() => {
      const seo = calculateSEOScore(portfolio);
      const quality = calculateQualityScore(portfolio);
      const readability = calculateReadability(portfolio.description || '');
      const keywords = extractKeywords(`${portfolio.title || ''} ${portfolio.description || ''}`);
      const suggestions = suggestImprovements(portfolio);
      
      setAnalysis({
        seo,
        quality,
        readability,
        keywords,
        suggestions
      });
      
      setLoading(false);
    }, 500);
  };

  const handleAutoOptimize = () => {
    const optimized = {
      ...portfolio,
      metaTitle: portfolio.metaTitle || portfolio.title,
      metaDescription: portfolio.metaDescription || generateMetaDescription(portfolio),
      metaKeywords: portfolio.metaKeywords || generateMetaKeywords(portfolio)
    };
    
    onOptimize(optimized);
    analyzePortfolio();
  };

  const handleSuggestionAction = (suggestion) => {
    // Navigate to the appropriate section in the create tab based on the suggestion
    if (onNavigate) {
      let section = null;
      
      // Map suggestion actions to form sections
      if (suggestion.action.includes('Image') || suggestion.action.includes('Upload Image')) {
        section = 'media';
      } else if (suggestion.action.includes('Meta') || suggestion.action.includes('SEO')) {
        section = 'seo';
      } else if (suggestion.action.includes('Details') || suggestion.action.includes('Content')) {
        section = 'details';
      } else if (suggestion.action.includes('Services')) {
        section = 'services';
      } else {
        section = 'basic';
      }
      
      onNavigate('create', section);
    }
  };

  if (!portfolio) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
        Create or select a portfolio project to analyze SEO
      </div>
    );
  }

  if (loading || !analysis) {
    return (
      <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">SEO Analysis</h2>
          <p className="text-gray-600 text-sm mt-1">
            Comprehensive analysis with actionable recommendations
          </p>
        </div>
        <button
          onClick={handleAutoOptimize}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg"
        >
          ⚡ Auto-Optimize SEO
        </button>
      </div>

      {/* Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* SEO Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">SEO Score</h3>
            <span className="text-2xl">🎯</span>
          </div>
          <div className={`text-4xl font-bold mb-2 ${getScoreColor(analysis.seo.score)}`}>
            {analysis.seo.score}
            <span className="text-lg text-gray-400">/100</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                analysis.seo.score >= 80
                  ? 'bg-green-600'
                  : analysis.seo.score >= 60
                  ? 'bg-yellow-600'
                  : 'bg-red-600'
              }`}
              style={{ width: `${analysis.seo.score}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {analysis.seo.score >= 80 ? 'Excellent!' : analysis.seo.score >= 60 ? 'Good, but can improve' : 'Needs improvement'}
          </p>
        </motion.div>

        {/* Quality Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Content Quality</h3>
            <span className="text-2xl">✨</span>
          </div>
          <div className={`text-4xl font-bold mb-2 ${getScoreColor(analysis.quality.score)}`}>
            {analysis.quality.score}
            <span className="text-lg text-gray-400">/100</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                analysis.quality.score >= 80
                  ? 'bg-green-600'
                  : analysis.quality.score >= 60
                  ? 'bg-yellow-600'
                  : 'bg-red-600'
              }`}
              style={{ width: `${analysis.quality.score}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {analysis.quality.issues.length} areas to improve
          </p>
        </motion.div>

        {/* Readability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-600"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Readability</h3>
            <span className="text-2xl">📖</span>
          </div>
          <div className={`text-4xl font-bold mb-2 ${getScoreColor(analysis.readability.score)}`}>
            {analysis.readability.score}
            <span className="text-lg text-gray-400">/100</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full bg-purple-600 transition-all"
              style={{ width: `${analysis.readability.score}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">{analysis.readability.level}</p>
        </motion.div>
      </div>

      {/* SEO Checklist */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg shadow p-6"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>✅</span>
          <span>SEO Checklist</span>
        </h3>
        <div className="space-y-2">
          {analysis.seo.checks.map((check, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                check.passed ? 'bg-green-50 hover:bg-green-100' : 'bg-red-50 hover:bg-red-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    check.passed ? 'bg-green-600' : 'bg-red-600'
                  }`}
                >
                  {check.passed ? (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
                <span className={`text-sm font-medium ${check.passed ? 'text-green-800' : 'text-red-800'}`}>
                  {check.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Keywords */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow p-6"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>🔑</span>
          <span>Extracted Keywords</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {analysis.keywords.length > 0 ? (
            analysis.keywords.map((keyword, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200"
              >
                {keyword}
              </span>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No keywords found. Add more content to improve SEO.</p>
          )}
        </div>
      </motion.div>

      {/* Improvement Suggestions with Working Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-lg shadow p-6"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>💡</span>
          <span>Actionable Improvements ({analysis.suggestions.length})</span>
        </h3>
        <div className="space-y-3">
          {analysis.suggestions.length > 0 ? (
            analysis.suggestions.map((suggestion, index) => (
              <div
                key={index}
                className={`border-2 rounded-lg p-4 hover:shadow-md transition-all ${getPriorityColor(suggestion.priority)}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${getPriorityColor(suggestion.priority)}`}>
                      {suggestion.priority}
                    </span>
                    <span className="px-2 py-1 bg-white rounded text-xs font-semibold text-gray-600 border">
                      {suggestion.category}
                    </span>
                  </div>
                  {suggestion.priority === 'critical' && (
                    <span className="text-xl animate-pulse">⚠️</span>
                  )}
                </div>
                <h4 className="font-bold text-gray-900 mb-1 text-lg">{suggestion.title}</h4>
                <p className="text-sm text-gray-700 mb-3">{suggestion.description}</p>
                <button 
                  onClick={() => handleSuggestionAction(suggestion)}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium text-sm shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <span>{suggestion.action}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🎉</div>
              <p className="text-lg font-semibold text-green-600 mb-2">Perfect!</p>
              <p className="text-gray-600">Your portfolio is fully optimized. Great job!</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Quality Issues */}
      {analysis.quality.issues.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg shadow border-2 border-orange-200 p-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>🔧</span>
            <span>Quality Improvements</span>
          </h3>
          <ul className="space-y-2">
            {analysis.quality.issues.map((issue, index) => (
              <li key={index} className="flex items-start gap-3 p-2 rounded hover:bg-white transition-colors">
                <span className="text-orange-600 mt-1 text-xl">⚠</span>
                <span className="text-sm text-gray-800 font-medium">{issue}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* SEO Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border-2 border-blue-200"
      >
        <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
          <span>💡</span>
          <span>Pro SEO Tips</span>
        </h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Title:</strong> Keep between 30-60 characters for optimal display in search results</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Description:</strong> Aim for 120-160 characters to avoid truncation</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Keywords:</strong> Use relevant, specific keywords naturally throughout content</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Images:</strong> Always include alt text and compress for faster loading</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Content:</strong> Write for humans first, search engines second</span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};
