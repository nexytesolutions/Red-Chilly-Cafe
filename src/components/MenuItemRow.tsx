import React from 'react';
import { Leaf, Flame } from 'lucide-react';
import type { MenuItem } from '../data/menuItems';

interface Props {
  item: MenuItem;
}

const MenuItemRow: React.FC<Props> = ({ item }) => (
  <div className="flex items-start gap-3 border-b border-ink/10 py-4 last:border-b-0 sm:gap-4">
    <img
      src={item.image}
      alt={item.name}
      loading="lazy"
      className="h-16 w-16 shrink-0 rounded-lg object-cover sm:h-20 sm:w-20"
    />
    <div className="min-w-0 flex-1">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="break-words font-serif-display text-base font-semibold leading-tight text-ink sm:text-lg">
          {item.name}
        </h4>
        <span
          className={`inline-flex w-fit shrink-0 items-center gap-1 self-start rounded-full border px-1.5 py-0.5 text-[9px] font-sans font-medium sm:text-[10px] ${
            item.dietType === 'veg'
              ? 'border-green-700/40 text-green-700'
              : 'border-terracotta/40 text-terracotta'
          }`}
        >
          {item.dietType === 'veg' ? <Leaf size={9} /> : <Flame size={9} />}
          {item.dietType === 'veg' ? 'Veg' : 'Non-Veg'}
        </span>
      </div>
      <p className="mt-1 line-clamp-2 font-sans text-[11px] leading-snug text-ink/60 sm:text-sm">
        {item.description}
      </p>
    </div>
    <div className="flex shrink-0 flex-col gap-1 pl-1 text-left sm:gap-6 sm:pl-2 sm:text-right">
      <div>
        <p className="text-[9px] tracking-wide text-ink/50 font-sans sm:text-[10px]">REGULAR</p>
        <p className="font-sans font-semibold text-ink text-sm sm:text-base">₹{item.regularPrice}</p>
      </div>
      <div>
        <p className="text-[9px] tracking-wide text-ink/50 font-sans sm:text-[10px]">LARGE</p>
        <p className="font-sans font-semibold text-ink text-sm sm:text-base">₹{item.largePrice}</p>
      </div>
    </div>
  </div>
);

export default MenuItemRow;
