import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';
import LandingPage from './pages/LandingPage';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import { adminAuthService } from './auth/adminAuth';
import { DataProvider } from './context/DataContext';

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
    <Routes>
      <Route element={<DataProvider><PublicLayout /></DataProvider>}>
        <Route path="/" element={<LandingPage />} />
      </Route>
      <Route path="/admin" element={<AdminRoute />} />
      <Route path="/admin/login" element={<AdminLogin />} />
    </Routes>
  </BrowserRouter>
);

export default App;
