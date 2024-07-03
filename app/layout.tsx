

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
// import WishListPage from "./wishlist/page"; 

// const inter = Inter({ subsets: ["latin"] });

// const RootLayout: React.FC = () => {
//   const router = useRouter();
//   const currentPathname = usePathname();
//   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
//   const hasVisitedHome = localStorage.getItem("visitedHome") === "true";
//   const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);


//   useEffect(() => {
//     if (!isLoggedIn && isProtectedRoute(currentPathname)) {
//       router.push("/"); // Redirect to login if not logged in and accessing a protected route
//     } else if (currentPathname === "/" && isLoggedIn && !hasVisitedHome) {
//       localStorage.setItem("visitedHome", "true");
//       router.push("/home"); // Redirect to /home after login if not visited home before
//     }
//   }, [isLoggedIn, currentPathname, hasVisitedHome, router]);


//   const isProtectedRoute = (pathname: string) => {
//     return ["/home", "/cart", "/productDetails"].includes(pathname);
//   };


//   const handleCategorySelect = (categoryId: string) => {
//     console.log("Selected Category ID:", categoryId);
//     setSelectedCategoryId(categoryId);
//     router.push(`products?categoryId=${categoryId}`); // Update URL with selected category ID
//   };
  

//   const renderContent = () => {
//     if (currentPathname === "/signup") {
//       return (
//         <html lang="en">
//           <body className={inter.className}>
//             <Signup />
//           </body>
//         </html>
//       );
//     }
//        if (isLoggedIn) {
//             switch (currentPathname) {
//               case "/home":
//                 return (
//                   <html lang="en">
//                     <body className={inter.className}>
//                       <Navbar />
//                       <Categories
//         onCategorySelect={handleCategorySelect}
//         selectedCategoryId={selectedCategoryId}
//       />
//                       <Banner />
//                       <AllProduct selectedCategoryId={selectedCategoryId} />
//                     </body>
//                   </html>
//                 );
//               case "/cart":
//                 return (
//                   <html lang="en">
//                     <body className={inter.className}>
//                       <Navbar />
//                       <CartPage />
//                     </body>
//                   </html>
//                 );
//               case "/productDetails":
//                 return (
//                   <html lang="en">
//                     <body className={inter.className}>
//                       <Navbar />
//                       <Categories onCategorySelect={handleCategorySelect} selectedCategoryId={selectedCategoryId} />
//                       <ProductDetails />
//                     </body>
//                   </html>
//                 );
//                 case "/wish-list":
//                   return (
//                     <html lang="en">
//                       <body className={inter.className}>
//                         <Navbar />
//                         <WishListPage />
//                       </body>
//                     </html>
//                   );
//               default:
//                 return null;
//             }
//           }else {
//       return (
//         <html lang="en">
//           <body className={inter.className}>
//             <Login />
//           </body>
//         </html>
//       );
//     }
//   };

//   return renderContent();
// };

// export default RootLayout;



'use client'
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
import WishListPage from "./wishlist/page"; 

const inter = Inter({ subsets: ["latin"] });

const RootLayout: React.FC = () => {
  const router = useRouter();
  const currentPathname = usePathname();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const hasVisitedHome = localStorage.getItem("visitedHome") === "true";
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [productId, setProductId] = useState<string>("");

  useEffect(() => {
    if (!isLoggedIn && isProtectedRoute(currentPathname)) {
      router.push("/"); // Redirect to login if not logged in and accessing a protected route
    } else if (currentPathname === "/" && isLoggedIn && !hasVisitedHome) {
      localStorage.setItem("visitedHome", "true");
      router.push("/home"); // Redirect to /home after login if not visited home before
    }
  }, [isLoggedIn, currentPathname, hasVisitedHome, router]);

  const isProtectedRoute = (pathname: string) => {
    return ["/home", "/cart", "/productDetails"].includes(pathname);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    router.push(`/products?categoryId=${categoryId}`); // Update URL with selected category ID
  };

  const handleProductIdChange = (newProductId: string) => {
    setProductId(newProductId);
    router.push(`/productDetails?id=${newProductId}`); // Update URL with selected productId
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
                      <Categories
        onCategorySelect={handleCategorySelect}
        selectedCategoryId={selectedCategoryId}
      />
                      <Banner />
                      <AllProduct selectedCategoryId={selectedCategoryId} />
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
                      <Categories onCategorySelect={handleCategorySelect} selectedCategoryId={selectedCategoryId} />
                      <ProductDetails productId={productId} />
                    </body>
                  </html>
                );
                case "/wish-list":
                  return (
                    <html lang="en">
                      <body className={inter.className}>
                        <Navbar />
                        <WishListPage />
                      </body>
                    </html>
                  );
              default:
                return null;
            }
          }else {
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