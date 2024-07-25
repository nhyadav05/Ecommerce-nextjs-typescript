
// Navbar.tsx
// Navbar.tsx
"use client"
import React,{useEffect} from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { PiTruck } from "react-icons/pi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SearchInput from "../components/searchInput";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import Cookies from "universal-cookie";
import { useSelector } from "react-redux";
import { fetchCartItems, selectCartItems } from "../redux/features/cartSlice";
import { useAppDispatch } from "../redux/hook";

const Navbar: React.FC = () => {
  const router = useRouter();
  const cookies = new Cookies();
  const dispatch =useAppDispatch();
  const cartItems = useSelector(selectCartItems);

  const handleSearch = (searchTerm: string) => {
    console.log("Searching for:", searchTerm);
  };
useEffect(()=>{
  fetchGetCart()
},[dispatch])

const fetchGetCart=()=>{
  dispatch(fetchCartItems())
}

  const handleLogout = () => {
    cookies.remove("loggedin");
    router.push("/");
  };

  // Calculate cart count based on cartItems
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-blue-600 px-4 sm:px-8 py-3 md:py-4">
      {/* Mobile View */}
      <div className=" flex items-center justify-between max-w-7xl mx-auto px-4">
        {/* Logo and Company Name */}
        <div className="flex items-center">
          <Link href="/home">
            <PiTruck className="h-10 w-10 text-slate-200 rounded-full hover:text-slate-400 focus:outline-none transition duration-150 ease-in-out" />
          </Link>
          <Link href="/home">
            <h1 className="text-white text-sm sm:text-xl md:text-2xl lg:text-3xl font-semibold ml-2 cursor-pointer">
              Apna Store
            </h1>
          </Link>
        </div>

      {/* Common Search Input for Mobile and Desktop */}
      <div className=" invisible md:visible max-w-sm mx-auto flex-1">
        <SearchInput onSearch={handleSearch} />
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
              {cartCount > 0 && (
                <button className="absolute top-[-0.75rem] right-[-0.75rem] rounded-full w-6 h-6 bg-red-600 hover:bg-red-500 focus:bg-red-500 focus:outline-none">
                  <span className="text-xs font-bold text-white">
                    {cartCount}
                  </span>
                </button>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Common Search Input for Mobile and Desktop */}
      <div className="visible md:hidden mt-3 max-w-sm mx-auto ">
        <SearchInput onSearch={handleSearch} />
      </div>
    </nav>
  );
};

export default Navbar;
