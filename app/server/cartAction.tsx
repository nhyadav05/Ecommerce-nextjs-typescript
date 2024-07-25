// app/server/cartAction.ts
"use server"
import API_BASE_URL from '@/apiConfig';



// Function to fetch cart items from the server
export const fetchCartItems = async ( userId: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/carts/products/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch cart items.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw new Error('Failed to fetch cart items.');
  }
};

// Function to add a product to the cart on the server
export const addToCart = async (productId: string,  userId: any): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/carts/add/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, quantity: 1 }),
    });
    if (!response.ok) {
      throw new Error('Failed to add product to cart.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding product to cart:', error);
    throw new Error('Failed to add product to cart.');
  }
};

// Function to increase the quantity of a product in the cart on the server
export const incrementCartItemQuantity = async (productId: string,  userId: any): Promise<any> => {
  try {

    const response = await fetch(`${API_BASE_URL}/carts/increase/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
    if (!response.ok) {
      throw new Error(`Failed to increase quantity for product ${productId}.`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error increasing item quantity:', error);
    throw new Error('Failed to increase item quantity.');
  }
};

// Function to decrease the quantity of a product in the cart on the server
export const decrementCartItemQuantity = async ( productId: string,  userId: any): Promise<any> => {
  try {
    
    const response = await fetch(`${API_BASE_URL}/carts/decrease/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
    if (!response.ok) {
      throw new Error(`Failed to decrease quantity for product ${productId}.`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error decreasing item quantity:', error);
    throw new Error('Failed to decrease item quantity.');
  }
};

// Function to remove a product from the cart on the server
export const removeCartItem = async ( productId: string,  userId: any ): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/carts/delete/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
    if (!response.ok) {
      throw new Error('Failed to remove product from cart.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error removing product from cart:', error);
    throw new Error('Failed to remove product from cart.');
  }
};

// Function to update the quantity of a product in the cart on the server
export const updateCartItemQuantity = async (
  productId: string,
  quantity: number,
  userId: any,
): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/carts/updateQuantity/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, quantity }),
    });
    if (!response.ok) {
      throw new Error('Failed to update item quantity.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating item quantity:', error);
    throw new Error('Failed to update item quantity.');
  }
};
