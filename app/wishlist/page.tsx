// pages/wishlist/WishListPage.tsx
"use client"
// pages/wishlist/WishListPage.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '@/apiConfig';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import Navbar from '../navbar/Navbar';

interface Product {
  _id: string;
  images: string[];
  name: string;
  title: string;
  category: string;
  description?: string;
  price: number;
  discountPrice: number;
  offer: string;
}

const WishListPage: React.FC = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = '667be96a1912e70bb1b8ba44'; // Replace with actual user ID
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/wishlist/${userId}`);
        setWishlist(response.data); // Assuming the API response contains wishlist items
        setLoading(false);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleAddToWishlist = async (productId: string) => {
    try {
      await axios.post(`${API_BASE_URL}/api/wishlist/add`, {
        userId: '667be96a1912e70bb1b8ba44', // Replace with actual user ID
        productId,
      });
      // Optionally update local state or fetch wishlist again
    } catch (error) {
      console.error('Error adding product to wishlist:', error);
    }
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/wishlist/remove`, {
        data: {
          userId: '667be96a1912e70bb1b8ba44', // Replace with actual user ID
          productId,
        },
      });
      // Optionally update local state or fetch wishlist again
    } catch (error) {
      console.error('Error removing product from wishlist:', error);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/no-product-found.png'; // Set default image path on error
  };

  return (
    <>
      <Navbar />
      <div className="container px-4 py-8 md:py-3 mt-8 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl mx-auto">
        {loading ? (
          <p>Loading...</p>
        ) : wishlist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {wishlist.map((wishlistItem) => (
              <div key={wishlistItem._id} className="bg-white shadow-lg overflow-hidden relative">
                <div className="relative">
                  <img
                    src={wishlistItem.images[0]}
                    alt={wishlistItem.name}
                    onError={handleImageError} // Handle image load error
                    className="w-full h-80 object-center bg-contain transition-transform duration-300 transform hover:scale-105"
                  />
                  <button
                    className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 focus:outline-none"
                    onClick={() => handleRemoveFromWishlist(wishlistItem._id)}
                  >
                    <HeartSolidIcon className="h-6 w-6 text-gray-400" />
                  </button>
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">
                    <p className="text-gray-700 hover:text-blue-600 whitespace-nowrap overflow-hidden text-ellipsis">
                      {wishlistItem.title || wishlistItem.name}
                    </p>
                  </h2>
                  <p className="text-gray-700 mb-2 text-md">{wishlistItem.category}</p>
                  {wishlistItem.description && (
                    <p className="text-md text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis">
                      {wishlistItem.description}
                    </p>
                  )}
                  <div className="flex gap-2 items-center mt-4">
                    <div className="text-gray-900 font-bold text-lg">₹{wishlistItem.price}</div>
                    <del className="text-gray-400 font-bold text-sm">₹{wishlistItem.discountPrice}</del>
                    {wishlistItem.offer && (
                      <div className="text-sm font-bold text-[#22c722]">{wishlistItem.offer}</div>
                    )}
                  </div>
                  <button
                    className="mt-4 px-4 py-2 w-full bg-blue-600 text-white font-bold rounded-md hover:bg-blue-500 focus:bg-blue-400 focus:outline-none"
                    onClick={() => handleAddToWishlist(wishlistItem._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-14">
            <img src="/oops-wishlist.png" alt="No Wishlist" className="mx-auto h-16 w-16" />
            <p className="text-md font-semibold text-gray-600 mt-4">Oops! No items in your wishlist.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default WishListPage;

