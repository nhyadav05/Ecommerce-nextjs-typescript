// "use client";
// // pages/cart.tsx
// import React, { useState } from "react";
// import { AiFillSafetyCertificate } from "react-icons/ai";
// import { FaTrashAlt } from "react-icons/fa";
// import Navbar from "../navbar/Navbar";

// interface CartItemProps {
//   imageUrl: string;
//   title: string;
//   size: string;
//   originalPrice: number;
//   discountedPrice: number;
//   discount: string;
//   deliveryDate: string;
// }

// const CartPage: React.FC = () => {
//   const [isSaved, setIsSaved] = useState(false);
//   const [cartItems, setCartItems] = useState<CartItemProps[]>([
//     {
//       imageUrl: "product/tokyo-talkies-tan.webp",
//       title: "Product 1",
//       size: "M",
//       originalPrice: 1500,
//       discountedPrice: 1200,
//       discount: "20% off",
//       deliveryDate: "20 June 2024",
//     },
//     {
//       imageUrl: "product/window-curtain.webp",
//       title: "Product 2",
//       size: "L",
//       originalPrice: 1800,
//       discountedPrice: 1500,
//       discount: "15% off",
//       deliveryDate: "22 June 2024",
//     },
//     {
//       imageUrl: "product/buddhamonk.webp",
//       title: "Product 2",
//       size: "2",
//       originalPrice: 1800,
//       discountedPrice: 1500,
//       discount: "15% off",
//       deliveryDate: "22 June 2024",
//     },

//     {
//       imageUrl: "product/slipper.webp",
//       title: "Product 2",
//       size: "L",
//       originalPrice: 1800,
//       discountedPrice: 1500,
//       discount: "15% off",
//       deliveryDate: "22 June 2024",
//     },
//     {
//       imageUrl: "jewellry/braclet.webp",
//       title: "Product 2",
//       size: "L",
//       originalPrice: 1800,
//       discountedPrice: 1500,
//       discount: "15% off",
//       deliveryDate: "22 June 2024",
//     },
//     // Add more products as needed
//   ]);

//   const handleSaveToggle = () => {
//     setIsSaved(!isSaved); // Toggle the saved state
//   };

//   const handleRemoveClick = () => {
//     console.log("Item removed");
//   };
//   const [count, setCount] = useState(1);

//   const decrement = () => {
//     if (count > 1) {
//       setCount(count - 1);
//     }
//   };

//   const increment = () => {
//     setCount(count + 1);
//   };

//   const handleChange = (event: any) => {
//     const value = event.target.value;
//     if (!isNaN(value) && value !== "") {
//       setCount(parseInt(value));
//     }
//   };
//   return (
//     <>
//       <Navbar />
//       <div className="px-4 py-8 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl mx-auto bg-gray-50">
//         <h2 className="text-3xl font-bold mb-4">View Your Cart</h2>
//         <div className="grid grid-cols-1  md:grid-cols-2 gap-4 bg-white  h-fit">
//           {/* Product Image */}
//           <div className="flex flex-col  ">
//             <div className="border-2 border-gray-200 p-2 rounded-sm overflow-y-auto scroll-hide h-96 ">
//               {cartItems.map((item, index) => (
//                 <div
//                   key={index}
//                   className="border border-gray-200 rounded-lg p-4 mb-4 shadow-md "
//                 >
//                   <div className="flex flex-col md:flex-row sm:flex-row">
//                     <div className="md:mr-4 mb-4 md:mb-0 w-fit">
//                       <img
//                         src={item.imageUrl}
//                         alt={item.title}
//                         className="w-28 h-28 md:w-36 md:h-36 object-contain"
//                       />
//                     </div>

//                     <div className="flex-1">
//                       <div className="sm:flex-col sm:gap-4">
//                         {" "}
//                         <div className="font-bold mb-2">
//                           <span className="text-gray-900 hover:text-blue-600">
//                             {item.title}
//                           </span>
//                         </div>
//                         <div className="text-sm text-gray-600 mb-2 ">
//                           {item.size}
//                         </div>
//                         <div className="flex items-center mb-2">
//                           <span className="text-green-600 font-bold mr-1">
//                             ₹{item.discountedPrice}
//                           </span>
//                           <span className="text-gray-400 line-through">
//                             ₹{item.originalPrice}
//                           </span>
//                           <span className="text-green-600 ml-2">
//                             {item.discount}
//                           </span>
//                         </div>
//                       </div>

//                       {/* Quantity Selector and Actions */}
//                       <div className="flex items-center justify-between mt-4">
//                         <div className="flex items-center">
//                           <button
//                             className="border border-gray-300 px-2 py-1  mr-2"
//                             onClick={decrement}
//                           >
//                             -
//                           </button>
//                           <input
//                             type="tel"
//                             className="border border-gray-300 focus:border-blue-600 hover:border-blue-600 px-2 py-1 w-20 text-center"
//                             value={count}
//                             onChange={handleChange}
//                           />

