import Navbar from "../LandingPage/components/Navbar";
import Hero from "../LandingPage/components/Hero";
import Features from "../LandingPage/components/Features";
import CTA from "../LandingPage/components/CTA";
import Footer from "../LandingPage/components/Footer";
import Intro from "../LandingPage/components/Intro";

export default function Home() {
  return (
    <>
      <Intro />
      <main>
        <Navbar />
        <Hero />
        <Features />
        <CTA />
        <Footer />
      </main>
    </>
  );
}

