import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Имитация API запросов
const mockApi = {
  getReviews: async (productId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const reviews = JSON.parse(localStorage.getItem(`reviews_${productId}`) || '[]');
    return reviews;
  },
  
  addReview: async (productId, review) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const reviews = JSON.parse(localStorage.getItem(`reviews_${productId}`) || '[]');
    const newReview = {
      ...review,
      id: Date.now(),
      date: new Date().toISOString()
    };
    reviews.push(newReview);
    localStorage.setItem(`reviews_${productId}`, JSON.stringify(reviews));
    return newReview;
  }
};

export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (productId) => {
    return await mockApi.getReviews(productId);
  }
);

export const addReview = createAsyncThunk(
  'reviews/addReview',
  async ({ productId, review }) => {
    return await mockApi.addReview(productId, review);
  }
);

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    items: {},
    status: 'idle',
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const productId = action.meta.arg;
        state.items[productId] = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        const productId = action.meta.arg.productId;
        if (!state.items[productId]) {
          state.items[productId] = [];
        }
        state.items[productId].push(action.payload);
      });
  }
});

export const { clearError } = reviewSlice.actions;

export const selectReviews = (state, productId) => state.reviews.items[productId] || [];
export const selectReviewStatus = state => state.reviews.status;
export const selectReviewError = state => state.reviews.error;

export default reviewSlice.reducer; 