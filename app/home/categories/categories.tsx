// using redux-toolkit

"use client";
// Categories.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { RootState } from "../../redux/store";
import { fetchCategories } from "../../redux/features/categoriesSlice";

interface Props {
  onCategorySelect: (categoryId: string) => void;
  selectedCategoryId: string | null;
}

const Categories: React.FC<Props> = ({ onCategorySelect, selectedCategoryId }) => {
  const dispatch = useDispatch<any>();
  const categories = useSelector((state: RootState) => state.categories.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

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
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <div className="bg-gray-50 px-4 py-2 md:py-3 mt-2 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl mx-auto">
      <div className="hidden md:block pl-[30px] pr-[30px] bg-blue-100">
        <Slider {...sliderSettings}>
          {categories.map((category) => (
            <div
              key={category._id}
              className={`px-2 py-2 ${
                selectedCategoryId === category._id ? "bg-white" : ""
              }`}
            >
              <div
                className="flex flex-col items-center"
                onClick={() => handleCategoryClick(category._id)}
              >
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
      {/* Mobile view */}
      <div className="md:hidden justify-between flex overflow-x-auto items-center mt-4 scrollbar-hide">
        {categories.map((category) => (
          <div
            key={category._id}
            className={`flex-shrink-0 flex flex-col items-center mr-4 ${
              selectedCategoryId === category._id ? "bg-gray-200" : ""
            }`}
          >
            <div
              className="flex flex-col items-center"
              onClick={() => handleCategoryClick(category._id)}
            >
              <div className="w-12 h-12 relative overflow-hidden">
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

