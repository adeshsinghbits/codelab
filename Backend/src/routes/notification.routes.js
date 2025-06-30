import express from "express";
import { verifyJWT_username } from "../middlewares/verifyJWT.middleware.js";
import {
  getUserNotifications,
  markNotificationAsRead,
  deleteNotification
} from "../controllers/notification.controller.js";

const router = express.Router();

router.use(verifyJWT_username);

router.get("/", getUserNotifications);
router.patch("/:id/read", markNotificationAsRead);
router.delete("/:id", deleteNotification);

export default router;
