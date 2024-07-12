// redux/features/categoriesSlice.ts

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import API_BASE_URL from '@/apiConfig';
import { RootState } from '../store'; // Adjust the path as per your project structure
import Cookies from 'universal-cookie';

interface Category {
  _id: string;
  name: string;
  image: string;
}

interface CategoriesState {
  categories: Category[];
  loading: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  loading: 'idle',
  error: null,
};
// Fetch userId from cookies
const cookies = new Cookies();
const userId = cookies.get('userId');
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    try {
      const response = await axios.get<Category[]>(`${API_BASE_URL}/api/categories`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch categories');
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    // Additional reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error.message || 'Failed to fetch categories';
      });
  },
});

export default categoriesSlice.reducer;
