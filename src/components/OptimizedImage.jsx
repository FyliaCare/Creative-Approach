import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * OptimizedImage Component
 * Provides optimized image loading with:
 * - Lazy loading
 * - WebP format with fallback
 * - Loading placeholder
 * - Error handling
 * - Responsive sizing
 */
const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  lazy = true,
  priority = false,
  objectFit = 'cover',
  webp = true,
  placeholder = true,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Generate WebP source from original image path
  const getWebPSrc = (imageSrc) => {
    if (!webp || !imageSrc) return null;
    
    // Check if already webp
    if (imageSrc.endsWith('.webp')) return imageSrc;
    
    // Replace extension with .webp
    return imageSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  };

  const handleLoad = (e) => {
    setIsLoading(false);
    if (onLoad) onLoad(e);
  };

  const handleError = (e) => {
    setIsLoading(false);
    setHasError(true);
    if (onError) onError(e);
  };

  const webpSrc = getWebPSrc(src);

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Loading Placeholder */}
      {placeholder && isLoading && !hasError && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0.6 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
          style={{ backgroundSize: '200% 100%' }}
        />
      )}

      {/* Error Fallback */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <svg
              className="w-12 h-12 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-xs">Image not available</p>
          </div>
        </div>
      )}

      {/* Optimized Image with WebP support */}
      {!hasError && (
        <picture>
          {/* WebP source for modern browsers */}
          {webpSrc && (
            <source srcSet={webpSrc} type="image/webp" />
          )}
          
          {/* Fallback image */}
          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : lazy ? 'lazy' : 'auto'}
            decoding="async"
            onLoad={handleLoad}
            onError={handleError}
            className={`w-full h-full transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            style={{
              objectFit,
              objectPosition: 'center',
            }}
            {...props}
          />
        </picture>
      )}
    </div>
  );
};

/**
 * Responsive Image Component
 * Loads different image sizes based on viewport
 */
export const ResponsiveImage = ({
  srcMobile,
  srcTablet,
  srcDesktop,
  alt,
  className = '',
  ...props
}) => {
  return (
    <picture className={className}>
      {/* Mobile */}
      {srcMobile && (
        <source media="(max-width: 640px)" srcSet={srcMobile} />
      )}
      
      {/* Tablet */}
      {srcTablet && (
        <source media="(max-width: 1024px)" srcSet={srcTablet} />
      )}
      
      {/* Desktop */}
      <img
        src={srcDesktop}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
        {...props}
      />
    </picture>
  );
};

/**
 * Background Image Component with optimization
 */
export const BackgroundImage = ({
  src,
  alt = '',
  className = '',
  overlay = false,
  overlayOpacity = 0.5,
  children,
  ...props
}) => {
  return (
    <div className={`relative ${className}`} {...props}>
      <OptimizedImage
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full"
        objectFit="cover"
        lazy={false}
      />
      
      {overlay && (
        <div 
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default OptimizedImage;
