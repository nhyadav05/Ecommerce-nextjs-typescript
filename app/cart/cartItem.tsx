// components/CartItem.tsx
"use client";
import React, { useState } from "react";
import { FaRegHeart, FaHeart, FaTrashAlt } from "react-icons/fa";
interface CartItemProps {
  imageUrl: string;
  title: string;
  size: string;
  seller: string;
  originalPrice: number;
  discountedPrice: number;
  discount: string;
  deliveryDate: string;
}

const CartItem: React.FC<CartItemProps> = ({
  imageUrl,
  title,
  size,
  seller,
  originalPrice,
  discountedPrice,
  discount,
  deliveryDate,
}) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveToggle = () => {
    setIsSaved(!isSaved); // Toggle the saved state
  };

  const handleRemoveClick = () => {
    // Logic for removing the item (e.g., calling an API or updating state)
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
    //     <div className="border border-gray-200 rounded-lg p-4 mb-4 shadow-md">

    //       {/* Product Image and Details */}
    //       <div className="flex">
    //         <div className="mr-4">
    //           <img
    //             src={imageUrl}
    //             alt={title}
    //             className="w-28 h-28 object-contain"
    //           />
    //         </div>
    //         <div className="flex-1">
    //           <div className="font-bold mb-2">
    //             <text className="text-gray-900 hover:text-blue-600">{title}</text>
    //           </div>
    //           <div className="text-sm text-gray-600 mb-2">{size}</div>
    //           <div className="flex items-center text-sm text-gray-500 mb-2">
    //             Seller: {seller}
    //             <img
    //               src="//static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
    //               alt="Flipkart Assured"
    //               className="ml-2 h-4"
    //             />
    //           </div>
    //           <div className="flex items-center mb-2">
    //             <span className="text-green-600 font-bold mr-1">
    //               ₹{discountedPrice}
    //             </span>
    //             <span className="text-gray-400 line-through">₹{originalPrice}</span>
    //             <span className="text-green-600 ml-2">{discount}</span>
    //           </div>
    //           <div className="text-xs text-gray-500 mb-2">
    //             Delivery by {deliveryDate} | Free
    //           </div>
    //         </div>
    //       </div>

    //       {/* Quantity Selector and Actions */}
    //       <div className="flex items-center justify-between mt-4">
    //         <div className="flex items-center">
    //           <button className="border border-gray-300 px-2 py-1 rounded-lg mr-2"  onClick={decrement}>
    //             -
    //           </button>
    //           <input
    //         type="tel"
    //         className="border border-gray-300 px-2 py-1 w-20 text-center"
    //         value={count}
    //         onChange={handleChange}
    //       />
    //           <button className="border border-gray-300 px-2 py-1 rounded-lg ml-2"  onClick={increment}>
    //             +
    //           </button>
    //         </div>
    //         <div className="text-sm flex gap-2">
    //   <button className="text-gray-600 hover:text-blue-600 flex items-center">
    //     <span className="text-sm font-semibold">Save for later</span>
    //   </button>
    //   <button className="text-gray-600 hover:text-blue-600 flex items-center ml-2">
    //     <span className="text-sm font-semibold">Remove</span>
    //   </button>
    // </div>

    //       </div>
    //     </div>
    <div className="border border-gray-200 rounded-lg p-4 mb-4 shadow-md">
      {/* Product Image and Details */}
      <div className="flex flex-col md:flex-row">
        <div className="md:mr-4 mb-4 md:mb-0">
          <img
            src={imageUrl}
            alt={title}
            className="w-28 h-28 md:w-36 md:h-36 object-contain"
          />
        </div>
        <div className="flex-1">
          <div className="font-bold mb-2">
            <text className="text-gray-900 hover:text-blue-600">{title}</text>
          </div>
          <div className="text-sm text-gray-600 mb-2">{size}</div>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            Seller: {seller}
            <img
              src="//static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
              alt="Flipkart Assured"
              className="ml-2 h-4"
            />
          </div>
          <div className="flex items-center mb-2">
            <span className="text-green-600 font-bold mr-1">
              ₹{discountedPrice}
            </span>
            <span className="text-gray-400 line-through">₹{originalPrice}</span>
            <span className="text-green-600 ml-2">{discount}</span>
          </div>
          <div className="text-xs text-gray-500 mb-2">
            Delivery by {deliveryDate} | Free
          </div>
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
          {/* <button
            className="text-gray-600 hover:text-blue-600 flex items-center mb-2 md:mb-0 md:mr-2"
            onClick={handleSaveToggle}
          >
            {isSaved ? (
              <FaHeart className="mr-1 text-red-600" />
            ) : (
              <FaRegHeart className="mr-1" />
            )}
            <span className="text-sm font-semibold">
              {isSaved ? "Saved" : "Save for later"}
            </span>
          </button> */}
          <button
            className="text-gray-600 hover:text-blue-600 flex items-center ml-2"
            onClick={handleRemoveClick}
          >
            <FaTrashAlt className="mr-1" />
            <span className="text-sm font-semibold">Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
