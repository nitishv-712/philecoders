"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Section = { heading: string; body: string[] };

type Props = {
  badge: string;
  title: string;
  lastUpdated: string;
  intro: string;
  sections: Section[];
};

export default function LegalPage({ badge, title, lastUpdated, intro, sections }: Props) {
  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden dot-grid"
        style={{ background: "linear-gradient(160deg, #ede9fe 0%, #e0eeff 40%, #f0f6ff 70%, #faf5ff 100%)" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at 60% 40%, rgba(124,58,237,0.08) 0%, transparent 60%)" }} />

        <div className="relative max-w-3xl mx-auto px-5 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/"
              className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-[#7c3aed]"
              style={{ color: "var(--text-muted)" }}>
              <ArrowLeft size={15} /> Back to Home
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-5"
            style={{ background: "var(--badge-bg)", borderColor: "rgba(124,58,237,0.25)", color: "var(--badge-color)" }}
          >
            {badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black mb-4 leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            Last updated: {lastUpdated}
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 pb-24">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base leading-relaxed mb-10 pb-10 border-b"
            style={{ color: "var(--text-body)", borderColor: "var(--border)" }}
          >
            {intro}
          </motion.p>

          <div className="space-y-10">
            {sections.map((s, i) => (
              <motion.div
                key={s.heading}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.05 }}
              >
                <h2 className="text-xl font-black mb-3" style={{ color: "var(--text-primary)" }}>
                  {i + 1}. {s.heading}
                </h2>
                <div className="space-y-3">
                  {s.body.map((para, j) => (
                    <p key={j} className="text-sm leading-relaxed" style={{ color: "var(--text-body)" }}>
                      {para}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer note */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-14 p-6 rounded-2xl border"
            style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
          >
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Questions about this policy? Contact us at{" "}
              <a href="mailto:hello@PhileCoders.dev" className="font-semibold" style={{ color: "#7c3aed" }}>
                hello@PhileCoders.dev
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
