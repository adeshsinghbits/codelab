import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllGigs,
  fetchGigById,
  createGig,
  updateGig,
  deleteGig,
  fetchgigsByFreelancer,
  toggleFavoriteGig
} from './gigThunks';

const initialState = {
  gigs: [],
  currentGig: null,
  loading: false,
  error: null,
};

const gigSlice = createSlice({
  name: 'gig',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllGigs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllGigs.fulfilled, (state, action) => {
        state.loading = false;
        state.gigs = action.payload;
      })
      .addCase(fetchGigById.fulfilled, (state, action) => {
        state.currentGig = action.payload;
      })
      .addCase(createGig.fulfilled, (state, action) => {
        state.gigs.push(action.payload);
      })
      .addCase(updateGig.fulfilled, (state, action) => {
        const idx = state.gigs.findIndex(g => g._id === action.payload._id);
        state.gigs[idx] = action.payload;
      })
      .addCase(deleteGig.fulfilled, (state, action) => {
        state.gigs = state.gigs.filter(g => g._id !== action.payload);
      })
      .addCase(fetchgigsByFreelancer.fulfilled, (state, action) => {
        state.gigs = action.payload;
      })
      .addCase(fetchgigsByFreelancer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchgigsByFreelancer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleFavoriteGig.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleFavoriteGig.fulfilled, (state, action) => {
        state.loading = false;
        const updatedGig = action.payload;
        state.gigs = state.gigs.map((gig) =>
          gig._id === updatedGig._id ? updatedGig : gig
        );
      })
      .addCase(toggleFavoriteGig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default gigSlice.reducer;
