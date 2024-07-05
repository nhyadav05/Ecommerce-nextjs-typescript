"use client";
// components/Card.tsx

import { HeartIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

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

const Card: React.FC<CardProps> = ({
  imageSrc,
  name,
  title,
  category,
  description,
  price,
  discountPrice,
  offer,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  return (
    <div className="bg-white shadow-lg overflow-hidden relative ">
       
       <div className="p-4">
      <div className="relative">
        <img
          src={imageSrc}
          alt={name}
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
            {title || name}
          </p>
        </h2>

        <p className="text-gray-700 mb-2 text-md">{category}</p>
        {description && (
          <p className="text-md text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis">
            {description}
          </p>
        )}

        <div className="flex gap-2 items-center mt-4">
          <div className="text-gray-900 font-bold text-lg">₹{price}</div>
          <del className="text-gray-400 font-bold text-sm">
            ₹{discountPrice}
          </del>
          {offer && (
            <div className="text-sm font-bold text-[#22c722]">{offer}</div>
          )}
        </div>
      </div>
  
      <div className="p-4">
        <button className="mt-4 px-4 py-2 w-full bg-blue-600 text-white font-bold rounded-md hover:bg-blue-500 focus:bg-blue-400 focus:outline-none">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;


// // components/Card.tsx
// "use client"
// import { HeartIcon } from "@heroicons/react/24/outline";
// import React, { useState } from "react";
// import Link from "next/link";

// interface CardProps {
//   images: string;
//   name: string;
//   title: string;
//   category: string;
//   description?: string;
//   price: number;
//   discountPrice: number;
//   offer: string;
//   productId: string;
// }

// const Card: React.FC<CardProps> = ({
//   images,
//   name,
//   title,
//   category,
//   description,
//   price,
//   discountPrice,
//   offer,
//   productId
// }) => {
//   const [showTooltip, setShowTooltip] = useState(false);

//   const toggleTooltip = () => {
//     setShowTooltip(!showTooltip);
//   };

//   const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.stopPropagation(); // Prevent parent click event (e.g., Link) from triggering
//     // Add to cart logic here
//     console.log(`Added ${name} to cart`);
//   };

//     // Function to handle image loading errors
//     const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
//       event.currentTarget.src = "/no-product-found.png"; // Set default image path
//     };
  

//   return (
//     <div className="bg-white shadow-lg overflow-hidden relative">
//       <Link href={`/product/${productId}`}>
    
//           <div className="p-4">
//             <div className="relative">
//               <img
//                 src={images}
//                 alt={name}
//                 className="w-full h-64 object-cover object-center transition-transform duration-300 transform hover:scale-105"
//                 onError={handleImageError} // Handle image load error
//               />
//               <button
//                 className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 focus:outline-none"
//                 onClick={toggleTooltip}
//               >
//                 <HeartIcon className="h-6 w-6 text-gray-600" />
//               </button>
//             </div>
//             <h2 className="text-xl font-semibold mb-2">
//               <p className="text-gray-700 hover:text-blue-600 whitespace-nowrap overflow-hidden text-ellipsis">
//                 {title || name}
//               </p>
//             </h2>

//             <p className="text-gray-700 mb-2 text-md">{category}</p>
//             {description && (
//               <p className="text-md text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis">
//                 {description}
//               </p>
//             )}

//             <div className="flex gap-2 items-center mt-4">
//               <div className="text-gray-900 font-bold text-lg">₹{price}</div>
//               <del className="text-gray-400 font-bold text-sm">
//                 ₹{discountPrice}
//               </del>
//               {offer && (
//                 <div className="text-sm font-bold text-[#22c722]">{offer}</div>
//               )}
//             </div>
//           </div>
        
//       </Link>
//       <div className="p-4">
//         <button
//           className="mt-4 px-4 py-2 w-full bg-blue-600 text-white font-bold rounded-md hover:bg-blue-500 focus:bg-blue-400 focus:outline-none"
//           onClick={handleAddToCart}
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Card;
