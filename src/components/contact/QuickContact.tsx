"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageCircle, Mail, Phone, Calendar } from "lucide-react";
import content from "@/content.json";

const { contact: c } = content;
const iconMap: Record<string, React.ElementType> = { MessageCircle, Mail, Phone, Calendar };

export default function QuickContact() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-16 relative overflow-hidden" style={{ background: "var(--bg-section)" }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(1,112,244,0.25), transparent)" }} />

      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-2xl font-black mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          Prefer a direct line?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-sm mb-8"
          style={{ color: "var(--text-muted)" }}
        >
          Pick whichever channel works best for you.
        </motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {c.quickButtons.map((btn, i) => {
            const Icon = iconMap[btn.icon] ?? Mail;
            return (
              <motion.a
                key={btn.label}
                href={btn.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl border font-semibold text-sm text-white shadow-lg transition-all"
                style={{ background: btn.color, border: "none", boxShadow: `0 8px 24px ${btn.color}40` }}
              >
                <Icon size={22} />
                {btn.label}
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
