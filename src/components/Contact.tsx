"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2 } from "lucide-react";

const contactInfo = [
  { icon: Mail,   label: "Email",    value: "hello@philecoders.com" },
  { icon: Phone,  label: "Phone",    value: "+1 (555) 123-4567" },
  { icon: MapPin, label: "Location", value: "San Francisco, CA" },
];

export default function Contact() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-90px" });
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #071630 0%, #10274b 100%)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(1,112,244,0.4), transparent)" }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(1,112,244,0.07) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div ref={ref} className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-4"
            style={{ background: "rgba(1,112,244,0.1)", borderColor: "rgba(143,187,249,0.2)", color: "#8fbbf9" }}
          >
            <MessageSquare size={13} /> Get In Touch
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-white mb-4"
          >
            Let&apos;s Build <span className="gradient-text">Together</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "#8496b2" }}
          >
            Have a project in mind? We&apos;d love to hear about it. Send us a message and we&apos;ll get back to you within 24 hours.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {contactInfo.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -18 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-4 p-5 rounded-2xl border"
                  style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(143,187,249,0.1)" }}
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(1,112,244,0.15)", color: "#0170f4" }}>
                    <Icon size={19} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#4a6080" }}>{item.label}</div>
                    <div className="text-sm font-semibold text-white mt-0.5">{item.value}</div>
                  </div>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-1 p-6 rounded-2xl text-white shadow-xl"
              style={{ background: "linear-gradient(135deg, #0157c2 0%, #0170f4 100%)", boxShadow: "0 20px 48px rgba(1,112,244,0.3)" }}
            >
              <div className="text-2xl mb-3">🚀</div>
              <h3 className="font-bold text-lg mb-2">Ready to start?</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#c4dcfc" }}>
                Most projects kick off within 48 hours of our first call. Let&apos;s make something great together.
              </p>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="rounded-3xl border p-8"
              style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(143,187,249,0.1)" }}>
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
                    style={{ background: "rgba(1,112,244,0.15)" }}
                  >
                    <CheckCircle2 size={30} style={{ color: "#0170f4" }} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-sm" style={{ color: "#8496b2" }}>
                    Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      { id: "name",  label: "Your Name",    placeholder: "John Doe",         type: "text" },
                      { id: "email", label: "Email Address", placeholder: "john@example.com", type: "email" },
                    ].map((field) => (
                      <div key={field.id}>
                        <label className="block text-sm font-semibold mb-2" style={{ color: "#8fbbf9" }}>
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          required
                          value={form[field.id as keyof typeof form]}
                          onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-[#4a6080] outline-none transition-all"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(143,187,249,0.15)" }}
                          onFocus={(e) => (e.target.style.borderColor = "#0170f4")}
                          onBlur={(e)  => (e.target.style.borderColor = "rgba(143,187,249,0.15)")}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: "#8fbbf9" }}>Subject</label>
                    <input
                      type="text"
                      placeholder="Project inquiry, collaboration..."
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-[#4a6080] outline-none transition-all"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(143,187,249,0.15)" }}
                      onFocus={(e) => (e.target.style.borderColor = "#0170f4")}
                      onBlur={(e)  => (e.target.style.borderColor = "rgba(143,187,249,0.15)")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: "#8fbbf9" }}>Message</label>
                    <textarea
                      rows={5}
                      placeholder="Tell us about your project..."
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-[#4a6080] outline-none transition-all resize-none"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(143,187,249,0.15)" }}
                      onFocus={(e) => (e.target.style.borderColor = "#0170f4")}
                      onBlur={(e)  => (e.target.style.borderColor = "rgba(143,187,249,0.15)")}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(1,112,244,0.35)" }}
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
                      <> Send Message <Send size={15} /> </>
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
