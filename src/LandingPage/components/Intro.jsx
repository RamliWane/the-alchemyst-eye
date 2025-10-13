"use client";
import { useEffect, useState, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import gsap from "gsap";

export default function Intro({ duration = 2400, title = "THE ALCHEMYST EYE" }) {
  const [visible, setVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const [audioReady, setAudioReady] = useState(false);
  const [audioCtx, setAudioCtx] = useState(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), duration);
    // Try to autoplay audio immediately on mount (may be blocked by browser policies)
    initAudio();
    return () => clearTimeout(t);
  }, [duration]);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.35 } },
    exit: { opacity: 0, transition: { duration: 0.45 } },
  };

  const titleAnim = prefersReducedMotion
    ? {}
    : {
        animate: {
          y: [0, -1, 0, 1, 0],
          filter: [
            "drop-shadow(0 0 0 rgba(255,0,0,0.0))",
            "drop-shadow(0 0 6px rgba(255,0,0,0.25))",
            "drop-shadow(0 0 0 rgba(255,0,0,0.0))",
          ],
          transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
        },
      };

  useLayoutEffect(() => {
    if (!visible || prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.set([".intro-redflash", ".intro-blood", ".intro-blood-edges", ".intro-blood-streaks", ".intro-scanline"], { opacity: 0 });
      tl.set(".intro-cta", { y: 0 });
      tl.fromTo(".intro-redflash", { opacity: 0 }, { opacity: 1, duration: 0.12 })
        .to(".intro-redflash", { opacity: 0, duration: 0.5 }, ">-0.02");
      tl.to(".intro-title", { scale: 1.04, filter: "drop-shadow(0 0 18px rgba(255,0,0,0.6))", duration: 0.6 }, 0.05)
        .to(".intro-title", { scale: 1, duration: 0.4 }, ">");
      tl.to(".intro-title", { skewX: 2, duration: 0.05, repeat: 6, yoyo: true, ease: "power1.inOut" }, 0.12);
      tl.to([".intro-fog--a", ".intro-fog--b"], { opacity: (i) => (i === 0 ? 0.28 : 0.2), duration: 0.8 }, 0);
      tl.to([".intro-blood", ".intro-blood-edges", ".intro-blood-streaks"], { opacity: (i) => [0.45, 0.35, 0.22][i], duration: 0.9 }, 0.15);
      tl.to(".intro-scanline", { opacity: 0.6, duration: 0.4 }, 0.2)
        .to(".intro-scanline", { opacity: 0.25, duration: 1.2 }, "<");
      tl.to(".intro-cta", { opacity: 0.35, duration: 0.06, repeat: 8, yoyo: true, ease: "steps(2)" }, 0.22);
      tl.to(".intro-shake-target", { x: 1, y: -1, rotation: 0.2, duration: 0.06, repeat: 7, yoyo: true, ease: "sine.inOut" }, 0.1);
    }, rootRef);
    return () => ctx.revert();
  }, [visible, prefersReducedMotion]);

  const fogAnimA = prefersReducedMotion
    ? {}
    : { animate: { x: ["-10%", "10%", "-10%"], transition: { duration: 16, repeat: Infinity, ease: "easeInOut" } } };
  const fogAnimB = prefersReducedMotion
    ? {}
    : { animate: { x: ["8%", "-8%", "8%"], transition: { duration: 20, repeat: Infinity, ease: "easeInOut" } } };

  const initAudio = () => {
    if (audioCtx) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      setAudioCtx(ctx);
      setAudioReady(true);

      // Master gain
      const master = ctx.createGain();
      master.gain.value = 0.7;
      master.connect(ctx.destination);

      // Heartbeat: layered thumps (more intense)
      const beat = (when) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(55, when);
        gain.gain.setValueAtTime(0, when);
        gain.gain.linearRampToValueAtTime(0.6, when + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, when + 0.3);
        osc.connect(gain);
        gain.connect(master);
        osc.start(when);
        osc.stop(when + 0.3);

        // Detuned hit for thud texture
        const osc2 = ctx.createOscillator();
        const g2 = ctx.createGain();
        osc2.type = "triangle";
        osc2.frequency.setValueAtTime(90, when);
        g2.gain.setValueAtTime(0, when);
        g2.gain.linearRampToValueAtTime(0.25, when + 0.03);
        g2.gain.exponentialRampToValueAtTime(0.001, when + 0.22);
        osc2.connect(g2);
        g2.connect(master);
        osc2.start(when);
        osc2.stop(when + 0.25);
      };
      const now = ctx.currentTime;
      beat(now + 0.05);
      beat(now + 0.45);
      // Second pair later for extra tension
      beat(now + 1.4);
      beat(now + 1.8);

      // Noise burst (jumpscare whisper)
      const noiseDur = 0.6;
      const bufferSize = ctx.sampleRate * noiseDur;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
      const noise = ctx.createBufferSource();
      const nGain = ctx.createGain();
      nGain.gain.value = 0.18;
      noise.buffer = buffer;
      noise.connect(nGain);
      nGain.connect(master);
      noise.start(now + 0.8);
      noise.stop(now + 0.8 + noiseDur);

      // Low rumble loop for ambience
      const rumbleDur = 2.0;
      const rBuffer = ctx.createBuffer(1, ctx.sampleRate * rumbleDur, ctx.sampleRate);
      const rData = rBuffer.getChannelData(0);
      for (let i = 0; i < rData.length; i++) {
        const t = i / ctx.sampleRate;
        rData[i] = (Math.random() * 2 - 1) * (0.06 + 0.02 * Math.sin(t * 2 * Math.PI * 0.5));
      }
      const rSource = ctx.createBufferSource();
      rSource.buffer = rBuffer;
      rSource.loop = true;
      const rFilter = ctx.createBiquadFilter();
      rFilter.type = "lowpass";
      rFilter.frequency.value = 120;
      const rGain = ctx.createGain();
      rGain.gain.value = 0.08;
      rSource.connect(rFilter);
      rFilter.connect(rGain);
      rGain.connect(master);
      rSource.start(now + 0.2);

      // High tension tone (very low volume)
      const tone = ctx.createOscillator();
      const tGain = ctx.createGain();
      tone.type = "sawtooth";
      tone.frequency.value = 740; // tense mid-high
      tGain.gain.value = 0.01;
      tone.connect(tGain);
      tGain.connect(master);
      tone.start(now + 0.3);
      tone.stop(now + 2.5);
    } catch {}
  };

  useEffect(() => {
    return () => {
      if (audioCtx && audioCtx.state !== "closed") {
        audioCtx.close().catch(() => {});
      }
    };
  }, [audioCtx]);

  // Best-effort resume attempts if autoplay was blocked
  useEffect(() => {
    let interval;
    if (audioCtx && audioCtx.state === "suspended") {
      let tries = 0;
      interval = setInterval(async () => {
        tries += 1;
        try { await audioCtx.resume(); } catch {}
        if (audioCtx.state === "running" || tries > 10) clearInterval(interval);
      }, 500);
    }
    return () => interval && clearInterval(interval);
  }, [audioCtx]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={rootRef}
          className="fixed inset-0 z-[9999] intro-bg text-white overflow-hidden select-none intro-shake"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* noise & vignette */}
          <div className="absolute inset-0 pointer-events-none intro-noise" aria-hidden />
          <div className="absolute inset-0 pointer-events-none intro-vignette" aria-hidden />

          {/* background/effect layers */}
          <div className="intro-layers intro-shake-target">
            <motion.div className="absolute inset-0 intro-fog intro-fog--a" aria-hidden {...fogAnimA} />
            <motion.div className="absolute inset-0 intro-fog intro-fog--b" aria-hidden {...fogAnimB} />
            <div className="absolute inset-0 intro-embers" aria-hidden />
            <div className="absolute inset-0 intro-blood" aria-hidden />
            <div className="absolute inset-0 intro-blood-edges" aria-hidden />
            <div className="absolute inset-0 intro-blood-streaks" aria-hidden />
            <div className="absolute inset-0 intro-redflash" aria-hidden />
          </div>

          <div className="intro-container">
            <motion.div className="text-center" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
              <motion.h1
                className="intro-title intro-title-size leading-none font-semibold tracking-[0.2em] intro-flicker intro-chroma"
                {...titleAnim}
              >
                {title}
              </motion.h1>
              
            </motion.div>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-24 intro-scanline" aria-hidden />

          <div className="absolute inset-0 intro-fadeout" aria-hidden />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
