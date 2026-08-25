import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandPromises from './components/BrandPromises';
import OurStory from './components/OurStory';
import WhyTBS from './components/WhyTBS';
import Comparison from './components/Comparison';
import FeaturedCakes from './components/FeaturedCakes';
import Menu from './components/Menu';
import CustomCake from './components/CustomCake';
import OrderInfo from './components/OrderInfo';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-charcoal-900 selection:bg-brand-100 selection:text-brand-900 font-sans">
      {/* Sticky Top Navigation */}
      <Navbar />

      {/* Main Page Flow */}
      <main className="flex-grow">
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
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky Floating Mobile WhatsApp Quick Button */}
      <FloatingWhatsApp />
    </div>
  );
}
