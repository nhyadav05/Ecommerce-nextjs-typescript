"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import Navbar from "./navbar/Navbar";
import Categories from "./categories/categories";
import Banner from "./banner/page";
import AllProduct from "./product/page";
import Signup from "./signup/page";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  const handleCategorySelect = (categoryId: string) => {
    console.log("Selected Category ID:", categoryId);
    setSelectedCategoryId(categoryId);
  };
  return (
    <html lang="en">
      <body className={inter.className}>
        {pathname === "/home" ? (
          <div>
            <Navbar />
            <Categories
              onCategorySelect={handleCategorySelect}
              selectedCategoryId={selectedCategoryId}
            />
            <Banner />
            <AllProduct selectedCategoryId={selectedCategoryId} />
          </div>
        ) : pathname === "/signup" ? (
          <div>
            <Signup />
          </div>
        ) : (
          <div>{children}</div>
        )}{" "}
      </body>
    </html>
  );
}
