import React from "react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "Top Offer",
    image: "/category/offer1.png",
    alt: "Top Offer",
    slug: "top-offer",
  },
  {
    title: "Mobiles & Tablets",
    image: "/category/mobile1.png",
    alt: "Mobiles & Tablets",
    slug: "mobilesTablets",
  },
  {
    title: "TVs & Appliances",
    image: "/category/TVs&Appliances1.png",
    alt: "TVs & Appliances",
    slug: "tvs-appliances",
  },
  {
    title: "Home & Kitchen",
    image: "/category/Home1.png",
    alt: "Home & Kitchen",
    slug: "home-kitchen",
  },
  {
    title: "Beauty",
    image: "/category/beauty1.png",
    alt: "Beauty",
    slug: "beauty",
  },
  {
    title: "Fashion",
    image: "/category/fashion1.png",
    alt: "Fashion",
    slug: "fashion",
  },
];

const Categories: React.FC = () => {
  return (
    <div className="bg-gray-100 px-4 py-2 md:py-3 mt-2 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl mx-auto">
      {/* Desktop View */}
      <div className="hidden md:flex items-center justify-between space-x-6">
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
              <span className="ml-2 text-black md:text-sm">
                {category.title}
              </span>
            </Link>
          </div>
        ))}
      </div>

      {/* Mobile View */}

      <div className="md:hidden justify-between flex overflow-x-auto  items-center mt-4 scrollbar-hide">
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
                <span className="mt-1 text-black text-center text-xs ">
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
