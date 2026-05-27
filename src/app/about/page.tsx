import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutIntro from "@/components/about/AboutIntro";
import OurStory from "@/components/about/OurStory";
import MissionVision from "@/components/about/MissionVision";
import Team from "@/components/about/Team";
import WhyTrustUs from "@/components/about/WhyTrustUs";
import Certifications from "@/components/about/Certifications";

export const metadata: Metadata = {
  title: "About PhileCoders — Our Story, Team & Mission",
  description:
    "Meet the PhileCoders team — senior engineers and designers who've shipped 48+ projects for startups and Fortune 500s. Learn our story, mission, and values.",
  keywords: [
    "about PhileCoders",
    "software development team India",
    "senior engineers Noida",
    "tech company story",
    "software agency mission",
  ],
  alternates: { canonical: "https://www.philecoders.com/about" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.philecoders.com/about",
    siteName: "PhileCoders",
    title: "About PhileCoders — Our Story, Team & Mission",
    description:
      "A lean team of senior engineers and designers. 48+ projects shipped, 98% client retention. Learn what makes PhileCoders different.",
    images: [{ url: "https://www.philecoders.com/og-image.png", width: 1200, height: 630, alt: "PhileCoders team" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://www.philecoders.com/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About PhileCoders",
  url: "https://www.philecoders.com/about",
  description:
    "PhileCoders is a software development company founded in 2018. We build web apps, mobile apps, and digital solutions for startups and enterprises.",
  mainEntity: {
    "@type": "Organization",
    name: "PhileCoders",
    foundingDate: "2018",
    numberOfEmployees: { "@type": "QuantitativeValue", value: 12 },
    url: "https://www.philecoders.com",
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <AboutIntro />
        <OurStory />
        <MissionVision />
        <Team />
        <WhyTrustUs />
        <Certifications />
      </main>
      <Footer />
    </>
  );
}
