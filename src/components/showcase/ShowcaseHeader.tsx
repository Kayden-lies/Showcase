import React from 'react';
import { ArrowLeft, Sparkles, Code2, Globe2, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function ShowcaseHeader() {
  return (
    <header className="w-full pt-6 sm:pt-8 pb-8 sm:pb-12 text-zinc-100">
      {/* Top Brand & Navigation Bar */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12 flex items-center justify-between">
        <a
          href="/"
          id="nav-aidn-home-link"
          className="group inline-flex items-center gap-3 text-zinc-400 hover:text-zinc-100 transition-colors duration-200"
        >
          <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center p-1.5 shadow-sm group-hover:border-blue-500/50 transition-colors">
            <img
              src="/Logo_A.png"
              alt="AIDN Logo"
              className="w-full h-full object-contain"
              onError={(e) => {
                // Fallback if image path differs
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-wider text-sm text-zinc-100">AIDN</span>
              <span className="text-[10px] font-mono tracking-widest text-blue-400 bg-blue-950/60 border border-blue-800/60 px-1.5 py-0.5 rounded">
                PUNE
              </span>
            </div>
            <span className="text-[11px] text-zinc-500 font-mono flex items-center gap-1">
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
              aidn.co.in
            </span>
          </div>
        </a>

        {/* Hackathon Badge */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-zinc-200">HOP 2026</span>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="text-zinc-400 hidden sm:inline">Submissions Open</span>
          </div>
        </div>
      </div>

      {/* Hero Content Section */}
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="w-full max-w-4xl mx-auto px-4 sm:px-6"
      >
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/50 border border-blue-900/60 text-blue-400 text-xs font-mono font-medium tracking-wider uppercase mb-5">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>AIDN PUNE × HACKERS OCCUPIED PUNE</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-100 uppercase leading-[1.08] mb-4">
          HOP 2026
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
            PROJECT SHOWCASE
          </span>
        </h1>

        {/* Supporting Copy */}
        <p className="text-lg sm:text-xl text-zinc-200 font-medium leading-relaxed max-w-3xl mb-3">
          HOP may be over, but what you built deserves to live beyond the hackathon.
        </p>

        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mb-8">
          Submit your project, prototype, documentation and demo so we can preserve and showcase your work through AIDN&apos;s upcoming website and social media.
        </p>

        {/* Trust & Community Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 pb-2">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <Code2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-zinc-200">Official Archive</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">Preserved permanently in the AIDN ecosystem repository.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <Globe2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-zinc-200">Community Spotlight</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">Featured across AIDN social channels, media and newsletter.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-zinc-200">Peer Recognition</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">Exposed to mentors, founders, and tech leaders in Pune.</p>
            </div>
          </div>
        </div>
      </motion.section>
    </header>
  );
}
