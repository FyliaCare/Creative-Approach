/**
 * AI-Powered Content Generation & Optimization Helpers
 * Local algorithms for portfolio enhancement
 */

// Title Templates by Category
const titleTemplates = {
  aerial: [
    'Breathtaking Aerial View of {location}',
    'Stunning {location} from Above',
    'Aerial Perspectives: {location}',
    'Sky-High Views of {location}',
    '{location} Through the Lens'
  ],
  inspection: [
    'Comprehensive Inspection of {location}',
    'Detailed {location} Assessment',
    'Professional Inspection: {location}',
    '{location} Structural Analysis',
    'Precision Inspection at {location}'
  ],
  mapping: [
    'Advanced Mapping: {location}',
    'Surveying {location} with Precision',
    '{location} Topographic Analysis',
    'Complete Mapping Solution for {location}',
    'Geospatial Data: {location}'
  ],
  film: [
    'Cinematic Journey Through {location}',
    '{location} Visual Story',
    'Documentary: Life at {location}',
    'Capturing {location} on Film',
    '{location} Through Our Lens'
  ],
  'real-estate': [
    'Showcase Property: {location}',
    'Premium Real Estate at {location}',
    '{location} Property Portfolio',
    'Stunning {location} Listing',
    '{location} Real Estate Excellence'
  ],
  construction: [
    'Construction Progress: {location}',
    'Building {location}: A Visual Timeline',
    '{location} Development Project',
    'Construction Documentation: {location}',
    '{location} Project Overview'
  ],
  events: [
    'Capturing Memories at {location}',
    '{location} Event Highlights',
    'Unforgettable Moments: {location}',
    '{location} Celebration',
    'Event Coverage: {location}'
  ]
};

// Description Templates
const descriptionTemplates = {
  aerial: [
    'Captured stunning aerial footage of {location} using professional drone technology. This project showcases the unique perspective and scale of the area, revealing details invisible from ground level.',
    'Our aerial photography team documented {location} with cutting-edge equipment, delivering high-resolution images that highlight the landscape\'s natural beauty and architectural features.',
    'A comprehensive aerial survey of {location}, combining artistic composition with technical precision to create visually compelling imagery for {client}.'
  ],
  inspection: [
    'Conducted a thorough drone inspection of {location} for {client}, identifying key structural elements and potential areas of concern with minimal disruption.',
    'Utilizing advanced thermal imaging and high-resolution cameras, we provided {client} with detailed inspection data of {location}, enabling informed decision-making.',
    'Our inspection services at {location} delivered comprehensive visual documentation, helping {client} maintain safety standards and infrastructure integrity.'
  ],
  mapping: [
    'Created precise topographic maps of {location} using photogrammetry and LiDAR technology, delivering actionable geospatial data to {client}.',
    'Generated accurate 3D models and orthomosaic maps of {location}, providing {client} with detailed measurements and terrain analysis.',
    'Comprehensive mapping solution for {location}, combining aerial data collection with advanced processing to create detailed site plans for {client}.'
  ],
  film: [
    'Produced cinematic footage at {location} for {client}, blending artistic vision with technical expertise to tell a compelling visual story.',
    'Our film crew captured the essence of {location}, delivering broadcast-quality content that resonates with audiences and achieves {client}\'s creative goals.',
    'Created immersive documentary footage at {location}, showcasing authentic moments and stunning visuals for {client}\'s production.'
  ],
  'real-estate': [
    'Professional real estate photography and videography for {location}, highlighting the property\'s best features to attract potential buyers for {client}.',
    'Comprehensive property showcase at {location}, combining aerial views with ground-level photography to present a complete visual narrative for {client}.',
    'Premium real estate marketing content for {location}, featuring dramatic aerial perspectives and detailed interior shots for {client}\'s listings.'
  ],
  construction: [
    'Ongoing construction documentation at {location} for {client}, providing regular aerial updates to track project progress and milestones.',
    'Time-lapse construction monitoring at {location}, delivering visual progress reports that help {client} communicate with stakeholders and manage timelines.',
    'Comprehensive site documentation for {location}, capturing every phase of development to create a complete visual record for {client}.'
  ],
  events: [
    'Captured unforgettable moments at {location} for {client}, delivering stunning aerial and ground-level photography of this special event.',
    'Event coverage at {location} featuring dynamic angles and creative compositions, preserving memories for {client} and attendees.',
    'Professional event documentation at {location}, combining candid shots with artistic drone footage for {client}\'s celebration.'
  ]
};

