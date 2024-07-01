// "use client"
// import React, { useState, useEffect } from "react";
// import { BsSearch } from "react-icons/bs";
// import { useRouter } from "next/router";

// interface SearchInputProps {
//   onSearch: (searchTerm: string) => void;
// }

// const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
//   const [search, setSearch] = useState("");
//   const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const handleRouteChange = () => {
//       setShowSuggestions(false);
//     };

//     router.events.on("routeChangeStart", handleRouteChange);

//     return () => {
//       router.events.off("routeChangeStart", handleRouteChange);
//     };
//   }, [router]);

//   const handleSearchChange = (value: string) => {
//     setSearch(value);
//     // Mock logic for generating suggestions
//     if (value.trim() !== "") {
//       setSearchSuggestions([`${value} product`, `${value} item`, `${value} category`]);
//       setShowSuggestions(true);
//     } else {
//       setSearchSuggestions([]);
//       setShowSuggestions(false);
//     }
//   };

//   const handleSearch = () => {
//     if (search.trim() !== "") {
//       onSearch(search);
//       setSearch("");
//       setShowSuggestions(false);
//     }
//   };

//   const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       handleSearch();
//     }
//   };

//   const handleSuggestionClick = (suggestion: string) => {
//     setSearch(suggestion);
//     onSearch(suggestion);
//     setShowSuggestions(false);
//   };

//   return (
//     <div className="relative">
//       <input
//         className="w-full py-2 px-4 rounded-md bg-white text-black hover:bg-gray-200 focus:outline-none"
//         type="text"
//         value={search}
//         onChange={(e) => handleSearchChange(e.target.value)}
//         placeholder="Search for products"
//         onKeyDown={handleEnter}
//       />

//       <BsSearch
//         className="text-black absolute right-4 top-3 cursor-pointer"
//         onClick={handleSearch}
//       />

//       {/* Suggestions dropdown */}
//       {showSuggestions && (
//         <div className="absolute left-0 right-0 mt-2 bg-white shadow-md rounded-md border border-gray-200">
//           {searchSuggestions.map((suggestion, index) => (
//             <div
//               key={index}
//               className="px-4 py-2 cursor-pointer hover:bg-gray-100"
//               onClick={() => handleSuggestionClick(suggestion)}
//             >
//               {suggestion}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchInput;


"use client"
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

interface SearchInputProps {
  onSearch: (searchTerm: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    // Mock logic for generating suggestions
    if (value.trim() !== "") {
      setSearchSuggestions([
        `${value} product`,
        `${value} item`,
        `${value} category`,
      ]);
      setShowSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = () => {
    if (search.trim() !== "") {
      onSearch(search);
      setSearch("");
      setShowSuggestions(false);
    }
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearch(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <input
        className="w-full py-2 px-4 rounded-md bg-white text-black hover:bg-gray-200 focus:outline-none"
        type="text"
        value={search}
        onChange={(e) => handleSearchChange(e.target.value)}
        placeholder="Search for products"
        onKeyDown={handleEnter}
      />

      <BsSearch
        className="text-black absolute right-4 top-3 cursor-pointer"
        onClick={handleSearch}
      />

      {/* Suggestions dropdown */}
      {showSuggestions && (
        <div className="absolute left-0 right-0 mt-2 bg-white shadow-md rounded-md border border-gray-200 z-50">
          {searchSuggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;

