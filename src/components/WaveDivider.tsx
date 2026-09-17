import React from 'react';

interface Props {
  className?: string;
  fill?: string;
}

/** Organic curved/wavy boundary used between cream sections and the dark footer. */
const WaveDivider: React.FC<Props> = ({ className = '', fill = '#2A170D' }) => (
  <svg
    viewBox="0 0 1536 90"
    className={className}
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <path
      d="M0 55 C 250 10, 500 85, 768 45 C 1050 5, 1300 80, 1536 30 L1536 90 L0 90 Z"
      fill={fill}
    />
    <path
      d="M0 55 C 250 10, 500 85, 768 45 C 1050 5, 1300 80, 1536 30"
      fill="none"
      stroke="#C94D2F"
      strokeWidth="1.5"
      strokeOpacity="0.6"
    />
  </svg>
);

export default WaveDivider;
