import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import API_BASE_URL from '@/apiConfig';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
}
interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

interface SignupData {
  name: string;
  email: string;
  password: string;
}

export const signup = createAsyncThunk<User, SignupData>(
  'auth/signup',
  async (signupData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/sign-up`, signupData);
  
      return response.data;

    } catch (error:any) {
      if (error.response && error.response.status === 409) {
        return rejectWithValue(error.response.data); // Return server validation errors
      } else {
        return rejectWithValue('Failed to signup');
      }
    }
  }
);
// Async thunk for login action
export const login = createAsyncThunk<User, { email: string, password: string }>(
  'auth/login',
  async ({ email, password }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/sign-in`, { email, password });
      cookies.set('loggedin', true)
      cookies.set("userId",response.data._id)
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
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
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

      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to login';
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload;

      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to signup';
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
