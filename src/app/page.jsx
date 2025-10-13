import Navbar from "./LandingPage/components/Navbar";
import Hero from "./LandingPage/components/Hero";
import Features from "./LandingPage/components/Features";
import CTA from "./LandingPage/components/CTA";
import Footer from "./LandingPage/components/Footer";
import Intro from "./LandingPage/components/Intro";

export default function Home() {
  return (
    <>
      <Intro />
      <div className="app-grid-bg min-h-screen">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-16 sm:space-y-24">
          <Hero />
          <Features />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  );
}

