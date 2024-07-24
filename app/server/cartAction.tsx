// app/server/cartAction.tsx

"use server";
import API_BASE_URL from "@/apiConfig";

// -------------Fetch CartList------------------
// Example of centralized error handling in server-side functions

async function handleResponseErrors(response: Response) {
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
  }
  return response.json();
}

export const fetchCartsList = async (userId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/carts/products/${userId}`);
    const data = await handleResponseErrors(response);
    return data;
  } catch (error) {
    console.error("Error fetching cart items:", error);

  }
};

export const addProductToCart = async (productId: string, userId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/carts/add/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        quantity: 1,
      }),
    });
    await handleResponseErrors(response);
    return response.json();
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw new Error("Failed to add product to cart.");
  }
};


// -------------Increase Product to Cart------------------

export const increaseProductToCart = async (
  productId: any,
  userId: string,
  quantity: any
) => {
  const responseIncreaseProductToWishList = await fetch(
    `${API_BASE_URL}/carts/increase/${productId}`,
    {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    }
  );

  const data = await responseIncreaseProductToWishList.json();
  // console.log("increaseProductToCart", data);
  return data;
};
// -------------Increase Product to Cart------------------

// -------------Decrease Product to Cart------------------

export const decreaseProductToCart = async (
  productId: any,
  userId: string,
  quantity: any
) => {
  const responseDecreaseProductToWishList = await fetch(
    `${API_BASE_URL}/carts/decrease/${productId}`,
    {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    }
  );

  const data = await responseDecreaseProductToWishList.json();
  // console.log("decreaseProductToCart", data);
  return data;
};
// -------------Decrease Product to Cart------------------

// -------------Delete Product to Cart------------------

export const deleteProductToCart = async (productId: any, userId: string) => {
  const responseDeleteProductToWishList = await fetch(
    `${API_BASE_URL}/carts/delete/${productId}`,
    {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    }
  );

  const data = await responseDeleteProductToWishList.json();
  // console.log("deleteProductToCart", data);
  return data;
};
// -------------Delete Product to Cart------------------