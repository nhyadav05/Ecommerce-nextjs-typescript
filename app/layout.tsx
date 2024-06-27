"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import Login from "./login/page";
import Signup from "./signup/page"; // Assuming this is the correct path to your signup page
import Navbar from "./navbar/Navbar";
import Categories from "./categories/categories";
import CartPage from "./cart/page";
import Banner from "./banner/page";
import ProductDetails from "./productDetails/page";
import AllProduct from "./Product/allProduct";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={inter.className}>

          <>
            {pathname === "/home" && (
              <div>
                <Navbar />
                <Categories />
                <Banner />
                <AllProduct />
              </div>
            )}
            {pathname === "/cart" && (
              <div>
                <Navbar />
                <CartPage />
              </div>
            )}
            {pathname === "/productDetails" && (
              <div>
                <Navbar />
                <Categories />
                <ProductDetails />
              </div>
            )}
            {pathname === "/signup" && (
              <div>
                <Signup />
              </div>
            )}
            {pathname !== "/home" &&
              pathname !== "/cart" &&
              pathname !== "/productDetails" &&
              pathname !== "/signup" && (
                <div>
                  <Login />
                </div>
              )}
          
          </>
      </body>
    </html>
  );
}





// "use client"
// import { useEffect } from 'react';
// import { usePathname } from "next/navigation";
// import Navbar from './navbar/Navbar';
// import Login from './login/page'; // Assuming correct path to Login component
// import Signup from './signup/page'; // Assuming correct path to Signup component
// import { Inter } from "next/font/google";
// import "./globals.css";
// import ProductDetails from './productDetails/page';
// import Categories from './categories/categories';
// import CartPage from './cart/page';
// import AllProduct from './Product/allProduct';
// import Banner from './banner/page';
// const inter = Inter({ subsets: ["latin"] });
// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const pathname = usePathname();

//   useEffect(() => {
//     // Check if user is logged in (example: checking token in localStorage)
//     const token = localStorage.getItem('token');

//     // If no token is found and not on the login page, redirect to login
//     if (!token && pathname !== '/login') {
//      ('/login');
//     }
//   }, []);

//   return (
//     <html lang="en">
//        <body className={inter.className}>
//     <>
//       {/* Render children components based on pathname */}
//       {pathname === '/login' && <Login />}
//       {pathname === '/signup' && <Signup />}
//       {pathname !== '/login' && pathname !== '/signup' &&  pathname === "/home" && (
//                         <div>
//                           <Navbar />
//                           <Categories />
//                           <Banner />
//                           <AllProduct />
//                         </div>
//                       )}
//                       {pathname === "/cart" && (
//                         <div>
//                           <Navbar />
//                           <CartPage/>
//                         </div>
//                       )}
//                       {pathname === "/productDetails" && (
//                         <div>
//                           <Navbar />
//                           <Categories/>
//                           <ProductDetails/>
//                         </div>
//                       )}
//                       {pathname === "/signup" && (
//                         <div>
//                           <Signup />
//                         </div>
//                       )}
//                       {pathname !== "/home" &&
//                         pathname !== "/cart" &&
//                         pathname !== "/productDetails" &&
//                         pathname !== "/signup" && (
//                           <div>
//                             <Login />
//                           </div>
//                         )}
   
//     </>
//     </body>
//     </html>
//   );
// }
