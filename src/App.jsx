import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandPromises from './components/BrandPromises';
import OurStory from './components/OurStory';
import WhyTBS from './components/WhyTBS';
import Comparison from './components/Comparison';
import FeaturedCakes from './components/FeaturedCakes';
import Menu from './components/Menu';
import MenuPage from './components/MenuPage';
import CustomCake from './components/CustomCake';
import OrderInfo from './components/OrderInfo';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

function HomePage() {
  return (
    <>
      <Hero />
      <BrandPromises />
      <OurStory />
      <WhyTBS />
      <Comparison />
      <FeaturedCakes />
      <Menu />
      <CustomCake />
      <OrderInfo />
      <Gallery />
      <Reviews />
      <FinalCTA />
    </>
  );
}

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

      {/* Routing Configuration */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage initialHub="all" />} />
          <Route path="/menu/all" element={<MenuPage initialHub="all" />} />
          <Route path="/menu/cakes" element={<MenuPage initialHub="cakes" />} />
          <Route path="/menu/desserts" element={<MenuPage initialHub="desserts" />} />
          <Route path="/menu/snacks" element={<MenuPage initialHub="snacks" />} />
          <Route path="/custom-cake" element={
            <div className="pt-24 pb-16">
              <CustomCake />
            </div>
          } />
          {/* Fallback to home */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky Floating Mobile WhatsApp Quick Button */}
      <FloatingWhatsApp />
    </div>
  );
}
