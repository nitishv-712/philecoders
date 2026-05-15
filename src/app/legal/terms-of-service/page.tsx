import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service — PhileCoders",
  description: "Terms and conditions governing use of PhileCoders services.",
};

const sections = [
  {
    heading: "Acceptance of Terms",
    body: [
      "By accessing our website or engaging PhileCoders for services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.",
    ],
  },
  {
    heading: "Services",
    body: [
      "PhileCoders provides software development, design, and consulting services as described in individual project agreements or statements of work (SOW). The specific scope, deliverables, timeline, and pricing for each engagement are defined in a separate written agreement signed by both parties.",
      "We reserve the right to refuse service to anyone for any reason at any time.",
    ],
  },
  {
    heading: "Intellectual Property",
    body: [
      "Upon full payment of all fees, PhileCoders assigns to the client all intellectual property rights in the custom deliverables created specifically for that client under the applicable project agreement.",
      "PhileCoders retains ownership of all pre-existing tools, frameworks, libraries, and methodologies used in delivering services. Any open-source components used remain subject to their respective licences.",
      "PhileCoders may reference the client's name and a general description of the project in our portfolio unless the client requests otherwise in writing.",
    ],
  },
  {
    heading: "Payment Terms",
    body: [
      "Payment terms are specified in each project agreement. Unless otherwise agreed, invoices are due within 14 days of issue. Late payments may incur interest at 1.5% per month.",
      "For fixed-price projects, a deposit (typically 30–50%) is required before work begins. The remaining balance is due upon project completion or as specified in the SOW.",
    ],
  },
  {
    heading: "Confidentiality",
    body: [
      "Both parties agree to keep confidential any proprietary or sensitive information shared during the engagement. PhileCoders will sign a mutual NDA upon request before any discovery call.",
      "This obligation survives termination of the engagement for a period of two years.",
    ],
  },
  {
    heading: "Limitation of Liability",
    body: [
      "PhileCoders' total liability for any claim arising out of or relating to our services shall not exceed the total fees paid by the client in the three months preceding the claim.",
      "We are not liable for any indirect, incidental, special, or consequential damages, including loss of profits or data, even if advised of the possibility of such damages.",
    ],
  },
  {
    heading: "Termination",
    body: [
      "Either party may terminate a project engagement with 14 days' written notice. The client is responsible for payment of all work completed up to the termination date.",
      "PhileCoders may terminate immediately if the client breaches these terms or fails to make payment after a 7-day cure period.",
    ],
  },
  {
    heading: "Governing Law",
    body: [
      "These Terms of Service are governed by the laws of the State of California, USA, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of San Francisco County, California.",
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />
      <LegalPage
        badge="Legal"
        title="Terms of Service"
        lastUpdated="January 1, 2026"
        intro="These Terms of Service govern your use of the PhileCoders website and the services we provide. By using our website or engaging our services, you agree to these terms. Please read them carefully before proceeding."
        sections={sections}
      />
      <Footer />
    </>
  );
}