//                           <button
//                             className="border border-gray-300 px-2 py-1  ml-2"
//                             onClick={increment}
//                           >
//                             +
//                           </button>
//                         </div>
//                         <div className="text-sm flex sm:flex-col  md:flex-col lg:flex-row md:items-center md:justify-end gap-2">
//                           <button
//                             className="text-gray-600 hover:text-blue-600 flex items-center ml-2"
//                             onClick={handleRemoveClick}
//                           >
//                             <FaTrashAlt className="mr-1" />
//                             <span className="text-sm font-semibold">
//                               Remove
//                             </span>
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="md:col-span-1 flex justify-end mt-4">
//               <button
//                 type="submit"
//                 className="mt-0 flex w-full items-center justify-center rounded-md border border-transparent bg-[#fb641b] px-8 py-3 text-base font-medium text-white hover:bg-[#e55b19] focus:outline-none focus:ring-2 focus:ring-[#e56d33] focus:ring-offset-2"
//               >
//                 <span>Place Order</span>{" "}
//               </button>
//             </div>
//           </div>

//           {/* Price Details */}
//           <div className="flex flex-row  ">
//             <div className="border border-gray-200 rounded-lg p-4 mb-4 shadow-md md:col-span-2 w-full h-fit ">
//               <div className="font-bold mb-4 text-lg">Price details</div>
//               <div className="flex justify-between mb-2">
//                 <div>Price (1 item)</div>
//                 <div className="font-bold">₹1,499</div>
//               </div>
//               <div className="flex justify-between mb-2">
//                 <div>Discount</div>
//                 <div className="text-red-600 font-bold">− ₹1,100</div>
//               </div>
//               <div className="flex justify-between mb-2">
//                 <div>Delivery Charges</div>
//                 <div className="text-green-600 font-bold">Free</div>
//               </div>
//               <hr className="my-2" />
//               <div className="flex justify-between">
//                 <div className="font-bold">Total Amount</div>
//                 <div className="text-green-600 font-bold">₹399</div>
//               </div>
//               <div className="text-xs text-gray-500 mt-2">
//                 You will save ₹1,100 on this order
//               </div>

//               <div className="flex items-center justify-start mt-4 sm:mt-10">
//                 <span className="mr-2">
//                   <AiFillSafetyCertificate
//                     fontSize={40}
//                     color="green"
//                     className="text-center"
//                   />
//                 </span>
//                 <div className="text-md font-bold text-[#878787] sm:text-xs  md:text-sm lg:text-md">
//                   <div className="whitespace-normal">
//                     Safe and Secure Payments. Easy returns.
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CartPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Navbar from "../navbar/Navbar";
// import API_BASE_URL from "@/apiConfig";
// import { FaTrashAlt } from "react-icons/fa";

// interface CartItemProps {
//   images: string;
//   name: string;
//   size: string;
//   originalPrice: number;
//   discountedPrice: number;
//   discount: string;
//   deliveryDate: string;
//   _id: string;
//   quantity: number;
// }

// interface Props {
//   userId: string;
// }

// const CartPage: React.FC<Props> = ({ userId }) => {
//   const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchCartItems = async () => {
//       try {
//         const response = await axios.get(
//           `${API_BASE_URL}/api/carts/products/667be96a1912e70bb1b8ba44`
//         );
//         setCartItems(response.data.carts);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching cart items:", error);
//         setError("Error fetching cart items. Please try again later.");
//         setLoading(false);
//       }
//     };

//     fetchCartItems();
//   }, [userId]); // Include userId in the dependency array to refetch when it changes

//   const handleRemoveClick = (itemId: string) => {
//     // Implement logic to remove item from cart
//     console.log("Remove item with ID:", itemId);
//     // Example: Update state after removal
//     const updatedCartItems = cartItems.filter((item) => item._id !== itemId);
//     setCartItems(updatedCartItems);
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="px-4 py-8 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl mx-auto bg-gray-50">
//         <h2 className="text-3xl font-bold mb-4">View Your Cart</h2>
//         {loading ? (
//           <p>Loading...</p>
//         ) : error ? (
//           <p>{error}</p>
//         ) : (
//           <div className="grid grid-cols-1  md:grid-cols-2 gap-4 bg-white  h-fit">
//             {/* Product Image */}
//             <div className="flex flex-col  ">
//               <div className="border-2 border-gray-200 p-2 rounded-sm overflow-y-auto scroll-hide h-96 ">
//                 {cartItems.map((item, index) => (
//                   <div
//                     key={index}
//                     className="border border-gray-200 rounded-lg p-4 mb-4 shadow-md"
//                   >
//                     <div className="flex flex-col md:flex-row sm:flex-row">
//                       <div className="md:mr-4 mb-4 md:mb-0 w-fit">
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
//                           {/* <div className="text-sm text-gray-600 mb-2">
//                         {item.size}
//                       </div> */}
//                           <div className="text-sm text-gray-600 mb-2">
//                             {item.quantity}
//                           </div>
//                           <div className="flex items-center mb-2">
//                             <span className="text-green-600 font-bold mr-1">
//                               ₹900{item.discountedPrice}
//                             </span>
//                             <span className="text-gray-400 line-through">
//                               ₹1000{item.originalPrice}
//                             </span>
//                             <span className="text-green-600 ml-2">
//                               10%{item.discount}
//                             </span>
//                           </div>
//                         </div>
//                         <div className="flex items-center justify-between mt-4">
//                           <div className="text-sm flex sm:flex-col md:flex-col lg:flex-row md:items-center md:justify-end gap-2">
//                             <button
//                               className="text-gray-600 hover:text-blue-600 flex items-center"
//                               onClick={() => handleRemoveClick(item._id)}
//                             >
//                               <FaTrashAlt className="mr-1" />
//                               <span className="text-sm font-semibold">
//                                 Remove
//                               </span>
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}

