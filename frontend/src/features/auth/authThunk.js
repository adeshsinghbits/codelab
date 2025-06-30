import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

// Thunk to fetch authenticated user (after cookie set via Google login)
export const fetchAuthenticatedUser = createAsyncThunk(
  'auth/fetchAuthenticatedUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/auth/me', {
        withCredentials: true,
      });
      localStorage.setItem('token', response.data.message);
      
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user");
    }
  }
);

// Thunk to trigger Google login (opens popup or new tab)
export const googleLoginThunk = createAsyncThunk(
  'auth/googleLogin',
  async (_, { rejectWithValue }) => {
    try {
      window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Google Login Failed");
    }
  }
);

// Logout thunk
export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.get('/auth/logout', { withCredentials: true });
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout Failed");
    }
  }
);
