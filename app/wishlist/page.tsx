"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWishlist,
  removeFromWishlist,
  selectWishlist,
  selectWishlistError,
  selectWishlistLoading,
  selectWishlistTotalPages,
} from "../redux/features/wishlistSlice";
import { fetchAddToCart } from "../redux/features/cartSlice";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Cookies from "universal-cookie";
import Pagination from "../components/pagination";
import Loader from "../components/loader";
import { fetchProducts, selectProducts } from "@/app/redux/features/products";

const WishListPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const products = useSelector(selectProducts);
  const wishlist = useSelector(selectWishlist);
  const error = useSelector(selectWishlistError);
  const loading = useSelector(selectWishlistLoading);
  const totalPages = useSelector(selectWishlistTotalPages);
  const [currentPage, setCurrentPage] = useState(1);
  const cookies = new Cookies();
  const userId = cookies.get("userId");

  useEffect(() => {
    if (userId) {
      dispatch(fetchWishlist({ page: currentPage }));
    }
  }, [dispatch, userId, currentPage]);

  const handleRemoveFromWishlist = (productId: string) => {
    // Remove from local storage
    removeFromLocalStorage(productId);
    // Dispatch action to remove from Redux store
    dispatch(removeFromWishlist(productId));
  };

  // Function to remove item from local storage
  const removeFromLocalStorage = (productId: string) => {
    // Get current wishlist from local storage
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      // Parse the stored wishlist array
      const wishlist = JSON.parse(storedWishlist) as string[];
      // Filter out the product to remove
      const updatedWishlist = wishlist.filter((id) => id !== productId);
      // Update local storage with updated wishlist
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    }
  };

  const handleAddToCart = (productId: string) => {
    dispatch(fetchAddToCart(productId));
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = "/no-product-found.png"; // Set default image path on error
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading === "pending") {
    return <Loader />;
  }

  return (
    <div className="container px-4 py-8 md:py-3 mt-8 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl mx-auto">
      <div className="text-center md:text-left">
        <h1 className="text-md sm:text-md md:text-xl lg:text-2xl font-bold mb-10">
          Wishlist
        </h1>
      </div>
      {wishlist.length > 0 ? (
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
                </Link>
                {wishlistItem.outOfStock && (
                  <div className="absolute inset-0 bg-gray-200 opacity-75 flex items-center justify-center">
                    Out of Stock
                  </div>
                )}
                <button
                  className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 focus:outline-none"
                  onClick={() => handleRemoveFromWishlist(wishlistItem._id)}
                >
                  <HeartSolidIcon className="h-6 w-6              text-[#fc0362] " />
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
                  onClick={() => handleAddToCart(wishlistItem._id)}
                  disabled={wishlistItem.outOfStock}
                >
                  {wishlistItem.outOfStock ? "Out of Stock" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
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
  );
};

export default WishListPage;
