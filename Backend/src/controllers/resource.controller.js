import { Resource } from '../models/resource.model.js'; 
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { uploadOnCloudinary } from "../config/connectCloudinary.js";
// Create a new resource
export const createResource = asyncHandler(async (req, res) => {
  const { title, description, content, type, tags } = req.body;
  const author = req.user ? req.user._id : null; // Assumes auth middleware
  const resource = await Resource.create({ title, description, content, type, tags, author });
  res.status(201).json(new ApiResponse(201, resource, 'Resource created successfully'));
});

export const uploadfile = asyncHandler(async (req, res) => {
  const LocalPath = req.files?.file[0]?.path;
  console.log("LocalPath: ", LocalPath);

  if (!LocalPath) {
    throw new ApiError(400, " file is required");
  }
  const file = await uploadOnCloudinary(LocalPath);
  if (!file) {
    throw new ApiError(500, "Error uploading ");
  }

  res.status(200).json(new ApiResponse(200, { url: file .url }, "Picture uploaded successfully"));
});

// Get all resources
export const getAllResources = asyncHandler(async (req, res) => {
  const resources = await Resource.find().populate('author', 'name email picture').sort({ createdAt: -1 });
  res.json(new ApiResponse(200, resources));
});

// Get a single resource by ID
export const getResourceById = asyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.id).populate('author', 'name email  picture');
  if (!resource) throw new ApiError(404, 'Resource not found');
  res.json(new ApiResponse(200, resource));
});

// Update a resource
export const updateResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findByIdAndUpdate(
    req.params.id,
    { ...req.body, updatedAt: Date.now() },
    { new: true }
  );
  if (!resource) throw new ApiError(404, 'Resource not found');
  res.json(new ApiResponse(200, resource, 'Resource updated successfully'));
});

// Delete a resource
export const deleteResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findByIdAndDelete(req.params.id);
  if (!resource) throw new ApiError(404, 'Resource not found');
  res.json(new ApiResponse(200, null, 'Resource deleted successfully'));
});

// Get resources by freelancer (author)
export const getResourcesByFreelancer = asyncHandler(async (req, res) => {
  const { freelancerId } = req.params;
  const resources = await Resource.find({ author: freelancerId })
    .populate('author', 'name email picture')
    .sort({ createdAt: -1 });
  res.json(new ApiResponse(200, resources));
});
