import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  life: number;
  maxLife: number;
  r: number;
  g: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];
    let frame = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function spawnParticle(): Particle {
      if (!canvas) return { x: 0, y: 0, vx: 0, vy: 0, alpha: 0, size: 0, life: 0, maxLife: 100, r: 200, g: 130 };
      const maxLife = 140 + Math.random() * 160;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -Math.random() * 0.35 - 0.08,
        alpha: 0,
        size: Math.random() * 1.4 + 0.3,
        life: 0,
        maxLife,
        r: 195 + Math.floor(Math.random() * 35),
        g: 125 + Math.floor(Math.random() * 40),
      };
    }

    for (let i = 0; i < 55; i++) {
      const p = spawnParticle();
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }

    function draw() {
      if (!canvas || !ctx) return;
      frame++;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const t = p.life / p.maxLife;
        const alpha = t < 0.15 ? t / 0.15 : t > 0.8 ? 1 - (t - 0.8) / 0.2 : 1;
        p.alpha = alpha * 0.5;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.r},${p.g},20,${p.alpha})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        if (p.life >= p.maxLife) {
          particles[i] = spawnParticle();
        }
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
