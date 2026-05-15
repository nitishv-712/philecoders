"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin } from "lucide-react";
import content from "@/content.json";

const { contact: c } = content;

export default function ContactMap() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-2 mb-6"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(1,112,244,0.1)", color: "#0170f4" }}>
            <MapPin size={16} />
          </div>
          <span className="font-bold" style={{ color: "var(--text-primary)" }}>Find Us</span>
          <span className="text-sm ml-1" style={{ color: "var(--text-muted)" }}>— {c.info[2].value}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="rounded-3xl overflow-hidden border shadow-xl"
          style={{ borderColor: "var(--border)", height: 420 }}
        >
          <iframe
            src={c.map.embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="PhileCoders location"
          />
        </motion.div>
      </div>
    </section>
  );
}
