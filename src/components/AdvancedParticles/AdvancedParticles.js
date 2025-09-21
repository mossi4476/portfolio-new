import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import './AdvancedParticles.css';

const AdvancedParticles = ({ variant = 'default' }) => {
  
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
    // Optional callback for when particles are loaded
  }, []);

  // Simple particle configuration
  const particleOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
      particles: {
        color: {
          value: "#c770f0",
        },
        links: {
          color: "#c770f0",
        distance: 150,
        enable: variant !== 'floating',
        opacity: 0.3,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: variant === 'floating' ? "top" : "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: variant === 'fast' ? 3 : variant === 'floating' ? 0.5 : 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: variant === 'dense' ? 150 : variant === 'sparse' ? 30 : 80,
      },
      opacity: {
        value: variant === 'floating' ? 0.3 : 0.5,
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.1,
          sync: false
        }
      },
      shape: {
        type: variant === 'geometric' ? ["circle", "triangle", "polygon"] : "circle",
      },
      size: {
        value: { min: 1, max: variant === 'large' ? 8 : variant === 'floating' ? 10 : 5 },
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 0.1,
          sync: false
        }
      },
    },
    detectRetina: true,
  };

  return (
    <div className={`advanced-particles advanced-particles-${variant}`}>
      <Particles
        id={`tsparticles-${variant}`}
        init={particlesInit}
        loaded={particlesLoaded}
        options={particleOptions}
      />
    </div>
  );
};

export default AdvancedParticles;