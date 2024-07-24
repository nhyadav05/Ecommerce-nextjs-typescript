"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import Cookies from "universal-cookie";
import Link from "next/link";
import Loader from "../components/loader";
import Pagination from "../components/pagination";
import { fetchWishlist, removeFromWishlist } from "../server/wishlistAction";
import { addProductToCart } from "../server/cartAction";
import { toast } from "react-toastify";

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
  const [loading, setLoading] = useState<"pending" | boolean>(true); // Set initial loading state
  const cookies = new Cookies();
  const userId = cookies.get("userId");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageLimit] = useState<number>(10); // Adjust as needed
  const localStorageKey = userId ? `wishlist_${userId}` : "wishlist";

  useEffect(() => {
    fetchWishListData(); // Fetch wishlist data on component mount
  }, []);

  // Fetch Wish List
  const fetchWishListData = async () => {
    try {
      setLoading(true); // Set loading state to true when fetching data
      const responseWishList = await fetchWishlist(userId);
      setWishlist(responseWishList.wishList.products);
      setTotalPages(responseWishList.totalPages);
      setCurrentPage(responseWishList.currentPage);
      setLoading(false); // Set loading state to false after fetching data
    } catch (error) {
      console.error("Error fetching WishList :", error);
      setLoading(false); // Set loading state to false if there's an error
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchWishListData(); // Fetch data for the selected page
  };

  const removeFromLocalStorage = (productId: string) => {
    const storedWishlist = localStorage.getItem(localStorageKey);
    if (storedWishlist) {
      const wishlist = JSON.parse(storedWishlist) as string[];
      const updatedWishlist = wishlist.filter((id) => id !== productId);
      localStorage.setItem(localStorageKey, JSON.stringify(updatedWishlist));
    }
  };

  const handleRemoveFromWishlist = async (productId: any) => {
    console.log("Remove From WishList : ", productId);
    try {
      setLoading(true); // Set loading state to true when removing from wishlist
      const removeToWishList = await removeFromWishlist(productId, userId);
      toast.success("successfully Remove from WishList .");
      console.log(removeToWishList);
  
      // Update wishlist state to reflect the removal
      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item._id !== productId)
      );
  
      removeFromLocalStorage(productId);
      setLoading(false); // Set loading state to false after successful removal
    } catch (error) {
      console.log(error);
      setLoading(false); // Set loading state to false if there's an error
    }
  };
  

  const handleAddToCartWishlist = async (productId: any) => {
    console.log("Add to cart : ", productId);
    try {
      setLoading(true); // Set loading state to true when adding to cart
      const wishlistAddToCart = await addProductToCart(productId, userId);
      toast.success("Add to Cart successful.");
      console.log(wishlistAddToCart);
      setLoading(false); // Set loading state to false after adding to cart
    } catch (error) {
      console.log(error);
      setLoading(false); // Set loading state to false if there's an error
    }
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = "/no-product-found.png";
  };

  if (loading === "pending") {
    return <Loader />; // Display loader while data is pending
  }

  return (
    <>
      <div className="container px-4 py-8 md:py-3 mt-8 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl mx-auto">
        <div className="text-center md:text-left">
          <h1 className="sm:text-md md:text-xl lg:text-4xl font-bold mb-10">
            WishList
          </h1>
        </div>
        {wishlist.length > 0 ? (
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
