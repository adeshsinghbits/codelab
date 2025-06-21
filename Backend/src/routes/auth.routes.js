import { Router } from "express";
import {
  googleAuthCallback,
  googleAuthHandler,
  handleGoogleLoginCallback,
  getMe,
  handleLogout,
} from "../controllers/auth.controllers.js";

const router = Router();

router.get("/google", googleAuthHandler);
router.get("/google/callback", googleAuthCallback, handleGoogleLoginCallback);
router.get("/me", getMe);
router.get("/logout", handleLogout);

export default router;
