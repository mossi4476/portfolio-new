import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import monolithImage from "../../Assets/Projects/picture1.webp";
import awsLambdaImage from "../../Assets/Projects/picture2.webp";
import moviePipelineImage from "../../Assets/Projects/picture1.webp";
import designAvailabilityImage from "../../Assets/Projects/picture2.webp";
import designPerformanceImage from "../../Assets/Projects/picture3.webp";
import designSecurityImage from "../../Assets/Projects/picture2.webp";
import fullStackAWSImage from "../../Assets/Projects/picture3.webp";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={monolithImage}
              isBlog={false}
              title="Monolith to Microservice"
              description="A project that demonstrates the transition from a monolithic architecture to microservices."
              ghLink="https://github.com/mossi4476/A_MonolithToMicroservice"
              demoLink=""
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={awsLambdaImage}
              isBlog={false}
              title="Deploy Application with AWS Lambda"
              description="A project that showcases how to deploy applications using AWS Lambda."
              ghLink="https://github.com/mossi4476/Deploy-Application-with-AWS-Lambda"
              demoLink=""
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={moviePipelineImage}
              isBlog={false}
              title="Movie Picture Pipeline"
              description="A project focused on automating development workflows for a movie catalog application."
              ghLink="https://github.com/mossi4476/Movie-picture-pipeline"
              demoLink=""
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={designAvailabilityImage}
              isBlog={false}
              title="Design for Availability, Resilience, Reliability"
              description="A project template for designing systems with high availability and resilience."
              ghLink="https://github.com/mossi4476/nd063-c2-design-for-availability-resilience-reliability-replacement-project-starter-template"
              demoLink=""
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={designPerformanceImage}
              isBlog={false}
              title="Design for Performance and Scalability"
              description="A project template focused on performance and scalability in system design."
              ghLink="https://github.com/mossi4476/design-for-performance-and-scalability"
              demoLink=""
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={designSecurityImage}
              isBlog={false}
              title="Design for Security"
              description="A project template focused on security in system design."
              ghLink="https://github.com/mossi4476/nd063-c3-design-for-security-project-starter"
              demoLink=""
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={fullStackAWSImage}
              isBlog={false}
              title="Full Stack Apps on AWS"
              description="A project showcasing full stack applications deployed on AWS."
              ghLink="https://github.com/mossi4476/Full-stack-Apps-AWS"
              demoLink=""
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
