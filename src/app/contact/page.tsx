import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactMap from "@/components/contact/ContactMap";
import QuickContact from "@/components/contact/QuickContact";

export const metadata: Metadata = {
  title: "Contact PhileCoders — Get a Free Project Quote",
  description:
    "Contact PhileCoders for a free 30-minute discovery call. We build custom web apps, mobile apps, and digital solutions. Response within one business day.",
  keywords: [
    "contact PhileCoders",
    "hire software developers",
    "free project quote",
    "software development consultation",
    "web app development quote",
  ],
  alternates: { canonical: "https://www.philecoders.com/contact" },
  openGraph: {
    url: "https://www.philecoders.com/contact",
    title: "Contact PhileCoders — Get a Free Project Quote",
    description:
      "Book a free 30-minute discovery call with PhileCoders. Tell us about your project and get an honest quote within 48 hours.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact PhileCoders",
  url: "https://www.philecoders.com/contact",
  mainEntity: {
    "@type": "Organization",
    name: "PhileCoders",
    telephone: "+91-62021-87680",
    email: "philecoders@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Prakash Nagar, Khora, Sector-62",
      addressLocality: "Noida",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <ContactHero />
        <ContactForm />
        <QuickContact />
        <ContactMap />
      </main>
      <Footer />
    </>
  );
}
