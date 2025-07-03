// src/features/resource/resourceThunks.js
import {
  startLoading,
  hasError,
  getResourcesSuccess,
  getResourceSuccess,
  createResourceSuccess,
  updateResourceSuccess,
  deleteResourceSuccess,
  getFreelancerResourcesSuccess,
} from "./resourceSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import  axiosInstance  from "../../utils/axiosInstance";
import { toast } from "react-hot-toast";

const API = "/resource"; 

export const fetchResources = () => async (dispatch) => {
  dispatch(startLoading());
  try {
    const { data } = await axiosInstance.get(API);
    dispatch(getResourcesSuccess(data.data));
  } catch (err) {
    dispatch(hasError(err.response?.data?.message || err.message));
  }
};

export const fetchResourceById = (id) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const { data } = await axiosInstance.get(`${API}/${id}`);
    dispatch(getResourceSuccess(data.data));
  } catch (err) {
    dispatch(hasError(err.response?.data?.message || err.message));
  }
};

export const createResource = (resourceData) => async (dispatch, getState) => {
  dispatch(startLoading());
  try {
    const token = getState().auth.user?.token;
    const { data } = await axiosInstance.post(API, resourceData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(createResourceSuccess(data.data));
    toast.success("Resource created successfully");
  } catch (err) {
    dispatch(hasError(err.response?.data?.message || err.message));
    toast.error(err.response?.data?.message || "Failed to create resource");
  }
};

export const updateResource = (id, updatedData) => async (dispatch, getState) => {
  dispatch(startLoading());
  try {
    const token = getState().auth.user?.token;
    const { data } = await axiosInstance.put(`${API}/${id}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(updateResourceSuccess(data.data));
    toast.success("Resource updated successfully");
  } catch (err) {
    dispatch(hasError(err.response?.data?.message || err.message));
    toast.error(err.response?.data?.message || "Failed to update resource");
  }
};

export const deleteResource = (id) => async (dispatch, getState) => {
  dispatch(startLoading());
  try {
    const token = getState().auth.user?.token;
    await axiosInstance.delete(`${API}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(deleteResourceSuccess(id));
    toast.success("Resource deleted successfully");
  } catch (err) {
    dispatch(hasError(err.response?.data?.message || err.message));
    toast.error(err.response?.data?.message || "Failed to delete resource");
  }
};

export const uploadFileThunk = createAsyncThunk(
  "resource/uploadFile",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await axiosInstance.post(`${API}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      console.log("File uploaded successfully:", data);
      
      return data.data.url; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "File upload failed");
    }
  }
);

export const fetchResourcesByFreelancer = (freelancerId) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const { data } = await axiosInstance.get(`${API}/freelancer/${freelancerId}`);
    dispatch(getFreelancerResourcesSuccess(data.data));
  } catch (err) {
    dispatch(hasError(err.response?.data?.message || err.message));
  }
};