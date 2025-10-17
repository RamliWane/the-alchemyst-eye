"use client";
import React, { useState } from "react";

export default function Features() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="features" className="w-full py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-center">
          Powerful features
        </h2>

        {/* Card grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 -mx-10">
          {/* 3 card pertama selalu muncul */}
          <div className="rounded-lg border border-black/10 dark:border-white/10 p-6 transition-transform hover:scale-[1.02]">
            <img className="rounded-xl mb-5" src="kotak.png" alt="" />
            <h3 className="font-medium">Fast</h3>
            <p className="mt-2 text-sm opacity-80">
              Optimized with Next.js 15 and Tailwind v4 for speed.
            </p>
          </div>

          <div className="rounded-lg border border-black/10 dark:border-white/10 p-6 transition-transform hover:scale-[1.02]">
            <img className="rounded-xl mb-5" src="kotak.png" alt="" />
            <h3 className="font-medium">Modern</h3>
            <p className="mt-2 text-sm opacity-80">
              Clean UI, responsive by default, accessible structure.
            </p>
          </div>

          <div className="rounded-lg border border-black/10 dark:border-white/10 p-6 transition-transform hover:scale-[1.02]">
            <img className="rounded-xl mb-5" src="kotak.png" alt="" />
            <h3 className="font-medium">Scalable</h3>
            <p className="mt-2 text-sm opacity-80">
              Composable components for easy extension.
            </p>
          </div>

          {/* 3 card tambahan — disembunyikan kalau showAll = false */}
          {showAll && (
            <>
              <div className="rounded-lg border border-black/10 dark:border-white/10 p-6 transition-transform hover:scale-[1.02]">
                <img className="rounded-xl mb-5" src="kotak.png" alt="" />
                <h3 className="font-medium">Fast</h3>
                <p className="mt-2 text-sm opacity-80">
                  Optimized with Next.js 15 and Tailwind v4 for speed.
                </p>
              </div>

              <div className="rounded-lg border border-black/10 dark:border-white/10 p-6 transition-transform hover:scale-[1.02]">
                <img className="rounded-xl mb-5" src="kotak.png" alt="" />
                <h3 className="font-medium">Modern</h3>
                <p className="mt-2 text-sm opacity-80">
                  Clean UI, responsive by default, accessible structure.
                </p>
              </div>

              <div className="rounded-lg border border-black/10 dark:border-white/10 p-6 transition-transform hover:scale-[1.02]">
                <img className="rounded-xl mb-5" src="kotak.png" alt="" />
                <h3 className="font-medium">Scalable</h3>
                <p className="mt-2 text-sm opacity-80">
                  Composable components for easy extension.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Tombol toggle */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition"
          >
            {showAll ? "Tampilkan Lebih Sedikit" : "Lihat Semua Fitur"}
          </button>
        </div>
      </div>
    </section>
  );
}
