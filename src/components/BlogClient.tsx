"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterSignup from "@/components/NewsletterSignup";
import { blogPosts, type BlogPost } from "@/data/blog";
import { getFirestoreBlogPosts } from "@/lib/firestore";

const CATEGORIES = ["All", "Engineering", "UI/UX Design", "Marketing"];

export default function BlogClient() {
  const [allPosts, setAllPosts] = useState<BlogPost[]>(blogPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    async function loadDynamicPosts() {
      try {
        const dynamicPosts = await getFirestoreBlogPosts();
        if (dynamicPosts.length > 0) {
          // Merge dynamic posts first, then the default static posts
          setAllPosts([...dynamicPosts, ...blogPosts]);
        }
      } catch (err) {
        console.error("Failed to load dynamic blog posts:", err);
      }
    }
    loadDynamicPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [allPosts, searchQuery, selectedCategory]);

  // The first post is the featured post (only if no category/search filter is active, or if it matches the filter)
  const featuredPost = useMemo(() => {
    if (filteredPosts.length === 0) return null;
    return filteredPosts[0];
  }, [filteredPosts]);

  const gridPosts = useMemo(() => {
    if (filteredPosts.length <= 1) return [];
    return filteredPosts.slice(1);
  }, [filteredPosts]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ background: "var(--bg)" }}>
        {/* Hero Section */}
        <section
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
              <BookOpen size={14} className="text-[#7c3aed]" /> PhileCoders Insights
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-6xl font-black mb-5 leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Our <span className="gradient-text">Blog</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg max-w-2xl mx-auto mb-10"
              style={{ color: "var(--text-body)" }}
            >
              Deep dives into Next.js, design engineering, search optimization, and scaling digital products in India and globally.
            </motion.p>
          </div>
        </section>

        {/* Filter and Search Bar */}
        <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-12 pb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b" style={{ borderColor: "var(--border-soft)" }}>
            {/* Categories */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="relative px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-colors"
                  style={{
                    color: selectedCategory === cat ? "var(--badge-color)" : "var(--text-muted)",
                    background: selectedCategory === cat ? "transparent" : "rgba(0,0,0,0.02)",
                    border: "1px solid",
                    borderColor: selectedCategory === cat ? "rgba(124, 58, 237, 0.25)" : "var(--border-soft)"
                  }}
                >
                  {selectedCategory === cat && (
                    <motion.span
                      layoutId="active-category-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: "var(--badge-bg)", zIndex: -1 }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none" style={{ color: "var(--text-faint)" }}>
                <Search size={16} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles or tags..."
                className="w-full pl-11 pr-4 py-2.5 rounded-full text-sm outline-none transition-all"
                style={{
                  background: "var(--input-bg)",
                  border: "1px solid var(--input-border)",
                  color: "var(--text-primary)"
                }}
                onFocus={(e) => (e.target.style.borderColor = "#7c3aed")}
                onBlur={(e) => (e.target.style.borderColor = "var(--input-border)")}
              />
            </div>
          </div>
        </section>

        {/* Blog Post List */}
        <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-20">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg font-semibold" style={{ color: "var(--text-muted)" }}>No articles found matching your query.</p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold"
                style={{ color: "#7c3aed" }}
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Featured Post */}
              {featuredPost && (
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 rounded-3xl p-6 sm:p-8 border transition-all duration-300 hover:shadow-[0_24px_64px_rgba(124,58,237,0.1)] hover:-translate-y-1"
                    style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
                  >
                    {/* Hover highlights */}
                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ background: "var(--card-hover)" }} />
                    <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "linear-gradient(90deg, #0170f4, #7c3aed)" }} />

                    {/* Image Cover */}
                    <div className="lg:col-span-7 rounded-2xl overflow-hidden relative aspect-video lg:aspect-auto min-h-[260px] bg-slate-900 border" style={{ borderColor: "var(--border-soft)" }}>
                      <img
                        src={featuredPost.coverImage}
                        alt={featuredPost.title}
                        className="object-cover absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 text-xs font-bold rounded-full shadow-md text-white bg-slate-900/80 backdrop-blur-md">
                          Featured
                        </span>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="lg:col-span-5 flex flex-col justify-between py-2 relative">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="px-2.5 py-1 text-xs font-semibold rounded-full"
                            style={{ background: "var(--tag-bg)", color: "var(--tag-color)" }}>
                            {featuredPost.category}
                          </span>
                          <span className="text-xs flex items-center gap-1" style={{ color: "var(--text-faint)" }}>
                            <Calendar size={13} /> {featuredPost.date}
                          </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black mb-3 group-hover:text-[#7c3aed] transition-colors leading-tight" style={{ color: "var(--text-primary)" }}>
                          {featuredPost.title}
                        </h2>
                        <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
                          {featuredPost.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t" style={{ borderColor: "var(--border-soft)" }}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white"
                            style={{ background: "linear-gradient(135deg, #0170f4, #7c3aed)" }}>
                            {featuredPost.author.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>{featuredPost.author.name}</p>
                            <p className="text-xs" style={{ color: "var(--text-faint)" }}>{featuredPost.author.role}</p>
                          </div>
                        </div>
                        <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
                          <Clock size={13} /> {featuredPost.readTime}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Grid of remaining posts */}
              {gridPosts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                  {gridPosts.map((post, i) => (
                    <motion.div
                      key={post.slug}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group relative flex flex-col h-full rounded-2xl p-5 sm:p-6 border transition-all duration-300 hover:shadow-[0_20px_48px_rgba(1,112,244,0.08)] hover:-translate-y-1"
                        style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
                      >
                        {/* Hover highlights */}
                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                          style={{ background: "var(--card-hover)" }} />
                        <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ background: "linear-gradient(90deg, #0170f4, #7c3aed)" }} />

                        {/* Card Cover image */}
                        <div className="rounded-xl overflow-hidden aspect-video relative mb-5 bg-slate-900 border" style={{ borderColor: "var(--border-soft)" }}>
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="object-cover absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>

                        {/* Tag/Category Details */}
                        <div className="flex items-center gap-3 mb-3 relative">
                          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full"
                            style={{ background: "var(--tag-bg)", color: "var(--tag-color)" }}>
                            {post.category}
                          </span>
                          <span className="text-xs flex items-center gap-1" style={{ color: "var(--text-faint)" }}>
                            <Calendar size={13} /> {post.date}
                          </span>
                        </div>

                        <h3 className="text-xl font-black mb-2 group-hover:text-[#7c3aed] transition-colors leading-snug relative" style={{ color: "var(--text-primary)" }}>
                          {post.title}
                        </h3>
                        <p className="text-sm leading-relaxed mb-6 flex-grow relative" style={{ color: "var(--text-muted)" }}>
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t relative" style={{ borderColor: "var(--border-soft)" }}>
                          <div className="flex items-center gap-2.5">
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
              )}
            </div>
          )}
        </section>

        {/* Newsletter Signup */}
        <NewsletterSignup />
      </main>
      <Footer />
    </>
  );
}
