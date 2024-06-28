// Navbar.tsx
"use client"
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { PiTruck } from "react-icons/pi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SearchInput from "@/components/searchInput";

const Navbar: React.FC = () => {
  const handleSearch = (searchTerm: string) => {
    console.log("Searching for:", searchTerm);
    // Implement your search logic here
  };
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/");
  };


  return (
    <nav className="bg-blue-600 px-4 sm:px-8 py-3 md:py-4">
      {/* Desktop View */}
      <div className="hidden md:flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo and Company Name */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <PiTruck className="h-10 w-10 text-slate-200 rounded-full hover:text-slate-400 focus:outline-none transition duration-150 ease-in-out" />
          </Link>
          <Link href="/">
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
          {/* User Circle Icon */}
        <FaUserCircle className="text-white text-3xl cursor-pointer"  onClick={handleLogout}/>
         
          {/* Shopping Cart Icon with Badge */}
          <div className="relative">
            <Link href="/cart">
              <FiShoppingCart
                className="text-white text-2xl cursor-pointer"
                href="/cart"
              />
              <button className="absolute top-[-0.75rem] right-[-15px] rounded-full w-6 h-6 bg-red-600 hover:bg-red-500 focus:bg-red-500 focus:outline-none">
                <span className="text-xs font-bold text-white">0</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex items-center justify-between max-w-7xl mx-auto px-4">
        {/* Logo and Company Name */}
        <div className="flex items-center">
          <Link href="/">
            <PiTruck className="h-10 w-10 text-slate-200 rounded-full hover:text-slate-400 focus:outline-none transition duration-150 ease-in-out" />
            {/* <Image
        src="/Flipkart-Logo.png" // Note: Path is relative to the `public` directory
        alt="flipkart"
        width={50} // Adjust width and height as needed
        height={50}
        className=" text-slate-200 rounded-full hover:text-slate-400 focus:outline-none transition duration-150 ease-in-out"
      /> */}
          </Link>
          <Link href="/">
            <h1 className="text-white text-sm sm:text-xl  md:text-2xl lg:text-3xl font-semibold ml-2 cursor-pointer">
              Apna Store
            </h1>
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
         <FaUserCircle className="text-white text-2xl cursor-pointer"  onClick={handleLogout} />
          <div className="relative">
            <Link href="/cart">
              <FiShoppingCart className="text-white text-2xl cursor-pointer" />
              <button className="absolute top-[-0.75rem] right-[-0.75rem] rounded-full w-6 h-6 bg-red-600 hover:bg-red-500 focus:bg-red-500 focus:outline-none">
                <span className="text-xs font-bold text-white">0</span>
              </button>
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
