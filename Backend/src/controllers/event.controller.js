import { Event } from "../models/event.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// CREATE EVENT
export const createEvent = asyncHandler(async (req, res) => {
  const {
    title, category, description, meetingLink = "", startDate, startTime,
    endDate, endTime, location, rsvpDeadline, price = 0, priceCategory,
    tags = [], image = null, requirement = "", eventAgenda = [],
    speaker = null, maxAttendees = 100
  } = req.body;

  if (!title || !category || !description || !startDate || !startTime || !endDate || !endTime || !location || !maxAttendees) {
    throw new ApiError(400, "All required fields must be filled");
  }

  const event = await Event.create({
    title, category, description, meetingLink, startDate, startTime,
    endDate, endTime, location, rsvpDeadline, price, priceCategory,
    tags, image, requirement, eventAgenda, speaker, maxAttendees,
    creator: req.user._id,
  });

  res.status(201).json(new ApiResponse(201, event, "Event created successfully"));
});

// FETCH ALL EVENTS WITH PAGINATION
export const getAllEvents = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const total = await Event.countDocuments();
  const events = await Event.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate("creator", "name username email picture")
    .populate("speaker", "name username");

  res.status(200).json(
    new ApiResponse(200, {
      total,
      page,
      totalPages: Math.ceil(total / limit),
      events,
    }, "Paginated events fetched")
  );
});

// SEARCH EVENTS
export const searchEvents = asyncHandler(async (req, res) => {
  const { query } = req.query;
  if (!query) throw new ApiError(400, "Search query is required");

  const regex = new RegExp(query, "i");
  const events = await Event.find({
    $or: [
      { title: { $regex: regex } },
      { category: { $regex: regex } },
      { tags: { $in: [regex] } }
    ]
  }).limit(20); // Optional: Limit search results

  res.status(200).json(new ApiResponse(200, events, "Search results fetched"));
});

// UPDATE EVENT
export const updateEvent = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  const event = await Event.findById(eventId);

  if (!event) throw new ApiError(404, "Event not found");
  if (event.creator.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized: Only the creator can update this event");
  }

  const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, { new: true });
  res.status(200).json(new ApiResponse(200, updatedEvent, "Event updated successfully"));
});

// DELETE EVENT
export const deleteEvent = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  const event = await Event.findById(eventId);

  if (!event) throw new ApiError(404, "Event not found");
  if (event.creator.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized: Only the creator can delete this event");
  }

  await event.deleteOne();
  res.status(200).json(new ApiResponse(200, null, "Event deleted successfully"));
});

// RSVP TO EVENT
export const rsvpEvent = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  const userId = req.user._id;

  const event = await Event.findById(eventId);
  if (!event) throw new ApiError(404, "Event not found");

  if (event.attendees.includes(userId)) {
    throw new ApiError(400, "You have already RSVP’d to this event.");
  }

  if (event.attendees.length >= event.maxAttendees) {
    throw new ApiError(400, "Event is full");
  }

  const now = new Date();
  if (event.rsvpDeadline && new Date(event.rsvpDeadline) < now) {
    throw new ApiError(400, "RSVP deadline has passed");
  }

  event.attendees.push(userId);
  await event.save();

  const updatedEvent = await Event.findById(eventId)
    .populate("attendees", "name username picture")
    .populate("creator", "name username picture");

  res.status(200).json(new ApiResponse(200, updatedEvent, "Successfully RSVP'd to event"));
});

// LEAVE EVENT
export const leaveEvent = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  const userId = req.user._id;

  const event = await Event.findById(eventId);
  if (!event) throw new ApiError(404, "Event not found");

  if (!event.attendees.some((attId) => attId.toString() === userId.toString())) {
    throw new ApiError(400, "You are not part of this event");
  }

  event.attendees = event.attendees.filter(
    (attId) => attId.toString() !== userId.toString()
  );

  await event.save();

  const updatedEvent = await Event.findById(eventId)
    .populate("attendees", "name picture _id")
    .populate("creator", "name picture _id");

  res.status(200).json(new ApiResponse(200, updatedEvent, "Successfully left the event"));
});

// GET CREATOR'S EVENTS
export const getCreatorEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ creator: req.user._id });
  res.status(200).json(new ApiResponse(200, events, "Creator's events fetched"));
});

// GET SINGLE EVENT
export const getSingleEvent = asyncHandler(async (req, res) => {
  const { eventId } = req.params;

  if (!eventId) throw new ApiError(400, "Event ID is required");

  const event = await Event.findById(eventId)
    .populate("creator", "name username email picture")
    .populate("speaker", "name username bio picture")
    .populate("attendees", "name username picture")
    .lean();

  if (!event) throw new ApiError(404, "Event not found");

  res.status(200).json(new ApiResponse(200, event, "Event fetched successfully"));
});
