// "use client"
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
//   const router = useRouter();
//   const currentPathname = usePathname();
//   const [visitedHome, setVisitedHome] = useState<boolean>(false);
//   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

//   useEffect(() => {
//     const hasVisitedHome = localStorage.getItem("visitedHome") === "true";

//     // Handle redirect to login if not logged in and accessing a protected route
//     if (!isLoggedIn && isProtectedRoute(currentPathname)) {
//       router.push("/");
//     }

//     // Handle setting visitedHome and redirecting if necessary
//     if (currentPathname === "/" && isLoggedIn && !hasVisitedHome) {
//       localStorage.setItem("visitedHome", "true");
//       setVisitedHome(true);
//     } else if (currentPathname === "/" && hasVisitedHome) {
//       router.push("/home");
//     }
//   }, [isLoggedIn, currentPathname, router]);

//   const isProtectedRoute = (pathname: string) => {
//     return ["/home", "/cart", "/productDetails"].includes(pathname);
//   };

//   return (
//     <>
//       <html lang="en">
//         <body className={inter.className}>
//           {/* Conditional rendering based on authentication and pathname */}
//           {isLoggedIn ? (
//             <>
//               {currentPathname === "/home" && (
//                 <>
//                   <Navbar />
//                   <Categories />
//                   <Banner />
//                   <AllProduct />
//                 </>
//               )}
//               {currentPathname === "/cart" && (
//                 <>
//                   <Navbar />
//                   <CartPage />
//                 </>
//               )}
//               {currentPathname === "/productDetails" && (
//                 <>
//                   <Navbar />
//                   <Categories />
//                   <ProductDetails />
//                 </>
//               )}
//      {currentPathname === "/signup" && <Signup />}

//             </>
//           ) : (
//             <Login />
//           )}
//           {/* Correctly render Signup component when on "/signup" route */}
        
//         </body>
//       </html>
//     </>
//   );
// };

// export default RootLayout;

// 'use client'
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
//   const router = useRouter();
//   const currentPathname = usePathname();
//   const [visitedHome, setVisitedHome] = useState<boolean>(false);
//   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

//   useEffect(() => {
//     const hasVisitedHome = localStorage.getItem("visitedHome") === "true";

//     // Handle redirect to login if not logged in and accessing a protected route
//     if (!isLoggedIn && isProtectedRoute(currentPathname)) {
//       router.push("/");
//     }

//     // Handle setting visitedHome and redirecting if necessary
//     if (currentPathname === "/" && isLoggedIn && !hasVisitedHome) {
//       localStorage.setItem("visitedHome", "true");
//       setVisitedHome(true);
//     } else if (currentPathname === "/" && hasVisitedHome) {
//       router.push("/home");
//     }
//   }, [isLoggedIn, currentPathname, router]);

//   const isProtectedRoute = (pathname: string) => {
//     return ["/home", "/cart", "/productDetails"].includes(pathname);
//   };

//   return (
//     <>
//       <html lang="en">
//         <body className={inter.className}>
//           {/* Conditional rendering based on authentication and pathname */}
//           {isLoggedIn ? (
//             <>
//               {currentPathname === "/home" && (
//                 <>
//                   <Navbar />
//                   <Categories />
//                   <Banner />
//                   <AllProduct />
//                 </>
//               )}
//               {currentPathname === "/cart" && (
//                 <>
//                   <Navbar />
//                   <CartPage />
//                 </>
//               )}
//               {currentPathname === "/productDetails" && (
//                 <>
//                   <Navbar />
//                   <Categories />
//                   <ProductDetails />
//                 </>
//               )}
//               {currentPathname === "/signup" && <Signup />}
//             </>
//           ) : (
//             <Login />
//           )}
//           {/* Correctly render Signup component when on "/signup" route */}
//         </body>
//       </html>
//     </>
//   );
// };

// export default RootLayout;

// {working with middleware}
// app/layout.tsx
// 'use client'
// import React, { useEffect } from "react";
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
//   const router = useRouter();
//   const currentPathname = usePathname();
//   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

//   useEffect(() => {
//     // Redirect to login if not logged in and accessing a protected route
//     if (!isLoggedIn && isProtectedRoute(currentPathname)) {
//       router.push("/");
//     }
//   }, [isLoggedIn, currentPathname, router]);

//   const isProtectedRoute = (pathname: string) => {
//     return ["/home", "/cart", "/productDetails"].includes(pathname);
//   };

//   // Ensure signup page is always accessible
//   if (currentPathname === "/signup") {
//     return (
//       <>
//         <html lang="en">
//           <body className={inter.className}>
//             <Signup />
//           </body>
//         </html>
//       </>
//     );
//   }

//   return (
//     <>
//       <html lang="en">
//         <body className={inter.className}>
//           {/* Conditional rendering based on authentication and pathname */}
//           {isLoggedIn ? (
//             <>
//               {currentPathname === "/home" && (
//                 <>
//                   <Navbar />
//                   <Categories />
//                   <Banner />
//                   <AllProduct />
//                 </>
//               )}
//               {currentPathname === "/cart" && (
//                 <>
//                   <Navbar />
//                   <CartPage />
//                 </>
//               )}
//               {currentPathname === "/productDetails" && (
//                 <>
//                   <Navbar />
//                   <Categories />
//                   <ProductDetails />
//                 </>
//               )}
//             </>
//           ) : (
//             <Login />
//           )}
//         </body>
//       </html>
//     </>
//   );
// };

// export default RootLayout;



// app/layout.tsx
'use client'
import React, { useEffect } from "react";
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
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    // Redirect to login if not logged in and accessing a protected route
    if (!isLoggedIn && isProtectedRoute(currentPathname)) {
      router.push("/home");
    }
  }, [isLoggedIn, currentPathname, router]);

  const isProtectedRoute = (pathname: string) => {
    return ["/home", "/cart", "/productDetails"].includes(pathname);
  };

  const renderContent = () => {
    if (currentPathname === "/signup") {
      return (
        <html lang="en">
          <body className={inter.className}>
            <Signup />
          </body>
        </html>
      );
    }

    if (isLoggedIn) {
      switch (currentPathname) {
        case "/home":
          return (
            <html lang="en">
              <body className={inter.className}>
                <Navbar />
                <Categories />
                <Banner />
                <AllProduct />
              </body>
            </html>
          );
        case "/cart":
          return (
            <html lang="en">
              <body className={inter.className}>
                <Navbar />
                <CartPage />
              </body>
            </html>
          );
        case "/productDetails":
          return (
            <html lang="en">
              <body className={inter.className}>
                <Navbar />
                <Categories />
                <ProductDetails />
              </body>
            </html>
          );
        default:
          return null;
      }
    } else {
      return (
        <html lang="en">
          <body className={inter.className}>
            <Login />
          </body>
        </html>
      );
    }
  };

  return renderContent();
};

export default RootLayout;
