"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import content from "@/content.json";

const { about: a } = content;
const intro = a.intro;

export default function AboutIntro() {
  return (
    <section className="pt-32 pb-20 relative overflow-hidden dot-grid"
      style={{ background: "linear-gradient(160deg, #dbeafe 0%, #eff6ff 55%, #e0eeff 100%)" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at 60% 40%, rgba(1,112,244,0.1) 0%, transparent 60%)" }} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-5"
            style={{ background: "var(--badge-bg)", borderColor: "rgba(1,112,244,0.25)", color: "var(--badge-color)" }}
          >
            {intro.badge}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl font-black mb-6 leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            {intro.heading} <span className="gradient-text">{intro.headingAccent}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg leading-relaxed"
            style={{ color: "var(--text-body)" }}
          >
            {intro.description}
          </motion.p>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {intro.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              className="text-center p-5 rounded-2xl border"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <div className="text-3xl font-black gradient-text mb-1">{s.value}</div>
              <div className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-10 max-w-3xl mx-auto"
        >
          {a.highlights.map((h) => (
            <div key={h} className="flex items-center gap-2.5 text-sm" style={{ color: "var(--text-body)" }}>
              <CheckCircle2 size={15} style={{ color: "#0170f4", flexShrink: 0 }} />
              {h}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
