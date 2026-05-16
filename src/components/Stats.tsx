"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Users, Calendar, TrendingUp, Star, Clock , type LucideIcon } from "lucide-react";
import content from "@/content.json";

const { stats: s } = content;

const iconMap: Record<string, LucideIcon> = { Briefcase, Users, Calendar, TrendingUp, Star, Clock };

const statColors = [
  "rgba(167,139,250,0.25)",
  "rgba(52,211,153,0.25)",
  "rgba(251,191,36,0.25)",
  "rgba(143,187,249,0.25)",
  "rgba(251,113,133,0.25)",
  "rgba(167,139,250,0.25)",
];

export default function Stats() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #10274b 0%, #0157c2 40%, #7c3aed 100%)" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(124,58,237,0.15) 0%, transparent 60%)" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(1,112,244,0.10) 0%, transparent 60%)" }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div ref={ref} className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-4"
            style={{ background: "rgba(255,255,255,0.10)", borderColor: "rgba(255,255,255,0.20)", color: "#fff" }}
          >
            {s.badge}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-white"
          >
            {s.heading} <span style={{ color: "#ddd6fe" }}>{s.headingAccent}</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {s.items.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Star;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="text-center p-5 rounded-2xl glass-card hover:-translate-y-1 transition-transform duration-300"
                style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.08), ${statColors[i]})` }}
              >
                <Icon size={20} className="mx-auto mb-3 text-white/80" />
                <div className="text-2xl sm:text-3xl font-black text-white mb-1">{item.value}</div>
                <div className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>{item.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
