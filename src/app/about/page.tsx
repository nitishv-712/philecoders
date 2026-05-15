import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutIntro from "@/components/about/AboutIntro";
import OurStory from "@/components/about/OurStory";
import MissionVision from "@/components/about/MissionVision";
import Team from "@/components/about/Team";
import WhyTrustUs from "@/components/about/WhyTrustUs";
import Certifications from "@/components/about/Certifications";
import content from "@/content.json";

export const metadata: Metadata = {
  title: `About — ${content.site.name}`,
  description: "Learn about PhileCoders — our story, mission, team, and values.",
};

export default function AboutPage() {
  return (
    <>
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
