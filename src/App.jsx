import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import GalleryPage from './pages/GalleryPage';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-cream-50 text-charcoal-900 selection:bg-brand-100 selection:text-brand-900 font-sans">
        {/* Sticky Top Navigation */}
        <Navbar />

        {/* Page Content Routing */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/menu" element={<ProductsPage />} />
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
    </BrowserRouter>
  );
}