//               </div>
//               <div className="md:col-span-1 flex justify-end mt-4">
//               <button
//                 type="submit"
//                 className="mt-0 flex w-full items-center justify-center rounded-md border border-transparent bg-[#fb641b] px-8 py-3 text-base font-medium text-white hover:bg-[#e55b19] focus:outline-none focus:ring-2 focus:ring-[#e56d33] focus:ring-offset-2"
//               >
//                 <span>Place Order</span>{" "}
//               </button>
//             </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default CartPage;

"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import Navbar from "../navbar/Navbar";
import API_BASE_URL from "@/apiConfig";
import Cookies from "universal-cookie";

interface CartItemProps {
  images: string;
  name: string;
  size: string;
  originalPrice: number;
  discountedPrice: number;
  discount: string;
  deliveryDate: string;
  _id: string;
  quantity: number;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cookies = new Cookies();
  const userId = cookies.get("userId");

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/carts/products/${userId}`
        );
        setCartItems(response.data.carts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setError("Error fetching cart items. Please try again later.");
        setLoading(false);
      }
    };

    if (userId) {
      fetchCartItems();
    } else {
      setLoading(false);
      setError("User not logged in."); // Handle error if userId cookie is not set
    }
  }, [userId]);

  const handleRemoveClick = (itemId: string) => {
    // Implement logic to remove item from cart
    console.log("Remove item with ID:", itemId);
    // Example: Update state after removal
    const updatedCartItems = cartItems.filter((item) => item._id !== itemId);
    setCartItems(updatedCartItems);
  };

  const handleIncrement = (itemId: string) => {
    // Implement logic to increment item quantity
    const updatedCartItems = cartItems.map((item) =>
      item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
  };

  const handleDecrement = (itemId: string) => {
    // Implement logic to decrement item quantity
    const updatedCartItems = cartItems.map((item) =>
      item._id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCartItems);
  };

  const handleCheckout = () => {
    // Implement checkout logic here
    console.log("Proceeding to checkout...");
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.discountedPrice * item.quantity,
    0
  );

  return (
    <>
      <Navbar />
      <div className="px-4 py-8 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl mx-auto bg-gray-50">
        <h2 className="text-3xl font-bold mb-4">View Your Cart</h2>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : cartItems.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1  md:grid-cols-2 gap-4 bg-white  h-fit">
            {/* Product Image */}
            <div className="flex flex-col  ">
              <div className="border-2 border-gray-200 p-2 rounded-sm overflow-y-auto scroll-hide h-96 ">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 mb-4 shadow-md"
                  >
                    <div className="flex flex-col md:flex-row sm:flex-row">
                      <div className="md:mr-4 mb-4 md:mb-0 w-fit">
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
                              ₹{item.discountedPrice}
                            </span>
                            <span className="text-gray-400 line-through">
                              ₹{item.originalPrice}
                            </span>
                            <span className="text-green-600 ml-2">
                              {item.discount}
                            </span>
                          </div>
                          <div className="flex items-center mt-4">
                            <button
                              className="text-gray-600 hover:text-blue-600 flex items-center mr-2"
                              onClick={() => handleDecrement(item._id)}
                            >
                              <span className="text-sm font-semibold">-</span>
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              className="text-gray-600 hover:text-blue-600 flex items-center ml-2"
                              onClick={() => handleIncrement(item._id)}
                            >
                              <span className="text-sm font-semibold">+</span>
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="text-sm flex sm:flex-col md:flex-col lg:flex-row md:items-center md:justify-end gap-2">
                            <button
                              className="text-gray-600 hover:text-blue-600 flex items-center"
                              onClick={() => handleRemoveClick(item._id)}
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
                ))}
              </div>
              <div className="md:col-span-1 flex justify-end mt-4">
                <button
                  type="submit"
                  className="mt-0 flex w-full items-center justify-center rounded-md border border-transparent bg-[#fb641b] px-8 py-3 text-base font-medium text-white hover:bg-[#e55b19] focus:outline-none focus:ring-2 focus:ring-[#e56d33] focus:ring-offset-2"
                >
                  <span>Place Order</span>{" "}
                </button>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-md w-full">
                <h3 className="text-xl font-bold mb-2">Price Details</h3>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Total Price:</span>
                  <span className="text-green-600 font-bold">
                    ₹{totalPrice}
                  </span>
                </div>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 focus:bg-blue-400 focus:outline-none"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
