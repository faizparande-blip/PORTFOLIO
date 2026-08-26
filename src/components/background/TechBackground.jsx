import React, { useEffect, useRef } from 'react';

export const TechBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = Math.min(window.innerWidth, 1920));
    let height = (canvas.height = Math.min(window.innerHeight, 1080));

    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    
    // Performance tuning: minimal particles on mobile
    const particleCount = isMobile ? 10 : isTablet ? 22 : 36;
    const particles = [];
    const maxDistance = isMobile ? 60 : 120;
    const renderConnections = !isMobile; // Disable pairwise line rendering on mobile CPU

    let mouse = { x: -1000, y: -1000, radius: 100 };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = Math.min(window.innerWidth, 1920);
      height = canvas.height = Math.min(window.innerHeight, 1080);
    };

    const handleMouseMove = (e) => {
      if (isMobile) return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.4),
        vy: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.4),
        radius: isMobile ? 1.2 : Math.random() * 1.5 + 1,
        color: Math.random() > 0.4 ? 'rgba(34, 211, 238, 0.4)' : 'rgba(148, 163, 184, 0.2)'
      });
    }

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Render nodes
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        if (!isMobile) {
          const dxMouse = mouse.x - p1.x;
          const dyMouse = mouse.y - p1.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          if (distMouse < mouse.radius) {
            const force = (mouse.radius - distMouse) / mouse.radius;
            p1.x -= (dxMouse / distMouse) * force * 1.2;
            p1.y -= (dyMouse / distMouse) * force * 1.2;
          }
        }

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.fill();

        // Connect nodes on desktop/tablet only
        if (renderConnections) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
              const alpha = (1 - distance / maxDistance) * 0.15;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050B14]" aria-hidden="true">
      {/* Subtle modern background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      {/* Interactive Particle Network Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Low-cost atmospheric radial depth */}
      <div className="absolute -top-40 right-0 w-[450px] sm:w-[550px] h-[450px] sm:h-[550px] bg-cyan-950/20 rounded-full blur-[100px] sm:blur-[140px] -z-10" />
      <div className="absolute top-1/3 -left-40 w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] bg-blue-950/20 rounded-full blur-[120px] sm:blur-[160px] -z-10" />
    </div>
  );
};

export default TechBackground;
