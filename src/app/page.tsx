import type { Metadata } from "next";
import Navbar       from "@/components/Navbar";
import Hero         from "@/components/Hero";
import AboutPreview from "@/components/AboutPreview";
import WhyChooseUs  from "@/components/WhyChooseUs";
import Services     from "@/components/Services";
import CTA          from "@/components/CTA";
import Footer       from "@/components/Footer";

export const metadata: Metadata = {
  title: "PhileCoders — Custom Web & Mobile App Development Company",
  description:
    "PhileCoders builds custom web apps, mobile apps, and digital solutions. 32+ happy clients, 48+ projects shipped, 98% retention rate. Get a free discovery call today.",
  alternates: { canonical: "https://www.philecoders.com" },
  openGraph: {
    url: "https://www.philecoders.com",
    title: "PhileCoders — Custom Web & Mobile App Development Company",
    description:
      "Top-rated software development company. We build fast, scalable web apps, mobile apps, and digital solutions that grow your business.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.philecoders.com/#organization",
      name: "PhileCoders",
      url: "https://www.philecoders.com",
      logo: "https://www.philecoders.com/logo-icon.png",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-62021-87680",
        contactType: "customer service",
        email: "philecoders@gmail.com",
        availableLanguage: "English",
      },
      sameAs: [
        "https://github.com/nitishv-712",
        "https://twitter.com/philecoders",
        "https://www.instagram.com/philecoders",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.philecoders.com/#website",
      url: "https://www.philecoders.com",
      name: "PhileCoders",
      publisher: { "@id": "https://www.philecoders.com/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://www.philecoders.com/services?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
