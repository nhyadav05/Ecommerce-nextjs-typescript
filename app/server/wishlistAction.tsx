"use server";
import API_BASE_URL from "@/apiConfig";

export const fetchWishlist = async (userId: any) => {
  const responseFetchWishList = await fetch(`${API_BASE_URL}/wishlist/${userId}`);
  const data = await responseFetchWishList.json();
  // console.log("fetchWishList", data);
  return data;
};


export const addToWishlist = async (productId: any, userId: string) => {
  const responseAddToWishList = await fetch(`${API_BASE_URL}/wishlist/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      productId: productId,
    }),
  });

  const data = await responseAddToWishList.json();
  // console.log("addProductToWishList", data);
  return data;
};


export const removeFromWishlist = async (
  productId: any,
  userId: string
) => {
  const responseRemoveFromWishlist = await fetch(
    `${API_BASE_URL}/wishlist/remove`,
    {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        productId: productId,
      }),
    }
  );

  const data = await responseRemoveFromWishlist.json();
  // console.log("removeProductToWishList", data);
  return data;
};
