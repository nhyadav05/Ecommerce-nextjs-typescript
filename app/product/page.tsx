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
interface CardProps {
  imageSrc: string;
  name: string;
  title: string;
  category: string;
  description?: string;
  price: number;
  discountPrice: number;
  offer: string;
}
const AllProduct: React.FC<Props> = ({ selectedCategoryId }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="container px-4 py-8 md:py-3 mt-8 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl mx-auto">
        {products.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {products.map((product: Product) => (
                <Link href={`/product/${product._id}`}>
                  <div className="bg-white shadow-lg overflow-hidden relative ">
                    <div className="p-4">
                      <div className="relative">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-64 object-cover object-center transition-transform duration-300 transform hover:scale-105"
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
                          ₹{product.discountPrice}
                        </del>

                        <div className="text-sm font-bold text-[#22c722]">
                          {product.offer}
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <button className="mt-4 px-4 py-2 w-full bg-blue-600 text-white font-bold rounded-md hover:bg-blue-500 focus:bg-blue-400 focus:outline-none">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
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

// // pages/allproduct.tsx (or wherever AllProduct component is used)

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import API_BASE_URL from "@/apiConfig";
// import Card from "../components/card";
// import Pagination from "../components/pagination";
// import Loader from "../components/loader";
// import Link from "next/link";

// interface Product {
//   _id: string;
//   name: string;
//   images: string;
//   category: string;
//   description?: string;
//   price: number;
//   discountPrice: number;
//   offer: string;
// }

// interface ApiResponse {
//   products: Product[];
//   pagination: {
//     totalPages: number;
//   };
// }

// const AllProduct: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);

//   useEffect(() => {
//     fetchProducts(currentPage);
//   }, [currentPage]);

//   const fetchProducts = (page: number) => {
//     setLoading(true);
//     setError(null);

//     // Replace with your API endpoint
//  let apiUrl = `${API_BASE_URL}/api/products?page=${page}&limit=10&maxPrice=150`;

//     axios
//       .get<ApiResponse>(apiUrl)
//       .then((response) => {
//         setProducts(response.data.products);
//         setTotalPages(response.data.pagination.totalPages);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching products:", error);
//         setError("Error fetching products. Please try again later.");
//         setLoading(false);
//       });
//   };

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="container px-4 py-8 md:py-3 mt-8 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl mx-auto">
//       {products.length > 0 ? (
//         <div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
//             {products.map((product) => (
//               <Card
//                 key={product._id}
//                 images={product.images}
//                 name={product.name}
//                 title={product.name}
//                 category={product.category}
//                 description={product.description}
//                 price={product.price}
//                 discountPrice={product.discountPrice}
//                 offer={product.offer}
//                 productId={product._id}
//               />
//             ))}
//           </div>
//           {totalPages > 1 && (
//             <div className="flex justify-center mt-4">
//               <Pagination
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 onPageChange={handlePageChange}
//               />
//             </div>
//           )}
//         </div>
//       ) : (
//         <p className="text-center font-semibold text-red-500">No products found.</p>
//       )}
//     </div>
//   );
// };

// export default AllProduct;
