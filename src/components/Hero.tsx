"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import content from "@/content.json";

const { hero } = content;

function TypewriterText() {
  const words = hero.typewriterWords;
  const [index,     setIndex]     = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting,  setDeleting]  = useState(false);

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
      {displayed}<span className="cursor-blink" style={{ color: "#0170f4" }}>|</span>
    </span>
  );
}

function ParticleField() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const particles = useMemo(
    () => Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.8,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 8,
      color: i % 3 === 0 ? "#0170f4" : i % 3 === 1 ? "#8fbbf9" : "#0157c2",
    })),
    []
  );

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            background: p.color,
            animation: `particleFloat ${p.duration}s ${p.delay}s ease-in-out infinite`,
            opacity: 0.4,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y       = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const cardRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const rx = ((e.clientY - rect.top)  / rect.height - 0.5) * 14;
    const ry = ((e.clientX - rect.left) / rect.width  - 0.5) * -14;
    cardRef.current.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };
  const handleMouseLeave = () => {
    if (cardRef.current)
      cardRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden dot-grid"
      style={{ background: "linear-gradient(160deg, #dbeafe 0%, #eff6ff 55%, #e0eeff 100%)" }}
    >
      <div className="dark:hidden absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(1,112,244,0.12) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(1,87,194,0.07) 0%, transparent 70%)" }} />
      </div>
      <div
        className="hidden dark:block absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(160deg, #071630 0%, #10274b 55%, #0157c2 100%)" }}
      />
      <div className="hidden dark:block absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(1,112,244,0.18) 0%, transparent 70%)" }} />
      </div>

      <ParticleField />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-24 pb-16 w-full"
      >
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-7"
              style={{ background: "var(--badge-bg)", borderColor: "rgba(1,112,244,0.25)", color: "var(--badge-color)" }}
            >
              <span className="w-2 h-2 rounded-full bg-[#0170f4] animate-pulse" />
              {hero.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-[5.5rem] font-black leading-[1.02] tracking-tight mb-6 text-[#0f1f3d] dark:text-white"
            >
              {hero.headlinePre} <TypewriterText />
              <br />
              <span className="text-[#0157c2] dark:text-[#8fbbf9]">{hero.headlinePost}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
              style={{ color: "var(--text-body)" }}
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
                whileHover={{ scale: 1.05, boxShadow: "0 20px 48px rgba(1,112,244,0.35)" }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-semibold text-base shadow-xl transition-all"
                style={{ background: "linear-gradient(90deg, #0157c2 0%, #0170f4 100%)" }}
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
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 font-semibold text-base transition-all border-[#0157c2]/30 text-[#0157c2] dark:border-[#8fbbf9]/30 dark:text-[#c4cdd9]"
              >
                {hero.ctaSecondary.label}
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-14 pt-10 border-t border-[#0170f4]/15"
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
                  <div className="text-xs sm:text-sm mt-1" style={{ color: "var(--text-muted)" }}>{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.3 }}
            className="flex-1 relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-[400px] h-[400px]">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-[#0170f4]/25"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute inset-10 rounded-full border border-[#0170f4]/15"
              />
              {[1, 2].map((n) => (
                <motion.div
                  key={n}
                  className="absolute inset-0 rounded-full border border-[#0170f4]/30"
                  animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
                  transition={{ duration: 3, delay: n * 1.2, repeat: Infinity, ease: "easeOut" }}
                />
              ))}
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="absolute inset-[72px] rounded-3xl p-[2px] shadow-2xl transition-transform duration-100 cursor-default"
                style={{ background: "linear-gradient(135deg, #0170f4, #8fbbf9)" }}
              >
                <div className="w-full h-full rounded-3xl flex flex-col items-center justify-center gap-4 p-6 bg-white dark:bg-[#071630]">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ background: "linear-gradient(135deg, #10274b, #0170f4)" }}>
                    <span className="text-xl font-black text-white">{content.site.logo}</span>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-[#0f1f3d] dark:text-white text-base">{content.site.name}</div>
                    <div className="text-xs mt-1 text-[#4a6080]">{content.site.tagline}</div>
                  </div>
                  <div className="flex gap-2">
                    {["⚡", "🚀", "💎"].map((e, i) => (
                      <motion.span key={i} animate={{ y: [0, -6, 0] }} transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }} className="text-lg">
                        {e}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
              {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    background: i % 2 === 0 ? "#0170f4" : "#8fbbf9",
                    top: "50%", left: "50%", marginTop: -6, marginLeft: -6,
                    x: Math.cos((deg * Math.PI) / 180) * 190,
                    y: Math.sin((deg * Math.PI) / 180) * 190,
                  }}
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#4a6080]"
      >
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
