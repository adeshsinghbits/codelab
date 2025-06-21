import mongoose from "mongoose";
import { Course } from "../models/course.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../config/connectCloudinary.js";

// CREATE COURSE with upload
export const createCourse = asyncHandler(async (req, res) => {
  const { title, description, tag } = req.body;

  if (!title || !description || !req.files?.thumbnail || !req.files?.video) {
    throw new ApiError(400, "Required fields: title, description, thumbnail file, video file");
  }

  const thumbnailUpload = await uploadOnCloudinary(req.files.thumbnail[0]?.path);
  if (!thumbnailUpload?.secure_url) throw new ApiError(500, "Thumbnail upload failed");

  const videoUpload = await uploadOnCloudinary(req.files.video[0]?.path);
  if (!videoUpload?.secure_url) throw new ApiError(500, "Video upload failed");

  const course = await Course.create({
    title,
    description,
    thumbnail: thumbnailUpload.secure_url,
    video: videoUpload.secure_url,
    tag: tag || [],
    creator: req.user._id,
    attendees: [],
  });

  res.status(201).json(new ApiResponse(201, course, "Course created successfully"));
});

// GET ALL COURSES WITH PAGINATION
export const getAllCourses = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const courses = await Course.find()
    .skip(skip)
    .limit(limit)
    .populate("creator", "name email picture");

  const totalCourses = await Course.countDocuments();

  res.status(200).json(
    new ApiResponse(200, { courses, totalCourses, page, limit }, "Courses fetched successfully")
  );
});

// GET SINGLE COURSE
export const getSingleCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new ApiError(400, "Invalid course ID format");
  }

  const course = await Course.findById(courseId)
    .populate("creator", "name email picture")
    .populate("attendees", "name email picture");

  if (!course) throw new ApiError(404, "Course not found");

  res.status(200).json(new ApiResponse(200, course, "Course fetched successfully"));
});

// UPDATE COURSE
export const updateCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new ApiError(400, "Invalid course ID format");
  }

  const course = await Course.findById(courseId);
  if (!course) throw new ApiError(404, "Course not found");

  if (course.creator.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized to update this course");
  }

  const allowedFields = ["title", "description", "tag"];
  Object.keys(req.body).forEach((field) => {
    if (!allowedFields.includes(field)) {
      throw new ApiError(400, `Invalid field: ${field}`);
    }
  });

  Object.assign(course, req.body);

  // If new files provided
  if (req.files?.thumbnail) {
    const thumbnailUpload = await uploadOnCloudinary(req.files.thumbnail[0]?.path);
    if (thumbnailUpload?.secure_url) course.thumbnail = thumbnailUpload.secure_url;
  }

  if (req.files?.video) {
    const videoUpload = await uploadOnCloudinary(req.files.video[0]?.path);
    if (videoUpload?.secure_url) course.video = videoUpload.secure_url;
  }

  await course.save();
  res.status(200).json(new ApiResponse(200, course, "Course updated successfully"));
});

// DELETE COURSE
export const deleteCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new ApiError(400, "Invalid course ID format");
  }

  const course = await Course.findById(courseId);
  if (!course) throw new ApiError(404, "Course not found");

  if (course.creator.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized to delete this course");
  }

  await course.deleteOne();
  res.status(200).json(new ApiResponse(200, null, "Course deleted successfully"));
});

// GET CREATOR'S COURSES
export const getCreatorCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({ creator: req.user._id });
  res.status(200).json(new ApiResponse(200, courses, "Creator's courses fetched"));
});

// SEARCH COURSES BY TITLE OR TAG
export const searchCourses = asyncHandler(async (req, res) => {
  const { query } = req.query;
  if (!query) throw new ApiError(400, "Search query is required");

  const regex = new RegExp(query, "i");

  const courses = await Course.find({
    $or: [{ title: regex }, { tag: regex }],
  }).populate("creator", "name");

  res.status(200).json(new ApiResponse(200, courses, "Courses searched successfully"));
});

// JOIN COURSE
export const joinCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new ApiError(400, "Invalid course ID format");
  }

  const course = await Course.findById(courseId);
  if (!course) throw new ApiError(404, "Course not found");

  if (course.attendees.includes(req.user._id)) {
    throw new ApiError(400, "Already joined");
  }

  course.attendees.push(req.user._id);
  await course.save();

  res.status(200).json(new ApiResponse(200, course, "Joined course successfully"));
});

// LEAVE COURSE
export const leaveCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new ApiError(400, "Invalid course ID format");
  }

  const course = await Course.findById(courseId);
  if (!course) throw new ApiError(404, "Course not found");

  course.attendees = course.attendees.filter(
    (id) => id.toString() !== req.user._id.toString()
  );
  await course.save();

  res.status(200).json(new ApiResponse(200, course, "Left course successfully"));
});

// GET JOINED COURSES
export const getJoinedCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({ attendees: req.user._id });
  res.status(200).json(new ApiResponse(200, courses, "Joined courses fetched"));
});

// GET COURSE ATTENDEES
export const getCourseAttendees = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const course = await Course.findById(courseId).populate("attendees", "name email picture");
  if (!course) throw new ApiError(404, "Course not found");

  res.status(200).json(new ApiResponse(200, course.attendees, "Course attendees fetched"));
});

// GET COURSE CREATOR
export const getCourseCreator = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const course = await Course.findById(courseId).populate("creator", "name email picture");
  if (!course) throw new ApiError(404, "Course not found");

  res.status(200).json(new ApiResponse(200, course.creator, "Course creator fetched"));
});

// CHECK IF USER JOINED COURSE
export const isCourseJoined = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const course = await Course.findById(courseId);
  if (!course) throw new ApiError(404, "Course not found");

  const joined = course.attendees.includes(req.user._id);
  res.status(200).json(new ApiResponse(200, { joined }, "Join status fetched"));
});
