import React from 'react';
import { categories } from '../data/menuItems';
import { categoryIcon } from './categoryIcons';

interface Props {
  active: string;
  onChange: (category: string) => void;
}

const MenuCategoryTabs: React.FC<Props> = ({ active, onChange }) => (
  <div className="w-full max-w-full overflow-x-auto pb-1 md:overflow-visible md:pb-0">
    <div className="flex min-w-max gap-3 md:flex-wrap md:gap-4 md:min-w-0">
      {categories.map((cat) => {
        const isActive = cat === active;
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`flex shrink-0 flex-col items-center justify-center gap-1.5 w-[70px] h-[70px] rounded-2xl border transition-colors focus-ring sm:w-[76px] sm:h-[76px] md:w-[84px] md:h-[84px] ${
              isActive
                ? 'bg-terracotta border-terracotta text-cream-light'
                : 'bg-transparent border-ink/15 text-ink/70 hover:border-terracotta/50'
            }`}
          >
            {categoryIcon[cat]}
            <span className="text-[10px] tracking-wide font-sans font-medium sm:text-[11px]">
              {cat.toUpperCase()}
            </span>
          </button>
        );
      })}
    </div>
  </div>
);

export default MenuCategoryTabs;
