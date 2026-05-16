"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";
import content from "@/content.json";

const ParticleSwarm = dynamic(() => import("@/components/ParticleSwarm"), { ssr: false });

const { hero } = content;

function TypewriterText() {
  const words = hero.typewriterWords;
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < word.length)
      t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 95);
    else if (!deleting && displayed.length === word.length)
      t = setTimeout(() => setDeleting(true), 1800);
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 50);
    else { setDeleting(false); setIndex((i) => (i + 1) % words.length); }
    return () => clearTimeout(t);
  }, [displayed, deleting, index, words]);

  return (
    <span className="gradient-text">
      {displayed}<span className="cursor-blink" style={{ color: "#7c3aed" }}>|</span>
    </span>
  );
}

function ParticleField() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);
  const particleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => setMounted(true), []);

  const particles = useMemo(() => {
    const colors = ["#7c3aed", "#a78bfa", "#0170f4", "#34d399", "#c4b5fd"];
    return Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: Math.random() * 96 + 2,
      y: Math.random() * 96 + 2,
      size: Math.random() * 4 + 3,
      color: colors[i % colors.length],
      opacity: Math.random() * 0.2 + 0.15,
      isRing: i % 4 === 0,
    }));
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const animate = () => {
      const { x: mx, y: my } = mouseRef.current;
      const container = containerRef.current;
      if (!container) { rafRef.current = requestAnimationFrame(animate); return; }
      const w = container.offsetWidth;
      const h = container.offsetHeight;

      particleRefs.current.forEach((el, i) => {
        if (!el) return;
        const p = particles[i];
        const px = (p.x / 100) * w;
        const py = (p.y / 100) * h;
        const dx = px - mx;
        const dy = py - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 220;

        if (dist < radius && dist > 0) {
          const force = (1 - dist / radius) * 45;
          const offsetX = (dx / dist) * force;
          const offsetY = (dy / dist) * force;
          el.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${1 + (1 - dist / radius) * 0.4})`;
          el.style.opacity = String(p.opacity + (1 - dist / radius) * 0.25);
        } else {
          el.style.transform = "translate(0px, 0px) scale(1)";
          el.style.opacity = String(p.opacity);
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [mounted, particles]);

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <div
          key={p.id}
          ref={(el) => { particleRefs.current[i] = el; }}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            ...(p.isRing
              ? { border: `1.5px solid ${p.color}`, background: "transparent" }
              : { background: p.color }),
            opacity: p.opacity,
            transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const [showParticles, setShowParticles] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowParticles(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#000" }}
    >
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: showParticles && inView ? 1 : 0 }}
          transition={{ duration: 1.2, ease: "easeIn" }}
        >
          {showParticles && inView && <ParticleSwarm />}
        </motion.div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
          }}
        />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-24 pb-16 w-full"
      >
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-7"
              style={{
                background: "rgba(124,58,237,0.12)",
                borderColor: "rgba(124,58,237,0.25)",
                color: "#c4b5fd",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[#a78bfa] animate-pulse" />
              {hero.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-[5.5rem] font-black leading-[1.02] tracking-tight mb-6 text-white"
            >
              {hero.headlinePre} <TypewriterText />
              <br />
              <span className="text-[#a78bfa]">{hero.headlinePost}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed text-gray-300"
            >
              {hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href={hero.ctaPrimary.href}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 48px rgba(124,58,237,0.40)" }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-semibold text-base shadow-xl transition-all"
                style={{ background: "linear-gradient(135deg, #0170f4 0%, #7c3aed 100%)" }}
              >
                {hero.ctaPrimary.label}
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
                  <ArrowRight size={17} />
                </motion.span>
              </motion.a>
              <motion.a
                href={hero.ctaSecondary.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 font-semibold text-base transition-all border-[#a78bfa]/40 text-[#c4b5fd] hover:bg-white/5"
              >
                {hero.ctaSecondary.label}
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-14 pt-10 border-t border-white/10"
            >
              {hero.stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="text-center lg:text-left"
                >
                  <div className="text-2xl sm:text-3xl font-black gradient-text">{s.value}</div>
                  <div className="text-xs sm:text-sm mt-1 text-gray-400">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-500"
      >
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
