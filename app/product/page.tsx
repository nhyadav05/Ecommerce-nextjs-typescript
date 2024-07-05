"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import Card from "../components/card";
import Pagination from "../components/pagination";
import Loader from "../components/loader";
import Link from "next/link";
import { HeartIcon } from "@heroicons/react/24/outline";

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
  product: [];
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [apiData,setApiData]=useState([]);
  const [imageError, setImageError] = useState(false); 

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, selectedCategoryId]);

  const fetchProducts = (page: number) => {
    setLoading(true);
    setError(null);
    let apiUrl = `${API_BASE_URL}/api/products?page=${page}&limit=10&maxPrice=150`;
    if (selectedCategoryId) {
      apiUrl += `&categoryId=${selectedCategoryId}`;
    }
    axios
      .get<ApiResponse>(apiUrl)
      .then((response) => {
        setProducts(response.data.products);
        setTotalPages(response.data.pagination.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Error fetching products. Please try again later.");
        setLoading(false);
      });
  };


  const addToCart = (productId: string) => {
    const payload = {
      productId,
      quantity: 1, // Assuming quantity is fixed for this example
      userId:'667be96a1912e70bb1b8ba44',
    };
  
    axios
      .post(`${API_BASE_URL}/api/carts/add/${productId}`, payload)
      .then((response) => {
        alert("Product added to cart successfully!");
        console.log(apiData, "apiData");
        setApiData(response.data)
        // Optionally, update state or perform other actions upon successful addition
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
        alert("Failed to add product to cart. Please try again.");
      });
  };
  

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error) {
    return <div>{error}</div>;
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/no-product-found.png'; // Set default image path on error
  };


  return (
    <>
      <div className="container px-4 py-8 md:py-3 mt-8 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl mx-auto">
        {products.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {products.map((product: Product) => (
                <div className="bg-white shadow-lg overflow-hidden relative ">
                  <Link href={`/product/${product._id}`}>
                    <div className="p-4">
                      <div className="relative">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          onError={handleImageError}
                          className={`w-full h-80 object-center bg-contain transition-transform duration-300 transform hover:scale-105 ${
                            imageError ? 'bg-gray-800' : ''
                          }`}
                        />
                        <button
                          className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 focus:outline-none"
                          onClick={toggleTooltip}
                        >
                          <HeartIcon className="h-6 w-6 text-gray-600" />
                        </button>
                      </div>
                      <h2 className="text-xl font-semibold mb-2">
                        <p className="text-gray-700 hover:text-blue-600 whitespace-nowrap overflow-hidden  text-ellipsis">
                          {product.name}
                        </p>
                      </h2>

                      <p className="text-gray-700 mb-2 text-md">
                        {product.categoryId}
                      </p>

                      <p className="text-md text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis">
                        {product.description}
                      </p>

                      <div className="flex gap-2 items-center mt-4">
                        <div className="text-gray-900 font-bold text-lg">
                          ₹{product.price}
                        </div>
                        <del className="text-gray-400 font-bold text-sm">
                          15% {product.discountPrice}
                        </del>

                        <div className="text-sm font-bold text-[#22c722]">
                        20% offer  {product.offer}
                        </div>
                      </div>
                    </div>
                  </Link>

                  <button
                    className="mt-4 px-4 py-2 w-full bg-blue-600 text-white font-bold rounded-md hover:bg-blue-500 focus:bg-blue-400 focus:outline-none"
                    onClick={() => addToCart(product._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center mt-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="container px-4 py-8 md:py-3 mt-8 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl mx-auto">
            <p className="text-center font-semibold text-red-500">
              No products found.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default AllProduct;
