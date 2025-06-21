import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL ;
// Utility for error extraction
const getErrorMessage = (error) =>
  error.response?.data?.message || error.message || "Something went wrong";

// CREATE COURSE with file upload
export const createCourseThunk = createAsyncThunk(
  "course/create",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API}/course/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return data.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// FETCH ALL COURSES (with pagination)
export const fetchCoursesThunk = createAsyncThunk(
  "course/fetchAll",
  async ({ page = 1, limit = 10 } = {}, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API}/course?page=${page}&limit=${limit}`, {
        withCredentials: true,
      });
      return data.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// GET SINGLE COURSE
export const fetchSingleCourseThunk = createAsyncThunk(
  "course/fetchSingle",
  async (courseId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API}/course/${courseId}`, {
        withCredentials: true,
      });
      return data.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// UPDATE COURSE (with optional file upload)
export const updateCourseThunk = createAsyncThunk(
  "course/update",
  async ({ courseId, formData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${API}/course/${courseId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return data.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// DELETE COURSE
export const deleteCourseThunk = createAsyncThunk(
  "course/delete",
  async (courseId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${API}/course/${courseId}`, {
        withCredentials: true,
      });
      return { courseId, message: data.message };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// SEARCH COURSES
export const searchCoursesThunk = createAsyncThunk(
  "course/search",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API}/course/search?query=${query}`, {
        withCredentials: true,
      });
      return data.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// JOIN COURSE
export const joinCourseThunk = createAsyncThunk(
  "course/join",
  async (courseId, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API}/course/${courseId}/join`, {}, {
        withCredentials: true,
      });
      return data.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// LEAVE COURSE
export const leaveCourseThunk = createAsyncThunk(
  "course/leave",
  async (courseId, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API}/course/${courseId}/leave`, {}, {
        withCredentials: true,
      });
      return data.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// GET CREATOR COURSES
export const fetchCreatorCoursesThunk = createAsyncThunk(
  "course/fetchCreator",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API}/course/creator`, {
        withCredentials: true,
      });
      return data.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// GET JOINED COURSES
export const fetchJoinedCoursesThunk = createAsyncThunk(
  "course/fetchJoined",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API}/course/joined`, {
        withCredentials: true,
      });
      return data.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// CHECK IF JOINED
export const isCourseJoinedThunk = createAsyncThunk(
  "course/isJoined",
  async (courseId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API}/course/${courseId}/isJoined`, {
        withCredentials: true,
      });
      return data.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// GET ATTENDEES
export const fetchCourseAttendeesThunk = createAsyncThunk(
  "course/fetchAttendees",
  async (courseId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API}/course/${courseId}/attendees`, {
        withCredentials: true,
      });
      return data.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// GET CREATOR OF A COURSE
export const fetchCourseCreatorThunk = createAsyncThunk(
  "course/fetchCreatorDetail",
  async (courseId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API}/course/${courseId}/creator`, {
        withCredentials: true,
      });
      return data.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
