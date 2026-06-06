"use client";

import { useState } from "react";
import { Link, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.href : `https://www.philecoders.com/blog/${slug}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL: ", err);
    }
  };

  const xShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `Read "${title}" by @philecoders`
  )}&url=${encodeURIComponent(shareUrl)}`;

  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>
        Share Article
      </h4>
      <div className="flex flex-row lg:flex-col gap-2.5">
        {/* Copy Link */}
        <button
          onClick={handleCopy}
          className="relative flex items-center justify-center lg:justify-start gap-2.5 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all hover:bg-slate-50 cursor-pointer"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-body)" }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="check"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2 text-[#059669]"
              >
                <Check size={16} />
                <span className="text-xs">Copied!</span>
              </motion.span>
            ) : (
              <motion.span
                key="link"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2"
              >
                <Link size={16} style={{ color: "var(--text-muted)" }} />
                <span className="text-xs">Copy Link</span>
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Share on X */}
        <a
          href={xShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center lg:justify-start gap-2.5 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all hover:bg-slate-50"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-body)" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-black">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          <span className="text-xs hidden sm:inline lg:inline">Share on X</span>
        </a>

        {/* Share on LinkedIn */}
        <a
          href={linkedInShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center lg:justify-start gap-2.5 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all hover:bg-slate-50"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-body)" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#0170f4]">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
          <span className="text-xs hidden sm:inline lg:inline">LinkedIn</span>
        </a>
      </div>
    </div>
  );
}
