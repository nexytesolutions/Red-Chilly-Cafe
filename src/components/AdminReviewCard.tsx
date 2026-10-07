import React from 'react';
import { Check, EyeOff, Trash2 } from 'lucide-react';
import type { Review } from '../data/reviews';
import { RatingStarsDisplay } from './RatingStars';

interface Props {
  review: Review;
  onApprove: () => void;
  onHide: () => void;
  onDelete: () => void;
}

const statusStyles: Record<Review['status'], string> = {
  Approved: 'bg-green-700/10 text-green-700',
  Pending: 'bg-amber-600/10 text-amber-700',
  Hidden: 'bg-ink/10 text-ink/50',
};

const AdminReviewCard: React.FC<Props> = ({ review, onApprove, onHide, onDelete }) => (
  <div className="border border-ink/10 rounded-xl p-4 bg-cream-light/40 flex flex-col">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <span
          role="img"
          aria-label={`${review.name}'s profile`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-terracotta/30 bg-terracotta/10 font-serif-display text-xs font-semibold text-terracotta"
        >
          {review.name.trim().charAt(0).toUpperCase() || '?'}
        </span>
        <p className="font-sans font-semibold text-sm text-ink">{review.name}</p>
      </div>
      <span className={`text-[10px] font-sans font-medium px-2 py-0.5 rounded-full ${statusStyles[review.status]}`}>
        {review.status}
      </span>
    </div>
    <RatingStarsDisplay rating={review.rating} className="mb-2" />
    <p className="font-sans text-sm text-ink/70 leading-relaxed flex-1">
      <span className="text-terracotta mr-1">&ldquo;</span>
      {review.text}
    </p>
    <div className="flex items-center justify-between mt-3">
      <p className="font-sans text-[11px] text-ink/40">{review.date}</p>
      <div className="flex gap-1.5">
        <button
          onClick={onApprove}
          className="flex items-center gap-1 border border-green-700/40 text-green-700 text-[11px] px-2 py-1 rounded-md hover:bg-green-700/10 transition-colors focus-ring"
        >
          <Check size={11} /> Approve
        </button>
        <button
          onClick={onHide}
          className="flex items-center gap-1 border border-ink/20 text-ink/60 text-[11px] px-2 py-1 rounded-md hover:bg-ink/5 transition-colors focus-ring"
        >
          <EyeOff size={11} /> Hide
        </button>
        <button
          onClick={onDelete}
          className="flex items-center gap-1 border border-red-800/30 text-red-800 text-[11px] px-2 py-1 rounded-md hover:bg-red-800/10 transition-colors focus-ring"
        >
          <Trash2 size={11} /> Delete
        </button>
      </div>
    </div>
  </div>
);

export default AdminReviewCard;
