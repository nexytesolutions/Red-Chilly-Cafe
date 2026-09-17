import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu as MenuIcon, X } from 'lucide-react';
import Logo from './Logo';
import ChiliDecoration from './ChiliDecoration';

const navItems = [
  { label: 'HOME', hash: '#home' },
  { label: 'OUR STORY', hash: '#our-story' },
  { label: 'MENU', hash: '#menu' },
  { label: 'EXPERIENCE', hash: '#experience' },
  { label: 'CONTACT', hash: '#contact' },
];

const Header: React.FC = () => {
  const { hash } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-30 bg-espresso border-b border-white/5">
      <div className="mx-auto flex max-w-[1536px] items-center justify-between px-6 py-3 md:px-10">
        <a href="#home" className="shrink-0" onClick={() => setOpen(false)}>
          <Logo className="h-16 w-16 md:h-20 md:w-20" />
        </a>

        <nav className="hidden md:flex items-center gap-10 lg:gap-14">
          {navItems.map((item) => {
            const active = hash === item.hash || (!hash && item.hash === '#home');
            return (
              <a
                key={item.hash}
                href={item.hash}
                className={`font-sans text-sm tracking-[0.12em] transition-colors focus-ring ${
                  active ? 'text-terracotta' : 'text-cream-light/90 hover:text-terracotta-light'
                }`}
              >
                {item.label}
                <span
                  className={`block h-[1.5px] mt-1 bg-terracotta transition-all ${
                    active ? 'w-full' : 'w-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <ChiliDecoration className="hidden lg:block h-16 w-32 shrink-0" />

        <button
          className="md:hidden text-cream-light focus-ring p-2"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <MenuIcon size={26} />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-espresso-dark border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {navItems.map((item) => {
            const active = hash === item.hash || (!hash && item.hash === '#home');
            return (
              <a
                key={item.hash}
                href={item.hash}
                onClick={() => setOpen(false)}
                className={`font-sans text-sm tracking-[0.12em] py-1 focus-ring ${
                  active ? 'text-terracotta' : 'text-cream-light/90'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      )}
    </header>
  );
};

export default Header;
