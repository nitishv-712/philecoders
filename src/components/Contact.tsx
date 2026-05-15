"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2 } from "lucide-react";
import content from "@/content.json";
import { submitContact } from "@/lib/firestore";

const { contact: c } = content;

const iconMap: Record<string, React.ElementType> = { Mail, Phone, MapPin };

export default function Contact() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-90px" });
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitContact(form);
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative overflow-hidden"
      style={{ background: "var(--bg-section)" }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(1,112,244,0.3), transparent)" }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(1,112,244,0.06) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div ref={ref} className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-4"
            style={{ background: "var(--badge-bg)", borderColor: "rgba(1,112,244,0.2)", color: "var(--badge-color)" }}
          >
            <MessageSquare size={13} /> {c.badge}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            {c.heading} <span className="gradient-text">{c.headingAccent}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-muted)" }}
          >
            {c.subheading}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {c.info.map((item, i) => {
              const Icon = iconMap[item.icon] ?? Mail;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -18 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-4 p-5 rounded-2xl border"
                  style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(1,112,244,0.1)", color: "#0170f4" }}>
                    <Icon size={19} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>{item.label}</div>
                    <div className="text-sm font-semibold mt-0.5" style={{ color: "var(--text-primary)" }}>{item.value}</div>
                  </div>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-1 p-6 rounded-2xl text-white shadow-xl"
              style={{ background: "linear-gradient(135deg, #0157c2 0%, #0170f4 100%)", boxShadow: "0 20px 48px rgba(1,112,244,0.25)" }}
            >
              <div className="text-2xl mb-3">{c.cta.emoji}</div>
              <h3 className="font-bold text-lg mb-2">{c.cta.heading}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#c4dcfc" }}>{c.cta.text}</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="rounded-3xl border p-8"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{ background: "rgba(1,112,244,0.1)" }}
                  >
                    <CheckCircle2 size={30} style={{ color: "#0170f4" }} />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>{c.form.successTitle}</h3>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>{c.form.successText}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      { id: "name",  label: "Your Name",    placeholder: c.form.namePlaceholder,  type: "text" },
                      { id: "email", label: "Email Address", placeholder: c.form.emailPlaceholder, type: "email" },
                    ].map((field) => (
                      <div key={field.id}>
                        <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-body)" }}>{field.label}</label>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          required
                          value={form[field.id as keyof typeof form]}
                          onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                          style={{
                            background: "var(--input-bg)",
                            border: "1px solid var(--input-border)",
                            color: "var(--text-primary)",
                          }}
                          onFocus={(e) => (e.target.style.borderColor = "#0170f4")}
                          onBlur={(e)  => (e.target.style.borderColor = "var(--input-border)")}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-body)" }}>Subject</label>
                    <input
                      type="text"
                      placeholder={c.form.subjectPlaceholder}
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{
                        background: "var(--input-bg)",
                        border: "1px solid var(--input-border)",
                        color: "var(--text-primary)",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#0170f4")}
                      onBlur={(e)  => (e.target.style.borderColor = "var(--input-border)")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-body)" }}>Message</label>
                    <textarea
                      rows={5}
                      placeholder={c.form.messagePlaceholder}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                      style={{
                        background: "var(--input-bg)",
                        border: "1px solid var(--input-border)",
                        color: "var(--text-primary)",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#0170f4")}
                      onBlur={(e)  => (e.target.style.borderColor = "var(--input-border)")}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(1,112,244,0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-semibold text-sm shadow-lg disabled:opacity-70 transition-all"
                    style={{ background: "linear-gradient(90deg, #0157c2 0%, #0170f4 100%)" }}
                  >
                    {loading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 rounded-full"
                        style={{ borderColor: "rgba(255,255,255,0.3)", borderTopColor: "#fff" }}
                      />
                    ) : (
                      <>{c.form.submitLabel} <Send size={15} /></>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
