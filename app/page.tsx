"use client";

import * as React from "react";
import Image from "next/image";
import ablohImg from "./img/abloh.svg";
import hubermanImg from "./img/huberman.svg";
import jayImg from "./img/jay.svg";
import mayaImg from "./img/maya.svg";
import jobsImg from "./img/jobs.svg";
import codieImg from "./img/codie.svg";
import muskImg from "./img/musk.svg";
import pharrellImg from "./img/pharrell.svg";

export default function Home() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-112px)] max-w-5xl flex-col items-center gap-16 px-6 py-12 md:flex-row md:items-start md:py-20 animate-fade-in">
      <section className="flex-1 space-y-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <p className="inline-flex items-center rounded-full bg-[var(--accent)]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)] shadow-sm ring-1 ring-[var(--accent)]/20 backdrop-blur-md transition-colors hover:bg-[var(--accent)]/20">
          Welcome to Cozy Curated
        </p>
        <h1 className="text-4xl font-semibold tracking-tighter text-[var(--foreground)] md:text-6xl text-balance">
          Curated inspiration for a <span className="italic text-[var(--accent)]">slower</span>, cozier life.
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-[var(--muted-foreground)] md:text-lg">
          A community designed to facilitate your growth personally and professionally through socially engineered networking events.<br></br><br></br>

          A chance to meet mentors, accountability partners, mentees and like-minded high performers to guide and inspire you to reach your goals!<br></br><br></br>

          <span className="italic text-[var(--accent)]"> “You are the average of the 5 people you spend the most time with — spend it wisely” </span>
        </p>
        <div className="grid gap-6 md:grid-cols-2 pt-4">
          <div className="glass group rounded-3xl p-6 transition-all hover:scale-[1.02] hover:shadow-lg">
            <h3 className="text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
              Socially Engineered Events
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
              Curated environments designed to foster genuine connections with mentors, partners, and like-minded high performers.
            </p>
          </div>
          <div className="glass group rounded-3xl p-6 transition-all hover:scale-[1.02] hover:shadow-lg">
            <h3 className="text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
              Marketing Mastery
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
              Actionable insights and strategies to build your personal brand, grow your audience, and scale your influence.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12 flex-1 md:mt-0 animate-scale-in" style={{ animationDelay: "0.2s" }}>
        <div className="glass relative overflow-hidden rounded-3xl p-8 text-[var(--foreground)] hover:shadow-xl transition-shadow duration-500">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-30" />
          <h2 className="relative text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            Voices we love
          </h2>
          <InspirationalCarousel />
        </div>
      </section>
    </div>
  );
}

const inspirationalQuotes = [
  {
    name: "Virgil Abloh",
    role: "Designer & Visionary",
    quote: "Everything I do is for the 17-year-old version of myself.",
    image: ablohImg,
  },
  {
    name: "Andrew Huberman",
    role: "Neuroscientist",
    quote: "Rest is the idle state that prepares you for action.",
    image: hubermanImg,
  },
  {
    name: "Jay Shetty",
    role: "Author & Life Coach",
    quote: "Don't let the world change your smile.",
    image: jayImg,
  },
  {
    name: "Maya Angelou",
    role: "Poet & Civil Rights Activist",
    quote: "You are enough. You have nothing to prove to anybody.",
    image: mayaImg,
  },
  {
    name: "Steve Jobs",
    role: "Co-founder of Apple",
    quote: "Design is not just what it looks like and feels like. Design is how it works.",
    image: jobsImg,
  },
  {
    name: "Codie Sanchez",
    role: "Investor & Entrepreneur",
    quote: "Real wealth is having the time to do what you want.",
    image: codieImg,
  },
  {
    name: "Elon Musk",
    role: "CEO of Tesla & SpaceX",
    quote: "When something is important enough, you do it even if the odds are not in your favor.",
    image: muskImg,
  },
  {
    name: "Pharrell Williams",
    role: "Musician & Designer",
    quote: "Wealth is of the heart and mind, not the pocket.",
    image: pharrellImg,
  },
];

function InspirationalCarousel() {
  const [index, setIndex] = React.useState(0);

  // Auto-advance
  React.useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % inspirationalQuotes.length);
    }, 6000);
    return () => clearInterval(id);
  }, []); // Dependence on index was causing re-re-set, simpler with empty dependency or just proper interval handling

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % inspirationalQuotes.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + inspirationalQuotes.length) % inspirationalQuotes.length);
  };

  const current = inspirationalQuotes[index];

  return (
    <div className="mt-6 space-y-6 w-full max-w-lg mx-auto md:max-w-none">
      <div className="glass group relative h-[28rem] md:h-[26rem] overflow-hidden rounded-3xl p-8 shadow-xl transition-all hover:shadow-2xl hover:scale-[1.01] flex flex-col items-center text-center justify-between border border-[var(--glass-border)] bg-[var(--glass-bg)]/80 backdrop-blur-xl">
        {/* Decorative background element */}
        <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-[var(--accent)]/5 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-[var(--accent)]/5 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 w-full flex flex-col items-center h-full">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-[var(--accent)]/20 rounded-full blur-xl transform scale-110"></div>
            <div className="relative h-32 w-32 md:h-40 md:w-40 overflow-hidden rounded-full border-4 border-[var(--glass-border)] shadow-2xl bg-[var(--secondary-bg)] transition-transform duration-700 hover:scale-105 hover:rotate-2">
              <Image
                src={current.image}
                alt={current.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div key={index} className="animate-fade-in flex-1 flex flex-col justify-center items-center w-full space-y-4">
            <p className="text-xl md:text-2xl font-serif italic text-[var(--foreground)] leading-relaxed max-w-md mx-auto">
              &ldquo;{current.quote}&rdquo;
            </p>

            <div className="pt-2">
              <p className="font-bold text-[var(--accent)] text-lg tracking-wide">{current.name}</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted-foreground)]/70">{current.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation & Indicators */}
      <div className="flex flex-col items-center gap-4">
        {/* Indicators */}
        <div className="flex items-center gap-2">
          {inspirationalQuotes.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === index ? "w-8 bg-[var(--accent)]" : "w-2 bg-[var(--accent)]/30 hover:bg-[var(--accent)]/50"
                }`}
              aria-label={`Go to quote ${i + 1}`}
            />
          ))}
        </div>

        {/* Arrow Navigation */}
        <div className="flex items-center justify-between w-full px-8 text-[var(--accent)]">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full hover:bg-[var(--accent)]/10 transition-colors group"
            aria-label="Previous quote"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 transition-transform group-hover:-translate-x-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </button>

          <span className="text-sm font-medium uppercase tracking-widest text-[var(--muted-foreground)]/60">
            {index + 1} / {inspirationalQuotes.length}
          </span>

          <button
            onClick={handleNext}
            className="p-3 rounded-full hover:bg-[var(--accent)]/10 transition-colors group"
            aria-label="Next quote"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 transition-transform group-hover:translate-x-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
