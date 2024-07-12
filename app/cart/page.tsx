// "use client";

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaTrashAlt } from "react-icons/fa";
// import Navbar from "../navbar/Navbar";
// import API_BASE_URL from "@/apiConfig";
// import Cookies from "universal-cookie";
// import { AiFillSafetyCertificate } from "react-icons/ai";
// import Link from "next/link";
// import Loader from "../components/loader";

// interface CartItem {
//   _id: string;
//   productId: any;
//   name: string;
//   images: string;
//   size: string;
//   price: number;
//   originalPrice: number;
//   discountedPrice: number;
//   discount: string;
//   quantity: number;
//   totalPrice: number;
// }

// const CartPage: React.FC = () => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [totalPrice, setTotalPrice] = useState<number>(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [inputBorderColor, setInputBorderColor] =
//     useState<string>("border-gray-200");
//   const cookies = new Cookies();
//   const userId = cookies.get("userId");

//   useEffect(() => {
//     const fetchCartItems = async () => {
//       try {
//         const response = await axios.get(
//           `${API_BASE_URL}/api/carts/products/${userId}`
//         );
//         setCartItems(response.data.carts);
//         setTotalPrice(response.data.totalPrice);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching cart items:", error);
//         setError("Error fetching cart items. Please try again later.");
//         setLoading(false);
//       }
//     };

//     if (userId) {
//       fetchCartItems();
//     } else {
//       setLoading(false);
//       setError("User not logged in.");
//     }
//   }, [userId]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     productId: string
//   ) => {
//     const { value } = e.target;
//     let parsedValue = parseInt(value, 10);
//     if (isNaN(parsedValue) || parsedValue < 1) {
//       parsedValue = 1;
//     }
//     const updatedCartItems = cartItems.map((item) =>
//       item._id === productId ? { ...item, quantity: parsedValue } : item
//     );
//     setCartItems(updatedCartItems);
//   };

//   const handleRemove = async (productId: string) => {
//     try {
//       if (!userId) {
//         throw new Error("User not logged in.");
//       }
//       await axios.delete(`${API_BASE_URL}/api/carts/delete/${productId}`, {
//         data: { userId: userId },
//       });
//       setCartItems((prevCartItems) =>
//         prevCartItems.filter((item) => item.productId !== productId)
//       );
//       //  Update cart count in cookies after item removal
//       const updatedCartItems = cartItems.filter(
//         (item) => item.productId !== productId
//       );
//       const count = updatedCartItems.reduce(
//         (acc, item) => acc + item.quantity,
//         0
//       );
//       cookies.set("cartItems", updatedCartItems);
//     } catch (error) {
//       console.error("Error removing item from cart:", error);
//       setError("Error removing item from cart. Please try again later.");
//     }
//   };

//   const handleIncreaseQuantity = async (productId: string) => {
//     try {
//       await axios.put(`${API_BASE_URL}/api/carts/increase/${productId}`, {
//         userId: userId,
//       });
//       const updatedCartItems = cartItems.map((item) =>
//         item.productId === productId
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       );
//       setCartItems(updatedCartItems);
//     } catch (error) {
//       console.error("Error increasing quantity:", error);
//       setError("Error increasing quantity. Please try again later.");
//     }
//   };

//   const handleDecreaseQuantity = async (productId: string) => {
//     try {
//       if (!userId) {
//         throw new Error("User not logged in.");
//       }

//       const existingItem = cartItems.find(
//         (item) => item.productId === productId
//       );
//       if (!existingItem || existingItem.quantity <= 1) {
//         return;
//       }

//       await axios.put(`${API_BASE_URL}/api/carts/decrease/${productId}`, {
//         userId: userId,
//       });

//       const updatedCartItems = cartItems.map((item) =>
//         item.productId === productId
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       );
//       setCartItems(updatedCartItems);
//     } catch (error) {
//       console.error("Error decreasing quantity:", error);
//       setError("Error decreasing quantity. Please try again later.");
//     }
//   };

//   const handleCheckout = () => {
//     console.log("Proceeding to checkout...");
//     // Implement checkout logic here
//   };

//   return (
//     <>
     
//       <div className="px-4 py-8 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl mx-auto bg-gray-50">
//         <h2 className="lg:text-xl sm:text-sm md:text-md  font-bold mb-4">View Your Cart</h2>
//         {loading ? (
//     <Loader/>
//         ) : error ? (
//           <p className="text-center text-red-500">{error}</p>
//         ) : cartItems.length === 0 ? (
//           <div className="flex flex-col items-center justify-center ">
//             <img
//               src="./emptyCart.gif "
//               alt="Empty Cart"
//               className="w-48 h-48 mb-4"
//             />
         
