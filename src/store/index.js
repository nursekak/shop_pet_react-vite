import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import productReducer from './productSlice';
import userReducer from './userSlice';
import reviewReducer from './reviewSlice';
import paymentReducer from './paymentSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    products: productReducer,
    user: userReducer,
    reviews: reviewReducer,
    payment: paymentReducer
  },
});
