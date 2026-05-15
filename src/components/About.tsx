"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Users, Award, Coffee } from "lucide-react";
import content from "@/content.json";

const { about, site } = content;
const a = { ...about, milestones: about.intro.stats, highlights: about.highlights, techStack: about.techStack, badges: about.badges, codeSnippet: about.codeSnippet, heading: about.intro.heading, headingAccent: about.intro.headingAccent, description1: about.intro.description, description2: "We act as your technical co‑founders — no fluff, no unnecessary complexity, just software that works.", badge: about.intro.badge };

const milestoneIcons = [Users, Award, Coffee];

export default function About() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-90px" });

  return (
    <section id="about" className="py-24 sm:py-32 relative overflow-hidden"
      style={{ background: "var(--bg)" }}>
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(1,112,244,0.06) 0%, transparent 70%)" }} />
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(1,87,194,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — visual */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-3xl p-[2px] shadow-2xl"
              style={{ background: "linear-gradient(135deg, #0170f4, #8fbbf9, #10274b)" }}>
              <div className="rounded-3xl p-8 bg-[#071630]">
                {/* Code block */}
                <div className="rounded-xl p-5 font-mono text-xs mb-6 border"
                  style={{ background: "#030d1e", borderColor: "rgba(1,112,244,0.2)" }}>
                  <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="space-y-1.5">
                    <div><span style={{ color: "#8fbbf9" }}>const</span> <span style={{ color: "#c4dcfc" }}>{site.name.replace(/\s/g, "")}</span> <span className="text-white">=</span> <span style={{ color: "#0170f4" }}>{"{"}</span></div>
                    <div className="pl-4"><span style={{ color: "#4494f6" }}>mission</span><span className="text-white">:</span> <span style={{ color: "#8fbbf9" }}>&quot;{a.codeSnippet.mission}&quot;</span><span className="text-white">,</span></div>
                    <div className="pl-4"><span style={{ color: "#4494f6" }}>passion</span><span className="text-white">:</span> <span style={{ color: "#8fbbf9" }}>&quot;{a.codeSnippet.passion}&quot;</span><span className="text-white">,</span></div>
                    <div className="pl-4"><span style={{ color: "#4494f6" }}>delivery</span><span className="text-white">:</span> <span style={{ color: "#0170f4" }}>{String(a.codeSnippet.delivery)}</span><span className="text-white">,</span></div>
                    <div className="pl-4"><span style={{ color: "#4494f6" }}>clients</span><span className="text-white">:</span> <span style={{ color: "#8fbbf9" }}>&quot;{a.codeSnippet.clients}&quot;</span></div>
                    <div><span style={{ color: "#0170f4" }}>{"}"}</span><span className="text-white">;</span></div>
                  </div>
                </div>

                {/* Milestones */}
                <div className="grid grid-cols-3 gap-3">
                  {a.milestones.map((m, i) => {
                    const Icon = milestoneIcons[i] ?? Users;
                    return (
                      <motion.div
                        key={m.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="text-center p-4 rounded-xl"
                        style={{ background: "rgba(1,112,244,0.08)", border: "1px solid rgba(143,187,249,0.1)" }}
                      >
                        <Icon size={18} className="mx-auto mb-2" style={{ color: "#0170f4" }} />
                        <div className="text-xl font-black gradient-text">{m.value}</div>
                        <div className="text-xs mt-0.5 text-white/50">{m.label}</div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2 bg-[#10274b] border border-[#8fbbf9]/15"
            >
              <span className="text-xl">🏆</span>
              <div>
                <div className="text-xs font-bold text-white">{a.badges.topRated.label}</div>
                <div className="text-xs text-[#4a6080]">{a.badges.topRated.sub}</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -left-4 rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2 bg-[#10274b] border border-[#8fbbf9]/15"
            >
              <span className="text-xl">⚡</span>
              <div>
                <div className="text-xs font-bold text-white">{a.badges.fastDelivery.label}</div>
                <div className="text-xs text-[#4a6080]">{a.badges.fastDelivery.sub}</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — copy */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-5"
              style={{ background: "var(--badge-bg)", borderColor: "rgba(1,112,244,0.2)", color: "var(--badge-color)" }}>
              <Users size={13} /> {a.badge}
            </div>

            <h2 className="text-4xl sm:text-5xl font-black mb-6 leading-tight" style={{ color: "var(--text-primary)" }}>
              {a.heading} <span className="gradient-text">{a.headingAccent}</span>
            </h2>

            <p className="leading-relaxed mb-5" style={{ color: "var(--text-body)" }}>{a.description1}</p>
            <p className="leading-relaxed mb-8" style={{ color: "var(--text-body)" }}>{a.description2}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {a.highlights.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.07 }}
                  className="flex items-center gap-2.5 text-sm"
                  style={{ color: "var(--text-body)" }}
                >
                  <CheckCircle2 size={15} style={{ color: "#0170f4", flexShrink: 0 }} />
                  {item}
                </motion.div>
              ))}
            </div>

            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {a.techStack.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.04 }}
                  whileHover={{ scale: 1.08 }}
                  className="px-3 py-1.5 text-xs font-semibold rounded-full cursor-default"
                  style={{ background: "var(--tag-bg)", color: "var(--tag-color)", border: "1px solid rgba(1,112,244,0.15)" }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
