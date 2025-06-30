import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

// Fetch all gigs
export const fetchAllGigs = createAsyncThunk('gig/fetchAll', async () => {
  const res = await axiosInstance.get('/gigs');
  return res.data;
});

// Fetch gig by ID
export const fetchGigById = createAsyncThunk('gig/fetchById', async (id) => {
  const res = await axiosInstance.get(`/gigs/${id}`);
  return res.data;
});

// Create a new gig
export const createGig = createAsyncThunk('gig/create', async (gigData) => {
  const res = await axiosInstance.post('/gigs', gigData);
  return res.data;
});

// Update a gig
export const updateGig = createAsyncThunk('gig/update', async ({ id, data }) => {
  const res = await axiosInstance.put(`/gigs/${id}`, data);
  return res.data;
});

// Delete a gig
export const deleteGig = createAsyncThunk('gig/delete', async (id) => {
  await axiosInstance.delete(`/gigs/${id}`);
  return id;
});

// Fetch gigs by freelancer
export const fetchgigsByFreelancer = createAsyncThunk('gig/fetchByFreelancer', async (freelancerId) => {
  const res = await axiosInstance.get(`/gigs/freelancer/${freelancerId}`);
  return res.data;
});

// Toggle favorite
export const toggleFavoriteGig = createAsyncThunk(
  'gig/toggleFavoriteGig',
  async (gigId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/gigs/${gigId}/favorite`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Error toggling favorite');
    }
  }
);
