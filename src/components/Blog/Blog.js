import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, InputGroup, FormControl } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Particle from '../Particle';
import { AiOutlineCalendar, AiOutlineClockCircle, AiOutlineEye, AiOutlineSearch } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import './Blog.css';

// Mock blog data - in a real app, this would come from an API or CMS
const mockBlogPosts = [
  {
    id: 1,
    title: "Building Scalable Microservices with AWS Lambda",
    excerpt: "Learn how to design and implement scalable microservices architecture using AWS Lambda, API Gateway, and other serverless technologies.",
    content: `# Building Scalable Microservices with AWS Lambda

Microservices architecture has revolutionized how we build and deploy applications. In this comprehensive guide, we'll explore how to leverage AWS Lambda to create scalable, cost-effective microservices.

## Why Serverless Microservices?

Serverless computing offers several advantages:
- **Cost Efficiency**: Pay only for what you use
- **Auto Scaling**: Automatic scaling based on demand
- **Reduced Operational Overhead**: No server management required

## Architecture Overview

Our microservices architecture will consist of:
1. API Gateway for routing
2. Lambda functions for business logic
3. DynamoDB for data storage
4. CloudWatch for monitoring

Let's dive into the implementation details...`,
    category: "AWS",
    tags: ["AWS", "Lambda", "Microservices", "Serverless"],
    author: "Nguyen Tien Dung",
    publishDate: "2024-01-15",
    readTime: 8,
    views: 1250,
    featured: true,
    image: "/api/placeholder/600/300"
  },
  {
    id: 2,
    title: "Modern React Development with Hooks and Context",
    excerpt: "Explore advanced React patterns using hooks, context API, and modern state management techniques for building maintainable applications.",
    content: `# Modern React Development with Hooks and Context

React has evolved significantly with the introduction of hooks and the Context API. This article covers advanced patterns and best practices.

## Key Topics Covered

- Custom hooks for reusable logic
- Context API for state management
- Performance optimization techniques
- Testing strategies for modern React apps

## Getting Started

Let's start with a simple example of a custom hook...`,
    category: "React",
    tags: ["React", "JavaScript", "Frontend", "Hooks"],
    author: "Nguyen Tien Dung",
    publishDate: "2024-01-10",
    readTime: 12,
    views: 890,
    featured: false,
    image: "/api/placeholder/600/300"
  },
  {
    id: 3,
    title: "DevOps Best Practices: CI/CD Pipeline Implementation",
    excerpt: "A comprehensive guide to implementing robust CI/CD pipelines using GitHub Actions, Docker, and Kubernetes for automated deployment workflows.",
    content: `# DevOps Best Practices: CI/CD Pipeline Implementation

Continuous Integration and Continuous Deployment (CI/CD) are essential practices in modern software development.

## Pipeline Components

Our CI/CD pipeline includes:
- Automated testing
- Code quality checks
- Container building
- Deployment automation

## Implementation Details

Here's how we set up our pipeline...`,
    category: "DevOps",
    tags: ["DevOps", "CI/CD", "Docker", "Kubernetes"],
    author: "Nguyen Tien Dung",
    publishDate: "2024-01-05",
    readTime: 15,
    views: 2100,
    featured: true,
    image: "/api/placeholder/600/300"
  },
  {
    id: 4,
    title: "Database Design Patterns for High-Performance Applications",
    excerpt: "Explore advanced database design patterns, indexing strategies, and optimization techniques for building high-performance applications.",
    content: `# Database Design Patterns for High-Performance Applications

Database performance is crucial for application success. This guide covers essential patterns and optimization techniques.

## Key Patterns

- Repository Pattern
- Unit of Work
- Data Mapper
- Active Record

## Performance Optimization

Let's explore various optimization strategies...`,
    category: "Database",
    tags: ["Database", "Performance", "SQL", "Architecture"],
    author: "Nguyen Tien Dung",
    publishDate: "2023-12-28",
    readTime: 10,
    views: 1650,
    featured: false,
    image: "/api/placeholder/600/300"
  }
];

