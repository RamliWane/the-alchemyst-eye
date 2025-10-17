"use client";

import React, { useEffect, useRef, useState } from "react";
import emailjs from "emailjs-com";

export default function Contact() {
  const contactRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (contactRef.current) observer.observe(contactRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs
      .send(
        "service_21kz0ti",
        "template_fneup03",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "4wfOlWX5OkKoktThh"
      )
      .then(
        () => {
          setIsSending(false);
          setIsSent(true);
          setFormData({ name: "", email: "", message: "" });
          setTimeout(() => setIsSent(false), 4000);
        },
        (error) => {
          setIsSending(false);
          console.error("EmailJS Error:", error);
        }
      );
  };

  return (
    <section
      id="contact"
      ref={contactRef}
      className={`transition-all duration-1000 py-24 px-6 text-gray-300 text-center ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <h2 className="text-5xl font-semibold text-red-600 mb-8 drop-shadow-[0_0_10px_rgba(255,0,0,0.3)]">
        Contact
      </h2>

      <p className="max-w-2xl mx-auto text-base text-gray-500 italic mb-12">
        “The Eye listens to all who seek the truth behind the veil.  
        Leave your thoughts, your stories, or your unanswered questions below.”
      </p>
=
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-gradient-to-b from-neutral-950/70 to-black/60 border border-neutral-800/70 p-10 rounded-2xl shadow-inner backdrop-blur-sm text-left"
      >
        {/* Dua kolom sejajar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <label className="block text-sm text-gray-500/80 mb-2">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-black/60 border border-neutral-800/70 text-gray-400 placeholder-gray-600/60 rounded-lg focus:outline-none focus:border-red-600/70 shadow-inner transition"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-500/80 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-black/60 border border-neutral-800/70 text-gray-400 placeholder-gray-600/60 rounded-lg focus:outline-none focus:border-red-600/70 shadow-inner transition"
            />
          </div>
        </div>

        {/* Pesan */}
        <div className="mb-8">
          <label className="block text-sm text-gray-500/80 mb-2">Message</label>
          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-black/60 border border-neutral-800/70 text-gray-400 placeholder-gray-600/60 rounded-lg focus:outline-none focus:border-red-600/70 shadow-inner transition resize-none"
          ></textarea>
        </div>

        {/* Tombol */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSending}
            className={`w-1/3 py-3 rounded-lg font-semibold tracking-wide text-center transition-all duration-300 ${
              isSending
                ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-gray-100 shadow-[0_0_10px_rgba(255,0,0,0.25)]"
            }`}
          >
            {isSending ? "Sending..." : "Send Message"}
          </button>
        </div>

        {isSent && (
          <p className="mt-5 text-center text-green-400 text-sm transition-opacity duration-300 italic">
            ✨ Message sent successfully! The Eye has received your words.
          </p>
        )}
      </form>

      <p className="mt-12 text-sm text-gray-600 italic text-center">
        “Even in silence, your words shall find their way to The Eye.”
      </p>
    </section>
  );
}
