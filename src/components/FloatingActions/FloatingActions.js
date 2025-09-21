import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AiOutlineArrowUp, 
  AiOutlineGithub,
  AiOutlineLinkedin,
  AiOutlineDownload,
  AiOutlineHome
} from 'react-icons/ai';
import { BsShare } from 'react-icons/bs';
import './FloatingActions.css';

const FloatingActions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Nguyen Tien Dung - Portfolio',
          text: 'Check out this amazing portfolio!',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  const actionButtons = [
    {
      icon: AiOutlineGithub,
      label: 'GitHub',
      action: () => window.open('https://github.com/mossi4476', '_blank'),
      color: '#333',
      delay: 0.1
    },
    {
      icon: AiOutlineLinkedin,
      label: 'LinkedIn',
      action: () => window.open('https://linkedin.com/in/your-profile', '_blank'),
      color: '#0077B5',
      delay: 0.2
    },
    {
      icon: AiOutlineDownload,
      label: 'Resume',
      action: () => window.location.href = '/resume',
      color: '#FF6B6B',
      delay: 0.3
    },
    {
      icon: BsShare,
      label: 'Share',
      action: handleShare,
      color: '#9C27B0',
      delay: 0.4
    }
  ];

  const containerVariants = {
    open: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    closed: {
      y: 20,
      opacity: 0,
      scale: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  const mainButtonVariants = {
    open: {
      rotate: 45,
      backgroundColor: "#FF6B6B",
      scale: 1.1
    },
    closed: {
      rotate: 0,
      backgroundColor: "#c770f0",
      scale: 1
    }
  };

  return (
    <div className="floating-actions">
      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="scroll-top-btn"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <AiOutlineArrowUp />
          </motion.button>
        )}
      </AnimatePresence>


      {/* Quick home button */}
      <motion.button
        className="home-btn"
        onClick={() => window.location.href = '/'}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
      >
        <AiOutlineHome />
      </motion.button>

      {/* Action buttons container */}
      <motion.div
        className="fab-container"
        variants={containerVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
      >
        <AnimatePresence>
          {isOpen && actionButtons.map((button, index) => (
            <motion.button
              key={index}
              className="action-btn"
              variants={itemVariants}
              onClick={button.action}
              whileHover={{ 
                scale: 1.2, 
                rotate: 5,
                boxShadow: `0 8px 25px ${button.color}40`
              }}
              whileTap={{ scale: 0.9 }}
              style={{ 
                backgroundColor: button.color,
                '--btn-color': button.color
              }}
              title={button.label}
            >
              <button.icon />
              <span className="btn-tooltip">{button.label}</span>
            </motion.button>
          ))}
        </AnimatePresence>

        {/* Main FAB button */}
        <motion.button
          className="main-fab"
          onClick={() => setIsOpen(!isOpen)}
          variants={mainButtonVariants}
          animate={isOpen ? "open" : "closed"}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            +
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Background overlay when open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fab-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingActions;
