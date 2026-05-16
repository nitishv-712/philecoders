"use client";

import Link from "next/link";
import { ArrowRight, Zap, Globe, Smartphone, Palette, Database, Shield , type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Globe, Smartphone, Palette, Database, Shield, Zap,
};

type RelatedItem = { slug: string; title: string; icon: string };

export default function RelatedServices({ items }: { items: RelatedItem[] }) {
  return (
    <div className="rounded-2xl border p-5"
      style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
      <h3 className="text-sm font-bold mb-4" style={{ color: "var(--text-primary)" }}>Other Services</h3>
      <div className="space-y-3">
        {items.map((r) => {
          const Icon = iconMap[r.icon] ?? Zap;
          return (
            <Link
              key={r.slug}
              href={`/services/${r.slug}`}
              className="flex items-center gap-3 p-3 rounded-xl transition-colors group"
              style={{ background: "var(--bg-section)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.08)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--bg-section)")}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #0170f4, #7c3aed)" }}>
                <Icon size={14} className="text-white" />
              </div>
              <span className="text-sm font-medium transition-colors" style={{ color: "var(--text-primary)" }}>{r.title}</span>
              <ArrowRight size={13} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#7c3aed" }} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
