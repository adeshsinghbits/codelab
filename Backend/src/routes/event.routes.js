import express from "express";
import {
    createEvent,
    getAllEvents,
    searchEvents,
    updateEvent,
    deleteEvent,
    rsvpEvent,
    leaveEvent,
    getSingleEvent,
    getCreatorEvents
} from "../controllers/event.controller.js";
import { verifyJWT_username } from "../middlewares/verifyJWT.middleware.js";

const router = express.Router();

router.post("/", verifyJWT_username, createEvent);
router.get("/creator/:creatorId", verifyJWT_username, getCreatorEvents);
router.get("/:eventId", verifyJWT_username, getSingleEvent);
router.get("/", getAllEvents);
router.get("/search", searchEvents);

router.put("/:eventId", verifyJWT_username, updateEvent);
router.delete("/:eventId", verifyJWT_username, deleteEvent);

router.post("/:eventId/rsvp", verifyJWT_username, rsvpEvent);
router.post("/:eventId/leave", verifyJWT_username, leaveEvent);

export default router;
