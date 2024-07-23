"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import Cookies from "universal-cookie";
import Link from "next/link";
import Loader from "../components/loader";
import Pagination from "../components/pagination";

interface Product {
  _id: string;
  name: string;
  images: string[];
  price: number;
  launchDate: string;
  categoryId: string;
  isActive: boolean;
  outOfStock: boolean;
  discountPrice: number;
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
  const userId = cookies.get("userId");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageLimit] = useState<number>(10); // Adjust as needed

  const localStorageKey = userId ? `wishlist_${userId}` : "wishlist";

  useEffect(() => {
    if (userId) {
      fetchWishlist(userId, currentPage);
    }
  }, [userId, currentPage]);

  const fetchWishlist = async (userId: string | undefined, page: number) => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get<WishListResponse>(
        `${API_BASE_URL}/api/wishlist/${userId}`,
        {
          params: {
            page: page,
            limit: pageLimit,
          },
        }
      );
      setWishlist(response.data.wishList.products);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const removeFromLocalStorage = (productId: string) => {
    const storedWishlist = localStorage.getItem(localStorageKey);
    if (storedWishlist) {
      const wishlist = JSON.parse(storedWishlist) as string[];
      const updatedWishlist = wishlist.filter((id) => id !== productId);
      localStorage.setItem(localStorageKey, JSON.stringify(updatedWishlist));
    }
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    const userId = cookies.get("userId");
    removeFromLocalStorage(productId);

    try {
      await axios.delete(`${API_BASE_URL}/api/wishlist/remove`, {
        data: {
          userId,
          productId,
        },
      });
      fetchWishlist(userId, currentPage);
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  };

  const handleAddToCartWishlist = async (productId: string) => {
    const userId = cookies.get("userId");
    if (!userId) {
      console.error("User ID not found in cookies.");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/api/carts/add/${productId}`, {
        userId,
      });
      alert("Product added to cart successfully!");
      fetchWishlist(userId, currentPage);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Failed to add product to cart. Please try again later.");
    }
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = "/no-product-found.png";
  };

  return (
    <>
      <div className="container px-4 py-8 md:py-3 mt-8 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl mx-auto">
        <div className="text-center md:text-left">
          <h1 className="sm:text-md md:text-xl lg:text-4xl font-bold mb-10">
            WishList
          </h1>
        </div>
        {loading ? (
          <Loader />
        ) : wishlist.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {wishlist.map((wishlistItem) => (
                <div
                  key={wishlistItem._id}
                  className="bg-white shadow-lg overflow-hidden relative"
                >
                  <div className="relative">
                    <Link href={`/productDetail?id=${wishlistItem._id}`}>
                      <img
                        src={wishlistItem.images[0] || "/no-product-found.png"}
                        alt={wishlistItem.name}
                        onError={handleImageError}
                        className={`w-full h-80 object-center bg-contain transition-transform duration-300 transform hover:scale-105 ${
                          wishlistItem.outOfStock ? "filter grayscale" : ""
                        }`}
                      />
                      {wishlistItem.outOfStock && (
                        <div className="absolute inset-0 bg-gray-200 opacity-75 flex items-center justify-center">
                          Out of Stock
                        </div>
                      )}
                    </Link>
                    <button
                      className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 focus:outline-none"
                      onClick={() =>
                        handleRemoveFromWishlist(wishlistItem._id)
                      }
                    >
                      <HeartSolidIcon className="h-6 w-6 text-red-600" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">
                      <Link
                        href={`/productDetail?id=${wishlistItem._id}`}
                        className="text-gray-700 hover:text-blue-600 whitespace-nowrap overflow-hidden text-ellipsis"
                      >
                        {wishlistItem.name}
                      </Link>
                    </h2>

                    <div className="flex gap-2 items-center mt-4">
                      <div className="text-[#22c722] font-bold text-lg">
                        ₹{wishlistItem.price}
                      </div>
                      <del className="text-gray-400 font-bold text-sm">
                        {wishlistItem.discountPrice}% Off
                      </del>
                    </div>
                    <button
                      className={`mt-4 px-4 py-2 w-full font-bold rounded-md ${
                        wishlistItem.outOfStock
                          ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-500 focus:bg-blue-400 focus:outline-none"
                      }`}
                      onClick={() =>
                        handleAddToCartWishlist(wishlistItem._id)
                      }
                      disabled={wishlistItem.outOfStock}
                    >
                      {wishlistItem.outOfStock ? "Out of Stock" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="flex justify-center mt-8">
              {currentPage > 1 && (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </button>
              )}
              {currentPage < totalPages && (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </button>
              )}
            </div> */}
                <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          </>
        ) : (
          <div className="text-center py-14">
            <img
              src="./no-wishlist.gif"
              alt="No Wishlist"
              className="mx-auto h-16 w-16"
            />
            <p className="text-md font-semibold text-gray-600 mt-4">
              Oops! No items in your wishlist.
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <Link href="/home">Go to home</Link>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default WishListPage;








