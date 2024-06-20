// pages/cart.tsx

import CartItem from "./cartItem";
import React from "react";
import { AiFillSafetyCertificate } from "react-icons/ai";

const CartPage: React.FC = () => {
  return (
    <div className=" py-8">
      <div className="px-4 py-8 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl mx-auto bg-gray-50">
        <h2 className="text-3xl font-bold mb-4">View Your Cart</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white">
          {/* Cart Item */}

          <CartItem
            imageUrl="https://rukminim2.flixcart.com/image/224/224/xif0q/sandal/8/h/d/9-363-rindas-pink-original-imagrxhzh88bfa7f.jpeg?q=90"
            title="RINDAS Women Pink Heels"
            size="Size: 7"
            seller="VisvaTraders"
            originalPrice={1499}
            discountedPrice={399}
            discount="73% Off"
            deliveryDate="Fri Jun 21"
          />

          {/* Price Details */}
          <div className="border border-gray-200 rounded-lg p-4 mb-4 shadow-md md:col-span-1">
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
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Place Order Button */}
          <div className="md:col-span-1 flex justify-end">
            <button
              type="submit"
              className="mt-0 flex w-full items-center justify-center rounded-md border border-transparent bg-[#fb641b] px-8 py-3 text-base font-medium text-white hover:bg-[#e55b19] focus:outline-none focus:ring-2 focus:ring-[#e56d33] focus:ring-offset-2"
            >
              <span>Place Order</span>{" "}
            </button>
          </div>
          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-start">
              <span className="mr-2">
                <AiFillSafetyCertificate fontSize={40} color="#878787" />
              </span>
              <div className="text-md font-bold text-[#878787]">
                <p className="whitespace-normal md:whitespace-nowrap">
                  Safe and Secure Payments. Easy returns. 100% Authentic
                  products.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
