// redux/features/wishlistSlice.ts

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import API_BASE_URL from '@/apiConfig';
import { RootState } from '../store'; // Adjust the path as per your project structure
import Cookies from 'universal-cookie';

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
  loading: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string | null;
}

const initialState: WishlistState = {
  wishlist: [],
  loading: 'idle',
  error: null,
};

const cookies = new Cookies();
const userId = cookies.get('userId');

export const fetchWishlist = createAsyncThunk<Product[], void, { rejectValue: string }>(
  'wishlist/fetchWishlist',
  async (_, thunkAPI) => {
    try {
      if (!userId) {
        throw new Error('User not logged in.');
      }

      const response = await axios.get(`${API_BASE_URL}/api/wishlist/${userId}`);
      return response.data.wishList.products;
    } catch (error:any) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch wishlist');
    }
  }
);

export const addToWishlist = createAsyncThunk<Product, string, { rejectValue: string }>(
  'wishlist/addToWishlist',
  async (productId: any, thunkAPI) => {
    try {
      if (!userId) {
        throw new Error('User not logged in.');
      }

      const response = await axios.post(`${API_BASE_URL}/api/wishlist/add`, { userId, productId });
      return response.data; // Assuming response.data is the added product, adjust as per your API response structure
    } catch (error:any) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to add to wishlist');
    }
  }
);

export const removeFromWishlist = createAsyncThunk<string, string, { rejectValue: string }>(
  'wishlist/removeFromWishlist',
  async (productId: any, thunkAPI) => {
    try {
      if (!userId) {
        throw new Error('User not logged in.');
      }

      await axios.delete(`${API_BASE_URL}/api/wishlist/remove`, { data: { userId, productId } });
      return productId;
    } catch (error:any) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to remove from wishlist');
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    // Additional reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.error = null;
        state.wishlist = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.payload as string; // Assuming action.payload is the error message
      })
      .addCase(addToWishlist.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.error = null;
        state.wishlist.push(action.payload);
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.payload as string; // Assuming action.payload is the error message
      })
      .addCase(removeFromWishlist.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.error = null;
        state.wishlist = state.wishlist.filter((item) => item._id !== action.payload);
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.payload as string; // Assuming action.payload is the error message
      });
      
  },
});

export const selectWishlist = (state: RootState) => state.wishlist.wishlist;
export const selectWishlistLoading = (state: RootState) => state.wishlist.loading;
export const selectWishlistError = (state: RootState) => state.wishlist.error;

export default wishlistSlice.reducer;
