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
  title: "PhileCoders — Web & Mobile App Development | India",
  description:
    "Top-rated software dev company in Noida, India. Custom web apps, mobile apps, SEO & digital marketing. 32+ clients, 98% retention. Free call.",
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "PhileCoders",
    title: "PhileCoders — Web & Mobile App Development | India",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "PhileCoders — Your Ideas, Engineered" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@philecoders",
    creator: "@philecoders",
    title: "PhileCoders — Web & Mobile App Development | India",
    description:
      "Top-rated software development company in Noida, India. We build fast, scalable web apps, mobile apps, and digital solutions. Free 30-min discovery call.",
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
