import { createAsyncThunk } from "@reduxjs/toolkit";
import  axiosInstance  from "../../utils/axiosInstance";
import toast from "react-hot-toast";
// Create Event
export const createEventThunk = createAsyncThunk(
  "event/create",
  async (eventData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/events", eventData);
      return data.data
      ;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Event creation failed");
    }
  }
);

// Fetch Events with Pagination
export const fetchEventsThunk = createAsyncThunk(
  "event/fetchAll",
  async (page = 1, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/events`);
      
      return data.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Failed to fetch events");
    }
  }
);

// RSVP to Event
export const rsvpToEventThunk = createAsyncThunk(
  "event/rsvp",
  async (eventId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`/events/${eventId}/rsvp`);
      //console.log(data.data.attendees);
      return data.data;
      
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "RSVP failed");
      return rejectWithValue("RSVP failed");
    }
  }
);

// Leave Event
export const leaveEventThunk = createAsyncThunk(
  "event/leave",
  async (eventId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`/events/${eventId}/leave`);
      console.log(data.data.attendees);
      
      return data.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Leave failed");
    }
  }
);

// Get Single Event
export const getSingleEventThunk = createAsyncThunk(
  "event/getSingle",
  async (eventId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/events/${eventId}`);
      return data.data;
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to fetch event details");
      return rejectWithValue(error.response?.data?.message || "Failed to fetch event details");
    }
  }
);
