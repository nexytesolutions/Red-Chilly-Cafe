import React, { useState } from 'react';
import { ArrowLeft, Flame, Leaf } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useData } from '../context/DataContext';

const MenuItemDetail: React.FC = () => {
  const { itemId } = useParams();
  const { menu } = useData();
  const item = menu.find((menuItem) => menuItem.id === itemId);
  const [failedImage, setFailedImage] = useState<string | null>(null);
  const imageFailed = item?.image === failedImage;

  if (!item) {
    return (
      <section className="bg-cream px-6 py-16 md:px-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-xs font-medium tracking-[0.25em] text-terracotta">
            MENU ITEM UNAVAILABLE
          </p>
          <h1 className="mt-4 font-serif-display text-3xl font-bold text-ink md:text-4xl">
            We couldn’t find that dish
          </h1>
          <p className="mx-auto mt-4 max-w-lg font-sans text-sm leading-relaxed text-ink/60">
            This menu item may have been removed or the link may be incorrect.
          </p>
          <Link
            to="/#menu"
            className="mt-8 inline-flex items-center gap-2 font-sans text-sm text-terracotta no-underline transition-colors hover:text-terracotta-dark"
          >
            <ArrowLeft size={15} /> Back to Menu
          </Link>
        </div>
      </section>
    );
  }

  const badges = [
    ...(typeof item.badge === 'string' ? [item.badge] : []),
    ...(Array.isArray(item.badges) ? item.badges.filter((badge): badge is string => typeof badge === 'string') : []),
  ].filter((badge, index, allBadges) => allBadges.indexOf(badge) === index);
  const isVegetarian = item.dietType.name.toLowerCase() === 'veg';

  return (
    <section className="bg-cream px-6 py-12 md:px-16">
      <div className="mx-auto max-w-[1280px]">
        <Link
          to="/#menu"
          className="inline-flex items-center gap-2 font-sans text-sm text-ink/60 no-underline transition-colors hover:text-terracotta"
        >
          <ArrowLeft size={15} /> Back to Menu
        </Link>

        <div className="mt-8 grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div className="overflow-hidden rounded-2xl bg-cream-light shadow-sm">
            {item.image && !imageFailed ? (
              <img
                key={item.image}
                src={item.image}
                alt={item.name}
                onError={() => setFailedImage(item.image)}
                className="aspect-[4/3] w-full object-cover md:aspect-[5/4]"
              />
            ) : (
              <div className="flex aspect-[4/3] w-full items-center justify-center font-sans text-sm text-ink/45 md:aspect-[5/4]">
                Image unavailable
              </div>
            )}
          </div>

          <div className="min-w-0">
            <p className="font-sans text-xs font-medium tracking-[0.25em] text-terracotta">
              {item.category.name.toUpperCase()}
            </p>
            <h1 className="mt-3 break-words font-serif-display text-4xl font-bold leading-tight text-ink md:text-5xl">
              {item.name}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-sans text-xs ${
                  isVegetarian
                    ? 'border-green-700/35 text-green-700'
                    : 'border-terracotta/35 text-terracotta'
                }`}
              >
                {isVegetarian ? <Leaf size={12} /> : <Flame size={12} />}
                {item.dietType.name}
              </span>
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-terracotta/25 px-3 py-1 font-sans text-xs text-terracotta"
                >
                  {badge}
                </span>
              ))}
            </div>

            <p className="mt-6 whitespace-pre-line font-sans text-base leading-relaxed text-ink/70">
              {item.description}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-ink/10 pt-6">
              <div>
                <p className="font-sans text-[10px] tracking-[0.16em] text-ink/50">REGULAR</p>
                <p className="mt-1 font-serif-display text-2xl font-semibold text-ink">
                  ₹{item.regularPrice}
                </p>
              </div>
              <div>
                <p className="font-sans text-[10px] tracking-[0.16em] text-ink/50">LARGE</p>
                <p className="mt-1 font-serif-display text-2xl font-semibold text-ink">
                  ₹{item.largePrice}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuItemDetail;
