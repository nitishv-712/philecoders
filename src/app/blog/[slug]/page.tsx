import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { blogPosts, type BlogPost } from "@/data/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShareButtons from "@/components/ShareButtons";
import { getFirestoreBlogPostBySlug, getFirestoreBlogPosts } from "@/lib/firestore";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 10; // Incremental Static Regeneration cache duration (10s)

export async function generateStaticParams() {
  try {
    const dynamicPosts = await getFirestoreBlogPosts();
    const all = [...dynamicPosts, ...blogPosts];
    return all.map((post) => ({ slug: post.slug }));
  } catch (err) {
    console.error("Failed to generate static params for blogs:", err);
    return blogPosts.map((post) => ({ slug: post.slug }));
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    post = (await getFirestoreBlogPostBySlug(slug)) || undefined;
  }
  if (!post) return {};
  return {
    title: `${post.title} — PhileCoders Blog`,
    description: post.excerpt,
    keywords: [...post.tags, "PhileCoders Blog", "software engineering insights"],
    alternates: { canonical: `https://www.philecoders.com/blog/${slug}` },
    openGraph: {
      type: "article",
      url: `https://www.philecoders.com/blog/${slug}`,
      title: `${post.title} — PhileCoders Blog`,
      description: post.excerpt,
      images: [{ url: `https://www.philecoders.com${post.coverImage}`, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} — PhileCoders Blog`,
      description: post.excerpt,
      images: [`https://www.philecoders.com${post.coverImage}`],
    }
  };
}

export default async function BlogPostDetailPage({ params }: Props) {
  const { slug } = await params;
  
  let post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    const dbPost = await getFirestoreBlogPostBySlug(slug);
    if (dbPost) {
      post = dbPost;
    }
  }
  if (!post) notFound();

  // Find up to 2 related posts (other posts in the same category, or general other posts)
  let allPosts: BlogPost[] = blogPosts;
  try {
    const dbPosts = await getFirestoreBlogPosts();
    allPosts = [...dbPosts, ...blogPosts];
  } catch (err) {
    console.error("Failed to get all posts for related posts sidebar:", err);
  }

  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `https://www.philecoders.com${post.coverImage}`,
    datePublished: new Date(post.date).toISOString().split('T')[0],
    url: `https://www.philecoders.com/blog/${slug}`,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role
    },
    publisher: {
      "@type": "Organization",
      name: "PhileCoders",
      url: "https://www.philecoders.com"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      {/* Embedded CSS rules for article typography */}
      <style dangerouslySetInnerHTML={{ __html: `
        .blog-content h2 {
          font-size: 1.75rem;
          font-weight: 900;
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
          color: var(--text-primary);
          line-height: 1.3;
          letter-spacing: -0.02em;
        }
        .blog-content p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
          color: var(--text-body);
          font-size: 1.05rem;
        }
        .blog-content blockquote {
          border-left: 4px solid var(--badge-color);
          background: var(--badge-bg);
          padding: 1.5rem 1.75rem;
          border-radius: 0 1rem 1rem 0;
          font-style: italic;
          color: var(--text-muted);
          margin: 2.5rem 0;
          font-size: 1.1rem;
        }
        .blog-content ul {
          list-style-type: disc;
          padding-left: 1.75rem;
          margin-bottom: 1.5rem;
          color: var(--text-body);
        }
        .blog-content li {
          margin-bottom: 0.65rem;
          line-height: 1.7;
        }
        .blog-content code {
          background: rgba(0,0,0,0.05);
          padding: 0.2rem 0.4rem;
          border-radius: 0.35rem;
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 0.9em;
          color: #7c3aed;
        }
        .blog-content pre {
          background: #0f172a;
          color: #f8fafc;
          border: 1px solid rgba(255,255,255,0.08);
          padding: 1.5rem;
          border-radius: 1rem;
          overflow-x: auto;
          margin: 2rem 0;
          box-shadow: inset 0 2px 8px rgba(0,0,0,0.4);
        }
        .blog-content pre code {
          background: transparent;
          color: inherit;
          padding: 0;
          font-size: 0.9rem;
        }
        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
          font-size: 0.95rem;
        }
        .blog-content th {
          border-bottom: 2px solid var(--border);
          padding: 0.75rem 1rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .blog-content td {
          border-bottom: 1px solid var(--border-soft);
          padding: 0.75rem 1rem;
          color: var(--text-body);
        }
      `}} />

      <main className="min-h-screen pb-24" style={{ background: "var(--bg)" }}>
        {/* Post Header Hero */}
        <section className="pt-32 pb-16 px-5 sm:px-8 max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-[#7c3aed]"
            style={{ color: "var(--text-muted)" }}
          >
            <ArrowLeft size={15} /> Back to all articles
          </Link>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-semibold rounded-full"
                style={{ background: "var(--tag-bg)", color: "var(--tag-color)" }}>
                {post.category}
              </span>
              <span className="text-xs flex items-center gap-1.5" style={{ color: "var(--text-faint)" }}>
                <Calendar size={13} /> {post.date}
              </span>
              <span className="text-xs flex items-center gap-1.5" style={{ color: "var(--text-faint)" }}>
                <Clock size={13} /> {post.readTime}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black mb-6 leading-tight" style={{ color: "var(--text-primary)" }}>
              {post.title}
            </h1>

            {/* Author bar */}
            <div className="flex items-center gap-3.5 pb-8 border-b" style={{ borderColor: "var(--border-soft)" }}>
              <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-base text-white shadow-md"
                style={{ background: "linear-gradient(135deg, #0170f4, #7c3aed)" }}>
                {post.author.avatar}
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>{post.author.name}</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{post.author.role}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Cover Image */}
        <section className="max-w-4xl mx-auto px-5 sm:px-8 pb-12">
          <div className="rounded-3xl overflow-hidden aspect-[21/9] relative shadow-2xl border" style={{ borderColor: "var(--border-soft)" }}>
            <img
              src={post.coverImage}
              alt={post.title}
              className="object-cover absolute inset-0 w-full h-full"
            />
          </div>
        </section>

        {/* Post Grid Content */}
        <section className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Reading Column */}
            <div className="lg:col-span-8">
              <article className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-4 space-y-8">
              {/* Share */}
              <div className="rounded-2xl border p-5 sticky top-24" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                <ShareButtons title={post.title} slug={post.slug} />

                {/* Tags block in sidebar */}
                <div className="mt-8 pt-6 border-t" style={{ borderColor: "var(--border-soft)" }}>
                  <h4 className="text-xs font-bold uppercase tracking-wider mb-3.5" style={{ color: "var(--text-faint)" }}>
                    Article Tags
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((t) => (
                      <span key={t} className="px-2.5 py-0.5 text-xs font-medium rounded-full"
                        style={{ background: "var(--tag-bg)", color: "var(--tag-color)" }}>
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-4xl mx-auto px-5 sm:px-8 my-16">
          <div className="section-divider" />
        </div>

        {/* Related articles */}
        {relatedPosts.length > 0 && (
          <section className="max-w-4xl mx-auto px-5 sm:px-8">
            <h3 className="text-2xl font-black mb-8" style={{ color: "var(--text-primary)" }}>
              Read <span className="gradient-text">Next</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group relative flex flex-col justify-between p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
                >
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: "var(--card-hover)" }} />

                  <div>
                    <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full mb-3 inline-block"
                      style={{ background: "var(--tag-bg)", color: "var(--tag-color)" }}>
                      {r.category}
                    </span>
                    <h4 className="font-bold text-base mb-2 group-hover:text-[#7c3aed] transition-colors leading-snug" style={{ color: "var(--text-primary)" }}>
                      {r.title}
                    </h4>
                    <p className="text-xs line-clamp-2" style={{ color: "var(--text-muted)" }}>
                      {r.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-5 pt-4 border-t" style={{ borderColor: "var(--border-soft)" }}>
                    <span className="text-xs" style={{ color: "var(--text-faint)" }}>{r.date}</span>
                    <span className="flex items-center gap-1 text-xs font-bold text-[#7c3aed]">
                      Read Article <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA Banner */}
        <section className="max-w-4xl mx-auto px-5 sm:px-8 mt-20">
          <div
            className="rounded-3xl p-10 sm:p-12 text-center text-white relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #7c3aed 0%, #0170f4 100%)",
              boxShadow: "0 24px 60px rgba(124,58,237,0.25)"
            }}
          >
            <h3 className="text-2xl sm:text-3xl font-black mb-3">Have a project in mind?</h3>
            <p className="text-sm max-w-md mx-auto mb-8 text-[#ddd6fe] leading-relaxed">
              We engineer custom web platforms, mobile apps, and robust API frameworks designed to scale. Let's discuss your requirements.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold bg-white text-[#7c3aed] transition-all hover:scale-105"
            >
              Start a Project <ArrowRight size={16} />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
