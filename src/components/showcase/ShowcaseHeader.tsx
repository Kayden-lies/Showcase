import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function ShowcaseHeader() {
  return (
    <header className="w-full pt-6 sm:pt-10 pb-6 sm:pb-8 text-zinc-100">
      {/* Top Brand & Navigation Bar */}
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 mb-8 sm:mb-10 flex items-center justify-between">
        <a
          href="/"
          id="nav-aidn-home-link"
          className="group inline-flex items-center gap-3 text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center p-1.5 shadow-sm group-hover:border-zinc-700 transition-colors">
            <img
              src="/Logo_A.png"
              alt="AIDN Logo"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-semibold text-sm tracking-wide text-zinc-200">AIDN Pune</span>
            <span className="text-[11px] text-zinc-500 font-mono flex items-center gap-1">
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
              aidn.co.in
            </span>
          </div>
        </a>

        {/* Initiative Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
          <span className="text-zinc-400">Initiative:</span>
          <span className="font-medium text-zinc-200">AIDN × Genesis</span>
        </div>
      </div>

      {/* Hero Content Section */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="w-full max-w-3xl mx-auto px-4 sm:px-6"
      >
        <div className="mb-3 text-xs font-mono uppercase tracking-widest text-zinc-400">
          Hackers Occupied Pune
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-100 mb-3">
          Project Showcase Portal
        </h1>

        <p className="text-base sm:text-lg text-zinc-300 font-medium leading-relaxed mb-3">
          Hackathon may be over, but what you built deserves to live beyond the event.
        </p>

        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
          Submit your project details, prototype, documentation, and demo below. The AIDN × Genesis team will review submissions to archive and feature standout projects across our upcoming website and community channels.
        </p>
      </motion.section>
    </header>
  );
}
