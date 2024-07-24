import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import API_BASE_URL from '@/apiConfig';
import { RootState } from '../store'; // Adjust the path as per your project structure
import Cookies from 'universal-cookie';

// Interface for Cart Item
interface CartItem {
  _id: string;
  productId: any;
  userId: any;
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

// Interface for Cart State
interface CartState {
  cartItems: CartItem[];
  totalPrice: number;
  loading: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string | null;
}

// Initial State
const initialState: CartState = {
  cartItems: [],
  totalPrice: 0,
  loading: 'idle',
  error: null,
};

// Interface for RemoveCartItemPayload
interface RemoveCartItemPayload {
  productId: any;
  userId: any;
}

// Interface for QuantityPayload
interface QuantityPayload {
  productId: any;
  userId: any;
}

// Fetch userId from cookies
const cookies = new Cookies();
const userId = cookies.get('userId');

// Assuming you have cookies imported and userId retrieved correctly

// Add to Cart Thunk
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (productId: string, { getState, rejectWithValue }) => {
    try {
      const userId = cookies.get('userId');
      if (!userId) {
        throw new Error('User not logged in.');
      }

      const { cartItems } = (getState() as RootState).cart;
      const existingItem = cartItems.find(item => item.productId === productId);

      if (existingItem) {
        throw new Error('Item already exists in cart.');
      }

      // Assuming initial quantity when adding to cart is 1
      const response = await axios.post(`${API_BASE_URL}/carts/add`, {
        userId,
        productId,
        quantity: 1,
      });

      return response.data; // You might want to return updated cart items or just productId
    } catch (error) {
      return rejectWithValue('Error adding item to cart. Please try again later.');
    }
  }
);

// cartSlice reducer and additional logic...

// Fetch Cart Items Thunk
export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (_, { rejectWithValue }) => {
    try {
      if (!userId) {
        throw new Error('User not logged in.');
      }

      const response = await axios.get(`${API_BASE_URL}/carts/products/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Error fetching cart items. Please try again later.');
    }
  }
);

// Remove Cart Item Thunk
export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (payload: RemoveCartItemPayload, { rejectWithValue }) => {
    try {
      const { productId, userId } = payload;
      if (!userId) {
        throw new Error('User not logged in.');
      }

      await axios.delete(`${API_BASE_URL}/carts/delete/${productId}`, { data: { userId } });
      return productId;
    } catch (error) {
      return rejectWithValue('Error removing item from cart. Please try again later.');
    }
  }
);

// Update Cart Item Quantity Thunk
export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateCartItemQuantity',
  async (payload: { productId: string; quantity: number }, { rejectWithValue }) => {
    try {
      if (!userId) {
        throw new Error('User not logged in.');
      }

      await axios.put(`${API_BASE_URL}/carts/updateQuantity/${payload.productId}`, {
        userId,
        quantity: payload.quantity,
      });

      return payload;
    } catch (error) {
      return rejectWithValue('Error updating item quantity. Please try again later.');
    }
  }
);

// Increment Cart Item Quantity Thunk
export const incrementCartItemQuantity = createAsyncThunk(
  'cart/incrementCartItemQuantity',
  async (payload: QuantityPayload, { getState, rejectWithValue }) => {
    try {
      const { productId, userId } = payload;
      if (!userId) {
        throw new Error('User not logged in.');
      }

      const { cartItems } = (getState() as RootState).cart;
      const currentItem = cartItems.find(item => item.productId === productId);

      if (!currentItem) {
        throw new Error('Item not found in cart.');
      }

      const newQuantity = currentItem.quantity + 1;

      await axios.put(`${API_BASE_URL}/carts/increase/${productId}`, { userId });

      return { productId, quantity: newQuantity };
    } catch (error) {
      return rejectWithValue('Error increasing item quantity. Please try again later.');
    }
  }
);

// Decrement Cart Item Quantity Thunk
export const decrementCartItemQuantity = createAsyncThunk(
  'cart/decrementCartItemQuantity',
  async (payload: QuantityPayload, { getState, rejectWithValue }) => {
    try {
      const { productId, userId } = payload;
      if (!userId) {
        throw new Error('User not logged in.');
      }

      const { cartItems } = (getState() as RootState).cart;
      const currentItem = cartItems.find(item => item.productId === productId);

      if (!currentItem || currentItem.quantity <= 1) {
        throw new Error('Quantity cannot be less than 1.');
      }

      const newQuantity = currentItem.quantity - 1;

      await axios.put(`${API_BASE_URL}/carts/decrease/${productId}`, { userId });

      return { productId, quantity: newQuantity };
    } catch (error) {
      return rejectWithValue('Error decreasing item quantity. Please try again later.');
    }
  }
);

// Slice Definition
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
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        // Handle the addToCart success scenario if needed
        // For example, update state.cartItems or state.totalPrice based on action.payload
        state.error = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.payload as string;
      });
  },
});

// Selectors
export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;
export const selectCartLoading = (state: RootState) => state.cart.loading;
export const selectCartError = (state: RootState) => state.cart.error;

// Reducer Export
export default cartSlice.reducer;
