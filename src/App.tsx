import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';
import LandingPage from './pages/LandingPage';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
<<<<<<< HEAD
import MenuItemDetail from './pages/MenuItemDetail';
import { adminAuthService } from './auth/demoAdminAuth';
=======
import { adminAuthService } from './auth/adminAuth';
>>>>>>> a0617da7e7e514202af1f0bfd8bfc5b9f8f423df
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
<<<<<<< HEAD
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
=======
  <BrowserRouter>
    <Routes>
      <Route element={<DataProvider><PublicLayout /></DataProvider>}>
        <Route path="/" element={<LandingPage />} />
      </Route>
      <Route path="/admin" element={<AdminRoute />} />
      <Route path="/admin/login" element={<AdminLogin />} />
    </Routes>
  </BrowserRouter>
>>>>>>> a0617da7e7e514202af1f0bfd8bfc5b9f8f423df
);

export default App;
