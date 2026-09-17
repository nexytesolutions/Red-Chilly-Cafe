import React from 'react';
import { Leaf, Flame, Pencil, Trash2 } from 'lucide-react';
import type { MenuItem } from '../data/menuItems';

interface Props {
  item: MenuItem;
  onEdit: () => void;
  onDelete: () => void;
}

const AdminMenuItemRow: React.FC<Props> = ({ item, onEdit, onDelete }) => (
  <div className="flex flex-col gap-2 border-b border-ink/10 py-4 last:border-b-0 sm:flex-row sm:items-start sm:gap-4">
    <div className="flex items-start gap-3">
      <img src={item.image} alt={item.name} className="h-16 w-16 shrink-0 rounded-lg object-cover sm:h-16 sm:w-16" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
          <h4 className="min-w-0 break-words font-serif-display text-sm font-semibold leading-tight text-ink sm:text-base">
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
        <p className="mt-1 font-sans text-[10px] text-ink/50 sm:text-xs">{item.category}</p>
        <p className="mt-1 line-clamp-2 font-sans text-[11px] text-ink/60 sm:text-sm">{item.description}</p>
      </div>
    </div>

    <div className="flex items-center justify-between gap-3 sm:ml-auto sm:justify-start">
      <div className="flex min-w-[74px] flex-col gap-1 text-left text-sm sm:text-right">
        <div>
          <p className="text-[9px] text-ink/50 sm:text-[10px]">Regular</p>
          <p className="font-sans font-medium text-ink">₹{item.regularPrice}</p>
        </div>
        <div>
          <p className="text-[9px] text-ink/50 sm:text-[10px]">Large</p>
          <p className="font-sans font-medium text-ink">₹{item.largePrice}</p>
        </div>
      </div>

      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          aria-label={`Edit ${item.name}`}
          onClick={onEdit}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-terracotta/50 text-terracotta transition-colors hover:bg-terracotta/10 focus-ring sm:h-auto sm:w-auto sm:gap-1 sm:px-3 sm:py-1.5"
        >
          <Pencil size={14} />
          <span className="sr-only sm:not-sr-only sm:inline">Edit</span>
        </button>
        <button
          type="button"
          aria-label={`Delete ${item.name}`}
          onClick={onDelete}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-red-800/30 text-red-800 transition-colors hover:bg-red-800/10 focus-ring sm:h-auto sm:w-auto sm:gap-1 sm:px-3 sm:py-1.5"
        >
          <Trash2 size={14} />
          <span className="sr-only sm:not-sr-only sm:inline">Delete</span>
        </button>
      </div>
    </div>
  </div>
);

export default AdminMenuItemRow;