/**
 * Generate optimized title based on category and location
 */
export const generateTitle = (category, location, client) => {
  const templates = titleTemplates[category] || titleTemplates.aerial;
  const template = templates[Math.floor(Math.random() * templates.length)];
  return template.replace('{location}', location || 'Your Location');
};

/**
 * Generate compelling description
 */
export const generateDescription = (category, location, client) => {
  const templates = descriptionTemplates[category] || descriptionTemplates.aerial;
  const template = templates[Math.floor(Math.random() * templates.length)];
  return template
    .replace(/{location}/g, location || 'the site')
    .replace(/{client}/g, client || 'our client');
};

/**
 * Extract keywords from text
 */
export const extractKeywords = (text) => {
  if (!text) return [];
  
  // Common stop words to filter out
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'been', 'be',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
    'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those'
  ]);
  
  // Extract words and count frequency
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.has(word));
  
  const frequency = {};
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });
  
  // Sort by frequency and return top keywords
  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word]) => word);
};

/**
 * Calculate SEO score (0-100)
 */
export const calculateSEOScore = (portfolio) => {
  let score = 0;
  const checks = [];
  
  // Title checks (20 points)
  if (portfolio.title) {
    score += 10;
    checks.push({ name: 'Has title', passed: true });
    
    if (portfolio.title.length >= 30 && portfolio.title.length <= 60) {
      score += 10;
      checks.push({ name: 'Title length optimal (30-60 chars)', passed: true });
    } else {
      checks.push({ name: 'Title length optimal', passed: false });
    }
  } else {
    checks.push({ name: 'Has title', passed: false });
    checks.push({ name: 'Title length optimal', passed: false });
  }
  
  // Description checks (20 points)
  if (portfolio.description) {
    score += 10;
    checks.push({ name: 'Has description', passed: true });
    
    if (portfolio.description.length >= 120 && portfolio.description.length <= 320) {
      score += 10;
      checks.push({ name: 'Description length optimal (120-320 chars)', passed: true });
    } else {
      checks.push({ name: 'Description length optimal', passed: false });
    }
  } else {
    checks.push({ name: 'Has description', passed: false });
    checks.push({ name: 'Description length optimal', passed: false });
  }
  
  // Meta tags (15 points)
  if (portfolio.metaTitle) {
    score += 5;
    checks.push({ name: 'Has meta title', passed: true });
  } else {
    checks.push({ name: 'Has meta title', passed: false });
  }
  
  if (portfolio.metaDescription) {
    score += 5;
    checks.push({ name: 'Has meta description', passed: true });
  } else {
    checks.push({ name: 'Has meta description', passed: false });
  }
  
  if (portfolio.metaKeywords && portfolio.metaKeywords.length > 0) {
    score += 5;
    checks.push({ name: 'Has meta keywords', passed: true });
  } else {
    checks.push({ name: 'Has meta keywords', passed: false });
  }
  
  // Images (15 points)
  if (portfolio.featuredImage) {
    score += 10;
    checks.push({ name: 'Has featured image', passed: true });
  } else {
    checks.push({ name: 'Has featured image', passed: false });
  }
  
  if (portfolio.images && portfolio.images.length >= 3) {
    score += 5;
    checks.push({ name: 'Has multiple images (3+)', passed: true });
  } else {
    checks.push({ name: 'Has multiple images', passed: false });
  }
  
  // Content quality (15 points)
  if (portfolio.projectDetails?.challenge) {
    score += 5;
    checks.push({ name: 'Has project challenge', passed: true });
  } else {
    checks.push({ name: 'Has project challenge', passed: false });
  }
  
  if (portfolio.projectDetails?.solution) {
    score += 5;
    checks.push({ name: 'Has solution description', passed: true });
  } else {
    checks.push({ name: 'Has solution description', passed: false });
  }
  
  if (portfolio.projectDetails?.results) {
    score += 5;
    checks.push({ name: 'Has results/outcomes', passed: true });
  } else {
    checks.push({ name: 'Has results/outcomes', passed: false });
  }
  
  // Services & category (10 points)
  if (portfolio.services && portfolio.services.length > 0) {
    score += 5;
    checks.push({ name: 'Has services listed', passed: true });
  } else {
    checks.push({ name: 'Has services listed', passed: false });
  }
  
  if (portfolio.category) {
    score += 5;
    checks.push({ name: 'Has category', passed: true });
  } else {
    checks.push({ name: 'Has category', passed: false });
  }
  
  // Location & client (5 points)
  if (portfolio.location) {
    score += 3;
    checks.push({ name: 'Has location', passed: true });
  } else {
    checks.push({ name: 'Has location', passed: false });
  }
  
  if (portfolio.client) {
    score += 2;
    checks.push({ name: 'Has client info', passed: true });
  } else {
    checks.push({ name: 'Has client info', passed: false });
  }
  
  return { score, checks };
};

