import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy — PhileCoders",
  description: "How PhileCoders uses cookies on its website.",
};

const sections = [
  {
    heading: "What Are Cookies",
    body: [
      "Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.",
    ],
  },
  {
    heading: "Cookies We Use",
    body: [
      "Essential cookies: We store a single cookie called 'theme' in your browser's localStorage to remember your light/dark mode preference. This is strictly necessary for the site to function as you expect and does not track you.",
      "Analytics cookies: We use Google Analytics to collect anonymised data about how visitors use our site (pages visited, time on site, referral source). This data is aggregated and cannot be used to identify you personally.",
      "We do not use advertising cookies, retargeting cookies, or any third-party tracking cookies beyond Google Analytics.",
    ],
  },
  {
    heading: "Why We Use Cookies",
    body: [
      "The theme preference cookie ensures you don't have to re-select your preferred colour scheme on every visit.",
      "Analytics cookies help us understand which content is most useful to visitors so we can improve our website and services.",
    ],
  },
  {
    heading: "Managing Cookies",
    body: [
      "You can control and delete cookies through your browser settings. Most browsers allow you to refuse cookies, delete existing cookies, or be notified when a cookie is set.",
      "To opt out of Google Analytics tracking specifically, you can install the Google Analytics Opt-out Browser Add-on available at https://tools.google.com/dlpage/gaoptout.",
      "Please note that disabling cookies may affect the functionality of our website, particularly the theme preference feature.",
    ],
  },
  {
    heading: "Third-Party Cookies",
    body: [
      "Our website may include embedded content (such as Google Maps on our contact page). These third-party services may set their own cookies subject to their respective privacy policies.",
      "We do not control third-party cookies and recommend reviewing the privacy policies of any third-party services you interact with on our site.",
    ],
  },
  {
    heading: "Updates to This Policy",
    body: [
      "We may update this Cookie Policy as our use of cookies changes or as required by law. The 'Last updated' date at the top of this page reflects when the policy was last revised.",
    ],
  },
];

export default function CookiePolicyPage() {
  return (
    <>
      <Navbar />
      <LegalPage
        badge="Legal"
        title="Cookie Policy"
        lastUpdated="January 1, 2026"
        intro="This Cookie Policy explains how PhileCoders uses cookies and similar technologies on our website. We keep our cookie usage minimal — only what's necessary for the site to work well for you."
        sections={sections}
      />
      <Footer />
    </>
  );
}
