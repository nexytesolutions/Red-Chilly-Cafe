import React from 'react';

interface Props {
  className?: string;
}

/**
 * Recreates the circular Red Chilly Cafe badge logo (mint-teal brushstroke ring,
 * a small storefront illustration, and the script "Red Chilly" wordmark).
 * No original logo file was supplied, so this is a faithful re-construction
 * built from vector shapes rather than an invented new design.
 */
const Logo: React.FC<Props> = ({ className = '' }) => (
  <svg viewBox="0 0 200 200" className={className} aria-label="Red Chilly Cafe logo">
    <circle cx="100" cy="100" r="92" fill="none" stroke="#7FCFC0" strokeWidth="7" opacity="0.85" />
    <circle cx="100" cy="100" r="80" fill="none" stroke="#F8EBD5" strokeWidth="1" strokeDasharray="2 4" />
    {/* tiny storefront glyph */}
    <g transform="translate(72,38)">
      <rect x="0" y="10" width="56" height="34" fill="none" stroke="#F8EBD5" strokeWidth="1.5" />
      <rect x="22" y="20" width="12" height="24" fill="#B9472C" />
      <path d="M-4 10 L28 -6 L60 10" fill="none" stroke="#F8EBD5" strokeWidth="1.5" />
    </g>
    {/* script wordmark */}
    <text
      x="100"
      y="118"
      textAnchor="middle"
      fill="#C94D2F"
      style={{ font: 'italic 700 34px "Dancing Script", cursive' }}
    >
      Red Chilly
    </text>
    <text
      x="100"
      y="140"
      textAnchor="middle"
      fill="#F8EBD5"
      letterSpacing="3"
      style={{ font: '600 11px "Montserrat", sans-serif' }}
    >
      CAFE
    </text>
    <text
      x="100"
      y="155"
      textAnchor="middle"
      fill="#F8EBD5"
      opacity="0.8"
      style={{ font: 'italic 500 7px "Cormorant Garamond", serif' }}
    >
      dining delight beyond the taste
    </text>
  </svg>
);

export default Logo;
