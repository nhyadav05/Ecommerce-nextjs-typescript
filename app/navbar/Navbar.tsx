// // Navbar.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import { FaUserCircle } from "react-icons/fa";
// import { FiShoppingCart } from "react-icons/fi";
// import { PiTruck } from "react-icons/pi";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import SearchInput from "../components/searchInput";
// import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
// import Cookies from "universal-cookie";

// import {useSelector } from "react-redux";
// import { selectCartItems } from '../redux/features/cartSlice';


// const Navbar: React.FC = () => {
//   const router = useRouter();
//   const [cartCount, setCartCount] = useState<number>(0);
//   const cookies = new Cookies();
//   const cartItems = useSelector(selectCartItems);

//   const handleSearch = (searchTerm: string) => {
//     console.log("Searching for:", searchTerm);
//   };

//   useEffect(() => {
//     const count =
//       cartItems.length > 0
//         ? cartItems.reduce((acc: number, item: any) => acc + item.quantity, 0)
//         : 0;
//     setCartCount(count);
//   }, [cartItems]);
  

//   const handleLogout = () => {
//     cookies.remove("loggedin");
//     router.push("/");
//   };

//   return (
//     <nav className="bg-blue-600 px-4 sm:px-8 py-3 md:py-4">
//       {/* Desktop View */}
//       <div className="hidden md:flex items-center justify-between max-w-7xl mx-auto">
//         {/* Logo and Company Name */}
//         <div className="flex items-center gap-4">
//           <Link href="/home">
//             <PiTruck className="h-10 w-10 text-slate-200 rounded-full hover:text-slate-400 focus:outline-none transition duration-150 ease-in-out" />
//           </Link>
//           <Link href="/home">
//             <h1 className="text-white text-sm sm:text-xl  md:text-2xl lg:text-3xl  font-semibold ml-2 cursor-pointer">
//               Apna Store
//             </h1>
//           </Link>
//         </div>

//         {/* Search Input */}
//         <div className="flex-1 ml-6 max-w-sm">
//           <SearchInput onSearch={handleSearch} />
//         </div>

//         {/* Icons */}
//         <div className="flex items-center space-x-10">
//           <div className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 focus:outline-none">
//             <Link href="/wishlist">
//               <HeartSolidIcon className="h-5 w-5 text-red-500" />
//             </Link>
//           </div>

//           {/* User Circle Icon */}
//           <FaUserCircle
//             className="text-white text-3xl cursor-pointer"
//             onClick={handleLogout}
//           />

//           {/* Shopping Cart Icon with Badge */}
//           <div className="relative">
//             <Link href="/cart">
//               <FiShoppingCart
//                 className="text-white text-2xl cursor-pointer"
//                 href="/cart"
//               />
//               {cartCount > 0 ? (
//                 <button className="absolute top-[-0.75rem] right-[-15px] rounded-full w-6 h-6 bg-red-600 hover:bg-red-500 focus:bg-red-500 focus:outline-none">
//                   <span className="text-xs font-bold text-white">
//                     {cartCount}
//                   </span>
//                 </button>
//               ) : null}
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Mobile View */}
//       <div className="md:hidden flex items-center justify-between max-w-7xl mx-auto px-4">
//         {/* Logo and Company Name */}
//         <div className="flex items-center">
//           <Link href="/home">
//             <PiTruck className="h-10 w-10 text-slate-200 rounded-full hover:text-slate-400 focus:outline-none transition duration-150 ease-in-out" />
//           </Link>
//           <Link href="/home">
//             <h1 className="text-white text-sm sm:text-xl  md:text-2xl lg:text-3xl font-semibold ml-2 cursor-pointer">
//               Apna Store
//             </h1>
//           </Link>
//         </div>

//         {/* Icons */}
//         <div className="flex items-center space-x-4">
//           <div className="p-0.5 rounded-full bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 focus:outline-none">
//             <Link href="/wishlist">
//               <HeartSolidIcon className="h-5 w-5 text-red-500" />
//             </Link>
//           </div>

