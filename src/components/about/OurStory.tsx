"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import content from "@/content.json";

const story = content.about.story;

export default function OurStory() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden" style={{ background: "var(--bg-section)" }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(1,112,244,0.25), transparent)" }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-5"
              style={{ background: "var(--badge-bg)", borderColor: "rgba(1,112,244,0.2)", color: "var(--badge-color)" }}>
              {story.badge}
            </div>
            <h2 className="text-4xl sm:text-5xl font-black mb-8 leading-tight" style={{ color: "var(--text-primary)" }}>
              {story.heading} <span className="gradient-text">{story.headingAccent}</span>
            </h2>
            <div className="space-y-5">
              {story.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="leading-relaxed"
                  style={{ color: "var(--text-body)" }}
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* Right — timeline */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute left-5 top-0 bottom-0 w-px"
              style={{ background: "linear-gradient(180deg, #0170f4, rgba(1,112,244,0.1))" }} />
            <div className="space-y-6 pl-14">
              {story.milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -left-9 w-4 h-4 rounded-full border-2 border-[#0170f4] bg-white dark:bg-[#071630]"
                    style={{ top: "4px" }} />
                  <div className="p-4 rounded-xl border"
                    style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                    <div className="text-xs font-bold mb-1" style={{ color: "#0170f4" }}>{m.year}</div>
                    <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{m.event}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
