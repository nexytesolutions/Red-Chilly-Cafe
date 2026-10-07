import React, { useState } from 'react';
import type { Review } from '../data/reviews';

interface Props {
  onSave: (review: Review & { email: string }) => void | Promise<void>;
  onCancel: () => void;
}

const inputClass =
  'w-full border border-ink/15 rounded-lg px-3 py-2.5 bg-cream-light/40 font-sans text-sm outline-none focus:border-terracotta';

const AdminReviewForm: React.FC<Props> = ({ onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState('5');
  const [text, setText] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave({
      id: `review-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=200&auto=format&fit=crop',
      rating: Number(rating),
      text: text.trim(),
      status: 'Pending',
      date: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="reviewer-name" className="font-sans text-xs text-ink/60 mb-1 block">
          Reviewer Name
        </label>
        <input
          id="reviewer-name"
          required
          className={inputClass}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="reviewer-email" className="font-sans text-xs text-ink/60 mb-1 block">
          Reviewer Email
        </label>
        <input
          id="reviewer-email"
          required
          type="email"
          className={inputClass}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="review-rating" className="font-sans text-xs text-ink/60 mb-1 block">
          Rating
        </label>
        <select
          id="review-rating"
          required
          value={rating}
          onChange={(event) => setRating(event.target.value)}
          className={inputClass}
        >
          <option value="5">5 stars</option>
          <option value="4">4 stars</option>
          <option value="3">3 stars</option>
          <option value="2">2 stars</option>
          <option value="1">1 star</option>
        </select>
      </div>

      <div>
        <label htmlFor="review-text" className="font-sans text-xs text-ink/60 mb-1 block">
          Review Text
        </label>
        <textarea
          id="review-text"
          required
          rows={4}
          className={`${inputClass} resize-none`}
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-lg border border-ink/20 text-ink/70 font-sans text-sm hover:bg-ink/5 transition-colors focus-ring"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2.5 rounded-lg bg-terracotta hover:bg-terracotta-dark text-cream-light font-sans text-sm transition-colors focus-ring"
        >
          Save Review
        </button>
      </div>
    </form>
  );
};

export default AdminReviewForm;
