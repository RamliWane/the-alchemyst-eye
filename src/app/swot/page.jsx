"use client";

import React from "react";

export default function SwotPage() {
  return (
    <section className="w-full py-16 sm:py-24">
            <div className={`mb-10 ml-7 lg:ml-45 transition-all duration-700 ease-out`}>
                <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">
                    SWOT Analysis
                </h1>
                <p className="text-lg text-gray-400 max-w-2xl">
                    Explore the strengths, weaknesses, opportunities, and threats related to The Alchemyst Eye.
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-10">
                <div className="group w-full md:w-[550px] relative bg-black rounded-3xl overflow-hidden border border-red-900/30 shadow-2xl shadow-red-900/20 p-8">
                    <video
                    src="/mata-3.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover object-right opacity-70 z-0 pointer-events-none transition-opacity duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/40 to-transparent z-10"></div>

                    <div className="relative z-20 inline-flex items-center gap-2 bg-black/80 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-red-800/30">
                        <div className="w-3 h-3 bg-red-700 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-red-600/80">The Alchemyst Eye</span>
                    </div>

                    <div className="relative z-20">
                    <h2
                        className="text-4xl font-bold mb-4 text-red-700"
                        style={{
                        fontFamily: "system-ui, -apple-system, sans-serif",
                        textShadow: "0 0 12px rgba(127, 29, 29, 0.4)",
                        }}
                    >
                        Strench
                    </h2>
                    <p className="text-gray-300 mb-12 max-w-sm leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil quia alias eum ullam.
                    </p>
                    </div>

                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 opacity-0 group-hover:opacity-100 transition-all duration-500 z-30">
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl px-6 w-110 py-10 text-center">
                            <p className="text-[16px] font-semibold text-gray-600 tracking-widest">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque eveniet quam tenetur debitis alias reprehenderit placeat et distinctio corrupti, autem magni, ullam perferendis, enim ad quibusdam totam nulla assumenda. Nam.</p>
                        </div>
                    </div>
                </div>
                <div className="group w-full md:w-[550px] relative bg-black rounded-3xl overflow-hidden border border-red-900/30 shadow-2xl shadow-red-900/20 p-8">
                    {/* <video
                    src="/mata-3.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover object-right opacity-70 z-0 pointer-events-none transition-opacity duration-700"
                    /> */}
                    <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/40 to-transparent z-10"></div>

                    <div className="relative z-20 inline-flex items-center gap-2 bg-black/80 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-red-800/30">
                        <div className="w-3 h-3 bg-red-700 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-red-600/80">The Alchemyst Eye</span>
                    </div>

                    <div className="relative z-20">
                    <h2
                        className="text-4xl font-bold mb-4 text-red-700"
                        style={{
                        fontFamily: "system-ui, -apple-system, sans-serif",
                        textShadow: "0 0 12px rgba(127, 29, 29, 0.4)",
                        }}
                    >
                        Strench
                    </h2>
                    <p className="text-gray-300 mb-12 max-w-sm leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil quia alias eum ullam.
                    </p>
                    </div>

                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 opacity-0 group-hover:opacity-100 transition-all duration-500 z-30">
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl px-6 w-110 py-10 text-center">
                            <p className="text-[16px] font-semibold text-gray-600 tracking-widest">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque eveniet quam tenetur debitis alias reprehenderit placeat et distinctio corrupti, autem magni, ullam perferendis, enim ad quibusdam totam nulla assumenda. Nam.</p>
                        </div>
                    </div>
                </div>
                <div className="group w-full md:w-[550px] relative bg-black rounded-3xl overflow-hidden border border-red-900/30 shadow-2xl shadow-red-900/20 p-8">
                    <video
                    src="/mata-3.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover object-right opacity-70 z-0 pointer-events-none transition-opacity duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/40 to-transparent z-10"></div>

                    <div className="relative z-20 inline-flex items-center gap-2 bg-black/80 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-red-800/30">
                        <div className="w-3 h-3 bg-red-700 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-red-600/80">The Alchemyst Eye</span>
                    </div>

                    <div className="relative z-20">
                    <h2
                        className="text-4xl font-bold mb-4 text-red-700"
                        style={{
                        fontFamily: "system-ui, -apple-system, sans-serif",
                        textShadow: "0 0 12px rgba(127, 29, 29, 0.4)",
                        }}
                    >
                        Strench
                    </h2>
                    <p className="text-gray-300 mb-12 max-w-sm leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil quia alias eum ullam.
                    </p>
                    </div>

                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 opacity-0 group-hover:opacity-100 transition-all duration-500 z-30">
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl px-6 w-110 py-10 text-center">
                            <p className="text-[16px] font-semibold text-gray-600 tracking-widest">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque eveniet quam tenetur debitis alias reprehenderit placeat et distinctio corrupti, autem magni, ullam perferendis, enim ad quibusdam totam nulla assumenda. Nam.</p>
                        </div>
                    </div>
                </div>
                <div className="group w-full md:w-[550px] relative bg-black rounded-3xl overflow-hidden border border-red-900/30 shadow-2xl shadow-red-900/20 p-8">
                    <video
                    src="/mata-3.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover object-right opacity-70 z-0 pointer-events-none transition-opacity duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/40 to-transparent z-10"></div>

                    <div className="relative z-20 inline-flex items-center gap-2 bg-black/80 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-red-800/30">
                        <div className="w-3 h-3 bg-red-700 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-red-600/80">The Alchemyst Eye</span>
                    </div>

                    <div className="relative z-20">
                    <h2
                        className="text-4xl font-bold mb-4 text-red-700"
                        style={{
                        fontFamily: "system-ui, -apple-system, sans-serif",
                        textShadow: "0 0 12px rgba(127, 29, 29, 0.4)",
                        }}
                    >
                        Strench
                    </h2>
                    <p className="text-gray-300 mb-12 max-w-sm leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil quia alias eum ullam.
                    </p>
                    </div>

                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 opacity-0 group-hover:opacity-100 transition-all duration-500 z-30">
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl px-6 w-110 py-10 text-center">
                            <p className="text-[16px] font-semibold text-gray-600 tracking-widest">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque eveniet quam tenetur debitis alias reprehenderit placeat et distinctio corrupti, autem magni, ullam perferendis, enim ad quibusdam totam nulla assumenda. Nam.</p>
                        </div>
                    </div>
                </div>

                </div>

    </section>
    );
}