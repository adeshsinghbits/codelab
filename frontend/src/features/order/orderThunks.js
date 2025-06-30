import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

// Fetch orders of the current user
export const fetchOrders = createAsyncThunk('order/fetchOrders', async () => {
  const res = await axiosInstance.get('/orders');
  return res.data;
});

// Create a new order
export const createOrder = createAsyncThunk('order/createOrder', async (orderData) => {
  const res = await axiosInstance.post('/orders', orderData);
  return res.data;
});

// Update order status
export const updateOrderStatus = createAsyncThunk('order/updateStatus', async ({ id, status }) => {
  const res = await axiosInstance.put(`/orders/${id}/status`, { status });
  return res.data;
});
