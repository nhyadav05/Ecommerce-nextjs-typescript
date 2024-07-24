// redux/features/categoriesSlice.ts
// redux/features/categoriesSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import API_BASE_URL from '@/apiConfig';

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

export const fetchCategories = createAsyncThunk<Category[], void, { rejectValue: string }>(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Category[]>(`${API_BASE_URL}/categories`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch categories');
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
        state.error = action.payload ?? 'Failed to fetch categories';
      });
  },
});

export default categoriesSlice.reducer;