"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Star, Trophy, Shield, Users } from "lucide-react";
import content from "@/content.json";

const certs = content.about.certifications;

const iconMap: Record<string, React.ElementType> = { Award, Star, Trophy, Shield, Users };

export default function Certifications() {
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
            {certs.badge}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black"
            style={{ color: "var(--text-primary)" }}
          >
            {certs.heading} <span className="gradient-text">{certs.headingAccent}</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certs.items.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Award;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.09 }}
                className="flex items-start gap-4 p-5 rounded-2xl border"
                style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(1,112,244,0.1)", color: "#0170f4" }}>
                  <Icon size={18} />
                </div>
                <div>
                  <div className="font-bold text-sm mb-0.5" style={{ color: "var(--text-primary)" }}>{item.title}</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>{item.issuer}</div>
                  <div className="text-xs font-semibold mt-1" style={{ color: "#0170f4" }}>{item.year}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
