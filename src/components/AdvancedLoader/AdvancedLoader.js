import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AdvancedLoader.css';

const AdvancedLoader = ({ isLoading, onComplete }) => {
  const [loadingStage, setLoadingStage] = useState(0);
  const [loadingText, setLoadingText] = useState('');

  const loadingStages = useMemo(() => [
    'Initializing Portfolio...',
    'Loading Components...',
    'Preparing Experience...',
    'Almost Ready...',
    'Welcome!'
  ], []);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingStage(prev => {
          if (prev < loadingStages.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            setTimeout(() => onComplete?.(), 1000);
            return prev;
          }
        });
      }, 800);

      return () => clearInterval(interval);
    }
  }, [isLoading, onComplete, loadingStages.length]);

  useEffect(() => {
    setLoadingText(loadingStages[loadingStage] || '');
  }, [loadingStage, loadingStages]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { 
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  const logoVariants = {
    hidden: { 
      scale: 0,
      rotate: -180,
      opacity: 0
    },
    visible: { 
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 1
      }
    }
  };

  const morphingShapeVariants = {
    shape1: {
      borderRadius: "50%",
      rotate: 0,
      scale: 1,
      transition: { duration: 2, ease: "easeInOut" }
    },
    shape2: {
      borderRadius: "20%",
      rotate: 90,
      scale: 1.1,
      transition: { duration: 2, ease: "easeInOut" }
    },
    shape3: {
      borderRadius: "0%",
      rotate: 45,
      scale: 0.9,
      transition: { duration: 2, ease: "easeInOut" }
    }
  };

  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: { 
      width: `${(loadingStage + 1) * 20}%`,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="advanced-loader"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Animated background */}
          <div className="loader-background">
            <div className="floating-shapes">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="floating-shape"
                  animate={{
                    y: [0, -30, 0],
                    x: [0, Math.sin(i) * 20, 0],
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2
                  }}
                  style={{
                    left: `${15 + i * 15}%`,
                    top: `${20 + Math.sin(i) * 30}%`,
                    background: `linear-gradient(45deg, 
                      #c770f0${Math.floor(30 + i * 10).toString(16)}, 
                      #9c4dc7${Math.floor(20 + i * 8).toString(16)})`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Main loader content */}
          <div className="loader-content">
            {/* Logo/Brand */}
            <motion.div
              className="loader-logo"
              variants={logoVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="logo-shape"
                animate={loadingStage % 3 === 0 ? "shape1" : loadingStage % 3 === 1 ? "shape2" : "shape3"}
                variants={morphingShapeVariants}
              >
                <div className="logo-inner">
                  <span>ND</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Loading text */}
            <motion.div
              className="loader-text"
              key={loadingText}
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              <h2>{loadingText}</h2>
            </motion.div>

            {/* Progress bar */}
            <div className="progress-container">
              <div className="progress-bar">
                <motion.div
                  className="progress-fill"
                  variants={progressVariants}
                  initial="hidden"
                  animate="visible"
                />
              </div>
              <motion.div
                className="progress-percentage"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {Math.round((loadingStage + 1) * 20)}%
              </motion.div>
            </div>

            {/* Loading dots */}
            <div className="loading-dots">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="dot"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>

            {/* Orbital elements */}
            <div className="orbital-container">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`orbital orbital-${i + 1}`}
                  animate={{
                    rotate: 360
                  }}
                  transition={{
                    duration: 8 + i * 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <div className="orbital-dot" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Particle effects */}
          <div className="particle-container">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="particle"
                animate={{
                  y: [-100, window.innerHeight + 100],
                  x: [
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerWidth
                  ],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "linear"
                }}
                style={{
                  left: Math.random() * window.innerWidth,
                  background: '#c770f0'
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdvancedLoader;
