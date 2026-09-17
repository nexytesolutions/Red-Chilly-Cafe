import React, { useMemo, useState } from 'react';
import { Leaf, Flame } from 'lucide-react';
import MenuCategoryTabs from '../components/MenuCategoryTabs';
import MenuFilters, { type DietFilter } from '../components/MenuFilters';
import MenuItemRow from '../components/MenuItemRow';
import LeafDecoration from '../components/LeafDecoration';
import ChiliDecoration from '../components/ChiliDecoration';
import WaveDivider from '../components/WaveDivider';
import { useData } from '../context/DataContext';

const Menu: React.FC = () => {
  const { menu } = useData();
  const [category, setCategory] = useState('Pizza');
  const [diet, setDiet] = useState<DietFilter>('all');

  const filtered = useMemo(
    () =>
      menu.filter(
        (item) =>
          item.category === category && (diet === 'all' ? true : item.dietType === diet)
      ),
    [menu, category, diet]
  );

  const left = filtered.filter((_, i) => i % 2 === 0);
  const right = filtered.filter((_, i) => i % 2 === 1);

  return (
    <section className="relative bg-cream px-6 md:px-16 pt-14 pb-4">
      <div className="mx-auto max-w-[1536px]">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-10">
          <div className="max-w-md">
            <p className="font-sans text-terracotta text-xs tracking-[0.25em] font-medium mb-3">
              OUR MENU
            </p>
            <h1 className="font-serif-display font-bold text-4xl md:text-[2.6rem] leading-[1.1] text-ink">
              Authentic Flavours,
              <br />
              Thoughtfully Crafted
            </h1>
            <p className="font-sans text-ink/60 text-sm mt-4 leading-relaxed">
              From wood-fired pizzas to fresh pasta, seafood and homemade desserts — discover a
              menu full of flavour, made with love.
            </p>
          </div>

          <MenuCategoryTabs active={category} onChange={setCategory} />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-ink/10 mb-8">
          <MenuFilters active={diet} onChange={setDiet} />
          <p className="flex items-center gap-2 font-sans text-xs text-ink/60">
            <Leaf size={13} className="text-green-700" />
            ORGANIC SPELT FLOUR OPTION&nbsp;<span className="text-ink font-medium">+₹30/60</span>
          </p>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <h2 className="font-serif-display font-bold text-2xl text-ink flex items-center gap-2">
            {category.toUpperCase()} <Flame size={16} className="text-terracotta" />
          </h2>
          <span className="h-px flex-1 max-w-[80px] bg-terracotta/60" />
        </div>

        {filtered.length === 0 ? (
          <p className="font-sans text-ink/60 py-16 text-center">
            More {category.toLowerCase()} dishes are coming soon to the menu.
          </p>
        ) : (
          <div className="max-h-[30rem] overflow-y-auto pr-1 md:max-h-none md:overflow-visible md:pr-0">
            <div className="grid grid-cols-1 gap-x-12 md:grid-cols-2">
              <div>
                {left.map((item) => (
                  <MenuItemRow key={item.id} item={item} />
                ))}
              </div>
              <div className="md:border-l md:border-ink/10 md:pl-12">
                {right.map((item) => (
                  <MenuItemRow key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="relative mt-16 pt-8">
          <LeafDecoration className="absolute -left-2 bottom-0 h-24 w-20 opacity-70" />
          <ChiliDecoration className="absolute right-0 -top-2 h-14 w-28 opacity-80" />
          <p className="text-center font-sans text-xs tracking-[0.2em] text-terracotta/80">
            REAL INGREDIENTS &nbsp;•&nbsp; AUTHENTIC FLAVOURS &nbsp;•&nbsp; RED CHILLY CAFE
          </p>
        </div>
      </div>

      <WaveDivider className="w-full h-16 -mb-4 mt-6" />
    </section>
  );
};

export default Menu;
