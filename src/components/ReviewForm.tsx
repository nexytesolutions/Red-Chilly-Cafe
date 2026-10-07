import React, { useState } from 'react';
import { User, Mail, MessageSquare, Send } from 'lucide-react';
import { RatingStarsInput } from './RatingStars';
import { useData } from '../context/DataContext';

const ReviewForm: React.FC = () => {
  const { addReview, reviewError } = useData();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !rating || !text) {
      setError('Please fill in every field and choose a rating.');
      return;
    }
    setError('');
    const saved = await addReview({
      id: `${Date.now()}`,
      name,
      email,
      avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=200&auto=format&fit=crop',
      rating,
      text,
      status: 'Pending',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    });
    if (!saved) return;
    setSubmitted(true);
    setName('');
    setEmail('');
    setRating(0);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <p className="font-sans text-sm text-ink mb-2">Your Rating <span className="text-terracotta">*</span></p>
        <div className="flex items-center gap-3">
          <RatingStarsInput value={rating} onChange={setRating} />
          <span className="font-sans text-sm text-ink/50">{rating}/5</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex items-center gap-2 border border-ink/15 rounded-lg px-4 py-3 bg-cream-light/40 focus-within:border-terracotta">
          <User size={16} className="text-terracotta shrink-0" />
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name *"
            aria-label="Your Name"
            className="bg-transparent outline-none w-full font-sans text-sm placeholder:text-ink/40"
          />
        </label>
        <label className="flex items-center gap-2 border border-ink/15 rounded-lg px-4 py-3 bg-cream-light/40 focus-within:border-terracotta">
          <Mail size={16} className="text-terracotta shrink-0" />
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email *"
            aria-label="Your Email"
            className="bg-transparent outline-none w-full font-sans text-sm placeholder:text-ink/40"
          />
        </label>
      </div>

      <label className="flex items-start gap-2 border border-ink/15 rounded-lg px-4 py-3 bg-cream-light/40 focus-within:border-terracotta">
        <MessageSquare size={16} className="text-terracotta shrink-0 mt-0.5" />
        <textarea
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Tell us about your experience..."
          aria-label="Your Review"
          rows={4}
          className="bg-transparent outline-none w-full font-sans text-sm placeholder:text-ink/40 resize-none"
        />
      </label>

      {(error || reviewError) && <p role="alert" className="text-terracotta-dark text-sm font-sans">{error || reviewError}</p>}
      {submitted && (
        <p className="text-green-700 text-sm font-sans">
          Thank you! Your review has been submitted and is awaiting approval.
        </p>
      )}

      <button
        type="submit"
        className="w-full bg-terracotta hover:bg-terracotta-dark text-cream-light py-3.5 rounded-lg font-sans text-sm tracking-[0.1em] flex items-center justify-center gap-2 transition-colors focus-ring"
      >
        <Send size={15} /> SUBMIT REVIEW
      </button>
    </form>
  );
};

export default ReviewForm;
