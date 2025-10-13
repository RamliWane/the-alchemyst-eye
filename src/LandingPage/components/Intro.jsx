"use client";
import { useEffect, useState } from "react";

export default function Intro({ duration = 2400, title = "THE ALCHEMYST EYE" }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(t);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black text-white overflow-hidden select-none">
      <div className="absolute inset-0 pointer-events-none intro-noise" />
      <div className="absolute inset-0 pointer-events-none intro-vignette" />

      <div className="h-full w-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-[10vw] leading-none font-semibold tracking-[0.2em] intro-flicker">
            {title}
          </h1>
          <p className="mt-4 text-red-500/80 text-sm sm:text-base tracking-widest intro-glitch">
            PRESS START
          </p>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-24 intro-scanline" />

      <div className="absolute inset-0 intro-fadeout" />
    </div>
  );
}
