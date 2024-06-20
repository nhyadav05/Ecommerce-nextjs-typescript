"use client";

import React, { useState } from "react";
interface Product {
  id: number;
  name: string;
  category: string;
  title: string;
  imageSrc: string;
  description: string;
  price: number;
  discountPrice: number;
  offer: string;
  ratings: number;
  reviews: number;
  availableOffers: string[];
  additionalImages: string[]; // Example: array of additional image URLs
}

const ProductDetails: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const availableSizes = ["4", "5", "6", "7", "8", "9", "10", "11"]; // Example of available sizes

  const handleColorChange = (colorValue: any) => {
    setSelectedColor(colorValue);
    console.log(colorValue, "colorValue");
  };

  const handleSizeChange = (sizeValue: any) => {
    setSelectedSize(sizeValue);
    console.log(sizeValue, "sizeValue");
  };

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const product: Product = {
    id: 2,
    name: "Women's Sandal",
    category: "Footwear",
    title: "Women's Pink Heels Sandal",
    imageSrc: "/product/sandal.webp",
    description: "Comfortable sandals for women, suitable for casual wear.",
    price: 799,
    discountPrice: 599,
    offer: "25% off",
    ratings: 4.1,
    reviews: 231,
    availableOffers: [
      "Get ₹50 instant discount on first Flipkart UPI transaction on order of ₹200 and above T&C",
      "5% Cashback on Flipkart Axis Bank Card T&C",
      "10% off up to ₹1250 on HDFC Bank Credit Card EMI Txns, Tenure: 6 months, Min Txn Value: ₹7500 T&C",
      "Get extra 33% off (price inclusive of cashback/coupon) T&C",
      "+14 more offers",
      "10% off up to ₹1750 on HDFC Bank Debit Card EMI Txns, Tenure: 9 and 12 months, Min Txn Value: ₹5000",
    ],
    additionalImages: [
      "/product/shoetopia-green.webp",
      "/product/tokyo-talkies-tan.webp",
      "/product/sandal.webp",
      "/product/black-sandal.webp",
      "/product/slipper.webp",
      "/product/tokyo-talkies-tan.webp",
    ],
  };

  return (
    <div className="px-4 py-8 md:py-3 mt-8 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl mx-auto">
      <h1 className="text-4xl font-bold mb-4"> Product Details </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Product Image Section */}
        <div>
          {/* Main Product Image */}
          <img
            src={product.additionalImages[selectedImageIndex]}
            alt={product.name}
            className="w-full object-contain rounded-lg shadow-md mb-4"
          />
          {/* Additional Images */}
          <div className="flex  mb-4 gap-2 overflow-x-auto">
            {product.additionalImages.map((imgSrc, index) => (
              <img
                key={index}
                src={imgSrc}
                alt={`Product ${index + 1}`}
                className="w-[30%] md:w-[20%]  object-cover shadow-md cursor-pointer"
                onClick={() => handleImageClick(index)}
              />
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="md:p-8">
          <i className="fa-solid fa-share"></i>
          <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
          <p className="text-gray-700 mb-2">{product.description}</p>
          <p className="text-green-600 font-semibold mb-4">{product.offer}</p>
          <p className="text-gray-800 font-semibold mb-4">
            Special Price: ₹{product.price}
          </p>
          <p className="text-gray-600 mb-4 line-through">
            Original Price: ₹{product.discountPrice}
          </p>

          {/* Ratings and Reviews */}
          <div className="flex items-center mb-4">
            <div className="bg-[#26a541] rounded-full h-8 w-8 flex items-center justify-center mr-2">
              <span className="text-white font-bold">{product.ratings}</span>
            </div>
            <p className="text-gray-600">
              {product.ratings} ({product.reviews} ratings and {product.reviews}{" "}
              reviews)
            </p>
          </div>

          {/* Available Offers */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Available Offers</h3>
            <ul className="list-disc list-inside text-gray-600">
              {product.availableOffers.map((offer, index) => (
                <li key={index}>
                  <text className="font-bold text-black-500 text-[0.875rem]">
                    Bank Offer{" "}
                  </text>{" "}
                  <text className="text-[0.785rem]">{offer}</text>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            {/* Color Selection */}
            <div>
              <h2 className="text-md font-semibold text-gray-900">Color</h2>
              <fieldset aria-label="Choose a color" className="mt-4">
                <div className="flex items-center space-x-3">
                  {[
                    { label: "White", value: "White", bgColor: "bg-white" },
                    { label: "Gray", value: "Gray", bgColor: "bg-gray-200" },
                    { label: "Black", value: "Black", bgColor: "bg-gray-900" },
                  ].map((color, index) => (
                    <label
                      key={index}
                      aria-label={color.label}
                      className={`relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 border-gray-400 focus:outline-none w-[60px] h-[70px] ${
                        selectedColor === color.value
                          ? "  rounded-full w-[60px] h-[60px]  border border-blue-700"
                          : ""
                      }`}
                      onClick={() => handleColorChange(color.value)}
                    >
                      <input
                        type="radio"
                        name="color-choice"
                        value={color.value}
                        className="sr-only"
                      />
                      <span
                        aria-hidden="true"
                        className={`h-8 w-8 rounded-full border border-black border-opacity-10 ${color.bgColor}`}
                      ></span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            {/* Size Selection */}
            <div className="mt-10">
              <div className="flex items-center justify-between">
                <h2 className="text-md font-semibold text-gray-900">
                  Size - UK/India
                </h2>
                <span className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  Size guide
                </span>
              </div>

              <fieldset aria-label="Choose a size" className="mt-4">
                <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-8">
                  {["4", "5", "6", "7", "8", "9", "10", "11"].map(
                    (size, index) =>
                      availableSizes.includes(size) ? (
                        <label
                          key={index}
                          className={`group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium uppercase text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 w-16 h-14 ${
                            selectedSize === size ? "border-blue-500" : ""
                          }`}
                          onClick={() => handleSizeChange(size)}
                        >
                          <input
                            type="radio"
                            name="size-choice"
                            value={size}
                            className="sr-only"
                          />
                          <span>{size}</span>
                          <span
                            className="pointer-events-none absolute -inset-px rounded-md"
                            aria-hidden="true"
                          ></span>
                        </label>
                      ) : (
                        <label
                          key={index}
                          className="group relative flex cursor-not-allowed items-center justify-center rounded-md border bg-gray-50 px-4 py-3 text-sm font-medium uppercase text-gray-200 hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                        >
                          <input
                            type="radio"
                            name="size-choice"
                            value={size}
                            disabled
                            className="sr-only"
                          />
                          <span>{size}</span>
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                          >
                            <svg
                              className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                              viewBox="0 0 100 100"
                              preserveAspectRatio="none"
                              stroke="currentColor"
                            >
                              <line
                                x1="0"
                                y1="100"
                                x2="100"
                                y2="0"
                                vectorEffect="non-scaling-stroke"
                              />
                            </svg>
                          </span>
                        </label>
                      )
                  )}
                </div>
              </fieldset>
            </div>

            <button
              type="submit"
              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
