import { useEffect, useRef } from 'react';
import './RisingLines.css';

// Rising Lines — custom WebGL-free canvas recreation
// Matches React Bits Pro config:
//   color="#f3f7ff", horizonColor="#e6e6ed", haloColor="#b5dfff"
//   riseSpeed=0.04, riseScale=9.5, flowSpeed=0.25, flowDensity=2.9
//   flowIntensity=0.4, horizonIntensity=1, haloIntensity=1.5
//   circleScale=0.1, scale=3.9, brightness=2

const CONFIG = {
  color: '#f3f7ff',
  horizonColor: '#e6e6ed',
  haloColor: '#b5dfff',
  riseSpeed: 0.04,
  riseScale: 9.5,
  flowSpeed: 0.25,
  flowDensity: 2.9,
  flowIntensity: 0.4,
  horizonIntensity: 1,
  haloIntensity: 1.5,
  circleScale: 0.1,
  scale: 3.9,
  brightness: 2,
};

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

const RisingLines = () => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H;
    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Generate lines
    const lineCount = Math.floor(CONFIG.flowDensity * 20);
    const lineColor = hexToRgb(CONFIG.color);
    const horizColor = hexToRgb(CONFIG.horizonColor);
    const haloColor = hexToRgb(CONFIG.haloColor);

    const lines = Array.from({ length: lineCount }, (_, i) => ({
      x: (i / lineCount) * 2 - 1,           // normalized -1..1
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.6,
      width: 0.3 + Math.random() * 1.2,
      brightness: 0.3 + Math.random() * 0.7,
      laserProb: Math.random() < 0.15,       // ~15% are laser beams
    }));

    // Particles
    const particleCount = Math.floor(CONFIG.flowDensity * 30);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * 2 - 1,
      y: Math.random(),
      vy: (0.002 + Math.random() * 0.003) * CONFIG.riseSpeed * 25,
      size: 1 + Math.random() * 2,
      opacity: 0.2 + Math.random() * 0.6,
    }));

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Dark background
      ctx.fillStyle = '#000008';
      ctx.fillRect(0, 0, W, H);

      // Horizon glow
      const horizY = H * 0.72;
      const hGrad = ctx.createLinearGradient(0, horizY - H * 0.18, 0, horizY + H * 0.06);
      hGrad.addColorStop(0, `rgba(${horizColor.r},${horizColor.g},${horizColor.b},0)`);
      hGrad.addColorStop(0.5, `rgba(${horizColor.r},${horizColor.g},${horizColor.b},${0.08 * CONFIG.horizonIntensity})`);
      hGrad.addColorStop(1, `rgba(${horizColor.r},${horizColor.g},${horizColor.b},0)`);
      ctx.fillStyle = hGrad;
      ctx.fillRect(0, horizY - H * 0.18, W, H * 0.24);

      // Halo
      const haloGrad = ctx.createRadialGradient(W / 2, horizY, 0, W / 2, horizY, W * 0.55);
      haloGrad.addColorStop(0, `rgba(${haloColor.r},${haloColor.g},${haloColor.b},${0.12 * CONFIG.haloIntensity})`);
      haloGrad.addColorStop(1, `rgba(${haloColor.r},${haloColor.g},${haloColor.b},0)`);
      ctx.fillStyle = haloGrad;
      ctx.fillRect(0, 0, W, H);

      // Draw rising lines
      lines.forEach((line) => {
        const screenX = ((line.x + 1) / 2) * W;

        // Perspective: lines converge toward a horizon point
        const perspX = W / 2 + (screenX - W / 2) * CONFIG.scale * 0.25;

        // Line rises from bottom
        const riseOffset = ((t * CONFIG.riseSpeed * CONFIG.riseScale + line.phase) % 1);
        const topY = H * (1 - riseOffset);
        const bottomY = H + 20;

        const alpha = line.brightness * CONFIG.flowIntensity * CONFIG.brightness * 0.45;
        const lineW = line.width * (CONFIG.scale * 0.15);

        if (line.laserProb) {
          // Laser beam — bright thin line with glow
          const laserPulse = 0.5 + 0.5 * Math.sin(t * 3 + line.phase);
          ctx.save();
          ctx.shadowBlur = 12 * CONFIG.brightness;
          ctx.shadowColor = `rgba(${lineColor.r},${lineColor.g},${lineColor.b},${laserPulse * 0.8})`;

          const grad = ctx.createLinearGradient(perspX, topY, perspX, bottomY);
          grad.addColorStop(0, `rgba(${lineColor.r},${lineColor.g},${lineColor.b},0)`);
          grad.addColorStop(0.2, `rgba(${lineColor.r},${lineColor.g},${lineColor.b},${alpha * laserPulse * 2})`);
          grad.addColorStop(0.7, `rgba(${lineColor.r},${lineColor.g},${lineColor.b},${alpha * laserPulse})`);
          grad.addColorStop(1, `rgba(${lineColor.r},${lineColor.g},${lineColor.b},0)`);

          ctx.beginPath();
          ctx.moveTo(perspX, topY);
          ctx.lineTo(perspX, bottomY);
          ctx.strokeStyle = grad;
          ctx.lineWidth = lineW * 0.6;
          ctx.stroke();
          ctx.restore();
        } else {
          // Normal rising line with fade
          const grad = ctx.createLinearGradient(perspX, topY, perspX, bottomY);
          grad.addColorStop(0, `rgba(${lineColor.r},${lineColor.g},${lineColor.b},0)`);
          grad.addColorStop(0.15, `rgba(${lineColor.r},${lineColor.g},${lineColor.b},${alpha})`);
          grad.addColorStop(0.85, `rgba(${lineColor.r},${lineColor.g},${lineColor.b},${alpha * 0.5})`);
          grad.addColorStop(1, `rgba(${lineColor.r},${lineColor.g},${lineColor.b},0)`);

          ctx.beginPath();
          ctx.moveTo(perspX, topY);
          ctx.lineTo(perspX, bottomY);
          ctx.strokeStyle = grad;
          ctx.lineWidth = lineW;
          ctx.stroke();
        }

        // Circle spark at top of line
        if (CONFIG.circleScale > 0) {
          const sparkOpacity = alpha * 1.5 * (0.5 + 0.5 * Math.sin(t * 2 + line.phase));
          ctx.beginPath();
          ctx.arc(perspX, topY, lineW * CONFIG.circleScale * 12, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${lineColor.r},${lineColor.g},${lineColor.b},${sparkOpacity})`;
          ctx.fill();
        }
      });

      // Particles rising up
      particles.forEach((p) => {
        p.y -= p.vy;
        if (p.y < 0) {
          p.y = 1;
          p.x = Math.random() * 2 - 1;
        }
        const px = ((p.x + 1) / 2) * W;
        const py = p.y * H;
        const fadeIn = Math.min(1 - p.y, p.y * 4);
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${haloColor.r},${haloColor.g},${haloColor.b},${p.opacity * fadeIn * CONFIG.brightness * 0.3})`;
        ctx.fill();
      });

      // Bottom vignette to ground lines
      const vigGrad = ctx.createLinearGradient(0, H * 0.75, 0, H);
      vigGrad.addColorStop(0, 'rgba(0,0,8,0)');
      vigGrad.addColorStop(1, 'rgba(0,0,8,0.5)');
      ctx.fillStyle = vigGrad;
      ctx.fillRect(0, H * 0.75, W, H * 0.25);

      t += 0.016 * CONFIG.flowSpeed;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="rising-lines-canvas" />;
};

export default RisingLines;