//             <button
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//               <Link href="/home"> Go to Home Page</Link>
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white h-fit">
//             <div className="flex flex-col">
//               <div
//                 className={`border-2 p-2 rounded-sm ${
//                   cartItems.length > 2 ? "overflow-y-auto scroll-hide h-96" : ""
//                 }`}
//               >
//                 {cartItems.map((item) => (
//                   <div
//                     key={item.productId}
//                     className="border border-gray-200 rounded-lg p-4 mb-4 shadow-md"
//                   >
//                     <div className="flex flex-col md:flex-row sm:flex-row ">
//                       <div className="md:mr-4 mb-4 md:mb-0 w-fit ">
//                         <img
//                           src={item.images}
//                           alt={item.name}
//                           className="w-28 h-28 md:w-36 md:h-36 object-contain"
//                         />
//                       </div>
//                       <div className="flex-1">
//                         <div className="sm:flex-col sm:gap-4">
//                           <div className="font-bold mb-2">
//                             <span className="text-gray-900 hover:text-blue-600">
//                               {item.name}
//                             </span>
//                           </div>
//                           <div className="text-sm text-gray-600 mb-2">
//                             {item.size}
//                           </div>
//                           <div className="flex items-center mb-2">
//                             <span className="text-green-600 font-bold mr-1">
//                               ₹{item.price}
//                             </span>
//                           </div>

//                           <div className="flex items-center justify-between mt-4">
//                             <div className="flex items-center">
//                               <button
//                                 className="border border-gray-300 px-2 py-1 mr-2"
//                                 onClick={() =>
//                                   handleDecreaseQuantity(item.productId)
//                                 }
//                               >
//                                 -
//                               </button>
//                               <input
//                                 type="number"
//                                 className={`border ${inputBorderColor} focus:border-blue-600 hover:border-blue-600 px-2 py-1 w-16 text-center`}
//                                 value={item.quantity}
//                                 onChange={(e) =>
//                                   handleChange(e, item.productId)
//                                 }
//                               />
//                               <button
//                                 className="border border-gray-300 px-2 py-1  ml-2"
//                                 onClick={() =>
//                                   handleIncreaseQuantity(item.productId)
//                                 }
//                               >
//                                 +
//                               </button>
//                             </div>
//                             <div className="text-sm flex sm:flex-col  md:flex-col lg:flex-row md:items-center md:justify-end gap-2">
//                               <button
//                                 className="text-gray-600 hover:text-blue-600 flex items-center ml-2"
//                                 onClick={() => handleRemove(item.productId)}
//                               >
//                                 <FaTrashAlt className="mr-1" />
//                                 <span className="text-sm font-semibold">
//                                   Remove
//                                 </span>
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="md:col-span-1 flex justify-end mt-4">
//                 <button
//                   type="submit"
//                   className="mt-0 flex w-full items-center justify-center rounded-md border border-transparent bg-[#fb641b] px-8 py-3 text-base font-medium text-white hover:bg-[#e55b19] focus:outline-none focus:ring-2 focus:ring-[#e56d33] focus:ring-offset-2"
//                   onClick={handleCheckout}
//                 >
//                   <span>Place Order</span>{" "}
//                 </button>
//               </div>
//             </div>

//             <div className="flex flex-col md:col-span-1">
//               <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-md">
//                 <h3 className="text-xl font-bold mb-4">Price Details</h3>
//                 {cartItems.map((item) => (
//                   <div key={item._id} className="flex justify-between mb-2">
//                     <div className="text-md">
//                       {item.name} ({item.quantity}{" "}
//                       {item.quantity > 1 ? "items" : "item"})
//                     </div>
//                     <div className="font-bold">
//                       ₹{item.price * item.quantity}
//                     </div>
//                   </div>
//                 ))}
//                 <hr className="my-2" />
//                 <div className="flex justify-between mb-2">
//                   <div>Total Price:</div>
//                   <div className="font-bold">₹{totalPrice}</div>
//                 </div>
//                 {/* Add discount and delivery charges sections as per your business logic */}
//                 <div className="text-xs text-gray-500 mt-2">
//                   You will save ₹1,100 on this order
//                 </div>
//               </div>
//               <div className="flex items-center justify-start mt-4 sm:mt-4">
//                 <span className="mr-2">
//                   <AiFillSafetyCertificate
//                     fontSize={30}
//                     color="green"
//                     className="text-center"
//                   />
//                 </span>
//                 <div className="text-sm font-bold text-[#878787] sm:text-sm  md:text-md lg:text-xl">
//                   <p className="whitespace-normal">
//                     Safe and Secure Payments. Easy returns.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default CartPage;














"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartItems,
  removeCartItem,
  updateCartItemQuantity,
  incrementCartItemQuantity,
  decrementCartItemQuantity,
  selectCartItems,
  selectTotalPrice,
  selectCartError,
} from "../redux/features/cartSlice";

import { FaTrashAlt } from "react-icons/fa";
import Cookies from "universal-cookie";
import { AiFillSafetyCertificate } from "react-icons/ai";
import Link from "next/link";
import { useAppDispatch } from "../redux/hook";


