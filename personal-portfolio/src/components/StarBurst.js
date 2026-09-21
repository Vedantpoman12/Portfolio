import { useEffect, useRef } from 'react';
import './StarBurst.css';

// StarBurst / ParticleBurst — 3D spherical particle explosion
// Implements the 3D particle burst model on high-performance Canvas
// (Spherical explosion, 3D velocities, lifetimes, additive blending)

const StarBurst = ({ count = 1500, color = '#ffaa00', className = '' }) => {
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

    // Initialize 3D particle positions, velocities, and lifetimes
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const lifetimes = new Float32Array(count);

    const initParticle = (i) => {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;

      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      const speed = Math.random() * 3.5 + 1.2;

      velocities[i * 3] = speed * Math.sin(phi) * Math.cos(theta);
      velocities[i * 3 + 1] = speed * Math.sin(phi) * Math.sin(theta);
      velocities[i * 3 + 2] = speed * Math.cos(phi);

      lifetimes[i] = Math.random();
    };

    for (let i = 0; i < count; i++) {
      initParticle(i);
    }

    let lastTime = performance.now();

    const render = (now) => {
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      ctx.save();
      ctx.scale(dpr, dpr);

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#020008';
      ctx.fillRect(0, 0, W, H);

      ctx.globalCompositeOperation = 'lighter';

      const cx = W / 2;
      const cy = H / 2;
      const cameraZ = 6;
      const fov = Math.min(W, H) * 1.2;

      for (let i = 0; i < count; i++) {
        lifetimes[i] -= delta * 0.5;

        if (lifetimes[i] <= 0) {
          initParticle(i);
          lifetimes[i] = 1;
        } else {
          positions[i * 3] += velocities[i * 3] * delta;
          positions[i * 3 + 1] += velocities[i * 3 + 1] * delta;
          positions[i * 3 + 2] += velocities[i * 3 + 2] * delta;
        }

        const x = positions[i * 3];
        const y = positions[i * 3 + 1];
        const z = positions[i * 3 + 2];

        const pz = z + cameraZ;
        if (pz <= 0.1) continue;

        const screenX = cx + (x / pz) * fov;
        const screenY = cy + (y / pz) * fov;

        if (screenX < -20 || screenX > W + 20 || screenY < -20 || screenY > H + 20) {
          continue;
        }

        const alpha = Math.min(1, lifetimes[i] * 1.5) * 0.85;
        const radius = Math.max(0.7, (1.8 / pz) * (W / 600));

        ctx.beginPath();
        ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
        ctx.fill();
      }

      ctx.restore();
      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [count, color]);

  return <canvas ref={canvasRef} className={`star-burst-canvas ${className}`} />;
};

export default StarBurst;
