"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, CheckCircle2 } from "lucide-react";
import { subscribeEmail } from "@/lib/firestore";

export default function NewsletterSignup() {
  const [email,     setEmail]     = useState("");
  const [loading,   setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error,     setError]     = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await subscribeEmail(email);
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 border-t" style={{ borderColor: "var(--border-soft)" }}>
      <div className="max-w-xl mx-auto text-center px-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4"
          style={{ background: "rgba(1,112,244,0.1)" }}>
          <Mail size={18} style={{ color: "#0170f4" }} />
        </div>
        <h3 className="text-base font-bold mb-1" style={{ color: "var(--text-primary)" }}>Stay in the loop</h3>
        <p className="text-xs mb-5" style={{ color: "var(--text-muted)" }}>
          Get occasional updates on new services, case studies, and tech insights. No spam.
        </p>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div key="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2" style={{ color: "#0170f4" }}>
              <CheckCircle2 size={18} />
              <span className="text-sm font-semibold">You&apos;re subscribed!</span>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={handleSubmit} className="flex gap-2 max-w-sm mx-auto">
              <input
                type="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)" }}
                onFocus={(e) => (e.target.style.borderColor = "#0170f4")}
                onBlur={(e)  => (e.target.style.borderColor = "var(--input-border)")}
              />
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold disabled:opacity-60 flex-shrink-0"
                style={{ background: "linear-gradient(90deg, #0157c2, #0170f4)" }}
              >
                {loading ? "…" : "Subscribe"}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
        {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}
