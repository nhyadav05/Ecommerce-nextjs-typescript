import React from "react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "Grocery",
    image: "/category/Grocery.png",
    alt: "Grocery",
    slug: "grocery-supermart-store",
  },
  {
    title: "Mobiles",
    image: "/category/phone.png",
    alt: "Mobiles",
    slug: "mobile-phones-store",
  },
  {
    title: "Fashion",
    image: "/category/fashion.png",
    alt: "Fashion",
    slug: "fashion",
  },
  {
    title: "Electronics",
    image: "/category/Electronics.png",
    alt: "Electronics",
    slug: "electronics",
  },
  {
    title: "Home & Furniture",
    image: "/category/Furniture.png",
    alt: "Home & Furniture",
    slug: "home-furniture",
  },
  {
    title: "Appliances",
    image: "/category/TVs&Appliances.png",
    alt: "Appliances",
    slug: "tvs-and-appliances-new-clp-store",
  },
  {
    title: "Travel",
    image: "/category/travels.png",
    alt: "Travel",
    slug: "travel/flights",
  },
  {
    title: "Beauty, Toys & More",
    image: "/category/toy.png",
    alt: "Beauty, Toys & More",
    slug: "beauty-toys-more",
  },
  {
    title: "Two Wheelers",
    image: "/category/two-wheeler.png",
    alt: "Two Wheelers",
    slug: "two-wheelers",
  },
];

const Categories: React.FC = () => {
  return (
    <div className="bg-gray-50 px-4 py-2 md:py-3 mt-2 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl mx-auto ">
      {/* Desktop View */}
      <div className="hidden md:flex items-center justify-between gap-2 overflow-x-auto scrollbar-hide">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center flex-col">
            <Link href={`/categories/${category.slug}`}>
              <div className="w-16 h-16 relative">
                <Image
                  src={category.image}
                  alt={category.alt}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <span className="ml-2 text-black font-semibold sm:text-xs md:text-sm lg:text-md">
                {category.title}
              </span>
            </Link>
          </div>
        ))}
      </div>

      {/* Mobile View */}
      <div className="md:hidden justify-between flex overflow-x-auto items-center mt-4 scrollbar-hide">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex flex-col items-center mr-4"
          >
            <Link href={`/categories/${category.slug}`} passHref>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 relative overflow-hidden rounded-full">
                  <Image
                    src={category.image}
                    alt={category.alt}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <span className="mt-1 text-black font-semibold text-center text-xs">
                  {category.title}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
