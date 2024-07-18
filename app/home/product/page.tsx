"use client";
import React, { useEffect, useState } from "react";
import Pagination from "../../components/pagination";
import Link from "next/link";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import Cookies from "universal-cookie";
import Loader from "../../components/loader";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  selectProductsLoading,
  selectProductsError,
  selectTotalPages,
  fetchProducts,
} from "@/app/redux/features/products";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/app/redux/features/wishlistSlice";
import { fetchAddToCart } from "@/app/redux/features/cartSlice";

interface Props {
  selectedCategoryId: string | null;
}

const AllProduct: React.FC<Props> = ({ selectedCategoryId }) => {
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const dispatch = useDispatch<any>();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const totalPages = useSelector(selectTotalPages);
  const [currentPage, setCurrentPage] = useState(1);
  const cookies = new Cookies();


  useEffect(() => {
   // Start local loading state
    dispatch(
      fetchProducts({ page: currentPage, categoryId: selectedCategoryId })
    ); // Set loadingLocal false after data fetch
  }, [currentPage, selectedCategoryId]);

  useEffect(() => {
    // Load liked products from cookies or storage if needed
    const likedProductsFromCookies = cookies.get("likedProducts") || [];
    setLikedProducts(likedProductsFromCookies);
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddToCart = (productId: string) => {
    dispatch(fetchAddToCart(productId));
  };


  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = "/no-product-found.png"; // Set default image path on error
  };

  const handleLikeToggle = (productId: string) => {
    if (likedProducts.includes(productId)) {
      dispatch(removeFromWishlist(productId));
    } else {
      dispatch(addToWishlist(productId));
    }
  };
  // Show loader while loadingLocal or cartLoading
  if (loading==="pending" ) {
    return <Loader />;
  }

  // Show error if any
  if (error) {
    return (
      <div className="container mx-auto text-center py-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }
  return (
    <div className="container px-4 py-8 md:py-3 mt-8 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl mx-auto">
      {products.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {products.map((product) => (
              <div
                className="bg-white shadow-lg overflow-hidden relative"
                key={product._id}
              >
                <div className="p-4">
                  <div className="w-full relative h-80">
                    <Link href={`/productDetail?id=${product._id}`}>
                      <img
                        src={product.images[0] || "/no-product-found.png"}
                        alt={product.name}
                        onError={handleImageError}
                        className={`w-full h-full object-center bg-contain transition-transform duration-300 transform hover:scale-105 ${
                          product.outOfStock ? "filter grayscale" : ""
                        }`}
                      />
                    </Link>
                    {product.outOfStock && (
                      <div className="absolute font-semibold inset-0 bg-gray-200 opacity-75 flex items-center justify-center">
                        Out of Stock
                      </div>
                    )}
                    <button
                      className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 focus:outline-none"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent parent click event
                        e.preventDefault(); // Prevent any default action
                        handleLikeToggle(product._id); // Handle heart icon click logic here
                      }}
                    >
                      <HeartSolidIcon
                        className={`h-6 w-6 ${
                          likedProducts.includes(product._id)
                            ? "text-red-600" // Liked color
                            : "text-gray-400" // Default color
                        }`}
                      />
                    </button>
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">
                      <Link href={`/productDetail?id=${product._id}`}>
                        <p className="text-gray-700 hover:text-blue-600 whitespace-nowrap overflow-hidden text-ellipsis">
                          {product.name}
                        </p>
                      </Link>
                    </h2>
                    <p className="text-gray-700 mb-2 text-md">
                      {product.category}
                    </p>
                    <p className="text-md text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis">
                      {product.description}
                    </p>
                    <div className="flex gap-2 items-center mt-4">
                      <div className="text-[#22c722] font-bold text-lg">
                        ₹{product.price}
                      </div>
                      <del className="text-gray-400 font-bold text-sm">
                        10%{product.discountPrice}
                      </del>
                      <div className="text-sm font-bold text-[#22c722]">
                        {product.offer}
                      </div>
                    </div>
                  </div>
                  <button
                    className={`px-4 py-2 w-full font-bold rounded-md ${
                      product.outOfStock
                        ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-500 focus:bg-blue-400 focus:outline-none"
                    }`}
                    onClick={() => handleAddToCart(product._id)}
                    disabled={product.outOfStock}
                  >
                    {product.outOfStock ? "Out of Stock" : "Add to Cart"}
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
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <img
            src="./product-not-found.gif"
            alt="Empty Cart"
            className="w-60 h-60 mb-4"
          />
          <p className="text-center font-semibold text-red-600 p-10">
            Products not found......
          </p>
        </div>
      )}
    </div>
  );
};

export default AllProduct;