import React from 'react';
import type { Review } from '../data/reviews';
import { RatingStarsDisplay } from './RatingStars';

interface Props {
  review: Review;
}

const ReviewCard: React.FC<Props> = ({ review }) => (
  <div className="border border-ink/10 rounded-xl p-5 bg-cream-light/40">
    <div className="flex items-center gap-3 mb-2">
      <span
        role="img"
        aria-label={`${review.name}'s profile`}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-terracotta/30 bg-terracotta/10 font-serif-display text-sm font-semibold text-terracotta"
      >
        {review.name.trim().charAt(0).toUpperCase() || '?'}
      </span>
      <div>
        <p className="font-sans font-semibold text-ink text-sm">{review.name}</p>
        <RatingStarsDisplay rating={review.rating} />
      </div>
    </div>
    <p className="font-sans text-sm text-ink/75 leading-relaxed">
      <span className="text-terracotta text-lg align-top mr-1">&ldquo;</span>
      {review.text}
      <span className="text-terracotta text-lg align-top ml-1">&rdquo;</span>
    </p>
  </div>
);

export default ReviewCard;
