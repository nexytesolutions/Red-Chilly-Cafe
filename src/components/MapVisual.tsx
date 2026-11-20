import React from 'react';

const MapVisual: React.FC = () => (
  <div className="h-[300px] overflow-hidden rounded-xl border border-ink/10 bg-cream-dark sm:h-[360px] lg:h-full lg:min-h-[360px]">
    <iframe
      title="Red Chilly Cafe location on Google Maps"
      src="https://www.google.com/maps?q=Red%20Chilly%20Cafe%2C%20Auroville%2C%20Tamil%20Nadu%20605101&output=embed"
      className="h-full w-full border-0"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  </div>
);

export default MapVisual;
