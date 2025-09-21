import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { BsSun, BsMoon } from 'react-icons/bs';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      className="theme-toggle"
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="theme-toggle-track"
        animate={{
          backgroundColor: isDark ? '#1a1a2e' : '#ffd700'
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="theme-toggle-thumb"
          animate={{
            x: isDark ? 0 : 24,
            backgroundColor: isDark ? '#0f0f1e' : '#ffffff'
          }}
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
        >
          <motion.div
            animate={{ rotate: isDark ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            {isDark ? <BsMoon size={12} /> : <BsSun size={12} />}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
