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
  discountPrice:number;
  launchDate: string;
  categoryId: string;
  isActive: boolean;
  outOfStock: boolean;
}

interface WishListState {
  wishlist: Product[];
  loading: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string | null;
}

const initialState: WishListState = {
  wishlist: [],
  loading: 'idle',
  error: null,
};

const cookies = new Cookies();
const userId = cookies.get('userId');

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async () => {
    try {
      if (!userId) {
        throw new Error('User not logged in.');
      }

      const response = await axios.get(`${API_BASE_URL}/api/wishlist/${userId}`);
      return response.data.wishList.products;
    } catch (error:any) {
      throw new Error(error.message || 'Failed to fetch wishlist');
    }
  }
);

export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async (productId: string) => {
    try {
      if (!userId) {
        throw new Error('User not logged in.');
      }

      const response = await axios.post(`${API_BASE_URL}/api/wishlist/add`, { userId, productId });
      return response.data;
    } catch (error:any) {
      throw new Error(error.message || 'Failed to add to wishlist');
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async (productId: string) => {
    try {
      if (!userId) {
        throw new Error('User not logged in.');
      }

      await axios.delete(`${API_BASE_URL}/api/wishlist/remove`, { data: { userId, productId } });
      return productId;
    } catch (error:any) {
      throw new Error(error.message || 'Failed to remove from wishlist');
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
        state.error = action.error.message as string;
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
        state.error = action.error.message as string;
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
        state.error = action.error.message as string;
      });
  },
});

export const selectWishlist = (state: RootState) => state.wishlist.wishlist;
export const selectWishlistLoading = (state: RootState) => state.wishlist.loading;
export const selectWishlistError = (state: RootState) => state.wishlist.error;

export default wishlistSlice.reducer;
