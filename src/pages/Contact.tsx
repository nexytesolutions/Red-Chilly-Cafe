import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, MapPin, Phone, Send } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import MapVisual from '../components/MapVisual';
import LeafDecoration from '../components/LeafDecoration';

const Contact: React.FC = () => (
  <section className="relative overflow-hidden bg-cream px-6 py-12 md:px-12 md:py-14">
    <LeafDecoration className="absolute -left-2 bottom-2 h-28 w-24 opacity-55" />
    <LeafDecoration className="absolute -right-2 bottom-2 h-28 w-24 -scale-x-100 opacity-55" />

    <div className="relative mx-auto max-w-[1000px] rounded-xl border border-ink/10 bg-cream-light/35 p-5 shadow-sm sm:p-7 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:gap-7 lg:p-8">
      <div className="flex flex-col">
        <SectionHeading eyebrow="FIND US" />
        <h1 className="mt-3 font-serif-display text-3xl font-bold leading-[1.08] text-ink md:text-4xl">
          Red Chilly Cafe
          <br />
          Auroville
        </h1>
        <p className="mt-3 max-w-sm font-sans text-sm leading-relaxed text-ink/65">
          A cosy cafe in the heart of Auroville, serving authentic Italian, Continental &amp; Fusion
          cuisine with love.
        </p>

        <div className="mt-5 space-y-4">
          <div className="flex gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
              <MapPin size={16} />
            </span>
            <div>
              <p className="font-sans text-sm font-semibold text-ink">Address</p>
              <p className="font-sans text-sm leading-relaxed text-ink/65">
                Auroville Rd, near Auro Park,
                <br />
                Bommayapalayam,
                <br />
                Auroville, Tamil Nadu 605101
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
              <Phone size={16} />
            </span>
            <div>
              <p className="font-sans text-sm font-semibold text-ink">Phone</p>
              <p className="font-sans text-sm text-ink/65">+91 413 290 4778</p>
            </div>
          </div>

          <div className="flex gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
              <Clock size={16} />
            </span>
            <div>
              <p className="font-sans text-sm font-semibold text-ink">Opening Hours</p>
              <p className="font-sans text-sm text-ink/65">9:00 AM – 10:00 PM</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:mt-auto lg:pt-5">
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Red+Chilly+Cafe%2C+Auroville%2C+Tamil+Nadu+605101"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-terracotta px-4 py-3 font-sans text-xs font-semibold text-cream-light transition-colors hover:bg-terracotta-dark focus-ring sm:text-sm"
          >
            <Send size={15} />
            Get Directions
          </a>
          <Link
            to="/feedback"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-terracotta px-3 py-3 font-sans text-xs font-semibold text-terracotta transition-colors hover:bg-terracotta/10 focus-ring sm:text-sm"
          >
            Share Your Experience
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <div className="mt-6 lg:mt-0">
        <MapVisual />
      </div>
    </div>
  </section>
);

export default Contact;
