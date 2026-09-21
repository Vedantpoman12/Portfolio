import { useState, useEffect } from 'react';
import RisingLines from './RisingLines';
import './IntroScreen.css';

// Duration the intro plays before fading out (ms)
const INTRO_DURATION = 3200;
const FADE_DURATION = 900;

const IntroScreen = ({ onComplete }) => {
  const [phase, setPhase] = useState('visible'); // 'visible' | 'fading' | 'done'

  useEffect(() => {
    const fadeTimer = setTimeout(() => setPhase('fading'), INTRO_DURATION);
    const doneTimer = setTimeout(() => {
      setPhase('done');
      onComplete?.();
    }, INTRO_DURATION + FADE_DURATION);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div className={`intro-screen ${phase === 'fading' ? 'intro-fading' : ''}`}>
      {/* Rising Lines fills entire screen */}
      <RisingLines />

      {/* Centered name reveal */}
      <div className="intro-content">
        <div className="intro-name">
          <span className="intro-first">VEDANT</span>
          <span className="intro-last">POMAN</span>
        </div>
        <div className="intro-role">FULL-STACK · AI/ML · COMPUTER VISION</div>
      </div>

      {/* Bottom scanline */}
      <div className="intro-scanline" />
    </div>
  );
};

export default IntroScreen;
