import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import hotelManagementImg from "../assets/img/hotel-management.png";
import industrialFurnaceImg from "../assets/img/industrial-furnace.jpg";
import agroAiImg from "../assets/img/agro-ai.png";
import skillGapImg from "../assets/img/skill-gap.png";
import zedValidatorImg from "../assets/img/zed-validator.png";
import clashOfClansImg from "../assets/img/clash-of-clans.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {

  const projects = [
    {
      title: "Hotel Management System",
      description: "Full Stack & Web Booking Platform",
      imgUrl: hotelManagementImg,
      url: "https://github.com/Vedantpoman12/Hotel-Management-system",
    },
    {
      title: "Industrial Furnace Automation",
      description: "Computer Vision & Real-Time AI Anomaly Detection",
      imgUrl: industrialFurnaceImg,
      url: "https://github.com/Vedantpoman12",
    },
    {
      title: "Agro Ai",
      description: "Crop Disease Diagnosis with Gemini AI & Next.js",
      imgUrl: agroAiImg,
      url: "https://github.com/Vedantpoman12",
    },
    {
      title: "ZED Compliance Validator",
      description: "Document AI Pipeline with OCR & FAISS RAG",
      imgUrl: zedValidatorImg,
      url: "https://github.com/Vedantpoman12",
    },
    {
      title: "Skill Gap Bridge",
      description: "Education & Career Readiness Platform",
      imgUrl: skillGapImg,
      url: "https://github.com/Vedantpoman12/Skill-Gap-Bridge",
    },
    {
      title: "ProjectClash",
      description: "Interactive Clan Strategy & Defense Analytics",
      imgUrl: clashOfClansImg,
      url: "https://github.com/Vedantpoman12",
    },
  ];

  const webCloudProjects = [
    {
      title: "Hotel Management System",
      description: "Full Stack & Web Booking Platform",
      imgUrl: hotelManagementImg,
      url: "https://github.com/Vedantpoman12/Hotel-Management-system",
    },
    {
      title: "Skill Gap Bridge",
      description: "Education & Career Readiness Platform",
      imgUrl: skillGapImg,
      url: "https://github.com/Vedantpoman12/Skill-Gap-Bridge",
    },
    {
      title: "ProjectClash",
      description: "Interactive Clan Strategy & Defense Analytics",
      imgUrl: clashOfClansImg,
      url: "https://github.com/Vedantpoman12",
    },
    {
      title: "Azure Cloud System",
      description: "Cloud Computing & Azure Infrastructure",
      imgUrl: industrialFurnaceImg,
      url: "https://github.com/Vedantpoman12/Azure-Exp2",
    },
    {
      title: "MongoDB Atlas Service",
      description: "Cloud Database Architecture & Python API",
      imgUrl: hotelManagementImg,
      url: "https://github.com/Vedantpoman12/atlas-exp3",
    },
    {
      title: "Personal Portfolio Site",
      description: "Responsive Web & UI Engineering",
      imgUrl: skillGapImg,
      url: "https://github.com/Vedantpoman12/Vedantpoman12.github.io",
    },
  ];

  const aiSystemsProjects = [
    {
      title: "Industrial Furnace Automation",
      description: "Computer Vision & Real-Time AI Anomaly Detection",
      imgUrl: industrialFurnaceImg,
      url: "https://github.com/Vedantpoman12",
    },
    {
      title: "Agro Ai Platform",
      description: "Crop Disease Diagnosis with Gemini AI & Next.js",
      imgUrl: agroAiImg,
      url: "https://github.com/Vedantpoman12",
    },
    {
      title: "ZED Compliance Validator",
      description: "Document AI Pipeline with OCR & FAISS RAG",
      imgUrl: zedValidatorImg,
      url: "https://github.com/Vedantpoman12",
    },
    {
      title: "ProjectClash",
      description: "Interactive Clan Strategy & Defense Analytics",
      imgUrl: clashOfClansImg,
      url: "https://github.com/Vedantpoman12",
    },
    {
      title: "Self AI Assistant",
      description: "Intelligent Agent & Machine Learning",
      imgUrl: agroAiImg,
      url: "https://github.com/Vedantpoman12/self-ai-",
    },
    {
      title: "Java Systems App",
      description: "Core Java Applications & Services",
      imgUrl: industrialFurnaceImg,
      url: "https://github.com/Vedantpoman12/Experiment-7",
    },
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Projects</h2>
                <p>Explore projects developed by Vedant Poman, ranging from full-stack web applications and cloud deployments on Azure to intelligent AI systems and database architectures.</p>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Tab 1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Tab 2</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Tab 3</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                      <Row>
                        {
                          projects.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <Row>
                        {
                          webCloudProjects.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <Row>
                        {
                          aiSystemsProjects.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2} alt="Background decoration" />
    </section>
  )
}