/**
 * Calculate content quality score (0-100)
 */
export const calculateQualityScore = (portfolio) => {
  let score = 0;
  const issues = [];
  
  // Completeness (40 points)
  const requiredFields = [
    { field: 'title', weight: 5 },
    { field: 'description', weight: 5 },
    { field: 'category', weight: 5 },
    { field: 'client', weight: 3 },
    { field: 'location', weight: 3 },
    { field: 'date', weight: 3 },
    { field: 'featuredImage', weight: 8 },
    { field: 'images', weight: 8, check: (val) => val && val.length >= 3 }
  ];
  
  requiredFields.forEach(({ field, weight, check }) => {
    const value = portfolio[field];
    const isValid = check ? check(value) : !!value;
    
    if (isValid) {
      score += weight;
    } else {
      issues.push(`Missing or incomplete: ${field}`);
    }
  });
  
  // Content depth (30 points)
  if (portfolio.projectDetails?.challenge) score += 10;
  else issues.push('Add project challenge description');
  
  if (portfolio.projectDetails?.solution) score += 10;
  else issues.push('Add solution details');
  
  if (portfolio.projectDetails?.results) score += 10;
  else issues.push('Add project results/outcomes');
  
  // Description quality (15 points)
  if (portfolio.description) {
    const wordCount = portfolio.description.split(/\s+/).length;
    if (wordCount >= 50) {
      score += 15;
    } else if (wordCount >= 30) {
      score += 10;
      issues.push('Description could be more detailed');
    } else {
      score += 5;
      issues.push('Description is too short (aim for 50+ words)');
    }
  }
  
  // Services (10 points)
  if (portfolio.services && portfolio.services.length >= 3) {
    score += 10;
  } else if (portfolio.services && portfolio.services.length > 0) {
    score += 5;
    issues.push('Add more services (aim for 3+)');
  } else {
    issues.push('Add services provided');
  }
  
  // SEO readiness (5 points)
  if (portfolio.metaTitle && portfolio.metaDescription) {
    score += 5;
  } else {
    issues.push('Add SEO meta tags');
  }
  
  return { score, issues };
};

/**
 * Calculate readability score (Flesch Reading Ease approximation)
 */
export const calculateReadability = (text) => {
  if (!text) return { score: 0, level: 'No content' };
  
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const syllables = words.reduce((count, word) => {
    return count + countSyllables(word);
  }, 0);
  
  if (sentences.length === 0 || words.length === 0) {
    return { score: 0, level: 'No content' };
  }
  
  const avgWordsPerSentence = words.length / sentences.length;
  const avgSyllablesPerWord = syllables / words.length;
  
  // Flesch Reading Ease formula
  const score = Math.max(0, Math.min(100, 
    206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord
  ));
  
  let level;
  if (score >= 90) level = 'Very Easy';
  else if (score >= 80) level = 'Easy';
  else if (score >= 70) level = 'Fairly Easy';
  else if (score >= 60) level = 'Standard';
  else if (score >= 50) level = 'Fairly Difficult';
  else if (score >= 30) level = 'Difficult';
  else level = 'Very Difficult';
  
  return { score: Math.round(score), level };
};

/**
 * Count syllables in a word (simplified)
 */
const countSyllables = (word) => {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;
  
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  
  const syllables = word.match(/[aeiouy]{1,2}/g);
  return syllables ? syllables.length : 1;
};

/**
 * Generate meta description from content
 */
export const generateMetaDescription = (portfolio) => {
  const { title, description, category, location } = portfolio;
  
  if (description && description.length >= 120 && description.length <= 160) {
    return description;
  }
  
  // Build custom meta description
  const parts = [];
  
  if (category) {
    parts.push(`Professional ${category.toLowerCase()} services`);
  }
  
  if (location) {
    parts.push(`at ${location}`);
  }
  
  if (description) {
    const shortened = description.split('.')[0];
    if (shortened.length <= 100) {
      parts.push(shortened);
    }
  }
  
  const meta = parts.join(' ') + '. High-quality aerial photography and videography.';
  return meta.slice(0, 160);
};

