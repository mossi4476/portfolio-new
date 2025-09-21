import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import homeLogo from "../../Assets/home-main.svg";
import Particle from "../Particle";
import AdvancedParticles from "../AdvancedParticles/AdvancedParticles";
import Home2 from "./Home2";
import Type from "./Type";

function Home() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section>
        <Container fluid className="home-section" id="home">
          <Particle />
          <AdvancedParticles variant="floating" />
          <Container className="home-content">
            <motion.div
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <Row>
                <Col md={7} className="home-header">
                  <motion.h1 
                    variants={itemVariants}
                    style={{ paddingBottom: 15 }} 
                    className="heading"
                  >
                    Hi There!{" "}
                    <motion.span 
                      className="wave" 
                      role="img" 
                      aria-labelledby="wave"
                      animate={{ 
                        rotate: [0, 14, -8, 14, -4, 10, 0] 
                      }}
                      transition={{ 
                        duration: 2.5,
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                    >
                      👋🏻
                    </motion.span>
                  </motion.h1>

                  <motion.h1 variants={itemVariants} className="heading-name">
                    I'M
                    <strong className="main-name"> Nguyen Tien Dung</strong>
                  </motion.h1>

                  <motion.div 
                    variants={itemVariants}
                    style={{ padding: 50, textAlign: "left" }}
                  >
                    <Type />
                  </motion.div>

                  <motion.div 
                    variants={itemVariants}
                    className="home-cta-buttons"
                    style={{ paddingLeft: 50, paddingTop: 20 }}
                  >
                    <motion.a
                      href="#about"
                      className="btn btn-primary me-3"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Learn More About Me
                    </motion.a>
                    <motion.a
                      href="/contact"
                      className="btn btn-outline-primary"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get In Touch
                    </motion.a>
                  </motion.div>
                </Col>

                <Col md={5} style={{ paddingBottom: 20 }}>
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, rotateY: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={homeLogo}
                      alt="home pic"
                      className="img-fluid home-main-image"
                      style={{ maxHeight: "450px" }}
                    />
                  </motion.div>
                </Col>
              </Row>
            </motion.div>
          </Container>
        </Container>
        <Home2 />
      </section>
  );
}

export default Home;
