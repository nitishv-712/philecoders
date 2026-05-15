"use client";

import { motion } from "framer-motion";
import { GitFork, Link2, Mail, ArrowUp } from "lucide-react";
import Link from "next/link";
import content from "@/content.json";
import NewsletterSignup from "@/components/NewsletterSignup";

const linkHrefMap: Record<string, string> = {
  "About":            "/about",
  "Services":         "/services",
  "Careers":          "#",
  "Blog":             "#",
  "Web Development":  "/services/web-development",
  "Mobile Apps":      "/services/mobile-apps",
  "UI/UX Design":     "/services/ui-ux-design",
  "Backend & APIs":   "/services/backend-apis",
  "Cloud & DevOps":   "/services/cloud-devops",
  "Privacy Policy":   "/legal/privacy-policy",
  "Terms of Service": "/legal/terms-of-service",
  "Cookie Policy":    "/legal/cookie-policy",
};

const { footer: f, site } = content;

const socialIconMap: Record<string, React.ElementType> = {
  GitHub: GitFork, Twitter: Link2, LinkedIn: Link2, Email: Mail,
};

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden" style={{ background: "var(--bg-alt)" }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(1,112,244,0.4), transparent)" }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[280px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(1,112,244,0.05) 0%, transparent 70%)" }} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-md"
                style={{ background: "linear-gradient(135deg, #10274b 0%, #0170f4 100%)" }}>
                <span className="text-xs font-black text-white tracking-tight">{site.logo}</span>
              </div>
              <span className="font-bold text-[17px] tracking-tight" style={{ color: "var(--text-primary)" }}>
                <span className="gradient-text">{site.name.slice(0, 5)}</span>{site.name.slice(5)}
              </span>
            </motion.div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: "var(--text-muted)" }}>
              {f.tagline}
            </p>
            <div className="flex gap-3">
              {f.socials.map((s) => {
                const Icon = socialIconMap[s.label] ?? Link2;
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                    style={{ background: "var(--badge-bg)", color: "var(--text-muted)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#0170f4"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--badge-bg)"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
                  >
                    <Icon size={15} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          {Object.entries(f.links).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-sm font-bold mb-4" style={{ color: "var(--text-primary)" }}>{section}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <motion.div whileHover={{ x: 4 }} className="inline-block">
                      <Link
                        href={linkHrefMap[link] ?? "#"}
                        className="text-sm transition-colors"
                        style={{ color: "var(--text-muted)" }}
                        onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#0170f4")}
                        onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text-muted)")}
                      >
                        {link}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <NewsletterSignup />

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid var(--border-soft)" }}>
          <p className="text-xs" style={{ color: "var(--text-faint)" }}>
            © {new Date().getFullYear()} {f.copyright}
          </p>
          <p className="text-xs" style={{ color: "var(--text-faint)" }}>{f.builtWith}</p>
          <motion.button
            onClick={scrollTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
            className="w-9 h-9 rounded-full flex items-center justify-center text-white shadow-lg"
            style={{ background: "linear-gradient(135deg, #0157c2, #0170f4)", boxShadow: "0 4px 16px rgba(1,112,244,0.25)" }}
          >
            <ArrowUp size={15} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
