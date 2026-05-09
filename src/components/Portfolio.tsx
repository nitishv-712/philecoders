"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, GitFork, Layers } from "lucide-react";

const categories = ["All", "Web App", "Mobile", "E-Commerce", "SaaS"];

const projects = [
  { title: "FinTrack Dashboard", category: "SaaS",       description: "Real-time financial analytics platform with AI-powered insights and interactive charts.", tags: ["Next.js", "TypeScript", "D3.js"],          emoji: "📊" },
  { title: "ShopNest",           category: "E-Commerce", description: "Full-featured e-commerce platform with inventory management and payment integration.",    tags: ["React", "Node.js", "Stripe"],              emoji: "🛍️" },
  { title: "MediConnect",        category: "Mobile",     description: "Healthcare mobile app connecting patients with doctors for seamless telemedicine.",        tags: ["React Native", "Firebase", "WebRTC"],      emoji: "🏥" },
  { title: "TaskFlow Pro",       category: "SaaS",       description: "Project management SaaS with real-time collaboration, Kanban boards, and analytics.",     tags: ["Next.js", "PostgreSQL", "Socket.io"],      emoji: "✅" },
  { title: "EduLearn Platform",  category: "Web App",    description: "Interactive e-learning platform with video courses, quizzes, and progress tracking.",     tags: ["React", "AWS", "GraphQL"],                 emoji: "🎓" },
  { title: "FoodieApp",          category: "Mobile",     description: "Food delivery mobile app with real-time order tracking and restaurant discovery.",        tags: ["React Native", "Maps API", "Node.js"],     emoji: "🍕" },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref   = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.38, delay: index * 0.07 }}
      className="group relative rounded-2xl overflow-hidden border card-hover"
      style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(143,187,249,0.1)" }}
    >
      {/* Banner */}
      <div className="h-36 relative overflow-hidden flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #10274b 0%, #0157c2 60%, #0170f4 100%)" }}>
        <motion.span
          className="text-5xl"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 4, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {project.emoji}
        </motion.span>
        <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="absolute top-3 right-3 px-2.5 py-1 text-xs font-semibold rounded-full"
          style={{ background: "rgba(1,112,244,0.3)", color: "#c4dcfc", backdropFilter: "blur(8px)" }}>
          {project.category}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-sm font-bold text-white mb-2">{project.title}</h3>
        <p className="text-xs leading-relaxed mb-4" style={{ color: "#8496b2" }}>{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 text-xs rounded-full"
              style={{ background: "rgba(1,112,244,0.12)", color: "#8fbbf9" }}>
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#0170f4" }}>
            <ExternalLink size={12} /> Live Demo
          </motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#8496b2" }}>
            <GitFork size={12} /> Source
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("All");
  const ref   = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-90px" });

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="portfolio" className="py-24 sm:py-32 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #10274b 0%, #071630 100%)" }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(143,187,249,0.25), transparent)" }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div ref={ref} className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-4"
            style={{ background: "rgba(1,112,244,0.1)", borderColor: "rgba(143,187,249,0.2)", color: "#8fbbf9" }}
          >
            <Layers size={13} /> Our Work
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-white mb-4"
          >
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "#8496b2" }}
          >
            A selection of projects we&apos;re proud to have built for our clients.
          </motion.p>
        </div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActive(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-5 py-2 text-sm font-semibold rounded-full transition-all"
              style={
                active === cat
                  ? { color: "#fff" }
                  : { color: "#8496b2", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(143,187,249,0.15)" }
              }
            >
              {active === cat && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "linear-gradient(90deg, #0157c2, #0170f4)" }}
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              )}
              <span className="relative">{cat}</span>
            </motion.button>
          ))}
        </motion.div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
