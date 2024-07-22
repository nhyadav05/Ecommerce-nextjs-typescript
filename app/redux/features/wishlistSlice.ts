import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "@/apiConfig"; // Adjust the path as per your project structure
import { RootState } from "../store"; // Adjust the path as per your project structure
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./products";

interface Product {
  _id: string;
  name: string;
  images: string[];
  price: number;
  discountPrice: number;
  launchDate: string;
  categoryId: string;
  isActive: boolean;
  outOfStock: boolean;
}

interface WishlistState {
  wishlist: Product[];
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | null;
  currentPage: number;
  totalPages: number;
  likedProducts: string[];
}

const cookies = new Cookies();

const initialState: WishlistState = {
  wishlist: [],
  loading: "idle",
  error: null,
  currentPage: 1,
  totalPages: 0,
  likedProducts: [],
};

export const fetchWishlist = createAsyncThunk<
  { wishlist: Product[]; totalPages: number },
  { page: number },
  { rejectValue: string }
>("wishlist/fetchWishlist", async ({ page }, thunkAPI) => {
  try {
    const userId = cookies.get("userId");
    const response = await axios.get(`${API_BASE_URL}/api/wishlist/${userId}`, {
      params: {
        page,
        limit: 10, // Adjust limit per page as needed
      },
    });

    return {
      wishlist: response.data.wishList.products,
      totalPages: response.data.totalPages,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to fetch wishlist");
  }
});

export const addToWishlist = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>("wishlist/addToWishlist", async (productId: string, thunkAPI) => {
  try {
    const userId = cookies.get("userId");
    const response = await axios.post(`${API_BASE_URL}/api/wishlist/add`, {
      userId,
      productId,
    });
    return response.data; // Assuming response.data is the added product, adjust as per your API response structure
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.message || "Failed to add to wishlist"
    );
  }
});

export const removeFromWishlist = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("wishlist/removeFromWishlist", async (productId: string, thunkAPI) => {
  try {
    const userId = cookies.get("userId");
    await axios.delete(`${API_BASE_URL}/api/wishlist/remove`, {
      data: { userId, productId },
    });

    return productId;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.message || "Failed to remove from wishlist"
    );
  }
});

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // Reducer for adding to likedProducts
    addLikedProduct: (state, action: PayloadAction<string>) => {
      state.likedProducts.push(action.payload);
    },
    // Reducer for removing from likedProducts
    removeLikedProduct: (state, action: PayloadAction<string>) => {
      state.likedProducts = state.likedProducts.filter(
        (productId) => productId !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.error = null;
        state.wishlist = action.payload.wishlist;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload as string; // Assuming action.payload is the error message
      })
      .addCase(addToWishlist.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.error = null;
        state.wishlist.push(action.payload);
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload as string; // Assuming action.payload is the error message
      })
      .addCase(removeFromWishlist.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.error = null;
        state.wishlist = state.wishlist.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload as string; // Assuming action.payload is the error message
      });
  },
});

export const { addLikedProduct, removeLikedProduct } = wishlistSlice.actions;

export const selectLikedProducts = (state: RootState) =>
  state.wishlist.likedProducts;

export const selectWishlist = (state: RootState) => state.wishlist.wishlist;
export const selectWishlistLoading = (state: RootState) =>
  state.wishlist.loading;
export const selectWishlistError = (state: RootState) => state.wishlist.error;
export const selectWishlistCurrentPage = (state: RootState) =>
  state.wishlist.currentPage;
export const selectWishlistTotalPages = (state: RootState) =>
  state.wishlist.totalPages;

export default wishlistSlice.reducer;

// import axios from "axios";
// import API_BASE_URL from "@/apiConfig"; // Adjust the path as per your project structure
// import { RootState } from "../store"; // Adjust the path as per your project structure
// import Cookies from "universal-cookie";
// import {
//   fetchProducts,
//   selectProducts,
//   selectProductsLoading,
//   selectProductsError,
//   selectTotalPages,
// } from "../products"; // Import products slice to access related actions/selectors

// interface Product {
//   _id: string;
//   name: string;
//   images: string[];
//   price: number;
//   discountPrice: number;
//   launchDate: string;
//   categoryId: string;
//   isActive: boolean;
//   outOfStock: boolean;
// }

// interface WishlistState {
//   wishlist: Product[];
//   loading: "idle" | "pending" | "fulfilled" | "rejected";
//   error: string | null;
//   currentPage: number;
//   totalPages: number;
//   likedProducts: string[];
// }

// const cookies = new Cookies();

// const initialState: WishlistState = {
//   wishlist: [],
//   loading: "idle",
//   error: null,
//   currentPage: 1,
//   totalPages: 0,
//   likedProducts: [],
// };

