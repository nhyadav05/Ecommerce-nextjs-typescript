// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import categoriesReducer from './features/categoriesSlice';
import cartReducer from './features/cartSlice';
import wishListReducer from './features/wishlistSlice';

export const store = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      categories: categoriesReducer,
      cart: cartReducer,
      wishlist: wishListReducer,
    },
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

