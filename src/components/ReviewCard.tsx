import React from 'react';
import { UserRound } from 'lucide-react';
import type { Review } from '../data/reviews';
import { RatingStarsDisplay } from './RatingStars';

interface Props {
  review: Review;
}

const ReviewCard: React.FC<Props> = ({ review }) => (
  <div className="border border-terracotta/10 rounded-xl p-4 sm:p-5 bg-cream-light/35">
    <div className="flex items-center gap-3 mb-2">
      <span
        aria-hidden="true"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink/10 text-ink/35"
      >
        <UserRound size={23} />
      </span>
      <div>
        <p className="font-sans font-semibold text-ink text-sm">{review.name}</p>
        <RatingStarsDisplay rating={review.rating} />
      </div>
    </div>
    <p className="font-sans text-sm text-ink/75 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
  </div>
);

export default ReviewCard;
