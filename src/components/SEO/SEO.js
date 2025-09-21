import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = "Nguyen Tien Dung - Full Stack Developer & DevOps Engineer",
  description = "Experienced Full Stack Developer and DevOps Engineer specializing in modern web technologies, cloud architecture, and scalable solutions. Expert in React, Node.js, AWS, Docker, and Kubernetes.",
  keywords = "Full Stack Developer, DevOps Engineer, React Developer, Node.js, AWS, Docker, Kubernetes, JavaScript, TypeScript, Python, Cloud Architecture, Microservices, Web Development, Software Engineer, Ho Chi Minh City, Vietnam",
  author = "Nguyen Tien Dung",
  url = "https://your-domain.com",
  image = "https://your-domain.com/og-image.jpg",
  type = "website",
  siteName = "Nguyen Tien Dung Portfolio",
  twitterHandle = "@your-twitter",
  canonicalUrl,
  noindex = false,
  nofollow = false,
  structuredData
}) => {
  const fullTitle = title.includes('Nguyen Tien Dung') ? title : `${title} | Nguyen Tien Dung`;
  const currentUrl = canonicalUrl || url;

  // Default structured data
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Nguyen Tien Dung",
    "jobTitle": "Full Stack Developer & DevOps Engineer",
    "description": description,
    "url": url,
    "image": image,
    "sameAs": [
      "https://github.com/mossi4476",
      "https://linkedin.com/in/your-profile",
      "https://dev.to/mossi4476"
    ],
    "knowsAbout": [
      "Full Stack Development",
      "DevOps Engineering",
      "React.js",
      "Node.js",
      "AWS",
      "Docker",
      "Kubernetes",
      "JavaScript",
      "TypeScript",
      "Python",
      "Cloud Architecture",
      "Microservices"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ho Chi Minh City",
      "addressCountry": "Vietnam"
    }
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content={`${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      {twitterHandle && <meta property="twitter:creator" content={twitterHandle} />}
      
      {/* Additional SEO Tags */}
      <meta name="theme-color" content="#c770f0" />
      <meta name="msapplication-TileColor" content="#c770f0" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link rel="preconnect" href="https://api.github.com" />
      
      {/* DNS Prefetch for external resources */}
      <link rel="dns-prefetch" href="https://github.com" />
      <link rel="dns-prefetch" href="https://linkedin.com" />
      <link rel="dns-prefetch" href="https://dev.to" />
    </Helmet>
  );
};

// Predefined SEO configurations for different pages
export const HomePageSEO = () => (
  <SEO
    title="Nguyen Tien Dung - Full Stack Developer & DevOps Engineer"
    description="Welcome to my portfolio! I'm a passionate Full Stack Developer and DevOps Engineer with expertise in modern web technologies, cloud architecture, and scalable solutions."
    type="website"
  />
);

export const AboutPageSEO = () => (
  <SEO
    title="About Me - Nguyen Tien Dung"
    description="Learn more about my journey as a Full Stack Developer and DevOps Engineer. Discover my skills, experience, and passion for creating innovative digital solutions."
    type="profile"
  />
);

export const ProjectsPageSEO = () => (
  <SEO
    title="Projects - Nguyen Tien Dung"
    description="Explore my portfolio of projects including microservices architecture, AWS deployments, full-stack applications, and DevOps solutions."
    keywords="Projects, Portfolio, Microservices, AWS, Full Stack Applications, DevOps, React Projects, Node.js Projects"
  />
);

export const ContactPageSEO = () => (
  <SEO
    title="Contact Me - Nguyen Tien Dung"
    description="Get in touch with me for collaboration opportunities, project discussions, or professional inquiries. Let's build something amazing together!"
    keywords="Contact, Hire Developer, Full Stack Developer, DevOps Engineer, Collaboration, Project Inquiry"
  />
);

export const BlogPageSEO = () => (
  <SEO
    title="Blog - Nguyen Tien Dung"
    description="Read my latest articles about web development, DevOps practices, cloud technologies, and software engineering insights."
    keywords="Blog, Web Development, DevOps, Cloud Technologies, Software Engineering, Technical Articles, Programming Tutorials"
  />
);

export const ResumePageSEO = () => (
  <SEO
    title="Resume - Nguyen Tien Dung"
    description="View and download my professional resume highlighting my experience as a Full Stack Developer and DevOps Engineer."
    keywords="Resume, CV, Full Stack Developer Resume, DevOps Engineer Resume, Professional Experience, Skills"
  />
);

export default SEO;
