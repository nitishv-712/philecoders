import type { Metadata } from "next";
import ServicesClient from "@/components/ServicesClient";
import content from "@/content.json";

export const metadata: Metadata = {
  title: "Our Services — Web, Mobile, SEO & Digital Marketing",
  description:
    "PhileCoders offers end-to-end software & marketing services in India: custom web development, mobile apps, UI/UX design, backend APIs, cloud DevOps, SEO, PPC, email marketing, and lead generation.",
  keywords: [
    "web development services India",
    "mobile app development",
    "SEO services Noida",
    "digital marketing agency India",
    "UI UX design",
    "backend API development",
    "cloud DevOps services",
    "PPC management",
    "email marketing",
    "lead generation services",
  ],
  alternates: { canonical: "https://www.philecoders.com/services" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.philecoders.com/services",
    siteName: "PhileCoders",
    title: "Our Services — Web, Mobile, SEO & Digital Marketing | PhileCoders",
    description:
      "End-to-end software and marketing services in India. Web apps, mobile apps, SEO, PPC, social media, email marketing, and more.",
    images: [{ url: "https://www.philecoders.com/og-image.png", width: 1200, height: 630, alt: "PhileCoders Services" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://www.philecoders.com/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "PhileCoders Services",
  url: "https://www.philecoders.com/services",
  itemListElement: content.services.items.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.title,
    url: `https://www.philecoders.com/services/${s.slug}`,
    description: s.description,
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesClient />
    </>
  );
}
