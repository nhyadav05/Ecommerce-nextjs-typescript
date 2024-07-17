"use client";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar/Navbar";


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
      <> 
        {display.includes(pathname) ? null : <Navbar/>}
    
        {children}
        </>
      </body>
    </html>
  );
}
