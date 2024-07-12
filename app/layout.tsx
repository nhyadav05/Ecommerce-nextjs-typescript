"use client";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar/Navbar";

import { store } from "./redux/store";
import { Provider } from "react-redux";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get pathname for conditional layout
  const pathname = usePathname();

  // condition layout - Pathname - Array
  const display: any = ["/", "/signup"];

  return (
    <html lang="en">
      <body className={inter.className}>
      <Provider store={store()}> 
        {display.includes(pathname) ? null : <Navbar/>}
    
        {children}
        </Provider>
      </body>
    </html>
  );
}
