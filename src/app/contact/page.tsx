import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactMap from "@/components/contact/ContactMap";
import QuickContact from "@/components/contact/QuickContact";
import content from "@/content.json";

export const metadata: Metadata = {
  title: `Contact — ${content.site.name}`,
  description: "Get in touch with PhileCoders. We respond within one business day.",
};

export default function ContactPage() {
  return (
    <>
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
