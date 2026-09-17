import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';
import LandingPage from './pages/LandingPage';
import Admin from './pages/Admin';
import { DataProvider } from './context/DataContext';

const App: React.FC = () => (
  <DataProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </DataProvider>
);

export default App;
