// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import salaryReducer from '../features/salary/salarySlice';

export const store = configureStore({
  reducer: {
    salary: salaryReducer,
  },
});
