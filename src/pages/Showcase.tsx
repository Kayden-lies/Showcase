import React from 'react';
import ShowcaseHeader from '../components/showcase/ShowcaseHeader';
import ShowcaseForm from '../components/showcase/ShowcaseForm';
import { Terminal, Heart } from 'lucide-react';

export default function Showcase() {
  return (
    <div className="min-h-screen bg-[#030407] text-zinc-100 font-sans selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
      {/* Subtle Ambient Background Gradients */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.15),rgba(255,255,255,0))]" 
      />
      <div 
        aria-hidden="true" 
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" 
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Main Content Area */}
        <main className="flex-1">
          <ShowcaseHeader />
          <ShowcaseForm />
        </main>

        {/* Official AIDN Community Footer */}
        <footer className="w-full border-t border-zinc-800/80 bg-zinc-950/60 py-8 px-4 sm:px-6">
          <div className="w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-blue-400" />
              <span>Artificial Intelligence Developer Network (AIDN) Pune</span>
            </div>

            <div className="flex items-center gap-1">
              <span>Organized with</span>
              <Heart className="w-3.5 h-3.5 text-red-500 inline fill-red-500/20" />
              <span>for the Pune Developer Ecosystem</span>
            </div>

            <div className="flex items-center gap-4 text-zinc-400">
              <a 
                href="/" 
                className="hover:text-zinc-200 transition-colors"
              >
                AIDN Home
              </a>
              <span className="text-zinc-700">•</span>
              <span className="text-zinc-500">HOP 2026 Archive</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