const Blog = () => {
  const [posts] = useState(mockBlogPosts);
  const [filteredPosts, setFilteredPosts] = useState(mockBlogPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const categories = ['All', ...new Set(mockBlogPosts.map(post => post.category))];

  useEffect(() => {
    let filtered = posts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory, posts]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <Container fluid className="blog-section">
      <Particle />
      <Container>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Row style={{ justifyContent: "center", padding: "10px" }}>
            <Col md={12} className="blog-header">
              <h1 className="project-heading">
                My <strong className="purple">Blog</strong>
              </h1>
              <p style={{ color: "white", textAlign: "center", marginBottom: "50px" }}>
                Thoughts, tutorials, and insights about technology, development, and innovation.
              </p>
            </Col>
          </Row>

          {/* Search and Filter Section */}
          <Row className="blog-controls">
            <Col md={8}>
              <InputGroup className="search-input">
                <InputGroup.Text>
                  <AiOutlineSearch />
                </InputGroup.Text>
                <FormControl
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="modern-search"
                />
              </InputGroup>
            </Col>
            <Col md={4}>
              <div className="category-filters">
                {categories.map((category, index) => (
                  <motion.button
                    key={category}
                    className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </Col>
          </Row>

          {/* Featured Posts */}
          {selectedCategory === 'All' && searchTerm === '' && (
            <motion.div
              className="featured-section"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="section-title">Featured Articles</h2>
              <Row>
                {posts.filter(post => post.featured).slice(0, 2).map((post, index) => (
                  <Col md={6} key={post.id}>
                    <motion.div
                      variants={itemVariants}
                      initial="hidden"
                      animate={inView ? "visible" : "hidden"}
                      transition={{ delay: index * 0.2 }}
                    >
                      <Card className="featured-post-card">
                        <div className="post-image-container">
                          <Card.Img variant="top" src={post.image} alt={post.title} />
                          <div className="featured-badge">Featured</div>
                        </div>
                        <Card.Body>
                          <div className="post-meta">
                            <Badge bg="primary" className="category-badge">
                              <BiCategory className="me-1" />
                              {post.category}
                            </Badge>
                            <span className="post-date">
                              <AiOutlineCalendar className="me-1" />
                              {formatDate(post.publishDate)}
                            </span>
                          </div>
                          <Card.Title className="post-title">{post.title}</Card.Title>
                          <Card.Text className="post-excerpt">{post.excerpt}</Card.Text>
                          <div className="post-stats">
                            <span>
                              <AiOutlineClockCircle className="me-1" />
                              {post.readTime} min read
                            </span>
                            <span>
                              <AiOutlineEye className="me-1" />
                              {post.views.toLocaleString()} views
                            </span>
                          </div>
                          <div className="post-tags">
                            {post.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} bg="secondary" className="tag-badge">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </Card.Body>
                      </Card>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </motion.div>
          )}

          {/* All Posts */}
          <motion.div
            className="all-posts-section"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <h2 className="section-title">
              {selectedCategory === 'All' ? 'All Articles' : `${selectedCategory} Articles`}
              <span className="posts-count">({filteredPosts.length})</span>
            </h2>
            
            {filteredPosts.length === 0 ? (
              <motion.div
                className="no-posts"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3>No articles found</h3>
                <p>Try adjusting your search terms or category filter.</p>
              </motion.div>
            ) : (
              <Row>
                {filteredPosts.map((post, index) => (
                  <Col md={6} lg={4} key={post.id} className="mb-4">
                    <motion.div
                      variants={itemVariants}
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="blog-post-card h-100">
                        <div className="post-image-container">
                          <Card.Img variant="top" src={post.image} alt={post.title} />
                          {post.featured && <div className="featured-badge">Featured</div>}
                        </div>
                        <Card.Body className="d-flex flex-column">
                          <div className="post-meta">
                            <Badge bg="primary" className="category-badge">
                              <BiCategory className="me-1" />
                              {post.category}
                            </Badge>
                            <span className="post-date">
                              <AiOutlineCalendar className="me-1" />
                              {formatDate(post.publishDate)}
                            </span>
                          </div>
                          <Card.Title className="post-title">{post.title}</Card.Title>
                          <Card.Text className="post-excerpt flex-grow-1">{post.excerpt}</Card.Text>
                          <div className="post-stats">
                            <span>
                              <AiOutlineClockCircle className="me-1" />
                              {post.readTime} min read
                            </span>
                            <span>
                              <AiOutlineEye className="me-1" />
                              {post.views.toLocaleString()} views
                            </span>
                          </div>
                          <div className="post-tags">
                            {post.tags.slice(0, 3).map((tag, tagIndex) => (
                              <Badge key={tagIndex} bg="secondary" className="tag-badge">
                                {tag}
                              </Badge>
                            ))}
                            {post.tags.length > 3 && (
                              <Badge bg="secondary" className="tag-badge">
                                +{post.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                        </Card.Body>
                      </Card>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            )}
          </motion.div>
        </motion.div>
      </Container>
    </Container>
  );
};

export default Blog;
