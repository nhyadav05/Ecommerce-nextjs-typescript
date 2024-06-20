"use client";

// Navbar.tsx
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { PiTruck } from "react-icons/pi";
import Link from "next/link";
import SearchInput from "@/components/searchInput";


const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = (searchTerm: string) => {
    console.log("Searching for:", searchTerm);
    // Implement your search logic here
  };

  return (
    <nav className="bg-blue-600 px-8 py-4 md:py-3 sm-max-width:480px md-max-width:996px lg-max-width:1600px">
      {/* Desktop View */}
      <div className="hidden md:flex items-center  px-32 justify-between">
        <div className="flex items-center">
          <Link href="/">
            <PiTruck className="h-[50px] w-[50px] text-slate-200 rounded-full hover:text-slate-400 focus:outline-none  transition duration-150 ease-in-out" />
          </Link>
          <Link href="/">
            <h1 className="text-white text-xl font-semibold ml-2 cursor-pointer">
              Apna Store
            </h1>
          </Link>
        </div>
        <div className="w-[30%]">
          <SearchInput onSearch={handleSearch} />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          {/* User Circle Icon */}
          <FaUserCircle className="text-white text-2xl cursor-pointer" />
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
      <div className="md:hidden flex items-center justify-between ">
        {/* Logo and Company Name */}
        <div className="flex items-center">
          <Link href="/">
            <PiTruck className="h-[50px] w-[50px] text-slate-200 rounded-full hover:text-slate-400 focus:outline-none  transition duration-150 ease-in-out" />
          </Link>
          <Link href="/">
            <h1 className="text-white text-xl font-semibold ml-2 cursor-pointer">
              Apna Store
            </h1>
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          <FaUserCircle className="text-white text-2xl cursor-pointer" />
          <div className="relative">
            <Link href="/cart ">
              <FiShoppingCart className="text-white text-2xl cursor-pointer" />
              <button className="absolute top-[-0.75rem] right-[-0.75rem] rounded-full w-6 h-6 bg-red-600 hover:bg-red-500 focus:bg-red-500 focus:outline-none">
                <span className="text-xs font-bold text-white">0</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Common Search Input for Mobile and Desktop */}
      <div className="mt-3 md:hidden">
        <SearchInput onSearch={handleSearch} />
      </div>
    </nav>
  );
};

export default Navbar;
