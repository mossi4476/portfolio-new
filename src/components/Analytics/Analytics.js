import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics tracking
export const initializeGA = (measurementId) => {
  if (typeof window !== 'undefined' && measurementId) {
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', measurementId, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Track page views
export const trackPageView = (path, title) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.REACT_APP_GA_MEASUREMENT_ID, {
      page_title: title,
      page_location: window.location.origin + path,
    });
  }
};

// Track custom events
export const trackEvent = (action, category, label, value) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track project views
export const trackProjectView = (projectName) => {
  trackEvent('view_project', 'Projects', projectName);
  
  // Also track in localStorage for internal analytics
  const projectViews = JSON.parse(localStorage.getItem('projectViews') || '{}');
  projectViews[projectName] = (projectViews[projectName] || 0) + 1;
  localStorage.setItem('projectViews', JSON.stringify(projectViews));
};

// Track contact form submissions
export const trackContactForm = (formType) => {
  trackEvent('form_submit', 'Contact', formType);
};

// Track download events (resume, etc.)
export const trackDownload = (fileName) => {
  trackEvent('download', 'Files', fileName);
};

// Track social media clicks
export const trackSocialClick = (platform) => {
  trackEvent('social_click', 'Social Media', platform);
};

// Track external link clicks
export const trackExternalLink = (url, linkText) => {
  trackEvent('external_link', 'Navigation', linkText, url);
};

// Get internal analytics data
export const getInternalAnalytics = () => {
  const projectViews = JSON.parse(localStorage.getItem('projectViews') || '{}');
  const visitCount = parseInt(localStorage.getItem('visitCount') || '0');
  const lastVisit = localStorage.getItem('lastVisit');
  
  return {
    projectViews,
    visitCount,
    lastVisit,
    totalProjectViews: Object.values(projectViews).reduce((sum, count) => sum + count, 0)
  };
};

// Track visitor information
export const trackVisitor = () => {
  const now = new Date().toISOString();
  const visitCount = parseInt(localStorage.getItem('visitCount') || '0') + 1;
  const lastVisit = localStorage.getItem('lastVisit');
  
  localStorage.setItem('visitCount', visitCount.toString());
  localStorage.setItem('lastVisit', now);
  
  // Track returning vs new visitor
  const visitorType = visitCount > 1 ? 'returning' : 'new';
  trackEvent('visitor_type', 'Engagement', visitorType);
  
  return { visitCount, lastVisit, visitorType };
};

// Page view tracking hook
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view
    trackPageView(location.pathname, document.title);
    
    // Track visitor on first load
    if (location.pathname === '/') {
      trackVisitor();
    }
  }, [location]);
};

// Analytics component for automatic tracking
const Analytics = ({ measurementId }) => {
  usePageTracking();

  useEffect(() => {
    // Initialize Google Analytics if measurement ID is provided
    if (measurementId) {
      initializeGA(measurementId);
    }
  }, [measurementId]);

  return null; // This component doesn't render anything
};

// Performance monitoring
export const trackPerformance = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
        const domContentLoadedTime = perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart;
        
        // Track performance metrics
        if (window.gtag) {
          window.gtag('event', 'timing_complete', {
            name: 'page_load_time',
            value: Math.round(loadTime)
          });
          
          window.gtag('event', 'timing_complete', {
            name: 'dom_content_loaded_time',
            value: Math.round(domContentLoadedTime)
          });
        }
      }, 0);
    });
  }
};

// Error tracking
export const trackError = (error, errorInfo) => {
  console.error('Application Error:', error, errorInfo);
  
  if (window.gtag) {
    window.gtag('event', 'exception', {
      description: error.toString(),
      fatal: false
    });
  }
};

// User engagement tracking
export const trackEngagement = () => {
  let startTime = Date.now();
  let isActive = true;
  
  // Track time on page
  const trackTimeOnPage = () => {
    if (isActive) {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      if (timeSpent > 10) { // Only track if user spent more than 10 seconds
        trackEvent('time_on_page', 'Engagement', window.location.pathname, timeSpent);
      }
    }
  };
  
  // Track when user becomes inactive
  const handleVisibilityChange = () => {
    if (document.hidden) {
      isActive = false;
      trackTimeOnPage();
    } else {
      isActive = true;
      startTime = Date.now();
    }
  };
  
  // Track scroll depth
  let maxScroll = 0;
  const trackScrollDepth = () => {
    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      if (maxScroll >= 25 && maxScroll < 50) {
        trackEvent('scroll_depth', 'Engagement', '25%');
      } else if (maxScroll >= 50 && maxScroll < 75) {
        trackEvent('scroll_depth', 'Engagement', '50%');
      } else if (maxScroll >= 75 && maxScroll < 100) {
        trackEvent('scroll_depth', 'Engagement', '75%');
      } else if (maxScroll >= 100) {
        trackEvent('scroll_depth', 'Engagement', '100%');
      }
    }
  };
  
  // Add event listeners
  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('scroll', trackScrollDepth);
  window.addEventListener('beforeunload', trackTimeOnPage);
  
  // Cleanup function
  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    window.removeEventListener('scroll', trackScrollDepth);
    window.removeEventListener('beforeunload', trackTimeOnPage);
  };
};

export default Analytics;
