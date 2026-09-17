import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface DisplayProps {
  rating: number;
  size?: number;
  className?: string;
}

export const RatingStarsDisplay: React.FC<DisplayProps> = ({ rating, size = 15, className = '' }) => (
  <div className={`flex gap-0.5 ${className}`} aria-label={`${rating} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((n) => (
      <Star
        key={n}
        size={size}
        className={n <= rating ? 'fill-terracotta text-terracotta' : 'text-terracotta/40'}
      />
    ))}
  </div>
);

interface InputProps {
  value: number;
  onChange: (value: number) => void;
  size?: number;
}

export const RatingStarsInput: React.FC<InputProps> = ({ value, onChange, size = 22 }) => {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1" role="radiogroup" aria-label="Your rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
          className="focus-ring rounded-sm"
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(n)}
        >
          <Star
            size={size}
            className={(hover || value) >= n ? 'fill-terracotta text-terracotta' : 'text-terracotta/40'}
          />
        </button>
      ))}
    </div>
  );
};
