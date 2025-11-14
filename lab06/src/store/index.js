// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import paymentsReducer from './paymentsSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    payments: paymentsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export { store };
export default storse;
