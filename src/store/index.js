import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import productReducer from './productSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    products: productReducer,
    user: userReducer
  },
});
