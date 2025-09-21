import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  const trailElements = useRef([]);
  const trailCount = 8;

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      setIsVisible(true);
      
      // Update trail
      trailElements.current.forEach((trail, index) => {
        setTimeout(() => {
          if (trail) {
            trail.style.left = e.clientX - 4 + 'px';
            trail.style.top = e.clientY - 4 + 'px';
          }
        }, index * 50);
      });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Add hover effects for interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, .btn, .card, .project-card'
      );
      
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          setIsHovering(true);
          setCursorVariant('hover');
        });
        el.addEventListener('mouseleave', () => {
          setIsHovering(false);
          setCursorVariant('default');
        });
      });

      // Special effects for different elements
      const textElements = document.querySelectorAll('h1, h2, h3, p, span');
      textElements.forEach(el => {
        el.addEventListener('mouseenter', () => setCursorVariant('text'));
        el.addEventListener('mouseleave', () => setCursorVariant('default'));
      });

      const imageElements = document.querySelectorAll('img, .image-container');
      imageElements.forEach(el => {
        el.addEventListener('mouseenter', () => setCursorVariant('image'));
        el.addEventListener('mouseleave', () => setCursorVariant('default'));
      });
    };

    // Initialize
    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Add listeners after DOM is ready
    setTimeout(addHoverListeners, 1000);
    
    // Re-add listeners when route changes
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  const cursorVariants = {
    default: {
      scale: 1,
      backgroundColor: 'rgba(199, 112, 240, 0.8)',
      border: '2px solid rgba(199, 112, 240, 0.4)',
      mixBlendMode: 'difference',
    },
    hover: {
      scale: 1.5,
      backgroundColor: 'rgba(199, 112, 240, 0.2)',
      border: '2px solid rgba(199, 112, 240, 0.8)',
      mixBlendMode: 'normal',
    },
    text: {
      scale: 0.5,
      backgroundColor: 'rgba(102, 126, 234, 0.8)',
      border: '2px solid rgba(102, 126, 234, 0.4)',
      mixBlendMode: 'difference',
    },
    image: {
      scale: 2,
      backgroundColor: 'rgba(156, 77, 199, 0.3)',
      border: '2px solid rgba(156, 77, 199, 0.6)',
      mixBlendMode: 'multiply',
    }
  };

  // Don't render on mobile devices
  if (window.innerWidth <= 768) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className={`custom-cursor custom-cursor-${cursorVariant}`}
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          opacity: isVisible ? 1 : 0,
        }}
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Cursor trail */}
      {Array.from({ length: trailCount }).map((_, index) => (
        <div
          key={index}
          ref={el => trailElements.current[index] = el}
          className="cursor-trail"
          style={{
            opacity: (trailCount - index) / trailCount * 0.5,
            transform: `scale(${(trailCount - index) / trailCount})`,
            transitionDelay: `${index * 20}ms`,
          }}
        />
      ))}

      {/* Cursor glow effect */}
      <motion.div
        className="cursor-glow"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          opacity: isHovering ? 0.3 : 0,
        }}
        animate={{
          scale: isHovering ? [1, 1.2, 1] : 1,
        }}
        transition={{
          scale: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      />
    </>
  );
};

export default CustomCursor;
