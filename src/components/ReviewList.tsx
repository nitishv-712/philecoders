"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, MessageSquare } from "lucide-react";
import { getApprovedReviews, type Review } from "@/lib/firestore";

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} size={13}
          className={s <= rating ? "fill-current" : ""}
          style={{ color: s <= rating ? "#0170f4" : "#2d4463" }} />
      ))}
    </div>
  );
}

export default function ReviewList({ serviceSlug }: { serviceSlug: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getApprovedReviews(serviceSlug)
      .then(setReviews)
      .finally(() => setLoading(false));
  }, [serviceSlug]);

  const avg = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  if (loading) {
    return (
      <div className="flex items-center gap-2 py-8" style={{ color: "#4a6080" }}>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-4 h-4 border-2 rounded-full" style={{ borderColor: "rgba(143,187,249,0.2)", borderTopColor: "#0170f4" }} />
        <span className="text-sm">Loading reviews…</span>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center py-10 gap-3 text-center">
        <MessageSquare size={32} style={{ color: "#2d4463" }} />
        <p className="text-sm font-medium text-white">No reviews yet</p>
        <p className="text-xs" style={{ color: "#4a6080" }}>Be the first to share your experience.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Summary bar */}
      <div className="flex items-center gap-4 mb-6 p-4 rounded-xl"
        style={{ background: "rgba(1,112,244,0.08)", border: "1px solid rgba(143,187,249,0.1)" }}>
        <div className="text-4xl font-black gradient-text">{avg}</div>
        <div>
          <StarRow rating={Math.round(Number(avg))} />
          <p className="text-xs mt-1" style={{ color: "#4a6080" }}>{reviews.length} verified review{reviews.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {reviews.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="p-5 rounded-2xl border"
            style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(143,187,249,0.1)" }}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #10274b, #0170f4)" }}>
                  {r.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{r.name}</div>
                  <div className="text-xs" style={{ color: "#4a6080" }}>{r.role}</div>
                </div>
              </div>
              <StarRow rating={r.rating} />
            </div>
            <p className="text-sm leading-relaxed italic" style={{ color: "#8496b2" }}>
              &ldquo;{r.text}&rdquo;
            </p>
            {r.createdAt && (
              <p className="text-xs mt-3" style={{ color: "#2d4463" }}>
                {r.createdAt.toDate().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
