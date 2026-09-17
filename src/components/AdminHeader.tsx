import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, LogOut } from 'lucide-react';
import Logo from './Logo';
import ChiliDecoration from './ChiliDecoration';

const tabs = [
  { label: 'MENU MANAGEMENT', id: 'menu' },
  { label: 'REVIEWS', id: 'reviews' },
];

interface Props {
  activeTab: string;
  onTabChange: (id: string) => void;
}

const AdminHeader: React.FC<Props> = ({ activeTab, onTabChange }) => (
  <header className="bg-espresso relative">
    <div className="flex items-center justify-between px-6 md:px-10 py-3">
      <div className="flex items-center gap-4">
        <Logo className="h-16 w-16" />
        <span className="h-10 w-px bg-white/15 hidden sm:block" />
        <h1 className="font-sans tracking-[0.15em] text-cream-light text-lg hidden sm:block">
          ADMIN PANEL
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="flex items-center gap-2 border border-terracotta text-cream-light text-xs tracking-wide px-4 py-2 rounded-md hover:bg-terracotta/10 transition-colors focus-ring"
        >
          <Eye size={14} /> View Website
        </Link>
        <span className="h-6 w-px bg-white/15" />
        <Link
          to="/"
          className="flex items-center gap-2 text-cream-light/80 text-xs tracking-wide px-2 py-2 hover:text-terracotta-light transition-colors focus-ring"
        >
          <LogOut size={14} /> Logout
        </Link>
      </div>

      <ChiliDecoration className="hidden lg:block absolute right-4 top-2 h-10 w-20 opacity-60" />
    </div>

    <nav className="flex gap-8 px-6 md:px-10 border-t border-white/10">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`py-3 text-sm tracking-[0.1em] font-sans transition-colors focus-ring ${
            activeTab === tab.id
              ? 'text-terracotta-light border-b-2 border-terracotta-light'
              : 'text-cream-light/60 hover:text-cream-light'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  </header>
);

export default AdminHeader;
