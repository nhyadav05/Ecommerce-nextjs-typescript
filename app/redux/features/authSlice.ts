import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import API_BASE_URL from '@/apiConfig';
import Cookies from 'universal-cookie'; // Import universal-cookie for cookie management

interface User {
  _id: string;
  email: string;
  // Add more fields as needed
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

const cookies = new Cookies(); // Create an instance of universal-cookie

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

// Async thunk for login action
export const login = createAsyncThunk<User, { email: string, password: string }>(
  'auth/login',
  async ({ email, password }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/sign-in`, { email, password });
      return response.data;
    } catch (error:any) {
      if (error.response && error.response.status === 409 && error.response.data.message === 'password is not correct') {
        throw new Error('password is not correct');
      } else {
        throw new Error('Failed to login');
      }
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Additional reducers can be added here if needed
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
      cookies.remove('loggedin'); // Remove the cookie on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload;

        // Set a cookie here to indicate the user is logged in
        cookies.set('loggedin', 'true', { path: '/' });
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to login';
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
