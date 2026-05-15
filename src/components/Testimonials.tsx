"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import content from "@/content.json";

const { testimonials: t } = content;

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-90px" });

  const prev = () => setCurrent((c) => (c - 1 + t.items.length) % t.items.length);
  const next = () => setCurrent((c) => (c + 1) % t.items.length);
  const item = t.items[current];

  return (
    <section id="testimonials" className="py-24 sm:py-32 relative overflow-hidden"
      style={{ background: "var(--bg)" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(ellipse, rgba(1,112,244,0.06) 0%, transparent 70%)" }} />
      </div>
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
            <Star size={13} className="fill-current" /> {t.badge}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            {t.heading} <span className="gradient-text">{t.headingAccent}</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.38, ease: "easeInOut" }}
              className="relative rounded-3xl p-8 sm:p-12 border overflow-hidden"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(1,112,244,0.06) 0%, transparent 70%)" }} />

              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6 shadow-lg"
                style={{ background: "linear-gradient(135deg, #10274b, #0170f4)" }}>
                <Quote size={18} className="text-white" />
              </div>

              <div className="flex gap-1 mb-6">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.07 }}>
                    <Star size={17} className="fill-current" style={{ color: "#0170f4" }} />
                  </motion.div>
                ))}
              </div>

              <p className="text-lg sm:text-xl leading-relaxed mb-8 italic" style={{ color: "var(--text-body)" }}>
                &ldquo;{item.text}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                  style={{ background: "linear-gradient(135deg, #10274b, #0170f4)" }}>
                  {item.avatar}
                </div>
                <div>
                  <div className="font-bold" style={{ color: "var(--text-primary)" }}>{item.name}</div>
                  <div className="text-sm" style={{ color: "var(--text-muted)" }}>{item.role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {t.items.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setCurrent(i)}
                  whileHover={{ scale: 1.2 }}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ width: i === current ? 32 : 8, background: i === current ? "#0170f4" : "rgba(1,112,244,0.2)" }}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <motion.button onClick={prev} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full flex items-center justify-center border transition-colors"
                style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                <ChevronLeft size={17} />
              </motion.button>
              <motion.button onClick={next} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg"
                style={{ background: "linear-gradient(135deg, #0157c2, #0170f4)" }}>
                <ChevronRight size={17} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-12">
          {t.items.map((ti, i) => (
            <motion.button
              key={ti.name}
              onClick={() => setCurrent(i)}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.07 }}
              whileHover={{ scale: 1.03 }}
              className="p-3 rounded-xl border text-left transition-all"
              style={i === current
                ? { borderColor: "#0170f4", background: "rgba(1,112,244,0.08)" }
                : { borderColor: "var(--border)", background: "var(--bg-card)" }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold mb-2"
                style={{ background: "linear-gradient(135deg, #10274b, #0170f4)" }}>
                {ti.avatar}
              </div>
              <div className="text-xs font-semibold truncate" style={{ color: "var(--text-primary)" }}>{ti.name}</div>
              <div className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{ti.role.split(",")[0]}</div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
