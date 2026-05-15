import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Globe, Smartphone, Palette, Database, Shield, Zap } from "lucide-react";
import content from "@/content.json";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: `Services — ${content.site.name}`,
  description: content.services.subheading,
};

const iconMap: Record<string, React.ElementType> = {
  Globe, Smartphone, Palette, Database, Shield, Zap,
};

export default function ServicesPage() {
  const { services, site } = content;

  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ background: "var(--bg)" }}>

        {/* Hero */}
        <section className="pt-32 pb-20 px-5 sm:px-8 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-5"
            style={{ background: "var(--badge-bg)", borderColor: "rgba(1,112,244,0.2)", color: "var(--badge-color)" }}>
            {services.badge}
          </div>
          <h1 className="text-5xl sm:text-6xl font-black mb-5 leading-tight" style={{ color: "var(--text-primary)" }}>
            {services.heading}{" "}
            <span className="gradient-text">{services.headingAccent}</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-muted)" }}>
            {services.subheading}
          </p>
        </section>

        {/* Cards grid */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.items.map((item) => {
              const Icon = iconMap[item.icon] ?? Zap;
              return (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className="group relative p-6 rounded-2xl border flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(1,112,244,0.12)]"
                  style={{
                    background: "var(--bg-card)",
                    borderColor: "var(--border)",
                  }}
                >
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: "var(--card-hover)" }} />

                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #10274b 0%, #0170f4 100%)" }}>
                    <Icon size={20} className="text-white" />
                  </div>

                  <div className="flex-1">
                    <h2 className="text-base font-bold mb-2" style={{ color: "var(--text-primary)" }}>{item.title}</h2>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>{item.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 text-xs font-medium rounded-full"
                          style={{ background: "var(--tag-bg)", color: "var(--tag-color)" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <ul className="space-y-1.5">
                      {item.features.slice(0, 3).map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                          <CheckCircle2 size={12} style={{ color: "#0170f4", flexShrink: 0 }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-1 text-sm font-semibold mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: "#0170f4" }}>
                    Learn more <ArrowRight size={14} />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-20 text-center p-10 rounded-3xl border"
            style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            <h2 className="text-3xl font-black mb-3" style={{ color: "var(--text-primary)" }}>Not sure which service you need?</h2>
            <p className="mb-6 max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
              Book a free 30-minute discovery call. We&apos;ll listen to your goals and recommend the right approach.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold shadow-xl transition-all hover:scale-105"
              style={{ background: "linear-gradient(90deg, #0157c2, #0170f4)", boxShadow: "0 12px 32px rgba(1,112,244,0.35)" }}
            >
              Book a Free Call <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
