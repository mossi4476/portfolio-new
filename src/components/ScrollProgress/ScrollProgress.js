import React, { useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import './ScrollProgress.css';

const ScrollProgress = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Smooth spring animation for progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform scroll progress to percentage
  const scrollPercentage = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.pageYOffset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        className="scroll-progress-bar"
        style={{ 
          scaleX,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ opacity: { duration: 0.3 } }}
      />

      {/* Circular progress indicator */}
      <motion.div
        className="scroll-progress-circle"
        style={{ opacity: isVisible ? 1 : 0 }}
        transition={{ opacity: { duration: 0.3 } }}
      >
        <svg className="progress-ring" width="60" height="60">
          <circle
            className="progress-ring-background"
            stroke="rgba(199, 112, 240, 0.2)"
            strokeWidth="3"
            fill="transparent"
            r="26"
            cx="30"
            cy="30"
          />
          <motion.circle
            className="progress-ring-progress"
            stroke="url(#gradient)"
            strokeWidth="3"
            fill="transparent"
            r="26"
            cx="30"
            cy="30"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 26}`}
            strokeDashoffset={useTransform(
              scrollYProgress,
              [0, 1],
              [2 * Math.PI * 26, 0]
            )}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c770f0" />
              <stop offset="50%" stopColor="#9c4dc7" />
              <stop offset="100%" stopColor="#667eea" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Percentage text */}
        <motion.div className="progress-percentage">
          <motion.span>
            {scrollPercentage.get().toFixed(0)}%
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Section indicators */}
      <SectionIndicators scrollProgress={scrollYProgress} />
    </>
  );
};

// Section indicators component
const SectionIndicators = ({ scrollProgress }) => {
  const [activeSection, setActiveSection] = useState(0);

  const sections = useMemo(() => [
    { name: 'Home', id: 'home', progress: 0 },
    { name: 'About', id: 'about', progress: 0.25 },
    { name: 'Projects', id: 'projects', progress: 0.5 },
    { name: 'Contact', id: 'contact', progress: 0.75 },
    { name: 'Footer', id: 'footer', progress: 1 }
  ], []);

  useEffect(() => {
    const unsubscribe = scrollProgress.onChange((latest) => {
      const currentSection = sections.findIndex((section, index) => {
        const nextSection = sections[index + 1];
        return latest >= section.progress && 
               (!nextSection || latest < nextSection.progress);
      });
      
      if (currentSection !== -1 && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    });

    return unsubscribe;
  }, [scrollProgress, activeSection, sections]);

  return (
    <div className="section-indicators">
      {sections.slice(0, -1).map((section, index) => (
        <motion.div
          key={section.id}
          className={`section-dot ${index === activeSection ? 'active' : ''}`}
          onClick={() => {
            const element = document.getElementById(section.id);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          title={section.name}
        >
          <div className="dot-inner" />
          <div className="dot-tooltip">{section.name}</div>
        </motion.div>
      ))}
    </div>
  );
};

// Parallax wrapper component
export const ParallaxWrapper = ({ children, speed = 0.5, className = '' }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -1000 * speed]);

  return (
    <motion.div
      className={`parallax-wrapper ${className}`}
      style={{ y }}
    >
      {children}
    </motion.div>
  );
};

// Parallax text component
export const ParallaxText = ({ children, speed = 0.3, direction = 'up' }) => {
  const { scrollY } = useScroll();
  const multiplier = direction === 'up' ? -1 : 1;
  const y = useTransform(scrollY, [0, 1000], [0, 1000 * speed * multiplier]);

  return (
    <motion.div
      className="parallax-text"
      style={{ y }}
    >
      {children}
    </motion.div>
  );
};

// Reveal on scroll component
export const RevealOnScroll = ({ children, delay = 0, duration = 0.6 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay * 1000);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector('.reveal-element');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [delay]);

  return (
    <motion.div
      className="reveal-element"
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollProgress;
