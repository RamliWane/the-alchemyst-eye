import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-black text-red-500 py-14 text-center border-t border-red-900/30">
      <h2 className="text-2xl font-semibold tracking-tight">
        The Alcemyst Eye
      </h2>

      <p className="mt-3 text-sm text-gray-400 max-w-md mx-auto">
        A place where curiosities awaken — arcane discoveries, cryptic tales, and atmospheric journeys.
      </p>

      <p className="mt-4 text-sm italic text-gray-500">
        “Beyond sight lies truth.”
      </p>

      <div className="mt-6 flex justify-center gap-8 text-sm font-medium">
        <a href="#features" className="text-gray-400 hover:text-red-400 transition-colors duration-300">
          Features
        </a>
        <a href="#contact" className="text-gray-400 hover:text-red-400 transition-colors duration-300">
          Contact
        </a>
      </div>

      <div className="mt-4 flex justify-center gap-4 text-xs text-gray-600">
        <a href="#about" className="hover:text-red-400 transition">About</a>
        <a href="#faq" className="hover:text-red-400 transition">FAQ</a>
        <a href="#privacy" className="hover:text-red-400 transition">Privacy</a>
      </div>

      <p className="mt-8 text-xs text-gray-500">
        © {year} The Alcemyst Eye. All rights reserved.
      </p>

      <style>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </footer>
  );
}
