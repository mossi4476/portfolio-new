import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hello everyone! I am <span className="purple">Nguyen Tien Dung</span>, a DevOps Engineer and Backend Developer.
            <br />
            Currently, I work at a technology company where I have the opportunity to develop my skills and passion in the tech field.
            <br />
            I have completed my studies in Software Engineering and have extensive experience in backend development.
            <br />
            <br />
            Besides coding, I also enjoy engaging in various activities to enrich my life!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Games
            </li>
            <li className="about-activity">
              <ImPointRight /> Writing Tech Blogs
            </li>
            <li className="about-activity">
              <ImPointRight /> Traveling
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Strive to create things that make a difference!"{" "}
          </p>
          <footer className="blockquote-footer">Nguyen Tien Dung</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
