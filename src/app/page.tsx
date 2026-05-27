import type { Metadata } from "next";
import Navbar       from "@/components/Navbar";
import Hero         from "@/components/Hero";
import AboutPreview from "@/components/AboutPreview";
import WhyChooseUs  from "@/components/WhyChooseUs";
import Services     from "@/components/Services";
import CTA          from "@/components/CTA";
import Footer       from "@/components/Footer";

const BASE_URL = "https://www.philecoders.com";
const OG_IMAGE = `${BASE_URL}/og-image.png`;

export const metadata: Metadata = {
  title: "PhileCoders — #1 Web & Mobile App Development Company in India",
  description:
    "PhileCoders builds custom web apps, mobile apps & digital solutions in Noida, India. 32+ happy clients, 48+ projects shipped, 98% retention. Book a free discovery call today.",
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "PhileCoders",
    title: "PhileCoders — #1 Web & Mobile App Development Company in India",
    description:
      "Top-rated software development company in Noida, India. We build fast, scalable web apps, mobile apps, and digital solutions. Free 30-min discovery call.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "PhileCoders — Your Ideas, Engineered" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@philecoders",
    creator: "@philecoders",
    title: "PhileCoders — #1 Web & Mobile App Development Company in India",
    description:
      "Top-rated software dev company in Noida, India. Web apps, mobile apps, SEO & digital marketing. 32+ happy clients. Free quote.",
    images: [OG_IMAGE],
  },
};

/* BreadcrumbList for homepage */
const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <AboutPreview />
        <WhyChooseUs />
        <Services />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
