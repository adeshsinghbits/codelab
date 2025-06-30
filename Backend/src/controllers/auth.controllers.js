import { generateJWTToken_email, generateJWTToken_username } from "../utils/generateJWTToken.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.model.js";
import dotenv from "dotenv";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

dotenv.config();

// ==================== Google Strategy ====================
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);

// ==================== OAuth Initiate ====================
export const googleAuthHandler = passport.authenticate("google", {
  scope: ["profile", "email"],
});

// ==================== OAuth Callback ====================
export const googleAuthCallback = passport.authenticate("google", {
  failureRedirect: "http://localhost:5173/login",
  session: false,
});

// ==================== Handle OAuth Logic ====================
export const handleGoogleLoginCallback = asyncHandler(async (req, res) => {
  console.log("\n******** Inside handleGoogleLoginCallback function ********");

  const { email, name, picture } = req.user._json;

  let user = await User.findOne({ email });

  if (!user) {
    console.log("Creating new Unregistered User");
    user = await User.create({ name, email, picture });
  }

  const jwtToken = user.username
    ? generateJWTToken_username(user)
    : generateJWTToken_email(user);

  const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  res.cookie("accessToken", jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    expires: expiryDate,
  });

  return res.redirect("http://localhost:5173/dashboard");
});

// ==================== Handle Logout ====================
export const handleLogout = (req, res) => {
  console.log("\n******** Inside handleLogout function ********");
  res.clearCookie("accessToken");
  return res.status(200).json(new ApiResponse(200, null, "User logged out successfully"));
};

// ==================== Get Authenticated User ====================
export const getMe = asyncHandler(async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) throw new ApiError(401, "Not logged in");
  
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token is : ", decoded);
    
  } catch (err) {
    throw new ApiError(403, "Invalid or expired token");
  }

  const user = await User.findById(decoded.id).select("-__v");
  console.log(user);
  
  if (!user) throw new ApiError(404, "User not found");

  return res.status(200).json(new ApiResponse(200, user,token, "User fetched successfully", "User fetched"));
});
