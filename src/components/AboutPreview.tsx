"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Clock, ShieldCheck, Headphones, ArrowRight } from "lucide-react";
import Link from "next/link";
import content from "@/content.json";

const { aboutPreview: a } = content;

const iconMap: Record<string, React.ElementType> = { Code2, Clock, ShieldCheck, Headphones };

const cardAccents = [
  { bg: "rgba(1,112,244,0.10)",   color: "#0170f4",  gradient: "linear-gradient(135deg, #0170f4, #4494f6)" },
  { bg: "rgba(5,150,105,0.10)",   color: "#059669",  gradient: "linear-gradient(135deg, #059669, #34d399)" },
  { bg: "rgba(124,58,237,0.10)",  color: "#7c3aed",  gradient: "linear-gradient(135deg, #7c3aed, #a78bfa)" },
  { bg: "rgba(245,158,11,0.10)",  color: "#f59e0b",  gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)" },
];

export default function AboutPreview() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-5"
              style={{ background: "var(--badge-bg)", borderColor: "rgba(124,58,237,0.15)", color: "var(--badge-color)" }}>
              {a.badge}
            </div>
            <h2 className="text-4xl sm:text-5xl font-black mb-5 leading-tight" style={{ color: "var(--text-primary)" }}>
              {a.heading} <span className="gradient-text">{a.headingAccent}</span>
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: "var(--text-body)" }}>
              {a.description}
            </p>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href={a.cta.href}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-semibold shadow-lg transition-all"
                style={{ background: "linear-gradient(135deg, #0170f4, #7c3aed)", boxShadow: "0 12px 32px rgba(124,58,237,0.25)" }}
              >
                {a.cta.label} <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — highlight cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {a.highlights.map((h, i) => {
              const Icon = iconMap[h.icon] ?? Code2;
              const accent = cardAccents[i % cardAccents.length];
              return (
                <motion.div
                  key={h.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 shadow-sm"
                    style={{ background: accent.bg, color: accent.color }}>
                    <Icon size={18} />
                  </div>
                  <div className="font-bold text-sm mb-1" style={{ color: "var(--text-primary)" }}>{h.label}</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>{h.desc}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
