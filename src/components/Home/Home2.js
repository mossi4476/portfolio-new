import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import { AiFillGithub, AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              I fell in love with programming, and I think I've learned a thing or two... or maybe just a few bugs! 🤷‍♂️
              <br />
              <br />I’m fluent in classics like
              <i>
                <b className="purple"> C++, JavaScript, and Go. </b>
              </i>
              <br />
              <br />
              My interests lie in the realms of <b className="purple">DevOps</b> and <b className="purple">backend development</b>, where I enjoy building robust systems and automating workflows.
              <br />
              <br />
              I also love diving into new &nbsp;
              <i>
                <b className="purple">Web Technologies and Products </b> and exploring the exciting world of{" "}
                <b className="purple">Blockchain.</b>
              </i>
              <br />
              <br />
              Whenever possible, I channel my passion into developing products with <b className="purple">Node.js</b> and
              <i>
                <b className="purple"> Modern JavaScript Libraries and Frameworks</b>
              </i>
              &nbsp; like
              <i>
                <b className="purple"> React.js and Next.js</b>
              </i>
              . Because who doesn’t love a good framework, right?
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span> with me, I promise I don't bite!
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/mossi4476"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/tien-dung-mossi/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Home2;