//           <FaUserCircle
//             className="text-white text-2xl cursor-pointer"
//             onClick={handleLogout}
//           />
//           <div className="relative">
//             <Link href="/cart">
//               <FiShoppingCart className="text-white text-2xl cursor-pointer" />
//               {cartCount > 0 ? (
//                 <button className="absolute top-[-0.75rem] right-[-0.75rem] rounded-full w-6 h-6 bg-red-600 hover:bg-red-500 focus:bg-red-500 focus:outline-none">
//                   <span className="text-xs font-bold text-white">
//                     {cartCount}
//                   </span>
//                 </button>
//               ) : null}
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Common Search Input for Mobile and Desktop */}
//       <div className="mt-3 md:hidden max-w-sm mx-auto px-4">
//         <SearchInput onSearch={handleSearch} />
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// Navbar.tsx
"use client";
import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { PiTruck } from "react-icons/pi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SearchInput from "../components/searchInput";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import Cookies from "universal-cookie";

const Navbar: React.FC = () => {
  const router = useRouter();
  const [cartCount, setCartCount] = useState<number>(0);
  const cookies = new Cookies();
  const cartItems = cookies.get("cartItems") || [];
  const handleSearch = (searchTerm: string) => {
    console.log("Searching for:", searchTerm);
  };

  useEffect(() => {
    const count = cartItems.reduce((acc:any, item:any) => acc + item.quantity, 0);
    setCartCount(count);
  }, [cartItems]);

  const handleLogout = () => {
    cookies.remove("loggedin");
    router.push("/");
  };

  return (
    <nav className="bg-blue-600 px-4 sm:px-8 py-3 md:py-4">
      {/* Desktop View */}
      <div className="hidden md:flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo and Company Name */}
        <div className="flex items-center gap-4">
          <Link href="/home">
            <PiTruck className="h-10 w-10 text-slate-200 rounded-full hover:text-slate-400 focus:outline-none transition duration-150 ease-in-out" />
          </Link>
          <Link href="/home">
            <h1 className="text-white text-sm sm:text-xl  md:text-2xl lg:text-3xl  font-semibold ml-2 cursor-pointer">
              Apna Store
            </h1>
          </Link>
        </div>

        {/* Search Input */}
        <div className="flex-1 ml-6 max-w-sm">
          <SearchInput onSearch={handleSearch} />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-10">
          <div className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 focus:outline-none">
            <Link href="/wishlist">
              <HeartSolidIcon className="h-5 w-5 text-red-500" />
            </Link>
          </div>

          {/* User Circle Icon */}
          <FaUserCircle
            className="text-white text-3xl cursor-pointer"
            onClick={handleLogout}
          />

          {/* Shopping Cart Icon with Badge */}
          <div className="relative">
            <Link href="/cart">
              <FiShoppingCart
                className="text-white text-2xl cursor-pointer"
                href="/cart"
              />
              {cartCount > 0 ? (
                <button className="absolute top-[-0.75rem] right-[-15px] rounded-full w-6 h-6 bg-red-600 hover:bg-red-500 focus:bg-red-500 focus:outline-none">
                  <span className="text-xs font-bold text-white">
                    {cartCount}
                  </span>
                </button>
              ) : null}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex items-center justify-between max-w-7xl mx-auto px-4">
        {/* Logo and Company Name */}
        <div className="flex items-center">
          <Link href="/home">
            <PiTruck className="h-10 w-10 text-slate-200 rounded-full hover:text-slate-400 focus:outline-none transition duration-150 ease-in-out" />
          </Link>
          <Link href="/home">
            <h1 className="text-white text-sm sm:text-xl  md:text-2xl lg:text-3xl font-semibold ml-2 cursor-pointer">
              Apna Store
            </h1>
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <div className="p-0.5 rounded-full bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 focus:outline-none">
            <Link href="/wishlist">
              <HeartSolidIcon className="h-5 w-5 text-red-500" />
            </Link>
          </div>

          <FaUserCircle
            className="text-white text-2xl cursor-pointer"
            onClick={handleLogout}
          />
          <div className="relative">
            <Link href="/cart">
              <FiShoppingCart className="text-white text-2xl cursor-pointer" />
              {cartCount > 0 ? (
                <button className="absolute top-[-0.75rem] right-[-0.75rem] rounded-full w-6 h-6 bg-red-600 hover:bg-red-500 focus:bg-red-500 focus:outline-none">
                  <span className="text-xs font-bold text-white">
                    {cartCount}
                  </span>
                </button>
              ) : null}
            </Link>
          </div>
        </div>
      </div>

      {/* Common Search Input for Mobile and Desktop */}
      <div className="mt-3 md:hidden max-w-sm mx-auto px-4">
        <SearchInput onSearch={handleSearch} />
      </div>
    </nav>
  );
};

export default Navbar;
