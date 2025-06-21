import { createSlice } from '@reduxjs/toolkit';
import { fetchAuthenticatedUser, googleLoginThunk, logoutThunk } from './authThunk';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Google Login Thunk
      .addCase(googleLoginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Authenticated User
      .addCase(fetchAuthenticatedUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAuthenticatedUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchAuthenticatedUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { resetAuthError } = authSlice.actions;
export default authSlice.reducer;
