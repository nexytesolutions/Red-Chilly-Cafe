import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';
import LandingPage from './pages/LandingPage';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import MenuItemDetail from './pages/MenuItemDetail';
import { adminAuthService } from './auth/demoAdminAuth';
import { DataProvider } from './context/DataContext';

const App: React.FC = () => (
  <DataProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/menu/:itemId" element={<MenuItemDetail />} />
        </Route>
        <Route
          path="/admin"
          element={adminAuthService.isAuthenticated() ? <Admin /> : <Navigate to="/admin/login" replace />}
        />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  </DataProvider>
);

export default App;
