"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import content from "@/content.json";

const team = content.about.team;

export default function Team() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden" style={{ background: "var(--bg-section)" }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(1,112,244,0.25), transparent)" }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div ref={ref} className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-4"
            style={{ background: "var(--badge-bg)", borderColor: "rgba(1,112,244,0.2)", color: "var(--badge-color)" }}
          >
            {team.badge}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black"
            style={{ color: "var(--text-primary)" }}
          >
            {team.heading} <span className="gradient-text">{team.headingAccent}</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.members.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              className="group p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #10274b, #0170f4)" }}>
                  {m.avatar}
                </div>
                <div>
                  <div className="font-bold" style={{ color: "var(--text-primary)" }}>{m.name}</div>
                  <div className="text-xs" style={{ color: "#0170f4" }}>{m.role}</div>
                </div>
              </div>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>{m.bio}</p>
              <div className="flex flex-wrap gap-1.5">
                {m.skills.map((s) => (
                  <span key={s} className="px-2.5 py-1 text-xs font-medium rounded-full"
                    style={{ background: "var(--tag-bg)", color: "var(--tag-color)" }}>
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
