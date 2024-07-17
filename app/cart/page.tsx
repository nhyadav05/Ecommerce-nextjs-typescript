"use client";

import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
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
  const [inputBorderColor] = useState<string>("border-gray-200");
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
     <h2 className="mb-8 text-center ">Just relax, let us help you find some first-class products</h2>

       
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <Link href="/home">Start Shopping</Link>
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
