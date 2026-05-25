import type { Metadata } from "next";
import ServicesClient from "@/components/ServicesClient";
import content from "@/content.json";

export const metadata: Metadata = {
  title: "Our Services — Web, Mobile, SEO & Digital Marketing",
  description:
    "PhileCoders offers end-to-end software services: custom web development, mobile apps, UI/UX design, backend APIs, cloud DevOps, SEO, digital marketing, PPC, email marketing, and lead generation.",
  keywords: [
    "web development services",
    "mobile app development",
    "SEO services",
    "digital marketing agency",
    "UI UX design",
    "backend API development",
    "cloud DevOps services",
    "PPC management",
    "email marketing",
    "lead generation services",
  ],
  alternates: { canonical: "https://www.philecoders.com/services" },
  openGraph: {
    url: "https://www.philecoders.com/services",
    title: "Our Services — Web, Mobile, SEO & Digital Marketing | PhileCoders",
    description:
      "End-to-end software and marketing services. Web apps, mobile apps, SEO, PPC, social media, email marketing, and more.",
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
