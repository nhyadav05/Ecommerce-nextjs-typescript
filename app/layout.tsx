"use client";
// RootLayout.tsx

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./navbar/Navbar";
import Login from "./login/page";
import CartPage from "./cart/page";
import Banner from "./banner/page";
import ProductDetails from "./productDetails/page";
import Categories from "./categories/categories";
import Signup from "./signup/page";

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  // Conditionally render components based on the current path
  return (
    <html lang="en">
      <body>
        {pathname === "/" && <Login />} 
        {pathname === "/signup" && <Signup />} 
        {pathname === "/home" && ( 
          <div>
            <Navbar />
            <Categories />
            <Banner />
            {children} 
          </div>
        )}
        {pathname === "/productDetails" && ( 
          <div>
            <Navbar />
            <Categories />
            <ProductDetails />
          </div>
        )}

        {pathname === "/cart" && ( 
          <div>
            <Navbar />
            <CartPage />
          </div>
        )}
      </body>
    </html>
  );
};

export default RootLayout;


// "use client";
// import { useState, useEffect } from "react";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { usePathname } from "next/navigation";
// import Login from "./login/page";
// import Navbar from "./navbar/Navbar";
// import Categories from "./categories/categories";
// import CartPage from "./cart/page";
// import Banner from "./banner/page";
// import ProductDetails from "./productDetails/page";
// import Loader from "@/components/loader";

// const inter = Inter({ subsets: ["latin"] });

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const pathname = usePathname();
//   const [isLoading, setIsLoading] = useState(true); // State to manage loading

//   // Simulate loading delay with setTimeout (you would replace this with actual data fetching)
//   useEffect(() => {
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 1000); // Simulating 2 seconds loading time
//   }, []);

//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         {/* Conditional rendering based on pathname and loading state */}
//         {isLoading ? (
// <Loader/>
//         ) : (
//           <>
//             {pathname === "/login" ? (
//               <div>
//                 <Login />
//               </div>
//             ) : pathname === "/cart" ? (
//               <div>
//                 <Navbar />
//                 <CartPage />
//               </div>
//             ) : pathname === "/productDetails" ? (
//               <div>
//                 <Navbar />
//                 <Categories />
//                 <ProductDetails />
//               </div>
//             ) : (
//               <div>
//                 <Navbar />
//                 <Categories />
//                 <Banner />
//                 {children}
//               </div>
//             )}
//           </>
//         )}
//       </body>
//     </html>
//   );
// }
