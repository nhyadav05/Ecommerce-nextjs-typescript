// redux/store.ts
"use client"
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './feature/authSlice'; // Import your reducer(s) here

const store = configureStore({
  reducer: {
    auth: authReducer, // Add your reducer(s) to the root reducer
    // Add more reducers as needed
  },
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
