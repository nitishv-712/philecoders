import Navbar       from "@/components/Navbar";
import Hero         from "@/components/Hero";
import AboutPreview from "@/components/AboutPreview";
import WhyChooseUs  from "@/components/WhyChooseUs";
import Services     from "@/components/Services";
import Stats        from "@/components/Stats";
import CTA          from "@/components/CTA";
import Footer       from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutPreview />
        <WhyChooseUs />
        <Services />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
