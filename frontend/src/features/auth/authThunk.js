import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginWithGoogleThunk = createAsyncThunk(
  'auth/googleLogin',
  async (_, { rejectWithValue }) => {
    try {
      window.location.href = 'http://localhost:8000/auth/google'; // your backend
    } catch (err) {
      return rejectWithValue(err.response?.data || "Google login failed");
    }
  }
);
