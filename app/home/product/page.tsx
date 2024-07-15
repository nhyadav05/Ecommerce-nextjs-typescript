// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import API_BASE_URL from "@/apiConfig";
// import Pagination from "../components/pagination";
// import Link from "next/link";
// import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
// import Cookies from "universal-cookie";

// interface Product {
//   _id: string;
//   name: string;
//   images: string[];
//   categoryId: string;
//   category: string;
//   description?: string;
//   price: number;
//   discountPrice: number;
//   offer: string;
//   outOfStock: boolean; // Added property
// }

// interface PaginationData {
//   totalPages: number;
// }

// interface ApiResponse {
//   products: Product[];
//   pagination: PaginationData;
// }

// interface Props {
//   selectedCategoryId: string | null;
// }

// const AllProduct: React.FC<Props> = ({ selectedCategoryId }) => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [likedProducts, setLikedProducts] = useState<string[]>([]); // State to store liked product IDs
//   const cookies = new Cookies();
//   const [imageError, setImageError] = useState(false);

//   useEffect(() => {
//     fetchProducts(currentPage);
//   }, [currentPage, selectedCategoryId]);

//   useEffect(() => {
//     // Load liked products from cookies or storage if needed
//     const likedProductsFromCookies = cookies.get("likedProducts") || [];
//     setLikedProducts(likedProductsFromCookies);
//   }, []);

//   const fetchProducts = (page: number) => {
//     setLoading(true);
//     setError(null);
//     let apiUrl = `${API_BASE_URL}/api/products?page=${page}&limit=12&maxPrice=150`;
//     if (selectedCategoryId) {
//       apiUrl += `&categoryId=${selectedCategoryId}`;
//     }
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

//   const addToCart = (productId: string) => {
//     const userId = cookies.get("userId");
//     axios
//       .post(`${API_BASE_URL}/api/carts/add/${productId}`, { userId })
//       .then(() => {
//         alert("Product added to cart successfully!");
//         // Update cart count in navbar (assuming it's already set up to read from cookies)
//         const cartItems = cookies.get("cartItems") || [];
//         cookies.set("cartItems", [...cartItems, { productId, quantity: 1 }], {
//           path: "/",
//         });
//       })
//       .catch((error) => {
//         console.error("Error adding product to cart:", error);
//         alert("Failed to add product to cart. Please try again later.");
//       });
//   };

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   const handleImageError = (
//     e: React.SyntheticEvent<HTMLImageElement, Event>
//   ) => {
//     e.currentTarget.src = "/no-product-found.png"; // Set default image path on error
//     setImageError(true); // Set state to indicate image loading error
//   };

//   const handleLikeToggle = (productId: string) => {
//     if (likedProducts.includes(productId)) {
//       // Remove from wishlist
//       axios
//         .delete(`${API_BASE_URL}/api/wishlist/remove`, {
//           data: { userId: cookies.get("userId"), productId },
//         })
//         .then(() => {
//           const updatedLikedProducts = likedProducts.filter(
//             (id) => id !== productId
//           );
//           setLikedProducts(updatedLikedProducts);
//           cookies.set("likedProducts", updatedLikedProducts);
//         })
//         .catch((error) => {
//           console.error("Error removing product from wishlist:", error);
//         });
//     } else {
//       // Add to wishlist
//       axios
//         .post(`${API_BASE_URL}/api/wishlist/add`, {
//           userId: cookies.get("userId"),
//           productId,
//         })
//         .then(() => {
//           const updatedLikedProducts = [...likedProducts, productId];
//           setLikedProducts(updatedLikedProducts);
//           cookies.set("likedProducts", updatedLikedProducts);
//         })
//         .catch((error) => {
//           console.error("Error adding product to wishlist:", error);
//         });
//     }
//   };

//   if (error) {
//     return (
//       <div className="text-center font-semibold text-red-600 p-28">{error}</div>
//     );
//   }

//   return (
//     <div className="container px-4 py-8 md:py-3 mt-8 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl mx-auto">
//       {products.length > 0 ? (
//         <div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
//             {products.map((product: Product) => (
//               <div
//                 className="bg-white shadow-lg overflow-hidden relative"
//                 key={product._id}
//               >
//                 <Link href={`/product/${product._id}`}>
//                   <div className="p-4">
//                     <div className="relative">
//                       <img
//                         src={product.images[0]}
//                         alt={product.name}
//                         onError={handleImageError}
//                         className={`w-full h-80 object-center bg-contain transition-transform duration-300 transform hover:scale-105 ${
//                           product.outOfStock ? "filter grayscale" : ""
//                         }`}
//                       />
//                       {product.outOfStock && (
//                         <div className="absolute font-semibold inset-0 bg-gray-200 opacity-75 flex items-center justify-center">
//                           Out of Stock
//                         </div>
//                       )}
//                       <button
//                         className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 focus:outline-none"
//                         onClick={(e) => {
//                           e.stopPropagation(); // Prevent parent click event
//                           e.preventDefault(); // Prevent any default action
//                           handleLikeToggle(product._id); // Handle heart icon click logic here
//                         }}
//                       >
//                         <HeartSolidIcon
//                           className={`h-6 w-6 ${
//                             likedProducts.includes(product._id)
//                               ? "text-red-600" // Liked color
//                               : "text-gray-400" // Default color
//                           }`}
//                         />
//                       </button>
//                     </div>
//                     <h2 className="text-xl font-semibold mb-2">
//                       <Link href={`/product/${product._id}`}>
//                         <p className="text-gray-700 hover:text-blue-600 whitespace-nowrap overflow-hidden text-ellipsis">
//                           {product.name}
//                         </p>
//                       </Link>
//                     </h2>
//                     <p className="text-gray-700 mb-2 text-md">
//                       {product.category}
//                     </p>
//                     <p className="text-md text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis">
//                       {product.description}
//                     </p>
//                     <div className="flex gap-2 items-center mt-4">
//                       <div className="text-gray-900 font-bold text-lg">
//                         ₹{product.price}
//                       </div>
//                       <del className="text-gray-400 font-bold text-sm">
//                         ₹{product.discountPrice}
//                       </del>
//                       <div className="text-sm font-bold text-[#22c722]">
//                         {product.offer}
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//                 <button
//                   className={`mt-4 px-4 py-2 w-full font-bold rounded-md ${
//                     product.outOfStock
//                       ? "bg-gray-400 text-gray-600 cursor-not-allowed"
//                       : "bg-blue-600 text-white hover:bg-blue-500 focus:bg-blue-400 focus:outline-none"
//                   }`}
//                   onClick={() => addToCart(product._id)}
//                   disabled={product.outOfStock}
//                 >
//                   {product.outOfStock ? "Out of Stock" : "Add to Cart"}
//                 </button>
//               </div>
//             ))}
//           </div>
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={handlePageChange}
//           />
//         </div>
//       ) : (
//         <div className="text-center font-semibold text-red-600 p-28">
//           No products found.
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllProduct;


"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import Pagination from "../../components/pagination";
import Link from "next/link";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import Cookies from "universal-cookie";
import Loader from "../../components/loader";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts,selectProductsLoading,selectProductsError ,selectCurrentPage,selectTotalPages, fetchProducts} from "@/app/redux/features/products";
import { addToCart } from '../../redux/features/cartSlice'; 

