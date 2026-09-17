import React from 'react';

interface Props {
  className?: string;
  color?: string;
}

/** Recurring thin-line chili + sprig illustration used near the header. */
const ChiliDecoration: React.FC<Props> = ({ className = '', color = '#C94D2F' }) => (
  <svg
    viewBox="0 0 220 120"
    className={className}
    fill="none"
    stroke={color}
    strokeWidth="1.4"
    aria-hidden="true"
  >
    {/* sprig */}
    <path d="M215 10 L150 60" />
    <ellipse cx="180" cy="24" rx="16" ry="7" transform="rotate(-28 180 24)" />
    <ellipse cx="200" cy="14" rx="13" ry="6" transform="rotate(-20 200 14)" />
    <ellipse cx="165" cy="42" rx="14" ry="6" transform="rotate(-35 165 42)" />
    {/* chili */}
    <path
      d="M150 60 C 130 55, 95 60, 78 78 C 62 94, 55 112, 62 116 C 70 120, 92 104, 108 88 C 122 74, 138 62, 150 60 Z"
      fill={color}
      fillOpacity="0.12"
    />
  </svg>
);

export default ChiliDecoration;
