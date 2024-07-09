"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '@/apiConfig';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import Navbar from '../navbar/Navbar';
import Cookies from 'universal-cookie';
import Link from "next/link";
import Loader from '../components/loader';

interface Product {
  _id: string;
  name: string;
  images: string[];
  price: number;
  launchDate: string;
  categoryId: string;
  isActive: boolean;
  outOfStock: boolean;
}

interface WishListResponse {
  wishList: {
    _id: string;
    user: string;
    __v: number;
    products: Product[];
  };
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

const WishListPage: React.FC = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const cookies = new Cookies();

  useEffect(() => {
    const userId = cookies.get('userId'); // Replace with actual user ID
    fetchWishlist(userId);
  }, []);

  const fetchWishlist = async (userId: string | undefined) => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get<WishListResponse>(`${API_BASE_URL}/api/wishlist/${userId}`);
      setWishlist(response.data.wishList.products); // Set only the products array from the response
      setLoading(false);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      setLoading(false);
    }
  };


  const handleRemoveFromWishlist = async (productId: string) => {
    const userId = cookies.get('userId');
    if (!userId) {
      console.error('User ID not found in cookies.');
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/api/wishlist/remove`, {
        data: {
          userId,
          productId,
        },
      });
      // Optionally update local state or fetch wishlist again
      fetchWishlist(userId);
    } catch (error) {
      console.error('Error removing product from wishlist:', error);
    }
  };

  const handleAddToWishlist = async (productId: string) => {
    const userId = cookies.get('userId');
    if (!userId) {
      console.error('User ID not found in cookies.');
      return;
    }
  
    try {
      await axios.post(`${API_BASE_URL}/api/carts/add/${productId}`, { userId });
      alert('Product added to cart successfully!');
      // Optionally update local state or fetch wishlist again
      fetchWishlist(userId);
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart. Please try again later.');
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
        <Loader/>
        ) : wishlist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {wishlist.map((wishlistItem) => (
              <div key={wishlistItem._id} className="bg-white shadow-lg overflow-hidden relative">
                <div className="relative">
                <Link href={`/product/${wishlistItem._id}`}>
                  <img
                    src={wishlistItem.images[0]}
                    alt={wishlistItem.name}
                    onError={handleImageError} // Handle image load error
                    className="w-full h-80 object-center bg-contain transition-transform duration-300 transform hover:scale-105"
                  />
                  </Link>
                  <button
                    className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 focus:outline-none"
                    onClick={() => handleRemoveFromWishlist(wishlistItem._id)}
                  >
                    <HeartSolidIcon className="h-6 w-6 text-red-600" />
                  </button>
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">
                    <Link  href={`/product/${wishlistItem._id}`} className="text-gray-700 hover:text-blue-600 whitespace-nowrap overflow-hidden text-ellipsis">
                      {wishlistItem.name}
                    </Link>
                  </h2>
                 
                  <div className="flex gap-2 items-center mt-4">
                    <div className="text-[#22c722] font-bold text-lg ">₹{wishlistItem.price}</div>
                    {/* <div className="text-sm font-bold text-[#22c722]">Active: {wishlistItem.isActive.toString()}</div>
                    <div className="text-sm font-bold text-[#22c722]">Out of Stock: {wishlistItem.outOfStock.toString()}</div> */}
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
