"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function Intro({ duration = 2400, title = "THE ALCHEMYST EYE" }) {
  const [visible, setVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const [audioReady, setAudioReady] = useState(false);
  const [audioCtx, setAudioCtx] = useState(null);

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
          className="fixed inset-0 z-[9999] intro-bg text-white overflow-hidden select-none intro-shake"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* noise & vignette */}
          <div className="absolute inset-0 pointer-events-none intro-noise" aria-hidden />
          <div className="absolute inset-0 pointer-events-none intro-vignette" aria-hidden />

          {/* drifting fog layers */}
          <motion.div className="absolute inset-0 intro-fog intro-fog--a" aria-hidden {...fogAnimA} />
          <motion.div className="absolute inset-0 intro-fog intro-fog--b" aria-hidden {...fogAnimB} />

          {/* ember particles */}
          <div className="absolute inset-0 intro-embers" aria-hidden />

          {/* blood overlay */}
          <div className="absolute inset-0 intro-blood" aria-hidden />
          <div className="absolute inset-0 intro-blood-edges" aria-hidden />
          <div className="absolute inset-0 intro-blood-streaks" aria-hidden />

          {/* blood-red flash at start */}
          <div className="absolute inset-0 intro-redflash" aria-hidden />

          <div className="intro-container">
            <motion.div className="text-center" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
              <motion.h1
                className="intro-title intro-title-size leading-none font-semibold tracking-[0.2em] intro-flicker intro-chroma"
                {...titleAnim}
              >
                {title}
              </motion.h1>
              <motion.p
                className="mt-4 text-red-500/80 text-xs sm:text-sm md:text-base tracking-widest intro-glitch"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.25, duration: 0.4 } }}
              >
                PRESS START
              </motion.p>
            </motion.div>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-24 intro-scanline" aria-hidden />

          <div className="absolute inset-0 intro-fadeout" aria-hidden />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
