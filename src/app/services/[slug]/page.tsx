import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Globe, Smartphone, Palette, Database, Shield, Zap } from "lucide-react";
import content from "@/content.json";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReviewForm from "@/components/ReviewForm";
import ReviewList from "@/components/ReviewList";
import RelatedServices from "@/components/RelatedServices";

const iconMap: Record<string, React.ElementType> = {
  Globe, Smartphone, Palette, Database, Shield, Zap,
};

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return content.services.items.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = content.services.items.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} — ${content.site.name}`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = content.services.items.find((s) => s.slug === slug);
  if (!service) notFound();

  const Icon = iconMap[service.icon] ?? Zap;

  // Related services (exclude current)
  const related = content.services.items.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ background: "var(--bg)" }}>

        {/* Hero */}
        <section className="pt-32 pb-16 px-5 sm:px-8 max-w-5xl mx-auto">
          <Link href="/services"
            className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-[#0170f4]"
            style={{ color: "var(--text-muted)" }}>
            <ArrowLeft size={15} /> All Services
          </Link>

          <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #10274b 0%, #0170f4 100%)" }}>
              <Icon size={28} className="text-white" />
            </div>
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {service.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 text-xs font-medium rounded-full"
                    style={{ background: "var(--tag-bg)", color: "var(--tag-color)" }}>
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl sm:text-5xl font-black mb-3" style={{ color: "var(--text-primary)" }}>{service.title}</h1>
              <p className="text-lg max-w-2xl" style={{ color: "var(--text-muted)" }}>{service.longDescription}</p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-5xl mx-auto px-5 sm:px-8 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Left — features + reviews */}
            <div className="lg:col-span-2 space-y-10">

              {/* Features */}
              <div className="rounded-2xl border p-6"
                style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                <h2 className="text-lg font-bold mb-5" style={{ color: "var(--text-primary)" }}>What&apos;s included</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--text-body)" }}>
                      <CheckCircle2 size={15} style={{ color: "#0170f4", flexShrink: 0, marginTop: 2 }} />
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div>
                <h2 className="text-lg font-bold mb-5" style={{ color: "var(--text-primary)" }}>Client Reviews</h2>
                <ReviewList serviceSlug={service.slug} />
              </div>

              {/* Review form */}
              <div>
                <h2 className="text-lg font-bold mb-5" style={{ color: "var(--text-primary)" }}>Share Your Experience</h2>
                <ReviewForm serviceSlug={service.slug} />
              </div>
            </div>

            {/* Right — sidebar */}
            <div className="space-y-6">

              {/* CTA card */}
              <div className="rounded-2xl p-6 text-white sticky top-24"
                style={{ background: "linear-gradient(135deg, #0157c2 0%, #0170f4 100%)", boxShadow: "0 20px 48px rgba(1,112,244,0.3)" }}>
                <div className="text-3xl mb-3">🚀</div>
                <h3 className="font-bold text-lg mb-2">Ready to get started?</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "#c4dcfc" }}>
                  Tell us about your project and we&apos;ll get back to you within one business day.
                </p>
                <Link
                  href="/#contact"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105"
                  style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
                >
                  Start a Project <ArrowRight size={15} />
                </Link>
              </div>

              {/* Related services */}
              <RelatedServices items={related.map((r) => ({ slug: r.slug, title: r.title, icon: r.icon }))} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
