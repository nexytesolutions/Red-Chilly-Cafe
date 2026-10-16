import React, { useLayoutEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';
import LandingPage from './pages/LandingPage';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import MenuItemDetail from './pages/MenuItemDetail';
import { adminAuthService } from './auth/adminAuth';
import { DataProvider } from './context/DataContext';
import { consumeMenuScrollPosition } from './utils/menuScrollPosition';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  const previousPathname = useRef(pathname);

  useLayoutEffect(() => {
    if (previousPathname.current !== pathname) {
      const returningFromMenuDetail =
        pathname === '/' && previousPathname.current.startsWith('/menu/');
      if (returningFromMenuDetail) {
        const position = consumeMenuScrollPosition();
        if (position) {
          window.scrollTo(0, position.page);
          const list = document.querySelector<HTMLElement>('[data-menu-scroll-container]');
          if (list) list.scrollTop = position.list;
        } else {
          window.scrollTo(0, 0);
        }
      } else {
        window.scrollTo(0, 0);
      }
      previousPathname.current = pathname;
    }
  }, [pathname]);

  return null;
};

const AdminRoute: React.FC = () => {
  const isAuthenticated = adminAuthService.isAuthenticated();
  return isAuthenticated ? (
    <DataProvider>
      <Admin />
    </DataProvider>
  ) : (
    <Navigate to="/admin/login" replace />
  );
};

const App: React.FC = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route element={<DataProvider><PublicLayout /></DataProvider>}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/menu/:itemId" element={<MenuItemDetail />} />
      </Route>
      <Route path="/admin" element={<AdminRoute />} />
      <Route path="/admin/login" element={<AdminLogin />} />
    </Routes>
  </BrowserRouter>
);

export default App;