interface Props {
  selectedCategoryId: string | null;
}
const AllProduct: React.FC<Props> = ({ selectedCategoryId }) => {
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = useSelector(selectTotalPages);
  const cookies = new Cookies();


  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, categoryId: selectedCategoryId }));
  }, [ currentPage, selectedCategoryId]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }; 

  useEffect(() => {
    // Load liked products from cookies or storage if needed
    const likedProductsFromCookies = cookies.get("likedProducts") || [];
    setLikedProducts(likedProductsFromCookies);
  }, []);

  
  const addToCart = (productId: string) => {
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
  const handleLikeToggle = (productId: string) => {
    if (likedProducts.includes(productId)) {
      axios
        .delete(`${API_BASE_URL}/api/wishlist/remove`, {
          data: { userId: cookies.get("userId"), productId },
        })
        .then(() => {
          const updatedLikedProducts = likedProducts.filter(
            (id) => id !== productId
          );
          setLikedProducts(updatedLikedProducts);
          cookies.set("likedProducts", updatedLikedProducts);
        })
        .catch((error) => {
          console.error("Error removing product from wishlist:", error);
        });
    } else {
      axios
        .post(`${API_BASE_URL}/api/wishlist/add`, {
          userId: cookies.get("userId"),
          productId,
        })
        .then(() => {
          const updatedLikedProducts = [...likedProducts, productId];
          setLikedProducts(updatedLikedProducts);
          cookies.set("likedProducts", updatedLikedProducts);
        })
        .catch((error) => {
          console.error("Error adding product to wishlist:", error);
        });
    }
  };

  if (error) {
    return (
      <div><Loader/></div>
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
                    <Link href={`/product/${product._id}`}>
                      <img
                       src={product.images[0] || "/no-product-found.png"}
                        alt={product.name}
                        onError={handleImageError}
                        className={`w-full h-full object-center bg-contain transition-transform duration-300 transform hover:scale-105 ${
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
                            likedProducts.includes(product._id)
                              ? "text-red-600" // Liked color
                              : "text-gray-400" // Default color
                          }`}
                        />
                      </button>
                    </div>
                    <div className="p-4">
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
                    onClick={() => addToCart(product._id)}
                    disabled={product.outOfStock}
                  >
                    {product.outOfStock ? "Out of Stock" : "Add to Cart"}
                  </button>
              </div>
              </div>
            ))
            }
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      ) : (

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

