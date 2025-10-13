"use client";
import { useEffect, useRef, useState } from "react";
import HeroEye3D from "./HeroEye3D";

export default function Hero() {
  const [canInstall, setCanInstall] = useState(false);
  const [promptEvt, setPromptEvt] = useState(null);
  const eyeRef = useRef(null);
  const scleraRef = useRef(null);
  const irisRef = useRef(null);
  const pupilRef = useRef(null);
  const highlightRef = useRef(null);
  const [follow, setFollow] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setPromptEvt(e);
      setCanInstall(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const onInstall = async () => {
    if (!promptEvt) return;
    promptEvt.prompt();
    await promptEvt.userChoice.catch(() => {});
    setCanInstall(false);
  };

  useEffect(() => {
    const root = eyeRef.current;
    const sclera = scleraRef.current;
    const iris = irisRef.current;
    const pupil = pupilRef.current;
    const hl = highlightRef.current;
    if (!root || !sclera || !iris || !pupil || !hl) return;

    let rafId = 0;
    let target = { x: 0, y: 0 };
    let cur = { x: 0, y: 0 };

    const onMove = (e) => {
      const rect = root.getBoundingClientRect();
      const mx = (e.clientX - rect.left) / rect.width; // 0..1
      const my = (e.clientY - rect.top) / rect.height; // 0..1
      target.x = (mx - 0.5) * 2; // -1..1
      target.y = (my - 0.5) * 2; // -1..1
      setFollow({ x: target.x, y: target.y });
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const loop = () => {
      cur.x = lerp(cur.x, target.x, 0.08);
      cur.y = lerp(cur.y, target.y, 0.08);

      const irisTX = cur.x * 6; // %
      const irisTY = cur.y * 4; // %
      const pupilTX = cur.x * 10;
      const pupilTY = cur.y * 7;
      const tiltX = -cur.y * 6; // deg
      const tiltY = cur.x * 8; // deg
      const rollZ = cur.x * -0.6;

      iris.style.transform = `translate(${irisTX}%, ${irisTY}%)`;
      pupil.style.transform = `translate(${pupilTX}%, ${pupilTY}%)`;
      hl.style.transform = `translate(${cur.x * 4}%, ${cur.y * 3}%)`;
      sclera.style.transform = `rotateX(${12 + tiltX * 0.2}deg) rotateY(${tiltY * 0.2}deg) rotateZ(${rollZ}deg)`;

      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section className="relative w-full py-20 sm:py-28 hero-horror">
      <div className="absolute inset-0 hero-noise pointer-events-none" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div ref={eyeRef} className="mx-auto mb-8 sm:mb-10" style={{ width: "min(860px, 90vw)" }}>
            <HeroEye3D className="w-full" follow={follow} />
          </div>
          <h1 className="hero-title text-4xl sm:text-6xl md:text-7xl leading-none">
            ENTER THE EYE
          </h1>
          <p className="hero-sub mt-5 text-sm sm:text-base md:text-lg">
            A forbidden ritual. A gaze that bites back.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3 sm:gap-4">
            <a href="#features" className="btn-blood px-5 py-3 text-sm sm:text-base">
              PLAY NOW
            </a>
            <button
              onClick={canInstall ? onInstall : undefined}
              className={`btn-install px-5 py-3 text-sm sm:text-base inline-flex items-center gap-2 ${canInstall ? '' : 'opacity-50 cursor-not-allowed'}`}
              title={canInstall ? 'Install for Windows' : 'Install not available'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
                <path d="M3 4l8-1v9H3V4zm0 10h8v7l-8-1v-6zm10-11l8-1v10h-8V3zm0 12h8v6l-8-1v-5z"/>
              </svg>
              WINDOWS
            </button>
            <button
              onClick={canInstall ? onInstall : undefined}
              className={`btn-install px-5 py-3 text-sm sm:text-base inline-flex items-center gap-2 ${canInstall ? '' : 'opacity-50 cursor-not-allowed'}`}
              title={canInstall ? 'Install for macOS' : 'Install not available'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
                <path d="M16.365 1.43c0 1.14-.45 2.224-1.18 3.03-.76.84-2.03 1.49-3.1 1.4-.12-1.08.5-2.24 1.23-3.03.79-.86 2.17-1.49 3.05-1.4zM20.7 17.25c-.59 1.37-.9 1.98-1.69 3.2-1.1 1.7-2.65 3.83-4.56 3.85-1.07.02-1.8-.74-3.14-.74-1.34 0-2.13.72-3.16.76-1.99.08-3.51-1.85-4.61-3.54-2.51-3.81-2.78-8.28-1.23-10.65 1.1-1.7 2.84-2.71 4.48-2.71 1.67 0 2.72.78 4.09.78 1.34 0 2.16-.78 4.09-.78 1.48 0 3.04.81 4.14 2.21-3.63 2.19-3.04 7.9.59 8.36z"/>
              </svg>
              APPLE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
