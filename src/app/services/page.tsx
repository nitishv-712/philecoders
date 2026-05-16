"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronDown, Globe, Smartphone, Palette, Database, Shield, Zap , type LucideIcon } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import content from "@/content.json";

const { services } = content;

const iconMap: Record<string, LucideIcon> = {
  Globe, Smartphone, Palette, Database, Shield, Zap,
};

/* ── Service Card ── */
function ServiceCard({ item, index }: { item: typeof services.items[0]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon   = iconMap[item.icon] ?? Zap;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        href={`/services/${item.slug}`}
        className="group relative flex flex-col h-full p-7 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(1,112,244,0.12)]"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
      >
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: "var(--card-hover)" }} />
        <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "linear-gradient(90deg, #0170f4, #7c3aed)" }} />

        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 shadow-md flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #0170f4 0%, #7c3aed 100%)" }}>
          <Icon size={22} className="text-white" />
        </div>

        <h3 className="text-lg font-black mb-2" style={{ color: "var(--text-primary)" }}>{item.title}</h3>
        <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "var(--text-muted)" }}>{item.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {item.tags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 text-xs font-medium rounded-full"
              style={{ background: "var(--tag-bg)", color: "var(--tag-color)" }}>
              {tag}
            </span>
          ))}
        </div>

        <ul className="space-y-2 mb-6">
          {item.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-xs" style={{ color: "var(--text-body)" }}>
              <CheckCircle2 size={13} style={{ color: "#059669", flexShrink: 0, marginTop: 1 }} />
              {f}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5 text-sm font-semibold mt-auto" style={{ color: "#7c3aed" }}>
          Learn more <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.div>
  );
}

/* ── FAQ Item ── */
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07 }}
      className="rounded-2xl border overflow-hidden"
      style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-semibold text-sm sm:text-base" style={{ color: "var(--text-primary)" }}>{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex-shrink-0">
          <ChevronDown size={18} style={{ color: "var(--text-muted)" }} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
          >
            <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Page ── */
export default function ServicesPage() {
  const heroRef    = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const faqRef     = useRef<HTMLDivElement>(null);
  const processInView = useInView(processRef, { once: true, margin: "-80px" });
  const faqInView     = useInView(faqRef,     { once: true, margin: "-80px" });

  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ── */}
        <section
          ref={heroRef}
          className="pt-32 pb-20 relative overflow-hidden dot-grid"
          style={{ background: "linear-gradient(160deg, #ede9fe 0%, #e0eeff 40%, #f0f6ff 70%, #faf5ff 100%)" }}
        >
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(circle at 60% 40%, rgba(124,58,237,0.08) 0%, transparent 60%)" }} />

          <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-5"
              style={{ background: "var(--badge-bg)", borderColor: "rgba(124,58,237,0.25)", color: "var(--badge-color)" }}
            >
              {services.badge}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-6xl font-black mb-5 leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {services.heading}{" "}
              <span className="gradient-text">{services.headingAccent}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg max-w-2xl mx-auto mb-10"
              style={{ color: "var(--text-body)" }}
            >
              {services.subheading}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-semibold shadow-xl transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #0170f4, #7c3aed)", boxShadow: "0 12px 32px rgba(124,58,237,0.25)" }}
              >
                Start a Project <ArrowRight size={17} />
              </Link>
              <a
                href="#services-grid"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold border-2 transition-all hover:scale-105"
                style={{ borderColor: "rgba(124,58,237,0.25)", color: "var(--text-body)" }}
              >
                Browse Services
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── How We Work ── */}
        <section className="py-24 relative overflow-hidden" style={{ background: "var(--bg)" }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div ref={processRef} className="text-center mb-14">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={processInView ? { opacity: 1, y: 0 } : {}}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-4"
                style={{ background: "var(--badge-bg)", borderColor: "rgba(124,58,237,0.2)", color: "var(--badge-color)" }}
              >
                How We Work
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                animate={processInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl font-black"
                style={{ color: "var(--text-primary)" }}
              >
                From Idea to <span className="gradient-text">Live Product</span>
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.process.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 28 }}
                  animate={processInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                  className="relative p-6 rounded-2xl border"
                  style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
                >
                  {i < services.process.length - 1 && (
                    <div className="hidden lg:block absolute top-10 -right-3 w-6 h-px z-10"
                      style={{ background: "linear-gradient(90deg, #7c3aed, transparent)" }} />
                  )}
                  <div className="text-3xl font-black mb-4 gradient-text">{step.step}</div>
                  <h3 className="font-bold mb-2" style={{ color: "var(--text-primary)" }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services Grid ── */}
        <section id="services-grid" className="py-24 relative overflow-hidden" style={{ background: "var(--bg-section)" }}>
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25), transparent)" }} />

          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-4"
                style={{ background: "var(--badge-bg)", borderColor: "rgba(124,58,237,0.2)", color: "var(--badge-color)" }}>
                All Services
              </div>
              <h2 className="text-4xl sm:text-5xl font-black" style={{ color: "var(--text-primary)" }}>
                Everything You <span className="gradient-text">Need to Ship</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.items.map((item, i) => (
                <ServiceCard key={item.slug} item={item} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-24 relative overflow-hidden" style={{ background: "var(--bg)" }}>
          <div className="max-w-3xl mx-auto px-5 sm:px-8">
            <div ref={faqRef} className="text-center mb-14">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={faqInView ? { opacity: 1, y: 0 } : {}}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-4"
                style={{ background: "var(--badge-bg)", borderColor: "rgba(124,58,237,0.2)", color: "var(--badge-color)" }}
              >
                FAQ
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                animate={faqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl font-black"
                style={{ color: "var(--text-primary)" }}
              >
                Common <span className="gradient-text">Questions</span>
              </motion.h2>
            </div>

            <div className="space-y-3">
              {services.faq.map((item, i) => (
                <FaqItem key={i} q={item.q} a={item.a} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 relative overflow-hidden" style={{ background: "var(--bg-section)" }}>
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25), transparent)" }} />
          <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
            <div
              className="relative rounded-3xl p-12 sm:p-16 overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #0f1f3d 0%, #10274b 30%, #7c3aed 100%)",
                boxShadow: "0 32px 80px rgba(124,58,237,0.25)",
              }}
            >
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 60% 40%, rgba(167,139,250,0.15) 0%, transparent 60%)" }} />
              <h2 className="text-3xl sm:text-5xl font-black text-white mb-5 relative">
                Not sure where to start?
              </h2>
              <p className="text-lg max-w-xl mx-auto mb-10 relative" style={{ color: "#ddd6fe" }}>
                Book a free 30-minute discovery call. We&apos;ll listen to your goals and recommend the right approach — no commitment required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-[#0f1f3d] bg-white shadow-xl transition-all hover:scale-105"
                >
                  Book a Free Call <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
