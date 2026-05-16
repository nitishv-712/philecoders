"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, FileText, RefreshCw, Lock , type LucideIcon } from "lucide-react";
import content from "@/content.json";

const trust = content.about.trust;

const iconMap: Record<string, LucideIcon> = { ShieldCheck, FileText, RefreshCw, Lock };

export default function WhyTrustUs() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div ref={ref} className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-4"
            style={{ background: "var(--badge-bg)", borderColor: "rgba(1,112,244,0.2)", color: "var(--badge-color)" }}
          >
            {trust.badge}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black"
            style={{ color: "var(--text-primary)" }}
          >
            {trust.heading} <span className="gradient-text">{trust.headingAccent}</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {trust.items.map((item, i) => {
            const Icon = iconMap[item.icon] ?? ShieldCheck;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="flex gap-5 p-6 rounded-2xl border"
                style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md"
                  style={{ background: "linear-gradient(135deg, #10274b, #0170f4)" }}>
                  <Icon size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold mb-1.5" style={{ color: "var(--text-primary)" }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
