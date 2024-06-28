"use client"
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import "./globals.css";
import Login from "./login/page";
import Signup from "./signup/page";
import Navbar from "./navbar/Navbar";
import Categories from "./categories/categories";
import CartPage from "./cart/page";
import Banner from "./banner/page";
import ProductDetails from "./productDetails/page";
import AllProduct from "./Product/allProduct";

const inter = Inter({ subsets: ["latin"] });

const RootLayout: React.FC = () => {
  const router = useRouter();
  const currentPathname = usePathname();
  const [visitedHome, setVisitedHome] = useState<boolean>(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    const hasVisitedHome = localStorage.getItem("visitedHome") === "true";

    // Handle redirect to login if not logged in and accessing a protected route
    if (!isLoggedIn && isProtectedRoute(currentPathname)) {
      router.push("/");
    }

    // Handle setting visitedHome and redirecting if necessary
    if (currentPathname === "/" && isLoggedIn && !hasVisitedHome) {
      localStorage.setItem("visitedHome", "true");
      setVisitedHome(true);
    } else if (currentPathname === "/" && hasVisitedHome) {
      router.push("/home");
    }
  }, [isLoggedIn, currentPathname, router]);

  const isProtectedRoute = (pathname: string) => {
    return ["/home", "/cart", "/productDetails"].includes(pathname);
  };

  return (
    <>
      <html lang="en">
        <body className={inter.className}>
          {/* Conditional rendering based on authentication and pathname */}
          {isLoggedIn ? (
            <>
              {currentPathname === "/home" && (
                <>
                  <Navbar />
                  <Categories />
                  <Banner />
                  <AllProduct />
                </>
              )}
              {currentPathname === "/cart" && (
                <>
                  <Navbar />
                  <CartPage />
                </>
              )}
              {currentPathname === "/productDetails" && (
                <>
                  <Navbar />
                  <Categories />
                  <ProductDetails />
                </>
              )}
                {currentPathname === "/signup" && <Signup />}
            </>
          ) : (
            <Login />
          )}
          {/* Correctly render Signup component when on "/signup" route */}
        
        </body>
      </html>
    </>
  );
};

export default RootLayout;





// import React, { useEffect, useState } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import Login from "./login/page";
// import Signup from "./signup/page";
// import Navbar from "./navbar/Navbar";
// import Categories from "./categories/categories";
// import CartPage from "./cart/page";
// import Banner from "./banner/page";
// import ProductDetails from "./productDetails/page";
// import AllProduct from "./Product/allProduct";

// const inter = Inter({ subsets: ["latin"] });

// const RootLayout: React.FC = () => {
//   const pathname = usePathname();
//   const router = useRouter();
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

//   useEffect(() => {
//     // Check if user is logged in based on localStorage
//     const userLoggedIn = localStorage.getItem("isLoggedIn") === "true";
//     setIsLoggedIn(userLoggedIn);

//     // Redirect to login page if not logged in and accessing a protected route
//     if (!userLoggedIn && isProtectedRoute(pathname)) {
//       router.push("/login");
//     }
//   }, [pathname]);

//   const isProtectedRoute = (pathname: string) => {
//     return ["/home", "/cart", "/productDetails"].includes(pathname);
//   };

//   // Handle signup success redirection to home page
//   const handleSignupSuccess = () => {
//     router.push("/home");
//   };

//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         {isLoggedIn ? (
//           <>
//             {pathname === "/home" && (
//               <div>
//                 <Navbar />
//                 <Categories />
//                 <Banner />
//                 <AllProduct />
//               </div>
//             )}
//             {pathname === "/cart" && (
//               <div>
//                 <Navbar />
//                 <CartPage />
//               </div>
//             )}
//             {pathname === "/productDetails" && (
//               <div>
//                 <Navbar />
//                 <Categories />
//                 <ProductDetails />
//               </div>
//             )}
//             {/* Render children components for other routes */}
//           </>
//         ) : (
//           // Render login or signup page if not logged in
//           pathname === "/signup" ? (
//             <Signup onSuccess={handleSignupSuccess} />
//           ) : (
//             <Login />
//           )
//         )}
//       </body>
//     </html>
//   );
// };

// export default RootLayout;

