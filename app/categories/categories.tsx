"use client"
// app/categories/categories.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import API_BASE_URL from '@/apiConfig';

interface Category {
  _id: string;
  name: string;
  image: string;
}

interface Props {
  onCategorySelect: (categoryId: string) => void; // Callback to update selected category ID
  selectedCategoryId: string | null; // Currently selected category ID
}

const Categories: React.FC<Props> = ({ onCategorySelect, selectedCategoryId }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/categories`)
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    // Call the prop function to update selectedCategoryId in the parent component
    onCategorySelect(categoryId);
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        }
      }
    ]
  };

  return (
    <div className="bg-gray-50 px-4 py-2 md:py-3 mt-2 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl mx-auto">
      <div className="hidden md:block pl-[30px] pr-[30px] bg-blue-100">
        <Slider {...sliderSettings}>
          {categories.map((category: Category) => (
            <div key={category._id} className={`px-2 py-2 ${selectedCategoryId === category._id ? 'bg-gray-200' : ''}`}>
              <div className="flex flex-col items-center" onClick={() => handleCategoryClick(category._id)}>
                <div className="w-[80px] h-[80px] relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="object-contain h-full w-full"
                  />
                </div>
                <span className="ml-2 text-black font-semibold text-sm">
                  {category.name}
                </span>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="md:hidden justify-between flex overflow-x-auto items-center mt-4 scrollbar-hide">
        {categories.map((category: Category) => (
          <div key={category._id} className={`flex-shrink-0 flex flex-col items-center mr-4 ${selectedCategoryId === category._id ? 'bg-gray-200' : ''}`}>
            <div className="flex flex-col items-center" onClick={() => handleCategoryClick(category._id)}>
              <div className="w-12 h-12 relative overflow-hidden ">
                <img
                  src={category.image}
                  alt={category.name}
                  className="object-cover h-full w-full"
                />
              </div>
              <span className="mt-1 text-black font-semibold text-center text-xs">
                {category.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;

