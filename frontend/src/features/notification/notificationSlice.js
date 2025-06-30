import { createSlice } from "@reduxjs/toolkit";
import {
  fetchNotificationsThunk,
  markNotificationAsReadThunk,
  deleteNotificationThunk
} from "./notificationThunk";

const initialState = {
  notifications: [],
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificationsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotificationsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotificationsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(markNotificationAsReadThunk.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.notifications.findIndex(n => n._id === updated._id);
        if (index !== -1) state.notifications[index] = updated;
      })
      .addCase(deleteNotificationThunk.fulfilled, (state, action) => {
        state.notifications = state.notifications.filter(n => n._id !== action.payload.id);
      });
  },
});

export default notificationSlice.reducer;
