"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import content from "@/content.json";

const { cta: c } = content;

export default function CTA() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="absolute inset-0 pointer-events-none dot-grid opacity-40" />

      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl p-12 sm:p-16 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0f1f3d 0%, #0157c2 60%, #0170f4 100%)",
            boxShadow: "0 32px 80px rgba(1,112,244,0.3)",
          }}
        >
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 60% 40%, rgba(143,187,249,0.12) 0%, transparent 60%)" }} />

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black text-white mb-5 relative"
          >
            {c.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-lg max-w-2xl mx-auto mb-10 relative"
            style={{ color: "#c4dcfc" }}
          >
            {c.subheading}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center relative"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href={c.primaryHref}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-[#0f1f3d] bg-white shadow-xl transition-all"
              >
                {c.primaryLabel} <ArrowRight size={17} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href={c.secondaryHref}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white border-2 border-white/30 transition-all hover:bg-white/10"
              >
                {c.secondaryLabel}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
