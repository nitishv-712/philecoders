"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Smartphone, Palette, Database, Shield, Zap, ArrowUpRight , type LucideIcon } from "lucide-react";
import Link from "next/link";
import content from "@/content.json";

const { services: s } = content;

const iconMap: Record<string, LucideIcon> = {
  Globe, Smartphone, Palette, Database, Shield, Zap,
};

const serviceStyles: Record<string, {
  variant: "filled" | "outline" | "accent" | "dark";
  iconColor: string;
  bg: string;
  border: string;
  textPrimary: string;
  textMuted: string;
}> = {
  "web-development": {
    variant: "dark",
    iconColor: "#fff",
    bg: "#0f172a",
    border: "transparent",
    textPrimary: "#f1f5f9",
    textMuted: "#94a3b8",
  },
  "mobile-apps": {
    variant: "accent",
    iconColor: "#2563eb",
    bg: "#eff6ff",
    border: "#bfdbfe",
    textPrimary: "#1e3a8a",
    textMuted: "#3b82f6",
  },
  "ui-ux-design": {
    variant: "outline",
    iconColor: "#db2777",
    bg: "var(--bg-card, #fff)",
    border: "#fbcfe8",
    textPrimary: "var(--text-primary, #111827)",
    textMuted: "#be185d",
  },
  "backend-apis": {
    variant: "filled",
    iconColor: "#059669",
    bg: "#f0fdf4",
    border: "#bbf7d0",
    textPrimary: "#064e3b",
    textMuted: "#10b981",
  },
  "cloud-devops": {
    variant: "outline",
    iconColor: "#d97706",
    bg: "var(--bg-card, #fff)",
    border: "#fde68a",
    textPrimary: "var(--text-primary, #111827)",
    textMuted: "#d97706",
  },
  "performance-tuning": {
    variant: "filled",
    iconColor: "#6366f1",
    bg: "#eef2ff",
    border: "#c7d2fe",
    textPrimary: "#312e81",
    textMuted: "#6366f1",
  },
};

// col-span / row-span / layout direction per card index
const mosaicLayout = [
  { colSpan: "col-span-1 sm:col-span-2", rowSpan: "row-span-1", wide: true }, // 0 — full-width hero
  { colSpan: "col-span-1", rowSpan: "sm:row-span-2", wide: false }, // 1 — tall
  { colSpan: "col-span-1", rowSpan: "row-span-1", wide: false }, // 2 — normal
  { colSpan: "col-span-1", rowSpan: "row-span-1", wide: false }, // 3 — normal
  { colSpan: "col-span-1", rowSpan: "row-span-1", wide: false }, // 4 — normal
  { colSpan: "col-span-1 sm:col-span-2 lg:col-span-3", rowSpan: "row-span-1", wide: true }, // 5 — full-width footer
];

function ServiceBlock({ item, index }: { item: typeof s.items[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = iconMap[item.icon] ?? Zap;
  const style = serviceStyles[item.slug] ?? serviceStyles["web-development"];
  const layout = mosaicLayout[index] ?? mosaicLayout[2];
  const isDark = style.variant === "dark";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={`group ${layout.colSpan} ${layout.rowSpan}`}
    >
      <Link href={`/services/${item.slug}`} className="block h-full">
        <div
          className={`relative h-full rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 p-5 sm:p-7 ${layout.wide ? "flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-10" : "flex flex-col"
            }`}
          style={{
            background: style.bg,
            borderColor: style.border || "var(--border,#e5e7eb)",
            boxShadow: isDark ? "0 4px 24px rgba(0,0,0,0.18)" : "0 1px 4px rgba(0,0,0,0.04)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = isDark
              ? "0 16px 48px rgba(0,0,0,0.32)"
              : `0 10px 36px ${style.border}90`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = isDark
              ? "0 4px 24px rgba(0,0,0,0.18)"
              : "0 1px 4px rgba(0,0,0,0.04)";
          }}
        >
          {/* Dark card grid texture */}
          {isDark && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                backgroundSize: "32px 32px",
              }}
            />
          )}

          {/* Corner accent dot */}
          <div
            className="absolute top-5 right-5 w-1.5 h-1.5 rounded-full opacity-40"
            style={{ background: style.iconColor }}
          />

          {/* Icon */}
          <div
            className={`flex-shrink-0 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${layout.wide ? "w-12 h-12 sm:w-16 sm:h-16" : "w-12 h-12 mb-auto"
              }`}
            style={{
              background: isDark ? "rgba(255,255,255,0.1)" : `${style.iconColor}18`,
              border: `1px solid ${isDark ? "rgba(255,255,255,0.15)" : `${style.iconColor}30`}`,
            }}
          >
            <Icon size={layout.wide ? 28 : 22} style={{ color: style.iconColor }} />
          </div>

          {/* Text */}
          <div className={layout.wide ? "flex-1 min-w-0" : "mt-5 flex flex-col flex-1"}>
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3
                className="font-bold leading-snug tracking-tight"
                style={{
                  color: style.textPrimary,
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: layout.wide ? "20px" : "15px",
                }}
              >
                {item.title}
              </h3>
              <ArrowUpRight
                size={15}
                className="flex-shrink-0 opacity-0 group-hover:opacity-50 transition-opacity mt-0.5"
                style={{ color: style.textPrimary }}
              />
            </div>

            <p
              className="text-[13px] leading-relaxed"
              style={{ color: style.textMuted }}
            >
              {layout.wide ? item.description : item.description.slice(0, 72) + "…"}
            </p>

            {/* Tags only on wide cards */}
            {layout.wide && (
              <div className="flex flex-wrap gap-2 mt-5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-0.5 text-[11px] font-semibold rounded-full uppercase tracking-wide"
                    style={{
                      background: isDark ? "rgba(255,255,255,0.1)" : `${style.iconColor}15`,
                      color: isDark ? "rgba(255,255,255,0.65)" : style.iconColor,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      className="py-28 sm:py-36 relative overflow-hidden"
      style={{ background: "var(--bg-section, #f9fafb)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "var(--border, #e5e7eb)" }} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div ref={ref} className="mb-12 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            className="flex items-center gap-3 mb-5"
          >
            <div className="h-px w-7" style={{ background: "var(--badge-color, #7c3aed)" }} />
            <span className="text-[11px] font-bold tracking-[0.16em] uppercase" style={{ color: "var(--badge-color, #7c3aed)" }}>
              {s.badge}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl font-black leading-[1.05] tracking-tight mb-4"
            style={{ color: "var(--text-primary, #111827)", fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            {s.heading} <span className="gradient-text">{s.headingAccent}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18 }}
            className="text-base leading-relaxed"
            style={{ color: "var(--text-muted, #6b7280)" }}
          >
            {s.subheading}
          </motion.p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          style={{ gridAutoRows: "auto" }}
        >
          {s.items.map((item, i) => (
            <ServiceBlock key={item.slug} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}