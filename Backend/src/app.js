import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" })); // to parse json in body
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // to parse url
app.use(express.static("public")); // to use static public folder
app.use(cookieParser()); // to enable CRUD operation on browser cookies

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  // Add other CORS headers as needed
  next();
});

// Passport middleware
app.use(passport.initialize());

// Importing routes
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import evenRouter from "./routes/event.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import gigRoutes from './routes/gigRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import chatRoutes from './routes/chat.routes.js';
import messageRoutes from './routes/message.routes.js';
import requestRouter from "./routes/request.routes.js";

// Using routes
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/events", evenRouter);
app.use("/notifications", notificationRoutes);
app.use("/gigs", gigRoutes);
app.use("/orders", orderRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);
app.use("/request", requestRouter);

export { app };
