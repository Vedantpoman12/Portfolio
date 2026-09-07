import { Container, Row, Col } from "react-bootstrap";
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
                <Row>
                  {projects.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                  ))}
                </Row>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2} alt="Background decoration" />
    </section>
  );
};