/**
 * Generate meta keywords
 */
export const generateMetaKeywords = (portfolio) => {
  const keywords = new Set();
  
  // Add category
  if (portfolio.category) {
    keywords.add(portfolio.category.toLowerCase());
  }
  
  // Add location
  if (portfolio.location) {
    portfolio.location.split(',').forEach(part => {
      const trimmed = part.trim().toLowerCase();
      if (trimmed) keywords.add(trimmed);
    });
  }
  
  // Extract from title and description
  const text = `${portfolio.title} ${portfolio.description}`.toLowerCase();
  const extracted = extractKeywords(text);
  extracted.slice(0, 5).forEach(kw => keywords.add(kw));
  
  // Add common drone/photography terms
  const commonTerms = [
    'drone photography',
    'aerial videography',
    'uav services',
    'professional photography'
  ];
  commonTerms.slice(0, 3).forEach(term => keywords.add(term));
  
  return Array.from(keywords).join(', ');
};

/**
 * Suggest improvements for portfolio
 */
export const suggestImprovements = (portfolio) => {
  const suggestions = [];
  const { score: seoScore } = calculateSEOScore(portfolio);
  const { score: qualityScore, issues } = calculateQualityScore(portfolio);
  
  // Priority suggestions based on impact
  if (seoScore < 60) {
    suggestions.push({
      priority: 'high',
      category: 'SEO',
      title: 'Improve SEO Score',
      description: 'Your SEO score is below 60. Add meta tags, optimize title length, and include more keywords.',
      action: 'Optimize SEO'
    });
  }
  
  if (qualityScore < 70) {
    suggestions.push({
      priority: 'high',
      category: 'Content',
      title: 'Enhance Content Quality',
      description: 'Add more details to project challenges, solutions, and results to improve quality score.',
      action: 'Add Details'
    });
  }
  
  if (!portfolio.featuredImage) {
    suggestions.push({
      priority: 'critical',
      category: 'Images',
      title: 'Add Featured Image',
      description: 'A featured image is required for optimal presentation and SEO.',
      action: 'Upload Image'
    });
  }
  
  if (!portfolio.images || portfolio.images.length < 3) {
    suggestions.push({
      priority: 'medium',
      category: 'Images',
      title: 'Add More Images',
      description: 'Projects with 3+ images get 40% more engagement. Add more visual content.',
      action: 'Upload Images'
    });
  }
  
  if (!portfolio.metaDescription) {
    suggestions.push({
      priority: 'medium',
      category: 'SEO',
      title: 'Add Meta Description',
      description: 'Meta descriptions improve click-through rates from search results.',
      action: 'Generate Meta'
    });
  }
  
  if (!portfolio.services || portfolio.services.length === 0) {
    suggestions.push({
      priority: 'low',
      category: 'Content',
      title: 'List Services',
      description: 'Adding services helps visitors understand your capabilities.',
      action: 'Add Services'
    });
  }
  
  // Add quality issues as suggestions
  issues.forEach(issue => {
    suggestions.push({
      priority: 'medium',
      category: 'Quality',
      title: issue,
      description: 'Completing all fields improves portfolio quality and professionalism.',
      action: 'Complete'
    });
  });
  
  return suggestions.slice(0, 8); // Return top 8 suggestions
};

/**
 * Auto-optimize portfolio content
 */
export const autoOptimizePortfolio = (portfolio) => {
  const optimized = { ...portfolio };
  
  // Generate missing meta tags
  if (!optimized.metaTitle) {
    optimized.metaTitle = optimized.title;
  }
  
  if (!optimized.metaDescription) {
    optimized.metaDescription = generateMetaDescription(optimized);
  }
  
  if (!optimized.metaKeywords) {
    optimized.metaKeywords = generateMetaKeywords(optimized);
  }
  
  // Generate slug if missing
  if (!optimized.slug && optimized.title) {
    optimized.slug = optimized.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  
  // Calculate scores
  const { score: seoScore } = calculateSEOScore(optimized);
  const { score: qualityScore } = calculateQualityScore(optimized);
  
  optimized.seoScore = seoScore;
  optimized.qualityScore = qualityScore;
  
  return optimized;
};
