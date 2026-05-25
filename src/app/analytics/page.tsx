import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Analytics & Tracking Setup — PhileCoders",
  description: "PhileCoders analytics and performance tracking configuration.",
  robots: { index: false, follow: false },
};

const tools = [
  {
    name: "Google Analytics 4",
    status: "Configure",
    desc: "Add your GA4 Measurement ID to track page views, events, and conversions.",
    action: "Add NEXT_PUBLIC_GA_ID to .env",
    color: "#f59e0b",
  },
  {
    name: "Google Search Console",
    status: "Verify",
    desc: "Verify site ownership to monitor search rankings, impressions, and crawl errors.",
    action: "Submit sitemap.xml at /sitemap.xml",
    color: "#0170f4",
  },
  {
    name: "Sitemap",
    status: "Live",
    desc: "Dynamic XML sitemap covering all pages and service routes.",
    action: "https://www.philecoders.com/sitemap.xml",
    color: "#059669",
  },
  {
    name: "Robots.txt",
    status: "Live",
    desc: "Allows all crawlers, blocks /api/ and /_next/ routes.",
    action: "https://www.philecoders.com/robots.txt",
    color: "#059669",
  },
  {
    name: "Structured Data (JSON-LD)",
    status: "Live",
    desc: "Organization, WebSite, Service, and ContactPage schemas on all key pages.",
    action: "Validate at schema.org/validator",
    color: "#059669",
  },
  {
    name: "Core Web Vitals",
    status: "Monitor",
    desc: "Track LCP, FID, and CLS via Google Search Console or PageSpeed Insights.",
    action: "Run Lighthouse audit",
    color: "#7c3aed",
  },
];

export default function AnalyticsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24 px-5 sm:px-8 max-w-5xl mx-auto" style={{ background: "var(--bg)" }}>
        <div className="mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-5"
            style={{ background: "var(--badge-bg)", borderColor: "rgba(124,58,237,0.25)", color: "var(--badge-color)" }}
          >
            Site Analytics
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-4" style={{ color: "var(--text-primary)" }}>
            Analytics &{" "}
            <span className="gradient-text">Tracking</span>
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: "var(--text-muted)" }}>
            Overview of all tracking, SEO, and analytics tools configured for PhileCoders.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="rounded-2xl border p-6"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>{tool.name}</h2>
                <span
                  className="px-2.5 py-1 text-xs font-semibold rounded-full"
                  style={{ background: `${tool.color}18`, color: tool.color }}
                >
                  {tool.status}
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>{tool.desc}</p>
              <p className="text-xs font-mono px-3 py-2 rounded-lg" style={{ background: "var(--bg-section)", color: "var(--text-body)" }}>
                {tool.action}
              </p>
            </div>
          ))}
        </div>

        <div
          className="mt-12 rounded-2xl border p-8"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          <h2 className="text-xl font-black mb-4" style={{ color: "var(--text-primary)" }}>
            Quick SEO Checklist
          </h2>
          <ul className="space-y-2 text-sm" style={{ color: "var(--text-body)" }}>
            {[
              "✅ Sitemap generated at /sitemap.xml",
              "✅ Robots.txt configured at /robots.txt",
              "✅ JSON-LD structured data on Home, About, Contact, Services pages",
              "✅ Open Graph & Twitter Card meta tags on all pages",
              "✅ Canonical URLs set on all pages",
              "✅ Page-level title & description metadata",
              "✅ Footer internal links fixed (no broken # hrefs)",
              "⬜ Add GA4 Measurement ID (NEXT_PUBLIC_GA_ID)",
              "⬜ Verify site in Google Search Console",
              "⬜ Submit sitemap.xml to Google Search Console",
              "⬜ Add og-image.png (1200×630) to /public",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">{item}</li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
