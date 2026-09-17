import React from 'react';
import LeafDecoration from './LeafDecoration';
import ChiliDecoration from './ChiliDecoration';

const InstagramIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M16 3h-2.5A3.5 3.5 0 0 0 10 6.5V9H8v3.5h2V21h3.5v-8.5H16l.5-3.5h-3V6.5c0-.6.4-1 1-1H16V3z" />
  </svg>
);

const quickLinks = [
  { label: 'Home', hash: '#home' },
  { label: 'Our Story', hash: '#our-story' },
  { label: 'Menu', hash: '#menu' },
  { label: 'Experience', hash: '#experience' },
  { label: 'Contact', hash: '#contact' },
];

const Footer: React.FC = () => (
  <footer className="relative bg-espresso text-cream-light pt-16 pb-8 px-6 md:px-16 overflow-hidden">
    <LeafDecoration className="absolute left-4 bottom-4 h-28 w-24 opacity-70" color="#D65A38" />
    <ChiliDecoration className="absolute right-4 top-6 h-16 w-32 opacity-80" />

    <div className="relative mx-auto max-w-[1536px] grid grid-cols-1 gap-10 md:grid-cols-4">
      <div>
        <p className="font-script text-terracotta-light text-3xl leading-none">Red Chilly</p>
        <p className="font-sans tracking-[0.25em] text-sm mt-1">CAFE</p>
        <p className="font-sans tracking-[0.25em] text-xs mt-1 text-cream-light/70">AUROVILLE</p>
        <p className="font-serif-display italic text-terracotta-light mt-3">Good Food. Good Mood.</p>
      </div>

      <div className="font-sans text-sm text-cream-light/85 leading-relaxed">
        <p>Auroville Rd, near Auro Park,</p>
        <p>Bommayapalayam,</p>
        <p>Auroville, Tamil Nadu 605101</p>
      </div>

      <div>
        <p className="font-sans font-semibold mb-3">Quick Links</p>
        <ul className="space-y-2 font-sans text-sm text-cream-light/85">
          {quickLinks.map((l) => (
            <li key={l.hash}>
              <a href={l.hash} className="hover:text-terracotta-light transition-colors focus-ring">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="font-sans font-semibold mb-3">Follow Us</p>
        <div className="flex gap-3">
          <a href="#" aria-label="Instagram" className="h-9 w-9 rounded-full border border-terracotta-light/60 flex items-center justify-center text-terracotta-light hover:bg-terracotta-light hover:text-espresso transition-colors focus-ring">
            <InstagramIcon />
          </a>
          <a href="#" aria-label="Facebook" className="h-9 w-9 rounded-full border border-terracotta-light/60 flex items-center justify-center text-terracotta-light hover:bg-terracotta-light hover:text-espresso transition-colors focus-ring">
            <FacebookIcon />
          </a>
          <a href="#" aria-label="TripAdvisor" className="h-9 w-9 rounded-full border border-terracotta-light/60 flex items-center justify-center text-terracotta-light hover:bg-terracotta-light hover:text-espresso transition-colors focus-ring text-xs font-bold">
            TA
          </a>
        </div>
      </div>
    </div>

    <div className="relative mx-auto max-w-[1536px] mt-10 pt-6 border-t border-white/10 text-xs text-cream-light/60 text-right">
      © 2025 Red Chilly Cafe. All Rights Reserved.
    </div>
  </footer>
);

export default Footer;
