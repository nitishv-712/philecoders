"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, CheckCircle2 } from "lucide-react";
import { submitReview } from "@/lib/firestore";

export default function ReviewForm({ serviceSlug }: { serviceSlug: string }) {
  const [rating,    setRating]    = useState(0);
  const [hover,     setHover]     = useState(0);
  const [form,      setForm]      = useState({ name: "", role: "", text: "" });
  const [loading,   setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error,     setError]     = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) { setError("Please select a star rating."); return; }
    setError("");
    setLoading(true);
    try {
      await submitReview({ serviceSlug, rating, ...form });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border p-6"
      style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(167,139,250,0.12)" }}>
      <h3 className="text-base font-bold text-white mb-1">Leave a Review</h3>
      <p className="text-xs mb-5" style={{ color: "#4a6080" }}>
        Your review will appear after approval.
      </p>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-8 text-center gap-3"
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: "rgba(5,150,105,0.15)" }}>
              <CheckCircle2 size={28} style={{ color: "#059669" }} />
            </div>
            <p className="font-semibold text-white">Thanks for your review!</p>
            <p className="text-xs" style={{ color: "#4a6080" }}>It will show up once approved.</p>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} className="space-y-4">
            {/* Star picker */}
            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: "#a78bfa" }}>Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setRating(s)}
                    onMouseEnter={() => setHover(s)}
                    onMouseLeave={() => setHover(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      size={24}
                      className={`transition-colors ${(hover || rating) >= s ? "fill-current" : ""}`}
                      style={{ color: (hover || rating) >= s ? "#f59e0b" : "#2d4463" }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: "name", label: "Your Name",  placeholder: "Jane Doe" },
                { id: "role", label: "Role / Company", placeholder: "CEO, Acme Inc." },
              ].map((f) => (
                <div key={f.id}>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#a78bfa" }}>{f.label}</label>
                  <input
                    required
                    placeholder={f.placeholder}
                    value={form[f.id as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl text-sm placeholder-[#4a6080] outline-none transition-all"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(167,139,250,0.15)", color: "var(--text-primary)" }}

                    onFocus={(e) => (e.target.style.borderColor = "#7c3aed")}
                    onBlur={(e)  => (e.target.style.borderColor = "rgba(167,139,250,0.15)")}
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "#a78bfa" }}>Your Review</label>
              <textarea
                required
                rows={4}
                placeholder="Share your experience working with us..."
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl text-sm placeholder-[#4a6080] outline-none transition-all resize-none"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(143,187,249,0.15)", color: "var(--text-primary)" }}
                onFocus={(e) => (e.target.style.borderColor = "#0170f4")}
                onBlur={(e)  => (e.target.style.borderColor = "rgba(143,187,249,0.15)")}
              />
            </div>

            {error && <p className="text-xs text-red-400">{error}</p>}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold disabled:opacity-60 transition-all"
              style={{ background: "linear-gradient(135deg, #0170f4, #7c3aed)" }}
            >
              {loading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 rounded-full" style={{ borderColor: "rgba(255,255,255,0.3)", borderTopColor: "#fff" }} />
              ) : (
                <><Send size={14} /> Submit Review</>
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
