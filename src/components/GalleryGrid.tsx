import React from 'react';

const images = [
  {
    src: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?q=80&w=800&auto=format&fit=crop',
    alt: 'Fresh cherry tomato and basil pizza on a wooden board',
    className: 'row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
    alt: 'Red Chilly Cafe entrance lit with warm lanterns',
    className: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=800&auto=format&fit=crop',
    alt: 'Bowl of fresh pasta with herbs',
    className: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop',
    alt: 'Cozy candle-lit dining tables at Red Chilly Cafe',
    className: '',
  },
];

const GalleryGrid: React.FC = () => (
  <div className="grid grid-cols-2 gap-4 auto-rows-[200px]">
    {images.map((img) => (
      <img
        key={img.src}
        src={img.src}
        alt={img.alt}
        loading="lazy"
        className={`w-full h-full object-cover rounded-xl ${img.className}`}
      />
    ))}
  </div>
);

export default GalleryGrid;
