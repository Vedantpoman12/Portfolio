import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function useFadeUp(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
}

const FadeUp = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  useFadeUp(ref);
  return (
    <div ref={ref} className="fade-up" style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const projects = [
  {
    number: 'PROJECT_01',
    name: 'AGRO AI',
    category: 'CATEGORY: COMPUTER VISION & GEMINI AI',
    desc: 'Agricultural plant disease detection platform using Google Gemini and computer vision. Provides real-time diagnosis from leaf images to help farmers identify and act on crop diseases early, featuring multilingual voice assistance (TTS) and smart farming recommendations.',
    tags: ['NEXT.JS', 'FLASK', 'MONGODB', 'GEMINI AI', 'LANGCHAIN'],
    focus: 'CORE FOCUS // REAL-TIME CROP DISEASE CLASSIFICATION',
    github: 'https://github.com/Vedantpoman12',
    techSpecs: [
      { label: 'STATUS', value: 'ACTIVE // PRODUCTION_TESTED' },
      { label: 'INFERENCE', value: 'GEMINI 1.5 MULTIMODAL API' },
      { label: 'FEATURES', value: 'TTS VOICE · REGIONAL LANGUAGES' },
      { label: 'DEPLOYMENT', value: 'VERCEL / CLOUD RUN' },
    ],
  },
  {
    number: 'PROJECT_02',
    name: 'INDUSTRIAL FURNACE MONITOR',
    category: 'CATEGORY: IOT & INDUSTRIAL AUTOMATION',
    desc: 'Automated computer vision system engineered during internship at Swastik Furnaces. Uses camera sensors and AI models to monitor industrial furnaces, detect metal burning/overheating in real-time, and trigger an automated safety-stop protocol.',
    tags: ['PYTHON', 'OPENCV', 'REACT', 'WEBSOCKETS', 'IOT'],
    focus: 'CORE FOCUS // REAL-TIME ANOMALY DETECTION & SAFETY STOP',
    github: 'https://github.com/Vedantpoman12',
    techSpecs: [
      { label: 'STATUS', value: 'DEPLOYED AT SWASTIK FURNACES' },
      { label: 'SAFETY_LOGIC', value: 'INSTANT MACHINERY HALT' },
      { label: 'CYCLE_LOGIC', value: 'AUTOMATED BATCH PURGE & LOAD' },
      { label: 'LATENCY', value: 'SUB-SECOND SENSOR INFERENCE' },
    ],
  },
  {
    number: 'PROJECT_03',
    name: 'ZED COMPLIANCE VALIDATOR',
    category: 'CATEGORY: DEV TOOLS & RAG',
    desc: 'Architected an AI assistant to automate ZED Bronze certification by validating PAN, Aadhaar, and GST documents. Engineered a high-precision OCR pipeline using Tesseract and Poppler with 100% data privacy via FAISS and Ollama local LLMs.',
    tags: ['FLASK', 'PYTHON', 'RAG', 'FAISS', 'OLLAMA', 'TESSERACT'],
    focus: 'CORE FOCUS // LOCAL PRIVACY RAG & OCR VERIFICATION',
    github: 'https://github.com/Vedantpoman12',
    techSpecs: [
      { label: 'STATUS', value: 'ACTIVE // PRIVACY_COMPLIANT' },
      { label: 'OCR_ENGINE', value: 'TESSERACT + POPPLER' },
      { label: 'VECTOR_STORE', value: 'FAISS LOCAL EMBEDDINGS' },
      { label: 'DATA_PRIVACY', value: '100% LOCAL (NO CLOUD LEAK)' },
    ],
  },
  {
    number: 'PROJECT_04',
    name: 'HOTEL MANAGEMENT SYSTEM',
    category: 'CATEGORY: FULL-STACK WEB',
    desc: 'Full-stack hotel management system with booking workflows, room tracking, guest management, and a complete admin dashboard. Built with the MERN stack for high reliability and throughput.',
    tags: ['REACT', 'MONGODB', 'EXPRESS', 'NODE.JS', 'JWT'],
    focus: 'CORE FOCUS // END-TO-END BOOKING WORKFLOWS',
    github: 'https://github.com/Vedantpoman12',
    techSpecs: [
      { label: 'STATUS', value: 'OPEN_SOURCE // GITHUB' },
      { label: 'AUTH', value: 'JWT + ROLE-BASED ACCESS' },
      { label: 'STATE', value: 'REDUX TOOLKIT / REAL-TIME' },
      { label: 'DATABASE', value: 'MONGODB ATLAS' },
    ],
  },
  {
    number: 'PROJECT_05',
    name: 'SKILL GAP ANALYZER',
    category: 'CATEGORY: AI / CAREER TECH',
    desc: 'AI-powered skill gap analysis tool that compares a user\'s current skills against job market demands and generates a personalized learning roadmap using NLP and data-driven skill mappings.',
    tags: ['PYTHON', 'NLTK', 'REACT', 'FASTAPI', 'SCIKIT-LEARN'],
    focus: 'CORE FOCUS // PERSONALIZED ROADMAP GENERATION',
    github: 'https://github.com/Vedantpoman12/Skill-Gap-Bridge',
    techSpecs: [
      { label: 'STATUS', value: 'COMPLETED // PROTOTYPE' },
      { label: 'ENGINE', value: 'FASTAPI + NLTK VECTORIZER' },
      { label: 'MAPPING', value: 'DYNAMIC MARKET DEMAND MATRIX' },
      { label: 'OUTPUT', value: 'STEP-BY-STEP LEARNING PATH' },
    ],
  },
  {
    number: 'PROJECT_06',
    name: 'RESCUERADAR',
    category: 'CATEGORY: AI / ANIMAL WELFARE',
    desc: 'Platform that leverages AI and modern web technologies to create a comprehensive ecosystem for animal welfare. Features AI-powered triage, intake management, health monitoring, and real-time coordination tools for rescue organizations.',
    tags: ['PYTHON', 'AI', 'WEB', 'FLASK', 'MACHINE LEARNING'],
    focus: 'CORE FOCUS // AI TRIAGE & ANIMAL WELFARE COORDINATION',
    github: 'https://github.com/Vedantpoman12',
    techSpecs: [
      { label: 'STATUS', value: 'ACTIVE // IN DEVELOPMENT' },
      { label: 'AI_MODEL', value: 'TRIAGE CLASSIFICATION ENGINE' },
      { label: 'STACK', value: 'PYTHON · AI · WEB PLATFORM' },
      { label: 'UPDATED', value: 'DEC 2025' },
    ],
  },
];

export const ProjectsPage = () => {
  return (
    <>
      {/* ── PAGE HERO ────────────────────────── */}
      <section className="page-hero dot-grid-bg">
        <div className="page-hero-inner">
          <FadeUp>
            <div className="page-hero-subtitle">PROJECT ARCHIVES // VEDANT POMAN</div>
          </FadeUp>
          <FadeUp delay={80}>
            <h1 className="page-hero-title">
              PROJECT<br />
              <span className="outlined">ARCHIVES</span>
            </h1>
          </FadeUp>
          <FadeUp delay={140}>
            <div className="page-hero-cat">
              WEB SYSTEMS // AI SYSTEMS // COMPUTER VISION // FULLSTACK PROJECTS
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── PROJECTS LIST ─────────────────────── */}
      <div className="projects-list">
        {projects.map((p, i) => (
          <FadeUp key={i} delay={i * 60}>
            <div className="project-row cursor-target">
              {/* Left info */}
              <div className="project-row-left">
                <span className="project-number">{p.number}</span>
                <div className="project-row-name">{p.name}</div>
                <div className="project-row-category">{p.category}</div>
                <p className="project-row-desc">{p.desc}</p>
                <div className="project-row-tags">
                  {p.tags.map((t) => <span key={t} className="tech-tag">{t}</span>)}
                </div>
                <div className="project-row-focus">
                  CORE FOCUS // <em>{p.focus.replace('CORE FOCUS // ', '')}</em>
                </div>
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="project-github-link"
                >
                  OPEN_GITHUB →
                </a>
              </div>

              {/* Right technical spec terminal */}
              <div className="project-row-right">
                <div className="project-spec-terminal">
                  <div className="terminal-header">
                    <div className="terminal-dots">
                      <span className="terminal-dot red"></span>
                      <span className="terminal-dot yellow"></span>
                      <span className="terminal-dot green"></span>
                    </div>
                    <span className="terminal-title">SYS_ARCH // {p.name.replace(/\s+/g, '_')}</span>
                  </div>
                  <div className="terminal-body">
                    {p.techSpecs.map((spec, sIdx) => (
                      <div key={sIdx} className="terminal-spec-line">
                        <span className="spec-label">{spec.label}:</span>
                        <span className="spec-value">{spec.value}</span>
                      </div>
                    ))}
                    <div className="terminal-spec-line prompt-line">
                      <span className="spec-prompt">$</span>
                      <span className="spec-command">vedant --inspect {p.number.toLowerCase()}</span>
                    </div>
                    <div className="terminal-output-ok">
                      [OK] ALL SYSTEMS VALIDATED // 0 ERRORS
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>

      {/* ── BUILD CTA ─────────────────────────── */}
      <section className="projects-build-cta">
        <div className="cta-inner">
          <FadeUp>
            <div className="cta-big-text">
              LET'S<br />BUILD<br />
              <span className="outline">SOMETHING</span>
            </div>
          </FadeUp>
          <FadeUp delay={80}>
            <div className="cta-actions">
              <Link to="/contact" className="btn-primary-brutal">
                START A CONVERSATION →
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
};
