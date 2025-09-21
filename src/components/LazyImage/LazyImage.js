import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './LazyImage.css';

const LazyImage = ({
  src,
  alt,
  placeholder,
  className = '',
  style = {},
  onLoad,
  onError,
  threshold = 0.1,
  rootMargin = '50px',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  // Default placeholder - a subtle gradient
  const defaultPlaceholder = `data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23c770f0;stop-opacity:0.1' /%3E%3Cstop offset='100%25' style='stop-color:%239c4dc7;stop-opacity:0.1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grad)' /%3E%3C/svg%3E`;

  useEffect(() => {
    const currentImgRef = imgRef.current;
    
    // Set up Intersection Observer
    if (currentImgRef && 'IntersectionObserver' in window) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.disconnect();
          }
        },
        {
          threshold,
          rootMargin,
        }
      );

      observerRef.current.observe(currentImgRef);
    } else {
      // Fallback for browsers without IntersectionObserver
      setIsInView(true);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [threshold, rootMargin]);

  const handleLoad = (event) => {
    setIsLoaded(true);
    onLoad?.(event);
  };

  const handleError = (event) => {
    setHasError(true);
    onError?.(event);
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const placeholderVariants = {
    visible: { opacity: 1 },
    hidden: { 
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div 
      ref={imgRef}
      className={`lazy-image-container ${className}`}
      style={style}
    >
      {/* Placeholder */}
      <motion.div
        className="lazy-image-placeholder"
        variants={placeholderVariants}
        animate={isLoaded ? 'hidden' : 'visible'}
      >
        {hasError ? (
          <div className="lazy-image-error">
            <div className="error-icon">📷</div>
            <span>Failed to load image</span>
          </div>
        ) : (
          <img
            src={placeholder || defaultPlaceholder}
            alt=""
            className="placeholder-img"
          />
        )}
        
        {/* Loading spinner */}
        {isInView && !isLoaded && !hasError && (
          <div className="lazy-image-spinner">
            <motion.div
              className="spinner"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        )}
      </motion.div>

      {/* Actual image */}
      {isInView && !hasError && (
        <motion.img
          src={src}
          alt={alt}
          className={`lazy-image ${isLoaded ? 'loaded' : 'loading'}`}
          variants={imageVariants}
          initial="hidden"
          animate={isLoaded ? 'visible' : 'hidden'}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          {...props}
        />
      )}
    </div>
  );
};

// Higher-order component for progressive image enhancement
export const withProgressiveImage = (WrappedComponent) => {
  return ({ imageSrc, imageAlt, ...props }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    
    return (
      <WrappedComponent
        {...props}
        style={{
          ...props.style,
          backgroundImage: imageLoaded ? `url(${imageSrc})` : 'none'
        }}
      >
        <LazyImage
          src={imageSrc}
          alt={imageAlt}
          onLoad={() => setImageLoaded(true)}
          style={{ display: 'none' }}
        />
        {props.children}
      </WrappedComponent>
    );
  };
};

// Utility function to generate responsive image URLs
export const generateResponsiveImageUrl = (baseUrl, width, height, quality = 80) => {
  // This would typically integrate with a CDN or image optimization service
  // For now, return the base URL with query parameters
  const params = new URLSearchParams({
    w: width.toString(),
    h: height.toString(),
    q: quality.toString(),
    fit: 'cover',
    auto: 'format'
  });
  
  return `${baseUrl}?${params.toString()}`;
};

// Component for responsive images with multiple sources
export const ResponsiveImage = ({ 
  src, 
  alt, 
  sizes = [
    { width: 320, media: '(max-width: 320px)' },
    { width: 640, media: '(max-width: 640px)' },
    { width: 1024, media: '(max-width: 1024px)' },
    { width: 1920, media: '(min-width: 1025px)' }
  ],
  ...props 
}) => {
  const generateSrcSet = () => {
    return sizes
      .map(size => `${generateResponsiveImageUrl(src, size.width, size.width * 0.75)} ${size.width}w`)
      .join(', ');
  };

  const generateSizes = () => {
    return sizes
      .map(size => `${size.media} ${size.width}px`)
      .join(', ');
  };

  return (
    <LazyImage
      src={src}
      srcSet={generateSrcSet()}
      sizes={generateSizes()}
      alt={alt}
      {...props}
    />
  );
};

export default LazyImage;
