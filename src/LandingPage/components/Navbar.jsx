"use client";

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 20);
      
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
        setIsMobileMenuOpen(false);
      } 
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header 
      className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out nav-horror ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${isScrolled ? 'h-14 backdrop-blur-lg shadow-2xl' : 'h-16'}`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <div />
        
        {/* Desktop Navigation */}
        <nav className={`hidden md:flex items-center transition-all duration-300 ${
          isScrolled ? 'gap-6 text-sm' : 'gap-8 text-sm'
        }`}>
          <a 
            className="nav-link nav-link-blood font-medium" 
            href="#features"
          >
            Features
          </a>

          <a 
            className="nav-link nav-link-blood font-medium" 
            href="#contact"
          >
            Contact
          </a>
          
          <div className="w-px h-6 bg-white/15"></div>
          
          <a 
            className="nav-link nav-link-blood font-medium" 
            href="#swot"
          >
            Swot
          </a>
          <a 
            className="nav-link nav-link-blood font-medium" 
            href="#developer"
          >
            Developer
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2.5 hover:bg-white/10 rounded-lg transition-colors duration-200"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg className={`text-white transition-all duration-300 ${isScrolled ? 'w-5 h-5' : 'w-6 h-6'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className={`text-white transition-all duration-300 ${isScrolled ? 'w-5 h-5' : 'w-6 h-6'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 nav-horror backdrop-blur-xl border-b border-white/10 transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col px-6 py-6 gap-1">
          <a 
            className="nav-link py-3 px-4 rounded-lg transition-all duration-200 font-medium hover:bg-white/5" 
            href="#features"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Features
          </a>
          <a 
            className="nav-link py-3 px-4 rounded-lg transition-all duration-200 font-medium hover:bg-white/5" 
            href="#testimonials"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Testimonials
          </a>
          <a 
            className="nav-link py-3 px-4 rounded-lg transition-all duration-200 font-medium hover:bg-white/5" 
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </a>
          
          <div className="h-px bg-white/10 my-3"></div>
          
          <a 
            className="nav-link py-3 px-4 rounded-lg transition-all duration-200 font-medium hover:bg-white/5" 
            href="#swot"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Swot
          </a>
          <a 
            className="nav-link py-3 px-4 rounded-lg transition-all duration-200 font-medium hover:bg-white/5" 
            href="#developer"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Developer
          </a>
        </nav>
      </div>  
    </header>
  );
}