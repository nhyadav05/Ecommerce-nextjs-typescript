"use server"
// server/productAction.ts
import API_BASE_URL from "@/apiConfig";

interface Product {
  _id: string;
  name: string;
  images: string[];
  categoryId: string;
  category: string;
  description?: string;
  price: number;
  discountPrice: number;
  offer: string;
  outOfStock: boolean; // Added property
}

interface Pagination {
  totalPages: number;
  // Add other pagination fields if needed
}

export const fetchProduct = async ({
  page,
  limit = 10, // Default limit per page
  categoryId,
}: {
  page: number;
  limit?: number;
  categoryId?: string | null;
}): Promise<{ products: Product[]; pagination: Pagination }> => {
  try {
    let url = `${API_BASE_URL}/products?page=${page}&limit=${limit}`;
    if (categoryId) {
      url += `&categoryId=${categoryId}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return {
      products: data.products,
      pagination: {
        totalPages: data.pagination.totalPages,
        // Add other pagination fields if needed
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};


// ---------------------product Details

export const fetchProductDetails = async (productId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/${productId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};