const CartPage: React.FC = () => {
  const [inputBorderColor, ] =
    useState<string>("border-gray-200");
  const dispatch = useAppDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const error = useSelector(selectCartError);

  const cookies = new Cookies();
  const userId = cookies.get("userId");

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartItems()); // Dispatch fetchCartItems action
    }
  }, [dispatch, userId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    productId: string
  ) => {
    const { value } = e.target;
    let parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue) || parsedValue < 1) {
      parsedValue = 1;
    }
    dispatch(updateCartItemQuantity({ productId, quantity: parsedValue })); // Dispatch updateCartItemQuantity action
  };

  const handleRemove = (productId: string) => {
    if (!userId) {
      console.error("User not logged in.");
      return;
    }
    dispatch(removeCartItem({ productId, userId })); // Dispatch removeCartItem action
  };

  const handleIncreaseQuantity = (productId: string) => {
    dispatch(incrementCartItemQuantity({ productId, userId })); // Dispatch incrementCartItemQuantity action
  };

  const handleDecreaseQuantity = (productId: string) => {
    const existingItem = cartItems.find((item) => item.productId === productId);
    if (!existingItem || existingItem.quantity <= 1) {
      return;
    }

    dispatch(decrementCartItemQuantity({ productId, userId }));
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout...");
    // Implement checkout logic here
  };

  return (
    <>
      <div className="px-4 py-8 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl mx-auto bg-gray-50">
        <h2 className="lg:text-xl sm:text-sm md:text-md  font-bold mb-4">
          View Your Cart
        </h2>
        {error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center ">
            <img
              src="./emptyCart.gif "
              alt="Empty Cart"
              className="w-48 h-48 mb-4"
            />

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <Link href="/home"> Go to Home Page</Link>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white h-fit">
            <div className="flex flex-col">
              <div
                className={`border-2 p-2 rounded-sm ${
                  cartItems.length > 2 ? "overflow-y-auto scroll-hide h-96" : ""
                }`}
              >
                {cartItems.map((item) => (
                  <div
                    key={item.productId}
                    className="border border-gray-200 rounded-lg p-4 mb-4 shadow-md"
                  >
                    <div className="flex flex-col md:flex-row sm:flex-row ">
                      <div className="md:mr-4 mb-4 md:mb-0 w-fit ">
                        <img
                          src={item.images}
                          alt={item.name}
                          className="w-28 h-28 md:w-36 md:h-36 object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="sm:flex-col sm:gap-4">
                          <div className="font-bold mb-2">
                            <span className="text-gray-900 hover:text-blue-600">
                              {item.name}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            {item.size}
                          </div>
                          <div className="flex items-center mb-2">
                            <span className="text-green-600 font-bold mr-1">
                              ₹{item.price}
                            </span>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center">
                              <button
                                className={`border border-gray-300 px-2 py-1 mr-2 ${
                                  item.quantity <= 1
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                                }`}
                                onClick={() =>
                                  handleDecreaseQuantity(item.productId)
                                }
                                disabled={item.quantity <= 1} // Disable button if quantity is 1 or less
                              >
                                -
                              </button>

                              <input
                                type="number"
                                className={`border ${inputBorderColor} focus:border-blue-600 hover:border-blue-600 px-2 py-1 w-16 text-center`}
                                value={item.quantity}
                                onChange={(e) =>
                                  handleChange(e, item.productId)
                                }
                              />
                              <button
                                className="border border-gray-300 px-2 py-1  ml-2"
                                onClick={() =>
                                  handleIncreaseQuantity(item.productId)
                                }
                              >
                                +
                              </button>
                            </div>
                            <div className="text-sm flex sm:flex-col  md:flex-col lg:flex-row md:items-center md:justify-end gap-2">
                              <button
                                className="text-gray-600 hover:text-blue-600 flex items-center ml-2"
                                onClick={() => handleRemove(item.productId)}
                              >
                                <FaTrashAlt className="mr-1" />
                                <span className="text-sm font-semibold">
                                  Remove
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="md:col-span-1 flex justify-end mt-4">
                <button
                  type="submit"
                  className="mt-0 flex w-full items-center justify-center rounded-md border border-transparent bg-[#fb641b] px-8 py-3 text-base font-medium text-white hover:bg-[#e55b19] focus:outline-none focus:ring-2 focus:ring-[#e56d33] focus:ring-offset-2"
                  onClick={handleCheckout}
                >
                  <span>Place Order</span>{" "}
                </button>
              </div>
            </div>

            <div className="flex flex-col md:col-span-1">
              <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Price Details</h3>
                {cartItems.map((item) => (
                  <div key={item._id} className="flex justify-between mb-2">
                    <div className="text-md">
                      {item.name} ({item.quantity}{" "}
                      {item.quantity > 1 ? "items" : "item"})
                    </div>
                    <div className="font-bold">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
                <hr className="my-2" />
                <div className="flex justify-between mb-2">
                  <div>Total Price:</div>
                  <div className="font-bold">₹{totalPrice}</div>
                </div>
                {/* Add discount and delivery charges sections as per your business logic */}
                <div className="text-xs text-gray-500 mt-2">
                  You will save ₹1,100 on this order
                </div>
              </div>
              <div className="flex items-center justify-start mt-4 sm:mt-4">
                <span className="mr-2">
                  <AiFillSafetyCertificate
                    fontSize={30}
                    color="green"
                    className="text-center"
                  />
                </span>
                <div className="text-sm font-bold text-[#878787] sm:text-sm  md:text-md lg:text-xl">
                  <p className="whitespace-normal">
                    Safe and Secure Payments. Easy returns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
