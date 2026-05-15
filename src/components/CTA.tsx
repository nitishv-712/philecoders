"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import content from "@/content.json";

const { cta: c } = content;

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-32 px-5 sm:px-8"
      style={{ background: "#fafafa" }}
    >
      {/* Background mesh blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{
          position: "absolute", top: "-10%", left: "-5%",
          width: "55%", height: "65%",
          background: "radial-gradient(ellipse, rgba(124,58,237,0.06) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: "-15%", right: "-8%",
          width: "60%", height: "70%",
          background: "radial-gradient(ellipse, rgba(1,112,244,0.05) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", top: "40%", left: "35%",
          width: "40%", height: "50%",
          background: "radial-gradient(ellipse, rgba(5,150,105,0.04) 0%, transparent 70%)",
        }} />
      </div>

      {/* Dot grid */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.18 }}
      >
        <defs>
          <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="#7c3aed" fillOpacity="0.25" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      {/* Decorative rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[480, 680, 880].map((size, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size, height: size,
              border: `1px solid rgba(124,58,237,${0.07 - i * 0.02})`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full"
          style={{
            background: "rgba(124,58,237,0.08)",
            border: "1px solid rgba(124,58,237,0.18)",
          }}
        >
          <Sparkles size={12} style={{ color: "#7c3aed" }} />
          <span
            className="text-[11px] font-bold tracking-[0.16em] uppercase"
            style={{ color: "#7c3aed" }}
          >
            {c.badge ?? "Let's work together"}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-7xl font-black leading-[1.04] tracking-tight mb-6"
          style={{
            color: "#111827",
            fontFamily: "'DM Serif Display', Georgia, serif",
          }}
        >
          {c.heading}
        </motion.h2>

        {/* Accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-8 h-1 w-20 rounded-full origin-left"
          style={{ background: "linear-gradient(90deg, #7c3aed, #2563EB)" }}
        />

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.22, duration: 0.55 }}
          className="text-lg sm:text-xl max-w-xl mx-auto mb-12 leading-relaxed"
          style={{ color: "#6b7280" }}
        >
          {c.subheading}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.34, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary */}
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href={c.primaryHref}
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full font-bold text-[15px] text-white transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #2563EB 100%)",
                boxShadow: "0 4px 20px rgba(124,58,237,0.30)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 8px 32px rgba(124,58,237,0.45)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 4px 20px rgba(124,58,237,0.30)";
              }}
            >
              {c.primaryLabel}
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Secondary */}
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href={c.secondaryHref}
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full font-semibold text-[15px] transition-all duration-200"
              style={{
                color: "#374151",
                background: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(124,58,237,0.18)",
                backdropFilter: "blur(8px)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(255,255,255,0.95)";
                el.style.borderColor = "rgba(124,58,237,0.35)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(255,255,255,0.7)";
                el.style.borderColor = "rgba(124,58,237,0.18)";
              }}
            >
              {c.secondaryLabel}
            </Link>
          </motion.div>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-14 flex items-center justify-center gap-3"
        >
          <div className="flex -space-x-2">
            {["#7c3aed", "#2563EB", "#059669", "#d97706"].map((bg, i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full border-2"
                style={{ background: bg, borderColor: "#f5f3ff" }}
              />
            ))}
          </div>
          <span className="text-[13px] font-medium" style={{ color: "#9ca3af" }}>
            {c.socialProof ?? "Trusted by 200+ teams worldwide"}
          </span>
        </motion.div>
      </div>
    </section>
  );
}