import React from 'react';
import { CalendarDays, Heart, UserRound } from 'lucide-react';
import { RatingStarsDisplay } from '../components/RatingStars';
import ChiliDecoration from '../components/ChiliDecoration';
import LeafDecoration from '../components/LeafDecoration';
import { useData } from '../context/DataContext';

const CustomerReviews: React.FC = () => {
  const { reviewList } = useData();
  const reviews = reviewList.filter((review) => review.status === 'Approved');

  return (
    <section className="relative min-h-[65vh] overflow-hidden bg-cream px-5 py-12 sm:px-8 md:px-12 md:py-14">
      <LeafDecoration className="absolute -left-2 top-7 h-28 w-24 opacity-55" />
      <LeafDecoration className="absolute -left-2 bottom-8 h-28 w-24 opacity-55" />
      <ChiliDecoration className="absolute right-2 top-8 h-14 w-28 opacity-70" />

      <div className="relative mx-auto max-w-[1120px]">
        <div className="mb-9 text-center">
          <div className="mb-2 flex items-center justify-center gap-3 font-sans text-xs font-semibold tracking-[0.2em] text-terracotta sm:text-sm">
            <span className="h-px w-8 bg-terracotta/60 sm:w-12" />
            WHAT OUR GUESTS SAY
            <span className="h-px w-8 bg-terracotta/60 sm:w-12" />
          </div>
          <h1 className="font-serif-display text-3xl font-bold text-ink sm:text-4xl md:text-5xl">
            Customer Reviews
          </h1>
          <p className="mx-auto mt-3 max-w-2xl font-sans text-sm leading-relaxed text-ink/70 sm:text-base">
            Hear from our amazing guests who loved their experience at Red Chilly Cafe
            <Heart className="ml-2 inline-block text-terracotta" size={22} aria-hidden="true" />
          </p>
        </div>

        <div className="space-y-3">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="grid grid-cols-1 items-center gap-4 rounded-xl border border-terracotta/10 bg-cream-light/40 p-4 shadow-sm sm:grid-cols-[200px_1px_1fr] sm:gap-6 sm:px-5 sm:py-4"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ink/10 text-ink/35"
                >
                  <UserRound size={32} />
                </span>
                <div className="min-w-0">
                  <h2 className="font-sans text-sm font-semibold text-ink">{review.name}</h2>
                  <RatingStarsDisplay rating={review.rating} size={17} className="mt-1" />
                  <p className="mt-1.5 flex items-center gap-1.5 font-sans text-xs text-ink/65">
                    <CalendarDays size={13} aria-hidden="true" />
                    {review.date}
                  </p>
                </div>
              </div>

              <div className="hidden h-full min-h-16 w-px bg-terracotta sm:block" />
              <div className="sm:pl-1">
                <p className="font-sans text-sm leading-relaxed text-ink/80">{review.text}</p>
              </div>
            </article>
          ))}
          {reviews.length === 0 && (
            <p className="rounded-xl border border-terracotta/10 bg-cream-light/40 p-6 text-center font-sans text-sm text-ink/65">
              No published reviews are available yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
