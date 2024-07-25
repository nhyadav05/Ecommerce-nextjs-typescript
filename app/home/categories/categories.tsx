
// Categories.tsx
"use client"
import { fetchCategories } from "@/app/server/categoriesAction";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

interface Props {
  onCategorySelect: (categoryId: string) => void;
  selectedCategoryId: string | null;
}

const Categories: React.FC<Props> = ({
  onCategorySelect,
  selectedCategoryId
}) => {

  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data); // Assuming data structure matches what's needed
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategoriesData();
  }, []);

  const handleCategoryClick = (categoryId: string) => {
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
          slidesToShow: 4
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3
        }
      }
    ]
  };

  return (
    <div className="bg-gray-50 px-4 py-2 md:py-3 mt-2 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl mx-auto">
    <div className="pl-[30px] pr-[30px] bg-blue-100">
      <Slider {...sliderSettings} className="">
        {categories.map((category) => (
          <div
            key={category._id}
            className={`px-2 py-2 ${
              selectedCategoryId === category._id ? "bg-blue-200" : ""
            }`}
          >
            <div
              className="flex flex-col items-center"
              onClick={() => handleCategoryClick(category._id)}
            >
              <div className=" lg:w-[80px] lg:h-[80px] w-[60px] md:w-[80px] h-[70px] mx-auto  relative overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="mt-1 text-black font-semibold text-center text-sm">
                {category.name}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  </div>
  );
};

export default Categories;

