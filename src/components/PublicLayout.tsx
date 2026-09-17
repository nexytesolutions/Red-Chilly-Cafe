import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const PublicLayout: React.FC = () => (
  <div className="min-h-screen flex flex-col bg-cream paper-texture">
    <Header />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default PublicLayout;
