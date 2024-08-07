// app/product/[productDetails]/page.tsx

"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import API_BASE_URL from "../../apiConfig"; // Assuming this is correctly defined elsewhere
import Navbar from "../navbar/Navbar"; // Assuming the Navbar component is correctly imported
import Cookies from "universal-cookie";
import Loader from "../components/loader";

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
  outOfStock: boolean;
}

const ProductDetailPages: React.FC<{ params: any }> = ({ params }) => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const { productDetails } = params;
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [product, setProduct] = useState<Product | null>(null);
  const cookies = new Cookies();
  const userId = cookies.get("userId");
  console.log(userId);
  // let productId = "6683efa379d94a75b5d0f252";

  useEffect(() => {
    // const userId = cookies.get("userId");
    // Fetch product details from API
    axios
      .get(`${API_BASE_URL}/api/products/${productId}`)
      .then((response) => {
        const apiProduct = response.data;
        const formattedProduct: Product = {
          id: apiProduct._id,
          name: apiProduct.name,
          category: apiProduct.categoryId.name,
          title: apiProduct.name,
          imageSrc: apiProduct.images[0], // Assuming first image as main image
          description: apiProduct.description || "Description not available",
          price: apiProduct.price,
          discountPrice: apiProduct.discountPrice || 0,
          offer: apiProduct.offer || "",
          ratings: apiProduct.ratings || 0,
          reviews: apiProduct.reviews || 0,
          outOfStock: apiProduct.outOfStock,
        };
        console.log(response, "response");
        setProduct(formattedProduct);
      })
      .catch((error) => {
        console.error("Error fetching productDetails:", error);
        // Handle error state if needed
      });
  }, [productDetails]);

  const addToBag = (productId: number) => {
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

  const handleColorChange = (colorValue: string) => {
    setSelectedColor(colorValue);
  };

  const handleSizeChange = (sizeValue: string) => {
    setSelectedSize(sizeValue);
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  if (!product) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = "/no-product-found.png"; // Set default image path on error
  };

  return (
    <>
 <div className="px-4 py-4 md:py-3 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl mx-auto">
        <div className="text-left">
        <h1 className=" sm:text-xl md:text-3xl lg:text-4xl font-bold p-4">
            Product Details
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Product Image Section */}
          <div className="px-4 py-10 rounded-lg shadow-[0_2px_10px_-5px] relative">
            {/* Main Product Image */}
            <img
              src={product.imageSrc || "/no-product-found.png"}
              alt={product.name}
              onError={handleImageError}
              className={`mx-auto  object-cover lg:h-[500px] rounded-lg mb-4 transition-transform duration-300 transform hover:scale-105 ${
                product.outOfStock ? "grayscale" : ""
              }`}
            />
            {product.outOfStock && (
              <div className="absolute font-semibold inset-0 bg-gray-200 opacity-75 flex items-center justify-center">
                Out of Stock
              </div>
            )}
            {/* Additional Images (if available) */}
            {/* <div className="flex mb-4 gap-2 overflow-x-auto">
              {product.additionalImages.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc}
                  alt={`Product ${index + 1}`}
                  className="w-[30%] md:w-[20%] object-cover shadow-md cursor-pointer"
                  onClick={() => handleImageClick(index)}
                />
              ))}
            </div> */}
          </div>

          {/* Product Details Section */}
          <div className="md:p-8">
            <i className="fa-solid fa-share"></i>
            <h2 className="text-xl sm:text-md md:text-xl lg:text-2xl font-bold mb-4">
              {product.title}
            </h2>
            <p className="text-gray-700 text-xl sm:text-sm md:text-md lg:text-xl mb-2">
              {product.description}
            </p>
            <p className="text-green-600 font-semibold mb-4">{product.offer}</p>
            <p className="text-gray-800 font-semibold mb-4">
              Special Price: ₹{product.price}
            </p>
            {product.discountPrice > 0 && (
              <p className="text-gray-600 mb-4 line-through">
                Original Price: ₹{product.discountPrice}
              </p>
            )}
            <div className="flex items-center mb-4">
              <div className="bg-[#26a541] rounded-full h-8 w-8 flex items-center justify-center mr-2">
                <span className="text-white font-bold">{product.ratings}</span>
              </div>
              <p className="text-gray-600">
                {product.ratings} ({product.reviews} ratings and{" "}
                {product.reviews} reviews)
              </p>
            </div>
            {/* Color Selection */}
            <div className="mb-6">
              <h2 className="text-md font-semibold text-gray-900">Color</h2>
              <div className="flex items-center space-x-3 mt-2">
                {["White", "Gray", "Black"].map((color, index) => (
                  <label
                    key={index}
                    className={`relative flex cursor-pointer items-center justify-center rounded-full p-1 border-gray-400 focus:outline-none w-12 h-12 ${
                      selectedColor === color ? "border border-blue-700" : ""
                    }`}
                    onClick={() => handleColorChange(color)}
                  >
                    <input
                      type="radio"
                      name="color-choice"
                      value={color}
                      className="sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={`h-8 w-8 rounded-full border border-black border-opacity-10 ${
                        color === "White"
                          ? "bg-white"
                          : color === "Gray"
                          ? "bg-gray-200"
                          : "bg-gray-900"
                      }`}
                    ></span>
                  </label>
                ))}
              </div>
            </div>
            {/* Size Selection */}
            <div className="mb-6">
              <h2 className="text-md font-semibold text-gray-900">
                Size - UK/India
              </h2>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {["4", "5", "6", "7", "8", "9", "10", "11"].map(
                  (size, index) => (
                    <label
                      key={index}
                      className={`group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium uppercase ${
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
                    </label>
                  )
                )}
              </div>
            </div>
            {/* Add to Bag Button */}
            <button
              className={`mt-4 px-4 py-2 w-full font-bold rounded-md ${
                product.outOfStock
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-500 focus:bg-blue-400 focus:outline-none"
              }`}
              onClick={() => addToBag(product.id)}
              disabled={product.outOfStock}
            >
              {product.outOfStock ? "Out of Stock" : "Add to Bag"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPages;
