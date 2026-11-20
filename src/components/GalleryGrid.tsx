import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';

const images = [
  {
    src: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?q=80&w=1200&auto=format&fit=crop',
    alt: 'Fresh pizza with cherry tomatoes and basil',
  },
  {
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
    alt: 'Warmly lit restaurant dining room',
  },
  {
    src: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=1200&auto=format&fit=crop',
    alt: 'Pasta served with fresh herbs',
  },
  {
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop',
    alt: 'A plated meal in a cozy restaurant',
  },
];

const GalleryGrid: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowLeft') {
        setActiveIndex((index) => (index === null ? null : (index + images.length - 1) % images.length));
      }
      if (event.key === 'ArrowRight') {
        setActiveIndex((index) => (index === null ? null : (index + 1) % images.length));
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.addEventListener('keydown', closeOnEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex]);

  const openImage = (index: number) => setActiveIndex(index);
  const currentImage = activeIndex === null ? null : images[activeIndex];

  return (
    <>
      <div className="grid grid-cols-2 grid-rows-[repeat(3,minmax(90px,1fr))] gap-3 sm:gap-4">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => openImage(index)}
            aria-label={`Open gallery image: ${image.alt}`}
            className={`group relative min-h-[100px] overflow-hidden rounded-xl focus-ring ${
              index === 0 ? 'row-span-2' : ''
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
        <button
          type="button"
          onClick={() => openImage(images.length - 1)}
          aria-label={`View all ${images.length} gallery images`}
          className="group relative min-h-[100px] overflow-hidden rounded-xl focus-ring"
        >
          <img
            src={images[images.length - 1].src}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute inset-0 flex items-center justify-center gap-2 bg-espresso/75 font-sans text-sm font-semibold text-cream-light transition-colors group-hover:bg-espresso/85 sm:text-base">
            <Plus size={20} aria-hidden="true" />
            + More
          </span>
        </button>
      </div>

      {currentImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-espresso/90 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Photo gallery"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveIndex(null);
          }}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            aria-label="Close gallery"
            className="absolute right-4 top-4 rounded-full bg-cream-light/10 p-2 text-cream-light hover:bg-cream-light/20 focus-ring"
          >
            <X size={24} />
          </button>
          <button
            type="button"
            onClick={() => setActiveIndex((activeIndex! + images.length - 1) % images.length)}
            aria-label="Previous image"
            className="absolute left-2 z-10 rounded-full bg-cream-light/10 p-2 text-cream-light hover:bg-cream-light/20 focus-ring sm:left-6"
          >
            <ChevronLeft size={28} />
          </button>
          <figure className="flex max-h-full max-w-5xl flex-col items-center">
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className="max-h-[78vh] max-w-full rounded-xl object-contain"
            />
            <figcaption className="mt-3 font-sans text-sm text-cream-light/90">
              {currentImage.alt} · {activeIndex! + 1} of {images.length}
            </figcaption>
          </figure>
          <button
            type="button"
            onClick={() => setActiveIndex((activeIndex! + 1) % images.length)}
            aria-label="Next image"
            className="absolute right-2 z-10 rounded-full bg-cream-light/10 p-2 text-cream-light hover:bg-cream-light/20 focus-ring sm:right-6"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </>
  );
};

export default GalleryGrid;
