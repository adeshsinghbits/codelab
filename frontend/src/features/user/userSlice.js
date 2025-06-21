import { createSlice } from "@reduxjs/toolkit";
import {
  saveUserThunk,
  uploadPicThunk,
  sendScheduleMeetThunk,
} from "./userThunk";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  pictureUrl: null,
  successMessage: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Save User
      .addCase(saveUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.successMessage = "User details saved successfully";
      })
      .addCase(saveUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Upload Picture
      .addCase(uploadPicThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadPicThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pictureUrl = action.payload.url;
        state.successMessage = "Picture uploaded successfully";
      })
      .addCase(uploadPicThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Send Meeting Email
      .addCase(sendScheduleMeetThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendScheduleMeetThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.successMessage = "Meeting request sent successfully";
      })
      .addCase(sendScheduleMeetThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;
