"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const isActive = (href) => href === pathname;

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
          <Link 
            href="/"
            className={`nav-link nav-link-blood font-medium ${isActive('/') ? 'text-white' : ''}`}
            aria-current={isActive('/') ? 'page' : undefined}
          >
            Home
          </Link>
          <a 
            className="nav-link nav-link-blood font-medium" 
            href="/#features"
          >
            Features
          </a>

          <a 
            className="nav-link nav-link-blood font-medium" 
            href="/#contact"
          >
            Contact
          </a>
          
          <div className="w-px h-6 bg-white/15"></div>
          
          <Link 
            href="/swot"
            className={`nav-link nav-link-blood font-medium ${isActive('/swot') ? 'text-white' : ''}`}
            aria-current={isActive('/swot') ? 'page' : undefined}
          >
            Swot
          </Link>
          <Link 
            href="/developer"
            className={`nav-link nav-link-blood font-medium ${isActive('/developer') ? 'text-white' : ''}`}
            aria-current={isActive('/developer') ? 'page' : undefined}
          >
            Developer
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2.5 hover:bg-white/10 rounded-lg transition-colors duration-200"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <button
          aria-label="Close menu"
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 nav-horror backdrop-blur-xl border-b border-white/10 transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
        id="mobile-menu"
      >
        <nav className="flex flex-col px-6 py-5 gap-1">
          <div className="flex items-center justify-between pb-3">
            <Link href="/" className="text-base font-semibold tracking-wide" onClick={() => setIsMobileMenuOpen(false)}>
              The Alchemyst Eye
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <Link 
            href="/"
            className="block text-left ml-0 nav-link py-3 px-4 rounded-lg transition-all duration-200 font-medium hover:bg-white/5"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <a 
            className="block text-left ml-0 nav-link py-3 px-4 rounded-lg transition-all duration-200 font-medium hover:bg-white/5" 
            href="/#features"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Features
          </a>
          <a 
            className="block text-left ml-0 nav-link py-3 px-4 rounded-lg transition-all duration-200 font-medium hover:bg-white/5" 
            href="/#testimonials"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Testimonials
          </a>
          <a 
            className="block text-left ml-0 nav-link py-3 px-4 rounded-lg transition-all duration-200 font-medium hover:bg-white/5" 
            href="/#contact"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </a>

          <div className="h-px bg-white/10 my-3"></div>

          <Link 
            href="/swot"
            className={`block text-left ml-0 nav-link py-3 px-4 rounded-lg transition-all duration-200 font-medium hover:bg-white/5 ${pathname === '/swot' ? 'text-white' : ''}`}
            aria-current={pathname === '/swot' ? 'page' : undefined}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Swot
          </Link>
          <Link 
            href="/developer"
            className={`block text-left ml-0 nav-link py-3 px-4 rounded-lg transition-all duration-200 font-medium hover:bg-white/5 ${pathname === '/developer' ? 'text-white' : ''}`}
            aria-current={pathname === '/developer' ? 'page' : undefined}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Developer
          </Link>

          <div className="mt-4"></div>
          <a
            href="/#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="inline-flex items-center justify-center py-3 px-4 rounded-lg bg-white/90 text-black font-semibold hover:bg-white transition-colors"
          >
            Get in touch
          </a>

          <div className="flex items-center gap-4 mt-4 opacity-80">
            <a href="https://github.com/RamliWane" target="_blank" rel="noreferrer" className="p-2 rounded-md hover:bg-white/10">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.2-3.37-1.2-.46-1.2-1.12-1.53-1.12-1.53-.92-.64.07-.63.07-.63 1.02.07 1.56 1.07 1.56 1.07.9 1.58 2.36 1.12 2.94.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .85-.28 2.78 1.05.81-.23 1.68-.35 2.54-.35.86 0 1.73.12 2.54.35 1.93-1.33 2.78-1.05 2.78-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.95.68 1.92 0 1.38-.01 2.49-.01 2.83 0 .26.18.59.69.48A10.02 10.02 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"/></svg>
            </a>
            <a href="https://vercel.com" target="_blank" rel="noreferrer" className="p-2 rounded-md hover:bg-white/10">
              <svg className="w-5 h-5" viewBox="0 0 1155 1000" fill="currentColor"><path d="M577.3 0L1154.7 1000H0z"/></svg>
            </a>
          </div>
        </nav>
      </div>  
    </header>
  );
}