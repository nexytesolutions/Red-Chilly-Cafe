import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import GalleryGrid from '../components/GalleryGrid';
import ReviewCard from '../components/ReviewCard';
import LeafDecoration from '../components/LeafDecoration';
import ChiliDecoration from '../components/ChiliDecoration';
import WaveDivider from '../components/WaveDivider';
import { useData } from '../context/DataContext';

const Experience: React.FC = () => {
  const { reviewList } = useData();
  const visible = reviewList.filter((r) => r.status === 'Approved');

  return (
    <section className="relative overflow-hidden bg-cream px-6 py-12 md:px-12 md:py-14">
      <LeafDecoration className="absolute -left-2 top-8 h-28 w-24 opacity-55" />
      <LeafDecoration className="absolute -left-2 bottom-8 h-28 w-24 opacity-55" />
      <ChiliDecoration className="absolute right-2 top-8 h-14 w-28 opacity-70" />

      <div className="relative mx-auto grid max-w-[1120px] grid-cols-1 gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-9">
        <div>
          <SectionHeading eyebrow="OUR GALLERY" />
          <h2 className="mt-3 font-serif-display text-3xl font-bold leading-[1.05] text-ink md:text-4xl">
            A Slice of Red Chilly
            <br />
            Life
          </h2>
          <p className="mt-3 max-w-md font-sans text-sm leading-relaxed text-ink/60">
            Good food, cozy vibes, and beautiful moments — captured at Red Chilly Cafe.
          </p>

          <div className="mt-6">
            <GalleryGrid />
          </div>
        </div>

        <div className="lg:border-l lg:border-terracotta/10 lg:pl-9">
          <SectionHeading eyebrow="REAL REVIEWS" />
          <h2 className="mt-3 font-serif-display text-3xl font-bold leading-tight text-ink md:text-4xl">
            Leave Us a Review
          </h2>

          <div className="mt-5 space-y-3">
            {visible.slice(0, 3).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
            {visible.length === 0 && (
              <p className="rounded-xl border border-terracotta/10 bg-cream-light/35 p-5 font-sans text-sm text-ink/65">
                No published reviews yet. Be the first to share your experience.
              </p>
            )}
          </div>

          <Link
            to="/customer-reviews"
            className="mx-auto mt-5 flex w-fit items-center justify-center gap-3 rounded-lg bg-terracotta px-7 py-3 font-sans text-sm font-semibold text-cream-light transition-colors hover:bg-terracotta-dark focus-ring"
          >
            <Star size={17} />
            View All Reviews
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <WaveDivider className="mt-10 -mb-4 h-12 w-full" />
    </section>
  );
};

export default Experience;
