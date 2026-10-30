import React from 'react';
import Hero from '../components/Hero';
import BrandPromises from '../components/BrandPromises';
import HighlightSlider from '../components/HighlightSlider';
import OurStory from '../components/OurStory';
import WhyTBS from '../components/WhyTBS';
import Comparison from '../components/Comparison';
import CustomCake from '../components/CustomCake';
import OrderInfo from '../components/OrderInfo';
import InstagramFeed from '../components/InstagramFeed';
import Reviews from '../components/Reviews';
import FinalCTA from '../components/FinalCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandPromises />
      <HighlightSlider />
      <OurStory />
      <WhyTBS />
      <Comparison />
      <CustomCake />
      <OrderInfo />
      <InstagramFeed />
      <Reviews />
      <FinalCTA />
    </>
  );
}
