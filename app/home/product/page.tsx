"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import Pagination from "../../components/pagination";
import Link from "next/link";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import Cookies from "universal-cookie";
import Loader from "../../components/loader";
import { addToWishlist, fetchWishlist, removeFromWishlist } from "@/app/server/wishlistAction";
import { fetchProduct } from "@/app/server/productAction";

interface Product {
  _id: string;
  name: string;
  images: string[];
  categoryId: string;
  category: string;
  description?: string;
  price: number;
  discountPrice: number;
  offer: string;
  outOfStock: boolean; // Added property
}

interface PaginationData {
  totalPages: number;
}

interface ApiResponse {
  products: Product[];
  pagination: PaginationData;
}

interface Props {
  selectedCategoryId: string | null;
}
const AllProduct: React.FC<Props> = ({ selectedCategoryId }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<"pending" | boolean>(true); // Set initial loading state
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [wishList, setWishList] = useState<string[]>([]);
  const cookies = new Cookies();
  const userId = cookies.get("userId");
  const localStorageKey = userId ? `wishlist_${userId}` : "wishlist";

  useEffect(() => {
    fetchProducts({ page: currentPage, categoryId: selectedCategoryId });
    loadWishlistFromLocalStorage();
  }, [currentPage, selectedCategoryId]);

  useEffect(() => {
    setCurrentPage(1);
    if (selectedCategoryId) {
      fetchProducts({ page: 1, categoryId: selectedCategoryId });
    }
    loadWishlistFromLocalStorage();
  }, [selectedCategoryId]);

  const loadWishlistFromLocalStorage = async () => {
    try {
      const data = await fetchWishlist(userId);
      setWishList(data.wishlist || []);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  const updateLikedProductsInLocalStorage = (updatedWishlist: string[]) => {
    localStorage.setItem(localStorageKey, JSON.stringify(updatedWishlist));
  };

  const isInWishlist = (productId: string) => {
    return wishList.includes(productId);
  };

  const fetchProducts = async ({ page, categoryId }: { page: number; categoryId: string | null }) => {
    setLoading(true);
    setError(null);
    try {
      const { products: fetchedProducts, pagination } = await fetchProduct({ page, categoryId });
      setProducts(fetchedProducts);
      setTotalPages(pagination.totalPages);
    } catch (error) {
      setError("Error fetching products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };



  const handleLikeToggle = async (productId: string) => {
    try {
      if (isInWishlist(productId)) {
        await removeFromWishlist(productId, userId);
        const updatedWishlist = wishList.filter((id) => id !== productId);
        setWishList(updatedWishlist);
        updateLikedProductsInLocalStorage(updatedWishlist);
      } else {
        await addToWishlist(productId, userId);
        const updatedWishlist = [...wishList, productId];
        setWishList(updatedWishlist);
        updateLikedProductsInLocalStorage(updatedWishlist);
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  const addToCart = (productId: string) => {
    const userId = cookies.get("userId");
    axios
      .post(`${API_BASE_URL}/carts/add/${productId}`, { userId })
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

  if (loading === "pending") {
    return <Loader />;
  }
  
  if (error) {
    return (
      <div className="container mx-auto text-center font-semibold text-red-600 p-8">
        {error}
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 md:py-3 mt-8 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl mx-auto">
      {products.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {products.map((product: Product) => (
              <div
                className="bg-white shadow-lg overflow-hidden relative"
                key={product._id}
              >
                <div className="p-4">
                  <div className="relative">
                  <Link href={`/productDetail?id=${product._id}`}>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className={`w-full h-80 object-center bg-contain transition-transform duration-300 transform hover:scale-105 ${
                          product.outOfStock ? "filter grayscale" : ""
                        }`}
                      />
              
                    {product.outOfStock && (
                      <div className="absolute font-semibold inset-0 bg-gray-200 opacity-75 flex items-center justify-center">
                        Out of Stock
                      </div>
                    )}
                          </Link>
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
                          wishList.includes(product._id)
                            ? "text-red-600" // Liked color
                            : "text-gray-400" // Default color
                        }`}
                      />
                    </button>
                  </div>
                  <h2 className="text-xl font-semibold mb-2">
                    <Link href={`/product/${product._id}`}>
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
                    <div className="text-gray-900 font-bold text-lg">
                      ₹{product.price}
                    </div>
                    <del className="text-gray-400 font-bold text-sm">
                      10%{product.discountPrice}
                    </del>
                    <div className="text-sm font-bold text-[#22c722]">
                     15% {product.offer}
                    </div>
                  </div>
                </div>

                <button
                  className={`mt-4 px-4 py-2 w-full font-bold rounded-md ${
                    product.outOfStock
                      ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-500 focus:bg-blue-400 focus:outline-none"
                  }`}
                  onClick={() => addToCart(product._id)}
                  disabled={product.outOfStock}
                >
                  {product.outOfStock ? "Out of Stock" : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )   : (

        <div className="flex flex-col items-center justify-center ">
            <img
              src="./product-not-found.gif "
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



















