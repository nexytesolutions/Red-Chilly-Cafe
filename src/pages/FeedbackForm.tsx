import React, { useEffect, useRef, useState } from 'react';
import { ImagePlus, Mail, MessageCircle, Send, UserRound, UploadCloud, X } from 'lucide-react';
import { RatingStarsInput } from '../components/RatingStars';
import ChiliDecoration from '../components/ChiliDecoration';
import LeafDecoration from '../components/LeafDecoration';
import { useData } from '../context/DataContext';

interface PhotoPreview {
  id: string;
  file: File;
  url: string;
}

const MAX_PHOTOS = 5;

const FeedbackForm: React.FC = () => {
  const { addReview, isDemoMode, reviewError } = useData();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [photos, setPhotos] = useState<PhotoPreview[]>([]);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const photosRef = useRef(photos);

  useEffect(
    () => () => {
      photosRef.current.forEach((photo) => URL.revokeObjectURL(photo.url));
    },
    [],
  );
  useEffect(() => {
    photosRef.current = photos;
  }, [photos]);

  const selectPhotos = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.currentTarget.files ?? []);
    event.currentTarget.value = '';
    setError('');

    const allowed = selected.filter((file) => file.type === 'image/jpeg' || file.type === 'image/png');
    if (allowed.length !== selected.length) {
      setError('Only JPG and PNG images can be selected.');
    }

    const remaining = MAX_PHOTOS - photos.length;
    if (allowed.length > remaining) {
      setError(`You can upload a maximum of ${MAX_PHOTOS} images.`);
    }

    const additions = allowed.slice(0, remaining).map((file, index) => ({
      id: `${Date.now()}-${index}`,
      file,
      url: URL.createObjectURL(file),
    }));
    setPhotos((current) => [...current, ...additions]);
  };

  const removePhoto = (id: string) => {
    setPhotos((current) => {
      const photo = current.find((item) => item.id === id);
      if (photo) URL.revokeObjectURL(photo.url);
      return current.filter((item) => item.id !== id);
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted('');
    setError('');

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedText = text.trim();
    if (!trimmedName || trimmedName.length > 50) {
      setError('Enter your name using no more than 50 characters.');
      return;
    }
    if (
      !trimmedEmail ||
      trimmedEmail.length > 50 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)
    ) {
      setError('Enter a valid email address using no more than 50 characters.');
      return;
    }
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      setError('Please choose a rating from 1 to 5.');
      return;
    }
    if (!trimmedText || trimmedText.length > 200) {
      setError('Enter a review using no more than 200 characters.');
      return;
    }

    setIsSubmitting(true);
    const saved = await addReview({
      id: `${Date.now()}`,
      name: trimmedName,
      email: trimmedEmail,
      avatar: '',
      rating,
      text: trimmedText,
      status: 'Pending',
      date: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    });
    setIsSubmitting(false);

    if (!saved) return;
    setSubmitted(
      isDemoMode
        ? 'Your review was saved locally in this browser for this demo. It is not available to other users.'
        : 'Your review was submitted and is awaiting moderation.',
    );
    setName('');
    setEmail('');
    setVerificationCode('');
    setRating(0);
    setText('');
    photos.forEach((photo) => URL.revokeObjectURL(photo.url));
    setPhotos([]);
  };

  return (
    <section className="relative flex min-h-[65vh] items-center overflow-hidden bg-cream px-5 py-10 sm:px-8 md:px-12 md:py-12">
      <LeafDecoration className="absolute -left-2 top-8 h-28 w-24 opacity-55" />
      <LeafDecoration className="absolute -right-2 bottom-8 h-28 w-24 -scale-x-100 opacity-55" />
      <ChiliDecoration className="absolute right-2 top-8 h-14 w-28 opacity-70" />

      <div className="relative mx-auto w-full max-w-[800px] rounded-xl border border-ink/10 bg-cream-light/35 px-5 py-6 shadow-sm sm:px-7 sm:py-7 md:px-8">
        <div className="mb-5 text-center">
          <div className="mb-1 flex items-center justify-center gap-3 font-sans text-xs font-semibold tracking-[0.2em] text-terracotta sm:text-sm">
            <span className="h-px w-8 bg-terracotta/60 sm:w-12" />
            SHARE YOUR EXPERIENCE
            <span className="h-px w-8 bg-terracotta/60 sm:w-12" />
          </div>
          <h1 className="font-serif-display text-3xl font-bold text-ink sm:text-4xl">
            Leave a Review
          </h1>
          <p className="mt-1 font-sans text-sm text-ink/75">
            Tell us about your experience at Red Chilly Cafe
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3" noValidate>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="flex min-w-0 items-center gap-3 rounded-lg border border-ink/15 bg-cream/55 px-3 py-3 focus-within:border-terracotta">
              <UserRound size={17} className="shrink-0 text-ink" aria-hidden="true" />
              <input
                required
                maxLength={50}
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your Name *"
                aria-label="Your Name"
                className="w-full min-w-0 bg-transparent font-sans text-sm text-ink outline-none placeholder:text-ink/50"
              />
            </label>
            <label className="flex min-w-0 items-center gap-3 rounded-lg border border-ink/15 bg-cream/55 px-3 py-3 focus-within:border-terracotta">
              <Mail size={17} className="shrink-0 text-ink" aria-hidden="true" />
              <input
                required
                type="email"
                maxLength={50}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Your Email *"
                aria-label="Your Email"
                className="w-full min-w-0 bg-transparent font-sans text-sm text-ink outline-none placeholder:text-ink/50"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto]">
            <label className="flex min-w-0 items-center gap-3 rounded-lg border border-ink/15 bg-cream/55 px-3 py-3 focus-within:border-terracotta">
              <Mail size={17} className="shrink-0 text-ink" aria-hidden="true" />
              <input
                value={verificationCode}
                onChange={(event) => setVerificationCode(event.target.value)}
                placeholder="Verify Email with Code"
                aria-label="Verify Email with Code"
                className="w-full min-w-0 bg-transparent font-sans text-sm text-ink outline-none placeholder:text-ink/50"
              />
            </label>
            <button
              type="button"
              onClick={() =>
                setNotice('Email verification is not configured. No code has been sent or verified.')
              }
              className="rounded-lg bg-terracotta px-5 py-3 font-sans text-sm font-semibold text-cream-light transition-colors hover:bg-terracotta-dark focus-ring"
            >
              Send Code
            </button>
          </div>
          <p className="font-sans text-xs leading-relaxed text-ink/60">
            Email verification requires a backend service, which is not currently configured. The
            existing review backend accepts email addresses but does not send or verify codes.
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 py-1">
            <span className="flex items-center gap-2 font-sans text-sm font-semibold text-ink">
              <span className="text-terracotta" aria-hidden="true">☆</span>
              Your Rating <span className="text-terracotta">*</span>
            </span>
            <RatingStarsInput value={rating} onChange={setRating} size={23} />
          </div>

          <label className="flex items-start gap-3 rounded-lg border border-ink/15 bg-cream/55 px-3 py-3 focus-within:border-terracotta">
            <MessageCircle size={17} className="mt-0.5 shrink-0 text-ink" aria-hidden="true" />
            <textarea
              required
              maxLength={200}
              rows={3}
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Your Review *"
              aria-label="Your Review"
              className="w-full resize-y bg-transparent font-sans text-sm text-ink outline-none placeholder:text-ink/50"
            />
          </label>

          <div>
            <label className="mb-2 flex items-center gap-2 font-sans text-sm font-semibold text-ink">
              <ImagePlus size={17} aria-hidden="true" />
              Upload Photos (Max 5 Images)
            </label>
            <label
              htmlFor="review-photos"
              className="flex min-h-20 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-ink/20 bg-cream/30 px-4 py-3 text-center transition-colors hover:border-terracotta/50"
            >
              <UploadCloud size={25} className="text-ink" aria-hidden="true" />
              <span className="mt-1 font-sans text-xs text-ink/75">
                Choose JPG or PNG images · {photos.length}/{MAX_PHOTOS}
              </span>
            </label>
            <input
              id="review-photos"
              type="file"
              accept="image/jpeg,image/png,.jpg,.jpeg,.png"
              multiple
              onChange={selectPhotos}
              className="sr-only"
              aria-label="Upload photos, maximum 5 JPG or PNG images"
            />
            {photos.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {photos.map((photo) => (
                  <div key={photo.id} className="group relative h-16 w-20 overflow-hidden rounded-md">
                    <img src={photo.url} alt={photo.file.name} className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removePhoto(photo.id)}
                      aria-label={`Remove ${photo.file.name}`}
                      className="absolute right-1 top-1 rounded-full bg-espresso/80 p-1 text-cream-light focus-ring"
                    >
                      <X size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <p className="mt-2 font-sans text-xs leading-relaxed text-ink/60">
              Photo previews are local only. The current review backend cannot store uploaded
              images, so photos will not be included with your submitted review.
            </p>
          </div>

          {(error || reviewError) && (
            <p role="alert" className="font-sans text-sm text-terracotta-dark">
              {error || reviewError}
            </p>
          )}
          {notice && (
            <p role="status" className="font-sans text-sm text-ink/70">
              {notice}
            </p>
          )}
          {submitted && (
            <p role="status" className="font-sans text-sm text-green-800">
              {submitted}
            </p>
          )}

          <div className="pt-1 text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-terracotta px-7 py-3 font-sans text-sm font-semibold text-cream-light transition-colors hover:bg-terracotta-dark focus-ring disabled:cursor-wait disabled:opacity-70"
            >
              <Send size={16} aria-hidden="true" />
              {isSubmitting ? 'Submitting…' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default FeedbackForm;
