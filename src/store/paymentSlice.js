import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Имитация API платежной системы
const mockPaymentApi = {
  processPayment: async (paymentData) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      transactionId: `TRX-${Date.now()}`,
      status: 'success',
      amount: paymentData.amount,
      date: new Date().toISOString()
    };
  }
};

export const processPayment = createAsyncThunk(
  'payment/processPayment',
  async (paymentData) => {
    return await mockPaymentApi.processPayment(paymentData);
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    status: 'idle',
    error: null,
    lastTransaction: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearTransaction: (state) => {
      state.lastTransaction = null;
    },
    resetStatus: (state) => {
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(processPayment.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(processPayment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lastTransaction = action.payload;
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { clearError, clearTransaction, resetStatus } = paymentSlice.actions;

export const selectPaymentStatus = state => state.payment.status;
export const selectPaymentError = state => state.payment.error;
export const selectLastTransaction = state => state.payment.lastTransaction;

export default paymentSlice.reducer; 