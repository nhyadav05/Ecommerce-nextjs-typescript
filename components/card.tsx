// component/card.tsx
"use client";

import { HeartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useState } from "react";

interface CardProps {
  imageSrc: string;
  name: string;
  title: string;
  category: string;
  description?: string;
  price: number;
  discountPrice: number;
  offer: string;
}

const Card: React.FC<CardProps> = ({
  imageSrc,
  name,
  title,
  category,
  description,
  price,
  discountPrice,
  offer,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  return (
    <div className="bg-white shadow-lg overflow-hidden relative rounded-lg transition-transform duration-300 transform hover:scale-105">
      <div className="relative">
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-64 object-cover object-center"
        />
        <button
          className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 focus:outline-none"
          onClick={toggleTooltip}
        >
          <HeartIcon className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      <div className="p-4">
        <Link href="/productDetails">
          <h2 className="text-md font-semibold mb-2">
            <a
              href={`/product/${name}`}
              className="text-gray-700 hover:text-blue-600 whitespace-nowrap overflow-hidden text-ellipsis"
            >
              {title || name}
            </a>
          </h2>
        </Link>
        <p className="text-gray-700 mb-2 text-sm">{category}</p>
        {description && (
          <p className="text-sm text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis">
            {description}
          </p>
        )}

        <div className="flex gap-2 items-center mt-4">
          <div className="text-gray-900 font-bold text-lg">₹{price}</div>
          <del className="text-gray-400 font-bold text-sm">₹{discountPrice}</del>
          {offer && (
            <div className="text-sm font-bold text-[#22c722]">{offer}</div>
          )}
        </div>

        <button className="mt-4 px-4 py-2 w-full bg-blue-600 text-white font-bold rounded-md hover:bg-blue-500 focus:bg-blue-400 focus:outline-none">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
