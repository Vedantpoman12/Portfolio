import { useEffect, useRef } from 'react';
import './RisingLines.css';

// Rising Lines — Canvas recreation of React Bits Pro "Rising Lines"
// Matches React Bits Pro config & visuals:
//   Radiant fan of ascending laser lines and particles shooting upward
//   from the bottom horizon with glow, halo, and additive blending.

function hexToRgb(hex) {
  if (!hex || hex[0] !== '#') return { r: 243, g: 247, b: 255 };
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16) || 243;
  const g = parseInt(h.substring(2, 4), 16) || 247;
  const b = parseInt(h.substring(4, 6), 16) || 255;
  return { r, g, b };
}

const RisingLines = ({
  color = '#f3f7ff',
  horizonColor = '#e6e6ed',
  haloColor = '#b5dfff',
  riseSpeed = 0.04,
  riseScale = 9.5,
  flowSpeed = 0.25,
  flowDensity = 2.9,
  flowIntensity = 0.4,
  horizonIntensity = 1,
  haloIntensity = 1.5,
  circleScale = 0.1,
  scale = 3.9,
  brightness = 2,
  className = '',
}) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let dpr = 1;

    const resize = () => {
      const parent = canvas.parentElement;
      const rect = parent ? parent.getBoundingClientRect() : null;
      W = rect && rect.width > 0 ? rect.width : window.innerWidth;
      H = rect && rect.height > 0 ? rect.height : (window.innerHeight || 400);
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
    };

    resize();
    window.addEventListener('resize', resize);

    const lineColor = hexToRgb(color);
    const horizColor = hexToRgb(horizonColor);
    const hColor = hexToRgb(haloColor);

    // Number of radial rays fanning outward from bottom center
    const rayCount = Math.max(50, Math.floor(65 * flowDensity));
    const rays = Array.from({ length: rayCount }, (_, i) => {
      // Fan angles: from -170° (left) to -10° (right), centered at -90° (straight up)
      const t = i / (rayCount - 1);
      // Non-linear distribution: slightly denser towards the middle
      const curvedT = (Math.sin((t - 0.5) * Math.PI) + 1) / 2;
      const angle = -Math.PI * 0.94 + curvedT * (Math.PI * 0.88);

      const isLaser = Math.random() < 0.22; // ~22% are intense laser beams
      const pulseCount = 1 + Math.floor(Math.random() * 2);

      const pulses = Array.from({ length: pulseCount }, () => ({
        offset: Math.random(),
        speed: (0.6 + Math.random() * 0.8) * (1 + (flowSpeed - 0.25) * 1.5),
        length: (0.08 + Math.random() * 0.16) * (riseScale / 9.5),
        width: (isLaser ? 1.6 : 0.8) + Math.random() * 1.2 * (scale / 3.9),
        alpha: (0.4 + Math.random() * 0.6) * flowIntensity * brightness,
      }));

      return {
        angle,
        cosA: Math.cos(angle),
        sinA: Math.sin(angle),
        isLaser,
        pulses,
        glowPulse: Math.random() * Math.PI * 2,
      };
    });

    // Ascending particles / burst sparks (matching Three.js ParticleBurst behavior)
    const particleCount = Math.max(120, Math.floor(180 * flowDensity));
    const particles = Array.from({ length: particleCount }, () => ({
      angle: -Math.PI * 0.96 + Math.random() * (Math.PI * 0.92),
      dist: Math.random(), // 0 to 1
      speed: (0.003 + Math.random() * 0.007) * (1 + riseSpeed * 10),
      size: (0.8 + Math.random() * 1.8) * (scale / 3.9),
      opacity: 0.2 + Math.random() * 0.8,
      wobble: Math.random() * Math.PI * 2,
    }));

    let time = 0;

    const render = () => {
      time += 0.016;

      ctx.save();
      ctx.scale(dpr, dpr);

      // Deep dark background
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#020008';
      ctx.fillRect(0, 0, W, H);

      // Origin point: bottom center (focal horizon)
      const ox = W * 0.5;
      const oy = H * 1.02; // just kissing the bottom boundary
      const maxDist = Math.hypot(Math.max(ox, W - ox), oy) * 1.05;

      // ── 1. Horizon & Halo Glow (Radial dome of purple/cyan light) ──
      const haloRadius = Math.max(W, H) * 0.65;
      const haloGrad = ctx.createRadialGradient(ox, oy, 0, ox, oy, haloRadius);
      haloGrad.addColorStop(
        0,
        `rgba(${horizColor.r}, ${horizColor.g}, ${horizColor.b}, ${0.45 * horizonIntensity})`
      );
      haloGrad.addColorStop(
        0.18,
        `rgba(${hColor.r}, ${hColor.g}, ${hColor.b}, ${0.32 * haloIntensity})`
      );
      haloGrad.addColorStop(
        0.45,
        `rgba(138, 92, 246, ${0.16 * haloIntensity})`
      );
      haloGrad.addColorStop(0.8, 'rgba(30, 10, 60, 0.04)');
      haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = haloGrad;
      ctx.fillRect(0, 0, W, H);

      // ── 2. Additive Blending for Laser Rays & Beams ──
      ctx.globalCompositeOperation = 'lighter';

      // Draw each radiating ray and its traveling pulses
      for (let i = 0; i < rays.length; i++) {
        const ray = rays[i];
        const { cosA, sinA, isLaser, pulses } = ray;

        for (let p = 0; p < pulses.length; p++) {
          const pulse = pulses[p];
          // Advance pulse outward
          const progress =
            (pulse.offset + time * pulse.speed * riseSpeed * 12) % 1;

          // Pulse head and tail positions
          const headDist = progress;
          const tailDist = Math.max(0, headDist - pulse.length);

          // Fade out as it nears the far edge
          const edgeFade = Math.sin(progress * Math.PI);
          const alpha = pulse.alpha * edgeFade;
          if (alpha <= 0.01) continue;

          const x1 = ox + cosA * tailDist * maxDist;
          const y1 = oy + sinA * tailDist * maxDist;
          const x2 = ox + cosA * headDist * maxDist;
          const y2 = oy + sinA * headDist * maxDist;

          // Draw streak gradient
          const grad = ctx.createLinearGradient(x1, y1, x2, y2);
          grad.addColorStop(
            0,
            `rgba(${hColor.r}, ${hColor.g}, ${hColor.b}, 0)`
          );
          grad.addColorStop(
            0.5,
            `rgba(${hColor.r}, ${hColor.g}, ${hColor.b}, ${alpha * 0.6})`
          );
          grad.addColorStop(
            0.9,
            `rgba(${lineColor.r}, ${lineColor.g}, ${lineColor.b}, ${alpha})`
          );
          grad.addColorStop(
            1,
            `rgba(255, 255, 255, ${Math.min(1, alpha * 1.3)})`
          );

          ctx.save();
          if (isLaser) {
            ctx.shadowBlur = 10 * brightness;
            ctx.shadowColor = `rgba(${hColor.r}, ${hColor.g}, ${hColor.b}, ${alpha})`;
          }

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = grad;
          ctx.lineWidth = pulse.width;
          ctx.lineCap = 'round';
          ctx.stroke();

          // Spark dot at head
          if (circleScale > 0) {
            const sparkR = pulse.width * circleScale * 14;
            ctx.beginPath();
            ctx.arc(x2, y2, Math.max(1.2, sparkR), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, alpha * 1.4)})`;
            ctx.fill();
          }

          ctx.restore();
        }
      }

      // ── 3. Ascending Burst Particles ──
      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i];
        pt.dist += pt.speed;
        if (pt.dist > 1) {
          pt.dist = 0;
          pt.angle = -Math.PI * 0.96 + Math.random() * (Math.PI * 0.92);
        }

        const px = ox + Math.cos(pt.angle) * pt.dist * maxDist;
        const py = oy + Math.sin(pt.angle) * pt.dist * maxDist;

        // Twinkle and edge fade
        const pFade = Math.sin(pt.dist * Math.PI);
        const pAlpha = pt.opacity * pFade * flowIntensity * brightness;

        if (pAlpha > 0.02) {
          ctx.beginPath();
          ctx.arc(px, py, pt.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${lineColor.r}, ${lineColor.g}, ${lineColor.b}, ${pAlpha})`;
          ctx.fill();
        }
      }

      // ── 4. Horizon Base Core Glow ──
      const coreGrad = ctx.createRadialGradient(ox, oy, 0, ox, oy, W * 0.2);
      coreGrad.addColorStop(
        0,
        `rgba(255, 255, 255, ${0.4 * horizonIntensity})`
      );
      coreGrad.addColorStop(
        0.3,
        `rgba(${hColor.r}, ${hColor.g}, ${hColor.b}, ${0.25 * haloIntensity})`
      );
      coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coreGrad;
      ctx.fillRect(0, 0, W, H);

      ctx.restore();

      animRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [
    color,
    horizonColor,
    haloColor,
    riseSpeed,
    riseScale,
    flowSpeed,
    flowDensity,
    flowIntensity,
    horizonIntensity,
    haloIntensity,
    circleScale,
    scale,
    brightness,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`rising-lines-canvas ${className}`}
    />
  );
};

export default RisingLines;
