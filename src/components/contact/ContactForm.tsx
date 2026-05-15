"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import content from "@/content.json";
import { submitContact } from "@/lib/firestore";

const { contact: c } = content;

export default function ContactForm() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try { await submitContact(form); } catch { /* silent */ }
    finally { setLoading(false); setSubmitted(true); }
  };

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            <div className="p-6 rounded-2xl text-white shadow-xl"
              style={{ background: "linear-gradient(135deg, #0157c2 0%, #0170f4 100%)", boxShadow: "0 20px 48px rgba(1,112,244,0.25)" }}>
              <div className="text-3xl mb-3">{c.cta.emoji}</div>
              <h3 className="font-bold text-xl mb-2">{c.cta.heading}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#c4dcfc" }}>{c.cta.text}</p>
            </div>

            <div className="p-6 rounded-2xl border space-y-4"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <h4 className="font-bold" style={{ color: "var(--text-primary)" }}>Business Hours</h4>
              {[
                { day: "Mon – Fri", hours: "9:00 AM – 6:00 PM PST" },
                { day: "Saturday",  hours: "10:00 AM – 2:00 PM PST" },
                { day: "Sunday",    hours: "Closed" },
              ].map((r) => (
                <div key={r.day} className="flex justify-between text-sm">
                  <span style={{ color: "var(--text-muted)" }}>{r.day}</span>
                  <span className="font-medium" style={{ color: "var(--text-primary)" }}>{r.hours}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="rounded-3xl border p-8" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{ background: "rgba(1,112,244,0.1)" }}>
                    <CheckCircle2 size={30} style={{ color: "#0170f4" }} />
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>{c.form.successTitle}</h3>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>{c.form.successText}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-black mb-6" style={{ color: "var(--text-primary)" }}>Send us a message</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      { id: "name",  label: "Your Name",     placeholder: c.form.namePlaceholder,  type: "text" },
                      { id: "email", label: "Email Address",  placeholder: c.form.emailPlaceholder, type: "email" },
                    ].map((field) => (
                      <div key={field.id}>
                        <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-body)" }}>{field.label}</label>
                        <input
                          type={field.type} placeholder={field.placeholder} required
                          value={form[field.id as keyof typeof form]}
                          onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                          style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)" }}
                          onFocus={(e) => (e.target.style.borderColor = "#0170f4")}
                          onBlur={(e)  => (e.target.style.borderColor = "var(--input-border)")}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-body)" }}>Subject</label>
                    <input
                      type="text" placeholder={c.form.subjectPlaceholder} required
                      value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)" }}
                      onFocus={(e) => (e.target.style.borderColor = "#0170f4")}
                      onBlur={(e)  => (e.target.style.borderColor = "var(--input-border)")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-body)" }}>Message</label>
                    <textarea
                      rows={5} placeholder={c.form.messagePlaceholder} required
                      value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                      style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)" }}
                      onFocus={(e) => (e.target.style.borderColor = "#0170f4")}
                      onBlur={(e)  => (e.target.style.borderColor = "var(--input-border)")}
                    />
                  </div>
                  <motion.button
                    type="submit" disabled={loading}
                    whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(1,112,244,0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-semibold text-sm shadow-lg disabled:opacity-70 transition-all"
                    style={{ background: "linear-gradient(90deg, #0157c2 0%, #0170f4 100%)" }}
                  >
                    {loading
                      ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 rounded-full" style={{ borderColor: "rgba(255,255,255,0.3)", borderTopColor: "#fff" }} />
                      : <>{c.form.submitLabel} <Send size={15} /></>
                    }
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
