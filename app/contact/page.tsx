"use client";

import { useState } from "react";
import Image from "next/image";
import { ref, push, set } from "firebase/database";
import { db } from "@/lib/firebase";
import instaImg from "../img/insta.png";
import qrImg from "../img/cozycuratedrsa_qr.png";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    try {
      const contactsRef = ref(db, 'contacts');
      const newContactRef = push(contactsRef);
      await set(newContactRef, {
        ...formData,
        timestamp: Date.now()
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000); // Reset status after 3s
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 animate-fade-in text-[var(--foreground)]">
      <div className="mb-12 text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <h1 className="text-4xl font-bold tracking-tighter md:text-5xl drop-shadow-sm">
          Get in touch
        </h1>
        <p className="mt-4 text-base text-[var(--muted-foreground)] max-w-2xl mx-auto">
          Have a project in mind, or just want to say hello? We’d love to hear from you.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Contact Form */}
        <div className="lg:col-span-2 animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <form
            className="glass relative overflow-hidden rounded-3xl p-8 md:p-10 shadow-xl transition-all hover:shadow-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)]/80 backdrop-blur-xl h-full"
            onSubmit={handleSubmit}
          >
            {/* Decorative */}
            <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-[var(--accent)]/5 blur-3xl pointer-events-none"></div>

            <div className="relative z-10 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] ml-1" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    required
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)]/50 px-5 py-3.5 text-sm text-[var(--foreground)] placeholder-[var(--muted-foreground)]/50 outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)]/30 transition-all shadow-sm"
                    placeholder="Your Name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] ml-1" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    required
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)]/50 px-5 py-3.5 text-sm text-[var(--foreground)] placeholder-[var(--muted-foreground)]/50 outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)]/30 transition-all shadow-sm"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] ml-1" htmlFor="subject">
                  Subject
                </label>
                <input
                  id="subject"
                  required
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)]/50 px-5 py-3.5 text-sm text-[var(--foreground)] placeholder-[var(--muted-foreground)]/50 outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)]/30 transition-all shadow-sm"
                  placeholder="How can we help?"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] ml-1" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)]/50 px-5 py-3.5 text-sm text-[var(--foreground)] placeholder-[var(--muted-foreground)]/50 outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)]/30 transition-all shadow-sm resize-none"
                  placeholder="Tell us a little about your goals..."
                />
              </div>

              {status === 'success' && (
                <div className="p-4 rounded-xl bg-green-50/80 text-green-700 text-sm border border-green-200/50 flex items-center gap-2 animate-fade-in">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 rounded-xl bg-red-50/80 text-red-700 text-sm border border-red-200/50 flex items-center gap-2 animate-fade-in">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                  </svg>
                  Something went wrong. Please try again later.
                </div>
              )}

              <button
                type="submit"
                disabled={loading || status === 'success'}
                className="group relative w-full overflow-hidden rounded-2xl bg-[var(--accent)] py-4 px-8 text-sm font-bold uppercase tracking-widest text-[var(--accent-foreground)] shadow-lg transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading && <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                  {loading ? "Sending..." : "Send Message"}
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform group-hover:translate-y-0 duration-300 ease-out"></div>
              </button>
            </div>
          </form>
        </div>

        {/* Social / Connect Section */}
        <div className="flex flex-col gap-6 animate-scale-in" style={{ animationDelay: '0.3s' }}>

          <div className="glass relative overflow-hidden rounded-3xl p-8 flex flex-col justify-center items-center text-center flex-1 shadow-lg hover:shadow-xl transition-all border border-[var(--glass-border)] bg-[var(--glass-bg)]/80 backdrop-blur-xl">
            <div className="absolute top-0 left-0 h-32 w-32 rounded-full bg-[var(--accent)]/5 blur-2xl pointer-events-none"></div>

            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted-foreground)] mb-6 z-10">
              Follow us
            </h3>

            <a
              href="https://www.instagram.com/cozycuratedrsa?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center gap-5 transition-transform hover:scale-105 z-10"
            >
              <div className="relative h-28 w-28 overflow-hidden rounded-3xl shadow-lg ring-4 ring-white/50 transition-all group-hover:shadow-2xl group-hover:ring-[var(--accent)]/30">
                <Image
                  src={instaImg}
                  alt="Instagram"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-lg text-[var(--foreground)] bg-gradient-to-r from-[var(--foreground)] to-[var(--muted-foreground)] bg-clip-text">@cozycuratedrsa</p>
                <p className="text-xs font-medium text-[var(--accent)] uppercase tracking-wide">Instagram Community</p>
              </div>
            </a>
          </div>

          <div className="glass relative overflow-hidden rounded-3xl p-8 flex flex-col justify-center items-center text-center flex-1 shadow-lg hover:shadow-xl transition-all border border-[var(--glass-border)] bg-[var(--glass-bg)]/80 backdrop-blur-xl">
            <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-[var(--accent)]/5 blur-2xl pointer-events-none"></div>

            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted-foreground)] mb-6 z-10">
              Scan to Connect
            </h3>
            <div className="relative h-36 w-36 overflow-hidden rounded-2xl bg-white p-3 shadow-md transition-transform hover:scale-105 z-10">
              <Image
                src={qrImg}
                alt="Scan to connect"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

