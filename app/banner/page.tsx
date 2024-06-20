"use client"
import BannerSlider from '@/components/BannerSlider';
import React from 'react';


const images = [
  '/banner/banner1.png',
  '/banner/banner2.png', // Add more images as needed
  '/banner/banner3.png',
];

const Banner: React.FC = () => {
  return (
    <div className="px-4 py-8 md:py-3 mt-8 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl mx-auto">
      <BannerSlider images={images} />
    </div>
  );
};

export default Banner;
