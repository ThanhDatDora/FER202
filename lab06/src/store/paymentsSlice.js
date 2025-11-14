// src/store/paymentsSlice.js
import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

// POST /payments (json-server on :3001). Change URL if you have a real backend.
export const createPayment = createAsyncThunk(
  'payments/create',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch('http://localhost:3001/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.status === 402) {
        return rejectWithValue('Tài khoản không đủ tiền');
      }
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        return rejectWithValue(err?.message || 'Create payment failed');
      }

      const data = await res.json();
      return data;
    } catch {
      return rejectWithValue('Network error');
    }
  }
);

const initialState = {
  payments: [],
  isLoading: false,
  error: null
};

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    clearPaymentsError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) state.payments.push(action.payload);
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Unexpected error';
      });
  }
});

export default paymentsSlice.reducer;
export const { clearPaymentsError } = paymentsSlice.actions;

// -------- Selectors --------
export const selectPaymentsState = (state) => state.payments;
export const selectPayments = (state) => state.payments.payments;

// Memoized selector to avoid "returned a different result" warnings
export const selectSuccessfulPayments = createSelector(
  [selectPayments],
  (items) => items.filter((p) => p.status === 'SUCCESS')
);
