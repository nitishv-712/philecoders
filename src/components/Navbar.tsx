"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import content from "@/content.json";

const { navbar, site } = content;

export default function Navbar() {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <motion.nav
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-2xl border-b border-[#c4dcfc]/40 shadow-lg shadow-[#7c3aed]/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <Link href="/" className="flex items-center gap-2.5">
              <Image src="/pc-only.png" alt="PhileCoders logo" width={32} height={32} priority />
              <span className="font-bold text-[17px] tracking-tight">
                <span className="gradient-text">{site.name.slice(0, 5)}</span>
                <span style={{ color: "var(--text-primary)" }}>{site.name.slice(5)}</span>
              </span>
            </Link>
          </motion.div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navbar.links.map((link) => (
              <motion.div key={link.label} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors block ${
                    isActive(link.href)
                      ? "text-[#7c3aed]"
                      : "text-[#4a6080] hover:text-[#10274b]"
                  }`}
                >
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-[#ede9fe]"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2.5">
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 8px 28px rgba(124,58,237,0.30)" }}
              whileTap={{ scale: 0.96 }}
              className="hidden md:block"
            >
              <Link
                href="/contact"
                className="flex items-center px-5 py-2 text-sm font-semibold text-white rounded-full shadow-lg shadow-[#7c3aed]/20 transition-all"
                style={{ background: "linear-gradient(135deg, #0170f4 0%, #7c3aed 100%)" }}
              >
                {navbar.cta}
              </Link>
            </motion.div>

            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center bg-[#ede9fe] text-[#7c3aed]"
            >
              <AnimatePresence mode="wait">
                {isOpen
                  ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.14 }}><X size={17} /></motion.span>
                  : <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.14 }}><Menu size={17} /></motion.span>
                }
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white/96 backdrop-blur-2xl border-b border-[#c4dcfc]/40"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {navbar.links.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.045 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-[#2d4463] hover:text-[#7c3aed] hover:bg-[#ede9fe] rounded-xl transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navbar.links.length * 0.045 }}
              >
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="mt-2 block px-4 py-3 text-sm font-semibold text-white text-center rounded-xl"
                  style={{ background: "linear-gradient(135deg, #0170f4 0%, #7c3aed 100%)" }}
                >
                  {navbar.cta}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
