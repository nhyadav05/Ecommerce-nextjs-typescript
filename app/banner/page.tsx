"use client"
// page.tsx
import React from 'react';
import BannerSlider from '@/components/BannerSlider';

const images = [
  '/banner/banner1.png',
  '/banner/banner2.png', // Add more images as needed
  '/banner/banner3.png',
];

const Banner: React.FC = () => {
  return (
    <div className="px-4 py-4 md:py-3 mt-4 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl mx-auto">
      <BannerSlider images={images} />
    </div>
  );
};

export default Banner;
