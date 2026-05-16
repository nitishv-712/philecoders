import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — PhileCoders",
  description: "How PhileCoders collects, uses, and protects your personal information.",
};

const sections = [
  {
    heading: "Information We Collect",
    body: [
      "We collect information you provide directly to us, such as when you fill out our contact form, subscribe to our newsletter, or communicate with us by email. This may include your name, email address, phone number, company name, and the content of your messages.",
      "We also automatically collect certain technical information when you visit our website, including your IP address, browser type, operating system, referring URLs, and pages viewed. This is collected via standard server logs and analytics tools.",
    ],
  },
  {
    heading: "How We Use Your Information",
    body: [
      "We use the information we collect to respond to your inquiries and provide the services you request, send you project updates and communications related to our work together, and improve our website and services.",
      "With your consent, we may send you occasional newsletters or updates about our services. You can unsubscribe at any time using the link in any email we send.",
      "We do not sell, rent, or share your personal information with third parties for their marketing purposes.",
    ],
  },
  {
    heading: "Data Storage & Security",
    body: [
      "Your data is stored securely using Firebase (Google Cloud infrastructure), which is protected by industry-standard encryption at rest and in transit.",
      "We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.",
    ],
  },
  {
    heading: "Cookies",
    body: [
      "Our website uses essential cookies to remember your theme preference (light/dark mode). We do not use tracking cookies or third-party advertising cookies.",
      "You can control cookie settings through your browser. Disabling cookies may affect some functionality of the site.",
    ],
  },
  {
    heading: "Third-Party Services",
    body: [
      "We use Google Analytics to understand how visitors use our site. Google Analytics collects anonymised usage data. You can opt out using the Google Analytics Opt-out Browser Add-on.",
      "Our contact form submissions are stored in Firebase Firestore. Firebase's privacy policy applies to data processed through their platform.",
    ],
  },
  {
    heading: "Your Rights",
    body: [
      "You have the right to access, correct, or delete the personal information we hold about you. You may also object to or restrict certain processing of your data.",
      "To exercise any of these rights, please contact us at philecoders@gmail.com. We will respond within 30 days.",
    ],
  },
  {
    heading: "Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the 'Last updated' date at the top of this page. Continued use of our website after changes constitutes acceptance of the updated policy.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <LegalPage
        badge="Legal"
        title="Privacy Policy"
        lastUpdated="January 1, 2026"
        intro="At PhileCoders, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage our services. Please read this policy carefully."
        sections={sections}
      />
      <Footer />
    </>
  );
}
