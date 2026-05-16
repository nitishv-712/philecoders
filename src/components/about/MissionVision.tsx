"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Eye, Heart, Code2, MessageCircle, Zap , type LucideIcon } from "lucide-react";
import content from "@/content.json";

const mv = content.about.mission;

const iconMap: Record<string, LucideIcon> = { Target, Eye, Heart, Code2, MessageCircle, Zap };

export default function MissionVision() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const MissionIcon = iconMap[mv.mission.icon] ?? Target;
  const VisionIcon  = iconMap[mv.vision.icon]  ?? Eye;

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div ref={ref} className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-4"
            style={{ background: "var(--badge-bg)", borderColor: "rgba(1,112,244,0.2)", color: "var(--badge-color)" }}
          >
            {mv.badge}
          </motion.div>
        </div>

        {/* Mission + Vision cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {[
            { data: mv.mission, Icon: MissionIcon, gradient: "linear-gradient(135deg, #0157c2, #0170f4)" },
            { data: mv.vision,  Icon: VisionIcon,  gradient: "linear-gradient(135deg, #10274b, #0157c2)" },
          ].map(({ data, Icon, gradient }, i) => (
            <motion.div
              key={data.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className="p-8 rounded-3xl text-white relative overflow-hidden"
              style={{ background: gradient, boxShadow: "0 20px 48px rgba(1,112,244,0.2)" }}
            >
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)" }} />
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: "rgba(255,255,255,0.15)" }}>
                <Icon size={22} />
              </div>
              <h3 className="text-xl font-black mb-3">{data.title}</h3>
              <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>{data.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {mv.values.map((v, i) => {
            const Icon = iconMap[v.icon] ?? Heart;
            return (
              <motion.div
                key={v.label}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="p-5 rounded-2xl border text-center"
                style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: "rgba(1,112,244,0.1)", color: "#0170f4" }}>
                  <Icon size={18} />
                </div>
                <div className="font-bold mb-1" style={{ color: "var(--text-primary)" }}>{v.label}</div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>{v.desc}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
