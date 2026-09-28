import { useEffect, useRef } from 'react';

// Canvas constellation: drifting nodes linked by lines, reacting to the cursor.
export const ParticleField = ({ className = '', density = 0.00009 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };
    let width = 0;
    let height = 0;
    let nodes = [];
    let raf = 0;
    let visible = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(28, Math.min(110, Math.floor(width * height * density)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
      }));
    };

    const LINK = 130;
    const MOUSE_R = 180;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < MOUSE_R && d > 0.1) {
          const force = (1 - d / MOUSE_R) * 0.6;
          n.x += (dx / d) * force;
          n.y += (dy / d) * force;
        }
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
      }

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(0, 255, 0, ${(1 - d / LINK) * 0.22})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (md < MOUSE_R * 1.2) {
          ctx.strokeStyle = `rgba(0, 240, 255, ${(1 - md / (MOUSE_R * 1.2)) * 0.45})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = 'rgba(120, 255, 120, 0.85)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      if (visible) draw();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    resize();
    if (reduce) {
      draw();
    } else {
      raf = requestAnimationFrame(loop);
    }
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [density]);

  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full ${className}`} aria-hidden="true" />;
};
