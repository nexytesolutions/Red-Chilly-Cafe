import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import GalleryGrid from '../components/GalleryGrid';
import ReviewCard from '../components/ReviewCard';
import LeafDecoration from '../components/LeafDecoration';
import ChiliDecoration from '../components/ChiliDecoration';
import WaveDivider from '../components/WaveDivider';
import { useData } from '../context/DataContext';

const PAGE_SIZE = 3;

const Experience: React.FC = () => {
  const { reviewList } = useData();
  const visible = reviewList.filter((r) => r.status === 'Approved');
  const [page, setPage] = useState(0);
  const maxPage = Math.max(0, Math.ceil(visible.length / PAGE_SIZE) - 1);
  const shown = visible.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const average =
    visible.length > 0
      ? (visible.reduce((sum, r) => sum + r.rating, 0) / visible.length).toFixed(1)
      : '4.2';

  return (
    <section className="relative bg-cream px-6 md:px-16 pt-14 pb-4 overflow-hidden">
      <LeafDecoration className="absolute left-2 bottom-24 h-28 w-24 opacity-70" />
      <ChiliDecoration className="absolute right-2 top-20 h-14 w-28 opacity-70" />

      <div className="relative mx-auto max-w-[1536px] grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-14">
        <div>
          <SectionHeading eyebrow="OUR GALLERY" />
          <h2 className="font-serif-display font-bold text-4xl text-ink mt-3 leading-[1.1]">
            A Slice of Red Chilly
            <br />
            Life
          </h2>
          <p className="font-sans text-ink/60 text-sm mt-4 max-w-md leading-relaxed">
            Good food, cozy vibes, and beautiful moments — captured at Red Chilly Cafe.
          </p>

          <div className="mt-8">
            <GalleryGrid />
          </div>
        </div>

        <div className="lg:border-l lg:border-ink/10 lg:pl-14">
          <SectionHeading eyebrow="REAL REVIEWS" />

          <div className="flex items-center gap-3 mt-4">
            <div className="h-14 w-14 rounded-full border border-terracotta/60 flex items-center justify-center text-terracotta">
              <Star size={22} />
            </div>
            <div>
              <p className="font-serif-display font-bold text-3xl text-ink">
                {average} <span className="text-lg font-sans font-normal text-ink/50">/ 5</span>
              </p>
              <p className="font-sans text-xs text-ink/50">590+ Google Reviews</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {shown.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {maxPage > 0 && (
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="text-terracotta disabled:opacity-30 focus-ring"
                aria-label="Previous reviews"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="font-sans text-xs tracking-[0.2em] text-terracotta">
                MORE REVIEWS
              </span>
              <button
                onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
                disabled={page === maxPage}
                className="text-terracotta disabled:opacity-30 focus-ring"
                aria-label="More reviews"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      <WaveDivider className="w-full h-16 mt-12 -mb-4" />
    </section>
  );
};

export default Experience;
