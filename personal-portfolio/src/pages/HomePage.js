import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Simple fade-in-up hook
function useFadeUp(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.1 }
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

export const HomePage = () => {
  const projects = [
    {
      number: 'PROJECT_01',
      category: 'AI & COMPUTER VISION',
      name: 'AGRO AI',
      desc: 'AI platform using Google Gemini and computer vision for real-time crop disease diagnosis. Integrated multilingual voice assistance (TTS) and smart farming recommendations.',
      tags: ['NEXT.JS', 'FLASK', 'MONGODB', 'GEMINI AI', 'LANGCHAIN'],
      github: 'https://github.com/Vedantpoman12',
    },
    {
      number: 'PROJECT_02',
      category: 'IOT & INDUSTRIAL AUTOMATION',
      name: 'INDUSTRIAL MONITOR',
      desc: 'Automated computer vision system engineered during internship at Swastik Furnaces. Monitors industrial furnaces, detects metal burning in real-time, and triggers instant safety-stops.',
      tags: ['PYTHON', 'OPENCV', 'REACT', 'WEBSOCKETS', 'IOT'],
      github: 'https://github.com/Vedantpoman12',
    },
    {
      number: 'PROJECT_03',
      category: 'DEV TOOLS & RAG',
      name: 'ZED VALIDATOR',
      desc: 'AI assistant to automate ZED Bronze certification by validating government documents (PAN, Aadhaar, GST) with a high-precision OCR pipeline and local privacy-first LLM RAG.',
      tags: ['FLASK', 'PYTHON', 'RAG', 'FAISS', 'OLLAMA', 'TESSERACT'],
      github: 'https://github.com/Vedantpoman12',
    },
  ];

  return (
    <>
      {/* ── HERO ─────────────────────────────── */}
      <section className="hero dot-grid-bg" id="home">
        <div className="hero-bg-text" aria-hidden="true">VEDANT</div>
        <div className="hero-inner">
          <div className="hero-left">
            <FadeUp delay={0}>
              <span className="hero-tag">FULL-STACK DEVELOPER</span>
            </FadeUp>
            <FadeUp delay={80}>
              <h1 className="hero-name">
                VEDANT
                <br />
                <span className="outlined">POMAN</span>
              </h1>
            </FadeUp>
            <FadeUp delay={160}>
              <p className="hero-desc">
                Third-year B.Tech student at Atlas Skilltech University building full-stack web apps, AI systems, and computer vision tools. Bridging the gap between intelligent algorithms and production-ready software.
              </p>
            </FadeUp>
            <FadeUp delay={220}>
              <div className="hero-badges">
                <span className="hero-badge">90+ GITHUB STARS</span>
                <span className="hero-badge">AI / ML SYSTEMS</span>
                <span className="hero-badge">COMPUTER VISION</span>
                <span className="hero-badge">REACT + NEXT.JS</span>
              </div>
            </FadeUp>
            <FadeUp delay={280}>
              <div className="hero-location">◎ CURRENTLY BUILDING // MUMBAI, INDIA</div>
            </FadeUp>
          </div>

          <div className="hero-right">
            <FadeUp delay={120}>
              <div className="hero-right-inner" data-label="01. DEVELOPMENT">
                <p className="hero-right-text">
                  Engineering <strong>scalable full-stack applications</strong> — from agricultural AI tools to industrial monitoring dashboards — designed to deliver value from day one.
                </p>
                <div className="hero-right-cta">◎ CURRENTLY AT ATLAS SKILLTECH UNIVERSITY</div>
              </div>
            </FadeUp>
            <FadeUp delay={200}>
              <div className="hero-right-inner" data-label="02. AI & ML">
                <p className="hero-right-text">
                  Building <strong>Computer Vision pipelines</strong>, <em style={{color:'rgba(255,255,255,0.8)'}}>Recommendation Systems</em>, and Domain-specific AI applications backed by real-time data and clean APIs.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── FOCUS AREAS ───────────────────────── */}
      <section className="focus-section">
        <FadeUp>
          <div className="focus-inner">
            <div className="focus-card">
              <div className="focus-label">01. DEVELOPMENT // PRIMARY</div>
              <div className="focus-title">
                FULL-STACK
                <span className="slash-tag">{'//'} WEB</span>
              </div>
              <p className="focus-desc">
                Engineering <em>performant web platforms</em> — React frontends, Node.js backends, MongoDB/PostgreSQL databases — from architecture to deployment.
              </p>
            </div>
            <div className="focus-card">
              <div className="focus-label">02. AI & ML // RESEARCH</div>
              <div className="focus-title">
                AI SYSTEMS
                <span className="slash-tag">{'//'} RESEARCH</span>
              </div>
              <p className="focus-desc">
                Building <em>Computer Vision models</em>, classification pipelines, and data-driven intelligence systems backed by real-world experimentation.
              </p>
            </div>
            <div className="focus-location">
              ◎ CURRENTLY BUILDING // MUMBAI, INDIA
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ── FEATURED PROJECTS ─────────────────── */}
      <section className="featured-projects" id="projects">
        <div className="section-header">
          <span className="section-title">FEATURED WORK</span>
          <Link to="/projects" className="section-link">VIEW ALL PROJECTS →</Link>
        </div>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <FadeUp key={i} delay={i * 80}>
              <div className="project-card-home">
                <div className="project-card-top-bar">
                  <span className="project-index">{p.number}</span>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="project-ext-icon-btn"
                    aria-label={`View ${p.name} on GitHub`}
                    title="View Source on GitHub"
                  >
                    ↗
                  </a>
                </div>
                <div className="project-card-body">
                  <div className="project-category-tag">{p.category}</div>
                  <div className="project-name">{p.name}</div>
                  <p className="project-desc">{p.desc}</p>
                  <div className="project-tech-tags">
                    {p.tags.map((t) => <span key={t} className="tech-tag">{t}</span>)}
                  </div>
                </div>
                <div className="project-card-bottom">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="project-open-link"
                  >
                    OPEN_GITHUB <span>→</span>
                  </a>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── TECH STACK ────────────────────────── */}
      <section className="tech-stack-section">
        <div className="tech-stack-inner">
          <FadeUp>
            <div className="tech-stack-heading">
              <h2>
                <span>TECH </span>
                <span className="outline-text">STACK</span>
              </h2>
            </div>
          </FadeUp>
          <FadeUp delay={80}>
            <div className="tech-columns">
              {/* Column 1 — Development */}
              <div className="tech-column">
                <div className="tech-column-header">DEVELOPMENT // CLOUD</div>
                <div className="tech-column-title"><h3>FULLSTACK</h3></div>
                <div className="tech-fullwidth">
                  <div className="tech-fullwidth-label">OPERATIONAL STACK // B.TECH</div>
                  <div className="tech-fullwidth-text">
                    DELIVERING<br />PRODUCTION-READY<br />WEB APPLICATIONS<br />FROM ARCHITECTURE<br />TO DEPLOYMENT.
                  </div>
                </div>
                <div className="tech-items">
                  <div className="tech-item">React</div>
                  <div className="tech-item">Next.js</div>
                  <div className="tech-item">Node.js</div>
                  <div className="tech-item">Express</div>
                  <div className="tech-item">MongoDB</div>
                  <div className="tech-item">PostgreSQL</div>
                </div>
              </div>

              {/* Column 2 — AI & ML */}
              <div className="tech-column">
                <div className="tech-column-header">RESEARCH // AI & DATA</div>
                <div className="tech-column-title"><h3>AI & ML</h3></div>
                <div className="tech-items" style={{ gridTemplateColumns: '1fr' }}>
                  <div className="tech-item">Python</div>
                  <div className="tech-item">TensorFlow</div>
                  <div className="tech-item">OpenCV</div>
                  <div className="tech-item">Scikit-learn</div>
                  <div className="tech-item">Pandas / NumPy</div>
                  <div className="tech-item">Jupyter</div>
                </div>
              </div>

              {/* Column 3 — Tools */}
              <div className="tech-column">
                <div className="tech-column-header">TOOLS // WORKFLOW</div>
                <div className="tech-column-title"><h3>TOOLCHAIN</h3></div>
                <div className="tech-items" style={{ gridTemplateColumns: '1fr' }}>
                  <div className="tech-item">Git / GitHub</div>
                  <div className="tech-item">Docker</div>
                  <div className="tech-item">AWS</div>
                  <div className="tech-item">TypeScript</div>
                  <div className="tech-item">Tailwind CSS</div>
                  <div className="tech-item">Figma</div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────── */}
      <section className="cta-section">
        <div className="cta-inner">
          <FadeUp>
            <div className="cta-big-text">
              LET'S<br />
              BUILD<br />
              <span className="outline">SOMETHING</span>
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <div className="cta-actions">
              <Link to="/contact" className="btn-primary-brutal">
                GET IN TOUCH →
              </Link>
              <Link to="/projects" className="btn-secondary-brutal">
                VIEW PROJECTS
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
};