// export const fetchWishlist = createAsyncThunk<
//   { wishlist: Product[]; totalPages: number },
//   { page: number },
//   { rejectValue: string }
// >("wishlist/fetchWishlist", async ({ page }, thunkAPI) => {
//   try {
//     const userId = cookies.get("userId");
//     const response = await axios.get(`${API_BASE_URL}/api/wishlist/${userId}`, {
//       params: {
//         page,
//         limit: 10, // Adjust limit per page as needed
//       },
//     });

//     return {
//       wishlist: response.data.wishList.products,
//       totalPages: response.data.totalPages,
//     };
//   } catch (error) {
//     return thunkAPI.rejectWithValue("Failed to fetch wishlist");
//   }
// });

// export const addToWishlist = createAsyncThunk<Product, string, { rejectValue: string }>(
//   "wishlist/addToWishlist",
//   async (productId: string, thunkAPI) => {
//     try {
//       const userId = cookies.get("userId");
//       const response = await axios.post(`${API_BASE_URL}/api/wishlist/add`, {
//         userId,
//         productId,
//       });
//       return response.data; // Assuming response.data is the added product, adjust as per your API response structure
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.message || "Failed to add to wishlist");
//     }
//   }
// );

// export const removeFromWishlist = createAsyncThunk<string, string, { rejectValue: string }>(
//   "wishlist/removeFromWishlist",
//   async (productId: string, thunkAPI) => {
//     try {
//       const userId = cookies.get("userId");

//       await axios.delete(`${API_BASE_URL}/api/wishlist/remove`, {
//         data: { userId, productId },
//       });
//       return productId;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.message || "Failed to remove from wishlist");
//     }
//   }
// );

// const wishlistSlice = createSlice({
//   name: "wishlist",
//   initialState,
//   reducers: {
//     // Reducer for adding to likedProducts
//     addLikedProduct: (state, action: PayloadAction<string>) => {
//       state.likedProducts.push(action.payload);
//     },
//     // Reducer for removing from likedProducts
//     removeLikedProduct: (state, action: PayloadAction<string>) => {
//       state.likedProducts = state.likedProducts.filter(
//         (productId) => productId !== action.payload
//       );
//     },
//     // Additional reducer to remove from products list
//     removeProductFromProductsList: (state, action: PayloadAction<string>) => {
//       state.wishlist = state.wishlist.filter((item) => item._id !== action.payload);
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchWishlist.pending, (state) => {
//         state.loading = "pending";
//         state.error = null;
//       })
//       .addCase(fetchWishlist.fulfilled, (state, action) => {
//         state.loading = "fulfilled";
//         state.error = null;
//         state.wishlist = action.payload.wishlist;
//         state.totalPages = action.payload.totalPages;
//       })
//       .addCase(fetchWishlist.rejected, (state, action) => {
//         state.loading = "rejected";
//         state.error = action.payload as string; // Assuming action.payload is the error message
//       })
//       .addCase(addToWishlist.pending, (state) => {
//         state.loading = "pending";
//         state.error = null;
//       })
//       .addCase(addToWishlist.fulfilled, (state, action) => {
//         state.loading = "fulfilled";
//         state.error = null;
//         state.wishlist.push(action.payload);
//       })
//       .addCase(addToWishlist.rejected, (state, action) => {
//         state.loading = "rejected";
//         state.error = action.payload as string; // Assuming action.payload is the error message
//       })
//       .addCase(removeFromWishlist.pending, (state) => {
//         state.loading = "pending";
//         state.error = null;
//       })
//       .addCase(removeFromWishlist.fulfilled, (state, action) => {
//         state.loading = "fulfilled";
//         state.error = null;
//         state.wishlist = state.wishlist.filter((item) => item._id !== action.payload);
//         // Dispatch action to remove from products list in productsSlice
//         const products = selectProducts(thunkAPI.getState());
//         const updatedProducts = products.filter((product) => product._id !== action.payload);
//         thunkAPI.dispatch(setProducts(updatedProducts));
//       })
//       .addCase(removeFromWishlist.rejected, (state, action) => {
//         state.loading = "rejected";
//         state.error = action.payload as string; // Assuming action.payload is the error message
//       });
//   },
// });

// export const {
//   addLikedProduct,
//   removeLikedProduct,
//   removeProductFromProductsList,
// } = wishlistSlice.actions;

// export const selectLikedProducts = (state: RootState) => state.wishlist.likedProducts;

// export const selectWishlist = (state: RootState) => state.wishlist.wishlist;
// export const selectWishlistLoading = (state: RootState) => state.wishlist.loading;
// export const selectWishlistError = (state: RootState) => state.wishlist.error;
// export const selectWishlistCurrentPage = (state: RootState) => state.wishlist.currentPage;
// export const selectWishlistTotalPages = (state: RootState) => state.wishlist.totalPages;

// export default wishlistSlice.reducer;
