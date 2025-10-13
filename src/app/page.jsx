import Image from "next/image";
import Navbar from "../LandingPage/components/Navbar";
import Hero from "../LandingPage/components/Hero";
import Features from "../LandingPage/components/Features";
import CTA from "../LandingPage/components/CTA";
import Footer from "../LandingPage/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </main>
  );
}

