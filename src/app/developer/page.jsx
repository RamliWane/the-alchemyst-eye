"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Twitter, MapPin, Briefcase } from 'lucide-react';

function TeamMember({ name, role, imageSeed, location, hobbies, github, linkedin, twitter, index }) {
  const [showHobbyTooltip, setShowHobbyTooltip] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`relative group transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionDelay: isVisible ? `${index * 150}ms` : '0ms'
      }}
    >
      <div className="bg-zinc-900/80 backdrop-blur-sm rounded-xl p-5 border border-white/5 hover:border-white/10 transition-all duration-300">
        <div className="flex items-start gap-4">
          <div className="relative flex-shrink-0">
            <div className="w-35 h-34 rounded-lg overflow-hidden group-hover:border-white/20 transition-all">
              <img src="kotak.png" alt="" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-white mb-0.5 truncate">{name}</h3>
            <p className="text-sm text-gray-400 mb-2 flex items-center gap-1">
              <Briefcase className="w-3 h-3" />
              {role}
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1 mb-3">
              <MapPin className="w-3 h-3" />
              {location}
            </p>

            <div className="flex gap-2">
              <a 
                href={github}
                className="w-7 h-7 rounded-md bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-3.5 h-3.5 text-gray-400" />
              </a>
              <a 
                href={linkedin}
                className="w-7 h-7 rounded-md bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <Linkedin className="w-3.5 h-3.5 text-gray-400" />
              </a>
              <a 
                href={twitter}
                className="w-7 h-7 rounded-md bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <Twitter className="w-3.5 h-3.5 text-gray-400" />
              </a>
            </div>
          </div>

          <div 
            className="relative flex-shrink-0 w-20 h-full flex items-center justify-center"
            onMouseEnter={() => setShowHobbyTooltip(true)}
            onMouseLeave={() => setShowHobbyTooltip(false)}
          >
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center cursor-help hover:bg-white/10 transition-all">
              <img className="w-6 h-6" src="goal.png" alt="" />
            </div>

            <div 
              className={`absolute right-0 top-1/2 -translate-y-1/2 mr-14 z-50 w-48 p-3 bg-white text-black rounded-lg shadow-2xl transition-all duration-300 ease-out ${
                showHobbyTooltip 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-3 pointer-events-none'
              }`}
            >
              <div className="text-xs font-bold mb-2 text-gray-800">Hobbies & Interests</div>
              <div className="text-xs text-gray-700 leading-relaxed">{hobbies}</div>
              <div className={`absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45 transition-all duration-300 ${
                showHobbyTooltip ? 'opacity-100' : 'opacity-0'
              }`}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TechBadge({ name, icon }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-50 px-3 py-1.5 bg-white text-black text-xs rounded-md shadow-xl whitespace-nowrap animate-fadeIn font-medium">
          {name}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
        </div>
      )}

      <div className="px-4 py-2 bg-zinc-900/80 border border-white/5 rounded-lg hover:border-white/20 hover:bg-zinc-800/80 transition-all duration-300 cursor-pointer flex items-center gap-2">
        <span className="text-xl">{icon}</span>
        <span className="text-sm font-medium text-white">{name}</span>
      </div>
    </div>
  );
}

export default function DeveloperPage() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Header animation on mount
    setTimeout(() => setHeaderVisible(true), 100);

    // CTA animation observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCtaVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="">
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className={`mb-10 transition-all duration-700 ease-out ${
          headerVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-4'
        }`}>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">
            Development Team
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl">
            Meet the talented individuals behind The Alchemyst Eye
          </p>
        </div>

        {/* Team Grid - 2 columns layout */}
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          <TeamMember
            index={0}
            name="Abil bil bil bil"
            role="Fokus Chisa"
            imageSeed="abil"
            location="Anak Mekar sari"
            hobbies="Gaming marathons, coffee brewing, building mechanical keyboards, and exploring new tech gadgets"
            github="#"
            linkedin="#"
            twitter="#"
          />

          <TeamMember
            index={1}
            name="Abil bil bil bil"
            role="Fokus Chisa"
            imageSeed="abil"
            location="Anak Mekar sari"
            hobbies="Gaming marathons, coffee brewing, building mechanical keyboards, and exploring new tech gadgets"
            github="#"
            linkedin="#"
            twitter="#"
          />
          <TeamMember
            index={2}
            name="Abil bil bil bil"
            role="Fokus Chisa"
            imageSeed="abil"
            location="Anak Mekar sari"
            hobbies="Gaming marathons, coffee brewing, building mechanical keyboards, and exploring new tech gadgets"
            github="#"
            linkedin="#"
            twitter="#"
          />
          <TeamMember
            index={3}
            name="Abil bil bil bil"
            role="Fokus Chisa"
            imageSeed="abil"
            location="Anak Mekar sari"
            hobbies="Gaming marathons, coffee brewing, building mechanical keyboards, and exploring new tech gadgets"
            github="#"
            linkedin="#"
            twitter="#"
          />
          <TeamMember
            index={4}
            name="Abil bil bil bil"
            role="Fokus Chisa"
            imageSeed="abil"
            location="Anak Mekar sari"
            hobbies="Gaming marathons, coffee brewing, building mechanical keyboards, and exploring new tech gadgets"
            github="#"
            linkedin="#"
            twitter="#"
          />
          <TeamMember
            index={5}
            name="Abil bil bil bil"
            role="Fokus Chisa"
            imageSeed="abil"
            location="Anak Mekar sari"
            hobbies="Gaming marathons, coffee brewing, building mechanical keyboards, and exploring new tech gadgets"
            github="#"
            linkedin="#"
            twitter="#"
          />
        </div>


        {/* CTA */}
        <div 
          ref={ctaRef}
          className={`bg-gradient-to-br from-zinc-900/80 to-black rounded-2xl p-8 border border-white/10 text-center transition-all duration-700 ease-out ${
            ctaVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h3 className="text-2xl font-bold text-white mb-3">Join Our Team</h3>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">
            We're always looking for talented developers, designers, and creators to join our mission
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <button className="px-6 py-2.5 bg-white text-black rounded-lg font-semibold text-sm hover:bg-gray-200 transition-all">
              View Open Positions
            </button>
            <button className="px-6 py-2.5 bg-white/5 border border-white/10 text-white rounded-lg font-semibold text-sm hover:bg-white/10 transition-all">
              Contact HR
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, -5px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-50%) translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(-50%) translateX(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}