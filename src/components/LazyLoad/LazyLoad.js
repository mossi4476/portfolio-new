import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';

// Lazy load components for better performance
const LazyAbout = lazy(() => import('../About/About'));
const LazyProjects = lazy(() => import('../Projects/Projects'));
const LazyContact = lazy(() => import('../Contact/Contact'));
const LazyBlog = lazy(() => import('../Blog/Blog'));
const LazyResume = lazy(() => import('../Resume/ResumeNew'));

// Loading component with smooth animation
const LoadingSpinner = () => (
  <div className="lazy-loading-container">
    <motion.div
      className="lazy-loading-spinner"
      animate={{
        rotate: 360,
        scale: [1, 1.2, 1]
      }}
      transition={{
        rotate: { duration: 1, repeat: Infinity, ease: "linear" },
        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
      }}
    >
      <div className="spinner-ring"></div>
    </motion.div>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="loading-text"
    >
      Loading...
    </motion.p>
  </div>
);

// Error Boundary component
class LazyErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Lazy loading error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="lazy-error-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="error-content"
          >
            <h3>Oops! Something went wrong</h3>
            <p>Please refresh the page or try again later.</p>
            <button 
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Refresh Page
            </button>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for lazy loading with error boundary
const withLazyLoading = (Component) => {
  return (props) => (
    <LazyErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Component {...props} />
      </Suspense>
    </LazyErrorBoundary>
  );
};

// Export lazy-loaded components
export const LazyAboutPage = withLazyLoading(LazyAbout);
export const LazyProjectsPage = withLazyLoading(LazyProjects);
export const LazyContactPage = withLazyLoading(LazyContact);
export const LazyBlogPage = withLazyLoading(LazyBlog);
export const LazyResumePage = withLazyLoading(LazyResume);

export { LoadingSpinner, LazyErrorBoundary };
export default withLazyLoading;
