import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import API_BASE_URL from '@/apiConfig';
import { RootState } from '../store'; // Adjust the path as per your project structure
import Cookies from 'universal-cookie';

interface CartItem {
  _id: string;
  productId: any;
  name: string;
  images: string;
  size: string;
  price: number;
  originalPrice: number;
  discountedPrice: number;
  discount: string;
  quantity: number;
  totalPrice: number;
}

interface CartState {
  cartItems: CartItem[];
  totalPrice: number;
  loading: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string | null;
}

const initialState: CartState = {
  cartItems: [],
  totalPrice: 0,
  loading: 'idle',
  error: null,
};

// Fetch userId from cookies
const cookies = new Cookies();
const userId = cookies.get('userId');

export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (_, { rejectWithValue }) => {
    try {
      if (!userId) {
        throw new Error('User not logged in.');
      }

      const response = await axios.get(`${API_BASE_URL}/api/carts/products/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Error fetching cart items. Please try again later.');
    }
  }
);

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (payload: { productId: string; }, { rejectWithValue }) => {
    try {
      if (!userId) {
        throw new Error('User not logged in.');
      }

      await axios.delete(`${API_BASE_URL}/api/carts/delete/${payload.productId}`, { data: { userId } });
      return payload.productId;
    } catch (error) {
      return rejectWithValue('Error removing item from cart. Please try again later.');
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateCartItemQuantity',
  async (payload: { productId: string; quantity: number; }, { rejectWithValue }) => {
    try {
      if (!userId) {
        throw new Error('User not logged in.');
      }

      await axios.put(`${API_BASE_URL}/api/carts/updateQuantity/${payload.productId}`, { userId, quantity: payload.quantity });
      return payload;
    } catch (error) {
      return rejectWithValue('Error updating item quantity. Please try again later.');
    }
  }
);

export const incrementCartItemQuantity = createAsyncThunk(
  'cart/incrementCartItemQuantity',
  async (payload: { productId: string; }, { getState, rejectWithValue }) => {
    try {
      if (!userId) {
        throw new Error('User not logged in.');
      }

      const { cartItems } = (getState() as RootState).cart;
      const currentItem = cartItems.find(item => item.productId === payload.productId);

      if (!currentItem) {
        throw new Error('Item not found in cart.');
      }

      const newQuantity = currentItem.quantity + 1;

      await axios.put(`${API_BASE_URL}/api/carts/increase/${payload.productId}`, { userId });
      return { productId: payload.productId, quantity: newQuantity };
    } catch (error) {
      return rejectWithValue('Error increasing item quantity. Please try again later.');
    }
  }
);

export const decrementCartItemQuantity = createAsyncThunk(
  'cart/decrementCartItemQuantity',
  async (payload: { productId: string; }, { getState, rejectWithValue }) => {
    try {
      if (!userId) {
        throw new Error('User not logged in.');
      }

      const { cartItems } = (getState() as RootState).cart;
      const currentItem = cartItems.find(item => item.productId === payload.productId);

      if (!currentItem || currentItem.quantity <= 1) {
        throw new Error('Quantity cannot be less than 1.');
      }

      const newQuantity = currentItem.quantity - 1;

      await axios.put(`${API_BASE_URL}/api/carts/decrease/${payload.productId}`, { userId });
      return { productId: payload.productId, quantity: newQuantity };
    } catch (error) {
      return rejectWithValue('Error decreasing item quantity. Please try again later.');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Additional reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.cartItems = action.payload.carts;
        state.totalPrice = action.payload.totalPrice;
        state.error = null;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.payload as string;
      })
      .addCase(removeCartItem.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.cartItems = state.cartItems.filter(item => item.productId !== action.payload);
        state.error = null;
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.payload as string;
      })
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        const { productId, quantity } = action.payload;
        const updatedCartItems = state.cartItems.map(item =>
          item.productId === productId ? { ...item, quantity } : item
        );
        state.cartItems = updatedCartItems;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.payload as string;
      })
      .addCase(incrementCartItemQuantity.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(incrementCartItemQuantity.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        const { productId, quantity } = action.payload;
        const updatedCartItems = state.cartItems.map(item =>
          item.productId === productId ? { ...item, quantity } : item
        );
        state.cartItems = updatedCartItems;
        state.error = null;
      })
      .addCase(incrementCartItemQuantity.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.payload as string;
      })
      .addCase(decrementCartItemQuantity.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(decrementCartItemQuantity.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        const { productId, quantity } = action.payload;
        const updatedCartItems = state.cartItems.map(item =>
          item.productId === productId ? { ...item, quantity } : item
        );
        state.cartItems = updatedCartItems;
        state.error = null;
      })
      .addCase(decrementCartItemQuantity.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.payload as string;
      });
  },
});

export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;
export const selectCartLoading = (state: RootState) => state.cart.loading;
export const selectCartError = (state: RootState) => state.cart.error;

export default cartSlice.reducer;
