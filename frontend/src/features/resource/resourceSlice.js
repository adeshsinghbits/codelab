// src/features/resource/resourceSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resources: [],
  freelancerResources: [],
  resource: null,
  loading: false,
  error: null,
};

const resourceSlice = createSlice({
  name: "resource",
  initialState,
  reducers: {
    startLoading: (state) => { state.loading = true; state.error = null; },
    hasError: (state, action) => { state.loading = false; state.error = action.payload; },
    getResourcesSuccess: (state, action) => { state.loading = false; state.resources = action.payload; },
    getResourceSuccess: (state, action) => { state.loading = false; state.resource = action.payload; },
    createResourceSuccess: (state, action) => { state.loading = false; state.resources.push(action.payload); },
    updateResourceSuccess: (state, action) => {
      state.loading = false;
      const index = state.resources.findIndex(r => r._id === action.payload._id);
      if (index !== -1) state.resources[index] = action.payload;
    },
    deleteResourceSuccess: (state, action) => {
      state.loading = false;
      state.resources = state.resources.filter(r => r._id !== action.payload);
    },
    getFreelancerResourcesSuccess: (state, action) => {
      state.loading = false;
      state.freelancerResources = action.payload;
    },
  },
});

export const {
  startLoading,
  hasError,
  getResourcesSuccess,
  getResourceSuccess,
  createResourceSuccess,
  updateResourceSuccess,
  deleteResourceSuccess,
  getFreelancerResourcesSuccess,
} = resourceSlice.actions;

export default resourceSlice.reducer;
