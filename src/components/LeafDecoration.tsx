import React from 'react';

interface Props {
  className?: string;
  color?: string;
}

/** Recurring thin-line botanical leaf illustration used in page corners. */
const LeafDecoration: React.FC<Props> = ({ className = '', color = '#C94D2F' }) => (
  <svg
    viewBox="0 0 160 200"
    className={className}
    fill="none"
    stroke={color}
    strokeWidth="1.2"
    aria-hidden="true"
  >
    <path d="M20 190 L45 40" />
    {[0, 1, 2, 3, 4, 5].map((i) => {
      const y = 170 - i * 24;
      const len = 34 - i * 2;
      return (
        <g key={i}>
          <ellipse
            cx={30 + (i % 2 === 0 ? -len / 2 - 4 : len / 2 + 4)}
            cy={y}
            rx={len / 2}
            ry={len / 4.2}
            transform={`rotate(${i % 2 === 0 ? -35 : 35} ${30 + (i % 2 === 0 ? -len / 2 - 4 : len / 2 + 4)} ${y})`}
          />
        </g>
      );
    })}
  </svg>
);

export default LeafDecoration;
