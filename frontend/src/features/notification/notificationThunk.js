import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const fetchNotificationsThunk = createAsyncThunk(
  "notification/fetchAll",
  async (_, thunkAPI) => {
    const response = await axiosInstance.get("/notifications");
    return response.data.data;
  }
);

export const markNotificationAsReadThunk = createAsyncThunk(
  "notification/markAsRead",
  async (id, thunkAPI) => {
    const response = await axiosInstance.patch(`/notifications/${id}/read`);
    return response.data.data;
  }
);

export const deleteNotificationThunk = createAsyncThunk(
  "notification/delete",
  async (id, thunkAPI) => {
    await axiosInstance.delete(`/notifications/${id}`);
    return { id };
  }
);
