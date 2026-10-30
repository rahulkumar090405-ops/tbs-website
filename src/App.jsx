import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import HomePage from './pages/HomePage';
import MenuPage from './components/MenuPage';
import CustomCake from './components/CustomCake';
import GalleryPage from './pages/GalleryPage';

// ScrollToTop on route transition
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-charcoal-900 selection:bg-brand-100 selection:text-brand-900 font-sans">
      <ScrollToTop />

      {/* Sticky Top Navigation */}
      <Navbar />

      {/* Page Content Routing */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage initialHub="all" />} />
          <Route path="/menu/all" element={<MenuPage initialHub="all" />} />
          <Route path="/menu/cakes" element={<MenuPage initialHub="cakes" />} />
          <Route path="/menu/desserts" element={<MenuPage initialHub="desserts" />} />
          <Route path="/menu/snacks" element={<MenuPage initialHub="snacks" />} />
          <Route path="/products" element={<MenuPage initialHub="all" />} />
          <Route
            path="/custom-cake"
            element={
              <div className="pt-24 pb-16">
                <CustomCake />
              </div>
            }
          />
          <Route path="/gallery" element={<GalleryPage />} />
          {/* Fallback route */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Sticky Floating Mobile WhatsApp Quick Button */}
      <FloatingWhatsApp />
    </div>
  );
}
