import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

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

const EMAIL = 'vedantpoman12@gmail.com';
const SERVICE_ID = 'service_yfqrzkq';
const TEMPLATE_ID = 'template_ghkzdbw';
const PUBLIC_KEY = 'PYAfMsqIAjMdPnkAK';

export const ContactPage = () => {
  const [copied, setCopied] = useState(false);
  const [formDetails, setFormDetails] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [buttonText, setButtonText] = useState('TRANSMIT_MESSAGE →');
  const [status, setStatus] = useState(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText('TRANSMITTING...');
    setStatus(null);

    const nameParts = formDetails.name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const templateParams = {
      from_name: formDetails.name,
      name: formDetails.name,
      firstName: firstName,
      lastName: lastName,
      email: formDetails.email,
      from_email: formDetails.email,
      reply_to: formDetails.email,
      phone: formDetails.phone || 'Not provided',
      message: formDetails.message,
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      setStatus({
        success: true,
        message: 'TRANSMISSION RECEIVED. THANK YOU FOR REACHING OUT — I WILL GET BACK TO YOU PROMPTLY.',
      });
      setFormDetails({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus({
        success: false,
        message: 'TRANSMISSION FAILED. PLEASE REACH OUT DIRECTLY AT VEDANTPOMAN12@GMAIL.COM',
      });
    } finally {
      setButtonText('TRANSMIT_MESSAGE →');
    }
  };

  return (
    <div className="contact-page" style={{ background: '#f5f5f0' }}>
      <div className="contact-page-inner">

        {/* ── LEFT: Profile / Transmission Form ───────────────── */}
        <div className="contact-photo-col">
          <FadeUp>
            <div className="contact-photo-box">
              <div className="contact-photo-placeholder">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="1.2">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
                <span>VEDANT POMAN // PROFILE</span>
              </div>
              <div className="contact-photo-label">VEDANT POMAN</div>
            </div>
          </FadeUp>

          {/* Direct Transmission Form */}
          <FadeUp delay={100}>
            <div className="contact-form-card">
              <div className="contact-form-header">
                <span className="contact-form-tag">{'//'} DIRECT TRANSMISSION</span>
                <span className="contact-form-status">EMAILJS_READY</span>
              </div>
              <form onSubmit={handleSubmit} className="brutal-contact-form">
                <div className="form-group-brutal">
                  <label htmlFor="contact-name">{'//'} YOUR_NAME</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={formDetails.name}
                    onChange={(e) => onFormUpdate('name', e.target.value)}
                  />
                </div>
                <div className="form-group-brutal">
                  <label htmlFor="contact-email">{'//'} YOUR_EMAIL</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formDetails.email}
                    onChange={(e) => onFormUpdate('email', e.target.value)}
                  />
                </div>
                <div className="form-group-brutal">
                  <label htmlFor="contact-phone">{'//'} CONTACT_NO (OPTIONAL)</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    placeholder="+91 / Phone number"
                    value={formDetails.phone}
                    onChange={(e) => onFormUpdate('phone', e.target.value)}
                  />
                </div>
                <div className="form-group-brutal">
                  <label htmlFor="contact-message">{'//'} MESSAGE</label>
                  <textarea
                    id="contact-message"
                    rows="4"
                    required
                    placeholder="Write your message or inquiry..."
                    value={formDetails.message}
                    onChange={(e) => onFormUpdate('message', e.target.value)}
                  ></textarea>
                </div>
                <button type="submit" className="contact-form-submit-btn">
                  {buttonText}
                </button>
                {status && (
                  <div className={`form-status-msg ${status.success ? 'status-ok' : 'status-err'}`}>
                    {status.message}
                  </div>
                )}
              </form>
            </div>
          </FadeUp>
        </div>

        {/* ── RIGHT: Info ───────────────── */}
        <div className="contact-info-col">
          <FadeUp>
            <span className="contact-badge">CONTACT // COLLABORATION</span>
          </FadeUp>

          <FadeUp delay={80}>
            <h1 className="contact-title">
              CON<span className="outline">TACT</span>
            </h1>
          </FadeUp>

          <FadeUp delay={120}>
            <div className="contact-divider" />
          </FadeUp>

          <FadeUp delay={160}>
            <p className="contact-tagline">
              BUILDING SYSTEMS WHERE <strong>CORRECTNESS</strong> MATTERS.
              OPEN TO CONVERSATIONS AROUND FULL-STACK DEVELOPMENT,
              AI SYSTEMS, AND ENGINEERING OPPORTUNITIES.
            </p>
          </FadeUp>

          {/* Email */}
          <FadeUp delay={200}>
            <div className="contact-field-label">EMAIL</div>
            <div className="contact-email-row">
              <span className="contact-email">
                {EMAIL} <span className="contact-email-arrow">→</span>
              </span>
              <button
                className={`copy-email-btn${copied ? ' copied' : ''}`}
                onClick={handleCopyEmail}
                aria-label="Copy email address"
              >
                {copied
                  ? <><span>✓</span> COPIED</>
                  : <><span>⧉</span> COPY_EMAIL</>
                }
              </button>
            </div>
          </FadeUp>

          {/* Connect */}
          <FadeUp delay={240}>
            <div>
              <span className="connect-label">AVAILABLE FOR COLLABORATION</span>
              <div className="contact-connect-row">
                <span className="connect-title">CONNECT</span>
                <a
                  href="https://www.linkedin.com/in/vedant-poman/"
                  target="_blank"
                  rel="noreferrer"
                  className="connect-arrow-box"
                  aria-label="Connect on LinkedIn"
                >
                  →
                </a>
              </div>
            </div>
          </FadeUp>

          {/* Social boxes */}
          <FadeUp delay={280}>
            <div className="contact-socials">
              <a
                href="https://www.linkedin.com/in/vedant-poman/"
                target="_blank"
                rel="noreferrer"
                className="social-box"
                id="linkedin-contact-btn"
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <div className="social-box-info">
                  <div className="social-box-name">LINKEDIN</div>
                  <div className="social-box-sub">PROFESSIONAL PROFILE // CONNECT</div>
                </div>
              </a>
              <a
                href="https://github.com/Vedantpoman12"
                target="_blank"
                rel="noreferrer"
                className="social-box"
                id="github-contact-btn"
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                <div className="social-box-info">
                  <div className="social-box-name">GITHUB</div>
                  <div className="social-box-sub">PROJECTS & OPEN SOURCE</div>
                </div>
              </a>
            </div>
          </FadeUp>

          {/* Direct Resume Link Button */}
          <FadeUp delay={300}>
            <div className="contact-resume-block">
              <div className="contact-field-label">CURRICULUM VITAE</div>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="contact-resume-pdf-btn"
              >
                VIEW RESUME PDF [ ↗ ]
              </a>
            </div>
          </FadeUp>

          <FadeUp delay={320}>
            <div className="contact-footer-line">
              <span>MUMBAI // 19.07° N</span>
              <span>END_OF_TRANSMISSION</span>
            </div>
          </FadeUp>
        </div>
      </div>
    </div>
  );
};
