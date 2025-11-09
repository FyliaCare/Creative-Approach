import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

/**
 * Web Vitals tracking utility
 * Measures and reports Core Web Vitals metrics
 * 
 * Metrics tracked:
 * - CLS: Cumulative Layout Shift (visual stability)
 * - INP: Interaction to Next Paint (replaces FID - interactivity)
 * - FCP: First Contentful Paint (loading)
 * - LCP: Largest Contentful Paint (loading)
 * - TTFB: Time to First Byte (server response)
 */

const sendToAnalytics = (metric) => {
  // Log to console in development
  if (import.meta.env.DEV) {
    console.log('📊 Web Vital:', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
    });
  }

  // Send to analytics service in production
  if (import.meta.env.PROD) {
    // Example: Google Analytics 4
    if (window.gtag) {
      window.gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true,
      });
    }

    // Example: Custom analytics endpoint
    // fetch('/api/analytics', {
    //   method: 'POST',
    //   body: JSON.stringify(metric),
    //   headers: { 'Content-Type': 'application/json' }
    // });
  }
};

export function reportWebVitals(onPerfEntry) {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    onCLS(onPerfEntry);
    onINP(onPerfEntry);
    onFCP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
  } else {
    // Use default analytics sender
    onCLS(sendToAnalytics);
    onINP(sendToAnalytics);
    onFCP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
  }
}

/**
 * Performance thresholds (Google's recommendations)
 */
export const THRESHOLDS = {
  CLS: { good: 0.1, needsImprovement: 0.25 },
  FID: { good: 100, needsImprovement: 300 },
  FCP: { good: 1800, needsImprovement: 3000 },
  LCP: { good: 2500, needsImprovement: 4000 },
  TTFB: { good: 800, needsImprovement: 1800 },
};

/**
 * Get rating for a metric value
 */
export function getRating(metricName, value) {
  const threshold = THRESHOLDS[metricName];
  if (!threshold) return 'unknown';
  
  if (value <= threshold.good) return 'good';
  if (value <= threshold.needsImprovement) return 'needs-improvement';
  return 'poor';
}
