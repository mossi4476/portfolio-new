import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import Preloader from "../src/components/Pre";
import AdvancedLoader from "./components/AdvancedLoader/AdvancedLoader";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import FloatingActions from "./components/FloatingActions/FloatingActions";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer";
import Resume from "./components/Resume/ResumeNew";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Animated page wrapper component
const AnimatedRoutes = () => {
  const location = useLocation();
  
  const pageVariants = {
    initial: { opacity: 0, x: -200, scale: 0.8 },
    in: { opacity: 1, x: 0, scale: 1 },
    out: { opacity: 0, x: 200, scale: 1.2 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Home />
          </motion.div>
        } />
        <Route path="/project" element={
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Projects />
          </motion.div>
        } />
        <Route path="/about" element={
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <About />
          </motion.div>
        } />
        <Route path="/resume" element={
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Resume />
          </motion.div>
        } />
        <Route path="*" element={<Navigate to="/"/>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [load, upadateLoad] = useState(true);
  const [advancedLoad, setAdvancedLoad] = useState(true);

  useEffect(() => {
    // First show advanced loader
    const advancedTimer = setTimeout(() => {
      setAdvancedLoad(false);
      // Then show original preloader briefly
      setTimeout(() => {
        upadateLoad(false);
      }, 500);
    }, 4000); // Advanced loader for 4 seconds

    return () => clearTimeout(advancedTimer);
  }, []);

  return (
    <HelmetProvider>
      <Router>
          {/* Advanced Loading Screen */}
          <AdvancedLoader 
            isLoading={advancedLoad} 
            onComplete={() => setAdvancedLoad(false)} 
          />
          
          {/* Original Preloader */}
          <Preloader load={load && !advancedLoad} />
          
          <div className="App" id={load ? "no-scroll" : "scroll"}>
            {/* Custom Cursor */}
            <CustomCursor />
            
            {/* Floating Action Buttons */}
            <FloatingActions />
            
            <Navbar />
            <ScrollToTop />
            <AnimatedRoutes />
            <Footer />
            
            {/* Enhanced Toast Notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  color: 'white',
                  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                },
                success: {
                  iconTheme: {
                    primary: '#c770f0',
                    secondary: 'white',
                  },
                  style: {
                    border: '1px solid rgba(199, 112, 240, 0.3)',
                  }
                },
                error: {
                  iconTheme: {
                    primary: '#ff6b6b',
                    secondary: 'white',
                  },
                  style: {
                    border: '1px solid rgba(255, 107, 107, 0.3)',
                  }
                },
                loading: {
                  iconTheme: {
                    primary: '#667eea',
                    secondary: 'white',
                  },
                  style: {
                    border: '1px solid rgba(102, 126, 234, 0.3)',
                  }
                },
              }}
            />
          </div>
        </Router>
    </HelmetProvider>
  );
}

export default App;
