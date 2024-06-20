"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import Login from "./login/page";
import Navbar from "./navbar/Navbar";
import Categories from "./categories/categories";
import CartPage from "./cart/page";
import Banner from "./banner/page";
import ProductDetails from "./productDetails/page";
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
        {pathname === "/login" ? (
          <div>
            <Login />
          </div>
        ) : pathname === "/cart" ? (
          <div>
            <Navbar />
            <CartPage />
          </div>
        ) : pathname === "/productDetails" ? (
          <div>
  <Navbar />
  <Categories />
<ProductDetails/>
          </div>
        ) : (
          <div>
            <Navbar />
            <Categories />
            <Banner />
            {children}
          </div>
        )}
      </body>
    </html>
  );
}
