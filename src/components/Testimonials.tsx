"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const testimonials = [
  { name: "Sarah Johnson",  role: "CEO, TechVentures",    avatar: "SJ", rating: 5, text: "PhileCoders transformed our vision into a stunning product. Their attention to detail, technical expertise, and commitment to deadlines is unmatched. Our platform now handles 10x the traffic with zero issues." },
  { name: "Marcus Chen",    role: "Founder, ShopNest",    avatar: "MC", rating: 5, text: "Working with PhileCoders was a game-changer. They didn't just build what we asked for — they improved our ideas and delivered a product that exceeded every expectation. Highly recommend!" },
  { name: "Priya Patel",    role: "CTO, MediConnect",     avatar: "PP", rating: 5, text: "The team's technical depth is impressive. They navigated complex healthcare compliance requirements while delivering a beautiful, intuitive app. Our users love it and so do we." },
  { name: "David Williams", role: "PM, EduLearn",         avatar: "DW", rating: 5, text: "PhileCoders delivered our e-learning platform on time and on budget. The code quality is exceptional — clean, well-documented, and easy to maintain. A true professional team." },
  { name: "Aisha Rahman",   role: "Director, FinTrack",   avatar: "AR", rating: 5, text: "From the first call to final delivery, PhileCoders was professional, responsive, and genuinely invested in our success. The dashboard they built is now our biggest competitive advantage." },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const ref   = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-90px" });

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const t = testimonials[current];

  return (
    <section id="testimonials" className="py-24 sm:py-32 relative overflow-hidden bg-white dark:bg-[#071630]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(ellipse, rgba(1,112,244,0.06) 0%, transparent 70%)" }} />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(1,112,244,0.3), transparent)" }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div ref={ref} className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-4"
            style={{ background: "rgba(1,112,244,0.08)", borderColor: "rgba(143,187,249,0.2)", color: "#8fbbf9" }}
          >
            <Star size={13} className="fill-current" /> Client Stories
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-[#10274b] dark:text-white mb-4"
          >
            What Our <span className="gradient-text">Clients Say</span>
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
              style={{ background: "rgba(1,112,244,0.04)", borderColor: "rgba(143,187,249,0.12)" }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(1,112,244,0.08) 0%, transparent 70%)" }} />

              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6 shadow-lg"
                style={{ background: "linear-gradient(135deg, #10274b, #0170f4)" }}>
                <Quote size={18} className="text-white" />
              </div>

              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.07 }}>
                    <Star size={17} className="fill-current" style={{ color: "#0170f4" }} />
                  </motion.div>
                ))}
              </div>

              <p className="text-lg sm:text-xl leading-relaxed mb-8 italic text-[#2d4463] dark:text-[#c4cdd9]">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                  style={{ background: "linear-gradient(135deg, #10274b, #0170f4)" }}>
                  {t.avatar}
                </div>
                <div>
                  <div className="font-bold text-[#10274b] dark:text-white">{t.name}</div>
                  <div className="text-sm" style={{ color: "#4a6080" }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setCurrent(i)}
                  whileHover={{ scale: 1.2 }}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? 32 : 8,
                    background: i === current ? "#0170f4" : "rgba(143,187,249,0.25)",
                  }}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <motion.button onClick={prev} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full flex items-center justify-center border transition-colors"
                style={{ borderColor: "rgba(143,187,249,0.2)", color: "#8496b2" }}>
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

        {/* Mini cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-12">
          {testimonials.map((t, i) => (
            <motion.button
              key={t.name}
              onClick={() => setCurrent(i)}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.07 }}
              whileHover={{ scale: 1.03 }}
              className="p-3 rounded-xl border text-left transition-all"
              style={
                i === current
                  ? { borderColor: "#0170f4", background: "rgba(1,112,244,0.1)" }
                  : { borderColor: "rgba(143,187,249,0.1)", background: "rgba(255,255,255,0.02)" }
              }
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold mb-2"
                style={{ background: "linear-gradient(135deg, #10274b, #0170f4)" }}>
                {t.avatar}
              </div>
              <div className="text-xs font-semibold text-[#10274b] dark:text-white truncate">{t.name}</div>
              <div className="text-xs truncate" style={{ color: "#4a6080" }}>{t.role.split(",")[0]}</div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
