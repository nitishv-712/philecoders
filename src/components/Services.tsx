"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Smartphone, Palette, Database, Shield, Zap, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Globe,    title: "Web Development",
    description: "Full-stack web applications built with Next.js, React, and modern technologies that scale with your business.",
    tags: ["Next.js", "React", "TypeScript"],
  },
  {
    icon: Smartphone, title: "Mobile Apps",
    description: "Cross-platform mobile applications for iOS and Android using React Native with native performance.",
    tags: ["React Native", "iOS", "Android"],
  },
  {
    icon: Palette,  title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces designed with user psychology in mind. From wireframes to pixel-perfect designs.",
    tags: ["Figma", "Prototyping", "Design Systems"],
  },
  {
    icon: Database, title: "Backend & APIs",
    description: "Robust, scalable backend systems and RESTful/GraphQL APIs that power your applications reliably.",
    tags: ["Node.js", "PostgreSQL", "GraphQL"],
  },
  {
    icon: Shield,   title: "DevOps & Cloud",
    description: "CI/CD pipelines, cloud infrastructure on AWS/GCP, and containerization for seamless deployments.",
    tags: ["AWS", "Docker", "CI/CD"],
  },
  {
    icon: Zap,      title: "Performance Optimization",
    description: "Audit and optimize your existing applications for speed, SEO, and Core Web Vitals excellence.",
    tags: ["Core Web Vitals", "SEO", "Caching"],
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref   = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  const Icon  = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.09 }}
      className="group relative p-6 rounded-2xl border card-hover cursor-default overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.03)",
        borderColor: "rgba(143,187,249,0.12)",
      }}
    >
      {/* Hover fill */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
        style={{ background: "linear-gradient(135deg, rgba(1,87,194,0.08) 0%, rgba(1,112,244,0.04) 100%)" }} />

      {/* Icon */}
      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 shadow-lg"
        style={{ background: "linear-gradient(135deg, #10274b 0%, #0170f4 100%)" }}>
        <Icon size={20} className="text-white" />
      </div>

      <h3 className="text-base font-bold text-white mb-2.5">{service.title}</h3>
      <p className="text-sm leading-relaxed mb-5" style={{ color: "#8496b2" }}>{service.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {service.tags.map((tag) => (
          <span key={tag} className="px-2.5 py-1 text-xs font-medium rounded-full"
            style={{ background: "rgba(1,112,244,0.12)", color: "#8fbbf9" }}>
            {tag}
          </span>
        ))}
      </div>

      <motion.div
        className="flex items-center gap-1 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ color: "#0170f4" }}
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Learn more <ArrowRight size={13} />
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  const ref   = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-90px" });

  return (
    <section id="services" className="py-24 sm:py-32 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #071630 0%, #10274b 100%)" }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(1,112,244,0.4), transparent)" }} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-4"
            style={{ background: "rgba(1,112,244,0.1)", borderColor: "rgba(143,187,249,0.2)", color: "#8fbbf9" }}
          >
            <Zap size={13} /> What We Do
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-white mb-4"
          >
            Services That <span className="gradient-text">Drive Results</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "#8496b2" }}
          >
            From concept to deployment, we deliver end-to-end digital solutions tailored to your unique business needs.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => <ServiceCard key={s.title} service={s} index={i} />)}
        </div>
      </div>
    </section>
  );
}
