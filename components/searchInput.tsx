// SearchInput.tsx
"use client"
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

interface SearchInputProps {
  onSearch: (searchTerm: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    onSearch(search);
    setSearch("");
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative">
      <input
        className="w-full py-2 px-4 rounded-md bg-white text-black hover:bg-gray-200 focus:outline-none"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for products"
        onKeyDown={handleEnter}
      />

      <BsSearch
        className="text-black absolute right-4 top-3 cursor-pointer"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchInput;
