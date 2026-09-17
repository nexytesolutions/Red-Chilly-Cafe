import React from 'react';
import { MapPin, Phone, Clock, Send } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import MapVisual from '../components/MapVisual';
import ReviewForm from '../components/ReviewForm';
import LeafDecoration from '../components/LeafDecoration';

const Contact: React.FC = () => (
  <section className="relative bg-cream px-6 md:px-16 py-16 overflow-hidden">
    <LeafDecoration className="absolute left-2 bottom-2 h-28 w-24 opacity-70" />

    <div className="relative mx-auto max-w-[1536px] grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] gap-12">
      <div>
        <SectionHeading eyebrow="FIND US" />
        <h1 className="font-serif-display font-bold text-4xl text-ink mt-4 leading-[1.1]">
          Red Chilly Cafe
          <br />
          Auroville
        </h1>
        <p className="font-sans text-ink/60 text-sm mt-4 max-w-sm leading-relaxed">
          A cosy cafe in the heart of Auroville, serving authentic Italian, Continental &amp; Fusion
          cuisine with love.
        </p>

        <div className="mt-8 space-y-6">
          <div className="flex gap-3">
            <span className="h-9 w-9 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0">
              <MapPin size={16} />
            </span>
            <div>
              <p className="font-sans font-semibold text-ink text-sm">Address</p>
              <p className="font-sans text-sm text-ink/60 leading-relaxed">
                Auroville Rd, near Auro Park,
                <br />
                Bommayapalayam,
                <br />
                Auroville, Tamil Nadu 605101
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <span className="h-9 w-9 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0">
              <Phone size={16} />
            </span>
            <div>
              <p className="font-sans font-semibold text-ink text-sm">Phone</p>
              <p className="font-sans text-sm text-ink/60">+91 413 290 4778</p>
            </div>
          </div>

          <div className="flex gap-3">
            <span className="h-9 w-9 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0">
              <Clock size={16} />
            </span>
            <div>
              <p className="font-sans font-semibold text-ink text-sm">Opening Hours</p>
              <p className="font-sans text-sm text-ink/60">9:00 AM – 10:00 PM</p>
            </div>
          </div>
        </div>

        <a
          href="https://www.google.com/maps/search/?api=1&query=Red+Chilly+Cafe+Auroville+Tamil+Nadu"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-8"
        >
          <Button variant="solid" icon={<Send size={15} />}>
            GET DIRECTIONS
          </Button>
        </a>
      </div>

      <MapVisual />

      <div className="lg:border-l lg:border-ink/10 lg:pl-12">
        <SectionHeading eyebrow="SHARE YOUR EXPERIENCE" />
        <h2 className="font-serif-display font-bold text-3xl text-ink mt-4 mb-2">
          Leave Us a Review
        </h2>
        <p className="font-sans text-sm text-ink/60 mb-6 leading-relaxed">
          Your feedback means a lot to us! Share your experience, help us grow and let others know
          what you loved.
        </p>
        <ReviewForm />
      </div>
    </div>
  </section>
);

export default Contact;
