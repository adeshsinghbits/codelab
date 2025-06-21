import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export const saveUserThunk = createAsyncThunk(
  "user/saveUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${API}/user/saveUser`, userData, {
        withCredentials: true,
      });
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Save user failed");
    }
  }
);

export const uploadPicThunk = createAsyncThunk(
  "user/uploadPic",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("picture", file);
      const { data } = await axios.post(`${API}/user/uploadPicture`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Upload failed");
    }
  }
);

export const sendScheduleMeetThunk = createAsyncThunk(
  "user/sendScheduleMeet",
  async ({ date, time, username }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API}/user/schedule-meet`,
        { date, time, username },
        { withCredentials: true }
      );
      return data.message;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Meeting request failed");
    }
  }
);
