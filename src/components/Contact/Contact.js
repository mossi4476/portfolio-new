import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import emailjs from 'emailjs-com';
import toast from 'react-hot-toast';
import Particle from '../Particle';
import { 
  AiOutlineMail, 
  AiOutlinePhone, 
  AiOutlineEnvironment,
  AiOutlineLinkedin,
  AiOutlineGithub,
  AiOutlineTwitter
} from 'react-icons/ai';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Replace with your EmailJS credentials
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: 'Nguyen Tien Dung'
        },
        'YOUR_PUBLIC_KEY'
      );
      
      toast.success('Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Email send error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: AiOutlineMail,
      title: 'Email',
      value: 'dungnt@example.com',
      link: 'mailto:dungnt@example.com'
    },
    {
      icon: AiOutlinePhone,
      title: 'Phone',
      value: '+84 123 456 789',
      link: 'tel:+84123456789'
    },
    {
      icon: AiOutlineEnvironment,
      title: 'Location',
      value: 'Ho Chi Minh City, Vietnam',
      link: null
    }
  ];

  const socialLinks = [
    {
      icon: AiOutlineLinkedin,
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/your-profile'
    },
    {
      icon: AiOutlineGithub,
      name: 'GitHub',
      url: 'https://github.com/mossi4476'
    },
    {
      icon: AiOutlineTwitter,
      name: 'Twitter',
      url: 'https://twitter.com/your-profile'
    }
  ];

  return (
    <Container fluid className="contact-section">
      <Particle />
      <Container>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Row style={{ justifyContent: "center", padding: "10px" }}>
            <Col md={12} className="contact-header">
              <h1 className="project-heading">
                Get In <strong className="purple">Touch</strong>
              </h1>
              <p style={{ color: "white", textAlign: "center", marginBottom: "50px" }}>
                I'm always open to discussing new opportunities and interesting projects.
                Let's create something amazing together!
              </p>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="contact-info-section">
              <motion.div
                className="contact-info-card"
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="contact-info-title">Contact Information</h3>
                <div className="contact-info-list">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      className="contact-info-item"
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    >
                      <div className="contact-info-icon">
                        <info.icon />
                      </div>
                      <div className="contact-info-content">
                        <h5>{info.title}</h5>
                        {info.link ? (
                          <a href={info.link}>{info.value}</a>
                        ) : (
                          <span>{info.value}</span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="social-links">
                  <h4>Follow Me</h4>
                  <div className="social-icons">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      >
                        <social.icon />
                        <span>{social.name}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Col>

            <Col md={6} className="contact-form-section">
              <motion.div
                className="contact-form-card"
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Form onSubmit={handleSubmit} className="contact-form">
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Name *</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          isInvalid={!!errors.name}
                          className="modern-input"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email *</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          isInvalid={!!errors.email}
                          className="modern-input"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Subject *</Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      isInvalid={!!errors.subject}
                      className="modern-input"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.subject}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Message *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      isInvalid={!!errors.message}
                      className="modern-input"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="contact-submit-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="spinner-border spinner-border-sm me-2" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </Button>
                  </motion.div>
                </Form>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </Container>
  );
};

export default Contact;
