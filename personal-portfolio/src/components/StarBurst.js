import { useEffect, useRef } from 'react';
import './StarBurst.css';

// StarBurst — custom canvas recreation matching React Bits Pro config:
//   density=1.4, starCount=370, starSize=0.4, brightness=2.2
//   flowerIntensity=0.3, twinkleSpeed=0.3, wobbleAmount=1.7
//   innerLayerIntensity=0.6, outerLayerIntensity=0.8, fadeHeight=2.1

const CONFIG = {
  density: 1.4,
  starCount: 370,
  starSize: 0.4,
  brightness: 2.2,
  flowerIntensity: 0.3,
  twinkleSpeed: 0.3,
  wobbleAmount: 1.7,
  innerLayerIntensity: 0.6,
  outerLayerIntensity: 0.8,
  fadeHeight: 2.1,
};

const StarBurst = () => {
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

    // Create stars
    const count = Math.floor(CONFIG.starCount * CONFIG.density);

    const stars = Array.from({ length: count }, () => {
      // Distribute: more stars toward center/bottom (burst origin at center-bottom)
      const angle = Math.random() * Math.PI * 2;
      // distance from center — bias toward edges for outer layer, center for inner
      const layer = Math.random() < 0.5 ? 'inner' : 'outer';
      const dist = layer === 'inner'
        ? Math.random() * 0.45          // 0..0.45 of canvas half-width
        : 0.35 + Math.random() * 0.65;  // 0.35..1.0

      return {
        // Normalized coordinates: (0,0) = canvas center
        nx: Math.cos(angle) * dist,
        ny: Math.sin(angle) * dist,
        size: (0.5 + Math.random() * 2) * CONFIG.starSize * 2,
        phase: Math.random() * Math.PI * 2,
        twinkleFreq: (0.5 + Math.random()) * CONFIG.twinkleSpeed * 2,
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleFreq: 0.3 + Math.random() * 0.7,
        layer,
        baseOpacity: layer === 'inner'
          ? (0.4 + Math.random() * 0.6) * CONFIG.innerLayerIntensity * CONFIG.brightness * 0.45
          : (0.3 + Math.random() * 0.5) * CONFIG.outerLayerIntensity * CONFIG.brightness * 0.35,
        // "flower" petal stars — spike-like streaks
        isFlower: Math.random() < CONFIG.flowerIntensity * 0.3,
      };
    });

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H * 0.5;
      const halfW = W / 2;
      const halfH = H / 2;

      // Background
      ctx.fillStyle = 'rgba(0,0,8,1)';
      ctx.fillRect(0, 0, W, H);

      // Central burst glow
      const burstGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W, H) * 0.4);
      burstGrad.addColorStop(0, `rgba(200, 220, 255, ${0.06 * CONFIG.brightness})`);
      burstGrad.addColorStop(0.4, `rgba(150, 180, 255, ${0.03 * CONFIG.brightness})`);
      burstGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = burstGrad;
      ctx.fillRect(0, 0, W, H);

      stars.forEach((s) => {
        // Wobble
        const wobX = Math.sin(t * s.wobbleFreq + s.wobblePhase) * CONFIG.wobbleAmount * 0.5;
        const wobY = Math.cos(t * s.wobbleFreq * 0.7 + s.wobblePhase) * CONFIG.wobbleAmount * 0.3;

        const px = cx + (s.nx + wobX * 0.01) * halfW;
        const py = cy + (s.ny + wobY * 0.01) * halfH;

        // Fade based on vertical position (fadeHeight config)
        const normalizedY = (py / H);                    // 0=top, 1=bottom
        const fade = Math.max(0, Math.min(1,
          normalizedY * CONFIG.fadeHeight               // fades in from top
        ));

        // Twinkle
        const twinkle = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * s.twinkleFreq + s.phase));

        const opacity = s.baseOpacity * twinkle * fade;
        if (opacity < 0.01) return;

        if (s.isFlower) {
          // Spike / petal star — draw a 4-point burst
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(t * 0.2 + s.phase);

          const len = s.size * 4 * CONFIG.brightness * 0.4;
          const w = s.size * 0.6;

          ctx.shadowBlur = 8;
          ctx.shadowColor = `rgba(200,220,255,${opacity * 0.8})`;

          for (let i = 0; i < 4; i++) {
            ctx.save();
            ctx.rotate((i * Math.PI) / 2);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(w, len * 0.3, 0, len);
            ctx.quadraticCurveTo(-w, len * 0.3, 0, 0);
            ctx.fillStyle = `rgba(220,235,255,${opacity})`;
            ctx.fill();
            ctx.restore();
          }
          ctx.restore();
        } else {
          // Regular star dot
          ctx.save();
          ctx.shadowBlur = s.size * 3 * CONFIG.brightness * 0.5;
          ctx.shadowColor = `rgba(200,220,255,${opacity * 0.6})`;

          ctx.beginPath();
          ctx.arc(px, py, s.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(230,240,255,${opacity})`;
          ctx.fill();
          ctx.restore();
        }
      });

      // Top fade-out gradient (fades to transparent so site content blends in)
      const topFade = ctx.createLinearGradient(0, 0, 0, H * 0.5);
      topFade.addColorStop(0, 'rgba(0,0,8,1)');
      topFade.addColorStop(1, 'rgba(0,0,8,0)');
      ctx.fillStyle = topFade;
      ctx.fillRect(0, 0, W, H * 0.5);

      t += 0.016;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="star-burst-canvas" />;
};

export default StarBurst;
