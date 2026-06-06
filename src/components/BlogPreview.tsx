"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Calendar, Clock, BookOpen } from "lucide-react";
import Link from "next/link";
import { blogPosts } from "@/data/blog";

export default function BlogPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-60px" });

  // Get the latest 3 posts
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "var(--bg-section)" }}>
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25), transparent)" }} />

      <div ref={containerRef} className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-4"
              style={{ background: "var(--badge-bg)", borderColor: "rgba(124,58,237,0.2)", color: "var(--badge-color)" }}
            >
              <BookOpen size={14} className="text-[#7c3aed]" /> Latest Insights
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-black"
              style={{ color: "var(--text-primary)" }}
            >
              From Our <span className="gradient-text">Blog</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold transition-all hover:gap-3"
              style={{ color: "#7c3aed" }}
            >
              Read All Articles <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>

        {/* Grid of posts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {recentPosts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group relative flex flex-col h-full rounded-2xl p-5 sm:p-6 border transition-all duration-300 hover:shadow-[0_20px_48px_rgba(1,112,244,0.08)] hover:-translate-y-1 w-full"
                style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
              >
                {/* Hover highlights */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: "var(--card-hover)" }} />
                <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(90deg, #0170f4, #7c3aed)" }} />

                {/* Cover visual */}
                <div className="rounded-xl overflow-hidden aspect-video relative mb-5 bg-slate-900 border" style={{ borderColor: "var(--border-soft)" }}>
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="object-cover absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Details */}
                <div className="flex items-center gap-3 mb-3 relative">
                  <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full"
                    style={{ background: "var(--tag-bg)", color: "var(--tag-color)" }}>
                    {post.category}
                  </span>
                  <span className="text-xs flex items-center gap-1.5" style={{ color: "var(--text-faint)" }}>
                    <Calendar size={13} /> {post.date}
                  </span>
                </div>

                <h3 className="text-lg font-black mb-2 group-hover:text-[#7c3aed] transition-colors leading-snug relative flex-shrink-0" style={{ color: "var(--text-primary)" }}>
                  {post.title}
                </h3>
                <p className="text-sm leading-relaxed mb-6 flex-grow relative" style={{ color: "var(--text-muted)" }}>
                  {post.excerpt}
                </p>

                {/* Author footer */}
                <div className="flex items-center justify-between pt-4 border-t relative mt-auto" style={{ borderColor: "var(--border-soft)" }}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white"
                      style={{ background: "linear-gradient(135deg, #0170f4, #7c3aed)" }}>
                      {post.author.avatar}
                    </div>
                    <span className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                      {post.author.name}
                    </span>
                  </div>
                  <span className="text-xs flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                    <Clock size={12} /> {post.readTime}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
