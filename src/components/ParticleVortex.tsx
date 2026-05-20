"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  alpha: number;
  speed: number;
  phaseOffset: number;
  size: number;
  wobbleAmpX: number;
  wobbleAmpY: number;
  wobbleFreqX: number;
  wobbleFreqY: number;
  orbitAngle: number;
  orbitRadius: number;
  orbitSpeed: number;
}

function seededRand(seed: number) {
  let s = seed;
  return function () {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

const PARTICLE_COUNT = 1600;
const PARTICLE_SIZE = 2.0;

export default function ParticleVortex() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const tickRef = useRef(0);
  const resizeRef = useRef<ResizeObserver | null>(null);
  const dimsRef = useRef({ w: 0, h: 0 });

  const initParticles = useCallback((w: number, h: number, dpr: number) => {
    const rand = seededRand(42);
    const particles: Particle[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const baseX = rand() * w;
      const baseY = rand() * h;
      const alpha = 0.06 + rand() * 0.5;
      const speed = 0.0003 + rand() * 0.0008;
      const phaseOffset = rand() * Math.PI * 2;
      const size = (0.5 + rand() * 1.5) * PARTICLE_SIZE * dpr;
      const wobbleAmpX = (8 + rand() * 40) * dpr;
      const wobbleAmpY = (8 + rand() * 40) * dpr;
      const wobbleFreqX = 0.3 + rand() * 1.2;
      const wobbleFreqY = 0.3 + rand() * 1.2;
      const orbitAngle = rand() * Math.PI * 2;
      const orbitRadius = (5 + rand() * 25) * dpr;
      const orbitSpeed = 0.002 + rand() * 0.006;

      particles.push({
        x: baseX,
        y: baseY,
        baseX,
        baseY,
        alpha,
        speed,
        phaseOffset,
        size,
        wobbleAmpX,
        wobbleAmpY,
        wobbleFreqX,
        wobbleFreqY,
        orbitAngle,
        orbitRadius,
        orbitSpeed,
      });
    }

    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const setSize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      dimsRef.current = { w: w * dpr, h: h * dpr };
      particlesRef.current = initParticles(w * dpr, h * dpr, dpr);
    };

    setSize();

    resizeRef.current = new ResizeObserver(setSize);
    resizeRef.current.observe(parent);

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleLeave = () => {
      mouseRef.current = { x: -999, y: -999 };
    };

    window.addEventListener("mousemove", handleMouse);
    canvas.addEventListener("mouseleave", handleLeave);

    const draw = () => {
      const { w: W, h: H } = dimsRef.current;
      const particles = particlesRef.current;
      const { x: mx, y: my } = mouseRef.current;
      const dpr = Math.min(window.devicePixelRatio, 2);

      tickRef.current += 0.016;
      const tick = tickRef.current;

      ctx.clearRect(0, 0, W, H);

      const mouseInfluenceRadius = 160 * dpr;
      const mouseRepelStrength = 50 * dpr;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Orbital motion
        p.orbitAngle += p.orbitSpeed;

        // Wobble motion spreads particles around their base position
        const wobbleX = Math.sin(tick * p.wobbleFreqX + p.phaseOffset) * p.wobbleAmpX;
        const wobbleY = Math.cos(tick * p.wobbleFreqY + p.phaseOffset * 1.3) * p.wobbleAmpY;

        // Small orbit around current position
        const orbitX = Math.cos(p.orbitAngle) * p.orbitRadius;
        const orbitY = Math.sin(p.orbitAngle) * p.orbitRadius;

        let px = p.baseX + wobbleX + orbitX;
        let py = p.baseY + wobbleY + orbitY;

        // Mouse repulsion
        if (mx > 0 && my > 0) {
          const dx = px - mx * dpr;
          const dy = py - my * dpr;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseInfluenceRadius && dist > 0.1) {
            const force = (1 - dist / mouseInfluenceRadius) * mouseRepelStrength;
            px += (dx / dist) * force;
            py += (dy / dist) * force;
          }
        }

        // Light color palette — soft whites, lavenders, light blues
        const lightness = 75 + (i % 5) * 5; // 75-95
        const hue = 220 + (i % 7) * 8; // blue-violet range: 220-276
        const sat = 15 + (i % 4) * 10; // 15-45 (subtle color)

        ctx.beginPath();
        ctx.arc(px, py, p.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, ${sat}%, ${lightness}%, ${p.alpha})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("mousemove", handleMouse);
      canvas.removeEventListener("mouseleave", handleLeave);
      resizeRef.current?.disconnect();
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: "transparent" }}
    />
  );
}
