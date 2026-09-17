import React from 'react';
import { Leaf, Flame } from 'lucide-react';

export type DietFilter = 'all' | 'veg' | 'non-veg';

interface Props {
  active: DietFilter;
  onChange: (filter: DietFilter) => void;
}

const MenuFilters: React.FC<Props> = ({ active, onChange }) => {
  const base =
    'inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-sans font-medium tracking-wide border transition-colors focus-ring';
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        onClick={() => onChange('all')}
        className={`${base} ${
          active === 'all'
            ? 'bg-terracotta border-terracotta text-cream-light'
            : 'border-ink/15 text-ink/70 hover:border-terracotta/50'
        }`}
      >
        ALL
      </button>
      <button
        onClick={() => onChange('veg')}
        className={`${base} ${
          active === 'veg'
            ? 'bg-terracotta border-terracotta text-cream-light'
            : 'border-ink/15 text-ink/70 hover:border-terracotta/50'
        }`}
      >
        <Leaf size={13} /> VEG
      </button>
      <button
        onClick={() => onChange('non-veg')}
        className={`${base} ${
          active === 'non-veg'
            ? 'bg-terracotta border-terracotta text-cream-light'
            : 'border-ink/15 text-ink/70 hover:border-terracotta/50'
        }`}
      >
        <Flame size={13} /> NON-VEG
      </button>
    </div>
  );
};

export default MenuFilters;
