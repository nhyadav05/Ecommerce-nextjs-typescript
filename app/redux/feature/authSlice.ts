// redux/feature/authSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import API_BASE_URL from '@/apiConfig';
import { AppDispatch } from '../store';
import { toast } from 'react-toastify';

interface AuthState {
  isLoggedIn: boolean;
  userId: string | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  userId: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.isLoading = true;
    },
    loginSuccess(state, action: PayloadAction<string>) {
      state.isLoggedIn = true;
      state.userId = action.payload;
      state.isLoading = false;
    },
    loginFailure(state) {
      state.isLoading = false;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userId = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(loginStart());
    const response = await axios.post(`${API_BASE_URL}/api/auth/sign-in`, { email, password });
    console.log(response, 'Login successful');
    toast.success('Login successful! Redirecting to home...');
    dispatch(loginSuccess(response.data._id));
    // Handle storing tokens or cookies if needed
  } catch (error) {
    console.error('Login error:', error);
    toast.error('Login failed. Please try again.');
    dispatch(loginFailure());
  }
};

export default authSlice.reducer;
