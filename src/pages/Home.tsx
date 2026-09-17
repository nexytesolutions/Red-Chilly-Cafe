import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import Button from '../components/Button';
import LeafDecoration from '../components/LeafDecoration';

const Home: React.FC = () => (
  <section className="relative bg-espresso overflow-hidden min-h-[92vh] flex items-center">
    {/* background hero photo, right-anchored, blending into the dark backdrop */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=1600&auto=format&fit=crop')",
        backgroundPosition: 'right center',
        backgroundSize: 'cover',
      }}
    />
    <div
      className="absolute inset-0"
      style={{
        background:
          'linear-gradient(90deg, #2A170D 0%, #2A170D 32%, rgba(42,23,13,0.75) 50%, rgba(42,23,13,0.15) 70%, rgba(42,23,13,0.05) 100%)',
      }}
    />

    <LeafDecoration className="absolute left-0 bottom-0 h-40 w-36 opacity-80" color="#D65A38" />
    <svg
      className="absolute left-0 bottom-8 w-full h-16 opacity-70"
      viewBox="0 0 1536 60"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 40 C 300 0, 600 55, 900 30 C 1100 15, 1300 45, 1536 20"
        fill="none"
        stroke="#C94D2F"
        strokeWidth="1.5"
      />
    </svg>

    <div className="relative mx-auto max-w-[1536px] w-full px-6 md:px-16 py-20">
      <div className="max-w-xl">
        <p className="font-sans text-terracotta-light text-sm tracking-[0.25em] flex items-center gap-3 mb-6">
          WELCOME TO RED CHILLY <span className="h-px w-10 bg-terracotta-light/70 inline-block" />
        </p>
        <h1 className="font-serif-display font-bold leading-[0.98] text-5xl sm:text-6xl lg:text-7xl">
          <span className="block text-cream-light">GOOD FOOD.</span>
          <span className="block text-terracotta-light">GOOD MOOD.</span>
        </h1>
        <p className="font-sans text-cream-light/85 mt-6 max-w-md leading-relaxed">
          Authentic Italian, Continental &amp; Fusion flavours, served with warmth in the heart of Auroville.
        </p>
        <div className="flex flex-wrap gap-4 mt-9">
          <a href="#menu">
            <Button variant="solid" icon={<ArrowRight size={16} />}>
              EXPLORE MENU
            </Button>
          </a>
          <a href="#contact">
            <Button variant="outline" icon={<MapPin size={16} />} className="flex-row-reverse">
              FIND US
            </Button>
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default Home;
