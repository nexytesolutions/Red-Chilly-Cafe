import React from 'react';

interface Props {
  eyebrow: string;
  align?: 'left' | 'center';
  className?: string;
}

const SectionHeading: React.FC<Props> = ({ eyebrow, align = 'left', className = '' }) => (
  <div className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''} ${className}`}>
    <span className="font-sans text-terracotta text-xs md:text-sm tracking-[0.25em] font-medium">
      {eyebrow}
    </span>
    <span className="h-px w-10 bg-terracotta/70" />
  </div>
);

export default SectionHeading;
