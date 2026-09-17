import React from 'react';
import { MapPin, Trees } from 'lucide-react';

/** A lightweight illustrative map matching the reference's street/park layout. */
const MapVisual: React.FC = () => (
  <div className="relative w-full h-full min-h-[420px] rounded-2xl border border-ink/10 bg-cream-dark overflow-hidden">
    <svg viewBox="0 0 400 420" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
      <rect width="400" height="420" fill="#EFE0C6" />
      <rect x="30" y="60" width="140" height="150" fill="#CFE3C4" opacity="0.7" />
      <path d="M0 40 L400 10" stroke="#D8C6A4" strokeWidth="6" fill="none" />
      <path d="M0 130 L400 100" stroke="#D8C6A4" strokeWidth="4" fill="none" />
      <path d="M60 0 L20 420" stroke="#D8C6A4" strokeWidth="5" fill="none" />
      <path d="M260 0 L340 420" stroke="#D8C6A4" strokeWidth="6" fill="none" />
      <path d="M0 260 L400 300" stroke="#D8C6A4" strokeWidth="4" fill="none" />
    </svg>

    <div className="absolute left-[45%] top-[32%] flex flex-col items-center">
      <MapPin size={30} className="text-terracotta-dark fill-terracotta-dark/20" />
      <div className="bg-cream px-2 py-1 rounded shadow text-[11px] font-sans font-medium text-ink mt-1 whitespace-nowrap">
        Red Chilly Cafe
        <br />
        Auroville
      </div>
    </div>

    <div className="absolute left-[16%] top-[48%] flex items-center gap-1 text-green-800/80">
      <Trees size={16} />
      <span className="text-[11px] font-sans">Auro Park</span>
    </div>

    <p className="absolute right-[18%] top-[55%] text-[11px] font-sans text-ink/60 -rotate-45">
      Auroville Rd
    </p>
    <p className="absolute right-[8%] bottom-[10%] text-[11px] font-sans text-ink/60">
      Auroville
    </p>
  </div>
);

export default MapVisual;
