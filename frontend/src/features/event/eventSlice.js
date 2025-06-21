import { createSlice } from "@reduxjs/toolkit";
import {
  createEventThunk,
  fetchEventsThunk,
  rsvpToEventThunk,
  leaveEventThunk,
  getSingleEventThunk
} from "./eventThunk";

const eventSlice = createSlice({
  name: "event",
  initialState: {
    events: [],
    totalPages: 0,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetEventState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEventsThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.events = payload.events;
        state.totalPages = payload.totalPages;
      })
      .addCase(fetchEventsThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(createEventThunk.fulfilled, (state) => {
        state.success = true;
      })
      .addCase(rsvpToEventThunk.fulfilled, (state, { payload }) => {
        state.events = state.events.map(e =>
          e._id === payload._id ? payload : e
        );
      })
      .addCase(leaveEventThunk.fulfilled, (state, { payload }) => {
        state.events = state.events.map(e =>
          e._id === payload._id ? payload : e
        );
      })
      .addCase(getSingleEventThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleEventThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.event = action.payload;
      })
      .addCase(getSingleEventThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetEventState } = eventSlice.actions;
export default eventSlice.reducer;
