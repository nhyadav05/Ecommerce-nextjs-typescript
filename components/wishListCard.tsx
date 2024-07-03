// components/WishlistCard.tsx
"use client"
import React, { useState } from 'react';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

interface WishlistCardProps {
  imageSrc: string;
  name: string;
  title: string;
  category: string;
  description?: string;
  price: number;
  discountPrice: number;
  offer: string;
  onAddToWishlist: () => void;
  onRemoveFromWishlist: () => void;
  isAdded: boolean;
}

const WishlistCard: React.FC<WishlistCardProps> = ({
  imageSrc,
  name,
  title,
  category,
  description,
  price,
  discountPrice,
  offer,
  onAddToWishlist,
  onRemoveFromWishlist,
  isAdded,
}) => {
  const [imageError, setImageError] = useState(false); // State to track image load error

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/no-product-found.png'; // Set default image path on error
  };

  return (
    <div className="bg-white shadow-lg overflow-hidden relative">
      <div className="relative">
        <Link href="/productDetails">
          <img
            src={imageSrc}
            alt={name}
            onError={handleImageError} // Handle image load error
            className={`w-full h-80 object-center bg-contain transition-transform duration-300 transform hover:scale-105 ${
              imageError ? 'bg-gray-800' : ''
            }`}
          />
        </Link>
        <button
          className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 focus:outline-none"
          onClick={isAdded ? onRemoveFromWishlist : onAddToWishlist}
        >
          {isAdded ? (
            <HeartSolidIcon className="h-6 w-6 text-gray-400" />
          ) : (
            <HeartSolidIcon className="h-6 w-6 text-red-500" />
          )}
        </button>
      </div>

      <div className="p-4">
        <Link href="/productDetails">
          <h2 className="text-xl font-semibold mb-2">
            <Link
              href="/productDetails"
              className="text-gray-700 hover:text-blue-600 whitespace-nowrap overflow-hidden text-ellipsis"
            >
              {title || name}
            </Link>
          </h2>
        </Link>
        <Link href="/productDetails">
          <p className="text-gray-700 mb-2 text-md">{category}</p>
          {description && (
            <p className="text-md text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis">
              {description}
            </p>
          )}
        </Link>
        <div className="flex gap-2 items-center mt-4">
          <div className="text-gray-900 font-bold text-lg">₹{price}</div>
          <del className="text-gray-400 font-bold text-sm whitespace-nowrap text-ellipsis">
            ₹{discountPrice}
          </del>
          {offer && <div className="text-sm font-bold text-[#22c722]">{offer}</div>}
        </div>

        <button className="mt-4 px-4 py-2 w-full bg-blue-600 text-white font-bold rounded-md hover:bg-blue-500 focus:bg-blue-400 focus:outline-none">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default WishlistCard;
