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

export const SEOAnalyzer = ({ portfolio, onOptimize }) => {
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
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* SEO Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">SEO Score</h3>
            <button
              onClick={handleAutoOptimize}
              className="text-xs px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Auto-Fix
            </button>
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
        </motion.div>

        {/* Quality Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <h3 className="text-sm font-medium text-gray-600 mb-4">Content Quality</h3>
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
        </motion.div>

        {/* Readability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <h3 className="text-sm font-medium text-gray-600 mb-4">Readability</h3>
          <div className={`text-4xl font-bold mb-2 ${getScoreColor(analysis.readability.score)}`}>
            {analysis.readability.score}
            <span className="text-lg text-gray-400">/100</span>
          </div>
          <p className="text-sm text-gray-600">{analysis.readability.level}</p>
        </motion.div>
      </div>

      {/* SEO Checks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg shadow p-6"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-4">SEO Checklist</h3>
        <div className="space-y-2">
          {analysis.seo.checks.map((check, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg ${
                check.passed ? 'bg-green-50' : 'bg-red-50'
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
                <span className={`text-sm ${check.passed ? 'text-green-800' : 'text-red-800'}`}>
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
        <h3 className="text-lg font-bold text-gray-900 mb-4">Extracted Keywords</h3>
        <div className="flex flex-wrap gap-2">
          {analysis.keywords.length > 0 ? (
            analysis.keywords.map((keyword, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                {keyword}
              </span>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No keywords found. Add more content to improve SEO.</p>
          )}
        </div>
      </motion.div>

      {/* Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-lg shadow p-6"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-4">Improvement Suggestions</h3>
        <div className="space-y-3">
          {analysis.suggestions.length > 0 ? (
            analysis.suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(suggestion.priority)}`}>
                      {suggestion.priority}
                    </span>
                    <span className="text-xs text-gray-500">{suggestion.category}</span>
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{suggestion.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  {suggestion.action} →
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
          className="bg-white rounded-lg shadow p-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quality Improvements</h3>
          <ul className="space-y-2">
            {analysis.quality.issues.map((issue, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-orange-600 mt-1">⚠</span>
                <span className="text-sm text-gray-700">{issue}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};
