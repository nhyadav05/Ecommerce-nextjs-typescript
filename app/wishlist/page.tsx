"use client"
import React, { useEffect ,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWishlist,
  removeFromWishlist,
  selectWishlist,
  selectWishlistLoading,
  selectWishlistError,
  selectWishlistTotalPages,
} from "../redux/features/wishlistSlice";
import {
  addToCart,
} from "../redux/features/cartSlice"; // Import addToCart and cart selectors
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Loader from "../components/loader";
import Cookies from "universal-cookie";
import API_BASE_URL from "@/apiConfig";
import axios from "axios";
import Pagination from "../components/pagination";


const WishListPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const wishlist = useSelector(selectWishlist);
  const error = useSelector(selectWishlistError);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = useSelector(selectWishlistTotalPages);
  const cookies = new Cookies();
  const userId = cookies.get("userId");

  useEffect(() => {
    if (userId) {
      dispatch(fetchWishlist({page: currentPage}));
    }
  }, [dispatch, userId,currentPage]);

  const handleRemoveFromWishlist = (productId: string) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleAddToCart = (productId: string) => {

      const userId = cookies.get("userId");
      axios
        .post(`${API_BASE_URL}/api/carts/add/${productId}`, { userId })
        .then(() => {
          alert("Product added to cart successfully!");
          const cartItems = cookies.get("cartItems") || [];
          cookies.set("cartItems", [...cartItems, { productId, quantity: 1 }], {
            path: "/",
          });
        })
        .catch((error) => {
          console.error("Error adding product to cart:", error);
          alert("Failed to add product to cart. Please try again later.");
        });
    
  };
  

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = "/no-product-found.png"; // Set default image path on error
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }; 


  return (
    <>
      <div className="container px-4 py-8 md:py-3 mt-8 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl mx-auto">
        <div className="text-center md:text-left">
          <h1 className="text-md sm:text-md md:text-xl lg:text-2xl font-bold mb-10">
            WishList
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
                  <Link href={`/product/${wishlistItem._id}`}>
                    <img
                      src={wishlistItem.images[0] || "/no-product-found.png"}
                      alt={wishlistItem.name}
                      onError={handleImageError} // Handle image load error
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
                    <HeartSolidIcon className="h-6 w-6 text-red-600" />
                  </button>
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">
                    <Link
                      href={`/product/${wishlistItem._id}`}
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
    </>
  );
};

export default WishListPage;

