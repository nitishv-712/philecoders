"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import content from "@/content.json";

const { contact: c } = content;
const iconMap: Record<string, React.ElementType> = { Mail, Phone, MapPin };

export default function ContactHero() {
  return (
    <section className="pt-32 pb-20 relative overflow-hidden dot-grid"
      style={{ background: "linear-gradient(160deg, #dbeafe 0%, #eff6ff 55%, #e0eeff 100%)" }}>
      <div className="dark:hidden absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at 60% 40%, rgba(1,112,244,0.1) 0%, transparent 60%)" }} />
      <div className="hidden dark:block absolute inset-0"
        style={{ background: "linear-gradient(160deg, #071630 0%, #10274b 55%, #0157c2 100%)" }} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-5"
            style={{ background: "var(--badge-bg)", borderColor: "rgba(1,112,244,0.25)", color: "var(--badge-color)" }}
          >
            {c.hero.badge}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl font-black mb-5 leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            {c.hero.heading} <span className="gradient-text">{c.hero.headingAccent}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg"
            style={{ color: "var(--text-body)" }}
          >
            {c.hero.subheading}
          </motion.p>
        </div>

        {/* Info cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {c.info.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Mail;
            return (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                whileHover={{ scale: 1.03 }}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl border text-center transition-all"
                style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(1,112,244,0.1)", color: "#0170f4" }}>
                  <Icon size={18} />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: "var(--text-muted)" }}>{item.label}</div>
                  <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{item.value}</div>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
