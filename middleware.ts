// middleware/authentication.ts
import { NextRequest, NextResponse } from "next/server";
import Cookies from "universal-cookie";

export default function middleware(request: NextRequest) {
  const cookies = new Cookies(request.cookies);

  console.log("Received cookies:", request.cookies);

  let verify = request.cookies.get("loggedin")?.value;
  console.log("Value of verify:", verify);
  console.log(request.url);

  if (!verify && request.nextUrl.pathname === "/signup") {
    console.log("Allowing access to /signup because user is not logged in");
    return null;
  }
  if (
    !verify &&
    (request.nextUrl.pathname === "/home" ||
      request.nextUrl.pathname === "/productDetails" ||  request.nextUrl.pathname === "/cart")
  ) {
    console.log("Redirecting to / because verify is false or undefined");
    return (
      NextResponse.redirect(new URL("/", request.url)) ||
      NextResponse.redirect(new URL("/login", request.url)) 
      // NextResponse.redirect(new URL("/signup", request.url))
    );
  }

  if (
    (verify &&
      (request.nextUrl.pathname === "/" ||
        request.nextUrl.pathname === "/login")) ||
    request.nextUrl.pathname === "/signup"
  ) {
    console.log("Redirecting to /home because verify is true");
    return (
      NextResponse.redirect(new URL("/home", request.url)) ||
      NextResponse.redirect(new URL("/productDetails", request.url)) ||
      NextResponse.redirect(new URL("/cart", request.url))

    );
  }
  return null; // Proceed to handle the request normally if no redirect is needed
}