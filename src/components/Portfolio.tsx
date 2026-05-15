"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, GitFork, Layers } from "lucide-react";
import content from "@/content.json";

const { portfolio: p } = content;

function ProjectCard({ project, index }: { project: typeof p.projects[0]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
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
      style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      <div className="h-36 relative overflow-hidden flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #10274b 0%, #0157c2 60%, #0170f4 100%)" }}>
        <span className="text-5xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
          {project.emoji}
        </span>
        <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="absolute top-3 right-3 px-2.5 py-1 text-xs font-semibold rounded-full"
          style={{ background: "rgba(1,112,244,0.3)", color: "#c4dcfc", backdropFilter: "blur(8px)" }}>
          {project.category}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-sm font-bold mb-2" style={{ color: "var(--text-primary)" }}>{project.title}</h3>
        <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 text-xs rounded-full"
              style={{ background: "var(--tag-bg)", color: "var(--tag-color)" }}>
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <motion.a href={project.liveUrl} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#0170f4" }}
            target="_blank" rel="noopener noreferrer">
            <ExternalLink size={12} /> Live Demo
          </motion.a>
          <motion.a href={project.sourceUrl} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "var(--text-muted)" }}
            target="_blank" rel="noopener noreferrer">
            <GitFork size={12} /> Source
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("All");
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-90px" });

  const filtered = active === "All" ? p.projects : p.projects.filter((proj) => proj.category === active);

  return (
    <section id="portfolio" className="py-24 sm:py-32 relative overflow-hidden"
      style={{ background: "var(--bg-alt)" }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(1,112,244,0.25), transparent)" }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div ref={ref} className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-4"
            style={{ background: "var(--badge-bg)", borderColor: "rgba(1,112,244,0.2)", color: "var(--badge-color)" }}
          >
            <Layers size={13} /> {p.badge}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            {p.heading} <span className="gradient-text">{p.headingAccent}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-muted)" }}
          >
            {p.subheading}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {p.categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActive(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-5 py-2 text-sm font-semibold rounded-full transition-all"
              style={active === cat
                ? { color: "#fff" }
                : { color: "var(--text-muted)", background: "var(--bg-card)", border: "1px solid var(--border)" }}
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
            {filtered.map((proj, i) => <ProjectCard key={proj.title} project={proj} index={i} />)}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
