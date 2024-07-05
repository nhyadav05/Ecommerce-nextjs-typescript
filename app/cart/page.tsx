"use client";
// pages/cart.tsx
import React, { useState } from "react";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import Navbar from "../navbar/Navbar";

interface CartItemProps {
  imageUrl: string;
  title: string;
  size: string;
  originalPrice: number;
  discountedPrice: number;
  discount: string;
  deliveryDate: string;
}

const CartPage: React.FC = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemProps[]>([
    {
      imageUrl: "product/tokyo-talkies-tan.webp",
      title: "Product 1",
      size: "M",
      originalPrice: 1500,
      discountedPrice: 1200,
      discount: "20% off",
      deliveryDate: "20 June 2024",
    },
    {
      imageUrl: "product/window-curtain.webp",
      title: "Product 2",
      size: "L",
      originalPrice: 1800,
      discountedPrice: 1500,
      discount: "15% off",
      deliveryDate: "22 June 2024",
    },
    {
      imageUrl: "product/buddhamonk.webp",
      title: "Product 2",
      size: "2",
      originalPrice: 1800,
      discountedPrice: 1500,
      discount: "15% off",
      deliveryDate: "22 June 2024",
    },

    {
      imageUrl: "product/slipper.webp",
      title: "Product 2",
      size: "L",
      originalPrice: 1800,
      discountedPrice: 1500,
      discount: "15% off",
      deliveryDate: "22 June 2024",
    },
    {
      imageUrl: "jewellry/braclet.webp",
      title: "Product 2",
      size: "L",
      originalPrice: 1800,
      discountedPrice: 1500,
      discount: "15% off",
      deliveryDate: "22 June 2024",
    },
    // Add more products as needed
  ]);

  const handleSaveToggle = () => {
    setIsSaved(!isSaved); // Toggle the saved state
  };

  const handleRemoveClick = () => {
    console.log("Item removed");
  };
  const [count, setCount] = useState(1);

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const increment = () => {
    setCount(count + 1);
  };

  const handleChange = (event: any) => {
    const value = event.target.value;
    if (!isNaN(value) && value !== "") {
      setCount(parseInt(value));
    }
  };
  return (
    <>
      <Navbar />
      <div className="px-4 py-8 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl mx-auto bg-gray-50">
        <h2 className="text-3xl font-bold mb-4">View Your Cart</h2>
        <div className="grid grid-cols-1  md:grid-cols-2 gap-4 bg-white  h-fit">
          {/* Product Image */}
          <div className="flex flex-col  ">
            <div className="border-2 border-gray-200 p-2 rounded-sm overflow-y-auto scroll-hide h-96 ">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 mb-4 shadow-md "
                >
                  <div className="flex flex-col md:flex-row sm:flex-row">
                    <div className="md:mr-4 mb-4 md:mb-0 w-fit">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-28 h-28 md:w-36 md:h-36 object-contain"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="sm:flex-col sm:gap-4">
                        {" "}
                        <div className="font-bold mb-2">
                          <span className="text-gray-900 hover:text-blue-600">
                            {item.title}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mb-2 ">
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
                      </div>

                      {/* Quantity Selector and Actions */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center">
                          <button
                            className="border border-gray-300 px-2 py-1  mr-2"
                            onClick={decrement}
                          >
                            -
                          </button>
                          <input
                            type="tel"
                            className="border border-gray-300 focus:border-blue-600 hover:border-blue-600 px-2 py-1 w-20 text-center"
                            value={count}
                            onChange={handleChange}
                          />

                          <button
                            className="border border-gray-300 px-2 py-1  ml-2"
                            onClick={increment}
                          >
                            +
                          </button>
                        </div>
                        <div className="text-sm flex sm:flex-col  md:flex-col lg:flex-row md:items-center md:justify-end gap-2">
                          <button
                            className="text-gray-600 hover:text-blue-600 flex items-center ml-2"
                            onClick={handleRemoveClick}
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

          {/* Price Details */}
          <div className="flex flex-row  ">
            <div className="border border-gray-200 rounded-lg p-4 mb-4 shadow-md md:col-span-2 w-full h-fit ">
              <div className="font-bold mb-4 text-lg">Price details</div>
              <div className="flex justify-between mb-2">
                <div>Price (1 item)</div>
                <div className="font-bold">₹1,499</div>
              </div>
              <div className="flex justify-between mb-2">
                <div>Discount</div>
                <div className="text-red-600 font-bold">− ₹1,100</div>
              </div>
              <div className="flex justify-between mb-2">
                <div>Delivery Charges</div>
                <div className="text-green-600 font-bold">Free</div>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between">
                <div className="font-bold">Total Amount</div>
                <div className="text-green-600 font-bold">₹399</div>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                You will save ₹1,100 on this order
              </div>

              <div className="flex items-center justify-start mt-4 sm:mt-10">
                <span className="mr-2">
                  <AiFillSafetyCertificate
                    fontSize={40}
                    color="green"
                    className="text-center"
                  />
                </span>
                <div className="text-md font-bold text-[#878787] sm:text-xs  md:text-sm lg:text-md">
                  <div className="whitespace-normal">
                    Safe and Secure Payments. Easy returns.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
