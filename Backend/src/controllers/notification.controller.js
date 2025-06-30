import { Notification } from "../models/notification.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// Get all notifications for logged-in user
export const getUserNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json(new ApiResponse(200, notifications, "Fetched user notifications"));
});

// Mark a single notification as read
export const markNotificationAsRead = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const notification = await Notification.findOne({ _id: id, userId: req.user._id });
  if (!notification) throw new ApiError(404, "Notification not found");

  notification.read = true;
  await notification.save();
  res.status(200).json(new ApiResponse(200, notification, "Notification marked as read"));
});

// Delete a notification
export const deleteNotification = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const notification = await Notification.findOneAndDelete({ _id: id, userId: req.user._id });
  if (!notification) throw new ApiError(404, "Notification not found");

  res.status(200).json(new ApiResponse(200, null, "Notification deleted"));
});
