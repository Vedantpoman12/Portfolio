import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/img/logo.svg";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIconGitHub from "../assets/img/nav-icon-github.svg";
import navIconResume from "../assets/img/nav-icon-resume.svg";

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <Col size={12} sm={6}>
            <img src={logo} alt="Logo" />
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end">
            <div className="social-icon">
              <a href="https://github.com/Vedantpoman12" target="_blank" rel="noreferrer" title="GitHub"><img src={navIconGitHub} alt="GitHub" /></a>
              <a href="https://github.com/Vedantpoman12" target="_blank" rel="noreferrer" title="LinkedIn"><img src={navIcon1} alt="LinkedIn" /></a>
              <a href="/resume.html" target="_blank" rel="noreferrer" title="Resume"><img src={navIconResume} alt="Resume" /></a>
            </div>
            <p>© {new Date().getFullYear()} Vedant Poman. All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
