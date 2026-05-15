"use client";

import Link from "next/link";
import { ArrowRight, Zap, Globe, Smartphone, Palette, Database, Shield } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Globe, Smartphone, Palette, Database, Shield, Zap,
};

type RelatedItem = { slug: string; title: string; icon: string };

export default function RelatedServices({ items }: { items: RelatedItem[] }) {
  return (
    <div className="rounded-2xl border p-5"
      style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(143,187,249,0.1)" }}>
      <h3 className="text-sm font-bold text-white mb-4">Other Services</h3>
      <div className="space-y-3">
        {items.map((r) => {
          const Icon = iconMap[r.icon] ?? Zap;
          return (
            <Link
              key={r.slug}
              href={`/services/${r.slug}`}
              className="flex items-center gap-3 p-3 rounded-xl transition-colors group"
              style={{ background: "rgba(255,255,255,0.02)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(1,112,244,0.08)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)")}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #10274b, #0170f4)" }}>
                <Icon size={14} className="text-white" />
              </div>
              <span className="text-sm font-medium text-white group-hover:text-[#8fbbf9] transition-colors">{r.title}</span>
              <ArrowRight size={13} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#0170f4" }} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
