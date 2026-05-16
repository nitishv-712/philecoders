"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Rocket, Users, DollarSign, FileText, Globe, Star , type LucideIcon } from "lucide-react";
import content from "@/content.json";

const { whyChooseUs: w } = content;

const iconMap: Record<string, LucideIcon> = {
  Rocket,
  Users,
  DollarSign,
  FileText,
  Globe,
  Star,
};

const accents = [
  {
    color: "#2563EB",
    bg: "rgba(37,99,235,0.08)",
    border: "rgba(37,99,235,0.22)",
    icon: "rgba(37,99,235,0.10)",
    line: "rgba(37,99,235,0.30)",
  },
  {
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.08)",
    border: "rgba(124,58,237,0.22)",
    icon: "rgba(124,58,237,0.10)",
    line: "rgba(124,58,237,0.30)",
  },
  {
    color: "#059669",
    bg: "rgba(5,150,105,0.08)",
    border: "rgba(5,150,105,0.22)",
    icon: "rgba(5,150,105,0.10)",
    line: "rgba(5,150,105,0.30)",
  },
  {
    color: "#d97706",
    bg: "rgba(217,119,6,0.08)",
    border: "rgba(217,119,6,0.22)",
    icon: "rgba(217,119,6,0.10)",
    line: "rgba(217,119,6,0.30)",
  },
  {
    color: "#db2777",
    bg: "rgba(219,39,119,0.08)",
    border: "rgba(219,39,119,0.22)",
    icon: "rgba(219,39,119,0.10)",
    line: "rgba(219,39,119,0.30)",
  },
  {
    color: "#0891b2",
    bg: "rgba(8,145,178,0.08)",
    border: "rgba(8,145,178,0.22)",
    icon: "rgba(8,145,178,0.10)",
    line: "rgba(8,145,178,0.30)",
  },
];

const INDEX_LABELS = ["01", "02", "03", "04", "05", "06"];

const STATS = [
  ["200+", "Projects"],
  ["98%", "Satisfaction"],
  ["12+", "Years"],
] as const;

export default function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="py-28 sm:py-36 relative overflow-hidden"
      style={{ background: "var(--bg-section, #fff)" }}
    >
      {/* Top rule */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "var(--border, #e5e7eb)" }}
      />

      {/* Soft radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(124,58,237,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div
          ref={ref}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-16"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 mb-5"
            >
              <div
                className="h-px w-8"
                style={{ background: "var(--badge-color, #7c3aed)" }}
              />
              <span
                className="text-xs font-bold tracking-[0.18em] uppercase"
                style={{ color: "var(--badge-color, #7c3aed)" }}
              >
                {w.badge}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl font-black leading-[1.06] tracking-tight"
              style={{
                color: "var(--text-primary, #111827)",
                fontFamily: "'DM Serif Display', Georgia, serif",
              }}
            >
              {w.heading}{" "}
              <span className="gradient-text">{w.headingAccent}</span>
            </motion.h2>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="flex gap-8 shrink-0"
          >
            {STATS.map(([num, label]) => (
              <div key={label} className="text-right">
                <div
                  className="text-2xl font-black tracking-tight leading-none mb-1"
                  style={{
                    color: "var(--text-primary, #111827)",
                    fontFamily: "'DM Serif Display', Georgia, serif",
                  }}
                >
                  {num}
                </div>
                <div
                  className="text-[10px] font-semibold tracking-widest uppercase"
                  style={{ color: "var(--text-muted, #9ca3af)" }}
                >
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {w.reasons.map((r, i) => {
            const Icon = iconMap[r.icon] ?? Star;
            const accent = accents[i % accents.length];
            const isLast = i === w.reasons.length - 1;

            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: i * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group flex gap-0 items-stretch"
              >
                {/* Spine column */}
                <div className="flex flex-col items-center w-12 shrink-0">
                  {/* Dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{
                      delay: i * 0.09 + 0.15,
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                    style={{
                      background: accent.icon,
                      border: `2px solid ${accent.border}`,
                    }}
                  >
                    <Icon size={16} style={{ color: accent.color }} />
                  </motion.div>

                  {/* Connector line */}
                  {!isLast && (
                    <div
                      className="flex-1 w-px mt-1"
                      style={{ background: "var(--border, #e5e7eb)" }}
                    />
                  )}
                </div>

                {/* Card */}
                <div
                  className="flex-1 ml-4 mb-4 p-5 rounded-2xl border relative overflow-hidden transition-all duration-300 group-hover:-translate-y-0.5"
                  style={{
                    background: "var(--bg-card, #fff)",
                    borderColor: "var(--border, #e5e7eb)",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = accent.border;
                    el.style.boxShadow = `0 8px 28px ${accent.bg}, 0 0 0 1px ${accent.border}`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--border, #e5e7eb)";
                    el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
                  }}
                >
                  {/* Left accent bar */}
                  <div
                    className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"
                    style={{ background: accent.color, opacity: 0.6 }}
                  />

                  {/* Hover radial bg */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at top left, ${accent.bg} 0%, transparent 60%)`,
                    }}
                  />

                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      {/* Index + title */}
                      <div className="flex items-center gap-2 mb-1.5">
                        <span
                          className="font-mono text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded"
                          style={{
                            color: accent.color,
                            background: accent.icon,
                          }}
                        >
                          {INDEX_LABELS[i]}
                        </span>
                        <h3
                          className="text-[15px] font-bold tracking-tight leading-snug"
                          style={{
                            color: "var(--text-primary, #111827)",
                            fontFamily: "'DM Serif Display', Georgia, serif",
                          }}
                        >
                          {r.title}
                        </h3>
                      </div>

                      <p
                        className="text-[13.5px] leading-relaxed"
                        style={{ color: "var(--text-muted, #6b7280)" }}
                      >
                        {r.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}