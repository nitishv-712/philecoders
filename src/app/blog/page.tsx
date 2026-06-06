import type { Metadata } from "next";
import BlogClient from "@/components/BlogClient";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog & Insights — PhileCoders",
  description:
    "Explore our insights and articles on custom web development, Next.js optimization, design systems, technical SEO, and building premium software solutions.",
  keywords: [
    "software development blog Noida",
    "Next.js optimization guides",
    "design systems articles",
    "technical SEO checklists",
    "PhileCoders insights",
    "web development trends India",
  ],
  alternates: { canonical: "https://www.philecoders.com/blog" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.philecoders.com/blog",
    siteName: "PhileCoders",
    title: "Blog & Insights — PhileCoders",
    description:
      "Articles and guides on web engineering, user experience design, and scaling digital platforms. Built by the senior dev team at PhileCoders.",
    images: [{ url: "https://www.philecoders.com/og-image.png", width: 1200, height: 630, alt: "PhileCoders Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://www.philecoders.com/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "PhileCoders Blog",
  url: "https://www.philecoders.com/blog",
  description: "Insights on software engineering, design, and SEO from the PhileCoders team.",
  blogPost: blogPosts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    alternativeHeadline: post.excerpt,
    genre: post.category,
    keywords: post.tags.join(" "),
    url: `https://www.philecoders.com/blog/${post.slug}`,
    datePublished: new Date(post.date).toISOString().split('T')[0],
    author: {
      "@type": "Person",
      name: post.author.name
    }
  }))
};

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogClient />
    </>
  );
}
